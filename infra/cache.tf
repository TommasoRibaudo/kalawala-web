##############################################################################
# cache.tf - ElastiCache Redis for short-lived availability/rates caching.
#
# Purpose:
#   - Cache Smoobu availability/search results for seconds.
#   - Cache calendar rates per (apartmentId, month) for 5-10 minutes.
#   - Support webhook-driven invalidation when Smoobu sends updateRates events.
#
# Security posture:
#   - Private subnets only.
#   - Security group allows Redis only from Lambda.
#   - Transit encryption + AUTH token.
#   - AUTH token stored in Secrets Manager, never in browser-facing config.
##############################################################################

resource "random_password" "redis_auth" {
  length  = 48
  special = false
}

resource "aws_secretsmanager_secret" "redis" {
  name        = var.redis_secret_name
  description = "Redis AUTH token and endpoint metadata for Kalawala booking cache (${var.environment})."

  recovery_window_in_days = var.environment == "prod" ? 30 : 7

  tags = {
    Name = "${var.project}-${var.environment}-redis-secret"
  }
}

resource "aws_elasticache_subnet_group" "redis" {
  name        = "${var.project}-${var.environment}-redis-subnet-group"
  description = "Private subnets for the Kalawala Redis cache."
  subnet_ids  = aws_subnet.private[*].id

  tags = {
    Name = "${var.project}-${var.environment}-redis-subnet-group"
  }
}

resource "aws_elasticache_parameter_group" "redis7" {
  name        = "${var.project}-${var.environment}-redis7"
  family      = "redis7"
  description = "Kalawala Redis 7 parameters for cache eviction behavior."

  parameter {
    name  = "maxmemory-policy"
    value = "allkeys-lru"
  }

  tags = {
    Name = "${var.project}-${var.environment}-redis7-params"
  }
}

resource "aws_elasticache_replication_group" "cache" {
  replication_group_id = "${var.project}-${var.environment}-cache"
  description          = "Kalawala booking availability and rates cache."

  engine         = "redis"
  engine_version = var.redis_engine_version
  node_type      = var.redis_node_type
  port           = 6379

  num_cache_clusters         = var.redis_num_cache_nodes
  automatic_failover_enabled = var.redis_num_cache_nodes > 1
  multi_az_enabled           = var.redis_num_cache_nodes > 1

  subnet_group_name    = aws_elasticache_subnet_group.redis.name
  security_group_ids   = [aws_security_group.elasticache.id]
  parameter_group_name = aws_elasticache_parameter_group.redis7.name

  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
  auth_token                 = random_password.redis_auth.result

  maintenance_window       = "sun:05:00-sun:06:00"
  snapshot_retention_limit = var.environment == "prod" ? 7 : 1
  snapshot_window          = "04:00-05:00"
  apply_immediately        = var.environment != "prod"

  log_delivery_configuration {
    destination      = aws_cloudwatch_log_group.redis_engine.name
    destination_type = "cloudwatch-logs"
    log_format       = "json"
    log_type         = "engine-log"
  }

  log_delivery_configuration {
    destination      = aws_cloudwatch_log_group.redis_slow.name
    destination_type = "cloudwatch-logs"
    log_format       = "json"
    log_type         = "slow-log"
  }

  tags = {
    Name = "${var.project}-${var.environment}-redis-cache"
  }
}

resource "aws_secretsmanager_secret_version" "redis" {
  secret_id = aws_secretsmanager_secret.redis.id

  secret_string = jsonencode({
    engine         = "redis"
    host           = aws_elasticache_replication_group.cache.primary_endpoint_address
    readerHost     = aws_elasticache_replication_group.cache.reader_endpoint_address
    port           = aws_elasticache_replication_group.cache.port
    transitTls     = true
    authToken      = random_password.redis_auth.result
    cacheKeyScopes = ["availability", "calendar-rates"]
  })
}
