##############################################################################
# outputs.tf — Key resource references exposed after terraform apply.
#
# These are consumed by CI/CD pipelines, application config, and the
# booking-api Lambda environment variables.
#
# Outputs for not-yet-provisioned resources (RDS, API Gateway, ElastiCache,
# Secrets Manager, CloudWatch) are added incrementally as each task lands:
#   Task 2.7 → RDS outputs
#   Task 2.8 → API Gateway outputs
#   Task 2.10 → ElastiCache, Secrets Manager, CloudWatch outputs
##############################################################################

# ---------------------------------------------------------------------------
# Networking  (task 2.6)
# ---------------------------------------------------------------------------

output "vpc_id" {
  description = "ID of the VPC created for the booking engine."
  value       = aws_vpc.main.id
}

output "private_subnet_ids" {
  description = "IDs of the private subnets (Lambda, RDS, ElastiCache)."
  value       = aws_subnet.private[*].id
}

output "public_subnet_ids" {
  description = "IDs of the public subnets (NAT gateway)."
  value       = aws_subnet.public[*].id
}

output "nat_gateway_public_ip" {
  description = "Public IP of the NAT gateway (add to Smoobu/PayPal IP allowlists)."
  value       = aws_eip.nat.public_ip
}

output "sg_lambda_id" {
  description = "Security group ID assigned to booking API Lambda functions."
  value       = aws_security_group.lambda.id
}

output "sg_rds_id" {
  description = "Security group ID assigned to the RDS instance."
  value       = aws_security_group.rds.id
}

output "sg_elasticache_id" {
  description = "Security group ID assigned to the ElastiCache Redis cluster."
  value       = aws_security_group.elasticache.id
}

# ---------------------------------------------------------------------------
# Database  (task 2.7)
# ---------------------------------------------------------------------------

output "db_instance_id" {
  description = "RDS instance identifier."
  value       = aws_db_instance.main.id
}

output "db_endpoint" {
  description = "RDS instance endpoint (host:port). Used as the DB_HOST env var for Lambda."
  value       = aws_db_instance.main.endpoint
  sensitive   = true
}

output "db_address" {
  description = "RDS instance hostname (without port)."
  value       = aws_db_instance.main.address
  sensitive   = true
}

output "db_port" {
  description = "RDS instance port (always 5432 for PostgreSQL)."
  value       = aws_db_instance.main.port
}

output "db_name" {
  description = "Name of the initial database created inside the RDS instance."
  value       = aws_db_instance.main.db_name
}

output "db_secret_arn" {
  description = "ARN of the Secrets Manager secret holding the RDS master credentials."
  value       = aws_secretsmanager_secret.db.arn
  sensitive   = true
}

output "db_secret_read_policy_arn" {
  description = "ARN of the IAM policy that grants read access to the DB secret. Attached to the Lambda execution role."
  value       = aws_iam_policy.db_secret_read.arn
}

# ---------------------------------------------------------------------------
# Lambda  (task 2.8)
# ---------------------------------------------------------------------------

output "booking_api_lambda_arn" {
  description = "ARN of the booking_api Lambda function."
  value       = aws_lambda_function.booking_api.arn
}

output "booking_api_lambda_name" {
  description = "Name of the booking_api Lambda function (used by CI/CD for update-function-code)."
  value       = aws_lambda_function.booking_api.function_name
}

output "webhooks_lambda_arn" {
  description = "ARN of the webhooks Lambda function."
  value       = aws_lambda_function.webhooks.arn
}

output "webhooks_lambda_name" {
  description = "Name of the webhooks Lambda function (used by CI/CD for update-function-code)."
  value       = aws_lambda_function.webhooks.function_name
}

output "lambda_execution_role_arn" {
  description = "ARN of the shared Lambda execution IAM role."
  value       = aws_iam_role.lambda_exec.arn
}

# ---------------------------------------------------------------------------
# API Gateway  (task 2.8)
# ---------------------------------------------------------------------------

output "api_gateway_id" {
  description = "ID of the REST API."
  value       = aws_api_gateway_rest_api.main.id
}

output "api_gateway_invoke_url" {
  description = "Base invocation URL for the booking API stage (e.g. https://{id}.execute-api.{region}.amazonaws.com/{stage})."
  value       = aws_api_gateway_stage.main.invoke_url
}

output "api_gateway_stage_arn" {
  description = "ARN of the API Gateway stage (used for WAF association and CloudWatch log subscriptions)."
  value       = aws_api_gateway_stage.main.arn
}

output "api_gateway_execution_arn" {
  description = "Execution ARN prefix for the API Gateway (used to build Lambda permission source_arn)."
  value       = aws_api_gateway_rest_api.main.execution_arn
}

# ---------------------------------------------------------------------------
# WAF  (task 2.8)
# ---------------------------------------------------------------------------

output "waf_web_acl_arn" {
  description = "ARN of the WAF WebACL protecting the booking API stage."
  value       = aws_wafv2_web_acl.booking_api.arn
}

output "waf_web_acl_id" {
  description = "ID of the WAF WebACL (used if the WebACL is later associated with a CloudFront distribution)."
  value       = aws_wafv2_web_acl.booking_api.id
}
