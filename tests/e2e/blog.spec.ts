import { test, expect } from './fixtures/base.fixture';
import { nav } from './helpers/selectors';

/**
 * Blog page E2E tests.
 *
 * Uses the `appPage` fixture so cookie consent is already dismissed and
 * API mocks are active before every test.
 *
 * Validates: Requirements 10.1, 10.2, 10.3
 */
test.describe('Blog', () => {
  test('English blog page loads with blog content and navigation bar visible', async ({ appPage }) => {
    await appPage.goto('/twodaysinpuertoviejo');

    // Requirement 10.1 — Blog content and navigation bar are visible
    await expect(nav.bar(appPage)).toBeVisible();

    // Verify the blog heading is rendered
    await expect(
      appPage.getByRole('heading', { level: 1, name: '2 Days One Night in Puerto Viejo' }),
    ).toBeVisible();

    // Verify blog body content is present
    const blogContent = appPage.locator('.description');
    await expect(blogContent).toBeVisible();
  });

  test('Spanish blog page loads with Spanish-language blog content', async ({ appPage }) => {
    await appPage.goto('/twodaysinpuertoviejoES');

    // Requirement 10.2 — Spanish-language blog content is displayed
    await expect(nav.bar(appPage)).toBeVisible();

    // Verify the Spanish blog heading is rendered
    await expect(
      appPage.getByRole('heading', { level: 1, name: '2 Días y Una Noche en Puerto Viejo' }),
    ).toBeVisible();

    // Verify blog body content is present
    const blogContent = appPage.locator('.description');
    await expect(blogContent).toBeVisible();
  });

  test('blog page has correct document title', async ({ appPage }) => {
    await appPage.goto('/twodaysinpuertoviejo');

    // Requirement 10.3 — Page title is set correctly via Helmet
    await expect(appPage).toHaveTitle('2 Days One Night in Puerto Viejo');
  });
});
