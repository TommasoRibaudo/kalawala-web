# Implementation Plan: Playwright E2E Testing

## Overview

Set up a complete Playwright E2E testing infrastructure for kalawala-web. This plan covers Playwright installation and configuration, shared fixtures and helpers, mock data, test files for all major user flows, visual regression snapshots, and CI integration via GitHub Actions. All code is TypeScript. Tests use accessible selectors and comprehensive API mocking for deterministic, offline execution.

## Tasks

- [x] 1. Install Playwright and configure project
  - [x] 1.1 Add `@playwright/test` as a devDependency and create `playwright.config.ts` at the project root
    - Install `@playwright/test` via npm
    - Create `playwright.config.ts` with Chromium, Firefox, WebKit, mobile-chrome, and mobile-safari projects
    - Configure `baseURL: 'http://localhost:3000'`, `webServer` block using `npm start`, HTML reporter, trace on first retry, screenshot on failure, video on first retry
    - Set `fullyParallel: true`, `forbidOnly` in CI, retries 2 in CI, workers 1 in CI
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
  - [x] 1.2 Add npm scripts and update `.gitignore`
    - Add `test:e2e`, `test:e2e:ui`, `test:e2e:headed`, and `test:e2e:report` scripts to `package.json`
    - Add `test-results/`, `playwright-report/`, and `blob-report/` to `.gitignore`
    - _Requirements: 1.7, 1.8_
  - [x] 1.3 Create test folder structure with placeholder files
    - Create `tests/e2e/fixtures/`, `tests/e2e/helpers/`, `tests/e2e/mocks/`, and `tests/e2e/__screenshots__/` directories
    - Add a `.gitkeep` in `tests/e2e/__screenshots__/` to preserve the directory
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 2. Implement shared fixtures, helpers, and mock data
  - [x] 2.1 Create the accessible selector helpers (`tests/e2e/helpers/selectors.ts`)
    - Define selector functions for navigation bar, cookie banner, booking widget, guest portal, and booking flow using `getByRole`, `getByLabel`, `getByText`
    - Use `data-testid` fallback only where accessible attributes are missing, with a comment documenting the gap
    - _Requirements: 13.1, 13.2_
  - [x] 2.2 Create mock data JSON fixtures in `tests/e2e/mocks/`
    - Create `availability-response.json` with two mock properties (Casa Geco, Casa Rana) including prices, amenities, and images
    - Create `hold-response.json` with mock booking session and reservation ID
    - Create `paypal-order-response.json` with mock approval URL pointing to `localhost:3000/book/return`
    - Create `paypal-capture-response.json` with confirmed booking details
    - Create `deposit-handoff-response.json` with mock bank details
    - Create `portal-login-response.json` with mock JWT token and reservation details
    - _Requirements: 14.2_
  - [x] 2.3 Create the API mock helper (`tests/e2e/helpers/api-mocks.ts`)
    - Implement `setupApiMocks(page, overrides?)` function that intercepts `/api/availability`, `/api/hold`, `/api/paypal/order`, `/api/paypal/capture`, `/api/deposit-handoff`, `/api/portal/login`
    - Stub Google Maps, reCAPTCHA, PostHog, Facebook Pixel, and Google Tag Manager requests via `route.abort()`
    - Support `MockOverrides` interface for per-test error scenario overrides
    - _Requirements: 14.1, 14.3, 14.4_
  - [x] 2.4 Create the base fixture (`tests/e2e/fixtures/base.fixture.ts`)
    - Extend Playwright `test` with a custom `appPage` fixture that calls `setupApiMocks(page)` and dismisses cookie consent via `localStorage` injection before navigation
    - Export `test` and `expect` for use by all spec files
    - _Requirements: 17.1, 17.3_
  - [x] 2.5 Create the mobile fixture (`tests/e2e/fixtures/mobile.fixture.ts`)
    - Extend the base fixture with a `mobilePage` fixture that sets viewport to 375×667 (iPhone SE)
    - _Requirements: 17.2_

- [x] 3. Checkpoint — Verify infrastructure
  - Ensure Playwright installs and the config loads without errors. Run `npx playwright test --list` to confirm test discovery works. Ask the user if questions arise.

- [x] 4. Implement cookie consent and homepage tests
  - [x] 4.1 Create `tests/e2e/cookie-consent.spec.ts`
    - Test that the cookie consent banner is visible on first load (no prior consent in localStorage)
    - Test that clicking "Accept" dismisses the banner
    - Test that clicking "Reject" dismisses the banner
    - Test that clicking "Options" reveals Essential, Analytics, and Marketing toggles
    - Test that the banner does not appear when consent is already stored in localStorage
    - Use accessible selectors from `selectors.ts` (dialog role, button names)
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_
  - [x] 4.2 Create `tests/e2e/homepage.spec.ts`
    - Use the `appPage` fixture (cookie dismissed, mocks active)
    - Test that the English homepage (`/`) renders with the navigation bar visible
    - Test that the Spanish homepage (`/HomeES`) renders with the navigation bar visible
    - Test that the hero/WelcomeSlider section is visible on homepage load
    - Test that the OurHomes property listing section is visible and contains property cards
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 5. Implement navigation and language switching tests
  - [x] 5.1 Create `tests/e2e/navigation.spec.ts`
    - Test clicking "Home" link navigates to or scrolls to the homepage body section
    - Test clicking "Availability" link navigates to the call-to-action section
    - Test clicking "Photos" link navigates to the portfolio section
    - Test clicking "Contact" link navigates to the contact section
    - Test clicking "Blog" link navigates to a blog page
    - Test that on mobile viewport (375×667), the hamburger menu toggle is visible and opens the nav menu when clicked
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_
  - [x] 5.2 Create `tests/e2e/language-switching.spec.ts`
    - Test that activating the language switcher on `/` navigates to `/HomeES`
    - Test that activating the language switcher on a Spanish page navigates to the English equivalent
    - Test that activating the language switcher on `/Geco` navigates to `/GecoES`
    - _Requirements: 5.1, 5.2, 5.3_

- [x] 6. Implement listing page and booking search widget tests
  - [x] 6.1 Create `tests/e2e/listing-page.spec.ts`
    - Test that `/Geco` loads with property name, image carousel, amenities, and booking search widget visible
    - Test that the image carousel advances when the next arrow is clicked
    - Test that the guest reviews section is present on the listing page
    - Test that `/GecoES` displays Spanish-language content
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  - [x] 6.2 Create `tests/e2e/booking-search-widget.spec.ts`
    - Test that filling in check-in, check-out, guests and submitting navigates to `/book` with correct query params
    - Test that submitting without a check-in date shows a validation error
    - Test that clicking the guest increment button increases the count by one
    - Test that clicking the guest decrement button at count 1 keeps the count at 1
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 7. Checkpoint — Verify static page tests
  - Ensure all tests pass for cookie consent, homepage, navigation, language switching, listing pages, and booking search widget. Ask the user if questions arise.

- [x] 8. Implement booking flow tests
  - [x] 8.1 Create `tests/e2e/booking-flow.spec.ts`
    - Set up API mocks for availability, hold, PayPal order, and PayPal capture endpoints
    - Test that performing a booking search with mocked results displays property cards in the results step
    - Test that the wizard step indicator reflects the current step throughout the flow (Search → Results → Checkout → Confirmation)
    - Test that selecting a property and proceeding to checkout shows the checkout form (first name, last name, email, phone, country, terms checkbox)
    - Test that filling in the checkout form and submitting with a mocked hold response makes the PayPal payment button available
    - Test that the confirmation step with a mocked capture response displays a confirmation message with a reservation ID
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [x] 9. Implement blog and guest portal tests
  - [x] 9.1 Create `tests/e2e/blog.spec.ts`
    - Test that `/twodaysinpuertoviejo` loads with blog content and navigation bar visible
    - Test that `/twodaysinpuertoviejoES` loads with Spanish-language blog content
    - Test that the blog page has a correct document title
    - _Requirements: 10.1, 10.2, 10.3_
  - [x] 9.2 Create `tests/e2e/guest-portal.spec.ts`
    - Test that `/portal` displays a login form with reservation ID and password fields
    - Test that submitting the portal login form with mocked credentials navigates to the reservation detail page
    - Test that `/portalES` displays Spanish-language labels
    - _Requirements: 11.1, 11.2, 11.3_

- [x] 10. Implement responsive behavior tests
  - [x] 10.1 Create `tests/e2e/responsive.spec.ts`
    - Use the mobile fixture (375×667 viewport)
    - Test that the homepage at mobile viewport shows the hamburger menu and hides desktop nav links
    - Test that a listing page at mobile viewport adapts without horizontal overflow
    - Test that the booking page at mobile viewport has visible search form fields and tappable buttons
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

- [x] 11. Implement visual regression tests
  - [x] 11.1 Create `tests/e2e/visual-regression.spec.ts`
    - Capture desktop (1280×720) visual snapshots for the homepage, `/Geco` listing page, and booking search page
    - Capture mobile (375×667) visual snapshot for the homepage
    - Store baselines in `tests/e2e/__screenshots__/`
    - Use `maxDiffPixelRatio: 0.002` threshold for comparison tolerance
    - Ensure cookie consent is dismissed and API mocks are active before capture
    - _Requirements: 15.1, 15.2, 15.3, 15.4_

- [x] 12. Checkpoint — Verify all test files
  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Integrate E2E tests into GitHub Actions CI workflow
  - [x] 13.1 Add `e2e-tests` job to `.github/workflows/main.yml`
    - Add a new job `e2e-tests` that runs after `typecheck` (`needs: [typecheck]`)
    - Install dependencies with `npm ci`, install Playwright Chromium with `npx playwright install --with-deps chromium`
    - Build the React app with `npm run build-local` (no react-snap) using a test reCAPTCHA site key
    - Serve the build with `npx serve -s build -l 3000` and run `npx playwright test --project=chromium`
    - Upload `playwright-report/` and `test-results/` as artifacts with 14-day retention on all outcomes (`if: always()`)
    - _Requirements: 16.1, 16.2, 16.3, 16.4_
  - [x] 13.2 Gate the deploy job on E2E test success
    - Update the `deploy` job's `needs` array to include `e2e-tests` so deployment is blocked on E2E failure
    - _Requirements: 16.5_

- [x] 14. Final checkpoint — Full suite verification
  - Ensure all tests pass and the CI workflow YAML is valid. Ask the user if questions arise.

## Notes

- This feature IS the test infrastructure — there are no property-based tests because there is no business logic to verify with PBT.
- All test files use TypeScript, matching the project's existing language.
- Each task references specific requirements for traceability.
- Checkpoints ensure incremental validation at natural breakpoints.
- The `appPage` fixture handles cookie dismissal and API mocking so individual tests stay focused on assertions.
- Visual snapshot baselines in `tests/e2e/__screenshots__/` are version-controlled; `test-results/` and `playwright-report/` are gitignored.
- In CI, the E2E job uses a pre-built static bundle served via `npx serve` instead of the CRA dev server for speed and stability.
