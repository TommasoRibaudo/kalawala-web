import { Helmet } from 'react-helmet';
import { useDirection, useLocale } from '../../i18n';

/**
 * Keeps `<html lang>` and `<html dir>` in step with the route's locale.
 *
 * `public/index.html` hardcodes `lang="en"`, and only two pages
 * (`NotFound.page.tsx`, `BlogIndex.page_ES.tsx`) ever overrode it. Every other
 * Spanish page therefore shipped `<html lang="en">` while its hreflang tags
 * declared `es` — a contradiction for crawlers, and wrong for screen readers,
 * which pick a voice from this attribute.
 *
 * Rendered once inside the router rather than added to ~20 page components:
 * react-helmet collects from anywhere in the tree, so one mount covers every
 * route, including routes that do not exist yet. Pages that set `<html lang>`
 * in their own Helmet still win — Helmet resolves duplicates last-one-wins —
 * and they set the same value anyway.
 *
 * `dir` is emitted here too, which is what makes Hebrew mirror once its routes
 * exist: the stylesheets use logical properties, so they need nothing beyond
 * this attribute.
 */
export const LocaleHtmlAttrs = () => {
  const locale = useLocale();
  const dir = useDirection();

  return (
    <Helmet>
      <html lang={locale} dir={dir} />
    </Helmet>
  );
};

export default LocaleHtmlAttrs;
