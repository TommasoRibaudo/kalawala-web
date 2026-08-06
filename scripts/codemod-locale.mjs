#!/usr/bin/env node
/**
 * ONE-SHOT codemod for i18n Phase 1: `isSpanish: boolean` -> `locale: Locale`.
 *
 * Delete this file once Phase 1 is merged. It is committed only so the diff it
 * produced is reproducible and reviewable.
 *
 * Handles the mechanical prop rename across the ~60 files where `isSpanish` is
 * purely a prop threaded down from a page component. Files that *derive*
 * `isSpanish` locally are listed in SKIP and were migrated by hand — a blind
 * rename there would have turned a local boolean into a shadowed locale string.
 *
 * TypeScript is the safety net: anything this misses is a compile error, not a
 * silent runtime bug. Run `npx tsc --noEmit` immediately after.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');

/** Files where `isSpanish` is a local derivation or an unrelated identifier. */
const SKIP = new Set(
  [
    'components/CookieConsentBanner/CookieConsentBanner.tsx',
    'components/HelpMeChoose/HelpMeChoose.component.tsx',
    'components/OurHomes/Components/HomeCard.component.tsx',
    'components/OurHomes/Components/NamCard.component.tsx',
    'components/OurHomes/Components/VillaCard.component.tsx',
    'components/OurOtherHomes/Components/OtherHomesCard.component.tsx',
    'components/OurOtherHomes/Components/OtherHomesCard.componentRib.tsx',
    'components/PortalGuard/PortalGuard.component.tsx',
    'components/FlagComponent/Flag.component.tsx',
    'hooks/useLanguageDetection.ts',
    'pages/Booking.page.tsx',
    'pages/Listing/components/ImagesModal/ImagesModal.component.tsx',
    'pages/NotFound.page.tsx',
    'pages/Portal.page.tsx',
    'pages/PortalDetail.page.tsx',
    'Router/Router.tsx',
  ].map((p) => p.split('/').join(path.sep)),
);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(e.name)) out.push(full);
  }
  return out;
}

/**
 * Order matters: the type declaration and JSX attribute forms are rewritten
 * before the bare-identifier pass, so `isSpanish={true}` never reaches the
 * generic rename and become `locale={true}`.
 */
const RULES = [
  // interface / type members and function params
  [/\bisSpanish\s*:\s*boolean\b/g, 'locale: Locale'],
  [/\bisSpanish\?\s*:\s*boolean\b/g, 'locale?: Locale'],

  // JSX attributes with literal booleans
  [/\bisSpanish=\{true\}/g, "locale=\"es\""],
  [/\bisSpanish=\{false\}/g, "locale=\"en\""],
  // JSX attribute forwarding a variable
  [/\bisSpanish=\{isSpanish\}/g, 'locale={locale}'],
  [/\bisSpanish=\{([^}]+)\}/g, 'locale={$1}'],

  // object literal shorthand / explicit
  [/\bisSpanish:\s*true\b/g, "locale: 'es'"],
  [/\bisSpanish:\s*false\b/g, "locale: 'en'"],

  // comparisons and guards
  [/!\s*isSpanish\b/g, "locale !== 'es'"],
  [/\bisSpanish\s*\?/g, "locale === 'es' ?"],
  [/\bisSpanish\s*&&/g, "locale === 'es' &&"],
  [/\bisSpanish\s*\|\|/g, "locale === 'es' ||"],

  // remaining bare identifiers: destructuring, prop shorthand, plain reads
  [/\bisSpanish\b/g, 'locale'],
];

let changed = 0;
let skipped = 0;

for (const file of walk(SRC)) {
  const rel = path.relative(SRC, file);
  const before = fs.readFileSync(file, 'utf8');
  if (!/\bisSpanish\b/.test(before)) continue;

  if (SKIP.has(rel)) {
    skipped++;
    console.log(`  skip (manual)  ${rel}`);
    continue;
  }

  let after = before;
  for (const [re, to] of RULES) after = after.replace(re, to);

  // Add the Locale type import only where the type is actually referenced.
  if (/\bLocale\b/.test(after) && !/from ['"].*i18n['"]/.test(after)) {
    const depth = rel.split(path.sep).length - 1;
    const prefix = depth === 0 ? './' : '../'.repeat(depth);
    const importLine = `import type { Locale } from '${prefix}i18n';\n`;
    const lastImport = after.lastIndexOf('\nimport ');
    if (lastImport === -1) {
      after = importLine + after;
    } else {
      const eol = after.indexOf('\n', lastImport + 1);
      after = after.slice(0, eol + 1) + importLine + after.slice(eol + 1);
    }
  }

  if (after !== before) {
    fs.writeFileSync(file, after);
    changed++;
    console.log(`  rewrote        ${rel}`);
  }
}

console.log(`\n[codemod] rewrote ${changed} files, skipped ${skipped} for manual migration`);
console.log('[codemod] now run: npx tsc --noEmit');
