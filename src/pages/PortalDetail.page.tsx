import React from 'react';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import FixedNavigation from '../components/FixedNavigation/FixedNavigation.component';
import FixedNavigationES from '../components/FixedNavigation/FixedNavigation.componentES';
import { useLocale } from '../i18n';
import {
  BookingApiError,
  BookingLanguage,
  PortalReservationResponse,
  cancelPortalBooking,
  getPortalReservation,
  submitPortalHelpRequest,
  updatePortalGuests,
} from '../services/BookingApi.service';
import { clearPortalSession, readPortalToken } from '../services/PortalSession.service';
import { portalDetailStrings, PortalDetailStrings } from './PortalDetail.i18n';
import './PortalDetail.style.scss';

/** Coordinates and Google Maps place ID per property group. */
const KALAWALA_LOCATION = { lat: 9.6587676, lng: -82.7499424, placeId: '0x8fa6515b59164895:0xcb6669ca079882c8' };
const NAMAITAMI_LOCATION = { lat: 9.6340, lng: -82.7170, placeId: '' };

const KALAWALA_SLUGS = new Set([
  'Geco', 'GecoES',
  'Rana', 'RanaES',
  'Tucano', 'TucanoES',
  'Pappagallo', 'PappagalloES',
  'Delfin', 'DelfinES',
]);

function getPropertyLocation(slug: string | undefined) {
  if (!slug) return KALAWALA_LOCATION;
  if (KALAWALA_SLUGS.has(slug)) return KALAWALA_LOCATION;
  return NAMAITAMI_LOCATION;
}

function getGoogleMapsUrl(slug: string | undefined): string {
  const loc = getPropertyLocation(slug);
  if (loc.placeId) {
    return `https://www.google.com/maps/place/?q=place_id:${loc.placeId}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`;
}

function portalLoginPath(language: BookingLanguage): string {
  return language === 'es' ? '/portalES' : '/portal';
}

/**
 * The cancellation deadline is an instant, not a day, so it is rendered with the
 * time and in Costa Rica time — the guest's own timezone would misrepresent when
 * the window actually closes.
 */
function formatDateTime(value: string, language: BookingLanguage): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat(language === 'es' ? 'es-CR' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Costa_Rica',
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

function formatCents(cents: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

function formatPaymentStatus(
  method: string | undefined,
  status: string | undefined,
  strings: PortalDetailStrings
): string {
  if (status === 'paid' || status === 'captured') {
    return strings.paymentConfirmed;
  }
  if (status === 'pending') {
    return strings.paymentPending;
  }
  if (status === 'failed') {
    return strings.paymentFailed;
  }
  if (method === 'manual_deposit') {
    return strings.paymentManualDeposit;
  }
  return status ?? strings.notAvailable;
}

function formatBookingStatus(status: string, strings: PortalDetailStrings): string {
  switch (status) {
    case 'confirmed':
    case 'booking_confirmed':
      return strings.statusConfirmed;
    case 'paid':
      return strings.statusPaid;
    case 'pending':
      return strings.statusPending;
    case 'cancelled':
      return strings.statusCancelled;
    case 'expired':
      return strings.statusExpired;
    default:
      return strings.statusUnknown;
  }
}

function getLoadError(
  error: unknown,
  strings: PortalDetailStrings
): { message: string; isAuth: boolean } {
  if (error instanceof BookingApiError) {
    if (error.status === 401 || error.status === 403) {
      return { message: strings.errorSessionExpired, isAuth: true };
    }
    if (error.status === 404) {
      return { message: strings.errorNotFound, isAuth: false };
    }
  }
  return { message: strings.errorGeneric, isAuth: false };
}

function getRequestError(error: unknown, strings: PortalDetailStrings): string {
  if (error instanceof BookingApiError && error.status === 429) {
    return strings.requestErrorTooMany;
  }
  return strings.requestErrorGeneric;
}

/**
 * Cancellation has its own failure modes. A 502 in particular is worth naming:
 * the server rolled nothing back, so retrying is safe and the guest should be
 * told their booking is untouched rather than left guessing.
 */
function getCancellationError(error: unknown, strings: PortalDetailStrings): string {
  if (error instanceof BookingApiError) {
    if (error.code === 'cancellation_window_closed') {
      return strings.cancellationErrorWindow;
    }
    if (error.code === 'cancellation_not_allowed') {
      return strings.cancellationErrorNotAllowed;
    }
    if (error.status === 502 || error.code === 'provider_error') {
      return strings.cancellationErrorProvider;
    }
  }
  return getRequestError(error, strings);
}

type PanelState = 'closed' | 'help' | 'cancellation' | 'editGuests';

type HelpRequestType = 'general' | 'date_change' | 'guest_count_change' | 'arrival_time' | 'other';

interface HelpFormState {
  type: HelpRequestType;
  message: string;
}

interface CancellationFormState {
  reason: string;
  message: string;
}

/**
 * Weather card that links to Microsoft Weather for Puerto Viejo de Talamanca.
 * MSN Weather doesn't allow iframe embedding, so we provide a branded link-out.
 */
const WeatherWidget = ({ language }: { language: BookingLanguage }) => {
  const msnUrl =
    language === 'es'
      ? 'https://www.msn.com/es-xl/clima/pronostico/in-Puerto-Viejo-de-Talamanca,Limón,Costa-Rica'
      : 'https://www.msn.com/en-us/weather/forecast/in-Puerto-Viejo-de-Talamanca,Limón,Costa-Rica';

  const label = language === 'es' ? 'Ver pronóstico del clima' : 'View weather forecast';
  const poweredBy = language === 'es' ? 'Con tecnología de' : 'Powered by';

  return (
    <a
      className="portal-weather-link"
      href={msnUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <span className="portal-weather-link__icon" aria-hidden="true">🌤️</span>
      <span className="portal-weather-link__text">
        <strong>{label}</strong>
        <small>{poweredBy} Microsoft Weather</small>
      </span>
      <span className="portal-weather-link__arrow" aria-hidden="true">→</span>
    </a>
  );
};

const PortalDetailPage = () => {
  const { reservationPublicId } = useParams<{ reservationPublicId: string }>();
  const navigate = useNavigate();
  const locale = useLocale();
  const language: BookingLanguage = locale === 'es' ? 'es' : 'en';
  const strings = portalDetailStrings[language];
  const Navigation = language === 'es' ? FixedNavigationES : FixedNavigation;

  const [data, setData] = React.useState<PortalReservationResponse | null>(null);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [panel, setPanel] = React.useState<PanelState>('closed');

  const [helpForm, setHelpForm] = React.useState<HelpFormState>({
    type: 'general',
    message: '',
  });
  const [helpFieldErrors, setHelpFieldErrors] = React.useState<Record<string, string>>({});
  const [helpError, setHelpError] = React.useState<string | null>(null);
  const [helpSuccess, setHelpSuccess] = React.useState(false);
  const [isSubmittingHelp, setIsSubmittingHelp] = React.useState(false);

  const [cancellationForm, setCancellationForm] = React.useState<CancellationFormState>({
    reason: '',
    message: '',
  });
  const [cancellationFieldErrors, setCancellationFieldErrors] = React.useState<Record<string, string>>({});
  const [cancellationError, setCancellationError] = React.useState<string | null>(null);
  const [cancellationSuccess, setCancellationSuccess] = React.useState(false);
  const [isSubmittingCancellation, setIsSubmittingCancellation] = React.useState(false);
  const [refundStatus, setRefundStatus] = React.useState<'manual_review' | 'not_applicable' | null>(null);

  const [guestCount, setGuestCount] = React.useState<number>(1);
  const [guestEditError, setGuestEditError] = React.useState<string | null>(null);
  const [guestEditSuccess, setGuestEditSuccess] = React.useState(false);
  const [isSubmittingGuestEdit, setIsSubmittingGuestEdit] = React.useState(false);

  const loadAttemptedRef = React.useRef(false);

  React.useEffect(() => {
    if (loadAttemptedRef.current || !reservationPublicId) {
      return;
    }

    loadAttemptedRef.current = true;

    const token = readPortalToken() ?? '';

    setIsLoading(true);
    getPortalReservation(reservationPublicId, token, language)
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        const { message, isAuth } = getLoadError(err, strings);
        setLoadError(message);
        if (isAuth) {
          clearPortalSession();
          navigate(
            `${portalLoginPath(language)}?reservationId=${encodeURIComponent(reservationPublicId)}`,
            { replace: true }
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [reservationPublicId, language, navigate, strings]);

  const handleLogout = () => {
    clearPortalSession();
    navigate(portalLoginPath(language), { replace: true });
  };

  const handleHelpSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    if (!helpForm.message.trim()) {
      errors.message = strings.helpValidationMessage;
    }
    setHelpFieldErrors(errors);
    setHelpError(null);

    if (Object.keys(errors).length > 0 || !reservationPublicId) {
      return;
    }

    const token = readPortalToken();
    if (!token) {
      clearPortalSession();
      navigate(portalLoginPath(language), { replace: true });
      return;
    }

    setIsSubmittingHelp(true);
    try {
      await submitPortalHelpRequest(
        reservationPublicId,
        token,
        {
          type: helpForm.type,
          message: helpForm.message.trim(),
        },
        language
      );
      setHelpSuccess(true);
    } catch (err) {
      setHelpError(getRequestError(err, strings));
    } finally {
      setIsSubmittingHelp(false);
    }
  };

  const handleCancellationSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const errors: Record<string, string> = {};
    if (!cancellationForm.reason.trim()) {
      errors.reason = strings.cancellationValidationReason;
    }
    setCancellationFieldErrors(errors);
    setCancellationError(null);

    if (Object.keys(errors).length > 0 || !reservationPublicId) {
      return;
    }

    const token = readPortalToken();
    if (!token) {
      clearPortalSession();
      navigate(portalLoginPath(language), { replace: true });
      return;
    }

    setIsSubmittingCancellation(true);
    try {
      const response = await cancelPortalBooking(
        reservationPublicId,
        token,
        {
          reason: cancellationForm.reason.trim(),
          message: cancellationForm.message.trim() || undefined,
        },
        language
      );

      // The response carries the post-cancellation state, so apply it directly.
      // loadAttemptedRef guards the initial fetch against re-running, which means
      // a refetch is not available to us here.
      setData({
        reservation: response.reservation,
        hold: response.hold,
        payment: response.payment,
      });
      setRefundStatus(response.refund.status);
      setCancellationSuccess(true);
    } catch (err) {
      setCancellationError(getCancellationError(err, strings));
    } finally {
      setIsSubmittingCancellation(false);
    }
  };

  const handleGuestEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setGuestEditError(null);

    const maxGuests = reservation?.property?.guestCapacity;
    if (guestCount < 1) {
      setGuestEditError(strings.editGuestsValidation);
      return;
    }
    if (maxGuests && guestCount > maxGuests) {
      setGuestEditError(strings.editGuestsExceedsCapacity(maxGuests));
      return;
    }

    if (!reservationPublicId) {
      return;
    }

    const token = readPortalToken();
    if (!token) {
      clearPortalSession();
      navigate(portalLoginPath(language), { replace: true });
      return;
    }

    setIsSubmittingGuestEdit(true);
    try {
      const response = await updatePortalGuests(
        reservationPublicId,
        token,
        { guests: guestCount },
        language
      );
      setData((current) =>
        current
          ? {
              ...current,
              reservation: response.reservation,
              hold: response.hold,
              payment: response.payment,
            }
          : current
      );
      setGuestEditSuccess(true);
    } catch (err) {
      setGuestEditError(getRequestError(err, strings));
    } finally {
      setIsSubmittingGuestEdit(false);
    }
  };

  const reservation = data?.reservation;
  const payment = data?.payment;
  const isConfirmed =
    reservation?.status === 'confirmed' || reservation?.status === 'booking_confirmed';
  const isCancelled = reservation?.status === 'cancelled';

  // The server evaluates the cancellation policy and reports the outcome; the UI
  // renders from that rather than re-deriving the 24-hour rule here. Bookings
  // made before the policy shipped carry no `availableActions`, so fall back to
  // the old behaviour of offering the request form.
  const availableActions = reservation?.availableActions;
  const canCancelOnline = availableActions
    ? availableActions.includes('cancel_booking')
    : isConfirmed;
  const cancellationBlockReason = reservation?.cancellation?.cancellable
    ? undefined
    : reservation?.cancellation?.reasonCode;
  const cancellationDeadline = reservation?.cancellation?.deadline;

  // Only worth explaining when the guest could otherwise have expected to cancel.
  // Deposit bookings are paid by bank transfer, so promising a PayPal refund
  // would be wrong. Pick the wording from how the guest actually paid.
  const refundNote =
    payment?.method === 'manual_deposit'
      ? strings.cancellationRefundNoteDeposit
      : strings.cancellationRefundNote;

  const blockedNotice =
    isConfirmed && !canCancelOnline
      ? cancellationBlockReason === 'cancellation_window_closed'
        ? strings.cancellationBlockedWindow
        : cancellationBlockReason === 'non_refundable_rate' ||
            cancellationBlockReason === 'rate_plan_unknown'
          ? strings.cancellationBlockedNonRefundable
          : null
      : null;

  return (
    <div id="body" className="portal-page">
      <Helmet>
        <title>{strings.documentTitle} | {strings.siteTitle}</title>
        <meta name="description" content={strings.metaDescription} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navigation isBlog={false} />

      <main className="portal-detail-container" aria-busy={isLoading}>
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8} xl={7}>
              {isLoading && (
                <div className="portal-detail-loading" aria-live="polite">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">{strings.loading}</span>
                  </Spinner>
                  <p>{strings.loading}</p>
                </div>
              )}

              {!isLoading && loadError && (
                <Alert variant="danger" role="alert">
                  {loadError}
                </Alert>
              )}

              {!isLoading && reservation && (
                <>
                  <section className="portal-detail-card" aria-labelledby="portal-detail-title">
                    <div className="portal-detail-header">
                      <div>
                        <p className="portal-detail-eyebrow">{strings.eyebrow}</p>
                        <h1 id="portal-detail-title">{strings.title}</h1>
                      </div>
                      <Button
                        type="button"
                        variant="link"
                        className="portal-detail-logout"
                        onClick={handleLogout}
                      >
                        {strings.logout}
                      </Button>
                    </div>

                    <dl className="portal-detail-summary">
                      <div className="portal-detail-summary__row">
                        <dt>{strings.reservationId}</dt>
                        <dd className="portal-detail-summary__reservation-id">
                          {reservation.reservationPublicId}
                        </dd>
                      </div>

                      {reservation.property && (
                        <div className="portal-detail-summary__row">
                          <dt>{strings.property}</dt>
                          <dd>
                            <a
                              href={reservation.property.listingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="portal-detail-summary__property-link"
                            >
                              {reservation.property.name}
                            </a>
                          </dd>
                        </div>
                      )}

                      <div className="portal-detail-summary__row">
                        <dt>{strings.dates}</dt>
                        <dd>
                          {strings.datesRange(
                            formatDate(reservation.arrivalDate, language),
                            formatDate(reservation.departureDate, language)
                          )}
                        </dd>
                      </div>

                      <div className="portal-detail-summary__row">
                        <dt>{strings.guests}</dt>
                        <dd className="portal-detail-summary__guests-cell">
                          {strings.guestsCount(reservation.guests)}
                          {isConfirmed && panel === 'closed' && (
                            <Button
                              type="button"
                              variant="link"
                              className="portal-detail-summary__edit-btn"
                              onClick={() => {
                                setGuestCount(reservation.guests);
                                setGuestEditSuccess(false);
                                setGuestEditError(null);
                                setPanel('editGuests');
                              }}
                            >
                              {strings.editGuestsButton}
                            </Button>
                          )}
                        </dd>
                      </div>

                      {reservation.hasPet && (
                        <div className="portal-detail-summary__row">
                          <dt>{strings.pet}</dt>
                          <dd>{strings.petTravelling}</dd>
                        </div>
                      )}

                      {reservation.price && (
                        <div className="portal-detail-summary__row">
                          <dt>{strings.totalPrice}</dt>
                          <dd>{formatCents(reservation.price.totalAmountCents, reservation.price.currency)}</dd>
                        </div>
                      )}

                      <div className="portal-detail-summary__row">
                        <dt>{strings.payment}</dt>
                        <dd>
                          <span
                            className={`portal-detail-status portal-detail-status--${payment?.status ?? 'unknown'}`}
                          >
                            {formatPaymentStatus(payment?.method, payment?.status, strings)}
                          </span>
                        </dd>
                      </div>

                      <div className="portal-detail-summary__row">
                        <dt>{strings.bookingStatus}</dt>
                        <dd>
                          <span
                            className={`portal-detail-status portal-detail-status--${reservation.status}`}
                          >
                            {formatBookingStatus(reservation.status, strings)}
                          </span>
                        </dd>
                      </div>
                    </dl>

                    {isCancelled && (
                      <Alert variant="secondary" className="portal-detail-cancelled-banner">
                        {strings.statusCancelledBanner}
                      </Alert>
                    )}

                    {blockedNotice && panel === 'closed' && (
                      <Alert variant="light" className="portal-detail-cancel-blocked">
                        <span>{blockedNotice}</span>
                        <a href="https://wa.me/50684632276" target="_blank" rel="noopener noreferrer">
                          {strings.cancellationBlockedContact}
                        </a>
                      </Alert>
                    )}

                    {isConfirmed && panel === 'closed' && (
                      <div className="portal-detail-actions">
                        <Button
                          type="button"
                          className="portal-detail-actions__help"
                          onClick={() => setPanel('help')}
                        >
                          {strings.requestHelpButton}
                        </Button>
                        {canCancelOnline && (
                        <Button
                          type="button"
                          variant="outline-secondary"
                          className="portal-detail-actions__cancel"
                          onClick={() => setPanel('cancellation')}
                        >
                          {strings.requestCancellationButton}
                        </Button>
                        )}
                      </div>
                    )}
                  </section>

                  {panel === 'help' && (
                    <section className="portal-request-panel" aria-labelledby="portal-help-title">
                      <h2 id="portal-help-title">{strings.helpTitle}</h2>
                      <p>{strings.helpDescription}</p>

                      {helpSuccess ? (
                        <Alert variant="success" role="alert">
                          {strings.helpSuccess}
                        </Alert>
                      ) : (
                        <Form onSubmit={handleHelpSubmit} noValidate>
                          {helpError && (
                            <Alert variant="danger" role="alert" className="portal-request-panel__alert">
                              {helpError}
                            </Alert>
                          )}

                          <Row className="g-3">
                            <Col md={6}>
                              <Form.Group controlId="portalHelpType">
                                <Form.Label>{strings.helpType}</Form.Label>
                                <Form.Select
                                  value={helpForm.type}
                                  onChange={(event) =>
                                    setHelpForm((current) => ({
                                      ...current,
                                      type: event.target.value as HelpRequestType,
                                    }))
                                  }
                                >
                                  <option value="general">{strings.helpTypeGeneral}</option>
                                  <option value="date_change">{strings.helpTypeDateChange}</option>
                                  <option value="guest_count_change">{strings.helpTypeGuestCountChange}</option>
                                  <option value="arrival_time">{strings.helpTypeArrivalTime}</option>
                                  <option value="other">{strings.helpTypeOther}</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col xs={12}>
                              <Form.Group controlId="portalHelpMessage">
                                <Form.Label>{strings.helpMessage}</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={4}
                                  value={helpForm.message}
                                  placeholder={strings.helpMessagePlaceholder}
                                  isInvalid={Boolean(helpFieldErrors.message)}
                                  onChange={(event) => {
                                    setHelpForm((current) => ({ ...current, message: event.target.value }));
                                    setHelpFieldErrors((current) => {
                                      const next = { ...current };
                                      delete next.message;
                                      return next;
                                    });
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {helpFieldErrors.message}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </Row>

                          <div className="portal-request-panel__actions">
                            <Button
                              type="submit"
                              className="portal-request-panel__submit"
                              disabled={isSubmittingHelp}
                            >
                              {isSubmittingHelp ? (
                                <>
                                  <Spinner animation="border" size="sm" /> {strings.helpSubmitting}
                                </>
                              ) : (
                                strings.helpSubmit
                              )}
                            </Button>
                            <Button
                              type="button"
                              variant="link"
                              className="portal-request-panel__back"
                              onClick={() => {
                                setPanel('closed');
                                setHelpError(null);
                                setHelpFieldErrors({});
                              }}
                            >
                              {strings.cancel}
                            </Button>
                          </div>
                        </Form>
                      )}
                    </section>
                  )}

                  {panel === 'cancellation' && (
                    <section
                      className="portal-request-panel portal-request-panel--danger"
                      aria-labelledby="portal-cancellation-title"
                    >
                      <h2 id="portal-cancellation-title">{strings.cancellationTitle}</h2>
                      <p>{strings.cancellationDescription}</p>

                      {cancellationSuccess ? (
                        <>
                          <Alert variant="success" role="alert">
                            {strings.cancellationSuccess}
                          </Alert>
                          <p className="portal-request-panel__refund-note">
                            {refundStatus === 'manual_review'
                              ? refundNote
                              : strings.cancellationNoRefundNote}
                          </p>
                          <Button
                            type="button"
                            variant="link"
                            className="portal-request-panel__back"
                            onClick={() => setPanel('closed')}
                          >
                            {strings.cancel}
                          </Button>
                        </>
                      ) : (
                        <Form onSubmit={handleCancellationSubmit} noValidate>
                          {cancellationDeadline && (
                            <p className="portal-request-panel__deadline">
                              {strings.cancellationDeadline(formatDateTime(cancellationDeadline, language))}
                            </p>
                          )}
                          <Alert variant="warning" className="portal-request-panel__warning">
                            {refundNote}
                          </Alert>
                          {cancellationError && (
                            <Alert
                              variant="danger"
                              role="alert"
                              className="portal-request-panel__alert"
                            >
                              {cancellationError}
                            </Alert>
                          )}

                          <Row className="g-3">
                            <Col xs={12}>
                              <Form.Group controlId="portalCancellationReason">
                                <Form.Label>{strings.cancellationReason}</Form.Label>
                                <Form.Control
                                  value={cancellationForm.reason}
                                  placeholder={strings.cancellationReasonPlaceholder}
                                  isInvalid={Boolean(cancellationFieldErrors.reason)}
                                  onChange={(event) => {
                                    setCancellationForm((current) => ({
                                      ...current,
                                      reason: event.target.value,
                                    }));
                                    setCancellationFieldErrors((current) => {
                                      const next = { ...current };
                                      delete next.reason;
                                      return next;
                                    });
                                  }}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {cancellationFieldErrors.reason}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            <Col xs={12}>
                              <Form.Group controlId="portalCancellationMessage">
                                <Form.Label>{strings.cancellationMessage}</Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  value={cancellationForm.message}
                                  placeholder={strings.cancellationMessagePlaceholder}
                                  onChange={(event) =>
                                    setCancellationForm((current) => ({
                                      ...current,
                                      message: event.target.value,
                                    }))
                                  }
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                          <div className="portal-request-panel__actions">
                            <Button
                              type="submit"
                              className="portal-request-panel__submit portal-request-panel__submit--danger"
                              disabled={isSubmittingCancellation}
                            >
                              {isSubmittingCancellation ? (
                                <>
                                  <Spinner animation="border" size="sm" />{' '}
                                  {strings.cancellationSubmitting}
                                </>
                              ) : (
                                strings.cancellationSubmit
                              )}
                            </Button>
                            <Button
                              type="button"
                              variant="link"
                              className="portal-request-panel__back"
                              onClick={() => {
                                setPanel('closed');
                                setCancellationError(null);
                                setCancellationFieldErrors({});
                              }}
                            >
                              {strings.cancel}
                            </Button>
                          </div>
                        </Form>
                      )}
                    </section>
                  )}

                  {panel === 'editGuests' && (
                    <section className="portal-request-panel" aria-labelledby="portal-edit-guests-title">
                      <h2 id="portal-edit-guests-title">{strings.editGuestsTitle}</h2>
                      <p>{strings.editGuestsDescription}</p>

                      {guestEditSuccess ? (
                        <Alert variant="success" role="alert">
                          {strings.editGuestsSuccess}
                        </Alert>
                      ) : (
                        <Form onSubmit={handleGuestEditSubmit} noValidate>
                          {guestEditError && (
                            <Alert variant="danger" role="alert" className="portal-request-panel__alert">
                              {guestEditError}
                            </Alert>
                          )}

                          <Row className="g-3">
                            <Col md={6}>
                              <Form.Group controlId="portalGuestCount">
                                <Form.Label>{strings.editGuestsLabel}</Form.Label>
                                <Form.Select
                                  value={guestCount}
                                  onChange={(event) => {
                                    setGuestCount(Number(event.target.value));
                                    setGuestEditError(null);
                                  }}
                                >
                                  {Array.from(
                                    { length: reservation?.property?.guestCapacity ?? 10 },
                                    (_, i) => i + 1
                                  ).map((n) => (
                                    <option key={n} value={n}>
                                      {strings.guestsCount(n)}
                                    </option>
                                  ))}
                                </Form.Select>
                                {reservation?.property?.guestCapacity && (
                                  <Form.Text>
                                    {strings.editGuestsCapacity(reservation.property.guestCapacity)}
                                  </Form.Text>
                                )}
                              </Form.Group>
                            </Col>
                          </Row>

                          <div className="portal-request-panel__actions">
                            <Button
                              type="submit"
                              className="portal-request-panel__submit"
                              disabled={isSubmittingGuestEdit || guestCount === reservation?.guests}
                            >
                              {isSubmittingGuestEdit ? (
                                <>
                                  <Spinner animation="border" size="sm" /> {strings.editGuestsSubmitting}
                                </>
                              ) : (
                                strings.editGuestsSubmit
                              )}
                            </Button>
                            <Button
                              type="button"
                              variant="link"
                              className="portal-request-panel__back"
                              onClick={() => {
                                setPanel('closed');
                                setGuestEditError(null);
                              }}
                            >
                              {strings.editGuestsCancel}
                            </Button>
                          </div>
                        </Form>
                      )}
                    </section>
                  )}

                  <section className="portal-weather-widget" aria-labelledby="portal-weather-title">
                    <h2 id="portal-weather-title">{strings.weatherTitle}</h2>
                    <p>{strings.weatherDescription}</p>
                    <WeatherWidget language={language} />
                    <a
                      className="portal-weather-widget__map-link"
                      href={getGoogleMapsUrl(reservation.property?.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📍 {strings.findUsOnMap}
                    </a>
                  </section>

                  <section className="portal-detail-contacts">
                    <h2>{strings.needHelp}</h2>
                    <div className="portal-detail-contacts__grid">
                      <a className="portal-detail-contacts__link" href="https://wa.me/50684632276" target="_blank" rel="noopener noreferrer">
                        <span>{strings.contactByWhatsapp}</span>
                        <strong>+506 8463 2276</strong>
                      </a>
                      <a className="portal-detail-contacts__link" href="mailto:reservas.kalawala@gmail.com">
                        <span>{strings.contactByEmail}</span>
                        <strong>reservas.kalawala@gmail.com</strong>
                      </a>
                    </div>
                  </section>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default PortalDetailPage;
