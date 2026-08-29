---
target: /book page (src/pages/Booking.page.tsx)
total_score: 25
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-08-28T23-18-28Z
slug: src-pages-booking-page-tsx
---
Method: dual-agent (A: add8026b630922643 · B: a53ca36f067ce6282)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Loading/error states verified live; manual-deposit "staff verify in days" leaves no ongoing progress signal |
| 2 | Match System / Real World | 3 | Locally-correct payment rails (SINPE, colones) undercut by generic visual shell |
| 3 | User Control and Freedom | 3 | Back/clear-filters everywhere; no cancel/undo once a hold is created mid-checkout |
| 4 | Consistency and Standards | 3 | Nav "Book now" pill has no visual state for its own `aria-current="page"` |
| 5 | Error Prevention | 3 | Client-side validation on dates/guests/email/password/terms before any request |
| 6 | Recognition Rather Than Recall | 2 | Step indicator loses all text labels ≤992px — confirmed in `Booking.style.scss:2025-2027`, dots-only for the exact width band mobile guests live in |
| 7 | Flexibility and Efficiency | 3 | URL-as-state for dates/guests/filters/sort is genuinely strong; no saved-search for repeat guests |
| 8 | Aesthetic and Minimalist Design | 2 | Filter bar's own code comment admits 4 groups "don't fit a tablet/mobile width," solved by hiding rather than reducing |
| 9 | Error Recovery | 2 | Generic "try again in a moment" on search failure — no retry action, no contact link at the point of failure |
| 10 | Help and Documentation | 1 | No help affordance on search/results steps; WhatsApp/email contact only appears after a home + payment method is already chosen |
| **Total** | | **25/40** | **Acceptable — solid engineering foundation, held back by mobile recognition, minimalism, and recovery** |

## Design Specificity Verdict

**LLM assessment**: Generic. `$kalawala-opaque-beige` and `$kalawala-light-cream` — the two background tokens spanning every panel in this wizard — are both literally `#FFFFFF` (verified, `src/styles/_variables.scss:20-21`), so whatever warm Costa Rica palette those names imply never made it into the page: it's flat white/grayscale with dark green as the only accent. The homepage's trust case ("4.9/5 from thousands of stays," "no platform fees," a hero photo) doesn't survive the hop to `/book` — the page where a guest is actually about to hand over money gets a bare form on white with zero property imagery until results load.

**Deterministic scan**: `detect.mjs --json` on the `.tsx` source returned `[]`/exit 0 — but this reflects thin ruleset coverage for JSX source files (styles live in a separate `.scss`), not a verified-clean page. The live browser-injected detector found 3 findings (`bounce-easing`, `layout-transition`, `dark-glow`); Assessment B cross-checked all three against the live DOM/computed styles and all three are **false positives** — they're unused rules from FontAwesome's and Bootstrap's bundled CSS (never applied on this page), not real issues in `Booking.page.tsx` or its stylesheet.

## Overall Impression

The plumbing is better than the presentation. Dates/guests/filters/sort all round-trip through the URL — a genuinely well-executed pattern most booking wizards skip — and error differentiation at the API layer is specific and correct. But the page's visual and informational design undersells that engineering: the highest-stakes page in the whole site (where money moves) carries less brand reassurance than the homepage, the mobile step indicator drops to bare numbers exactly where mobile guests need orientation most, and the results step exposes four filter groups at once with the code's own comment admitting it doesn't fit mobile — solved by a collapse toggle rather than fewer, smarter defaults.

## What's Working

1. **URL-as-state-of-record** for dates, guests, filters, and sort removes an entire class of "guest has to remember what they picked" problems and makes every refined view shareable — rare and valuable in a booking flow.
2. **Differentiated error messages** at the API layer (`propertyNoLongerAvailable`, `bookingExpired`, `petNotAllowedError` all distinct) show real engineering care, even where the UI surfacing of the generic network error is flatter than the specific ones deserve.
3. **The confirmation screen** is the strongest single moment in the flow — calm, complete, one clear CTA — correctly landing as the emotional high point (peak-end rule working as intended).

## Priority Issues

**[P1] Step indicator loses all text labels below 992px** — `Booking.style.scss:2025-2027` (`.booking-wizard-step__label { display: none; }`), confirmed live: only bare numbered dots render at mobile/tablet widths. This is exactly the "Recognition Rather Than Recall" failure mode on the device class this flow's traffic skews toward — a guest who gets interrupted and returns has to re-derive "where am I" from a number alone.
- **Suggested command**: `/impeccable adapt` (or `/impeccable clarify` if you want to keep dots but add an `aria-label`/visually-hidden current-step name instead of full text labels)

**[P1] The filter bar exposes ~13 individually visible controls across 4 groups the moment results load/expand** (`Booking.page.tsx:916-969`) — cancellation policy (2 pills) + area (3 pills) + amenities (3 checkboxes) + sort (5 options), all live and affecting the same list at once. The code's own comment concedes this doesn't fit mobile width; the fix applied (collapse behind a toggle) hides the problem rather than reducing it (e.g., auto-suppressing filters with zero matching homes for the current dates).
- **Suggested command**: `/impeccable distill`

**[P2] `/book`'s above-the-fold carries none of the homepage's trust signals** (`Booking.page.tsx:780-785`) — no photo, no rating, no "no platform fees" line — at precisely the step where a guest commits to payment. Whether this was a deliberate "keep checkout distraction-free" call or just never made the trip is worth settling explicitly.
- **Suggested command**: `/impeccable clarify` (copy/trust-signal decision) or `/impeccable layout` if a visual element (photo strip, rating) is wanted beside the form

**[P2] Compact guest-count stepper buttons are 34×34px** (`Booking.style.scss:493-494`) versus 48px min-height everywhere else in the form (lines 270, 302, 360, 1452, 1730) — the smallest touch target in the flow sits on the control mobile guests actually operate post-search.
- **Suggested command**: `/impeccable adapt`

**[P3] Deposit upload warning reads as a threat with no adjacent safety net** — `depositUploadWarning`: "Upload only the receipt for this deposit. Any other picture will cancel your reservation automatically." High-stakes, blunt, and physically separated from the WhatsApp/email contact block that exists two sections later.
- **Suggested command**: `/impeccable clarify`

## Persona Red Flags

**Jordan (confused first-timer)**: Lands on a bare form with no visible reassurance this is a real boutique operator rather than a generic booking widget. If the search fails, gets "we cannot check availability right now, please try again in a moment" with no path to a human. On reaching results, is handed 13 filter affordances before understanding what any of them change relative to their specific dates.

**Casey (distracted mobile user)**: Loses step labels the instant the screen narrows past tablet width, so a context-switch away and back means re-deriving "where am I" from a bare numbered dot. The guest-count stepper they'll actually use post-search (the compact bar) has the smallest touch target in the whole flow. The deposit upload warning threatens automatic cancellation right as they're fumbling a phone-camera photo into a file picker.

## Minor Observations

- Two color tokens (`$kalawala-opaque-beige`, `$kalawala-light-cream`) are both defined as literal `#FFFFFF` — likely dead/unimplemented palette intent, worth a quick check on whether that was ever meant to differ.
- Note-level copy (colones disclaimer, excluded-homes footnote, placeholders) sits at `rgba(23,23,23,0.35–0.45)` on white in multiple places in `Booking.style.scss` — roughly 3:1 contrast, under WCAG AA's 4.5:1 for normal text.
- **Routing note, out of scope for this critique but worth flagging**: `src/routes.config.ts`'s `pathForKey()` only special-cases bare-root for `key === 'home'`; every other English route, including `book`, resolves only to `/en/book` (verified in `Router.tsx` — no `<Route path="/book">` is ever registered). This contradicts `CLAUDE.md`'s stated convention ("English keeps the bare root... except home"). All in-app links already point at `/en/book` so nothing is currently broken by it, but a bare `kalawala.com/book` (e.g. spoken aloud, or an old bookmark) 404s. Pre-existing, unrelated to the current branch's diff — not scored into the heuristics above.
- Nav's "Book now" pill has no distinct visual state when `aria-current="page"` is actually set on it.

## Questions to Consider

1. Was stripping all brand/trust signal from `/book` a deliberate "distraction-free checkout" decision, or did it just never make the trip from the homepage — and if deliberate, has it been tested against guests abandoning because the page feels generic?
2. The filter bar's own comment admits it doesn't fit mobile width — was reducing to fewer, smarter defaults (e.g., hide amenities with zero matches for the current dates) ever considered instead of solving it purely with a collapse toggle?
3. Is "any other picture will cancel your reservation automatically" describing real backend behavior, or intentionally scary copy to force compliance — and either way, has it been checked against how many guests it worries into abandoning the upload?
