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
 * routeToChunk() below MUST match the webpackChunkName comments in
 * src/Router/Router.tsx. Rather than trust that, the script resolves every
 * expected chunk against build/asset-manifest.json and exits non-zero if one is
 * missing. A renamed route then breaks the build loudly instead of silently
 * shipping a page whose chunk is discovered late — the exact regression this
 * script exists to prevent, and one that no test would otherwise catch.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const MANIFEST = path.join(BUILD, 'asset-manifest.json');

/** Keep in sync with routeToChunk() used to generate Router.tsx. */
function routeToChunk(route) {
  if (route === '/') return 'route-home';
  return 'route-' + route.replace(/^\//, '').replace(/\//g, '-').toLowerCase();
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
    if (!asset) { missing.push(`${route} -> ${chunk}`); continue; }

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
