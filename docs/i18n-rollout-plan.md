# i18n Rollout — German, French, Italian, Portuguese

Living plan for taking reservaskalawala.com from EN/ES to six languages
(EN, ES, DE, FR, IT, PT), including the URL migration, the flag combo box,
publishing, and Google Search Console.

**This document is the source of truth between sessions.** Update the Status
block and the Session Log at the end of every working session, and tick the
checkboxes as phases land. A new session should be able to read this file and
resume without re-investigating the codebase.

---

## Status

| | |
|---|---|
| **Current phase** | Phase 0 — in progress, partly blocked |
| **Last updated** | 2026-08-06 |
| **Branch(es) in flight** | `chore/i18n-phase-0-baseline` |
| **Blocked on** | **Owner action:** Google Search Console + PostHog exports — see [`seo-baseline/README.md`](seo-baseline/README.md). The GSC export cannot be done retroactively. |

Phase progress:

- [ ] Phase 0 — Baseline capture and safety net *(automated parts done; GSC/PostHog exports outstanding)*
- [ ] Phase 1 — Locale foundation (`isSpanish` → `locale`)
- [ ] Phase 2 — Message catalogs
- [ ] Phase 3 — Collapse duplicated page components
- [ ] **Ship gate A — EN/ES refactor released, zero visible change**
- [ ] Phase 4 — Route restructure to `/:locale/`
- [ ] Phase 5 — 301 redirect map
- [ ] Phase 6 — SEO head, hreflang, sitemap
- [ ] **Ship gate B — URL migration released, still EN/ES only**
- [ ] Phase 7 — Language switcher combo box
- [ ] Phase 8 — Translated content for DE/FR/IT/PT
- [ ] Phase 9 — Build pipeline scale-up
- [ ] **Ship gate C — six languages live**
- [ ] Phase 10 — Google Search Console and post-launch monitoring

---

## Locked decisions

Decided 2026-08-06. Change these only deliberately — later phases assume them.

| Decision | Choice | Consequence |
|---|---|---|
| URL scheme | **Path prefix** — `/de/plumeria`, `/fr/plumeria` | Requires a 301 map for all ~49 existing URLs. Standard for hreflang and GSC. |
| Blog scope | **Everything, blog included** | All 10 articles in all 6 languages. ~205 prerendered routes at the end, from 49 today. Every future article is a 6-language commitment. |
| Translation production | **Machine translation, published as-is** | No human review gate; fastest path. See Risk R4 — the policy/price/legal string subset is small and bounded, and is worth one read-through even under this choice. |

Still open, decide before Phase 4:

- **Does English keep the bare root or move to `/en/`?** Recommendation: keep `/`
  as the canonical English home and *also* serve `/en/` as a 301 → `/`. This
  preserves the strongest existing URL in the index while keeping the scheme
  regular. Every other English page moves to `/en/...`.
- **Which locale does an unknown/unmatched `Accept-Language` get?** Recommendation:
  English, with `x-default` hreflang pointing at it.

---

## Ground truth (surveyed 2026-08-06, commit `bfc3bef`)

Recorded so future sessions don't re-derive it. Re-verify with the commands in
each row if the tree has moved on significantly.

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
   physically cannot express six languages. Converting it to a `locale` string
   is the single largest mechanical change in this project and gates every
   later phase.

2. **Language is expressed by duplicating whole files.** 49 files / 5,794 lines
   exist purely because Spanish is a copy of English. Naively extending that to
   six languages means ~245 duplicated files and ~29,000 duplicated lines, and
   every future content edit done six times. Phase 3 deletes this pattern rather
   than multiplying it — that deletion is what makes the other four languages
   nearly free.

---

## Target architecture

```
src/i18n/
  index.ts            locale type, default, detection, helpers
  locales.ts          LOCALES = ['en','es','de','fr','it','pt'] + display names, flags
  messages/
    en.ts             UI chrome: nav, buttons, labels, form errors
    es.ts
    de.ts  fr.ts  it.ts  pt.ts
  content/
    listings/         per-property long-form copy, keyed by locale
    blog/             per-article body content, keyed by locale
```

- **One** component per page. Locale arrives from the route via a `useLocale()`
  hook reading the `:locale` route param — not threaded as a prop through 69
  files.
- **Routes generated, not hand-written.** A single `routes.config.ts` describes
  each page once (slug per locale, component, chunk name); the router,
  `reactSnap.include`, the sitemap, and the redirect map are all derived from it.
  This is the mechanism that keeps six languages from drifting.
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

- [x] Add `src/i18n/locales.ts`: `Locale` union type, `LOCALES` (all six),
      `DEFAULT_LOCALE`, `RELEASED_LOCALES`, `LOCALE_META` (native names + flag codes).
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

- [x] Create `src/i18n/messages/{en,es,de,fr,it,pt}.ts`. `en` is the shape source;
      `es` is typed as `Messages`; the four unreleased locales are
      `Partial<Messages>` and currently empty.
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
      the components it renders)
- [ ] **3b — listing pages** (10 pairs)
- [ ] **3c — blog pages** (10 pairs, one at a time, highest risk)
- [ ] **3d — home variants + BlogIndex**, then delete the ES route entries
- [ ] Update `Router.tsx` imports (still the old route shape at this point)

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
- [ ] `FixedNavigation` ×3, `Discover` ×3, `WelcomeSlider` ×3, `OurHomes` ×3,
      `OurOtherHomes` ×3, `OtherBlogs`, `ListingAd`, `OtherListings`

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

- [ ] Per-page `<Helmet>` emits the **full 6-way hreflang matrix** plus
      `x-default`. Currently hardcoded EN/ES per page — generate from
      `routes.config.ts` instead.
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

- [ ] Combo box (dropdown) listing all six languages with flag + native language
      name (`Deutsch`, `Français`, `Italiano`, `Português`) — never the English
      exonym.
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
- [ ] The nav is currently duplicated six ways
      (`FixedNavigation.component{,ES,Nam,NamES,RIB,RIBES}.tsx`) — these collapse
      in Phase 3; confirm the switcher is added once, not six times.

**Validation:** keyboard-only walkthrough; mobile viewport screenshot; switching
locale on a deep listing page lands on the same property, not the homepage.

### Phase 8 — Translated content for DE/FR/IT/PT

- [ ] Generate `messages/{de,fr,it,pt}.ts` from `en.ts`.
- [ ] Generate listing content for all 10 properties × 4 locales.
- [ ] Generate blog content for all 10 articles × 4 locales.
- [ ] Run the key-parity CI check — all six locales must have identical key sets.
- [ ] Localise formatting, not just words: dates, currency, and number formats via
      `Intl`. A German guest seeing `8/6/2026` reads it as 8 June.
- [ ] Check text expansion. German runs ~30% longer than English and will break
      tight layouts — the nav, buttons, and card CTAs are the usual casualties.
      Screenshot every locale at mobile width.

**Validation:** typecheck; key parity; screenshot every locale's home + one
listing at 375px and 1440px.

### Phase 9 — Build pipeline scale-up

The route count goes from 49 to roughly 205. Every postbuild script must be
derived from `routes.config.ts` rather than hand-maintained.

- [ ] `reactSnap.include` generated from the config (script writes it, or the
      config is read directly).
- [ ] `scripts/inject-route-preloads.js` — confirm it handles the new chunk names.
- [ ] `scripts/generate-md-pages.js` and `generate-llms-full.js` — extend to all
      locales, or deliberately restrict to EN/ES and record that choice here.
- [ ] `scripts/generate-404.js` — decide whether each locale gets its own 404.
      `.htaccess` has a single `ErrorDocument`, so a per-locale 404 needs
      additional rules.
- [ ] **Measure prerender time.** react-snap runs a headless Chrome per route;
      ~205 routes will take roughly 4× today's. If CI time becomes painful,
      parallelise or shard before it blocks releases.
- [ ] **Measure the FTP payload.** The deploy currently syncs ~50 pages in ~14
      minutes and the cPanel server already drops connections under load — that is
      exactly what PR #36's retry was added for. At 4× the file count the retry
      stops being a nicety. If uploads become unreliable, revisit: batch the
      upload, or move off FTP.

**Validation:** full `npm run build` locally, end to end, with timings recorded
in the Session Log.

### 🚢 Ship gate C — six languages live

### Phase 10 — Google Search Console and post-launch monitoring

- [ ] Submit the updated `sitemap.xml`. One sitemap containing all locales with
      hreflang is fine at this size; sitemap indexes are unnecessary below ~50k URLs.
- [ ] Confirm `public/robots.txt` still advertises the right sitemap URL. Note
      the comment in `generate-sitemap.js`: robots.txt pointed at a sitemap that
      did not exist for a long time — re-verify rather than assume.
- [ ] Use **URL Inspection → Request indexing** on the six home pages and a
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
Realistically expect meaningful DE/FR/IT/PT impressions to take 1–3 months.
Nothing in GSC makes this instant.

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
| R8 | Locale catalogs drift as features are added | Key-parity CI check from Phase 2 onward — it must be a blocking check, not a warning. |
| R9 | Every future blog post is now a 6-language commitment | Consequence of the locked blog decision. Worth a written editorial policy once this ships. |

---

## Sequencing rationale

The three ship gates are the most important structural choice in this plan.

The instinct is to do the refactor, the URL change and the four languages in one
release. Don't. Each is independently risky, and released together their effects
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
