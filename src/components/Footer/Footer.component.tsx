import React from 'react';
import { Link } from 'react-router-dom';
import { PROPERTY_DISPLAY_NAMES, BLOG_ARTICLES } from '../../utils/constants';
import './Footer.style.scss';

interface IFooter {
  isSpanish: boolean;
}

const Footer: React.FC<IFooter> = ({ isSpanish }) => {
  const suffix = isSpanish ? 'ES' : '';
  const bookPath = isSpanish ? '/bookES' : '/book';

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>{isSpanish ? 'Nuestras Casas' : 'Our Homes'}</h4>
            <ul>
              {Object.entries(PROPERTY_DISPLAY_NAMES).map(([code, name]) => (
                <li key={code}>
                  <Link to={`/${code}${suffix}`}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>{isSpanish ? 'Guías de Viaje' : 'Travel Guides'}</h4>
            <ul>
              {BLOG_ARTICLES.map((article) => (
                <li key={article.key}>
                  <Link to={isSpanish ? article.pathEs : article.pathEn}>
                    {isSpanish ? article.titleEs : article.titleEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>{isSpanish ? 'Contacto' : 'Contact'}</h4>
            <ul className="footer-contact">
              <li>
                <a href="tel:+50684632276">+506 8463-2276</a>
              </li>
              <li>
                <a href="https://wa.me/50684632276" target="_blank" rel="noopener noreferrer">
                  {isSpanish ? 'Chatear por WhatsApp' : 'Chat on WhatsApp'}
                </a>
              </li>
              <li>
                <a href="mailto:reservas.kalawala@gmail.com">reservas.kalawala@gmail.com</a>
              </li>
              <li className="footer-address">Puerto Viejo de Talamanca, Costa Rica</li>
            </ul>
          </div>

          <div className="footer-col footer-cta-col">
            <h4>{isSpanish ? '¿Listo para reservar?' : 'Ready to book?'}</h4>
            <Link to={bookPath} className="footer-cta-btn">
              {isSpanish ? 'Ver disponibilidad' : 'Check availability'}
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
