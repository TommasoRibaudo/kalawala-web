#!/usr/bin/env bash
#
# Full-flow booking acceptance test runner.
#
# Brings up the local booking stack (Postgres + mock Smoobu + booking-api) and
# drives the whole guest journey with Playwright: search -> hold -> PayPal
# approve -> capture -> portal login -> cancel -> dates released.
#
# PayPal is the only provider made real. Two modes:
#
#   ./scripts/booking-live-e2e.sh              # mock PayPal (default) — no creds,
#                                              # no money, no external calls.
#   ./scripts/booking-live-e2e.sh --sandbox    # real PayPal *sandbox*: reads
#                                              # booking-api/.env.sandbox and logs
#                                              # in as the sandbox buyer to approve.
#
# Smoobu is ALWAYS mocked (it has no sandbox), so this never blocks real
# inventory and is safe to run on every PR.
#
# The CRA frontend is started by Playwright's webServer (see
# playwright.live.config.ts). This script owns docker, migrations, and the
# api+mocks process, and tears them down on exit.

set -euo pipefail
cd "$(dirname "$0")/.."

MODE="mock"
if [[ "${1:-}" == "--sandbox" ]]; then
  MODE="sandbox"
  shift
fi
# Remaining args ($@) are forwarded to `playwright test` (e.g. --headed, --debug).

API_PID=""

cleanup() {
  echo "→ tearing down..."
  if [[ -n "$API_PID" ]] && kill -0 "$API_PID" 2>/dev/null; then
    kill "$API_PID" 2>/dev/null || true
    wait "$API_PID" 2>/dev/null || true
  fi
  # Leave docker up by default (fast re-runs); set STOP_DOCKER=1 to bring it down.
  if [[ "${STOP_DOCKER:-0}" == "1" ]]; then
    npm run local:down || true
  fi
}
trap cleanup EXIT

wait_for_http() {
  local url="$1" name="$2" tries="${3:-60}"
  echo -n "→ waiting for $name ($url) "
  for _ in $(seq 1 "$tries"); do
    if curl -sf -o /dev/null "$url"; then echo "✓"; return 0; fi
    echo -n "."
    sleep 1
  done
  echo " ✗"
  echo "ERROR: $name did not come up at $url" >&2
  return 1
}

# ── 1. Local env ──────────────────────────────────────────────────────────────
if [[ ! -f booking-api/.env.local ]]; then
  echo "→ creating booking-api/.env.local from the example (mock providers, local Postgres)"
  cp booking-api/.env.local.example booking-api/.env.local
fi

# ── 2. Sandbox PayPal overrides ───────────────────────────────────────────────
export PAYPAL_APPROVAL_MODE="$MODE"
if [[ "$MODE" == "sandbox" ]]; then
  # Local runs read creds from the gitignored file; CI provides them as env vars
  # (GitHub Actions secrets), where the file is absent.
  if [[ -f booking-api/.env.sandbox ]]; then
    # shellcheck disable=SC1091
    set -a; . ./booking-api/.env.sandbox; set +a
  fi
  # Default the API host to the sandbox if only the credentials were provided.
  : "${PAYPAL_BASE_URL:=https://api-m.sandbox.paypal.com}"
  # Exported so they win over .env.local inside loadEnv.js (process env always
  # wins) for the booking-api, and so Playwright's process inherits the buyer
  # creds for the approval step.
  export PAYPAL_BASE_URL PAYPAL_CLIENT_ID PAYPAL_CLIENT_SECRET \
         PAYPAL_SANDBOX_BUYER_EMAIL PAYPAL_SANDBOX_BUYER_PASSWORD
  for v in PAYPAL_CLIENT_ID PAYPAL_CLIENT_SECRET PAYPAL_SANDBOX_BUYER_EMAIL PAYPAL_SANDBOX_BUYER_PASSWORD; do
    val="${!v:-}"
    if [[ -z "$val" || "$val" == REPLACE_* ]]; then
      echo "ERROR: $v is not set. Fill booking-api/.env.sandbox locally, or set the GitHub secret in CI." >&2
      exit 1
    fi
  done
  echo "→ PayPal: REAL sandbox ($PAYPAL_BASE_URL) as buyer ${PAYPAL_SANDBOX_BUYER_EMAIL}"
else
  echo "→ PayPal: local mock (no external calls, no money)"
fi

# ── 3. Stack up ───────────────────────────────────────────────────────────────
echo "→ docker up (Postgres + MinIO)"
npm run local:up
# Postgres on host :5433 (see docker-compose.yml / .env.local.example)
echo -n "→ waiting for Postgres :5433 "
for _ in $(seq 1 60); do
  if (exec 3<>/dev/tcp/127.0.0.1/5433) 2>/dev/null; then exec 3>&- 3<&-; echo "✓"; break; fi
  echo -n "."; sleep 1
done

echo "→ migrate"
npm run local:migrate

echo "→ build booking-api"
npm --prefix booking-api run build

echo "→ starting booking-api + mock providers (:4000 / :4010)"
npm run local:api > /tmp/booking-live-api.log 2>&1 &
API_PID=$!

wait_for_http "http://localhost:4010/api/apartments" "mock providers" 60
wait_for_http "http://localhost:4000/api/health" "booking-api" 60

# ── 4. Run the flow ───────────────────────────────────────────────────────────
echo "→ running Playwright ($MODE PayPal)"
npx playwright test --config=playwright.live.config.ts "$@"
