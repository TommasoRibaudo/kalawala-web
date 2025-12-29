// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock matchMedia for tests
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

// Mock Meta Pixel for tests
Object.defineProperty(window, 'fbq', {
  writable: true,
  value: jest.fn().mockImplementation(() => {}),
});

// Mock environment variables for tests
process.env.REACT_APP_META_PIXEL_ID = '1167925005402403';
process.env.REACT_APP_META_PIXEL_ENABLED = 'true';
process.env.REACT_APP_META_PIXEL_DEBUG = 'false';
