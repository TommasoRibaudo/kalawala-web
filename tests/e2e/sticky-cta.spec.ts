import { test, expect, devices } from '@playwright/test';

/**
 * The mobile "Check Availability" bar.
 *
 * A PostHog replay caught it laid out inline on /Tucano, halfway up the page
 * and painting over the photo gallery: that page had lost the `fixed-bottom`
 * class the other nineteen listing pages carry, and `.info .button-hold`'s
 * 50px height then clipped the button out of its own box.
 *
 * Twenty near-identical listing pages are easy to let drift apart, so this
 * checks the bar on every one of them rather than on a sample.
 */

const SLUGS = [
  'Geco',
  'Rana',
  'Tucano',
  'Pappagallo',
  'Delfin',
  'Giulia',
  'Areka',
  'Plumeria',
  'VillaCoral',
  'VillaMar',
];

test.use({ ...devices['Pixel 5'] });

const paths = ['en', 'es'].flatMap((locale) =>
  SLUGS.map((slug) => `/${locale}/${slug.toLowerCase()}`),
);

for (const path of paths) {
  test(`${path} pins the mobile CTA to the bottom of the viewport`, async ({ page }) => {
    await page.goto(path);

    const bar = page.locator('.sticky-cta-mobile');
    await expect(bar).toBeVisible();

    // Pinned, not scrolled with the document.
    await expect(bar).toHaveCSS('position', 'fixed');

    const viewport = page.viewportSize()!;
    const atTop = await bar.boundingBox();
    expect(atTop).not.toBeNull();
    expect(Math.round(atTop!.y + atTop!.height)).toBeCloseTo(viewport.height, -1);

    // The button has to fit inside the bar — the original bug was a 50px box
    // holding a ~98px button, which is what overlapped the gallery.
    const button = bar.locator('.sticky-cta-button');
    const buttonBox = (await button.boundingBox())!;
    expect(buttonBox.y).toBeGreaterThanOrEqual(atTop!.y - 1);
    expect(buttonBox.y + buttonBox.height).toBeLessThanOrEqual(
      atTop!.y + atTop!.height + 1,
    );

    // Still pinned after scrolling down the page.
    await page.evaluate(() => window.scrollBy(0, 1500));
    const afterScroll = (await bar.boundingBox())!;
    expect(Math.round(afterScroll.y)).toBe(Math.round(atTop!.y));

    // And it still points at the booking widget.
    await expect(button).toHaveAttribute('href', '#smoobuComp');
  });
}
