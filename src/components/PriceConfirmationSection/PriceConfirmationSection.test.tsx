import { render, screen } from '@testing-library/react';
import PriceConfirmationSection from './PriceConfirmationSection.component';
import { resetCalendarMonthCache } from '../../services/calendarMonthCache';
import { resetExchangeRateStore } from '../../services/exchangeRateStore';
import { PROPERTY_MARKETING_CONFIG } from '../../utils/constants';
import type { Locale } from '../../i18n';

const originalFetch = global.fetch;
const usd = PROPERTY_MARKETING_CONFIG.Rana.price.usd;

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
