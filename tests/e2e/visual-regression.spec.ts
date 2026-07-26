import { test, expect } from './fixtures/base.fixture';
import {
  test as mobileTest,
  expect as mobileExpect,
} from './fixtures/mobile.fixture';
import { setupVisualMocks } from './helpers/visual-mocks';

/**
 * Visual regression tests for the key booking entry points.
 *
 * These snapshots are intentionally maintained for the `chromium` project
 * only. The broader suite still runs across multiple browser projects for
 * functional coverage, but image baselines become noisy when mixed across
 * rendering engines and live remote assets.
 */

const SCREENSHOT_OPTIONS = { maxDiffPixelRatio: 0.002 };

test.describe('Visual Regression', () => {
  test.beforeEach(async ({ appPage }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'chromium',
      'Visual baselines are maintained for the chromium project only.',
    );
    await setupVisualMocks(appPage);
  });

  test.describe('Desktop (1280x720)', () => {
    test.beforeEach(async ({ appPage }) => {
      await appPage.setViewportSize({ width: 1280, height: 720 });
    });

    test('homepage visual snapshot', async ({ appPage }) => {
      await appPage.goto('/');
      await appPage.waitForLoadState('networkidle');

      await expect(appPage).toHaveScreenshot(
        'homepage-desktop.png',
        SCREENSHOT_OPTIONS,
      );
    });

    test('listing page visual snapshot', async ({ appPage }) => {
      await appPage.route('**/api/calendar/**', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            month: '2025-07',
            days: [],
            stats: { availableNightCount: 0, averagePriceCents: 0 },
          }),
        });
      });

      await appPage.goto('/Geco');
      await appPage.waitForLoadState('networkidle');

      await expect(appPage).toHaveScreenshot(
        'listing-geco-desktop.png',
        SCREENSHOT_OPTIONS,
      );
    });

    test('booking search page visual snapshot', async ({ appPage }) => {
      await appPage.goto('/book');
      await appPage.waitForLoadState('networkidle');

      await expect(appPage).toHaveScreenshot(
        'booking-search-desktop.png',
        SCREENSHOT_OPTIONS,
      );
    });
  });

  mobileTest.describe('Mobile (375x667)', () => {
    mobileTest.beforeEach(async ({ mobilePage }, testInfo) => {
      mobileTest.skip(
        testInfo.project.name !== 'chromium',
        'Visual baselines are maintained for the chromium project only.',
      );
      await setupVisualMocks(mobilePage);
    });

    mobileTest('homepage visual snapshot', async ({ mobilePage }) => {
      await mobilePage.goto('/');
      await mobilePage.waitForLoadState('networkidle');

      await mobileExpect(mobilePage).toHaveScreenshot(
        'homepage-mobile.png',
        SCREENSHOT_OPTIONS,
      );
    });
  });
});
