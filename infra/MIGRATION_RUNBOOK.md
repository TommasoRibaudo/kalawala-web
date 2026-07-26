# Kalawala Infrastructure Migration Runbook
## us-east-1 → us-east-2 (Ohio)

This runbook documents the ordered steps for migrating the Kalawala booking engine
infrastructure from us-east-1 to us-east-2. The migration is a destroy-and-recreate
operation (new Terraform state in us-east-2) since AWS resources cannot be moved
between regions.

**⚠️ DNS cutover (Phase 5) is the point of no return for production traffic.**
Only perform DNS cutover after 24h+ of clean us-east-2 operation.

---

## Phase 0: Pre-flight (1-2 days before migration)

These steps have lead times and must be completed before the migration window.

### 0.1 Request SES Production Access in us-east-2

SES sandbox restrictions apply per-region. If the account is sandboxed in us-east-2:

1. Go to AWS Console → SES → Account dashboard → Request production access
2. Select **us-east-2 (Ohio)** region
3. Submit the request — approval takes **24–48 hours**
4. **Do NOT proceed until SES is out of sandbox in us-east-2**

Verify sandbox status:
```bash
aws ses get-account-sending-enabled --region us-east-2
# Should return: { "Enabled": true }
```

### 0.2 Issue ACM Certificate in us-east-2 (if using a custom API domain)

ACM certificates are region-scoped and cannot be transferred. If `api.kalawala.com`
(or any custom domain) is attached to API Gateway:

```bash
aws acm request-certificate \
  --domain-name api.kalawala.com \
  --validation-method DNS \
  --region us-east-2
```

Add the DNS validation CNAME record provided by ACM, then wait for the certificate
status to reach `ISSUED` before proceeding:

```bash
aws acm wait certificate-validated \
  --certificate-arn <new-cert-arn> \
  --region us-east-2
```

### 0.3 Verify Pre-flight Checklist

Before proceeding to Phase 1, confirm all of the following:

- [ ] SES is out of sandbox in us-east-2 (`aws ses get-account-sending-enabled --region us-east-2` returns `true`)
- [ ] ACM certificate in us-east-2 is in `ISSUED` state (if using a custom domain)
- [ ] You have AWS CLI credentials with sufficient permissions for both us-east-1 and us-east-2
- [ ] Terraform is initialized against the **us-east-1** state (`backend-staging.hcl`) and the current plan is clean

---

## Phase 1: RDS Snapshot and Copy

### 1.1 Create Final RDS Snapshots in us-east-1

Take a final snapshot of each environment immediately before provisioning us-east-2.
Use a date-stamped identifier so the snapshot is easy to identify.

**Staging:**
```bash
SNAPSHOT_DATE=$(date +%Y%m%d)

aws rds create-db-snapshot \
  --db-instance-identifier kalawala-staging-db \
  --db-snapshot-identifier "kalawala-staging-db-pre-migration-${SNAPSHOT_DATE}" \
  --region us-east-1
```

**Production:**
```bash
aws rds create-db-snapshot \
  --db-instance-identifier kalawala-prod-db \
  --db-snapshot-identifier "kalawala-prod-db-pre-migration-${SNAPSHOT_DATE}" \
  --region us-east-1
```

Wait for both snapshots to complete before proceeding:

```bash
aws rds wait db-snapshot-completed \
  --db-snapshot-identifier "kalawala-staging-db-pre-migration-${SNAPSHOT_DATE}" \
  --region us-east-1

aws rds wait db-snapshot-completed \
  --db-snapshot-identifier "kalawala-prod-db-pre-migration-${SNAPSHOT_DATE}" \
  --region us-east-1
```

### 1.2 Copy Snapshots to us-east-2

Replace `<account-id>` with your 12-digit AWS account ID.

**Staging:**
```bash
aws rds copy-db-snapshot \
  --source-db-snapshot-identifier "arn:aws:rds:us-east-1:<account-id>:snapshot:kalawala-staging-db-pre-migration-${SNAPSHOT_DATE}" \
  --target-db-snapshot-identifier kalawala-staging-db-from-us-east-1 \
  --source-region us-east-1 \
  --region us-east-2
```

**Production:**
```bash
aws rds copy-db-snapshot \
  --source-db-snapshot-identifier "arn:aws:rds:us-east-1:<account-id>:snapshot:kalawala-prod-db-pre-migration-${SNAPSHOT_DATE}" \
  --target-db-snapshot-identifier kalawala-prod-db-from-us-east-1 \
  --source-region us-east-1 \
  --region us-east-2
```

Wait for the copies to complete:

```bash
aws rds wait db-snapshot-completed \
  --db-snapshot-identifier kalawala-staging-db-from-us-east-1 \
  --region us-east-2

aws rds wait db-snapshot-completed \
  --db-snapshot-identifier kalawala-prod-db-from-us-east-1 \
  --region us-east-2
```

---

## Phase 2: Provision us-east-2 Infrastructure

### 2.1 Initialize Terraform for us-east-2

Switch to the us-east-2 backend. This creates a **new, empty state file** at
`kalawala/us-east-2/terraform.tfstate`. The us-east-1 state is preserved at its
original key and is not affected.

```bash
cd infra
terraform init -backend-config=backend-us-east-2.hcl -reconfigure
```

Confirm the initialization succeeded and the state is empty:

```bash
terraform state list
# Should return nothing (empty state)
```

### 2.2 Apply Staging Environment

Pass the snapshot ARN so Terraform restores the RDS instance from the copied snapshot
rather than creating a blank database.

```bash
terraform apply \
  -var-file=environments/staging.tfvars \
  -var="db_snapshot_identifier=arn:aws:rds:us-east-2:<account-id>:snapshot:kalawala-staging-db-from-us-east-1"
```

Review the plan carefully before confirming. Expected new resources include:
- VPC, subnets, route tables, internet gateway
- fck-nat ASG, launch template, EIP, IAM role
- RDS instance (restored from snapshot)
- Lambda functions, API Gateway, SES domain identity

### 2.3 Apply Production Environment

```bash
terraform apply \
  -var-file=environments/prod.tfvars \
  -var="db_snapshot_identifier=arn:aws:rds:us-east-2:<account-id>:snapshot:kalawala-prod-db-from-us-east-1"
```

### 2.4 Add SES DNS Records for us-east-2

After `terraform apply`, retrieve the new SES verification and DKIM tokens and add
them to DNS. These are different from the us-east-1 records.

```bash
# Get the SES TXT verification token
terraform output ses_domain_verification_token

# Get the three DKIM CNAME tokens
terraform output ses_dkim_tokens
```

Add the DNS records:
- `_amazonses.<domain>` TXT record → verification token value
- `<token1>._domainkey.<domain>` CNAME → `<token1>.dkim.amazonses.com`
- `<token2>._domainkey.<domain>` CNAME → `<token2>.dkim.amazonses.com`
- `<token3>._domainkey.<domain>` CNAME → `<token3>.dkim.amazonses.com`

Wait for SES to confirm verification (check the SES console in us-east-2).

---

## Phase 3: Validation

Run all validation checks before starting the parallel run. Do not proceed to Phase 4
if any check fails.

### 3.1 Verify Lambda Invocations via API Gateway

```bash
# Get the new API Gateway URL
NEW_API_URL=$(terraform output -raw api_gateway_invoke_url)
echo "New API URL: ${NEW_API_URL}"

# Test the availability/quote endpoint
curl -s -X POST "${NEW_API_URL}/api/availability/quote" \
  -H "Content-Type: application/json" \
  -d '{"propertySlug":"Geco","checkIn":"2026-07-01","checkOut":"2026-07-05","guests":2}' \
  | jq .

# Test the calendar endpoint
curl -s "${NEW_API_URL}/api/calendar/Geco?month=2026-07" | jq .
```

Expected: HTTP 200 responses with valid JSON payloads.

### 3.2 Verify RDS Data Integrity

Connect to the RDS instance via SSM Session Manager port forwarding through the
fck-nat instance (which doubles as the SSM bastion).

```bash
# Get the fck-nat instance ID from the ASG
FCKNAT_INSTANCE_ID=$(aws autoscaling describe-auto-scaling-groups \
  --auto-scaling-group-names kalawala-staging-fck-nat \
  --region us-east-2 \
  --query 'AutoScalingGroups[0].Instances[0].InstanceId' \
  --output text)

# Get the RDS endpoint
RDS_ENDPOINT=$(terraform output -raw db_address)

# Establish SSM tunnel (runs in background)
aws ssm start-session \
  --target "${FCKNAT_INSTANCE_ID}" \
  --document-name AWS-StartPortForwardingSessionToRemoteHost \
  --parameters "{\"host\":[\"${RDS_ENDPOINT}\"],\"portNumber\":[\"5432\"],\"localPortNumber\":[\"15432\"]}" \
  --region us-east-2 &

# Wait for tunnel to establish
sleep 5

# Spot-check row counts match us-east-1
psql -h localhost -p 15432 -U kalawala_admin -d kalawala_booking \
  -c "SELECT COUNT(*) FROM booking_sessions;"

psql -h localhost -p 15432 -U kalawala_admin -d kalawala_booking \
  -c "SELECT COUNT(*) FROM properties;"
```

Compare the row counts against the us-east-1 database to confirm the snapshot
restored correctly.

### 3.3 Verify SES Email Sending

Send a test email via the SES console in us-east-2 to confirm DKIM signing works:

1. Go to AWS Console → SES → us-east-2 → Email addresses
2. Send a test email to a verified address
3. Confirm the email is received and DKIM passes (check email headers)

Alternatively, invoke the booking Lambda with a test payload that triggers an email
and verify delivery.

### 3.4 Verify NAT Egress (fck-nat)

Confirm that Lambda functions can reach external APIs through the fck-nat instance:

```bash
# Invoke the booking API Lambda directly and check it can reach Smoobu
aws lambda invoke \
  --function-name kalawala-staging-booking-api \
  --payload '{"path":"/api/calendar/Geco","queryStringParameters":{"month":"2026-07"},"httpMethod":"GET","headers":{}}' \
  --region us-east-2 \
  response.json

cat response.json
# Expected: statusCode 200 with calendar data (proves outbound NAT egress works)
```

### 3.5 Verify fck-nat Instance Health

```bash
aws autoscaling describe-auto-scaling-groups \
  --auto-scaling-group-names kalawala-staging-fck-nat \
  --region us-east-2 \
  --query 'AutoScalingGroups[0].Instances[*].{ID:InstanceId,Health:HealthStatus,State:LifecycleState}'
# Expected: 1 instance with HealthStatus=Healthy, LifecycleState=InService
```

### 3.6 (removed) SSM Parameter Exports

`ssm.tf` published VPC and RDS details under `/shared-infra/` for the Wavis
project to consume. Wavis is no longer sharing this infrastructure, so there is
nothing to verify here.

---

## Phase 4: Parallel Run (minimum 24 hours)

**Do NOT proceed to DNS cutover until 24 hours of clean us-east-2 operation.**

Run both us-east-1 and us-east-2 environments simultaneously. During this period:

- us-east-1 continues serving all production traffic
- us-east-2 is fully provisioned and validated but receives no real traffic
- Monitor us-east-2 CloudWatch dashboards for any infrastructure issues

### 4.1 CloudWatch Metrics to Monitor in us-east-2

Open the CloudWatch console in us-east-2 and watch:

| Metric | Alarm Threshold | Notes |
|--------|----------------|-------|
| Lambda `Errors` | > 0 | Any Lambda errors indicate a problem |
| API Gateway `5XXError` | > 0 | Server-side errors |
| RDS `DatabaseConnections` | > 0 | Confirms Lambda can connect to RDS |
| fck-nat ASG `GroupInServiceInstances` | < 1 | Instance must stay healthy |
| fck-nat instance CPU | > 80% | Unexpected load on t4g.nano |

### 4.2 Parallel Run Checklist

After 24 hours, confirm all of the following before proceeding to DNS cutover:

- [ ] Zero Lambda errors in us-east-2 CloudWatch for the past 24 hours
- [ ] Zero API Gateway 5XX errors in us-east-2 for the past 24 hours
- [ ] fck-nat ASG has maintained 1 healthy instance for the past 24 hours
- [ ] SES domain identity is verified in us-east-2
- [ ] RDS data integrity spot-check passed (Phase 3.2)
- [ ] All validation checks in Phase 3 passed

---

## Phase 5: DNS Cutover ⚠️ POINT OF NO RETURN

**Only perform this step after completing the 24-hour parallel run checklist above.**

Once DNS is updated, production traffic flows to us-east-2. Reverting requires
updating DNS again and waiting for TTL propagation — plan for 5–60 minutes of
potential disruption if rollback is needed.

### 5.1 Get the us-east-2 API Gateway Endpoint

```bash
terraform output api_gateway_invoke_url
# Example: https://abc123def.execute-api.us-east-2.amazonaws.com/prod
```

### 5.2 Update DNS Records

Update your DNS provider to point `api.kalawala.com` (or your API domain) to the
us-east-2 API Gateway endpoint. The exact steps depend on your DNS provider.

If using Route 53:
```bash
# Get the hosted zone ID
ZONE_ID=$(aws route53 list-hosted-zones-by-name \
  --dns-name kalawala.com \
  --query 'HostedZones[0].Id' \
  --output text | sed 's|/hostedzone/||')

# Update the A/CNAME record (adjust record type and value for your setup)
aws route53 change-resource-record-sets \
  --hosted-zone-id "${ZONE_ID}" \
  --change-batch '{
    "Changes": [{
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "api.kalawala.com",
        "Type": "CNAME",
        "TTL": 60,
        "ResourceRecords": [{"Value": "<us-east-2-api-gateway-domain>"}]
      }
    }]
  }'
```

### 5.3 Verify Traffic is Flowing to us-east-2

After DNS propagation (wait for TTL to expire — set TTL to 60s before cutover if
possible):

```bash
# Confirm the API resolves to us-east-2
curl -v https://api.kalawala.com/api/availability/quote \
  -H "Content-Type: application/json" \
  -d '{"propertySlug":"Geco","checkIn":"2026-07-01","checkOut":"2026-07-05","guests":2}' \
  2>&1 | grep -E "(HTTP|x-amzn-RequestId|< )"
```

Monitor CloudWatch in us-east-2 for incoming requests. You should see Lambda
invocations and API Gateway requests appearing within minutes of DNS propagation.

---

## Phase 6: Destroy us-east-1

Only perform this phase after:
- DNS cutover is complete (Phase 5)
- 24h+ of clean us-east-2 operation **after** DNS cutover
- No rollback events or incidents in us-east-2

### 6.1 Switch Back to us-east-1 State

```bash
cd infra
terraform init -backend-config=backend-staging.hcl -reconfigure
```

Confirm you are now targeting the us-east-1 state:
```bash
terraform state list | head -5
# Should show us-east-1 resources
```

### 6.2 Destroy Staging (us-east-1)

```bash
terraform destroy -var-file=environments/staging.tfvars
```

Review the destroy plan carefully. It should show only us-east-1 resources.
Type `yes` to confirm.

### 6.3 Destroy Production (us-east-1)

```bash
terraform destroy -var-file=environments/prod.tfvars
```

> **Note:** The RDS instance has `deletion_protection = true`. You must disable it
> before Terraform can destroy it:
> ```bash
> aws rds modify-db-instance \
>   --db-instance-identifier kalawala-prod-db \
>   --no-deletion-protection \
>   --region us-east-1
> aws rds wait db-instance-available \
>   --db-instance-identifier kalawala-prod-db \
>   --region us-east-1
> ```
> Then re-run `terraform destroy -var-file=environments/prod.tfvars`.

### 6.4 Archive us-east-1 Snapshots

After destroying us-east-1 resources, retain the pre-migration snapshots for at
least 30 days as a safety net:

```bash
# List the pre-migration snapshots
aws rds describe-db-snapshots \
  --query 'DBSnapshots[?contains(DBSnapshotIdentifier, `pre-migration`)].{ID:DBSnapshotIdentifier,Status:Status}' \
  --region us-east-1
```

Delete them after the 30-day retention period if no issues arise.

---

## Rollback Procedure

### Before DNS Cutover (Phases 1–4)

If us-east-2 fails validation at any step before DNS cutover:

1. **Do NOT perform DNS cutover** — us-east-1 is still serving all traffic
2. Investigate the failure in us-east-2 CloudWatch logs
3. Fix the issue and re-run the validation checks in Phase 3
4. If aborting the migration entirely, destroy the us-east-2 environment:

```bash
cd infra
terraform init -backend-config=backend-us-east-2.hcl -reconfigure

# Destroy staging
terraform destroy -var-file=environments/staging.tfvars

# Destroy prod
terraform destroy -var-file=environments/prod.tfvars
```

The us-east-1 environment continues operating normally. No data loss occurs since
us-east-1 was never modified.

### After DNS Cutover (Phase 5 onwards)

If us-east-2 develops issues after DNS cutover:

1. **Immediately revert DNS** to point back to the us-east-1 API Gateway endpoint:
   ```bash
   # Get the us-east-1 API Gateway URL (switch to us-east-1 state first)
   terraform init -backend-config=backend-staging.hcl -reconfigure
   terraform output api_gateway_invoke_url
   ```
2. Update DNS to the us-east-1 endpoint (same process as Phase 5.2, reversed)
3. Wait for DNS propagation and confirm traffic is back on us-east-1
4. Investigate and fix the us-east-2 issue before attempting cutover again
5. **Do NOT destroy us-east-1** until the us-east-2 issue is fully resolved

---

## Quick Reference

| Phase | Action | Reversible? |
|-------|--------|-------------|
| 0 | Pre-flight (SES, ACM) | Yes |
| 1 | RDS snapshot + copy | Yes |
| 2 | Provision us-east-2 | Yes (destroy us-east-2) |
| 3 | Validate us-east-2 | Yes |
| 4 | 24h parallel run | Yes |
| **5** | **DNS cutover** | **⚠️ Requires DNS revert + TTL wait** |
| 6 | Destroy us-east-1 | ❌ No (snapshots only) |

### Key AWS CLI Commands

```bash
# Check SES sandbox status in us-east-2
aws ses get-account-sending-enabled --region us-east-2

# List RDS snapshots
aws rds describe-db-snapshots --region us-east-1 \
  --query 'DBSnapshots[?contains(DBSnapshotIdentifier, `kalawala`)].{ID:DBSnapshotIdentifier,Status:Status}'

# Check fck-nat ASG health
aws autoscaling describe-auto-scaling-groups \
  --auto-scaling-group-names kalawala-staging-fck-nat \
  --region us-east-2 \
  --query 'AutoScalingGroups[0].Instances[*].{ID:InstanceId,Health:HealthStatus}'

# Switch Terraform state to us-east-2
terraform init -backend-config=backend-us-east-2.hcl -reconfigure

# Switch Terraform state back to us-east-1
terraform init -backend-config=backend-staging.hcl -reconfigure
```
