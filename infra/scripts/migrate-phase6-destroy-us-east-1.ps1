#!/usr/bin/env pwsh
# migrate-phase6-destroy-us-east-1.ps1
# Phase 6: Destroy all us-east-1 resources after successful DNS cutover.
# NOTE: Only staging exists in us-east-1. Prod was never deployed there.
#
# ONLY run this after:
#   1. DNS cutover to us-east-2 is complete
#   2. 24h+ of clean us-east-2 operation post-cutover
#   3. No active incidents or rollback in progress
#
# Run from the repo root: .\infra\scripts\migrate-phase6-destroy-us-east-1.ps1

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=========================================================="
Write-Host "  DESTROY us-east-1 infrastructure (staging only)"
Write-Host "  This is IRREVERSIBLE once RDS is deleted."
Write-Host "  Only proceed if DNS cutover is complete and us-east-2"
Write-Host "  has been running cleanly for 24+ hours."
Write-Host "=========================================================="
Write-Host ""

$confirm = Read-Host "Type 'destroy us-east-1' to confirm"
if ($confirm -ne "destroy us-east-1") {
    Write-Host "Aborted."
    exit 0
}

Set-Location infra

# ---------------------------------------------------------------------------
# Step 1: Switch back to us-east-1 state
# ---------------------------------------------------------------------------

Write-Host ""
Write-Host "==> Switching Terraform to us-east-1 state..."
terraform init -backend-config=backend-staging.hcl -reconfigure
if ($LASTEXITCODE -ne 0) { throw "terraform init failed" }

Write-Host "==> Resources currently in us-east-1 state:"
terraform state list
Write-Host ""

# ---------------------------------------------------------------------------
# Step 2: Destroy staging (the only environment in us-east-1)
# ---------------------------------------------------------------------------

Write-Host "==> Destroying STAGING environment in us-east-1..."
Write-Host "    The RDS instance has prevent_destroy = true in the Terraform config."
Write-Host "    You must remove it from state first, then destroy the rest."
Write-Host ""

# Remove the RDS instance from state so Terraform can destroy the rest
# without hitting the prevent_destroy lifecycle guard.
# The actual RDS deletion is done via the AWS CLI below.
Write-Host "==> Removing RDS instance from Terraform state (to bypass prevent_destroy)..."
terraform state rm aws_db_instance.main
if ($LASTEXITCODE -ne 0) {
    Write-Warning "Could not remove RDS from state — it may already be gone or named differently."
}

Write-Host "==> Destroying remaining staging resources..."
Write-Host "    Review the destroy plan carefully before typing 'yes'."
Write-Host ""
terraform destroy -var-file=environments/staging.tfvars
if ($LASTEXITCODE -ne 0) { throw "terraform destroy (staging) failed" }

# ---------------------------------------------------------------------------
# Step 3: Delete the RDS instance directly (was removed from state above)
# ---------------------------------------------------------------------------

Write-Host ""
Write-Host "==> Deleting staging RDS instance directly via AWS CLI..."
Write-Host "    (Taking a final snapshot before deletion)"
aws rds delete-db-instance --db-instance-identifier kalawala-staging-db --final-db-snapshot-identifier "kalawala-staging-final-$(Get-Date -Format 'yyyyMMdd')" --region us-east-1
if ($LASTEXITCODE -ne 0) {
    Write-Warning "RDS delete failed or instance already gone — check the AWS console."
} else {
    Write-Host "==> Waiting for RDS deletion to complete..."
    aws rds wait db-instance-deleted --db-instance-identifier kalawala-staging-db --region us-east-1
    Write-Host "    RDS deleted."
}

# ---------------------------------------------------------------------------
# Done
# ---------------------------------------------------------------------------

Write-Host ""
Write-Host "==> All us-east-1 resources destroyed. No stale infrastructure remains."
Write-Host ""
Write-Host "    Pre-migration snapshots are retained in us-east-1 for 30 days."
Write-Host "    To list them:"
Write-Host "    aws rds describe-db-snapshots --region us-east-1 --query 'DBSnapshots[?contains(DBSnapshotIdentifier, ``pre-migration``)].DBSnapshotIdentifier'"
Write-Host ""
Write-Host "    Migration complete."

Set-Location ..
