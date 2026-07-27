/**
 * Currency formatting shared by the booking engine.
 *
 * Everything is quoted and charged in USD. Left to its defaults, `es-CR`
 * disambiguates a non-local currency as "USD 74,00" — jarring next to the
 * "$74.00" the English pages show for the very same night — so the narrow
 * symbol is requested explicitly. Costa Rica's own colón keeps its own ₡, so
 * there is no ambiguity to reintroduce.
 */

type BookingLocale = 'en' | 'es';

export function formatBookingMoney(
  amountCents: number,
  currency: string,
  language: BookingLocale,
  options: { hideZeroCents?: boolean } = {}
): string {
  const locale = language === 'es' ? 'es-CR' : 'en-US';
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
