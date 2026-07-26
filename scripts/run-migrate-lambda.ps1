# ---------------------------------------------------------------------------
# run-migrate-lambda.ps1 — Run DB migrations against the provisioned RDS
# instance via a temporary in-VPC Lambda.  No bastion host required.
#
# Usage (from repo root):
#   .\scripts\run-migrate-lambda.ps1 [-Environment staging|prod]
#
# Prerequisites: AWS CLI v2, jq, Node.js, terraform — all in PATH.
# ---------------------------------------------------------------------------
param(
    [string]$Environment = "staging"
)

$ErrorActionPreference = "Stop"

$Region    = "us-east-1"
$AccountId = "476114154990"
$Project   = "kalawala"
$ExecRoleArn  = "arn:aws:iam::${AccountId}:role/${Project}-${Environment}-lambda-exec"
$DbSecretName = "${Project}/${Environment}/db"
$LambdaName   = "${Project}-${Environment}-migrate-oneoff"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot  = Split-Path -Parent $ScriptDir
$BuildDir  = Join-Path $env:TEMP "kalawala-migrate-$(Get-Random)"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
function Remove-BuildAndLambda {
    if (Test-Path $BuildDir) { Remove-Item $BuildDir -Recurse -Force -ErrorAction SilentlyContinue }
    Write-Host "`n==> Deleting temporary Lambda function $LambdaName ..."
    $prev = $ErrorActionPreference; $ErrorActionPreference = "SilentlyContinue"
    aws lambda delete-function --function-name $LambdaName --region $Region 2>$null | Out-Null
    $ec = $LASTEXITCODE; $ErrorActionPreference = $prev
    if ($ec -eq 0) { Write-Host "    Deleted." } else { Write-Host "    (already gone or never created)" }
}

# ---------------------------------------------------------------------------
# 1. Terraform outputs
# ---------------------------------------------------------------------------
Write-Host "==> Target environment: $Environment"
Write-Host "==> Account: $AccountId  Region: $Region"
Write-Host "`n==> Reading Terraform outputs from infra/ ..."

Push-Location (Join-Path $RepoRoot "infra")
try {
    $TfOutputsJson = terraform output -json | ConvertFrom-Json
} finally {
    Pop-Location
}

$SubnetIds = ($TfOutputsJson.private_subnet_ids.value) -join ","
$SgId      = $TfOutputsJson.sg_lambda_id.value

if (-not $SubnetIds -or -not $SgId) {
    Write-Error "Could not read Terraform outputs. Run 'terraform apply' first."
}

Write-Host "    Subnets : $SubnetIds"
Write-Host "    SG      : $SgId"

# ---------------------------------------------------------------------------
# 2. DB credentials from Secrets Manager
# ---------------------------------------------------------------------------
Write-Host "`n==> Fetching DB credentials from Secrets Manager ($DbSecretName) ..."
$SecretJson = aws secretsmanager get-secret-value `
    --secret-id $DbSecretName `
    --region $Region `
    --query SecretString `
    --output text | ConvertFrom-Json

$DbHost = $SecretJson.host
$DbPort = $SecretJson.port
$DbName = $SecretJson.dbname
$DbUser = $SecretJson.username
$DbPass = $SecretJson.password

# URL-encode the password so special chars don't break the connection string.
$DbPassEncoded = [Uri]::EscapeDataString($DbPass)
$ConnectionString = "postgres://${DbUser}:${DbPassEncoded}@${DbHost}:${DbPort}/${DbName}"

Write-Host "    Host : $DbHost"
Write-Host "    DB   : $DbName"
Write-Host "    User : $DbUser"

# ---------------------------------------------------------------------------
# 3. Build deployment zip
# ---------------------------------------------------------------------------
Write-Host "`n==> Building deployment package ..."
New-Item -ItemType Directory -Path (Join-Path $BuildDir "scripts")  | Out-Null
New-Item -ItemType Directory -Path (Join-Path $BuildDir "migrations") | Out-Null

Copy-Item (Join-Path $RepoRoot "booking-api\scripts\migrate.js")    (Join-Path $BuildDir "scripts\migrate.js")
Copy-Item (Join-Path $RepoRoot "booking-api\migrations\*.sql")      (Join-Path $BuildDir "migrations\")

# Lambda handler shim
$IndexJs = @'
'use strict';
const { execFile } = require('child_process');
const { promisify } = require('util');
const execFileAsync = promisify(execFile);

exports.handler = async () => {
  let stdout = '', stderr = '';
  try {
    ({ stdout, stderr } = await execFileAsync(
      process.execPath,
      ['/var/task/scripts/migrate.js'],
      { env: { ...process.env }, timeout: 270000 }
    ));
  } catch (err) {
    if (err.stdout) process.stdout.write(err.stdout);
    if (err.stderr) process.stderr.write(err.stderr);
    throw new Error('Migration failed: ' + err.message);
  }
  if (stdout) process.stdout.write(stdout);
  if (stderr) process.stderr.write(stderr);
  return { success: true, output: stdout.trim() };
};
'@
Set-Content -Path (Join-Path $BuildDir "index.js") -Value $IndexJs -Encoding utf8

Set-Content -Path (Join-Path $BuildDir "package.json") -Value '{"name":"migrate-runner","version":"1.0.0","private":true}' -Encoding utf8

Write-Host "    Installing pg driver ..."
Push-Location $BuildDir
try {
    npm install pg --save-exact --silent
} finally {
    Pop-Location
}

Write-Host "    Zipping ..."
$ZipPath = Join-Path $BuildDir "migration.zip"
Compress-Archive -Path (Join-Path $BuildDir "*") -DestinationPath $ZipPath -Force
$ZipSize = [math]::Round((Get-Item $ZipPath).Length / 1MB, 2)
Write-Host "    Package size: ${ZipSize} MB"

# ---------------------------------------------------------------------------
# 4. Create temporary Lambda
# ---------------------------------------------------------------------------
Write-Host "`n==> Creating temporary Lambda function $LambdaName ..."

# Remove any leftover from a previous failed run (ignore "not found" errors).
$prev = $ErrorActionPreference; $ErrorActionPreference = "SilentlyContinue"
aws lambda delete-function --function-name $LambdaName --region $Region 2>$null | Out-Null
$ErrorActionPreference = $prev

aws lambda create-function `
    --function-name $LambdaName `
    --runtime "nodejs18.x" `
    --role $ExecRoleArn `
    --handler "index.handler" `
    --zip-file "fileb://$ZipPath" `
    --timeout 300 `
    --memory-size 256 `
    --environment "Variables={BOOKING_API_RDS_CONNECTION_STRING=$ConnectionString}" `
    --vpc-config "SubnetIds=$SubnetIds,SecurityGroupIds=$SgId" `
    --region $Region `
    --no-cli-pager `
    --output text | Out-Null

Write-Host "    Waiting for function to become Active ..."
aws lambda wait function-active --function-name $LambdaName --region $Region
Write-Host "    Ready."

# ---------------------------------------------------------------------------
# 5. Invoke and stream logs
# ---------------------------------------------------------------------------
Write-Host "`n==> Invoking migration Lambda (may take up to 60 s) ..."
$ResultFile = Join-Path $BuildDir "result.json"

$LogResult = aws lambda invoke `
    --function-name $LambdaName `
    --region $Region `
    --log-type Tail `
    --query LogResult `
    --output text `
    $ResultFile

Write-Host "`n--- Lambda logs ---"
try {
    [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($LogResult))
} catch {
    Write-Host $LogResult
}
Write-Host "--- end logs ---"

Write-Host "`n--- Lambda response ---"
$Response = Get-Content $ResultFile -Raw
Write-Host $Response
Write-Host "--- end response ---"

Remove-BuildAndLambda

# Fail if the Lambda reported an error.
if ($Response -match '"FunctionError"' -or $Response -match '"errorMessage"') {
    Write-Error "Migration Lambda reported an error (see response above)."
}

Write-Host "`nMigration completed successfully."
