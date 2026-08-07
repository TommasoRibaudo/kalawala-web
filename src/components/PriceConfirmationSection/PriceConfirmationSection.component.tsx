import React from 'react';
import { PROPERTY_MARKETING_CONFIG } from '../../utils/constants';
import { useCalendarMonth } from '../../hooks/useCalendarMonth';
import { getCostaRicaToday } from '../../utils/dates';
import { formatBookingMoney } from '../../utils/money';
import InstantConfirmationBadge from '../InstantConfirmationBadge/InstantConfirmationBadge.component';
import './PriceConfirmationSection.style.scss';
import type { Locale } from '../../i18n';
import { getMessages, bookingLanguage } from '../../i18n';

interface PriceConfirmationSectionProps {
  propertyKey: string;
  locale: Locale;
}

const PriceConfirmationSection: React.FC<PriceConfirmationSectionProps> = ({
  propertyKey,
  locale
}) => {
  const config = PROPERTY_MARKETING_CONFIG[propertyKey];
  const language = bookingLanguage(locale);
  const currentMonth = React.useMemo(() => getCostaRicaToday().slice(0, 7), []);
  // Shares the cache with the search widget's calendar, so this costs no extra
  // request — and the headline price can never contradict the dots below it.
  const { data } = useCalendarMonth(config ? config.propertyKey : undefined, currentMonth, language);

  if (!config) {
    return null;
  }

  // Prices are quoted and charged in USD across the whole booking engine, so
  // the Spanish page shows USD too rather than a colón figure that would
  // disagree with the calendar and the checkout total.
  const liveLowestCents = data?.stats.minPriceCents ?? null;
  const currency = data?.currency ?? 'USD';
  const priceLabel =
    liveLowestCents !== null
      ? formatBookingMoney(liveLowestCents, currency, language, { hideZeroCents: true })
      : `$${config.price.usd}`;

  const tooltipText = getMessages(locale).price.tooltip
;

  const priceText = locale === 'es' ? (
      <>
        Desde {priceLabel} por noche{' '}
        <span className="average-indicator">
          <span className="info-icon">ⓘ</span>
          <span className="tooltip">{tooltipText}</span>
        </span>
      </>
    )
    : (
      <>
        From {priceLabel} per night{' '}
        <span className="average-indicator">
          <span className="info-icon">ⓘ</span>
          <span className="tooltip">{tooltipText}</span>
        </span>
      </>
    );

  return (
    <div className="price-confirmation-section">
      <div className="price-display">
        {priceText}
      </div>
      <div className="confirmation-badge">
        <InstantConfirmationBadge locale={locale} />
      </div>
      <p className='price-display' style={{ marginTop: '15px', marginBottom: 0 }}>
        {locale === 'es' ? (
          <><>
            Elige la <strong>tarifa no reembolsable</strong>
          </>
            <br />
            <>
              para un 10% de descuento adicional
            </>
          </>
        ) : (
          <><>
            Choose the <strong>non-refundable rate</strong>
          </>
            <br />
            <>
              for an extra 10% discount
            </>
          </>
        )}
      </p>
    </div>
  );
};

export default PriceConfirmationSection;
