import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingPage from './Booking.page';

const originalFetch = global.fetch;

afterEach(() => {
  global.fetch = originalFetch;
  jest.restoreAllMocks();
});

function renderBookingPage(path = '/book') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <BookingPage />
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
          canCreatePayPalHold: false,
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
