import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import posthog from 'posthog-js';
import { CookieConsentService } from '../../services/CookieConsent.service';
import CalendarWithPriceDots from './CalendarWithPriceDots.component';

jest.mock('posthog-js', () => ({
  capture: jest.fn(),
}));

const juneResponse = {
  property: {
    propertyId: 'property-geco',
    slug: 'Geco',
    name: 'Casa Geco',
  },
  month: '2026-06',
  currency: 'USD',
  days: [
    {
      date: '2026-06-01',
      available: true,
      priceCents: 9000,
      minStay: 2,
      dot: 'green',
      ariaLabelKey: 'calendar.priceLow',
    },
    {
      date: '2026-06-02',
      available: true,
      priceCents: 10000,
      minStay: 2,
      dot: 'yellow',
      ariaLabelKey: 'calendar.priceAverage',
    },
    {
      date: '2026-06-03',
      available: true,
      priceCents: 12500,
      minStay: 3,
      dot: 'red',
      ariaLabelKey: 'calendar.priceHigh',
    },
    {
      date: '2026-06-04',
      available: false,
      priceCents: null,
      minStay: null,
      dot: 'grey',
      ariaLabelKey: 'calendar.unavailable',
    },
  ],
  stats: {
    availableNightCount: 3,
    minPriceCents: 9000,
    maxPriceCents: 12500,
    averagePriceCents: 10500,
  },
  cache: {
    status: 'hit',
    ttlSeconds: 300,
    generatedAt: '2026-06-01T00:00:00Z',
  },
};

const julyResponse = {
  ...juneResponse,
  month: '2026-07',
  days: [
    {
      date: '2026-07-01',
      available: true,
      priceCents: 15000,
      minStay: 2,
      dot: 'yellow',
      ariaLabelKey: 'calendar.priceAverage',
    },
  ],
  stats: {
    availableNightCount: 1,
    minPriceCents: 15000,
    maxPriceCents: 15000,
    averagePriceCents: 15000,
  },
  cache: {
    status: 'miss',
    ttlSeconds: 300,
    generatedAt: '2026-07-01T00:00:00Z',
  },
};

const fallbackShapeResponse = {
  apartment: 'Geco',
  month: '2026-06',
  dates: {
    '2026-06-01': { available: true, price: 80, minStay: 2 },
    '2026-06-02': { available: true, price: 100, minStay: 2 },
    '2026-06-03': { available: true, price: 120, minStay: 2 },
    '2026-06-04': { available: false, price: null, minStay: null },
  },
  stats: {
    avg: 100,
    min: 80,
    max: 120,
  },
};

describe('CalendarWithPriceDots', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2026-06-15T12:00:00Z'));
    localStorage.clear();
    (posthog.capture as jest.Mock).mockClear();
    (window as any).gtag = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    delete (window as any).gtag;
    jest.restoreAllMocks();
  });

  test('fetches the visible month on mount and renders accessible price dots', async () => {
    mockFetchByMonth();

    render(<CalendarWithPriceDots apartmentSlug="Geco" language="en" />);

    await screen.findByRole('img', { name: /June 1, \$90\.00, low price, 2-night minimum/ });

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/calendar/Geco?month=2026-06&language=en',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Accept-Language': 'en',
        }),
      })
    );
    expect(screen.getByRole('img', { name: /June 1,/ })).toHaveClass('price-dot--green');
    expect(screen.getByRole('img', { name: /June 2,/ })).toHaveClass('price-dot--yellow');
    expect(screen.getByRole('img', { name: /June 3,/ })).toHaveClass('price-dot--red');
    expect(screen.getByRole('img', { name: /June 4, Unavailable/ })).toHaveClass('price-dot--grey');
  });

  test('lazy-loads a new month on navigation without refetching cached months', async () => {
    mockFetchByMonth();

    render(<CalendarWithPriceDots apartmentSlug="Geco" language="en" />);
    await screen.findByRole('img', { name: /June 1,/ });

    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    await screen.findByRole('img', { name: /July 1, \$150\.00, average price/ });

    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    await screen.findByRole('img', { name: /June 1,/ });

    const fetchedUrls = (global.fetch as jest.Mock).mock.calls.map(([url]) => url);
    expect(fetchedUrls).toEqual([
      '/api/calendar/Geco?month=2026-06&language=en',
      '/api/calendar/Geco?month=2026-07&language=en',
    ]);
  });

  test('computes fallback dot colors from month average when backend dot values are omitted', async () => {
    mockFetch(fallbackShapeResponse);

    render(<CalendarWithPriceDots apartmentSlug="Geco" language="en" />);

    await screen.findByRole('img', { name: /June 1, \$80\.00, low price/ });

    expect(screen.getByRole('img', { name: /June 1,/ })).toHaveClass('price-dot--green');
    expect(screen.getByRole('img', { name: /June 2,/ })).toHaveClass('price-dot--yellow');
    expect(screen.getByRole('img', { name: /June 3,/ })).toHaveClass('price-dot--red');
    expect(screen.getByRole('img', { name: /June 4, Unavailable/ })).toHaveClass('price-dot--grey');
  });

  test('renders Spanish accessible labels', async () => {
    mockFetchByMonth();

    render(<CalendarWithPriceDots apartmentSlug="Geco" language="es" />);

    expect(await screen.findByRole('img', { name: /1 de junio.*precio bajo.*M\u00ednimo 2 noches/ })).toBeInTheDocument();
  });

  test('captures consent-gated calendar analytics events', async () => {
    CookieConsentService.saveConsent({
      analytics: true,
      marketing: false,
      functional: true,
    });
    mockFetchByMonth();

    render(<CalendarWithPriceDots apartmentSlug="Geco" language="en" />);

    await waitFor(() => {
      expect(posthog.capture).toHaveBeenCalledWith(
        'calendar_month_loaded',
        expect.objectContaining({
          apartment_slug: 'Geco',
          month: '2026-06',
          available_count: 3,
          avg_price: 10500,
          source: 'hit',
        })
      );
    });

    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(posthog.capture).toHaveBeenCalledWith(
      'calendar_month_changed',
      expect.objectContaining({
        apartment_slug: 'Geco',
        from_month: '2026-06',
        to_month: '2026-07',
      })
    );

    await screen.findByRole('img', { name: /July 1, \$150\.00, average price/ });
    fireEvent.click(screen.getByRole('button', { name: /July 1,/ }));

    expect(posthog.capture).toHaveBeenCalledWith(
      'calendar_date_selected',
      expect.objectContaining({
        apartment_slug: 'Geco',
        date: '2026-07-01',
        price: 15000,
        dot_color: 'yellow',
        available: true,
      })
    );
    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'calendar_date_selected',
      expect.objectContaining({
        event_category: 'calendar',
        apartment_slug: 'Geco',
      })
    );
  });
});

function mockFetchByMonth() {
  global.fetch = jest.fn((url: RequestInfo | URL) => {
    const urlString = String(url);
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(urlString.includes('month=2026-07') ? julyResponse : juneResponse),
    } as Response);
  });
}

function mockFetch(responseBody: unknown) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(responseBody),
    } as Response)
  );
}
