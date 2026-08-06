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
| **Current phase** | Phase 0 — not started |
| **Last updated** | 2026-08-06 |
| **Branch(es) in flight** | none |
| **Blocked on** | nothing |

Phase progress:

- [ ] Phase 0 — Baseline capture and safety net
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
"before" looked like.

- [ ] Export current Google Search Console performance: 16 months, by page and by
      query, for both EN and ES URLs. Save as CSV in `docs/seo-baseline/`.
- [ ] Record current indexed page count per URL pattern (GSC → Pages).
- [ ] Save the current `sitemap.xml` from production.
- [ ] Run Lighthouse on `/`, `/HomeES`, one listing, one blog article; record scores
      (`npm run lh`).
- [ ] Write down current monthly organic sessions per language from PostHog.

**Validation:** the baseline CSVs exist and are committed. This phase is the only
insurance against "did the migration hurt us?" being unanswerable.

### Phase 1 — Locale foundation

- [ ] Add `src/i18n/locales.ts`: `Locale` union type, `LOCALES`, display names,
      flag codes, `DEFAULT_LOCALE`.
- [ ] Add `useLocale()` hook + `LocaleProvider`, reading from the route param
      (falls back to `en` until Phase 4 lands the routes).
- [ ] Mechanically replace `isSpanish: boolean` with `locale: Locale` across all
      69 files. At this stage every call site passes `'en'` or `'es'` — behaviour
      is unchanged.
- [ ] Replace the 49 inline `isSpanish ? a : b` ternaries with catalog lookups
      (Phase 2 provides the catalog; stub it with an `en`/`es` map first).
- [ ] Delete `isSpanishPath()` string math from `Flag.component.tsx`; locale now
      comes from the route, not from guessing at a suffix.

**Validation:** `npx tsc --noEmit` clean; `npm run test:e2e`; manual pass over
`/` and `/HomeES` confirming zero visual change. The TypeScript union is doing
the heavy lifting here — a missed call site is a compile error, not a runtime bug.

**Risk:** this is a 69-file mechanical diff. Keep it *purely* mechanical — no
behaviour changes, no cleanups riding along, or review becomes impossible.

### Phase 2 — Message catalogs

- [ ] Create `src/i18n/messages/{en,es}.ts`. Populate from the existing ternaries
      and the `{en, es}` blocks already in `constants.ts` (59 of them).
- [ ] Extract listing long-form copy out of the 10 page components into
      `src/i18n/content/listings/`.
- [ ] Extract blog article bodies into `src/i18n/content/blog/`.
- [ ] Add a `t()` accessor with a missing-key policy: throw in development, fall
      back to English in production, and log the miss.
- [ ] Add a CI check that every locale file has the same key set as `en.ts`.
      Without this, six locales silently drift.

**Validation:** key-parity check passes for en/es; typecheck; e2e.

### Phase 3 — Collapse duplicated page components

- [ ] Merge each `*ES.tsx` / `*_ES.tsx` into its English sibling, driven by
      `useLocale()` + catalog lookups. **Delete 49 files / ~5,794 lines.**
- [ ] Same for the 3 home variants and their ES twins.
- [ ] Update `Router.tsx` imports (still the old route shape at this point).

**Validation:** typecheck; e2e; screenshot-diff `/` vs `/HomeES` and a listing
pair against production before/after (`scripts/screenshot-build.mjs` exists).
Any pixel difference here is a bug — this phase must be visually inert.

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
- Nothing implemented yet. **Next session: start Phase 0** — the GSC baseline
  export must happen before any URL work, and it is the one step that cannot be
  done retroactively.
