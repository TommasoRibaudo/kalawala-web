# Booking Engine PRD Freeze

Task: 1.2 PRD freeze
Status: frozen
Date: 2026-04-14

## Purpose

Build a secure Kalawala booking engine that lets guests search availability, reserve inventory, pay by PayPal or manual deposit, upload deposit proof, and manage a reservation through a guest portal. The frontend remains a React CRA marketing site; booking authority lives in the backend.

This PRD freezes the MVP product behavior for PayPal, manual deposit, guest portal, non-functional requirements, admin operations, and success metrics. Later changes to frozen decisions require a new task or explicit change request.

## Source References

- `docs/own_booking_engine/plan.md`
- `docs/own_booking_engine/threat_model.md`
- `docs/own_booking_engine/Introduction - Smoobu Api.pdf` (filename on disk uses an en dash)
- `AGENTS.md`

Relevant Smoobu API facts used for this PRD:

- Requests authenticate with an `Api-Key` header and must be made from the backend, not the browser.
- Availability check: `POST https://login.smoobu.com/booking/checkApartmentAvailability`.
- Availability responses can include `availableApartments`, `prices`, `currency`, and `errorMessages` such as minimum stay, guest limit, arrival day, lead time, and distance-between-bookings restrictions.
- Booking create: `POST https://login.smoobu.com/api/reservations`; successful creation returns a reservation `id`.
- Booking create/update fields include guest details, `language`, `priceStatus`, `prepaymentStatus`, `depositStatus`, and status values where `0` means open/not paid and `1` means complete payment.
- Booking cancel: `DELETE https://login.smoobu.com/api/reservations/<reservationId>`.
- Rates: `GET https://login.smoobu.com/api/rates?apartments[]=...&start_date=YYYY-MM-DD&end_date=YYYY-MM-DD`.
- Apartments: `GET https://login.smoobu.com/api/apartments`.
- Webhook actions include `updateRates`, `newReservation`, `cancelReservation`, and `updateReservation`.

## Frozen MVP Decisions

| Area | Decision |
|---|---|
| Booking authority | Backend state machine is authoritative for Kalawala workflow; Smoobu remains inventory source of truth. |
| Smoobu access | No Smoobu API key or Smoobu write call is exposed to the browser. |
| Hold model | Use Smoobu-backed provisional holds for both PayPal and deposit flows. |
| Smoobu channel for unpaid holds | Use Smoobu `Blocked channel` (`channelId: 11`) for provisional unpaid holds. If the account/API rejects this channel in implementation, use a config-gated fallback to `Direct booking` (`channelId: 13`) with an audit entry. |
| Hold duration | Default guest hold is 60 minutes. Expiry is real, not fake. |
| Hold extension | Admin can extend an active hold when the guest requests help. Extensions require an internal note and audit entry. |
| PayPal charge amount | MVP PayPal checkout collects the full quoted booking amount unless a later property-level configuration explicitly enables deposit-only PayPal. |
| Manual deposit amount | Manual deposit uses the configured deposit amount from backend configuration or Smoobu-derived pricing rules; upload proof alone never confirms payment. |
| Confirmation authority | A booking is confirmed only after Smoobu hold exists and payment is verified: PayPal capture/webhook or admin-approved deposit. |
| Guest portal | Portal access uses non-guessable `reservation_public_id` plus guest password. Passwords are stored only as salted hashes. |
| Language | Persist `language` as `'en'` or `'es'` in the booking record at session start and use it for portal and communications. |
| Listing links | Search result listing links open in a new tab with `target="_blank"` and `rel="noopener noreferrer"`, using `/{slug}` for English and `/{slug}ES` for Spanish. |
| Upload file types | Deposit proof MVP allowlist is PDF, JPEG, and PNG. Files are private, renamed, scanned, and never served directly from a public bucket. |
| Automated refunds | Automated PayPal refunds are out of MVP scope. Staff can record refund requests and reconcile manually until a later refund task is added. |

## User Flows

### Availability Search

1. Guest opens `/book` or `/bookES`.
2. Guest selects future arrival/departure dates and guest count. The UI never blocks future date selection just because no listing is available.
3. Backend validates input and calls Smoobu availability server-side.
4. Backend maps Smoobu apartments to public property summaries and safe guest messages.
5. Frontend shows either available listings or a no-availability state.
6. Each available listing card includes a language-aware link to the existing listing page in a new tab.

Acceptance criteria:

- Empty availability is a valid response, not an error.
- Raw Smoobu diagnostics and internal IDs are not exposed unless explicitly approved in the API contract task.
- Availability is rechecked immediately before any hold write.

### PayPal Flow

1. Guest selects an available property and enters required guest details.
2. Backend creates or updates a booking intent in DB with dates, guests, property, quote, language, and selected payment method.
3. Backend rechecks Smoobu availability for the exact property/dates/guest count.
4. Backend creates a provisional Smoobu hold using `POST /api/reservations` and stores the returned Smoobu reservation ID.
5. Backend creates a PayPal order for the full quoted booking amount and stores the PayPal order ID with an idempotency key.
6. Guest approves PayPal payment.
7. Backend captures payment using an idempotent request.
8. Backend processes verified PayPal webhook events before final state change. Browser return/success URLs are never proof of payment.
9. Backend marks payment paid, updates Smoobu payment fields when applicable, transitions the booking to confirmed, sends confirmation, and exposes portal access.

Failure and recovery:

- If PayPal approval occurs but capture fails, keep the booking payment-pending until retry, cancellation, or expiry.
- If capture succeeds but webhook is delayed, reconciliation can confirm by querying PayPal, but state changes remain idempotent.
- If Smoobu update fails after payment capture, set a provisioning-failed status, alert staff, and retry/reconcile before telling the guest the booking is confirmed.
- If hold expires before payment verification, cancel the Smoobu reservation and mark the local hold expired.

### Manual Deposit Flow

1. Guest selects an available property and enters required guest details.
2. Backend creates a booking intent and rechecks Smoobu availability.
3. Backend creates a provisional Smoobu hold and stores the returned reservation ID.
4. Guest sees deposit instructions, booking summary, reservation reference, and a real 60-minute countdown tied to backend `expires_at`.
5. Guest uploads deposit proof through a short-lived signed upload URL.
6. Upload enters quarantine. Backend validates file size, extension, detected MIME/magic bytes, checksum, and scan result.
7. Admin reviews proof and approves, rejects, requests re-upload, extends the hold, or cancels the hold.
8. Approval transitions the booking to paid/confirmed, updates Smoobu deposit/payment status when applicable, sends confirmation, and enables portal access.

Failure and recovery:

- Upload completion alone cannot mark the booking paid.
- Rejected proof returns the booking to a re-upload-needed state if the hold remains active.
- Expired hold without uploaded proof or admin extension cancels Smoobu reservation automatically.
- A guest help request flags the booking for staff and allows extension, but does not disable expiry indefinitely.

### Guest Portal Flow

1. Guest receives or sets portal credentials after hold creation or confirmation.
2. Guest logs in with `reservation_public_id` and password.
3. Portal returns the same generic error for unknown reservation ID and wrong password.
4. Guest can view booking summary, payment status, upload/re-upload deposit proof when allowed, request changes, and request cancellation.
5. Portal actions create backend records and notifications; they do not directly mutate confirmed/cancelled state without server validation or admin review.

MVP portal does not allow:

- Changing stay dates directly.
- Changing property directly.
- Updating Smoobu or PayPal state from the browser.
- Automated refunds.

## State Machine Requirements

The backend must model explicit states. Names can be adjusted during API contract design, but the flow must preserve these gates:

- `SEARCH_STARTED`
- `QUOTED`
- `HOLD_CREATING`
- `HOLD_ACTIVE`
- `PAYPAL_PENDING`
- `PAYPAL_CAPTURED`
- `DEPOSIT_PENDING`
- `PROOF_UPLOADED`
- `DEPOSIT_UNDER_REVIEW`
- `PAID`
- `CONFIRMED`
- `EXPIRED`
- `CANCELLED`
- `FAILED`

State transition rules:

- Only backend code can transition booking state.
- `CONFIRMED` requires an active Smoobu reservation ID and verified payment.
- PayPal verification requires capture completion plus verified webhook or reconciliation against PayPal.
- Deposit verification requires clean upload scan and admin approval.
- Cancellation and expiry must attempt Smoobu cancellation and record the outcome.
- Every privileged transition writes to `audit_log`.

## Non-Functional Requirements

### Security

- Keep Smoobu API keys, PayPal secrets, DB credentials, upload signing keys, and webhook secrets in AWS Secrets Manager.
- Never use `REACT_APP_*` for secrets.
- Verify PayPal webhook signatures before state changes.
- Dedupe PayPal and Smoobu webhooks.
- Validate all API inputs with typed schemas.
- Use parameterized DB queries or a safe ORM.
- Redact secrets, authorization headers, session IDs, and pre-signed URLs from logs.
- Store receipt uploads in a private S3 bucket with public access blocked.
- Scan uploads before admin approval.
- Apply WAF/rate limiting to public search, hold, upload, webhook, and portal endpoints.

### Reliability

- All write endpoints must be idempotent by booking ID and idempotency key.
- Hold creation, payment updates, and admin transitions must run inside DB transactions where possible.
- Scheduled expiry worker must cancel expired Smoobu holds.
- Reconciliation jobs must compare DB state against Smoobu and PayPal.
- Webhook handlers must safely process duplicate and out-of-order events.
- Smoobu conflicts or validation errors are authoritative and must not be retried blindly.

### Performance

- Availability quote target: p95 under 2.5 seconds when Smoobu is healthy.
- Calendar month cache hit target: p95 under 500 ms.
- Public API backend timeout target: under 8 seconds for Smoobu-dependent requests.
- Cache rates/calendar data for 5 to 10 minutes by apartment and month.
- Respect Smoobu rate limits and back off when rate-limit headers or 429 responses indicate exhaustion.

### Privacy And Retention

- Store the minimum PII needed for booking operations, payment reconciliation, and legally required records.
- Default receipt and guest PII retention is 24 months after checkout, configurable by environment.
- Delete or anonymize expired abandoned booking intents after 90 days unless tied to fraud, payment, audit, or support records.
- Do not include receipt URLs or sensitive guest details in analytics events.

### Accessibility And I18n

- Booking UI must support English and Spanish through string maps, not duplicated components.
- Persist booking language for server-side emails/SMS and portal display.
- Booking UI should meet WCAG 2.1 AA for form labels, keyboard navigation, contrast, validation errors, and status messages.
- Calendar price dots need accessible labels in the current language.

### Observability

- Every request gets a correlation ID.
- Structured logs include booking ID, public reservation ID where safe, provider IDs, and state transition names.
- Metrics and alerts cover payment webhook failures, Smoobu create/cancel failures, expired holds, upload scan failures, reconciliation mismatches, and portal brute-force signals.

## Admin Operations

MVP admin capabilities:

- Search booking by public reservation ID, guest email, Smoobu reservation ID, PayPal order ID, or date range.
- View booking timeline, current state, payment status, upload scan status, Smoobu reservation ID, and audit entries.
- Approve deposit proof only when scan status is clean.
- Reject deposit proof with a required reason and optional guest-facing message.
- Request deposit proof re-upload.
- Extend hold expiration with a required internal note.
- Cancel active hold or booking, including Smoobu cancellation attempt and audit record.
- Resend deposit instructions or confirmation message.
- Record manual refund/support notes without changing PayPal state automatically.
- Trigger or view reconciliation results for a booking.

Admin guardrails:

- Admin cannot mark PayPal as paid manually in MVP.
- Admin cannot approve quarantined, failed-scan, or unsupported receipt files.
- Destructive actions require confirmation and an audit reason.
- All admin operations require authenticated staff access and role-based authorization.

## Success Metrics

### Correctness Metrics

- Confirmed bookings without Smoobu reservation ID: 0.
- Confirmed bookings without verified PayPal capture or admin-approved deposit: 0.
- Double-booked same property/date from Kalawala flow: 0.
- Expired holds still active in Smoobu after cleanup window: 0.
- Duplicate webhook events causing duplicate state transitions: 0.

### Funnel Metrics

- Search started to quote returned.
- Quote returned to hold requested.
- Hold requested to hold active.
- Hold active to payment method selected.
- PayPal order created to PayPal approved.
- PayPal approved to capture completed.
- Deposit instructions shown to proof uploaded.
- Proof uploaded to admin approval/rejection.
- Hold active to confirmed.
- Hold active to expired/cancelled.

### Operational Metrics

- Availability quote p95 latency.
- Smoobu API error rate and 429 count.
- PayPal webhook verification failure count.
- Webhook processing lag p95.
- Upload scan completion p95.
- Reconciliation mismatch count and time to resolution.
- Admin deposit review time p50/p95.

### Security Metrics

- Rate-limit trigger count by endpoint.
- CAPTCHA escalation count for hold creation, if CAPTCHA is enabled.
- Portal failed-login rate by IP/device.
- Rejected upload count by reason.
- Invalid or replayed webhook count.
- Secrets detected in logs or artifacts: 0.

## Out Of Scope For MVP

- Replacing Smoobu as property management system of record.
- Multi-property cart bookings.
- Guest self-service date/property changes.
- Automated PayPal refunds.
- Supporting payment providers beyond PayPal and manual deposit.
- Full admin accounting/reporting suite.

## Change Control

The following require a new task or explicit approval before implementation changes:

- Hold duration or expiry semantics.
- Smoobu channel used for provisional holds.
- PayPal full-payment vs deposit-only charging behavior.
- Deposit file allowlist.
- State transition gates for `PAID` or `CONFIRMED`.
- Public API response fields that expose provider IDs or raw provider errors.
- Retention duration for receipt files or guest PII.
