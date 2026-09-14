##############################################################################
# availability_watchdog Lambda — scheduled inventory safety net
#
# Added after the 2026-09-12 Geco overbooking (website booking KWL-AFFJYUR6,
# Booking.com reservation 6744249283).
#
# What happened: confirming a deposit promotes a Smoobu hold from the Blocked
# channel to the Homepage channel, which requires DELETE-then-CREATE because
# Smoobu cannot change a reservation's channelId. That pair emits an "open"
# availability push immediately followed by a "close" push to every connected
# channel. Booking.com applied them out of order for one of the two nights; the
# room stayed on sale for ~36 hours and was sold. Smoobu's own calendar was
# correct the whole time, so its overbooking indicator had nothing to show, and
# the colliding leg of the inbound reservation was dropped on import without an
# error. Nothing in the system raised a hand — a human found it.
#
# This worker runs two separate, deliberately narrow jobs — see the header of
# booking-api/src/availabilityWatchdog.ts:
#
#   mode "reassert"  every 10 minutes. For stays promoted in the last ~25 min,
#                    re-sends ONE "these dates are taken" push so a dropped
#                    close-push gets a second chance. It verifies nothing; it
#                    cannot read Booking.com. Delayed on purpose — firing inside
#                    the promotion's own burst would join the ordering problem.
#                    Retires itself once SMOOBU_HOLD_CHANNEL_ID=70 removes the
#                    channel transition altogether.
#
#   mode "sweep"     once a day. Read-only Smoobu availability check across the
#                    future book, writing only where it finds a stay genuinely
#                    back on sale. NOTE: a clean sweep is not evidence that
#                    Booking.com agrees — in this incident Smoobu was correct
#                    and only the channel was wrong.
#
# Why not one pass that re-asserts everything on a short timer: with ~135 future
# reservations that is ~12,900 writes a day, each fanning out to Booking.com and
# Airbnb — ~25,800 channel pushes daily, to mitigate a fault caused by two
# pushes landing out of order. An amplifier for the disease.
#
# Same VPC placement and execution role as hold_expiry, so it can reach RDS and
# read the Smoobu credentials from Secrets Manager.
##############################################################################

data "archive_file" "availability_watchdog_placeholder" {
  type        = "zip"
  source_dir  = "${path.module}/lambda/availability_watchdog"
  output_path = "${path.module}/lambda/availability_watchdog.zip"
}

resource "aws_cloudwatch_log_group" "availability_watchdog" {
  name              = "/aws/lambda/${var.project}-${var.environment}-availability-watchdog"
  retention_in_days = local.cloudwatch_log_retention_days

  tags = {
    Name = "${var.project}-${var.environment}-availability-watchdog-logs"
  }
}

resource "aws_lambda_function" "availability_watchdog" {
  function_name = "${var.project}-${var.environment}-availability-watchdog"
  description   = "Kalawala availability watchdog. mode=reassert: one delayed corrective close-push per recently promoted stay. mode=sweep: daily read-only Smoobu check of the future book."

  runtime       = "nodejs22.x"
  handler       = "availabilityWatchdogHandler.handler"
  architectures = ["arm64"]

  role = aws_iam_role.lambda_exec.arn

  filename         = data.archive_file.availability_watchdog_placeholder.output_path
  source_code_hash = data.archive_file.availability_watchdog_placeholder.output_base64sha256

  # Terraform owns this function's CONFIGURATION; CI owns its CODE, uploaded with
  # `aws lambda update-function-code`. Same arrangement as the other workers —
  # without this, an apply would reset the live function to the placeholder zip.
  lifecycle {
    ignore_changes = [filename, source_code_hash]
  }

  memory_size = 256

  # The sweep is the long one: one read per confirmed future stay, run
  # sequentially to stay well inside Smoobu's 1000 req/min limit. ~135 future
  # reservations today; 300s leaves generous headroom as the book grows. The
  # reassert pass finishes in a second or two.
  timeout = 300

  vpc_config {
    subnet_ids         = aws_subnet.private[*].id
    security_group_ids = [aws_security_group.lambda.id]
  }

  environment {
    variables = local.lambda_common_env
  }

  depends_on = [
    aws_cloudwatch_log_group.availability_watchdog,
    aws_iam_role_policy_attachment.lambda_basic_execution,
    aws_iam_role_policy_attachment.lambda_vpc_access,
  ]

  tags = {
    Name = "${var.project}-${var.environment}-availability-watchdog"
  }
}

##############################################################################
# EventBridge schedules
#
# Two rules, one function, distinguished by the event payload. Splitting them is
# what keeps the write volume proportionate: the frequent pass touches only what
# just changed, and the pass that looks at everything only reads.
##############################################################################

resource "aws_cloudwatch_event_rule" "availability_reassert_schedule" {
  name                = "${var.project}-${var.environment}-availability-reassert"
  description         = "Sends one delayed corrective close-push per recently promoted stay."
  schedule_expression = "rate(10 minutes)"

  tags = {
    Name = "${var.project}-${var.environment}-availability-reassert"
  }
}

resource "aws_cloudwatch_event_target" "availability_reassert_target" {
  rule  = aws_cloudwatch_event_rule.availability_reassert_schedule.name
  arn   = aws_lambda_function.availability_watchdog.arn
  input = jsonencode({ mode = "reassert" })
}

resource "aws_lambda_permission" "availability_reassert_eventbridge" {
  statement_id  = "AllowEventBridgeInvokeReassert"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.availability_watchdog.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.availability_reassert_schedule.arn
}

# 09:00 UTC = 03:00 in Costa Rica — the quietest hour for both the Smoobu API
# and the channels, so a full read of the book competes with nothing.
resource "aws_cloudwatch_event_rule" "availability_sweep_schedule" {
  name                = "${var.project}-${var.environment}-availability-sweep"
  description         = "Daily read-only Smoobu availability check across every confirmed future stay."
  schedule_expression = "cron(0 9 * * ? *)"

  tags = {
    Name = "${var.project}-${var.environment}-availability-sweep"
  }
}

resource "aws_cloudwatch_event_target" "availability_sweep_target" {
  rule  = aws_cloudwatch_event_rule.availability_sweep_schedule.name
  arn   = aws_lambda_function.availability_watchdog.arn
  input = jsonencode({ mode = "sweep" })
}

resource "aws_lambda_permission" "availability_sweep_eventbridge" {
  statement_id  = "AllowEventBridgeInvokeSweep"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.availability_watchdog.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.availability_sweep_schedule.arn
}

##############################################################################
# Alarms — "a property that should be blocked became available again"
#
# Each one means inventory that is already sold is, or recently was,
# purchasable. They page immediately on a single occurrence: waiting for a
# second data point means waiting for a second guest.
#
# Honest limitation: none of these would have fired during the Geco incident.
# Smoobu was correct throughout; only Booking.com was wrong, and no alarm here
# can see Booking.com's inventory. What these cover is the Smoobu-side failure
# family, plus the after-the-fact signal that does reach the real case — an
# inbound channel reservation landing on dates we already sold.
##############################################################################

locals {
  # The events that mean "inventory that is already sold may be purchasable".
  # `event` is the structured logger's message field, which observability.ts
  # writes as `eventType`.
  availability_alert_events = {
    stay_on_sale = {
      event       = "availability_watchdog_stay_on_sale"
      metric_name = "AvailabilityWatchdogStayOnSale"
      description = "A confirmed, paid stay is bookable again on Smoobu itself."
    }
    reopened_under_confirmed_booking = {
      event       = "availability_reopened_under_confirmed_booking"
      metric_name = "AvailabilityReopenedUnderConfirmedBooking"
      description = "Post-confirmation verification found the stay's dates still on sale."
    }
    promotion_dates_unblocked = {
      event       = "smoobu_promotion_dates_unblocked"
      metric_name = "SmoobuPromotionDatesUnblocked"
      description = "Promotion deleted the block, failed to create the reservation, and failed to re-block."
    }
    channel_reservation_conflict = {
      event       = "smoobu_webhook_reservation_conflicts_with_hold"
      metric_name = "ChannelReservationConflictsWithHold"
      description = "An inbound channel reservation overlaps dates we have already sold."
    }
    promotion_exposure_exceeded = {
      event       = "smoobu_promotion_inventory_exposure_exceeded"
      metric_name = "SmoobuPromotionInventoryExposureExceeded"
      description = "The delete-then-create window during promotion ran longer than expected."
    }
  }

  # These events can be emitted from any of the three runtimes, and which one
  # depends on routing we do not want this alarm to depend on. Filter all of
  # them into the same metric so the alarm fires wherever the event lands.
  availability_alert_log_groups = {
    api      = aws_cloudwatch_log_group.booking_api.name
    webhooks = aws_cloudwatch_log_group.webhooks.name
    watchdog = aws_cloudwatch_log_group.availability_watchdog.name
  }

  availability_alert_filters = {
    for pair in setproduct(keys(local.availability_alert_events), keys(local.availability_alert_log_groups)) :
    "${pair[0]}-${pair[1]}" => {
      event       = local.availability_alert_events[pair[0]].event
      metric_name = local.availability_alert_events[pair[0]].metric_name
      log_group   = local.availability_alert_log_groups[pair[1]]
    }
  }
}

resource "aws_cloudwatch_log_metric_filter" "availability_alerts" {
  for_each = local.availability_alert_filters

  name           = "${var.project}-${var.environment}-availability-${each.key}"
  log_group_name = each.value.log_group
  pattern        = "{ $.eventType = \"${each.value.event}\" }"

  metric_transformation {
    namespace     = local.booking_metric_namespace
    name          = each.value.metric_name
    value         = "1"
    unit          = "Count"
    default_value = "0"
  }
}

resource "aws_cloudwatch_metric_alarm" "availability_alerts" {
  for_each = local.availability_alert_events

  alarm_name          = "${var.project}-${var.environment}-availability-${each.key}"
  alarm_description   = "${each.value.description} Inventory that is already sold may be purchasable — check Smoobu and the Booking.com/Airbnb calendars for the dates in the log entry."
  namespace           = local.booking_metric_namespace
  metric_name         = each.value.metric_name
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 0
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"

  alarm_actions = local.cloudwatch_alarm_actions
  ok_actions    = local.cloudwatch_alarm_actions

  depends_on = [aws_cloudwatch_log_metric_filter.availability_alerts]

  tags = {
    Name = "${var.project}-${var.environment}-availability-${each.key}"
  }
}

##############################################################################
# Output — consumed by .github/workflows/deploy-backend.yml so CI uploads the
# real compiled handler over the placeholder zip, like the other workers.
##############################################################################

output "availability_watchdog_lambda_name" {
  description = "Name of the availability watchdog Lambda function."
  value       = aws_lambda_function.availability_watchdog.function_name
}
