import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingCtaBanner.style.scss';
import type { Locale } from '../../i18n';

interface IBookingCtaBanner {
  locale: Locale;
}

/**
 * A repeated mid-page conversion point. The audit found exactly one CTA
 * across the entire homepage (the hero search) — every visitor who scrolled
 * past it had to scroll all the way back up to act. This banner is meant to
 * be dropped in after a section a visitor has just finished reading (Our
 * Homes, the reviews) so the ask is never more than one section away.
 */
const BookingCtaBanner: React.FC<IBookingCtaBanner> = ({ locale }) => {
  const navigate = useNavigate();
  const bookPath = locale === 'es' ? '/bookES' : '/book';

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    navigate(bookPath);
    window.scrollTo(0, 0);
  };

  return (
    <section className="booking-cta-banner">
      <div className="container">
        <a href={bookPath} className="booking-cta-banner__btn" onClick={handleClick}>
          {locale === 'es' ? 'Ver disponibilidad' : 'Check availability'}
        </a>
      </div>
    </section>
  );
};

export default BookingCtaBanner;
