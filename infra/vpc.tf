##############################################################################
# vpc.tf — VPC, subnets, internet gateway, NAT gateway, route tables,
#          and security groups for Lambda / RDS / ElastiCache.
##############################################################################

##############################################################################
# VPC
##############################################################################

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true # Required for RDS endpoint hostname resolution.

  tags = {
    Name = "${var.project}-${var.environment}-vpc"
  }
}

##############################################################################
# Internet gateway (public-subnet egress / ingress)
##############################################################################

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project}-${var.environment}-igw"
  }
}

##############################################################################
# Subnets
##############################################################################

# Public subnets — one per AZ.
# Used for: NAT gateway, future ALB/CloudFront origin if needed.
# Instances launched here get public IPs; Lambda runs in private subnets.
resource "aws_subnet" "public" {
  count = length(var.availability_zones)

  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.project}-${var.environment}-public-${count.index + 1}"
    Tier = "public"
  }
}

# Private subnets — one per AZ.
# Used for: Lambda functions, RDS, ElastiCache.
# No direct inbound from internet; outbound via NAT gateway.
resource "aws_subnet" "private" {
  count = length(var.availability_zones)

  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "${var.project}-${var.environment}-private-${count.index + 1}"
    Tier = "private"
  }
}

##############################################################################
# NAT gateway (single instance in first public subnet)
#
# A single NAT gateway is sufficient for dev/staging and keeps costs low.
# For production HA: provision one NAT GW per AZ and one private route table
# per AZ, each pointing at the local AZ's NAT gateway.
##############################################################################

resource "aws_eip" "nat" {
  domain = "vpc"

  # EIP must be requested after the IGW is attached so AWS can route it.
  depends_on = [aws_internet_gateway.main]

  tags = {
    Name = "${var.project}-${var.environment}-nat-eip"
  }
}

resource "aws_nat_gateway" "main" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public[0].id

  depends_on = [aws_internet_gateway.main]

  tags = {
    Name = "${var.project}-${var.environment}-natgw"
  }
}

##############################################################################
# Route tables
##############################################################################

# Public route table: default route → internet gateway.
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "${var.project}-${var.environment}-rt-public"
  }
}

# Private route table: default route → NAT gateway.
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main.id
  }

  tags = {
    Name = "${var.project}-${var.environment}-rt-private"
  }
}

# Associate each public subnet with the public route table.
resource "aws_route_table_association" "public" {
  count = length(aws_subnet.public)

  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# Associate each private subnet with the private route table.
resource "aws_route_table_association" "private" {
  count = length(aws_subnet.private)

  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private.id
}

##############################################################################
# Security groups
##############################################################################

# ---------------------------------------------------------------------------
# Lambda security group
#
# Inbound: no rules — API Gateway invokes Lambda via IAM, not over the
#          network directly (HTTP API + Lambda integration uses AWS internal
#          routing, not VPC ingress). HTTPS from the public internet never
#          reaches the Lambda SG inbound.
# Outbound: unrestricted — Lambda must reach:
#   • Smoobu REST API (api.smoobu.com, HTTPS/443)
#   • PayPal REST API (api.paypal.com, HTTPS/443)
#   • AWS services (Secrets Manager, SES, CloudWatch) via VPC endpoints or NAT
# ---------------------------------------------------------------------------
resource "aws_security_group" "lambda" {
  name_prefix = "${var.project}-${var.environment}-lambda-"
  description = "Booking API Lambda functions: outbound-only to internet + AWS services."
  vpc_id      = aws_vpc.main.id

  egress {
    description = "Allow all outbound (Smoobu, PayPal, AWS APIs)."
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project}-${var.environment}-sg-lambda"
  }

  lifecycle {
    create_before_destroy = true
  }
}

# ---------------------------------------------------------------------------
# RDS security group
#
# Inbound:  PostgreSQL (5432) from Lambda SG only.
# Outbound: none needed (RDS never initiates connections).
# ---------------------------------------------------------------------------
resource "aws_security_group" "rds" {
  name_prefix = "${var.project}-${var.environment}-rds-"
  description = "RDS PostgreSQL: accept connections from Lambda SG only."
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "PostgreSQL from Lambda."
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.lambda.id]
  }

  tags = {
    Name = "${var.project}-${var.environment}-sg-rds"
  }

  lifecycle {
    create_before_destroy = true
  }
}

# ---------------------------------------------------------------------------
# ElastiCache security group
#
# Inbound:  Redis (6379) from Lambda SG only.
# Outbound: none needed (ElastiCache never initiates connections).
# ---------------------------------------------------------------------------
resource "aws_security_group" "elasticache" {
  name_prefix = "${var.project}-${var.environment}-elasticache-"
  description = "ElastiCache Redis: accept connections from Lambda SG only."
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "Redis from Lambda."
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    security_groups = [aws_security_group.lambda.id]
  }

  tags = {
    Name = "${var.project}-${var.environment}-sg-elasticache"
  }

  lifecycle {
    create_before_destroy = true
  }
}
