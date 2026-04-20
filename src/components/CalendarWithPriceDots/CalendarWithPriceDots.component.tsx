import React from 'react';
import posthog from 'posthog-js';
import {
  BookingLanguage,
  CalendarDay,
  CalendarDot,
  CalendarMonthResponse,
  getCalendarMonth,
} from '../../services/BookingApi.service';
import { CookieConsentService } from '../../services/CookieConsent.service';
import './CalendarWithPriceDots.style.scss';

interface CalendarWithPriceDotsProps {
  apartmentSlug: string;
  language: BookingLanguage;
}

type MonthDataByKey = Record<string, CalendarMonthResponse>;
type CalendarAnalyticsEvent =
  | 'calendar_month_loaded'
  | 'calendar_month_changed'
  | 'calendar_date_selected';

const dotColors: CalendarDot[] = ['green', 'yellow', 'red', 'grey'];
const lowPriceThreshold = 0.85;
const highPriceThreshold = 1.15;

const calendarStrings = {
  en: {
    title: 'Nightly prices',
    subtitle: 'Dots compare each available night with this month.',
    previousMonth: 'Previous month',
    nextMonth: 'Next month',
    loading: 'Loading prices',
    unavailable: 'Unavailable',
    noPrice: 'Price not available',
    lowPrice: 'low price',
    averagePrice: 'average price',
    highPrice: 'high price',
    minStay: (nights: number) => `${nights}-night minimum`,
    legendLow: 'Low',
    legendAverage: 'Average',
    legendHigh: 'High',
    legendUnavailable: 'Unavailable',
    unableToLoad: 'Calendar prices are temporarily unavailable.',
  },
  es: {
    title: 'Precios por noche',
    subtitle: 'Los puntos comparan cada noche disponible con este mes.',
    previousMonth: 'Mes anterior',
    nextMonth: 'Mes siguiente',
    loading: 'Cargando precios',
    unavailable: 'No disponible',
    noPrice: 'Precio no disponible',
    lowPrice: 'precio bajo',
    averagePrice: 'precio promedio',
    highPrice: 'precio alto',
    minStay: (nights: number) => `M\u00ednimo ${nights} noches`,
    legendLow: 'Bajo',
    legendAverage: 'Promedio',
    legendHigh: 'Alto',
    legendUnavailable: 'No disponible',
    unableToLoad: 'Los precios del calendario no est\u00e1n disponibles temporalmente.',
  },
};

const CalendarWithPriceDots: React.FC<CalendarWithPriceDotsProps> = ({ apartmentSlug, language }) => {
  const strings = calendarStrings[language];
  const today = React.useMemo(() => getCostaRicaToday(), []);
  const currentMonth = today.slice(0, 7);
  const [visibleMonth, setVisibleMonth] = React.useState(currentMonth);
  const [monthData, setMonthData] = React.useState<MonthDataByKey>({});
  const [loadingMonth, setLoadingMonth] = React.useState<string | null>(null);
  const [errorMonth, setErrorMonth] = React.useState<string | null>(null);
  const [isInView, setIsInView] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);
  const visibleMonthDataKey = getMonthDataKey(apartmentSlug, language, visibleMonth);
  const data = monthData[visibleMonthDataKey];
  const monthDataRef = React.useRef(monthData);
  const pendingMonthRequestsRef = React.useRef<Record<string, Promise<CalendarMonthResponse>>>({});
  const loadedMonthResponsesRef = React.useRef<Record<string, CalendarMonthResponse>>({});
  const requestedMonthKeysRef = React.useRef<Set<string>>(new Set());
  const daysByDate = React.useMemo(
    () => new Map((data?.days ?? []).map((day) => [day.date, day])),
    [data]
  );

  // Lazy-load: only fetch calendar data once the component scrolls into view
  React.useEffect(() => {
    if (!sectionRef.current || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    monthDataRef.current = monthData;
  }, [monthData]);

  React.useEffect(() => {
    if (!isInView) {
      return;
    }

    let isCancelled = false;
    const requestKey = getMonthDataKey(apartmentSlug, language, visibleMonth);
    const loadedResponse = loadedMonthResponsesRef.current[requestKey];

    if (loadedResponse) {
      if (!monthDataRef.current[requestKey]) {
        setMonthData((previous) => {
          const next = {
            ...previous,
            [requestKey]: loadedResponse,
          };
          monthDataRef.current = next;
          return next;
        });
      }
      setErrorMonth(null);
      return;
    }

    if (monthDataRef.current[requestKey]) {
      setErrorMonth(null);
      return;
    }

    if (typeof fetch !== 'function') {
      setErrorMonth(visibleMonth);
      return;
    }

    setLoadingMonth(visibleMonth);
    setErrorMonth(null);

    if (requestedMonthKeysRef.current.has(requestKey) && !pendingMonthRequestsRef.current[requestKey]) {
      setLoadingMonth((current) => (current === visibleMonth ? null : current));
      return;
    }

    if (!pendingMonthRequestsRef.current[requestKey]) {
      requestedMonthKeysRef.current.add(requestKey);
      pendingMonthRequestsRef.current[requestKey] = getCalendarMonth(apartmentSlug, visibleMonth, language).finally(
        () => {
          delete pendingMonthRequestsRef.current[requestKey];
        }
      );
    }

    pendingMonthRequestsRef.current[requestKey]
      .then((response) => {
        if (isCancelled) {
          return;
        }

        const responseMonth = response.month || visibleMonth;
        const responseKey = getMonthDataKey(apartmentSlug, language, responseMonth);
        loadedMonthResponsesRef.current[responseKey] = response;
        setMonthData((previous) => {
          const next = {
            ...previous,
            [responseKey]: response,
          };
          monthDataRef.current = next;
          return next;
        });
        captureCalendarEvent('calendar_month_loaded', {
          apartment_slug: apartmentSlug,
          month: responseMonth,
          available_count: response.stats.availableNightCount,
          avg_price: response.stats.averagePriceCents,
          source: response.cache?.status || 'api',
        });
      })
      .catch(() => {
        if (!isCancelled) {
          requestedMonthKeysRef.current.delete(requestKey);
          setErrorMonth(visibleMonth);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setLoadingMonth((current) => (current === visibleMonth ? null : current));
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [apartmentSlug, language, visibleMonth, isInView]);

  const goToMonth = (offset: number) => {
    setVisibleMonth((month) => {
      const nextMonth = addMonths(month, offset);
      captureCalendarEvent('calendar_month_changed', {
        apartment_slug: apartmentSlug,
        from_month: month,
        to_month: nextMonth,
      });
      return nextMonth;
    });
  };

  const handleDateSelect = (date: string, day: CalendarDay | undefined, dotColor: CalendarDot) => {
    captureCalendarEvent('calendar_date_selected', {
      apartment_slug: apartmentSlug,
      date,
      price: day?.priceCents ?? null,
      dot_color: dotColor,
      available: day?.available === true,
    });
  };

  const canGoPrevious = visibleMonth > currentMonth;
  const calendarDays = getCalendarDays(visibleMonth);

  return (
    <section ref={sectionRef} className="calendar-with-price-dots" aria-labelledby={`calendar-title-${apartmentSlug}`}>
      <div className="calendar-with-price-dots__header">
        <div>
          <h2 id={`calendar-title-${apartmentSlug}`}>{strings.title}</h2>
          <p>{strings.subtitle}</p>
        </div>
        <div className="calendar-with-price-dots__nav" aria-label={formatMonthLabel(visibleMonth, language)}>
          <button
            type="button"
            onClick={() => goToMonth(-1)}
            disabled={!canGoPrevious}
            aria-label={strings.previousMonth}
          >
            {'<'}
          </button>
          <span>{formatMonthLabel(visibleMonth, language)}</span>
          <button type="button" onClick={() => goToMonth(1)} aria-label={strings.nextMonth}>
            {'>'}
          </button>
        </div>
      </div>

      <div className="calendar-with-price-dots__weekdays" aria-hidden="true">
        {getWeekdayLabels(language).map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>

      <div className="calendar-with-price-dots__grid">
        {calendarDays.map((calendarDay, index) => {
          if (!calendarDay) {
            return (
              <span
                className="calendar-date-cell calendar-date-cell--empty"
                aria-hidden="true"
                key={`empty-${visibleMonth}-${index}`}
              />
            );
          }

          const dayData = daysByDate.get(calendarDay.date);
          const dotColor = getDotColor(dayData, data);
          const dateLabel = getDateAriaLabel(calendarDay.date, dayData, dotColor, data?.currency ?? 'USD', language);

          return (
            <button
              className="calendar-date-cell"
              key={calendarDay.date}
              type="button"
              onClick={() => handleDateSelect(calendarDay.date, dayData, dotColor)}
              aria-label={dateLabel}
            >
              <span className="calendar-date-cell__number">{calendarDay.day}</span>
              <span className={`price-dot price-dot--${dotColor}`} role="img" aria-label={dateLabel} />
            </button>
          );
        })}
      </div>

      {loadingMonth === visibleMonth && (
        <p className="calendar-with-price-dots__status" aria-live="polite">
          {strings.loading}
        </p>
      )}
      {errorMonth === visibleMonth && (
        <p className="calendar-with-price-dots__status calendar-with-price-dots__status--error" aria-live="polite">
          {strings.unableToLoad}
        </p>
      )}

      <ul className="calendar-with-price-dots__legend" aria-label={strings.title}>
        <li>
          <span className="price-dot price-dot--green" aria-hidden="true" /> {strings.legendLow}
        </li>
        <li>
          <span className="price-dot price-dot--yellow" aria-hidden="true" /> {strings.legendAverage}
        </li>
        <li>
          <span className="price-dot price-dot--red" aria-hidden="true" /> {strings.legendHigh}
        </li>
        <li>
          <span className="price-dot price-dot--grey" aria-hidden="true" /> {strings.legendUnavailable}
        </li>
      </ul>
    </section>
  );
};

function getMonthDataKey(apartmentSlug: string, language: BookingLanguage, month: string): string {
  return `${apartmentSlug}:${language}:${month}`;
}

function captureCalendarEvent(eventName: CalendarAnalyticsEvent, properties: Record<string, unknown>): void {
  if (!CookieConsentService.hasConsent('analytics')) {
    return;
  }

  posthog.capture(eventName, properties);

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      event_category: 'calendar',
      ...properties,
    });
  }
}

function getDotColor(day: CalendarDay | undefined, monthData: CalendarMonthResponse | undefined): CalendarDot {
  if (!day || !day.available || typeof day.priceCents !== 'number') {
    return 'grey';
  }

  if (day.dot && dotColors.includes(day.dot)) {
    return day.dot;
  }

  const averagePrice = monthData?.stats.averagePriceCents;

  if (!averagePrice || averagePrice <= 0) {
    return 'yellow';
  }

  if (day.priceCents <= averagePrice * lowPriceThreshold) {
    return 'green';
  }

  if (day.priceCents > averagePrice * highPriceThreshold) {
    return 'red';
  }

  return 'yellow';
}

function getDateAriaLabel(
  date: string,
  day: CalendarDay | undefined,
  dotColor: CalendarDot,
  currency: string,
  language: BookingLanguage
): string {
  const strings = calendarStrings[language];
  const formattedDate = formatDateLabel(date, language);

  if (!day || !day.available) {
    return `${formattedDate}, ${strings.unavailable}`;
  }

  const priceText =
    typeof day.priceCents === 'number' ? formatMoney(day.priceCents, currency, language) : strings.noPrice;
  const tierText = getTierText(dotColor, language);
  const minStayText = day.minStay ? `, ${strings.minStay(day.minStay)}` : '';

  return `${formattedDate}, ${priceText}, ${tierText}${minStayText}`;
}

function getTierText(dotColor: CalendarDot, language: BookingLanguage): string {
  const strings = calendarStrings[language];

  if (dotColor === 'green') {
    return strings.lowPrice;
  }

  if (dotColor === 'red') {
    return strings.highPrice;
  }

  if (dotColor === 'grey') {
    return strings.unavailable;
  }

  return strings.averagePrice;
}

function getCalendarDays(month: string): Array<{ date: string; day: number } | null> {
  const [year, monthIndex] = month.split('-').map(Number);
  const firstDate = new Date(Date.UTC(year, monthIndex - 1, 1));
  const daysInMonth = new Date(Date.UTC(year, monthIndex, 0)).getUTCDate();
  const leadingEmptyCells = firstDate.getUTCDay();
  const days: Array<{ date: string; day: number } | null> = Array.from({ length: leadingEmptyCells }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push({
      date: `${month}-${String(day).padStart(2, '0')}`,
      day,
    });
  }

  return days;
}

function getWeekdayLabels(language: BookingLanguage): string[] {
  const formatter = new Intl.DateTimeFormat(language === 'es' ? 'es-CR' : 'en-US', {
    weekday: 'short',
    timeZone: 'UTC',
  });

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(Date.UTC(2026, 1, 1 + index));
    return formatter.format(date).replace('.', '');
  });
}

function getCostaRicaToday(): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Costa_Rica',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const byType = parts.reduce<Record<string, string>>((accumulator, part) => {
    accumulator[part.type] = part.value;
    return accumulator;
  }, {});
  return `${byType.year}-${byType.month}-${byType.day}`;
}

function addMonths(month: string, months: number): string {
  const [year, monthIndex] = month.split('-').map(Number);
  const date = new Date(Date.UTC(year, monthIndex - 1 + months, 1));
  return date.toISOString().slice(0, 7);
}

function formatMonthLabel(month: string, language: BookingLanguage): string {
  const [year, monthIndex] = month.split('-').map(Number);
  return new Intl.DateTimeFormat(language === 'es' ? 'es-CR' : 'en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, monthIndex - 1, 1)));
}

function formatDateLabel(date: string, language: BookingLanguage): string {
  return new Intl.DateTimeFormat(language === 'es' ? 'es-CR' : 'en-US', {
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

function formatMoney(amountCents: number, currency: string, language: BookingLanguage): string {
  return new Intl.NumberFormat(language === 'es' ? 'es-CR' : 'en-US', {
    style: 'currency',
    currency,
  }).format(amountCents / 100);
}

export default CalendarWithPriceDots;
