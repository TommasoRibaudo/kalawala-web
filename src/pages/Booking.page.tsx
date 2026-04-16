import React from 'react';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUser, faWifi, faSnowflake, faCar, faKitchenSet } from '@fortawesome/free-solid-svg-icons';
import FixedNavigation from '../components/FixedNavigation/FixedNavigation.component';
import FixedNavigationES from '../components/FixedNavigation/FixedNavigation.componentES';
import { useLanguageDetection } from '../hooks/useLanguageDetection';
import {
  BookingApiError,
  BookingAvailableProperty,
  BookingLanguage,
  BookingSearchResponse,
  searchAvailability,
} from '../services/BookingApi.service';
import { bookingStrings, BookingStrings } from './Booking.i18n';
import './Booking.style.scss';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const today = React.useMemo(() => getCostaRicaToday(), []);
  const [arrivalDate, setArrivalDate] = React.useState(() =>
    getInitialArrivalDate(searchParams.get('arrivalDate'), today)
  );
  const [departureDate, setDepartureDate] = React.useState(() =>
    getInitialDepartureDate(searchParams.get('departureDate'), searchParams.get('arrivalDate'), today)
  );
  const [guests, setGuests] = React.useState(() => getInitialGuestCount(searchParams.get('guests')));
  const [result, setResult] = React.useState<BookingSearchResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const Navigation = language === 'es' ? FixedNavigationES : FixedNavigation;

  const minDepartureDate = addDays(arrivalDate || today, 1);

  const updateBookingQuery = React.useCallback(
    (updates: Record<string, string | number>) => {
      const nextParams = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        nextParams.set(key, String(value));
      });
      setSearchParams(nextParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const handleArrivalChange = (value: string) => {
    setArrivalDate(value);
    const updates: Record<string, string> = { arrivalDate: value };
    if (value && departureDate <= value) {
      const nextDepartureDate = addDays(value, 1);
      setDepartureDate(nextDepartureDate);
      updates.departureDate = nextDepartureDate;
    }
    updateBookingQuery(updates);
  };

  const handleGuestInputChange = (value: number) => {
    const nextGuests = Number.isFinite(value) ? value : 0;
    setGuests(nextGuests);
    updateBookingQuery({ guests: nextGuests });
  };

  const handleGuestStepChange = (value: number) => {
    const nextGuests = Math.max(1, value);
    setGuests(nextGuests);
    updateBookingQuery({ guests: nextGuests });
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
        <title>{strings.documentTitle} | {strings.siteTitle}</title>
        <meta name="description" content={strings.metaDescription} />
        <link rel="canonical" href={`https://www.reservaskalawala.com/${language === 'es' ? 'bookES' : 'book'}`} />
      </Helmet>
      <Navigation isBlog={false} />

      <main className="booking-search-container">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={9}>
              <section className="booking-search-header" aria-labelledby="booking-search-title">
                <p className="booking-search-eyebrow">{strings.eyebrow}</p>
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
                        onChange={(event) => {
                          setDepartureDate(event.target.value);
                          updateBookingQuery({ departureDate: event.target.value });
                        }}
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
        <ul className="booking-amenities" aria-label={strings.amenitiesLabel(property.name)}>
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

function getInitialArrivalDate(value: string | null, today: string): string {
  return value && isYmd(value) && value >= today ? value : today;
}

function getInitialDepartureDate(value: string | null, arrivalValue: string | null, today: string): string {
  const arrivalDate = getInitialArrivalDate(arrivalValue, today);
  return value && isYmd(value) && value > arrivalDate ? value : addDays(arrivalDate, 2);
}

function getInitialGuestCount(value: string | null): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 1 ? parsed : 2;
}

function isYmd(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
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
