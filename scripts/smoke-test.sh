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

# 4. Hold creation + PayPal order creation (opt-in, off by default)
#
# /api/health, /api/calendar and /api/search never touch the hold -> PayPal
# create-order path, so a broken PayPal integration (bad payload, restricted
# merchant account, unsupported currency — see paypalClient.ts's createOrder)
# passed every check above while guests with an active hold got a bare 502 and
# could not pay. This check drives that exact path end to end.
#
# It has real side effects — a Smoobu "Blocked" channel-11 reservation and, in
# an environment wired to live PayPal, a real (never captured, so never
# charged) PayPal order — so it only runs when explicitly enabled. Dates are
# fixed far in the future (2099) so the hold can never collide with a real
# guest's stay, and its TTL means the hold_expiry cron auto-cancels the Smoobu
# reservation on its own even if this script never gets to clean up.
if [[ "${SMOKE_TEST_PAYPAL_INTEGRATION:-false}" == "true" ]]; then
  SMOKE_GUEST_EMAIL="${SMOKE_TEST_GUEST_EMAIL:?SMOKE_TEST_GUEST_EMAIL must be set when SMOKE_TEST_PAYPAL_INTEGRATION=true}"
  RUN_ID="smoke-$(date +%s)-$$"

  SEARCH_BODY='{"arrivalDate":"2099-11-10","departureDate":"2099-11-14","guests":2,"language":"en","source":"smoke_test"}'
  STATUS=$(http_post "$BASE_URL/api/search" "$SEARCH_BODY")
  SEARCH_RESPONSE=$(body)

  if [[ "$STATUS" != "200" ]]; then
    red "POST /api/search (setup for hold smoke test) — expected 200, got $STATUS"
    echo "  Response body: $SEARCH_RESPONSE" >&2
    FAIL=$(( FAIL + 1 ))
  else
    BOOKING_SESSION_ID=$(echo "$SEARCH_RESPONSE" | jq -r '.bookingSessionId // empty')
    QUOTE_ID=$(echo "$SEARCH_RESPONSE" | jq -r '.quoteId // empty')
    PROPERTY_ID=$(echo "$SEARCH_RESPONSE" | jq -r '.properties[0].propertyId // empty')

    if [[ -z "$BOOKING_SESSION_ID" || -z "$QUOTE_ID" || -z "$PROPERTY_ID" ]]; then
      red "POST /api/search (setup for hold smoke test) — no properties available for 2099-11-10..2099-11-14, cannot continue"
      FAIL=$(( FAIL + 1 ))
    else
      HOLD_BODY=$(jq -n \
        --arg quoteId "$QUOTE_ID" \
        --arg bookingSessionId "$BOOKING_SESSION_ID" \
        --arg propertyId "$PROPERTY_ID" \
        --arg email "$SMOKE_GUEST_EMAIL" \
        '{
          quoteId: $quoteId,
          bookingSessionId: $bookingSessionId,
          propertyId: $propertyId,
          paymentMethod: "paypal",
          guest: {firstName: "Smoke", lastName: "Test", email: $email, phone: "+10000000000", country: "CR"},
          portalPassword: "smoke-test-password-not-real",
          termsAccepted: true
        }')

      HOLD_STATUS=$(curl -s -o /tmp/smoke_body.txt -w "%{http_code}" \
        --max-time "$TIMEOUT" \
        -X POST \
        -H "Content-Type: application/json" \
        -H "Origin: $ORIGIN" \
        -H "Idempotency-Key: ${RUN_ID}-hold" \
        -d "$HOLD_BODY" \
        "$BASE_URL/api/holds" || echo "000")
      HOLD_RESPONSE=$(body)
      check "POST /api/holds (hold smoke test)" "200" "$HOLD_STATUS" "$HOLD_RESPONSE"

      if [[ "$HOLD_STATUS" == "200" ]]; then
        ORDER_STATUS=$(curl -s -o /tmp/smoke_body.txt -w "%{http_code}" \
          --max-time "$TIMEOUT" \
          -X POST \
          -H "Content-Type: application/json" \
          -H "Origin: $ORIGIN" \
          -H "Idempotency-Key: ${RUN_ID}-order" \
          -d "{\"bookingSessionId\":\"$BOOKING_SESSION_ID\"}" \
          "$BASE_URL/api/paypal/order" || echo "000")
        ORDER_RESPONSE=$(body)
        check "POST /api/paypal/order (hold smoke test)" "200" "$ORDER_STATUS" "$ORDER_RESPONSE"
      fi
    fi
  fi
fi

# 5. CORS preflight
STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  --max-time "$TIMEOUT" \
  -X OPTIONS \
  -H "Origin: $ORIGIN" \
  -H "Access-Control-Request-Method: POST" \
  "$BASE_URL/api/search" || echo "000")
# 200 and 204 are both valid preflight responses; API Gateway answers 204. Assert
# on the CORS header instead, which is what actually has to be right.
ACAO=$(curl -s -o /dev/null -w "%{http_code}"   --max-time "$TIMEOUT"   -X OPTIONS   -H "Origin: $ORIGIN"   -H "Access-Control-Request-Method: POST"   -D /tmp/smoke-preflight-headers.txt   "$BASE_URL/api/search" >/dev/null 2>&1; grep -ci "access-control-allow-origin" /tmp/smoke-preflight-headers.txt 2>/dev/null || echo 0)

if [[ "$STATUS" == "200" || "$STATUS" == "204" ]] && [[ "$ACAO" -ge 1 ]]; then
  green "OPTIONS /api/search (CORS preflight) (HTTP $STATUS, Access-Control-Allow-Origin present)"
  PASS=$(( PASS + 1 ))
else
  red "OPTIONS /api/search (CORS preflight) — status $STATUS, Access-Control-Allow-Origin count $ACAO"
  FAIL=$(( FAIL + 1 ))
fi

# ── summary ────────────────────────────────────────────────────────────────────

echo "---"
echo "Results: $PASS passed, $FAIL failed"

if [[ "$FAIL" -gt 0 ]]; then
  exit 1
fi
