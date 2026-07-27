#!/usr/bin/env bash
# Temporary test script — validates check-plan-allowlist.sh logic
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CHECK_SCRIPT="$SCRIPT_DIR/check-plan-allowlist.sh"
ALLOWLISTS_DIR="$SCRIPT_DIR/../plan-allowlists"

PASS=0
FAIL=0

run_test() {
  local name="$1"
  local plan_json="$2"
  local allowlist="$3"
  local expected_exit="$4"

  actual_exit=0
  bash "$CHECK_SCRIPT" "$plan_json" "$allowlist" > /tmp/test-output.txt 2>&1 || actual_exit=$?

  if [[ "$actual_exit" -eq "$expected_exit" ]]; then
    echo "PASS: $name"
    PASS=$((PASS + 1))
  else
    echo "FAIL: $name (expected exit $expected_exit, got $actual_exit)"
    cat /tmp/test-output.txt
    FAIL=$((FAIL + 1))
  fi
}

# ---------------------------------------------------------------------------
# Test 1: All changes allowed (nat-fck-nat)
# ---------------------------------------------------------------------------
cat > /tmp/plan-allowed.json << 'EOF'
{
  "resource_changes": [
    {
      "address": "aws_nat_gateway.main[0]",
      "change": { "actions": ["delete"] }
    },
    {
      "address": "aws_eip.nat[0]",
      "change": { "actions": ["delete"] }
    },
    {
      "address": "aws_autoscaling_group.fck_nat[0]",
      "change": { "actions": ["create"] }
    },
    {
      "address": "aws_route_table.private",
      "change": { "actions": ["update"] }
    },
    {
      "address": "aws_route53_record.something",
      "change": { "actions": ["no-op"] }
    }
  ]
}
EOF
run_test "All changes allowed (nat-fck-nat)" \
  /tmp/plan-allowed.json \
  "$ALLOWLISTS_DIR/nat-fck-nat.yaml" \
  0

# ---------------------------------------------------------------------------
# Test 2: Unexpected change present (should fail)
# ---------------------------------------------------------------------------
cat > /tmp/plan-blocked.json << 'EOF'
{
  "resource_changes": [
    {
      "address": "aws_nat_gateway.main[0]",
      "change": { "actions": ["delete"] }
    },
    {
      "address": "aws_db_instance.main",
      "change": { "actions": ["delete"] }
    }
  ]
}
EOF
run_test "Unexpected change blocked (nat-fck-nat)" \
  /tmp/plan-blocked.json \
  "$ALLOWLISTS_DIR/nat-fck-nat.yaml" \
  1

# ---------------------------------------------------------------------------
# Test 3: No-op only plan (should pass with no changes)
# ---------------------------------------------------------------------------
cat > /tmp/plan-noop.json << 'EOF'
{
  "resource_changes": [
    {
      "address": "aws_vpc.main",
      "change": { "actions": ["no-op"] }
    }
  ]
}
EOF
run_test "No-op only plan (no changes)" \
  /tmp/plan-noop.json \
  "$ALLOWLISTS_DIR/nat-fck-nat.yaml" \
  0

# ---------------------------------------------------------------------------
# Test 4: WAF disabled allowlist
# ---------------------------------------------------------------------------
cat > /tmp/plan-waf.json << 'EOF'
{
  "resource_changes": [
    {
      "address": "aws_wafv2_web_acl.booking_api[0]",
      "change": { "actions": ["delete"] }
    },
    {
      "address": "aws_wafv2_web_acl_association.booking_api[0]",
      "change": { "actions": ["delete"] }
    }
  ]
}
EOF
run_test "WAF disabled allowlist (all allowed)" \
  /tmp/plan-waf.json \
  "$ALLOWLISTS_DIR/waf-disabled.yaml" \
  0

# ---------------------------------------------------------------------------
# Test 5: nat-fck-nat allowlist with create + destroy + update
# ---------------------------------------------------------------------------
cat > /tmp/plan-fcknat.json << 'EOF'
{
  "resource_changes": [
    {
      "address": "aws_nat_gateway.main[0]",
      "change": { "actions": ["delete"] }
    },
    {
      "address": "aws_eip.nat[0]",
      "change": { "actions": ["delete"] }
    },
    {
      "address": "aws_eip.fck_nat[0]",
      "change": { "actions": ["create"] }
    },
    {
      "address": "aws_launch_template.fck_nat[0]",
      "change": { "actions": ["create"] }
    },
    {
      "address": "aws_route_table.private",
      "change": { "actions": ["update"] }
    }
  ]
}
EOF
run_test "fck-nat allowlist (destroy + create + update)" \
  /tmp/plan-fcknat.json \
  "$ALLOWLISTS_DIR/nat-fck-nat.yaml" \
  0

# ---------------------------------------------------------------------------
# Test 6: fck-nat plan with unexpected extra destroy (should fail)
# ---------------------------------------------------------------------------
cat > /tmp/plan-fcknat-bad.json << 'EOF'
{
  "resource_changes": [
    {
      "address": "aws_nat_gateway.main[0]",
      "change": { "actions": ["delete"] }
    },
    {
      "address": "aws_vpc.main",
      "change": { "actions": ["delete"] }
    }
  ]
}
EOF
run_test "fck-nat plan with unexpected VPC destroy (blocked)" \
  /tmp/plan-fcknat-bad.json \
  "$ALLOWLISTS_DIR/nat-fck-nat.yaml" \
  1

# ---------------------------------------------------------------------------
# Test 7: multi-az-disabled allowlist
# ---------------------------------------------------------------------------
cat > /tmp/plan-multiaz.json << 'EOF'
{
  "resource_changes": [
    {
      "address": "aws_db_instance.main",
      "change": { "actions": ["update"] }
    }
  ]
}
EOF
run_test "multi-az-disabled allowlist (update only)" \
  /tmp/plan-multiaz.json \
  "$ALLOWLISTS_DIR/multi-az-disabled.yaml" \
  0

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
echo ""
echo "Results: $PASS passed, $FAIL failed"
[[ $FAIL -eq 0 ]]
