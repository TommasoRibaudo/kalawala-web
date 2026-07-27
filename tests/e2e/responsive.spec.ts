import { test, expect } from './fixtures/mobile.fixture';
import { nav, bookingWidget } from './helpers/selectors';

/**
 * Responsive Behavior E2E tests.
 *
 * Uses the `mobilePage` fixture (375×667 viewport, cookie consent dismissed,
 * API mocks active) for all tests.
 *
 * Validates: Requirements 12.1, 12.2, 12.3, 12.4
 */

/** Booking page URL with query params for a valid search */
const BOOKING_URL =
  '/book?arrivalDate=2028-06-15&departureDate=2028-06-20&guests=2&autoSearch=true';

test.describe('Responsive Behavior', () => {
  test('homepage at mobile viewport shows hamburger menu and hides desktop nav links', async ({
    mobilePage,
  }) => {
    // Requirement 12.1 — Key tests run at mobile (375×667) viewport
    // Requirement 12.2 — Hamburger menu is visible and desktop nav links are collapsed
    await mobilePage.goto('/');

    // The hamburger toggle should be visible at mobile viewport
    const hamburger = nav.hamburgerToggle(mobilePage);
    await expect(hamburger).toBeVisible();

    // Desktop navigation links should be collapsed (not visible) before
    // opening the hamburger menu. The Bootstrap Navbar.Collapse hides them.
    const navCollapse = mobilePage.locator('#basic-navbar-nav');
    await expect(navCollapse).not.toBeVisible();

    // Individual desktop nav links should not be visible
    await expect(nav.homeLink(mobilePage)).not.toBeVisible();
    await expect(nav.availabilityLink(mobilePage)).not.toBeVisible();
    await expect(nav.photosLink(mobilePage)).not.toBeVisible();
    await expect(nav.contactLink(mobilePage)).not.toBeVisible();
    await expect(nav.blogLink(mobilePage)).not.toBeVisible();
  });

  test('listing page at mobile viewport adapts without horizontal overflow', async ({
    mobilePage,
  }) => {
    // Requirement 12.3 — Listing page layout adapts without horizontal overflow

    // Mock the calendar API endpoint used by CalendarWithPriceDots
    await mobilePage.route('**/api/calendar/**', async (route) => {
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

    await mobilePage.goto('/Geco');

    // Wait for the page content to render
    await expect(
      mobilePage.getByRole('heading', { name: 'House Geco', level: 1 }),
    ).toBeVisible();

    // Verify no horizontal overflow: scrollWidth should not exceed clientWidth
    const hasHorizontalOverflow = await mobilePage.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });

  test('booking page at mobile viewport has visible search form fields and tappable buttons', async ({
    mobilePage,
  }) => {
    // Requirement 12.4 — Search form and results are usable on mobile
    // (fields visible, buttons tappable)
    await mobilePage.goto(BOOKING_URL);

    // Wait for the booking page to load
    await mobilePage.waitForLoadState('domcontentloaded');

    // Verify the search form fields are visible
    // The booking page may render both a desktop and compact date input;
    // on mobile only the compact variant is visible, so we assert on the
    // first visible match rather than requiring a single element.
    const checkInInputs = bookingWidget.checkInInput(mobilePage);
    const checkOutInputs = bookingWidget.checkOutInput(mobilePage);
    // At least one check-in and check-out input should be visible
    await expect(checkInInputs.first()).toBeVisible();
    await expect(checkOutInputs.first()).toBeVisible();

    // Verify the guest control buttons are visible and enabled (tappable)
    const decreaseBtn = bookingWidget.decreaseGuests(mobilePage);
    const increaseBtn = bookingWidget.increaseGuests(mobilePage);
    await expect(decreaseBtn).toBeVisible();
    await expect(increaseBtn).toBeVisible();
    await expect(decreaseBtn).toBeEnabled();
    await expect(increaseBtn).toBeEnabled();

    // Verify the submit button is visible and enabled (tappable, not clipped)
    const submitBtn = bookingWidget.submitButton(mobilePage);
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
  });
});
