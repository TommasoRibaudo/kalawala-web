import { Page, Locator } from '@playwright/test';

/**
 * Accessible selector helpers for Playwright E2E tests.
 *
 * Selectors prefer `getByRole`, `getByLabel`, and `getByText` to stay
 * resilient against CSS refactors and to encourage accessible markup.
 *
 * Where an element lacks sufficient accessible attributes, a CSS / id
 * fallback is used and marked with an "Accessibility gap" comment so the
 * gap can be addressed in the component source.
 *
 * Validates: Requirements 13.1, 13.2
 */

// ---------------------------------------------------------------------------
// Navigation bar
// ---------------------------------------------------------------------------

/**
 * Navigation bar selectors.
 *
 * Scoped to `nav.bar(page)` rather than the whole page: Footer
 * (added 2026-07-28) renders its own "our homes" property list and a
 * "Check availability" CTA link, both of which collide with an unscoped
 * `getByRole('link', { name: 'Home' | 'Availability' })` — e.g. "Home"
 * alone matched 14 elements page-wide (homepage property cards whose
 * accessible name happens to contain "home"). The current nav bar itself
 * only has four links — Home, Blog, My Booking, WhatsApp — "Availability",
 * "Photos" and "Contact" were removed from it at some point before Footer
 * landed; see navigation.spec.ts for the replacement coverage of those
 * removed items' underlying sections/CTAs.
 */
export const nav = {
  bar: (page: Page): Locator => page.getByRole('navigation'),
  homeLink: (page: Page): Locator =>
    nav.bar(page).getByRole('link', { name: 'Home', exact: true }),
  blogLink: (page: Page): Locator =>
    nav.bar(page).getByRole('link', { name: 'Blog', exact: true }),
  myBookingLink: (page: Page): Locator =>
    nav.bar(page).getByRole('link', { name: /my booking|mi reserva/i }),
  whatsAppLink: (page: Page): Locator =>
    nav.bar(page).getByRole('link', { name: 'WhatsApp', exact: true }),
  hamburgerToggle: (page: Page): Locator =>
    page.getByRole('button', { name: /Toggle navigation/i }),
  // Phase 7's combo box renders twice in the DOM — a desktop copy inside
  // .navbar-flag and a mobile copy inside .mobile-flag, one hidden by CSS
  // depending on viewport. A bare aria-label locator would match both and
  // throw a strict-mode violation, so these are scoped to their container.
  languageSwitcherDesktop: (page: Page): Locator =>
    page.locator('.navbar-flag .language-switcher-select'),
  languageSwitcherMobile: (page: Page): Locator =>
    page.locator('.mobile-flag .language-switcher-select'),
};

/**
 * "Check availability" appears in three places on the homepage — the hero
 * search widget's own submit button (not this), a repeated mid-page CTA
 * banner (BookingCtaBanner), and the Footer's CTA column. Scoped to
 * `.booking-cta-banner` specifically so tests target one deliberate,
 * predictable instance rather than whichever one `getByRole` happens to
 * match `.first()`.
 */
export const bookingCtaBanner = {
  link: (page: Page): Locator =>
    page.locator('.booking-cta-banner').getByRole('link'),
};

// ---------------------------------------------------------------------------
// Cookie consent banner
// ---------------------------------------------------------------------------

/** Cookie consent banner selectors */
export const cookieBanner = {
  dialog: (page: Page): Locator =>
    page.getByRole('dialog', { name: /cookies/i }),
  acceptButton: (page: Page): Locator =>
    page.getByRole('button', { name: 'Accept' }),
  rejectButton: (page: Page): Locator =>
    page.getByRole('button', { name: 'Reject' }),
  optionsButton: (page: Page): Locator =>
    page.getByRole('button', { name: 'Options' }),
  saveButton: (page: Page): Locator =>
    page.getByRole('button', { name: 'Save' }),
  cancelButton: (page: Page): Locator =>
    page.getByRole('button', { name: 'Cancel' }),
};

// ---------------------------------------------------------------------------
// Booking search widget
// ---------------------------------------------------------------------------

/**
 * Booking search widget selectors.
 *
 * checkInInput/checkOutInput target the standalone `/en/book` search page,
 * which still has real labeled date inputs. The listing-page sidebar widget
 * (BookingSearchWidget, e.g. on `/en/geco`) does not — it picks dates via
 * CalendarWithPriceDots, a clickable day-cell grid with no `<input>` at
 * all. Use `calendar` below for that variant instead of these two.
 */
export const bookingWidget = {
  checkInInput: (page: Page): Locator =>
    page.getByLabel(/check-in|llegada/i),
  checkOutInput: (page: Page): Locator =>
    page.getByLabel(/check-out|salida/i),
  decreaseGuests: (page: Page): Locator =>
    page.getByRole('button', { name: /decrease guests|menos huéspedes/i }),
  increaseGuests: (page: Page): Locator =>
    page.getByRole('button', { name: /increase guests|más huéspedes/i }),
  submitButton: (page: Page): Locator =>
    page.getByRole('button', {
      name: /search availability|buscar disponibilidad/i,
    }),
};

/**
 * CalendarWithPriceDots — the day-cell grid picker used by the listing-page
 * sidebar BookingSearchWidget in place of a plain date input. Opens on the
 * month containing "today", one month per screen; navigate forward with
 * `nextMonthButton` before clicking a day in a later month. Each visible
 * month renders every day number 0-31 at most once, so `dayCell` doesn't
 * need to disambiguate beyond scoping to the grid.
 */
export const calendar = {
  nextMonthButton: (page: Page): Locator =>
    page.getByRole('button', { name: /next month|mes siguiente/i }),
  dayCell: (page: Page, day: number): Locator =>
    page
      .locator('.calendar-with-price-dots__grid .calendar-date-cell')
      .filter({
        has: page.locator('.calendar-date-cell__number', {
          hasText: new RegExp(`^${day}$`),
        }),
      }),
};

// ---------------------------------------------------------------------------
// Guest portal
// ---------------------------------------------------------------------------

/**
 * Guest portal selectors.
 *
 * The portal form fields use React Bootstrap `controlId` which generates
 * matching `id` + `<label htmlFor>` pairs. `getByLabel` works for the
 * English labels; the id-based fallback covers both languages reliably.
 */
export const portal = {
  // Accessibility gap: the portal form labels are language-dependent and the
  // `controlId` attribute is the most stable anchor. Ideally these inputs
  // would carry an explicit `aria-label` that works across languages.
  reservationIdInput: (page: Page): Locator =>
    page.locator('#portalReservationId'),
  passwordInput: (page: Page): Locator =>
    page.locator('#portalPassword'),
  submitButton: (page: Page): Locator =>
    page.getByRole('button', {
      name: /sign in|iniciar sesión|submit/i,
    }),
};

// ---------------------------------------------------------------------------
// Booking flow
// ---------------------------------------------------------------------------

/**
 * Booking flow selectors.
 *
 * The step indicator `<nav>` has an accessible `aria-label`, so we can
 * target it with `getByRole`. The remaining containers (search form,
 * results section, checkout form) rely on CSS class selectors because
 * they lack semantic roles or aria attributes.
 */
export const bookingFlow = {
  stepIndicator: (page: Page): Locator =>
    page.getByRole('navigation', { name: 'Booking progress' }),

  // Accessibility gap: `.booking-search-header` has no landmark role or
  // aria-label. Consider wrapping in a <section> with an aria-label.
  searchForm: (page: Page): Locator =>
    page.locator('.booking-search-header').first(),

  // Accessibility gap: results section is identified only by
  // `[aria-hidden="false"]`. A dedicated landmark or aria-label would
  // improve discoverability.
  resultsSection: (page: Page): Locator =>
    page.locator('[aria-hidden="false"]'),

  // Accessibility gap: the active checkout slide uses a CSS modifier class
  // with no corresponding ARIA role. Consider adding role="form" or an
  // aria-label to the active slide.
  checkoutForm: (page: Page): Locator =>
    page.locator('.booking-wizard-slide--active'),
};
