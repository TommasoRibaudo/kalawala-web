# Booking Engine API Contract

Task: 1.4 API contract design
Status: completed
Date: 2026-04-14

## Purpose

Define the first backend API contract for the Kalawala booking engine. This is the implementation boundary between the React frontend, the AWS-hosted booking API, PostgreSQL booking state, Smoobu, PayPal, and the guest portal.

The contract covers availability search, calendar price-dot data, PayPal-only holds, PayPal order/capture, manual deposit handoff, PayPal and Smoobu webhooks, and guest portal endpoints.

## Source Context

References consulted:

- `docs/own_booking_engine/plan.md`
- `docs/own_booking_engine/tasks.md`
- `docs/own_booking_engine/prd.md`
- `docs/own_booking_engine/data_model.md`
- `docs/own_booking_engine/threat_model.md`
- `docs/own_booking_engine/Introduction - Smoobu Api.pdf` (filename on disk uses an en dash)
- Official Smoobu API documentation: `https://docs.smoobu.com/`
- `AGENTS.md`

Smoobu API facts that shape this contract:

- Smoobu requests authenticate with an `Api-Key` header and must be made only from the backend.
- Availability uses `POST https://login.smoobu.com/booking/checkApartmentAvailability`; responses can include `availableApartments`, `prices`, `currency`, and `errorMessages`.
- Reservation creation uses `POST https://login.smoobu.com/api/reservations` and returns a reservation ID.
- Provisional PayPal holds use Smoobu `channelId = 11` (Blocked channel) by default, with config-gated fallback to `channelId = 13` (Direct booking) only if implementation proves it is required.
- Reservation/payment fields include guest details, `language`, `priceStatus`, `prepaymentStatus`, and `depositStatus`; status value `0` means open/not paid and `1` means complete payment.
- Reservation cancellation uses `DELETE https://login.smoobu.com/api/reservations/<reservationId>` and is used by hold expiry cleanup.
- Rates use `GET https://login.smoobu.com/api/rates?apartments[]=...&start_date=YYYY-MM-DD&end_date=YYYY-MM-DD`.
- Apartments use `GET https://login.smoobu.com/api/apartments` for server-side catalog reconciliation.
- Smoobu webhooks include actions such as `updateRates`, `newReservation`, `cancelReservation`, and `updateReservation`.
- Smoobu rate limit is 1000 requests per minute. Backend endpoints must cache and rate-limit public access.

## Contract Principles

- Browser responses never include Smoobu API keys, PayPal secrets, raw provider payloads, Smoobu apartment IDs, or Smoobu reservation IDs.
- Browser responses do not expose raw Smoobu `errorMessages`; they expose safe reason codes and localized message keys.
- Empty availability is a successful `200` response with an empty `properties` array.
- All public write endpoints require `Idempotency-Key`.
- Only backend code can move a booking into `confirmed`, `paid`, `cancelled`, or `expired`.
- Manual deposit is an offline inquiry/handoff. It cannot create a payment, paid state, confirmed state, or custom-engine hold in MVP.
- PayPal browser approval or return URLs are not proof of payment. Final confirmation requires verified PayPal webhook processing or trusted server-side PayPal reconciliation.
- API routes use safe public property IDs and public slugs. Smoobu apartment IDs remain server-side implementation details.

## Common HTTP Conventions

Base path:

```text
/api
```

Request headers:

```text
Content-Type: application/json
Accept: application/json
X-Correlation-Id: <uuid or trace id>
Idempotency-Key: <required for POST write endpoints>
Accept-Language: en | es
```

Server response headers:

```text
X-Correlation-Id: <same id or generated id>
Cache-Control: no-store
```

Calendar responses may use:

```text
Cache-Control: private, max-age=300
X-Cache: hit | miss | stale
```

Dates use `YYYY-MM-DD`. Date ranges are checkout-exclusive: `[arrivalDate, departureDate)`. Timestamps use ISO 8601 UTC. Money uses integer cents plus ISO currency. `language` is always `en` or `es` and is persisted on `booking_sessions.language`.

`quoteId` (format `qt_<ULID>`) is the public quote token returned by the search endpoint and stored as `booking_sessions.quote_id`. It is distinct from `bookingSessionId` (the UUID primary key). Hold creation and deposit-handoff requests that include `quoteId` are validated server-side by looking up `booking_sessions.quote_id`.

## Common Schemas

### ErrorResponse

```json
{
  "error": {
    "code": "validation_failed",
    "message": "Please check the highlighted fields.",
    "fieldErrors": {
      "arrivalDate": ["arrival_date_must_be_future"]
    },
    "retryable": false,
    "correlationId": "01HXEXAMPLE"
  }
}
```

Common error codes:

| Code | HTTP | Meaning |
|---|---:|---|
| `validation_failed` | 422 | Request shape or business validation failed. |
| `unauthorized` | 401 | Login/session is missing or invalid. |
| `forbidden` | 403 | Authenticated principal cannot access the object. |
| `not_found` | 404 | Object is missing or intentionally hidden. |
| `quote_expired` | 409 | Search quote is no longer usable. |
| `property_no_longer_available` | 409 | Just-in-time Smoobu availability recheck failed. |
| `idempotency_conflict` | 409 | Same idempotency key was reused for a different request body. |
| `hold_expired` | 409 | Hold expired before the requested operation. |
| `payment_not_ready` | 409 | Payment is not in the required state. |
| `rate_limited` | 429 | Public rate limit or WAF rule triggered. |
| `provider_unavailable` | 503 | Smoobu or PayPal is unavailable or timing out. |

### PublicProperty

```json
{
  "propertyId": "b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111",
  "slug": "Geco",
  "listingUrl": "/Geco",
  "name": "Casa Geco",
  "guestCapacity": 5,
  "thumbnailUrl": "https://example.com/geco.jpg",
  "amenities": [
    { "code": "wifi", "label": "WiFi" },
    { "code": "ac", "label": "A/C" }
  ]
}
```

Rules:

- `slug` is the canonical English slug without `ES`.
- `listingUrl` is language-aware: `/{slug}` for English, `/{slug}ES` for Spanish.
- `propertyId` is a public opaque UUID from `properties.id`.

### QuotePrice

```json
{
  "currency": "USD",
  "totalAmountCents": 51000,
  "nightlyAverageCents": 12750,
  "nights": 4,
  "includesTaxes": false,
  "rateSource": "smoobu"
}
```

### GuestDetails

```json
{
  "firstName": "Ana",
  "lastName": "Mora",
  "email": "ana@example.com",
  "phone": "+50688888888",
  "country": "CR",
  "message": "Arriving around 4pm"
}
```

`firstName`, `lastName`, and `email` are required before PayPal hold creation. Guest PII is never included in analytics payloads.

## Endpoint: Availability Search

```text
POST /api/search
```

Purpose:

- Validate any future date range and guest count.
- Call Smoobu availability server-side.
- Persist a `booking_sessions` row in `quoted` state.
- Return safe property summaries and prices.
- Return `200` with no results when nothing is available.

Request:

```json
{
  "arrivalDate": "2026-06-10",
  "departureDate": "2026-06-14",
  "guests": 2,
  "language": "en",
  "discountCode": "5off",
  "source": "booking_page"
}
```

Validation:

- `arrivalDate` must be today or later in Costa Rica local date.
- `departureDate` must be after `arrivalDate`.
- `guests` must be a positive integer.
- `language` must be `en` or `es`.
- `discountCode` is optional and must be normalized server-side before passing to Smoobu.

Server-side Smoobu call:

```text
POST https://login.smoobu.com/booking/checkApartmentAvailability
```

The backend sends configured apartment IDs, arrival/departure, guest count, account/customer context, and optional discount code. The browser never chooses Smoobu apartment IDs.

Success response with results:

```json
{
  "bookingSessionId": "3d0f8ac0-5c30-4b09-bb49-12fd1df120f1",
  "quoteId": "qt_01HXEXAMPLE",
  "quoteExpiresAt": "2026-04-14T21:10:00Z",
  "arrivalDate": "2026-06-10",
  "departureDate": "2026-06-14",
  "guests": 2,
  "language": "en",
  "resultsCount": 1,
  "properties": [
    {
      "propertyId": "b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111",
      "slug": "Geco",
      "listingUrl": "/Geco",
      "name": "Casa Geco",
      "guestCapacity": 5,
      "thumbnailUrl": "https://example.com/geco.jpg",
      "amenities": [
        { "code": "wifi", "label": "WiFi" },
        { "code": "parking", "label": "Private parking" }
      ],
      "price": {
        "currency": "USD",
        "totalAmountCents": 51000,
        "nightlyAverageCents": 12750,
        "nights": 4,
        "includesTaxes": false,
        "rateSource": "smoobu"
      },
      "actions": {
        "viewListingUrl": "/Geco",
        "canCreatePayPalHold": true,
        "canUseManualDepositHandoff": true
      }
    }
  ],
  "availabilityWarnings": []
}
```

Success response with no availability:

```json
{
  "bookingSessionId": "3d0f8ac0-5c30-4b09-bb49-12fd1df120f1",
  "quoteId": "qt_01HXEXAMPLE",
  "quoteExpiresAt": "2026-04-14T21:10:00Z",
  "arrivalDate": "2026-06-10",
  "departureDate": "2026-06-14",
  "guests": 2,
  "language": "en",
  "resultsCount": 0,
  "properties": [],
  "availabilityWarnings": [
    {
      "code": "no_properties_available",
      "messageKey": "booking.noAvailability"
    }
  ]
}
```

Safe warning codes mapped from Smoobu restrictions:

- `minimum_stay_not_met`
- `guest_capacity_exceeded`
- `arrival_day_restricted`
- `departure_day_restricted`
- `lead_time_restricted`
- `gap_rule_restricted`
- `discount_code_invalid`
- `no_properties_available`

Response notes:

- Raw Smoobu `errorMessages` stay server-side.
- `properties[].actions.viewListingUrl` must be rendered as an `<a>` with `target="_blank"` and `rel="noopener noreferrer"`.
- Search results may be short-cacheable server-side for 10 to 120 seconds, but hold creation must always recheck Smoobu.

## Endpoint: Calendar Price Dots

```text
GET /api/calendar/:apartmentSlug?month=YYYY-MM&language=en
```

Purpose:

- Support listing-page calendar dots.
- Proxy Smoobu rates server-side for the whole visible month.
- Compute dot colors relative to available-date monthly average.
- Cache by `(property_id, month)` for 5 to 10 minutes.
- Invalidate on Smoobu `updateRates` webhook when possible.

Path and query:

- `apartmentSlug`: canonical slug, for example `Geco`, `VillaCoral`, or `Plumeria`. The backend normalizes a trailing `ES` if present.
- `month`: required `YYYY-MM`.
- `language`: optional `en` or `es`; only affects message keys and labels.

Server-side Smoobu call:

```text
GET https://login.smoobu.com/api/rates?apartments[]=<server_apartment_id>&start_date=YYYY-MM-01&end_date=YYYY-MM-last
```

Success response:

```json
{
  "property": {
    "propertyId": "b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111",
    "slug": "Geco",
    "name": "Casa Geco"
  },
  "month": "2026-06",
  "currency": "USD",
  "days": [
    {
      "date": "2026-06-01",
      "available": true,
      "priceCents": 12000,
      "minStay": 2,
      "dot": "green",
      "ariaLabelKey": "calendar.priceLow"
    },
    {
      "date": "2026-06-02",
      "available": false,
      "priceCents": null,
      "minStay": null,
      "dot": "grey",
      "ariaLabelKey": "calendar.unavailable"
    }
  ],
  "stats": {
    "availableNightCount": 23,
    "minPriceCents": 10000,
    "maxPriceCents": 18000,
    "averagePriceCents": 13500
  },
  "cache": {
    "status": "hit",
    "ttlSeconds": 300,
    "generatedAt": "2026-04-14T21:00:00Z"
  }
}
```

Dot rules:

- `grey`: unavailable or missing price.
- `green`: available price below 90 percent of monthly average.
- `yellow`: available price from 90 percent through 110 percent of monthly average.
- `red`: available price above 110 percent of monthly average.

## Endpoint: Create PayPal Hold

```text
POST /api/holds
```

Purpose:

- Start PayPal checkout for one quoted property.
- Recheck Smoobu availability for the exact property, dates, and guest count.
- Create a local hold row with overlap protection.
- Create a real Smoobu provisional hold using `POST /api/reservations`.
- Return hold expiry and booking summary.

Headers:

```text
Idempotency-Key: <required>
X-Correlation-Id: <recommended>
```

Request:

```json
{
  "quoteId": "qt_01HXEXAMPLE",
  "bookingSessionId": "3d0f8ac0-5c30-4b09-bb49-12fd1df120f1",
  "propertyId": "b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111",
  "paymentMethod": "paypal",
  "guest": {
    "firstName": "Ana",
    "lastName": "Mora",
    "email": "ana@example.com",
    "phone": "+50688888888",
    "country": "CR",
    "message": "Arriving around 4pm"
  },
  "portalPassword": "correct horse battery staple",
  "termsAccepted": true,
  "marketingConsent": false
}
```

Validation:

- `paymentMethod` must be `paypal`. Manual deposit does not use this endpoint.
- `quoteId`, `bookingSessionId`, and `propertyId` must match the stored quote.
- Quote must not be expired.
- The quoted price and currency must match the just-in-time Smoobu recheck.
- `portalPassword` must satisfy the guest-portal password policy and is stored only as a salted hash.
- `termsAccepted` must be `true`.

Server-side Smoobu calls:

```text
POST https://login.smoobu.com/booking/checkApartmentAvailability
POST https://login.smoobu.com/api/reservations
```

The Smoobu reservation payload is constructed only on the backend. It includes the mapped apartment ID, arrival/departure, guest details, `language`, `channelId: 11`, and payment status fields set to open/not paid (`0`) while PayPal is pending.

Success response:

```json
{
  "booking": {
    "bookingSessionId": "3d0f8ac0-5c30-4b09-bb49-12fd1df120f1",
    "reservationPublicId": "KWL-8J6K2P9Q",
    "status": "hold_active",
    "language": "en",
    "arrivalDate": "2026-06-10",
    "departureDate": "2026-06-14",
    "guests": 2,
    "property": {
      "propertyId": "b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111",
      "slug": "Geco",
      "listingUrl": "/Geco",
      "name": "Casa Geco",
      "guestCapacity": 5,
      "thumbnailUrl": "https://example.com/geco.jpg",
      "amenities": []
    },
    "price": {
      "currency": "USD",
      "totalAmountCents": 51000,
      "nightlyAverageCents": 12750,
      "nights": 4,
      "includesTaxes": false,
      "rateSource": "smoobu"
    },
    "hold": {
      "status": "active",
      "expiresAt": "2026-04-14T22:00:00Z"
    },
    "payment": {
      "method": "paypal",
      "status": "pending"
    }
  },
  "nextAction": "create_paypal_order"
}
```

Failure responses:

- `409 quote_expired`: rerun search.
- `409 property_no_longer_available`: rerun search and show alternatives.
- `409 idempotency_conflict`: same key reused with different body.
- `503 provider_unavailable`: Smoobu unavailable; no browser-confirmable hold exists unless response explicitly includes `hold.status = active`.

## Endpoint: Create PayPal Order

```text
POST /api/paypal/order
```

Purpose:

- Create a PayPal Orders v2 order for an active hold.
- Store the PayPal order ID and backend-generated PayPal request ID.
- Return only the fields the frontend needs to send the guest to PayPal.

Headers:

```text
Idempotency-Key: <required>
```

Request:

```json
{
  "bookingSessionId": "3d0f8ac0-5c30-4b09-bb49-12fd1df120f1"
}
```

Validation:

- Booking must be `hold_active`.
- Hold must not be expired.
- Payment amount must equal stored quote amount.

Server-side PayPal call:

- Backend sends `PayPal-Request-Id` derived from the idempotency ledger.
- The full amount is charged in MVP.
- Return and cancel URLs are read from server-side environment configuration (`PAYPAL_RETURN_URL`, `PAYPAL_CANCEL_URL`). They are never accepted from the browser to prevent open-redirect exploitation.

Success response:

```json
{
  "bookingSessionId": "3d0f8ac0-5c30-4b09-bb49-12fd1df120f1",
  "reservationPublicId": "KWL-8J6K2P9Q",
  "status": "paypal_pending",
  "paypal": {
    "orderId": "5O190127TN364715T",
    "approvalUrl": "https://www.paypal.com/checkoutnow?token=5O190127TN364715T"
  },
  "amount": {
    "currency": "USD",
    "totalAmountCents": 51000
  },
  "holdExpiresAt": "2026-04-14T22:00:00Z"
}
```

Notes:

- `paypal.orderId` is safe to expose because the PayPal browser flow needs it.
- The response does not confirm payment.
- Repeating the same idempotency key with the same body returns the original response.

## Endpoint: Capture PayPal Order

```text
POST /api/paypal/capture
```

Purpose:

- Capture a PayPal order after guest approval.
- Store capture IDs and raw provider metadata server-side.
- Return a pending/received state to the browser.
- Defer final booking confirmation until verified webhook processing or trusted reconciliation.

Headers:

```text
Idempotency-Key: <required>
```

Request:

```json
{
  "bookingSessionId": "3d0f8ac0-5c30-4b09-bb49-12fd1df120f1",
  "paypalOrderId": "5O190127TN364715T"
}
```

Validation:

- Booking must be `paypal_pending`.
- Hold must not be expired.
- PayPal order ID must match the stored payment row.
- Amount and currency returned by PayPal must match stored quote.

Success response:

```json
{
  "bookingSessionId": "3d0f8ac0-5c30-4b09-bb49-12fd1df120f1",
  "reservationPublicId": "KWL-8J6K2P9Q",
  "status": "paypal_captured",
  "payment": {
    "method": "paypal",
    "status": "captured",
    "currency": "USD",
    "totalAmountCents": 51000
  },
  "nextAction": "await_confirmation",
  "messageKey": "booking.paymentReceivedConfirmationPending"
}
```

Optional response when confirmation has already been finalized by a verified webhook or reconciliation:

```json
{
  "bookingSessionId": "3d0f8ac0-5c30-4b09-bb49-12fd1df120f1",
  "reservationPublicId": "KWL-8J6K2P9Q",
  "status": "confirmed",
  "payment": {
    "method": "paypal",
    "status": "paid",
    "currency": "USD",
    "totalAmountCents": 51000
  },
  "nextAction": "show_confirmation"
}
```

Rules:

- The frontend must not treat a PayPal redirect, PayPal approval callback, or locally successful JavaScript event as confirmation.
- Confirmation requires server-side capture verification plus PayPal webhook verification or reconciliation.
- If capture succeeds and Smoobu final update fails, return `paypal_captured` with `nextAction = "await_confirmation"` and alert staff.

## Endpoint: Manual Deposit Handoff Instructions

```text
GET /api/deposit-handoff?language=en&quoteId=qt_01HXEXAMPLE&propertyId=b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111
```

Purpose:

- Return localized offline contact/payment instructions.
- Make clear that the custom engine does not confirm manual deposit bookings.
- Avoid creating holds, payments, or confirmed states.

Query:

- `language`: required `en` or `es`.
- `quoteId`: optional; used only to personalize dates/property if still available.
- `propertyId`: optional; must match the quote when present.

Success response:

```json
{
  "language": "en",
  "status": "manual_deposit_handoff",
  "isBookingConfirmed": false,
  "doesCreateHold": false,
  "messageKey": "deposit.handoffIntro",
  "instructions": {
    "titleKey": "deposit.title",
    "bodyKeys": [
      "deposit.notConfirmed",
      "deposit.staffWillConfirm",
      "deposit.contactUs"
    ],
    "contactMethods": [
      {
        "type": "whatsapp",
        "label": "+506 8463 2276",
        "url": "https://wa.me/50684632276"
      },
      {
        "type": "email",
        "label": "reservas.kalawala@gmail.com",
        "url": "mailto:reservas.kalawala@gmail.com"
      }
    ]
  },
  "bookingContext": {
    "quoteId": "qt_01HXEXAMPLE",
    "property": {
      "propertyId": "b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111",
      "slug": "Geco",
      "listingUrl": "/Geco",
      "name": "Casa Geco"
    },
    "arrivalDate": "2026-06-10",
    "departureDate": "2026-06-14",
    "guests": 2
  }
}
```

Rules:

- This endpoint may read a quote but must not create a hold.
- This endpoint must not create a `payments` row.
- This endpoint must not return "confirmed" copy.
- Receipt upload instructions are out of MVP unless a future PRD changes that decision.

## Endpoint: Manual Deposit Handoff Event

```text
POST /api/deposit-handoff/events
```

Purpose:

- Record a consent-aware funnel event or notify staff through existing channels.
- Support task 4.4 without creating payment or booking state.

Headers:

```text
Idempotency-Key: <required>
```

Request:

```json
{
  "quoteId": "qt_01HXEXAMPLE",
  "propertyId": "b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111",
  "language": "en",
  "contactMethod": "whatsapp",
  "analyticsConsent": true
}
```

Success response:

```json
{
  "recorded": true,
  "status": "manual_deposit_handoff",
  "isBookingConfirmed": false,
  "messageKey": "deposit.contactEventRecorded"
}
```

Rules:

- Event name: `manual_deposit_handoff_clicked`.
- This is an inquiry/lead event, not a purchase event.
- It must not transition the booking to `paid` or `confirmed`.

## Endpoint: PayPal Webhook

```text
POST /api/webhooks/paypal
```

Purpose:

- Verify PayPal webhook authenticity.
- Store webhook event IDs for dedupe.
- Apply payment and booking state transitions idempotently.

Headers PayPal sends:

```text
PAYPAL-AUTH-ALGO: ...
PAYPAL-CERT-URL: ...
PAYPAL-TRANSMISSION-ID: ...
PAYPAL-TRANSMISSION-SIG: ...
PAYPAL-TRANSMISSION-TIME: ...
```

Request:

- Raw PayPal webhook JSON body.
- The Lambda/API Gateway integration must preserve raw body bytes for signature verification.

Verification:

- Before fetching or trusting the certificate, validate that `PAYPAL-CERT-URL` uses `https` and its hostname ends with `.paypal.com` or `.paypal.com.` (to prevent SSRF via attacker-controlled cert URLs). Reject the webhook with `400` if the URL fails this check.
- Backend calls PayPal webhook signature verification with configured `PAYPAL_WEBHOOK_ID`.
- Invalid signatures return `400` and do not write state transitions.
- Duplicate verified events return `200` after dedupe lookup.

Accepted event examples:

- `CHECKOUT.ORDER.APPROVED`
- `PAYMENT.CAPTURE.COMPLETED`
- `PAYMENT.CAPTURE.DENIED`
- `PAYMENT.CAPTURE.REFUNDED` (record and alert; automated refunds are out of MVP)
- `PAYMENT.CAPTURE.REVERSED` (record and alert)

Success response:

```json
{
  "received": true
}
```

Processing rules:

- `PAYMENT.CAPTURE.COMPLETED` must match expected PayPal order ID, capture ID, amount, and currency before setting payment paid.
- State transitions use DB locks/transactions.
- Confirmation requires the existing Smoobu hold/reservation ID. If Smoobu final update fails after capture, mark the booking for staff attention and retry/reconcile.
- Always return `2xx` for verified duplicate events to stop provider retries.

## Endpoint: Smoobu Webhook

```text
POST /api/webhooks/smoobu
```

Purpose:

- Ingest Smoobu reservation/rate events.
- Dedupe events.
- Invalidate rates/availability cache.
- Trigger reconciliation when provider state changes.

Authentication:

Use one of these implementation options, decided in backend scaffold:

- Secret path segment: `/api/webhooks/smoobu/<secret>`.
- Shared-secret header: `X-Smoobu-Webhook-Secret`.

Do not use query-string secrets for the new backend endpoint.

Request:

Smoobu payload shape can vary by action. Store the raw verified payload server-side, but process through a normalized wrapper:

```json
{
  "action": "updateRates",
  "data": {
    "id": 123456,
    "apartmentId": 98765
  }
}
```

Success response:

```json
{
  "received": true
}
```

Processing rules:

- `updateRates`: invalidate `(property_id, affected_months)` calendar cache where possible; otherwise invalidate the whole property month cache.
- `newReservation`, `cancelReservation`, `updateReservation`: insert webhook event and enqueue reconciliation for affected reservation/property/date range.
- Risky booking state transitions should re-fetch Smoobu state rather than trust the webhook payload alone.
- Duplicate events return `200`.

## Endpoint: Portal Login

```text
POST /api/portal/login
```

Purpose:

- Authenticate a guest using `reservationPublicId` plus password.
- Rate-limit by reservation ID hash, IP, and device/user-agent signal.
- Return an HttpOnly session cookie and safe booking summary.

Request:

```json
{
  "reservationPublicId": "KWL-8J6K2P9Q",
  "password": "correct horse battery staple",
  "language": "en"
}
```

Validation:

- Use the same generic response for unknown reservation ID and wrong password.
- Lock or slow attempts after repeated failures.
- Password hashes use Argon2id, bcrypt, or scrypt; never store plaintext.

Success response headers:

```text
Set-Cookie: kalawala_portal_session=<opaque>; HttpOnly; Secure; SameSite=Lax; Path=/api/portal
```

Success response:

```json
{
  "authenticated": true,
  "reservationPublicId": "KWL-8J6K2P9Q",
  "booking": {
    "bookingSessionId": "3d0f8ac0-5c30-4b09-bb49-12fd1df120f1",
    "reservationPublicId": "KWL-8J6K2P9Q",
    "status": "confirmed",
    "language": "en",
    "arrivalDate": "2026-06-10",
    "departureDate": "2026-06-14",
    "guests": 2,
    "property": {
      "propertyId": "b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111",
      "slug": "Geco",
      "listingUrl": "/Geco",
      "name": "Casa Geco",
      "guestCapacity": 5,
      "thumbnailUrl": "https://example.com/geco.jpg",
      "amenities": []
    },
    "payment": {
      "method": "paypal",
      "status": "paid"
    }
  }
}
```

Failure response:

```json
{
  "error": {
    "code": "invalid_portal_credentials",
    "message": "Reservation ID or password is incorrect.",
    "retryable": true,
    "correlationId": "01HXEXAMPLE"
  }
}
```

Use the same failure response for not found and bad password.

## Endpoint: Portal Reservation

```text
GET /api/portal/reservation/:reservationPublicId
```

Purpose:

- Return the current reservation summary for an authenticated guest.
- Hide internal provider IDs and raw provider state.

Authentication:

- Requires valid `kalawala_portal_session` cookie or equivalent bearer token.
- Session principal must match `reservationPublicId`.

Success response:

```json
{
  "booking": {
    "bookingSessionId": "3d0f8ac0-5c30-4b09-bb49-12fd1df120f1",
    "reservationPublicId": "KWL-8J6K2P9Q",
    "status": "confirmed",
    "language": "en",
    "arrivalDate": "2026-06-10",
    "departureDate": "2026-06-14",
    "guests": 2,
    "property": {
      "propertyId": "b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111",
      "slug": "Geco",
      "listingUrl": "/Geco",
      "name": "Casa Geco",
      "guestCapacity": 5,
      "thumbnailUrl": "https://example.com/geco.jpg",
      "amenities": []
    },
    "price": {
      "currency": "USD",
      "totalAmountCents": 51000,
      "nightlyAverageCents": 12750,
      "nights": 4,
      "includesTaxes": false,
      "rateSource": "smoobu"
    },
    "payment": {
      "method": "paypal",
      "status": "paid"
    },
    "availableActions": [
      "request_help",
      "request_cancellation"
    ]
  }
}
```

Rules:

- Portal reads must not trigger provider writes.
- The portal may show `request_cancellation`, but cancellation is a request workflow in MVP, not direct guest cancellation.

## Endpoint: Portal Help Request

```text
POST /api/portal/reservation/:reservationPublicId/help-request
```

Purpose:

- Let the guest ask for help or changes.
- Create an audit/support event and notify staff through existing channels.
- Do not mutate Smoobu or PayPal state.

Headers:

```text
Idempotency-Key: <required>
```

Request:

```json
{
  "type": "date_change",
  "message": "Can we arrive one day earlier?",
  "preferredContactMethod": "email"
}
```

Allowed `type` values:

- `general`
- `date_change`
- `guest_count_change`
- `arrival_time`
- `other`

Success response:

```json
{
  "requestId": "req_01HXEXAMPLE",
  "recorded": true,
  "messageKey": "portal.requestReceived"
}
```

## Endpoint: Portal Cancellation Request

```text
POST /api/portal/reservation/:reservationPublicId/cancellation-request
```

Purpose:

- Let the guest request cancellation review.
- Record and notify staff.
- Do not cancel Smoobu or PayPal automatically in MVP.

Headers:

```text
Idempotency-Key: <required>
```

Request:

```json
{
  "reason": "Travel plans changed",
  "message": "Please let us know the cancellation options."
}
```

Success response:

```json
{
  "requestId": "req_01HXEXAMPLE",
  "recorded": true,
  "messageKey": "portal.cancellationRequestReceived"
}
```

Rules:

- This endpoint does not call `DELETE /api/reservations/<reservationId>`.
- Staff or a later explicit cancellation/refund workflow handles provider-side cancellation.

## Internal Workers And Non-Public Routes

These are not browser-callable public APIs, but the implementation must reserve contracts for them:

| Worker | Trigger | Provider calls |
|---|---|---|
| Hold expiry | Schedule, every 1 to 5 minutes | `DELETE /api/reservations/<reservationId>` for expired Smoobu holds. |
| Payment reconciliation | Schedule | PayPal order/capture lookup for pending captures. |
| Smoobu reconciliation | Webhook or schedule | Smoobu reservation/rates lookup for affected objects. |
| Rates cache invalidation | Smoobu `updateRates` webhook | No browser response side effects. |

Workers write `audit_log`, `booking_state_transitions`, and `webhook_events` or reconciliation tables as applicable.

## State Transition Summary By Endpoint

| Endpoint | Allowed starting state | Possible resulting state |
|---|---|---|
| `POST /api/search` | none or abandoned session | `quoted` |
| `POST /api/holds` | `quoted` | `hold_active`, `failed` |
| `POST /api/paypal/order` | `hold_active` | `paypal_pending` |
| `POST /api/paypal/capture` | `paypal_pending` | `paypal_captured`, `confirmed`, `failed` |
| `GET /api/deposit-handoff` | any quoted/search context | no booking state mutation |
| `POST /api/deposit-handoff/events` | any quoted/search context | no paid/confirmed mutation |
| `POST /api/webhooks/paypal` | provider event dependent | `paid`, `confirmed`, `failed`, or no-op |
| `POST /api/webhooks/smoobu` | provider event dependent | cache invalidation, reconciliation, or no-op |
| `POST /api/portal/login` | confirmed/payment-pending guest booking | no booking state mutation |
| Portal request endpoints | authenticated portal session | support/audit record only |
| Hold expiry worker | `hold_active`, `paypal_pending` | `expired`, `cancelled`, or retry-needed |

## Idempotency Rules

Write endpoint scopes:

- `booking.hold.create`: `POST /api/holds`
- `booking.paypal.order.create`: `POST /api/paypal/order`
- `booking.paypal.capture`: `POST /api/paypal/capture`
- `booking.deposit_handoff.event`: `POST /api/deposit-handoff/events`
- `portal.help_request.create`: `POST /api/portal/reservation/:id/help-request`
- `portal.cancellation_request.create`: `POST /api/portal/reservation/:id/cancellation-request`

Rules:

- Store `scope`, `idempotency_key`, `request_hash`, `status`, `response_status`, and `response_body`.
- Same key and same request body returns the original response.
- Same key and different request body returns `409 idempotency_conflict`.
- In-progress keys use a short lock timeout so crashed requests can be retried safely.
- PayPal order/capture requests use the same logical idempotency key to build/store PayPal `PayPal-Request-Id`.

## Logging And Redaction

Log:

- correlation ID
- endpoint
- public booking/session IDs
- public reservation ID
- state transition names
- provider operation name
- safe provider object references when needed for support

Never log:

- Smoobu `Api-Key`
- PayPal access tokens or client secrets
- portal passwords or password hashes
- raw guest message text unless explicitly classified for support retention
- session cookies
- raw webhook headers that contain signatures
- raw provider payloads in frontend-visible logs

## Acceptance Checks For Task 1.4

- Search, hold, PayPal, deposit-handoff, webhook, calendar, and portal endpoints have request/response schemas.
- Empty availability is explicitly a `200` response.
- Search and calendar responses use public slugs and property IDs, not Smoobu apartment IDs.
- Hold creation is PayPal-only and requires a just-in-time Smoobu availability recheck.
- Manual deposit cannot create a hold, payment, paid state, or confirmed booking.
- PayPal capture does not let the browser assert confirmation.
- Webhooks are idempotent and PayPal webhooks require signature verification.
- Portal login uses non-enumerating failures and authenticated portal reads.
- Public write endpoints require idempotency keys.
- Smoobu upstream errors and restriction messages are mapped to safe guest-facing codes.
