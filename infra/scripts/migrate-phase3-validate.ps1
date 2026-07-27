#!/usr/bin/env pwsh
# migrate-phase3-validate.ps1
# Phase 3: Validate the us-east-2 environment before DNS cutover.
# Run from the repo root: .\infra\scripts\migrate-phase3-validate.ps1

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Set-Location infra

$NEW_API = (terraform output -raw api_gateway_invoke_url)
$MONTH   = Get-Date -Format "yyyy-MM"

Write-Host "==> Validating us-east-2 environment"
Write-Host "    API URL: $NEW_API"
Write-Host ""

# ---------------------------------------------------------------------------
# Test 1: Calendar endpoint
# ---------------------------------------------------------------------------

Write-Host "==> Test 1: Calendar endpoint (GET /api/calendar/Geco?month=$MONTH)..."
try {
    $resp = Invoke-RestMethod -Uri "$NEW_API/api/calendar/Geco?month=$MONTH" -Method GET
    Write-Host "    Status: OK"
    Write-Host "    Cache:  $($resp.cache | ConvertTo-Json -Compress)"
    Write-Host "    Days:   $($resp.days.Count) days returned"
} catch {
    Write-Warning "    FAILED: $_"
}

# ---------------------------------------------------------------------------
# Test 2: fck-nat ASG health
# ---------------------------------------------------------------------------

Write-Host ""
Write-Host "==> Test 2: fck-nat ASG health..."
$asg = aws autoscaling describe-auto-scaling-groups `
    --auto-scaling-group-names kalawala-staging-fck-nat `
    --region us-east-2 `
    --query 'AutoScalingGroups[0].Instances[*].{ID:InstanceId,Health:HealthStatus,State:LifecycleState}' `
    --output json | ConvertFrom-Json
if ($asg.Count -eq 0) {
    Write-Warning "    No instances found in fck-nat ASG. Check the ASG in the AWS console."
} else {
    foreach ($inst in $asg) {
        if ($inst.Health -eq "Healthy" -and $inst.State -eq "InService") {
            $status = "OK"
        } else {
            $status = "PROBLEM"
        }
        Write-Host "    [$status] Instance $($inst.ID) - Health: $($inst.Health), State: $($inst.State)"
    }
}

# ---------------------------------------------------------------------------
# Test 3: (removed) SSM parameter exports under /shared-infra/
#
# ssm.tf existed only to publish VPC/RDS details to the Wavis project. Wavis is
# no longer sharing this infrastructure, so there are no exports to validate.
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# Test 4: SES sandbox check
# ---------------------------------------------------------------------------

Write-Host ""
Write-Host "==> Test 4: SES sending enabled in us-east-2..."
$sesSending = aws ses get-account-sending-enabled --region us-east-2 --query "Enabled" --output text
if ($sesSending -eq "True") {
    Write-Host "    OK - SES is out of sandbox in us-east-2."
} else {
    Write-Warning "    SES is still in sandbox in us-east-2. Do NOT cut over DNS until SES production access is approved."
}

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------

Write-Host ""
Write-Host "==> Validation complete. Review any warnings above."
Write-Host "    If all checks passed: run a 24-hour parallel observation period,"
Write-Host "    then update DNS to point to: $NEW_API"
Write-Host ""
Write-Host "After DNS cutover + 24h clean operation, run:"
Write-Host "    .\infra\scripts\migrate-phase6-destroy-us-east-1.ps1"

Set-Location ..
