# i18n Content Integrity Audit — Plan

| | |
|---|---|
| **Purpose** | A recurring content-correctness audit, separate from [`docs/i18n-rollout-plan.md`](../i18n-rollout-plan.md). The rollout plan tracks *shipping* each locale (routing, SEO, infra, one-time launch work). This plan tracks whether the *content itself* — amenities, listing pages, blog articles, the Discover section, UI strings — is complete and correct across all 9 released locales, on an ongoing basis. |
| **Locales in scope** | `en` (source of truth), `es`, `de`, `fr`, `it`, `pt`, `he`, `hi`, `nl` — the full `RELEASED_LOCALES` set (`src/i18n/locales.ts`). |
| **Status** | Phases 1–4 done (2026-08-11). Phase 2: full coverage, no gaps. Phase 3: "missing" is structurally impossible (enforced by TypeScript); 14 identical-to-English keys flagged for review. Phase 4: 8 independent LLM reviews (one per locale) found 2 source-verified real bugs (a Spanish `seoDescription` in the wrong language on the wrong property; Dutch's Casa Rana missing 2 of 9 paragraphs every other locale has) plus a striking cross-locale pattern — 4 locales independently flagged the Discover/homepage section as translated in a different pass than listings/blog. None of it is native-speaker-certified. Phases 5–6 not started. |
| **Owner** | Project owner + Claude Code, one phase at a time — each phase's output should be reviewed before starting the next, since later phases build on earlier ones' artifacts. |

## Why this needs its own plan

Three properties of this codebase make "is the translation complete and correct?" harder than a single find-and-replace check:

1. **Two different fallback granularities.** UI message catalogs (`src/i18n/messages/*.ts`) fall back to English *per key* — a locale file can define 80% of a group and silently inherit the rest (`getMessages()`, `src/i18n/messages/index.ts:28`). Long-form content (`listings.ts`, `blog.tsx`, `discover.tsx`) falls back *per whole entry* — a property or article either has a dedicated locale block or renders 100% in English for that locale, nothing in between. An audit script that treats these the same way will misreport one of them.
2. **English and other locales are deliberately not parallel.** `listings.ts`'s own header comment: *"Casa Delfin has eight Spanish paragraphs against six English ones... These are independently written descriptions, not translations of one source."* Paragraph-count diffing or 1:1 sentence alignment is the wrong completeness signal here — it would flag intentional, already-reviewed differences as bugs.
3. **Silent fallback is invisible in normal use.** A page in a locale with no dedicated content renders cleanly in English — no error, no visual break, nothing a manual click-through would necessarily catch on an unfamiliar page. This is exactly the failure mode `src/i18n/content/__tests__/localeCompleteness.test.ts` (added 2026-08-11, see the i18n rollout plan's Phase 11 P1 entry) was built to catch at the property/article level — this audit extends the same idea to a human-reviewable artifact instead of a pass/fail test, and to the message catalogs and amenity labels too.

## Phases

### Phase 1 — English source of truth (done)

Extract every unit of English content into one flat, stable-keyed table, so every later phase has one unambiguous thing to compare against.

- **Script:** `scripts/i18n-extract-en-content.mjs`. Uses the TypeScript compiler API (not regex) to walk the actual AST, so it survives JSX (`blog.tsx`/`discover.tsx` embed `<b>`/`<i>`/`<br/>` and interpolated expressions like `{PORTFOLIO_PROPERTY_COUNT}`) without hand-transcription errors. JSX text is flattened to plain text; interpolated expressions become a `⟦source_text⟧` placeholder (visible in the table so a reviewer knows a value is substituted there, without needing to evaluate it); `<br/>` becomes a literal newline.
- **Output:** `docs/i18n-content-audit/en-source-of-truth.csv` — one row per `(section, item, field) → en_text`. 550 rows: 122 amenities, 131 listing-page fields, 283 blog fields, 14 discover-section fields.
- **Sources covered:**
  - **Amenities** — `src/utils/constants.ts`. Walks all five arrays `houseDataByLangCode()` actually searches (`LISTING_PAGE_DATA = [...houseDataList, ...NamDataList, ...NamDataListES, ...VillasDataList, ...VillasDataListES]`), English (`houseLangCode` not `*ES`-suffixed) entries only. **Walking `houseDataList` alone silently drops half the portfolio** — Areka/Giulia/Plumeria live in `NamDataList`, VillaMar/VillaCoral in `VillasDataList` — caught during this phase by a row-count sanity check (5 properties found on the first run instead of 10); fixed before the table was finalized. Worth remembering for any future script touching this data: **`houseDataList` is not the whole portfolio.**
  - **Listing pages** — `src/i18n/content/listings.ts`, the `en` entry for all 10 properties: `seoTitle`, `seoDescription`, `heading`, `featureName`, `checkIn`, `checkOut`, each paragraph.
  - **Blog articles** — `src/i18n/content/blog.tsx`, the `en` entry for all 10 articles. Each article has its own shape (no shared interface — the file's own comment notes EN/ES pairs were found 32–80% identical, i.e. genuinely different content per article, not one template), so extraction walks every field generically rather than assuming a fixed set of keys.
  - **Discover section** — `src/i18n/content/discover.tsx`'s top-level `en` const: heading, 5 paragraphs, 4 features.
- **Verification done this phase:** spot-checked amenities/listing/blog/discover rows against the actual source and against a live-rendered page dump (Delfin, from the hydration-fix session) — byte-identical. Scanned all 550 rows for unflattened raw-AST-text leaks (would show up as `=>`, `React.`, a stray `<Tag`) — zero found.
- **Not in scope for Phase 1:** Spanish. `es` has its own dedicated content nearly everywhere (unlike de/fr/it/pt/he/hi/nl, which lean on the English fallback for some properties/articles) and is old enough to be treated as a second reference locale rather than a translation target — worth a similar extraction, but as a deliberate Phase 2b rather than folded into "the English source of truth."
- **Known finding, filed for Phase 5 (not fixed here — Phase 1 is extraction, not cleanup):** cross-referencing the 16 distinct amenity name strings actually used against `src/i18n/amenityLabels.ts`'s 19 translation-lookup keys found **zero missing translations** (every used amenity name has a full DE/FR/IT/PT/HE/HI/NL entry — a clean result) but **3 orphaned entries** with no matching property anymore: `'Private Pool, Exclusive for guests of this villa'`, `'Private Outside Parking'`, `'2 Private Equipped Bathroom'` (singular — superseded by the now-used `'2 Private Equipped Bathrooms'`). Dead weight, not a bug; safe to remove whenever someone's touching that file next.

### Phase 2 — Per-locale coverage matrix (done, 2026-08-11)

Extend `scripts/i18n-extract-en-content.mjs` to accept a `--locale=xx` flag (or write a thin wrapper around its existing AST-walking functions) and run it for `es`, `de`, `fr`, `it`, `pt`, `he`, `hi`, `nl`. For content sources that fall back *per whole entry* (listings, blog, discover — see "why this needs its own plan" above), the useful signal per `(section, item)` is binary and coarse: **does a dedicated block exist for this locale, or does it fall back to English wholesale?** Don't try to diff paragraph-by-paragraph against Phase 1's English rows for these sources — per point 2 above, a shorter or longer locale entry is not itself a problem.

- **Output:** `docs/i18n-content-audit/locale-coverage-matrix.csv` — one row per `(section, item)`, one column per locale, value = `dedicated` / `fallback-to-en`.
- **Cross-check against the existing test:** `src/i18n/content/__tests__/localeCompleteness.test.ts` already asserts this reference-equality fact for every accessor, 320 assertions. This phase's matrix should agree with it exactly — if it doesn't, one of the two is wrong and that's a bug in the audit tooling, not the content, to resolve before trusting either.
- **What this phase does NOT tell you:** whether locales marked `dedicated` are any good. That's Phase 4.

**Result: full coverage, no gaps, for every source this phase checked.** 47 rows — 10 listing properties, 10 blog articles, 1 discover section, 26 amenity rows (10 properties + 16 amenity names) — and every non-English-locale cell is `dedicated` or `covered`, none `fallback-to-en` or `missing-translation`. Verified two independent ways before trusting a result this clean:

1. **`localeCompleteness.test.ts` run fresh: 320/320 passing.** Its reference-equality check (`accessor(locale) !== accessor('en')`) is a different mechanism from this phase's AST key-presence check, and it agrees exactly for the three sources it covers (listings/blog/discover) — strong evidence the 100% figure is real, not a bug hiding behind an over-permissive check in one tool or the other.
2. **Amenities aren't covered by that test at all** (it only asserts `PROPERTY_MARKETING_CONFIG`/`RECOMMENDATION_REASONS` for constants.ts, not `AMENITY_LABELS`), so those rows got their own manual spot-checks instead: grepped `constants.ts` directly for `houseLangCode: "*ES"` and got exactly the 10 expected matches (one per property, matching all 10 `amenities,property` rows reading `dedicated`); read `amenityLabels.ts`'s `'Unfenced Parking'` entry directly and confirmed all 7 locale sub-keys are populated, matching the script's `covered` finding.

**Implementation, extending rather than duplicating Phase 1's script (`--coverage-matrix` flag, same file):**
- **`hasLocaleKey(objectLiteral, locale)`** — the one check that does the real work for listings/blog: does this `Partial<Record<Locale,T>>` object literal have a direct property assignment keyed exactly `locale`? Doesn't inspect the value at all, matching the phase's explicit "coarse, not paragraph-diffed" mandate.
- **listings.ts / blog.tsx** — same shape (`CONTENT[ListingKey]` and each of the 10 blog article consts are themselves `Partial<Record<Locale,T>>`), so one function shape covers both.
- **discover.tsx needed a different check, not just a different file path.** It isn't `Partial<Record<Locale,T>>` at the point being checked — it's nine separate top-level `const xx: DiscoverContent = {...}` declarations, only combined into a `Partial<Record<...>>` at the very end (`const CONTENT = { en, es, de, ... }`). A key-presence check would be vacuous there (all 9 keys are always present in that final object by construction). What actually matters is whether each locale's own const is a genuine object literal rather than an alias to another locale's (e.g. a hypothetical `const it = en;` placeholder) — reference-inequality's real analogue at the AST level. Checked that directly (`ts.isObjectLiteralExpression` on each locale's own top-level const) rather than reusing `hasLocaleKey` on the combined object, which would have silently passed even a fully-aliased file.
- **Amenities split into two row-types**, per the task's framing: `amenities,property,*` rows check whether each property's `{code}ES` entry exists in the same five source arrays Phase 1 had to learn to walk (`LISTING_PAGE_DATA`) — only meaningful for the `es` column (`n/a` elsewhere), and a miss here is flagged as more severe than a normal fallback (`'MISSING (page would error, not fall back)'`) since `houseDataByLangCode` returns `undefined` rather than substituting English — the page would break, not just render untranslated. `amenities,amenity_name,*` rows check `AMENITY_LABELS`'s per-locale sub-keys for each of the 16 distinct amenity-name strings the portfolio actually uses (`n/a` for `es`, which doesn't read this table at all).

**Caveat carried forward, not resolved by this phase:** "dedicated" only means a locale-specific block exists, not that it reads well, is factually accurate, or hasn't drifted from what it's supposed to say. A property could have a fully "dedicated" DE block that's a mediocre or dated translation and this phase would call it clean. That's Phase 4's job, deliberately deferred — see its "honesty" note about what LLM-assisted review can and can't certify.

### Phase 3 — Message catalog completeness (done, 2026-08-11)

Different mechanism from Phase 2 (per-key fallback, not per-entry — see "why this needs its own plan" point 1), so it needs its own approach: for each locale file in `src/i18n/messages/`, diff its key set (per group) against `en.ts`'s. Three outcomes per key, not two:
- **Present, differs from English** — translated (the expected, healthy case).
- **Present, identical to English** — could be a deliberate loanword (this project has real, documented instances — e.g. `it.ts`'s `optionPetFriendly` was found byte-identical to English on purpose in one case, translated in another, see the i18n rollout plan's Phase 11 P1 entry) or an untranslated placeholder. Needs a human/reviewer pass to tell which; flag for review rather than auto-failing.
- **Missing entirely** — silently falls back to English (`getMessages()`'s per-group spread). Not necessarily wrong (unreleased-content fallback is intentional design), but worth knowing the actual count and location per locale.
- **Output:** `docs/i18n-content-audit/message-catalog-coverage.csv`.

**"Missing entirely" turned out to be structurally impossible, not just empirically absent — a stronger guarantee than the phase's own framing assumed going in.** Every non-English locale file declares `export const xx: Messages = {...}` (the *full* shape, `typeof en`), not `Partial<Messages>` — unlike the `Partial<Record<Locale,T>>` content sources Phase 2 dealt with, TypeScript itself refuses to compile a locale file missing a key `en.ts` has. `npx tsc --noEmit` was already clean going into this phase, which is the same guarantee restated. The script empirically confirms it anyway (`missingCount` across all 110 keys × 8 locales: `0`) rather than trusting the type annotation alone — plus a reverse check for the opposite drift (a locale key with no English counterpart, which found none either).

Given that, the only real signal this phase can produce is the **identical-to-English** bucket, and it's genuinely a *flag for review* list, not a verdict — 14 of 110 keys are identical to English in at least one locale:

| Key | English | Identical in |
|---|---|---|
| `nav.blog` | "Blog" | es, de, fr, it, pt, nl |
| `cookieBanner.title` | "🍪 Cookies" | es, de, fr, it, pt, nl |
| `cookieBanner.marketing` | "Marketing" | es, de, fr, it, pt, nl |
| `property.checkInLabel` | "Check-in:" | de, it, pt, nl |
| `property.checkOutLabel` | "Check-out:" | de, it, pt, nl |
| `sections.villasHighlight` | "Villas" | es, fr |
| `nav.home` | "Home" | it, nl |
| `footer.contact` | "Contact" | fr, nl |
| `cookieBanner.required` | "(Req.)" | es, fr |
| `home.optionPetFriendly` | "Pet-friendly" | es |
| `sections.ourPhotosHeading` | "Photos" | fr |
| `contact.emailLabel` | "Email:" | it |
| `cookieBanner.customize` | "Options" | fr |
| `imagesModal.photos` | "photos" | fr |

Most of these read as genuine loanwords rather than gaps on inspection — "Blog"/"Marketing"/"Cookies"/"Options"/"Email" are near-universal borrowings in this context across the Romance and Germanic languages here, and "Villas"/"Photos"/"Contact" are literally the same spelling in Spanish/French (Spanish borrowed "villa" *from* Spanish/Italian originally, not the other way around). `home.optionPetFriendly`'s Spanish match is the exact, already-documented case from the i18n rollout plan (Phase 11 P1): deliberately kept in English there, while the same key was deliberately *translated* for Italian around the same time — this phase's finding (identical for `es` only, not `it`) matches that history precisely, which is itself a good sanity check that the script reads current source, not stale assumptions. `cookieBanner.required` ("(Req.)") is the one entry that doesn't resolve as obviously on inspection — Spanish "Requerido" and French "Requis" both plausibly abbreviate to "(Req.)" too, so it could be a real coincidental match rather than a leftover, but that's a native-speaker call, not one to make here. **None of these are being fixed or judged in this phase** — that's explicitly Phase 4's job; this phase's contribution is having a precise, current list instead of relying on memory or a hunch about which keys might be loanwords.

**Implementation notes, extending the same script (`--message-coverage` flag):** added `ts.isArrowFunction` handling to `flattenNode` (unused by Phases 1–2, needed here — several message values interpolate, e.g. `readBlog: (title) => \`Read blog: ${title}\``; flattens the returned expression the same as any template literal, ignoring the parameter name since it isn't meaningful to compare). Added `collectMessageValues`, a `group.key`-path walker structurally similar to Phase 1's `walkContentObject` but simpler (no `section`/`item` dimension — one flat object per locale) and returning a lookup map rather than emitting rows directly, so English and each locale's maps can be diffed key-by-key. One array-valued key exists (`whyStayWithUs.benefits`) and is walked the same `[i]`-suffix way Phase 1 handled paragraph arrays.

### Phase 4 — Content quality review (done, 2026-08-11)

Everything above is structural (does content exist, is it the right shape). This phase asks whether locale content marked "dedicated" in Phase 2/3 is actually well-translated: correct facts (times, prices, place names — these should match English/Spanish exactly, not be translated), natural phrasing, consistent tone/register, no leftover machine-translation artifacts.

**Be honest about what this phase can certify.** This project's own history is explicit that LLM-assisted translation review is a judgment call, not native-speaker verification — e.g. the it.ts pet-friendly translation decision in the i18n rollout plan states plainly: *"no native Italian speaker was available this session... a judgment call, not an actual native-speaker verification."* This phase should produce a **flagged-for-review list**, not a **certified-correct** stamp, for any locale where no native or fluent reviewer is available. Hebrew (RTL) and Hindi in particular deserve extra scrutiny given the added script-direction/font-rendering surface area — cross-reference [[font_subsetting_invariant]] memory before assuming a Hebrew/Hindi content change is purely textual.

- **Output:** `docs/i18n-content-audit/quality-review-findings.md`, one section per locale, findings tagged by confidence (LLM-flagged vs. native-speaker-confirmed).

**Approach:** couldn't reuse Phases 1–3's script-based extraction as-is, since "is this well-translated" isn't AST-checkable the way "does this key exist" is — needed the actual bilingual text in front of a reader. Extended `scripts/i18n-extract-en-content.mjs` once more (`--quality-packets` flag) to generate `docs/i18n-content-audit/quality-review/{locale}-vs-en.md` per locale: every listing/blog/discover item's English and that locale's text, each flattened into one readable blob (not a field-by-field table — Phase 2's own finding still applies: paragraph counts legitimately differ per locale, so positional pairing would misreport real content as a gap). Then ran 8 independent review agents in parallel, one per locale, each reading only its own packet with no visibility into the other 7 — deliberately, so any pattern that showed up in multiple locales independently would be real convergent evidence rather than one agent's house style.

**Result: 2 source-verified real bugs, plus a striking independently-convergent pattern across 4 unrelated locales.**

- **Spanish `seoDescription` bug (verified in source, `src/i18n/content/listings.ts:1391-1393` and `:1564-1566`)**: VillaCoral's and VillaMar's Spanish `seoDescription` is byte-identical to Casa Geco's *English* `seoDescription` — wrong language, wrong property (describes a 5-guest in-town house, not the private-pool villa it's attached to), and SEO-visible (feeds `<meta name="description">`). Almost certainly a copy-paste artifact from one villa being cloned off the other.
- **Dutch structural gap (verified with a script counting every `paragraphs` array in `listings.ts` across every locale/property)**: `Rana.nl.paragraphs` has 7 entries where `en`/`es`/`fr`/`de`/`he`/`it`/`pt`/`hi` all have 9 — confirmed the *only* such discrepancy anywhere in the entire corpus. The English source has an accidental near-duplicate paragraph pair; every locale except Dutch translated both.
- **The Discover/homepage section reads like a separate translation pass from listings/blog, independently flagged in 4 locales**: French (apostrophe style shifts starting exactly at Discover's third paragraph), Hebrew (place names spelled differently there than the other 132 occurrences elsewhere, plus a different punctuation character), Hindi (different Devanagari transliterations for the same place names), Italian (tu/voi register mixing specific to that section). No agent could see another's findings, so 4 independent readings landing on the same section is real signal, not coincidence.
- Also found: a Spanish amenity-label plural-agreement bug (`"2 Baños Privado Equipado"`) that mirrors the *exact same class* of bug Phase 1 already found and fixed on the English side, just never ported to the Spanish entry; a Hebrew gender-agreement error on "dense jungle/forest" appearing independently in two unrelated articles; an Italian mistranslation ("Caribe Sud," which is Spanish, not Italian) used in 4 articles despite the correct term ("Caraibi"/"caraibico") being used correctly elsewhere in the same files; a Hindi possessive-gender slip repeated across 9 of 10 listing pages via shared boilerplate.
- Full per-locale detail, the cross-locale pattern writeup, and a severity-ranked summary table are in `docs/i18n-content-audit/quality-review-findings.md`. None of this is native-speaker-confirmed — every finding is explicitly tagged LLM-flagged in the source document, per this phase's own honesty requirement. The two structural findings above (Spanish seoDescription, Dutch paragraph count) are the exceptions: those are checkable facts about the codebase, not translation judgment calls.

### Phase 5 — Amenity label hygiene (not started, small)

Close out the Phase 1 finding: remove the 3 orphaned `AMENITY_LABELS` entries, and turn the ad hoc cross-reference script used to find them (see Phase 1's "known finding") into a small permanent Jest test (`src/i18n/__tests__/amenityLabels.test.ts` or similar) — every amenity name string used anywhere in `LISTING_PAGE_DATA` must have a full 7-locale entry in `AMENITY_LABELS`, and vice versa — so this can't silently drift again the next time a property's amenity list changes.

### Phase 6 — Rendered-page spot check (not started)

Everything above audits source data, not what a visitor actually sees. Once Phases 1–5 are clean, spot-check actual rendered pages per locale (particularly `he` for RTL layout and any locale with notably longer/shorter text than English) for overflow, truncation, and layout breaks that only show up at render time. This is the same kind of check [[verifying_ui_changes]] memory already recommends (Playwright, mobile viewports) — reuse that approach rather than inventing a new one.

## Explicitly out of scope

- **SEO metadata length/format validation** (title tag character limits, meta description length per locale) — a real, separate concern, but already the rollout plan's territory (Phase 6, `docs/i18n-rollout-plan.md`), not this audit's.
- **hreflang / canonical URL correctness** — same, already covered by the rollout plan's Phase 6/GSC work.
- **Professional/certified translation sign-off** — this audit can surface structural gaps and flag likely quality issues; it cannot substitute for a native/professional reviewer where the project wants that level of certainty (see Phase 4's honesty note).

## How to resume this plan in a future session

Read this file, check which phase's output file(s) under `docs/i18n-content-audit/` already exist, and continue from the first phase without a completed output. Phase 1's script (`scripts/i18n-extract-en-content.mjs`) is written to be extended rather than replaced — Phase 2 should add a locale parameter to its existing walk functions, not duplicate them.
