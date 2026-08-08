#!/usr/bin/env node
/**
 * Injects single-hop 301 redirects (pre-Phase-4 "...ES"-suffix URLs -> the
 * new /:locale/slug/ scheme) into build/.htaccess, replacing the
 * `@generated-redirects@` marker left in public/.htaccess.
 *
 * The legacy id casing below is a frozen historical snapshot of the URLs
 * Google had actually indexed as of the Phase 0 baseline
 * (docs/seo-baseline/sitemap-2026-08-06.xml) — e.g. "TenHoursInPuerto", not
 * the lowercase "tenhoursinpuerto" the new scheme uses. It will never need to
 * change regardless of how routes.config.ts's slugs evolve later, so it is
 * not derived from routes.config.ts (a plain Node script can't cheaply import
 * a .tsx module tree of lazy-loaded page components anyway — every other
 * generate-*.js script in this chain reads package.json's reactSnap.include
 * instead, for the same reason). What IS cross-checked against the live
 * route set: every table entry's new slug must still appear in
 * reactSnap.include, or the build fails loudly instead of silently emitting
 * a redirect to a route that no longer exists.
 *
 * Targets carry a trailing slash. Per the Phase 0 finding
 * (docs/seo-baseline/README.md), Apache's mod_dir DirectorySlash 301s
 * `/en/geco` -> `/en/geco/` on its own (react-snap emits `geco/index.html`,
 * a directory) — an unslashed target here would turn every migrated URL into
 * a two-hop chain.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const HTACCESS = path.join(BUILD, '.htaccess');
const MARKER = '# @generated-redirects@';

// new lowercase slug (routes.config.ts) -> exact-cased legacy id
// (docs/seo-baseline/sitemap-2026-08-06.xml).
const LEGACY_IDS = {
  geco: 'Geco',
  rana: 'Rana',
  tucano: 'Tucano',
  pappagallo: 'Pappagallo',
  delfin: 'Delfin',
  areka: 'Areka',
  giulia: 'Giulia',
  plumeria: 'Plumeria',
  villamar: 'VillaMar',
  villacoral: 'VillaCoral',
  blog: 'blog',
  twodaysinpuertoviejo: 'twodaysinpuertoviejo',
  gettingtogandoca: 'gettingtogandoca',
  travellingtopuertoviejo: 'travellingtopuertoviejo',
  puertoviejobyplane: 'puertoviejobyplane',
  tenhoursinpuerto: 'TenHoursInPuerto',
  bushours: 'bushours',
  cahuitaparkwhattodo: 'cahuitaparkwhattodo',
  indigenoustravelpv: 'indigenousTravelPV',
  besttimetovisitpuerto: 'bestTimeToVisitPuerto',
  puertohiddengems: 'puertoHiddenGems',
};

function main() {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const included = new Set((pkg.reactSnap && pkg.reactSnap.include) || []);
  if (!included.size) {
    console.error('[redirects] reactSnap.include is empty — refusing to generate redirects.');
    process.exit(1);
  }
  if (!fs.existsSync(HTACCESS)) {
    console.error(`[redirects] ${path.relative(ROOT, HTACCESS)} does not exist — run the build first.`);
    process.exit(1);
  }

  const rules = [];

  // Home: bare "/" is unchanged and needs no redirect; "/HomeES" is the one
  // legacy home URL that moved, to "/es/".
  if (!included.has('/es/')) {
    console.error('[redirects] "/es/" is missing from reactSnap.include — home route drifted.');
    process.exit(1);
  }
  rules.push({ from: 'HomeES', to: '/es/' });

  for (const [slug, legacyId] of Object.entries(LEGACY_IDS)) {
    const enPath = `/en/${slug}`;
    const esPath = `/es/${slug}`;
    if (!included.has(enPath) || !included.has(esPath)) {
      console.error(
        `[redirects] "${slug}" (legacy id "${legacyId}") is missing from reactSnap.include ` +
          `(checked ${enPath}, ${esPath}) — route renamed or removed? Update LEGACY_IDS in this script.`,
      );
      process.exit(1);
    }
    rules.push({ from: legacyId, to: `${enPath}/` });
    rules.push({ from: `${legacyId}ES`, to: `${esPath}/` });
  }

  const generated = rules
    .map((r) => `    RewriteRule ^${r.from}/?$ ${r.to} [R=301,L,NC]`)
    .join('\n');

  const htaccess = fs.readFileSync(HTACCESS, 'utf8');
  if (!htaccess.includes(MARKER)) {
    console.error(`[redirects] marker "${MARKER}" not found in ${path.relative(ROOT, HTACCESS)} — was public/.htaccess edited?`);
    process.exit(1);
  }
  fs.writeFileSync(HTACCESS, htaccess.replace(MARKER, generated));

  console.log(`[redirects] wrote ${rules.length} redirects into ${path.relative(ROOT, HTACCESS)}`);
}

main();
