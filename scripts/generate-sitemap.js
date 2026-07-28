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
 * EN/ES pairs are emitted with xhtml:link hreflang alternates, matching the
 * per-page <link rel="alternate"> tags the components already render.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const ORIGIN = 'https://www.reservaskalawala.com';

/** Routes that exist for internal flows and should not be indexed. */
const EXCLUDE = new Set(['/Success']);

function esCounterpart(route, all) {
  if (route.endsWith('ES')) return null; // handled from the EN side
  const candidate = route === '/' ? '/HomeES' : `${route}ES`;
  return all.includes(candidate) ? candidate : null;
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
  const entries = [];

  for (const route of included) {
    // ES routes are emitted alongside their EN partner below, so skip them
    // here or they get listed twice. Any ES route WITHOUT an EN partner is
    // picked up by the leftover pass at the end.
    if (route.endsWith('ES') && included.includes(route === '/HomeES' ? '/' : route.slice(0, -2))) {
      continue;
    }
    const loc = ORIGIN + (route === '/' ? '/' : route);
    const es = esCounterpart(route, included);
    const lines = [`  <url>`, `    <loc>${loc}</loc>`];
    if (es) {
      const esLoc = ORIGIN + es;
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="en" href="${loc}"/>`,
        `    <xhtml:link rel="alternate" hreflang="es" href="${esLoc}"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>`,
      );
    }
    lines.push(`  </url>`);
    entries.push(lines.join('\n'));

    // Emit the ES page as its own <url> with the mirrored alternates.
    if (es) {
      const esLoc = ORIGIN + es;
      entries.push([
        `  <url>`,
        `    <loc>${esLoc}</loc>`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${loc}"/>`,
        `    <xhtml:link rel="alternate" hreflang="es" href="${esLoc}"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>`,
        `  </url>`,
      ].join('\n'));
    }
  }

  // Anything left over (an ES route with no EN counterpart) still needs listing.
  const listed = new Set(
    entries.join('\n').match(/<loc>([^<]+)<\/loc>/g).map((m) => m.slice(5, -6)),
  );
  for (const route of included) {
    const loc = ORIGIN + (route === '/' ? '/' : route);
    if (!listed.has(loc)) entries.push(`  <url>\n    <loc>${loc}</loc>\n  </url>`);
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    entries.join('\n') + '\n' +
    `</urlset>\n`;

  fs.writeFileSync(path.join(BUILD, 'sitemap.xml'), xml);
  console.log(`[sitemap] wrote build/sitemap.xml with ${listed.size} URLs`);
}

main();
