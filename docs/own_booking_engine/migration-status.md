# Infrastructure Migration Status
## us-east-1 → us-east-2 (Ohio)

**Date started:** 2026-05-05  
**Status:** Paused — fck-nat NAT issue blocking Lambda egress

---

## What was done

### Phase 1 — Terraform code changes (complete)
All Terraform code was updated for the cost optimization spec:
- `elasticache_enabled`, `waf_enabled`, `nat_gateway_type`, `shared_rds_enabled` variables added
- ElastiCache and WAF made conditional
- Lambda env vars conditionally set `CACHE_BACKEND=memory` when ElastiCache disabled
- Dedicated app subnets (Lambda) and data subnets (RDS/ElastiCache) added
- fck-nat resources added (AMI data source, ASG, launch template, EIP, IAM role, security group)
- SSM Parameter Store exports for cross-project sharing
- Shared RDS conditional logic with postgres16 parameter group
- Migration runbook created at `infra/MIGRATION_RUNBOOK.md`
- Backend config for us-east-2 created at `infra/backend-us-east-2.hcl`

### Phase 2 — In-Lambda cache module (complete)
- `booking-api/src/memoryCache.ts` — LRU TTL cache, 1000-entry cap
- `booking-api/src/cacheFactory.ts` — factory with module-level singleton
- `booking-api/src/calendar.ts` — migrated from Map to CacheAdapter
- Property tests (3 properties, 100 iterations each) — all passing
- Unit tests for edge cases — all passing
- 379 tests total, all passing

### Phase 3 — Snapshot and copy (complete)
- Staging RDS snapshot created in us-east-1: `kalawala-staging-pre-migration-20260504`
- Snapshot copied to us-east-2: `kalawala-staging-from-us-east-1`

### Phase 4 — us-east-2 provisioning (partially complete)
- Terraform initialized with `backend-us-east-2.hcl`
- Staging environment applied in us-east-2:
  - VPC (10.40.0.0/16), subnets, IGW
  - fck-nat ASG (1 instance running: i-0696b2442fb5ffea5)
  - RDS restored from snapshot (postgres15, db.t4g.small)
  - Lambda functions deployed with real code (19MB package)
  - API Gateway, CloudWatch, SES, SSM parameters
  - Secrets copied from us-east-1 to us-east-2
- IAM resources imported (global, shared with us-east-1)

### Phase 5 — Validation (BLOCKED)
- Calendar endpoint times out after 30 seconds
- Root cause: fck-nat instance not forwarding traffic
  - Source/dest check was enabled (manually disabled: `aws ec2 modify-instance-attribute --instance-id i-0696b2442fb5ffea5 --no-source-dest-check --region us-east-2`)
  - Private route table manually updated to point at fck-nat instance
  - fck-nat user-data did not run successfully (no SSM agent, can't inspect)
  - Lambda still times out — fck-nat iptables NAT rules likely not configured

---

## Current state of AWS resources

### us-east-1 (original)
| Resource | Status | Notes |
|----------|--------|-------|
| RDS `kalawala-staging-db` | Running | postgres15, db.t4g.small |
| VPC, subnets, NAT GW | Running | 10.1.0.0/16 |
| Lambda functions | Running | Real code deployed |
| API Gateway | Running | Active |
| Snapshot `kalawala-staging-pre-migration-20260504` | Available | Keep for 30 days |

### us-east-2 (new, partially working)
| Resource | Status | Notes |
|----------|--------|-------|
| RDS `kalawala-staging-db` | Running | postgres15, restored from snapshot |
| VPC, subnets | Running | 10.40.0.0/16 |
| fck-nat instance i-0696b2442fb5ffea5 | Running | NOT forwarding traffic |
| Lambda functions | Running | Timing out (no NAT egress) |
| API Gateway | Running | Returns timeout |
| Secrets | Created | Copied from us-east-1 |

---

## Known issues to fix before re-attempting

1. **fck-nat not forwarding traffic** — user-data script did not configure iptables NAT rules. Options:
   - Switch to managed NAT Gateway temporarily (`nat_gateway_type = "managed"` in staging.tfvars)
   - Debug fck-nat by SSHing in or checking cloud-init logs
   - The fck-nat AMI may require the conf file at `/etc/fck-nat.conf` to be present before the service starts — the user-data writes it but may have run after the service started

2. **shared_rds_enabled = false** — set to false for the snapshot restore (snapshot was postgres15, shared RDS uses postgres16). After restore, flip back to true and run apply again.

3. **Prod never deployed** — prod was never in us-east-1. When ready, run `terraform apply -var-file=environments/prod.tfvars` against the us-east-2 state.

---

## Terraform state locations
- us-east-1 state: `s3://kalawala-tfstate-476114154990/kalawala/staging/terraform.tfstate`
- us-east-2 state: `s3://kalawala-tfstate-476114154990/kalawala/us-east-2/terraform.tfstate`

## Cost while paused
- us-east-1: ~$137/month (RDS + NAT GW + Lambda + API GW)
- us-east-2: ~$100/month (RDS + fck-nat EC2 + Lambda + API GW)
- **Total while both running: ~$237/month**
- Destroy both to stop all charges
