import { render, screen } from '@testing-library/react';
import PriceConfirmationSection from './PriceConfirmationSection.component';
import { resetCalendarMonthCache } from '../../services/calendarMonthCache';
import { resetExchangeRateStore } from '../../services/exchangeRateStore';
import { PROPERTY_MARKETING_CONFIG } from '../../utils/constants';
import type { Locale } from '../../i18n';

const originalFetch = global.fetch;
const usd = PROPERTY_MARKETING_CONFIG.Rana.price!.usd;

/** Calendar is unreachable (so the static headline price is used); the rate answers. */
function stubFetch(rates: { CRC: number; EUR: number | null } | null) {
  global.fetch = jest.fn(async (url: unknown) => {
    if (String(url).includes('/api/exchange-rate') && rates) {
      return new Response(
        JSON.stringify({ base: 'USD', quote: 'CRC', rate: rates.CRC, rates, source: 't', fetchedAt: '2099-07-01T06:00:00Z', stale: false }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    throw new Error('offline');
  }) as unknown as typeof fetch;
}

function renderSection(locale: Locale) {
  return render(<PriceConfirmationSection propertyKey="Rana" locale={locale} />);
}

beforeEach(() => {
  resetCalendarMonthCache();
  resetExchangeRateStore();
});

afterEach(() => {
  global.fetch = originalFetch;
  resetCalendarMonthCache();
  resetExchangeRateStore();
});

test('English leads with dollars and puts the colón estimate on its own smaller line', async () => {
  stubFetch({ CRC: 500, EUR: 0.9 });
  renderSection('en');

  const secondary = await screen.findByText(/^≈ ₡/);
  expect(secondary).toHaveClass('price-display__secondary');
  expect(secondary.textContent).toBe(`≈ ₡${(usd * 500).toLocaleString('en-US')}`);
  expect(screen.getByText(new RegExp(String.raw`From \$${usd} per night`))).toBeInTheDocument();
});

test('Spanish leads with estimated colones and keeps the dollar price beneath', async () => {
  stubFetch({ CRC: 500, EUR: 0.9 });
  renderSection('es');

  expect(await screen.findByText(/^Desde ≈ ₡/)).toBeInTheDocument();
  const secondary = screen.getByText(`$${usd}`);
  expect(secondary).toHaveClass('price-display__secondary');
});

test('German leads with estimated euros, dollars beneath, no colones', async () => {
  stubFetch({ CRC: 500, EUR: 0.9 });
  renderSection('de');

  expect(await screen.findByText(new RegExp(String.raw`^Ab ≈ ${Math.round(usd * 0.9)}\s€`))).toBeInTheDocument();
  expect(screen.getByText(new RegExp(String.raw`^${usd}\s\$$`))).toHaveClass('price-display__secondary');
  expect(screen.queryByText(/₡/)).not.toBeInTheDocument();
});

test('shows the plain dollar price when no rate is available', async () => {
  stubFetch(null);
  renderSection('es');

  expect(await screen.findByText(new RegExp(String.raw`^Desde \$${usd}`))).toBeInTheDocument();
  expect(screen.queryByText(/≈/)).not.toBeInTheDocument();
});

// Lirio has no static fallback price (its rates live only in Smoobu): the
// headline must come from the live calendar or not render at all.
describe('property without a static fallback price (Lirio)', () => {
  test('shows no headline price while the calendar is unreachable', async () => {
    stubFetch({ CRC: 500, EUR: 0.9 });
    render(<PriceConfirmationSection propertyKey="Lirio" locale="en" />);

    // The rest of the section still renders.
    expect(await screen.findByText('non-refundable rate')).toBeInTheDocument();
    expect(screen.queryByText(/per night/)).not.toBeInTheDocument();
    expect(screen.queryByText(/\$/)).not.toBeInTheDocument();
  });

  test('shows the live lowest rate from /api/calendar/Lirio', async () => {
    const requested: string[] = [];
    global.fetch = jest.fn(async (url: unknown) => {
      const href = String(url);
      requested.push(href);
      if (href.includes('/api/calendar/Lirio')) {
        const month = new URL(href, 'http://x').searchParams.get('month')!;
        // Every day of the month at $64 — whichever days fall in the 30-day
        // window, the lowest is $64.
        const days = Array.from({ length: 31 }, (_, i) => ({
          date: `${month}-${String(i + 1).padStart(2, '0')}`,
          available: true,
          priceCents: 6400,
          minStay: 1,
        }));
        return new Response(
          JSON.stringify({ property: { slug: 'Lirio' }, month, currency: 'USD', days, stats: { availableNightCount: 31, minPriceCents: 6400, maxPriceCents: 6400, averagePriceCents: 6400 } }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      throw new Error('offline');
    }) as unknown as typeof fetch;

    render(<PriceConfirmationSection propertyKey="Lirio" locale="en" />);

    expect(await screen.findByText(/From \$64 per night/)).toBeInTheDocument();
    expect(requested.some((href) => href.includes('/api/calendar/Lirio?'))).toBe(true);
  });
});
