import React from 'react';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUser, faWifi, faSnowflake, faCar, faKitchenSet } from '@fortawesome/free-solid-svg-icons';
import FixedNavigation from '../components/FixedNavigation/FixedNavigation.component';
import { useLanguageDetection } from '../hooks/useLanguageDetection';
import {
  BookingApiError,
  BookingAvailableProperty,
  BookingLanguage,
  BookingSearchResponse,
  searchAvailability,
} from '../services/BookingApi.service';
import './Booking.style.scss';

const bookingStrings = {
  en: {
    title: 'Book directly with Kalawala',
    subtitle: 'Choose your dates and see which homes are available for your stay.',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    guests: 'Guests',
    guestsHelp: 'Adults and children staying overnight.',
    decreaseGuests: 'Decrease guests',
    increaseGuests: 'Increase guests',
    search: 'Search availability',
    searching: 'Searching',
    resultsTitle: 'Available homes',
    resultCount: (count: number) => `${count} ${count === 1 ? 'home is' : 'homes are'} available`,
    viewListing: 'View listing',
    noResultsTitle: 'No houses available for these dates',
    noResultsBody: 'Try a different date range or guest count. We update availability directly from our booking system.',
    priceForStay: 'Total for stay',
    averageNight: 'avg. per night',
    sleeps: (count: number) => `Sleeps ${count}`,
    available: 'Available for your dates',
    quoteExpires: 'Quote expires',
    validationDateOrder: 'Check-out must be after check-in.',
    validationArrival: 'Choose today or a future check-in date.',
    validationGuests: 'Guest count must be at least 1.',
    providerUnavailable: 'Availability is temporarily unavailable. Please try again in a moment.',
    genericError: 'We could not search availability right now. Please try again.',
    warningMinimumStay: 'Some homes require a longer minimum stay for these dates.',
    warningGuestCapacity: 'Some homes cannot host this guest count.',
    warningArrivalDay: 'Some homes have arrival-day restrictions.',
    warningLeadTime: 'Some homes require more advance notice.',
    warningGapRule: 'Some homes are unavailable because of calendar spacing rules.',
  },
  es: {
    title: 'Reserva directamente con Kalawala',
    subtitle: 'Elige tus fechas y mira cu\u00e1les casas est\u00e1n disponibles para tu estad\u00eda.',
    checkIn: 'Llegada',
    checkOut: 'Salida',
    guests: 'Hu\u00e9spedes',
    guestsHelp: 'Adultos y ni\u00f1os que se quedan a dormir.',
    decreaseGuests: 'Reducir hu\u00e9spedes',
    increaseGuests: 'Aumentar hu\u00e9spedes',
    search: 'Buscar disponibilidad',
    searching: 'Buscando',
    resultsTitle: 'Casas disponibles',
    resultCount: (count: number) => `${count} ${count === 1 ? 'casa disponible' : 'casas disponibles'}`,
    viewListing: 'Ver alojamiento',
    noResultsTitle: 'No hay casas disponibles para estas fechas',
    noResultsBody: 'Prueba con otras fechas o cantidad de hu\u00e9spedes. Actualizamos disponibilidad directamente desde nuestro sistema de reservas.',
    priceForStay: 'Total de la estad\u00eda',
    averageNight: 'prom. por noche',
    sleeps: (count: number) => `Hasta ${count} hu\u00e9spedes`,
    available: 'Disponible para tus fechas',
    quoteExpires: 'Cotizaci\u00f3n vence',
    validationDateOrder: 'La salida debe ser despu\u00e9s de la llegada.',
    validationArrival: 'Elige hoy o una fecha futura de llegada.',
    validationGuests: 'La cantidad de hu\u00e9spedes debe ser al menos 1.',
    providerUnavailable: 'La disponibilidad no est\u00e1 disponible temporalmente. Int\u00e9ntalo de nuevo en un momento.',
    genericError: 'No pudimos buscar disponibilidad ahora. Int\u00e9ntalo de nuevo.',
    warningMinimumStay: 'Algunas casas requieren una estad\u00eda m\u00ednima m\u00e1s larga para estas fechas.',
    warningGuestCapacity: 'Algunas casas no aceptan esta cantidad de hu\u00e9spedes.',
    warningArrivalDay: 'Algunas casas tienen restricciones para el d\u00eda de llegada.',
    warningLeadTime: 'Algunas casas requieren m\u00e1s anticipaci\u00f3n.',
    warningGapRule: 'Algunas casas no est\u00e1n disponibles por reglas de espacio entre reservas.',
  },
};

type BookingStrings = typeof bookingStrings.en;
type WarningStringKey =
  | 'warningMinimumStay'
  | 'warningGuestCapacity'
  | 'warningArrivalDay'
  | 'warningLeadTime'
  | 'warningGapRule';

const amenityIcons: Record<string, typeof faWifi> = {
  ac: faSnowflake,
  kitchen: faKitchenSet,
  parking: faCar,
  wifi: faWifi,
};

const warningMessages: Record<string, WarningStringKey> = {
  minimum_stay_not_met: 'warningMinimumStay',
  guest_capacity_exceeded: 'warningGuestCapacity',
  arrival_day_restricted: 'warningArrivalDay',
  lead_time_restricted: 'warningLeadTime',
  gap_rule_restricted: 'warningGapRule',
};

const BookingPage = () => {
  const isSpanishPage = useLanguageDetection();
  const language: BookingLanguage = isSpanishPage ? 'es' : 'en';
  const strings = bookingStrings[language];
  const today = getCostaRicaToday();
  const [arrivalDate, setArrivalDate] = React.useState(today);
  const [departureDate, setDepartureDate] = React.useState(addDays(today, 2));
  const [guests, setGuests] = React.useState(2);
  const [result, setResult] = React.useState<BookingSearchResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const minDepartureDate = addDays(arrivalDate || today, 1);

  const handleArrivalChange = (value: string) => {
    setArrivalDate(value);
    if (value && departureDate <= value) {
      setDepartureDate(addDays(value, 1));
    }
  };

  const handleGuestInputChange = (value: number) => {
    setGuests(Number.isFinite(value) ? value : 0);
  };

  const handleGuestStepChange = (value: number) => {
    setGuests(Math.max(1, value));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validation = validateSearch(arrivalDate, departureDate, guests, today, strings);
    setFieldErrors(validation);
    setError(null);

    if (Object.keys(validation).length > 0) {
      setResult(null);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await searchAvailability({
        arrivalDate,
        departureDate,
        guests,
        language,
        source: 'booking_page',
      });
      setResult(response);
    } catch (searchError) {
      setResult(null);
      setError(getSearchErrorMessage(searchError, strings));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="body" className="booking-page">
      <Helmet>
        <title>{strings.title} | Reservas Kalawala</title>
        <meta name="description" content={strings.subtitle} />
        <link rel="canonical" href={`https://www.reservaskalawala.com/${language === 'es' ? 'bookES' : 'book'}`} />
      </Helmet>
      <FixedNavigation isBlog={false} />

      <main className="booking-search-container">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={9}>
              <section className="booking-search-header" aria-labelledby="booking-search-title">
                <p className="booking-search-eyebrow">Kalawala</p>
                <h1 id="booking-search-title">{strings.title}</h1>
                <p>{strings.subtitle}</p>
              </section>

              <Form className="booking-search-form" onSubmit={handleSubmit} noValidate>
                <Row className="g-3 align-items-end">
                  <Col md={4}>
                    <Form.Group controlId="bookingArrivalDate">
                      <Form.Label>{strings.checkIn}</Form.Label>
                      <Form.Control
                        type="date"
                        value={arrivalDate}
                        min={today}
                        isInvalid={Boolean(fieldErrors.arrivalDate)}
                        onChange={(event) => handleArrivalChange(event.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">{fieldErrors.arrivalDate}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="bookingDepartureDate">
                      <Form.Label>{strings.checkOut}</Form.Label>
                      <Form.Control
                        type="date"
                        value={departureDate}
                        min={minDepartureDate}
                        isInvalid={Boolean(fieldErrors.departureDate)}
                        onChange={(event) => setDepartureDate(event.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">{fieldErrors.departureDate}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="bookingGuestCount">
                      <Form.Label>{strings.guests}</Form.Label>
                      <div className="booking-guest-control">
                        <Button
                          type="button"
                          variant="outline-secondary"
                          aria-label={strings.decreaseGuests}
                          onClick={() => handleGuestStepChange(guests - 1)}
                          disabled={guests <= 1}
                        >
                          -
                        </Button>
                        <Form.Control
                          type="number"
                          value={guests}
                          min={1}
                          inputMode="numeric"
                          isInvalid={Boolean(fieldErrors.guests)}
                          onChange={(event) => handleGuestInputChange(Number(event.target.value))}
                        />
                        <Button
                          type="button"
                          variant="outline-secondary"
                          aria-label={strings.increaseGuests}
                          onClick={() => handleGuestStepChange(guests + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <Form.Text>{strings.guestsHelp}</Form.Text>
                      {fieldErrors.guests && <div className="booking-field-error">{fieldErrors.guests}</div>}
                    </Form.Group>
                  </Col>
                </Row>

                <Button className="booking-search-submit" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner animation="border" size="sm" /> {strings.searching}
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faCalendarDays} /> {strings.search}
                    </>
                  )}
                </Button>
              </Form>

              {error && (
                <Alert className="booking-search-alert" variant="danger" role="alert">
                  {error}
                </Alert>
              )}

              {result && <BookingSearchResults result={result} strings={strings} language={language} />}
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

interface BookingSearchResultsProps {
  result: BookingSearchResponse;
  strings: BookingStrings;
  language: BookingLanguage;
}

const BookingSearchResults = ({ result, strings, language }: BookingSearchResultsProps) => {
  const hasResults = result.properties.length > 0;
  const warnings = result.availabilityWarnings
    .map((warning) => warningMessages[warning.code])
    .filter((key): key is WarningStringKey => Boolean(key));

  if (!hasResults) {
    return (
      <section className="booking-results-empty" aria-live="polite">
        <h2>{strings.noResultsTitle}</h2>
        <p>{strings.noResultsBody}</p>
        <WarningList warnings={warnings} strings={strings} />
      </section>
    );
  }

  return (
    <section className="booking-results" aria-live="polite" aria-labelledby="booking-results-title">
      <div className="booking-results-summary">
        <div>
          <p className="booking-results-kicker">{strings.resultCount(result.resultsCount)}</p>
          <h2 id="booking-results-title">{strings.resultsTitle}</h2>
        </div>
        <p className="booking-quote-expiry">
          {strings.quoteExpires}: {formatDateTime(result.quoteExpiresAt, language)}
        </p>
      </div>
      <WarningList warnings={warnings} strings={strings} />
      <div className="booking-results-grid">
        {result.properties.map((property) => (
          <BookingPropertyCard key={property.propertyId} property={property} strings={strings} language={language} />
        ))}
      </div>
    </section>
  );
};

const WarningList = ({ warnings, strings }: { warnings: WarningStringKey[]; strings: BookingStrings }) => {
  if (warnings.length === 0) {
    return null;
  }

  const uniqueWarnings = Array.from(new Set(warnings));

  return (
    <ul className="booking-warning-list">
      {uniqueWarnings.map((warning) => (
        <li key={warning}>{strings[warning]}</li>
      ))}
    </ul>
  );
};

const BookingPropertyCard = ({
  property,
  strings,
  language,
}: {
  property: BookingAvailableProperty;
  strings: BookingStrings;
  language: BookingLanguage;
}) => {
  const listingUrl = buildListingUrl(property.slug, language);

  return (
    <article className="booking-result-card">
      <a
        className="booking-result-image"
        href={listingUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${strings.viewListing}: ${property.name}`}
      >
        <img src={property.thumbnailUrl} alt={property.name} />
        <span>{strings.available}</span>
      </a>
      <div className="booking-result-content">
        <div className="booking-result-heading">
          <h3>{property.name}</h3>
          <p>
            <FontAwesomeIcon icon={faUser} /> {strings.sleeps(property.guestCapacity)}
          </p>
        </div>
        <ul className="booking-amenities" aria-label={`${property.name} amenities`}>
          {property.amenities.slice(0, 5).map((amenity) => (
            <li key={`${property.propertyId}-${amenity.code}`}>
              <FontAwesomeIcon icon={amenityIcons[amenity.code] ?? faWifi} />
              <span>{amenity.label}</span>
            </li>
          ))}
        </ul>
        {property.price && (
          <div className="booking-result-price">
            <span>{strings.priceForStay}</span>
            <strong>{formatMoney(property.price.totalAmountCents, property.price.currency, language)}</strong>
            <small>
              {formatMoney(property.price.nightlyAverageCents, property.price.currency, language)} {strings.averageNight}
            </small>
          </div>
        )}
        <a className="booking-result-link" href={listingUrl} target="_blank" rel="noopener noreferrer">
          {strings.viewListing}
        </a>
      </div>
    </article>
  );
};

function validateSearch(
  arrivalDate: string,
  departureDate: string,
  guests: number,
  today: string,
  strings: BookingStrings
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!arrivalDate || arrivalDate < today) {
    errors.arrivalDate = strings.validationArrival;
  }

  if (!departureDate || departureDate <= arrivalDate) {
    errors.departureDate = strings.validationDateOrder;
  }

  if (!Number.isInteger(guests) || guests < 1) {
    errors.guests = strings.validationGuests;
  }

  return errors;
}

function getSearchErrorMessage(error: unknown, strings: BookingStrings): string {
  if (error instanceof BookingApiError && (error.status === 503 || error.retryable)) {
    return strings.providerUnavailable;
  }

  return strings.genericError;
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

function addDays(dateString: string, days: number): string {
  const date = new Date(`${dateString}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function formatMoney(amountCents: number, currency: string, language: BookingLanguage): string {
  return new Intl.NumberFormat(language === 'es' ? 'es-CR' : 'en-US', {
    style: 'currency',
    currency,
  }).format(amountCents / 100);
}

function formatDateTime(value: string, language: BookingLanguage): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(language === 'es' ? 'es-CR' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function buildListingUrl(slug: string, language: BookingLanguage): string {
  const normalizedSlug = slug.replace(/^\/+/, '');
  return `/${normalizedSlug}${language === 'es' ? 'ES' : ''}`;
}

export default BookingPage;
