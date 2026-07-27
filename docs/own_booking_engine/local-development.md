# Local development

Runs the whole booking flow on your machine — search, hold, PayPal redirect,
capture, confirmation and the guest portal — against local Postgres and mock
providers. No AWS resources are involved and no real inventory is touched.

## Why the providers are mocked

**Smoobu has no sandbox.** Every call goes to live data, and `createReservation`
really blocks dates on real properties. `booking-api/scripts/mockProviders.js`
stands in for it, tracking reservations in memory so availability, hold creation
and cancellation all behave the way the real API does — including returning 404
when you cancel a reservation twice, which the cancellation flow relies on.

**PayPal does have a sandbox.** The mock exists so the flow runs offline and
deterministically; point `PAYPAL_BASE_URL` at `https://api-m.sandbox.paypal.com`
with real sandbox credentials whenever you want to exercise the genuine redirect.

## One-time setup

```bash
cp booking-api/.env.local.example booking-api/.env.local
```

The root `.env` points `REACT_APP_BOOKING_API_BASE_URL` at the deployed API
Gateway, which makes the frontend call AWS and bypass the local proxy entirely.
The repo's `.env.local` blanks it so the frontend uses same-origin `/api`. If a
local search fails with a generic error and nothing reaches the API terminal,
check that override first — and restart the CRA dev server, which only reads env
files at startup.

`booking-api/.env.local` is gitignored and holds only fake credentials. Loading
order is `.env` first, then `.env.local` on top, so your real provider keys stay
untouched and unused locally. It deliberately blanks
`BOOKING_API_SECRETS_MANAGER_SECRET_ID` and `BOOKING_API_SECRETS_JSON` — both take
precedence over individual variables, so leaving either set would send the API
looking for AWS Secrets Manager.

## Running

```bash
npm run local:up        # Postgres 15 + MinIO in Docker
npm run local:migrate   # apply booking-api/migrations to the local database
npm run local:api       # builds, then starts mock providers (:4010) + API (:4000)
npm start               # CRA on :3000
```

The CRA dev server proxies `/api/*` to `localhost:4000` (the `proxy` field in
`package.json`), so the frontend runs same-origin and needs no CORS or base-URL
configuration.

Stop the containers with `npm run local:down`. Add `-v` to that command to drop
the database volume and start from an empty schema.

## What runs where

| Port | Service | Notes |
| --- | --- | --- |
| 3000 | CRA dev server | proxies `/api` to 4000 |
| 4000 | booking API | `scripts/devServer.js` wraps the Lambda handler |
| 4010 | Smoobu + PayPal mocks | one process; the two path spaces don't overlap |
| 5432 | Postgres 15 | matches `infra/database.tf` |
| 9000 / 9001 | MinIO + console | stands in for the deposit-receipt S3 bucket |

`scripts/devServer.js` translates Node requests into API Gateway payload-format
2.0 events, so the same handler code path runs locally and in AWS with no
branching inside the handler.

## Walking the happy path

1. Open `http://localhost:3000/book`, pick dates far in the future, search.
2. Choose a property and fill in the guest form. The portal password must be at
   least 12 characters — remember it, you need it in step 6.
3. Continue to payment. The mock PayPal approval page appears and redirects back
   to `/book/return` after a second, exactly as PayPal does.
4. The return page captures the payment and lands on `/book/confirmed`.
5. Watch the API terminal: `[smoobu] created reservation …` on hold creation, then
   the promotion from the blocked channel to channel 70 on confirmation.
6. Click **Manage booking** to reach the guest portal, or log in at
   `http://localhost:3000/portal` with the reservation ID and that password.

Reset provider state between runs without restarting anything:

```bash
curl -X POST http://localhost:4010/mock/reset
```

`/mock/reset` clears reservations and orders but deliberately does **not** rewind
the id counters, which are seeded from the clock. Postgres outlives the mock, so
a reissued Smoobu reservation or PayPal order id would collide with the unique
constraints on `holds.smoobu_reservation_id` and `payments.paypal_order_id`.

Holds also persist in Postgres, and the exclusion constraint rejects a second
overlapping hold on the same property — so use fresh dates for each run, or drop
the database volume with `npm run local:down -- -v`.

## Walking the deposit path

1. Search, then choose **Bank transfer / SINPE** on a property.
2. Fill in the guest form and reserve — the dates come off sale immediately and
   the bank details, hold countdown and receipt upload appear.
3. Upload any JPG, PNG or PDF. It goes straight to MinIO; confirm it landed with
   `docker exec kalawala-minio mc ls --recursive local/kalawala-deposit-receipts`
   (run `mc alias set local http://localhost:9000 kalawala kalawala-local-secret`
   once first).
4. Portal login is refused at this point — the booking is not confirmed yet.
5. The staff link normally arrives by email, which is disabled locally. Mint one:

```bash
node -e "const {issueSignedToken}=require('./booking-api/dist/signedTokens.js');
console.log('http://localhost:4000/api/staff/deposit-review/' + encodeURIComponent(
  issueSignedToken({bookingSessionId:'<id>',reservationPublicId:'<KWL-...>',
  purpose:'deposit_confirm',ttlSeconds:3600},'local-dev-portal-session-secret-change-me')))"
```

6. Open it, confirm, then log into the portal with the password from step 2.

## Local-only code paths

Three settings exist purely for this setup, each requiring an explicit opt-in so
a deployed environment cannot fall into them by accident:

- `BOOKING_API_DB_SSL=false` — local Postgres speaks plaintext. Requires the
  exact string `false`; anything else keeps TLS verification on.
- `S3_ENDPOINT_URL` — points the S3 client at MinIO and switches on path-style
  addressing. Unset in AWS, where the SDK resolves the real regional endpoint.
- `BOOKING_API_ALLOW_INSECURE_ENV_SECRETS=true` — permits provider secrets from
  environment variables instead of Secrets Manager.

## Emails

`EMAIL_DISABLED=true` means every send is logged rather than delivered. Look for
`email_send_skipped_disabled` in the API terminal, with a `template` field naming
which message would have gone out.

## Troubleshooting

**`database_health_check_failed`** — Postgres isn't up, or migrations haven't run.
Check `docker compose ps` and re-run `npm run local:migrate`.

**`secrets_invalid`** — usually `.env` still supplying `BOOKING_API_SECRETS_JSON`
or a secret name. Confirm `.env.local` blanks both, and that
`BOOKING_API_ENCRYPTION_KEY_BASE64` decodes to exactly 32 bytes.

**`unhandled_mock_route` in the mock terminal** — the API called a provider
endpoint the mock doesn't implement yet. The path is printed; add a handler in
`scripts/mockProviders.js`.

**Ports already in use** — `BOOKING_API_DEV_PORT` and `MOCK_PROVIDERS_PORT` move
the API and mocks. Change the `proxy` field in `package.json` to match if you move
the API.

## Before deploying to AWS

Local mocks prove the flow, not the integration. Still to verify against real
infrastructure:

- Real Smoobu availability, rate and reservation payloads.
- PayPal sandbox redirect, capture and webhook signature verification.
- SES delivery, including whether the account is still in the sandbox (staff and
  guest addresses must be verified identities if so).
- Presigned S3 uploads against a real bucket with its CORS configuration.
- Migrations against RDS — the local database has no TLS and no IAM auth.
