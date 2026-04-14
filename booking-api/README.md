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
  - no query-string secrets on the new Smoobu webhook route.
- Contract-level validators for the planned booking endpoints.
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
| `BOOKING_API_ABUSE_PROTECTION_ENABLED` | Optional boolean, defaults to `true`. |
| `BOOKING_API_CAPTCHA_CHALLENGES_ENABLED` | Optional boolean, defaults to `true`. |
| `BOOKING_API_RATE_LIMIT_MAX_BUCKETS` | Optional in-memory limiter bucket cap, defaults to `10000`. |
| `SMOOBU_WEBHOOK_SECRET` | Shared secret for `X-Smoobu-Webhook-Secret`; fail-closed when unset. |

Provider integrations, database adapters, durable Redis/WAF rate-limit backing,
and observability are implemented in later booking-engine tasks.
