#!/usr/bin/env pwsh
# migrate-phase1-snapshots.ps1
# Phase 1: Create RDS snapshot for staging in us-east-1 and copy to us-east-2.
# NOTE: Prod RDS was never deployed in us-east-1, so only staging needs snapshotting.
# Run from the repo root: .\infra\scripts\migrate-phase1-snapshots.ps1

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$SNAP_DATE = Get-Date -Format "yyyyMMdd"
$ACCOUNT_ID = (aws sts get-caller-identity --query Account --output text)

Write-Host "Account ID : $ACCOUNT_ID"
Write-Host "Snapshot date suffix: $SNAP_DATE"
Write-Host ""

# ---------------------------------------------------------------------------
# Step 1: Create staging snapshot in us-east-1
# ---------------------------------------------------------------------------

Write-Host "==> Creating staging snapshot in us-east-1..."
aws rds create-db-snapshot --db-instance-identifier kalawala-staging-db --db-snapshot-identifier "kalawala-staging-pre-migration-$SNAP_DATE" --region us-east-1
if ($LASTEXITCODE -ne 0) { throw "Failed to create staging snapshot" }

Write-Host "==> Prod RDS does not exist in us-east-1 (never deployed) — skipping prod snapshot."

# ---------------------------------------------------------------------------
# Step 2: Wait for staging snapshot to complete
# ---------------------------------------------------------------------------

Write-Host "==> Waiting for staging snapshot to complete (this can take 5-15 min)..."
aws rds wait db-snapshot-completed --db-snapshot-identifier "kalawala-staging-pre-migration-$SNAP_DATE" --region us-east-1
if ($LASTEXITCODE -ne 0) { throw "Staging snapshot wait failed" }
Write-Host "    Staging snapshot ready."

# ---------------------------------------------------------------------------
# Step 3: Copy staging snapshot to us-east-2
# ---------------------------------------------------------------------------

Write-Host "==> Copying staging snapshot to us-east-2..."
aws rds copy-db-snapshot --source-db-snapshot-identifier "arn:aws:rds:us-east-1:${ACCOUNT_ID}:snapshot:kalawala-staging-pre-migration-$SNAP_DATE" --target-db-snapshot-identifier kalawala-staging-from-us-east-1 --source-region us-east-1 --region us-east-2
if ($LASTEXITCODE -ne 0) { throw "Failed to copy staging snapshot" }

# ---------------------------------------------------------------------------
# Step 4: Wait for copy to complete in us-east-2
# ---------------------------------------------------------------------------

Write-Host "==> Waiting for staging snapshot copy in us-east-2 (this can take 10-20 min)..."
aws rds wait db-snapshot-completed --db-snapshot-identifier kalawala-staging-from-us-east-1 --region us-east-2
if ($LASTEXITCODE -ne 0) { throw "Staging snapshot copy wait failed" }
Write-Host "    Staging copy ready."

# ---------------------------------------------------------------------------
# Done
# ---------------------------------------------------------------------------

Write-Host ""
Write-Host "==> Phase 1 complete."
Write-Host "    Staging snapshot ARN: arn:aws:rds:us-east-2:${ACCOUNT_ID}:snapshot:kalawala-staging-from-us-east-1"
Write-Host "    Prod: no snapshot needed (prod was never deployed in us-east-1)"
Write-Host ""
Write-Host "Next: run .`\infra`\scripts`\migrate-phase2-provision.ps1"
