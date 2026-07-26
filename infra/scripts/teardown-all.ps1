$ErrorActionPreference = "Stop"
$infraDir = Resolve-Path (Join-Path $PSScriptRoot "..")

Write-Host ""
Write-Host "=========================================================="
Write-Host "  DESTROY ALL KALAWALA INFRASTRUCTURE (us-east-1 + us-east-2)"
Write-Host "  Secrets Manager secrets will be PRESERVED."
Write-Host "  This is IRREVERSIBLE for compute/network resources."
Write-Host "=========================================================="
Write-Host ""

$confirm = Read-Host "Type 'destroy everything' to confirm"
if ($confirm -ne "destroy everything") {
    Write-Host "Aborted."
    exit 0
}

function Remove-ProtectedResources {
    param($dir, $varfile)
    Write-Host "    Removing prevent_destroy resources from state..."
    terraform -chdir="$dir" state rm aws_vpc.main 2>$null
    terraform -chdir="$dir" state rm aws_db_instance.main 2>$null
    Write-Host "    Removing secrets from state (preserving actual secret values)..."
    terraform -chdir="$dir" state rm aws_secretsmanager_secret.db 2>$null
    terraform -chdir="$dir" state rm aws_secretsmanager_secret_version.db 2>$null
}

Write-Host ""
Write-Host "==> [1/4] Switching to us-east-2 state..."
terraform -chdir="$infraDir" init "-backend-config=backend-us-east-2.hcl" -reconfigure

Remove-ProtectedResources -dir "$infraDir" -varfile "environments/staging.tfvars"

Write-Host "==> [2/4] Destroying us-east-2 staging..."
terraform -chdir="$infraDir" destroy -var-file="environments/staging.tfvars" -auto-approve

Write-Host "==> Deleting us-east-2 VPC (was removed from state)..."
$vpc2 = aws ec2 describe-vpcs --region us-east-2 --filters "Name=tag:Name,Values=kalawala-staging-vpc" --query "Vpcs[0].VpcId" --output text 2>$null
if ($vpc2 -and $vpc2 -ne "None") {
    Write-Host "    VPC $vpc2 still exists - delete manually via AWS console if needed"
}

Write-Host "==> Deleting us-east-2 RDS directly..."
aws rds delete-db-instance --db-instance-identifier kalawala-staging-db --skip-final-snapshot --region us-east-2 2>$null

Write-Host ""
Write-Host "==> [3/4] Switching to us-east-1 state..."
terraform -chdir="$infraDir" init "-backend-config=backend-staging.hcl" -reconfigure

Remove-ProtectedResources -dir "$infraDir" -varfile "environments/staging.tfvars"

Write-Host "==> [4/4] Destroying us-east-1 staging..."
terraform -chdir="$infraDir" destroy -var-file="environments/staging.tfvars" -auto-approve

Write-Host "==> Deleting us-east-1 RDS directly..."
aws rds delete-db-instance --db-instance-identifier kalawala-staging-db --skip-final-snapshot --region us-east-1 2>$null

Write-Host ""
Write-Host "==> Secrets preserved in Secrets Manager (NOT deleted):"
aws secretsmanager list-secrets --region us-east-1 --query "SecretList[?contains(Name,'kalawala')].Name" --output table 2>$null
aws secretsmanager list-secrets --region us-east-2 --query "SecretList[?contains(Name,'kalawala')].Name" --output table 2>$null

Write-Host ""
Write-Host "==> Snapshots still exist. Delete when no longer needed:"
Write-Host "    aws rds delete-db-snapshot --db-snapshot-identifier kalawala-staging-pre-migration-20260504 --region us-east-1"
Write-Host "    aws rds delete-db-snapshot --db-snapshot-identifier kalawala-staging-from-us-east-1 --region us-east-2"
Write-Host ""
Write-Host "==> Done. Verify in AWS console:"
Write-Host "    EC2 > Instances (both regions) - should be empty"
Write-Host "    RDS > Databases (both regions) - should be empty"
Write-Host "    VPC > NAT Gateways (both regions) - none should remain"
Write-Host "    EC2 > Elastic IPs - unattached EIPs cost money"
