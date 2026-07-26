# Handoff — cancellation, manual deposit, and the local stack

Written at the end of the work described in `prd.md` change-control entries CC-1
and CC-2. Read this before touching the booking engine again.

## What state things are in

| | |
|---|---|
| Backend tests | 436 passing (`cd booking-api && npx jest`) |
| Frontend tests | 250 passing; 4 pre-existing `ListingDelfin` failures, unrelated |
| Typecheck | Clean in both roots |
| Terraform | `terraform validate` passes; **nothing applied** — no live AWS |
| Migrations | 0001–0014 applied to local Postgres; **never applied to RDS** |
| Verified | Whole flow driven in a real browser against local Postgres + MinIO |

Nothing here has run against real Smoobu, real PayPal, real SES or real S3.

## Start here

```bash
npm run local:up        # Postgres + MinIO
npm run local:migrate
npm run local:api       # mock providers :4010 + booking API :4000
npm start               # CRA :3000
```

Full detail, including how to walk the deposit path and mint a staff link when
email is disabled, is in `local-development.md`.

## The two features

### Guest self-service cancellation

Guests cancel confirmed bookings from the portal. `cancellationPolicy.ts` is the
single source of truth — both the handler and the portal response read it, so the
button a guest sees can never disagree with what the API will allow.

- Flexible rate, more than 24h before check-in → cancels for real.
- Non-refundable → no cancel option at all.
- Inside 24h → blocked, guest is pointed at WhatsApp.
- Pre-0013 bookings have no `rate_plan` and **fail closed**. They can't be
  classified retroactively, so those guests go to staff.

Check-in is defined as **15:00 America/Costa_Rica**. `arrival_date` is a bare
`date`, so without a fixed hour the 24-hour boundary is ambiguous by up to a day.
A test asserts the hardcoded UTC-6 still agrees with `Intl` across the year — if
Costa Rica ever adopts DST that fails loudly instead of silently shifting every
deadline.

**Refunds are manual and deliberately so.** Cancelling sets the payment to
`refund_flagged` and emails staff the PayPal capture ID. The API never calls
PayPal's refund endpoint.

Ordering in the handler is load-bearing: Smoobu is called **first**, so a provider
failure returns 502 having changed nothing locally and the guest can safely retry.
Then session, then hold, then payment — the session reaches its terminal state
before the hold moves, which makes the `cancelReservation` webhook Smoobu echoes
back a no-op rather than a race.

### Manual deposit booking

Replaces the old contact-only handoff, which reserved nothing.

1. Guest fills the same form as PayPal checkout, including a portal password.
2. `POST /api/deposit-holds` creates a Smoobu blocked-channel hold — dates off
   sale immediately.
3. Guest sees bank details, a countdown, and a receipt upload that goes straight
   to S3 via presigned URL. The file never passes through the API.
4. Staff get an email with signed confirm and reject links.
5. Confirm → `booking_confirmed` + portal access. Reject → Smoobu cancelled,
   dates freed. No action → the existing hold-expiry worker sweeps it.

Deposit deliberately reuses the PayPal lifecycle states rather than the
`DEPOSIT_*` states sketched in `tasks.md`. Those were never in the enum or the TS
union, and adding them would have meant editing ~10 status guards plus the expiry
worker. Reusing `hold_active` means abandoned deposits are handled for free.

**There is still no admin panel and no staff login.** Access is an HMAC token
scoped to one booking and one action, with its own `typ` header so it can never
be confused with a guest portal session. The signing key is *derived* from
`portalSessionSecret` rather than stored separately — adding a field to
`BookingProviderSecrets` would put it in `REQUIRED_FIELDS` and 503 the entire API
in any environment whose secret lagged the deploy.

**GET renders, POST mutates.** Email scanners and link-preview bots fetch URLs in
messages unattended. With the mutation on the GET, a scanner could confirm
bookings. The GET returns a one-screen review with a single button, so it is still
one click for staff.

## The bug that mattered most

`RdsHoldRepository.convertHold` set `status = 'converted'` without
`converted_at`, which the `holds_terminal_timestamps` CHECK constraint (migration
0004) requires. **Every hold conversion was failing in RDS** with SQLSTATE 23514.
The throw was swallowed non-fatally, so bookings still confirmed — but the hold
row kept `status='active'` and the *old* `smoobu_reservation_id`, the one
promotion had already deleted from Smoobu.

Guest cancellation deletes `hold.smoobuReservationId`. Against that stale id it
would have deleted nothing and left the real reservation live while our database
said cancelled.

383 tests passed over this. The in-memory repository has no CHECK constraint and
omitted the timestamp too, so both implementations agreed with each other and
disagreed with the database. There is now a `test.each` asserting every terminal
transition sets its matching timestamp — but the deeper lesson is that in-memory
repositories cannot see schema constraints, and this class of bug needs either a
real-database test or an assertion against the emitted SQL.

## Before deploying to AWS

Blocking:

- [ ] Add `captchaSecretKey` to the combined Secrets Manager entry. Without it,
      no token can clear a CAPTCHA challenge and guests hitting the threshold get
      a hard 403 for the rest of the window.
- [ ] Set `staff_notification_email` in tfvars and verify it as an SES identity
      if the account is still sandboxed. `EmailClient.send` swallows failures, so
      a bad address means staff silently never hear about a deposit booking.
- [ ] Run migration **0014 in its own `npm run migrate`** before deploying code
      that writes `'manual_deposit'`. The runner wraps all pending migrations in
      one transaction, and a new enum label is unusable until it commits.
- [ ] `terraform apply` the receipts bucket, its CORS rule, the IAM policy and the
      S3 gateway endpoint.

Then verify what mocks cannot:

- [ ] Real Smoobu availability, rate and reservation payloads.
- [ ] PayPal sandbox redirect, capture, and webhook signature verification.
- [ ] SES delivery for all seven templates.
- [ ] Presigned S3 upload from a browser against the real bucket and its CORS.
- [ ] Migrations against RDS — local Postgres has no TLS.

## Known gaps

- **Receipt uploads have no magic-byte sniffing and no virus scanning.** Both are
  in the plan's upload-security list. The MIME allowlist checks the declared
  header only. Do this before real volume.
- The deposit hold blocks a property on every channel for up to 36 hours on
  nothing more than a form submission. Mitigated by a sliding TTL (never past
  half the time to check-in) and the per-IP abuse policy. A per-email concurrent
  cap is the next lever if abused.
- The price is frozen at hold creation for the life of the hold. If Smoobu rates
  move within 36 hours, the frozen price is honoured. Accepted, recorded in CC-2.
- `GET /api/deposit-handoff` and `POST /api/portal/.../cancellation-request` are
  both legacy with no frontend caller. Kept one release so stale bundles don't
  404; delete when none are in circulation.
- `audit_log`, `booking_state_transitions`, `portal_login_attempts` and
  `provider_reconciliation_runs` are provisioned but no code reads or writes them.
- CI runs no frontend jest. Adding it would go red on the 4 `ListingDelfin`
  failures until those are fixed.

## Things that will bite you

- **`.env` points `REACT_APP_BOOKING_API_BASE_URL` at the deployed API Gateway.**
  Locally that bypasses the CRA proxy and calls AWS. `.env.local` blanks it. If a
  local search fails with a generic error and nothing reaches the API terminal,
  check this first — and restart CRA, which only reads env files at startup.
- **`booking-api/.env` supplies `BOOKING_API_SECRETS_JSON`**, which outranks the
  individual variables. `.env.local` blanks it and the secret-name variable.
- The encryption key must decode to **exactly** 32 bytes.
- `/mock/reset` clears provider state but deliberately does not rewind id
  counters — Postgres outlives the mock, and reissued ids collide with unique
  constraints.
- Holds persist across runs and the exclusion constraint rejects overlapping
  dates, so reuse of the same dates will fail legitimately.
- A later stylesheet declares `.btn { background: transparent }`, which ties on
  specificity with any single-class button rule and wins on source order. Portal
  buttons are chained as `.portal-login-submit.btn` for this reason. If a button
  renders invisible, that's why.

## Where things live

| Concern | File |
|---|---|
| Cancellation policy | `booking-api/src/cancellationPolicy.ts` |
| Cancellation handler | `booking-api/src/portalPages.ts` |
| Deposit hold | `booking-api/src/depositHolds.ts` |
| Staff review page | `booking-api/src/depositConfirm.ts` |
| Signed tokens | `booking-api/src/signedTokens.ts` |
| Receipt upload | `booking-api/src/depositReceipt.ts` |
| Shared hold sequence | `booking-api/src/holds.ts` → `createSmoobuBackedHold` |
| Deposit checkout UI | `src/pages/Booking.page.tsx` → `DepositCheckoutPanel` |
| Portal cancellation UI | `src/pages/PortalDetail.page.tsx` |
| Receipts bucket | `infra/s3_deposit_receipts.tf` |
| Local stack | `docker-compose.yml`, `booking-api/scripts/` |
