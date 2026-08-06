# Lighthouse — i18n-baseline

Median of 3 run(s) per route. gzip on, /static/ immutable.

| Route | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI |
|---|---|---|---|---|---|---|---|---|---|
| `/` | 90 | 96 | 96 | 100 | 1.7 s | 3.6 s | 0 ms | 0 | 1.7 s |
| `/Geco` | 90 | 96 | 96 | 100 | 1.5 s | 3.6 s | 0 ms | 0 | 1.5 s |
| `/HomeES` | 90 | 96 | 96 | 100 | 1.7 s | 3.6 s | 10 ms | 0 | 1.7 s |
| `/twodaysinpuertoviejo` | 89 | 100 | 75 | 100 | 1.4 s | 3.8 s | 0 ms | 0 | 1.4 s |

Reports: lighthouse-reports\i18n-baseline

Captured 2026-08-06 at commit `095d7ad`, mobile emulation, median of 3 runs.

Reproduce with:

```bash
npm run build
node scripts/lighthouse-run.mjs --runs=3 --label=i18n-baseline
```

Note: `/twodaysinpuertoviejo` scores 75 on Best Practices against 96 elsewhere.
That gap predates the i18n work — worth a look on its own, but it is recorded
here only as the "before" number, not as something the rollout should fix.
