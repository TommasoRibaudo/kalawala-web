import React, { useState, useMemo, useRef, useEffect, useLayoutEffect, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import CalendarWithPriceDots from '../CalendarWithPriceDots';
import { MAX_PORTFOLIO_GUESTS, PROPERTY_CAPACITY } from '../../utils/constants';
import { getCostaRicaToday, nightsBetween } from '../../utils/dates';
import './BookingSearchWidget.style.scss';
import type { Locale } from '../../i18n';
import { bookingPath, bookingLanguage } from '../../i18n';

interface BookingSearchWidgetProps {
  /** Whether the current page is Spanish */
  locale: Locale;
  /** Optional: pre-select a number of guests (e.g. from property guestNumber) */
  defaultGuests?: number;
  /** Variant: 'sidebar' for listing pages, 'hero' for homepages */
  variant?: 'sidebar' | 'hero';
  /**
   * Property whose nightly rates colour the calendar dots. Listing pages pass
   * their own slug; the homepage hero leaves it unset because the search covers
   * the whole portfolio and there is no single home to price.
   */
  apartmentSlug?: string;
}

/**
 * Exposed so a listing page's sticky mobile CTA (which lives outside this
 * component) can ask "does the guest already have valid dates?" and, if so,
 * trigger the same submit this form's own button would — rather than just
 * scrolling to this widget, which is all it can do without this handle.
 */
export interface BookingSearchWidgetHandle {
  hasSelectedDates: () => boolean;
  submit: () => void;
}

// useLayoutEffect warns during server pre-render; the hero calendar only opens
// after a client click, so fall back to useEffect where there is no DOM.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const strings = {
  en: {
    title: 'Check Availability',
    subtitle: 'Book directly for the best price, guaranteed',
    dates: 'Dates',
    guests: 'Guests',
    search: 'Search Availability',
    searching: 'Searching…',
    decreaseGuests: 'Decrease guests',
    increaseGuests: 'Increase guests',
    maxGuests: 'Our largest home sleeps {max}. Message us for bigger groups.',
    maxGuestsListing: 'This home sleeps up to {max}.',
    searchAllHomes: 'Search all our homes for a bigger group.',
    arrivalRequired: 'Please select a check-in date.',
    departureRequired: 'Please select a check-out date.',
    departureTooEarly: 'Check-out must be after check-in.',
    selectDates: 'Select your dates',
    selectCheckOut: 'select check-out',
    nights: (count: number) => `${count} ${count === 1 ? 'night' : 'nights'}`,
  },
  es: {
    title: 'Ver Disponibilidad',
    subtitle: 'Reserva directo y te garantizamos el mejor precio',
    dates: 'Fechas',
    guests: 'Huéspedes',
    search: 'Buscar Disponibilidad',
    searching: 'Buscando…',
    decreaseGuests: 'Menos huéspedes',
    increaseGuests: 'Más huéspedes',
    maxGuests: 'Nuestra casa más grande aloja a {max}. Escríbenos para grupos mayores.',
    maxGuestsListing: 'Esta casa aloja hasta {max}.',
    searchAllHomes: 'Busca en todas nuestras casas para un grupo más grande.',
    arrivalRequired: 'Selecciona una fecha de llegada.',
    departureRequired: 'Selecciona una fecha de salida.',
    departureTooEarly: 'La salida debe ser después de la llegada.',
    selectDates: 'Elige tus fechas',
    selectCheckOut: 'elige la salida',
    nights: (count: number) => `${count} ${count === 1 ? 'noche' : 'noches'}`,
  },
};

const BookingSearchWidget = forwardRef<BookingSearchWidgetHandle, BookingSearchWidgetProps>(({
  locale,
  defaultGuests = 2,
  variant = 'sidebar',
  apartmentSlug,
}, ref) => {
  const navigate = useNavigate();
  const lang = bookingLanguage(locale);
  const s = strings[lang];
  const today = useMemo(() => getCostaRicaToday(), []);

  // On a listing page the guest picker must not exceed that home's own capacity
  // (#309) — you can't book Villa Mar (sleeps 2) for six. The portfolio-wide
  // hero has no single home, so it keeps the portfolio-wide max.
  const listingCapacity = apartmentSlug ? PROPERTY_CAPACITY[apartmentSlug]?.maxGuests : undefined;
  const guestCap = listingCapacity ?? MAX_PORTFOLIO_GUESTS;
  // Only a home strictly smaller than the biggest one should send guests to the
  // full-portfolio search for a bigger group — the largest home has no bigger
  // sibling to offer.
  const showListingHint = listingCapacity !== undefined && listingCapacity < MAX_PORTFOLIO_GUESTS;

  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [guests, setGuests] = useState(() =>
    Math.min(Math.max(1, defaultGuests), guestCap)
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // The hero sits on a busy homepage, so its calendar hides behind a trigger.
  // The listing sidebar has the room to keep it open permanently.
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const datesFieldRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  // The hero calendar renders in a portal on document.body (see the note where
  // it is rendered), so it is positioned against the trigger by hand.
  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (variant !== 'hero' || !isCalendarOpen) {
      setPopoverStyle(null);
      return;
    }

    const updatePosition = () => {
      const trigger = triggerRef.current;
      if (!trigger) {
        return;
      }
      const rect = trigger.getBoundingClientRect();
      const margin = 16;
      const width = Math.min(320, window.innerWidth - margin * 2);
      // Prefer left-aligned with the trigger, but never let the panel spill off
      // the viewport edge on a narrow screen.
      let left = rect.left;
      if (left + width > window.innerWidth - margin) {
        left = window.innerWidth - margin - width;
      }
      if (left < margin) {
        left = margin;
      }
      setPopoverStyle({ position: 'fixed', top: rect.bottom + 6, left, width });
    };

    updatePosition();
    // `true` catches scrolls inside any nested scroll container, not just window.
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [variant, isCalendarOpen]);

  useEffect(() => {
    if (variant !== 'hero' || !isCalendarOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      // The panel lives in a portal outside datesFieldRef, so it needs its own
      // containment check or every click inside it would close the calendar.
      if (
        !datesFieldRef.current?.contains(target) &&
        !popoverRef.current?.contains(target)
      ) {
        setIsCalendarOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [variant, isCalendarOpen]);

  /**
   * One tap picks check-in, the next picks check-out. Tapping a night on or
   * before the current check-in restarts the range rather than producing an
   * inverted one, which is what guests expect from a two-tap picker.
   */
  const handleCalendarSelect = (date: string) => {
    setFieldErrors({});

    if (!arrivalDate || departureDate || date <= arrivalDate) {
      setArrivalDate(date);
      setDepartureDate('');
      return;
    }

    setDepartureDate(date);
    if (variant === 'hero') {
      setIsCalendarOpen(false);
    }
  };

  const clearDates = () => {
    setArrivalDate('');
    setDepartureDate('');
    setFieldErrors({});
  };

  const performSubmit = () => {
    const errors: Record<string, string> = {};

    if (!arrivalDate) errors.arrivalDate = s.arrivalRequired;
    else if (!departureDate) errors.departureDate = s.departureRequired;
    else if (departureDate <= arrivalDate) errors.departureDate = s.departureTooEarly;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      if (variant === 'hero') {
        setIsCalendarOpen(true);
      }
      return;
    }

    setIsSubmitting(true);

    const bookPath = bookingPath(locale);
    const params = new URLSearchParams({
      arrivalDate,
      departureDate,
      guests: String(guests),
      autoSearch: 'true',
      // The search itself runs on /book, so without this every search looks
      // like it started there and the funnel cannot tell which entry point —
      // homepage hero or listing sidebar — actually drives bookings.
      src: variant === 'hero' ? 'widget_hero' : 'widget_sidebar',
    });
    // Promotes this home to the top of the results. The search still returns the
    // whole portfolio — see the results page for how the two are laid out.
    if (apartmentSlug) {
      params.set('property', apartmentSlug);
    }

    try {
      navigate(`${bookPath}?${params.toString()}`);
    } catch {
      // Navigation blocked — release the button instead of spinning forever.
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    performSubmit();
  };

  useImperativeHandle(ref, () => ({
    hasSelectedDates: () => Boolean(arrivalDate && departureDate && departureDate > arrivalDate),
    submit: performSubmit,
  }));

  const rangeSummary = (() => {
    if (!arrivalDate) {
      return s.selectDates;
    }
    if (!departureDate) {
      return `${formatShortDate(arrivalDate, lang)} → ${s.selectCheckOut}`;
    }
    return `${formatShortDate(arrivalDate, lang)} → ${formatShortDate(departureDate, lang)} · ${s.nights(
      nightsBetween(arrivalDate, departureDate)
    )}`;
  })();

  const dateError = fieldErrors.arrivalDate || fieldErrors.departureDate;

  const calendar = (
    <CalendarWithPriceDots
      apartmentSlug={apartmentSlug}
      language={lang}
      minDate={today}
      selectionStart={arrivalDate || null}
      selectionEnd={departureDate || null}
      onSelectDate={handleCalendarSelect}
      onClearSelection={clearDates}
      showHeading={false}
    />
  );

  return (
    <div className={`booking-search-widget booking-search-widget--${variant}`}>
      {/* The hero already carries the headline, so the widget stays a bare
          search bar there. Listing sidebars still need the label. */}
      {variant !== 'hero' && (
        <div className="booking-search-widget__header">
          <FontAwesomeIcon icon={faCalendarDays} className="booking-search-widget__icon" />
          <div>
            <h2 className="booking-search-widget__title">{s.title}</h2>
            <p className="booking-search-widget__subtitle">{s.subtitle}</p>
          </div>
        </div>
      )}

      <Form className="booking-search-widget__form" onSubmit={handleSubmit} noValidate aria-label={s.title}>
        <div className="booking-search-widget__field booking-search-widget__dates" ref={datesFieldRef}>
          <span className="booking-search-widget__label">{s.dates}</span>

          {variant === 'hero' ? (
            <>
              <button
                ref={triggerRef}
                type="button"
                className={`booking-search-widget__dates-trigger${
                  dateError ? ' booking-search-widget__dates-trigger--invalid' : ''
                }`}
                onClick={() => setIsCalendarOpen((open) => !open)}
                aria-expanded={isCalendarOpen}
                aria-haspopup="dialog"
              >
                <FontAwesomeIcon icon={faCalendarDays} />
                <span>{rangeSummary}</span>
              </button>
              {/* Portalled to document.body: the hero clips its overflow and
                  the sticky nav (z-index 1000) sits in a higher stacking layer
                  than anything inside .block, so an in-place dropdown gets
                  hidden behind the nav. Rendering at the body root, positioned
                  against the trigger, escapes both traps. */}
              {isCalendarOpen &&
                popoverStyle &&
                typeof document !== 'undefined' &&
                createPortal(
                  <div
                    ref={popoverRef}
                    className="booking-search-widget__calendar-popover booking-search-widget__calendar-popover--floating"
                    role="dialog"
                    aria-label={s.dates}
                    style={popoverStyle}
                  >
                    {calendar}
                  </div>,
                  document.body
                )}
            </>
          ) : (
            <div className="booking-search-widget__calendar">{calendar}</div>
          )}

          {/* The hero shows the range on its trigger, so it does not repeat it.
              Clearing lives in the calendar itself, where both variants get it. */}
          {variant !== 'hero' && (
            <p className="booking-search-widget__range" aria-live="polite">
              {rangeSummary}
            </p>
          )}

          {dateError && (
            <p className="booking-search-widget__error" aria-live="polite">
              {dateError}
            </p>
          )}
        </div>

        <Form.Group controlId={`bsw-guests-${variant}`} className="booking-search-widget__field booking-search-widget__field--guests">
          <Form.Label>{s.guests}</Form.Label>
          <div className="booking-search-widget__guest-control">
            <Button
              type="button"
              variant="outline-secondary"
              size="sm"
              aria-label={s.decreaseGuests}
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              disabled={guests <= 1}
            >
              −
            </Button>
            <span className="booking-search-widget__guest-count">
              <FontAwesomeIcon icon={faUser} /> {guests}
            </span>
            <Button
              type="button"
              variant="outline-secondary"
              size="sm"
              aria-label={s.increaseGuests}
              onClick={() => setGuests((g) => Math.min(guestCap, g + 1))}
              disabled={guests >= guestCap}
            >
              +
            </Button>
          </div>
        </Form.Group>

        <Button
          className="booking-search-widget__submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <><Spinner animation="border" size="sm" /> {s.searching}</>
          ) : (
            <><FontAwesomeIcon icon={faMagnifyingGlass} /> {s.search}</>
          )}
        </Button>

        {/* Full-width row so it never disturbs the alignment of the fields above. */}
        {guests >= guestCap && (
          <p className="booking-search-widget__hint" aria-live="polite">
            {showListingHint ? (
              <>
                {s.maxGuestsListing.replace('{max}', String(guestCap))}{' '}
                {/* A real href keeps middle/modifier-click working; plain clicks
                    take the SPA route to the portfolio search, where the
                    over-capacity flow already surfaces homes that fit. */}
                <a
                  href={bookingPath(locale)}
                  className="booking-search-widget__hint-link"
                  onClick={(e) => {
                    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    e.preventDefault();
                    navigate(bookingPath(locale));
                  }}
                >
                  {s.searchAllHomes}
                </a>
              </>
            ) : (
              s.maxGuests.replace('{max}', String(guestCap))
            )}
          </p>
        )}
      </Form>
    </div>
  );
});

BookingSearchWidget.displayName = 'BookingSearchWidget';

function formatShortDate(date: string, language: 'en' | 'es'): string {
  return new Intl.DateTimeFormat(language === 'es' ? 'es-CR' : 'en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}

export default BookingSearchWidget;
