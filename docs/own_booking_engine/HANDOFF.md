# Handoff — cancellation, manual deposit, and the local stack

Written at the end of the work described in `prd.md` change-control entries CC-1
and CC-2. Read this before touching the booking engine again.

## What state things are in

| | |
|---|---|
| Backend tests | 439 passing (`cd booking-api && npx jest`) |
| Frontend tests | 250 passing; 4 pre-existing `ListingDelfin` failures, unrelated |
| Typecheck | Clean in both roots |
| Terraform | Applied to prod (us-east-2) — live AWS |
| Migrations | 0001–0014 applied to RDS |
| Verified | Whole flow driven against live Smoobu/PayPal(sandbox)/SES/S3 — see `live-acceptance-test.md` sign-off table |

## The objective — DONE (2026-07-27)

**Prove the whole flow end to end against live infrastructure, and record the
evidence.** Done — see the sign-off table and "Bugs found and fixed" section at
the bottom of `live-acceptance-test.md`. Four more live-only bugs surfaced,
invisible to the 436 mocked tests just like the `convertHold` one below: an RDS
TLS trust-chain gap that broke every DB call on two of the four Lambdas, a
PayPal webhook payload-shape mismatch, an SES IAM scoping gap, and broken staff
email links.

The pass to run is `live-acceptance-test.md`: three paths (PayPal, manual deposit,
hold expiry) with the checks to make at each step.

### What counts as proved

Not "I clicked through it and nothing errored." Each path is proved when the
evidence below exists and is recorded — a short note per line with the id,
timestamp or screenshot is enough.

**Path A — PayPal**

- [x] Smoobu shows a Blocked-channel (11) reservation immediately after the hold
- [x] After capture: the blocked reservation is gone and one exists on channel 70
- [x] `holds` row reads `converted`, `converted_at` set, channel 70, and its
      `smoobu_reservation_id` matches the **new** Smoobu reservation
      *(this is the specific check that catches the `convertHold` regression —
      everything downstream looks fine while cancellation silently no-ops)*
- [x] `/api/webhooks/paypal` returned 2xx — signature verification passed
- [x] Guest received `hold_created` and `payment_pending`, and **no** confirmation
      email from us (Smoobu owns that one)
- [x] Editing guest count in the portal changed `adults` on the channel-70
      reservation
- [x] Cancelling deleted that reservation, freed the dates, set
      `refund_flagged`, and emailed guest + staff with the capture id
- [x] Non-refundable booking offers no cancel button
- [x] Booking starting tomorrow shows the 24-hour notice instead

**Path B — manual deposit**

- [x] Blocked-channel reservation created, dates off sale
- [x] Receipt uploaded from the browser straight to S3 (this is where a missing
      CORS rule surfaces), object present under `deposit-receipts/<session-id>/`
- [x] Portal login refused with 403 `booking_not_confirmed` before staff act
- [x] Staff review page renders with a working presigned receipt link, and
      **reloading it changes nothing** — the GET must not mutate
- [x] Confirming sets `booking_confirmed`, records `deposit_confirm_token_jti`,
      flips the hold to `converted`, and emails the guest
- [x] Clicking the link a second time says "already confirmed" and sends no
      second email
- [x] Portal now works, shows "Payment confirmed", and offers the **bank
      transfer** refund wording rather than PayPal
- [x] Reject path on a second booking frees the dates

**Path C — expiry**

- [x] An abandoned hold is expired by the worker, its Smoobu reservation
      cancelled, the dates returned to sale, and the `cancelled` email sent
      *(initially failed for hours — hold-expiry's RDS TLS fix hadn't been
      deployed to it yet; see live-acceptance-test.md)*

**Across all paths**

- [x] No `email_send_failed` in CloudWatch once the SES IAM fix was deployed
      (it fired constantly before that — see live-acceptance-test.md)
- [x] No `captcha_verify_secret_unavailable`
- [x] No `smoobu_promotion_hold_convert_failed`
- [x] Cleanup done: reservations removed on both channels, test receipts
      deleted from S3, the test dates bookable again on the public site.
      No PayPal refund needed — every capture in this pass was sandbox, not
      live money.

Outcome recorded at the bottom of `live-acceptance-test.md`, including the four
new live-only bugs this pass found and fixed.

### Why this cannot be skipped

Mocks proved the logic; they cannot prove the integration. Specifically untested
against reality: PayPal webhook signature verification, Smoobu's real payload
shapes, SES deliverability and sandbox status, presigned S3 uploads through a
browser with real CORS, and migrations against RDS with TLS. Each of those is a
plausible single point of failure that looks perfect locally.

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

## Before deploying to AWS — DONE

- [x] Add `captchaSecretKey` to the combined Secrets Manager entry.
- [x] Set `staff_notification_email` in tfvars and verify it as an SES identity
      (account is still sandboxed — `tommasoribaudo1@gmail.com` and
      `reservas.kalawala@gmail.com` are both individually verified for testing).
- [x] Run migration **0014** — 0001–0014 all applied to RDS.
- [x] `terraform apply` the receipts bucket, its CORS rule, the IAM policy and the
      S3 gateway endpoint — applied along with the full prod stack.

The acceptance pass — see **The objective** above and `live-acceptance-test.md`
— is done. Real Smoobu payloads, PayPal webhook signature verification, SES
deliverability, presigned S3 through a browser with real CORS, and migrations
against RDS with TLS are all verified against live infrastructure now.

**Still open**: SES production access (account is sandboxed — fine for staff +
one test guest, but real guests can't receive email until AWS approves the
production-access request). The frontend's `REACT_APP_BOOKING_API_BASE_URL`
also still needs to be pointed at the new API Gateway URL
(`https://ell3fvgw54.execute-api.us-east-2.amazonaws.com/prod`) wherever the
FTPS/cPanel build config lives — it's currently a stale us-east-1 staging URL
in the repo's `.env`, but the booking-engine frontend is still unmerged from
this branch, so production traffic isn't actually hitting it yet.

There are ten email templates: `hold_created`, `payment_pending`,
`booking_confirmed`, `cancelled`, `guest_cancellation`, `staff_cancellation`,
`deposit_instructions`, `deposit_confirmed`, `staff_deposit_review`, and the
legacy `deposit_handoff`. Two are unreachable in the normal flow —
`booking_confirmed` fires only from the PayPal webhook, which early-returns
because the browser capture already confirmed, and `deposit_handoff` belongs to
the retired handoff path.

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
