/**
 * Guest portal — cancellation gating and outcome.
 *
 * The rule lives on the server (cancellationPolicy.ts); the page renders from
 * `availableActions` and `cancellation.reasonCode` rather than re-deriving it.
 * These tests pin that contract down, because a page that guesses the policy
 * would offer buttons the API then refuses.
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PortalDetailPage from './PortalDetail.page';
import { persistPortalSession } from '../services/PortalSession.service';

jest.mock('posthog-js', () => ({ __esModule: true, default: { capture: jest.fn() } }));

const originalFetch = global.fetch;

const RESERVATION_ID = 'KWL-ABCD1234';

function reservationFixture(overrides: Record<string, unknown> = {}) {
  return {
    reservation: {
      reservationPublicId: RESERVATION_ID,
      status: 'booking_confirmed',
      language: 'en',
      arrivalDate: '2099-06-10',
      departureDate: '2099-06-14',
      guests: 2,
      confirmedAt: '2099-01-01T12:00:00Z',
      ratePlan: 'flexible',
      cancellation: { cancellable: true, deadline: '2099-06-09T21:00:00.000Z' },
      availableActions: ['request_help', 'update_guests', 'cancel_booking'],
      property: {
        propertyId: 'b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111',
        slug: 'Geco',
        listingUrl: '/Geco',
        name: 'Casa Geco',
        guestCapacity: 5,
        thumbnailUrl: 'https://example.com/geco.jpg',
        amenities: [],
      },
      price: { currency: 'USD', totalAmountCents: 51000 },
      ...overrides,
    },
    hold: { status: 'converted', expiresAt: '2099-06-01T12:00:00Z' },
    payment: { method: 'paypal', status: 'captured', currency: 'USD', totalAmountCents: 51000 },
  };
}

function mockResponses(responses: Array<{ body: unknown; status?: number }>) {
  const queue = [...responses];
  global.fetch = jest.fn(async () => {
    const next = queue.shift();
    if (!next) throw new Error('Unexpected fetch call');
    return new Response(JSON.stringify(next.body), {
      status: next.status ?? 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }) as typeof fetch;
}

function renderPortal() {
  persistPortalSession('portal-token', RESERVATION_ID);
  return render(
    <MemoryRouter initialEntries={[`/portal/${RESERVATION_ID}`]}>
      <Routes>
        <Route path="/portal/:reservationPublicId" element={<PortalDetailPage />} />
        <Route path="/portal" element={<div>Login page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

afterEach(() => {
  global.fetch = originalFetch;
  window.sessionStorage.clear();
  window.localStorage.clear();
  jest.clearAllMocks();
});

// ── gating ───────────────────────────────────────────────────────────────────

test('offers cancellation when the server says the booking is cancellable', async () => {
  mockResponses([{ body: reservationFixture() }]);
  renderPortal();

  expect(await screen.findByRole('button', { name: 'Cancel booking' })).toBeInTheDocument();
});

test('hides cancellation and explains why for a non-refundable booking', async () => {
  mockResponses([
    {
      body: reservationFixture({
        ratePlan: 'non_refundable',
        cancellation: { cancellable: false, deadline: '2099-06-09T21:00:00.000Z', reasonCode: 'non_refundable_rate' },
        availableActions: ['request_help', 'update_guests'],
      }),
    },
  ]);
  renderPortal();

  await screen.findByText('Casa Geco');
  expect(screen.queryByRole('button', { name: 'Cancel booking' })).not.toBeInTheDocument();
  // A missing button with no explanation would just generate a support email.
  expect(screen.getByText(/non-refundable rate and cannot be cancelled online/i)).toBeInTheDocument();
});

test('hides cancellation inside the 24-hour window and points at staff', async () => {
  mockResponses([
    {
      body: reservationFixture({
        cancellation: { cancellable: false, deadline: '2099-06-09T21:00:00.000Z', reasonCode: 'cancellation_window_closed' },
        availableActions: ['request_help', 'update_guests'],
      }),
    },
  ]);
  renderPortal();

  await screen.findByText('Casa Geco');
  expect(screen.queryByRole('button', { name: 'Cancel booking' })).not.toBeInTheDocument();
  expect(screen.getByText(/within 24 hours of check-in/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Contact us' })).toHaveAttribute('href', 'https://wa.me/50684632276');
});

// ── the cancellation itself ──────────────────────────────────────────────────

test('cancelling updates the displayed status from the response', async () => {
  mockResponses([
    { body: reservationFixture() },
    {
      body: {
        status: 'cancelled',
        message: 'We cancelled your booking and released the dates.',
        reservation: { ...reservationFixture().reservation, status: 'cancelled', availableActions: ['request_help'] },
        hold: { status: 'cancelled', expiresAt: '2099-06-01T12:00:00Z' },
        payment: { method: 'paypal', status: 'refund_flagged' },
        refund: { status: 'manual_review', paypalCaptureId: 'CAPTURE-1' },
      },
    },
  ]);
  renderPortal();

  fireEvent.click(await screen.findByRole('button', { name: 'Cancel booking' }));

  const reason = await screen.findByLabelText('Reason');
  fireEvent.change(reason, { target: { value: 'plans changed' } });
  fireEvent.click(screen.getByRole('button', { name: 'Yes, cancel my booking' }));

  await screen.findByText('We cancelled your booking and released the dates.');

  // The page cannot refetch (loadAttemptedRef guards the initial load), so it
  // must apply the response directly — otherwise the status stays "Confirmed".
  await waitFor(() => expect(screen.getByText('Cancelled')).toBeInTheDocument());
  expect(screen.getByText(/back to the PayPal account/i)).toBeInTheDocument();
});

test('a provider failure tells the guest nothing changed', async () => {
  mockResponses([
    { body: reservationFixture() },
    {
      body: { error: { code: 'provider_error', message: 'Smoobu rejected the cancellation', retryable: false } },
      status: 502,
    },
  ]);
  renderPortal();

  fireEvent.click(await screen.findByRole('button', { name: 'Cancel booking' }));
  fireEvent.change(await screen.findByLabelText('Reason'), { target: { value: 'plans changed' } });
  fireEvent.click(screen.getByRole('button', { name: 'Yes, cancel my booking' }));

  // The server rolls nothing back on a 502, so "nothing has changed" is accurate
  // and a retry is safe.
  await screen.findByText(/Nothing has changed/i);
});

test('requires a reason before calling the API', async () => {
  mockResponses([{ body: reservationFixture() }]);
  renderPortal();

  fireEvent.click(await screen.findByRole('button', { name: 'Cancel booking' }));
  fireEvent.click(screen.getByRole('button', { name: 'Yes, cancel my booking' }));

  await screen.findByText('Please enter a reason for cancelling.');
  // Only the initial reservation load.
  expect((global.fetch as jest.Mock).mock.calls).toHaveLength(1);
});

test('a deposit booking is told its refund comes by bank transfer', async () => {
  const fixture = reservationFixture();
  mockResponses([
    { body: { ...fixture, payment: { method: 'manual_deposit', status: 'paid' } } },
  ]);
  renderPortal();

  fireEvent.click(await screen.findByRole('button', { name: 'Cancel booking' }));

  // Promising a PayPal refund to someone who paid by bank transfer would be wrong.
  expect(await screen.findByText(/refunds by hand, by bank transfer/i)).toBeInTheDocument();
});
