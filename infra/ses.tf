##############################################################################
# ses.tf - SES domain identity and Lambda send-email permissions.
#
# SES supports the transactional booking messages defined in plan.md:
#   - PayPal booking confirmation
#   - Hold expiring reminders
#   - Manual deposit/contact handoff messages
#
# DNS records are optional because hosted DNS may live outside this AWS account.
# If var.ses_route53_zone_id is set, Terraform creates verification, DKIM, and
# MAIL FROM records automatically. Otherwise the output values are used for
# manual DNS setup.
##############################################################################

locals {
  ses_domain_name = coalesce(var.ses_domain_name, var.domain_name)
  ses_from_email  = coalesce(var.ses_from_email, "reservations@${local.ses_domain_name}")
  ses_mail_from   = "mail.${local.ses_domain_name}"
}

resource "aws_ses_domain_identity" "booking" {
  domain = local.ses_domain_name
}

resource "aws_ses_domain_dkim" "booking" {
  domain = aws_ses_domain_identity.booking.domain
}

resource "aws_ses_domain_mail_from" "booking" {
  domain           = aws_ses_domain_identity.booking.domain
  mail_from_domain = local.ses_mail_from

  behavior_on_mx_failure = "UseDefaultValue"
}

resource "aws_route53_record" "ses_verification" {
  count = var.ses_route53_zone_id != null ? 1 : 0

  zone_id = var.ses_route53_zone_id
  name    = "_amazonses.${local.ses_domain_name}"
  type    = "TXT"
  ttl     = 600
  records = [aws_ses_domain_identity.booking.verification_token]
}

resource "aws_route53_record" "ses_dkim" {
  count = var.ses_route53_zone_id != null ? 3 : 0

  zone_id = var.ses_route53_zone_id
  name    = "${aws_ses_domain_dkim.booking.dkim_tokens[count.index]}._domainkey.${local.ses_domain_name}"
  type    = "CNAME"
  ttl     = 600
  records = ["${aws_ses_domain_dkim.booking.dkim_tokens[count.index]}.dkim.amazonses.com"]
}

resource "aws_route53_record" "ses_mail_from_mx" {
  count = var.ses_route53_zone_id != null ? 1 : 0

  zone_id = var.ses_route53_zone_id
  name    = local.ses_mail_from
  type    = "MX"
  ttl     = 600
  records = ["10 feedback-smtp.${var.aws_region}.amazonses.com"]
}

resource "aws_route53_record" "ses_mail_from_txt" {
  count = var.ses_route53_zone_id != null ? 1 : 0

  zone_id = var.ses_route53_zone_id
  name    = local.ses_mail_from
  type    = "TXT"
  ttl     = 600
  records = ["v=spf1 include:amazonses.com -all"]
}

resource "aws_ses_configuration_set" "booking" {
  name = "${var.project}-${var.environment}-booking-email"
}

data "aws_iam_policy_document" "lambda_ses_send" {
  statement {
    sid    = "AllowSendBookingEmail"
    effect = "Allow"

    actions = [
      "ses:SendEmail",
      "ses:SendRawEmail",
    ]

    resources = [aws_ses_domain_identity.booking.arn]

    condition {
      test     = "StringEquals"
      variable = "ses:FromAddress"
      values   = [local.ses_from_email]
    }
  }
}

resource "aws_iam_policy" "lambda_ses_send" {
  name        = "${var.project}-${var.environment}-lambda-ses-send"
  description = "Allows booking Lambda functions to send transactional email through SES."
  policy      = data.aws_iam_policy_document.lambda_ses_send.json

  tags = {
    Name = "${var.project}-${var.environment}-lambda-ses-send-policy"
  }
}

resource "aws_iam_role_policy_attachment" "lambda_ses_send" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_ses_send.arn
}
