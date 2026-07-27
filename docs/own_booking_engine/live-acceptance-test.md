# Live acceptance test

The end-to-end pass to run once AWS is applied and Smoobu, PayPal and SES are
connected. Everything here was verified locally against mocks — this is the pass
that proves the integrations themselves.

> **This touches real inventory.** Creating a hold blocks real dates on real
> properties across every channel Smoobu syncs, including OTAs. Cancelling
> deletes a real Smoobu reservation. Pick dates far out, use one property, and
> run the cleanup at the end.

## Before you start

Blocking — the flow fails without these:

- [ ] `captchaSecretKey` in the combined Secrets Manager entry. Without it no
      token can clear a CAPTCHA challenge.
- [ ] `staff_notification_email` set, and **verified as an SES identity** if the
      account is still in the SES sandbox. `EmailClient.send` swallows failures,
      so a bad address fails silently.
- [ ] Your own test email verified in SES too, for the same reason.
- [ ] Migration **0014 applied in its own `npm run migrate`**, before deploying
      code that writes `'manual_deposit'`.
- [ ] PayPal webhook pointed at `<api>/api/webhooks/paypal`, subscribed to
      `CHECKOUT.ORDER.APPROVED` and `PAYMENT.CAPTURE.COMPLETED`, with the
      webhook ID in Secrets Manager.
- [ ] Smoobu webhook pointed at `<api>/api/webhooks/smoobu` with the shared
      secret matching `smoobuWebhookSecret`.
- [ ] S3 receipts bucket applied, with its CORS rule listing your real origin.

Have open: the Smoobu dashboard, the PayPal dashboard, the inbox for your test
address, the inbox for `staff_notification_email`, and CloudWatch Logs for the
booking API.

Pick a stay **at least a week out** so cancellation stays inside policy, and note
the property.

---

## Path A — PayPal booking, portal, cancellation

### 1. Search

Open `/book`, choose your dates, search.

- Results list available properties with prices.
- **Smoobu**: nothing yet — search only reads availability.
- **CloudWatch**: `provider_call_completed` with `operation: checkApartmentAvailability`.

The quote lives **10 minutes**. If you stop for coffee here, start again.

### 2. Hold

Choose a property, "Book with PayPal", fill in guest details and a portal
password of at least 12 characters. **Write the password down** — you need it in
step 6 and it is never recoverable.

- Page shows a countdown and a reservation ID `KWL-XXXXXXXX`.
- **Smoobu**: a new reservation appears on the **Blocked** channel (11). The
  dates are now off sale everywhere.
- **Email**: `hold_created` to the guest.
- **DB**: `booking_sessions.status = 'hold_active'`, `payment_method = 'paypal'`,
  and `rate_plan` set to `flexible` or `non_refundable` per the toggle.

The hold lives **60 minutes**.

### 3. PayPal order

"Continue to payment" redirects to PayPal.

- **DB**: status `paypal_order_created`, a `payments` row appears.
- **Email**: `payment_pending`.

### 4. Approve and capture

Approve in PayPal. You are redirected to `/book/return?token=…&PayerID=…`, which
captures and lands on `/book/confirmed`.

This is the step with the most moving parts. Check all of it:

- **PayPal dashboard**: the payment shows as completed.
- **Smoobu**: the blocked reservation is **gone** and a new one exists on channel
  **70 (Homepage)**. Promotion is delete-then-recreate because Smoobu will not
  let `channelId` be updated.
- **DB**: `booking_confirmed`; `payments.status = 'captured'` with a capture id;
  and critically —

```sql
select h.status, h.converted_at is not null as has_ts, h.smoobu_reservation_id, h.smoobu_channel_id
from holds h join booking_sessions b on b.id = h.booking_session_id
where b.reservation_public_id = 'KWL-XXXXXXXX';
```

  Must be `converted`, `has_ts = t`, channel `70`, and the reservation id must
  match the **new** Smoobu reservation. If it says `active` with the old id, the
  `convertHold` fix did not deploy — stop, because cancellation will then delete
  nothing while the database claims success.

- **Email**: no confirmation email from us. Smoobu sends that. Expect only
  `hold_created` and `payment_pending` so far.
- **CloudWatch**: the PayPal webhook arrives shortly after and logs a
  `booking_confirmed → booking_confirmed` transition. That early return is
  correct — the browser capture already confirmed it. What matters is that
  signature verification **passed**; a signature failure shows as a 4xx on
  `/api/webhooks/paypal` and is the single most likely live-only failure.

### 5. Confirmation page

"Manage booking" should sign you into the portal automatically, using the
password cached at checkout.

### 6. Portal

If auto-login didn't fire, go to `/portal` and use the reservation ID and the
password from step 2. Session lasts **24 hours**.

Check the detail page shows: property, dates, guests, **Payment confirmed**,
**Confirmed**, and both a "Request help" and a "Cancel booking" button. If a
button looks blank, a stylesheet regression has returned — see HANDOFF.

**Edit guest count.** Change it and save.

- **Smoobu**: `adults` updates on the channel-70 reservation. This is the second
  proof the hold points at the right reservation.
- **DB**: `guests` updated.

**Request help.** Submit one. It is logged only — no email, no ticket. That is
current behaviour, not a bug.

### 7. Cancel

Open "Cancel booking".

- The deadline should read 24 hours before **15:00 Costa Rica time** on your
  arrival date. Sanity-check the arithmetic against your dates.
- The refund note should say PayPal for this booking.

Enter a reason and confirm.

- **Smoobu**: the channel-70 reservation is deleted; the dates return to sale.
- **DB**: `cancelled`, `cancelled_by = 'guest'`, reason stored; hold `cancelled`;
  `payments.status = 'refund_flagged'` with `refund_flagged_at`.
- **Emails**: `guest_cancellation` to the guest, `staff_cancellation` to staff
  carrying the PayPal capture id.
- **The page** flips to "Cancelled" without a reload.
- **No money moves.** Refund it by hand in PayPal to complete the loop.

### 8. Negative checks — do these, they are the policy

- Book a **non-refundable** stay and confirm the portal offers no cancel button,
  showing the non-refundable notice instead.
- Book a stay **starting tomorrow** and confirm the cancel button is replaced by
  the "within 24 hours" notice and a WhatsApp link.

---

## Path B — Manual deposit

Use different dates from Path A.

### 1. Deposit checkout

Search, then "Bank transfer / SINPE". Fill in the form, including a portal
password. Submit.

- **Smoobu**: reservation on the **Blocked** channel (11).
- **DB**: `hold_active` with `payment_method = 'manual_deposit'`,
  `rate_plan = 'flexible'` — deposit is always flexible.
- **Page**: bank details, countdown, receipt upload.
- **Emails**: `deposit_instructions` to the guest, `staff_deposit_review` to
  staff with confirm and reject links.

The hold is `min(36h, half the time until check-in)`. For a stay a week out that
is 36 hours; for one three days out it is shorter by design.

### 2. Receipt upload

Upload a JPG or PDF.

- This is the **browser PUT-ing directly to S3**, so it is where a missing or
  wrong CORS rule shows up. A CORS failure appears in the browser console, not in
  CloudWatch.
- **S3**: object under `deposit-receipts/<booking-session-id>/`.
- **DB**: `deposit_receipt_s3_key` set.
- **Smoobu**: the reservation notice gains a presigned link.

### 3. Portal is refused

Try `/portal` with the reservation ID and password. Must return **403
`booking_not_confirmed`**. The booking is not confirmed until staff say so.

### 4. Staff confirmation

In the staff inbox, open the confirm link. Token is valid **7 days**.

- A review page renders: guest, dates, total, hold expiry, and a working link to
  the receipt (presigned — a plain URL would 403 against the private bucket).
- **The page must not have changed anything yet.** Reload it; still pending. That
  GET/POST split is what stops mail scanners confirming bookings.

Click "Confirm — the money has arrived".

- **DB**: `booking_confirmed`, `deposit_confirmed_by = 'staff_link'`,
  `deposit_confirm_token_jti` recorded; hold `converted`.
- **Smoobu**: notice updated, marked paid.
- **Email**: `deposit_confirmed` to the guest.

Click the link a second time: it should say "already confirmed" and send no
second email.

### 5. Portal now works

Log in with the same reservation ID and password. Payment should read **Payment
confirmed** even though there is no `payments` row — it is synthesized from the
session. Cancelling from here should offer the **bank transfer** refund wording,
not PayPal.

### 6. Reject path

Run a second deposit booking and use the **reject** link instead. Smoobu
reservation deleted, dates freed, session `cancelled` with
`cancelled_by = 'staff'`.

---

## Path C — expiry (needs a wait or a nudge)

Create a hold and abandon it. Rather than wait 60 minutes, set
`PAYPAL_HOLD_TTL_MINUTES` low on the Lambda, create a hold, then restore it.

- The hold-expiry worker marks the hold `expired`, cancels the Smoobu
  reservation, and sends the `cancelled` email.
- **Smoobu**: dates return to sale.

Worth running at least once — it is the safety net for every abandoned checkout,
and it is the only place the EventBridge schedule gets exercised.

---

## Cleanup

- [ ] Cancel or delete every Smoobu reservation this created, on both channels.
- [ ] Refund or void the PayPal payments.
- [ ] Delete the test receipt objects from S3.
- [ ] Restore any TTL you changed for Path C.
- [ ] Confirm the test dates are bookable again on your public site.

## What to watch afterwards

- `email_send_failed` in CloudWatch — the SES sandbox is the most likely cause,
  and failures are silent to the guest.
- `captcha_verify_secret_unavailable` — means `captchaSecretKey` is missing and
  challenges cannot be cleared.
- `smoobu_promotion_hold_convert_failed` — the `convertHold` failure mode. Should
  never appear now; if it does, stop and check migration state.
- The rate of expired deposit holds. A spike means inventory is being blocked by
  people who never pay, and the per-email concurrent cap becomes worth adding.

---

## Sign-off

Fill this in when the pass is run. `HANDOFF.md` treats a completed table here as
the definition of the engine being proved — an empty table means unproven,
regardless of how green the test suites are.

| Path | Run by | Date | Result | Notes / evidence |
|---|---|---|---|---|
| A — PayPal booking → portal → cancellation | Claude + Tommaso | 2026-07-27 | PASS | KWL-LJUBR4DB (Casa Tucano, sandbox PayPal). Hold on channel 11, capture `0MA01937V5460544E` promoted to channel 70 (`149054691`). `holds` row confirmed `converted`, `converted_at` set, channel 70, matching new reservation id — the exact `convertHold` regression this pass exists to catch, verified fixed. Webhook signature verification passed; a fresh, non-duplicate `PAYMENT.CAPTURE.COMPLETED` returned 200 (see PayPal webhook shape bug below). Guest-count edit (2→3) synced to Smoobu `adults`. Cancelled from portal: Smoobu reservation deleted, dates freed, `refund_flagged`, both `guest_cancellation` and `staff_cancellation` emails sent. Real PayPal money: $0 — only sandbox transactions used. |
| A — negative: non-refundable offers no cancel | Claude + Tommaso | 2026-07-27 | PASS | KWL-EXXSYJSJ (Casa Geco, sandbox PayPal, non-refundable). Portal shows "This booking is on the non-refundable rate and cannot be cancelled online" with no cancel button. |
| A — negative: inside 24h shows contact notice | Claude + Tommaso | 2026-07-27 | PASS | KWL-SKTZ79FD (Casa Rana, arrival same day). Portal shows "This booking is within 24 hours of check-in..." with Contact us link instead of a cancel button. |
| B — deposit → receipt → staff confirm → portal | Claude + Tommaso | 2026-07-27 | PASS | KWL-H8UKEKSW (Casa Geco). Blocked-channel hold created; receipt PUT directly to S3 (`deposit-receipts/17a967b3.../test-receipt.jpg`), no CORS error. Portal login refused 403 `booking_not_confirmed` before staff acted. Staff review page (real token from the emailed link) rendered guest/dates/total/hold-expiry and a working presigned receipt link; reloading the GET did not mutate state. POST confirmed: `booking_confirmed`, `deposit_confirmed_by=staff_link`, `deposit_confirm_token_jti` recorded, hold `converted`, Smoobu marked paid, `deposit_confirmed` email sent. Clicking the same link again showed "Already confirmed" with no second email. Portal then showed synthesized "Payment confirmed" and bank-transfer (not PayPal) refund wording. |
| B — reject path frees the dates | Claude + Tommaso | 2026-07-27 | PASS | KWL-7HAMA4GV (Casa Geco). Reject link (from staff email) deleted the Smoobu reservation, `cancelled_by=staff`, dates back on sale. |
| C — hold expiry reclaims an abandoned hold | Claude + Tommaso | 2026-07-27 | PASS (after a fix) | Confirmed on 3 separate abandoned holds: KWL-7RL34VPW (original live PayPal, abandoned ~60m), KWL-ZYSQWRBT (failed order-creation retry), and KWL-7M49Z6FL (deliberate 2-minute-TTL test). All three: hold-expiry worker picked them up within ~1 minute of expiry, Smoobu reservation cancelled, dates freed, `cancelled` email sent. **Initially failing**: the hold-expiry and payment-reconciliation Lambdas had never received the RDS-TLS fix (see bugs below) and were failing every single invocation with `database_health_check_failed` — this is why the first abandoned hold sat unexpired for hours before being caught. Fixed by deploying the same build to all 4 Lambdas. |
| Cleanup completed | Claude | 2026-07-27 | DONE | All test Smoobu reservations cancelled/deleted (both channels). No real PayPal refund needed — every capture in this pass was sandbox. Test S3 receipt object deleted. Temporary diagnostic Lambda deleted. `PAYPAL_BASE_URL`, `booking_api_allowed_origins`, and the combined secret's PayPal fields reverted to their live production values. All test dates confirmed bookable again. `PAYPAL_HOLD_TTL_MINUTES=60` and `DEPOSIT_HOLD_TTL_HOURS=12` are now explicit, Terraform-managed production defaults (both were briefly tried at other values mid-pass before settling here). |

### Bugs found and fixed during this pass

- **RDS TLS trust chain** (`booking-api/src/db.ts`): every DB-touching request failed in prod with `database_health_check_failed` — Node's default trust store doesn't include the `rds-ca-rsa2048-g1` CA that signs this instance's certificate. Fixed by embedding the real chain (fetched live from the instance) as `RDS_CA_BUNDLE` and passing it via `ssl.ca`. This affected **all four** Lambdas; only two were redeployed at first, which is why Path C initially failed silently for hours.
- **PayPal `PAYMENT.CAPTURE.COMPLETED` webhook shape** (`booking-api/src/paypalWebhooks.ts`): the real webhook's `resource` has no `purchase_units` (unlike `CHECKOUT.ORDER.APPROVED`) — `custom_id` sits directly on the resource and carries the reservation's public id, not the internal session id. The old fallback chain mixed the two up, causing every real capture webhook to 500. Fixed with a shared resolver that tries `reference_id` then falls back to `getByReservationPublicId`; added a regression test built from the real captured PayPal payload.
- **SES IAM scope** (`infra/ses.tf`): the Lambda's `ses:SendEmail` policy was scoped only to the sending domain identity. SES sandbox requires authorization on the recipient identity too, and separately on the `ConfigurationSetName` resource — both were missing, so every email silently failed. Widened the resource list (the existing `ses:FromAddress` condition still fully constrains what the policy can send as).
- **Broken staff email links** (`infra/lambda.tf`): `DEPOSIT_STAFF_CONFIRM_BASE_URL` was never set on any Lambda, so confirm/reject links rendered as bare paths that Gmail mangled into `http://api/...`. Fixed by wiring it to the real API Gateway URL via Terraform (had to avoid a dependency cycle by deriving it from the REST API id rather than the stage's `invoke_url`).
- **Invisible "Change" guest-count link** (`src/pages/Portal.style.scss`): same root cause as the previously-documented invisible-button bug — a global `.btn { color: #fff }` rule ties on specificity with Bootstrap's `.btn-link` and wins on source order. Fixed with the same `.portal-detail-summary__edit-btn.btn` chaining pattern used for `.portal-login-submit.btn`.

Record reservation ids, PayPal transaction ids and Smoobu reservation ids in the
notes column — a later investigation will want them, and they are the only link
between a row in our database and the state of the two providers.

If a path fails, write what failed here rather than leaving it in a chat log or
a ticket. This file is where the next person will look.
