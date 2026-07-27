import { test as base } from './base.fixture';
import { Page } from '@playwright/test';

type MobileFixtures = {
  mobilePage: Page;
};

export const test = base.extend<MobileFixtures>({
  mobilePage: async ({ appPage }, use) => {
    await appPage.setViewportSize({ width: 375, height: 667 });
    await use(appPage);
  },
});

export { expect } from '@playwright/test';
