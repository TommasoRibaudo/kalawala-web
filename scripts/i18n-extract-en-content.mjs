/**
 * Extracts every unit of English-locale content from the i18n content
 * sources into a flat table: one row per translatable string, keyed by
 * (section, item, field) so a later pass can extract the same keys for
 * every other locale and join against this file to find gaps.
 *
 * Sources covered:
 *   - src/utils/constants.ts        -> houseDataList amenities (name, icon)
 *   - src/i18n/content/listings.ts  -> the 10 property pages' prose
 *   - src/i18n/content/blog.tsx     -> the 10 blog articles' prose
 *   - src/i18n/content/discover.tsx -> the homepage Discover section
 *
 * Uses the TypeScript compiler API to parse each file's AST rather than
 * regex, so it survives JSX (blog.tsx/discover.tsx embed <b>/<i>/<br/> and
 * interpolated expressions like {PORTFOLIO_PROPERTY_COUNT}). JSX text is
 * flattened to plain text; interpolated expressions become a
 * ⟦source_text⟧ placeholder so a reviewer can see a value is substituted
 * there without needing to evaluate it; <br/> becomes a literal newline
 * inside the cell.
 *
 * Default mode (no flags): writes docs/i18n-content-audit/en-source-of-truth.csv.
 *
 * --coverage-matrix: Phase 2 of the audit (docs/i18n-content-audit/plan.md).
 * For each non-English released locale, checks — per (section, item), not
 * per field — whether listings.ts/blog.tsx/discover.tsx has a *dedicated*
 * block for that locale or silently falls back to English (they're typed
 * Partial<Record<Locale,T>> for exactly this reason). Amenities work
 * differently (a separate AMENITY_LABELS lookup table, not per-locale
 * duplicate entries) and get their own two row-types instead of forcing
 * them through the same dedicated/fallback check — see the plan doc.
 * Writes docs/i18n-content-audit/locale-coverage-matrix.csv.
 *
 * --message-coverage: Phase 3 of the audit. src/i18n/messages/*.ts is a
 * *different* mechanism from the content sources above — every locale file
 * is typed as the full `Messages` shape (not `Partial<Messages>`), so
 * TypeScript itself already guarantees 100% key coverage at compile time;
 * "missing entirely" should be structurally impossible here (verified, not
 * just assumed — see the plan doc's Phase 3 entry). What's actually worth
 * checking is per-key *value* equality against English: identical could be
 * a deliberate loanword or an untranslated placeholder, and only a human
 * reviewer can tell which — this script just surfaces which keys they are,
 * it doesn't judge them. Writes docs/i18n-content-audit/message-catalog-coverage.csv.
 *
 * --quality-packets: Phase 4 prep. Everything above is structural (does
 * content exist, is it the right shape) — this produces the actual bilingual
 * text a *reader* needs to judge whether it's any good. Per non-English
 * locale, writes docs/i18n-content-audit/quality-review/{locale}-vs-en.md:
 * every listing/blog/discover item's English text and that locale's text,
 * each flattened to one readable blob (not a field-by-field table — Phase
 * 2's own finding applies here too: paragraph counts legitimately differ
 * per locale, so a positional diff would misalign real content against a
 * false "missing paragraph" signal). Amenities are appended per locale in
 * their own, differently-shaped section (property display name for es only;
 * amenity-name -> translated-label pairs for the other 7, since that's the
 * only place those 7 locales' amenity text exists at all).
 */
import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'C:/Users/User/Documents/ReactNativeApps/Medical/kalawala-web';
const OUT_DIR = path.join(ROOT, 'docs', 'i18n-content-audit');
const OUT_CSV = path.join(OUT_DIR, 'en-source-of-truth.csv');
const COVERAGE_CSV = path.join(OUT_DIR, 'locale-coverage-matrix.csv');
const MESSAGE_COVERAGE_CSV = path.join(OUT_DIR, 'message-catalog-coverage.csv');
const QUALITY_PACKET_DIR = path.join(OUT_DIR, 'quality-review');
const NON_ENGLISH_LOCALES = ['es', 'de', 'fr', 'it', 'pt', 'he', 'hi', 'nl'];
const AMENITY_LABEL_LOCALES = ['de', 'fr', 'it', 'pt', 'he', 'hi', 'nl'];

const rows = [];
function addRow(section, item, field, text) {
  const clean = (text ?? '').toString().trim();
  if (!clean) return;
  rows.push({ section, item, field, en_text: clean });
}

function parseFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const kind = filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  return ts.createSourceFile(filePath, text, ts.ScriptTarget.Latest, true, kind);
}

/** Flattens a string literal / template literal / JSX subtree to plain text. */
function flattenNode(node) {
  if (!node) return '';
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  if (ts.isTemplateExpression(node)) {
    let result = node.head.text;
    for (const span of node.templateSpans) {
      result += `⟦${span.expression.getText()}⟧` + span.literal.text;
    }
    return result;
  }
  if (ts.isJsxText(node)) {
    return node.text.replace(/\s+/g, ' ');
  }
  if (ts.isJsxExpression(node)) {
    if (!node.expression) return '';
    // A plain string/template literal inside {…} is real text, not a variable.
    if (ts.isStringLiteral(node.expression) || ts.isNoSubstitutionTemplateLiteral(node.expression) || ts.isTemplateExpression(node.expression)) {
      return flattenNode(node.expression);
    }
    return `⟦${node.expression.getText()}⟧`;
  }
  if (ts.isJsxElement(node)) {
    const tag = node.openingElement.tagName.getText();
    const inner = node.children.map(flattenNode).join('');
    return tag === 'br' ? '\n' : inner;
  }
  if (ts.isJsxSelfClosingElement(node)) {
    return node.tagName.getText() === 'br' ? '\n' : '';
  }
  if (ts.isJsxFragment(node)) {
    return node.children.map(flattenNode).join('');
  }
  if (ts.isParenthesizedExpression(node)) {
    return flattenNode(node.expression);
  }
  if (ts.isArrowFunction(node)) {
    // messages/*.ts's interpolating/pluralising values, e.g.
    // `(title: string) => \`Read blog: ${title}\``. Flatten the returned
    // expression the same as any other template literal — parameter names
    // aren't meaningful to compare, the static text around the
    // interpolation is. Handles both expression-bodied and block-bodied
    // arrows (the latter via its first `return`).
    const body = node.body;
    if (ts.isBlock(body)) {
      const ret = body.statements.find((s) => ts.isReturnStatement(s));
      return ret && ret.expression ? flattenNode(ret.expression) : node.getText();
    }
    return flattenNode(body);
  }
  if (ts.isObjectLiteralExpression(node)) {
    // The { text: '...', trailingBreak: false } paragraph-object form.
    const textProp = node.properties.find(
      (p) => ts.isPropertyAssignment(p) && p.name.getText() === 'text'
    );
    if (textProp) return flattenNode(textProp.initializer);
  }
  // Fallback for anything unexpected: raw source, so nothing is silently dropped.
  return node.getText();
}

function normalise(text) {
  return text.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}

/** Recursively walks a locale-content object literal, emitting one row per
 *  leaf string and one row per array element (so each paragraph is its own
 *  row, not one giant blob). */
function walkContentObject(node, section, item, fieldPath) {
  if (!node) return;
  if (ts.isObjectLiteralExpression(node)) {
    for (const prop of node.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const key = prop.name.getText();
      walkContentObject(prop.initializer, section, item, fieldPath ? `${fieldPath}.${key}` : key);
    }
    return;
  }
  if (ts.isArrayLiteralExpression(node)) {
    node.elements.forEach((el, i) => {
      const label = `${fieldPath}[${i}]`;
      if (ts.isObjectLiteralExpression(el) && !el.properties.some((p) => ts.isPropertyAssignment(p) && p.name.getText() === 'text')) {
        // A structured array element (not the paragraph {text,...} shape) —
        // recurse instead of flattening, e.g. tipsListItems items that are
        // themselves objects.
        walkContentObject(el, section, item, label);
      } else {
        addRow(section, item, label, normalise(flattenNode(el)));
      }
    });
    return;
  }
  // Leaf: string, template literal, or JSX.
  addRow(section, item, fieldPath, normalise(flattenNode(node)));
}

/** Finds a top-level `const NAME = ...` / `const NAME: T = ...` declaration. */
function findTopLevelConst(sourceFile, name) {
  let found;
  sourceFile.forEachChild((node) => {
    if (found) return;
    if (!ts.isVariableStatement(node)) return;
    for (const decl of node.declarationList.declarations) {
      if (ts.isIdentifier(decl.name) && decl.name.text === name) {
        found = decl.initializer;
      }
    }
  });
  return found;
}

// ---------------------------------------------------------------------------
// 1. Amenities — src/utils/constants.ts. The array `houseDataByLangCode()`
//    actually searches is LISTING_PAGE_DATA, a concatenation of FIVE arrays
//    (houseDataList, NamDataList[ES], VillasDataList[ES]) — Areka/Giulia/
//    Plumeria live in Nam*, VillaMar/VillaCoral in Villas*, everything else
//    in houseDataList. Walking houseDataList alone silently drops half the
//    portfolio, so this walks all five, matching LISTING_PAGE_DATA exactly.
// ---------------------------------------------------------------------------
const AMENITY_SOURCE_ARRAYS = ['houseDataList', 'NamDataList', 'NamDataListES', 'VillasDataList', 'VillasDataListES'];

function extractAmenities() {
  const file = path.join(ROOT, 'src', 'utils', 'constants.ts');
  const sf = parseFile(file);

  const seen = new Set();
  for (const constName of AMENITY_SOURCE_ARRAYS) {
    const arr = findTopLevelConst(sf, constName);
    if (!arr || !ts.isArrayLiteralExpression(arr)) {
      console.warn(`[amenities] '${constName}' not found or not an array literal — extraction script is out of date with constants.ts`);
      continue;
    }

    for (const el of arr.elements) {
      if (!ts.isObjectLiteralExpression(el)) continue;
      const get = (key) => {
        const p = el.properties.find((pr) => ts.isPropertyAssignment(pr) && pr.name.getText() === key);
        return p ? flattenNode(p.initializer) : undefined;
      };
      const houseLangCode = get('houseLangCode');
      const name = get('name');
      if (!houseLangCode) continue;
      // Only the English entries (ES-suffixed ones are Spanish, a different
      // "source of truth" this step isn't extracting yet).
      if (houseLangCode.endsWith('ES')) continue;
      if (seen.has(houseLangCode)) {
        console.warn(`[amenities] duplicate houseLangCode '${houseLangCode}' across source arrays`);
      }
      seen.add(houseLangCode);

      addRow('amenities', houseLangCode, 'displayName', name);

      const amenitiesProp = el.properties.find((pr) => ts.isPropertyAssignment(pr) && pr.name.getText() === 'amenities');
      if (!amenitiesProp || !ts.isArrayLiteralExpression(amenitiesProp.initializer)) continue;
      amenitiesProp.initializer.elements.forEach((amenityEl, i) => {
        if (!ts.isObjectLiteralExpression(amenityEl)) return;
        const nameProp = amenityEl.properties.find((pr) => ts.isPropertyAssignment(pr) && pr.name.getText() === 'name');
        const iconProp = amenityEl.properties.find((pr) => ts.isPropertyAssignment(pr) && pr.name.getText() === 'icon');
        if (nameProp) addRow('amenities', houseLangCode, `amenities[${i}].name`, flattenNode(nameProp.initializer));
        if (iconProp) addRow('amenities', houseLangCode, `amenities[${i}].icon`, flattenNode(iconProp.initializer));
      });
    }
  }
}

// ---------------------------------------------------------------------------
// 2. Listing pages — src/i18n/content/listings.ts, CONTENT[key].en
// ---------------------------------------------------------------------------
function extractListings() {
  const file = path.join(ROOT, 'src', 'i18n', 'content', 'listings.ts');
  const sf = parseFile(file);
  const content = findTopLevelConst(sf, 'CONTENT');
  if (!content || !ts.isObjectLiteralExpression(content)) {
    throw new Error('CONTENT not found in listings.ts — extraction script is out of date');
  }

  for (const prop of content.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const listingKey = prop.name.getText();
    if (!ts.isObjectLiteralExpression(prop.initializer)) continue;
    const localeProp = prop.initializer.properties.find(
      (p) => ts.isPropertyAssignment(p) && p.name.getText() === 'en'
    );
    if (!localeProp) {
      console.warn(`[listings] ${listingKey} has no 'en' entry — skipping`);
      continue;
    }
    walkContentObject(localeProp.initializer, 'listing', listingKey, '');
  }
}

// ---------------------------------------------------------------------------
// 3. Blog articles — src/i18n/content/blog.tsx, ten separate consts
// ---------------------------------------------------------------------------
const BLOG_ARTICLE_CONSTS = [
  'tenHoursInPuerto',
  'puertoViejoByPlane',
  'twoDaysInPV',
  'gettingToGandoca',
  'travellingToPuerto',
  'cahuitaPark',
  'bestTimeToVisit',
  'indigenousTravel',
  'puertoHiddenGems',
  'busHours',
];

function extractBlog() {
  const file = path.join(ROOT, 'src', 'i18n', 'content', 'blog.tsx');
  const sf = parseFile(file);

  for (const constName of BLOG_ARTICLE_CONSTS) {
    const decl = findTopLevelConst(sf, constName);
    if (!decl || !ts.isObjectLiteralExpression(decl)) {
      console.warn(`[blog] const '${constName}' not found — extraction script is out of date with blog.tsx`);
      continue;
    }
    const localeProp = decl.properties.find(
      (p) => ts.isPropertyAssignment(p) && p.name.getText() === 'en'
    );
    if (!localeProp) {
      console.warn(`[blog] ${constName} has no 'en' entry — skipping`);
      continue;
    }
    walkContentObject(localeProp.initializer, 'blog', constName, '');
  }
}

// ---------------------------------------------------------------------------
// 4. Discover section — src/i18n/content/discover.tsx, top-level `en` const
// ---------------------------------------------------------------------------
function extractDiscover() {
  const file = path.join(ROOT, 'src', 'i18n', 'content', 'discover.tsx');
  const sf = parseFile(file);
  const en = findTopLevelConst(sf, 'en');
  if (!en || !ts.isObjectLiteralExpression(en)) {
    throw new Error("Top-level 'en' const not found in discover.tsx — extraction script is out of date");
  }
  walkContentObject(en, 'discover', 'homepage', '');
}

// ---------------------------------------------------------------------------
// Phase 2 — coverage matrix
// ---------------------------------------------------------------------------

const coverageRows = [];
function addCoverageRow(section, itemType, item, values) {
  coverageRows.push({ section, itemType, item, values });
}

/** True if `objectLiteral` has a direct property assignment keyed exactly
 *  `locale` — i.e. this Partial<Record<Locale,T>> entry has a dedicated
 *  block for that locale, as opposed to falling back to `.en` at read
 *  time. Doesn't care what the value contains, only that the key exists. */
function hasLocaleKey(objectLiteral, locale) {
  if (!objectLiteral || !ts.isObjectLiteralExpression(objectLiteral)) return false;
  return objectLiteral.properties.some(
    (p) => ts.isPropertyAssignment(p) && p.name.getText() === locale
  );
}

// listings.ts: CONTENT[ListingKey] is itself a Partial<Record<Locale,T>> —
// same shape hasLocaleKey expects directly.
function coverageListings() {
  const file = path.join(ROOT, 'src', 'i18n', 'content', 'listings.ts');
  const sf = parseFile(file);
  const content = findTopLevelConst(sf, 'CONTENT');
  if (!content || !ts.isObjectLiteralExpression(content)) {
    throw new Error('CONTENT not found in listings.ts — extraction script is out of date');
  }
  for (const prop of content.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const listingKey = prop.name.getText();
    const values = {};
    for (const locale of NON_ENGLISH_LOCALES) {
      values[locale] = hasLocaleKey(prop.initializer, locale) ? 'dedicated' : 'fallback-to-en';
    }
    addCoverageRow('listing', 'property', listingKey, values);
  }
}

// blog.tsx: each of the 10 article consts is itself a Partial<Record<Locale,T>>.
function coverageBlog() {
  const file = path.join(ROOT, 'src', 'i18n', 'content', 'blog.tsx');
  const sf = parseFile(file);
  for (const constName of BLOG_ARTICLE_CONSTS) {
    const decl = findTopLevelConst(sf, constName);
    if (!decl || !ts.isObjectLiteralExpression(decl)) {
      console.warn(`[coverage/blog] const '${constName}' not found — extraction script is out of date with blog.tsx`);
      continue;
    }
    const values = {};
    for (const locale of NON_ENGLISH_LOCALES) {
      values[locale] = hasLocaleKey(decl, locale) ? 'dedicated' : 'fallback-to-en';
    }
    addCoverageRow('blog', 'article', constName, values);
  }
}

// discover.tsx: NOT the same shape — one separate top-level `const xx:
// DiscoverContent = {...}` per locale, combined into a Partial<Record<...>>
// only at the very end (`const CONTENT = { en, es, de, ... }`). "Dedicated"
// here means that locale's own const is a real object literal (not e.g.
// `const it = en` aliasing another locale's), not a key-presence check —
// every released locale gets its own literal by construction in this file,
// which coverageDiscover() confirms rather than assumes.
function coverageDiscover() {
  const file = path.join(ROOT, 'src', 'i18n', 'content', 'discover.tsx');
  const sf = parseFile(file);
  const values = {};
  for (const locale of NON_ENGLISH_LOCALES) {
    const decl = findTopLevelConst(sf, locale);
    values[locale] = decl && ts.isObjectLiteralExpression(decl) ? 'dedicated' : 'fallback-to-en';
  }
  addCoverageRow('discover', 'section', 'homepage', values);
}

// Amenities, part A: `es` doesn't use AMENITY_LABELS — like `en`, it has its
// own fully-baked `{houseLangCode}ES` entry directly in the source arrays
// (Amenities.component.tsx renders `.name` as-is for en/es). So the
// meaningful "es" coverage question is the same shape as listings/blog:
// does that ES-suffixed entry exist at all? (If it didn't, the page would
// error rather than gracefully fall back — houseDataByLangCode returns
// undefined, not an English substitute — so 'missing' here would be a much
// more severe finding than a listings/blog fallback-to-en.)
function coverageAmenitiesEs() {
  const file = path.join(ROOT, 'src', 'utils', 'constants.ts');
  const sf = parseFile(file);
  const enHouseLangCodes = [];
  const allHouseLangCodes = new Set();

  for (const constName of AMENITY_SOURCE_ARRAYS) {
    const arr = findTopLevelConst(sf, constName);
    if (!arr || !ts.isArrayLiteralExpression(arr)) continue;
    for (const el of arr.elements) {
      if (!ts.isObjectLiteralExpression(el)) continue;
      const p = el.properties.find((pr) => ts.isPropertyAssignment(pr) && pr.name.getText() === 'houseLangCode');
      if (!p) continue;
      const code = flattenNode(p.initializer);
      allHouseLangCodes.add(code);
      if (!code.endsWith('ES')) enHouseLangCodes.push(code);
    }
  }

  for (const code of enHouseLangCodes) {
    addCoverageRow('amenities', 'property', code, {
      es: allHouseLangCodes.has(`${code}ES`) ? 'dedicated' : 'MISSING (page would error, not fall back)',
    });
  }
}

// Amenities, part B: de/fr/it/pt/he/hi/nl all read the *same* English
// amenity names (houseDataByLangCode has no DE/FR/... entries — those
// locales render the English property record's raw .amenities array) and
// translate each name through AMENITY_LABELS at render time. So coverage
// for these 7 locales is keyed by amenity *name*, not by property, and
// checks each locale's own sub-key within that name's AMENITY_LABELS entry
// — Partial<Record<...>>, so one locale can be missing while others on the
// same name are present.
function coverageAmenitiesLabels() {
  const constantsFile = path.join(ROOT, 'src', 'utils', 'constants.ts');
  const csf = parseFile(constantsFile);
  const amenityNames = new Set();
  for (const constName of AMENITY_SOURCE_ARRAYS) {
    const arr = findTopLevelConst(csf, constName);
    if (!arr || !ts.isArrayLiteralExpression(arr)) continue;
    for (const el of arr.elements) {
      if (!ts.isObjectLiteralExpression(el)) continue;
      const houseLangCodeProp = el.properties.find((pr) => ts.isPropertyAssignment(pr) && pr.name.getText() === 'houseLangCode');
      const code = houseLangCodeProp ? flattenNode(houseLangCodeProp.initializer) : '';
      if (code.endsWith('ES')) continue; // Spanish entries don't feed AMENITY_LABELS lookups.
      const amenitiesProp = el.properties.find((pr) => ts.isPropertyAssignment(pr) && pr.name.getText() === 'amenities');
      if (!amenitiesProp || !ts.isArrayLiteralExpression(amenitiesProp.initializer)) continue;
      for (const amenityEl of amenitiesProp.initializer.elements) {
        if (!ts.isObjectLiteralExpression(amenityEl)) continue;
        const nameProp = amenityEl.properties.find((pr) => ts.isPropertyAssignment(pr) && pr.name.getText() === 'name');
        if (nameProp) amenityNames.add(flattenNode(nameProp.initializer));
      }
    }
  }

  const labelsFile = path.join(ROOT, 'src', 'i18n', 'amenityLabels.ts');
  const lsf = parseFile(labelsFile);
  const labels = findTopLevelConst(lsf, 'AMENITY_LABELS');
  if (!labels || !ts.isObjectLiteralExpression(labels)) {
    throw new Error('AMENITY_LABELS not found in amenityLabels.ts — extraction script is out of date');
  }

  for (const name of amenityNames) {
    const entryProp = labels.properties.find(
      (p) => ts.isPropertyAssignment(p) && flattenNode(p.name) === name
    );
    const values = {};
    for (const locale of AMENITY_LABEL_LOCALES) {
      const hasTranslation =
        entryProp &&
        ts.isObjectLiteralExpression(entryProp.initializer) &&
        entryProp.initializer.properties.some(
          (p) => ts.isPropertyAssignment(p) && p.name.getText() === locale
        );
      values[locale] = hasTranslation ? 'covered' : 'missing-translation';
    }
    addCoverageRow('amenities', 'amenity_name', name, values);
  }
}

// ---------------------------------------------------------------------------
// Phase 3 — message catalog value coverage
// ---------------------------------------------------------------------------

/** Walks a messages/*.ts top-level object, collecting `group.key` -> flattened
 *  value (and `group.key[i]` for the one array-valued key, whyStayWithUs.benefits).
 *  Property names can be plain identifiers (`checkAvailability:`) or string
 *  literals (`reviewTags`'s keys, which are literal review text, not
 *  semantic names) — ts.isStringLiteral(prop.name) picks the right one. */
function collectMessageValues(node, pathPrefix, out) {
  if (!node) return;
  if (ts.isObjectLiteralExpression(node)) {
    for (const prop of node.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const key = ts.isStringLiteral(prop.name) ? prop.name.text : prop.name.getText();
      collectMessageValues(prop.initializer, pathPrefix ? `${pathPrefix}.${key}` : key, out);
    }
    return;
  }
  if (ts.isArrayLiteralExpression(node)) {
    node.elements.forEach((el, i) => collectMessageValues(el, `${pathPrefix}[${i}]`, out));
    return;
  }
  out.set(pathPrefix, normalise(flattenNode(node)));
}

function extractMessageValues(locale) {
  const file = path.join(ROOT, 'src', 'i18n', 'messages', `${locale}.ts`);
  const sf = parseFile(file);
  const decl = findTopLevelConst(sf, locale);
  if (!decl || !ts.isObjectLiteralExpression(decl)) {
    throw new Error(`Top-level '${locale}' const not found in messages/${locale}.ts — extraction script is out of date`);
  }
  const out = new Map();
  collectMessageValues(decl, '', out);
  return out;
}

function writeMessageCatalogCoverage() {
  const enValues = extractMessageValues('en');
  const perLocale = {};
  for (const locale of NON_ENGLISH_LOCALES) {
    perLocale[locale] = extractMessageValues(locale);
  }

  const messageRows = [];
  let missingCount = 0;
  for (const [keyPath, enText] of enValues) {
    const values = {};
    for (const locale of NON_ENGLISH_LOCALES) {
      const localeValues = perLocale[locale];
      if (!localeValues.has(keyPath)) {
        // Should be structurally impossible — every locale file is typed as
        // the full Messages shape, not Partial<Messages>, so tsc itself
        // would fail the build first. Flagging loudly rather than silently
        // treating it the same as a real fallback if it ever does happen
        // (a type-checking gap, or this script drifting from the source).
        values[locale] = 'MISSING (unexpected — see script header comment)';
        missingCount++;
      } else {
        values[locale] = localeValues.get(keyPath) === enText ? 'identical-to-english' : 'translated';
      }
    }
    messageRows.push({ key: keyPath, enText, values });
  }

  // Defensive check the other direction too: a key present in a locale file
  // but not in English would mean that locale's shape has drifted from
  // `Messages` (again, tsc should already refuse to build that).
  for (const locale of NON_ENGLISH_LOCALES) {
    for (const keyPath of perLocale[locale].keys()) {
      if (!enValues.has(keyPath)) {
        console.warn(`[message-coverage] '${locale}.ts' has key '${keyPath}' with no English counterpart`);
      }
    }
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const header = ['key', 'en_text', ...NON_ENGLISH_LOCALES];
  const lines = [header.join(',')];
  for (const row of messageRows) {
    const cells = [row.key, row.enText, ...NON_ENGLISH_LOCALES.map((l) => row.values[l])];
    lines.push(cells.map(csvEscape).join(','));
  }
  fs.writeFileSync(MESSAGE_COVERAGE_CSV, lines.join('\n') + '\n', 'utf8');

  const identicalByLocale = {};
  for (const locale of NON_ENGLISH_LOCALES) {
    identicalByLocale[locale] = messageRows.filter((r) => r.values[locale] === 'identical-to-english').length;
  }
  console.log(`Wrote ${messageRows.length} keys x ${NON_ENGLISH_LOCALES.length} locales to ${MESSAGE_COVERAGE_CSV}`);
  console.log('missing (should be 0):', missingCount);
  console.log('identical-to-english counts by locale:', identicalByLocale);
}

// ---------------------------------------------------------------------------
// Phase 4 — bilingual quality-review packets
// ---------------------------------------------------------------------------

/** Flattens an item's object literal to one readable text blob (fields in
 *  source order, one per line) rather than separate rows — Phase 1/2/3 all
 *  need per-field granularity, this deliberately doesn't: a reviewer reading
 *  "does this German property page read as well as the English one" wants
 *  the whole thing, not a table, and per Phase 2's own finding, positionally
 *  pairing en_paragraphs[i] with de_paragraphs[i] is actively misleading
 *  when the two locales legitimately have different paragraph counts. */
function flattenItemToText(node) {
  if (!node) return '';
  if (ts.isObjectLiteralExpression(node)) {
    // The { text: '...', trailingBreak: false } paragraph-object form —
    // same special case flattenNode already has. Without this, the generic
    // property walk below stringifies `trailingBreak: false` as a phantom
    // "false" line (found via three independent locale reviews flagging an
    // identical EN/locale "false" line — it was this bug, not a content
    // issue; see docs/i18n-content-audit/plan.md's Phase 4 entry).
    const textProp = node.properties.find(
      (p) => ts.isPropertyAssignment(p) && p.name.getText() === 'text'
    );
    if (textProp) return flattenItemToText(textProp.initializer);
    return node.properties
      .filter(ts.isPropertyAssignment)
      .map((p) => flattenItemToText(p.initializer))
      .filter(Boolean)
      .join('\n');
  }
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map(flattenItemToText).filter(Boolean).join('\n');
  }
  const text = normalise(flattenNode(node));
  return text || '';
}

/** Gets `objectLiteral[locale]`'s initializer node, or undefined if that
 *  locale has no dedicated block (Phase 2 confirmed there are none among
 *  the sources this walks, but this doesn't assume that stays true). */
function localeBlock(objectLiteral, locale) {
  if (!objectLiteral || !ts.isObjectLiteralExpression(objectLiteral)) return undefined;
  const prop = objectLiteral.properties.find(
    (p) => ts.isPropertyAssignment(p) && p.name.getText() === locale
  );
  return prop ? prop.initializer : undefined;
}

function writeQualityPacket(locale) {
  const listingsFile = path.join(ROOT, 'src', 'i18n', 'content', 'listings.ts');
  const lsf = parseFile(listingsFile);
  const content = findTopLevelConst(lsf, 'CONTENT');
  if (!content || !ts.isObjectLiteralExpression(content)) {
    throw new Error('CONTENT not found in listings.ts — extraction script is out of date');
  }

  const blogFile = path.join(ROOT, 'src', 'i18n', 'content', 'blog.tsx');
  const bsf = parseFile(blogFile);

  const discoverFile = path.join(ROOT, 'src', 'i18n', 'content', 'discover.tsx');
  const dsf = parseFile(discoverFile);

  const sections = [];

  // Listings
  for (const prop of content.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;
    const key = prop.name.getText();
    const enBlock = localeBlock(prop.initializer, 'en');
    const localeBlockNode = localeBlock(prop.initializer, locale);
    sections.push({
      heading: `listing / ${key}`,
      en: enBlock ? flattenItemToText(enBlock) : '(no English block — extraction script is out of date)',
      locale: localeBlockNode ? flattenItemToText(localeBlockNode) : '(FALLS BACK TO ENGLISH — no dedicated block)',
    });
  }

  // Blog
  for (const constName of BLOG_ARTICLE_CONSTS) {
    const decl = findTopLevelConst(bsf, constName);
    if (!decl || !ts.isObjectLiteralExpression(decl)) {
      console.warn(`[quality-packet] blog const '${constName}' not found — skipping`);
      continue;
    }
    const enBlock = localeBlock(decl, 'en');
    const localeBlockNode = localeBlock(decl, locale);
    sections.push({
      heading: `blog / ${constName}`,
      en: enBlock ? flattenItemToText(enBlock) : '(no English block — extraction script is out of date)',
      locale: localeBlockNode ? flattenItemToText(localeBlockNode) : '(FALLS BACK TO ENGLISH — no dedicated block)',
    });
  }

  // Discover — separate top-level consts, not a Partial<Record<Locale,T>>
  // at the point being read (see coverageDiscover's comment for why).
  const enDiscover = findTopLevelConst(dsf, 'en');
  const localeDiscover = findTopLevelConst(dsf, locale);
  sections.push({
    heading: 'discover / homepage',
    en: enDiscover ? flattenItemToText(enDiscover) : '(no English block — extraction script is out of date)',
    locale: localeDiscover ? flattenItemToText(localeDiscover) : '(FALLS BACK TO ENGLISH — no dedicated block)',
  });

  // Amenities — different mechanism, appended as its own section rather than
  // forced through the en/locale pairing above (see this mode's header note).
  let amenitiesText;
  if (locale === 'es') {
    const constantsFile = path.join(ROOT, 'src', 'utils', 'constants.ts');
    const csf = parseFile(constantsFile);
    const lines = [];
    for (const constName of AMENITY_SOURCE_ARRAYS) {
      const arr = findTopLevelConst(csf, constName);
      if (!arr || !ts.isArrayLiteralExpression(arr)) continue;
      for (const el of arr.elements) {
        if (!ts.isObjectLiteralExpression(el)) continue;
        const get = (k) => {
          const p = el.properties.find((pr) => ts.isPropertyAssignment(pr) && pr.name.getText() === k);
          return p ? flattenNode(p.initializer) : undefined;
        };
        const code = get('houseLangCode');
        if (!code || !code.endsWith('ES')) continue;
        const name = get('name');
        const amenitiesProp = el.properties.find((pr) => ts.isPropertyAssignment(pr) && pr.name.getText() === 'amenities');
        const amenityNames = amenitiesProp && ts.isArrayLiteralExpression(amenitiesProp.initializer)
          ? amenitiesProp.initializer.elements
              .filter(ts.isObjectLiteralExpression)
              .map((a) => {
                const p = a.properties.find((pr) => ts.isPropertyAssignment(pr) && pr.name.getText() === 'name');
                return p ? flattenNode(p.initializer) : null;
              })
              .filter(Boolean)
          : [];
        lines.push(`${code.replace(/ES$/, '')}: ${name}\n  amenities: ${amenityNames.join(', ')}`);
      }
    }
    amenitiesText = lines.join('\n\n');
  } else if (AMENITY_LABEL_LOCALES.includes(locale)) {
    const constantsFile = path.join(ROOT, 'src', 'utils', 'constants.ts');
    const csf = parseFile(constantsFile);
    const amenityNames = new Set();
    for (const constName of AMENITY_SOURCE_ARRAYS) {
      const arr = findTopLevelConst(csf, constName);
      if (!arr || !ts.isArrayLiteralExpression(arr)) continue;
      for (const el of arr.elements) {
        if (!ts.isObjectLiteralExpression(el)) continue;
        const codeProp = el.properties.find((pr) => ts.isPropertyAssignment(pr) && pr.name.getText() === 'houseLangCode');
        const code = codeProp ? flattenNode(codeProp.initializer) : '';
        if (code.endsWith('ES')) continue;
        const amenitiesProp = el.properties.find((pr) => ts.isPropertyAssignment(pr) && pr.name.getText() === 'amenities');
        if (!amenitiesProp || !ts.isArrayLiteralExpression(amenitiesProp.initializer)) continue;
        for (const a of amenitiesProp.initializer.elements) {
          if (!ts.isObjectLiteralExpression(a)) continue;
          const p = a.properties.find((pr) => ts.isPropertyAssignment(pr) && pr.name.getText() === 'name');
          if (p) amenityNames.add(flattenNode(p.initializer));
        }
      }
    }
    const labelsFile = path.join(ROOT, 'src', 'i18n', 'amenityLabels.ts');
    const alsf = parseFile(labelsFile);
    const labels = findTopLevelConst(alsf, 'AMENITY_LABELS');
    const lines = [];
    for (const name of amenityNames) {
      const entryProp = labels.properties.find(
        (p) => ts.isPropertyAssignment(p) && flattenNode(p.name) === name
      );
      const localeProp = entryProp && ts.isObjectLiteralExpression(entryProp.initializer)
        ? entryProp.initializer.properties.find((p) => ts.isPropertyAssignment(p) && p.name.getText() === locale)
        : undefined;
      const translated = localeProp ? flattenNode(localeProp.initializer) : '(missing)';
      lines.push(`${name}  ->  ${translated}`);
    }
    amenitiesText = lines.join('\n');
  } else {
    amenitiesText = '(not applicable for this locale)';
  }

  fs.mkdirSync(QUALITY_PACKET_DIR, { recursive: true });
  const out = [];
  out.push(`# Quality review packet: ${locale} vs. en`);
  out.push('');
  out.push('English on the left of each pair for reference; this locale\'s own text follows. Each item\'s fields are flattened into one blob in source order, not shown field-by-field — see the script header for why. This is LLM-assisted review input, not a substitute for native-speaker sign-off (docs/i18n-content-audit/plan.md, Phase 4).');
  out.push('');
  for (const s of sections) {
    out.push(`## ${s.heading}`);
    out.push('');
    out.push('**English:**');
    out.push('```');
    out.push(s.en);
    out.push('```');
    out.push('');
    out.push(`**${locale}:**`);
    out.push('```');
    out.push(s.locale);
    out.push('```');
    out.push('');
  }
  out.push('## amenities');
  out.push('');
  out.push('```');
  out.push(amenitiesText);
  out.push('```');

  const outFile = path.join(QUALITY_PACKET_DIR, `${locale}-vs-en.md`);
  fs.writeFileSync(outFile, out.join('\n') + '\n', 'utf8');
  console.log(`Wrote ${outFile} (${sections.length} listing/blog/discover items + amenities)`);
}

function writeAllQualityPackets() {
  for (const locale of NON_ENGLISH_LOCALES) {
    writeQualityPacket(locale);
  }
}

function writeCoverageMatrix() {
  coverageListings();
  coverageBlog();
  coverageDiscover();
  coverageAmenitiesEs();
  coverageAmenitiesLabels();

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const header = ['section', 'item_type', 'item', ...NON_ENGLISH_LOCALES];
  const lines = [header.join(',')];
  for (const row of coverageRows) {
    const cells = [row.section, row.itemType, row.item, ...NON_ENGLISH_LOCALES.map((l) => row.values[l] ?? 'n/a')];
    lines.push(cells.map(csvEscape).join(','));
  }
  fs.writeFileSync(COVERAGE_CSV, lines.join('\n') + '\n', 'utf8');

  const bySection = {};
  for (const row of coverageRows) bySection[row.section] = (bySection[row.section] || 0) + 1;
  console.log(`Wrote ${coverageRows.length} rows to ${COVERAGE_CSV}`);
  console.log(bySection);
}

// ---------------------------------------------------------------------------
function csvEscape(value) {
  const s = String(value ?? '');
  if (/[",\n]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function extractEnSourceOfTruth() {
  extractAmenities();
  extractListings();
  extractBlog();
  extractDiscover();

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const header = ['section', 'item', 'field', 'en_text'];
  const lines = [header.join(',')];
  for (const row of rows) {
    lines.push(header.map((h) => csvEscape(row[h])).join(','));
  }
  fs.writeFileSync(OUT_CSV, lines.join('\n') + '\n', 'utf8');

  const bySection = {};
  for (const row of rows) {
    bySection[row.section] = (bySection[row.section] || 0) + 1;
  }
  console.log(`Wrote ${rows.length} rows to ${OUT_CSV}`);
  console.log(bySection);
}

function main() {
  if (process.argv.includes('--coverage-matrix')) {
    writeCoverageMatrix();
  } else if (process.argv.includes('--message-coverage')) {
    writeMessageCatalogCoverage();
  } else if (process.argv.includes('--quality-packets')) {
    writeAllQualityPackets();
  } else {
    extractEnSourceOfTruth();
  }
}

main();
