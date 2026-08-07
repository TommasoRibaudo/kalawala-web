import { useLocale } from '../i18n';

/**
 * @deprecated Use `useLocale()` from `src/i18n` instead.
 *
 * Kept as a thin shim so Phase 1 stays a mechanical change: its four remaining
 * callers (Portal.page, PortalDetail.page, PortalGuard, Booking.page) branch on
 * a boolean in a lot of places, and rewriting all of that belongs with the
 * message-catalog work in Phase 2 rather than here.
 *
 * The detection logic itself is gone — this now delegates to the single source
 * of truth, so it cannot drift from the rest of the app. Delete the shim once
 * those four callers move to `useLocale()`.
 */
export const useLanguageDetection = (): boolean => useLocale() === 'es';
