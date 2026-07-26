import { test as base, Page } from '@playwright/test';
import { setupApiMocks } from '../helpers/api-mocks';

type CustomFixtures = {
  /** Page with cookie consent already dismissed and API mocks active */
  appPage: Page;
};

export const test = base.extend<CustomFixtures>({
  appPage: async ({ page }, use) => {
    // Set up API mocks before any navigation
    await setupApiMocks(page);

    // Dismiss cookie consent by setting localStorage before page load.
    // Structure must match CookieConsentService.ConsentState exactly:
    //   status: 'accepted' | 'rejected', version: '1.0', timestamp: number
    await page.addInitScript(() => {
      localStorage.setItem('cookie_consent', JSON.stringify({
        status: 'accepted',
        preferences: { analytics: false, marketing: false, functional: true },
        timestamp: Date.now(),
        version: '1.0',
      }));
    });

    await use(page);
  },
});

export { expect } from '@playwright/test';
