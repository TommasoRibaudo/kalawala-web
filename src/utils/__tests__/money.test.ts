import {
  convertUsdCentsToColones,
  convertUsdCentsToEuros,
  formatColones,
  formatEuroRate,
  formatExchangeRate,
  localizePrice,
  NO_DISPLAY_RATES,
  primaryCurrencyFor,
} from '../money';

const RATE = 512.35;

describe('convertUsdCentsToColones', () => {
  test('converts a dollar total at the given rate', () => {
    // $510.00 × 512.35 = ₡261,298.50
    expect(convertUsdCentsToColones(51_000, RATE)).toBe(261_300);
  });

  test('rounds to the nearest hundred colones so the figure reads as an estimate', () => {
    expect(convertUsdCentsToColones(7_400, RATE)).toBe(37_900); // ₡37,913.90
    expect(convertUsdCentsToColones(100, RATE)).toBe(500); // ₡512.35
  });

  test('handles a zero total without producing -0 or NaN', () => {
    expect(convertUsdCentsToColones(0, RATE)).toBe(0);
  });
});

describe('formatColones', () => {
  test('drops decimals the hundred-colón rounding already made meaningless', () => {
    expect(formatColones(51_000, RATE, 'es')).toBe('₡261 300');
  });

  test('uses the same symbol on English pages, where colones sit beneath the dollar figure', () => {
    expect(formatColones(51_000, RATE, 'en')).toBe('₡261,300');
  });
});

describe('formatExchangeRate', () => {
  test('keeps the two decimals the rate is published with', () => {
    expect(formatExchangeRate(RATE, 'es')).toBe('₡512,35');
  });
});

describe('convertUsdCentsToEuros', () => {
  test('rounds to the whole euro, since cents on a converted figure would be false precision', () => {
    expect(convertUsdCentsToEuros(51_000, 0.92)).toBe(469); // €469.20
    expect(convertUsdCentsToEuros(12_750, 0.92)).toBe(117); // €117.30
  });

  test('handles a zero total', () => {
    expect(convertUsdCentsToEuros(0, 0.92)).toBe(0);
  });
});

describe('formatEuroRate', () => {
  test('keeps up to four decimals so a 0.8649 rate is not shown as 0.86', () => {
    expect(formatEuroRate(0.8649, 'en')).toBe('€0.8649');
    expect(formatEuroRate(0.92, 'en')).toBe('€0.92');
  });
});

describe('primaryCurrencyFor', () => {
  test.each([
    ['en', 'USD'],
    ['es', 'CRC'],
    ['de', 'EUR'],
    ['fr', 'EUR'],
    ['it', 'EUR'],
    ['nl', 'EUR'],
  ] as const)('%s leads with %s', (language, expected) => {
    expect(primaryCurrencyFor(language)).toBe(expected);
  });
});

describe('localizePrice', () => {
  const RATES = { crcPerUsd: RATE, eurPerUsd: 0.92 };

  test('English leads with exact dollars and shows an estimated colón figure beneath', () => {
    const price = localizePrice(51_000, 'USD', 'en', RATES);
    expect(price.primary).toEqual({ text: '$510.00', currency: 'USD', estimate: false });
    expect(price.secondary).toEqual({ text: '₡261,300', currency: 'CRC', estimate: true });
  });

  test('Spanish leads with estimated colones and keeps exact dollars beneath', () => {
    const price = localizePrice(51_000, 'USD', 'es', RATES);
    // es-CR groups thousands with a non-breaking space.
    expect(price.primary).toEqual({ text: '₡261 300', currency: 'CRC', estimate: true });
    expect(price.secondary).toEqual({ text: '$510,00', currency: 'USD', estimate: false });
  });

  test.each(['de', 'fr', 'it', 'nl'] as const)('%s leads with estimated euros and keeps exact dollars beneath', (language) => {
    const price = localizePrice(51_000, 'USD', language, RATES);
    expect(price.primary.currency).toBe('EUR');
    expect(price.primary.estimate).toBe(true);
    expect(price.primary.text).toContain('469');
    expect(price.secondary?.currency).toBe('USD');
    expect(price.secondary?.estimate).toBe(false);
    // Colones are not shown to euro readers.
    expect(JSON.stringify(price)).not.toContain('₡');
  });

  test('every language shows dollars somewhere', () => {
    for (const language of ['en', 'es', 'de', 'fr', 'it', 'pt', 'he', 'hi', 'nl'] as const) {
      const price = localizePrice(51_000, 'USD', language, RATES);
      const currencies = [price.primary.currency, price.secondary?.currency];
      expect(currencies).toContain('USD');
    }
  });

  test('without any rate, every language falls back to dollars alone', () => {
    for (const language of ['en', 'es', 'de', 'fr', 'it'] as const) {
      const price = localizePrice(51_000, 'USD', language, NO_DISPLAY_RATES);
      expect(price.primary.currency).toBe('USD');
      expect(price.primary.estimate).toBe(false);
      expect(price.secondary).toBeNull();
    }
  });

  test('a euro language with no euro rate does not substitute colones', () => {
    const price = localizePrice(51_000, 'USD', 'de', { crcPerUsd: RATE, eurPerUsd: null });
    expect(price.primary.currency).toBe('USD');
    expect(price.secondary).toBeNull();
  });

  test('English without a colón rate shows dollars alone', () => {
    const price = localizePrice(51_000, 'USD', 'en', { crcPerUsd: null, eurPerUsd: 0.92 });
    expect(price.primary.text).toBe('$510.00');
    expect(price.secondary).toBeNull();
  });

  test('never converts a price that is not in dollars', () => {
    const price = localizePrice(51_000, 'EUR', 'es', RATES);
    expect(price.primary.currency).toBe('EUR');
    expect(price.primary.estimate).toBe(false);
    expect(price.primary.text).toContain('510');
    expect(price.secondary).toBeNull();
  });

  test('can drop trailing zero cents for headline prices', () => {
    expect(localizePrice(9_500, 'USD', 'en', NO_DISPLAY_RATES, { hideZeroCents: true }).primary.text).toBe('$95');
  });
});
