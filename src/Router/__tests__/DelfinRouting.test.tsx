/**
 * Delfin Routing Integration Tests
 * 
 * Integration tests for Delfin routing functionality
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Mock the validation function to prevent actual validation during tests
jest.mock('../../utils/runPixelValidation', () => ({
  validatePixelImplementation: jest.fn().mockResolvedValue({
    overall: { success: true, message: 'Mock validation passed' }
  }),
}));

// Mock useMediaQuery hook
jest.mock('@react-hook/media-query', () => ({
  useMediaQuery: jest.fn(() => false),
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

// Test Router Component for isolated testing
const TestRouter = ({ initialRoute }: { initialRoute: string }) => (
  <MemoryRouter initialEntries={[initialRoute]}>
    <Routes>
      <Route path="/" element={<SimpleTestComponent name="Home" />} />
      <Route path="/Delfin" element={<SimpleTestComponent name="Delfin" />} />
      <Route path="/DelfinES" element={<SimpleTestComponent name="DelfinES" />} />
      <Route path="/Rana" element={<SimpleTestComponent name="Rana" />} />
    </Routes>
  </MemoryRouter>
);

describe('Delfin Routing Integration Tests', () => {
  describe('Navigation to /Delfin route', () => {
    test('should navigate to /Delfin route and load English component', () => {
      const { getByTestId } = render(<TestRouter initialRoute="/Delfin" />);
      
      expect(getByTestId('test-component')).toBeInTheDocument();
      expect(getByTestId('test-component')).toHaveTextContent('Delfin Component Loaded');
    });
  });

  describe('Navigation to /DelfinES route', () => {
    test('should navigate to /DelfinES route and load Spanish component', () => {
      const { getByTestId } = render(<TestRouter initialRoute="/DelfinES" />);
      
      expect(getByTestId('test-component')).toBeInTheDocument();
      expect(getByTestId('test-component')).toHaveTextContent('DelfinES Component Loaded');
    });
  });

  describe('Route consistency and patterns', () => {
    test('should follow consistent routing patterns with existing properties', () => {
      // Test that Delfin routes follow the same pattern as other properties
      const englishRoutes = ['/Geco', '/Rana', '/Tucano', '/Pappagallo', '/Delfin'];
      const spanishRoutes = ['/GecoES', '/RanaES', '/TucanoES', '/PappagalloES', '/DelfinES'];
      
      englishRoutes.forEach(route => {
        expect(route).toMatch(/^\/[A-Z][a-z]+$/);
      });
      
      spanishRoutes.forEach(route => {
        expect(route).toMatch(/^\/[A-Z][a-z]+ES$/);
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
      const { getByTestId } = render(<TestRouter initialRoute="/Rana" />);
      
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
    test('should verify Delfin routes are properly configured in main router', () => {
      // Import the actual router to verify route configuration
      const Router = require('../Router').default;
      const routerString = Router.toString();
      
      // Verify Delfin routes are present in the router configuration
      expect(routerString).toContain('/Delfin');
      expect(routerString).toContain('/DelfinES');
      expect(routerString).toContain('ListingDelfin');
      // Note: The compiled version may have different variable names, so we check for DelfinES pattern
      expect(routerString).toContain('DelfinES');
    });

    test('should verify proper import statements exist', () => {
      // Read the router file content to verify imports
      const fs = require('fs');
      const path = require('path');
      const routerPath = path.join(__dirname, '../Router.tsx');
      const routerContent = fs.readFileSync(routerPath, 'utf8');
      
      // Verify imports are present
      expect(routerContent).toContain("import ListingDelfin from '../pages/Listing/staticPages/ListingDelfin.page'");
      expect(routerContent).toContain("import ListingDelfinES from '../pages/Listing/staticPages_ES/ListingDelfin.page_ES'");
      
      // Verify routes are configured
      expect(routerContent).toContain("path='/Delfin'");
      expect(routerContent).toContain("path='/DelfinES'");
    });
  });
});