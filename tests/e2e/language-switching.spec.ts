import { test, expect } from './fixtures/base.fixture';
import { nav } from './helpers/selectors';

/**
 * Language Switching E2E tests.
 *
 * The LanguageSwitcher component renders a `<button>` with an `aria-label`
 * of "Switch language to Español" (on English pages) or "Switch language to
 * English" (on Spanish pages). Clicking it calls `navigate()` with the
 * alternate-language path while preserving query/hash state.
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

    await nav.languageSwitcherEN(appPage).click();

    await appPage.waitForURL('**/es/');
    expect(appPage.url()).toContain('/es/');
  });

  test('switching language on a Spanish page navigates to the English equivalent', async ({ appPage }) => {
    // Requirement 5.2 — Activating the Language_Switcher on a Spanish page
    // navigates to the corresponding English page.
    await appPage.goto('/es/');

    await nav.languageSwitcherES(appPage).click();

    // /es/ → / (the root English homepage)
    await appPage.waitForURL(/\/$/);
    expect(appPage.url()).toMatch(/localhost:\d+\/$/);
  });

  test('switching language on "/en/geco" navigates to "/es/geco"', async ({ appPage }) => {
    // Requirement 5.3 — Activating the Language_Switcher on an English
    // Listing_Page navigates to the Spanish variant.
    await appPage.goto('/en/geco');

    await nav.languageSwitcherEN(appPage).click();

    await appPage.waitForURL('**/es/geco');
    expect(appPage.url()).toContain('/es/geco');
  });
});
