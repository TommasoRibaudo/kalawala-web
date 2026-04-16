import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import posthog from 'posthog-js';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { CookieConsentService } from '../services/CookieConsent.service';
import BookingPage from './Booking.page';

jest.mock('posthog-js', () => ({
  __esModule: true,
  default: {
    capture: jest.fn(),
  },
}));

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  CookieConsentService.clearConsent();
  delete (window as any).gtag;
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

function renderBookingPage(path = '/book') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <BookingPage />
    </MemoryRouter>
  );
}

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{`${location.pathname}${location.search}`}</div>;
}

function renderBookingRoutes(path = '/book') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/book"
          element={
            <>
              <BookingPage />
              <LocationProbe />
            </>
          }
        />
        <Route
          path="/bookES"
          element={
            <>
              <BookingPage />
              <LocationProbe />
            </>
          }
        />
      </Routes>
    </MemoryRouter>
  );
}

function mockJsonResponse(body: unknown, status = 200) {
  global.fetch = jest.fn(async () =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  ) as typeof fetch;
}

function mockJsonResponses(responses: Array<{ body: unknown; status?: number }>) {
  const queue = [...responses];
  global.fetch = jest.fn(async () => {
    const next = queue.shift();
    if (!next) {
      throw new Error('Unexpected fetch call');
    }

    return new Response(JSON.stringify(next.body), {
      status: next.status ?? 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }) as typeof fetch;
}

test('submits availability search and renders available properties', async () => {
  mockJsonResponse({
    bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
    quoteId: 'qt_TEST',
    quoteExpiresAt: '2099-06-01T12:00:00Z',
    arrivalDate: '2099-06-10',
    departureDate: '2099-06-14',
    guests: 2,
    language: 'en',
    resultsCount: 1,
    properties: [
      {
        propertyId: 'b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111',
        slug: 'Geco',
        listingUrl: '/Geco',
        name: 'Casa Geco',
        guestCapacity: 5,
        thumbnailUrl: 'https://example.com/geco.jpg',
        amenities: [
          { code: 'wifi', label: '100Mbps WiFi' },
          { code: 'ac', label: 'A/C' },
        ],
        price: {
          currency: 'USD',
          totalAmountCents: 51000,
          nightlyAverageCents: 12750,
          nights: 4,
          includesTaxes: false,
          rateSource: 'smoobu',
        },
        actions: {
          viewListingUrl: '/Geco',
          canCreatePayPalHold: true,
          canUseManualDepositHandoff: true,
        },
      },
    ],
    availabilityWarnings: [],
  });

  renderBookingPage();

  fireEvent.change(screen.getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(screen.getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.change(screen.getByLabelText('Guests'), { target: { value: '2' } });
  fireEvent.click(screen.getByRole('button', { name: /search availability/i }));

  await screen.findByText('Casa Geco');

  expect(global.fetch).toHaveBeenCalledWith('/api/search', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'en',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      arrivalDate: '2099-06-10',
      departureDate: '2099-06-14',
      guests: 2,
      language: 'en',
      source: 'booking_page',
    }),
  });
  expect(screen.getByText('1 home is available')).toBeInTheDocument();
  expect(screen.getByText('$510.00')).toBeInTheDocument();
  expect(screen.getByText(/sleeps 5/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'View listing' })).toHaveAttribute('href', '/Geco');
  expect(screen.getByRole('link', { name: 'View listing' })).toHaveAttribute('target', '_blank');
  expect(screen.getByRole('link', { name: 'View listing' })).toHaveAttribute('rel', 'noopener noreferrer');
});

test('renders Spanish no-availability state for bookES route', async () => {
  mockJsonResponse({
    bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
    quoteId: 'qt_TEST',
    quoteExpiresAt: '2099-06-01T12:00:00Z',
    arrivalDate: '2099-07-10',
    departureDate: '2099-07-14',
    guests: 2,
    language: 'es',
    resultsCount: 0,
    properties: [],
    availabilityWarnings: [{ code: 'no_properties_available', messageKey: 'booking.noAvailability' }],
  });

  renderBookingPage('/bookES');

  fireEvent.change(screen.getByLabelText('Llegada'), { target: { value: '2099-07-10' } });
  fireEvent.change(screen.getByLabelText('Salida'), { target: { value: '2099-07-14' } });
  fireEvent.click(screen.getByRole('button', { name: /buscar disponibilidad/i }));

  await screen.findByText('No hay casas disponibles para estas fechas');

  const [, request] = (global.fetch as jest.Mock).mock.calls[0];
  expect(request.headers['Accept-Language']).toBe('es');
  expect(JSON.parse(request.body)).toMatchObject({ language: 'es' });
});

test('language switcher toggles booking routes and preserves search query state', () => {
  renderBookingRoutes('/book?arrivalDate=2099-10-01&departureDate=2099-10-05&guests=4');

  expect(screen.getByLabelText('Check-in')).toHaveValue('2099-10-01');
  expect(screen.getByLabelText('Check-out')).toHaveValue('2099-10-05');
  expect(screen.getByLabelText('Guests')).toHaveValue(4);

  fireEvent.click(screen.getAllByRole('button', { name: /switch language to espa/i })[0]);

  expect(screen.getByTestId('location')).toHaveTextContent(
    '/bookES?arrivalDate=2099-10-01&departureDate=2099-10-05&guests=4'
  );
  expect(screen.getByLabelText('Llegada')).toHaveValue('2099-10-01');
  expect(screen.getByLabelText('Salida')).toHaveValue('2099-10-05');
  expect(screen.getByLabelText('Huéspedes')).toHaveValue(4);
});

test('builds Spanish listing links from the property slug and opens them in a new tab', async () => {
  mockJsonResponse({
    bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
    quoteId: 'qt_TEST',
    quoteExpiresAt: '2099-06-01T12:00:00Z',
    arrivalDate: '2099-07-10',
    departureDate: '2099-07-14',
    guests: 2,
    language: 'es',
    resultsCount: 1,
    properties: [
      {
        propertyId: 'b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111',
        slug: 'Geco',
        listingUrl: '/Geco',
        name: 'Casa Geco',
        guestCapacity: 5,
        thumbnailUrl: 'https://example.com/geco.jpg',
        amenities: [{ code: 'wifi', label: '100Mbps WiFi' }],
        price: {
          currency: 'USD',
          totalAmountCents: 51000,
          nightlyAverageCents: 12750,
          nights: 4,
          includesTaxes: false,
          rateSource: 'smoobu',
        },
        actions: {
          viewListingUrl: '/Geco',
          canCreatePayPalHold: true,
          canUseManualDepositHandoff: true,
        },
      },
    ],
    availabilityWarnings: [],
  });

  renderBookingPage('/bookES');

  fireEvent.change(screen.getByLabelText('Llegada'), { target: { value: '2099-07-10' } });
  fireEvent.change(screen.getByLabelText('Salida'), { target: { value: '2099-07-14' } });
  fireEvent.click(screen.getByRole('button', { name: /buscar disponibilidad/i }));

  await screen.findByText('Casa Geco');

  const viewListingLink = screen.getByRole('link', { name: 'Ver alojamiento' });
  const imageListingLink = screen.getByRole('link', { name: 'Ver alojamiento: Casa Geco' });
  expect(viewListingLink).toHaveAttribute('href', '/GecoES');
  expect(viewListingLink).toHaveAttribute('target', '_blank');
  expect(viewListingLink).toHaveAttribute('rel', 'noopener noreferrer');
  expect(imageListingLink).toHaveAttribute('href', '/GecoES');
  expect(imageListingLink).toHaveAttribute('target', '_blank');
  expect(imageListingLink).toHaveAttribute('rel', 'noopener noreferrer');
});

test('validates past arrival date before calling the booking API', async () => {
  global.fetch = jest.fn() as typeof fetch;
  renderBookingPage();

  fireEvent.change(screen.getByLabelText('Check-in'), { target: { value: '2020-01-01' } });
  fireEvent.change(screen.getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.click(screen.getByRole('button', { name: /search availability/i }));

  await waitFor(() => {
    expect(screen.getByText('Choose today or a future check-in date.')).toBeInTheDocument();
  });
  expect(global.fetch).not.toHaveBeenCalled();
});

test('validates departure date before calling the booking API', async () => {
  global.fetch = jest.fn() as typeof fetch;
  renderBookingPage();

  fireEvent.change(screen.getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(screen.getByLabelText('Check-out'), { target: { value: '2099-06-10' } });
  fireEvent.click(screen.getByRole('button', { name: /search availability/i }));

  await waitFor(() => {
    expect(screen.getByText('Check-out must be after check-in.')).toBeInTheDocument();
  });
  expect(global.fetch).not.toHaveBeenCalled();
});

test('validates guest count before calling the booking API', async () => {
  global.fetch = jest.fn() as typeof fetch;
  renderBookingPage();

  fireEvent.change(screen.getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(screen.getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.change(screen.getByLabelText('Guests'), { target: { value: '0' } });
  fireEvent.click(screen.getByRole('button', { name: /search availability/i }));

  await waitFor(() => {
    expect(screen.getByText('Guest count must be at least 1.')).toBeInTheDocument();
  });
  expect(global.fetch).not.toHaveBeenCalled();
});

test('shows provider-unavailable message for retryable API errors', async () => {
  mockJsonResponse(
    {
      error: {
        code: 'provider_unavailable',
        message: 'Provider unavailable',
        retryable: true,
      },
    },
    503
  );

  renderBookingPage();

  fireEvent.change(screen.getByLabelText('Check-in'), { target: { value: '2099-08-10' } });
  fireEvent.change(screen.getByLabelText('Check-out'), { target: { value: '2099-08-14' } });
  fireEvent.click(screen.getByRole('button', { name: /search availability/i }));

  await screen.findByText('Availability is temporarily unavailable. Please try again in a moment.');
});

test('shows generic message for non-retryable API errors', async () => {
  mockJsonResponse(
    {
      error: {
        code: 'validation_failed',
        message: 'Validation failed',
        retryable: false,
      },
    },
    422
  );

  renderBookingPage();

  fireEvent.change(screen.getByLabelText('Check-in'), { target: { value: '2099-09-10' } });
  fireEvent.change(screen.getByLabelText('Check-out'), { target: { value: '2099-09-14' } });
  fireEvent.click(screen.getByRole('button', { name: /search availability/i }));

  await screen.findByText('We could not search availability right now. Please try again.');
});

test('renders English manual deposit handoff instructions from the booking API', async () => {
  const propertyId = 'b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111';
  mockJsonResponses([
    {
      body: {
        bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
        quoteId: 'qt_TEST',
        quoteExpiresAt: '2099-06-01T12:00:00Z',
        arrivalDate: '2099-06-10',
        departureDate: '2099-06-14',
        guests: 2,
        language: 'en',
        resultsCount: 1,
        properties: [
          {
            propertyId,
            slug: 'Geco',
            listingUrl: '/Geco',
            name: 'Casa Geco',
            guestCapacity: 5,
            thumbnailUrl: 'https://example.com/geco.jpg',
            amenities: [{ code: 'wifi', label: '100Mbps WiFi' }],
            actions: {
              viewListingUrl: '/Geco',
              canCreatePayPalHold: true,
              canUseManualDepositHandoff: true,
            },
          },
        ],
        availabilityWarnings: [],
      },
    },
    {
      body: {
        language: 'en',
        status: 'manual_deposit_handoff',
        isBookingConfirmed: false,
        doesCreateHold: false,
        messageKey: 'deposit.handoffIntro',
        instructions: {
          titleKey: 'deposit.title',
          bodyKeys: [
            'deposit.bankInstructions',
            'deposit.notConfirmed',
            'deposit.staffWillConfirm',
            'deposit.noReceiptUpload',
            'deposit.contactUs',
          ],
          contactMethods: [
            {
              type: 'whatsapp',
              label: '+506 8463 2276',
              url: 'https://wa.me/50684632276',
            },
            {
              type: 'email',
              label: 'reservas.kalawala@gmail.com',
              url: 'mailto:reservas.kalawala@gmail.com',
            },
          ],
        },
        bookingContext: {
          quoteId: 'qt_TEST',
          property: {
            propertyId,
            slug: 'Geco',
            listingUrl: '/Geco',
            name: 'Casa Geco',
          },
          arrivalDate: '2099-06-10',
          departureDate: '2099-06-14',
          guests: 2,
        },
      },
    },
  ]);

  renderBookingPage();

  fireEvent.change(screen.getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(screen.getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.click(screen.getByRole('button', { name: /search availability/i }));
  await screen.findByText('Casa Geco');

  fireEvent.click(screen.getByRole('button', { name: /manual deposit/i }));

  await screen.findByRole('heading', { name: 'Manual deposit instructions' });
  expect(global.fetch).toHaveBeenLastCalledWith(`/api/deposit-handoff?language=en&quoteId=qt_TEST&propertyId=${propertyId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'en',
    },
  });
  expect(screen.getByText('This is not a confirmed booking')).toBeInTheDocument();
  expect(screen.getByText('Your booking is not confirmed by the custom booking engine.')).toBeInTheDocument();
  expect(
    screen.getByText('For bank transfer or SINPE, contact Kalawala staff for the current payment instructions before sending money.')
  ).toBeInTheDocument();
  expect(
    screen.getByText('Do not upload receipt files here. Send any proof of payment through the staff channel you choose below.')
  ).toBeInTheDocument();
  expect(screen.getAllByText('Casa Geco').length).toBeGreaterThan(0);
  expect(screen.getByText('Jun 10, 2099 to Jun 14, 2099')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /contact by whatsapp/i })).toHaveAttribute('href', 'https://wa.me/50684632276');
  expect(screen.getByRole('link', { name: /contact by email/i })).toHaveAttribute('href', 'mailto:reservas.kalawala@gmail.com');
  expect(screen.queryByText('Booking confirmed')).not.toBeInTheDocument();
});

test('renders Spanish manual deposit handoff instructions', async () => {
  const propertyId = 'b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111';
  mockJsonResponses([
    {
      body: {
        bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
        quoteId: 'qt_TEST',
        quoteExpiresAt: '2099-06-01T12:00:00Z',
        arrivalDate: '2099-06-10',
        departureDate: '2099-06-14',
        guests: 2,
        language: 'es',
        resultsCount: 1,
        properties: [
          {
            propertyId,
            slug: 'Geco',
            listingUrl: '/Geco',
            name: 'Casa Geco',
            guestCapacity: 5,
            thumbnailUrl: 'https://example.com/geco.jpg',
            amenities: [{ code: 'wifi', label: 'WiFi' }],
            actions: {
              viewListingUrl: '/GecoES',
              canCreatePayPalHold: true,
              canUseManualDepositHandoff: true,
            },
          },
        ],
        availabilityWarnings: [],
      },
    },
    {
      body: {
        language: 'es',
        status: 'manual_deposit_handoff',
        isBookingConfirmed: false,
        doesCreateHold: false,
        messageKey: 'deposit.handoffIntro',
        instructions: {
          titleKey: 'deposit.title',
          bodyKeys: [
            'deposit.bankInstructions',
            'deposit.notConfirmed',
            'deposit.staffWillConfirm',
            'deposit.noReceiptUpload',
            'deposit.contactUs',
          ],
          contactMethods: [
            {
              type: 'whatsapp',
              label: '+506 8463 2276',
              url: 'https://wa.me/50684632276',
            },
          ],
        },
      },
    },
  ]);

  renderBookingPage('/bookES');

  fireEvent.change(screen.getByLabelText('Llegada'), { target: { value: '2099-06-10' } });
  fireEvent.change(screen.getByLabelText('Salida'), { target: { value: '2099-06-14' } });
  fireEvent.click(screen.getByRole('button', { name: /buscar disponibilidad/i }));
  await screen.findByText('Casa Geco');

  fireEvent.click(screen.getByRole('button', { name: /manual/i }));

  await screen.findByText('Esto no es una reserva confirmada');
  expect(global.fetch).toHaveBeenLastCalledWith(`/api/deposit-handoff?language=es&quoteId=qt_TEST&propertyId=${propertyId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'es',
    },
  });
  expect(screen.getByText('Tu reserva no queda confirmada por el motor de reservas personalizado.')).toBeInTheDocument();
  expect(
    screen.getByText(
      'Para transferencia bancaria o SINPE, contacta al equipo de Kalawala para recibir las instrucciones de pago actualizadas antes de enviar dinero.'
    )
  ).toBeInTheDocument();
  expect(screen.getByText('No subas comprobantes aqu\u00ed. Env\u00eda cualquier comprobante de pago por el canal de contacto que elijas abajo.')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /contactar por whatsapp/i })).toHaveAttribute('href', 'https://wa.me/50684632276');
});

test('records manual deposit contact clicks with consent-aware analytics', async () => {
  CookieConsentService.acceptAll();
  (window as any).gtag = jest.fn();
  const propertyId = 'b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111';
  mockJsonResponses([
    {
      body: {
        bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
        quoteId: 'qt_TEST',
        quoteExpiresAt: '2099-06-01T12:00:00Z',
        arrivalDate: '2099-06-10',
        departureDate: '2099-06-14',
        guests: 2,
        language: 'en',
        resultsCount: 1,
        properties: [
          {
            propertyId,
            slug: 'Geco',
            listingUrl: '/Geco',
            name: 'Casa Geco',
            guestCapacity: 5,
            thumbnailUrl: 'https://example.com/geco.jpg',
            amenities: [{ code: 'wifi', label: '100Mbps WiFi' }],
            actions: {
              viewListingUrl: '/Geco',
              canCreatePayPalHold: true,
              canUseManualDepositHandoff: true,
            },
          },
        ],
        availabilityWarnings: [],
      },
    },
    {
      body: {
        language: 'en',
        status: 'manual_deposit_handoff',
        isBookingConfirmed: false,
        doesCreateHold: false,
        messageKey: 'deposit.handoffIntro',
        instructions: {
          titleKey: 'deposit.title',
          bodyKeys: ['deposit.bankInstructions', 'deposit.notConfirmed', 'deposit.contactUs'],
          contactMethods: [
            {
              type: 'whatsapp',
              label: '+506 8463 2276',
              url: 'https://wa.me/50684632276',
            },
          ],
        },
        bookingContext: {
          quoteId: 'qt_TEST',
          property: {
            propertyId,
            slug: 'Geco',
            listingUrl: '/Geco',
            name: 'Casa Geco',
          },
          arrivalDate: '2099-06-10',
          departureDate: '2099-06-14',
          guests: 2,
        },
      },
    },
    {
      body: {
        recorded: true,
        status: 'manual_deposit_handoff',
        isBookingConfirmed: false,
        doesCreateHold: false,
        messageKey: 'deposit.contactEventRecorded',
      },
    },
  ]);

  renderBookingPage();

  fireEvent.change(screen.getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(screen.getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.click(screen.getByRole('button', { name: /search availability/i }));
  await screen.findByText('Casa Geco');

  fireEvent.click(screen.getByRole('button', { name: /manual deposit/i }));
  await screen.findByRole('heading', { name: 'Manual deposit instructions' });

  fireEvent.click(screen.getByRole('link', { name: /contact by whatsapp/i }));

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(3));
  const eventCall = (global.fetch as jest.Mock).mock.calls[2];
  const eventOptions = eventCall[1] as RequestInit & { headers: Record<string, string>; body: string };

  expect(eventCall[0]).toBe('/api/deposit-handoff/events');
  expect(eventOptions.method).toBe('POST');
  expect(eventOptions.keepalive).toBe(true);
  expect(eventOptions.headers).toMatchObject({
    Accept: 'application/json',
    'Accept-Language': 'en',
    'Content-Type': 'application/json',
  });
  expect(eventOptions.headers['Idempotency-Key']).toMatch(/^deposit-/);
  expect(JSON.parse(eventOptions.body)).toEqual({
    quoteId: 'qt_TEST',
    propertyId,
    language: 'en',
    contactMethod: 'whatsapp',
    analyticsConsent: true,
  });
  expect(posthog.capture).toHaveBeenCalledWith(
    'manual_deposit_handoff_clicked',
    expect.objectContaining({
      analytics_consent: true,
      contact_method: 'whatsapp',
      language: 'en',
      quote_id: 'qt_TEST',
      property_id: propertyId,
      property_slug: 'Geco',
    })
  );
  expect(window.gtag).toHaveBeenCalledWith(
    'event',
    'manual_deposit_handoff_clicked',
    expect.objectContaining({
      event_category: 'booking',
      contact_method: 'whatsapp',
      analytics_consent: true,
    })
  );
});

test('suppresses analytics but still posts event when consent is not given', async () => {
  const propertyId = 'b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111';
  mockJsonResponses([
    {
      body: {
        bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
        quoteId: 'qt_TEST',
        quoteExpiresAt: '2099-06-01T12:00:00Z',
        arrivalDate: '2099-06-10',
        departureDate: '2099-06-14',
        guests: 2,
        language: 'en',
        resultsCount: 1,
        properties: [
          {
            propertyId,
            slug: 'Geco',
            listingUrl: '/Geco',
            name: 'Casa Geco',
            guestCapacity: 5,
            thumbnailUrl: 'https://example.com/geco.jpg',
            amenities: [{ code: 'wifi', label: '100Mbps WiFi' }],
            actions: {
              viewListingUrl: '/Geco',
              canCreatePayPalHold: true,
              canUseManualDepositHandoff: true,
            },
          },
        ],
        availabilityWarnings: [],
      },
    },
    {
      body: {
        language: 'en',
        status: 'manual_deposit_handoff',
        isBookingConfirmed: false,
        doesCreateHold: false,
        messageKey: 'deposit.handoffIntro',
        instructions: {
          titleKey: 'deposit.title',
          bodyKeys: ['deposit.bankInstructions', 'deposit.notConfirmed', 'deposit.contactUs'],
          contactMethods: [
            {
              type: 'whatsapp',
              label: '+506 8463 2276',
              url: 'https://wa.me/50684632276',
            },
          ],
        },
        bookingContext: {
          quoteId: 'qt_TEST',
          property: {
            propertyId,
            slug: 'Geco',
            listingUrl: '/Geco',
            name: 'Casa Geco',
          },
          arrivalDate: '2099-06-10',
          departureDate: '2099-06-14',
          guests: 2,
        },
      },
    },
    {
      body: {
        recorded: true,
        status: 'manual_deposit_handoff',
        isBookingConfirmed: false,
        doesCreateHold: false,
        messageKey: 'deposit.contactEventRecorded',
      },
    },
  ]);

  renderBookingPage();

  fireEvent.change(screen.getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(screen.getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.click(screen.getByRole('button', { name: /search availability/i }));
  await screen.findByText('Casa Geco');

  fireEvent.click(screen.getByRole('button', { name: /manual deposit/i }));
  await screen.findByRole('heading', { name: 'Manual deposit instructions' });

  fireEvent.click(screen.getByRole('link', { name: /contact by whatsapp/i }));

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(3));
  const eventCall = (global.fetch as jest.Mock).mock.calls[2];
  const eventOptions = eventCall[1] as RequestInit & { body: string };

  expect(JSON.parse(eventOptions.body)).toEqual(
    expect.objectContaining({ analyticsConsent: false })
  );
  expect(posthog.capture).not.toHaveBeenCalled();
  expect(window.gtag).toBeUndefined();
});
