// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock matchMedia and Meta Pixel for tests. Re-applied in beforeEach, not
// just once at module load: CRA's default Jest config sets `resetMocks: true`
// (node_modules/react-scripts/scripts/utils/createJestConfig.js), which
// strips every jest.fn()'s mockImplementation before *every* test — including
// the first one in a file. A one-time setup here is wiped before it's ever
// read, so any component calling `window.matchMedia(...).matches` outside a
// file that re-mocks it locally gets `undefined` back and throws. Confirmed
// via `Cannot read properties of undefined (reading 'matches')` across three
// pre-existing suites that relied solely on this file's original one-time
// setup (Phase 11 P2, 2026-08-11).
beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  Object.defineProperty(window, 'fbq', {
    writable: true,
    value: jest.fn().mockImplementation(() => {}),
  });
});

// Mock environment variables for tests
process.env.REACT_APP_META_PIXEL_ID = '1167925005402403';
process.env.REACT_APP_META_PIXEL_ENABLED = 'true';
process.env.REACT_APP_META_PIXEL_DEBUG = 'false';
process.env.REACT_APP_BOOKING_API_BASE_URL = '';
