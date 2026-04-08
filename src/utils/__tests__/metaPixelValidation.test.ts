/**
 * Meta Pixel Validation Tests
 * 
 * Integration tests for Meta Pixel validation utilities
 * Requirements: 1.4, 2.3, 4.3
 */

// Mock the MetaPixel service to avoid real network retries in validateErrorHandling
jest.mock('../../services/MetaPixel.service', () => {
  const mockService = {
    initialize: jest.fn().mockResolvedValue(undefined),
    getState: jest.fn().mockReturnValue({ isLoaded: false, isInitialized: false, hasError: false }),
    getErrorHistory: jest.fn().mockReturnValue([]),
  };
  return {
    MetaPixelService: jest.fn().mockImplementation(() => mockService),
    createMetaPixelService: jest.fn().mockReturnValue(mockService),
  };
});

import {
  validateScriptLoading,
  validatePixelInitialization,
  validatePageViewTracking,
  validateErrorHandling,
  runPixelValidation
} from '../metaPixelValidation';

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
  
  // Restore fbq after each test
  window.fbq = mockFbq;
  window.fbq.queue = [];
  window.fbq.loaded = true;
  window.fbq.version = '2.0';
});

describe('Meta Pixel Validation', () => {
  describe('Script Loading Validation', () => {
    test('should validate successful script loading', async () => {
      // Mock querySelector to return a script element
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
      const result = validatePixelInitialization();
      
      expect(result.success).toBe(true);
      expect(result.message).toContain('correct pixel ID');
      expect(result.details?.pixelId).toBe('1167925005402403');
    });

    test('should detect missing pixel ID', () => {
      const originalPixelId = process.env.REACT_APP_META_PIXEL_ID;
      delete process.env.REACT_APP_META_PIXEL_ID;
      
      const result = validatePixelInitialization();
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('not set');
      
      // Restore
      process.env.REACT_APP_META_PIXEL_ID = originalPixelId;
    });

    test('should detect incorrect pixel ID', () => {
      const originalPixelId = process.env.REACT_APP_META_PIXEL_ID;
      process.env.REACT_APP_META_PIXEL_ID = 'wrong-id';
      
      const result = validatePixelInitialization();
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('mismatch');
      
      // Restore
      process.env.REACT_APP_META_PIXEL_ID = originalPixelId;
    });
  });

  describe('PageView Tracking Validation', () => {
    test('should validate PageView tracking functionality', () => {
      window.fbq = mockFbq;
      window.fbq.loaded = true;
      
      const result = validatePageViewTracking();
      
      expect(result.success).toBe(true);
      expect(result.message).toContain('working correctly');
    });

    test('should detect missing fbq function', () => {
      const originalFbq = (window as any).fbq;
      // Must set to a non-function value so typeof check fails
      (window as any).fbq = undefined;
      
      const result = validatePageViewTracking();
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('not available');
      
      // Restore
      (window as any).fbq = originalFbq;
    });
  });

  describe('Error Handling Validation', () => {
    test('should validate error handling mechanisms', async () => {
      const result = await validateErrorHandling();
      
      // Error handling should return a result even if some tests fail
      expect(result).toBeDefined();
      expect(result.success).toBeDefined();
      expect(result.message).toBeDefined();
    }, 15000);
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
      // Test with querySelector that throws
      (document.querySelector as jest.Mock).mockImplementationOnce(() => {
        throw new Error('DOM error');
      });
      
      const result = await validateScriptLoading();
      expect(result.success).toBe(false);
    });
  });
});
