/**
 * Delfin Routing Integration Tests
 *
 * Integration tests for Delfin routing functionality
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ROUTES, pathForKey } from '../../routes.config';

// Mock the validation function to prevent actual validation during tests
jest.mock('../../utils/runPixelValidation', () => ({
  validatePixelImplementation: jest.fn().mockResolvedValue({
    overall: { success: true, message: 'Mock validation passed' }
  }),
}));

// Mock Meta Pixel to prevent actual tracking during tests
beforeEach(() => {
  const mockFbq = jest.fn();
  window.fbq = mockFbq;
  window.fbq.queue = [];
  window.fbq.loaded = true;
  window.fbq.version = '2.0';

  // Mock environment variables
  process.env.REACT_APP_META_PIXEL_ID = '1167925005402403';
  process.env.REACT_APP_META_PIXEL_ENABLED = 'true';
  process.env.REACT_APP_META_PIXEL_DEBUG = 'false';

  // Mock IntersectionObserver
  global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

// Simple test component to verify routing
const SimpleTestComponent = ({ name }: { name: string }) => (
  <div data-testid="test-component">{name} Component Loaded</div>
);

// Test Router Component for isolated testing. PHASE 4: routes are
// /:locale/slug, with English home as the one bare-root exception.
const TestRouter = ({ initialRoute }: { initialRoute: string }) => (
  <MemoryRouter initialEntries={[initialRoute]}>
    <Routes>
      <Route path="/" element={<SimpleTestComponent name="Home" />} />
      <Route path="/en/delfin" element={<SimpleTestComponent name="Delfin" />} />
      <Route path="/es/delfin" element={<SimpleTestComponent name="DelfinES" />} />
      <Route path="/en/rana" element={<SimpleTestComponent name="Rana" />} />
    </Routes>
  </MemoryRouter>
);

describe('Delfin Routing Integration Tests', () => {
  describe('Navigation to /en/delfin route', () => {
    test('should navigate to /en/delfin route and load English component', () => {
      const { getByTestId } = render(<TestRouter initialRoute="/en/delfin" />);

      expect(getByTestId('test-component')).toBeInTheDocument();
      expect(getByTestId('test-component')).toHaveTextContent('Delfin Component Loaded');
    });
  });

  describe('Navigation to /es/delfin route', () => {
    test('should navigate to /es/delfin route and load Spanish component', () => {
      const { getByTestId } = render(<TestRouter initialRoute="/es/delfin" />);

      expect(getByTestId('test-component')).toBeInTheDocument();
      expect(getByTestId('test-component')).toHaveTextContent('DelfinES Component Loaded');
    });
  });

  describe('Route consistency and patterns', () => {
    test('should follow consistent routing patterns with existing properties', () => {
      // Test that Delfin routes follow the same pattern as other properties:
      // lowercase slug, locale prefix, no locale-specific casing.
      const englishRoutes = ['/en/geco', '/en/rana', '/en/tucano', '/en/pappagallo', '/en/delfin'];
      const spanishRoutes = ['/es/geco', '/es/rana', '/es/tucano', '/es/pappagallo', '/es/delfin'];

      englishRoutes.forEach(route => {
        expect(route).toMatch(/^\/en\/[a-z]+$/);
      });

      spanishRoutes.forEach(route => {
        expect(route).toMatch(/^\/es\/[a-z]+$/);
      });
    });

    test('should handle invalid routes gracefully', () => {
      const { container } = render(<TestRouter initialRoute="/InvalidRoute" />);

      // Should not crash on invalid routes - will show blank page
      expect(container).toBeInTheDocument();
    });
  });

  describe('Integration with existing system', () => {
    test('should maintain router functionality for existing routes', () => {
      const { getByTestId } = render(<TestRouter initialRoute="/en/rana" />);

      expect(getByTestId('test-component')).toBeInTheDocument();
      expect(getByTestId('test-component')).toHaveTextContent('Rana Component Loaded');
    });

    test('should not interfere with home page routing', () => {
      const { getByTestId } = render(<TestRouter initialRoute="/" />);

      expect(getByTestId('test-component')).toBeInTheDocument();
      expect(getByTestId('test-component')).toHaveTextContent('Home Component Loaded');
    });
  });

  describe('Router configuration verification', () => {
    // PHASE 4: Router.tsx no longer contains any literal route path — every
    // page is declared once in routes.config.ts and Router.tsx generates
    // <Route> elements from it. Source-text matching against Router.tsx (the
    // previous version of these tests) broke for exactly that reason: there
    // is no more `path='/Delfin'` string to find. Assert against
    // routes.config.ts's actual data instead, which is both the real source
    // of truth now and more robust to future refactors of Router.tsx itself.
    test('should verify Delfin is declared once and shares one component across locales', () => {
      expect(ROUTES.delfin).toBeDefined();
      expect(ROUTES.delfin.chunk).toBe('route-delfin');
      // One component reference for both locales — this is what makes a
      // second lazy import unnecessary (and the merged-chunk fallback that
      // used to compensate for a duplicate import obsolete, see
      // inject-route-preloads.js's routeToChunk comment).
      expect(ROUTES.delfin.slugs.en).toBe('delfin');
      expect(ROUTES.delfin.slugs.es).toBe('delfin');
    });

    test('should resolve Delfin to the correct locale-prefixed path', () => {
      expect(pathForKey('delfin', 'en')).toBe('/en/delfin');
      expect(pathForKey('delfin', 'es')).toBe('/es/delfin');
    });

    test('should verify Delfin has a loader entry in routes.config.ts, and that lazy() is gone entirely', () => {
      // routes.config.ts is where every page's dynamic import now lives
      // (Router.tsx just renders <RouteLoader routeKey={key} />), so that's
      // the file whose source text is meaningful to assert against.
      //
      // Hydration cause #3 fix (docs/i18n-rollout-plan.md, Phase 11 P2):
      // React.lazy()/<Suspense> can't hydrate cleanly against react-snap's
      // marker-less prerendered output, so LOADERS + routeLoader.tsx's plain
      // promise-based loader replaced them — see routeLoader.tsx's header
      // comment for the full account. Asserting the `lazy` import from
      // 'react' is entirely gone (not just checking for the new pattern),
      // so a future partial revert can't silently reintroduce a stray
      // lazy() call with nothing here to catch it. Matching the import
      // rather than the bare word "lazy" on purpose — this file's own
      // comments explain the removal by name ("React.lazy()"), and without
      // the import, lazy(...) isn't a callable identifier here regardless.
      const fs = require('fs');
      const path = require('path');
      const routesConfigPath = path.join(__dirname, '../../routes.config.ts');
      const routesConfigContent = fs.readFileSync(routesConfigPath, 'utf8');

      expect(routesConfigContent).toMatch(
        /delfin:\s*\(\)\s*=>\s*import\([^)]*'\.\/pages\/Listing\/staticPages\/ListingDelfin\.page'\)/
      );
      expect(routesConfigContent).not.toMatch(/import\s*\{[^}]*\blazy\b[^}]*\}\s*from\s*'react'/);
      // Phase 3b merged the Spanish page into the English one, so there is no
      // longer a separate ListingDelfinES binding — both routes render the
      // same loaded component and the locale comes from the URL.
      expect(routesConfigContent).not.toMatch(/const ListingDelfinES\s*=/);
    });
  });
});
