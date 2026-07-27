#!/usr/bin/env pwsh
# migrate-phase2-provision.ps1
# Phase 2: Provision fresh us-east-2 infrastructure.
# Run from the repo root: .\infra\scripts\migrate-phase2-provision.ps1

$ErrorActionPreference = "Stop"

$ACCOUNT_ID = (aws sts get-caller-identity --query Account --output text)
$STAGING_SNAPSHOT_ARN = "arn:aws:rds:us-east-2:${ACCOUNT_ID}:snapshot:kalawala-staging-from-us-east-1"
$infraDir = Resolve-Path (Join-Path $PSScriptRoot "..")

Write-Host "Account ID: $ACCOUNT_ID"
Write-Host "Staging snapshot: $STAGING_SNAPSHOT_ARN"
Write-Host "Infra dir: $infraDir"
Write-Host ""

# Step 1: Init with us-east-2 backend
Write-Host "==> Initialising Terraform with us-east-2 backend..."
terraform -chdir="$infraDir" init "-backend-config=backend-us-east-2.hcl" -reconfigure
if ($LASTEXITCODE -ne 0) { throw "terraform init failed" }

# Step 2: Apply staging (restore RDS from snapshot)
Write-Host ""
Write-Host "==> Applying STAGING in us-east-2 (RDS restored from snapshot)..."
Write-Host "    Review the plan, then type yes to apply."
Write-Host ""
terraform -chdir="$infraDir" apply "-var-file=environments/staging.tfvars" "-var=db_snapshot_identifier=$STAGING_SNAPSHOT_ARN"
if ($LASTEXITCODE -ne 0) { throw "terraform apply staging failed" }

# Step 3: Apply prod (fresh, no snapshot)
Write-Host ""
Write-Host "==> Applying PROD in us-east-2 (fresh deployment)..."
Write-Host "    Review the plan, then type yes to apply."
Write-Host ""
terraform -chdir="$infraDir" apply "-var-file=environments/prod.tfvars"
if ($LASTEXITCODE -ne 0) { throw "terraform apply prod failed" }

# Step 4: Print outputs
Write-Host ""
Write-Host "==> Done. SES verification token:"
terraform -chdir="$infraDir" output ses_domain_verification_token
Write-Host ""
Write-Host "==> SES DKIM tokens:"
terraform -chdir="$infraDir" output ses_dkim_tokens
Write-Host ""
Write-Host "==> New API Gateway URL:"
terraform -chdir="$infraDir" output api_gateway_invoke_url
Write-Host ""
Write-Host "Next: add DNS records, wait for SES verification, then run:"
Write-Host "    .\infra\scripts\migrate-phase3-validate.ps1"
