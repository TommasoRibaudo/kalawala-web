#!/usr/bin/env node
/**
 * Strips the `selected="selected"` attribute react-snap bakes onto the
 * current-locale <option> in the nav's language <select>.
 *
 * LanguageSwitcher (src/components/FlagComponent/Flag.component.tsx) is a
 * textbook controlled `<select value={locale}>` — React manages selectedness
 * through the DOM property, and deliberately never writes it as markup.
 * react-snap crawls with a real browser though, so by the time it captures
 * the DOM, the browser has already run React and set the current option's
 * `.selected` property. HTML's fragment-serialization algorithm reflects a
 * live, non-dirty `<option>` selectedness back into a `selected` attribute
 * when serializing (the same special case that keeps `<input>` checked state
 * across a clone/innerHTML round-trip) — so the captured snapshot ends up
 * with `selected="selected"` on the page's own-locale option, and the
 * client's hydration render never produces that attribute. React's hydration
 * diff treats the mismatch as error #418, then discards and re-renders the
 * *entire* root as #423 — on every single page, since the switcher lives in
 * the shared nav.
 *
 * There's no state change to gate here the way isPrerender() gates the
 * cookie banner and image skeleton (src/utils/isPrerender.ts) — this is the
 * browser's own serializer adding markup React never asked for — so the fix
 * has to scrub it out of the static files after the crawl instead.
 *
 * Runs directly after react-snap, before any other postbuild step touches
 * these files.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUILD = path.join(ROOT, 'build');

// Matches `selected="selected"` (react-snap's actual output) and the bare
// `selected` / `selected=""` forms some browsers or a future Chrome could
// serialize instead — all mean the same DOM boolean attribute.
const SELECTED_ATTR = /\s+selected(?:="selected"|="")?(?=[\s/>])/g;

function stripFile(file) {
  const html = fs.readFileSync(file, 'utf8');
  const optionSelectedCount = (html.match(/<option\b[^>]*\sselected\b/g) || []).length;
  if (!optionSelectedCount) return false;

  // Scoped to <option ...> tags only — a blanket replace would also strip a
  // legitimate `selected` on some other element this app doesn't have today
  // but might grow later.
  const fixed = html.replace(/<option\b[^>]*>/g, (tag) => tag.replace(SELECTED_ATTR, ''));
  fs.writeFileSync(file, fixed);
  return true;
}

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name === 'index.html') out.push(full);
  }
}

function main() {
  if (!fs.existsSync(BUILD)) {
    console.error('[hydration-fix] build/ does not exist — run the build first.');
    process.exit(1);
  }

  const files = [];
  walk(BUILD, files);
  if (!files.length) {
    console.error('[hydration-fix] no index.html files found under build/ — did react-snap run?');
    process.exit(1);
  }

  let fixed = 0;
  for (const file of files) {
    if (stripFile(file)) fixed++;
  }

  console.log(`[hydration-fix] stripped stale <option selected> from ${fixed}/${files.length} pages`);
}

main();
