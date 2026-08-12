import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RELEASED_LOCALES, isLocale, type Locale } from './locales';
import { useLocale } from './useLocale';
import { pathInLocale } from '../routes.config';

/**
 * Phase 7 of docs/i18n-rollout-plan.md: "persist the choice and honour it on
 * next visit, but never auto-redirect a search-engine crawler based on it —
 * the URL is always authoritative."
 *
 * localStorage carries the preference across browser sessions (the actual
 * "next visit" signal). sessionStorage is a one-shot guard so the redirect
 * fires once per browser tab, not on every in-app navigation — without it,
 * a visitor who explicitly clicked an English link would get bounced back to
 * their old Spanish preference the moment FixedNavigation (which isn't a
 * single root layout — every page mounts its own copy) remounts on the next
 * page. A fresh crawler visit has no localStorage entry, so this never fires
 * for one; that's what makes the URL stay authoritative without any
 * crawler-detection logic of its own.
 *
 * Phase 11 P2, 2026-08-11: the redirect used to fire on *any* page whose
 * locale differed from the stored preference, including a URL that already
 * names an explicit locale — visiting `/he/...` directly in a browser that
 * previously picked Italian silently served Italian instead of Hebrew, with
 * no visible sign why. Narrowed to only fire when the current URL carries no
 * explicit locale at all (this site's URL scheme has exactly one such page:
 * the bare English root, `/` — every other page is `/xx/...`). An explicit
 * `/xx/...` URL — typed, bookmarked, linked, or clicked from search results —
 * is itself a locale selection and now always wins over a stored one.
 */

const PREFERENCE_KEY = 'kalawala_locale_preference';
const APPLIED_THIS_SESSION_KEY = 'kalawala_locale_preference_applied';

export function persistLocalePreference(locale: Locale): void {
  try {
    localStorage.setItem(PREFERENCE_KEY, locale);
  } catch {
    // Private browsing / storage disabled — the switcher still works, it
    // just won't be remembered next visit.
  }
}

function readLocalePreference(): Locale | null {
  try {
    const value = localStorage.getItem(PREFERENCE_KEY);
    return value && (RELEASED_LOCALES as readonly string[]).includes(value) ? (value as Locale) : null;
  } catch {
    return null;
  }
}

/**
 * Redirects once per tab, on mount, to the stored locale preference — but
 * only from a URL with no explicit locale of its own (the bare root, `/`).
 * A URL that already names a locale is left alone even if it differs from
 * the stored preference. Call from a component every page renders
 * (FixedNavigation) — the sessionStorage guard makes repeat mounts a no-op.
 */
export function useApplyStoredLocalePreference(): void {
  const locale = useLocale();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (sessionStorage.getItem(APPLIED_THIS_SESSION_KEY)) return;
      sessionStorage.setItem(APPLIED_THIS_SESSION_KEY, '1');
    } catch {
      // No sessionStorage — fall through without the guard rather than never
      // honouring the preference at all.
    }

    // An explicit locale in the URL is itself a selection — never override
    // it with a stored preference from a previous visit. Only a URL with no
    // locale segment (this site's URL scheme has exactly one: the bare
    // English root, `/`) means the visitor hasn't chosen a language yet.
    const firstSegment = location.pathname.split('/')[1];
    if (isLocale(firstSegment)) return;

    const preferred = readLocalePreference();
    if (!preferred || preferred === locale) return;

    const target = pathInLocale(location.pathname, preferred);
    if (!target) return; // No counterpart for this page in that locale — stay put.

    navigate({ pathname: target, search: location.search, hash: location.hash }, { replace: true });
    // Intentionally runs once per mount, not on every location change — this
    // is a "which language did the visitor pick last time" check for the
    // start of a visit, not a rule that fights normal in-app navigation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
