import { test, expect } from './fixtures/base.fixture';
import { nav } from './helpers/selectors';
import { RELEASED_LOCALES } from '../../src/i18n/locales';

/**
 * Language Switching E2E tests.
 *
 * Phase 7 replaced the binary EN/ES toggle button with a combo box (a native
 * <select>, aria-label "Select language") listing every RELEASED_LOCALES
 * entry. Selecting an option navigates via routes.config's pathInLocale,
 * preserving query/hash, falling back to that locale's home only if the
 * current page has no counterpart.
 *
 * Path mapping (Phase 4 — path-prefix scheme, English home keeps bare `/`):
 *   `/`          ↔ `/es/`
 *   `/en/geco`   ↔ `/es/geco`
 *
 * Validates: Requirements 5.1, 5.2, 5.3
 */
test.describe('Language Switching', () => {
  test('switching language on "/" navigates to "/es/"', async ({ appPage }) => {
    // Requirement 5.1 — Activating the Language_Switcher on the English
    // homepage navigates to the Spanish homepage.
    await appPage.goto('/');

    await nav.languageSwitcherDesktop(appPage).selectOption('es');

    await appPage.waitForURL('**/es/');
    expect(appPage.url()).toContain('/es/');
  });

  test('switching language on a Spanish page navigates to the English equivalent', async ({ appPage }) => {
    // Requirement 5.2 — Activating the Language_Switcher on a Spanish page
    // navigates to the corresponding English page.
    await appPage.goto('/es/');

    await nav.languageSwitcherDesktop(appPage).selectOption('en');

    // /es/ → / (the root English homepage)
    await appPage.waitForURL(/\/$/);
    expect(appPage.url()).toMatch(/localhost:\d+\/$/);
  });

  test('switching language on "/en/geco" navigates to "/es/geco"', async ({ appPage }) => {
    // Requirement 5.3 — Activating the Language_Switcher on an English
    // Listing_Page navigates to the Spanish variant, not that locale's home.
    await appPage.goto('/en/geco');

    await nav.languageSwitcherDesktop(appPage).selectOption('es');

    await appPage.waitForURL('**/es/geco');
    expect(appPage.url()).toContain('/es/geco');
  });

  test('the select shows the current locale and every released option', async ({ appPage }) => {
    await appPage.goto('/en/geco');

    const select = nav.languageSwitcherDesktop(appPage);
    await expect(select).toHaveValue('en');

    const optionValues = await select.locator('option').evaluateAll(
      (options) => options.map((o) => (o as HTMLOptionElement).value),
    );
    expect(optionValues.sort()).toEqual([...RELEASED_LOCALES].sort());
  });

  test('a stored preference is honoured landing on the locale-less root', async ({ appPage }) => {
    // Requirement: "persist the choice and honour it on next visit". Simulate
    // a returning visitor who picked Spanish last time by seeding
    // localStorage directly, then landing fresh on `/` — the one page in
    // this site's URL scheme with no explicit locale of its own.
    await appPage.addInitScript(() => {
      localStorage.setItem('kalawala_locale_preference', 'es');
    });

    await appPage.goto('/');

    await appPage.waitForURL('**/es/');
    expect(appPage.url()).toContain('/es/');
  });

  test('an explicit locale URL is never overridden by a stored preference', async ({ appPage }) => {
    // Phase 11 P2: landing directly on /en/geco used to get silently bounced
    // to a stored /es/ preference — confusing for anyone who followed a link,
    // bookmark, or search result straight to an English page. The URL is a
    // locale selection in its own right and must win.
    await appPage.addInitScript(() => {
      localStorage.setItem('kalawala_locale_preference', 'es');
    });

    await appPage.goto('/en/geco');

    // Give the redirect a chance to fire if the fix regressed, rather than
    // asserting on the very first paint.
    await appPage.waitForTimeout(500);
    expect(appPage.url()).toContain('/en/geco');
  });
});
