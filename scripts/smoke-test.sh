#!/usr/bin/env bash
# Post-deploy smoke test for the Kalawala booking API.
# Usage: BOOKING_API_BASE_URL=https://... bash scripts/smoke-test.sh
# Exit code: 0 = all checks passed, 1 = any check failed.

set -euo pipefail

BASE_URL="${BOOKING_API_BASE_URL:?BOOKING_API_BASE_URL must be set}"
ORIGIN="${SMOKE_ORIGIN:-https://kalawala.com}"
TIMEOUT=15
PASS=0
FAIL=0

# ── helpers ────────────────────────────────────────────────────────────────────

green() { printf '\033[0;32m✓ %s\033[0m\n' "$*"; }
red()   { printf '\033[0;31m✗ %s\033[0m\n' "$*"; }

check() {
  local name="$1"
  local expected_status="$2"
  local actual_status="$3"
  local body="$4"

  if [[ "$actual_status" == "$expected_status" ]]; then
    green "$name (HTTP $actual_status)"
    PASS=$(( PASS + 1 ))
  else
    red "$name — expected HTTP $expected_status, got $actual_status"
    if [[ -n "$body" ]]; then
      echo "  Response body: $body" >&2
    fi
    FAIL=$(( FAIL + 1 ))
  fi
}

http_get() {
  curl -s -o /tmp/smoke_body.txt -w "%{http_code}" \
    --max-time "$TIMEOUT" \
    -H "Origin: $ORIGIN" \
    "$1" || echo "000"
}

http_post() {
  local url="$1"
  local body="$2"
  curl -s -o /tmp/smoke_body.txt -w "%{http_code}" \
    --max-time "$TIMEOUT" \
    -X POST \
    -H "Content-Type: application/json" \
    -H "Origin: $ORIGIN" \
    -d "$body" \
    "$url" || echo "000"
}

body() { cat /tmp/smoke_body.txt 2>/dev/null || echo ""; }

# ── checks ─────────────────────────────────────────────────────────────────────

echo "Smoke test: $BASE_URL"
echo "---"

# 1. Health check
STATUS=$(http_get "$BASE_URL/api/health")
check "GET /api/health" "200" "$STATUS" "$(body)"

# 2. Calendar endpoint (read-only, no Smoobu API call for cached months)
MONTH=$(date +%Y-%m)
STATUS=$(http_get "$BASE_URL/api/calendar/Geco?month=$MONTH")
# 200 (cached/live data) or 503 (provider unavailable) are both acceptable for
# a basic connectivity check; we just need a non-500 gateway error.
BODY=$(body)
if [[ "$STATUS" == "200" || "$STATUS" == "503" ]]; then
  green "GET /api/calendar/Geco?month=$MONTH (HTTP $STATUS)"
  PASS=$(( PASS + 1 ))
else
  red "GET /api/calendar/Geco?month=$MONTH — unexpected status $STATUS"
  echo "  Response body: $BODY" >&2
  FAIL=$(( FAIL + 1 ))
fi

# 3. Search endpoint connectivity (validates Smoobu integration is wired up)
# Dates well in the future to avoid calendar conflicts.
SEARCH_BODY='{"arrivalDate":"2099-11-10","departureDate":"2099-11-14","guests":2,"language":"en","source":"smoke_test"}'
STATUS=$(http_post "$BASE_URL/api/search" "$SEARCH_BODY")
BODY=$(body)
# 200 = Smoobu live, 503 = provider config missing (secrets not seeded) — both
# mean the Lambda is running and routing correctly.
if [[ "$STATUS" == "200" || "$STATUS" == "503" ]]; then
  green "POST /api/search (HTTP $STATUS)"
  PASS=$(( PASS + 1 ))
else
  red "POST /api/search — unexpected status $STATUS"
  echo "  Response body: $BODY" >&2
  FAIL=$(( FAIL + 1 ))
fi

# 4. CORS preflight
STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  --max-time "$TIMEOUT" \
  -X OPTIONS \
  -H "Origin: $ORIGIN" \
  -H "Access-Control-Request-Method: POST" \
  "$BASE_URL/api/search" || echo "000")
check "OPTIONS /api/search (CORS preflight)" "200" "$STATUS" ""

# ── summary ────────────────────────────────────────────────────────────────────

echo "---"
echo "Results: $PASS passed, $FAIL failed"

if [[ "$FAIL" -gt 0 ]]; then
  exit 1
fi
