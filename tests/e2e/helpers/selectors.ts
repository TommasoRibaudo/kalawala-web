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

/** Navigation bar selectors */
export const nav = {
  bar: (page: Page): Locator => page.getByRole('navigation'),
  homeLink: (page: Page): Locator => page.getByRole('link', { name: 'Home' }),
  availabilityLink: (page: Page): Locator =>
    page.getByRole('link', { name: 'Availability' }),
  photosLink: (page: Page): Locator =>
    page.getByRole('link', { name: 'Photos' }),
  contactLink: (page: Page): Locator =>
    page.getByRole('link', { name: 'Contact' }),
  blogLink: (page: Page): Locator =>
    page.getByRole('link', { name: 'Blog' }),
  hamburgerToggle: (page: Page): Locator =>
    page.getByRole('button', { name: /Toggle navigation/i }),
  languageSwitcherEN: (page: Page): Locator =>
    page.getByRole('button', { name: /Switch language to Español/i }),
  languageSwitcherES: (page: Page): Locator =>
    page.getByRole('button', { name: /Switch language to English/i }),
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

/** Booking search widget selectors */
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
