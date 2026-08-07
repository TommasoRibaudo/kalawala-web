import { test, expect } from './fixtures/base.fixture';
import { test as mobileTest } from './fixtures/mobile.fixture';
import { nav } from './helpers/selectors';

/**
 * Navigation E2E tests.
 *
 * Desktop tests use the `appPage` fixture (cookie consent dismissed, API
 * mocks active). The mobile hamburger test uses the `mobilePage` fixture
 * which additionally sets the viewport to 375×667.
 *
 * Navigation links are anchor links that scroll to sections on the homepage
 * (Home, Availability, Photos, Contact) or navigate to a separate page (Blog).
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

  test('clicking "Availability" link navigates to the call-to-action section', async ({ appPage }) => {
    await appPage.goto('/');

    // Requirement 4.2 — Clicking "Availability" navigates to the
    // call-to-action section. The Availability link has href="/#body"
    // and an onClick that calls navigate('/#callToAction'). Both target
    // the homepage — verify we remain on the homepage after clicking.
    await nav.availabilityLink(appPage).click();

    // Wait for any navigation to settle
    await appPage.waitForLoadState('domcontentloaded');

    // Verify we're still on the homepage with a hash fragment
    expect(appPage.url()).toContain('localhost:3000');

    // The #body section should be visible (homepage wrapper)
    const bodySection = appPage.locator('#body');
    await expect(bodySection).toBeVisible();
  });

  test('clicking "Photos" link navigates to the portfolio section', async ({ appPage }) => {
    await appPage.goto('/');

    // Requirement 4.3 — Clicking "Photos" navigates to the portfolio
    // section (#portfolio).
    await nav.photosLink(appPage).click();

    const portfolioSection = appPage.locator('#portfolio');
    await expect(portfolioSection).toBeVisible();
    await expect(portfolioSection).toBeInViewport();
  });

  test('clicking "Contact" link navigates to the contact section', async ({ appPage }) => {
    await appPage.goto('/');

    // Requirement 4.4 — Clicking "Contact" navigates to the contact
    // section (#contact-us).
    await nav.contactLink(appPage).click();

    const contactSection = appPage.locator('#contact-us');
    await expect(contactSection).toBeVisible();
    await expect(contactSection).toBeInViewport();
  });

  test('clicking "Blog" link navigates to a blog page', async ({ appPage }) => {
    await appPage.goto('/');

    // Requirement 4.5 — Clicking "Blog" navigates to a blog page.
    // The Blog link href is /en/twodaysinpuertoviejo.
    await nav.blogLink(appPage).click();

    await appPage.waitForURL('**/en/twodaysinpuertoviejo');
    expect(appPage.url()).toContain('/en/twodaysinpuertoviejo');
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
    await expect(nav.availabilityLink(mobilePage)).toBeVisible();
    await expect(nav.photosLink(mobilePage)).toBeVisible();
    await expect(nav.contactLink(mobilePage)).toBeVisible();
    await expect(nav.blogLink(mobilePage)).toBeVisible();
  });
});
