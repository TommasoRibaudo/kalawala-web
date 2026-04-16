##############################################################################
# lambda.tf — IAM execution role, placeholder code archives, and Lambda
#             function definitions for the Kalawala booking API.
#
# Two Lambda functions:
#   booking_api  — handles all booking flows (availability, holds, PayPal
#                  orders/captures, deposit handoff, portal). Runs in VPC
#                  private subnets for direct access to RDS + ElastiCache.
#   webhooks     — receives Smoobu and PayPal webhook events. Isolated from
#                  the booking flow so misbehaving webhook processing cannot
#                  affect the main booking path.
#
# Both functions use placeholder handlers here; real business logic is
# deployed via CI/CD (`aws lambda update-function-code`) in task 3.x
# without modifying this Terraform file.
##############################################################################

##############################################################################
# Data sources
##############################################################################

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

##############################################################################
# IAM — Lambda execution role
##############################################################################

data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    sid     = "AllowLambdaAssumeRole"
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda_exec" {
  name               = "${var.project}-${var.environment}-lambda-exec"
  description        = "Execution role shared by Kalawala booking API Lambda functions."
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json

  tags = {
    Name = "${var.project}-${var.environment}-lambda-exec-role"
  }
}

# Write logs to CloudWatch Logs.
resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Create/describe/delete ENIs — required for VPC-attached Lambda functions.
resource "aws_iam_role_policy_attachment" "lambda_vpc_access" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

# Attach the DB secret read policy created in database.tf.
resource "aws_iam_role_policy_attachment" "lambda_db_secret_read" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.db_secret_read.arn
}

# Read Smoobu, PayPal, webhook HMAC, and encryption secrets from Secrets Manager.
# The DB secret is already covered by the db_secret_read attachment above.
# The wildcard suffix (*) accommodates the 6-character random suffix that
# Secrets Manager appends to the secret ARN at creation time.
data "aws_iam_policy_document" "lambda_secrets_read" {
  statement {
    sid    = "AllowReadBookingSecrets"
    effect = "Allow"

    actions = [
      "secretsmanager:GetSecretValue",
      "secretsmanager:DescribeSecret",
    ]

    resources = [
      "arn:aws:secretsmanager:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:secret:${var.smoobu_secret_name}*",
      "arn:aws:secretsmanager:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:secret:${var.paypal_secret_name}*",
      "arn:aws:secretsmanager:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:secret:${var.redis_secret_name}*",
      "arn:aws:secretsmanager:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:secret:${var.webhook_secret_name}*",
      "arn:aws:secretsmanager:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:secret:${var.encryption_secret_name}*",
    ]
  }
}

resource "aws_iam_policy" "lambda_secrets_read" {
  name        = "${var.project}-${var.environment}-lambda-secrets-read"
  description = "Allows Lambda functions to read Smoobu, PayPal, webhook, and encryption secrets."
  policy      = data.aws_iam_policy_document.lambda_secrets_read.json

  tags = {
    Name = "${var.project}-${var.environment}-lambda-secrets-read-policy"
  }
}

resource "aws_iam_role_policy_attachment" "lambda_secrets_read" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_secrets_read.arn
}

##############################################################################
# Placeholder Lambda code archives
#
# archive_file zips the placeholder handler so Terraform can manage the
# function without a separate build pipeline.  CI/CD replaces the deployed
# code via `aws lambda update-function-code` once the real backend is ready.
# The generated .zip files are gitignored (see infra/.gitignore).
##############################################################################

data "archive_file" "booking_api_placeholder" {
  type        = "zip"
  source_dir  = "${path.module}/lambda/booking_api"
  output_path = "${path.module}/lambda/booking_api.zip"
}

data "archive_file" "webhooks_placeholder" {
  type        = "zip"
  source_dir  = "${path.module}/lambda/webhooks"
  output_path = "${path.module}/lambda/webhooks.zip"
}

##############################################################################
# CloudWatch log groups
#
# Pre-creating log groups sets retention explicitly and prevents the first
# Lambda invocation from racing against auto-created groups that have no
# retention policy (logs would accumulate indefinitely).
##############################################################################

resource "aws_cloudwatch_log_group" "booking_api" {
  name              = "/aws/lambda/${var.project}-${var.environment}-booking-api"
  retention_in_days = local.cloudwatch_log_retention_days

  tags = {
    Name = "${var.project}-${var.environment}-booking-api-logs"
  }
}

resource "aws_cloudwatch_log_group" "webhooks" {
  name              = "/aws/lambda/${var.project}-${var.environment}-webhooks"
  retention_in_days = local.cloudwatch_log_retention_days

  tags = {
    Name = "${var.project}-${var.environment}-webhooks-logs"
  }
}

##############################################################################
# Shared Lambda environment variables
##############################################################################

locals {
  lambda_common_env = {
    ENVIRONMENT       = var.environment
    LOG_LEVEL         = var.booking_api_log_level
    DB_SECRET_NAME    = var.db_secret_name
    SMOOBU_SECRET     = var.smoobu_secret_name
    PAYPAL_SECRET     = var.paypal_secret_name
    REDIS_HOST        = aws_elasticache_replication_group.cache.primary_endpoint_address
    REDIS_PORT        = tostring(aws_elasticache_replication_group.cache.port)
    REDIS_SECRET_NAME = var.redis_secret_name
    SES_CONFIG_SET    = aws_ses_configuration_set.booking.name
    SES_FROM_EMAIL    = local.ses_from_email
    WEBHOOK_SECRET    = var.webhook_secret_name
    ENCRYPTION_SECRET = var.encryption_secret_name
  }
}

##############################################################################
# booking_api Lambda
#
# Handles: POST /api/availability/quote, GET /api/calendar/{slug},
#          POST /api/bookings/hold, POST /api/bookings/{id}/paypal/*,
#          GET /api/deposit-handoff, portal routes.
# VPC placement: private subnets → can reach RDS and ElastiCache directly.
##############################################################################

resource "aws_lambda_function" "booking_api" {
  function_name = "${var.project}-${var.environment}-booking-api"
  description   = "Kalawala booking API: availability, holds, payments, portal."

  runtime       = "nodejs22.x"
  handler       = "index.handler"
  architectures = ["arm64"] # Graviton2 — ~20% cheaper and faster than x86_64.

  role = aws_iam_role.lambda_exec.arn

  filename         = data.archive_file.booking_api_placeholder.output_path
  source_code_hash = data.archive_file.booking_api_placeholder.output_base64sha256

  memory_size = var.booking_api_lambda_memory_mb
  timeout     = var.booking_api_lambda_timeout_seconds

  # Private VPC subnets — allows direct connections to RDS and ElastiCache.
  # Outbound internet access (Smoobu API, PayPal API, Secrets Manager) routes
  # through the NAT gateway.
  vpc_config {
    subnet_ids         = aws_subnet.private[*].id
    security_group_ids = [aws_security_group.lambda.id]
  }

  environment {
    variables = merge(local.lambda_common_env, {
      ALLOWED_ORIGINS = var.booking_api_allowed_origins
    })
  }

  # Log group must exist before first invocation to set retention correctly.
  depends_on = [
    aws_cloudwatch_log_group.booking_api,
    aws_iam_role_policy_attachment.lambda_basic_execution,
    aws_iam_role_policy_attachment.lambda_vpc_access,
  ]

  tags = {
    Name = "${var.project}-${var.environment}-booking-api"
  }
}

##############################################################################
# webhooks Lambda
#
# Handles: POST /api/webhooks/smoobu, POST /api/webhooks/paypal.
# Isolated from booking_api to contain blast radius and allow independent
# scaling/deployment of the webhook ingestion path.
# Same VPC placement so it can write events directly to RDS.
##############################################################################

resource "aws_lambda_function" "webhooks" {
  function_name = "${var.project}-${var.environment}-webhooks"
  description   = "Kalawala webhook receiver: Smoobu and PayPal event ingestion."

  runtime       = "nodejs22.x"
  handler       = "index.handler"
  architectures = ["arm64"]

  role = aws_iam_role.lambda_exec.arn

  filename         = data.archive_file.webhooks_placeholder.output_path
  source_code_hash = data.archive_file.webhooks_placeholder.output_base64sha256

  # Webhook handlers must respond within the provider's retry timeout.
  # Both Smoobu and PayPal retry on non-2xx; a fast, simple response avoids
  # duplicate event delivery.
  memory_size = 256
  timeout     = 30

  vpc_config {
    subnet_ids         = aws_subnet.private[*].id
    security_group_ids = [aws_security_group.lambda.id]
  }

  environment {
    variables = local.lambda_common_env
  }

  depends_on = [
    aws_cloudwatch_log_group.webhooks,
    aws_iam_role_policy_attachment.lambda_basic_execution,
    aws_iam_role_policy_attachment.lambda_vpc_access,
  ]

  tags = {
    Name = "${var.project}-${var.environment}-webhooks"
  }
}

##############################################################################
# Lambda permissions — allow API Gateway to invoke each function
#
# source_arn restricts invocation to this specific API so other API Gateways
# (or the console test button using a different execution ARN) cannot invoke
# the functions without explicit permission.
##############################################################################

resource "aws_lambda_permission" "booking_api_apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.booking_api.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.main.execution_arn}/*/*"
}

resource "aws_lambda_permission" "webhooks_apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.webhooks.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.main.execution_arn}/*/*"
}


##############################################################################
# hold_expiry Lambda — scheduled worker
#
# Runs on a cron schedule (every 1 minute) via EventBridge to expire holds
# that have passed their `expiresAt` timestamp. For each expired hold:
#   1. Marks the hold as "expired" in the DB.
#   2. Cancels the corresponding Smoobu reservation (if one exists).
#   3. Marks the booking session as "hold_expired".
#
# Same VPC placement as booking_api so it can reach RDS and ElastiCache.
# Uses the shared execution role (same secrets and network access).
##############################################################################

data "archive_file" "hold_expiry_placeholder" {
  type        = "zip"
  source_dir  = "${path.module}/lambda/hold_expiry"
  output_path = "${path.module}/lambda/hold_expiry.zip"
}

resource "aws_cloudwatch_log_group" "hold_expiry" {
  name              = "/aws/lambda/${var.project}-${var.environment}-hold-expiry"
  retention_in_days = local.cloudwatch_log_retention_days

  tags = {
    Name = "${var.project}-${var.environment}-hold-expiry-logs"
  }
}

resource "aws_lambda_function" "hold_expiry" {
  function_name = "${var.project}-${var.environment}-hold-expiry"
  description   = "Kalawala hold expiry worker: expires stale holds and cancels Smoobu reservations."

  runtime       = "nodejs22.x"
  handler       = "index.handler"
  architectures = ["arm64"]

  role = aws_iam_role.lambda_exec.arn

  filename         = data.archive_file.hold_expiry_placeholder.output_path
  source_code_hash = data.archive_file.hold_expiry_placeholder.output_base64sha256

  memory_size = 256
  timeout     = 60

  vpc_config {
    subnet_ids         = aws_subnet.private[*].id
    security_group_ids = [aws_security_group.lambda.id]
  }

  environment {
    variables = local.lambda_common_env
  }

  depends_on = [
    aws_cloudwatch_log_group.hold_expiry,
    aws_iam_role_policy_attachment.lambda_basic_execution,
    aws_iam_role_policy_attachment.lambda_vpc_access,
  ]

  tags = {
    Name = "${var.project}-${var.environment}-hold-expiry"
  }
}

##############################################################################
# EventBridge schedule — triggers hold_expiry every 1 minute
##############################################################################

resource "aws_cloudwatch_event_rule" "hold_expiry_schedule" {
  name                = "${var.project}-${var.environment}-hold-expiry-schedule"
  description         = "Triggers the hold expiry worker every minute to clean up expired holds."
  schedule_expression = "rate(1 minute)"

  tags = {
    Name = "${var.project}-${var.environment}-hold-expiry-schedule"
  }
}

resource "aws_cloudwatch_event_target" "hold_expiry_target" {
  rule = aws_cloudwatch_event_rule.hold_expiry_schedule.name
  arn  = aws_lambda_function.hold_expiry.arn
}

resource "aws_lambda_permission" "hold_expiry_eventbridge" {
  statement_id  = "AllowEventBridgeInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.hold_expiry.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.hold_expiry_schedule.arn
}
