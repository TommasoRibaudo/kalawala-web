##############################################################################
# main.tf — AWS provider configuration and remote state backend
#
# Environments are separated via .tfvars files in environments/.
# Run:
#   terraform init
#   terraform plan  -var-file=environments/dev.tfvars
#   terraform apply -var-file=environments/dev.tfvars
##############################################################################

terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }

  # ---------------------------------------------------------------------------
  # Remote state backend: S3 bucket for state file + DynamoDB table for locking.
  #
  # Bootstrap before first init:
  #   aws s3api create-bucket \
  #     --bucket kalawala-tfstate-<account-id> \
  #     --region us-east-1 \
  #     --create-bucket-configuration LocationConstraint=us-east-1
  #   aws s3api put-bucket-versioning \
  #     --bucket kalawala-tfstate-<account-id> \
  #     --versioning-configuration Status=Enabled
  #   aws s3api put-bucket-encryption \
  #     --bucket kalawala-tfstate-<account-id> \
  #     --server-side-encryption-configuration \
  #       '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'
  #   aws dynamodb create-table \
  #     --table-name kalawala-tfstate-lock \
  #     --attribute-definitions AttributeName=LockID,AttributeType=S \
  #     --key-schema AttributeName=LockID,KeyType=HASH \
  #     --billing-mode PAY_PER_REQUEST \
  #     --region us-east-1
  # ---------------------------------------------------------------------------
  backend "s3" {
    # Override bucket/key/region with -backend-config flags or a backend.hcl
    # file when running across environments so a single state file is never
    # shared between dev/staging/prod.
    #
    # Example backend.hcl (not committed — differs per environment):
    #   bucket         = "kalawala-tfstate-<account-id>"
    #   key            = "kalawala/dev/terraform.tfstate"
    #   region         = "us-east-1"
    #   dynamodb_table = "kalawala-tfstate-lock"
    #   encrypt        = true
  }
}

##############################################################################
# AWS provider
##############################################################################

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "kalawala"
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}
