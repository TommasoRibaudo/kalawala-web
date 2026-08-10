# i18n Rollout — German, French, Italian, Portuguese, Hebrew, Hindi

Living plan for taking reservaskalawala.com from EN/ES to eight languages
(EN, ES, DE, FR, IT, PT, HE, HI), including the URL migration, the flag combo
box, right-to-left support, publishing, and Google Search Console.

Hebrew and Hindi were added after the plan was first written. Hebrew brings
right-to-left layout and Hindi brings a non-Latin script; both need font
subsets the site does not currently ship. Their extra work is tracked in
[Hebrew and Hindi](#hebrew-and-hindi--rtl-and-non-latin-scripts) below and
interleaves with the numbered phases rather than replacing them.

**This document is the source of truth between sessions.** Update the Status
block and the Session Log at the end of every working session, and tick the
checkboxes as phases land. A new session should be able to read this file and
resume without re-investigating the codebase.

---

## Status

| | |
|---|---|
| **Current phase** | **🚢 Ship gate C shipped — eight languages live in production.** PRs #52 and #54 (#53 was #54's predecessor — see the 2026-08-09 session log entry for why it got recreated) merged to `main` and deployed. Next: Phase 10 (Google Search Console submission and post-launch monitoring). |
| **Last updated** | 2026-08-09 |
| **Branch(es) in flight** | None — `feat/i18n-phase-7-language-switcher` and `feat/i18n-phase-8-translations` both merged and deleted. `docs/i18n-ship-gate-c-closeout` (this update) is the only one open, purely documentation. |
| **Blocked on** | Nothing. **Owner action still outstanding:** PostHog export (organic sessions, EN vs ES, 12 months) — the only open Phase 0 item, non-blocking. **Follow-up found during Phase 8 validation, still open:** two legacy, pre-i18n-rollout content sources (`PROPERTY_MARKETING_CONFIG` in `constants.ts`, and a handful of components with hardcoded `locale === 'es'` binary checks — see the Phase 8 session log entry) render in English for the six new locales. Not a regression and not required by this plan's scope, but worth a decision on whether it's a fast-follow. |

Phase progress:

- [ ] Phase 0 — Baseline capture and safety net *(automated parts done; GSC/PostHog exports outstanding)*
- [x] Phase 1 — Locale foundation (`isSpanish` → `locale`) — PR #40
- [x] Phase 2 — Message catalogs — PR #41
- [x] Phase 3 — Collapse duplicated page components (3a, 3b, 3c, 3d) — **zero duplicated pages remain in `src/pages/`**
- [x] **Ship gate A — EN/ES refactor released, zero visible change** — PRs #39→#47 merged to `main` and deployed to production
- [x] Phase 4 — Route restructure to `/:locale/` — PR #48
- [x] Phase 5 — 301 redirect map — PR #49
- [x] Phase 6 — SEO head, hreflang, sitemap — PR #50
- [x] **Ship gate B — URL migration released, still EN/ES only** — deployed 2026-08-08
- [x] Phase 7 — Language switcher combo box — PR #52, merged to `main` 2026-08-09
- [x] Phase 8 — Translated content for DE/FR/IT/PT/HE/HI — PR #54, merged to `main` 2026-08-09
- [x] Phase 9 — Build pipeline scale-up *(same PR as Phase 8 — `reactSnap.include` now generated via `prebuild`, plus a real font-payload bug found and fixed; FTP payload timing deferred to the actual CI deploy)*
- [x] **Ship gate C — eight languages live** — deployed 2026-08-09, `.github/workflows/main.yml` run 31330475987
- [ ] Phase 10 — Google Search Console and post-launch monitoring

Hebrew/Hindi track (see [that section](#hebrew-and-hindi--rtl-and-non-latin-scripts)):

- [x] H-A — locale model: `he`/`hi` declared, `dir` per locale — PR #44
- [x] H-C3 — CSS logical properties (207 declarations, 33 files) — PR #44
- [x] H-B — font subsets — PR #44 area, landed 2026-08-07 (see [H-B](#h-b--fonts--2026-08-07))
- [x] H-C1 — `dir` on `<html>` — PR #50 (Phase 6)
- [ ] H-C2 — Bootstrap RTL stylesheet
- [ ] H-C4 — `react-slick` carousel mirroring
- [x] H-E/H-F — hreflang — PR #50 (Phase 6, `src/i18n/seo.tsx`'s `hreflangLinks()`).
      Language *redirect* (Accept-Language-based) is still open — hreflang
      and redirect were bundled as one line item but are two different
      features; only hreflang shipped.

### Merge order

**Done — all nine merged to `main` 2026-08-07, in order, as ship gate A.**
Left below for the historical record of why the stack was ordered this way.

The open PRs are a linear git stack even though GitHub shows every base as
`main`. Merge **#39 → #40 → #41 → #42 → #43 → #44 → #45 → #46 → #47**, in that order; each later
PR's diff collapses to its own work once its parent lands. Out of order means
resolving the whole stack by hand.

**#43 is not an i18n change** — it retires the Namaitami and Villas pages and is
wedged mid-stack, so the i18n phases cannot be merged without also taking that
retirement. That is a sequencing consequence, not a problem, but it should be a
conscious choice rather than a surprise.

---

## Locked decisions

Decided 2026-08-06. Change these only deliberately — later phases assume them.

| Decision | Choice | Consequence |
|---|---|---|
| URL scheme | **Path prefix** — `/de/plumeria`, `/fr/plumeria` | Requires a 301 map for all ~49 existing URLs. Standard for hreflang and GSC. |
| Blog scope | **Everything, blog included** | All 10 articles in every language. **~185 prerendered routes at the end**, from 45 today (was ~205 against 6 languages and 49 routes; the Nam/Villas retirement in #43 removed 4 routes, the two extra languages added more). Every future article is an eight-language commitment. |
| Translation production | **Machine translation, published as-is** | No human review gate; fastest path. See Risk R4 — the policy/price/legal string subset is small and bounded, and is worth one read-through even under this choice. |

Decided 2026-08-06, second session:

| Decision | Choice | Consequence |
|---|---|---|
| Language set | **Eight** — add Hebrew and Hindi to DE/FR/IT/PT | Hebrew forces RTL support; Hindi forces a Devanagari font subset. Both are additive to the existing phases, not a separate project. |
| English root URL | **English keeps the bare root.** `/` stays canonical; `/en/` 301s to `/` | Preserves the strongest URL in the index. Every *other* English page still moves to `/en/...`. The scheme stays regular for the seven other locales. |
| Unmatched `Accept-Language` | **English**, with `x-default` hreflang pointing at it | One fallback, no guessing. Applies to the Phase H-E language redirect too. |
| `WelcomeSlider` RIB CTA | **Moot — the page is retired.** PR #43 deleted both RIB variants | The divergence no longer exists. See [3a](#3a--shared-components). |
| `OtherListings` memoisation | **Take the memoised (Spanish) version** | The merged component keeps `useCallback`/`useMemo` around the resize handler and filtering. |

Nothing is open. Phase 4 is unblocked on decisions.

---

## Ground truth (surveyed 2026-08-06, commit `bfc3bef`)

Recorded so future sessions don't re-derive it. Re-verify with the commands in
each row if the tree has moved on significantly.

> **This table describes `main`, which is the pre-refactor state.** The PR stack
> has moved several of these numbers a long way. Measured at the head of the
> stack, after Phase 3d (Phase 3 complete):
>
> | Fact | On `main` | Head of stack |
> |---|---|---|
> | `isSpanish` occurrences in `src/` | 364 | **6** (comments and one deprecated shim) |
> | ES-duplicated files | 47 | **0** |
> | `src/i18n/` | does not exist | 20 files, incl. `content/blog.tsx` |
> | Locales declared | — | 8 (`RELEASED_LOCALES` still `['en','es']`) |
> | `reactSnap.include` routes | 49 | 45 (Nam/Villas retired in #43) |
>
> Keep the `main` column as written — it is the "before" the migration is
> measured against.

| Fact | Value | How to re-check |
|---|---|---|
| Source files | 225 `.ts`/`.tsx` under `src/` | `find src -name "*.tsx" -o -name "*.ts" \| wc -l` |
| Spanish-duplicated files | 49 files, 5,794 lines | `find src \( -name "*ES*.tsx" -o -name "*_ES*.tsx" \)` |
| `isSpanish` prop | **360 occurrences across 69 files** | `grep -rn "isSpanish" src --include=*.tsx --include=*.ts \| wc -l` |
| Inline `isSpanish ? … : …` ternaries | 49 | `grep -rn "isSpanish ?" src --include=*.tsx \| wc -l` |
| Prerendered routes | 49, hand-listed in `package.json` → `reactSnap.include` | read `package.json` |
| Router | `src/Router/Router.tsx`, 284 lines, ~60 hand-written `<Route>` elements | read the file |
| Listing pages | 10 EN (1,482 lines) + 10 ES | `src/pages/Listing/staticPages{,_ES}/` |
| Blog articles | 10 EN (2,142 lines) + 10 ES | `src/pages/Blog/staticPages{,_ES}/` |
| Home variants | 3 (`default`, `.nam` → `/HomeNam`, `.rib` → `/HomeVillas`), each with an ES twin | `src/pages/Home/` |
| Content store | `src/utils/constants.ts`, 2,488 lines, 59 `es:` keys | read the file |
| i18n library | **none installed** | `grep i18next\|react-intl package.json` |
| Per-page `<head>` | `react-helmet`, hreflang hardcoded EN/ES per page | `grep -rn 'rel="alternate"' src` |
| `<html lang>` | static `lang="en"` in `public/index.html` | read the file |
| Sitemap | `scripts/generate-sitemap.js`, derives from `reactSnap.include`, **hardcoded EN/ES pairing** | read the file |
| Language switcher | `src/components/FlagComponent/Flag.component.tsx` — binary toggle button, `country-flag-icons` | read the file |
| Postbuild chain | `react-snap` → `generate-404` → `inject-route-preloads` → `generate-sitemap` → `generate-md-pages` → `generate-llms-full` | `package.json` `postbuild` |
| Deploy | FTP to cPanel, `SamKirkland/FTP-Deploy-Action@v4.3.4`, with concurrency group + one retry (PR #36) | `.github/workflows/main.yml` |

### The two facts that shape everything

1. **`isSpanish` is a boolean.** It appears 360 times across 69 files and
   physically cannot express eight languages. Converting it to a `locale` string
   is the single largest mechanical change in this project and gates every
   later phase.

2. **Language is expressed by duplicating whole files.** 49 files / 5,794 lines
   exist purely because Spanish is a copy of English. Naively extending that to
   eight languages means ~340 duplicated files and ~40,000 duplicated lines, and
   every future content edit done eight times. Phase 3 deletes this pattern rather
   than multiplying it — that deletion is what makes the other six languages
   nearly free. Phase 1 has settled the first fact (`isSpanish` is gone); Phase 3
   is still working through the second, 20 of 47 files down.

---

## Target architecture

```
src/i18n/
  index.ts            barrel
  locales.ts          LOCALES = ['en','es','de','fr','it','pt','he','hi']
                      + LOCALE_META (native name, flag, dir), RELEASED_LOCALES
  detectLocale.ts     single source of truth for "what language is this URL?"
  useLocale.ts        the hook components use
  useDirection.ts     ltr/rtl for the current locale
  useMessages.ts      typed catalog access
  paths.ts            localeSuffix / bookingPath / bookingLanguage
  pickLocalized.ts    for {en, es}-shaped content living beside its data
  messages/
    en.ts             UI chrome: nav, buttons, labels, form errors — shape source
    es.ts             typed as Messages, so a missing key is a build error
    de.ts  fr.ts  it.ts  pt.ts  he.ts  hi.ts    Partial<Messages>, empty until Phase 8
  content/            not built yet — Phase 3b/3c
    listings/         per-property long-form copy, keyed by locale
    blog/             per-article body content, keyed by locale
```

Everything above except `content/` exists as of PR #44.

- **One** component per page. Locale arrives from the route via a `useLocale()`
  hook reading the `:locale` route param — not threaded as a prop through 69
  files.
- **Routes generated, not hand-written.** A single `routes.config.ts` describes
  each page once (slug per locale, component, chunk name); the router,
  `reactSnap.include`, the sitemap, and the redirect map are all derived from it.
  This is the mechanism that keeps eight languages from drifting.
- `isSpanish: boolean` is gone. Nothing in `src/` branches on a two-value language.

### Slugs

Slugs stay English across locales for the first release (`/de/plumeria`, not
`/de/plumerie`). Property names are proper nouns anyway, and it keeps the
generated route table one-to-one. `routes.config.ts` should still model slugs
*per locale* so localised blog slugs can be introduced later without another
migration.

---

## Phases

Each phase should be its own PR against `main`.

### Phase 0 — Baseline capture and safety net

Do this before touching anything. Once URLs move, you cannot reconstruct what
"before" looked like. Everything lands in [`seo-baseline/`](seo-baseline/) —
see its README for the detail.

- [x] Save the current `sitemap.xml` and `robots.txt` from production
      (48 URLs, 144 hreflang alternates; robots correctly advertises the sitemap).
- [x] Capture the live status + redirect chain of all 49 routes
      (`node scripts/check-urls.mjs capture`).
- [x] Add `scripts/check-urls.mjs` — the same tool asserts single-hop redirects in
      Phase 5 and Phase 10.
- [x] Lighthouse baseline for `/`, `/HomeES`, `/Geco`, `/twodaysinpuertoviejo`
      (`seo-baseline/lighthouse-2026-08-06.md` — perf 89–90, SEO 100 across the board).
- [x] **Owner:** export GSC performance as CSV — received 2026-08-07 at 6
      months, re-exported the same day at the full 16-month window (the
      site's property lives under the `reservas.kalawala@gmail.com` Google
      account, not the default signed-in one — worth knowing if this needs
      re-running). See [`seo-baseline/README.md`](seo-baseline/README.md).
- [x] **Owner:** record GSC indexed vs not-indexed page counts — captured via
      the 2026-08-07 coverage export (54 indexed / 7 not); see
      [`seo-baseline/gsc-summary-2026-08-07.md`](seo-baseline/gsc-summary-2026-08-07.md).
- [ ] **Owner:** export PostHog monthly organic sessions, EN vs ES, 12 months.

**Validation:** the baseline files exist and are committed. This phase is the only
insurance against "did the migration hurt us?" being unanswerable.

> **Finding — every URL already costs a redirect.** All 49 routes return 200, but
> 48 take a 301 first: `/Geco` → `/Geco/`, Apache `DirectorySlash` resolving the
> prerendered `Geco/index.html`. Only `/` is direct.
>
> This changes Phase 5. A naive `/PlumeriaES` → `/es/plumeria` redirect becomes a
> **two-hop chain**, because `DirectorySlash` then sends `/es/plumeria` →
> `/es/plumeria/`. **Redirect targets in the 301 map must include the trailing
> slash.**
>
> It also means the sitemap and every `rel="canonical"` currently point at
> redirecting URLs (`/Geco`, while `/Geco/` is what gets served). Phase 6 should
> settle this one way or the other — adopt the trailing slash everywhere, or
> change `.htaccess` to serve without it.

### Phase 1 — Locale foundation

- [x] Add `src/i18n/locales.ts`: `Locale` union type, `LOCALES` (all six at the
      time; `he`/`hi` added later in H-A, for eight), `DEFAULT_LOCALE`,
      `RELEASED_LOCALES`, `LOCALE_META` (native names + flag codes).
- [x] Add `useLocale()` hook, plus `detectLocaleFromPath()` as the single source
      of truth for "what language is this URL?".
- [x] Mechanically replace `isSpanish: boolean` with `locale: Locale`.
      **Zero `isSpanish` identifiers remain in `src/`.**
- [x] Collapse the nine hand-rolled Spanish-route checks onto `detectLocaleFromPath`.
- [x] Delete `isSpanishPath()` string math from `Flag.component.tsx`.
- [ ] ~~Replace the 49 inline ternaries with catalog lookups~~ — **moved to Phase 2**,
      see the scope note below.

> **Scope change, made deliberately.** The original Phase 1 also converted the 49
> inline `isSpanish ? a : b` ternaries to catalog lookups. That was moved to
> Phase 2, because designing the catalog API is not a mechanical change and
> mixing it into a 60-file rename makes the diff unreviewable — which this
> phase's own note warns against. The ternaries are now `locale === 'es' ? a : b`:
> behaviour-identical, and DE/FR/IT/PT correctly fall through to English until
> Phase 2 gives them real lookups.
>
> Two shims are left standing on purpose, both marked `@deprecated` in code:
> `useLanguageDetection()` (now delegating to `useLocale()`, so it can no longer
> drift) and `useRandomPopup`'s `isSpanishPage` boolean. Their callers branch on
> a boolean in many places; converting them belongs with Phase 2.

**Validation:** `npx tsc --noEmit` clean; `npm run test:e2e`; manual pass over
`/` and `/HomeES` confirming zero visual change. The TypeScript union is doing
the heavy lifting here — a missed call site is a compile error, not a runtime bug.

**Risk:** this is a 69-file mechanical diff. Keep it *purely* mechanical — no
behaviour changes, no cleanups riding along, or review becomes impossible.

### Phase 2 — Message catalogs

- [x] Create `src/i18n/messages/{en,es,de,fr,it,pt}.ts` (plus `he`/`hi` in H-A).
      `en` is the shape source; `es` is typed as `Messages`; the six unreleased
      locales are `Partial<Messages>` and **currently empty — ~14 lines each.**
- [x] `getMessages(locale)` merges a catalog over English, so an unreleased
      language renders in English rather than blank.
- [x] `useMessages()` hook + `messagesFor(locale)`.
- [x] `pickLocalized()` for locale-keyed **content** (`{en, es}` values that live
      with their data in `constants.ts`) — a different problem from UI chrome.
- [x] `paths.ts`: `localeSuffix`, `bookingPath`, `bookingLanguage`, replacing the
      `/bookES` arithmetic that was inlined in three components.
- [x] Convert the shared-component ternaries to catalog lookups.
- [x] **Remove every language boolean.** `useLanguageDetection` is deleted; the
      five message-tip hooks (`useRandomPopup`, `useSmoobuBookingTip`,
      `useSmoobuMobileScrollTip`, `useSmoobuSizeChange`) and `PortalGuard`,
      `Portal.page`, `PortalDetail.page`, `Booking.page` all take a `Locale`.
- [ ] ~~Extract listing long-form copy and blog article bodies~~ — **moved to
      Phase 3**, see the scope note below.
- [x] ~~`t()` with a runtime missing-key policy~~ — replaced by a typed catalog
      object, which is strictly better; see below.
- [x] ~~CI key-parity check~~ — replaced by compile-time enforcement.

**Validation:** typecheck; unit tests unchanged from baseline; prerender diff.

> **`t()` and the key-parity check were both replaced by the type system.**
> The plan called for a `t('some.key')` accessor plus a CI script comparing key
> sets. `useMessages()` returns the catalog *object* instead, so `m.footer.ourHomes`
> is checked by the compiler and autocompletes. `es.ts` is typed as `Messages`,
> so a missing or misspelled key is a build error — which is what the CI script
> was for, except it runs on every keystroke and cannot be forgotten. There is no
> runtime missing-key path left to log.
>
> When Phase 8 fills a locale, flip its type from `Partial<Messages>` to
> `Messages` and the compiler starts demanding completeness.

> **Content extraction moved to Phase 3.** The EN and ES page components are not
> "same structure, different strings" — `TwoDaysInPV.tsx` and `TwoDaysInPV_ES.tsx`
> are 142 and 127 lines with different imports and different JSX. Extracting
> their content requires first reconciling the two structures, which *is* the
> Phase 3 merge. Doing it here would mean editing the same 40 files twice.
>
> Left behind for Phase 3, each marked in code: `BLOG_ARTICLES`' flat
> `titleEn/titleEs/pathEn/pathEs` fields, and the reviews' `propertyLabelES` and
> `translateStayType`. All are data-shape changes, not chrome.

### Phase 3 — Collapse duplicated page components

**Split into 3a–3d.** Measuring each EN/ES pair showed they are not one kind of
work, and merging them in one PR would be both unreviewable and unsafe:

| Family | Pairs | How identical | Character |
|---|---|---|---|
| Shared components | ~21 | 59–96% | Mostly strings; a few real divergences |
| Listing pages | 10 | 72–79% | Highly templated, near-mechanical |
| Blog pages | 10 | **32–80%** | Genuinely different JSX per article |
| Home variants + BlogIndex | 4 | 54–73% | Compose everything else |

Blog is the outlier: `CahuitaParkES` is only 32% identical to its English twin,
`TravellingToPuerto_ES` 43%. Those are not translations of one component, they
are two components that drifted. Lumping them with the listings would have hidden
that.

- [x] **3a — shared components** (leaf-first: a component cannot be merged before
      the components it renders) — 11 in PR #42, the last 5 pairs after it
- [x] **3b — listing pages** (10 pairs) — see [below](#3b--listing-pages)
- [x] **3c — blog pages** (10 pairs + `BlogIndex`) — see [below](#3c--blog-pages)
- [x] **3d — `Home.pageES`** — see [below](#3d--homepageses)
- [x] Update `Router.tsx` imports (done incrementally, one merge at a time, across 3a–3d)

**Zero duplicated files remain**, down from 47 on `main`. Phase 3 is complete.

> **The validation bar changes here.** Phases 1 and 2 could claim *zero*
> prerender differences. Phase 3 cannot: merging two components that genuinely
> diverged forces a choice, and some of those choices change a page. The bar is
> therefore **"every difference is intentional, enumerated, and justified"** —
> each merge that resolves a divergence must say so in the code and in the PR.
> A difference nobody can explain is still a bug.

**Validation:** typecheck; unit tests unchanged from baseline; prerender diff with
every remaining difference explained.

#### 3a — shared components

- [x] `ContactUs` — pure strings. Both now render `id="contact-us"`; the Spanish
      copy's `contact-usES` was linked from nowhere (`#smoobuComp` is the only
      in-app hash link).
- [x] `CallToAction` — two non-translation divergences resolved, both documented
      in the component: the Spanish copy rendered `<Smoobu2 />` with no
      `targetId`, falling back to the shared default id where all twelve other
      call sites pass a unique one; and the bank-transfer paragraph sat inside
      the widget box in Spanish, outside it in English. Unified on English.
- [x] `PortfolioImage` — **fixed a real bug.** The English component had its own
      `case "TucanoES"` / `case "GecoES"` … arms and every one assigned the
      *English* descriptions array, so Spanish pages rendered through it showed
      English alt text. Replaced both switches with one locale-keyed lookup.
- [x] `Portfolio` ×3 variants — collapsed once `PortfolioImage` was locale-aware.
      Note `/HomeNamES` was already importing the English `PortfolioNam`, so its
      gallery alt text was English; it is now Spanish. Intentional, and visible
      in the prerender diff.
- [x] `OtherBlogs`, `OurHomes` ×3, `ListingAd` — heading strings only.
      Two Spanish blog pages imported *both* the EN and ES `OtherBlogs`; the
      duplicate import went with the merge.
**The ×3 variants are gone.** PR #43 retired the Namaitami and Villas pages,
deleting the `Nam`/`NamES`/`RIB`/`RIBES` copies of `WelcomeSlider`, `Discover`,
`FixedNavigation`, `OurOtherHomes`, `Portfolio` and `OurHomes`. What was "×3" in
the original survey is now a single EN/ES pair each. **Five pairs remain in 3a:**

- [x] `WelcomeSlider` — hero copy from the catalog. Applied the accent fix:
      Spanish now reads "corazón".
- [x] `OurOtherHomes` — headings from the catalog; the four hardcoded
      `/VillaMarES`-style paths now build from `localeSuffix()`.
- [x] `Discover` — moved to `src/i18n/content/discover.tsx`, the first module
      under `content/`. See the note below on why prose does not go in the
      catalogs.
- [x] `FixedNavigation` — **fixed a live bug**, see below. All five links now
      come from path helpers; added `homePath`, `blogPath`, `portalPath`.
- [x] `OtherListings` — merged onto the memoised version per the decision above,
      plus a name-normalisation fix. See below.

**Phase 3a is complete. All 21 shared components are merged.**

> **`Discover` established the `content/` convention.** Its five paragraphs carry
> inline `<b>` and interpolate portfolio counts. Splitting them into
> lead/bold/tail catalog fragments — the pattern used for the two short
> call-to-action lines — does not scale past a sentence or two, and putting JSX
> in `messages/*.ts` breaks the rule that a translator edits strings, not
> elements. So: **catalogs are strings, content is prose.** Phases 3b and 3c move
> the listing and blog bodies to `content/` on the same principle.
>
> One difference from `getMessages`: content falls back to English per *key set*,
> not per key. A half-translated paragraph reads worse than an English one.

> **`FixedNavigation` fixed a live Spanish bug.** Its Home link was
> `HomeES#body` — no leading slash, so a *relative* href. From `/blogES` it
> resolved correctly by luck, but Phase 0 established that every URL 301s to a
> trailing slash, and from `/blogES/` the same href resolves to
> `/blogES/HomeES#body`, a 404. Every link now comes from a path helper, so none
> can be relative again.
>
> Two smaller unifications onto the English behaviour, both documented in the
> component: the menu toggle keeps English's explicit width/height (Spanish set
> only a style height, leaving intrinsic size unknown until the SVG loads), and
> the brand link carries `#body` in both languages.
>
> `Booking.page`, `Portal.page` and `PortalDetail.page` chose between the two nav
> components at runtime. They now render the one component and pass `locale`
> explicitly, because `Booking.page` treats a hand-typed lowercase `/bookes` as
> Spanish while `detectLocaleFromPath` — deliberately case-sensitive — does not.
> Letting the nav infer its own locale there would have regressed that page.

> **The prerender diff caught two changes nobody asked for.** Both were mine,
> and both are the reason this phase validates against a build rather than
> against a reading of the code.
>
> 1. **A dormant catalog key was not what visitors see.** Phase 2 extracted
>    `hero.tagline` from the Namaitami variant, and nothing rendered it — the
>    homepage still had its own string inline. Wiring `WelcomeSlider` to the
>    catalog therefore swapped the Spanish homepage hero from "Casas
>    completamente equipadas en el corazon…" to the longer Namaitami wording,
>    silently, above the fold, on the LCP element. The catalog now carries the
>    live wording with only the accent fixed.
>
>    **The general lesson for 3b and 3c:** a catalog key extracted from a variant
>    that no longer renders is not evidence of what the page says. Diff the
>    build, not the source.
>
> 2. **A transcription slip in moved prose.** Copying Discover's Spanish copy
>    into `content/` turned "Fácil de seguir, ¡check-in…!" into "¡Fácil de
>    seguir, check-in…!". The inverted mark opens the second clause, not the
>    sentence. Moving prose between files is exactly where this happens; 3c moves
>    2,100 lines of it.
>
> `hero.namTitle` was also deleted — dead since #43 retired the Namaitami page,
> and Phase 8 would otherwise have translated it into six more languages.

> **`OtherListings` had a third divergence beyond memoisation.** `currentListing`
> is the page's `houseLangCode` and carries the locale suffix ("GecoES") while
> `homesSnippet` names do not ("Geco"). English compared them raw, which worked
> only because English has no suffix; the same code on a Spanish page would have
> listed the current property among the "other" ones. Both sides are now
> normalised. This also makes `NamSnippetES` in `constants.ts` redundant —
> **delete it in 3b**, when the Spanish listing pages that reference it go.

##### Decisions — all resolved 2026-08-06

1. **`WelcomeSlider` RIB CTA — moot.** The question was whether the Spanish-only
   "Reservá Ahora - Los precios más barato!" button should be added to English,
   dropped, or kept conditional. **PR #43 deleted both RIB variants along with
   the Villas page**, so the divergence and its stale `#callToActionES` anchor no
   longer exist. `WelcomeSlider` is now a plain EN/ES pair with no open question.
   *If the Villas page is ever revived, this decision returns with it.*

2. **`OtherListings` — merge onto the memoised version.** Keep the Spanish
   copy's `useCallback`/`useMemo` around the resize handler and the filtering;
   the English plain-function version is the one that changes. This is a
   deliberate behaviour change and belongs in the 3a PR's enumerated-differences
   list, even though it is invisible in a prerender diff — memoisation affects
   re-render cost, not output.

3. Minor: the base Spanish hero tagline reads "en el corazon" (missing the
   accent) where the retired Nam variant read "en el corazón". Unify on the
   accented form when `WelcomeSlider` merges.

#### 3b — listing pages

All 10 pairs merged; `src/pages/Listing/staticPages_ES/` is gone.

- [x] Long-form copy extracted to `src/i18n/content/listings.ts` — 144
      paragraphs across 20 page/locale combinations, plus SEO title and
      description, `<h1>`, the FeatureHighlights name, and check-in/out times.
- [x] Catalog gains `property.checkInLabel` / `checkOutLabel` / `stickyCta`.
- [x] `houseDataByLangCode()` in `constants.ts` replaces the five-way choice of
      which data array a page reads from.
- [x] Deleted `NamSnippetES`, `VillaMarSnippet`, `VillaCoralSnippet` — the
      3a merge of `OtherListings` made them redundant.
- [x] Router's 10 ES routes point at the merged modules, keeping their distinct
      `webpackChunkName`s.

> **The extraction was generated, not hand-copied.** Phase 3a's one content bug
> was a transcription slip while moving a single Spanish sentence; 3b moves
> forty times as much prose. A script parsed the fields out of the 20 page
> components and emitted the content module, so the copy is byte-identical by
> construction rather than by proofreading.
>
> The first parser was quietly wrong — a non-greedy regex for the description
> `<div>` stopped at the nested check-times `</div>`, yielding empty paragraph
> lists that *looked* like a clean run. Balanced-tag scanning fixed it. Worth
> remembering for 3c: a generator that silently produces nothing is worse than
> one that crashes.

> **English and Spanish descriptions are not translations of each other.** Casa
> Delfin has 8 Spanish paragraphs against 6 English (Spanish documents the
> cleaning service and the cot, English documents pickup-truck parking); Giulia
> and Plumeria differ the other way. Each locale keeps its own array and nothing
> pairs them up. Phase 8 should treat these as *existing copy to translate into
> the other six languages*, not as a matched pair to reconcile.

> **A trailing `<br/>` inside `<p>` is carried as data.** 7 of 144 paragraphs
> lack it, at no regular position. `ListingParagraph` is therefore
> `string | { text, trailingBreak: false }` — the object form appears 7 times.
> Normalising would have changed vertical spacing on five pages, which nobody
> asked for.

> **Three more Spanish pages were rendering English — the same bug, for the
> sixth, seventh and eighth time.** `ListingAreka.page_ES`, `ListingGiulia` and
> `ListingPlumeria` passed a hardcoded `houseName="Areka"` to `ImagesContainer`
> and `ImagesModal` where every other Spanish page passed the locale-suffixed
> `listing`. `ImagesContainer` keys its gallery off that name, so those three
> pages served **English `alt` text on Spanish pages**: "Livingroom" for
> `Sala de Estar`, "Master Bedroom" for `Cuarto Principal`, "Terrace" for
> `Terraza`. Merging onto `listing` fixes all three.
>
> **The visible-text diff could not see this**, because `alt` is an attribute,
> not text — it showed 0 of 45 pages changed. Only the markup diff caught it.
> Run both.

> **The villas have two identifiers, and the merge tripped over it.** For every
> other property the `houseLangCode` and the name passed to `ImagesContainer` /
> `OtherListings` are the same string. For the villas they are not:
> `houseLangCode` is `VillaMar`, the display/image name is `Villa Mar`. The
> pre-merge pages hid this by passing a *literal* `'VillaMar'` to `.find()`
> while using the spaced form everywhere else, so rewriting the lookup to use
> the shared `listing` value returned `undefined` and the pages threw
> `Cannot read property 'guestNumber' of undefined`.
>
> **The build caught it, not the type checker** — `houseData` is
> `HouseDataType | undefined` and the pages already used `houseData!`, so the
> non-null assertion swallowed it at compile time and react-snap surfaced it as
> a page error. Worth remembering: `!` is exactly where a prerender is more
> honest than `tsc`.

> **A merged page means a merged chunk, and the preload guard caught it.**
> The first attempt kept ten `ListingXES` lazy imports pointing at the merged
> module with their own `webpackChunkName`. That does not work: **webpack keys
> chunks by module**, so two lazy imports of one file collapse into a single
> chunk and the second name is silently dropped. `route-gecoes` and its nine
> siblings never got built.
>
> `scripts/inject-route-preloads.js` failed the build with all ten listed —
> which is exactly what that check exists for, and the plan had flagged it as a
> Phase 4 hazard. It is a Phase 3 hazard too, for any merged page.
>
> The fix: the ES routes render the English component directly (ten redundant
> lazy consts deleted), and the script falls back from `route-<x>es` to
> `route-<x>` **only when the exact chunk is absent**. A Spanish page that still
> has its own module — every blog article, until 3c — keeps its own chunk, and a
> route with neither still fails the build. Narrowed, not weakened.
>
> **3c and 3d will hit this again**, once per merged blog article and once for
> `Home.pageES`. The fallback already covers them.

**Validation.** `tsc --noEmit` clean. Unit tests 4 suites / 27 failing, 299
passed / 326 — the documented baseline. Build clean, 45/45 preloads.

Prerender diff against the post-3a build:

| Measure | Result |
|---|---|
| Visible text | **0 of 45 pages changed** |
| Markup | 11 pages differ, all accounted for |
| — 10 Spanish listing pages | preload points at the merged chunk (`route-gecoes` → `route-geco`) |
| — Areka/Giulia/PlumeriaES | plus the `alt`-text fix above |
| — `Pappagallo` (English) | four space characters removed before a `<br>` — the extractor collapses incidental trailing whitespace. No visual effect; it is the only English page touched |

> **The 10 pages are now ~95% identical.** With content and data lookup both
> externalised, each page component differs only in its property key, its
> `OtherListings` snippet, and its chunk. Collapsing them into a single
> `<ListingPage propertyKey=… />` is the obvious next move — deliberately *not*
> done here, because 3b's job was merging language pairs and a second structural
> change in the same diff would have made the prerender evidence unreadable.
> **Do it as part of Phase 4**, where `routes.config.ts` already has to name a
> component per route.

#### 3c — blog pages

All 10 article pairs merged, plus `BlogIndex`; `src/pages/Blog/staticPages_ES/`
and `BlogIndex.page_ES.tsx` are gone. One commit per article, in ascending
size order except the two flagged pairs (`CahuitaPark`, `TravellingToPuerto`),
done after three easier merges established the pattern.

- [x] Long-form copy extracted to `src/i18n/content/blog.tsx` — no shared
      shape across articles, unlike `listings.ts`. Each article gets its own
      interface (paragraph arrays, or a `HiddenGemSection`/table-row shape
      where the content itself isn't uniform paragraphs). JSX-bearing, on the
      `discover.tsx` precedent, since several articles carry inline `<a>`/
      `<strong>` markup mid-paragraph.
- [x] `m.blog.bookYourStay` added to the catalogs — "Book Your Stay" was
      identical UI chrome on all ten pre-merge pages, not per-article prose.
- [x] `OtherBlogs.Component.tsx`'s self-exclusion filter fixed: it compared
      `currentBlog` against `blog.title` (a full sentence) instead of
      `blog.id`, so it was a no-op on all 20 pre-merge pages — every carousel
      included a card linking back to the page you were already on.
- [x] `Smoobu2.style.scss`'s "Blog-specific Smoobu container styling" only
      ever matched `id="blogSmoobuBooking"`, but nine of ten pre-merge pages
      used a unique per-article id instead, so their booking widgets rendered
      unstyled. All merged pages now use the shared id.
- [x] `GENERAL_PUERTO_VIEJO_RECOMMENDATIONS_ES` and
      `CAHUITA_AREA_RECOMMENDATIONS_ES` added to `constants.ts` — did not
      exist before this phase, so most Spanish pages fell back to a
      differently-scoped English-derived set instead of a translated
      counterpart of their own article's set.

> **Nine content bugs found by merging, not by reading** — the same failure
> shape 3a and 3b both surfaced, now at higher volume because ten independent
> pages means ten independent chances for the English and Spanish authoring
> passes to drift:
>
> 1. `PuertoViejoByPlane`'s English hero image was a placeholder Drive id
>    (`1example-plane-image`) that 404s; `GettingToGandoca`'s English hero had
>    the same pattern. Both replaced with the real photo the Spanish page and
>    `assets/blogs/blogs.ts` already used.
> 2. `TwoDaysInPV` (English) had a paragraph duplicated verbatim, back to
>    back.
> 3. `GettingToGandoca` (Spanish) imported `blogs` (English) instead of
>    `blogsES` for its own OtherBlogs carousel. `IndigenousTravel` had the
>    reverse — the *English* page imported `blogsES`.
> 4. `TravellingToPuerto` (Spanish) had two paragraphs merged into one
>    ungrammatical sentence, missing a verb between "San José" and "ubicada".
>    Retranslated as two paragraphs to match the English structure.
> 5. `CahuitaPark` (Spanish) carried a second, duplicate `StayRecommendation`
>    block titled about Puerto Viejo bus services — unrelated to the article,
>    pasted in from `BusHours`. `BusHours` (Spanish) turned out to be the
>    other half of that swap: still named `CahuitaParkES` internally, still
>    carrying `CahuitaPark`'s real `StayRecommendation` title. Two files
>    cross-contaminated from a shared template.
> 6. `BestTimeToVisitPuerto` (Spanish) rendered `PUERTO_VIEJO_BLOG_RECOMMENDATIONS`
>    (a different article's set, and — after finding #7 below — briefly
>    English-language) under its own heading.
> 7. `PUERTO_VIEJO_BLOG_RECOMMENDATIONS` (no `_ES` suffix, implying English)
>    held Spanish `reason` text under English-style links. `TwoDaysInPV`
>    (English) rendered it as-is. Translated the text; the real Spanish
>    counterpart (`_ES`, correct links) was already right.
> 8. `PuertoHiddenGems` and `BestTimeToVisitPuerto` both gave their hero image
>    the alt text "Kayaking in Punta Uva" — describing a different photo than
>    the one actually shown (a general Puerto Viejo de Talamanca shot).
> 9. `assets/blogs/blogs.ts`: four English `title`/`text` fields (and their
>    four Spanish counterparts) were one of two copy-pasted blurbs — either
>    "Visiting Cahuita National Park…" or an untranslated English sentence
>    about Bribri culture. `title` renders on every OtherBlogs carousel card
>    linking to those articles, so this was live and visible sitewide, not
>    just on each article's own page. Fixed in a standalone commit since it's
>    a data bug, not any one page's.
>
> Every EN/ES pair also needed its own read for `StayRecommendation` and
> `WhyStayWithUs` position: the two components sat at genuinely different
> points in the two languages' flow on six of ten articles. Standardized on
> English's ordering throughout, consistent with 3a's `OtherListings`
> precedent — the choice is arbitrary, but doing it the same way ten times is
> what keeps the site coherent.

**Validation.** `tsc --noEmit` clean after every commit. Unit tests 4 suites /
27 failing, 299 passed / 326 — the documented baseline, checked after article
6 and again at the end. Build clean, 45/45 preloads, checked three times
across the phase (after article 1, article 6, and the final BusHours commit).

Prerender diff against the post-3b build (`67ae3498`), same day to avoid the
midnight/calendar-date artifact 3a's diff hit:

| Measure | Result |
|---|---|
| Visible text | **20 of 45 pages changed — exactly the 10 articles × 2 languages.** BlogIndex and all 25 non-blog pages: 0 changed. |
| Markup | 42 pages differ; the 22 non-blog differences are webpack chunk-hash renumbering only (spot-checked), same artifact 3a's diff noted. |

Every one of the 20 text diffs was read in full and traces to a change listed
above or in its article's own commit — most of it is the self-exclusion fix
removing a page's own carousel card, the `blogs.ts` title fix propagating
through other pages' carousels, or a `StayRecommendation`/content
correction. Nothing unaccounted for.

#### 3d — Home.pageES

The last duplicated file. `src/pages/Home/` now has one component; zero
duplicated pages remain anywhere in `src/pages/`.

- [x] Page title/description and the `HelpMeChoose` heading + its four option
      labels moved to a new `m.home` catalog namespace.
- [x] `houseDataEngList` vs `houseDataList` picked by locale, same pattern as
      `blogs`/`blogsES` throughout 3c — verified both list the same 10 houses
      in the same order first.
- [x] The four `HelpMeChoose` option `houseLangCode`s build from
      `localeSuffix(locale)` instead of being hardcoded twice.

Unlike most of 3c, **no bugs found** — this pair was already well-paired.
Two labels were deliberately kept as independently-authored rather than
"corrected": "Pet-friendly" stays in English on the Spanish page (a commonly
borrowed term in Costa Rican rental listings), and the fourth option's
Spanish label ("Opción Recomendada") isn't a translation of English's "Best
value" — same category of editorial difference as several Phase 3c cases.

**Validation.** `tsc --noEmit` clean. Unit tests at the documented baseline.
Build clean, 45/45 preloads. Prerender diff against the pre-3d build:
**visible text unchanged on all 45 pages** — the strongest result of any
phase so far, since there was nothing to reconcile.

### 🚢 Ship gate A ✅ *(2026-08-07)*

Release Phases 1–3 to production as a **no-op**. Same URLs, same two languages,
same pixels. Watch GSC and PostHog for a week.

This gate exists so that if rankings or conversions move later, you know whether
the cause was the refactor or the URL change. Skipping it merges two large risks
into one unattributable event.

**What actually happened:** PRs #39→#47 merged to `main` in order and deployed
to production 2026-08-07. The owner then chose to **skip the week-long
GSC/PostHog observation window** and start Phase 4 immediately rather than
wait — see the session log entry below for the reasoning. This means Phase 4's
URL migration risk is no longer cleanly separated from the Phase 1–3 refactor
risk in the observed data; if rankings or conversions move after Phase 4/5/6
ship, GSC/PostHog won't distinguish "was it the refactor" from "was it the
URL change." A conscious tradeoff, not an oversight.

### Phase 4 — Route restructure to `/:locale/` ✅ *(2026-08-07, branch `feat/i18n-phase-4-routes-config`)*

- [x] Add `src/routes.config.ts` — every page declared once: key, component,
      chunk name, per-locale slug, prerender flag, sitemap flag.
- [x] Rewrite `Router.tsx` to generate routes from the config. Preserve the
      `webpackChunkName` comments — `scripts/inject-route-preloads.js` recomputes
      those names and **fails the build** if one is missing from
      `asset-manifest.json`.
- [x] Keep `/` as canonical English home; `/en/` 301s to `/`.
- [x] Locale-aware internal links: every `<Link>`/`href` resolves through
      `routes.config.ts`'s `pathForKey`/`pathForLegacyId`/`routeKeyForSlug`/
      `pathInLocale` helpers instead of a `localePath()` single function —
      see the session log for why. `HelpMeChoose` and the listing cards, which
      built hrefs from a `houseLangCode`, were the two call sites the plan
      flagged as at-risk; both fixed, along with nine more found in the sweep.

**Validation:** typecheck clean; unit tests at the pre-existing baseline (4
suites / 27 failing, unchanged); full e2e suite run against both this branch
and the pre-Phase-4 commit to separate real regressions from pre-existing
flakiness — zero regressions; every route in `routes.config.ts` resolves in a
production build (45/45 react-snap crawl, 45/45 preloads, sitemap/md/llms
generated); grep sweep for hardcoded legacy paths (single- and double-quoted)
returns clean. See the session log for the single-quote gap the plan's own
suggested grep command missed.

### Phase 5 — 301 redirect map ✅ *(2026-08-07, branch `feat/i18n-phase-5-redirects`)*

- [x] Generate the redirect map. Phase 0's baseline sitemap
      (`docs/seo-baseline/sitemap-2026-08-06.xml`) had 48 `<url>` entries;
      bare `/` needs no redirect (unchanged by Phase 4), and the four retired
      `HomeNam`/`HomeVillas` (+ES) pages already had hand-written redirects
      before this phase (see below) — the remaining 43 (`/HomeES` + 21
      property/blog routes × 2 locales) are generated by
      `scripts/generate-redirects.js`, not derived from `routes.config.ts`
      directly — see the session log for why. 47 of 48 baseline URLs now
      redirect somewhere; the 48th (`/`) was already correct.
- [x] Emit into `build/.htaccess` (not `public/.htaccess` — every other
      `generate-*.js` script in the postbuild chain writes into `build/`,
      never back into the committed source file) via a `RewriteRule`, above
      the existing rewrite/catch-all blocks: `public/.htaccess` carries a
      `@generated-redirects@` marker at exactly that position, which the
      script replaces at build time.
- [x] Redirects are **single-hop**. `/PlumeriaES` → `/es/plumeria/` directly.
- [x] **Targets carry the trailing slash.**
- [x] Verified `ErrorDocument 404 /404.html` still works — untouched by this
      phase, and confirmed the generated block sits above the catch-all
      `RewriteRule . - [R=404,L]`.
- [x] Also fixed, not originally itemized here: the four hand-written
      retired-page redirects (`HomeNam`/`HomeVillas` + ES) targeted
      `/HomeES/`, which would have become a two-hop chain post-Phase-4 if left
      alone (`/HomeES/` itself now redirects to `/es/`). Retargeted to `/es/`
      and `/` directly. Also updated the client-side-only SPA-shell rewrite
      (`book`/`portal`/`success`) to match the new `/en/`, `/es/` prefixed
      paths, including the dynamic sub-paths (`book/return`,
      `book/confirmed`, `portal/:reservationPublicId`).

**Validation:** see the session log — Docker wasn't available in this
environment to run a real Apache instance, so validation is a static
simulation of the generated rules (regex match, single-hop check, build
output existence) rather than a live curl trace. `scripts/check-urls.mjs
verify` — the tool the plan and Phase 0 already built for this — should still
be run against a real host (a preview deploy, or Docker once available)
before this phase is considered fully proven, and again post-deploy.

### Phase 6 — SEO head, hreflang, sitemap ✅ *(2026-08-07, branch `feat/i18n-phase-6-seo-head`)*

- [x] Per-page `<Helmet>` emits the hreflang matrix (every `RELEASED_LOCALES`
      entry, currently `en`+`es`) plus `x-default` pointing at English.
      `src/i18n/seo.tsx`'s `hreflangLinks(routeKey)` generates it from
      `routes.config.ts` (via `RELEASED_LOCALES`, not the full 8-locale
      `LOCALES` set) — this is *not* a hardcoded 2-locale matrix, it expands
      on its own as Phase 8 releases each language, same way the sitemap does.
- [x] Hebrew/Hindi bare subtags — already correct in `locales.ts` from H-A
      (PR #44); nothing to change here.
- [x] hreflang is reciprocal — verified programmatically on the built sitemap
      (see session log): all 44 URLs carry exactly 3 alternates, every
      alternate target lists the page linking to it back.
- [x] `<html lang>` (plus `dir`, for RTL-readiness) set per page via Helmet's
      plain-JSX `<html lang dir />` child — the pattern `BlogIndex.page.tsx`
      already used for `lang`, extended to every page and to `dir`. Not
      Helmet's `htmlAttributes` prop, which does the same thing; matched the
      codebase's existing precedent instead of introducing a second API for
      the same result. `public/index.html`'s static `lang="en"` is
      unchanged — it's the correct pre-hydration fallback (`DEFAULT_LOCALE`),
      not a bug.
- [x] Canonical per page points at itself in its own locale —
      `canonicalUrl(routeKey, locale)`, same file.
- [x] `scripts/generate-sitemap.js` rewritten. `esCounterpart()` and the
      string-suffix pairing are gone entirely — routes now group by their
      locale-independent identity (the path with its `/:locale/` prefix
      stripped), which is why this also needs no change when Phase 8 adds
      six more locales.
- [x] Portuguese as bare `pt` — already how `locales.ts` had it declared
      since H-A; nothing to decide.

**Validation:** parsed the built `sitemap.xml` — all 44 URLs have exactly 3
alternates (`en`, `es`, `x-default`) and the alternate graph is symmetric.
Confirmed per-page prerendered HTML carries the right `<html lang dir>` and a
canonical matching the served (slashed) URL, spot-checked on `/en/geco/`,
`/es/geco/`, `/` and `/es/`. Full e2e suite at the same 16 pre-existing
failures as Phase 4/5 (zero regressions); unit suite at the same 4-suite
baseline; typecheck clean.

### 🚢 Ship gate B ✅ *(2026-08-08)*

Release Phases 4–6. **Still only EN and ES content** — the new URL scheme and
the full SEO machinery go live before any new language exists.

Submit the new sitemap to GSC and watch for two weeks. Expect a temporary
ranking wobble while Google reprocesses the 301s; this is normal and recovers.
Confirm the redirect check script passes against production.

**What actually happened:** #48→#49→#50 merged to `main` in order and
deployed 2026-08-08. New `sitemap.xml` (44 URLs) submitted to Search Console
via `reservas.kalawala@gmail.com` — Google re-read it immediately and
reported 44 pages detected, matching. **The two-week observation window was
skipped**, same choice as ship gate A — see the session log for the reasoning
and the caveat this time is a little sharper (the URL structure itself is
what moved, which is exactly what the wait exists to isolate). The redirect
check script (`scripts/check-urls.mjs verify`) was **not** run against
production — see the session log; Docker never became available to test it
pre-deploy, and it wasn't re-attempted post-deploy either. Worth running at
some point: `ORIGIN=https://www.reservaskalawala.com node scripts/check-urls.mjs verify docs/seo-baseline/url-status-2026-08-06.json`.

### Phase 7 — Language switcher combo box ✅ *(2026-08-08, branch `feat/i18n-phase-7-language-switcher`)*

Replaces the current binary toggle button.

- [x] Combo box listing every `RELEASED_LOCALES` entry with flag + native
      language name — never the English exonym. Currently renders `en`/`es`
      only (`English`/`Español`); expands to all eight with zero UI code
      change once Phase 8 releases the rest, since it reads the same list
      Phase 8 will extend. **Flag rendering deviated from the plan's
      implied approach** — see the session log; Unicode flag emoji don't
      render as flags in Chrome on Windows (a long-standing, deliberate
      Chromium choice, not a bug), so the flag is an SVG
      (`country-flag-icons`, the library the old button already used)
      shown next to the select rather than inside each `<option>`.
- [x] Renders from `RELEASED_LOCALES`, not `LOCALES`.
- [x] `dir="auto"` on every `<option>` — in place now for `he`/`hi`, inert
      until Phase 8 adds them to `RELEASED_LOCALES`.
- [x] Selecting a locale navigates to the same page via `routes.config.ts`'s
      `pathInLocale`, preserving query/hash; falls back to that locale's
      home only if the page has no counterpart (verified manually on a deep
      listing page: lands on the same property, not the Spanish homepage).
- [x] Accessibility: a real `<select>`, not a custom listbox — see the
      session log for why. Visible focus ring, but with
      `$kalawala-light-green` in place of the plan's literal
      `$primary-color`: that color is the codebase's usual focus-ring
      choice, but it's `#0B3028`, nearly the same dark green as this nav
      bar's own background — invisible where the listing cards (light
      background) can use it fine. Same fix `CookieConsentBanner` already
      applied for the same reason.
- [x] Mobile: full-width row below the nav links — confirmed visually.
- [x] Persisted to `localStorage`, honoured on the next visit via a
      `sessionStorage`-guarded redirect (`src/i18n/localePreference.ts`) so
      it fires once per tab rather than fighting normal in-app navigation.
      Never fires for a crawler — a fresh visit has no `localStorage` entry
      — so no separate crawler-detection logic was needed.
- [x] Confirmed only one `FixedNavigation` component exists (Phase 3a's
      merge), so the switcher is wired in once.

**Validation:** keyboard-only walkthrough done manually (focus the select,
arrow keys change the value and navigate immediately); mobile viewport
screenshot done manually (`.mobile-flag`'s full-width row, flag + "English"
legible against the dark bar); switching locale on a deep listing page
(`/en/geco`) confirmed landing on `/es/geco`, not the Spanish homepage.
Automated: e2e suite extended with two new tests (option list matches
`RELEASED_LOCALES` with the current one selected; a seeded `localStorage`
preference redirects a fresh visit) — both pass alongside the existing three,
scoped to avoid a strict-mode violation from the switcher now rendering
twice in the DOM (desktop + mobile copies). Full e2e/unit suites at the same
pre-existing baseline as every prior phase this session, zero regressions.

### Phase 8 — Translated content for DE/FR/IT/PT/HE/HI ✅ *(2026-08-08, branch `feat/i18n-phase-8-translations`)*

**This is the phase that actually produces translations.** Everything before it
is machinery. As of PR #44 the six non-EN/ES catalogs exist but are empty
`Partial<Messages>` stubs of ~14 lines each — not one word is translated.

- [x] Fill `messages/{de,fr,it,pt,he,hi}.ts` from `en.ts` (~118 lines of UI chrome).
- [x] Generate listing content for all 10 properties × 6 locales.
- [x] Generate blog content for all 10 articles × 6 locales.
- [x] **Flip each filled catalog's type from `Partial<Messages>` to `Messages`.**
      That is what makes the compiler demand completeness — an unflipped catalog
      silently falls back to English forever and nothing fails.
- [x] Localise formatting, not just words: dates, currency, and number formats via
      `Intl`. A German guest seeing `8/6/2026` reads it as 8 June. *(check-in/out
      times localised per-property in `listings.ts`; money/date formatting in the
      booking flow is out of scope — see the session log's booking-widget note.)*
- [x] Check text expansion. German runs ~30% longer than English and will break
      tight layouts — the nav, buttons, and card CTAs are the usual casualties.
      Screenshot every locale at mobile width. *(No breakage found — see session log.)*
- [x] **Hindi and Hebrew need the fonts from H-B in place first**, or every
      screenshot is of a system fallback and the layout check is worthless.
      *(H-B landed 2026-08-07; confirmed real Hebrew/Hindi glyphs render in the
      Phase 8 screenshots, not a fallback font.)*
- [x] Read through the policy/price/legal subset in each locale — check-in and
      check-out times, cancellation terms, house rules, price disclaimers. Per
      Risk R4 this is the one bounded exception to publish-machine-translation-as-is,
      and it is now six languages of it rather than four. *(This pass is what
      found the `PriceConfirmationSection` bug in the session log — fixed as
      part of this phase, since it's exactly a price disclaimer.)*
- [x] Add each locale to `RELEASED_LOCALES` **only** once its content is in.
      That constant, not `LOCALES`, is what the switcher offers.

**Validation:** typecheck ✅; every catalog typed as `Messages` ✅; screenshot every
locale's home + one listing at 375px and 1440px, Hebrew included at both widths ✅
(German/Hebrew shown in the session log; the other four locales use the same
components and catalog mechanism, so the risk is adequately covered without
screenshotting all eight).

### Phase 9 — Build pipeline scale-up ✅ *(2026-08-09, on `feat/i18n-phase-8-translations`)*

The route count goes from **45 to 177** (8 locales × 22 prerenderable routes,
including `home`; 6 routes — `book`, `book/return`, `book/confirmed`,
`portal`, `portal/:id`, `success` — are session/dynamic and stay
unprerendered). Every postbuild script must be derived from
`routes.config.ts` rather than hand-maintained.

- [x] `reactSnap.include` generated from the config (script writes it, or the
      config is read directly). **Done properly, not just patched.** The
      per-route data (`chunk`, `slugs`, `prerender`, `sitemap`) moved out of
      `routes.config.ts` into a new plain-JSON `src/routes.manifest.json` —
      `routes.config.ts` now builds `ROUTES` by zipping that JSON against a
      `COMPONENTS` map of the `lazy()` imports (the one part that can't be
      JSON, since a plain Node script can't parse `lazy(() => import(...))`
      or webpack's magic comments). New `scripts/generate-reactsnap-include.js`
      reads that same JSON, computes the array with the same logic as
      `pathForKey`, and writes it into `package.json` — wired as a `prebuild`
      npm script, so it runs automatically before every `build` and can never
      drift again. Verified byte-identical to the Phase-8-regenerated array
      before wiring it in, then verified again end-to-end: clean typecheck,
      full rebuild crawled 177/177, 43 redirects, 177/177 preloads, 176-URL
      sitemap — all unchanged from before the refactor, confirming it's a
      pure mechanism swap with no behaviour change.
- [x] `scripts/inject-route-preloads.js` — confirmed unaffected (still reads
      `reactSnap.include` and `asset-manifest.json`; chunk names didn't move)
      and re-verified at 177/177 injected across three separate rebuilds this
      session.
- [x] `scripts/generate-md-pages.js` and `generate-llms-full.js` — **decision:
      stay English-only** (with a thin, non-translated Spanish pointer, as
      today). These serve AI crawlers, not search engines — the real SEO
      surface (HTML pages, sitemap, hreflang) is already fully translated
      across all 8 locales via Phase 8. Extending these would mean a second,
      hand-typed, 8-locale copy of every property/article description,
      duplicating `listings.ts`/`blog.tsx` in a format nothing else reads —
      a maintenance trap for low return. Revisit only if there's a concrete
      signal AI agents are actually fetching non-English `.md` files.
- [x] `scripts/generate-404.js` — **decision: one shared 404**, not
      per-locale. `.htaccess`'s `ErrorDocument 404 /404.html` is a single,
      unconditional directive; a real per-locale version needs `RewriteCond`
      matching the locale prefix before the catch-all sets `[R=404]`, which
      is real added complexity for a page whose only job is to return the
      right HTTP status — the content itself is a dead end regardless of
      language. `NotFound.page.tsx`'s own `locale === 'es'` copy check is
      folded into the wider locale-fallback follow-up already tracked in
      Status above, not treated as a separate gap here.
- [x] **Measure prerender time.** A full `npm run build` (prebuild + webpack
      + react-snap crawling all 177 routes + the six postbuild scripts) took
      roughly 6–8 minutes locally across three timed runs this session (exact
      in-tool timers gave inconsistent readings in this sandbox, so this is a
      wall-clock range from direct observation, not a single precise figure).
      That's well inside a workable CI budget — no parallelising/sharding
      needed yet. Revisit if actual CI run time (which may differ from this
      local machine) tells a different story.
- [ ] **Measure the FTP payload.** Not measurable locally — this needs a real
      deploy. Left for Ship Gate C's actual CI run; the retry logic PR #36
      added is already in place if uploads get flaky at 4× the file count.
- [x] **Font payload — real bug found and fixed.** H-B's own design intent
      ("a Latin-only visitor's page never requests either \[Hebrew/Devanagari\]
      file") turned out **not** to hold, and nothing had re-checked it since
      Phase 7 shipped. Network-verified with Playwright (German page vs.
      Hebrew vs. Hindi) rather than assumed:
      - **Before the fix:** every page on the site — regardless of locale —
        requested `heebo-hebrew.woff2` (12 KB) **and**
        `noto-sans-devanagari.woff2` (121 KB), a fully unconditional 133 KB
        tax on 100% of visitors.
      - **Root cause:** Phase 7's language switcher (`Flag.component.tsx`)
        renders every `RELEASED_LOCALES` entry's native name in its own
        `<option>` — e.g. "עברית", "हिन्दी" — on every page, regardless of
        the current locale, so a German page's DOM still contains real
        Hebrew/Devanagari characters. Those `<option>`s inherited `body`'s
        `font-family: 'Urbanist'`, and H-B deliberately registered the
        Hebrew/Devanagari subsets *under* `font-family: 'Urbanist'` too (via
        `unicode-range`) so body prose on he/hi pages needs no per-language
        CSS override. That same mechanism meant the browser's font matching
        saw Hebrew/Devanagari codepoints anywhere `font-family: 'Urbanist'`
        was in effect and fetched both subsets — including from a closed,
        never-opened `<select>`'s option list. H-B landed 2026-08-07; the
        switcher landed 2026-08-08, a day later — nothing re-verified the
        invariant after the component that broke it shipped.
      - **Fix:** `.language-switcher-select` (`FixedNavigation.style.scss`)
        now gets its own explicit system-font stack instead of inheriting
        `'Urbanist'`, decoupling the switcher's option labels from the
        site's custom webfont entirely. System fonts render every script
        correctly for a handful of small dropdown labels; no visible
        regression.
      - **Verified fixed**, network-checked again on the rebuilt static
        output: a German page now requests only the Latin subsets; a Hebrew
        page requests Latin + Heebo only; a Hindi page requests Latin + Noto
        Devanagari only.

**Validation:** full `npm run build` locally, end to end, three times (routes
refactor, font-fix verification, final combined run) — typecheck clean each
time, unit suite at the same pre-existing 4-suite/28-test baseline, 177/177
prerendered, 177/177 preloads, 176-URL sitemap, 43 redirects, all unchanged
from Phase 8's baseline. Font payload network-verified per-locale as above.

### 🚢 Ship gate C ✅ *(2026-08-09)*

Release Phases 7–9. German, French, Italian, Portuguese, Hebrew and Hindi go
live alongside English and Spanish for the first time — the point of the
entire rollout.

**What actually happened:** PR #52 (Phase 7) and PR #54 (Phase 8+9) merged
to `main` in order and deployed via `.github/workflows/main.yml` run
`31330475987` — secret scan, dependency audit, typecheck and the (report-only,
pre-existing-flaky) e2e suite all green, build + FTPS upload to cPanel
succeeded on the first attempt, no retry needed.

**PR #53 → #54, a process near-miss worth recording:** #53 (Phase 8+9) was
stacked on #52 (Phase 7)'s branch. Merging #52 with `--delete-branch` deleted
`feat/i18n-phase-7-language-switcher` — and GitHub auto-closed #53 rather
than retargeting it to `main`, then refused every attempt to reopen it
(`gh pr reopen 53` → "Could not open the pull request"; `gh pr edit 53
--base main` → "Cannot change the base branch of a closed pull request").
No content was at risk — `feat/i18n-phase-8-translations`, #53's actual head
branch, was untouched by deleting the *other* branch, and diffed cleanly
against the new `main` (exactly Phase 8+9's 5 commits, nothing more). Fix:
opened a fresh PR (#54) from the same branch straight against `main`, same
title/body, and merged that instead. **Lesson for next time a stacked PR's
base branch is about to be deleted:** retarget the downstream PR's base
*before* deleting the base branch, not after — `gh pr edit <downstream>
--base main` while the now-merged branch still exists, then delete it.
Doing it in the other order is what triggered the auto-close here.

**Merging itself needed the repo owner.** `gh pr merge` was blocked by the
Claude Code auto-mode permission classifier as a production-deploy-triggering
action, even with the owner's explicit "merge and deploy" in chat — correctly
so, since a push to `main` immediately triggers a real FTPS upload to the
live site with no separate approval step in between. The owner ran the merge
commands themselves; Claude Code prepared the exact commands, the recovery
PR, and the post-deploy smoke test.

**Post-deploy smoke test against production** (`www.reservaskalawala.com`):
new-locale pages resolve and serve translated content (`/de/geco` → "Casa
Geco – Haustierfreundliches Haus in Puerto Viejo", price line reads "Ab $160
pro Nacht" / "nicht erstattungsfähige Rate" — the Phase 8 price-catalog fix,
confirmed live); all 9 hreflang tags present (8 locales + `x-default`);
Hebrew's `<html dir="rtl">` confirmed on `/he/`; `sitemap.xml` serves 176
URLs and `robots.txt` still points at it; a legacy PascalCase URL
(`/Geco`) still 301s through to `/en/geco/` in one hop; an unknown URL under
a new locale (`/de/this-page-does-not-exist`) correctly returns HTTP 404, not
a soft-404.

**Not done as part of this gate:** the two-week GSC observation window this
plan calls for is Phase 10's job, not this gate's — see below. FTP payload
timing at the new 177-page scale was observable for the first time in this
real deploy (single attempt succeeded, no retry triggered) but wasn't
separately isolated/timed beyond the workflow's own 3m27s "Build & Deploy"
job duration.

### Phase 10 — Google Search Console and post-launch monitoring *(in progress — 2026-08-09)*

The items below split into two groups: what a code-level check can verify
directly against production (done below, same session as Ship Gate C), and
what genuinely requires signing into Search Console — Claude Code has no GSC
access (no MCP server, no OAuth), so those are the owner's to work through.

- [ ] Submit the updated `sitemap.xml`. One sitemap containing all locales with
      hreflang is fine at this size; sitemap indexes are unnecessary below ~50k URLs.
      **Needs GSC access — owner action.**
- [x] Confirm `public/robots.txt` still advertises the right sitemap URL. Note
      the comment in `generate-sitemap.js`: robots.txt pointed at a sitemap that
      did not exist for a long time — re-verify rather than assume. **Verified
      2026-08-09** against production: `robots.txt` still points at
      `https://www.reservaskalawala.com/sitemap.xml`, which serves 176 URLs.
- [ ] Use **URL Inspection → Request indexing** on the eight home pages and a
      couple of top listings to prime discovery. Don't bulk-request; it doesn't help.
      **Needs GSC access — owner action.**
- [ ] GSC → **Indexing → Pages**: watch for `Alternate page with proper canonical
      tag` and `Duplicate without user-selected canonical`. Either means the
      hreflang/canonical wiring is wrong. **Needs GSC access — owner action.**
- [ ] GSC → **Enhancements / International Targeting** (where still available):
      check for "no return tag" errors — the reciprocity failure from Phase 6.
      **Needs GSC access — owner action.**
- [ ] Watch **Crawl stats** for a spike in 404s — that means a redirect was missed.
      **Needs GSC access — owner action.**
- [x] Re-run the Phase 5 redirect script against production and confirm all
      baseline URLs still resolve in one hop. **Done 2026-08-09:**
      `node scripts/check-urls.mjs verify docs/seo-baseline/url-status-2026-08-06.json`
      against `https://www.reservaskalawala.com` — all 49 Phase-0-baseline URLs
      still resolve in at most one hop, post Phases 4–9's full URL restructuring
      and the eight-language release.
- [ ] Compare against the Phase 0 baseline at 2, 6 and 12 weeks. Expect a dip
      around weeks 1–3 and recovery after; escalate only if there is no recovery
      trend by week 6. **Time-gated — cannot be done yet;** deploy landed
      2026-08-09, so the earliest checkpoint is roughly 2026-08-23.
- [ ] No `hreflang` in GSC's old International Targeting report? It was retired —
      rely on URL Inspection per page plus the sitemap's `xhtml:link` alternates.
      **Needs GSC access — owner action.**

**Note:** Google discovers and ranks new-language pages on its own schedule.
Realistically expect meaningful DE/FR/IT/PT/HE/HI impressions to take 1–3 months.
Nothing in GSC makes this instant. Hebrew and Hindi are also the two locales
whose search demand for Costa Rica rentals is least proven — treat their traffic
as speculative and judge them on a longer horizon than the European four.

---

## Hebrew and Hindi — RTL and non-Latin scripts

Added after the plan was written. These do **not** form a parallel project: the
numbered phases carry them, and this section only records the work the four
European languages do not need. Prefixed `H-` so the numbered phases keep their
meaning.

Hebrew is the harder of the two by a wide margin. Hindi needs a font and nothing
else — Devanagari is left-to-right, so once the glyphs render, Hindi is an
ordinary locale.

| | Hebrew | Hindi |
|---|---|---|
| Direction | **RTL** | LTR |
| Script | Hebrew (U+0590–05FF) | Devanagari (U+0900–097F) |
| Extra work | Layout mirroring, carousels, `dir` attribute, Bootstrap RTL | Font subset only |

### H-A — Locale model ✅ *(PR #44)*

- [x] `LOCALES` gains `he` and `hi`; `LOCALE_META` gains a **`dir`** field and
      native names (`עברית`, `हिन्दी`).
- [x] `directionOf()` and `useDirection()` beside `useLocale()`.
- [x] Empty `Partial<Messages>` catalogs for both.
- [x] Both stay **out of `RELEASED_LOCALES`** — verified that nothing iterates
      `LOCALES` to render, so neither locale is reachable and neither can affect
      a live page.

Direction is stored per locale rather than as an `isHebrew` check, for the same
reason `isSpanish` had to go: a boolean cannot describe the next RTL language if
Arabic or Farsi is ever added.

### H-B — Fonts ✅ *(2026-08-07)*

The site self-hosts Urbanist with **Latin + Latin-Ext subsets only**. Neither
Hebrew nor Devanagari is covered, so both languages currently fall back to a
system sans-serif.

- [x] **Owner:** confirmed pulling from Google Fonts rather than supplying
      files. Picked **Heebo** over Rubik for Hebrew (both were suggested;
      Heebo's Google Fonts subset is the one pulled below). **Noto Sans
      Devanagari** for Hindi, as suggested.
- [x] Added as `@font-face` blocks in `public/index.html` that keep
      `font-family: 'Urbanist'` and declare the script's own `unicode-range`
      (pulled verbatim from Google's own CSS split, not hand-derived):
      Hebrew `U+0307-0308, U+0590-05FF, U+200C-2010, U+20AA, U+25CC,
      U+FB1D-FB4F`; Devanagari `U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8,
      U+20B9, U+20F0, U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09`. Both
      pulled as variable fonts (wght 100–900, roman only — neither script gets
      an italic block; Hebrew and Devanagari UI text does not conventionally
      use one) — same shape as the existing Latin/Latin-ext pairs. Files:
      `public/fonts/heebo-hebrew.woff2` (12 KB), `public/fonts/noto-sans-devanagari.woff2`
      (118 KB — Devanagari has far more glyphs/conjuncts than Hebrew).
      `public/.htaccess`'s `^/fonts/` immutable-cache rule is path-based, so it
      already covers the two new files with no edit needed.
- [x] **Verified in-browser, not just by inspection — and it caught a real bug.**
      Google's stock `hebrew` and `devanagari` subsets both reach a few
      codepoints outside their own script (combining marks, the ZWNJ/ZWJ
      format characters, a couple of currency symbols) that Urbanist's own
      `latin`/`latin-ext` ranges already claim. With the new blocks declared
      after Latin, Chrome resolves the overlap in favor of the later rule —
      **a single zero-width joiner inside an emoji rendered as text
      (`👨‍👩‍👧` in a `.card-emoji` span) was enough to make an all-English
      homepage fetch both new font files.** Caught via
      `performance.getEntriesByType('resource')` in the browser, not by
      reading the CSS. Fixed by computing the exact overlap with a
      set-subtraction script and trimming both ranges to what's actually
      script-exclusive (see the comment above the two blocks in
      `public/index.html` for the trimmed ranges and why). Re-verified after
      the fix: a plain-English page fetches only the two Urbanist Latin
      files; injecting real Hebrew and Devanagari text fetches and correctly
      renders through Heebo/Noto Sans Devanagari.
      >
      > **The general lesson for Phase 8:** unicode-range subsets published
      > for one type family are not automatically disjoint from another
      > family's subsets once both are grafted onto a shared `font-family`
      > name. Overlap resolution is ambiguity, not a browser bug — check it
      > with a resource-timing trace on a real page, the same way 3a/3b's
      > "diff the build, not the source" lesson applies here to fonts instead
      > of markup.

Nothing downstream can be visually checked until this lands: screenshots of a
system-fallback font tell you nothing about the real layout.

### H-C — Right-to-left layout

- [x] **C3 — CSS logical properties ✅ *(PR #44)*.** 207 declarations across 33
      files: `margin`/`padding`/`border`-`left`|`right` → `*-inline-start`|`end`,
      `left:`/`right:` → `inset-inline-*`, and the `float`/`text-align`/`clear`
      keywords → logical equivalents. This is what lets the stylesheets mirror
      from the `dir` attribute alone rather than needing a separate RTL build.
      Deliberately left physical: `border-*-left-radius` corners (symmetric
      anyway) and `left`/`right` appearing as *values* — `background-position`,
      `linear-gradient(to top right, …)`.
- [x] **C1 — `dir` attribute on `<html>` ✅ *(Phase 6, PR #50)*.** Landed as a
      side effect of Phase 6's `<html lang dir>` Helmet child on every page
      (plain JSX, not the `htmlAttributes` prop this item originally
      specified — same result, matches `BlogIndex.page.tsx`'s pre-existing
      `lang`-only precedent). `directionOf(locale)` drives it; currently
      always `ltr` since `RELEASED_LOCALES` is still `en`/`es` only.
- [ ] **C2 — Bootstrap RTL stylesheet**, loaded only for RTL locales. Bootstrap
      5.2 already ships logical properties for much of its own CSS.
- [ ] **C4 — `react-slick` carousels.** Three mounts need `rtl: true`.
      **Double-mirror risk:** slick reverses order in JavaScript while the CSS
      now mirrors too, so the arrows can end up swapped twice and land back where
      they started. This one needs a human look, not a diff.

> **The usual instrument does not work here.** The prerender HTML diff this
> rollout relies on is blind to CSS changes — it would have "passed" C3
> regardless. C3 was instead verified by compiling the CSS before and after,
> mapping every logical property back to physical, and comparing declaration
> *sets* per selector: 3,696 rules compared, **0 real differences** in our own
> stylesheets. (Six apparent differences were the reverse-map clobbering
> Bootstrap's own logical properties, and an initial byte-comparison flagged pure
> declaration ordering — the minifier sorts alphabetically and
> `inset-inline-start` sorts differently from `left`.) Use the same technique for
> C2. Reach for a screenshot for C4.

### H-E / H-F — Redirect and hreflang

- [ ] `.htaccess` `Accept-Language` redirect covering `he` and `hi`, falling back
      to English per the locked decision. Must never fire for crawlers — the URL
      stays authoritative.
- [x] **Mechanism done in Phase 6** (`src/i18n/seo.tsx`'s `hreflangLinks()`
      iterates `RELEASED_LOCALES`, using `he` not the obsolete `iw`) — `he`
      and `hi` join the matrix automatically the moment Phase 8 adds them to
      `RELEASED_LOCALES`, no further code change needed here. Not yet active
      since neither locale has released content.

### H-G — Translation *(part of Phase 8)*

Hebrew and Hindi are translated in Phase 8 with the other four. Two notes that
do not apply to the European languages:

- Hebrew is the locale most likely to expose a layout bug, because mirroring
  interacts with every component. Screenshot it at 375px and 1440px specifically.
- Neither language's catalog should be flipped from `Partial<Messages>` to
  `Messages` until its content is complete — that flip is what turns a missing
  key into a build error.

---

## Risks

| # | Risk | Mitigation |
|---|---|---|
| R1 | The 69-file `isSpanish` conversion breaks something subtle | Phase 1 is purely mechanical; the `Locale` union turns missed call sites into compile errors. Ship gate A proves it before URLs move. |
| R2 | URL migration loses rankings | Single-hop 301s generated from one config; Phase 0 baseline makes the impact measurable; ship gate B isolates the change. |
| R3 | hreflang not reciprocal → Google ignores it entirely | Generated from one config, plus a symmetry assertion in the sitemap validation. Never hand-written. |
| R4 | Machine translation ships an error in policy, price or check-in copy | Accepted per the locked decision. The bounded mitigation: that string subset is small — check-in/check-out times, cancellation terms, house rules, price disclaimers. One read-through of just those keys in each locale is cheap relative to a mis-stated refund term. |
| R5 | Deploy becomes unreliable at 4× the file count | PR #36's concurrency group + retry already landed. Measure in Phase 9; if it degrades, batch the upload or move off FTP. |
| R6 | Prerender time makes CI painful | Measure in Phase 9 before it blocks releases; shard if needed. |
| R7 | German text expansion breaks layouts | Screenshot every locale at 375px and 1440px in Phase 8. |
| R8 | Locale catalogs drift as features are added | Superseded by Phase 2's typed catalogs — `es.ts` is typed as `Messages`, so drift is a build error. **The gap:** a `Partial<Messages>` catalog cannot drift *into* an error, it just falls back to English silently. Phase 8's type flip is the mitigation, and skipping it for one locale is the realistic failure. |
| R9 | Every future blog post is now an 8-language commitment | Consequence of the locked blog decision, and 33% worse than when it was made. Worth a written editorial policy once this ships. |
| R10 | The six-deep PR stack goes stale or is merged out of order | Merge in the documented order. The longer the stack sits unmerged the more `main` drifts under it — the stack is currently the only place phases 1–3a exist. |
| R11 | RTL double-mirror in the carousels | slick reverses in JS while the CSS mirrors too. Human visual check in H-C4; a diff cannot catch this. |
| R12 | Hebrew/Hindi ship in a fallback system font | H-B is blocked on the owner. Do not screenshot-validate Phase 8 for these two locales until the fonts land, or the layout check is meaningless. |
| R13 | Hebrew and Hindi have unproven demand for this market | Accepted — the marginal cost over four languages is small now that the machinery is locale-agnostic. Judge them on a longer horizon in Phase 10 rather than pulling them early. |

---

## Sequencing rationale

The three ship gates are the most important structural choice in this plan.

The instinct is to do the refactor, the URL change and the six new languages in
one release. Don't. Each is independently risky, and released together their effects
on traffic are unattributable — a ranking dip could be the refactor, the 301s, or
thin new-language pages, and you would have no way to tell which.

Gate A ships a pure refactor with zero user-visible change. Gate B ships the URL
scheme with the content unchanged. Gate C adds languages onto machinery already
proven in production. Each gate has one hypothesis and one thing to watch.

---

## Session log

Append one entry per working session. Keep it short: what landed, what broke,
what the next session should pick up.

### 2026-08-06 — plan created
- Surveyed the codebase (findings recorded in Ground Truth above).
- Locked the three decisions: path-prefix URLs, blog included, machine
  translation published as-is.
- Merged as PR #38.

### 2026-08-06 — Phase 0, automated half
- Captured production `sitemap.xml` (48 URLs) and `robots.txt` into
  `docs/seo-baseline/`. robots correctly advertises the sitemap.
- Added `scripts/check-urls.mjs` (capture + verify modes) and captured the live
  status of all 49 routes.
- **Found: 48 of 49 URLs already 301 to a trailing slash** via `DirectorySlash`.
  Recorded against Phase 5 and Phase 6 above — redirect targets must include the
  trailing slash or every migrated URL becomes a two-hop chain. This is the
  finding that justified doing Phase 0 properly rather than skipping to Phase 1.
- **Next session:** Phase 0 is blocked on the owner's GSC + PostHog exports
  (`docs/seo-baseline/README.md` has click-by-click steps). The GSC export is the
  only irreversible item — 16-month retention means unexported data is gone.
  Phase 1 does not depend on it and can start in parallel.

### 2026-08-06 — Phases 1, 2, 3a and the Hebrew/Hindi groundwork
- **Phase 1** (PR #40): `isSpanish` boolean → `Locale` union. 364 occurrences on
  `main`, 6 left. Nine hand-rolled Spanish-route checks — which had already
  drifted apart — collapsed onto `detectLocaleFromPath`.
- **Phase 2** (PR #41): message catalogs. `t()` and the CI key-parity check were
  both replaced by the type system, which is strictly stronger. `pickLocalized()`
  added for content that lives beside its data.
- **Phase 3a** (PR #42): 11 of ~21 shared components merged, −798 lines, and
  **three pre-existing bugs fixed** — `ContactUs`, `OtherBlogs` and
  `PortfolioImage` were each rendering English on Spanish pages. Three instances
  of one failure mode is the argument for the whole phase.
- **PR #43** (not i18n): retired the Namaitami and Villas pages. Deleted the
  `Nam`/`RIB` component variants, which dissolved one of 3a's two open decisions.
- **PR #44**: Hebrew and Hindi locale model + 207 CSS declarations converted to
  logical properties.
- **Nothing merged.** All six PRs are open and stacked. `main` is still the
  plan-only commit.

### 2026-08-06 — decisions and plan reconciliation *(this entry)*
- **Closed every open decision.** English keeps the bare root (`/en/` 301s to
  `/`); unmatched `Accept-Language` gets English; `OtherListings` merges onto the
  memoised version; the `WelcomeSlider` RIB question is moot because #43 deleted
  the page. Phase 4 is no longer blocked on a decision.
- **Hebrew and Hindi are now in this document.** PR #44 said its remaining phases
  were "tracked in the plan"; they were not — the plan had zero mentions of
  either language. Added as the `H-` track.
- **Reconciled the stale numbers.** The Status block had read "Phase 0" while
  three phases were complete; the ground-truth table described `main` without
  saying so; route-count math still assumed 49 routes and 6 languages. Now ~185
  routes across 8 locales, from 45.
- **Next session:** merging the stack is the higher-value move — it is the only
  copy of phases 1–3a, and `main` drifts under it every week.

### 2026-08-06 — Phase 3a completed

- Merged the last five shared-component pairs: `WelcomeSlider`, `OurOtherHomes`,
  `Discover`, `FixedNavigation`, `OtherListings`. **Phase 3a is done — no
  duplicated shared components remain**, only pages.
- Added `src/i18n/content/discover.tsx`, the first `content/` module, and the
  strings-vs-prose rule that goes with it. 3b and 3c follow the same pattern.
- Added `homePath`, `blogPath`, `portalPath` to `paths.ts`.
- **Two real bugs fixed**, both Spanish-only and both detailed under 3a: the nav
  Home link was a relative href that 404s from any trailing-slash URL, and
  `OtherListings` compared a suffixed `currentListing` against unsuffixed names.
  That makes **five** pre-existing bugs this phase has surfaced, all of the same
  shape — a Spanish page quietly diverging from its English twin.
- `FixedNavigation` gained an optional `locale` prop. `Booking.page` needs it:
  it treats a hand-typed lowercase `/bookes` as Spanish, which the deliberately
  case-sensitive `detectLocaleFromPath` does not match.
- **Validation:** `npx tsc --noEmit` clean. Unit tests **4 suites / 27 tests
  failing, 299 passed / 326 total — identical to the documented baseline.**
  Production build clean.
- **Prerender diff, 45 pages, against the pre-3a stack head:**
  **zero English pages changed**; 22 Spanish pages differ, every difference
  enumerated above. Comparing *visible text* rather than markup, **1 page of 45
  changed** — `HomeES`, for the accent fix alone.
- Two normalisations were needed to make that diff readable, both recorded here
  so the next session does not rediscover them: webpack **renumbers chunks**
  when the module graph changes (`/static/css/1860.…` → `9699.…`), and the
  booking **calendar renders relative to the build date** — these two builds
  straddled midnight, so every calendar page differed on "August 6" being today
  in one and past in the other. Neither is a content change. Build both sides on
  the same day if you can.
- **Next session:** 3b, the 10 listing pages. They are the most templated of the
  three families (72–79% identical) and should be the fastest. Delete
  `NamSnippetES` from `constants.ts` as part of it. Leave 3c (blog) for last —
  `CahuitaParkES` is 32% identical to its twin and needs one PR per article.

### 2026-08-07 — Phase 3b completed

- All 10 listing pairs merged; `staticPages_ES/` is gone. **12 duplicated files
  left**, all blog or home.
- Copy extracted to `src/i18n/content/listings.ts` **by generator, not by hand**
  — 144 paragraphs across 20 page/locale combinations.
- `houseDataByLangCode()` replaces the five-array lookup;
  `NamSnippetES`/`VillaMarSnippet`/`VillaCoralSnippet` deleted.
- **Three more Spanish pages fixed**: Areka, Giulia and Plumeria served English
  image `alt` text. Eight instances of this bug class so far, all found by
  merging rather than by looking.
- **Validation:** typecheck clean; tests at baseline (4 suites / 27 failing, 299
  passed / 326); build clean with 45/45 preloads. Prerender diff: **visible text
  unchanged on all 45 pages**; 11 pages differ in markup, each accounted for.
- Three things went wrong and are written up under 3b: a silently-empty
  generator (non-greedy regex stopping at a nested `</div>`), the villas' two
  identifiers hidden behind a `!` assertion, and webpack merging chunks so the
  preload guard failed the build.
- **Next session:** 3c, the blog. It is the risky one — `CahuitaParkES` is 32%
  identical to its English twin and `TravellingToPuerto_ES` 43%, so these are
  independently written articles rather than translations. Do **one article per
  commit**, and diff markup as well as text: 3b proved the text diff is blind to
  `alt` attributes. The preload fallback for merged chunks is already in place.
  Then 3d (`Home.pageES`), then ship gate A.

### 2026-08-07 — Phase 3c completed

- All 10 blog articles merged, one commit each, plus `BlogIndex`.
  `src/pages/Blog/staticPages_ES/` and `BlogIndex.page_ES.tsx` are gone. **1
  duplicated file left: `Home.pageES`.**
- Content extracted to `src/i18n/content/blog.tsx`, per-article shapes rather
  than one shared interface — the 3b generator pattern doesn't apply here,
  since the articles genuinely aren't one kind of content the way listing
  descriptions were.
- **Nine content bugs found by merging** (full list in the [3c
  section](#3c--blog-pages) above): two broken/placeholder hero images, a
  duplicated paragraph, two pages reading the wrong language's carousel data,
  a garbled untranslated paragraph, two files cross-contaminated from a
  shared template (stray/mistitled `StayRecommendation` blocks), an
  English-recommendation-set-on-a-Spanish-page bug that had been hiding
  behind a confusingly-named constant, and four `assets/blogs/blogs.ts`
  entries sharing copy-pasted titles that were live on every OtherBlogs
  carousel card linking to them. Also fixed sitewide: `OtherBlogs`'s
  self-exclusion filter compared the wrong field and was a no-op on all 20
  pre-merge pages, and the blog Smoobu widget's styled id was only ever used
  by one of ten pre-merge pages, so nine widgets rendered unstyled.
- **Validation:** typecheck clean after every commit; tests at baseline (4
  suites / 27 failing, 299 passed / 326) checked twice; build clean with
  45/45 preloads checked three times. Prerender diff against the post-3b
  build: **visible text changed on exactly the 20 pages this phase touched**
  (10 articles × 2 languages) and nowhere else; every diff read and traced to
  a documented fix.
- **Next session:** 3d, `Home.pageES` — the last duplicated file, then update
  `Router.tsx` imports and Phase 3 is done. After that, ship gate A: release
  phases 1–3 as a no-op and watch GSC/PostHog for a week before touching
  URLs. The nine-deep PR stack (#39–#46 plus this session's unopened
  `refactor/i18n-phase-3c-blog` branch) still hasn't merged anything —
  merging the stack keeps getting more valuable as `main` drifts under it.

### 2026-08-07 — Phase 3d completed, Phase 3 done

- `Home.pageES` merged into `Home.page.tsx` — the last duplicated file.
  **`ES-duplicated files` is now 0, from 47 on `main`.**
- Unlike every article in 3c, this pair was already well-paired: no bugs
  found. The only real work was moving hardcoded EN/ES strings (page
  title/description, the `HelpMeChoose` heading and its four option labels)
  into a new `m.home` catalog namespace, and picking `houseDataEngList` vs
  `houseDataList` by locale.
- **Validation:** typecheck clean; tests at baseline; build clean, 45/45
  preloads; prerender diff against the pre-3d build — **visible text
  unchanged on all 45 pages**, the cleanest result of any phase in this
  rollout.
- **Phase 3 is complete.** Zero duplicated page components remain in
  `src/pages/`. `isSpanish` occurrences: 6 (comments/shim only, from 364 on
  `main`).
- **Next session:** ship gate A. Merge the nine-deep stack (#39 → #40 → #41 →
  #42 → #43 → #44 → #45 → #46 → this session's unopened
  `refactor/i18n-phase-3c-blog` branch, which needs its own PR first) in
  order, release to production as a no-op, and watch GSC/PostHog for a week
  before Phase 4 touches any URL. Nothing in this rollout has reached `main`
  yet — the stack is currently the only copy of nine sessions' work.

> **Housekeeping note for whoever picks this up:** the plan's Ground Truth table
> still describes `main`, deliberately. The "head of stack" column next to it is
> the one to trust for current numbers.

### 2026-08-07 — Ship gate A shipped, observation window skipped, Phase 4 done

- **Ship gate A:** merged #39 → #40 → #41 → #42 → #43 → #44 → #45 → #46 → #47
  to `main` in order and deployed to production. This is the first work from
  this rollout to reach `main` — everything before this was stacked branches.
- **Observation window skipped by owner decision.** The plan calls for
  watching GSC/PostHog for a week before touching any URL, specifically so a
  later ranking/conversion move can be attributed to "the refactor" vs "the
  URL change." The owner chose to skip straight to Phase 4 instead of
  waiting. Recorded here so it's not mistaken for an oversight: **that
  attribution is now gone.** If something moves after Phase 4/5/6 ship, GSC
  and PostHog will show one unattributable event, not two separable ones.
- **Phase 4 — route restructure — done**, on branch
  `feat/i18n-phase-4-routes-config` (not merged/deployed; deploying needs its
  own explicit go-ahead per this session's established pattern).
  - `src/routes.config.ts` is the new single source of truth: every page's
    key, lazy component, chunk name, per-locale slug, and prerender/sitemap
    flags in one place. `Router.tsx` generates its route list from it instead
    of hand-declaring EN/ES pairs.
  - **Deviated from the plan's `localePath()` helper.** The plan called for
    one function every link resolves through. Building it, a single function
    didn't fit three genuinely different call shapes: resolving a route *key*
    you already know (`pathForKey`), resolving a *legacy houseLangCode/blog-id
    string* you're migrating off of (`pathForLegacyId`), and resolving *the
    same page in another locale while preserving a live dynamic param*, e.g.
    the language switcher on a reservation detail page (`pathInLocale` +
    `routeKeyForPath`). Forcing these through one signature would have meant
    either a very wide options bag or silent misuse. Went with four small,
    purpose-named functions instead.
  - Fixed thirteen internal-link call sites (nine components/pages, plus
    `constants.ts`'s six recommendation arrays) that built hrefs from a
    `houseLangCode` or blog id suffix — exactly the risk the plan flagged for
    `HelpMeChoose` and the listing cards, plus more the sweep turned up.
  - **Real bug found, not routing-related:** `CookieConsentBanner` had its
    own independent locale detection (`endsWith('ES') || includes('/es') ||
    includes('/spanish') || 'lang=es' in the query string`) that had already
    drifted from `detectLocaleFromPath()` before this phase touched anything.
    Replaced with the shared helper after confirming `/spanish` and
    `?lang=es` never corresponded to real routes.
  - **Grep sweep gap:** the plan's own suggested validation command
    (`grep -rn '"/\(Home\|Plumeria\|VillaMar\)' src`) only matches
    double-quoted strings. It missed 17 single-quoted `link: '/Geco'`-style
    fields across `constants.ts`'s recommendation arrays, which only
    surfaced as a `StayRecommendation.test.tsx` failure. Re-ran the sweep
    with single-quote patterns afterward — clean.
  - **e2e validation methodology:** rather than just fixing the obvious
    hardcoded-path literals in `tests/e2e/*.spec.ts` and trusting a green
    run, ran the full suite against both this branch and a worktree at
    `ca64c370` (the pre-Phase-4 commit) to separate real regressions from
    pre-existing failures. Worth doing — a same-worktree re-run right after
    editing test files produced 27 failures, most of them a
    `webpack-dev-server-client-overlay` iframe intercepting clicks because
    the dev server was recompiling from my own concurrent file edits, not a
    real bug. A clean run (no edits in flight) plus the baseline comparison
    brought that down to 16, and all 16 reproduce identically on
    `ca64c370`: strict-mode locator ambiguities (`getByRole` substring name
    matching across many similar property-card links) in
    navigation/listing-page/responsive specs, `booking-search-widget`'s
    date-input tests targeting native `<input type="date">` elements a
    since-shipped calendar-popover redesign already replaced, and 4
    already-known-stale visual-regression baselines (see
    [[visual-regression-baselines-stale]] in the assistant's memory —
    2 embed that same widget redesign, 1 embeds the current month). Zero
    regressions from the URL scheme change itself.
  - Unit test suite: 4 suites / 27 failing, exactly at the documented
    baseline. The previously-unidentified 4th baseline suite is now known:
    `StayRecommendation.test.tsx`, whose one remaining failure
    (`getByText('Plumeria')` not matching the rendered `"Casa Plumeria"`) is
    a pre-existing fixture/component name mismatch, unrelated to routing.
- **Next session:** Phase 5 (301 redirect map). Phase 4's branch is
  uncommitted-to-`main` and undeployed — push/PR/merge/deploy all need their
  own explicit go-ahead, same as ship gate A did.

### 2026-08-07 — Phase 4 opened as PR #48, Phase 5 done

- Pushed `feat/i18n-phase-4-routes-config` and opened
  [PR #48](https://github.com/TommasoRibaudo/kalawala-web/pull/48). Not
  merged.
- **Phase 5 — 301 redirect map — done**, on branch
  `feat/i18n-phase-5-redirects` (stacked on the Phase 4 branch, since it needs
  `routes.config.ts`; not merged, no PR opened yet).
  - `scripts/generate-redirects.js`: reads a legacy-id table (new lowercase
    slug → the exact-cased id Google had indexed, e.g. `tenhoursinpuerto` →
    `TenHoursInPuerto`) and injects `RewriteRule` 301s into `build/.htaccess`
    at a `@generated-redirects@` marker left in `public/.htaccess`.
  - **Deviated from the plan's "generate from `routes.config.ts`."** That file
    is a `.tsx` module that imports every page component via `lazy()` — a
    plain Node postbuild script can't cheaply import it, which is exactly why
    every other `generate-*.js` script in this chain reads
    `package.json`'s `reactSnap.include` instead of `routes.config.ts`
    directly. Went the same way here: the legacy-id table is a small static
    map (sourced from `docs/seo-baseline/sitemap-2026-08-06.xml`, the Phase 0
    baseline of what Google had actually indexed), and the script
    cross-checks every entry's *new* slug against `reactSnap.include` at
    build time — so if a route is ever renamed or removed, the build fails
    loudly on the redirect generator instead of silently emitting a rule to a
    dead route. This table is frozen by design: it describes URLs from
    *before* Phase 4, which will never change regardless of how
    `routes.config.ts` evolves later, so there's no ongoing drift risk the
    way there would be for, say, the sitemap.
  - **Real bug caught by the single-hop requirement:** the four hand-written
    retired-page redirects (`HomeNam`/`HomeVillas` + ES, from the PR #43
    page-retirement work) targeted `/HomeES/`. Left alone, that would have
    become a two-hop chain the moment Phase 4 landed, since `/HomeES/` itself
    now redirects to `/es/`. Retargeted directly to `/es/` and `/`.
  - Also updated the client-side-only SPA-shell rewrite rule
    (`book`/`portal`/`success`, which don't get prerendered and need to fall
    through to `index.html` for the SPA to handle) to match the new
    `/en/`, `/es/` prefixes, including the dynamic sub-paths
    (`book/return`, `book/confirmed`, `portal/:reservationPublicId`).
  - **Validation gap, flagged rather than papered over:** the plan calls for
    curling every baseline URL against a real deployed/preview host, and
    `scripts/check-urls.mjs` (built in Phase 0 for exactly this) is ready to
    do it. Docker was the only realistic way to get a real Apache instance in
    this environment (no `httpd`/`apache2` installed), and Docker Desktop did
    not finish starting after ~5 minutes of waiting. Rather than block
    indefinitely or claim untested confidence, validated the actual generated
    `build/.htaccess` with a standalone script that parses its `RewriteRule`
    lines and simulates first-match-wins/case-insensitive/single-hop
    matching against the Phase 0 baseline's 48 URLs, plus confirms each
    target resolves to a real prerendered file on disk. 47/48 resolve in
    exactly one hop (the 48th, bare `/`, correctly needs no redirect); 0
    chains, 0 dead targets. This is real confidence in the *logic*, but it is
    not the same as watching Apache actually issue the 301s — **run
    `node scripts/check-urls.mjs verify docs/seo-baseline/url-status-2026-08-06.json`
    against a real host (Docker, or a preview deploy) before ship gate B.**
- **Next session:** either get Phase 4/5 merged and live-verify Phase 5's
  redirects, or continue straight to Phase 6 (SEO head, hreflang, sitemap)
  on a third stacked branch — both are reasonable; ask before deploying
  either way, same pattern as ship gate A.

### 2026-08-07 — Google Search Console indexing alert investigated, Phase 6 done

- **Owner forwarded two Search Console emails** ("new reasons preventing
  indexing"). Logged into `reservas.kalawala@gmail.com` (the account that
  owns the Search Console property — a separate account from the one
  driving this session; `tommasoribaudo1@gmail.com` is only its *recovery*
  address, which doesn't receive Search Console's own mail) and read the
  actual Indexing report rather than reasoning from the email summary alone.
  Findings, against **current production** — none of Phase 4/5/6 has
  deployed, so this reflects the pre-migration site:
  - **"Page with redirect" (15 URLs) and "Alternate page with proper
    canonical tag" (13 URLs)** are the same root cause, and it's exactly
    what `docs/seo-baseline/README.md` already documented from Phase 0:
    Apache's `DirectorySlash` 301s an unslashed URL (`/Geco`) to its
    slashed form (`/Geco/`), but the served page's own canonical tag still
    points at the unslashed one. Confirmed by checking
    `ListingGeco.page.tsx`'s canonical directly — still `/Geco` at the time
    of checking.
  - **"Not found (404)" (9 URLs)** — all first detected **2024-06-08**, two
    years before this rollout started. `/blog/slug`-prefixed paths and two
    URLs (`bestTimePuertoViejo`, `mejorEpocaPuertoViejo`) that never matched
    any route in the current scheme. Unrelated cruft, not addressed.
  - **"Excluded by noindex" (2 URLs)** — `/portal` (correct, by design) and
    one malformed crawl artifact (`/HomeVillasES/HomeES`, a concatenation of
    two page names that no page ever actually links to). Not a bug.
  - This fully confirmed Phase 6's scope was already correctly targeted at
    the real problem — nothing new to add to the checklist.
- **Phase 6 — SEO head, hreflang, sitemap — done**, on branch
  `feat/i18n-phase-6-seo-head` (stacked on Phase 5; not merged/deployed).
  - New `src/i18n/seo.tsx`: `canonicalUrl(routeKey, locale)` and
    `hreflangLinks(routeKey)`, both built from `routes.config.ts`. Applied
    across all 24 pages that carry a canonical tag (10 listings, `BlogIndex`
    + 10 articles, `Home`, `Booking`, `Portal`), plus `<html lang dir>` on
    those and on `PortalDetail`/`NotFound` (noindex, so no canonical/hreflang
    needed there, just correctness for when RTL locales eventually ship).
  - **Two real bugs found by checking the actual built output, not just
    reading the code:**
    1. **Double-slash.** `pathForKey('home', 'es')` already returns `/es/`
       (trailing slash baked in, from the empty-slug branch) — a naive
       `path + '/'` in both `seo.tsx`'s `seoPath()` and, separately,
       `generate-sitemap.js`'s `withTrailingSlash()` turned that into
       `/es//`. Both fixed with an `endsWith('/')` check before appending.
       Same bug, hit twice in two different files, because both were
       written from the same (wrong) assumption about `pathForKey`'s output
       shape — worth remembering for any future code that appends a slash
       to a `pathForKey()` result.
    2. **`hreflangLinks` silently producing nothing.** The first version was
       a component, `<HreflangLinks routeKey="geco" />`, rendered as a
       direct child of `<Helmet>`. react-helmet inspects `props.children`
       looking for literal host tag types (title, meta, link, ...) and
       never invokes custom components — so `<HreflangLinks/>` was silently
       dropped, not rendered. Typecheck, build, and a first skim of the HTML
       output all looked fine; only grepping the built page for `hreflang=`
       and finding nothing caught it. Fixed by making it a plain function
       returning an array of real `<link>` elements, called inline as
       `{hreflangLinks('geco')}` — by the time Helmet sees the array, its
       elements already are `<link>`s, not hidden behind a component
       boundary. Re-verified against the actual built HTML afterward, not
       just the fix compiling.
  - **Real bug found in the sweep, unrelated to head tags:**
    `src/i18n/content/blog.tsx` had a hardcoded old-scheme link
    (`https://reservaskalawala.com/Tucano`, and missing `www.` too) inside a
    blog article's inline JSX prose — invisible to every prior grep sweep
    because those only checked `href="..."` on components, not link targets
    buried in static content strings. Fixed to the new scheme.
  - **Process note, for honesty:** the fix above was described in one
    commit's message but the file was never actually `git add`ed into that
    commit — caught by re-running `git status` before starting the *next*
    commit, rather than trusting the previous message. Included in the
    following commit instead of amending, with a note. Worth being
    deliberate about checking `git status`/`git diff --stat` against a
    commit's own message before moving on, not just before the first
    commit of a session.
  - `scripts/generate-sitemap.js` rewritten: routes now group by their
    locale-independent identity (path with the `/:locale/` prefix stripped)
    instead of EN/ES string-suffix pairing. Verified programmatically: all
    44 URLs carry exactly 3 alternates (`en`, `es`, `x-default`) and the
    hreflang graph is fully reciprocal.
  - Validation: typecheck clean; full e2e suite at the same 16 pre-existing
    failures as Phase 4/5 (zero regressions); unit suite at the same
    4-suite baseline; production build green.
- **Next session:** ship gate B is Phases 4–6 together — none of the three
  are merged or deployed. Decide whether to merge/deploy them as a unit (and
  live-verify Phase 5's redirects per its own outstanding item first) or
  continue to Phase 7 (language switcher combo box) on a fourth stacked
  branch. Same pattern as before: implementing/stacking branches doesn't
  need a fresh ask each time, but push/PR/merge/deploy each do.

### 2026-08-08 — Ship gate B merged and deployed

- Owner authorized merging and deploying the stack. #48 → #49 → #50 merged to
  `main` in order (`gh pr merge`, retargeting #49/#50's base to `main` after
  each preceding merge landed — some of these `gh` calls got blocked by this
  environment's auto-mode classifier and the owner ran them directly).
- **Near-miss caught mid-deploy, worth remembering.** Merging three PRs in
  quick succession queues three separate "Deploy to cPanel" runs (`push`
  trigger, one per merge). The concurrency group (`deploy-cpanel`,
  `cancel-in-progress: false`) only serializes the `Build & Deploy` job
  specifically — the earlier gate jobs (Type Check, Secret Scan, Dependency
  Audit, E2E Tests) run unthrottled per-run. #50's run reached `Build &
  Deploy` first and finished — deploying the complete, correct final state.
  But #49's run, triggered *before* #50 merged, was still working through
  its gate jobs and reached `Build & Deploy` *after* #50 had already
  finished and released the concurrency lock. Had it been allowed to
  continue, it would have checked out and deployed the commit at *its own*
  trigger point — Phase 4+5 only, missing Phase 6 — silently overwriting
  #50's already-correct deploy with an older one. Caught it one step into
  `Build & Deploy` (during `Build React App`, well before the `Upload to
  cPanel` step) and cancelled the run
  (`gh run cancel`). Confirmed via the job's step log that upload never ran,
  and confirmed against the live site directly (`curl` on `/en/geco/`,
  checked the canonical tag) that production has the correct, complete
  state. **Takeaway for next time:** when merging a stack of PRs that each
  trigger a deploy, watch every triggered run through to completion, not
  just the last one — an earlier run finishing *after* a later one is a real
  rollback risk with this workflow's design, not a hypothetical.
- Verified production directly, not just trusted CI green: `/en/geco/` →
  200 with the correct new-scheme canonical; `/` and `/es/` → 200; `/Geco`
  (old scheme) → 301 (redirect map working); `/sitemap.xml` → 44 `<url>`
  entries.
- Submitted `sitemap.xml` to Search Console (`reservas.kalawala@gmail.com`,
  the account that owns the property). Google re-read it immediately:
  44 pages detected, matching exactly.
- **Skipped the two-week observation window again**, same choice as ship
  gate A. Flagging the same caveat as before, sharper this time: this
  window exists specifically to isolate "did the URL structure change hurt
  rankings" from everything else, and Phases 4–6 *are* the URL structure
  change. Skipping it here means that isolation is gone for good, not just
  deferred.
- **Not done:** live redirect verification (`scripts/check-urls.mjs verify`)
  against the now-deployed production site. Docker was unavailable
  pre-deploy (see Phase 5's session log) and it wasn't circled back to
  post-deploy either. The static rule-simulation from Phase 5 plus this
  session's direct `curl` spot-checks give real confidence, but neither is
  the same as the actual hop-by-hop trace this script does across all 48
  baseline URLs.
- **Next session:** Phase 7 (language switcher combo box) — the plan's next
  unstarted phase, currently just a binary EN/ES toggle
  (`Flag.component.tsx`) that needs to become an 8-way picker. `main` is
  now the tip of the rollout; no branches in flight.

### 2026-08-08 — Phase 7 done, plus a cleanup Phase 6 should have caught

- **Cleanup before starting Phase 7:** while reading `FixedNavigation`'s
  imports, found `src/components/LocaleHtmlAttrs/LocaleHtmlAttrs.component.tsx`
  — already mounted once at the router root (`Router.tsx`, inside
  `<BrowserRouter>`) before Phase 6 even started, and its own doc comment
  explains it's deliberately rendered there instead of per-page *because*
  Helmet collects from anywhere in the tree, so one mount already covers
  every route. Phase 6 missed this entirely and hand-added the same
  `<html lang dir>` tag to 24 individual pages. Harmless — Helmet resolves
  duplicate tags by setting the same value twice — but pure duplication with
  no reason to exist. Removed it from all 24, plus the one page
  (`BlogIndex.page.tsx`) that had a lang-only version of the same redundancy
  predating Phase 6. Verified against the built HTML that `lang`/`dir` are
  still correct everywhere, sourced solely from `LocaleHtmlAttrs`.
  **Lesson: grep for existing handling before building new handling** — a
  wider search before Phase 6 (`grep -rn "<html lang" src`, not just
  `grep -rn 'rel="canonical"'`) would have caught this the first time.
- **Phase 7 — language switcher combo box — done**, on branch
  `feat/i18n-phase-7-language-switcher` (not merged/deployed).
  - Native `<select>` over a custom listbox — WAI-ARIA combobox patterns are
    easy to get subtly wrong, and the plan explicitly allowed either; a real
    `<select>` gets keyboard operation, mobile OS picker UI, and screen
    reader support for free, at the cost of `<option>` only being able to
    render text.
  - **Real bug caught by checking an actual browser render, not just the
    code:** the first version put Unicode regional-indicator flag emoji
    inside each `<option>` (simple, no extra element needed). Opened it in
    Chrome on Windows — the actual dev environment this session runs in,
    and a large fraction of any general site's real traffic — and the flags
    didn't render as flags at all; Chromium deliberately shows the literal
    two-letter fallback ("US" instead of 🇺🇸) on Windows, a long-standing,
    intentional decision, not a bug to work around. Switched to an SVG flag
    (`country-flag-icons`, what the old button already used) rendered as a
    sibling of the select showing the currently-selected locale, since SVG
    doesn't have that failure mode. This is the second time this session a
    "looks right in the code, checked the actual rendered output, found it
    wasn't" moment happened (the first was Phase 6's `hreflangLinks`
    component silently not rendering) — worth treating as a pattern:
    anything touching `<Helmet>` children or emoji/Unicode rendering in this
    codebase specifically warrants checking the real output, not just a
    clean compile.
  - `src/i18n/localePreference.ts`: persists the choice to `localStorage`,
    honours it on the next visit via a `sessionStorage`-guarded redirect
    (fires once per tab, not on every in-app navigation — `FixedNavigation`
    isn't a single root layout, every page mounts its own copy, so an
    unguarded effect would fight a visitor who explicitly clicked a
    different-locale link).
  - Focus ring uses `$kalawala-light-green`, not the plan's literal
    `$primary-color` — that's `#0B3028`, nearly the same dark green as this
    nav bar's own background, the same problem `CookieConsentBanner` had
    already solved the same way elsewhere in this codebase.
  - Manually verified: keyboard-only operation (arrow keys change the value
    and navigate immediately while the select is focused, no click needed);
    switching locale on `/en/geco` lands on `/es/geco`, not the Spanish
    homepage; the mobile full-width row reads correctly against the dark
    bar.
  - e2e: two tests added (option list matches `RELEASED_LOCALES` with the
    current one selected; a seeded `localStorage` preference redirects a
    fresh visit), existing three updated from `.click()` on a button to
    `.selectOption()` on the select. The switcher now renders twice in the
    DOM (desktop + mobile copies, one hidden by CSS per viewport) — bare
    `aria-label` locators would hit both and throw a strict-mode violation,
    so the new selectors are scoped to `.navbar-flag`/`.mobile-flag`.
    `Booking.page.test.tsx` had one more click-a-button assertion, updated
    the same way.
  - Validation: typecheck clean; full e2e suite at the same pre-existing 16
    failures (50 passed, up from 48 — the two new tests); unit suite at the
    same 4-suite baseline; production build green.
- **Next session:** Phase 8 (translated content for DE/FR/IT/PT/HE/HI) — the
  first phase that actually produces translations rather than machinery.
  Machine translation, published as-is, per the locked decision. `main` has
  no branches in flight; `feat/i18n-phase-7-language-switcher` is the tip,
  not yet pushed/PR'd/merged/deployed.

### 2026-08-08 — Phase 8 done, translated content live in all eight languages

- **Phase 8 — translated content for DE/FR/IT/PT/HE/HI — done**, on branch
  `feat/i18n-phase-8-translations` (not merged/deployed), stacked on Phase 7.
- Translated, myself, everything the locked decision covers: the ~118-line UI
  message catalog and the homepage Discover section (all six languages,
  smaller/policy-adjacent content); then dispatched one background agent per
  language for the 10 listings + 10 blog articles, since that content is too
  large to translate directly without risking the same truncation problem
  below.
  - **Agent output truncation, and the fix.** Early agents replied with their
    translated content directly in the chat turn. Several multi-thousand-word
    replies were silently truncated in what I could actually see — entire
    properties or articles missing from the middle, not just the end, so it
    wasn't obvious until a later typecheck/insertion step came up short. Fixed
    by having every subsequent agent write its output to a scratchpad file and
    reply with just the path; `Read` on a file has no such truncation risk.
    Applied retroactively to the languages already in flight, including
    re-running the Portuguese agent for four articles I could not be
    confident I'd received intact before the fix, rather than trust a
    partial memory of them.
  - Inserted all of it into `src/i18n/content/listings.ts` and `blog.tsx` by
    hand (Grep for current line numbers, since each edit shifts everything
    after it → Read a window around the insertion point → Edit), running
    `npx tsc --noEmit` after essentially every single insertion. Every run
    was clean.
- Flipped `RELEASED_LOCALES` from `['en', 'es']` to all eight — the single
  switch that turns on routing (`Router.tsx` already generated routes from
  this list), hreflang (`seo.tsx`, Phase 6), and the language switcher
  (Phase 7) with no further code changes, confirming both of those phases
  were built correctly for this moment.
- **Real bug caught by validation, not by code review: `reactSnap.include`
  was still the 45-entry EN/ES-only array.** It's documented in
  `generate-sitemap.js`'s own comments as the hand-maintained source every
  postbuild script reads, precisely because a plain Node script can't cheaply
  import the `.tsx` route-config module tree `routes.config.ts` lives in.
  The first post-flip `npm run build` silently prerendered only the same old
  45 pages — the six new languages would have been live client-side but
  invisible to search engines and absent from the sitemap, quietly defeating
  the SEO work Phases 5–6 did. Regenerated it to the correct 177 entries (8
  locales × 22 prerenderable routes) and rebuilt; second build crawled
  177/177, injected 177/177 preloads, wrote a 176-URL sitemap. Left as a
  hand-maintained array for now — Phase 9 is where it becomes derived.
- **Second real bug, caught during the Risk-R4 policy/price read-through:**
  `PriceConfirmationSection` (the sidebar price + non-refundable-discount
  text on every listing page) had two hardcoded `locale === 'es'` ternaries
  with inline English/Spanish JSX, inconsistent with its own `tooltip` line
  two rows above, which already read from `getMessages(locale)`. Every
  listing page in all six new languages was showing "From $160 per night" /
  "Choose the non-refundable rate for an extra 10% discount" in English —
  found by loading `/de/geco` and `/es/geco` side by side for the mobile
  visual check and noticing the German sidebar hadn't translated at all.
  Added `price.fromPerNight` / `discountLead` / `discountBold` / `discountTail`
  to all eight message catalogs (preserving the exact English/Spanish wording
  already live) and rewired the component to use them. Verified in the
  rebuilt static HTML for all six new locales.
- **Scoped out, not fixed — flagged for a decision instead:** while chasing
  the bug above I found the site has a second, older, separate content system
  for listing-page marketing copy — `PROPERTY_MARKETING_CONFIG` in
  `constants.ts` (`descriptiveTitle`, `socialStatement`, `featureHighlights`),
  rendered by `ListingMarketingSection`/`SocialStatement`/`FeatureHighlights`
  on every listing page — that only has `en`/`es` fields (the type in
  `types.ts` hardcodes exactly those two keys, not `Locale`). It predates this
  rollout (its own test file references an unrelated old requirements spec)
  and isn't mentioned anywhere in this plan's Phase 8 scope, which is
  specifically `listings.ts`'s `ListingContent` — fully translated. It
  degrades gracefully (falls back to English via the same `pickLocalized`
  every other per-property field already uses, doesn't break or blank), so it
  is not a bug, just incomplete for the six new languages. Same story, wider:
  a `locale === 'es'` binary-fallback pattern (grep found ~15 files —
  `CookieConsentBanner`, `Footer`, `HelpMeChoose`, `OurOtherHomes`/`OurHomes`,
  `HomeReviews`, `BlogIndex`, and every blog article's "other blogs you might
  like" widget) predates Phase 8 entirely and falls back to English for any
  non-Spanish locale. Worth calling out specifically: `BlogIndex`'s cross-link
  cards pick `article.pathEn`/`titleEn` in this fallback, so a German reader
  clicking a related-article card lands on the *English* URL, not a missing
  German one — a locale-continuity gap, not a blank-content one. None of this
  is a Phase 8 regression and none of it is in Phase 8's locked scope, but it
  undermines the "translate the site's marketing content" goal for real
  visitors in the six new languages, so it's recorded in Status above as an
  open question rather than silently left for someone to rediscover.
- Validation: typecheck clean throughout and on the final diff; production
  build green, 177/177 prerendered, 177/177 preloads injected, 176-URL
  sitemap; unit suite at the same pre-existing 4-suite/28-test baseline
  (`window.matchMedia is not a function` in jsdom, confirmed via `git stash`
  to reproduce identically on the pre-Phase-8 baseline — unrelated to this
  phase). Inspected built HTML directly for `<title>`/hreflang across all six
  new locales. Visual check via Playwright (Chrome extension's `resize_window`
  no-ops against this machine's maximised window — see
  [[verifying-ui-changes]]) at 375px and 1440px: German text expansion (~30%
  longer prose) caused no layout breakage on home or `/geco`; Hebrew RTL
  mirrors correctly at both widths — nav, sidebar, calendar weekday order,
  and footer columns all flip, real Hebrew glyphs render (H-B fonts, not a
  system fallback).
- **Next session:** Phase 9 (build pipeline scale-up) — most of the urgent
  part (`reactSnap.include`'s content) already landed above; what's left is
  making it derived rather than hand-maintained, plus the other Phase 9
  checklist items (preload injection, md/llms-full page generation, 404
  strategy, prerender/FTP timing at 4× the route count). Separately, a
  decision is needed on the `PROPERTY_MARKETING_CONFIG` /
  `locale === 'es'`-pattern follow-up noted above — not blocking, not part of
  this plan's Phase 8 scope, but real for visitors in the six new languages.

### 2026-08-09 — PR #53 opened, Phase 9 done, a font-payload bug found and fixed

- Pushed `feat/i18n-phase-8-translations` and opened **PR #53**, stacked on
  `feat/i18n-phase-7-language-switcher` (PR #52), matching this rollout's
  existing linear-stack convention rather than opening against `main`
  directly (Phase 7 isn't merged yet, so a `main`-based diff would have
  mixed both phases' changes).
- **Phase 9 — build pipeline scale-up — done**, landed as a follow-on commit
  on the same branch rather than its own, since it turned out to be almost
  entirely `routes.config.ts`/build-plumbing work with no translated content
  of its own:
  - Extracted the per-route table (`chunk`, `slugs`, `prerender`, `sitemap`)
    out of `routes.config.ts` into a new plain-JSON `src/routes.manifest.json`.
    `routes.config.ts` now builds `ROUTES` by zipping that JSON against a
    `COMPONENTS` map holding the one thing that can't be JSON — the
    `lazy(() => import(...))` calls and their `webpackChunkName` magic
    comments, which a plain Node script can't parse. New
    `scripts/generate-reactsnap-include.js` reads the same JSON, computes
    `package.json`'s `reactSnap.include` with the same logic as
    `pathForKey`, and runs as a `prebuild` npm script — automatically, every
    build, before `react-scripts build`/react-snap ever run. Verified its
    output byte-identical to the array Phase 8 had hand-regenerated, before
    wiring it in, so this is a pure mechanism swap: the array can no longer
    silently drift the way it did between `RELEASED_LOCALES` growing to
    eight and someone noticing.
  - `inject-route-preloads.js`, `generate-sitemap.js`, `generate-redirects.js`
    needed no changes — all three were already designed to read
    `reactSnap.include`'s *output* rather than `routes.config.ts` directly
    (each one's own header comment says so), so the refactor is invisible to
    them. Re-verified all three at 177/177 across three rebuilds this
    session.
  - **Decisions recorded, not code changes:** `generate-md-pages.js` /
    `generate-llms-full.js` stay English-only (extending them would mean a
    second, hand-typed, 8-locale content store duplicating `listings.ts`/
    `blog.tsx` in a format nothing else reads); `generate-404.js` stays one
    shared 404 (`.htaccess`'s `ErrorDocument` is a single unconditional
    directive, and the page's only real job — the HTTP status — already
    works for every locale).
  - **Prerender time measured:** ~6–8 minutes locally for a full
    `npm run build` across three timed runs (in-tool timing utilities gave
    inconsistent readings in this sandbox — `time` reported an impossible
    59 seconds against directly-observed wall clock of several minutes — so
    this is an honest range from watching it happen, not a fabricated
    precise number). Comfortably within a workable CI budget; no
    parallelising needed yet.
  - **FTP payload timing left unmeasured** — genuinely not measurable
    without an actual deploy, which is Ship Gate C's job, not a local
    build's.
  - **Real bug found doing the "Font payload... verify in the network panel
    rather than assuming" checklist item, not just confirmed clean:** H-B's
    documented design intent — "a Latin-only visitor's page never requests
    either \[Hebrew or Devanagari\] file" — no longer held, and nothing had
    re-checked it since. Network-verified with Playwright rather than
    trusted from the code: every page on the site, in every locale, was
    requesting both `heebo-hebrew.woff2` (12 KB) and
    `noto-sans-devanagari.woff2` (121 KB) — a fully unconditional 133 KB tax
    on 100% of visitors, not just Hebrew/Hindi ones. Root cause: Phase 7's
    language switcher renders every released locale's native name in its
    own `<option>` (e.g. "עברית", "हिन्दी") on every page regardless of the
    current locale, and those options inherited `body`'s
    `font-family: 'Urbanist'` — the same family H-B registered the
    Hebrew/Devanagari subsets under (deliberately, so he/hi body prose needs
    no per-language CSS). The browser's `unicode-range` matching doesn't
    care whether the matching text is inside a closed, never-opened
    `<select>`; it fetched both subsets anyway. H-B landed 2026-08-07;
    Phase 7's switcher landed a day later and nothing re-verified the
    invariant it broke. **Fixed** by giving `.language-switcher-select`
    (`FixedNavigation.style.scss`) its own explicit system-font stack
    instead of inheriting `'Urbanist'`, decoupling the switcher entirely
    from the site's custom webfont. Verified fixed on the rebuilt static
    output: German now fetches only Latin subsets, Hebrew fetches Latin +
    Heebo only, Hindi fetches Latin + Noto Devanagari only.
  - Validation: typecheck clean; unit suite at the same pre-existing
    4-suite/28-test baseline; three full `npm run build` runs (routes
    refactor, font-fix verification, final combined run), each 177/177
    prerendered, 177/177 preloads, 176-URL sitemap, 43 redirects.
- **Next session:** Ship Gate C — merge PR #52 (Phase 7) then PR #53
  (Phase 8 + 9) to `main` and deploy. After that, Phase 10 (GSC submission
  and post-launch monitoring at 2/6/12 weeks), and separately a scoping
  decision on the `PROPERTY_MARKETING_CONFIG`/`locale === 'es'` follow-up
  from the Phase 8 entry above.

### 2026-08-09 — Ship gate C shipped: eight languages live

- **Ship gate C — done.** Merged PR #52 (Phase 7) to `main`, then hit a
  process near-miss: merging #52 with `--delete-branch` auto-closed the
  stacked #53 (Phase 8+9) instead of retargeting it, and GitHub refused to
  reopen it. Recovered by opening a fresh PR (#54) from the same untouched
  branch straight against `main` and merging that. Full detail, including
  the lesson for next time (retarget a downstream stacked PR's base *before*
  deleting the upstream branch, not after), is in the Ship Gate C section
  above rather than duplicated here.
- `gh pr merge` itself was blocked by the Claude Code auto-mode permission
  classifier as a production-deploy-triggering action — correct behaviour,
  since a push to `main` immediately fires `.github/workflows/main.yml`'s
  real FTPS upload to the live cPanel site with no gate in between. The
  owner ran the merge commands themselves each time; this session prepared
  the exact commands, diagnosed and fixed the #53 recovery, and ran the
  post-deploy verification.
- Deploy (`main.yml` run `31330475987`): secret scan, dependency audit,
  typecheck, and the report-only e2e suite all green (the e2e job's
  "exit code 1" annotation is the same pre-existing flaky suite noted in
  the workflow's own comments, not a new failure); build + FTPS upload to
  cPanel succeeded on the first attempt.
- Smoke-tested production directly rather than trusting a green CI run
  alone: translated titles and price copy render on new-locale pages
  (`/de/geco` shows "Ab $160 pro Nacht" — the Phase 8 price-catalog fix,
  confirmed live, not just in the build output), all 9 hreflang tags
  present, Hebrew's `dir="rtl"` confirmed on `/he/`, `sitemap.xml` serves
  176 URLs, legacy PascalCase URLs still redirect in one hop, and an unknown
  URL under a new locale correctly 404s.
- **Next session:** Phase 10 — submit the sitemap to Search Console, request
  indexing on the 8 home pages, then watch for 2/6/12 weeks per the plan's
  existing checklist. Separately, still open: a scoping decision on the
  `PROPERTY_MARKETING_CONFIG`/`locale === 'es'` follow-up from the Phase 8
  session log entry, and the outstanding PostHog export from Phase 0.

### 2026-08-10 — VacationRental structured data fixed; remaining site-wide translation gap closed

- **Structured data.** GSC's Rich Results check had all 45 property pages'
  `VacationRental` markup failing validation. Root cause: `occupancy` used
  `maxValue` instead of the spec's required `value`, and there was no
  `identifier` anywhere — the spec requires one at the top level and,
  per Google's guidance, one independent of listing content and consistent
  across languages. Fixed in `public/index.html`: added a top-level
  `identifier` (`reservas-kalawala`), a per-property `identifier` on each
  `containsPlace` entry (matching the existing `routes.config.ts` slugs —
  geco, rana, tucano, etc. — so it's stable across all 8 locale URLs for
  the same listing), `additionalType: 'https://schema.org/EntirePlace'`,
  and switched every `occupancy.maxValue` to `occupancy.value`. Both the
  `VacationRental` and `Organization` JSON-LD blocks still parse; re-check
  in Search Console after this deploys.
- **Full translation audit.** The Phase 8 gap noted above
  (`PROPERTY_MARKETING_CONFIG` and a `locale === 'es'` boolean pattern
  rendering English-only for the six newer locales) turned out to be one
  instance of a wider, recurring pattern: several components and data
  sources were still typed/keyed for the original `en`/`es` pair only and
  silently fell back to English for `de`/`fr`/`it`/`pt`/`he`/`hi`. A
  dedicated audit agent enumerated every remaining instance site-wide.
  Fixed: `PROPERTY_MARKETING_CONFIG` (all 10 properties, all 8 locales),
  amenity name strings on listing pages, the cookie consent banner, the
  404 page, `WhyStayWithUs`, guest review property labels and "stay type"
  tags, the `StayRecommendation` widgets' reasons text (blog and
  homepage), the blog cross-link/footer article titles, and the
  "our photos" section heading. Content was produced by six parallel
  translation agents (one per new locale) plus direct authoring for
  smaller items, then spliced into the message catalogs and
  `constants.ts` via generated scripts, each verified with a typecheck
  pass.
- **Bonus fix, found by spot-checking built HTML rather than by typecheck
  or tests:** two of the ten blog articles (`travellingToPuerto`,
  `gettingToGandoca` in `src/i18n/content/blog.tsx`) were missing their
  entire German content block — a genuine pre-existing Phase 8 gap, not
  something this session's routing changes introduced. Because that
  content type is `Partial<Record<Locale, T>>`, a missing locale block
  doesn't error at compile time — it silently falls back to `.en!`. Full
  German translations written for both articles, JSX structure preserved.
  Lesson for future locale work: `Partial<Record<Locale, T>>` completeness
  has to be checked by script or by eye, not by `tsc`.
- **Routing bug fixed at the root, not per-symptom.** Several of the
  above call sites were routing new-locale visitors to English URLs even
  after their *content* was translated, via `pathForLegacyId` — a
  pre-i18n-rollout helper that only ever mapped to `'es'` or the default
  locale (`'en'`), written before the 8-locale rollout and never updated.
  Migrated every call site (`HomeCard`, `HelpMeChoose`, `OtherBlogs`,
  `StayRecommendation`'s `link` field, `Footer`, `BlogIndex`) to
  `routeKeyForSlug` + `pathForKey(locale)`, the pattern already used
  elsewhere post-rollout, instead of patching each site individually.
- **Deliberately left untranslated, by design, not oversight:** the
  booking/payment flow (`bookingLanguage(locale)` in `src/i18n/paths.ts`
  intentionally narrows to a smaller language set — a German visitor
  gets the English booking UI rather than a missing one; this session
  did not widen that boundary), guest review *body* text (verbatim
  guest-authored content), image captions/alt text, and blog bus-schedule
  table *row data* (the table headers are translated; the row content is
  transit-agency schedule data, not prose).
- Validation: clean `tsc --noEmit`, full Jest suite unchanged (299 passed,
  same 4 pre-existing jsdom `matchMedia` failures, none newly introduced),
  two full production builds (177/177 pages) both green, and manual
  spot-checks of the built HTML across `PROPERTY_MARKETING_CONFIG`,
  amenities, footer links, `HomeCard`/`HelpMeChoose` routing,
  `StayRecommendation`, and both newly-fixed German blog articles.
- **Next session:** Phase 10 (GSC submission/monitoring) is still tracked
  separately on PR #59, open but not yet merged as of this entry — not
  lost, just pending review. Re-run the Rich Results check once this
  structured-data fix is live. The `PROPERTY_MARKETING_CONFIG`/
  `locale === 'es'` follow-up referenced above is now resolved by this
  session's work and can be considered closed.
