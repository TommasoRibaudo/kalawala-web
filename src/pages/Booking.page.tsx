import React from 'react';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUser, faWifi, faSnowflake, faCar, faKitchenSet } from '@fortawesome/free-solid-svg-icons';
import FixedNavigation from '../components/FixedNavigation/FixedNavigation.component';
import FixedNavigationES from '../components/FixedNavigation/FixedNavigation.componentES';
import { useLanguageDetection } from '../hooks/useLanguageDetection';
import {
  BookingApiError,
  BookingAvailableProperty,
  DepositHandoffResponse,
  BookingLanguage,
  BookingSearchResponse,
  PayPalCaptureResponse,
  PayPalHoldResponse,
  capturePayPalOrder,
  createPayPalHold,
  createPayPalOrder,
  getDepositHandoff,
  recordDepositHandoffEvent,
  searchAvailability,
} from '../services/BookingApi.service';
import {
  trackBookingSearch,
  trackAvailabilityResults,
  trackCheckoutStarted,
  trackBookingConfirmed,
  trackManualDepositHandoffClicked,
  trackPaymentMethodSelected,
} from '../services/BookingAnalytics.service';
import { CookieConsentService } from '../services/CookieConsent.service';
import { bookingStrings, BookingStrings } from './Booking.i18n';
import './Booking.style.scss';

type WarningStringKey =
  | 'warningMinimumStay'
  | 'warningGuestCapacity'
  | 'warningArrivalDay'
  | 'warningLeadTime'
  | 'warningGapRule';

type DepositInstructionStringKey =
  | 'depositBankInstructions'
  | 'depositStaffWillConfirm'
  | 'depositNoReceiptUpload'
  | 'depositContactUs';

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

const depositInstructionMessages: Record<string, DepositInstructionStringKey> = {
  'deposit.bankInstructions': 'depositBankInstructions',
  'deposit.staffWillConfirm': 'depositStaffWillConfirm',
  'deposit.noReceiptUpload': 'depositNoReceiptUpload',
  'deposit.contactUs': 'depositContactUs',
};

interface PayPalHoldFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  portalPassword: string;
  termsAccepted: boolean;
}

const initialPayPalHoldForm: PayPalHoldFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  message: '',
  portalPassword: '',
  termsAccepted: false,
};

interface StoredPayPalCheckout {
  bookingSessionId: string;
  paypalOrderId: string;
  reservationPublicId?: string;
  language: BookingLanguage;
}

const paypalCheckoutStorageKey = 'kalawala_paypal_checkout';
const bookingConfirmationStorageKey = 'kalawala_booking_confirmation';
const bookingConfirmationTrackedPrefix = 'kalawala_booking_confirmation_tracked_';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const detectedSpanishPage = useLanguageDetection();
  const isSpanishPage = detectedSpanishPage || location.pathname.toLowerCase().startsWith('/bookes');
  const language: BookingLanguage = isSpanishPage ? 'es' : 'en';
  const strings = bookingStrings[language];
  const [searchParams, setSearchParams] = useSearchParams();
  const isPayPalReturnRoute = isBookingReturnPath(location.pathname);
  const isConfirmationRoute = isBookingConfirmedPath(location.pathname);
  const paypalReturnAttemptedRef = React.useRef(false);
  const confirmationTrackedRef = React.useRef<string | null>(null);
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
  const [depositHandoff, setDepositHandoff] = React.useState<DepositHandoffResponse | null>(null);
  const [depositError, setDepositError] = React.useState<string | null>(null);
  const [depositLoadingPropertyId, setDepositLoadingPropertyId] = React.useState<string | null>(null);
  const [checkoutProperty, setCheckoutProperty] = React.useState<BookingAvailableProperty | null>(null);
  const [holdForm, setHoldForm] = React.useState<PayPalHoldFormState>(initialPayPalHoldForm);
  const [holdFieldErrors, setHoldFieldErrors] = React.useState<Record<string, string>>({});
  const [holdError, setHoldError] = React.useState<string | null>(null);
  const [holdResponse, setHoldResponse] = React.useState<PayPalHoldResponse | null>(null);
  const [isCreatingHold, setIsCreatingHold] = React.useState(false);
  const [paypalOrderError, setPayPalOrderError] = React.useState<string | null>(null);
  const [isCreatingPayPalOrder, setIsCreatingPayPalOrder] = React.useState(false);
  const [paypalCaptureResult, setPayPalCaptureResult] = React.useState<PayPalCaptureResponse | null>(null);
  const [paypalCaptureError, setPayPalCaptureError] = React.useState<string | null>(null);
  const [isCapturingPayPal, setIsCapturingPayPal] = React.useState(isPayPalReturnRoute);
  const [bookingConfirmation, setBookingConfirmation] = React.useState<PayPalCaptureResponse | null>(() =>
    isConfirmationRoute ? readBookingConfirmationState() : null
  );
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

  React.useEffect(() => {
    if (!isPayPalReturnRoute || paypalReturnAttemptedRef.current) {
      return;
    }

    paypalReturnAttemptedRef.current = true;
    const paypalOrderId = searchParams.get('token')?.trim() ?? '';
    const payerId = searchParams.get('PayerID')?.trim() ?? searchParams.get('payerId')?.trim() ?? '';
    const storedCheckout = readPayPalCheckoutState();
    const bookingSessionId = searchParams.get('bookingSessionId')?.trim() || storedCheckout?.bookingSessionId || '';
    const captureLanguage = storedCheckout?.language ?? language;

    if (!paypalOrderId || !payerId || !bookingSessionId) {
      setIsCapturingPayPal(false);
      setPayPalCaptureError(strings.paypalReturnMissing);
      return;
    }

    setIsCapturingPayPal(true);
    setPayPalCaptureError(null);

    capturePayPalOrder({
      bookingSessionId,
      paypalOrderId,
      payerId,
      language: captureLanguage,
    })
      .then((response) => {
        setPayPalCaptureResult(response);
        persistBookingConfirmationState(response);
        clearPayPalCheckoutState(bookingSessionId);
        navigate(confirmedBookingPath(language), { replace: true });
      })
      .catch((captureError) => {
        setPayPalCaptureError(getPayPalCaptureErrorMessage(captureError, strings));
      })
      .finally(() => {
        setIsCapturingPayPal(false);
      });
  }, [isPayPalReturnRoute, language, navigate, searchParams, strings]);

  React.useEffect(() => {
    if (!isConfirmationRoute) {
      return;
    }

    const confirmation = readBookingConfirmationState();
    setBookingConfirmation(confirmation);

    if (!confirmation) {
      return;
    }

    const reservationId = confirmation.booking.reservationPublicId;
    if (confirmationTrackedRef.current === reservationId || wasBookingConfirmationTracked(reservationId)) {
      return;
    }

    if (!CookieConsentService.hasConsent('analytics')) {
      return;
    }

    maybeTrackBookingConfirmation(confirmation);
    markBookingConfirmationTracked(reservationId);
    confirmationTrackedRef.current = reservationId;
  }, [isConfirmationRoute]);

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
    setDepositError(null);
    setDepositHandoff(null);
    setCheckoutProperty(null);
    setHoldError(null);
    setHoldResponse(null);
    setHoldFieldErrors({});
    setPayPalOrderError(null);

    if (Object.keys(validation).length > 0) {
      setResult(null);
      return;
    }

    setIsSubmitting(true);
    try {
      trackBookingSearch({
        arrival_date: arrivalDate,
        departure_date: departureDate,
        guests,
        language,
        source: 'booking_page',
      });

      const response = await searchAvailability({
        arrivalDate,
        departureDate,
        guests,
        language,
        source: 'booking_page',
      });
      setResult(response);

      const minPriceCents =
        response.properties.length > 0
          ? Math.min(
              ...response.properties
                .map((p) => p.price?.totalAmountCents)
                .filter((v): v is number => v != null)
            )
          : null;
      const firstCurrency = response.properties.find((p) => p.price?.currency)?.price?.currency ?? null;

      trackAvailabilityResults({
        available_count: response.properties.length,
        min_price_cents: minPriceCents === Infinity ? null : minPriceCents,
        currency: firstCurrency,
        arrival_date: arrivalDate,
        departure_date: departureDate,
        guests,
        language,
      });
    } catch (searchError) {
      setResult(null);
      setError(getSearchErrorMessage(searchError, strings));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualDepositHandoff = async (property: BookingAvailableProperty) => {
    if (!result?.quoteId) {
      setDepositError(strings.contactHandoffError);
      return;
    }

    setDepositLoadingPropertyId(property.propertyId);
    setDepositError(null);
    setCheckoutProperty(null);
    setHoldError(null);
    setHoldResponse(null);
    setPayPalOrderError(null);

    try {
      const response = await getDepositHandoff({
        language,
        quoteId: result.quoteId,
        propertyId: property.propertyId,
      });
      setDepositHandoff(response);
    } catch {
      setDepositError(strings.contactHandoffError);
    } finally {
      setDepositLoadingPropertyId(null);
    }
  };

  const handleStartPayPalHold = (property: BookingAvailableProperty) => {
    if (!result?.quoteId || !result.bookingSessionId) {
      setHoldError(strings.checkoutUnavailable);
      return;
    }

    setDepositError(null);
    setDepositHandoff(null);
    setCheckoutProperty(property);
    setHoldForm(initialPayPalHoldForm);
    setHoldFieldErrors({});
    setHoldError(null);
    setHoldResponse(null);
    setPayPalOrderError(null);

    if (property.price) {
      trackPaymentMethodSelected({
        quote_id: result.quoteId,
        property_id: property.propertyId,
        payment_type: 'paypal',
        value_cents: property.price.totalAmountCents,
        currency: property.price.currency,
        language,
      });
    }
  };

  const updateHoldForm = (updates: Partial<PayPalHoldFormState>) => {
    setHoldForm((current) => ({ ...current, ...updates }));
    setHoldFieldErrors((current) => {
      const next = { ...current };
      Object.keys(updates).forEach((key) => {
        delete next[key];
      });
      return next;
    });
  };

  const handleCreatePayPalHold = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!result || !checkoutProperty) {
      setHoldError(strings.checkoutUnavailable);
      return;
    }

    const validation = validatePayPalHoldForm(holdForm, strings);
    setHoldFieldErrors(validation);
    setHoldError(null);

    if (Object.keys(validation).length > 0) {
      return;
    }

    setIsCreatingHold(true);
    try {
      const response = await createPayPalHold({
        quoteId: result.quoteId,
        bookingSessionId: result.bookingSessionId,
        propertyId: checkoutProperty.propertyId,
        language,
        guest: {
          firstName: holdForm.firstName,
          lastName: holdForm.lastName,
          email: holdForm.email,
          phone: holdForm.phone,
          country: holdForm.country,
          message: holdForm.message,
        },
        portalPassword: holdForm.portalPassword,
        termsAccepted: holdForm.termsAccepted,
      });

      setHoldResponse(response);
      setPayPalOrderError(null);

      if (checkoutProperty.price) {
        trackCheckoutStarted({
          quote_id: result.quoteId,
          property_id: checkoutProperty.propertyId,
          property_slug: checkoutProperty.slug,
          property_name: checkoutProperty.name,
          value_cents: checkoutProperty.price.totalAmountCents,
          currency: checkoutProperty.price.currency,
          arrival_date: result.arrivalDate,
          departure_date: result.departureDate,
          guests: result.guests,
          language,
        });
      }
    } catch (holdCreationError) {
      setHoldResponse(null);
      setHoldError(getHoldErrorMessage(holdCreationError, strings));
    } finally {
      setIsCreatingHold(false);
    }
  };

  const handleCreatePayPalOrder = async () => {
    if (!holdResponse) {
      setPayPalOrderError(strings.paymentNotReady);
      return;
    }

    setIsCreatingPayPalOrder(true);
    setPayPalOrderError(null);

    try {
      const response = await createPayPalOrder({
        bookingSessionId: holdResponse.booking.bookingSessionId,
        language,
      });

      const paypalOrder = response.paypal;
      if (!paypalOrder?.approvalUrl) {
        setPayPalOrderError(strings.paymentNotReady);
        return;
      }

      persistPayPalCheckoutState({
        bookingSessionId: holdResponse.booking.bookingSessionId,
        paypalOrderId: paypalOrder.orderId,
        reservationPublicId: holdResponse.booking.reservationPublicId,
        language,
      });
      redirectToUrl(paypalOrder.approvalUrl);
    } catch (orderError) {
      setPayPalOrderError(getPayPalOrderErrorMessage(orderError, strings));
    } finally {
      setIsCreatingPayPalOrder(false);
    }
  };

  if (isPayPalReturnRoute) {
    return (
      <div id="body" className="booking-page">
        <Helmet>
          <title>{strings.paypalReturnTitle} | {strings.siteTitle}</title>
          <meta name="description" content={strings.metaDescription} />
          <link rel="canonical" href={`https://www.reservaskalawala.com/${language === 'es' ? 'bookES/return' : 'book/return'}`} />
        </Helmet>
        <Navigation isBlog={false} />

        <main className="booking-search-container">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} xl={7}>
                <PayPalReturnPanel
                  strings={strings}
                  language={language}
                  isProcessing={isCapturingPayPal}
                  error={paypalCaptureError}
                  result={paypalCaptureResult}
                />
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    );
  }

  if (isConfirmationRoute) {
    return (
      <div id="body" className="booking-page">
        <Helmet>
          <title>{strings.confirmationTitle} | {strings.siteTitle}</title>
          <meta name="description" content={strings.metaDescription} />
          <link rel="canonical" href={`https://www.reservaskalawala.com/${language === 'es' ? 'bookES/confirmed' : 'book/confirmed'}`} />
        </Helmet>
        <Navigation isBlog={false} />

        <main className="booking-search-container">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} xl={7}>
                <BookingConfirmationPanel result={bookingConfirmation} strings={strings} language={language} />
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    );
  }

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

              {depositError && (
                <Alert className="booking-search-alert" variant="danger" role="alert">
                  {depositError}
                </Alert>
              )}

              {depositHandoff && (
                <ManualDepositHandoffPanel
                  handoff={depositHandoff}
                  strings={strings}
                  language={language}
                  onBack={() => setDepositHandoff(null)}
                />
              )}

              {result && checkoutProperty && (
                <PayPalCheckoutPanel
                  result={result}
                  property={checkoutProperty}
                  strings={strings}
                  language={language}
                  form={holdForm}
                  fieldErrors={holdFieldErrors}
                  holdError={holdError}
                  holdResponse={holdResponse}
                  paypalOrderError={paypalOrderError}
                  isCreatingHold={isCreatingHold}
                  isCreatingPayPalOrder={isCreatingPayPalOrder}
                  onChange={updateHoldForm}
                  onSubmit={handleCreatePayPalHold}
                  onCreatePayPalOrder={handleCreatePayPalOrder}
                  onBack={() => {
                    setCheckoutProperty(null);
                    setHoldError(null);
                    setHoldResponse(null);
                    setHoldFieldErrors({});
                    setPayPalOrderError(null);
                  }}
                />
              )}

              {result && (
                <BookingSearchResults
                  result={result}
                  strings={strings}
                  language={language}
                  onManualDepositHandoff={handleManualDepositHandoff}
                  onStartPayPalHold={handleStartPayPalHold}
                  depositLoadingPropertyId={depositLoadingPropertyId}
                  selectedPropertyId={checkoutProperty?.propertyId ?? null}
                />
              )}
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
  onManualDepositHandoff: (property: BookingAvailableProperty) => void;
  onStartPayPalHold: (property: BookingAvailableProperty) => void;
  depositLoadingPropertyId: string | null;
  selectedPropertyId: string | null;
}

const BookingSearchResults = ({
  result,
  strings,
  language,
  onManualDepositHandoff,
  onStartPayPalHold,
  depositLoadingPropertyId,
  selectedPropertyId,
}: BookingSearchResultsProps) => {
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
      <Row className="booking-results-grid g-4">
        {result.properties.map((property) => (
          <Col className="booking-results-col" key={property.propertyId} md={6} xl={4}>
            <BookingPropertyCard
              property={property}
              strings={strings}
              language={language}
              onManualDepositHandoff={onManualDepositHandoff}
              onStartPayPalHold={onStartPayPalHold}
              isDepositLoading={depositLoadingPropertyId === property.propertyId}
              isSelectedForCheckout={selectedPropertyId === property.propertyId}
            />
          </Col>
        ))}
      </Row>
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
  onManualDepositHandoff,
  onStartPayPalHold,
  isDepositLoading,
  isSelectedForCheckout,
}: {
  property: BookingAvailableProperty;
  strings: BookingStrings;
  language: BookingLanguage;
  onManualDepositHandoff: (property: BookingAvailableProperty) => void;
  onStartPayPalHold: (property: BookingAvailableProperty) => void;
  isDepositLoading: boolean;
  isSelectedForCheckout: boolean;
}) => {
  const listingUrl = buildListingUrl(property.slug, language);
  const titleId = `booking-result-title-${property.propertyId}`;
  const canCreatePayPalHold = property.actions?.canCreatePayPalHold !== false;
  const canUseManualDeposit = property.actions?.canUseManualDepositHandoff !== false;

  return (
    <article className="booking-result-card" aria-labelledby={titleId}>
      <div className="booking-result-card__media-frame">
        <a
          className="booking-result-card__media"
          href={listingUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${strings.viewListing}: ${property.name}`}
        >
          <img src={property.thumbnailUrl} alt={property.name} />
          <span className="booking-result-card__overlay" aria-hidden="true" />
        </a>
        <span className="booking-result-card__status">{strings.available}</span>
        <h3 className="booking-result-card__media-title" id={titleId}>
          {property.name}
        </h3>
      </div>
      <div className="booking-result-card__content">
        <div className="booking-result-card__heading">
          <p className="booking-result-card__guest-badge">
            <FontAwesomeIcon icon={faUser} /> {strings.sleeps(property.guestCapacity)}
          </p>
        </div>
        <ul className="booking-result-card__amenities" aria-label={strings.amenitiesLabel(property.name)}>
          {property.amenities.slice(0, 5).map((amenity) => (
            <li key={`${property.propertyId}-${amenity.code}`}>
              <FontAwesomeIcon icon={amenityIcons[amenity.code] ?? faWifi} />
              <span>{amenity.label}</span>
            </li>
          ))}
        </ul>
        {property.price && (
          <div className="booking-result-card__price">
            <span>{strings.priceForStay}</span>
            <strong>{formatMoney(property.price.totalAmountCents, property.price.currency, language)}</strong>
            <small>
              {formatMoney(property.price.nightlyAverageCents, property.price.currency, language)} {strings.averageNight}
            </small>
          </div>
        )}
        <a className="booking-result-card__link" href={listingUrl} target="_blank" rel="noopener noreferrer">
          {strings.viewListing}
        </a>
        {canCreatePayPalHold && (
          <Button
            className="booking-result-card__book-button"
            type="button"
            variant="primary"
            aria-pressed={isSelectedForCheckout}
            onClick={() => onStartPayPalHold(property)}
          >
            {strings.bookNow}
          </Button>
        )}
        {canUseManualDeposit && (
          <Button
            className="booking-result-card__deposit-button"
            type="button"
            variant="outline-secondary"
            disabled={isDepositLoading}
            onClick={() => onManualDepositHandoff(property)}
          >
            {isDepositLoading ? strings.manualDepositLoading : strings.manualDepositButton}
          </Button>
        )}
      </div>
    </article>
  );
};

const PayPalCheckoutPanel = ({
  result,
  property,
  strings,
  language,
  form,
  fieldErrors,
  holdError,
  holdResponse,
  paypalOrderError,
  isCreatingHold,
  isCreatingPayPalOrder,
  onChange,
  onSubmit,
  onCreatePayPalOrder,
  onBack,
}: {
  result: BookingSearchResponse;
  property: BookingAvailableProperty;
  strings: BookingStrings;
  language: BookingLanguage;
  form: PayPalHoldFormState;
  fieldErrors: Record<string, string>;
  holdError: string | null;
  holdResponse: PayPalHoldResponse | null;
  paypalOrderError: string | null;
  isCreatingHold: boolean;
  isCreatingPayPalOrder: boolean;
  onChange: (updates: Partial<PayPalHoldFormState>) => void;
  onSubmit: (event: React.FormEvent) => void;
  onCreatePayPalOrder: () => void;
  onBack: () => void;
}) => {
  const price = property.price ?? holdResponse?.booking.price;

  return (
    <section className="booking-checkout-panel" aria-labelledby="booking-checkout-title">
      <div className="booking-checkout-panel__header">
        <p className="booking-results-kicker">{strings.paypalTitle}</p>
        <h2 id="booking-checkout-title">{strings.checkoutTitle}</h2>
        <p>{strings.paypalDescription}</p>
      </div>

      <div className="booking-checkout-panel__summary" aria-label={strings.checkoutSummary}>
        <div>
          <span>{strings.depositContextTitle}</span>
          <strong>{property.name}</strong>
          <small>{strings.depositDates(formatDate(result.arrivalDate, language), formatDate(result.departureDate, language))}</small>
        </div>
        {price && (
          <div>
            <span>{strings.priceForStay}</span>
            <strong>{formatMoney(price.totalAmountCents, price.currency, language)}</strong>
          </div>
        )}
      </div>

      {holdError && (
        <Alert className="booking-search-alert" variant="danger" role="alert">
          {holdError}
        </Alert>
      )}

      {holdResponse ? (
        <div className="booking-checkout-panel__hold" aria-live="polite">
          <h3>{strings.holdActiveTitle}</h3>
          <p>{strings.holdActiveBody}</p>
          <div className="booking-checkout-panel__timer">
            <span>{strings.holdExpiring}</span>
            <HoldCountdown expiresAt={holdResponse.booking.hold.expiresAt} />
            <small>{strings.holdExpiresAt(formatDateTime(holdResponse.booking.hold.expiresAt, language))}</small>
          </div>
          <p className="booking-checkout-panel__reservation">
            {strings.reservationId}: <strong>{holdResponse.booking.reservationPublicId}</strong>
          </p>
          {paypalOrderError && (
            <Alert className="booking-checkout-panel__notice" variant="danger" role="alert">
              {paypalOrderError}
            </Alert>
          )}
          <div className="booking-checkout-panel__actions">
            <Button className="booking-search-submit" type="button" disabled={isCreatingPayPalOrder} onClick={onCreatePayPalOrder}>
              {isCreatingPayPalOrder ? (
                <>
                  <Spinner animation="border" size="sm" /> {strings.creatingPayPalOrder}
                </>
              ) : (
                strings.continueToPayment
              )}
            </Button>
            <Button type="button" variant="link" className="booking-deposit-handoff__back" onClick={onBack}>
              {strings.backToResults}
            </Button>
          </div>
        </div>
      ) : (
        <Form className="booking-checkout-panel__form" onSubmit={onSubmit} noValidate>
          <h3>{strings.guestDetails}</h3>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="paypalHoldFirstName">
                <Form.Label>{strings.firstName}</Form.Label>
                <Form.Control
                  value={form.firstName}
                  isInvalid={Boolean(fieldErrors.firstName)}
                  onChange={(event) => onChange({ firstName: event.target.value })}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.firstName}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="paypalHoldLastName">
                <Form.Label>{strings.lastName}</Form.Label>
                <Form.Control
                  value={form.lastName}
                  isInvalid={Boolean(fieldErrors.lastName)}
                  onChange={(event) => onChange({ lastName: event.target.value })}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.lastName}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="paypalHoldEmail">
                <Form.Label>{strings.email}</Form.Label>
                <Form.Control
                  type="email"
                  value={form.email}
                  isInvalid={Boolean(fieldErrors.email)}
                  onChange={(event) => onChange({ email: event.target.value })}
                />
                <Form.Control.Feedback type="invalid">{fieldErrors.email}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="paypalHoldPhone">
                <Form.Label>{strings.phone}</Form.Label>
                <Form.Control value={form.phone} onChange={(event) => onChange({ phone: event.target.value })} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="paypalHoldCountry">
                <Form.Label>{strings.country}</Form.Label>
                <Form.Control value={form.country} onChange={(event) => onChange({ country: event.target.value })} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="paypalHoldPortalPassword">
                <Form.Label>{strings.portalPassword}</Form.Label>
                <Form.Control
                  type="password"
                  value={form.portalPassword}
                  isInvalid={Boolean(fieldErrors.portalPassword)}
                  onChange={(event) => onChange({ portalPassword: event.target.value })}
                />
                <Form.Text>{strings.portalPasswordHelp}</Form.Text>
                <Form.Control.Feedback type="invalid">{fieldErrors.portalPassword}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group controlId="paypalHoldMessage">
                <Form.Label>{strings.specialRequests}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={form.message}
                  onChange={(event) => onChange({ message: event.target.value })}
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Check
                id="paypalHoldTermsAccepted"
                label={strings.termsAccepted}
                checked={form.termsAccepted}
                isInvalid={Boolean(fieldErrors.termsAccepted)}
                feedback={fieldErrors.termsAccepted}
                feedbackType="invalid"
                onChange={(event) => onChange({ termsAccepted: event.target.checked })}
              />
            </Col>
          </Row>

          <div className="booking-checkout-panel__actions">
            <Button type="submit" className="booking-search-submit" disabled={isCreatingHold}>
              {isCreatingHold ? (
                <>
                  <Spinner animation="border" size="sm" /> {strings.creatingHold}
                </>
              ) : (
                strings.continueToPayment
              )}
            </Button>
            <Button type="button" variant="link" className="booking-deposit-handoff__back" onClick={onBack}>
              {strings.backToResults}
            </Button>
          </div>
        </Form>
      )}
    </section>
  );
};

const HoldCountdown = ({ expiresAt }: { expiresAt: string }) => {
  const [nowMs, setNowMs] = React.useState(() => Date.now());
  const expiresAtMs = Date.parse(expiresAt);

  React.useEffect(() => {
    const intervalId = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return <strong>{formatDuration(Number.isFinite(expiresAtMs) ? expiresAtMs - nowMs : 0)}</strong>;
};

const PayPalReturnPanel = ({
  strings,
  language,
  isProcessing,
  error,
  result,
}: {
  strings: BookingStrings;
  language: BookingLanguage;
  isProcessing: boolean;
  error: string | null;
  result: PayPalCaptureResponse | null;
}) => {
  const propertyName = result?.booking.property?.name;

  return (
    <section className="booking-return-panel" aria-labelledby="booking-return-title" aria-live="polite">
      <p className="booking-results-kicker">{strings.paypalTitle}</p>
      <h1 id="booking-return-title">{strings.paypalReturnTitle}</h1>

      {isProcessing && (
        <div className="booking-return-panel__status">
          <Spinner animation="border" role="status" />
          <div>
            <h2>{strings.paypalReturnProcessing}</h2>
            <p>{strings.paypalReturnProcessingBody}</p>
          </div>
        </div>
      )}

      {!isProcessing && error && (
        <Alert className="booking-return-panel__notice" variant="danger" role="alert">
          {error}
        </Alert>
      )}

      {!isProcessing && result && (
        <div className="booking-return-panel__confirmed">
          <h2>{strings.confirmationTitle}</h2>
          <p>{strings.paypalReturnSuccessBody}</p>
          <dl>
            <div>
              <dt>{strings.reservationId}</dt>
              <dd>{result.booking.reservationPublicId}</dd>
            </div>
            {propertyName && (
              <div>
                <dt>{strings.depositContextTitle}</dt>
                <dd>{propertyName}</dd>
              </div>
            )}
            <div>
              <dt>{strings.status}</dt>
              <dd>{formatPaymentStatus(result.payment.status, strings)}</dd>
            </div>
            <div>
              <dt>{strings.depositDates(formatDate(result.booking.arrivalDate, language), formatDate(result.booking.departureDate, language))}</dt>
              <dd>{strings.depositGuests(result.booking.guests)}</dd>
            </div>
          </dl>
        </div>
      )}
    </section>
  );
};

const BookingConfirmationPanel = ({
  result,
  strings,
  language,
}: {
  result: PayPalCaptureResponse | null;
  strings: BookingStrings;
  language: BookingLanguage;
}) => {
  if (!result) {
    return (
      <section className="booking-confirmation-panel" aria-labelledby="booking-confirmation-title">
        <p className="booking-results-kicker">{strings.paypalTitle}</p>
        <h1 id="booking-confirmation-title">{strings.confirmationTitle}</h1>
        <Alert className="booking-return-panel__notice" variant="warning" role="alert">
          {strings.confirmationMissing}
        </Alert>
      </section>
    );
  }

  const propertyName = result.booking.property?.name ?? strings.notAvailable;
  const manageBookingUrl = portalPath(language, result.booking.reservationPublicId);

  return (
    <section className="booking-confirmation-panel" aria-labelledby="booking-confirmation-title">
      <p className="booking-results-kicker">{strings.paypalTitle}</p>
      <h1 id="booking-confirmation-title">{strings.confirmationTitle}</h1>
      <p>{strings.confirmationSubtitle}</p>

      <dl className="booking-confirmation-panel__details">
        <div>
          <dt>{strings.reservationId}</dt>
          <dd>{result.booking.reservationPublicId}</dd>
        </div>
        <div>
          <dt>{strings.depositContextTitle}</dt>
          <dd>{propertyName}</dd>
        </div>
        <div>
          <dt>{strings.stayDates}</dt>
          <dd>{strings.depositDates(formatDate(result.booking.arrivalDate, language), formatDate(result.booking.departureDate, language))}</dd>
        </div>
        <div>
          <dt>{strings.guests}</dt>
          <dd>{strings.depositGuests(result.booking.guests)}</dd>
        </div>
        <div>
          <dt>{strings.status}</dt>
          <dd>{strings.paymentConfirmed}</dd>
        </div>
      </dl>

      <a className="booking-confirmation-panel__manage" href={manageBookingUrl}>
        {strings.manageBooking}
      </a>
    </section>
  );
};

const ManualDepositHandoffPanel = ({
  handoff,
  strings,
  language,
  onBack,
}: {
  handoff: DepositHandoffResponse;
  strings: BookingStrings;
  language: BookingLanguage;
  onBack: () => void;
}) => {
  const context = handoff.bookingContext;
  const instructionCopies = handoff.instructions.bodyKeys
    .map((bodyKey) => getDepositInstructionCopy(bodyKey, strings))
    .filter((copy): copy is string => Boolean(copy));
  const bodyCopies =
    instructionCopies.length > 0
      ? instructionCopies
      : [
          strings.depositBankInstructions,
          strings.depositStaffWillConfirm,
          strings.depositNoReceiptUpload,
          strings.depositContactUs,
        ];

  const handleContactClick = (method: DepositHandoffResponse['instructions']['contactMethods'][number]) => {
    const property = context?.property;

    if (!context?.quoteId || !property?.propertyId) {
      return;
    }

    const analyticsConsent = CookieConsentService.hasConsent('analytics');

    trackManualDepositHandoffClicked({
      contact_method: method.type,
      language,
      quote_id: context.quoteId,
      property_id: property.propertyId,
      property_slug: property.slug,
      analytics_consent: analyticsConsent,
    });

    void recordDepositHandoffEvent({
      quoteId: context.quoteId,
      propertyId: property.propertyId,
      language,
      contactMethod: method.type,
      analyticsConsent,
    }).catch(() => undefined);
  };

  return (
    <section className="booking-deposit-handoff" aria-labelledby="booking-deposit-title">
      <div className="booking-deposit-handoff__header">
        <p className="booking-results-kicker">{strings.manualDepositTitle}</p>
        <h2 id="booking-deposit-title">{strings.depositTitle}</h2>
        <p>{strings.depositInstructions}</p>
      </div>

      <Alert className="booking-deposit-handoff__notice" variant="warning">
        <strong>{strings.depositNotConfirmedTitle}</strong>
        <span>{strings.depositNotConfirmed}</span>
      </Alert>

      {context && (
        <div className="booking-deposit-handoff__context" aria-label={strings.depositContextTitle}>
          <h3>{strings.depositContextTitle}</h3>
          {context.property && <p>{context.property.name}</p>}
          {context.arrivalDate && context.departureDate && (
            <p>{strings.depositDates(formatDate(context.arrivalDate, language), formatDate(context.departureDate, language))}</p>
          )}
          {typeof context.guests === 'number' && <p>{strings.depositGuests(context.guests)}</p>}
        </div>
      )}

      <div className="booking-deposit-handoff__body">
        {bodyCopies.map((copy) => (
          <p key={copy}>{copy}</p>
        ))}
      </div>

      <div className="booking-deposit-handoff__contacts">
        {handoff.instructions.contactMethods.map((method) => (
          <a
            key={`${method.type}-${method.url}`}
            className="booking-deposit-handoff__contact"
            href={method.url}
            target={method.type === 'email' ? undefined : '_blank'}
            rel={method.type === 'email' ? undefined : 'noopener noreferrer'}
            onClick={() => handleContactClick(method)}
          >
            <span>{method.type === 'email' ? strings.contactByEmail : strings.contactByWhatsapp}</span>
            <strong>{method.label}</strong>
          </a>
        ))}
      </div>

      <Button className="booking-deposit-handoff__back" type="button" variant="link" onClick={onBack}>
        {strings.backToResults}
      </Button>
    </section>
  );
};

function getDepositInstructionCopy(bodyKey: string, strings: BookingStrings): string | null {
  const stringKey = depositInstructionMessages[bodyKey];
  if (!stringKey) {
    return null;
  }

  return strings[stringKey];
}

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

function validatePayPalHoldForm(form: PayPalHoldFormState, strings: BookingStrings): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!form.firstName.trim()) {
    errors.firstName = strings.validationRequired;
  }

  if (!form.lastName.trim()) {
    errors.lastName = strings.validationRequired;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = strings.validationEmail;
  }

  if (form.portalPassword.length < 12) {
    errors.portalPassword = strings.validationPortalPassword;
  }

  if (!form.termsAccepted) {
    errors.termsAccepted = strings.validationTerms;
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

function getHoldErrorMessage(error: unknown, strings: BookingStrings): string {
  if (error instanceof BookingApiError) {
    if (error.code === 'property_no_longer_available' || error.code === 'no_longer_available') {
      return strings.propertyNoLongerAvailable;
    }

    if (error.status === 503 || error.retryable) {
      return strings.providerUnavailable;
    }
  }

  return strings.checkoutUnavailable;
}

function getPayPalOrderErrorMessage(error: unknown, strings: BookingStrings): string {
  if (error instanceof BookingApiError) {
    if (error.code === 'hold_expired') {
      return strings.bookingExpired;
    }

    if (error.status === 503 || error.retryable) {
      return strings.providerUnavailable;
    }
  }

  return strings.paymentNotReady;
}

function getPayPalCaptureErrorMessage(error: unknown, strings: BookingStrings): string {
  if (error instanceof BookingApiError) {
    if (error.code === 'hold_expired') {
      return strings.bookingExpired;
    }

    if (error.code === 'paypal_order_not_approved') {
      return strings.paymentNotReady;
    }

    if (error.status === 503 || error.retryable) {
      return strings.providerUnavailable;
    }
  }

  return strings.paypalCaptureError;
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

function formatDate(value: string, language: BookingLanguage): string {
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(language === 'es' ? 'es-CR' : 'en-US', {
    dateStyle: 'medium',
    timeZone: 'UTC',
  }).format(date);
}

function formatDuration(durationMs: number): string {
  const safeMs = Math.max(0, durationMs);
  const totalSeconds = Math.floor(safeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatPaymentStatus(status: string, strings: BookingStrings): string {
  if (status === 'captured') {
    return strings.paymentConfirmed;
  }

  return status;
}

function redirectToUrl(url: string): void {
  window.location.assign(url);
}

function isBookingReturnPath(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, '').toLowerCase();
  return normalized === '/book/return' || normalized === '/bookes/return';
}

function isBookingConfirmedPath(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, '').toLowerCase();
  return normalized === '/book/confirmed' || normalized === '/bookes/confirmed';
}

function confirmedBookingPath(language: BookingLanguage): string {
  return language === 'es' ? '/bookES/confirmed' : '/book/confirmed';
}

function portalPath(language: BookingLanguage, reservationPublicId: string): string {
  const basePath = language === 'es' ? '/portalES' : '/portal';
  return `${basePath}?reservationId=${encodeURIComponent(reservationPublicId)}`;
}

function persistPayPalCheckoutState(state: StoredPayPalCheckout): void {
  try {
    window.sessionStorage.setItem(paypalCheckoutStorageKey, JSON.stringify(state));
  } catch {
    // Returning from PayPal can still work if the backend includes bookingSessionId in the URL.
  }
}

function readPayPalCheckoutState(): StoredPayPalCheckout | null {
  try {
    const raw = window.sessionStorage.getItem(paypalCheckoutStorageKey);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<StoredPayPalCheckout>;
    if (
      typeof parsed.bookingSessionId !== 'string' ||
      typeof parsed.paypalOrderId !== 'string' ||
      (parsed.language !== 'en' && parsed.language !== 'es')
    ) {
      return null;
    }

    return {
      bookingSessionId: parsed.bookingSessionId,
      paypalOrderId: parsed.paypalOrderId,
      reservationPublicId: typeof parsed.reservationPublicId === 'string' ? parsed.reservationPublicId : undefined,
      language: parsed.language,
    };
  } catch {
    return null;
  }
}

function clearPayPalCheckoutState(bookingSessionId: string): void {
  try {
    const stored = readPayPalCheckoutState();
    if (!stored || stored.bookingSessionId === bookingSessionId) {
      window.sessionStorage.removeItem(paypalCheckoutStorageKey);
    }
  } catch {
    // Non-critical cleanup.
  }
}

function persistBookingConfirmationState(state: PayPalCaptureResponse): void {
  try {
    window.sessionStorage.setItem(bookingConfirmationStorageKey, JSON.stringify(state));
  } catch {
    // The confirmation route will show a recoverable message if storage is unavailable.
  }
}

function readBookingConfirmationState(): PayPalCaptureResponse | null {
  try {
    const raw = window.sessionStorage.getItem(bookingConfirmationStorageKey);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as PayPalCaptureResponse;
    if (
      !parsed?.booking?.reservationPublicId ||
      !parsed.booking.bookingSessionId ||
      parsed.booking.status !== 'booking_confirmed' ||
      !parsed.payment?.paypalOrderId
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function maybeTrackBookingConfirmation(result: PayPalCaptureResponse): void {
  const property = result.booking.property;
  const price = result.booking.price;

  if (!property?.propertyId || !property.slug || !property.name || !price?.currency || typeof price.totalAmountCents !== 'number') {
    return;
  }

  trackBookingConfirmed({
    reservation_id: result.booking.reservationPublicId,
    property_id: property.propertyId,
    property_slug: property.slug,
    property_name: property.name,
    value_cents: price.totalAmountCents,
    currency: price.currency,
    arrival_date: result.booking.arrivalDate,
    departure_date: result.booking.departureDate,
    payment_method: 'paypal',
    language: result.booking.language,
  });
}

function wasBookingConfirmationTracked(reservationPublicId: string): boolean {
  try {
    return window.sessionStorage.getItem(`${bookingConfirmationTrackedPrefix}${reservationPublicId}`) === '1';
  } catch {
    return false;
  }
}

function markBookingConfirmationTracked(reservationPublicId: string): void {
  try {
    window.sessionStorage.setItem(`${bookingConfirmationTrackedPrefix}${reservationPublicId}`, '1');
  } catch {
    // Non-critical analytics dedupe marker.
  }
}

function buildListingUrl(slug: string, language: BookingLanguage): string {
  const normalizedSlug = slug.replace(/^\/+/, '');
  return `/${normalizedSlug}${language === 'es' ? 'ES' : ''}`;
}

export default BookingPage;
