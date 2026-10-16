/**
 * Currency formatting shared by the booking engine.
 *
 * Everything is quoted and charged in USD; colones and euros are display-only
 * estimates (see `localizePrice`). Left to its defaults, `es-CR`
 * disambiguates a non-local currency as "USD 74,00" — jarring next to the
 * "$74.00" the English pages show for the very same night — so the narrow
 * symbol is requested explicitly. Costa Rica's own colón keeps its own ₡, so
 * there is no ambiguity to reintroduce.
 */

import { intlLocaleTag, Locale } from '../i18n/locales';

type BookingLocale = Locale;

/**
 * Colón amounts are rounded to the nearest 100 before display.
 *
 * The conversion is an estimate off a daily reference rate, so quoting
 * "₡378.941" implies a precision that does not exist and invites a guest to
 * transfer exactly that and wonder why it did not match. ₡378.900 reads as the
 * approximation it is.
 */
const COLONES_DISPLAY_ROUNDING = 100;

export function formatBookingMoney(
  amountCents: number,
  currency: string,
  language: BookingLocale,
  options: { hideZeroCents?: boolean } = {}
): string {
  const locale = intlLocaleTag(language);
  const fractionDigits = options.hideZeroCents && amountCents % 100 === 0 ? 0 : 2;
  const base: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  };

  try {
    // `currencyDisplay: 'narrowSymbol'` is ES2020; older engines throw RangeError.
    return new Intl.NumberFormat(locale, { ...base, currencyDisplay: 'narrowSymbol' }).format(
      amountCents / 100
    );
  } catch {
    return new Intl.NumberFormat(locale, base).format(amountCents / 100);
  }
}

/** Colones for a USD amount, rounded to the precision an estimate deserves. */
export function convertUsdCentsToColones(amountUsdCents: number, colonesPerDollar: number): number {
  const colones = (amountUsdCents / 100) * colonesPerDollar;
  return Math.round(colones / COLONES_DISPLAY_ROUNDING) * COLONES_DISPLAY_ROUNDING;
}

/**
 * A USD amount rendered in colones — "₡378.900".
 *
 * Decimals are dropped outright: a hundred-colón rounding step makes céntimos
 * meaningless, and nothing in Costa Rica is priced in them anyway.
 */
export function formatColones(
  amountUsdCents: number,
  colonesPerDollar: number,
  language: BookingLocale
): string {
  return formatColonesAmount(convertUsdCentsToColones(amountUsdCents, colonesPerDollar), language, 0);
}

/** The rate itself — "₡512,35" — for the line explaining where the estimate came from. */
export function formatExchangeRate(colonesPerDollar: number, language: BookingLocale): string {
  return formatColonesAmount(colonesPerDollar, language, 2);
}

function formatColonesAmount(colones: number, language: BookingLocale, fractionDigits: number): string {
  const locale = intlLocaleTag(language);
  const base: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'CRC',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  };

  try {
    return new Intl.NumberFormat(locale, { ...base, currencyDisplay: 'narrowSymbol' }).format(colones);
  } catch {
    return new Intl.NumberFormat(locale, base).format(colones);
  }
}

/** Euro amounts are rounded to the whole euro — see `localizePrice`. */
export function convertUsdCentsToEuros(amountUsdCents: number, eurosPerDollar: number): number {
  return Math.round((amountUsdCents / 100) * eurosPerDollar);
}

// ---------------------------------------------------------------------------
// Per-language price presentation
// ---------------------------------------------------------------------------

export type DisplayCurrency = 'USD' | 'CRC' | 'EUR';

/**
 * Which currency leads the price in each language. The other figure is the
 * smaller one beneath it: dollars under colones/euros, colones under dollars.
 *
 * Spanish leads with colones (the local reader), German/French/Italian/Dutch
 * with euros, everything else — English included — with dollars. Portuguese is
 * a euro-zone language too but was not asked for; moving it is a one-word
 * change here.
 */
const PRIMARY_CURRENCY: Record<Locale, DisplayCurrency> = {
  en: 'USD',
  es: 'CRC',
  de: 'EUR',
  fr: 'EUR',
  it: 'EUR',
  pt: 'USD',
  he: 'USD',
  hi: 'USD',
  nl: 'EUR',
};

export function primaryCurrencyFor(language: Locale): DisplayCurrency {
  return PRIMARY_CURRENCY[language];
}

/** Units of each display currency per one US dollar; null while unknown. */
export interface DisplayRates {
  crcPerUsd: number | null;
  eurPerUsd: number | null;
}

export const NO_DISPLAY_RATES: DisplayRates = { crcPerUsd: null, eurPerUsd: null };

export interface PriceFigure {
  text: string;
  /** ISO code. A home quoted outside the three display currencies keeps its own. */
  currency: string;
  /** Converted from USD at a reference rate, so shown with a leading "≈". */
  estimate: boolean;
}

export interface LocalizedPrice {
  primary: PriceFigure;
  secondary: PriceFigure | null;
}

/**
 * A USD amount as the language's lead figure plus its smaller companion.
 *
 * Dollars are the only figure that is ever exact — they are what is charged —
 * so a language that leads with colones or euros marks that lead as an
 * estimate. When the rate for the preferred lead has not arrived (or its source
 * is down), the price falls back to dollars alone rather than leading with a
 * number that might be wrong; a missing estimate is invisible, a wrong one is
 * a support ticket.
 *
 * A home quoted in anything other than dollars is formatted as-is: converting
 * it with a USD rate would be silently wrong.
 */
export function localizePrice(
  amountCents: number,
  currency: string,
  language: Locale,
  rates: DisplayRates,
  options: { hideZeroCents?: boolean } = {}
): LocalizedPrice {
  const usd: PriceFigure = {
    text: formatBookingMoney(amountCents, currency, language, options),
    currency,
    estimate: false,
  };

  if (currency !== 'USD') {
    return { primary: usd, secondary: null };
  }

  const colones: PriceFigure | null =
    rates.crcPerUsd !== null
      ? {
          text: formatColones(amountCents, rates.crcPerUsd, language),
          currency: 'CRC',
          estimate: true,
        }
      : null;
  const euros: PriceFigure | null =
    rates.eurPerUsd !== null
      ? {
          text: formatEurosAmount(convertUsdCentsToEuros(amountCents, rates.eurPerUsd), language),
          currency: 'EUR',
          estimate: true,
        }
      : null;

  switch (primaryCurrencyFor(language)) {
    case 'CRC':
      return colones ? { primary: colones, secondary: usd } : { primary: usd, secondary: null };
    case 'EUR':
      return euros ? { primary: euros, secondary: usd } : { primary: usd, secondary: null };
    default:
      return { primary: usd, secondary: colones };
  }
}

/** The euro rate itself — "0,8649 €" — for the line explaining where the estimate came from. */
export function formatEuroRate(eurosPerDollar: number, language: Locale): string {
  const locale = intlLocaleTag(language);
  const base: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  };

  try {
    return new Intl.NumberFormat(locale, { ...base, currencyDisplay: 'narrowSymbol' }).format(eurosPerDollar);
  } catch {
    return new Intl.NumberFormat(locale, base).format(eurosPerDollar);
  }
}

function formatEurosAmount(euros: number, language: Locale): string {
  const locale = intlLocaleTag(language);
  const base: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  try {
    return new Intl.NumberFormat(locale, { ...base, currencyDisplay: 'narrowSymbol' }).format(euros);
  } catch {
    return new Intl.NumberFormat(locale, base).format(euros);
  }
}
