import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';
import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from './i18n';
import routesManifest from './routes.manifest.json';

/*
 * Single source of truth for "what pages exist, and what is each one's URL in
 * each locale". Phase 1-3 centralised *locale detection* into
 * detectLocaleFromPath; this centralises *locale-aware path construction*,
 * which until now was nine independent hand-rolled `${slug}${suffix}`
 * templates across HelpMeChoose, HomeCard, OurOtherHomes, OtherListings,
 * OtherBlogs, ListingAd, Footer, Flag.component, NotFound.page, Portal.page,
 * PortalDetail.page, PortalGuard and Booking.page — the same drift pattern
 * `detectLocaleFromPath`'s own file warned about, just on the write side
 * instead of the read side.
 *
 * Every routed page is code-split, same as before this file existed — the
 * `webpackChunkName` comments are load-bearing (see Router.tsx's original
 * comment, preserved there): scripts/inject-route-preloads.js recomputes
 * these names after build and fails if one goes missing from
 * asset-manifest.json. A locale pair (e.g. English and Spanish "Geco") is
 * still the same module and therefore the same chunk — the URL now carries
 * the locale in its own path segment instead of in the slug, so there is no
 * more EN/ES chunk-name collision to work around.
 *
 * Slugs stay English across locales for the first release, per the plan's
 * locked decision — property and article names are proper nouns, and it
 * keeps this table one-to-one. They also stay exactly the same text the
 * legacy `/PascalCase` paths used, just lowercased, so Phase 5's redirect map
 * has one predictable rule (old path, lowercased, locale-prefixed) rather
 * than a hand-picked new slug per page.
 *
 * PHASE 9: the per-route data (chunk name, slugs, prerender/sitemap flags)
 * lives in ./routes.manifest.json, not inline here, so a plain Node postbuild
 * script can read it directly — `lazy(() => import(...))` calls React and
 * webpack's magic comments, which a script run with plain `node` cannot
 * parse. scripts/generate-reactsnap-include.js is the one script in the
 * postbuild chain that actually needs this table (every other script reads
 * its *output*, package.json's reactSnap.include, instead); before Phase 9
 * that array was hand-typed and had silently drifted to 45 EN/ES-only
 * entries after RELEASED_LOCALES grew to eight. `component` stays here,
 * TS/React-only, and is zipped onto each manifest entry below.
 */

const Home = lazy(() => import(/* webpackChunkName: "route-home" */ './pages/Home/Home.page'));
const BookingPage = lazy(() => import(/* webpackChunkName: "route-book" */ './pages/Booking.page'));
const PortalLoginPage = lazy(() => import(/* webpackChunkName: "route-portal" */ './pages/Portal.page'));
const PortalDetailPage = lazy(() => import(/* webpackChunkName: "route-portal-detail" */ './pages/PortalDetail.page'));
const ListingGeco = lazy(() => import(/* webpackChunkName: "route-geco" */ './pages/Listing/staticPages/ListingGeco.page'));
const ListingRana = lazy(() => import(/* webpackChunkName: "route-rana" */ './pages/Listing/staticPages/ListingRana.page'));
const ListingTucano = lazy(() => import(/* webpackChunkName: "route-tucano" */ './pages/Listing/staticPages/ListingTucano.page'));
const ListingPappagallo = lazy(() => import(/* webpackChunkName: "route-pappagallo" */ './pages/Listing/staticPages/ListingPappagallo.page'));
const ListingDelfin = lazy(() => import(/* webpackChunkName: "route-delfin" */ './pages/Listing/staticPages/ListingDelfin.page'));
const ListingAreka = lazy(() => import(/* webpackChunkName: "route-areka" */ './pages/Listing/staticPages/ListingAreka.page'));
const ListingGiulia = lazy(() => import(/* webpackChunkName: "route-giulia" */ './pages/Listing/staticPages/ListingGiulia.page'));
const ListingPlumeria = lazy(() => import(/* webpackChunkName: "route-plumeria" */ './pages/Listing/staticPages/ListingPlumeria.page'));
const ListingVillaMar = lazy(() => import(/* webpackChunkName: "route-villamar" */ './pages/Listing/staticPages/ListingVillaMar.page'));
const ListingVillaCoral = lazy(() => import(/* webpackChunkName: "route-villacoral" */ './pages/Listing/staticPages/ListingVillaCoral.page'));
const BlogIndex = lazy(() => import(/* webpackChunkName: "route-blog" */ './pages/Blog/BlogIndex.page'));
const TwoDaysInPV = lazy(() => import(/* webpackChunkName: "route-twodaysinpuertoviejo" */ './pages/Blog/staticPages/TwoDaysInPV'));
const GettingToGandoca = lazy(() => import(/* webpackChunkName: "route-gettingtogandoca" */ './pages/Blog/staticPages/GettingToGandoca'));
const TravellingToPuerto = lazy(() => import(/* webpackChunkName: "route-travellingtopuertoviejo" */ './pages/Blog/staticPages/TravellingToPuerto'));
const PuertoViejoByPlane = lazy(() => import(/* webpackChunkName: "route-puertoviejobyplane" */ './pages/Blog/staticPages/PuertoViejoByPlane'));
const TenHoursInPuerto = lazy(() => import(/* webpackChunkName: "route-tenhoursinpuerto" */ './pages/Blog/staticPages/TenHoursInPuerto'));
const BusHours = lazy(() => import(/* webpackChunkName: "route-bushours" */ './pages/Blog/staticPages/BusHours'));
const CahuitaPark = lazy(() => import(/* webpackChunkName: "route-cahuitaparkwhattodo" */ './pages/Blog/staticPages/CahuitaPark'));
const IndigenousTravel = lazy(() => import(/* webpackChunkName: "route-indigenoustravelpv" */ './pages/Blog/staticPages/IndigenousTravel'));
const BestTimeToVisitPuerto = lazy(() => import(/* webpackChunkName: "route-besttimetovisitpuerto" */ './pages/Blog/staticPages/BestTimeToVisitPuerto'));
const PuertoHiddenGems = lazy(() => import(/* webpackChunkName: "route-puertohiddengems" */ './pages/Blog/staticPages/PuertoHiddenGems'));
const Success = lazy(() => import(/* webpackChunkName: "route-success" */ './pages/Home/Success.page'));

export type RouteKey =
  | 'home' | 'book' | 'bookReturn' | 'bookConfirmed' | 'portal' | 'portalDetail'
  | 'geco' | 'rana' | 'tucano' | 'pappagallo' | 'delfin' | 'areka' | 'giulia' | 'plumeria' | 'villamar' | 'villacoral'
  | 'blog' | 'blogTwodays' | 'blogGandoca' | 'blogSanjose' | 'blogByplane' | 'blogTenhours' | 'blogBushours' | 'blogCahuitapark' | 'blogIndigenous' | 'blogBesttime' | 'blogHiddengems'
  | 'success';

export interface RouteDef {
  /** Stable internal id — never shown to a visitor, safe to keep even if the slug changes. */
  key: RouteKey;
  component: LazyExoticComponent<ComponentType<any>>;
  /** webpackChunkName shared by every locale variant of this page. */
  chunk: string;
  /**
   * Path segment per locale, without the leading `/` or the locale prefix.
   * `''` means "this locale's home" (only the `home` entry uses it).
   * Unreleased locales fall back to the English slug, same fallback shape as
   * `getMessages`/content lookups elsewhere in `src/i18n/`.
   */
  slugs: Partial<Record<Locale, string>>;
  /** Static pages get prerendered by react-snap; session/dynamic ones don't. Default true. */
  prerender?: boolean;
  /** Whether the page belongs in the sitemap. Default true. */
  sitemap?: boolean;
}

/** The one piece of each route that can't live in JSON — its lazy-loaded component. */
const COMPONENTS: Record<RouteKey, LazyExoticComponent<ComponentType<any>>> = {
  home: Home,
  book: BookingPage,
  bookReturn: BookingPage,
  bookConfirmed: BookingPage,
  portal: PortalLoginPage,
  portalDetail: PortalDetailPage,
  geco: ListingGeco,
  rana: ListingRana,
  tucano: ListingTucano,
  pappagallo: ListingPappagallo,
  delfin: ListingDelfin,
  areka: ListingAreka,
  giulia: ListingGiulia,
  plumeria: ListingPlumeria,
  villamar: ListingVillaMar,
  villacoral: ListingVillaCoral,
  blog: BlogIndex,
  blogTwodays: TwoDaysInPV,
  blogGandoca: GettingToGandoca,
  blogSanjose: TravellingToPuerto,
  blogByplane: PuertoViejoByPlane,
  blogTenhours: TenHoursInPuerto,
  blogBushours: BusHours,
  blogCahuitapark: CahuitaPark,
  blogIndigenous: IndigenousTravel,
  blogBesttime: BestTimeToVisitPuerto,
  blogHiddengems: PuertoHiddenGems,
  success: Success,
};

/**
 * Same 26 modules as COMPONENTS above, same import() call sites (webpack
 * chunks by module + webpackChunkName, so two import()s of one module with
 * the same magic comment collapse into the same chunk — not a duplicate),
 * just not wrapped in lazy(). Feeds routeLoader.tsx's plain promise-based
 * loader instead of React.lazy()/<Suspense> — see that file for why.
 *
 * Stage A of the hydration-cause-#3 fix (docs/i18n-rollout-plan.md, Phase 11
 * P2): purely additive, nothing consumes this yet. Stage B removes
 * COMPONENTS/lazy entirely once Router.tsx and index.tsx are wired to this
 * instead.
 */
export const LOADERS: Record<RouteKey, () => Promise<{ default: ComponentType<any> }>> = {
  home: () => import(/* webpackChunkName: "route-home" */ './pages/Home/Home.page'),
  book: () => import(/* webpackChunkName: "route-book" */ './pages/Booking.page'),
  bookReturn: () => import(/* webpackChunkName: "route-book" */ './pages/Booking.page'),
  bookConfirmed: () => import(/* webpackChunkName: "route-book" */ './pages/Booking.page'),
  portal: () => import(/* webpackChunkName: "route-portal" */ './pages/Portal.page'),
  portalDetail: () => import(/* webpackChunkName: "route-portal-detail" */ './pages/PortalDetail.page'),
  geco: () => import(/* webpackChunkName: "route-geco" */ './pages/Listing/staticPages/ListingGeco.page'),
  rana: () => import(/* webpackChunkName: "route-rana" */ './pages/Listing/staticPages/ListingRana.page'),
  tucano: () => import(/* webpackChunkName: "route-tucano" */ './pages/Listing/staticPages/ListingTucano.page'),
  pappagallo: () => import(/* webpackChunkName: "route-pappagallo" */ './pages/Listing/staticPages/ListingPappagallo.page'),
  delfin: () => import(/* webpackChunkName: "route-delfin" */ './pages/Listing/staticPages/ListingDelfin.page'),
  areka: () => import(/* webpackChunkName: "route-areka" */ './pages/Listing/staticPages/ListingAreka.page'),
  giulia: () => import(/* webpackChunkName: "route-giulia" */ './pages/Listing/staticPages/ListingGiulia.page'),
  plumeria: () => import(/* webpackChunkName: "route-plumeria" */ './pages/Listing/staticPages/ListingPlumeria.page'),
  villamar: () => import(/* webpackChunkName: "route-villamar" */ './pages/Listing/staticPages/ListingVillaMar.page'),
  villacoral: () => import(/* webpackChunkName: "route-villacoral" */ './pages/Listing/staticPages/ListingVillaCoral.page'),
  blog: () => import(/* webpackChunkName: "route-blog" */ './pages/Blog/BlogIndex.page'),
  blogTwodays: () => import(/* webpackChunkName: "route-twodaysinpuertoviejo" */ './pages/Blog/staticPages/TwoDaysInPV'),
  blogGandoca: () => import(/* webpackChunkName: "route-gettingtogandoca" */ './pages/Blog/staticPages/GettingToGandoca'),
  blogSanjose: () => import(/* webpackChunkName: "route-travellingtopuertoviejo" */ './pages/Blog/staticPages/TravellingToPuerto'),
  blogByplane: () => import(/* webpackChunkName: "route-puertoviejobyplane" */ './pages/Blog/staticPages/PuertoViejoByPlane'),
  blogTenhours: () => import(/* webpackChunkName: "route-tenhoursinpuerto" */ './pages/Blog/staticPages/TenHoursInPuerto'),
  blogBushours: () => import(/* webpackChunkName: "route-bushours" */ './pages/Blog/staticPages/BusHours'),
  blogCahuitapark: () => import(/* webpackChunkName: "route-cahuitaparkwhattodo" */ './pages/Blog/staticPages/CahuitaPark'),
  blogIndigenous: () => import(/* webpackChunkName: "route-indigenoustravelpv" */ './pages/Blog/staticPages/IndigenousTravel'),
  blogBesttime: () => import(/* webpackChunkName: "route-besttimetovisitpuerto" */ './pages/Blog/staticPages/BestTimeToVisitPuerto'),
  blogHiddengems: () => import(/* webpackChunkName: "route-puertohiddengems" */ './pages/Blog/staticPages/PuertoHiddenGems'),
  success: () => import(/* webpackChunkName: "route-success" */ './pages/Home/Success.page'),
};

interface ManifestEntry {
  key: string;
  chunk: string;
  slugs: Partial<Record<Locale, string>>;
  prerender?: boolean;
  sitemap?: boolean;
}

export const ROUTES: Record<RouteKey, RouteDef> = Object.fromEntries(
  (routesManifest.routes as ManifestEntry[]).map((entry) => {
    const key = entry.key as RouteKey;
    return [key, { ...entry, key, component: COMPONENTS[key] }];
  })
) as Record<RouteKey, RouteDef>;

/**
 * Full path for a page in a given locale.
 *
 * English keeps the bare root (`/`) for `home` only — every other English
 * page, and every locale's home other than English, gets the regular
 * `/:locale/slug` treatment. This is the one asymmetry in the whole table,
 * and it lives here once instead of in nine call sites' worth of special
 * cases.
 */
export function pathForKey(key: RouteKey, locale: Locale): string {
  const def = ROUTES[key];
  if (key === 'home' && locale === DEFAULT_LOCALE) return '/';
  const slug = def.slugs[locale] ?? def.slugs[DEFAULT_LOCALE] ?? '';
  return slug ? `/${locale}/${slug}` : `/${locale}/`;
}

// `home`'s slug is '' (falsy but defined) and must still be indexable — a
// bare truthy check would silently drop it and break pathForLegacyId("HomeES").
const SLUG_TO_KEY: Partial<Record<string, RouteKey>> = {};
for (const key of Object.keys(ROUTES) as RouteKey[]) {
  const slug = ROUTES[key].slugs[DEFAULT_LOCALE];
  if (slug !== undefined) SLUG_TO_KEY[slug] = key;
}
SLUG_TO_KEY['home'] = 'home'; // "Home" / "HomeES" legacy identifiers, distinct from the '' slug key above

/**
 * Looks up a route by its bare (English) slug or legacy EN-only identifier —
 * e.g. `"Geco"` or `"Villa Mar"` (spaced `ListingType.name` values are one of
 * the identifiers callers pass), case- and whitespace-insensitively — with no
 * ES-suffix inference. For callers that already know the target locale
 * separately (Footer builds a `{code, locale}` pair from
 * `PROPERTY_DISPLAY_NAMES` and the current page's locale, not from a
 * suffixed id) and would get the wrong answer from `pathForLegacyId`, which
 * always reads locale off the string itself.
 */
export function routeKeyForSlug(slug: string): RouteKey | undefined {
  return SLUG_TO_KEY[slug.toLowerCase().replace(/\s/g, '')];
}

/**
 * Bridges legacy ES-suffixed identifiers — a `houseLangCode` like `"GecoES"`,
 * a `ListingType.name` like `"Villa Mar"` / `"GiuliaES"`, or a blog article
 * `id` like `"twodaysinpuertoviejoES"` — to the new locale-prefixed path,
 * without requiring every call site that still passes one of these strings
 * around to be rewritten to pass a `{key, locale}` pair directly.
 * Case-sensitive on the "ES" suffix, matching `detectLocaleFromPath`'s
 * existing rule.
 */
export function pathForLegacyId(id: string): string {
  const isEs = id.endsWith('ES');
  const base = isEs ? id.slice(0, -2) : id;
  const key = routeKeyForSlug(base);
  if (!key) {
    throw new Error(`pathForLegacyId: no route matches legacy id "${id}" (looked up "${base}")`);
  }
  return pathForKey(key, isEs ? 'es' : DEFAULT_LOCALE);
}

/** True if every literal segment matches and `:param` segments line up positionally. */
function slugPatternMatches(pattern: string, actual: string): Record<string, string> | null {
  const patternParts = pattern.split('/');
  const actualParts = actual.split('/');
  if (patternParts.length !== actualParts.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      params[patternParts[i].slice(1)] = actualParts[i];
    } else if (patternParts[i] !== actualParts[i]) {
      return null;
    }
  }
  return params;
}

/**
 * Reverse of `pathForKey`: given a full pathname, which page is it and what
 * dynamic params (if any) does it carry? Used by the language switcher to
 * find "the same page, other locale" rather than guessing from string
 * suffixes — the thing `getAlternateLanguagePath` in Flag.component.tsx did
 * before Phase 4, one `…ES` string transform at a time.
 */
export function routeKeyForPath(pathname: string): { key: RouteKey; params: Record<string, string> } | undefined {
  const segments = pathname.split('/').filter(Boolean);
  const maybeLocale = segments[0];
  const restSegments = isLocale(maybeLocale) ? segments.slice(1) : segments;
  const rest = restSegments.join('/');
  if (rest === '') return { key: 'home', params: {} };
  for (const key of Object.keys(ROUTES) as RouteKey[]) {
    const slug = ROUTES[key].slugs[DEFAULT_LOCALE];
    if (slug === undefined) continue;
    const params = slugPatternMatches(slug, rest);
    if (params) return { key, params };
  }
  return undefined;
}

/**
 * The same page `pathname` points to, rendered for `locale` instead — with
 * any dynamic segment (e.g. a portal reservation id) carried over rather
 * than left as a literal `:param` placeholder. Returns `undefined` if
 * `pathname` doesn't match any known page (a 404, typically), so the caller
 * can decide what to do rather than silently linking somewhere wrong.
 */
export function pathInLocale(pathname: string, locale: Locale): string | undefined {
  const match = routeKeyForPath(pathname);
  if (!match) return undefined;
  const { key, params } = match;
  if (Object.keys(params).length === 0) return pathForKey(key, locale);
  const slug = ROUTES[key].slugs[locale] ?? ROUTES[key].slugs[DEFAULT_LOCALE] ?? '';
  const filledSlug = slug.split('/').map((part) => (part.startsWith(':') ? params[part.slice(1)] ?? part : part)).join('/');
  return `/${locale}/${filledSlug}`;
}

/** Every route key whose page should be code-split-preloaded and prerendered. */
export const PRERENDERED_ROUTE_KEYS: RouteKey[] = (Object.keys(ROUTES) as RouteKey[])
  .filter((key) => ROUTES[key].prerender !== false);

export const SITEMAP_ROUTE_KEYS: RouteKey[] = (Object.keys(ROUTES) as RouteKey[])
  .filter((key) => ROUTES[key].sitemap !== false);

// Re-exported so callers that only need the type don't have to reach into ./i18n.
export type { Locale };
export { LOCALES };
