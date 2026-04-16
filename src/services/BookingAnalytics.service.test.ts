/**
 * BookingAnalytics.service tests
 *
 * Covers task 7.1 acceptance criteria:
 *   - All funnel events fire to PostHog, GA4, and Meta Pixel with correct properties
 *   - Consent gate: no events fire when analytics consent is absent
 *   - Consent gate: events fire when analytics consent is present
 *   - centsToDecimal conversion is applied correctly for GA4/Meta
 *   - manual_deposit_handoff_clicked does NOT fire a purchase/booking_confirmed event
 */

import posthog from 'posthog-js';
import { CookieConsentService } from './CookieConsent.service';
import {
  trackBookingSearch,
  trackAvailabilityResults,
  trackPropertyViewed,
  trackCheckoutStarted,
  trackPaymentMethodSelected,
  trackPaypalApproved,
  trackBookingConfirmed,
  trackManualDepositHandoffClicked,
  trackBookingCancelled,
} from './BookingAnalytics.service';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

jest.mock('posthog-js', () => ({
  capture: jest.fn(),
}));

jest.mock('./CookieConsent.service', () => ({
  CookieConsentService: {
    hasConsent: jest.fn(),
  },
}));

const mockPosthog = posthog as jest.Mocked<typeof posthog>;
const mockHasConsent = CookieConsentService.hasConsent as jest.Mock;

let mockGtag: jest.Mock;
let mockFbq: jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();

  mockGtag = jest.fn();
  mockFbq = jest.fn();
  (window as any).gtag = mockGtag;
  (window as any).fbq = mockFbq;
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function grantConsent() {
  mockHasConsent.mockReturnValue(true);
}

function denyConsent() {
  mockHasConsent.mockReturnValue(false);
}

// ---------------------------------------------------------------------------
// Consent gating
// ---------------------------------------------------------------------------

describe('consent gating', () => {
  it('suppresses all events when analytics consent is denied', () => {
    denyConsent();

    trackBookingSearch({ arrival_date: '2026-06-01', departure_date: '2026-06-05', guests: 2, language: 'en' });
    trackAvailabilityResults({ available_count: 3, min_price_cents: 50000, currency: 'USD', arrival_date: '2026-06-01', departure_date: '2026-06-05', guests: 2, language: 'en' });
    trackManualDepositHandoffClicked({ contact_method: 'whatsapp', quote_id: 'q1', property_id: 'p1', property_slug: 'Geco', language: 'en' });

    expect(mockPosthog.capture).not.toHaveBeenCalled();
    expect(mockGtag).not.toHaveBeenCalled();
    expect(mockFbq).not.toHaveBeenCalled();
  });

  it('fires events when analytics consent is granted', () => {
    grantConsent();

    trackBookingSearch({ arrival_date: '2026-06-01', departure_date: '2026-06-05', guests: 2, language: 'en' });

    expect(mockPosthog.capture).toHaveBeenCalledTimes(1);
    expect(mockGtag).toHaveBeenCalledTimes(1);
    expect(mockFbq).toHaveBeenCalledTimes(1);
  });

  it('checks only analytics consent (not marketing)', () => {
    grantConsent();
    trackBookingSearch({ arrival_date: '2026-06-01', departure_date: '2026-06-05', guests: 2, language: 'en' });

    expect(mockHasConsent).toHaveBeenCalledWith('analytics');
    expect(mockHasConsent).not.toHaveBeenCalledWith('marketing');
  });
});

// ---------------------------------------------------------------------------
// trackBookingSearch
// ---------------------------------------------------------------------------

describe('trackBookingSearch', () => {
  it('fires booking_search to PostHog with all props', () => {
    grantConsent();
    const props = { arrival_date: '2026-06-01', departure_date: '2026-06-05', guests: 2, language: 'en' as const, source: 'booking_page' };

    trackBookingSearch(props);

    expect(mockPosthog.capture).toHaveBeenCalledWith('booking_search', props);
  });

  it('fires search event to GA4', () => {
    grantConsent();
    trackBookingSearch({ arrival_date: '2026-06-01', departure_date: '2026-06-05', guests: 2, language: 'en' });

    expect(mockGtag).toHaveBeenCalledWith('event', 'search', expect.objectContaining({ event_category: 'booking' }));
  });

  it('fires Search to Meta Pixel', () => {
    grantConsent();
    trackBookingSearch({ arrival_date: '2026-06-01', departure_date: '2026-06-05', guests: 2, language: 'en' });

    expect(mockFbq).toHaveBeenCalledWith('track', 'Search', expect.any(Object));
  });
});

// ---------------------------------------------------------------------------
// trackAvailabilityResults
// ---------------------------------------------------------------------------

describe('trackAvailabilityResults', () => {
  it('fires availability_results to PostHog', () => {
    grantConsent();
    trackAvailabilityResults({ available_count: 0, min_price_cents: null, currency: null, arrival_date: '2026-06-01', departure_date: '2026-06-05', guests: 2, language: 'es' });

    expect(mockPosthog.capture).toHaveBeenCalledWith('availability_results', expect.objectContaining({ available_count: 0 }));
  });

  it('converts cents to decimal for GA4 min_price', () => {
    grantConsent();
    trackAvailabilityResults({ available_count: 1, min_price_cents: 52000, currency: 'USD', arrival_date: '2026-06-01', departure_date: '2026-06-05', guests: 2, language: 'en' });

    expect(mockGtag).toHaveBeenCalledWith('event', 'availability_results', expect.objectContaining({ min_price: 520 }));
  });

  it('passes null min_price to GA4 when no prices available', () => {
    grantConsent();
    trackAvailabilityResults({ available_count: 0, min_price_cents: null, currency: null, arrival_date: '2026-06-01', departure_date: '2026-06-05', guests: 2, language: 'en' });

    expect(mockGtag).toHaveBeenCalledWith('event', 'availability_results', expect.objectContaining({ min_price: null }));
  });

  it('does not fire Meta Pixel event', () => {
    grantConsent();
    trackAvailabilityResults({ available_count: 2, min_price_cents: 10000, currency: 'USD', arrival_date: '2026-06-01', departure_date: '2026-06-05', guests: 2, language: 'en' });

    expect(mockFbq).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// trackCheckoutStarted
// ---------------------------------------------------------------------------

describe('trackCheckoutStarted', () => {
  const props = {
    quote_id: 'q1',
    property_id: 'p1',
    property_slug: 'Geco',
    property_name: 'Casa Geco',
    value_cents: 55000,
    currency: 'USD',
    arrival_date: '2026-06-01',
    departure_date: '2026-06-05',
    guests: 2,
    language: 'en' as const,
  };

  it('fires begin_checkout to GA4 with decimal value', () => {
    grantConsent();
    trackCheckoutStarted(props);

    expect(mockGtag).toHaveBeenCalledWith('event', 'begin_checkout', expect.objectContaining({ value: 550, currency: 'USD' }));
  });

  it('fires InitiateCheckout to Meta Pixel with decimal value', () => {
    grantConsent();
    trackCheckoutStarted(props);

    expect(mockFbq).toHaveBeenCalledWith('track', 'InitiateCheckout', expect.objectContaining({ value: 550, currency: 'USD' }));
  });
});

// ---------------------------------------------------------------------------
// trackBookingConfirmed
// ---------------------------------------------------------------------------

describe('trackBookingConfirmed', () => {
  const props = {
    reservation_id: 'R123',
    property_id: 'p1',
    property_slug: 'Geco',
    property_name: 'Casa Geco',
    value_cents: 55000,
    currency: 'USD',
    arrival_date: '2026-06-01',
    departure_date: '2026-06-05',
    payment_method: 'paypal' as const,
    language: 'en' as const,
  };

  it('fires purchase to GA4 with transaction_id and decimal value', () => {
    grantConsent();
    trackBookingConfirmed(props);

    expect(mockGtag).toHaveBeenCalledWith('event', 'purchase', expect.objectContaining({
      transaction_id: 'R123',
      value: 550,
      currency: 'USD',
    }));
  });

  it('fires Purchase to Meta Pixel', () => {
    grantConsent();
    trackBookingConfirmed(props);

    expect(mockFbq).toHaveBeenCalledWith('track', 'Purchase', expect.objectContaining({ value: 550, currency: 'USD' }));
  });
});

// ---------------------------------------------------------------------------
// trackManualDepositHandoffClicked — must NOT fire purchase/booking_confirmed
// ---------------------------------------------------------------------------

describe('trackManualDepositHandoffClicked', () => {
  const props = {
    contact_method: 'whatsapp',
    quote_id: 'q1',
    property_id: 'p1',
    property_slug: 'Geco',
    language: 'es' as const,
  };

  it('fires manual_deposit_handoff_clicked to PostHog', () => {
    grantConsent();
    trackManualDepositHandoffClicked(props);

    expect(mockPosthog.capture).toHaveBeenCalledWith('manual_deposit_handoff_clicked', props);
  });

  it('does NOT fire purchase or booking_confirmed', () => {
    grantConsent();
    trackManualDepositHandoffClicked(props);

    const gtagCalls = mockGtag.mock.calls.map(([, event]) => event);
    expect(gtagCalls).not.toContain('purchase');

    const posthogCalls = (mockPosthog.capture as jest.Mock).mock.calls.map(([event]) => event);
    expect(posthogCalls).not.toContain('booking_confirmed');
  });

  it('fires Lead to Meta Pixel', () => {
    grantConsent();
    trackManualDepositHandoffClicked(props);

    expect(mockFbq).toHaveBeenCalledWith('track', 'Lead', expect.any(Object));
  });
});

// ---------------------------------------------------------------------------
// trackBookingCancelled
// ---------------------------------------------------------------------------

describe('trackBookingCancelled', () => {
  it('fires booking_cancelled to PostHog with reason', () => {
    grantConsent();
    trackBookingCancelled({ reason: 'hold_expired', language: 'en' });

    expect(mockPosthog.capture).toHaveBeenCalledWith('booking_cancelled', expect.objectContaining({ reason: 'hold_expired' }));
  });

  it('does not fire Meta Pixel event', () => {
    grantConsent();
    trackBookingCancelled({ reason: 'user_cancelled', language: 'en' });

    expect(mockFbq).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// trackPaypalApproved
// ---------------------------------------------------------------------------

describe('trackPaypalApproved', () => {
  it('fires paypal_approved to PostHog and GA4 only', () => {
    grantConsent();
    trackPaypalApproved({ paypal_order_id: 'PP-123', property_id: 'p1', language: 'en' });

    expect(mockPosthog.capture).toHaveBeenCalledWith('paypal_approved', expect.objectContaining({ paypal_order_id: 'PP-123' }));
    expect(mockGtag).toHaveBeenCalledWith('event', 'paypal_approved', expect.any(Object));
    expect(mockFbq).not.toHaveBeenCalled();
  });
});
