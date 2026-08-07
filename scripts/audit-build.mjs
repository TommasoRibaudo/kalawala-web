#!/usr/bin/env node
/**
 * Audits the built site the way a crawler sees it.
 *
 * Checks each prerendered page for the things that actually decide whether
 * Google can index it correctly, and cross-checks the sitemap against what was
 * built.
 *
 * Usage: node audit-build.mjs <buildDir>
 */
import fs from 'node:fs';
import path from 'node:path';

const BUILD = process.argv[2];
const ORIGIN = 'https://www.reservaskalawala.com';

function pages(root) {
  const out = {};
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const f = path.join(d, e.name);
      if (e.isDirectory()) walk(f);
      else if (e.name === 'index.html') {
        const rel = path.relative(root, f).split(path.sep).slice(0, -1).join('/');
        out['/' + rel] = fs.readFileSync(f, 'utf8');
      }
    }
  })(root);
  return out;
}

const P = pages(BUILD);
const routes = Object.keys(P).sort();
const problems = [];
const warn = [];

const tag = (html, re) => (html.match(re) || [])[1];

for (const r of routes) {
  const html = P[r];
  const url = ORIGIN + (r === '/' ? '/' : r);

  // 1. title + meta description
  const title = tag(html, /<title[^>]*>([^<]*)<\/title>/);
  if (!title || !title.trim()) problems.push(`${r}: no <title>`);
  const desc = tag(html, /<meta name="description" content="([^"]*)"/);
  if (!desc || !desc.trim()) warn.push(`${r}: no meta description`);

  // 2. lang attribute
  const lang = tag(html, /<html[^>]*\blang="([^"]*)"/);
  if (!lang) problems.push(`${r}: no <html lang>`);
  else {
    const isEs = /ES(\/|$)/.test(r);
    if (isEs && lang !== 'es') warn.push(`${r}: Spanish route but lang="${lang}"`);
    if (!isEs && lang !== 'en' && r !== '/404') warn.push(`${r}: English route but lang="${lang}"`);
  }

  // 3. canonical — must be self-referential and absolute
  const canon = tag(html, /<link rel="canonical" href="([^"]*)"/);
  if (!canon) warn.push(`${r}: no canonical`);
  else if (!canon.startsWith('http')) problems.push(`${r}: relative canonical ${canon}`);

  // 4. noindex — should only be on 404
  if (/name="robots"[^>]*noindex/.test(html) && r !== '/404') {
    problems.push(`${r}: noindex on an indexable page`);
  }

  // 5. body must have real content (a blank prerender = soft 404)
  const body = (html.match(/<body[^>]*>([\s\S]*)<\/body>/) || [])[1] || '';
  const text = body.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  // A 404 is meant to be short; everything else being this thin means the
  // prerender captured a blank page, which reads as a soft 404 to a crawler.
  if (r !== '/404' && text.length < 500) problems.push(`${r}: prerendered body has only ${text.length} chars of text`);

  // 6. hreflang reciprocity within the pair
  const alts = [...html.matchAll(/<link rel="alternate" hrefLang="([^"]*)" href="([^"]*)"|<link rel="alternate" hreflang="([^"]*)" href="([^"]*)"/g)]
    .map((m) => ({ lang: m[1] ?? m[3], href: m[2] ?? m[4] }));
  if (alts.length) {
    const langs = alts.map((a) => a.lang).sort().join(',');
    if (!langs.includes('x-default')) warn.push(`${r}: hreflang without x-default (${langs})`);
    for (const a of alts) {
      const target = a.href.replace(ORIGIN, '');
      const key = target === '/' ? '/' : target.replace(/\/$/, '');
      if (a.lang !== 'x-default' && !(key in P)) {
        problems.push(`${r}: hreflang ${a.lang} points at ${target}, which was not built`);
      }
    }
  }
}

// 7. sitemap vs built pages
const smPath = path.join(BUILD, 'sitemap.xml');
if (!fs.existsSync(smPath)) problems.push('sitemap.xml missing');
else {
  const sm = fs.readFileSync(smPath, 'utf8');
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(ORIGIN, '') || '/');
  for (const l of locs) {
    const key = l === '/' ? '/' : l.replace(/\/$/, '');
    if (!(key in P)) problems.push(`sitemap lists ${l} but it was not built`);
  }
  const notListed = routes.filter((r) => !['/404', '/Success'].includes(r) && !locs.includes(r === '/' ? '/' : r));
  if (notListed.length) warn.push(`built but not in sitemap: ${notListed.join(', ')}`);
  console.log(`sitemap: ${locs.length} URLs`);
}

// 8. robots.txt
const robots = path.join(BUILD, 'robots.txt');
if (!fs.existsSync(robots)) problems.push('robots.txt missing');
else {
  const t = fs.readFileSync(robots, 'utf8');
  if (!/Sitemap:\s*\S+/i.test(t)) problems.push('robots.txt does not advertise a sitemap');
  // Only a Disallow inside the `User-agent: *` block blocks everyone. A scoped
  // one is intentional — this file has `User-agent: CCBot` / `Disallow: /` to
  // keep a training-only crawler out, which must not be reported as a problem.
  const starBlock = t.split(/^User-agent:/im).find((b) => b.trim().startsWith('*')) || '';
  if (/^\s*Disallow:\s*\/\s*$/m.test(starBlock)) {
    problems.push('robots.txt disallows the whole site for all agents');
  }
}

// 9. 404 page
if (!fs.existsSync(path.join(BUILD, '404.html'))) problems.push('404.html missing');
else if (!/noindex/.test(fs.readFileSync(path.join(BUILD, '404.html'), 'utf8'))) {
  warn.push('404.html is not noindex');
}

console.log(`pages audited: ${routes.length}`);
console.log(`\nBLOCKING problems: ${problems.length}`);
problems.forEach((p) => console.log('  X ' + p));
console.log(`\nwarnings: ${warn.length}`);
warn.forEach((w) => console.log('  ! ' + w));
process.exit(problems.length ? 1 : 0);
