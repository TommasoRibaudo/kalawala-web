import React from 'react';
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FixedNavigation from '../components/FixedNavigation/FixedNavigation.component';
import FixedNavigationES from '../components/FixedNavigation/FixedNavigation.componentES';
import { useLocale } from '../i18n';
import { BookingApiError, BookingLanguage, portalLogin } from '../services/BookingApi.service';
import { persistPortalSession, readLatestPortalCredentials, readPortalCredentials, removePortalCredentials } from '../services/PortalSession.service';
import { portalStrings, PortalStrings } from './Portal.i18n';
import './Portal.style.scss';

function portalDetailPath(language: BookingLanguage, reservationPublicId: string): string {
  const base = language === 'es' ? '/portalES' : '/portal';
  return `${base}/${encodeURIComponent(reservationPublicId)}`;
}

function getLoginError(error: unknown, strings: PortalStrings): string {
  if (error instanceof BookingApiError) {
    if (error.status === 429) {
      return strings.errorTooManyAttempts;
    }
    if (error.status === 401 || error.code === 'invalid_credentials' || error.code === 'invalid_portal_credentials') {
      return strings.errorInvalidCredentials;
    }
    if (error.status === 403 || error.code === 'booking_not_confirmed') {
      return strings.errorBookingNotConfirmed;
    }
  }
  return strings.errorGeneric;
}

const PortalLoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const locale = useLocale();
  const language: BookingLanguage = locale === 'es' ? 'es' : 'en';
  const strings = portalStrings[language];
  const Navigation = language === 'es' ? FixedNavigationES : FixedNavigation;

  const [reservationPublicId, setReservationPublicId] = React.useState(
    () => searchParams.get('reservationId') ?? ''
  );
  const [password, setPassword] = React.useState('');

  // Pre-fill from cached credentials when the form loads.
  const prefillAttemptedRef = React.useRef(false);
  React.useEffect(() => {
    if (prefillAttemptedRef.current) return;
    prefillAttemptedRef.current = true;

    const paramId = searchParams.get('reservationId')?.trim() ?? '';
    // If a specific reservation ID was passed in the URL, look up its cached password.
    if (paramId) {
      const cached = readPortalCredentials(paramId);
      if (cached) {
        setReservationPublicId(cached.reservationPublicId);
        setPassword(cached.password);
      }
      return;
    }
    // Otherwise load the most recent cached credential.
    const latest = readLatestPortalCredentials();
    if (latest) {
      setReservationPublicId(latest.reservationPublicId);
      setPassword(latest.password);
    }
  }, [searchParams]);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const errors: Record<string, string> = {};
    if (!reservationPublicId.trim()) {
      errors.reservationPublicId = strings.validationReservationId;
    }
    if (!password) {
      errors.password = strings.validationPassword;
    }

    setFieldErrors(errors);
    setLoginError(null);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await portalLogin({
        reservationPublicId: reservationPublicId.trim(),
        password,
        language,
      });

      persistPortalSession(response.token, response.reservationPublicId);
      navigate(portalDetailPath(language, response.reservationPublicId), { replace: true });
    } catch (err) {
      // If the credentials are wrong, remove them from the cache so stale
      // passwords don't keep getting pre-filled.
      if (
        err instanceof BookingApiError &&
        (err.status === 401 || err.code === 'invalid_credentials' || err.code === 'invalid_portal_credentials')
      ) {
        removePortalCredentials(reservationPublicId.trim());
      }
      setLoginError(getLoginError(err, strings));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="body" className="portal-page">
      <Helmet>
        <title>{strings.documentTitle} | {strings.siteTitle}</title>
        <meta name="description" content={strings.metaDescription} />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href={`https://www.reservaskalawala.com/${language === 'es' ? 'portalES' : 'portal'}`}
        />
      </Helmet>
      <Navigation isBlog={false} />

      <main className="portal-login-container">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <section className="portal-login-card" aria-labelledby="portal-login-title">
                <p className="portal-login-eyebrow">{strings.eyebrow}</p>
                <h1 id="portal-login-title">{strings.title}</h1>
                <p className="portal-login-subtitle">{strings.subtitle}</p>

                {loginError && (
                  <Alert variant="danger" role="alert" className="portal-login-alert">
                    {loginError}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group controlId="portalReservationId" className="portal-login-field">
                    <Form.Label>{strings.reservationId}</Form.Label>
                    <Form.Control
                      type="text"
                      value={reservationPublicId}
                      isInvalid={Boolean(fieldErrors.reservationPublicId)}
                      autoComplete="username"
                      onChange={(event) => {
                        setReservationPublicId(event.target.value);
                        setFieldErrors((current) => {
                          const next = { ...current };
                          delete next.reservationPublicId;
                          return next;
                        });
                      }}
                    />
                    <Form.Text>{strings.reservationIdHelp}</Form.Text>
                    <Form.Control.Feedback type="invalid">{fieldErrors.reservationPublicId}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="portalPassword" className="portal-login-field">
                    <Form.Label>{strings.password}</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      isInvalid={Boolean(fieldErrors.password)}
                      autoComplete="current-password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setFieldErrors((current) => {
                          const next = { ...current };
                          delete next.password;
                          return next;
                        });
                      }}
                    />
                    <Form.Control.Feedback type="invalid">{fieldErrors.password}</Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="portal-login-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner animation="border" size="sm" /> {strings.submitting}
                      </>
                    ) : (
                      strings.submit
                    )}
                  </Button>
                </Form>
              </section>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default PortalLoginPage;
