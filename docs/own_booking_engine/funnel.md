# Booking funnel — PostHog

The six-step funnel from a visitor landing on the site to a paid booking.

## Why PostHog and not GA4

Both could carry this funnel — `booking-api/src/serverConversions.ts` forwards
`client_id` and `session_id`, so GA4's user stitching across the browser/server
split is intact. PostHog wins on everything else that matters here:

- Funnels are built from raw events with no schema registration. GA4 needs every
  custom parameter registered as a custom dimension before it can be used in an
  exploration, and only from that point forward — no backfill.
- No 24–48h processing delay, so instrumentation changes are verifiable the same
  day.
- Low traffic. GA4 applies thresholding to reports with small user counts and
  will simply withhold rows; a property portfolio in Puerto Viejo generates
  nowhere near enough volume to reliably clear it.
- Breakdowns by `language`, `property_slug`, `payment_type` and `source` work on
  any event property without setup.

GA4 keeps the commerce events (`search`, `begin_checkout`, `add_payment_info`,
`purchase`) for ad-platform reporting. That is a different job from funnel
analysis and the two do not need to share a tool.

## The steps

| # | Step | Event | Fired from |
|---|------|-------|-----------|
| 1 | Entry | `$pageview` | `Router.tsx` — `PostHogPageView` |
| 2 | Search for dates | `booking_search` | `Booking.page.tsx` — `doSearch` |
| 3 | Booking tool | `availability_results` | `Booking.page.tsx` — `doSearch` |
| 4 | Booking form | `booking_form_viewed` | `handleStartPayPalHold` / `handleStartDepositCheckout` |
| 5 | Actual booking | `checkout_started` | after `createPayPalHold` / `createDepositHold` resolves |
| 6 | Payment | `payment_completed` | confirmation route (PayPal) / receipt upload (deposit) |

`checkout_started` is step 5 despite the name: it fires *after* the server
confirms the hold, so it means "dates are actually reserved". It keeps that name
because Meta dedupes `InitiateCheckout` against the server on the quote ID and
the existing PostHog history is keyed to it. Rename the step label in the
PostHog UI, not the event.

### Supporting events (not funnel steps)

| Event | Answers |
|-------|---------|
| `booking_form_started` | Did they open the form and leave, or type and give up? Carries `first_field`. |
| `payment_started` | Did they reach PayPal / see the bank details at all? A drop after this is an off-site abandonment, not a UX problem on our pages. |
| `paypal_approved` | They approved at PayPal and came back. The gap to `payment_completed` is bookings lost to capture errors. |

## The saved insights

Both live in PostHog project 374182:

- **[Booking funnel — entry to payment (live events)](https://us.posthog.com/project/374182/insights/9BryKjb4)**
  — works today. Uses `payment_method_selected` for step 4 and
  `booking_confirmed` for step 6, because those are the deployed events.
- **[Booking funnel — full (activates after deploy)](https://us.posthog.com/project/374182/insights/AGuzH54P)**
  — the table above. Reads 0% until `booking_form_viewed` and
  `payment_completed` ship; retire the live one at that point.

### Baseline, last 90 days (live funnel)

| Step | Persons | From previous | Median time |
|---|---|---|---|
| 1. Entry | 2,725 | — | — |
| 2. Search for dates | 10 | 0.37% | 40ms |
| 3. Booking tool | 10 | 100% | 1s |
| 4. Booking form opened | 4 | 40% | 14s |
| 5. Booking held | 2 | 50% | 54s |
| 6. Payment | 2 | 100% | 45s |

Total 0.07%, median 2m 14s end to end.

Note the funnel undercounts bookings against the raw event volume — 90 days holds
about 7 `booking_confirmed` events but only 2 persons complete the ordered
sequence. Guests whose earlier steps fell outside the 7-day window, or who
searched before consenting, never enter the funnel at all. Use the funnel for
drop-off *rates* and the raw event count for "how many bookings did we take".

## Rebuilding it

Product analytics → New insight → Funnel. Add the six events above in order,
then:

- **Conversion window**: 7 days. The manual deposit path involves a bank
  transfer, so same-session (30 min) truncates it badly. The PayPal path
  completes in minutes either way.
- **Order**: sequential. Steps 4→5→6 are genuinely ordered; strict order would
  drop guests who go back to results and pick a different home, which is normal
  behaviour, not a funnel exit.
- **Rename step 5** to "Booking held" so the display matches what it measures.

### Breakdowns worth adding

- `source` on step 2 — separates `widget_hero` (homepage), `widget_sidebar`
  (listing pages) and `booking_page` (searched again on /book). This is the only
  way to tell which entry point actually drives bookings; before it existed
  every search reported `booking_page` because that is where the search runs.
- `payment_type` on steps 4–6 — PayPal vs manual deposit have very different
  drop-offs and averaging them hides both.
- `language` — the EN and ES journeys are separate funnels in practice.

## Caveats

- **Consent gating.** Every event is behind `CookieConsentService.hasConsent('analytics')`,
  and PostHog is `opt_out_capturing_by_default`. The funnel counts consenting
  visitors only. Conversion *rates* stay meaningful; absolute counts are a floor,
  not a total.
- **`payment_completed` is not revenue on the deposit path.** Its `outcome`
  property is `awaiting_verification` there — the guest uploaded a transfer
  receipt, staff verify it days later off-session, and the browser never sees
  that. Filter to `outcome = confirmed` for revenue. `booking_confirmed` remains
  the PayPal-only revenue event.
- **Anonymous visitors.** `person_profiles: 'identified_only'` means anonymous
  users get no person profile, so PostHog aggregates them by `distinct_id`.
  Funnels work; cross-device stitching does not.
- **Step 1 is close to 100%.** Every route change fires `$pageview`, including
  `/book` itself, so "entry" is effectively the whole audience. That is what
  makes step 1→2 the real top-of-funnel number.
