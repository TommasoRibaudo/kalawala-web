import React from 'react';
import { Link } from 'react-router-dom';
import { PROPERTY_DISPLAY_NAMES, BLOG_ARTICLES } from '../../utils/constants';
import './Footer.style.scss';
import { bookingPath, getMessages, type Locale } from '../../i18n';
import { blogArticleHeading } from '../../i18n/blogArticleHeadings';
import { pathForKey, routeKeyForSlug } from '../../routes.config';

interface IFooter {
  locale: Locale;
}

// A curated handful of evergreen guides for the footer. BLOG_ARTICLES holds 26
// entries (including 13 month-by-month weather posts) — far too many to list in
// the footer. Keep this to the highest-value, non-redundant guides.
const FOOTER_GUIDE_ROUTE_KEYS = [
  'blogBeaches',
  'blogCahuitapark',
  'blogBesttime',
  'blogHiddengems',
  'blogTwodays',
  'blogGandoca',
];

const Footer: React.FC<IFooter> = ({ locale }) => {
  const m = getMessages(locale);
  const bookPath = bookingPath(locale);

  const footerGuides = FOOTER_GUIDE_ROUTE_KEYS.map((routeKey) =>
    BLOG_ARTICLES.find((article) => article.routeKey === routeKey),
  ).filter((article): article is (typeof BLOG_ARTICLES)[number] => Boolean(article));

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>{m.footer.ourHomes}</h4>
            <ul>
              {Object.entries(PROPERTY_DISPLAY_NAMES).map(([code, name]) => {
                const key = routeKeyForSlug(code);
                return key ? (
                  <li key={code}>
                    <Link to={pathForKey(key, locale)}>{name}</Link>
                  </li>
                ) : null;
              })}
            </ul>
          </div>

          <div className="footer-col">
            <h4>{m.footer.travelGuides}</h4>
            <ul>
              {/* Locale-keyed DATA, not chrome: title reuses the Phase-8-translated
                  blog.tsx heading for this article; path comes straight from
                  routes.config.ts. Both resolve per-locale, not just en/es. */}
              {footerGuides.map((article) => (
                <li key={article.key}>
                  <Link to={pathForKey(article.routeKey, locale)}>
                    {blogArticleHeading(article.routeKey, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>{m.footer.contact}</h4>
            <ul className="footer-contact">
              <li>
                <a href="tel:+50684632276">+506 8463-2276</a>
              </li>
              <li>
                <a href="https://wa.me/50684632276" target="_blank" rel="noopener noreferrer">
                  {m.footer.chatOnWhatsApp}
                </a>
              </li>
              <li>
                <a href="mailto:reservas.kalawala@gmail.com">reservas.kalawala@gmail.com</a>
              </li>
              <li className="footer-address">Puerto Viejo de Talamanca, Costa Rica</li>
            </ul>
          </div>

          <div className="footer-col footer-cta-col">
            <h4>{m.common.readyToBook}</h4>
            <Link to={bookPath} className="footer-cta-btn">
              {m.common.checkAvailability}
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>Reservas Kalawala &middot; Puerto Viejo de Talamanca, Costa Rica</span>
          <span className="footer-copyright">
            &copy; {new Date().getFullYear()} Reservas Kalawala. {m.footer.copyrightNotice}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
