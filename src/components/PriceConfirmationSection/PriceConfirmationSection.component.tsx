import React from 'react';
import { PROPERTY_MARKETING_CONFIG } from '../../utils/constants';
import { useCalendarMonth } from '../../hooks/useCalendarMonth';
import { addDays, getCostaRicaToday } from '../../utils/dates';
import { formatBookingMoney } from '../../utils/money';
import InstantConfirmationBadge from '../InstantConfirmationBadge/InstantConfirmationBadge.component';
import './PriceConfirmationSection.style.scss';
import type { Locale } from '../../i18n';
import { getMessages, bookingLanguage } from '../../i18n';
import type { CalendarDay } from '../../services/BookingApi.service';

interface PriceConfirmationSectionProps {
  propertyKey: string;
  locale: Locale;
}

// A calendar-month-scoped "lowest rate" collapses to a handful of days right
// before the month rolls over, so a single expensive night at month-end can
// spike the headline even though cheaper nights are available a day or two
// later. A fixed rolling window avoids that regardless of where "today" falls.
const LOOKAHEAD_DAYS = 30;

const PriceConfirmationSection: React.FC<PriceConfirmationSectionProps> = ({
  propertyKey,
  locale
}) => {
  const config = PROPERTY_MARKETING_CONFIG[propertyKey];
  const language = bookingLanguage(locale);
  const today = React.useMemo(() => getCostaRicaToday(), []);
  const windowEndDate = React.useMemo(() => addDays(today, LOOKAHEAD_DAYS - 1), [today]);
  const currentMonth = today.slice(0, 7);
  // Adding more days than any month can hold guarantees this lands in the
  // following month regardless of how many days are left in the current one.
  const nextMonth = React.useMemo(() => addDays(`${currentMonth}-01`, 32).slice(0, 7), [currentMonth]);

  // Shares the cache with the search widget's calendar, so this costs no extra
  // request once that calendar has paged into next month too — and the
  // headline price can never contradict the dots below it.
  const current = useCalendarMonth(config ? config.propertyKey : undefined, currentMonth, language);
  const next = useCalendarMonth(config ? config.propertyKey : undefined, nextMonth, language);

  const liveLowestCents = React.useMemo(() => {
    const nightsByDate = new Map<string, CalendarDay>();
    for (const source of [current.data, next.data]) {
      for (const day of source?.days ?? []) {
        nightsByDate.set(day.date, day);
      }
    }

    let lowestCents: number | null = null;
    for (const day of Array.from(nightsByDate.values())) {
      if (day.date < today || day.date > windowEndDate) {
        continue;
      }
      if (!day.available || day.priceCents === null) {
        continue;
      }
      if (lowestCents === null || day.priceCents < lowestCents) {
        lowestCents = day.priceCents;
      }
    }
    return lowestCents;
  }, [current.data, next.data, today, windowEndDate]);

  if (!config) {
    return null;
  }

  // Prices are quoted and charged in USD across the whole booking engine, so
  // the Spanish page shows USD too rather than a colón figure that would
  // disagree with the calendar and the checkout total.
  const currency = current.data?.currency ?? next.data?.currency ?? 'USD';
  const priceLabel =
    liveLowestCents !== null
      ? formatBookingMoney(liveLowestCents, currency, language, { hideZeroCents: true })
      : `$${config.price.usd}`;

  const priceMessages = getMessages(locale).price;
  const tooltipText = priceMessages.tooltip;

  const priceText = (
    <>
      {priceMessages.fromPerNight(priceLabel)}{' '}
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
        <>
          {priceMessages.discountLead} <strong>{priceMessages.discountBold}</strong>
        </>
        <br />
        <>
          {priceMessages.discountTail}
        </>
      </p>
    </div>
  );
};

export default PriceConfirmationSection;
