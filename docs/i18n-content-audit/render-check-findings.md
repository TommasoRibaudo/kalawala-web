# Phase 6 — Rendered-Page Spot Check Findings

Phases 1-5 audited source data: does the right text exist, is it translated correctly, are the amenity labels in sync. None of that catches a layout break that only appears once real text — possibly much longer or shorter than English, possibly right-to-left — is actually rendered. This phase checks the render itself.

## What was run

**Automated overflow check** — `tests/e2e/i18n-render-check.spec.ts` (permanent addition to the Playwright suite, runs on `chromium` only). For all 9 released locales × 8 sampled pages (home, 4 listings chosen for varied content shape — Geco, Rana, Delfin, VillaCoral — and 3 blog articles heavily touched by the Phase 4 fix pass — `tenhoursinpuerto`, `bushours`, `indigenoustravelpv`), asserts `document.documentElement.scrollWidth` never exceeds `clientWidth` at 375px width. Hebrew additionally gets its own describe block asserting `<html dir="rtl">` is actually set, plus the same overflow check at 1280px desktop width.

**Result: 89/89 passed.** No horizontal overflow anywhere in the sampled matrix, at either viewport, in any locale. Hebrew's `dir="rtl"` is correctly applied on every sampled page.

This is intentionally a curated sample, not all 21 content pages × 9 locales (189 combinations) — see the spec file's header comment. It also only catches *page-level* overflow, not text truncation (an element clipping text with `overflow: hidden`/ellipsis by design produces no scrollbar and would pass this check silently) — that needs visual review, which is the second half of this phase.

**Visual review** — 12 full-page screenshots (`docs/i18n-content-audit/render-check/*.png`), captured with a one-off Playwright script (images stubbed with placeholder SVGs, calendar API mocked, clock pinned — same setup as the automated suite) and inspected directly:

- Hebrew (the plan's explicit highest-priority locale, RTL): home, Geco (listing — amenities grid, booking sidebar, reviews), `tenhoursinpuerto` (blog, long-form prose), `bushours` (blog — the one page with real HTML tables, the best stress test for RTL table mirroring), each at mobile (375px) and desktop (1280px).
- German: home, both viewports (longest compound words of the Latin-script locales).
- Hindi: home, both viewports (different script, and the locale Phase 4 flagged for Discover-section transliteration drift).

**Result: no layout breaks, no truncation, no mirroring bugs found.** Specifics:

- Hebrew renders right-aligned throughout with no visible clipping — headings, paragraphs, the amenities icon+label grid, the reviews carousel, and the footer link columns all read correctly RTL. The bus-schedule tables in `bushours` (the highest-risk element for RTL — table column order is a common breakage point) render with correct header/cell alignment at desktop width and reflow to a stacked layout at mobile width, matching the automated overflow result for that page.
- German's longer compound words (e.g. "Entdecken Sie weitere angesagte Unterkünfte in Playa Chiquita & Playa Cocles") wrap cleanly inside their cards at mobile width; nothing pushes a card wider than its grid column.
- Hindi's Devanagari renders cleanly at both viewports with no glyph clipping or line-height collision with surrounding Latin-script proper nouns (property names, "WiFi", etc.).

## One incidental finding (out of scope, not a bug)

The booking-search widget ("Check Availability" / calendar / guest picker) renders in **English on every non-Spanish locale**, including Hebrew — visible on both the homepage hero and every listing page's sidebar. Traced to `src/components/BookingSearchWidget/BookingSearchWidget.component.tsx:28-63`: this component keeps its own local `strings` map with only `en`/`es` keys, entirely separate from `src/i18n/messages/*.ts`, and resolves via `bookingLanguage()` (`src/i18n/paths.ts:56-58`), which deliberately maps every locale to `'en' | 'es'` — matching CLAUDE.md's documented booking-session `language` field (`'en' | 'es'` only). This is a **deliberate architectural boundary of the in-progress custom booking engine** (see `docs/own_booking_engine/plan.md`), not a gap in this content audit's scope (Phases 1-5 covered `listings.ts`/`blog.tsx`/`discover.tsx`/`messages/*.ts`/`amenityLabels.ts` — never this component). Flagged here only because it's genuinely visible in every screenshot and worth the booking-engine work knowing about; no action taken.

## What this phase does not tell you

Same caveat as Phase 4: this is LLM-assisted visual review of a curated sample, not a certified accessibility or cross-browser audit. The automated check ran on `chromium` only (deliberate — overflow is a CSS question, not a rendering-engine one, and 5x-ing 89 checks for no expected extra signal wasn't worth the runtime). Firefox/WebKit-specific RTL quirks, real assistive-technology testing, and the 13 content pages outside the sampled set are all out of scope here, same as they were implicitly out of scope for "spot-check," not "exhaustively verify."
