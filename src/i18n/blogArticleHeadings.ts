import type { Locale } from './locales';
import type { RouteKey } from '../routes.config';
import {
  tenHoursInPuertoContent,
  puertoViejoByPlaneContent,
  twoDaysInPVContent,
  gettingToGandocaContent,
  travellingToPuertoContent,
  cahuitaParkContent,
  bestTimeToVisitContent,
  indigenousTravelContent,
  puertoHiddenGemsContent,
  busHoursContent,
  weatherHubContent,
  weatherJanuaryContent,
  weatherFebruaryContent,
  weatherMarchContent,
  weatherAprilContent,
  weatherMayContent,
  weatherJuneContent,
  weatherJulyContent,
  weatherAugustContent,
  weatherSeptemberContent,
  weatherOctoberContent,
  weatherNovemberContent,
  weatherDecemberContent,
  sanJoseOptionsContent,
  gandocaRefugeContent,
  beachesContent,
  bocasDelToroContent,
  thingsToDoContent,
  resolveMonthlyWeatherYear,
} from './content/blog';

/**
 * Every blog article's translated `heading` (and `seoTitle`), keyed by its
 * routes.config.ts RouteKey — the single place that reuses Phase 8's
 * per-article translations for the cross-linking widgets (OtherBlogs,
 * Footer's "Travel Guides" column, BlogIndex) instead of each maintaining
 * its own separate, EN/ES-only title. Each of the 10 blog content modules
 * has its own distinct TypeScript interface (see blog.tsx), but all of them
 * share `seoTitle`/`heading` as their first two fields, so this only reaches
 * for the two fields every shape has in common.
 */
const BLOG_HEADING_BY_ROUTE_KEY: Partial<Record<RouteKey, (locale: Locale) => string>> = {
  blogTwodays: (l) => twoDaysInPVContent(l).heading,
  blogGandoca: (l) => gettingToGandocaContent(l).heading,
  blogSanjose: (l) => travellingToPuertoContent(l).heading,
  blogByplane: (l) => puertoViejoByPlaneContent(l).heading,
  blogTenhours: (l) => tenHoursInPuertoContent(l).heading,
  blogBushours: (l) => busHoursContent(l).heading,
  blogCahuitapark: (l) => cahuitaParkContent(l).heading,
  blogIndigenous: (l) => indigenousTravelContent(l).heading,
  blogBesttime: (l) => bestTimeToVisitContent(l).heading,
  blogHiddengems: (l) => puertoHiddenGemsContent(l).heading,
  blogWeather: (l) => weatherHubContent(l).heading,
  blogWeatherJan: (l) => resolveMonthlyWeatherYear('january', weatherJanuaryContent(l).heading),
  blogWeatherFeb: (l) => resolveMonthlyWeatherYear('february', weatherFebruaryContent(l).heading),
  blogWeatherMar: (l) => resolveMonthlyWeatherYear('march', weatherMarchContent(l).heading),
  blogWeatherApr: (l) => resolveMonthlyWeatherYear('april', weatherAprilContent(l).heading),
  blogWeatherMay: (l) => resolveMonthlyWeatherYear('may', weatherMayContent(l).heading),
  blogWeatherJun: (l) => resolveMonthlyWeatherYear('june', weatherJuneContent(l).heading),
  blogWeatherJul: (l) => resolveMonthlyWeatherYear('july', weatherJulyContent(l).heading),
  blogWeatherAug: (l) => resolveMonthlyWeatherYear('august', weatherAugustContent(l).heading),
  blogWeatherSep: (l) => resolveMonthlyWeatherYear('september', weatherSeptemberContent(l).heading),
  blogWeatherOct: (l) => resolveMonthlyWeatherYear('october', weatherOctoberContent(l).heading),
  blogWeatherNov: (l) => resolveMonthlyWeatherYear('november', weatherNovemberContent(l).heading),
  blogWeatherDec: (l) => resolveMonthlyWeatherYear('december', weatherDecemberContent(l).heading),
  blogSanjoseOptions: (l) => sanJoseOptionsContent(l).heading,
  blogGandocaRefuge: (l) => gandocaRefugeContent(l).heading,
  blogBeaches: (l) => beachesContent(l).heading,
  blogBocas: (l) => bocasDelToroContent(l).heading,
  blogThingsToDo: (l) => thingsToDoContent(l).heading,
};

export function blogArticleHeading(routeKey: RouteKey, locale: Locale): string {
  return BLOG_HEADING_BY_ROUTE_KEY[routeKey]?.(locale) ?? routeKey;
}
