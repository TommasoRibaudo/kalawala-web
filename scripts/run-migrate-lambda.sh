#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# run-migrate-lambda.sh — Run DB migrations against the provisioned RDS
# instance by creating a temporary in-VPC Lambda, invoking it, then deleting
# it.  No bastion host required.
#
# Usage:
#   bash scripts/run-migrate-lambda.sh [staging|prod]   (default: staging)
#
# Prerequisites:
#   • AWS CLI v2 configured with credentials that have Lambda/IAM/Secrets
#     Manager permissions (the same role used for Terraform apply works).
#   • jq installed locally.
#   • Node.js + npm installed locally (only used to bundle pg into the zip).
# ---------------------------------------------------------------------------
set -euo pipefail

ENVIRONMENT="${1:-staging}"
REGION="us-east-1"
ACCOUNT_ID="476114154990"
PROJECT="kalawala"
EXEC_ROLE_ARN="arn:aws:iam::${ACCOUNT_ID}:role/${PROJECT}-${ENVIRONMENT}-lambda-exec"
DB_SECRET_NAME="${PROJECT}/${ENVIRONMENT}/db"
LAMBDA_NAME="${PROJECT}-${ENVIRONMENT}-migrate-oneoff"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
BUILD_DIR="$(mktemp -d)"

# ---------------------------------------------------------------------------
# Cleanup: remove build artefacts and delete the temporary Lambda on exit.
# ---------------------------------------------------------------------------
cleanup() {
  rm -rf "${BUILD_DIR}"
  echo ""
  echo "==> Deleting temporary Lambda function ${LAMBDA_NAME} ..."
  aws lambda delete-function \
    --function-name "${LAMBDA_NAME}" \
    --region "${REGION}" 2>/dev/null && echo "    Deleted." || echo "    (already gone or never created)"
}
trap cleanup EXIT

echo "==> Target environment: ${ENVIRONMENT}"
echo "==> Account: ${ACCOUNT_ID}  Region: ${REGION}"

# ---------------------------------------------------------------------------
# 1. Read VPC config from Terraform outputs.
# ---------------------------------------------------------------------------
echo ""
echo "==> Reading Terraform outputs from infra/ ..."
pushd "${REPO_ROOT}/infra" > /dev/null

# Terraform output -json returns a quoted JSON string for scalar outputs and a
# JSON array for list outputs.  We convert the private_subnet_ids list to a
# comma-separated string that the AWS CLI vpc-config option expects.
SUBNET_IDS=$(terraform output -json private_subnet_ids \
  | jq -r 'if type=="array" then join(",") else . end')
SG_ID=$(terraform output -raw sg_lambda_id)

popd > /dev/null

if [[ -z "${SUBNET_IDS}" || -z "${SG_ID}" ]]; then
  echo "ERROR: Could not read Terraform outputs.  Run 'terraform apply' first."
  exit 1
fi

echo "    Subnets : ${SUBNET_IDS}"
echo "    SG      : ${SG_ID}"

# ---------------------------------------------------------------------------
# 2. Fetch DB credentials from Secrets Manager.
# ---------------------------------------------------------------------------
echo ""
echo "==> Fetching DB credentials from Secrets Manager (${DB_SECRET_NAME}) ..."
SECRET_JSON=$(aws secretsmanager get-secret-value \
  --secret-id "${DB_SECRET_NAME}" \
  --region "${REGION}" \
  --query SecretString \
  --output text)

DB_HOST=$(echo "${SECRET_JSON}" | jq -r .host)
DB_PORT=$(echo "${SECRET_JSON}" | jq -r .port)
DB_NAME=$(echo "${SECRET_JSON}" | jq -r .dbname)
DB_USER=$(echo "${SECRET_JSON}" | jq -r .username)
DB_PASS=$(echo "${SECRET_JSON}" | jq -r .password)
CONNECTION_STRING="postgres://${DB_USER}:$(python3 -c "import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1], safe=''))" "${DB_PASS}")@${DB_HOST}:${DB_PORT}/${DB_NAME}"

echo "    Host    : ${DB_HOST}"
echo "    DB      : ${DB_NAME}"
echo "    User    : ${DB_USER}"

# ---------------------------------------------------------------------------
# 3. Build the deployment zip.
#    Layout inside the zip (mirrors the local repo structure that migrate.js
#    expects: __dirname = /var/task/scripts, ../migrations = /var/task/migrations):
#
#      index.js              ← Lambda handler shim
#      scripts/migrate.js    ← the migration runner
#      migrations/*.sql      ← SQL migration files
#      node_modules/pg/      ← bundled postgres driver
# ---------------------------------------------------------------------------
echo ""
echo "==> Building deployment package ..."
mkdir -p "${BUILD_DIR}/scripts" "${BUILD_DIR}/migrations"

cp "${REPO_ROOT}/booking-api/scripts/migrate.js" "${BUILD_DIR}/scripts/"
cp "${REPO_ROOT}/booking-api/migrations/"*.sql    "${BUILD_DIR}/migrations/"

# Lambda handler shim — invokes migrate.js as a child process so that its
# self-executing main() function runs to completion and stdout is captured.
cat > "${BUILD_DIR}/index.js" << 'EOF'
'use strict';
const { execFile } = require('child_process');
const { promisify } = require('util');
const execFileAsync = promisify(execFile);

exports.handler = async () => {
  let stdout = '';
  let stderr = '';
  try {
    ({ stdout, stderr } = await execFileAsync(
      process.execPath,
      ['/var/task/scripts/migrate.js'],
      { env: { ...process.env }, timeout: 270000 }
    ));
  } catch (err) {
    // execFile rejects when the child exits with a non-zero code.
    if (err.stdout) process.stdout.write(err.stdout);
    if (err.stderr) process.stderr.write(err.stderr);
    throw new Error('Migration failed: ' + err.message);
  }
  if (stdout) process.stdout.write(stdout);
  if (stderr) process.stderr.write(stderr);
  return { success: true, output: stdout.trim() };
};
EOF

# Install the pg driver locally so it is bundled into the zip.
cat > "${BUILD_DIR}/package.json" << 'EOF'
{ "name": "migrate-runner", "version": "1.0.0", "private": true }
EOF

echo "    Installing pg driver ..."
(cd "${BUILD_DIR}" && npm install pg --save-exact --silent)

echo "    Zipping ..."
(cd "${BUILD_DIR}" && zip -r migration.zip . -x "*.git*" > /dev/null)

ZIP_SIZE=$(du -sh "${BUILD_DIR}/migration.zip" | cut -f1)
echo "    Package size: ${ZIP_SIZE}"

# ---------------------------------------------------------------------------
# 4. Create the temporary Lambda function in the VPC.
# ---------------------------------------------------------------------------
echo ""
echo "==> Creating temporary Lambda function ${LAMBDA_NAME} ..."

# Delete any leftover from a previous failed run.
aws lambda delete-function \
  --function-name "${LAMBDA_NAME}" \
  --region "${REGION}" 2>/dev/null || true

aws lambda create-function \
  --function-name "${LAMBDA_NAME}" \
  --runtime "nodejs18.x" \
  --role "${EXEC_ROLE_ARN}" \
  --handler "index.handler" \
  --zip-file "fileb://${BUILD_DIR}/migration.zip" \
  --timeout 300 \
  --memory-size 256 \
  --environment "Variables={BOOKING_API_RDS_CONNECTION_STRING=${CONNECTION_STRING}}" \
  --vpc-config "SubnetIds=${SUBNET_IDS},SecurityGroupIds=${SG_ID}" \
  --region "${REGION}" \
  --no-cli-pager \
  --output text > /dev/null

echo "    Waiting for function to become Active ..."
aws lambda wait function-active \
  --function-name "${LAMBDA_NAME}" \
  --region "${REGION}"

echo "    Ready."

# ---------------------------------------------------------------------------
# 5. Invoke the Lambda and stream its log output.
# ---------------------------------------------------------------------------
echo ""
echo "==> Invoking migration Lambda (this may take up to 30 s) ..."
RESULT_FILE="${BUILD_DIR}/result.json"

LOG_RESULT=$(aws lambda invoke \
  --function-name "${LAMBDA_NAME}" \
  --region "${REGION}" \
  --log-type Tail \
  --query LogResult \
  --output text \
  "${RESULT_FILE}" 2>&1) || true

echo ""
echo "--- Lambda logs ---"
echo "${LOG_RESULT}" | base64 --decode 2>/dev/null || echo "${LOG_RESULT}"
echo "--- end logs ---"

echo ""
echo "--- Lambda response ---"
cat "${RESULT_FILE}"
echo ""
echo "--- end response ---"

# Exit non-zero if the Lambda reported a function error.
if grep -q '"FunctionError"' "${RESULT_FILE}" 2>/dev/null || \
   grep -q '"errorMessage"' "${RESULT_FILE}" 2>/dev/null; then
  echo ""
  echo "ERROR: Migration Lambda reported an error (see response above)."
  exit 1
fi

echo ""
echo "Migration completed successfully."
