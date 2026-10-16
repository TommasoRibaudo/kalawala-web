import React from 'react';
import {
  ExchangeRateSnapshot,
  getExchangeRateSnapshot,
  loadExchangeRate,
  subscribeToExchangeRate,
} from '../services/exchangeRateStore';

/**
 * Reads the shared USD display rates (colones, and euros where the API has
 * them), kicking off the one fetch that fills them if nobody has yet.
 *
 * `enabled` is what keeps a context that must not fetch — the react-snap
 * crawl — from requesting a rate. Callers render nothing until `status` is
 * `'ready'` — a price with no estimate beside it is the correct fallback, so
 * there is no loading state to display. Most callers want `useDisplayRates`,
 * which already applies that gate and returns plain numbers.
 */
export function useExchangeRate(enabled: boolean): ExchangeRateSnapshot {
  const snapshot = React.useSyncExternalStore(
    subscribeToExchangeRate,
    getExchangeRateSnapshot,
    getExchangeRateSnapshot
  );

  React.useEffect(() => {
    if (enabled) {
      loadExchangeRate();
    }
  }, [enabled]);

  return snapshot;
}

export default useExchangeRate;
