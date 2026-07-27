#!/usr/bin/env pwsh
# migrate-phase2-import-iam.ps1
# Imports existing IAM resources (global, not region-scoped) into the new
# us-east-2 Terraform state so apply stops trying to recreate them.
# Run from the repo root: .\infra\scripts\migrate-phase2-import-iam.ps1

$ErrorActionPreference = "Stop"
$infraDir = Resolve-Path (Join-Path $PSScriptRoot "..")

Write-Host "==> Importing existing IAM resources into us-east-2 state..."
Write-Host "    (IAM is global — these already exist from the us-east-1 deployment)"
Write-Host ""

# IAM Roles
Write-Host "Importing aws_iam_role.api_gateway_cloudwatch..."
terraform -chdir="$infraDir" import "aws_iam_role.api_gateway_cloudwatch" "kalawala-staging-apigw-cloudwatch"
Write-Host ""

Write-Host "Importing aws_iam_role.lambda_exec..."
terraform -chdir="$infraDir" import "aws_iam_role.lambda_exec" "kalawala-staging-lambda-exec"
Write-Host ""

# IAM Policies (need ARN, not name)
$ACCOUNT_ID = (aws sts get-caller-identity --query Account --output text)

Write-Host "Importing aws_iam_policy.db_secret_read..."
terraform -chdir="$infraDir" import "aws_iam_policy.db_secret_read" "arn:aws:iam::${ACCOUNT_ID}:policy/kalawala-staging-db-secret-read"
Write-Host ""

Write-Host "Importing aws_iam_policy.lambda_secrets_read..."
terraform -chdir="$infraDir" import "aws_iam_policy.lambda_secrets_read" "arn:aws:iam::${ACCOUNT_ID}:policy/kalawala-staging-lambda-secrets-read"
Write-Host ""

Write-Host "Importing aws_iam_policy.lambda_ses_send..."
terraform -chdir="$infraDir" import "aws_iam_policy.lambda_ses_send" "arn:aws:iam::${ACCOUNT_ID}:policy/kalawala-staging-lambda-ses-send"
Write-Host ""

Write-Host "==> IAM imports complete."
Write-Host "    Now re-run: .\infra\scripts\migrate-phase2-provision.ps1"
