#!/usr/bin/env node
/**
 * Copies the pre-rendered build/404/index.html to build/404.html.
 *
 * react-snap only prerenders the routes listed in package.json's
 * reactSnap.include, and it snapshots "/404" as a directory
 * (build/404/index.html), same as every other route. .htaccess's
 * `ErrorDocument 404 /404.html` needs a plain file at that exact path, not a
 * directory — this is the one place that mismatch has to be bridged.
 *
 * Without this, unknown URLs fell through the SPA rewrite to index.html with
 * an HTTP 200 (a soft 404): visually a 404 page once React hydrated, but the
 * status code told search engines and any status-aware crawler it was a real,
 * indexable page.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const SOURCE = path.join(BUILD, '404', 'index.html');
const DEST = path.join(BUILD, '404.html');

function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error(`[404] ${SOURCE} does not exist — is "/404" in reactSnap.include and did react-snap run?`);
    process.exit(1);
  }

  fs.copyFileSync(SOURCE, DEST);
  console.log(`[404] wrote ${path.relative(ROOT, DEST)} from ${path.relative(ROOT, SOURCE)}`);
}

main();
