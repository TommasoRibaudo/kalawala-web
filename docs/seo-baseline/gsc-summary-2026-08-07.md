# GSC baseline — captured 2026-08-07

Owner-provided export for [Phase 0](../i18n-rollout-plan.md#phase-0--baseline-capture-and-safety-net).
Raw CSVs (Search Console's UI language is Italian, left untranslated) sit
alongside this file:

| File | Tab |
|---|---|
| `gsc-performance-daily-2026-08-07.csv` | Performance → chart, daily clicks/impressions |
| `gsc-performance-queries-2026-08-07.csv` | Performance → Queries (1,000 rows) |
| `gsc-performance-pages-2026-08-07.csv` | Performance → Pages (82 rows) |
| `gsc-performance-countries-2026-08-07.csv` | Performance → Countries |
| `gsc-performance-devices-2026-08-07.csv` | Performance → Devices |
| `gsc-performance-search-appearance-2026-08-07.csv` | Performance → Search appearance (0 rows — no rich-result features active) |
| `gsc-coverage-daily-2026-08-07.csv` | Indexing → Pages, chart |
| `gsc-coverage-critical-issues-2026-08-07.csv` | Indexing → Pages, critical issues |
| `gsc-coverage-noncritical-issues-2026-08-07.csv` | Indexing → Pages, non-critical issues (empty — none reported) |

## ⚠️ Date range is 6 months, not 16

`Filtri.csv` records the export's date filter as **"Ultimi 6 mesi"** (last 6
months: 2026-02-06 → 2026-08-05). The Phase 0 checklist calls for **16
months** — the full retention window — specifically because it "cannot be
done retroactively." This export is still useful (see below) but does not
satisfy that item yet.

**Nothing is lost yet** — GSC still holds the full 16 months today. Re-export
before it ages further:

1. Search Console → property `reservaskalawala.com` → **Performance → Search
   results**.
2. Date range picker → **Custom** → set the start date back as far as it
   allows (up to 16 months) rather than the "Last 6 months" preset.
3. **Export → Download CSV**, drop the new zip next to this one. It's fine to
   overwrite these files — the 6-month data is a subset of the 16-month pull.

## Indexing snapshot (from the coverage chart, latest day: 2026-07-23)

- **54 pages indexed, 7 not indexed** (61 known pages tracked in this trend —
  more than the current 45 prerendered routes, likely including historically
  crawled URLs from before recent page retirements).
- Critical issues (`gsc-coverage-critical-issues`):
  - **6 pages** — "Crawled, currently not indexed" (Google's systems, no
    action taken yet)
  - **1 page** — "Discovered, currently not indexed" (validation "passed" —
    i.e. previously flagged, now resolved)
  - **0 pages** — "Duplicate, Google chose different canonical than user" —
    the exact failure mode Risk R3 (non-reciprocal hreflang) and the Phase 10
    checklist call out. Zero today is the pre-migration baseline to watch
    against after Phase 6/Phase 10 ship.
- No non-critical issues reported.

## Performance headlines (6-month window)

- **1,592 mobile clicks vs 380 desktop vs 20 tablet** — mobile is the
  dominant surface; this is the traffic Phase 8's German-text-expansion
  screenshot check (R7) and the mobile switcher layout (Phase 7) most need to
  protect.
- **Costa Rica (1,557 clicks) dominates**, followed by the US (121), UK (54),
  Spain (39) — consistent with a mostly Spanish/English-speaking, in-country
  audience today. Useful context for judging DE/FR/IT/PT/HE/HI demand in
  Phase 10 (Risk R13) — there is currently ~0 baseline organic traffic from
  those markets to compare against.
- **Blog content, not the homepage, drives search traffic.** Top pages by
  clicks: `/bushours` (459), `/bushoursES` (386), `/bestTimeToVisitPuertoES`
  (264), `/HomeES` (240), `/` (128), `/gettingtogandocaES` (88),
  `/cahuitaparkwhattodo` (59), `/gettingtogandoca` (51),
  `/indigenousTravelPV` (47), `/bestTimeToVisitPuerto` (44). Seven of the top
  ten are blog articles. This is the evidence behind the plan's locked
  decision to include the full blog in the language rollout rather than
  scoping it out (Risk R9 accepted that tradeoff) — these articles are
  carrying real search demand today, not just the property pages.
- Top queries are brand and bus-schedule terms (`reservas kalawala`, `kalawala
  puerto viejo`, `mepe bus costa rica`, `mepe bus`, `mepe puerto viejo`) —
  again pointing at the `/bushours` article as a significant, non-branded
  acquisition channel worth protecting through the URL migration (Phase 5).

## Still outstanding from Phase 0

- [ ] Re-export GSC performance at 16 months (see above).
- [ ] GSC indexing screenshot (`gsc-indexing-2026-08-07.png`) — this CSV
      export covers it numerically (54 indexed / 7 not, above), but the
      README calls for a screenshot too; optional given the CSV has the data.
- [ ] PostHog organic sessions by language (EN vs ES, 12 months) — not yet
      provided.
