#!/usr/bin/env node
/**
 * Injects a per-route <link rel="preload" as="script"> into each pre-rendered
 * page. Runs AFTER react-snap in the postbuild chain.
 *
 * Why this exists
 * ---------------
 * Router.tsx code-splits every page with React.lazy. Without this step a
 * pre-rendered page ships complete HTML, then hydration discovers it needs a
 * route chunk that has not started downloading — so the page is visually there
 * but inert, and on a slow connection React may replace the pre-rendered markup
 * with the Suspense fallback. Preloading the chunk in <head> means it is
 * already in flight by the time hydration runs.
 *
 * Chunk naming
 * ------------
 * routeToChunk() below MUST match the webpackChunkName values declared in
 * src/routes.config.ts. Rather than trust that, the script resolves every
 * expected chunk against build/asset-manifest.json and exits non-zero if one is
 * missing. A renamed route then breaks the build loudly instead of silently
 * shipping a page whose chunk is discovered late — the exact regression this
 * script exists to prevent, and one that no test would otherwise catch.
 *
 * PHASE 4: routes are now `/:locale/slug` (e.g. `/en/geco`, `/es/geco`), and
 * a few pages — `book`, `book/return`, `book/confirmed` — share one chunk
 * under different sub-paths. Deriving the chunk from the *whole* path (the
 * old rule) would compute "route-book-return" for `/en/book/return`, which
 * matches no real chunk. Using only the first segment *after* the locale
 * prefix fixes both problems at once: every sub-path of `book` reduces to
 * "book", and — as a bonus — English and Spanish now resolve to the *same*
 * chunk name directly, since the locale no longer lives inside the slug.
 * That retires the old ES-merged-chunk fallback below entirely; there is no
 * more EN/ES chunk-name collision to work around.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const MANIFEST = path.join(BUILD, 'asset-manifest.json');

// Keep in sync with src/i18n/locales.ts's LOCALES. Duplicated rather than
// imported because this script runs as plain Node against a TS source file.
const LOCALES = ['en', 'es', 'de', 'fr', 'it', 'pt', 'he', 'hi'];

/** Keep in sync with the `chunk` field per route in src/routes.config.ts. */
function routeToChunk(route) {
  const parts = route.replace(/^\//, '').split('/').filter(Boolean);
  const rest = parts.length && LOCALES.includes(parts[0]) ? parts.slice(1) : parts;
  const first = rest[0];
  return 'route-' + (first ? first.toLowerCase() : 'home');
}

function main() {
  if (!fs.existsSync(MANIFEST)) {
    console.error('[preloads] build/asset-manifest.json missing — run the build first.');
    process.exit(1);
  }

  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const routes = pkg.reactSnap && pkg.reactSnap.include;
  if (!Array.isArray(routes) || !routes.length) {
    console.error('[preloads] package.json reactSnap.include is empty — nothing to do.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  const files = manifest.files || {};

  // asset-manifest keys look like "route-geco.js" -> "/static/js/route-geco.<hash>.chunk.js"
  const byChunk = new Map();
  for (const [key, value] of Object.entries(files)) {
    const m = /^(route-[a-z0-9-]+)\.js$/.exec(key);
    if (m) byChunk.set(m[1], value);
  }

  const missing = [];
  const results = [];

  for (const route of routes) {
    const chunk = routeToChunk(route);
    const asset = byChunk.get(chunk);
    if (!asset) {
      missing.push(`${route} -> ${chunk}`);
      continue;
    }

    const dir = route === '/' ? BUILD : path.join(BUILD, route.replace(/^\//, ''));
    const file = path.join(dir, 'index.html');
    if (!fs.existsSync(file)) { missing.push(`${route} -> ${file} (not pre-rendered)`); continue; }

    let html = fs.readFileSync(file, 'utf8');
    const tag = `<link rel="preload" href="${asset}" as="script" crossorigin="anonymous">`;
    if (html.includes(`href="${asset}" as="script"`)) { results.push([route, chunk, 'already']); continue; }
    if (!html.includes('</head>')) { missing.push(`${route} -> no </head>`); continue; }

    html = html.replace('</head>', `${tag}</head>`);
    fs.writeFileSync(file, html);
    results.push([route, chunk, 'injected']);
  }

  for (const [route, chunk, state] of results) {
    if (state === 'injected') continue;
    console.log(`[preloads] ${route} (${chunk}): ${state}`);
  }
  console.log(`[preloads] injected ${results.filter((r) => r[2] === 'injected').length}/${routes.length} route preloads`);

  if (missing.length) {
    console.error('\n[preloads] FAILED — no chunk resolved for:');
    for (const m of missing) console.error('  ' + m);
    console.error(
      '\nEither a route in package.json reactSnap.include has no matching\n' +
      'webpackChunkName in src/Router/Router.tsx, or the naming rules in the two\n' +
      'files have drifted. Fix the mismatch rather than removing this check —\n' +
      'without a preload the route chunk is not requested until hydration.',
    );
    process.exit(1);
  }
}

main();
