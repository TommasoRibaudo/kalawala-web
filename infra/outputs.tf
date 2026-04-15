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
