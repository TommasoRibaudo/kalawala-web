##############################################################################
# outputs.tf — Key resource references exposed after terraform apply.
#
# These are consumed by CI/CD pipelines, application config, and the
# booking-api Lambda environment variables.
##############################################################################

# ---------------------------------------------------------------------------
# Networking
# ---------------------------------------------------------------------------

output "vpc_id" {
  description = "ID of the VPC created for the booking engine."
  value       = module.vpc.vpc_id
}

output "private_subnet_ids" {
  description = "IDs of the private subnets (Lambda, RDS, ElastiCache)."
  value       = module.vpc.private_subnet_ids
}

output "public_subnet_ids" {
  description = "IDs of the public subnets (NAT gateway, load balancer)."
  value       = module.vpc.public_subnet_ids
}

# ---------------------------------------------------------------------------
# API Gateway / booking API
# ---------------------------------------------------------------------------

output "api_gateway_url" {
  description = "Base URL of the API Gateway HTTP API (e.g. https://abc.execute-api.us-east-1.amazonaws.com)."
  value       = module.api_gateway.api_endpoint
}

output "api_gateway_id" {
  description = "ID of the API Gateway HTTP API."
  value       = module.api_gateway.api_id
}

# ---------------------------------------------------------------------------
# Database
# ---------------------------------------------------------------------------

output "rds_endpoint" {
  description = "RDS PostgreSQL instance endpoint (host:port)."
  value       = module.database.endpoint
  sensitive   = true
}

output "rds_database_name" {
  description = "Name of the initial database on the RDS instance."
  value       = module.database.database_name
}

# ---------------------------------------------------------------------------
# Cache
# ---------------------------------------------------------------------------

output "redis_primary_endpoint" {
  description = "ElastiCache Redis primary endpoint address."
  value       = module.cache.primary_endpoint_address
  sensitive   = true
}

output "redis_port" {
  description = "ElastiCache Redis port."
  value       = module.cache.port
}

# ---------------------------------------------------------------------------
# Secrets Manager ARNs
# (ARNs are safe to expose; the actual secret values are not.)
# ---------------------------------------------------------------------------

output "smoobu_secret_arn" {
  description = "ARN of the Secrets Manager secret holding Smoobu API credentials."
  value       = module.secrets.smoobu_secret_arn
}

output "paypal_secret_arn" {
  description = "ARN of the Secrets Manager secret holding PayPal credentials."
  value       = module.secrets.paypal_secret_arn
}

output "db_secret_arn" {
  description = "ARN of the Secrets Manager secret holding RDS master credentials."
  value       = module.secrets.db_secret_arn
}

output "webhook_secret_arn" {
  description = "ARN of the Secrets Manager secret holding webhook HMAC signing secrets."
  value       = module.secrets.webhook_secret_arn
}

output "encryption_secret_arn" {
  description = "ARN of the Secrets Manager secret holding the field-level encryption key."
  value       = module.secrets.encryption_secret_arn
}

# ---------------------------------------------------------------------------
# CloudWatch
# ---------------------------------------------------------------------------

output "booking_api_log_group_name" {
  description = "CloudWatch log group name for the booking API Lambda functions."
  value       = module.cloudwatch.booking_api_log_group_name
}
