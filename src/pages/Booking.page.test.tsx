import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import * as PostHogService from '../services/PostHog.service';
import { CookieConsentService } from '../services/CookieConsent.service';
import { resetExchangeRateStore } from '../services/exchangeRateStore';
import BookingPage from './Booking.page';

/**
 * posthog-js is loaded lazily behind PostHog.service, so mocking the library
 * itself catches nothing — the wrapper is what the page's analytics calls
 * reach. Keeping loadPostHog/initPostHogIfConsented as no-op mocks stops the
 * real module from being dynamically imported mid-test.
 */
jest.mock('../services/PostHog.service', () => ({
  __esModule: true,
  capture: jest.fn(),
  loadPostHog: jest.fn(() => Promise.resolve(null)),
  initPostHogIfConsented: jest.fn(),
  optIn: jest.fn(),
  optOut: jest.fn(),
}));

const posthog = { capture: PostHogService.capture as jest.Mock };

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
  // Module-level and loaded at most once per session — without this a Spanish
  // test that failed to fetch a rate would leave every later one unable to.
  resetExchangeRateStore();
  delete (window as any).gtag;
  delete (window as any).fbq;
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

function renderBookingPage(path = '/en/book') {
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

function renderBookingRoutes(path = '/en/book') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/en/book"
          element={
            <>
              <BookingPage />
              <LocationProbe />
            </>
          }
        />
        <Route
          path="/es/book"
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
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));

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
  expect(screen.getByRole('link', { name: 'View listing' })).toHaveAttribute('href', '/en/geco');
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

  renderBookingPage('/es/book');

  fireEvent.change(activeSlide().getByLabelText('Llegada'), { target: { value: '2099-07-10' } });
  fireEvent.change(activeSlide().getByLabelText('Salida'), { target: { value: '2099-07-14' } });
  fireEvent.click(screen.getByRole('button', { name: /^buscar$/i }));

  await screen.findByText('No hay casas disponibles para estas fechas');

  const [, request] = (global.fetch as jest.Mock).mock.calls[0];
  expect(request.headers['Accept-Language']).toBe('es');
  expect(JSON.parse(request.body)).toMatchObject({ language: 'es' });
});

const spanishSearchResult = {
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
      actions: { viewListingUrl: '/Geco', canCreatePayPalHold: true, canUseManualDepositHandoff: true },
    },
  ],
  availabilityWarnings: [],
};

/** Routes by URL so the exchange-rate call can be answered — or refused — independently. */
function mockSpanishSearchWithExchangeRate(exchangeRate: { body: unknown; status?: number } | null) {
  global.fetch = jest.fn(async (url: string) => {
    if (String(url).includes('/api/exchange-rate')) {
      if (!exchangeRate) {
        throw new TypeError('Network request failed');
      }
      return new Response(JSON.stringify(exchangeRate.body), {
        status: exchangeRate.status ?? 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(spanishSearchResult), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }) as unknown as typeof fetch;
}

async function runSpanishSearch() {
  renderBookingPage('/es/book');
  fireEvent.change(activeSlide().getByLabelText('Llegada'), { target: { value: '2099-07-10' } });
  fireEvent.change(activeSlide().getByLabelText('Salida'), { target: { value: '2099-07-14' } });
  fireEvent.click(screen.getByRole('button', { name: /^buscar$/i }));
  await screen.findByText('Casa Geco');
}

test('shows a colón estimate beside the dollar total on the Spanish results, flagged as an estimate', async () => {
  mockSpanishSearchWithExchangeRate({
    body: { base: 'USD', quote: 'CRC', rate: 512.35, source: 'open.er-api.com', fetchedAt: '2099-07-01T06:00:00Z', stale: false },
  });

  await runSpanishSearch();

  // $510.00 × 512.35 = ₡261,298.50, rounded to the nearest hundred colones.
  // es-CR groups thousands with a non-breaking space, which the default text
  // normalizer folds into the plain one written here.
  expect(await screen.findByText('≈ ₡261 300')).toBeInTheDocument();
  expect(screen.getByText('USD 510,00')).toBeInTheDocument();
  expect(screen.getByText(/Los montos en colones son una estimación/)).toBeInTheDocument();
  expect(screen.getByText(/₡512,35 por US\$1/)).toBeInTheDocument();
});

test('leaves the dollar prices alone when the exchange rate cannot be fetched', async () => {
  mockSpanishSearchWithExchangeRate(null);

  await runSpanishSearch();

  expect(screen.getByText('USD 510,00')).toBeInTheDocument();
  await waitFor(() => expect(screen.queryByText(/≈ ₡/)).not.toBeInTheDocument());
  expect(screen.queryByText(/Los montos en colones/)).not.toBeInTheDocument();
});

test('does not request an exchange rate on the English booking flow', async () => {
  mockJsonResponse({ ...spanishSearchResult, language: 'en' });

  renderBookingPage('/en/book');
  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2099-07-10' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-07-14' } });
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));
  await screen.findByText('Casa Geco');

  const requestedUrls = (global.fetch as jest.Mock).mock.calls.map(([url]) => String(url));
  expect(requestedUrls.some((url) => url.includes('/api/exchange-rate'))).toBe(false);
  expect(screen.queryByText(/≈ ₡/)).not.toBeInTheDocument();
});

test('language switcher toggles booking routes and preserves search query state', () => {
  renderBookingRoutes('/en/book?arrivalDate=2099-10-01&departureDate=2099-10-05&guests=4');

  expect(activeSlide().getByLabelText('Check-in')).toHaveValue('2099-10-01');
  expect(activeSlide().getByLabelText('Check-out')).toHaveValue('2099-10-05');
  expect(activeSlide().getByLabelText('Guests')).toHaveValue(4);

  fireEvent.change(screen.getAllByLabelText('Select language')[0], { target: { value: 'es' } });

  expect(screen.getByTestId('location')).toHaveTextContent(
    '/es/book?arrivalDate=2099-10-01&departureDate=2099-10-05&guests=4'
  );
  expect(activeSlide().getByLabelText('Llegada')).toHaveValue('2099-10-01');
  expect(activeSlide().getByLabelText('Salida')).toHaveValue('2099-10-05');
  expect(activeSlide().getByLabelText('Huéspedes')).toHaveValue(4);
});

test('auto-searches when a shared link already carries arrival and departure dates', async () => {
  mockJsonResponse({ ...spanishSearchResult, language: 'en' });

  renderBookingPage('/en/book?arrivalDate=2099-07-10&departureDate=2099-07-14');

  await screen.findByText('Casa Geco');

  const [, request] = (global.fetch as jest.Mock).mock.calls[0];
  expect(JSON.parse(request.body)).toMatchObject({ arrivalDate: '2099-07-10', departureDate: '2099-07-14' });
});

test('does not auto-search when a shared link is missing one of the dates', () => {
  global.fetch = jest.fn() as typeof fetch;

  renderBookingPage('/en/book?arrivalDate=2099-07-10');

  expect(global.fetch).not.toHaveBeenCalled();
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

  renderBookingPage('/es/book');

  fireEvent.change(activeSlide().getByLabelText('Llegada'), { target: { value: '2099-07-10' } });
  fireEvent.change(activeSlide().getByLabelText('Salida'), { target: { value: '2099-07-14' } });
  fireEvent.click(screen.getByRole('button', { name: /^buscar$/i }));

  await screen.findByText('Casa Geco');

  const viewListingLink = screen.getByRole('link', { name: 'Ver alojamiento' });
  // The result card's photo gallery renders one link per photo, all sharing
  // the same accessible name.
  const imageListingLinks = screen.getAllByRole('link', { name: 'Ver alojamiento: Casa Geco' });
  expect(viewListingLink).toHaveAttribute('href', '/es/geco');
  expect(viewListingLink).toHaveAttribute('target', '_blank');
  expect(viewListingLink).toHaveAttribute('rel', 'noopener noreferrer');
  expect(imageListingLinks.length).toBeGreaterThan(0);
  imageListingLinks.forEach((link) => {
    expect(link).toHaveAttribute('href', '/es/geco');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
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
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));
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
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));
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

  renderBookingPage('/en/book/return?token=PAY-ORDER-123&PayerID=PAYER-456');

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
  expect(screen.getByTestId('location')).toHaveTextContent('/en/portal?reservationId=res_PUBLIC123');
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
  // GA4 purchase is reported by the API (booking-api/src/serverConversions.ts),
  // never from the browser — the Measurement Protocol cannot deduplicate.
  expect(window.gtag).not.toHaveBeenCalledWith('event', 'purchase', expect.anything());
  expect(window.fbq).toHaveBeenCalledWith(
    'track',
    'Purchase',
    expect.objectContaining({
      value: 510,
      currency: 'USD',
      content_ids: ['b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111'],
      order_id: 'res_PUBLIC123',
    }),
    { eventID: 'res_PUBLIC123' }
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

  renderBookingPage('/en/book/confirmed');

  await screen.findByRole('heading', { name: 'Booking confirmed' });
  expect(screen.getByText('res_PUBLIC123')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Manage booking' }));
  expect(screen.getByTestId('location')).toHaveTextContent('/en/portal?reservationId=res_PUBLIC123');
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

  renderBookingPage('/es/book/confirmed');

  await screen.findByRole('heading', { name: 'Reserva confirmada' });
  expect(screen.getByText('Tu estad\u00eda est\u00e1 reservada.')).toBeInTheDocument();
  expect(screen.getByText('Pago confirmado')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Gestionar reserva' }));
  expect(screen.getByTestId('location')).toHaveTextContent('/es/portal?reservationId=res_PUBLIC123');
});

test('shows a return error without calling capture when PayPal return context is missing', async () => {
  global.fetch = jest.fn() as typeof fetch;

  renderBookingPage('/en/book/return?token=PAY-ORDER-123&PayerID=PAYER-456');

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

  renderBookingPage('/en/book/return?token=PAY-ORDER-123&PayerID=PAYER-456');

  expect(screen.getByText('Processing your PayPal payment')).toBeInTheDocument();
  await screen.findByText('We could not verify the PayPal payment right now. Please contact Kalawala.');
  expect(screen.queryByText('Your stay is booked.')).not.toBeInTheDocument();
});

test('validates past arrival date before calling the booking API', async () => {
  global.fetch = jest.fn() as typeof fetch;
  renderBookingPage();

  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2020-01-01' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));

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
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));

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
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));

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
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));

  await activeSlide().findByText('We cannot check availability right now. Please try again in a moment.');
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
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));

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
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));
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

test('a persisted deposit hold is resumed on mount after the SINPE round-trip (#308)', async () => {
  // The guest left to pay and came back to a fresh page — no search runs, but the
  // hold was stashed in localStorage, so the timer, bank details and receipt
  // upload must all reappear.
  window.localStorage.setItem('kalawala_deposit_checkout', JSON.stringify(DEPOSIT_HOLD_FIXTURE));

  renderBookingPage();

  await screen.findByText('KWL-DEP12345');
  expect(screen.getByText('8772 7355')).toBeInTheDocument();
  expect(screen.getByText('Upload only the receipt for this deposit. Any other picture will cancel your reservation automatically.')).toBeInTheDocument();
});

test('an expired persisted deposit hold is not resumed (#308)', async () => {
  const expired = { ...DEPOSIT_HOLD_FIXTURE, booking: { ...DEPOSIT_HOLD_FIXTURE.booking, hold: { status: 'active', expiresAt: '2000-01-01T00:00:00Z' } } };
  window.localStorage.setItem('kalawala_deposit_checkout', JSON.stringify(expired));

  renderBookingPage();

  // Falls back to the ordinary search entry point; the dead hold is gone.
  expect(await screen.findByRole('button', { name: /^search$/i })).toBeInTheDocument();
  expect(screen.queryByText('KWL-DEP12345')).not.toBeInTheDocument();
  expect(window.localStorage.getItem('kalawala_deposit_checkout')).toBeNull();
});

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

  // The guest is warned before picking a file that a non-receipt upload cancels the booking.
  screen.getByText('Upload only the receipt for this deposit. Any other picture will cancel your reservation automatically.');

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

// ── Pet-friendly bookings ────────────────────────────────────────────────────

const PET_SEARCH_FIXTURE = {
  ...SEARCH_RESULT_FIXTURE,
  resultsCount: 2,
  properties: [
    {
      ...SEARCH_RESULT_FIXTURE.properties[0],
      amenities: [
        { code: 'wifi', label: '100Mbps WiFi' },
        { code: 'pet', label: 'Pet friendly' },
      ],
    },
    {
      ...SEARCH_RESULT_FIXTURE.properties[0],
      propertyId: 'bc2470e7-3f18-43e3-91eb-ac3bf3c82ca4',
      slug: 'Delfin',
      listingUrl: '/Delfin',
      name: 'Casa Delfin',
      amenities: [{ code: 'wifi', label: '100Mbps WiFi' }],
      actions: { viewListingUrl: '/Delfin', canCreatePayPalHold: true, canUseManualDepositHandoff: true },
    },
  ],
};

async function searchWith(fixture: unknown, extraResponses: Array<{ body: unknown; status?: number }> = []) {
  mockJsonResponses([{ body: fixture }, ...extraResponses]);
  renderBookingPage();

  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));
  await screen.findByText('Casa Geco');
}

function togglePet() {
  fireEvent.click(activeSlide().getByRole('checkbox', { name: /travelling with a pet/i }));
}

test('the pet toggle narrows the results to pet-friendly homes', async () => {
  await searchWith(PET_SEARCH_FIXTURE);

  expect(screen.getByText('Casa Delfin')).toBeInTheDocument();
  expect(screen.getByText('2 homes are available')).toBeInTheDocument();

  togglePet();

  expect(screen.queryByText('Casa Delfin')).not.toBeInTheDocument();
  expect(screen.getByText('Casa Geco')).toBeInTheDocument();
  expect(screen.getByText('1 home is available')).toBeInTheDocument();
  // The home that dropped out is accounted for, so the shorter list does not
  // read as missing availability.
  expect(
    screen.getByText('1 other home is free for these dates but does not accept pets.')
  ).toBeInTheDocument();

  // Turning it back off restores the full list without a second search.
  togglePet();
  expect(screen.getByText('Casa Delfin')).toBeInTheDocument();
  expect((global.fetch as jest.Mock).mock.calls).toHaveLength(1);
});

test('a pet search with no pet-friendly home free explains itself', async () => {
  const onlyDelfin = { ...PET_SEARCH_FIXTURE, resultsCount: 1, properties: [PET_SEARCH_FIXTURE.properties[1]] };
  mockJsonResponses([{ body: onlyDelfin }]);
  renderBookingPage();

  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));
  await screen.findByText('Casa Delfin');

  togglePet();

  expect(screen.getByText('No pet-friendly homes available for these dates')).toBeInTheDocument();
  // Not the generic "no houses available" dead end — those dates do have homes.
  expect(screen.queryByText('No houses available for these dates')).not.toBeInTheDocument();
});

test('the declared pet rides along to the PayPal hold', async () => {
  await searchWith(PET_SEARCH_FIXTURE, [
    {
      body: {
        booking: {
          ...DEPOSIT_HOLD_FIXTURE.booking,
          payment: { method: 'paypal', status: 'pending' },
        },
        nextAction: 'create_paypal_order',
      },
    },
  ]);

  togglePet();
  fireEvent.click(screen.getByRole('button', { name: /book with paypal/i }));
  await screen.findByRole('heading', { name: 'Checkout' });

  // The guest can see what they declared before they pay.
  expect(screen.getByText('Travelling with a pet')).toBeInTheDocument();

  fillGuestDetails();
  fireEvent.click(screen.getByRole('button', { name: /continue to payment/i }));
  await screen.findByText('Your stay is on hold');

  const holdCall = (global.fetch as jest.Mock).mock.calls[1];
  expect(holdCall[0]).toBe('/api/holds');
  expect(JSON.parse((holdCall[1] as RequestInit & { body: string }).body)).toMatchObject({
    propertyId: 'b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111',
    withPet: true,
  });
});

test('no pet declared means no pet flag on the hold', async () => {
  await searchWith(PET_SEARCH_FIXTURE, [{ body: DEPOSIT_HOLD_FIXTURE }]);

  fireEvent.click(screen.getAllByRole('button', { name: 'Bank transfer / SINPE' })[0]);
  await screen.findByRole('heading', { name: 'Checkout' });
  fillGuestDetails();
  fireEvent.click(screen.getByRole('button', { name: 'Reserve these dates' }));
  await screen.findByText('CR61010200009629385364');

  const holdCall = (global.fetch as jest.Mock).mock.calls[1];
  expect(holdCall[0]).toBe('/api/deposit-holds');
  expect(JSON.parse((holdCall[1] as RequestInit & { body: string }).body)).not.toHaveProperty('withPet');
});

// ── Long-stay discounts ──────────────────────────────────────────────────────

const LONG_STAY_SEARCH_FIXTURE = {
  ...SEARCH_RESULT_FIXTURE,
  arrivalDate: '2099-06-10',
  departureDate: '2099-06-17',
  properties: [
    {
      ...SEARCH_RESULT_FIXTURE.properties[0],
      price: {
        currency: 'USD',
        totalAmountCents: 89250,
        nightlyAverageCents: 12750,
        nights: 7,
        includesTaxes: false,
        rateSource: 'smoobu',
        discount: {
          source: 'long_stay',
          baseTotalCents: 105000,
          baseNightlyAverageCents: 15000,
          amountCents: 15750,
          percentage: 15,
        },
      },
    },
  ],
};

test('a long-stay discount is shown as a slashed rack rate on the result card', async () => {
  mockJsonResponse(LONG_STAY_SEARCH_FIXTURE);
  renderBookingPage();

  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-06-17' } });
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));
  await screen.findByText('Casa Geco');

  expect(screen.getByText('Long-stay −15%')).toBeInTheDocument();
  // Rack rate struck through, discounted total in the prominent slot.
  expect(screen.getByText('$1,050.00')).toBeInTheDocument();
  expect(screen.getByText('$892.50')).toBeInTheDocument();
  // Nightly average is slashed the same way.
  expect(screen.getByText('$150.00', { exact: false })).toBeInTheDocument();
});

test('a long-stay discount stacks with the non-refundable rate', async () => {
  mockJsonResponse(LONG_STAY_SEARCH_FIXTURE);
  renderBookingPage();

  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-06-17' } });
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));
  await screen.findByText('Casa Geco');

  fireEvent.click(activeSlide().getByRole('button', { name: /non-refundable/i }));

  // Both reductions are named, and the total is 10% off Smoobu's already
  // long-stay-discounted price — not off the rack rate.
  expect(screen.getByText('Long-stay −15% · Save 10%')).toBeInTheDocument();
  expect(screen.getByText('$803.25')).toBeInTheDocument();
  expect(screen.getByText('$1,050.00')).toBeInTheDocument();
});

test('the discount follows the guest into the checkout summary', async () => {
  mockJsonResponse(LONG_STAY_SEARCH_FIXTURE);
  renderBookingPage();

  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-06-17' } });
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));
  await screen.findByText('Casa Geco');

  fireEvent.click(screen.getByRole('button', { name: /book with paypal/i }));
  await screen.findByRole('heading', { name: 'Checkout' });

  const summary = document.querySelector('.booking-checkout-panel__summary') as HTMLElement;
  expect(within(summary).getByText('$892.50')).toBeInTheDocument();
  expect(within(summary).getByText('$1,050.00')).toBeInTheDocument();
  expect(within(summary).getByText(/Long-stay −15%/)).toBeInTheDocument();
});

test('a quote with no discount shows a single price and no slashed rate', async () => {
  mockJsonResponse(SEARCH_RESULT_FIXTURE);
  renderBookingPage();

  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));
  await screen.findByText('Casa Geco');

  expect(screen.getByText('$510.00')).toBeInTheDocument();
  expect(document.querySelector('.booking-result-card__price del')).toBeNull();
  expect(screen.queryByText(/Long-stay/)).not.toBeInTheDocument();
});

// ---------------------------------------------------------------------------
// Results filter bar + sort — client-side refinement of the quote on screen,
// mirrored into the URL so a filtered/sorted view is a shareable link.
// ---------------------------------------------------------------------------

function property(overrides: Record<string, unknown>) {
  return {
    propertyId: `id-${overrides.slug}`,
    slug: overrides.slug,
    listingUrl: `/${overrides.slug}`,
    name: overrides.name,
    guestCapacity: overrides.guestCapacity,
    thumbnailUrl: 'https://example.com/x.jpg',
    amenities: overrides.amenities ?? [{ code: 'wifi', label: '100Mbps WiFi' }],
    price: {
      currency: 'USD',
      totalAmountCents: overrides.totalAmountCents,
      nightlyAverageCents: 10000,
      nights: 4,
      includesTaxes: false,
      rateSource: 'smoobu',
    },
    actions: { viewListingUrl: `/${overrides.slug}`, canCreatePayPalHold: true, canUseManualDepositHandoff: true },
  };
}

// Geco = Puerto Viejo Center + private fenced parking (by slug), no pool.
// Villa Mar = Playa Chiquita + pool. Areka = Playa Chiquita, neither.
const FILTER_SEARCH_FIXTURE = {
  bookingSessionId: '3d0f8ac0-5c30-4b09-bb49-12fd1df120f1',
  quoteId: 'qt_TEST',
  quoteExpiresAt: '2099-06-01T12:00:00Z',
  arrivalDate: '2099-06-10',
  departureDate: '2099-06-14',
  guests: 2,
  language: 'en',
  resultsCount: 3,
  properties: [
    property({ slug: 'Geco', name: 'Casa Geco', guestCapacity: 5, totalAmountCents: 51000, amenities: [{ code: 'wifi', label: '100Mbps WiFi' }, { code: 'parking', label: 'Private fenced parking' }] }),
    property({ slug: 'VillaMar', name: 'Villa Mar', guestCapacity: 2, totalAmountCents: 40000, amenities: [{ code: 'pool', label: 'Private pool' }, { code: 'parking', label: 'Private unfenced parking' }] }),
    property({ slug: 'Areka', name: 'Casa Areka', guestCapacity: 4, totalAmountCents: 60000, amenities: [{ code: 'wifi', label: 'WiFi' }, { code: 'parking', label: 'Private unfenced parking' }] }),
  ],
  availabilityWarnings: [],
};

function visibleHomeNames(): string[] {
  return Array.from(document.querySelectorAll('.booking-result-card__content-title')).map((el) => el.textContent ?? '');
}

function currentSearch(): string {
  return screen.getByTestId('location').textContent?.split('?')[1] ?? '';
}

async function searchWithFilterFixture() {
  mockJsonResponse(FILTER_SEARCH_FIXTURE);
  renderBookingPage();
  fireEvent.change(activeSlide().getByLabelText('Check-in'), { target: { value: '2099-06-10' } });
  fireEvent.change(activeSlide().getByLabelText('Check-out'), { target: { value: '2099-06-14' } });
  fireEvent.click(screen.getByRole('button', { name: /^search$/i }));
  await screen.findByText('Villa Mar');
}

test('pool filter narrows the results to homes with a pool and writes pool=1', async () => {
  await searchWithFilterFixture();
  expect(visibleHomeNames()).toEqual(['Casa Geco', 'Villa Mar', 'Casa Areka']);

  fireEvent.click(activeSlide().getByRole('checkbox', { name: /pool/i }));

  expect(visibleHomeNames()).toEqual(['Villa Mar']);
  expect(new URLSearchParams(currentSearch()).get('pool')).toBe('1');
  expect(screen.getByText('1 home is available')).toBeInTheDocument();

  // Un-checking clears both the filter and the param.
  fireEvent.click(activeSlide().getByRole('checkbox', { name: /pool/i }));
  expect(visibleHomeNames()).toHaveLength(3);
  expect(new URLSearchParams(currentSearch()).get('pool')).toBeNull();
});

test('fenced-parking filter matches only Geco/Rana/Delfin and writes parking=1', async () => {
  await searchWithFilterFixture();

  fireEvent.click(activeSlide().getByRole('checkbox', { name: /fenced parking/i }));

  expect(visibleHomeNames()).toEqual(['Casa Geco']);
  expect(new URLSearchParams(currentSearch()).get('parking')).toBe('1');
});

test('area filter splits Center from Playa Chiquita and writes location', async () => {
  await searchWithFilterFixture();

  fireEvent.click(activeSlide().getByRole('button', { name: 'Playa Chiquita' }));
  expect(visibleHomeNames()).toEqual(['Villa Mar', 'Casa Areka']);
  expect(new URLSearchParams(currentSearch()).get('location')).toBe('chiquita');

  fireEvent.click(activeSlide().getByRole('button', { name: 'Puerto Viejo Center' }));
  expect(visibleHomeNames()).toEqual(['Casa Geco']);
  expect(new URLSearchParams(currentSearch()).get('location')).toBe('center');

  // "All areas" is the default, so it drops back out of the URL.
  fireEvent.click(activeSlide().getByRole('button', { name: 'All areas' }));
  expect(visibleHomeNames()).toHaveLength(3);
  expect(new URLSearchParams(currentSearch()).get('location')).toBeNull();
});

test('sort reorders the grid and writes the sort param', async () => {
  await searchWithFilterFixture();
  const sort = activeSlide().getByLabelText('Sort by');

  fireEvent.change(sort, { target: { value: 'price_asc' } });
  expect(visibleHomeNames()).toEqual(['Villa Mar', 'Casa Geco', 'Casa Areka']);
  expect(new URLSearchParams(currentSearch()).get('sort')).toBe('price_asc');

  fireEvent.change(sort, { target: { value: 'price_desc' } });
  expect(visibleHomeNames()).toEqual(['Casa Areka', 'Casa Geco', 'Villa Mar']);

  fireEvent.change(sort, { target: { value: 'size_desc' } });
  expect(visibleHomeNames()).toEqual(['Casa Geco', 'Casa Areka', 'Villa Mar']);

  fireEvent.change(sort, { target: { value: 'size_asc' } });
  expect(visibleHomeNames()).toEqual(['Villa Mar', 'Casa Areka', 'Casa Geco']);

  // Back to "Featured" restores the server order and clears the param.
  fireEvent.change(sort, { target: { value: '' } });
  expect(visibleHomeNames()).toEqual(['Casa Geco', 'Villa Mar', 'Casa Areka']);
  expect(new URLSearchParams(currentSearch()).get('sort')).toBeNull();
});

test('the pet toggle now rides along in the URL as pets=1', async () => {
  await searchWithFilterFixture();

  fireEvent.click(activeSlide().getByRole('checkbox', { name: /travelling with a pet/i }));
  expect(new URLSearchParams(currentSearch()).get('pets')).toBe('1');
});

test('a shared link with filters restores them and pre-filters on first render', async () => {
  mockJsonResponse(FILTER_SEARCH_FIXTURE);
  renderBookingPage('/en/book?arrivalDate=2099-06-10&departureDate=2099-06-14&guests=2&pool=1&sort=price_asc');

  await screen.findByText('Villa Mar');

  // pool=1 pre-applied, so only the home with a pool shows, and the checkbox
  // reflects the shared state.
  expect(visibleHomeNames()).toEqual(['Villa Mar']);
  expect(activeSlide().getByRole('checkbox', { name: /pool/i })).toBeChecked();
  expect((activeSlide().getByLabelText('Sort by') as HTMLSelectElement).value).toBe('price_asc');
});

test('an over-narrow filter combination shows an empty state with Clear filters', async () => {
  await searchWithFilterFixture();

  // Pool + Center: Villa Mar has a pool but sits in Chiquita, Geco is in the
  // Center but has no pool — nothing satisfies both.
  fireEvent.click(activeSlide().getByRole('checkbox', { name: /pool/i }));
  fireEvent.click(activeSlide().getByRole('button', { name: 'Puerto Viejo Center' }));

  expect(visibleHomeNames()).toHaveLength(0);
  expect(screen.getByText('No homes match your filters')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /clear filters/i }));

  expect(visibleHomeNames()).toHaveLength(3);
  const params = new URLSearchParams(currentSearch());
  expect(params.get('pool')).toBeNull();
  expect(params.get('location')).toBeNull();
});
