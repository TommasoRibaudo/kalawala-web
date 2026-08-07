import { useLocation } from 'react-router-dom';
import { detectLocaleFromPath } from './detectLocale';
import { Locale } from './locales';

/**
 * The locale of the page currently being viewed.
 *
 * Use this in any component that sits inside the router and needs to know the
 * language. Components that receive a `locale` prop from a parent page should
 * keep using the prop — Phase 3 collapses the duplicated EN/ES page components,
 * and after that the prop threading goes away in favour of this hook.
 */
export function useLocale(): Locale {
  const location = useLocation();
  return detectLocaleFromPath(location.pathname);
}
