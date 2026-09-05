import type { Page } from '@playwright/test';
import { test, expect } from './fixtures/base.fixture';
import { bookingWidget, calendar } from './helpers/selectors';

/**
 * Booking Search Widget E2E tests.
 *
 * Uses the `appPage` fixture so cookie consent is already dismissed and
 * API mocks are active before every test.
 *
 * The BookingSearchWidget appears on listing pages (e.g. `/en/geco`) and
 * contains:
 *   - A CalendarWithPriceDots day-cell grid for picking check-in/check-out
 *     (no `<input>` — the two-tap picker replaced the original date-input
 *     design; see selectDateRange below for how to drive it)
 *   - Guest count with increment / decrement buttons (minimum 1)
 *   - A submit button that navigates to `/en/book` (or `/es/book`) with
 *     query params: arrivalDate, departureDate, guests, autoSearch
 *
 * Validates: Requirements 7.1, 7.2, 7.3, 7.4
 */

/**
 * Today in Costa Rica time, computed the same way the app itself does
 * (src/utils/dates.ts's getCostaRicaToday) so the month-navigation math
 * below always agrees with which month the calendar actually opens on.
 */
function costaRicaToday(): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Costa_Rica',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const byType = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return { year: Number(byType.year), month: Number(byType.month), day: Number(byType.day) };
}

/** Days from today, as a YYYY-MM-DD string — always computed fresh so the
 *  test never goes stale the way a hardcoded date eventually does. */
function daysFromToday(days: number): string {
  const today = costaRicaToday();
  const date = new Date(Date.UTC(today.year, today.month - 1, today.day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/**
 * Drives the two-tap CalendarWithPriceDots picker to select a check-in and
 * check-out date. The calendar opens on the current month and shows one
 * month per screen, so this clicks "next month" however many times are
 * needed to reach each date's month before clicking its day cell.
 */
async function selectDateRange(page: Page, checkIn: string, checkOut: string): Promise<void> {
  const today = costaRicaToday();
  const [ciYear, ciMonth, ciDay] = checkIn.split('-').map(Number);
  const [coYear, coMonth, coDay] = checkOut.split('-').map(Number);

  const monthsToCheckIn = (ciYear - today.year) * 12 + (ciMonth - today.month);
  for (let i = 0; i < monthsToCheckIn; i++) {
    await calendar.nextMonthButton(page).click();
  }
  await calendar.dayCell(page, ciDay).click();

  const monthsCheckInToCheckOut = (coYear - ciYear) * 12 + (coMonth - ciMonth);
  for (let i = 0; i < monthsCheckInToCheckOut; i++) {
    await calendar.nextMonthButton(page).click();
  }
  await calendar.dayCell(page, coDay).click();
}

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

    await appPage.goto('/en/geco');
  });

  test('filling in dates and guests and submitting navigates to /book with correct query params', async ({ appPage }) => {
    // Requirement 7.1 — Filling in check-in, check-out, and guest count
    // then submitting navigates to the booking page with correct query params.

    // Comfortably in the future relative to whenever this test actually
    // runs, rather than a hardcoded date that eventually becomes past-dated.
    const checkIn = daysFromToday(30);
    const checkOut = daysFromToday(35);

    await selectDateRange(appPage, checkIn, checkOut);

    // Decrease guests from default (5 for Geco) to 4. Geco's maxGuests is 5
    // (PROPERTY_CAPACITY in src/utils/constants.ts), so the increment button
    // is disabled at the default and clicking it would hang forever waiting
    // for a state change that can't happen — decrementing is the only
    // direction with headroom regardless of which property this ever runs
    // against.
    await bookingWidget.decreaseGuests(appPage).click();

    await bookingWidget.submitButton(appPage).click();

    // Wait for navigation to the booking page
    await appPage.waitForURL(/\/en\/book\?/);

    const url = new URL(appPage.url());
    expect(url.pathname).toBe('/en/book');
    expect(url.searchParams.get('arrivalDate')).toBe(checkIn);
    expect(url.searchParams.get('departureDate')).toBe(checkOut);
    expect(url.searchParams.get('guests')).toBe('4');
  });

  test('submitting without a check-in date shows a validation error', async ({ appPage }) => {
    // Requirement 7.2 — Submitting the widget without a check-in date
    // displays a validation error message.

    // The two-tap calendar always assigns the first click to check-in
    // (handleCalendarSelect in BookingSearchWidget.component.tsx starts a
    // new range whenever arrivalDate is empty), so there is no way to pick
    // a check-out date without one — leaving the calendar untouched and
    // submitting straight away is the only way to reach this validation
    // state now.
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
    // Default guest count on the /Geco listing page is 5 (property guestNumber),
    // which is also Geco's maxGuests cap (PROPERTY_CAPACITY in
    // src/utils/constants.ts) — the increment button is disabled right at the
    // default, so decrement once first to free up headroom before testing
    // that increment moves the count up by one.
    const guestCount = appPage.locator('.booking-search-widget__guest-count');
    await expect(guestCount).toContainText('5');

    await bookingWidget.decreaseGuests(appPage).click();
    await expect(guestCount).toContainText('4');

    await bookingWidget.increaseGuests(appPage).click();

    await expect(guestCount).toContainText('5');
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
