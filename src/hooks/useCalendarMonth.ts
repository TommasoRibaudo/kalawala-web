import React from 'react';
import { BookingLanguage, CalendarMonthResponse } from '../services/BookingApi.service';
import { calendarMonthKey, loadCalendarMonth, peekCalendarMonth } from '../services/calendarMonthCache';
import { isPrerender } from '../utils/isPrerender';

interface UseCalendarMonthResult {
  data: CalendarMonthResponse | undefined;
  isLoading: boolean;
  hasError: boolean;
}

// A guest flipping quickly through months (or the anchor/anchorNext pair
// re-firing as a check-in candidate changes) would otherwise send one real
// request per month they passed through. Waiting for a short pause means
// only the month they actually land on gets fetched.
const FETCH_DEBOUNCE_MS = 200;

/**
 * Loads one month of calendar rates through the shared cache.
 *
 * `data` is read back out of the cache rather than mirrored into local state, so
 * navigating to a month that is already loaded renders it on the same tick — no
 * spinner, no refetch — and two components asking for the same month share one
 * request. Passing no `apartmentSlug` (the homepage hero, which is not scoped to
 * a property) disables fetching entirely.
 */
export function useCalendarMonth(
  apartmentSlug: string | undefined,
  month: string,
  language: BookingLanguage,
  enabled = true
): UseCalendarMonthResult {
  const key = apartmentSlug ? calendarMonthKey(apartmentSlug, language, month) : '';
  const [, markLoaded] = React.useReducer((count: number) => count + 1, 0);
  const [loadingKey, setLoadingKey] = React.useState<string | null>(null);
  const [errorKey, setErrorKey] = React.useState<string | null>(null);

  React.useEffect(() => {
    // react-snap's crawl gives this effect time to settle before it captures
    // the page (network-idle wait), so an unguarded fetch here bakes whatever
    // it resolved to — including an error state once the crawl's own 404
    // response lands — into the static HTML. A real visitor's first paint
    // never has that: hydration then mismatches the frozen "not yet fetched"
    // render this guard preserves instead. Same pattern as isScreenSmall in
    // the listing pages and MessageTipContainer; see docs/i18n-rollout-plan.md
    // Phase 11 P2.
    if (isPrerender()) {
      return;
    }

    if (!apartmentSlug || !enabled || peekCalendarMonth(key)) {
      return;
    }

    if (typeof fetch !== 'function') {
      setErrorKey(key);
      return;
    }

    let isCancelled = false;
    setLoadingKey(key);
    setErrorKey(null);

    const timer = setTimeout(() => {
      loadCalendarMonth(apartmentSlug, month, language)
        .then(() => {
          if (!isCancelled) {
            markLoaded();
          }
        })
        .catch(() => {
          if (!isCancelled) {
            setErrorKey(key);
          }
        })
        .finally(() => {
          if (!isCancelled) {
            setLoadingKey((current) => (current === key ? null : current));
          }
        });
    }, FETCH_DEBOUNCE_MS);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [apartmentSlug, month, language, enabled, key]);

  // Read straight from the cache on every render rather than memoising. Another
  // component may have populated this key between renders — that is the whole
  // point of sharing the cache — and a memo keyed on (key, version) would pin
  // the `undefined` captured before that happened. `markLoaded` exists purely to
  // schedule a re-render once an async load lands.
  const data = key ? peekCalendarMonth(key) : undefined;

  return { data, isLoading: loadingKey === key, hasError: errorKey === key };
}

export default useCalendarMonth;
