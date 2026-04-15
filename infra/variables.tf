##############################################################################
# variables.tf — All input variables for the Kalawala booking-engine infra.
#
# Values are provided via environment-specific .tfvars files in environments/.
# Sensitive defaults are intentionally omitted; they must be supplied at plan/
# apply time or stored in Secrets Manager (not hardcoded here).
##############################################################################

# ---------------------------------------------------------------------------
# Core / deployment context
# ---------------------------------------------------------------------------

variable "aws_region" {
  description = "AWS region to deploy all resources into."
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment: dev | staging | prod."
  type        = string

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "environment must be one of: dev, staging, prod."
  }
}

variable "project" {
  description = "Project name used as a prefix in resource names and tags."
  type        = string
  default     = "kalawala"
}

# ---------------------------------------------------------------------------
# Networking
# ---------------------------------------------------------------------------

variable "vpc_cidr" {
  description = "CIDR block for the VPC."
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "List of AZs to spread subnets across (≥ 2 for RDS Multi-AZ)."
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets (API Gateway, NAT gateway)."
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets (Lambda, RDS, ElastiCache)."
  type        = list(string)
  default     = ["10.0.11.0/24", "10.0.12.0/24"]
}

# ---------------------------------------------------------------------------
# Booking API
# ---------------------------------------------------------------------------

variable "booking_api_lambda_memory_mb" {
  description = "Memory (MB) allocated to each booking API Lambda function."
  type        = number
  default     = 256
}

variable "booking_api_lambda_timeout_seconds" {
  description = "Maximum execution time (seconds) for booking API Lambda functions."
  type        = number
  default     = 30
}

variable "booking_api_allowed_origins" {
  description = "Comma-separated list of allowed CORS origins for the booking API."
  type        = string
  default     = ""
}

variable "booking_api_log_level" {
  description = "Log level for the booking API (debug | info | warn | error | silent)."
  type        = string
  default     = "info"
}

# ---------------------------------------------------------------------------
# Domain / routing
# ---------------------------------------------------------------------------

variable "domain_name" {
  description = "Root domain name (e.g. kalawala.com). Used for API Gateway and SES."
  type        = string
}

variable "api_subdomain" {
  description = "Subdomain for the booking API (e.g. 'api' → api.kalawala.com)."
  type        = string
  default     = "api"
}

# ---------------------------------------------------------------------------
# Database (RDS PostgreSQL)
# ---------------------------------------------------------------------------

variable "db_instance_class" {
  description = "RDS instance class."
  type        = string
  default     = "db.t4g.micro"
}

variable "db_allocated_storage_gb" {
  description = "Initial allocated storage for the RDS instance (GB)."
  type        = number
  default     = 20
}

variable "db_max_allocated_storage_gb" {
  description = "Maximum storage autoscaling ceiling for the RDS instance (GB)."
  type        = number
  default     = 100
}

variable "db_name" {
  description = "Name of the initial database created in the RDS instance."
  type        = string
  default     = "kalawala_booking"
}

variable "db_username" {
  description = "Master username for the RDS instance."
  type        = string
  default     = "kalawala_admin"
}

variable "db_multi_az" {
  description = "Enable Multi-AZ deployment for the RDS instance."
  type        = bool
  default     = false
}

variable "db_backup_retention_days" {
  description = "Number of days to retain automated RDS backups (0 disables backups)."
  type        = number
  default     = 7
}

# ---------------------------------------------------------------------------
# Cache (ElastiCache Redis)
# ---------------------------------------------------------------------------

variable "redis_node_type" {
  description = "ElastiCache node type for the Redis cluster."
  type        = string
  default     = "cache.t4g.micro"
}

variable "redis_num_cache_nodes" {
  description = "Number of cache nodes in the Redis cluster."
  type        = number
  default     = 1
}

# ---------------------------------------------------------------------------
# WAF / rate limiting
# ---------------------------------------------------------------------------

variable "waf_rate_limit_per_5min" {
  description = "Maximum number of requests per 5-minute window per IP before WAF blocks."
  type        = number
  default     = 500
}

# ---------------------------------------------------------------------------
# Secrets Manager — secret name prefixes
# (Actual secret values are never stored here; they are injected via AWS
#  Secrets Manager after infrastructure is provisioned.)
# ---------------------------------------------------------------------------

variable "smoobu_secret_name" {
  description = "AWS Secrets Manager secret name that holds the Smoobu API credentials."
  type        = string
  default     = "kalawala/smoobu"
}

variable "paypal_secret_name" {
  description = "AWS Secrets Manager secret name that holds the PayPal API credentials."
  type        = string
  default     = "kalawala/paypal"
}

variable "db_secret_name" {
  description = "AWS Secrets Manager secret name that holds the RDS master credentials."
  type        = string
  default     = "kalawala/db"
}

variable "webhook_secret_name" {
  description = "AWS Secrets Manager secret name that holds webhook HMAC signing secrets."
  type        = string
  default     = "kalawala/webhooks"
}

variable "encryption_secret_name" {
  description = "AWS Secrets Manager secret name that holds the field-level encryption key."
  type        = string
  default     = "kalawala/encryption"
}
