# Kalawala Booking API

Task 2.1 scaffold for the backend-only booking engine.

This service is intentionally separate from the CRA frontend so Smoobu, PayPal,
database, and webhook secrets never enter the browser bundle.

## Current Scope

- Lambda/API Gateway-compatible TypeScript entrypoint.
- Minimal internal router with path parameters.
- JSON request parsing with raw-body preservation for webhooks.
- Public endpoint hardening:
  - correlation IDs,
  - security headers,
  - CORS allowlist,
  - `Cache-Control` defaults,
  - request body size limit,
  - JSON content-type checks,
  - idempotency key enforcement for public write endpoints,
  - per-IP and per-device rate limits,
  - CAPTCHA challenge triggers for repeated hold/order creation attempts,
  - no query-string secrets on the new Smoobu webhook route,
  - Secrets Manager-backed provider credentials with fail-closed validation.
- Observability baseline:
  - structured JSON request logs,
  - correlation IDs on responses and logs,
  - hashed client identifiers in logs,
  - recursive secret redaction,
  - CloudWatch Embedded Metric Format metrics,
  - operational alert signals for webhook failures, rate limits, CAPTCHA
    escalations, provider degradation, and future state-transition failures.
- Contract-level validators for the planned booking endpoints.
- PayPal hold creation:
  - quote/session validation,
  - just-in-time Smoobu availability recheck,
  - local hold state with overlap protection,
  - Smoobu provisional reservation creation using the blocked channel by default,
  - idempotent success replay for hold creation retries.
- Fail-closed placeholder handlers for provider/database work scheduled in later
  tasks.

## Scripts

```bash
npm run booking-api:typecheck
npm run booking-api:build
```

## Environment

| Variable | Purpose |
| --- | --- |
| `BOOKING_API_ALLOWED_ORIGINS` | Comma-separated CORS allowlist. |
| `BOOKING_API_MAX_BODY_BYTES` | Optional JSON body limit, defaults to `65536`. |
| `BOOKING_API_SECRETS_MANAGER_SECRET_ID` | AWS Secrets Manager secret ID/ARN for the booking provider secret bundle. Required outside local/test. |
| `BOOKING_API_SECRETS_EXTENSION_ENDPOINT` | Optional AWS Parameters and Secrets Lambda Extension endpoint, defaults to `http://localhost:2773`. |
| `BOOKING_API_SECRETS_CACHE_TTL_MS` | Optional in-process secret cache TTL, defaults to `300000`. |
| `BOOKING_API_SECRETS_FETCH_TIMEOUT_MS` | Optional Secrets Manager extension fetch timeout, defaults to `2000`. |
| `BOOKING_API_ABUSE_PROTECTION_ENABLED` | Optional boolean, defaults to `true`. |
| `BOOKING_API_CAPTCHA_CHALLENGES_ENABLED` | Optional boolean, defaults to `true`. |
| `BOOKING_API_RATE_LIMIT_MAX_BUCKETS` | Optional in-memory limiter bucket cap, defaults to `10000`. |
| `BOOKING_API_SERVICE_NAME` | Optional structured-log/metric service name, defaults to `booking-api`. |
| `BOOKING_API_ENVIRONMENT` | Optional structured-log/metric environment, defaults to `NODE_ENV` or `local`. |
| `BOOKING_API_LOG_LEVEL` | Optional log level: `debug`, `info`, `warn`, `error`, or `silent`; defaults to `info`. |
| `BOOKING_API_METRICS_ENABLED` | Optional boolean for CloudWatch EMF metrics, defaults to `true`. |
| `SMOOBU_BASE_URL` | Optional Smoobu API origin, defaults to `https://login.smoobu.com`. |
| `SMOOBU_CUSTOMER_ID` | Required for `POST /api/search`; Smoobu customer/user ID used with configured apartment IDs. |
| `SMOOBU_TIMEOUT_MS` | Optional outbound Smoobu fetch timeout, defaults to `8000`. |
| `SMOOBU_MAX_RETRIES` | Optional retry count for idempotent Smoobu calls, defaults to `3`. |
| `SMOOBU_BASE_BACKOFF_MS` | Optional first retry backoff, defaults to `250`. |
| `SMOOBU_MAX_BACKOFF_MS` | Optional max exponential backoff, defaults to `2000`. |
| `SMOOBU_MAX_RATE_LIMIT_DELAY_MS` | Optional cap for honoring Smoobu retry-after waits, defaults to `60000`. |
| `SMOOBU_HOLD_CHANNEL_ID` | Optional Smoobu channel for unpaid PayPal holds. Defaults to `11` (Blocked channel); `13` is the config-gated Direct booking fallback. |
| `PAYPAL_HOLD_TTL_MINUTES` | Optional PayPal hold duration, defaults to `60`. |
| `BOOKING_API_IDEMPOTENCY_TTL_MINUTES` | Optional public write idempotency retention window, defaults to `1440`. |
| `BOOKING_API_STALE_IDEMPOTENCY_LOCK_SECONDS` | Optional stale in-progress idempotency lock timeout, defaults to `120`. |

The Secrets Manager value must be a JSON object with this shape:

```json
{
  "smoobuApiKey": "stored only in Secrets Manager",
  "paypalClientId": "stored only in Secrets Manager",
  "paypalClientSecret": "stored only in Secrets Manager",
  "paypalWebhookId": "stored only in Secrets Manager",
  "smoobuWebhookSecret": "shared header value for X-Smoobu-Webhook-Secret",
  "bookingEncryptionKeyBase64": "base64-encoded 32-byte key",
  "portalSessionSecret": "high-entropy signing secret"
}
```

For local tests only, `BOOKING_API_SECRETS_JSON` or individual raw env vars can
be enabled with `BOOKING_API_ALLOW_INSECURE_ENV_SECRETS=true`. Do not use those
raw secret modes for deployed environments.

Provider integrations, database adapters, durable Redis/WAF rate-limit backing,
and Terraform-managed CloudWatch alarms/dashboards are implemented in later
booking-engine tasks.

See `docs/own_booking_engine/observability.md` for the metric and alert
contract.
