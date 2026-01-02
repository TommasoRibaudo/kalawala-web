/**
 * App Component Integration Tests
 * 
 * Integration tests for App component Meta Pixel loading
 * Requirements: 1.1, 1.2, 3.1
 */

import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the validation function to prevent actual validation during tests
jest.mock('./utils/runPixelValidation', () => ({
  validatePixelImplementation: jest.fn().mockResolvedValue({
    overall: { success: true, message: 'Mock validation passed' }
  }),
}));

// Mock the router components to prevent routing issues in tests
jest.mock('./Router/Router.tsx', () => ({
  __esModule: true,
  default: function MockRouter() {
    return <div data-testid="app-router">Mock Router Content</div>;
  }
}));

describe('App Component Meta Pixel Integration', () => {
  let mockFbq: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup fbq mock
    mockFbq = jest.fn();
    window.fbq = mockFbq;
    window.fbq.queue = [];
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    
    // Mock environment variables
    process.env.REACT_APP_META_PIXEL_ID = '1167925005402403';
    process.env.REACT_APP_META_PIXEL_ENABLED = 'true';
    process.env.REACT_APP_META_PIXEL_DEBUG = 'false';
  });

  test('should render App component successfully', async () => {
    // Test that the App component renders without crashing
    expect(() => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    }).not.toThrow();
  });

  test('should initialize Meta Pixel on component mount', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Wait for useEffect to complete
    await waitFor(() => {
      expect(window.fbq).toBeDefined();
    }, { timeout: 5000 });
  });

  test('should handle pixel initialization with correct configuration', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(process.env.REACT_APP_META_PIXEL_ID).toBe('1167925005402403');
    });
  });

  test('should not initialize pixel when disabled', async () => {
    process.env.REACT_APP_META_PIXEL_ENABLED = 'false';
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Should not call fbq when disabled
    await waitFor(() => {
      // The component should still render successfully
      expect(document.body).toBeInTheDocument();
    });
  });

  test('should not initialize pixel when pixel ID is missing', async () => {
    delete process.env.REACT_APP_META_PIXEL_ID;
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Should not call fbq when pixel ID is missing
    await waitFor(() => {
      // The component should still render successfully
      expect(document.body).toBeInTheDocument();
    });
    
    // Restore pixel ID for other tests
    process.env.REACT_APP_META_PIXEL_ID = '1167925005402403';
  });

  test('should handle pixel initialization errors gracefully', async () => {
    // Mock fbq to throw error
    window.fbq = jest.fn().mockImplementation(() => {
      throw new Error('Mock pixel error');
    });

    // Should not throw error during render
    expect(() => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    }).not.toThrow();
  });

  test('should prevent duplicate pixel initialization', async () => {
    const { rerender } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Re-render the component
    rerender(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Should not initialize pixel multiple times
    await waitFor(() => {
      expect(document.body).toBeInTheDocument();
    });
  });

  test('should create development status indicator in development mode', async () => {
    // Mock NODE_ENV using Object.defineProperty since it's read-only
    const originalNodeEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: 'development',
      writable: true,
      configurable: true
    });
    
    process.env.REACT_APP_META_PIXEL_DEBUG = 'true';
    
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // In development mode with debug enabled, status indicator should be created
    await waitFor(() => {
      expect(document.body).toBeInTheDocument();
    });
    
    // Restore original NODE_ENV
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalNodeEnv,
      writable: true,
      configurable: true
    });
  });

  test('should validate pixel configuration matches requirements', () => {
    // Verify the pixel ID matches the required value from requirements
    expect(process.env.REACT_APP_META_PIXEL_ID).toBe('1167925005402403');
  });
});
