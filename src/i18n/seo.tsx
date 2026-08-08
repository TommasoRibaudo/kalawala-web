import { RouteKey, ROUTES, pathForKey } from '../routes.config';
import { Locale, RELEASED_LOCALES, DEFAULT_LOCALE } from './locales';

/**
 * Canonical/hreflang URLs, generated from routes.config.ts instead of
 * hardcoded per page (Phase 6 of docs/i18n-rollout-plan.md).
 *
 * Trailing slash on prerendered routes is deliberate, not cosmetic: Apache's
 * DirectorySlash 301s an unslashed request for a prerendered page to its
 * slashed form (react-snap emits `geco/index.html`, a directory). A canonical
 * tag pointing at the unslashed URL was exactly the "alternate page with
 * proper canonical tag" indexing problem Search Console flagged — the served
 * page's canonical pointed at a URL that immediately redirected back to it.
 * Session/client-only routes (book, portal, ...) aren't prerendered — no
 * directory exists for them to redirect from — so they keep the unslashed
 * form, matching how they're actually served.
 */

const ORIGIN = 'https://www.reservaskalawala.com';

function seoPath(key: RouteKey, locale: Locale): string {
  const path = pathForKey(key, locale);
  if (ROUTES[key].prerender === false) return path;
  // pathForKey already returns a trailing slash for the empty-slug case
  // (home's "/" and "/es/") — only append one where it's actually missing.
  return path.endsWith('/') ? path : `${path}/`;
}

export function seoUrl(key: RouteKey, locale: Locale): string {
  return ORIGIN + seoPath(key, locale);
}

/** This page's own canonical URL, in its own locale. Never cross-locale. */
export function canonicalUrl(key: RouteKey, locale: Locale): string {
  return seoUrl(key, locale);
}

/**
 * hreflang alternates for every released locale, plus x-default pointing at
 * English (the locked decision for unmatched Accept-Language). Iterates
 * RELEASED_LOCALES rather than the full 8-locale set, so this expands on its
 * own as Phase 8 releases each new language — nothing here needs to change.
 *
 * Returns a plain array of <link> elements rather than a wrapping component:
 * react-helmet only recognises literal host tags (title, meta, link, ...) as
 * *direct* children of <Helmet> — it inspects props.children without ever
 * invoking custom components, so a <HreflangLinks/> component here would be
 * silently dropped instead of rendered. Called inline as
 * `{hreflangLinks('geco')}` inside a page's <Helmet> block, the array's
 * elements are already real <link> elements by the time Helmet sees them.
 */
export function hreflangLinks(routeKey: RouteKey): JSX.Element[] {
  return [
    ...RELEASED_LOCALES.map((locale) => (
      <link key={locale} rel="alternate" hrefLang={locale} href={seoUrl(routeKey, locale)} />
    )),
    <link key="x-default" rel="alternate" hrefLang="x-default" href={seoUrl(routeKey, DEFAULT_LOCALE)} />,
  ];
}
