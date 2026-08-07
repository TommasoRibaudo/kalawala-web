# SEO baseline — captured before the i18n URL migration

Phase 0 of [`../i18n-rollout-plan.md`](../i18n-rollout-plan.md).

**Why this exists:** the rollout moves every URL on the site to a locale prefix
(`/Plumeria` → `/en/plumeria`). Once that ships, there is no way to reconstruct
what traffic and indexing looked like beforehand. This directory is the only
record of "before", and it is what the post-launch comparison in Phase 10 is
measured against.

Captured **2026-08-06**, against production, at commit `095d7ad`.

---

## What is already here

| File | What it is |
|---|---|
| `sitemap-2026-08-06.xml` | Live sitemap as served. 48 URLs, 144 `xhtml:link` hreflang alternates. |
| `robots-2026-08-06.txt` | Live robots.txt. Confirmed it advertises the sitemap correctly. |
| `url-status-2026-08-06.json` | Every route in `reactSnap.include` traced against production: final status, redirect hop count, full chain. |

Regenerate the URL trace at any time with:

```bash
node scripts/check-urls.mjs capture
```

After Phase 5 lands the 301 map, the same script asserts that every one of these
URLs still resolves in **at most one hop**:

```bash
node scripts/check-urls.mjs verify docs/seo-baseline/url-status-2026-08-06.json
```

---

## Finding: every URL already costs a redirect

All 49 routes return 200, but **48 of them take a 301 first**. Only `/` is direct.

```
https://www.reservaskalawala.com/Geco
  -> 301 https://www.reservaskalawala.com/Geco/
```

This is Apache `mod_dir`'s `DirectorySlash`: the build emits `Geco/index.html`,
so a request for `/Geco` is redirected to `/Geco/` before it is served.

Two consequences, both of which predate the i18n work:

1. **The sitemap and the canonical tags point at redirecting URLs.** The sitemap
   lists `/Geco`, and `ListingGeco.page.tsx` declares
   `<link rel="canonical" href="https://www.reservaskalawala.com/Geco" />` — but
   the served URL is `/Geco/`. Every hreflang alternate has the same mismatch.
   Google resolves this, but it is a muddled signal for free.

2. **It breaks the Phase 5 single-hop rule by default.** A naive
   `/PlumeriaES` → `/es/plumeria` redirect becomes a two-hop chain, because
   `DirectorySlash` then sends `/es/plumeria` → `/es/plumeria/`. Redirect targets
   in the 301 map **must include the trailing slash**, or every migrated URL
   chains. This is the single most useful thing this baseline turned up.

Decide during Phase 6 whether canonical URLs and the sitemap adopt the trailing
slash (matching what is served) or whether `.htaccess` is changed to serve
without it. Either is fine; the current split is not.

---

## GSC export received — 2026-08-07, partial

The owner provided a full Performance export (all tabs: pages, queries,
countries, devices, search appearance, daily chart) and a full Coverage
export (indexing chart, critical/non-critical issues). Both are in this
directory (`gsc-*-2026-08-07.csv`); see
[`gsc-summary-2026-08-07.md`](gsc-summary-2026-08-07.md) for the read-out.

**One thing still needs redoing:** the Performance export used Search
Console's "Last 6 months" preset (2026-02-06 → 2026-08-05), not the 16-month
window this checklist calls for. GSC still has the full 16 months as of this
writing, so nothing is lost — but it should be re-pulled with a custom
16-month range before that window rolls forward. See the summary doc for the
exact steps.

## Still to capture — needs your account access

### 1. Google Search Console — indexing snapshot

- **Indexing → Pages**. Record the number of **indexed** vs **not indexed** pages
  and the breakdown by reason.
- A screenshot saved as `gsc-indexing-2026-08-07.png` is enough — though the
  2026-08-07 coverage CSV already has these numbers (54 indexed / 7 not, see
  the summary doc), so this is now optional rather than blocking.

### 2. PostHog — organic sessions by language

- Monthly organic sessions for the last 12 months, split EN vs ES (the URL suffix
  `ES` separates them today — after the migration it will be the `/es/` prefix).
- Save as `posthog-sessions-2026-08-06.csv`.

### Why 16 months

Search Console retains 16 months and silently drops everything older. Whatever is
not exported before the migration is not recoverable afterwards, which is why
this is the first task in the plan rather than a later one.

---

## Lighthouse

Scores for `/`, `/HomeES`, `/Geco` and `/twodaysinpuertoviejo` go in
`lighthouse-2026-08-06.md` when captured:

```bash
npm run build          # needs the full prerender; Lighthouse serves build/
node scripts/lighthouse-run.mjs --runs=3 --label=i18n-baseline
```

Unlike the GSC export, this one **is** reproducible later — the script runs
against a build from any commit, so a missed Lighthouse baseline can be
recreated from git history. Do not let it block the phase.
