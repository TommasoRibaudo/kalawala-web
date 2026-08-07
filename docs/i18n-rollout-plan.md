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
| **Current phase** | **Phase 3 complete.** Ship gate A — next: merge the stack, release as a no-op, watch GSC/PostHog for a week. **Nothing merged yet.** |
| **Last updated** | 2026-08-07 |
| **Branch(es) in flight** | A nine-deep stack, based on `main`: **#39** → **#40** → **#41** → **#42** → **#43** → **#44** → **#45** → **#46** → **#47**. See [Merge order](#merge-order) — they must land in that sequence. |
| **Blocked on** | **Owner action:** PostHog export (organic sessions, EN vs ES, 12 months) still outstanding — the only open Phase 0 item. **Resolved:** GSC performance re-exported at the full 16 months; Hebrew/Hindi fonts (H-B) pulled from Google Fonts. None of this blocks Phase 3c–3d. |

Phase progress:

- [ ] Phase 0 — Baseline capture and safety net *(automated parts done; GSC/PostHog exports outstanding)*
- [x] Phase 1 — Locale foundation (`isSpanish` → `locale`) — PR #40
- [x] Phase 2 — Message catalogs — PR #41
- [x] Phase 3 — Collapse duplicated page components (3a, 3b, 3c, 3d) — **zero duplicated pages remain in `src/pages/`**
- [ ] **Ship gate A — EN/ES refactor released, zero visible change** *(next)*
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
- [x] H-B — font subsets — PR #44 area, landed 2026-08-07 (see [H-B](#h-b--fonts--2026-08-07))
- [ ] H-C1/C2 — `dir="rtl"` on `<html>`, Bootstrap RTL stylesheet *(needs Phase 4)*
- [ ] H-C4 — `react-slick` carousel mirroring
- [ ] H-E/H-F — language redirect + hreflang *(needs Phase 4)*

### Merge order

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
