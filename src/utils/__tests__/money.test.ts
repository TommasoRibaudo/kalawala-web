import { convertUsdCentsToColones, formatColones, formatExchangeRate } from '../money';

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

  test('uses the same symbol on English pages, where the estimate is opt-in', () => {
    expect(formatColones(51_000, RATE, 'en')).toBe('₡261,300');
  });
});

describe('formatExchangeRate', () => {
  test('keeps the two decimals the rate is published with', () => {
    expect(formatExchangeRate(RATE, 'es')).toBe('₡512,35');
  });
});
