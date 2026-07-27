import { test as base, expect } from '@playwright/test';
import { test } from './fixtures/base.fixture';
import { cookieBanner } from './helpers/selectors';
import { setupApiMocks } from './helpers/api-mocks';

/**
 * Cookie Consent Banner E2E Tests
 *
 * Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5
 *
 * Tests that use the raw `page` (no prior consent) set up API mocks
 * manually to prevent external network calls. The test verifying that
 * the banner does NOT appear uses the `appPage` fixture, which injects
 * consent into localStorage before navigation.
 */

base.describe('Cookie Consent Banner', () => {
  // -----------------------------------------------------------------------
  // Tests using raw `page` (no prior consent — banner should be visible)
  // -----------------------------------------------------------------------

  base('banner is visible on first load with no prior consent', async ({ page }) => {
    await setupApiMocks(page);
    await page.goto('/');

    const dialog = cookieBanner.dialog(page);
    await expect(dialog).toBeVisible();
    await expect(cookieBanner.acceptButton(page)).toBeVisible();
    await expect(cookieBanner.rejectButton(page)).toBeVisible();
    // Scope Options button within the dialog to avoid matching review cards
    await expect(dialog.getByRole('button', { name: 'Options' })).toBeVisible();
  });

  base('clicking "Accept" dismisses the banner', async ({ page }) => {
    await setupApiMocks(page);
    await page.goto('/');

    await expect(cookieBanner.dialog(page)).toBeVisible();
    await cookieBanner.acceptButton(page).click();
    await expect(cookieBanner.dialog(page)).not.toBeVisible();
  });

  base('clicking "Reject" dismisses the banner', async ({ page }) => {
    await setupApiMocks(page);
    await page.goto('/');

    await expect(cookieBanner.dialog(page)).toBeVisible();
    await cookieBanner.rejectButton(page).click();
    await expect(cookieBanner.dialog(page)).not.toBeVisible();
  });

  base('clicking "Options" reveals Essential, Analytics, and Marketing toggles', async ({ page }) => {
    await setupApiMocks(page);
    await page.goto('/');

    const dialog = cookieBanner.dialog(page);
    await expect(dialog).toBeVisible();
    // Scope Options button within the dialog to avoid matching review cards
    await dialog.getByRole('button', { name: 'Options' }).click();

    // Verify the three preference toggles are visible within the dialog
    await expect(dialog.getByText('Essential')).toBeVisible();
    await expect(dialog.getByText('Analytics')).toBeVisible();
    await expect(dialog.getByText('Marketing')).toBeVisible();
  });

  // -----------------------------------------------------------------------
  // Test using `appPage` fixture (consent already stored in localStorage)
  // -----------------------------------------------------------------------

  test('banner does not appear when consent is already stored in localStorage', async ({ appPage }) => {
    await appPage.goto('/');

    // The appPage fixture injects cookie_consent into localStorage,
    // so the banner should not be rendered at all.
    await expect(cookieBanner.dialog(appPage)).not.toBeVisible();
  });
});
