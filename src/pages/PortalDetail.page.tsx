import React from 'react';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import FixedNavigation from '../components/FixedNavigation/FixedNavigation.component';
import FixedNavigationES from '../components/FixedNavigation/FixedNavigation.componentES';
import { useLanguageDetection } from '../hooks/useLanguageDetection';
import {
  BookingApiError,
  BookingLanguage,
  PortalReservationResponse,
  getPortalReservation,
  submitPortalCancellationRequest,
  submitPortalHelpRequest,
} from '../services/BookingApi.service';
import { clearPortalSession, readPortalToken } from '../services/PortalSession.service';
import { portalDetailStrings, PortalDetailStrings } from './PortalDetail.i18n';
import './PortalDetail.style.scss';

function portalLoginPath(language: BookingLanguage): string {
  return language === 'es' ? '/portalES' : '/portal';
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

type PanelState = 'closed' | 'help' | 'cancellation';

type HelpRequestType = 'general' | 'date_change' | 'guest_count_change' | 'arrival_time' | 'other';

interface HelpFormState {
  type: HelpRequestType;
  message: string;
}

interface CancellationFormState {
  reason: string;
  message: string;
}

const PortalDetailPage = () => {
  const { reservationPublicId } = useParams<{ reservationPublicId: string }>();
  const navigate = useNavigate();
  const isSpanishPage = useLanguageDetection();
  const language: BookingLanguage = isSpanishPage ? 'es' : 'en';
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
      await submitPortalCancellationRequest(
        reservationPublicId,
        token,
        {
          reason: cancellationForm.reason.trim(),
          message: cancellationForm.message.trim() || undefined,
        },
        language
      );
      setCancellationSuccess(true);
    } catch (err) {
      setCancellationError(getRequestError(err, strings));
    } finally {
      setIsSubmittingCancellation(false);
    }
  };

  const reservation = data?.reservation;
  const payment = data?.payment;
  const isConfirmed =
    reservation?.status === 'confirmed' || reservation?.status === 'booking_confirmed';

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
                        <dd>{strings.guestsCount(reservation.guests)}</dd>
                      </div>

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

                    {isConfirmed && panel === 'closed' && (
                      <div className="portal-detail-actions">
                        <Button
                          type="button"
                          className="portal-detail-actions__help"
                          onClick={() => setPanel('help')}
                        >
                          {strings.requestHelpButton}
                        </Button>
                        <Button
                          type="button"
                          variant="outline-secondary"
                          className="portal-detail-actions__cancel"
                          onClick={() => setPanel('cancellation')}
                        >
                          {strings.requestCancellationButton}
                        </Button>
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
                    <section className="portal-request-panel" aria-labelledby="portal-cancellation-title">
                      <h2 id="portal-cancellation-title">{strings.cancellationTitle}</h2>
                      <p>{strings.cancellationDescription}</p>

                      {cancellationSuccess ? (
                        <Alert variant="success" role="alert">
                          {strings.cancellationSuccess}
                        </Alert>
                      ) : (
                        <Form onSubmit={handleCancellationSubmit} noValidate>
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
