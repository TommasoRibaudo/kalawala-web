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
- `GET /api/exchange-rate`: cached USD→CRC reference rate for the Spanish
  booking pages. Display only — every quote, hold and payment stays in USD.
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
npm run booking-api:migrate
```

From inside `booking-api/`, use:

```bash
npm run typecheck
npm run build
npm run migrate
```

## Writing migrations

`scripts/migrate.js` applies every pending file in **one transaction**, and
checksums each one after it is applied — so a file that has already run can
never be edited. Fix a mistake with a new numbered migration.

Two rules that are easy to trip over:

- **Extending an enum needs its own run.** PostgreSQL allows
  `alter type ... add value` inside a transaction block, but the new label cannot
  be *used* until that transaction commits. Keep the `alter type` as a
  top-level statement (it is rejected inside a `do $$` block), and make sure no
  migration pending in the same run references the new value in a CHECK, index
  predicate, INSERT or UPDATE. Land it, then deploy the code that writes it.
  See `0014_manual_deposit.sql`.
- **Local Postgres has no TLS.** `npm run migrate:local` sets
  `BOOKING_API_MIGRATION_SSL=false` and loads `.env.local` for you; the plain
  `npm run migrate` keeps TLS on for RDS.

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
| `CAPTCHA_PROVIDER` | `recaptcha` (default) or `hcaptcha`. Must match the widget the frontend ships — a mismatch fails every verification and makes challenges unclearable. |
| `CAPTCHA_SECRET_KEY` | Optional local-dev override for the verification secret. Deployed environments read `captchaSecretKey` from the combined Secrets Manager entry instead. |
| `CAPTCHA_VERIFY_URL` | Optional verification endpoint override, for tests only. Defaults to the provider's production URL. |
| `BOOKING_API_SERVICE_NAME` | Optional structured-log/metric service name, defaults to `booking-api`. |
| `BOOKING_API_ENVIRONMENT` | Optional structured-log/metric environment, defaults to `NODE_ENV` or `local`. |
| `BOOKING_API_LOG_LEVEL` | Optional log level: `debug`, `info`, `warn`, `error`, or `silent`; defaults to `info`. |
| `BOOKING_API_METRICS_ENABLED` | Optional boolean for CloudWatch EMF metrics, defaults to `true`. |
| `BOOKING_API_RDS_CONNECTION_STRING` | Local-only raw RDS/PostgreSQL connection string when insecure env secrets are explicitly enabled. Prefer Secrets Manager for deployed environments. |
| `DATABASE_URL` | Optional fallback connection string for `npm run migrate` only. |
| `BOOKING_API_MIGRATION_SSL` | Optional migration runner override. Defaults to TLS enabled; set to `false` only for local PostgreSQL. |
| `BOOKING_API_MIGRATION_SSL_REJECT_UNAUTHORIZED` | Optional migration runner override. Defaults to `true`; set to `false` only when using a local/self-signed test database. |
| `SMOOBU_BASE_URL` | Optional Smoobu API origin, defaults to `https://login.smoobu.com`. |
| `SMOOBU_CUSTOMER_ID` | Required for `POST /api/search`; Smoobu customer/user ID used with configured apartment IDs. |
| `SMOOBU_TIMEOUT_MS` | Optional outbound Smoobu fetch timeout, defaults to `8000`. |
| `SMOOBU_MAX_RETRIES` | Optional retry count for idempotent Smoobu calls, defaults to `3`. |
| `SMOOBU_BASE_BACKOFF_MS` | Optional first retry backoff, defaults to `250`. |
| `SMOOBU_MAX_BACKOFF_MS` | Optional max exponential backoff, defaults to `2000`. |
| `SMOOBU_MAX_RATE_LIMIT_DELAY_MS` | Optional cap for honoring Smoobu retry-after waits, defaults to `60000`. |
| `SMOOBU_HOLD_CHANNEL_ID` | Smoobu channel new holds are created on: `11` (Blocked, default), `13` (Direct booking) or `70` (Homepage/website). **`70` removes the delete-then-create inventory window entirely** — see "Inventory safety" below before switching. |
| `PAYPAL_HOLD_TTL_MINUTES` | Optional PayPal hold duration, defaults to `60`. |
| `BOOKING_API_IDEMPOTENCY_TTL_MINUTES` | Optional public write idempotency retention window, defaults to `1440`. |
| `BOOKING_API_STALE_IDEMPOTENCY_LOCK_SECONDS` | Optional stale in-progress idempotency lock timeout, defaults to `120`. |
| `EXCHANGE_RATE_PROVIDER_URLS` | Optional comma-separated HTTPS rate sources for `GET /api/exchange-rate`, tried in order. Defaults to `open.er-api.com` then the jsDelivr currency API. |
| `EXCHANGE_RATE_TTL_SECONDS` | Optional cache lifetime for the USD→CRC rate, defaults to `21600` (6 h). |
| `EXCHANGE_RATE_TIMEOUT_MS` | Optional per-provider fetch timeout, defaults to `4000`. |
| `EXCHANGE_RATE_STALE_MAX_AGE_SECONDS` | Optional age past which a cached rate is no longer served after providers fail, defaults to `172800` (48 h). |

The Secrets Manager value must be a JSON object with this shape:

```json
{
  "smoobuApiKey": "stored only in Secrets Manager",
  "paypalClientId": "stored only in Secrets Manager",
  "paypalClientSecret": "stored only in Secrets Manager",
  "paypalWebhookId": "stored only in Secrets Manager",
  "smoobuWebhookSecret": "shared header value for X-Smoobu-Webhook-Secret",
  "bookingEncryptionKeyBase64": "base64-encoded 32-byte key",
  "portalSessionSecret": "high-entropy signing secret",
  "rdsConnectionString": "postgres://user:password@host:5432/kalawala_booking"
}
```

For local tests only, `BOOKING_API_SECRETS_JSON` or individual raw env vars can
be enabled with `BOOKING_API_ALLOW_INSECURE_ENV_SECRETS=true`. Do not use those
raw secret modes for deployed environments.


## Inventory safety

A confirmed website booking has to end up on Smoobu's Homepage channel (70).
Smoobu's `PUT /api/reservations` cannot change `channelId`, so promotion
(`smoobuPromotion.ts`) deletes the blocked-channel hold and creates a new
reservation. Smoobu pushes availability to Booking.com and Airbnb on every
reservation change, so that pair emits an **"open" push immediately followed by a
"close" push** — two opposing updates, milliseconds apart, into queues we do not
control.

On 2026-09-12 that bit. Website booking `KWL-AFFJYUR6` took Casa Geco for
25–27 Sep. Both Smoobu calls succeeded and Smoobu's calendar was correct
throughout; Airbnb applied both pushes correctly; Booking.com applied them out of
order for the night of the 26th. Geco stayed bookable there for ~36 hours and was
sold as part of a two-room reservation. Smoobu then dropped the colliding Geco
leg on import without an error, so no overbooking was flagged anywhere — a human
found it.

### The fix

Set `SMOOBU_HOLD_CHANNEL_ID=70`. A hold created on the website channel is
confirmed with a single idempotent `PUT`: no delete, no create, **no availability
transition at all**, so there is nothing for a channel to apply out of order.
`promoteSmoobuReservation` already takes this path automatically when it sees a
channel-70 hold.

**Check this first.** Smoobu's own guest-message automation fires on *new
booking*. With holds on channel 70, an unpaid hold is a new booking, so any such
template would email the guest a confirmation before the money arrives. Either
retarget those templates to an arrival-relative trigger, or turn them off and
rely on the API's own `sendBookingConfirmed` / `sendDepositConfirmed`, which only
send after payment. Until that is settled, leave the default at `11`.

### Defence in depth (active regardless of channel)

- `smoobuPromotion.ts` builds the create payload **before** the delete, runs on a
  Smoobu client with the rate-limit sleep disabled (the shared client will
  otherwise sleep up to 60s *between* the delete and the create), and logs
  `inventoryExposureMs` for every promotion — with an alarm above 2s.
- `availabilityGuard.ts` checks Smoobu's own state after a confirmation and
  re-blocks if the stay is open there.
- `availabilityWatchdog.ts` (Lambda `availability-watchdog`) runs two passes.
- `smoobuWebhooks.ts` compares every inbound reservation against our own holds
  and alarms on an overlap — the check Smoobu does not do for us.

### What each safeguard can actually see

This distinction matters and is easy to get wrong, so it is written down.

| Safeguard | Reaches | Would it have caught Geco? |
| --- | --- | --- |
| Smoobu availability check | Smoobu only | **No.** Smoobu was correct for all 36 hours; it would have answered "fine". |
| Corrective close-push (`reassert`) | Booking.com + Airbnb, blindly | **Probably.** It re-sends the close; it cannot confirm it landed. |
| Inbound-reservation conflict check | Anything Smoobu imports | **No** — Smoobu silently dropped the conflicting leg. It would if Smoobu imported it. |
| `SMOOBU_HOLD_CHANNEL_ID=70` | The cause | **Yes.** No transition, nothing to mis-order. |

Nothing here can independently read Booking.com's or Airbnb's inventory: Smoobu
holds the connectivity relationship with both, and neither exposes an ARI read to
the property behind a channel manager. Verification of channel state is a manual
extranet check, or an email to Smoobu.

### Watchdog schedule and cost

Two EventBridge rules invoke the same Lambda with different payloads:

| Mode | Schedule | Scope | Cost on a healthy book |
| --- | --- | --- | --- |
| `reassert` | every 10 min | stays promoted in the last ~25 min | ~1 write per website confirmation; **zero** once holds are on channel 70 |
| `sweep` | daily 09:00 UTC | every confirmed future stay | ~135 reads, **zero writes** |

The obvious design — re-assert every confirmed stay on a short timer — was
rejected. With ~135 future reservations that is ~12,900 writes a day, each
fanning out to Booking.com and Airbnb: ~25,800 channel pushes daily, to mitigate
a fault caused by two pushes arriving out of order. A re-assertion is only worth
sending where a transition actually happened.

Alarms and the EventBridge rule live in `infra/availability_watchdog.tf`.


Provider integrations, durable repository adapters, Redis/WAF rate-limit backing,
and Terraform-managed CloudWatch alarms/dashboards are implemented in later
booking-engine tasks.

See `docs/own_booking_engine/observability.md` for the metric and alert
contract.
