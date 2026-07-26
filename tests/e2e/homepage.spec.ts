import { test, expect } from './fixtures/base.fixture';
import { nav } from './helpers/selectors';

/**
 * Homepage E2E tests.
 *
 * Uses the `appPage` fixture so cookie consent is already dismissed and
 * API mocks are active before every test.
 *
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4
 */
test.describe('Homepage', () => {
  test('English homepage renders with navigation bar visible', async ({ appPage }) => {
    await appPage.goto('/');

    // Requirement 3.1 — Navigation bar is visible on the English homepage
    await expect(nav.bar(appPage)).toBeVisible();
  });

  test('Spanish homepage renders with navigation bar visible', async ({ appPage }) => {
    await appPage.goto('/HomeES');

    // Requirement 3.2 — Navigation bar is visible on the Spanish homepage
    await expect(nav.bar(appPage)).toBeVisible();
  });

  test('hero section is visible on homepage load', async ({ appPage }) => {
    await appPage.goto('/');

    // Requirement 3.3 — The WelcomeSlider / hero section is visible.
    // The hero section is a <section> with class "hero-area" containing an <h1>.
    const heroSection = appPage.locator('section.hero-area');
    await expect(heroSection).toBeVisible();
    await expect(heroSection.locator('h1')).toBeVisible();
  });

  test('OurHomes section is visible and contains property cards', async ({ appPage }) => {
    await appPage.goto('/');

    // Requirement 3.4 — The OurHomes property listing section is visible
    // and contains property cards.
    const ourHomesSection = appPage.locator('#house-list');
    await expect(ourHomesSection).toBeVisible();

    // Verify the section heading is present
    await expect(ourHomesSection.getByRole('heading', { level: 2 })).toBeVisible();

    // Verify at least one property card is rendered
    const propertyCards = ourHomesSection.locator('.home-card-item');
    await expect(propertyCards.first()).toBeVisible();
    expect(await propertyCards.count()).toBeGreaterThan(0);
  });
});
