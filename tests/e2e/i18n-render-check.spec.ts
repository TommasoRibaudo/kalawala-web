import { test, expect } from './fixtures/mobile.fixture';
import { test as desktopTest, expect as desktopExpect } from './fixtures/base.fixture';
import { setupVisualMocks } from './helpers/visual-mocks';
import { RELEASED_LOCALES, LOCALE_META, type Locale } from '../../src/i18n/locales';

/**
 * i18n content audit — Phase 6 rendered-page spot check
 * (docs/i18n-content-audit/plan.md).
 *
 * Phases 1-5 audited source data — does the right text exist, is it
 * translated correctly. None of that catches a layout break that only shows
 * up once real (possibly much longer/shorter, possibly RTL) text is actually
 * rendered. This asserts the one thing that's cheaply checkable at scale
 * across all 9 locales: no page pushes the document wider than its viewport
 * at mobile width, where overflow bites hardest.
 *
 * Deliberately NOT exhaustive over all 21 content pages x 9 locales (189
 * combinations) — a curated sample of pages chosen for being the longest/
 * most content-dense per property or article type, run across every
 * released locale. Text-overflow/ellipsis truncation (as opposed to
 * page-level horizontal overflow) isn't caught by this check; that needs
 * visual review — see docs/i18n-content-audit/render-check/ for the
 * screenshot-based spot check that covers it for the highest-risk locale
 * (Hebrew, RTL).
 */

const CALENDAR_MOCK_BODY = JSON.stringify({
  month: '2025-07',
  days: [],
  stats: { availableNightCount: 0, averagePriceCents: 0 },
});

async function mockCalendarApi(page: import('@playwright/test').Page): Promise<void> {
  await page.route('**/api/calendar/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: CALENDAR_MOCK_BODY,
    });
  });
}

/** English slugs — every non-en/es locale falls back to these (routes.config.ts's pathForKey). */
const SAMPLE_PAGES: { label: string; slug: string | null }[] = [
  { label: 'home', slug: null },
  { label: 'geco', slug: 'geco' },
  { label: 'rana', slug: 'rana' },
  { label: 'delfin', slug: 'delfin' },
  { label: 'villacoral', slug: 'villacoral' },
  { label: 'tenhoursinpuerto', slug: 'tenhoursinpuerto' },
  { label: 'bushours', slug: 'bushours' },
  { label: 'indigenoustravelpv', slug: 'indigenoustravelpv' },
];

function pathFor(locale: Locale, slug: string | null): string {
  if (slug === null) return locale === 'en' ? '/' : `/${locale}/`;
  return `/${locale}/${slug}`;
}

test.describe('i18n rendered-page overflow check (Phase 6)', () => {
  test.beforeEach(async ({ mobilePage }, testInfo) => {
    // Single browser is enough signal for a layout-overflow spot check —
    // running all 5 configured projects would multiply 72 checks by 5 for no
    // extra coverage (overflow is a rendering-engine-agnostic CSS question).
    test.skip(
      testInfo.project.name !== 'chromium',
      'Overflow spot check runs on chromium only — see file header comment.',
    );
    await mobilePage.clock.setFixedTime(new Date('2025-07-15T12:00:00Z'));
    await setupVisualMocks(mobilePage);
    await mockCalendarApi(mobilePage);
  });

  for (const locale of RELEASED_LOCALES) {
    for (const page of SAMPLE_PAGES) {
      test(`${page.label} (${locale}) has no horizontal overflow at 375px`, async ({ mobilePage }) => {
        await mobilePage.goto(pathFor(locale, page.slug));
        await mobilePage.waitForLoadState('networkidle');

        const hasOverflow = await mobilePage.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
        );
        expect(hasOverflow, `${page.label} (${locale}) overflows horizontally at 375px width`).toBe(false);
      });
    }
  }
});

test.describe('Hebrew RTL sanity (Phase 6)', () => {
  test.beforeEach(async ({ mobilePage }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'RTL sanity check runs on chromium only.');
    await mobilePage.clock.setFixedTime(new Date('2025-07-15T12:00:00Z'));
    await setupVisualMocks(mobilePage);
    await mockCalendarApi(mobilePage);
  });

  for (const page of SAMPLE_PAGES) {
    test(`${page.label} (he) sets dir="rtl" and has no horizontal overflow at 375px`, async ({ mobilePage }) => {
      await mobilePage.goto(pathFor('he', page.slug));
      await mobilePage.waitForLoadState('networkidle');

      await expect(mobilePage.locator('html')).toHaveAttribute('dir', 'rtl');

      const hasOverflow = await mobilePage.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(hasOverflow, `${page.label} (he) overflows horizontally at 375px width`).toBe(false);
    });
  }
});

desktopTest.describe('Hebrew RTL sanity — desktop (Phase 6)', () => {
  desktopTest.beforeEach(async ({ appPage }, testInfo) => {
    desktopTest.skip(testInfo.project.name !== 'chromium', 'RTL sanity check runs on chromium only.');
    await appPage.setViewportSize({ width: 1280, height: 800 });
    await appPage.clock.setFixedTime(new Date('2025-07-15T12:00:00Z'));
    await setupVisualMocks(appPage);
    await mockCalendarApi(appPage);
  });

  for (const page of SAMPLE_PAGES) {
    desktopTest(`${page.label} (he) has no horizontal overflow at 1280px`, async ({ appPage }) => {
      await appPage.goto(pathFor('he', page.slug));
      await appPage.waitForLoadState('networkidle');

      const hasOverflow = await appPage.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      desktopExpect(hasOverflow, `${page.label} (he) overflows horizontally at 1280px width`).toBe(false);
    });
  }
});

// Sanity check on the locale set itself — if a 10th locale is ever released,
// this whole file's coverage silently degrades from "all released locales"
// to "the 9 that existed when this was written" unless something fails loudly.
test('RELEASED_LOCALES still matches the set this spot check was written for', () => {
  expect([...RELEASED_LOCALES].sort()).toEqual(
    ['en', 'es', 'de', 'fr', 'it', 'pt', 'he', 'hi', 'nl'].sort(),
  );
  expect(LOCALE_META.he.dir).toBe('rtl');
});
