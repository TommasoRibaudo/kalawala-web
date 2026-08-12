import { test, expect } from './fixtures/base.fixture';
import { test as mobileTest } from './fixtures/mobile.fixture';
import { nav, bookingCtaBanner } from './helpers/selectors';

/**
 * Navigation E2E tests.
 *
 * Desktop tests use the `appPage` fixture (cookie consent dismissed, API
 * mocks active). The mobile hamburger test uses the `mobilePage` fixture
 * which additionally sets the viewport to 375×667.
 *
 * The nav bar itself is now just Home / Blog / My Booking / WhatsApp —
 * "Availability", "Photos" and "Contact" were removed from it before
 * Footer (2026-07-28) landed. Their underlying sections/CTAs still exist
 * on the homepage, just reached by scrolling or a different CTA rather
 * than a nav-bar anchor link, so they're covered below by testing those
 * directly instead of a nav click that no longer exists.
 *
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5, 4.6
 */
test.describe('Navigation', () => {
  test('clicking "Home" link navigates to the homepage body section', async ({ appPage }) => {
    await appPage.goto('/');

    // Requirement 4.1 — Clicking "Home" scrolls to or navigates to the
    // homepage body section (the #body wrapper).
    await nav.homeLink(appPage).click();

    // The Home link targets /#body — verify the body section is visible
    const bodySection = appPage.locator('#body');
    await expect(bodySection).toBeVisible();
  });

  test('clicking the "Check availability" CTA banner navigates to the booking page', async ({ appPage }) => {
    await appPage.goto('/');

    // Requirement 4.2 (superseded) — the nav bar no longer has a dedicated
    // "Availability" link; BookingCtaBanner is the closest current
    // equivalent, a repeated mid-page conversion CTA that now navigates
    // straight to the booking page instead of scrolling to an on-page
    // section.
    await bookingCtaBanner.link(appPage).click();

    await appPage.waitForURL('**/en/book');
    expect(new URL(appPage.url()).pathname).toBe('/en/book');
  });

  test('the portfolio section is present on the homepage', async ({ appPage }) => {
    await appPage.goto('/');

    // Requirement 4.3 (superseded) — "Photos" is no longer a nav link, but
    // the section it used to jump to still renders on the homepage.
    const portfolioSection = appPage.locator('#portfolio');
    await portfolioSection.scrollIntoViewIfNeeded();
    await expect(portfolioSection).toBeVisible();
  });

  test('the contact section is present on the homepage', async ({ appPage }) => {
    await appPage.goto('/');

    // Requirement 4.4 (superseded) — same as Photos above: "Contact" is no
    // longer a nav link, but ContactUs still renders on the homepage.
    const contactSection = appPage.locator('#contact-us');
    await contactSection.scrollIntoViewIfNeeded();
    await expect(contactSection).toBeVisible();
  });

  test('clicking "Blog" link navigates to the blog index', async ({ appPage }) => {
    await appPage.goto('/');

    // Requirement 4.5 — Clicking "Blog" navigates to the blog index page.
    await nav.blogLink(appPage).click();

    await appPage.waitForURL('**/en/blog');
    expect(new URL(appPage.url()).pathname).toBe('/en/blog');
  });
});

/**
 * Mobile navigation test using the mobilePage fixture (375×667 viewport).
 *
 * Validates: Requirement 4.6
 */
mobileTest.describe('Navigation — Mobile', () => {
  mobileTest('hamburger menu toggle is visible and opens the nav menu when clicked', async ({ mobilePage }) => {
    await mobilePage.goto('/');

    // Requirement 4.6 — At mobile viewport the hamburger toggle is visible
    // and clicking it reveals the navigation links.
    const hamburger = nav.hamburgerToggle(mobilePage);
    await expect(hamburger).toBeVisible();

    // The Bootstrap Navbar.Collapse should be hidden before clicking
    const navCollapse = mobilePage.locator('#basic-navbar-nav');
    await expect(navCollapse).not.toBeVisible();

    // Click the hamburger to open the menu
    await hamburger.click();

    // After clicking, the nav collapse should be visible with nav links
    await expect(navCollapse).toBeVisible();
    await expect(nav.homeLink(mobilePage)).toBeVisible();
    await expect(nav.blogLink(mobilePage)).toBeVisible();
    await expect(nav.myBookingLink(mobilePage)).toBeVisible();
    await expect(nav.whatsAppLink(mobilePage)).toBeVisible();
  });
});
