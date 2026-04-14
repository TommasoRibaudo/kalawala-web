# Booking Engine PRD Freeze

Task: 1.2 PRD freeze
Status: frozen
Date: 2026-04-14

## Purpose

Build a secure Kalawala booking engine that lets guests search availability, reserve inventory, pay by PayPal, and manage a PayPal-confirmed reservation through a guest portal. Manual deposit remains an offline/manual handoff outside the custom booking engine. The frontend remains a React CRA marketing site; booking authority lives in the backend.

This PRD freezes the MVP product behavior for PayPal, offline deposit handoff, guest portal, non-functional requirements, operational handoff, and success metrics. Later changes to frozen decisions require a new task or explicit change request.

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
| Hold model | Use Smoobu-backed provisional holds for PayPal checkout only. Manual deposit does not create an automated custom-engine hold in MVP. |
| Smoobu channel for unpaid holds | Use Smoobu `Blocked channel` (`channelId: 11`) for provisional unpaid holds. If the account/API rejects this channel in implementation, use a config-gated fallback to `Direct booking` (`channelId: 13`) with an audit entry. |
| Hold duration | Default guest hold is 60 minutes. Expiry is real, not fake. |
| Hold extension | No custom admin hold extension in MVP. Expired PayPal holds are automatically cancelled. Exceptions are handled manually outside the custom app. |
| PayPal charge amount | MVP PayPal checkout collects the full quoted booking amount unless a later property-level configuration explicitly enables deposit-only PayPal. |
| Manual deposit | Manual deposit is an offline inquiry/handoff. The booking engine can show instructions/contact options, but it does not upload receipts, approve deposits, or confirm deposit bookings. Staff handle deposit bookings directly in Smoobu or existing business channels. |
| Confirmation authority | A booking is confirmed automatically only after Smoobu hold exists and PayPal payment is verified. Manual deposit confirmation is outside the custom engine in MVP. |
| Guest portal | Portal access uses non-guessable `reservation_public_id` plus guest password. Passwords are stored only as salted hashes. |
| Language | Persist `language` as `'en'` or `'es'` in the booking record at session start and use it for portal and communications. |
| Listing links | Search result listing links open in a new tab with `target="_blank"` and `rel="noopener noreferrer"`, using `/{slug}` for English and `/{slug}ES` for Spanish. |
| Receipt uploads | No custom receipt upload in MVP. Guests send deposit proof through existing offline channels such as WhatsApp or email if manual deposit is offered. |
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

### Manual Deposit Handoff

1. Guest selects manual deposit instead of PayPal.
2. Frontend shows clear offline instructions and contact options, such as WhatsApp/email, in the guest's language.
3. The page states that the stay is not confirmed by the custom booking engine until Kalawala staff manually confirms through existing business channels.
4. No custom receipt upload, deposit approval, hold extension, or admin dashboard is built for MVP.
5. If staff accepts the deposit offline, staff manages the booking directly in Smoobu or the existing operational process.

MVP requirements:

- Manual deposit must not display an automatic "confirmed" state in the custom engine.
- Manual deposit must not create a long-running custom hold that requires an admin panel to release.
- Manual deposit contact events can be tracked as inquiries, but they are not purchase/confirmed-booking events.
- Any future automated deposit workflow requires a separate PRD update.

### Guest Portal Flow

1. Guest receives or sets portal credentials after hold creation or confirmation.
2. Guest logs in with `reservation_public_id` and password.
3. Portal returns the same generic error for unknown reservation ID and wrong password.
4. Guest can view booking summary, PayPal payment status, and request help/cancellation.
5. Portal actions create backend records and notifications; they do not directly mutate confirmed/cancelled state without server validation.

MVP portal does not allow:

- Changing stay dates directly.
- Changing property directly.
- Updating Smoobu or PayPal state from the browser.
- Uploading deposit receipts.
- Automated refunds.

## State Machine Requirements

The backend must model explicit states. Names can be adjusted during API contract design, but the flow must preserve these gates:

- `SEARCH_STARTED`
- `QUOTED`
- `HOLD_CREATING`
- `HOLD_ACTIVE`
- `PAYPAL_PENDING`
- `PAYPAL_CAPTURED`
- `PAID`
- `CONFIRMED`
- `EXPIRED`
- `CANCELLED`
- `FAILED`

State transition rules:

- Only backend code can transition booking state.
- `CONFIRMED` requires an active Smoobu reservation ID and verified payment.
- PayPal verification requires capture completion plus verified webhook or reconciliation against PayPal.
- Cancellation and expiry must attempt Smoobu cancellation and record the outcome.
- Every privileged transition writes to `audit_log`.

## Non-Functional Requirements

### Security

- Keep Smoobu API keys, PayPal secrets, DB credentials, and webhook secrets in AWS Secrets Manager.
- Never use `REACT_APP_*` for secrets.
- Verify PayPal webhook signatures before state changes.
- Dedupe PayPal and Smoobu webhooks.
- Validate all API inputs with typed schemas.
- Use parameterized DB queries or a safe ORM.
- Redact secrets, authorization headers, session IDs, and pre-signed URLs from logs.
- Apply WAF/rate limiting to public search, hold, webhook, and portal endpoints.

### Reliability

- All write endpoints must be idempotent by booking ID and idempotency key.
- Hold creation and payment updates must run inside DB transactions where possible.
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
- Default guest PII retention is 24 months after checkout, configurable by environment.
- Delete or anonymize expired abandoned booking intents after 90 days unless tied to fraud, payment, audit, or support records.
- Do not include sensitive guest details in analytics events.

### Accessibility And I18n

- Booking UI must support English and Spanish through string maps, not duplicated components.
- Persist booking language for server-side emails/SMS and portal display.
- Booking UI should meet WCAG 2.1 AA for form labels, keyboard navigation, contrast, validation errors, and status messages.
- Calendar price dots need accessible labels in the current language.

### Observability

- Every request gets a correlation ID.
- Structured logs include booking ID, public reservation ID where safe, provider IDs, and state transition names.
- Metrics and alerts cover payment webhook failures, Smoobu create/cancel failures, expired holds, reconciliation mismatches, and portal brute-force signals.

## Manual Operations Outside The Custom App

There is no custom admin panel in MVP.

MVP operational model:

- PayPal bookings are confirmed by backend automation only after verified payment.
- Manual deposit is handled through existing channels such as Smoobu, WhatsApp, email, or phone.
- Staff do not approve deposits, extend timers, or cancel holds in a custom dashboard.
- Staff can still use Smoobu directly for offline/manual bookings.
- Backend alerts can notify staff about failures, but remediation happens outside a custom admin UI in MVP.

Out of MVP:

- Custom admin dashboard.
- Deposit receipt review queue.
- Admin approve/reject buttons.
- Admin hold-extension button.
- Custom admin booking cancellation UI.

## Success Metrics

### Correctness Metrics

- Confirmed bookings without Smoobu reservation ID: 0.
- Confirmed bookings without verified PayPal capture: 0.
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
- Manual deposit option selected to contact handoff clicked.
- Hold active to confirmed.
- Hold active to expired/cancelled.

### Operational Metrics

- Availability quote p95 latency.
- Smoobu API error rate and 429 count.
- PayPal webhook verification failure count.
- Webhook processing lag p95.
- Reconciliation mismatch count and time to resolution.

### Security Metrics

- Rate-limit trigger count by endpoint.
- CAPTCHA escalation count for hold creation, if CAPTCHA is enabled.
- Portal failed-login rate by IP/device.
- Invalid or replayed webhook count.
- Secrets detected in logs or artifacts: 0.

## Out Of Scope For MVP

- Replacing Smoobu as property management system of record.
- Multi-property cart bookings.
- Guest self-service date/property changes.
- Automated PayPal refunds.
- Supporting payment providers beyond PayPal and manual deposit.
- Custom admin panel or admin accounting/reporting suite.
- Custom deposit receipt upload and approval workflow.

## Change Control

The following require a new task or explicit approval before implementation changes:

- Hold duration or expiry semantics.
- Smoobu channel used for provisional holds.
- PayPal full-payment vs deposit-only charging behavior.
- Any change that makes manual deposit automatic inside the booking engine.
- State transition gates for `PAID` or `CONFIRMED`.
- Public API response fields that expose provider IDs or raw provider errors.
- Retention duration for guest PII.
