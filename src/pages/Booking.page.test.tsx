import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
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
const originalLocation = window.location;

afterEach(() => {
  global.fetch = originalFetch;
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: originalLocation,
  });
  window.sessionStorage.clear();
  window.localStorage.clear();
  CookieConsentService.clearConsent();
  delete (window as any).gtag;
  delete (window as any).fbq;
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

function renderBookingPage(path = '/book') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <BookingPage />
      <LocationProbe />
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

function activeSlide() {
  const el = document.querySelector('.booking-wizard-slide--active');
  if (!el) throw new Error('No active booking wizard slide found');
  return within(el as HTMLElement);
}

function mockLocationAssign(): jest.Mock {
  const assign = jest.fn();
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: {
      ...originalLocation,
      assign,
    },
  });
  return assign;
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

  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.change(activeSlide().getByLabelText('Guests'), { target: { value: '2' } });
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

  fireEvent.change(activeSlide().getByLabelText('Llegada'), { target: { value: '2099-07-10' } });
  fireEvent.change(activeSlide().getByLabelText('Salida'), { target: { value: '2099-07-14' } });
  fireEvent.click(screen.getByRole('button', { name: /buscar disponibilidad/i }));

  await screen.findByText('No hay casas disponibles para estas fechas');

  const [, request] = (global.fetch as jest.Mock).mock.calls[0];
  expect(request.headers['Accept-Language']).toBe('es');
  expect(JSON.parse(request.body)).toMatchObject({ language: 'es' });
});

test('language switcher toggles booking routes and preserves search query state', () => {
  renderBookingRoutes('/book?arrivalDate=2099-10-01&departureDate=2099-10-05&guests=4');

  expect(activeSlide().getByLabelText('Check-in')).toHaveValue('2099-10-01');
  expect(activeSlide().getByLabelText('Check-out')).toHaveValue('2099-10-05');
  expect(activeSlide().getByLabelText('Guests')).toHaveValue(4);

  fireEvent.click(screen.getAllByRole('button', { name: /switch language to espa/i })[0]);

  expect(screen.getByTestId('location')).toHaveTextContent(
    '/bookES?arrivalDate=2099-10-01&departureDate=2099-10-05&guests=4'
  );
  expect(activeSlide().getByLabelText('Llegada')).toHaveValue('2099-10-01');
  expect(activeSlide().getByLabelText('Salida')).toHaveValue('2099-10-05');
  expect(activeSlide().getByLabelText('Huéspedes')).toHaveValue(4);
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

  fireEvent.change(activeSlide().getByLabelText('Llegada'), { target: { value: '2099-07-10' } });
  fireEvent.change(activeSlide().getByLabelText('Salida'), { target: { value: '2099-07-14' } });
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

test('creates a PayPal hold from the property result card and shows the live hold timer', async () => {
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
      },
    },
    {
      body: {
        booking: {
          bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
          reservationPublicId: 'res_PUBLIC123',
          status: 'hold_active',
          language: 'en',
          arrivalDate: '2099-06-10',
          departureDate: '2099-06-14',
          guests: 2,
          property: {
            propertyId,
            slug: 'Geco',
            listingUrl: '/Geco',
            name: 'Casa Geco',
            guestCapacity: 5,
            thumbnailUrl: 'https://example.com/geco.jpg',
            amenities: [{ code: 'wifi', label: '100Mbps WiFi' }],
          },
          price: {
            currency: 'USD',
            totalAmountCents: 51000,
            nightlyAverageCents: 12750,
            nights: 4,
            includesTaxes: false,
            rateSource: 'smoobu',
          },
          hold: {
            status: 'active',
            expiresAt: '2099-06-01T12:15:00Z',
          },
          payment: {
            method: 'paypal',
            status: 'pending',
          },
        },
        nextAction: 'create_paypal_order',
      },
    },
    {
      body: {
        booking: {
          bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
          reservationPublicId: 'res_PUBLIC123',
          status: 'paypal_order_created',
          language: 'en',
          arrivalDate: '2099-06-10',
          departureDate: '2099-06-14',
          guests: 2,
          property: {
            propertyId,
            slug: 'Geco',
            listingUrl: '/Geco',
            name: 'Casa Geco',
          },
          price: {
            currency: 'USD',
            totalAmountCents: 51000,
          },
          hold: {
            expiresAt: '2099-06-01T12:15:00Z',
          },
        },
        paypal: {
          orderId: 'PAY-ORDER-123',
          approvalUrl: 'https://www.sandbox.paypal.com/checkoutnow?token=PAY-ORDER-123',
        },
        nextAction: 'approve_paypal_order',
      },
    },
  ]);
  const assign = mockLocationAssign();

  renderBookingPage();

  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.click(screen.getByRole('button', { name: /search availability/i }));
  await screen.findByText('Casa Geco');

  fireEvent.click(screen.getByRole('button', { name: /book with paypal/i }));
  await screen.findByRole('heading', { name: 'Checkout' });

  fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'Ana' } });
  fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Guest' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ana@example.com' } });
  fireEvent.change(screen.getByLabelText('Phone'), { target: { value: '+50688888888' } });
  fireEvent.change(screen.getByLabelText('Country'), { target: { value: 'Costa Rica' } });
  fireEvent.change(screen.getByLabelText('Create a password to manage your booking'), { target: { value: 'long-secure-password' } });
  fireEvent.change(screen.getByLabelText('Message for Kalawala'), { target: { value: 'Late arrival' } });
  fireEvent.click(screen.getByLabelText('I accept the booking terms.'));
  fireEvent.click(screen.getByRole('button', { name: /continue to payment/i }));

  await screen.findByText('Your stay is on hold');
  expect(screen.getByText('Your reservation expires in')).toBeInTheDocument();
  expect(screen.getByText(/Hold expires at/)).toBeInTheDocument();
  expect(screen.getByText('res_PUBLIC123')).toBeInTheDocument();

  const holdCall = (global.fetch as jest.Mock).mock.calls[1];
  const holdOptions = holdCall[1] as RequestInit & { headers: Record<string, string>; body: string };
  expect(holdCall[0]).toBe('/api/holds');
  expect(holdOptions.method).toBe('POST');
  expect(holdOptions.headers).toMatchObject({
    Accept: 'application/json',
    'Accept-Language': 'en',
    'Content-Type': 'application/json',
  });
  expect(holdOptions.headers['Idempotency-Key']).toMatch(/^hold-/);
  expect(JSON.parse(holdOptions.body)).toEqual({
    quoteId: 'qt_TEST',
    bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
    propertyId,
    paymentMethod: 'paypal',
    guest: {
      firstName: 'Ana',
      lastName: 'Guest',
      email: 'ana@example.com',
      phone: '+50688888888',
      country: 'Costa Rica',
      message: 'Late arrival',
    },
    portalPassword: 'long-secure-password',
    termsAccepted: true,
    marketingConsent: false,
  });

  fireEvent.click(screen.getByRole('button', { name: /continue to payment/i }));

  await waitFor(() => {
    expect(assign).toHaveBeenCalledWith('https://www.sandbox.paypal.com/checkoutnow?token=PAY-ORDER-123');
  });
  const orderCall = (global.fetch as jest.Mock).mock.calls[2];
  const orderOptions = orderCall[1] as RequestInit & { headers: Record<string, string> };
  expect(orderCall[0]).toBe('/api/bookings/3d0f8ac0-5c30-4b09-bb49-12fd1df120f1/paypal/create-order');
  expect(orderOptions.method).toBe('POST');
  expect(orderOptions.headers).toMatchObject({
    Accept: 'application/json',
    'Accept-Language': 'en',
  });
  expect(orderOptions.headers['Idempotency-Key']).toMatch(/^paypal-order-/);
});

test('shows a clear message when PayPal hold creation loses the availability race', async () => {
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
      },
    },
    {
      status: 409,
      body: {
        error: {
          code: 'property_no_longer_available',
          message: 'No longer available',
          retryable: false,
        },
      },
    },
  ]);

  renderBookingPage();

  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.click(screen.getByRole('button', { name: /search availability/i }));
  await screen.findByText('Casa Geco');

  fireEvent.click(screen.getByRole('button', { name: /book with paypal/i }));
  fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'Ana' } });
  fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Guest' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ana@example.com' } });
  fireEvent.change(screen.getByLabelText('Create a password to manage your booking'), { target: { value: 'long-secure-password' } });
  fireEvent.click(screen.getByLabelText('I accept the booking terms.'));
  fireEvent.click(screen.getByRole('button', { name: /continue to payment/i }));

  await screen.findByText('This home is no longer available for those dates.');
  expect(screen.queryByText('Your stay is on hold')).not.toBeInTheDocument();
});

test('captures PayPal payment on the return route using token and stored booking session', async () => {
  CookieConsentService.acceptAll();
  (window as any).gtag = jest.fn();
  (window as any).fbq = jest.fn();
  window.sessionStorage.setItem(
    'kalawala_paypal_checkout',
    JSON.stringify({
      bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
      paypalOrderId: 'PAY-ORDER-123',
      reservationPublicId: 'res_PUBLIC123',
      language: 'en',
    })
  );
  mockJsonResponse({
    booking: {
      bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
      reservationPublicId: 'res_PUBLIC123',
      status: 'booking_confirmed',
      language: 'en',
      arrivalDate: '2099-06-10',
      departureDate: '2099-06-14',
      guests: 2,
      confirmedAt: '2099-06-01T12:20:00Z',
      property: {
        propertyId: 'b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111',
        slug: 'Geco',
        listingUrl: '/Geco',
        name: 'Casa Geco',
      },
      price: {
        currency: 'USD',
        totalAmountCents: 51000,
      },
    },
    payment: {
      method: 'paypal',
      status: 'captured',
      paypalOrderId: 'PAY-ORDER-123',
      paypalCaptureId: 'PAY-CAP-456',
      capturedAt: '2099-06-01T12:20:00Z',
    },
  });

  renderBookingPage('/book/return?token=PAY-ORDER-123&PayerID=PAYER-456');

  expect(screen.getByText('Processing your PayPal payment')).toBeInTheDocument();
  await screen.findByText('Your stay is booked.');

  expect(global.fetch).toHaveBeenCalledWith(
    '/api/bookings/3d0f8ac0-5c30-4b09-bb49-12fd1df120f1/paypal/capture',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
        'Idempotency-Key': expect.stringMatching(/^paypal-capture-/),
      },
      body: JSON.stringify({
        paypalOrderId: 'PAY-ORDER-123',
        payerId: 'PAYER-456',
      }),
    }
  );
  expect(screen.getByText('res_PUBLIC123')).toBeInTheDocument();
  expect(screen.getByText('Casa Geco')).toBeInTheDocument();
  expect(screen.getByText('Jun 10, 2099 to Jun 14, 2099')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Manage booking' }));
  expect(screen.getByTestId('location')).toHaveTextContent('/portal?reservationId=res_PUBLIC123');
  expect(window.sessionStorage.getItem('kalawala_paypal_checkout')).toBeNull();
  expect(window.sessionStorage.getItem('kalawala_booking_confirmation')).toContain('res_PUBLIC123');
  await waitFor(() =>
    expect(posthog.capture).toHaveBeenCalledWith(
      'booking_confirmed',
      expect.objectContaining({
        reservation_id: 'res_PUBLIC123',
        property_id: 'b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111',
        property_slug: 'Geco',
        value: 510,
        currency: 'USD',
        payment_method: 'paypal',
        language: 'en',
      })
    )
  );
  expect(window.gtag).toHaveBeenCalledWith(
    'event',
    'purchase',
    expect.objectContaining({
      transaction_id: 'res_PUBLIC123',
      value: 510,
      currency: 'USD',
    })
  );
  expect(window.fbq).toHaveBeenCalledWith(
    'track',
    'Purchase',
    expect.objectContaining({
      value: 510,
      currency: 'USD',
      content_ids: ['b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111'],
    })
  );
});

test('renders the confirmed route from stored confirmation data without firing purchase twice', async () => {
  CookieConsentService.acceptAll();
  window.sessionStorage.setItem(
    'kalawala_booking_confirmation',
    JSON.stringify({
      booking: {
        bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
        reservationPublicId: 'res_PUBLIC123',
        status: 'booking_confirmed',
        language: 'en',
        arrivalDate: '2099-06-10',
        departureDate: '2099-06-14',
        guests: 2,
        property: {
          propertyId: 'b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111',
          slug: 'Geco',
          listingUrl: '/Geco',
          name: 'Casa Geco',
        },
        price: {
          currency: 'USD',
          totalAmountCents: 51000,
        },
      },
      payment: {
        method: 'paypal',
        status: 'captured',
        paypalOrderId: 'PAY-ORDER-123',
      },
    })
  );
  window.sessionStorage.setItem('kalawala_booking_confirmation_tracked_res_PUBLIC123', '1');

  renderBookingPage('/book/confirmed');

  await screen.findByRole('heading', { name: 'Booking confirmed' });
  expect(screen.getByText('res_PUBLIC123')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Manage booking' }));
  expect(screen.getByTestId('location')).toHaveTextContent('/portal?reservationId=res_PUBLIC123');
  expect(posthog.capture).not.toHaveBeenCalledWith('booking_confirmed', expect.anything());
});

test('renders Spanish confirmation copy and portal link', async () => {
  window.sessionStorage.setItem(
    'kalawala_booking_confirmation',
    JSON.stringify({
      booking: {
        bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
        reservationPublicId: 'res_PUBLIC123',
        status: 'booking_confirmed',
        language: 'es',
        arrivalDate: '2099-06-10',
        departureDate: '2099-06-14',
        guests: 2,
        property: {
          propertyId: 'b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111',
          slug: 'Geco',
          listingUrl: '/GecoES',
          name: 'Casa Geco',
        },
        price: {
          currency: 'USD',
          totalAmountCents: 51000,
        },
      },
      payment: {
        method: 'paypal',
        status: 'captured',
        paypalOrderId: 'PAY-ORDER-123',
      },
    })
  );

  renderBookingPage('/bookES/confirmed');

  await screen.findByRole('heading', { name: 'Reserva confirmada' });
  expect(screen.getByText('Tu estad\u00eda est\u00e1 reservada.')).toBeInTheDocument();
  expect(screen.getByText('Pago confirmado')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Gestionar reserva' }));
  expect(screen.getByTestId('location')).toHaveTextContent('/portalES?reservationId=res_PUBLIC123');
});

test('shows a return error without calling capture when PayPal return context is missing', async () => {
  global.fetch = jest.fn() as typeof fetch;

  renderBookingPage('/book/return?token=PAY-ORDER-123&PayerID=PAYER-456');

  await screen.findByText('We could not find the PayPal return details for this booking.');
  expect(global.fetch).not.toHaveBeenCalled();
});

test('shows capture error and keeps the return page when the capture API fails', async () => {
  window.sessionStorage.setItem(
    'kalawala_paypal_checkout',
    JSON.stringify({
      bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
      paypalOrderId: 'PAY-ORDER-123',
      language: 'en',
    })
  );
  mockJsonResponse(
    {
      error: {
        code: 'internal_error',
        message: 'Capture failed',
        retryable: false,
      },
    },
    500
  );

  renderBookingPage('/book/return?token=PAY-ORDER-123&PayerID=PAYER-456');

  expect(screen.getByText('Processing your PayPal payment')).toBeInTheDocument();
  await screen.findByText('We could not verify the PayPal payment right now. Please contact Kalawala.');
  expect(screen.queryByText('Your stay is booked.')).not.toBeInTheDocument();
});

test('validates past arrival date before calling the booking API', async () => {
  global.fetch = jest.fn() as typeof fetch;
  renderBookingPage();

  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2020-01-01' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.click(screen.getByRole('button', { name: /search availability/i }));

  await waitFor(() => {
    expect(screen.getByText('Choose today or a future check-in date.')).toBeInTheDocument();
  });
  expect(global.fetch).not.toHaveBeenCalled();
});

test('validates departure date before calling the booking API', async () => {
  global.fetch = jest.fn() as typeof fetch;
  renderBookingPage();

  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-06-10' } });
  fireEvent.click(screen.getByRole('button', { name: /search availability/i }));

  await waitFor(() => {
    expect(screen.getByText('Check-out must be after check-in.')).toBeInTheDocument();
  });
  expect(global.fetch).not.toHaveBeenCalled();
});

test('validates guest count before calling the booking API', async () => {
  global.fetch = jest.fn() as typeof fetch;
  renderBookingPage();

  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.change(activeSlide().getByLabelText('Guests'), { target: { value: '0' } });
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

  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2099-08-10' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-08-14' } });
  fireEvent.click(screen.getByRole('button', { name: /search availability/i }));

  await activeSlide().findByText('Availability is temporarily unavailable. Please try again in a moment.');
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

  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2099-09-10' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-09-14' } });
  fireEvent.click(screen.getByRole('button', { name: /search availability/i }));

  await activeSlide().findByText('We could not search availability right now. Please try again.');
});

// ── deposit checkout ─────────────────────────────────────────────────────────
//
// Replaces the old contact-only handoff tests. The deposit path now collects the
// same guest details as PayPal and creates a real hold that blocks the dates.

const SEARCH_RESULT_FIXTURE = {
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
      amenities: [{ code: 'wifi', label: '100Mbps WiFi' }],
      price: {
        currency: 'USD',
        totalAmountCents: 51000,
        nightlyAverageCents: 12750,
        nights: 4,
        includesTaxes: false,
        rateSource: 'smoobu',
      },
      actions: { viewListingUrl: '/Geco', canCreatePayPalHold: true, canUseManualDepositHandoff: true },
    },
  ],
  availabilityWarnings: [],
};

const DEPOSIT_HOLD_FIXTURE = {
  booking: {
    bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
    reservationPublicId: 'KWL-DEP12345',
    status: 'hold_active',
    language: 'en',
    arrivalDate: '2099-06-10',
    departureDate: '2099-06-14',
    guests: 2,
    property: {
      propertyId: 'b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111',
      slug: 'Geco',
      listingUrl: '/Geco',
      name: 'Casa Geco',
      guestCapacity: 5,
      thumbnailUrl: 'https://example.com/geco.jpg',
      amenities: [],
    },
    price: { currency: 'USD', totalAmountCents: 51000, nightlyAverageCents: 12750, nights: 4, includesTaxes: false, rateSource: 'smoobu' },
    hold: { status: 'active', expiresAt: '2099-06-02T12:00:00Z' },
    payment: { method: 'manual_deposit', status: 'pending' },
  },
  bankInfo: {
    sinpePhone: '8772 7355',
    sinpeName: 'Luciano Ribaudo',
    bankAccount: { accountHolder: 'Xelion srl', colonesIban: 'CR61010200009629385364', dolaresIban: 'CR71010200009629385281' },
  },
  depositAccessToken: 'deposit-access-token-value',
  depositAccessTokenExpiresInSeconds: 86400,
  nextAction: 'upload_deposit_receipt',
};

async function reachDepositCheckout() {
  renderBookingPage();

  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.click(screen.getByRole('button', { name: /search availability/i }));
  await screen.findByText('Casa Geco');

  fireEvent.click(screen.getByRole('button', { name: 'Bank transfer / SINPE' }));
  await screen.findByRole('heading', { name: 'Checkout' });
}

function fillGuestDetails() {
  fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'Ana' } });
  fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Guest' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ana@example.com' } });
  fireEvent.change(screen.getByLabelText('Create a password to manage your booking'), { target: { value: 'long-secure-password' } });
  fireEvent.click(screen.getByLabelText('I accept the booking terms.'));
}

test('deposit checkout collects guest details and creates a real hold', async () => {
  mockJsonResponses([{ body: SEARCH_RESULT_FIXTURE }, { body: DEPOSIT_HOLD_FIXTURE }]);

  await reachDepositCheckout();
  fillGuestDetails();
  fireEvent.click(screen.getByRole('button', { name: 'Reserve these dates' }));

  // Bank details only appear once the dates are actually held.
  await screen.findByText('CR61010200009629385364');
  expect(screen.getByText('KWL-DEP12345')).toBeInTheDocument();

  const holdCall = (global.fetch as jest.Mock).mock.calls[1];
  expect(holdCall[0]).toBe('/api/deposit-holds');
  const holdBody = JSON.parse((holdCall[1] as RequestInit & { body: string }).body);
  expect(holdBody).toEqual(
    expect.objectContaining({
      quoteId: 'qt_TEST',
      propertyId: 'b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111',
      portalPassword: 'long-secure-password',
      termsAccepted: true,
    })
  );
  // The deposit path never sends a rate option — it is always flexible.
  expect(holdBody).not.toHaveProperty('nonRefundable');
});

test('deposit checkout validates the portal password before calling the API', async () => {
  mockJsonResponses([{ body: SEARCH_RESULT_FIXTURE }]);

  await reachDepositCheckout();
  fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'Ana' } });
  fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Guest' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'ana@example.com' } });
  fireEvent.change(screen.getByLabelText('Create a password to manage your booking'), { target: { value: 'short' } });
  fireEvent.click(screen.getByLabelText('I accept the booking terms.'));
  fireEvent.click(screen.getByRole('button', { name: 'Reserve these dates' }));

  await screen.findByText('Use at least 12 characters.');
  // Only the search call — the hold was never attempted.
  expect((global.fetch as jest.Mock).mock.calls).toHaveLength(1);
});

test('deposit receipt upload goes to S3 and then confirms with the API', async () => {
  mockJsonResponses([
    { body: SEARCH_RESULT_FIXTURE },
    { body: DEPOSIT_HOLD_FIXTURE },
    { body: { uploadUrl: 'https://s3.example.test/put', s3Key: 'deposit-receipts/abc/1-receipt.jpg' } },
    { body: {} },
    { body: { confirmed: true, s3Key: 'deposit-receipts/abc/1-receipt.jpg', receiptUrl: 'https://s3.example.test/get' } },
  ]);

  await reachDepositCheckout();
  fillGuestDetails();
  fireEvent.click(screen.getByRole('button', { name: 'Reserve these dates' }));
  await screen.findByText('CR61010200009629385364');

  const file = new File(['receipt'], 'receipt.jpg', { type: 'image/jpeg' });
  const input = document.querySelector('input[type="file"]') as HTMLInputElement;
  fireEvent.change(input, { target: { files: [file] } });

  await screen.findByText('Receipt received. Our team will verify it and confirm your booking.');

  const calls = (global.fetch as jest.Mock).mock.calls;
  expect(calls[2][0]).toBe('/api/deposit-receipt/upload-url');
  // The file goes straight to S3, never through the booking API.
  expect(calls[3][0]).toBe('https://s3.example.test/put');
  expect((calls[3][1] as RequestInit).method).toBe('PUT');
  expect(calls[4][0]).toBe('/api/deposit-receipt/confirm');

  // Both API calls carry the scoped deposit token.
  const uploadHeaders = (calls[2][1] as RequestInit).headers as Record<string, string>;
  expect(uploadHeaders.Authorization).toBe('Bearer deposit-access-token-value');
});
