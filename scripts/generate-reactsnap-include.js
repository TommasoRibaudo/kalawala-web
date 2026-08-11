#!/usr/bin/env node
/**
 * Writes package.json's reactSnap.include from src/routes.manifest.json —
 * the same table src/routes.config.ts builds ROUTES from — instead of it
 * being hand-typed.
 *
 * Runs as `prebuild`, before react-scripts build / react-snap, so the array
 * is always current by the time react-snap reads it. PHASE 9: this replaces
 * a hand-maintained 45-entry EN/ES array that had silently drifted after
 * RELEASED_LOCALES grew to eight locales in Phase 8 — the first post-flip
 * `npm run build` prerendered only the same old 45 pages, with the six new
 * languages live client-side but absent from prerendering and the sitemap.
 *
 * RELEASED_LOCALES is duplicated here rather than imported, for the same
 * reason routes.config.ts's per-route data now lives in a plain JSON file:
 * this script runs under plain `node`, and locales.ts is otherwise plain
 * data with no lazy-loaded components forcing a JSON split of its own — see
 * inject-route-preloads.js for the same duplication. Keep in sync with
 * src/i18n/locales.ts's RELEASED_LOCALES.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MANIFEST = path.join(ROOT, 'src', 'routes.manifest.json');
const PKG = path.join(ROOT, 'package.json');

const RELEASED_LOCALES = ['en', 'es', 'de', 'fr', 'it', 'pt', 'he', 'hi', 'nl'];
const DEFAULT_LOCALE = 'en';

/** Mirrors routes.config.ts's pathForKey. */
function pathForKey(route, locale) {
  if (route.key === 'home' && locale === DEFAULT_LOCALE) return '/';
  const slug = route.slugs[locale] ?? route.slugs[DEFAULT_LOCALE] ?? '';
  return slug ? `/${locale}/${slug}` : `/${locale}/`;
}

function main() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const prerenderable = manifest.routes.filter((r) => r.prerender !== false);

  const include = ['/', '/404'];
  for (const locale of RELEASED_LOCALES) {
    for (const route of prerenderable) {
      const p = pathForKey(route, locale);
      if (p === '/') continue; // English home already seeded above
      include.push(p);
    }
  }

  const pkg = JSON.parse(fs.readFileSync(PKG, 'utf8'));
  const before = JSON.stringify(pkg.reactSnap && pkg.reactSnap.include);
  pkg.reactSnap = pkg.reactSnap || {};
  pkg.reactSnap.include = include;
  const after = JSON.stringify(include);

  if (before === after) {
    console.log(`[reactSnap.include] unchanged — ${include.length} routes across ${RELEASED_LOCALES.length} locales.`);
    return;
  }

  fs.writeFileSync(PKG, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`[reactSnap.include] regenerated — ${include.length} routes across ${RELEASED_LOCALES.length} locales.`);
}

main();
