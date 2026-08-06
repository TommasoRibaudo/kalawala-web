import React from 'react';
import { Link } from 'react-router-dom';
import { PROPERTY_DISPLAY_NAMES, BLOG_ARTICLES } from '../../utils/constants';
import './Footer.style.scss';
import { bookingPath, getMessages, localeSuffix, type Locale } from '../../i18n';

interface IFooter {
  locale: Locale;
}

const Footer: React.FC<IFooter> = ({ locale }) => {
  const m = getMessages(locale);
  const suffix = localeSuffix(locale);
  const bookPath = bookingPath(locale);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>{m.footer.ourHomes}</h4>
            <ul>
              {Object.entries(PROPERTY_DISPLAY_NAMES).map(([code, name]) => (
                <li key={code}>
                  <Link to={`/${code}${suffix}`}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>{m.footer.travelGuides}</h4>
            <ul>
              {/* Locale-keyed DATA, not chrome: BLOG_ARTICLES stores flat
                  titleEn/titleEs/pathEn/pathEs fields. Phase 3 reshapes these to
                  LocalizedValue and Phase 4 replaces the paths with routes.config. */}
              {BLOG_ARTICLES.map((article) => (
                <li key={article.key}>
                  <Link to={locale === 'es' ? article.pathEs : article.pathEn}>
                    {locale === 'es' ? article.titleEs : article.titleEn}
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
