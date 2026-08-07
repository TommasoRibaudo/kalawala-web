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
| **Current phase** | Phase 3a — in progress. Phases 0–2 complete in code, **nothing merged yet.** |
| **Last updated** | 2026-08-06 |
| **Branch(es) in flight** | A six-deep stack, all open, all based on `main`: **#39** → **#40** → **#41** → **#42** → **#43** → **#44**. See [Merge order](#merge-order) — they must land in that sequence. |
| **Blocked on** | **Owner action:** GSC + PostHog exports (Phase 0) — see [`seo-baseline/README.md`](seo-baseline/README.md); the GSC export cannot be done retroactively. **Owner action:** Hebrew/Devanagari font files (Phase H-B). Neither blocks Phase 3b–3d. |

Phase progress:

- [ ] Phase 0 — Baseline capture and safety net *(automated parts done; GSC/PostHog exports outstanding)*
- [x] Phase 1 — Locale foundation (`isSpanish` → `locale`) — PR #40
- [x] Phase 2 — Message catalogs — PR #41
- [ ] Phase 3 — Collapse duplicated page components *(3a partly done in PR #42; 3b–3d outstanding)*
- [ ] **Ship gate A — EN/ES refactor released, zero visible change**
- [ ] Phase 4 — Route restructure to `/:locale/`
- [ ] Phase 5 — 301 redirect map
- [ ] Phase 6 — SEO head, hreflang, sitemap
- [ ] **Ship gate B — URL migration released, still EN/ES only**
- [ ] Phase 7 — Language switcher combo box
- [ ] Phase 8 — Translated content for DE/FR/IT/PT/HE/HI
- [ ] Phase 9 — Build pipeline scale-up
- [ ] **Ship gate C — eight languages live**
- [ ] Phase 10 — Google Search Console and post-launch monitoring

Hebrew/Hindi track (see [that section](#hebrew-and-hindi--rtl-and-non-latin-scripts)):

- [x] H-A — locale model: `he`/`hi` declared, `dir` per locale — PR #44
- [x] H-C3 — CSS logical properties (207 declarations, 33 files) — PR #44
- [ ] H-B — font subsets **(blocked on owner)**
- [ ] H-C1/C2 — `dir="rtl"` on `<html>`, Bootstrap RTL stylesheet *(needs Phase 4)*
- [ ] H-C4 — `react-slick` carousel mirroring
- [ ] H-E/H-F — language redirect + hreflang *(needs Phase 4)*

### Merge order

The six open PRs are a linear git stack even though GitHub shows every base as
`main`. Merge **#39 → #40 → #41 → #42 → #43 → #44**, in that order; each later
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
> has moved several of these numbers a long way. Measured at the top of the stack
> (`feat/rtl-groundwork-he-hi`):
>
> | Fact | On `main` | Top of stack |
> |---|---|---|
> | `isSpanish` occurrences in `src/` | 364 | **6** (comments and one deprecated shim) |
> | ES-duplicated files | 47 | **27** |
> | `src/i18n/` | does not exist | 17 files |
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
- [ ] **Owner:** export GSC performance, 16 months, Pages + Queries tabs, as CSV.
- [ ] **Owner:** record GSC indexed vs not-indexed page counts.
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

- [ ] **3a — shared components** (leaf-first: a component cannot be merged before
      the components it renders) — **11 merged in PR #42, 5 pairs left**
- [ ] **3b — listing pages** (10 pairs)
- [ ] **3c — blog pages** (10 pairs + `BlogIndex`, one at a time, highest risk)
- [ ] **3d — `Home.pageES`**, then delete the ES route entries
- [ ] Update `Router.tsx` imports (still the old route shape at this point)

**27 duplicated files remain**, down from 47 on `main`: 5 shared components,
10 listing pages, 11 blog files (10 articles + `BlogIndex.page_ES`), and
`Home.pageES`. The table above counted 4 home/index pairs; PR #43 retired the
Namaitami and Villas homes, leaving one.

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

- [ ] `WelcomeSlider` — one pair. Hero copy only, now that the RIB variant is gone.
      Apply the accent fix below when it merges.
- [ ] `OurOtherHomes` — headings plus `redirectPath` locale suffixes
      (`/VillaMarES`), which should move to `localeSuffix()`
- [ ] `Discover` — long prose with inline `<b>` and interpolated constants.
      Belongs in `src/i18n/content/`, not the string catalog, per the rule that
      catalogs stay React-free.
- [ ] `FixedNavigation` — brand href (`/#body` vs `/HomeES`) and booking href
      differ; both should come from `bookingPath()` / the route model
- [ ] `OtherListings` — **take the memoised version**, see below

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

### 🚢 Ship gate A

Release Phases 1–3 to production as a **no-op**. Same URLs, same two languages,
same pixels. Watch GSC and PostHog for a week.

This gate exists so that if rankings or conversions move later, you know whether
the cause was the refactor or the URL change. Skipping it merges two large risks
into one unattributable event.

### Phase 4 — Route restructure to `/:locale/`

- [ ] Add `src/routes.config.ts` — every page declared once: key, component,
      chunk name, per-locale slug, prerender flag, sitemap flag.
- [ ] Rewrite `Router.tsx` to generate routes from the config. Preserve the
      `webpackChunkName` comments — `scripts/inject-route-preloads.js` recomputes
      those names and **fails the build** if one is missing from
      `asset-manifest.json`.
- [ ] Keep `/` as canonical English home; `/en/` 301s to `/`.
- [ ] Locale-aware internal links: every `<Link>`/`href` resolves through a
      `localePath()` helper. Audit for hardcoded paths (`/Plumeria`, `/HomeES`)
      left in components — `HelpMeChoose` and the listing cards both build hrefs
      from a `houseLangCode`, which disappears with this change.

**Validation:** typecheck; e2e; every route in the config resolves in dev; no
hardcoded legacy path remains (`grep -rn '"/\(Home\|Plumeria\|VillaMar\)' src`).

### Phase 5 — 301 redirect map

- [ ] Generate the redirect map from `routes.config.ts` — old URL → new URL for
      all ~49 existing routes. Generated, never hand-written.
- [ ] Emit into `public/.htaccess` as `Redirect 301` / `RewriteRule [R=301,L]`
      entries, above the existing 404 and rewrite blocks.
- [ ] Redirects must be **single-hop**. `/PlumeriaES` → `/es/plumeria` directly,
      never via an intermediate. Chained redirects leak link equity and Google
      reports them.
- [ ] **Targets must carry the trailing slash** — `/es/plumeria/`, not
      `/es/plumeria`. Per the Phase 0 finding, `DirectorySlash` adds its own 301
      otherwise and every migrated URL becomes a two-hop chain. Either emit the
      slash in the map, or disable `DirectorySlash` and serve without it — but
      pick one and make the sitemap, canonicals and hreflang agree.
- [ ] Verify the existing `ErrorDocument 404 /404.html` behaviour still works
      after the new rules (see the comments already in `public/.htaccess`).

**Validation:** a script that curls every baseline URL against the deployed site
and asserts exactly one hop to HTTP 200. Run it against the preview of the build
before merging, and again post-deploy.

### Phase 6 — SEO head, hreflang, sitemap

- [ ] Per-page `<Helmet>` emits the **full 8-way hreflang matrix** plus
      `x-default` (pointing at English, per the locked decision). Currently
      hardcoded EN/ES per page — generate from `routes.config.ts` instead.
- [ ] Hebrew is `he`, Hindi is `hi` — bare language subtags, no region, matching
      the `Locale` union. Do not use `iw` (the obsolete Hebrew code); some
      tooling still emits it and Google treats the two as distinct.
- [ ] hreflang must be **reciprocal**: if `/de/plumeria` lists `/fr/plumeria`,
      the French page must list the German one. Google silently ignores
      non-reciprocal annotations, which is the most common way this is got wrong.
- [ ] `<html lang>` must reflect the actual locale. It is currently static
      `lang="en"` in `public/index.html` — set it per page via Helmet's
      `htmlAttributes` so the prerendered HTML carries the right value.
- [ ] Canonical per page points at itself in its own locale — never cross-locale.
- [ ] Rewrite `scripts/generate-sitemap.js` to build from `routes.config.ts`
      instead of pairing EN/ES by string suffix. The current `esCounterpart()`
      suffix logic must go entirely.
- [ ] Use Portuguese as `pt` unless you specifically want `pt-BR` vs `pt-PT`;
      pick one and be consistent between hreflang, `<html lang>` and GSC.

**Validation:** parse the built `sitemap.xml` and assert every URL has 6
alternates + `x-default`, and that the alternate graph is symmetric. Assert
prerendered HTML for one page per locale carries the right `<html lang>`.

### 🚢 Ship gate B

Release Phases 4–6. **Still only EN and ES content** — the new URL scheme and
the full SEO machinery go live before any new language exists.

Submit the new sitemap to GSC and watch for two weeks. Expect a temporary
ranking wobble while Google reprocesses the 301s; this is normal and recovers.
Confirm the redirect check script passes against production.

### Phase 7 — Language switcher combo box

Replaces the current binary toggle button.

- [ ] Combo box (dropdown) listing all eight languages with flag + native language
      name (`Deutsch`, `Français`, `Italiano`, `Português`, `עברית`, `हिन्दी`) —
      never the English exonym. `LOCALE_META` already carries these.
- [ ] The switcher renders from `RELEASED_LOCALES`, **not** `LOCALES` — a locale
      appears only once its content exists. Adding a language to the switcher is
      therefore a one-line change at the end of Phase 8, not a UI change.
- [ ] The Hebrew and Hindi rows must render in their own script at the correct
      direction even while the surrounding page is LTR. A single `dir="auto"` on
      the option label handles this.
- [ ] Selecting a language navigates to the **same page** in that locale via
      `routes.config.ts`, preserving query and hash. Falls back to that locale's
      home only if the page genuinely has no counterpart.
- [ ] Accessibility: a real `<select>`, or a listbox with proper
      `role`/`aria-expanded`/`aria-activedescendant`, full keyboard operation and
      a visible focus ring. Match the focus-ring treatment used by the listing
      cards (`outline: 2px solid $primary-color; outline-offset: 2px`).
- [ ] **Mobile: the switcher occupies the final line of the menu**, full width,
      below the nav links — per the agreed design.
- [ ] Persist the choice (localStorage) and honour it on next visit, but **never
      auto-redirect a search-engine crawler** based on it; the URL is always
      authoritative.
- [ ] The nav was duplicated six ways
      (`FixedNavigation.component{,ES,Nam,NamES,RIB,RIBES}.tsx`). PR #43 deleted
      the four Nam/RIB copies and Phase 3a merges the remaining EN/ES pair —
      confirm that has landed so the switcher is added once, not twice.

**Validation:** keyboard-only walkthrough; mobile viewport screenshot; switching
locale on a deep listing page lands on the same property, not the homepage.

### Phase 8 — Translated content for DE/FR/IT/PT/HE/HI

**This is the phase that actually produces translations.** Everything before it
is machinery. As of PR #44 the six non-EN/ES catalogs exist but are empty
`Partial<Messages>` stubs of ~14 lines each — not one word is translated.

- [ ] Fill `messages/{de,fr,it,pt,he,hi}.ts` from `en.ts` (~118 lines of UI chrome).
- [ ] Generate listing content for all 10 properties × 6 locales.
- [ ] Generate blog content for all 10 articles × 6 locales.
- [ ] **Flip each filled catalog's type from `Partial<Messages>` to `Messages`.**
      That is what makes the compiler demand completeness — an unflipped catalog
      silently falls back to English forever and nothing fails.
- [ ] Localise formatting, not just words: dates, currency, and number formats via
      `Intl`. A German guest seeing `8/6/2026` reads it as 8 June.
- [ ] Check text expansion. German runs ~30% longer than English and will break
      tight layouts — the nav, buttons, and card CTAs are the usual casualties.
      Screenshot every locale at mobile width.
- [ ] **Hindi and Hebrew need the fonts from H-B in place first**, or every
      screenshot is of a system fallback and the layout check is worthless.
- [ ] Read through the policy/price/legal subset in each locale — check-in and
      check-out times, cancellation terms, house rules, price disclaimers. Per
      Risk R4 this is the one bounded exception to publish-machine-translation-as-is,
      and it is now six languages of it rather than four.
- [ ] Add each locale to `RELEASED_LOCALES` **only** once its content is in.
      That constant, not `LOCALES`, is what the switcher offers.

**Validation:** typecheck; every catalog typed as `Messages`; screenshot every
locale's home + one listing at 375px and 1440px, Hebrew included at both widths.

### Phase 9 — Build pipeline scale-up

The route count goes from **45 to roughly 185** — about 23 pages × 8 locales.
Every postbuild script must be derived from `routes.config.ts` rather than
hand-maintained.

- [ ] `reactSnap.include` generated from the config (script writes it, or the
      config is read directly).
- [ ] `scripts/inject-route-preloads.js` — confirm it handles the new chunk names.
- [ ] `scripts/generate-md-pages.js` and `generate-llms-full.js` — extend to all
      locales, or deliberately restrict to EN/ES and record that choice here.
- [ ] `scripts/generate-404.js` — decide whether each locale gets its own 404.
      `.htaccess` has a single `ErrorDocument`, so a per-locale 404 needs
      additional rules.
- [ ] **Measure prerender time.** react-snap runs a headless Chrome per route;
      ~185 routes will take roughly 4× today's. If CI time becomes painful,
      parallelise or shard before it blocks releases.
- [ ] **Measure the FTP payload.** The deploy currently syncs ~45 pages in ~14
      minutes and the cPanel server already drops connections under load — that is
      exactly what PR #36's retry was added for. At 4× the file count the retry
      stops being a nicety. If uploads become unreliable, revisit: batch the
      upload, or move off FTP.
- [ ] **Font payload.** H-B adds Hebrew and Devanagari `@font-face` blocks.
      Subset them and keep `font-display: swap`; a Latin visitor must not
      download either. `unicode-range` is what makes that automatic — verify in
      the network panel rather than assuming.

**Validation:** full `npm run build` locally, end to end, with timings recorded
in the Session Log.

### 🚢 Ship gate C — eight languages live

### Phase 10 — Google Search Console and post-launch monitoring

- [ ] Submit the updated `sitemap.xml`. One sitemap containing all locales with
      hreflang is fine at this size; sitemap indexes are unnecessary below ~50k URLs.
- [ ] Confirm `public/robots.txt` still advertises the right sitemap URL. Note
      the comment in `generate-sitemap.js`: robots.txt pointed at a sitemap that
      did not exist for a long time — re-verify rather than assume.
- [ ] Use **URL Inspection → Request indexing** on the eight home pages and a
      couple of top listings to prime discovery. Don't bulk-request; it doesn't help.
- [ ] GSC → **Indexing → Pages**: watch for `Alternate page with proper canonical
      tag` and `Duplicate without user-selected canonical`. Either means the
      hreflang/canonical wiring is wrong.
- [ ] GSC → **Enhancements / International Targeting** (where still available):
      check for "no return tag" errors — the reciprocity failure from Phase 6.
- [ ] Watch **Crawl stats** for a spike in 404s — that means a redirect was missed.
- [ ] Re-run the Phase 5 redirect script against production and confirm all
      baseline URLs still resolve in one hop.
- [ ] Compare against the Phase 0 baseline at 2, 6 and 12 weeks. Expect a dip
      around weeks 1–3 and recovery after; escalate only if there is no recovery
      trend by week 6.
- [ ] No `hreflang` in GSC's old International Targeting report? It was retired —
      rely on URL Inspection per page plus the sitemap's `xhtml:link` alternates.

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

### H-B — Fonts ⛔ *blocked on owner*

The site self-hosts Urbanist with **Latin + Latin-Ext subsets only**. Neither
Hebrew nor Devanagari is covered, so both languages currently fall back to a
system sans-serif.

- [ ] **Owner:** supply woff2 files, or confirm pulling them from Google Fonts.
      Suggested pairings: **Heebo** or **Rubik** for Hebrew (both were designed
      alongside Latin faces and sit well next to Urbanist), **Noto Sans
      Devanagari** for Hindi.
- [ ] Add them as `@font-face` blocks that keep `font-family: 'Urbanist'` and
      declare the new `unicode-range`s. The browser then picks per character and
      **no component changes** — this is why it is a CSS-only task.
- [ ] Verify a Latin-only visitor downloads neither file.

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
- [ ] **C1 — `dir` attribute on `<html>`**, driven by `directionOf(locale)` via
      Helmet's `htmlAttributes`, so the prerendered HTML carries it. *Needs
      Phase 4 routes.*
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

### H-E / H-F — Redirect and hreflang *(needs Phase 4)*

- [ ] `.htaccess` `Accept-Language` redirect covering `he` and `hi`, falling back
      to English per the locked decision. Must never fire for crawlers — the URL
      stays authoritative.
- [ ] `he` and `hi` join the 8-way hreflang matrix in Phase 6. Use `he`, not the
      obsolete `iw`.

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
- **Next session:** finish 3a — five pairs left (`WelcomeSlider`,
  `OurOtherHomes`, `Discover`, `FixedNavigation`, `OtherListings`), both
  decisions now recorded above. Then 3b (10 listing pages, near-mechanical).
  Merging the stack is the higher-value move if it can happen first — it is the
  only copy of phases 1–3a, and `main` drifts under it every week.
