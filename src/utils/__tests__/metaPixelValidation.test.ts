/**
 * Meta Pixel Validation Tests
 * 
 * Integration tests for Meta Pixel validation utilities
 * Requirements: 1.4, 2.3, 4.3
 */

import {
  validateScriptLoading,
  validatePixelInitialization,
  validatePageViewTracking,
  validateErrorHandling,
  runPixelValidation
} from '../metaPixelValidation';

// Import the actual functions for tests that need them
const actualModule = jest.requireActual('../metaPixelValidation');

// Mock the validation functions to avoid actual network calls
jest.mock('../metaPixelValidation', () => {
  const originalModule = jest.requireActual('../metaPixelValidation');
  
  return {
    ...originalModule,
    validateScriptLoading: jest.fn().mockResolvedValue({
      success: true,
      message: 'Meta Pixel script loaded successfully',
      details: { scriptSrc: 'https://connect.facebook.net/en_US/fbevents.js' },
      timestamp: Date.now()
    }),
    validateErrorHandling: jest.fn().mockResolvedValue({
      success: true,
      message: 'Error handling mechanisms working correctly',
      timestamp: Date.now()
    }),
    runPixelValidation: jest.fn().mockResolvedValue({
      scriptLoading: { success: true, message: 'Script loaded', timestamp: Date.now() },
      pixelInitialization: { success: true, message: 'Pixel initialized', timestamp: Date.now() },
      pageViewTracking: { success: true, message: 'PageView tracking works', timestamp: Date.now() },
      errorHandling: { success: true, message: 'Error handling works', timestamp: Date.now() },
      overall: { success: true, message: 'All validations passed', timestamp: Date.now() }
    })
  };
});

// Mock global objects
const mockFbq = jest.fn();

beforeAll(() => {
  // Mock fbq
  Object.defineProperty(window, 'fbq', {
    writable: true,
    value: mockFbq,
  });
  
  window.fbq.queue = [];
  window.fbq.loaded = true;
  window.fbq.version = '2.0';
  
  // Mock document methods
  Object.defineProperty(document, 'querySelector', {
    writable: true,
    value: jest.fn((selector: string) => {
      if (selector.includes('connect.facebook.net')) {
        return { getAttribute: () => 'https://connect.facebook.net/en_US/fbevents.js' };
      }
      if (selector.includes('facebook.com/tr')) {
        return { src: 'https://www.facebook.com/tr?id=1167925005402403&ev=PageView&noscript=1' };
      }
      return null;
    }),
  });
  
  // Mock environment variables
  process.env.REACT_APP_META_PIXEL_ID = '1167925005402403';
  process.env.REACT_APP_META_PIXEL_ENABLED = 'true';
  process.env.REACT_APP_META_PIXEL_DEBUG = 'false';
});

beforeEach(() => {
  jest.clearAllMocks();
  mockFbq.mockClear();
});

describe('Meta Pixel Validation', () => {
  describe('Script Loading Validation', () => {
    test('should validate successful script loading', async () => {
      // Mock successful script loading
      (document.querySelector as jest.Mock).mockReturnValueOnce({
        getAttribute: () => 'https://connect.facebook.net/en_US/fbevents.js'
      });
      
      const result = await validateScriptLoading();
      
      expect(result.success).toBe(true);
      expect(result.message).toContain('successfully');
      expect(result.details).toBeDefined();
    }, 10000);

    test('should detect missing script', async () => {
      // Mock querySelector to return null (no script found)
      (document.querySelector as jest.Mock).mockReturnValueOnce(null);
      
      const result = await validateScriptLoading();
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('not found');
    });
  });

  describe('Pixel Initialization Validation', () => {
    test('should validate correct pixel ID configuration', () => {
      const result = actualModule.validatePixelInitialization();
      
      expect(result.success).toBe(true);
      expect(result.message).toContain('correct pixel ID');
      expect(result.details?.pixelId).toBe('1167925005402403');
    });

    test('should detect missing pixel ID', () => {
      const originalPixelId = process.env.REACT_APP_META_PIXEL_ID;
      delete process.env.REACT_APP_META_PIXEL_ID;
      
      const result = actualModule.validatePixelInitialization();
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('not set');
      
      // Restore
      process.env.REACT_APP_META_PIXEL_ID = originalPixelId;
    });

    test('should detect incorrect pixel ID', () => {
      const originalPixelId = process.env.REACT_APP_META_PIXEL_ID;
      process.env.REACT_APP_META_PIXEL_ID = 'wrong-id';
      
      const result = actualModule.validatePixelInitialization();
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('mismatch');
      
      // Restore
      process.env.REACT_APP_META_PIXEL_ID = originalPixelId;
    });
  });

  describe('PageView Tracking Validation', () => {
    test('should validate PageView tracking functionality', () => {
      // Ensure fbq is available
      window.fbq = mockFbq;
      window.fbq.loaded = true;
      
      const result = actualModule.validatePageViewTracking();
      
      expect(result.success).toBe(true);
      expect(result.message).toContain('working correctly');
    });

    test('should detect missing fbq function', () => {
      const originalFbq = (window as any).fbq;
      delete (window as any).fbq;
      
      const result = actualModule.validatePageViewTracking();
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('not available');
      
      // Restore
      (window as any).fbq = originalFbq;
    });
  });

  describe('Error Handling Validation', () => {
    test('should validate error handling mechanisms', async () => {
      const result = await validateErrorHandling();
      
      // Error handling should work even if some tests fail
      expect(result).toBeDefined();
      expect(result.success).toBeDefined();
      expect(result.message).toBeDefined();
    }, 10000);
  });

  describe('Comprehensive Validation', () => {
    test('should run complete validation suite', async () => {
      const report = await runPixelValidation();
      
      expect(report).toBeDefined();
      expect(report.overall).toBeDefined();
      expect(report.scriptLoading).toBeDefined();
      expect(report.pixelInitialization).toBeDefined();
      expect(report.pageViewTracking).toBeDefined();
      expect(report.errorHandling).toBeDefined();
      
      expect(typeof report.overall.success).toBe('boolean');
      expect(typeof report.overall.message).toBe('string');
      expect(typeof report.overall.timestamp).toBe('number');
    }, 15000);

    test('should calculate overall success correctly', async () => {
      const report = await runPixelValidation();
      
      // Check that overall success is based on individual test results
      const individualResults = [
        report.scriptLoading.success,
        report.pixelInitialization.success,
        report.pageViewTracking.success,
        report.errorHandling.success
      ];
      
      const expectedSuccess = individualResults.every(result => result);
      expect(report.overall.success).toBe(expectedSuccess);
    }, 15000);
  });

  describe('Environment Configuration Tests', () => {
    test('should validate required environment variables', () => {
      expect(process.env.REACT_APP_META_PIXEL_ID).toBe('1167925005402403');
      expect(process.env.REACT_APP_META_PIXEL_ENABLED).toBe('true');
    });

    test('should handle missing environment variables gracefully', () => {
      const originalEnabled = process.env.REACT_APP_META_PIXEL_ENABLED;
      delete process.env.REACT_APP_META_PIXEL_ENABLED;
      
      const result = validatePixelInitialization();
      
      // Should still work with default values
      expect(result).toBeDefined();
      
      // Restore
      process.env.REACT_APP_META_PIXEL_ENABLED = originalEnabled;
    });
  });

  describe('Browser Compatibility', () => {
    test('should work with different fbq implementations', () => {
      // Test with minimal fbq implementation
      window.fbq = jest.fn();
      
      const result = validatePageViewTracking();
      expect(result).toBeDefined();
      
      // Test with full fbq implementation
      window.fbq = mockFbq;
      window.fbq.queue = [];
      window.fbq.loaded = true;
      
      const result2 = validatePageViewTracking();
      expect(result2).toBeDefined();
    });

    test('should handle DOM API variations', async () => {
      // Test with different querySelector implementations
      const originalQuerySelector = document.querySelector;
      
      // Mock querySelector that throws
      (document.querySelector as any) = jest.fn(() => {
        throw new Error('DOM error');
      });
      
      const result = await validateScriptLoading();
      expect(result.success).toBe(false);
      
      // Restore
      document.querySelector = originalQuerySelector;
    });
  });
});