import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './BookingSearchWidget.style.scss';

interface BookingSearchWidgetProps {
  /** Whether the current page is Spanish */
  isSpanish: boolean;
  /** Optional: pre-select a number of guests (e.g. from property guestNumber) */
  defaultGuests?: number;
  /** Variant: 'sidebar' for listing pages, 'hero' for homepages */
  variant?: 'sidebar' | 'hero';
}

const strings = {
  en: {
    title: 'Check Availability',
    subtitle: 'Book directly — best price guaranteed',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Guests',
    search: 'Search Availability',
    searching: 'Searching…',
    decreaseGuests: 'Decrease guests',
    increaseGuests: 'Increase guests',
    arrivalRequired: 'Please select a check-in date.',
    departureRequired: 'Please select a check-out date.',
    departureTooEarly: 'Check-out must be after check-in.',
  },
  es: {
    title: 'Ver Disponibilidad',
    subtitle: 'Reserva directo — mejor precio garantizado',
    checkIn: 'Llegada',
    checkOut: 'Salida',
    guests: 'Huéspedes',
    search: 'Buscar Disponibilidad',
    searching: 'Buscando…',
    decreaseGuests: 'Menos huéspedes',
    increaseGuests: 'Más huéspedes',
    arrivalRequired: 'Selecciona una fecha de llegada.',
    departureRequired: 'Selecciona una fecha de salida.',
    departureTooEarly: 'La salida debe ser después de la llegada.',
  },
};

function getCostaRicaToday(): string {
  const now = new Date();
  // Costa Rica is UTC-6, no DST
  const crTime = new Date(now.getTime() - 6 * 60 * 60 * 1000);
  return crTime.toISOString().slice(0, 10);
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const BookingSearchWidget: React.FC<BookingSearchWidgetProps> = ({
  isSpanish,
  defaultGuests = 2,
  variant = 'sidebar',
}) => {
  const navigate = useNavigate();
  const lang = isSpanish ? 'es' : 'en';
  const s = strings[lang];
  const today = useMemo(() => getCostaRicaToday(), []);

  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [guests, setGuests] = useState(defaultGuests);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minDepartureDate = arrivalDate ? addDays(arrivalDate, 1) : addDays(today, 1);

  const handleArrivalChange = (value: string) => {
    setArrivalDate(value);
    setFieldErrors((prev) => { const n = { ...prev }; delete n.arrivalDate; return n; });
    // Auto-adjust departure if it's before or equal to new arrival
    if (value && departureDate && departureDate <= value) {
      const nd = addDays(value, 1);
      setDepartureDate(nd);
    }
  };

  const handleDepartureChange = (value: string) => {
    setDepartureDate(value);
    setFieldErrors((prev) => { const n = { ...prev }; delete n.departureDate; return n; });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const errors: Record<string, string> = {};

    if (!arrivalDate) errors.arrivalDate = s.arrivalRequired;
    if (!departureDate) errors.departureDate = s.departureRequired;
    if (arrivalDate && departureDate && departureDate <= arrivalDate) {
      errors.departureDate = s.departureTooEarly;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    const bookPath = isSpanish ? '/bookES' : '/book';
    const params = new URLSearchParams({
      arrivalDate,
      departureDate,
      guests: String(guests),
      autoSearch: 'true',
    });

    navigate(`${bookPath}?${params.toString()}`);
  };

  return (
    <div className={`booking-search-widget booking-search-widget--${variant}`}>
      <div className="booking-search-widget__header">
        <FontAwesomeIcon icon={faCalendarDays} className="booking-search-widget__icon" />
        <div>
          <h3 className="booking-search-widget__title">{s.title}</h3>
          <p className="booking-search-widget__subtitle">{s.subtitle}</p>
        </div>
      </div>

      <Form className="booking-search-widget__form" onSubmit={handleSubmit} noValidate>
        <Form.Group controlId={`bsw-arrival-${variant}`} className="booking-search-widget__field">
          <Form.Label>{s.checkIn}</Form.Label>
          <Form.Control
            type="date"
            value={arrivalDate}
            min={today}
            isInvalid={Boolean(fieldErrors.arrivalDate)}
            onChange={(e) => handleArrivalChange(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">{fieldErrors.arrivalDate}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId={`bsw-departure-${variant}`} className="booking-search-widget__field">
          <Form.Label>{s.checkOut}</Form.Label>
          <Form.Control
            type="date"
            value={departureDate}
            min={minDepartureDate}
            isInvalid={Boolean(fieldErrors.departureDate)}
            onChange={(e) => handleDepartureChange(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">{fieldErrors.departureDate}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId={`bsw-guests-${variant}`} className="booking-search-widget__field">
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
              onClick={() => setGuests((g) => g + 1)}
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
      </Form>
    </div>
  );
};

export default BookingSearchWidget;
