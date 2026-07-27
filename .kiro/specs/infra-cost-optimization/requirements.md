# Requirements Document

## Introduction

This specification defines the requirements for reducing the Kalawala booking engine's AWS infrastructure cost from ~$320/month to ~$90/month across two phases.

**Phase 1** (Requirements 1–5) covers quick wins within the Kalawala project alone: decommissioning dev, disabling Multi-AZ, removing staging ElastiCache and WAF.

**Phase 2** (Requirements 6–11) introduces a region migration and shared VPC architecture. Kalawala moves from us-east-1 to us-east-2 (Wavis' current region), replacing the managed NAT Gateway with fck-nat, sharing an RDS instance in staging, and making expensive resources conditional via Terraform variables.

## Glossary

- **Terraform_Configuration**: The set of `.tf` files and `.tfvars` files in the `infra/` directory that define all AWS resources for the Kalawala booking engine.
- **Dev_Environment**: The development deployment of the Kalawala booking engine, provisioned via `environments/dev.tfvars` with VPC CIDR 10.0.0.0/16.
- **Staging_Environment**: The staging deployment of the Kalawala booking engine, provisioned via `environments/staging.tfvars` with VPC CIDR 10.1.0.0/16.
- **Prod_Environment**: The production deployment of the Kalawala booking engine, provisioned via `environments/prod.tfvars` with VPC CIDR 10.2.0.0/16.
- **NAT_Gateway**: The AWS-managed NAT Gateway resource (`aws_nat_gateway.main`) that provides outbound internet access for Lambda functions in private subnets (~$32/month per environment).
- **Fck_Nat**: An open-source NAT instance based on a t4g.nano EC2 instance (~$3/month) that replaces the managed NAT Gateway for cost savings. Uses the official fck-nat AMI resolved via `aws_ami` data source filtered by `name = "fck-nat-al2023-*"`, `architecture = "arm64"`, owner `568608671756`.
- **ElastiCache_Cluster**: The Redis 7.1 replication group (`aws_elasticache_replication_group.cache`) used for availability and rates caching.
- **In_Lambda_Cache**: A module-level in-memory TTL map within Lambda functions that replaces ElastiCache for environments where Redis is disabled.
- **WAF_WebACL**: The WAFv2 Web ACL (`aws_wafv2_web_acl.booking_api`) that provides rate limiting and managed rule protection for the API Gateway stage.
- **Shared_VPC**: A restructured VPC (10.40.0.0/16) in us-east-2 designed to host both Kalawala and Wavis projects in a single network with segmented subnets.
- **Wavis_Project**: A second project currently deployed in us-east-2 (Ohio). Kalawala will move from us-east-1 to us-east-2 to join Wavis and share infrastructure.
- **Multi_AZ**: The RDS high-availability configuration (`multi_az = true`) that maintains a synchronous standby replica in a second Availability Zone.
- **Cross_Project_State**: The mechanism by which Wavis' Terraform reads shared resource outputs (VPC ID, subnet IDs, RDS endpoint) from Kalawala's Terraform state via SSM Parameter Store exports.

## Requirements

---

## Phase 1 — Quick Wins (Kalawala-only)

### Requirement 1: Decommission Dev Environment

**Phase:** 1

**User Story:** As an infrastructure operator, I want to decommission the dev environment entirely, so that I save ~$75/month by using staging for development instead.

#### Acceptance Criteria

1. WHEN the operator runs `terraform destroy -var-file=environments/dev.tfvars`, THE Terraform_Configuration SHALL destroy all AWS resources associated with the Dev_Environment without errors.
2. WHEN the Dev_Environment is decommissioned, THE Terraform_Configuration SHALL retain the `environments/dev.tfvars` file in version control with a header comment indicating the environment is decommissioned and the date of decommission.
3. WHEN the Dev_Environment is decommissioned, THE Staging_Environment SHALL remain fully operational with no resource changes.

### Requirement 2: Disable RDS Multi-AZ in Production

**Phase:** 1

**User Story:** As an infrastructure operator, I want to disable Multi-AZ for the production RDS instance, so that I save ~$26/month while accepting the reduced availability trade-off for a low-traffic booking engine.

#### Acceptance Criteria

1. WHEN `db_multi_az` is set to `false` in `environments/prod.tfvars`, THE Terraform_Configuration SHALL plan a modification of the existing RDS instance to disable the standby replica without data loss.
2. WHEN Multi_AZ is disabled in the Prod_Environment, THE Terraform_Configuration SHALL retain the `db_backup_retention_days` value of 7 to ensure point-in-time recovery remains available.
3. WHEN Multi_AZ is disabled in the Prod_Environment, THE Terraform_Configuration SHALL keep `deletion_protection = true` on the RDS instance.
4. THE Multi-AZ modification SHALL be applied during the configured maintenance window (`mon:04:00-mon:05:00` UTC) or during a manually-initiated low-traffic period to minimize latency impact during the storage sync phase.

### Requirement 3: Make ElastiCache Conditional

**Phase:** 1

**User Story:** As an infrastructure operator, I want to make ElastiCache provisioning conditional per environment, so that I can remove it from staging (~$12/month savings) while keeping it in production.

#### Acceptance Criteria

1. THE Terraform_Configuration SHALL define an `elasticache_enabled` variable of type `bool` with a default value of `true`.
2. WHEN `elasticache_enabled` is set to `false`, THE Terraform_Configuration SHALL skip creation of all ElastiCache resources (replication group, subnet group, parameter group, Secrets Manager secret, and associated CloudWatch log groups).
3. WHEN `elasticache_enabled` is set to `false`, THE Terraform_Configuration SHALL skip creation of the ElastiCache security group.
4. WHEN `elasticache_enabled` is set to `false`, THE Terraform_Configuration SHALL omit `REDIS_HOST`, `REDIS_PORT`, and `REDIS_SECRET_NAME` from the Lambda environment variables and instead set `CACHE_BACKEND=memory`.
5. WHEN `elasticache_enabled` is set to `true`, THE Terraform_Configuration SHALL provision ElastiCache resources identically to the current behavior and set `CACHE_BACKEND=redis`.
6. WHEN `elasticache_enabled` is set to `false` in `environments/staging.tfvars`, THE Staging_Environment SHALL use the In_Lambda_Cache for availability and rates caching instead of ElastiCache.

### Requirement 4: Implement In-Lambda Cache Module

**Phase:** 1

**User Story:** As a developer, I want an in-memory TTL cache within the Lambda functions, so that availability and rates caching continues to work when ElastiCache is disabled.

#### Acceptance Criteria

1. THE In_Lambda_Cache SHALL store key-value pairs with a configurable TTL per entry.
2. THE In_Lambda_Cache SHALL evict entries whose TTL has expired on the next read attempt for that key.
3. WHEN a cache read is performed for a key that does not exist or has expired, THE In_Lambda_Cache SHALL return a cache miss indicator.
4. THE In_Lambda_Cache SHALL support the same cache key scopes as the ElastiCache implementation: `availability` (TTL: 30 seconds) and `calendar-rates` (TTL: 5 minutes / 300 seconds).
5. WHEN the Lambda execution environment is reused (warm start), THE In_Lambda_Cache SHALL retain cached entries from previous invocations until their TTL expires.
6. WHEN the Lambda execution environment is cold-started, THE In_Lambda_Cache SHALL start with an empty cache.
7. THE In_Lambda_Cache SHALL cap the total number of stored entries at 1000 and evict the least-recently-used entry when the cap is reached.
8. THE In_Lambda_Cache SHALL expose the same interface as the Redis cache adapter (get, set, del, invalidateByPrefix) so the calling code is backend-agnostic.

### Requirement 5: Make WAF Conditional

**Phase:** 1

**User Story:** As an infrastructure operator, I want to make WAF provisioning conditional per environment, so that I can remove it from staging (~$8/month savings) while keeping it in production.

#### Acceptance Criteria

1. THE Terraform_Configuration SHALL define a `waf_enabled` variable of type `bool` with a default value of `true`.
2. WHEN `waf_enabled` is set to `false`, THE Terraform_Configuration SHALL skip creation of the WAF_WebACL and its API Gateway association.
3. WHEN `waf_enabled` is set to `false`, THE Terraform_Configuration SHALL retain API Gateway's built-in throttling as the sole rate-limiting mechanism for that environment.
4. WHEN `waf_enabled` is set to `true`, THE Terraform_Configuration SHALL provision the WAF_WebACL identically to the current behavior.
5. WHEN `waf_enabled` is changed from `true` to `false`, THE Terraform_Configuration SHALL NOT destroy WAF-related CloudWatch log groups until their retention period has elapsed (logs are retained for audit/security review).

---

## Phase 2 — Region Migration & Shared Infrastructure

### Requirement 6: Replace NAT Gateway with fck-nat

**Phase:** 2

**User Story:** As an infrastructure operator, I want to replace the managed NAT Gateway with a fck-nat EC2 instance, so that I save ~$29/month per environment (~$58/month total for staging + prod).

#### Acceptance Criteria

1. THE Terraform_Configuration SHALL define a `nat_gateway_type` variable of type `string` accepting values `"managed"` or `"fck-nat"` with a default of `"managed"`.
2. WHEN `nat_gateway_type` is set to `"fck-nat"`, THE Terraform_Configuration SHALL resolve the fck-nat AMI via an `aws_ami` data source filtered by `name = "fck-nat-al2023-*"`, `architecture = "arm64"`, and owner account `568608671756` (the official fck-nat publisher), selecting the most recent match.
3. WHEN `nat_gateway_type` is set to `"fck-nat"`, THE Terraform_Configuration SHALL provision a t4g.nano EC2 instance in the first public subnet using the resolved AMI.
4. WHEN `nat_gateway_type` is set to `"fck-nat"`, THE Terraform_Configuration SHALL configure the private route table default route to use the fck-nat instance (via network interface) instead of the managed NAT Gateway.
5. WHEN `nat_gateway_type` is set to `"fck-nat"`, THE Terraform_Configuration SHALL skip creation of the managed NAT Gateway and its associated Elastic IP.
6. WHEN `nat_gateway_type` is set to `"fck-nat"`, THE Terraform_Configuration SHALL assign a security group to the fck-nat instance that allows all outbound traffic and inbound traffic only from the VPC CIDR.
7. WHEN `nat_gateway_type` is set to `"fck-nat"`, THE Terraform_Configuration SHALL disable source/destination checks on the fck-nat EC2 instance.
8. WHEN `nat_gateway_type` is set to `"managed"`, THE Terraform_Configuration SHALL provision the NAT_Gateway identically to the current behavior.
9. THE Terraform_Configuration SHALL configure an auto-recovery mechanism using an Auto Scaling Group with min/max/desired = 1 so that the fck-nat instance is automatically replaced if it becomes unhealthy.
10. THE fck-nat instance SHALL have an Elastic IP associated so the outbound IP remains stable across instance replacements (required for any IP-allowlisted external services).

### Requirement 7: Migrate Kalawala to us-east-2

**Phase:** 2

**User Story:** As an infrastructure operator, I want to migrate Kalawala's infrastructure from us-east-1 to us-east-2 (Ohio), so that it can share a VPC with the Wavis project that already runs there.

#### Acceptance Criteria

1. THE Terraform_Configuration SHALL update `aws_region` from `"us-east-1"` to `"us-east-2"` in all environment `.tfvars` files (staging and prod).
2. THE Terraform_Configuration SHALL update `availability_zones` to use `us-east-2` AZs (e.g., `["us-east-2a", "us-east-2b"]`).
3. WHEN the migration is applied, THE Terraform_Configuration SHALL provision all resources (VPC, RDS, ElastiCache, Lambda, API Gateway, WAF, SES) in us-east-2.
4. THE migration SHALL be performed as a destroy-and-recreate operation (new Terraform state in us-east-2), not an in-place modification, since AWS resources cannot be moved between regions.
5. BEFORE destroying us-east-1 resources, THE operator SHALL:
   a. Create a final RDS snapshot in us-east-1.
   b. Copy the snapshot to us-east-2.
   c. Provision the new us-east-2 RDS instance from the copied snapshot.
   d. Verify the new us-east-2 environment is fully operational (Lambda invocations succeed, API Gateway responds, RDS queries return expected data).
   e. Run both environments in parallel for a minimum validation period of 24 hours before destroying us-east-1.
6. THE Terraform_Configuration SHALL update the S3 backend configuration to use a new key prefix for the us-east-2 deployment (the state bucket itself may remain in us-east-1 since S3 is globally accessible).
7. BEFORE the migration, THE operator SHALL re-verify the SES sending domain in us-east-2 by:
   a. Creating the `aws_ses_domain_identity` in us-east-2.
   b. Adding the new DKIM and verification DNS records.
   c. Verifying email sending works in us-east-2 before cutting over.
   d. If the account is sandboxed in us-east-2, requesting production access (this can take 24–48 hours and must be done in advance).
8. IF Kalawala uses custom domains on API Gateway, THE operator SHALL re-issue ACM certificates in us-east-2 before the migration (ACM certificates are region-scoped and cannot be transferred).
9. THE DNS cutover (updating API domain records to point to the us-east-2 API Gateway) SHALL be the final step, performed only after AC 7.5d validation passes.

### Requirement 8: Restructure VPC for Multi-Project Sharing

**Phase:** 2

**User Story:** As an infrastructure operator, I want to restructure the VPC CIDR layout to accommodate both Kalawala and Wavis in a shared network, so that both projects can share NAT, RDS, and other resources.

#### Acceptance Criteria

1. THE Terraform_Configuration SHALL define a `vpc_cidr` of `10.40.0.0/16` for the Shared_VPC.
2. THE Terraform_Configuration SHALL allocate `10.40.0.0/22` for shared public subnets (NAT, internet-facing resources).
3. THE Terraform_Configuration SHALL allocate `10.40.12.0/23` for Kalawala private application subnets (Lambda functions).
4. THE Terraform_Configuration SHALL allocate `10.40.22.0/23` for Kalawala private data subnets (RDS, ElastiCache).
5. THE Terraform_Configuration SHALL define variables for Wavis subnet CIDRs (`10.40.10.0/23` for app, `10.40.20.0/23` for data) so the Wavis_Project can be added without modifying Kalawala's subnet allocations.
6. WHEN the Shared_VPC is provisioned, THE Terraform_Configuration SHALL maintain network isolation between Kalawala and Wavis application subnets via security group rules (no cross-project traffic on application ports).
7. THE Terraform_Configuration SHALL tag all subnets with a `Project` tag indicating which project owns the subnet (`kalawala`, `wavis`, or `shared`).
8. THE Terraform_Configuration SHALL export shared resource identifiers (VPC ID, public subnet IDs, NAT route table ID, shared security group IDs) to SSM Parameter Store under a `/shared-infra/{environment}/` prefix so that Wavis' Terraform can read them without a direct remote state dependency.
9. THE Terraform_Configuration SHALL include a `lifecycle { prevent_destroy = true }` on the VPC resource to prevent accidental destruction of the shared network when either project's Terraform runs a destroy.

### Requirement 9: Shared RDS Instance for Staging

**Phase:** 2

**User Story:** As an infrastructure operator, I want Kalawala and Wavis to share a single RDS instance in staging with separate databases and credentials, so that I save ~$27/month.

#### Acceptance Criteria

1. THE Terraform_Configuration SHALL define a `shared_rds_enabled` variable of type `bool` with a default of `false`.
2. WHEN `shared_rds_enabled` is set to `true`, THE Terraform_Configuration SHALL provision a single db.t4g.small RDS PostgreSQL 16 instance with the initial database `kalawala_booking`.
3. WHEN `shared_rds_enabled` is set to `true`, THE Terraform_Configuration SHALL execute a post-provisioning step (via `null_resource` with `local-exec` running a psql script) to create the `wavis` database and a dedicated `wavis_user` with access restricted to that database only.
4. WHEN `shared_rds_enabled` is set to `true`, THE Terraform_Configuration SHALL create separate Secrets Manager secrets for each project's database credentials (one for `kalawala_admin`/`kalawala_booking`, one for `wavis_user`/`wavis`).
5. WHEN `shared_rds_enabled` is set to `true`, THE Terraform_Configuration SHALL revoke `CREATE` privileges on the `public` schema from the `wavis_user` in the `kalawala_booking` database and vice versa, ensuring no cross-database access.
6. WHEN `shared_rds_enabled` is set to `false`, THE Terraform_Configuration SHALL provision a dedicated RDS instance for Kalawala identically to the current behavior.
7. THE Terraform_Configuration SHALL place the shared RDS instance in the Kalawala private data subnets (`10.40.22.0/23`) with security group rules allowing ingress from both Kalawala (`10.40.12.0/23`) and Wavis (`10.40.10.0/23`) application subnets on port 5432.
8. THE Terraform_Configuration SHALL export the shared RDS endpoint and port to SSM Parameter Store under `/shared-infra/{environment}/rds/` so Wavis can read them without coupling to Kalawala's Terraform state file.
9. IF `shared_rds_enabled` is changed from `true` to `false` (decoupling), THE Terraform_Configuration SHALL NOT destroy the shared RDS instance if the Wavis database still contains data. A manual migration step is required first.

### Requirement 10: Terraform Plan Safety

**Phase:** 1 & 2

**User Story:** As an infrastructure operator, I want all cost optimization changes to produce clean Terraform plans with no unexpected resource destruction, so that I can apply changes confidently.

#### Acceptance Criteria

1. WHEN any cost optimization variable is changed, THE Terraform_Configuration SHALL produce a plan that modifies or destroys only the resources directly related to that variable.
2. WHEN `elasticache_enabled` is changed from `true` to `false`, THE Terraform_Configuration SHALL plan destruction of ElastiCache resources and modification of Lambda environment variables, with no other resource changes.
3. WHEN `waf_enabled` is changed from `true` to `false`, THE Terraform_Configuration SHALL plan destruction of WAF resources only, with no other resource changes.
4. WHEN `nat_gateway_type` is changed from `"managed"` to `"fck-nat"`, THE Terraform_Configuration SHALL plan destruction of the managed NAT Gateway and EIP, creation of the fck-nat instance, and modification of the private route table, with no other resource changes.
5. THE CI/CD pipeline SHALL run `terraform plan -detailed-exitcode` and fail the pipeline if the exit code indicates changes outside the expected scope (enforced via a plan review step that compares planned resource addresses against an allowlist for the given variable change).

### Requirement 11: Cost Validation

**Phase:** 1 & 2

**User Story:** As an infrastructure operator, I want to verify that the combined optimizations achieve the target monthly cost of ~$90/month, so that I can confirm the project meets its financial goal.

#### Acceptance Criteria

1. WHEN all Phase 1 changes are applied (dev decommissioned, Multi-AZ disabled, ElastiCache removed from staging, WAF removed from staging), THE combined monthly cost SHALL decrease by approximately $121/month (from ~$320/month to ~$199/month).
2. WHEN all Phase 2 changes are applied (region migration, fck-nat replacing managed NAT in staging and prod, shared RDS in staging), THE combined monthly cost SHALL decrease by an additional approximately $109/month (from ~$199/month to ~$90/month).
3. THE Terraform_Configuration SHALL include a cost estimate comment in each `.tfvars` file documenting the expected monthly cost for that environment after optimization.
