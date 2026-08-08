#!/usr/bin/env node
/**
 * Generates build/sitemap.xml from package.json -> reactSnap.include.
 *
 * There was a sitemap.xml, but at the REPOSITORY ROOT — outside public/, so it
 * was never copied into build/ and never deployed, while public/robots.txt has
 * always advertised https://www.reservaskalawala.com/sitemap.xml. Every crawler
 * following that line got a 404.
 *
 * Deriving it from reactSnap.include rather than committing a static file means
 * the sitemap and the set of pre-rendered pages cannot drift apart: a route is
 * either pre-rendered and listed, or neither.
 *
 * PHASE 6: pairing is no longer EN/ES string-suffix guessing. Every prerendered
 * route is /:locale/slug (English home is the sole bare-"/" exception) —
 * stripping the locale prefix gives a locale-independent "page identity" that
 * routes naturally group by, for however many locales are actually in
 * reactSnap.include today. This is why RELEASED_LOCALES going from two to
 * eight in Phase 8 needs no change here: the grouping falls out of whatever
 * paths exist, the same reason routes.config.ts wasn't imported directly (see
 * generate-redirects.js's comment — a plain Node script can't cheaply import
 * that .tsx module tree; reactSnap.include is the shared source of truth
 * every generate-*.js script in this chain already reads).
 *
 * URLs carry a trailing slash (matching every page's own canonical tag,
 * src/i18n/seo.tsx) — Apache's DirectorySlash 301s the unslashed form
 * (react-snap emits slug/index.html, a directory), so listing the unslashed
 * form was exactly the "page with redirect" indexing problem Search Console
 * flagged for sitemap-listed pages specifically.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const ORIGIN = 'https://www.reservaskalawala.com';

/** Routes that exist for internal flows and should not be indexed. */
const EXCLUDE = new Set(['/404']);

const LOCALE_PREFIX_RE = /^\/([a-z]{2})\/(.*)$/;

/** English home's bare "/" is the only route without a locale prefix. */
function splitLocale(route) {
  if (route === '/') return { locale: 'en', suffix: '' };
  const m = route.match(LOCALE_PREFIX_RE);
  if (!m) return null;
  return { locale: m[1], suffix: m[2] };
}

function withTrailingSlash(route) {
  // reactSnap.include already carries a trailing slash for the home route's
  // ES entry ("/es/", from the empty-slug case in routes.config.ts's
  // pathForKey) — only append one where it's actually missing, or "/es/"
  // becomes "/es//".
  return route.endsWith('/') ? route : `${route}/`;
}

function main() {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const routes = (pkg.reactSnap && pkg.reactSnap.include) || [];
  if (!routes.length) {
    console.error('[sitemap] reactSnap.include is empty — refusing to write an empty sitemap.');
    process.exit(1);
  }
  if (!fs.existsSync(BUILD)) {
    console.error('[sitemap] build/ does not exist — run the build first.');
    process.exit(1);
  }

  const included = routes.filter((r) => !EXCLUDE.has(r));

  // Group every route by its locale-independent "page identity" — the path
  // with the locale prefix stripped — so each group is one page's full set
  // of per-locale URLs, regardless of how many locales exist for it today.
  const groups = new Map(); // suffix -> Map(locale -> route)
  for (const route of included) {
    const split = splitLocale(route);
    if (!split) {
      console.error(`[sitemap] "${route}" in reactSnap.include doesn't match the /:locale/slug scheme (or "/"). Skipping.`);
      continue;
    }
    const { locale, suffix } = split;
    if (!groups.has(suffix)) groups.set(suffix, new Map());
    groups.get(suffix).set(locale, route);
  }

  const entries = [];
  let urlCount = 0;

  for (const localeMap of groups.values()) {
    const enRoute = localeMap.get('en');
    for (const [, route] of localeMap) {
      const loc = ORIGIN + withTrailingSlash(route);
      const lines = [`  <url>`, `    <loc>${loc}</loc>`];

      // A lone-locale page (nothing released yet in any other language) has
      // no alternates to declare — hreflang requires at least two.
      if (localeMap.size > 1) {
        for (const [altLocale, altRoute] of localeMap) {
          lines.push(`    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${ORIGIN + withTrailingSlash(altRoute)}"/>`);
        }
        if (enRoute) {
          lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN + withTrailingSlash(enRoute)}"/>`);
        }
      }

      lines.push(`  </url>`);
      entries.push(lines.join('\n'));
      urlCount++;
    }
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entries.join('\n') + '\n' +
    `</urlset>\n`;

  fs.writeFileSync(path.join(BUILD, 'sitemap.xml'), xml);
  console.log(`[sitemap] wrote build/sitemap.xml with ${urlCount} URLs`);
}

main();
