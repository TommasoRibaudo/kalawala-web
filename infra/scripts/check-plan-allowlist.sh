#!/usr/bin/env bash
# check-plan-allowlist.sh — CI plan safety gate for cost-optimization variable changes.
#
# Usage:
#   terraform plan -json -out=tfplan.bin > tfplan.json
#   bash infra/scripts/check-plan-allowlist.sh tfplan.json [allowlist.yaml]
#
# If no allowlist file is provided the script auto-detects which allowlist to
# load by inspecting the planned resource changes and matching them against the
# known variable-change patterns.
#
# Exit codes:
#   0 — all planned changes are within the allowlist (safe to apply)
#   1 — one or more planned changes are NOT in the allowlist (review required)
#   2 — usage error or missing dependency
#
# Dependencies: jq, python3 (for YAML parsing via PyYAML or fallback grep)
#
# Note: This script targets Linux/GitHub Actions CI. It is not intended to run
# on Windows developer machines.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ALLOWLIST_DIR="${SCRIPT_DIR}/../plan-allowlists"

# ---------------------------------------------------------------------------
# Argument handling
# ---------------------------------------------------------------------------

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <terraform-plan-json> [allowlist.yaml]" >&2
  exit 2
fi

PLAN_JSON="$1"
EXPLICIT_ALLOWLIST="${2:-}"

if [[ ! -f "$PLAN_JSON" ]]; then
  echo "ERROR: Plan JSON file not found: $PLAN_JSON" >&2
  exit 2
fi

# ---------------------------------------------------------------------------
# Dependency checks
# ---------------------------------------------------------------------------

if ! command -v jq &>/dev/null; then
  echo "ERROR: jq is required but not installed." >&2
  exit 2
fi

# ---------------------------------------------------------------------------
# Parse planned resource changes from terraform plan -json output
# ---------------------------------------------------------------------------

# Extract resource_changes array: each entry has address and change.actions[]
# Actions are arrays like ["no-op"], ["create"], ["delete"], ["update"],
# ["create","delete"] (replace), or ["delete","create"] (replace).

parse_plan_changes() {
  local plan_file="$1"
  # Output: "<action> <address>" lines, one per resource change (excluding no-op)
  #
  # tr -d '\r': jq on Windows writes CRLF, while the allowlist parser below
  # emits LF. Without this the two sides never compare equal and every change
  # is reported as a violation. No-op on Linux/CI.
  jq -r '
    .resource_changes[]?
    | select(.change.actions != ["no-op"])
    | .change.actions[] as $action
    | select($action != "no-op")
    | "\($action) \(.address)"
  ' "$plan_file" | tr -d '\r'
}

# ---------------------------------------------------------------------------
# Auto-detect allowlist based on planned changes
# ---------------------------------------------------------------------------

detect_allowlist() {
  local plan_file="$1"
  local changes
  changes="$(parse_plan_changes "$plan_file")"

  # NOTE: ElastiCache detection was removed along with the ElastiCache
  # resources themselves — booking-api has no Redis client, so the cache was
  # never reachable. See infra/environments/prod.tfvars.

  # Check for WAF WebACL being destroyed
  if echo "$changes" | grep -q "delete aws_wafv2_web_acl\.booking_api"; then
    echo "${ALLOWLIST_DIR}/waf-disabled.yaml"
    return
  fi

  # Check for fck-nat resources being created (NAT gateway swap)
  if echo "$changes" | grep -q "create aws_autoscaling_group\.fck_nat"; then
    echo "${ALLOWLIST_DIR}/nat-fck-nat.yaml"
    return
  fi

  # Check for RDS instance being updated (Multi-AZ change)
  if echo "$changes" | grep -q "update aws_db_instance\.main"; then
    echo "${ALLOWLIST_DIR}/multi-az-disabled.yaml"
    return
  fi

  echo ""
}

# ---------------------------------------------------------------------------
# Load allowlist entries from YAML
# ---------------------------------------------------------------------------

# Parse the YAML allowlist into a flat list of "<action> <address>" entries.
# Uses python3 with PyYAML if available, otherwise falls back to grep-based
# parsing (works for the simple list-of-strings YAML format used here).

load_allowlist() {
  local yaml_file="$1"

  # Two normalizations, both required for the comparison in main() to work:
  #
  #   tr -d '\r'  — allowlists checked out with CRLF parse the same as LF ones
  #                 (repo is developed on Windows, CI runs on Linux).
  #
  #   destroy->delete — the YAML files say "destroy:" because that is the
  #                 Terraform CLI verb, but `terraform plan -json` reports the
  #                 action as "delete". Without this alias every destroy entry
  #                 in every allowlist silently fails to match, which makes the
  #                 gate reject exactly the teardowns it exists to approve.
  _load_allowlist_raw "$yaml_file" | tr -d '\r' | sed 's/^destroy /delete /'
}

_load_allowlist_raw() {
  local yaml_file="$1"

  if python3 -c "import yaml" &>/dev/null 2>&1; then
    python3 - "$yaml_file" <<'PYEOF'
import sys, yaml

with open(sys.argv[1]) as f:
    data = yaml.safe_load(f)

allowed = data.get("allowed_actions", {})
for action, addresses in allowed.items():
    if addresses:
        for addr in addresses:
            print(f"{action} {addr}")
PYEOF
  else
    # Fallback: grep-based YAML parser for simple list format.
    # Reads lines under each action key and strips YAML list markers.
    local current_action=""
    while IFS= read -r line; do
      # Match action keys: "  destroy:", "  create:", "  update:"
      if [[ "$line" =~ ^[[:space:]]+(destroy|create|update): ]]; then
        current_action="${BASH_REMATCH[1]}"
        continue
      fi
      # Match list items: '    - "resource.address"'
      if [[ -n "$current_action" && "$line" =~ ^[[:space:]]+-[[:space:]]+\"(.+)\" ]]; then
        echo "${current_action} ${BASH_REMATCH[1]}"
      fi
    done < "$yaml_file"
  fi
}

# ---------------------------------------------------------------------------
# Main validation logic
# ---------------------------------------------------------------------------

main() {
  # Determine which allowlist to use
  local allowlist_file
  if [[ -n "$EXPLICIT_ALLOWLIST" ]]; then
    allowlist_file="$EXPLICIT_ALLOWLIST"
  else
    allowlist_file="$(detect_allowlist "$PLAN_JSON")"
  fi

  if [[ -z "$allowlist_file" ]]; then
    echo "INFO: No matching allowlist detected. No cost-optimization variable changes found in plan."
    echo "INFO: If this is unexpected, specify an allowlist explicitly: $0 <plan.json> <allowlist.yaml>"
    exit 0
  fi

  if [[ ! -f "$allowlist_file" ]]; then
    echo "ERROR: Allowlist file not found: $allowlist_file" >&2
    exit 2
  fi

  echo "Using allowlist: $allowlist_file"
  echo ""

  # Load allowed entries into an associative set
  declare -A allowed_set
  while IFS= read -r entry; do
    [[ -n "$entry" ]] && allowed_set["$entry"]=1
  done < <(load_allowlist "$allowlist_file")

  if [[ ${#allowed_set[@]} -eq 0 ]]; then
    echo "WARNING: Allowlist loaded 0 entries. Check YAML format." >&2
  fi

  # Parse planned changes and check each against the allowlist
  local violations=0
  local checked=0

  while IFS= read -r change; do
    [[ -z "$change" ]] && continue
    checked=$((checked + 1))

    if [[ -n "${allowed_set[$change]+_}" ]]; then
      echo "  OK  : $change"
    else
      echo "  FAIL: $change  <-- NOT IN ALLOWLIST"
      violations=$((violations + 1))
    fi
  done < <(parse_plan_changes "$PLAN_JSON")

  echo ""
  echo "Checked $checked planned change(s) against allowlist."

  if [[ $violations -gt 0 ]]; then
    echo ""
    echo "FAILED: $violations change(s) are outside the expected scope for this variable change."
    echo "Review the plan carefully before applying. If the changes are intentional,"
    echo "update the allowlist at: $allowlist_file"
    exit 1
  fi

  echo "PASSED: All planned changes are within the allowlist."
  exit 0
}

main
