# Implementation Plan: Infrastructure Cost Optimization

## Overview

Two-phase implementation reducing Kalawala's AWS infrastructure cost from ~$320/month to ~$90/month. Phase 1 covers quick wins (conditional resources, in-Lambda cache, decommission dev). Phase 2 introduces fck-nat, region migration to us-east-2, shared VPC, and shared RDS.

## Tasks

- [x] 1. Phase 1 — Terraform variable layer and conditional ElastiCache
  - [x] 1.1 Add `elasticache_enabled` and `waf_enabled` variables to `infra/variables.tf`
    - Add `elasticache_enabled` variable of type `bool` with default `true`
    - Add `waf_enabled` variable of type `bool` with default `true`
    - Add validation block for `nat_gateway_type` accepting `"managed"` or `"fck-nat"` (used in Phase 2 but defined now)
    - Add `shared_rds_enabled` variable of type `bool` with default `false`
    - _Requirements: 3.1, 5.1, 6.1, 9.1_

  - [x] 1.2 Make ElastiCache resources conditional in `infra/cache.tf`
    - Wrap `aws_elasticache_replication_group.cache`, `aws_elasticache_subnet_group.redis`, `aws_elasticache_parameter_group.redis7`, `aws_secretsmanager_secret.redis`, `aws_secretsmanager_secret_version.redis`, `random_password.redis_auth` with `count = var.elasticache_enabled ? 1 : 0`
    - Wrap ElastiCache-related CloudWatch log groups (`redis_engine`, `redis_slow`) with `count = var.elasticache_enabled ? 1 : 0`
    - Wrap `aws_security_group.elasticache` with `count = var.elasticache_enabled ? 1 : 0`
    - Update all references to these resources elsewhere (e.g., `[0]` indexing)
    - _Requirements: 3.2, 3.3_

  - [x] 1.3 Update Lambda environment variables for conditional cache backend in `infra/lambda.tf`
    - Modify `locals.lambda_common_env` to conditionally include/exclude `REDIS_HOST`, `REDIS_PORT`, `REDIS_SECRET_NAME`
    - When `elasticache_enabled = false`, set `CACHE_BACKEND = "memory"` and omit Redis variables
    - When `elasticache_enabled = true`, set `CACHE_BACKEND = "redis"` and include Redis variables as before
    - _Requirements: 3.4, 3.5_

  - [x] 1.4 Make WAF resources conditional in `infra/waf.tf`
    - Wrap `aws_wafv2_web_acl.booking_api` and `aws_wafv2_web_acl_association.booking_api` with `count = var.waf_enabled ? 1 : 0`
    - Keep WAF-related CloudWatch log groups unconditional (always `count = 1`) so logs are preserved for audit
    - Update any references to WAF resources in other files
    - _Requirements: 5.2, 5.3, 5.4, 5.5_

  - [x] 1.5 Update `environments/staging.tfvars` with Phase 1 cost optimizations
    - Set `elasticache_enabled = false`
    - Set `waf_enabled = false`
    - Add cost estimate comment: `# Cost estimate: ~$62/month (down from ~$137/month)`
    - _Requirements: 3.6, 5.2, 11.1_

  - [x] 1.6 Update `environments/prod.tfvars` to disable Multi-AZ
    - Set `db_multi_az = false`
    - Verify `db_backup_retention_days = 7` is retained
    - Verify `deletion_protection = true` remains on the RDS instance (in `database.tf`)
    - Add cost estimate comment: `# Cost estimate: ~$137/month (down from ~$183/month)`
    - _Requirements: 2.1, 2.2, 2.3, 11.1_

- [x] 2. Phase 1 — In-Lambda Cache Module
  - [x] 2.1 Implement the `CacheAdapter` interface and memory cache in `booking-api/src/memoryCache.ts`
    - Define `CacheAdapter` interface with methods: `get(key): Promise<string | null>`, `set(key, value, ttlSeconds): Promise<void>`, `del(key): Promise<void>`, `invalidateByPrefix(prefix): Promise<number>`
    - Implement `MemoryCache` class using a `Map<string, { value: string; expiresAtMs: number }>` with LRU tracking (delete + re-insert on access)
    - Cap at 1000 entries; evict LRU entry on overflow during `set()`
    - Evict expired entries lazily on `get()` (return null for expired)
    - `invalidateByPrefix` iterates all keys, removes matching, returns count
    - Export `createMemoryCache()` factory function
    - _Requirements: 4.1, 4.2, 4.3, 4.5, 4.6, 4.7, 4.8_

  - [x] 2.2 Implement the cache adapter factory in `booking-api/src/cacheFactory.ts`
    - Export `createCacheAdapter(backend: 'redis' | 'memory', redisConfig?): CacheAdapter`
    - When `backend = 'memory'`, return a module-level singleton `MemoryCache` instance (survives warm starts)
    - When `backend = 'redis'`, return a Redis adapter wrapping the existing Redis connection logic
    - Read `CACHE_BACKEND` environment variable to determine backend
    - Define default TTL scopes: `availability` = 30s, `calendar-rates` = 300s
    - _Requirements: 4.4, 4.5, 4.6, 4.8_

  - [x] 2.3 Integrate cache adapter into `booking-api/src/calendar.ts`
    - Replace the existing module-level `calendarRatesCache` Map with the `CacheAdapter` from `cacheFactory`
    - Update `handleCalendarRequest` to use `adapter.get()`/`adapter.set()` with the `calendar-rates` TTL scope
    - Update `invalidateCalendarRatesCacheFromWebhook` to use `adapter.invalidateByPrefix()`
    - Ensure the existing test suite in `calendar.test.ts` still passes
    - _Requirements: 4.4, 4.8_

  - [x] 2.4 Write property test: Cache TTL round-trip (Property 1)
    - Install `fast-check` as a dev dependency in `booking-api/`
    - Create `booking-api/src/memoryCache.property.test.ts`
    - **Property 1: Cache TTL round-trip** — For any key-value pair stored with a given TTL, `get(key)` before TTL elapsed returns the stored value, and `get(key)` after TTL elapsed returns null
    - Use `fc.string()` for keys/values, `fc.integer({min: 1, max: 600})` for TTL
    - Inject a controllable `now()` function to simulate time progression
    - Minimum 100 iterations
    - **Validates: Requirements 4.1, 4.2, 4.3**

  - [x] 2.5 Write property test: Size invariant with LRU eviction (Property 2)
    - **Property 2: Size invariant with LRU eviction** — For any sequence of `set` operations, stored entry count never exceeds 1000; when overflow occurs, the LRU entry is evicted and all others remain accessible
    - Generate sequences of `set` operations with `fc.array(fc.record({key: fc.string(), value: fc.string(), ttl: fc.integer({min:1, max:600})}))`
    - Assert `cache.size <= 1000` after each operation
    - Minimum 100 iterations
    - **Validates: Requirements 4.7**

  - [x] 2.6 Write property test: Delete and invalidateByPrefix correctness (Property 3)
    - **Property 3: Delete and invalidateByPrefix correctness** — For any set of cached entries and any prefix, `invalidateByPrefix(prefix)` removes all and only entries whose keys start with that prefix; `del(key)` removes that specific entry
    - Generate a set of entries with known prefixes, call `invalidateByPrefix`, verify only matching keys removed and count is correct
    - Minimum 100 iterations
    - **Validates: Requirements 4.3, 4.4, 4.8**

  - [x] 2.7 Write unit tests for `memoryCache.ts` edge cases
    - Test `get` on non-existent key returns `null`
    - Test `set` then `get` with known key/value returns value
    - Test `del` removes specific entry, subsequent `get` returns `null`
    - Test `invalidateByPrefix("availability:")` removes only availability-prefixed keys
    - Test LRU eviction: insert 1001 entries, verify first entry evicted
    - Test warm-start behavior: module-level singleton retains entries across calls
    - _Requirements: 4.1, 4.2, 4.3, 4.7, 4.8_

- [x] 3. Checkpoint — Phase 1 validation
  - Ensure all tests pass, ask the user if questions arise.
  - Run `terraform validate` with staging and prod tfvars to confirm no syntax errors
  - Verify `terraform plan -var-file=environments/staging.tfvars` shows only ElastiCache and WAF resource changes

- [x] 4. Phase 1 — Dev environment decommission and plan safety
  - [x] 4.1 Mark `environments/dev.tfvars` as decommissioned
    - Add header comment with the actual decommission date: `# DECOMMISSIONED — Environment destroyed on YYYY-MM-DD. Using staging for development.`
    - Replace `[DATE]` with the current date at time of execution
    - Retain the file in version control for reference
    - _Requirements: 1.2_

  - [x] 4.2 Create plan safety allowlist directory and YAML files in `infra/plan-allowlists/`
    - Create `infra/plan-allowlists/elasticache-disabled.yaml` listing allowed destroy/update resource addresses when `elasticache_enabled` changes to `false`
    - Create `infra/plan-allowlists/waf-disabled.yaml` listing allowed destroy resource addresses when `waf_enabled` changes to `false`
    - Create `infra/plan-allowlists/multi-az-disabled.yaml` listing allowed update resource addresses when `db_multi_az` changes to `false`
    - Create `infra/plan-allowlists/nat-fck-nat.yaml` listing allowed destroy/create/update resource addresses when `nat_gateway_type` changes to `"fck-nat"`
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [x] 4.3 Write a CI plan-check script `infra/scripts/check-plan-allowlist.sh`
    - Parse `terraform plan -json` output for resource addresses and actions
    - Load the corresponding allowlist YAML based on detected variable changes
    - Exit non-zero if any planned resource address + action is not in the allowlist
    - Note: This script runs in CI (Linux/GitHub Actions), not locally on Windows
    - _Requirements: 10.5_

- [x] 5. Phase 2 — Replace NAT Gateway with fck-nat
  - [x] 5.1 Add fck-nat AMI data source and conditional NAT resources in `infra/vpc.tf`
    - Add `aws_ami` data source filtered by `name = "fck-nat-al2023-*"`, `architecture = "arm64"`, owner `568608671756`, `most_recent = true`
    - Wrap existing `aws_nat_gateway.main` and `aws_eip.nat` with `count = var.nat_gateway_type == "managed" ? 1 : 0`
    - Update private route table to conditionally reference either managed NAT or fck-nat instance
    - _Requirements: 6.1, 6.2, 6.5, 6.8_

  - [x] 5.2 Create fck-nat security group, IAM role, and instance profile
    - Create `aws_security_group.fck_nat` allowing all outbound and inbound only from `var.vpc_cidr`
    - Create `aws_iam_role.fck_nat` with EC2 assume-role trust policy
    - Create `aws_iam_instance_profile.fck_nat` attached to the role
    - Create `aws_iam_role_policy.fck_nat_self_configure` with permissions for `ec2:AssociateAddress`, `ec2:ReplaceRoute`, `ec2:ModifyInstanceAttribute`
    - All resources conditional on `var.nat_gateway_type == "fck-nat"`
    - _Requirements: 6.6, 6.7_

  - [x] 5.3 Create fck-nat launch template, ASG, and EIP
    - Create `aws_eip.fck_nat` (conditional) for stable outbound IP
    - Create `aws_launch_template.fck_nat` with: AMI from data source, instance type `t4g.nano`, IAM instance profile, security group, `source_dest_check = false`, user-data script that writes `eip_id` and `route_table_id` to `/etc/fck-nat.conf`
    - Create `aws_autoscaling_group.fck_nat` with `min_size = max_size = desired_capacity = 1`, placed in first public subnet, using the launch template
    - All resources conditional on `var.nat_gateway_type == "fck-nat"`
    - _Requirements: 6.3, 6.4, 6.7, 6.9, 6.10_

  - [x] 5.4 Update private route table for fck-nat
    - When `nat_gateway_type = "fck-nat"`, create an `aws_route` resource pointing `0.0.0.0/0` at the fck-nat instance's network interface (initial route; fck-nat user-data will `replace-route` on boot for ASG replacements)
    - Remove the inline route from `aws_route_table.private` and use a separate `aws_route` resource for both managed and fck-nat cases to avoid conflicts
    - _Requirements: 6.4_

- [x] 6. Checkpoint — Phase 2 NAT validation
  - Ensure all tests pass, ask the user if questions arise.
  - Run `terraform validate` to confirm fck-nat configuration is syntactically correct
  - Verify `terraform plan` with `nat_gateway_type = "fck-nat"` shows expected resource changes matching the allowlist

- [x] 7. Phase 2 — Region migration and shared VPC
  - [x] 7.1 Restructure VPC for multi-project sharing in `infra/vpc.tf`
    - Add variables for shared VPC CIDR layout: `vpc_cidr = "10.40.0.0/16"`, public `10.40.0.0/22`, Kalawala app `10.40.12.0/23`, Kalawala data `10.40.22.0/23`
    - Add variables for Wavis subnet CIDRs: app `10.40.10.0/23`, data `10.40.20.0/23`
    - Add `Project` tag to all subnets (`kalawala`, `wavis`, or `shared`)
    - Add `lifecycle { prevent_destroy = true }` to the VPC resource
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.9_

  - [x] 7.2 Create SSM Parameter Store exports in `infra/outputs.tf`
    - Create `aws_ssm_parameter` resources under `/shared-infra/{environment}/` prefix for: `vpc-id`, `public-subnet-ids`, `private-route-table-id`, `nat-eip`
    - Conditionally export `rds/endpoint` and `rds/port` when `shared_rds_enabled = true`
    - _Requirements: 8.8, 9.8_

  - [x] 7.3 Update security groups for multi-project access
    - Modify `aws_security_group.rds` to allow ingress from both Kalawala app subnets (`10.40.12.0/23`) and Wavis app subnets (`10.40.10.0/23`) on port 5432 when `shared_rds_enabled = true`
    - Maintain network isolation between Kalawala and Wavis application subnets (no cross-project traffic on application ports)
    - _Requirements: 8.6, 9.7_

  - [x] 7.4 Update environment tfvars for us-east-2 migration
    - Update `environments/staging.tfvars`: set `aws_region = "us-east-2"`, `availability_zones = ["us-east-2a", "us-east-2b"]`, `vpc_cidr = "10.40.0.0/16"`, new subnet CIDRs, `nat_gateway_type = "fck-nat"`, `shared_rds_enabled = true`
    - Update `environments/prod.tfvars`: set `aws_region = "us-east-2"`, `availability_zones = ["us-east-2a", "us-east-2b"]`, `nat_gateway_type = "fck-nat"`
    - Add Phase 2 cost estimate comments to both files
    - _Requirements: 7.1, 7.2, 11.2, 11.3_

- [x] 8. Phase 2 — Shared RDS configuration
  - [x] 8.1 Add shared RDS conditional logic in `infra/database.tf`
    - When `shared_rds_enabled = true`, upgrade to PostgreSQL 16 and use `db.t4g.small`
    - Add `lifecycle { prevent_destroy = true }` as a **static literal** (Terraform does not allow variable references in lifecycle blocks)
    - Add precondition checking for SSM parameter `/shared-infra/{env}/rds/wavis-migration-complete` before allowing `shared_rds_enabled` to be set back to `false`
    - To decommission shared RDS: operator migrates Wavis data → sets SSM flag → runs `terraform state rm aws_db_instance.main` → re-applies
    - Create separate Secrets Manager secrets for Kalawala and Wavis database credentials
    - _Requirements: 9.1, 9.2, 9.4, 9.6, 9.9_

  - [x] 8.2 Create `null_resource` for Wavis database provisioning
    - Add `null_resource.wavis_db_setup` with `local-exec` provisioner running a psql script
    - Script creates `wavis` database, `wavis_user` with restricted access, revokes cross-database privileges
    - Use SSM Session Manager port forwarding for connectivity (document the pre-requisite tunnel command)
    - Trigger only when `shared_rds_enabled = true` (use `count`)
    - _Requirements: 9.3, 9.5_

  - [x] 8.3 Export shared RDS details to SSM Parameter Store
    - Create `aws_ssm_parameter` for `/shared-infra/{environment}/rds/endpoint` and `/shared-infra/{environment}/rds/port`
    - Conditional on `shared_rds_enabled = true`
    - _Requirements: 9.8_

- [x] 9. Phase 2 — Pre-migration gates and backend configuration
  - [x] 9.1 SES and ACM pre-migration preparation
    - Add `aws_ses_domain_identity` and DKIM resources that will work in us-east-2
    - Document in a comment block the operator pre-flight checklist:
      1. Request SES production access in us-east-2 (24-48h lead time)
      2. Create SES domain identity in us-east-2 and add DNS verification records
      3. Verify DKIM signing works in us-east-2 (send test email)
      4. If using custom domain on API Gateway: issue ACM certificate in us-east-2
      5. Do NOT proceed with migration until SES is verified and out of sandbox
    - _Requirements: 7.7, 7.8_

  - [x] 9.2 Create new backend configuration for us-east-2 state
    - Create `infra/backend-us-east-2.hcl` with updated key prefix for the new deployment
    - Document that the state bucket remains in us-east-1 (S3 is globally accessible)
    - Add migration instructions as comments in the file
    - _Requirements: 7.6_

  - [x] 9.3 Create migration runbook in `infra/MIGRATION_RUNBOOK.md`
    - Document the ordered execution sequence (operator performs these steps manually):
      1. **Pre-flight** (1-2 days before): Request SES production access in us-east-2; issue ACM cert in us-east-2; verify both
      2. **Snapshot**: `aws rds create-db-snapshot` in us-east-1 for staging and prod
      3. **Copy snapshot**: `aws rds copy-db-snapshot --source-region us-east-1 --target-region us-east-2`
      4. **Provision us-east-2**: `terraform init -backend-config=backend-us-east-2.hcl` then `terraform apply -var-file=environments/staging.tfvars` (creates new infra from snapshot)
      5. **Validate**: Invoke Lambda via API Gateway, verify RDS queries return expected data, verify SES sends email, verify NAT egress works
      6. **Parallel run**: Run both regions for minimum 24 hours; monitor for errors in us-east-2
      7. **DNS cutover**: Update API domain records to point to us-east-2 API Gateway endpoint (this is the point of no return for traffic)
      8. **Destroy us-east-1**: Only after 24h+ of clean us-east-2 operation: `terraform destroy` the old environment
      9. **Rollback**: If us-east-2 fails validation at any step before DNS cutover, abort and continue using us-east-1
    - _Requirements: 7.4, 7.5, 7.9_

- [x] 10. Final checkpoint — Full validation
  - Ensure all tests pass, ask the user if questions arise.
  - Run `terraform validate` for both staging and prod tfvars with all Phase 2 changes
  - Verify plan allowlists cover all expected resource changes
  - Confirm cost estimate comments are present in all tfvars files
  - Verify migration runbook is complete and covers: SES pre-flight, RDS snapshot, parallel run, DNS cutover, rollback procedure
  - Remind operator: DNS cutover (Requirement 7.9) is the final production step — only after 24h parallel validation passes

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation between phases
- Property tests validate the in-Lambda cache module correctness (the only application code component)
- All Terraform changes should be validated with `terraform validate` and `terraform plan` before apply
- The actual `terraform destroy` of dev (Requirement 1.1) and the region migration execution are operational steps — Task 9.3 provides the ordered runbook
- DNS cutover (Requirement 7.9) is the final production step and must only happen after 24h parallel validation
- SES production access requests (Requirement 7.7d) require 24-48h lead time — start early
- The `availability` cache scope (30s TTL) is defined in the adapter but currently unused — the availability quote endpoint calls Smoobu directly without caching. The scope is ready for future integration when traffic warrants it
- CI scripts (Task 4.3) target Linux/GitHub Actions; they are not intended to run locally on Windows
