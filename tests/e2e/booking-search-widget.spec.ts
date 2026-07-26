import { test, expect } from './fixtures/base.fixture';
import { bookingWidget } from './helpers/selectors';

/**
 * Booking Search Widget E2E tests.
 *
 * Uses the `appPage` fixture so cookie consent is already dismissed and
 * API mocks are active before every test.
 *
 * The BookingSearchWidget appears on listing pages (e.g. `/Geco`) and
 * contains:
 *   - Check-in date input (native `<input type="date">`)
 *   - Check-out date input (native `<input type="date">`)
 *   - Guest count with increment / decrement buttons (minimum 1)
 *   - A submit button that navigates to `/book` (or `/bookES`) with
 *     query params: arrivalDate, departureDate, guests, autoSearch
 *
 * Validates: Requirements 7.1, 7.2, 7.3, 7.4
 */
test.describe('Booking Search Widget', () => {
  test.beforeEach(async ({ appPage }) => {
    // Mock the calendar API endpoint used by CalendarWithPriceDots
    // to prevent network errors during listing page tests.
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
  });

  test('filling in dates and guests and submitting navigates to /book with correct query params', async ({ appPage }) => {
    // Requirement 7.1 — Filling in check-in, check-out, and guest count
    // then submitting navigates to the booking page with correct query params.

    // Pick dates far enough in the future to avoid "min" validation issues
    const checkIn = '2026-03-15';
    const checkOut = '2026-03-20';

    await bookingWidget.checkInInput(appPage).fill(checkIn);
    await bookingWidget.checkOutInput(appPage).fill(checkOut);

    // Increase guests from default (5 for Geco) to 6
    await bookingWidget.increaseGuests(appPage).click();

    await bookingWidget.submitButton(appPage).click();

    // Wait for navigation to the booking page
    await appPage.waitForURL(/\/book\?/);

    const url = new URL(appPage.url());
    expect(url.pathname).toBe('/book');
    expect(url.searchParams.get('arrivalDate')).toBe(checkIn);
    expect(url.searchParams.get('departureDate')).toBe(checkOut);
    expect(url.searchParams.get('guests')).toBe('6');
  });

  test('submitting without a check-in date shows a validation error', async ({ appPage }) => {
    // Requirement 7.2 — Submitting the widget without a check-in date
    // displays a validation error message.

    // Leave check-in empty, fill check-out only
    await bookingWidget.checkOutInput(appPage).fill('2026-03-20');

    await bookingWidget.submitButton(appPage).click();

    // The component renders a Form.Control.Feedback with the error text
    await expect(
      appPage.getByText('Please select a check-in date.'),
    ).toBeVisible();
  });

  test('clicking the guest increment button increases the count by one', async ({ appPage }) => {
    // Requirement 7.3 — The guest increment button increases the displayed
    // guest count by one.

    // The widget renders the guest count inside a span with a user icon.
    // Default guest count on the /Geco listing page is 5 (property guestNumber).
    const guestCount = appPage.locator('.booking-search-widget__guest-count');
    await expect(guestCount).toContainText('5');

    await bookingWidget.increaseGuests(appPage).click();

    await expect(guestCount).toContainText('6');
  });

  test('clicking the guest decrement button at count 1 keeps the count at 1', async ({ appPage }) => {
    // Requirement 7.4 — The guest decrement button does not go below 1.

    const guestCount = appPage.locator('.booking-search-widget__guest-count');

    // Decrement from default (5 for Geco) down to 1
    await bookingWidget.decreaseGuests(appPage).click(); // 4
    await bookingWidget.decreaseGuests(appPage).click(); // 3
    await bookingWidget.decreaseGuests(appPage).click(); // 2
    await bookingWidget.decreaseGuests(appPage).click(); // 1
    await expect(guestCount).toContainText('1');

    // The decrement button should now be disabled at count 1
    await expect(bookingWidget.decreaseGuests(appPage)).toBeDisabled();

    // Click it anyway — count should remain at 1
    // Force-click since the button is disabled (Playwright won't click disabled by default)
    await bookingWidget.decreaseGuests(appPage).click({ force: true });
    await expect(guestCount).toContainText('1');
  });
});
