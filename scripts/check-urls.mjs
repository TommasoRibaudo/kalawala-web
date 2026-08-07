#!/usr/bin/env node
/**
 * URL inventory checker for the i18n rollout (docs/i18n-rollout-plan.md).
 *
 * Two modes:
 *
 *   capture   Walk every route in package.json -> reactSnap.include against a
 *             live origin and record final status + redirect hop count into
 *             docs/seo-baseline/url-status-<date>.json.
 *
 *   verify    Re-walk a saved baseline and fail if any URL stopped resolving,
 *             or (once Phase 5 lands the 301 map) takes more than one hop.
 *             Chained redirects leak link equity and Google reports them, so
 *             hop count is asserted, not just the final status.
 *
 * Phase 0 uses capture. Phase 5 and Phase 10 use verify.
 *
 *   node scripts/check-urls.mjs capture
 *   node scripts/check-urls.mjs verify docs/seo-baseline/url-status-2026-08-06.json
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = process.env.ORIGIN || 'https://www.reservaskalawala.com';
const CONCURRENCY = 4; // polite against a shared cPanel host

/** Follow redirects by hand so we can count hops rather than just see the end. */
async function trace(url) {
  const chain = [];
  let current = url;

  for (let i = 0; i < 10; i++) {
    let res;
    try {
      res = await fetch(current, { redirect: 'manual' });
    } catch (err) {
      return { url, status: 0, hops: chain.length, chain, error: String(err.cause?.code || err.message) };
    }

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      if (!location) return { url, status: res.status, hops: chain.length, chain, error: 'redirect without location' };
      current = new URL(location, current).toString();
      chain.push({ status: res.status, to: current });
      continue;
    }
    return { url, status: res.status, hops: chain.length, chain, final: current };
  }
  return { url, status: 0, hops: chain.length, chain, error: 'too many redirects' };
}

async function pool(items, worker) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (next < items.length) {
        const i = next++;
        results[i] = await worker(items[i]);
      }
    }),
  );
  return results;
}

function routes() {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const list = pkg.reactSnap?.include || [];
  if (!list.length) {
    console.error('[check-urls] reactSnap.include is empty.');
    process.exit(1);
  }
  return list;
}

async function capture() {
  const list = routes();
  console.log(`[check-urls] capturing ${list.length} routes against ${ORIGIN}`);

  const results = await pool(list, async (route) => {
    const r = await trace(ORIGIN + (route === '/' ? '/' : route));
    console.log(`  ${String(r.status).padEnd(3)} ${r.hops ? `(${r.hops} hop) ` : ''}${route}${r.error ? ` -- ${r.error}` : ''}`);
    return { route, ...r };
  });

  const stamp = new Date().toISOString().slice(0, 10);
  const outDir = path.join(ROOT, 'docs', 'seo-baseline');
  fs.mkdirSync(outDir, { recursive: true });
  const label = process.argv.find((a) => a.startsWith('--label='))?.slice(8);
  const out = path.join(outDir, `url-status-${stamp}${label ? `-${label}` : ''}.json`);

  // Refuse to clobber. The pre-migration baseline cannot be recreated once the
  // URLs move, and re-running capture on the same day would otherwise silently
  // overwrite it with a post-change snapshot — which is precisely the failure
  // this directory exists to prevent. (It nearly happened: a re-run replaced the
  // 49-route baseline with a 45-route one.)
  if (fs.existsSync(out) && !process.argv.includes('--force')) {
    console.error(`[check-urls] ${path.relative(ROOT, out)} already exists.`);
    console.error('[check-urls] Pass --label=<name> to write a separate file, or --force to overwrite.');
    process.exit(1);
  }

  fs.writeFileSync(out, JSON.stringify({ origin: ORIGIN, capturedAt: new Date().toISOString(), results }, null, 2));

  const ok = results.filter((r) => r.status === 200).length;
  const redirected = results.filter((r) => r.hops > 0).length;
  const broken = results.filter((r) => r.status !== 200);

  console.log(`\n[check-urls] ${ok}/${results.length} returned 200, ${redirected} redirected`);
  if (broken.length) {
    console.log('[check-urls] NOT 200:');
    for (const b of broken) console.log(`  ${b.status} ${b.route} ${b.error || ''}`);
  }
  console.log(`[check-urls] wrote ${path.relative(ROOT, out)}`);
}

async function verify(baselinePath) {
  if (!baselinePath || !fs.existsSync(baselinePath)) {
    console.error('[check-urls] verify needs a baseline file: node scripts/check-urls.mjs verify <file>');
    process.exit(1);
  }
  const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
  console.log(`[check-urls] verifying ${baseline.results.length} baseline URLs against ${ORIGIN}`);

  const failures = [];
  await pool(baseline.results, async (entry) => {
    const r = await trace(entry.url.replace(baseline.origin, ORIGIN));
    if (r.status !== 200) {
      failures.push(`${r.status} ${entry.route} (was ${entry.status})`);
    } else if (r.hops > 1) {
      // A single 301 to the new locale-prefixed URL is expected post-Phase 5.
      // More than one means a redirect chain.
      failures.push(`${r.hops} hops ${entry.route} -> ${r.final}`);
    }
  });

  if (failures.length) {
    console.error(`\n[check-urls] ${failures.length} FAILED:`);
    for (const f of failures) console.error(`  ${f}`);
    process.exit(1);
  }
  console.log('\n[check-urls] all baseline URLs resolve in at most one hop.');
}

const [mode, arg] = process.argv.slice(2);
if (mode === 'capture') await capture();
else if (mode === 'verify') await verify(arg);
else {
  console.error('usage: node scripts/check-urls.mjs capture | verify <baseline.json>');
  process.exit(1);
}
