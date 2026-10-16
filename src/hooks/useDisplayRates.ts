import React from 'react';
import { useExchangeRate } from './useExchangeRate';
import { isPrerender } from '../utils/isPrerender';
import { DisplayRates, NO_DISPLAY_RATES } from '../utils/money';

/**
 * The colón and euro rates that `localizePrice` converts with, or "none yet".
 *
 * Every language wants them now — English shows colones beneath the dollar
 * price, the euro languages lead with euros — so the fetch is no longer gated
 * on language. It is gated on react-snap, though: the crawler saves the DOM
 * after the request settles, which would freeze one day's rate into the static
 * HTML of every listing page and then mismatch it on hydration (see
 * `utils/isPrerender.ts`). The snapshot instead carries the dollar price, which
 * is exactly what the first client render shows too.
 */
export function useDisplayRates(): DisplayRates {
  const { status, data } = useExchangeRate(!isPrerender());

  return React.useMemo(() => {
    // A rate for anything but dollars would convert every price wrongly.
    if (status !== 'ready' || !data || data.base !== 'USD') {
      return NO_DISPLAY_RATES;
    }

    const eur = data.rates?.EUR;
    return {
      crcPerUsd: data.rate,
      eurPerUsd: typeof eur === 'number' && Number.isFinite(eur) && eur > 0 ? eur : null,
    };
  }, [status, data]);
}

export default useDisplayRates;
