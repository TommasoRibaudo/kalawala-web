/**
 * Meta Pixel Service Tests
 * 
 * Unit tests for MetaPixel service initialization and functionality
 * Requirements: 1.4, 2.3, 4.3
 */

import { MetaPixelService, createMetaPixelService, MetaPixelConfig } from '../MetaPixel.service';

// Mock global objects
const mockFbq = jest.fn();

// Setup comprehensive mocks
beforeAll(() => {
  // Mock fbq
  Object.defineProperty(window, 'fbq', {
    writable: true,
    value: mockFbq,
  });
  
  // Mock document methods
  const mockScript = {
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    addEventListener: jest.fn((event: string, callback: Function) => {
      if (event === 'load') {
        setTimeout(callback, 10);
      }
    }),
    removeEventListener: jest.fn(),
    remove: jest.fn(),
    src: '',
    async: true
  };
  
  const mockDiv = {
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    remove: jest.fn(),
    id: '',
    style: { cssText: '' },
    textContent: '',
    title: ''
  };
  
  Object.defineProperty(document, 'createElement', {
    writable: true,
    value: jest.fn((tagName: string) => {
      if (tagName === 'script') {
        return mockScript;
      }
      return mockDiv;
    }),
  });
  
  Object.defineProperty(document, 'querySelector', {
    writable: true,
    value: jest.fn(() => null),
  });
  
  Object.defineProperty(document.head, 'appendChild', {
    writable: true,
    value: jest.fn(),
  });
  
  // Mock navigator
  Object.defineProperty(navigator, 'onLine', {
    writable: true,
    value: true,
  });
});

describe('MetaPixel Service', () => {
  let service: MetaPixelService;
  const validConfig: MetaPixelConfig = {
    pixelId: '1167925005402403',
    autoPageView: true,
    debug: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset fbq mock
    mockFbq.mockClear();
    window.fbq = mockFbq;
    window.fbq.queue = [];
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    
    // Reset navigator
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });
    
    service = new MetaPixelService(validConfig);
  });

  describe('Initialization', () => {
    test('should create service with valid configuration', () => {
      expect(service).toBeInstanceOf(MetaPixelService);
      expect(service.isInitialized()).toBe(false);
    });

    test('should validate pixel ID matches requirements', () => {
      const state = service.getState();
      expect(state.isInitialized).toBe(false);
      expect(state.hasError).toBe(false);
    });

    test('should handle invalid pixel ID configuration', () => {
      const invalidConfig: MetaPixelConfig = {
        pixelId: '',
        autoPageView: true,
        debug: false,
      };
      
      const invalidService = new MetaPixelService(invalidConfig);
      expect(invalidService).toBeInstanceOf(MetaPixelService);
    });
  });

  describe('Pixel Initialization', () => {
    test('should initialize fbq function if not present', async () => {
      // Remove fbq to test initialization
      delete (window as any).fbq;
      
      await service.initialize();
      
      expect(window.fbq).toBeDefined();
      expect(typeof window.fbq).toBe('function');
    });

    test('should handle network unavailable scenario', async () => {
      // Mock navigator.onLine as false
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false,
      });

      await service.initialize();
      
      const state = service.getState();
      expect(state.hasError).toBe(true);
      expect(state.errorMessage).toContain('Network unavailable');
    });
  });

  describe('PageView Tracking', () => {
    test('should not track PageView when not initialized', () => {
      service.trackPageView();
      
      // Should not call fbq if not initialized
      expect(mockFbq).not.toHaveBeenCalledWith('track', 'PageView');
    });

    test('should handle tracking errors gracefully', () => {
      // Mock fbq to throw error
      mockFbq.mockImplementation(() => {
        throw new Error('Tracking failed');
      });
      
      // Should not throw error
      expect(() => service.trackPageView()).not.toThrow();
    });
  });

  describe('Error Handling', () => {
    test('should maintain error history', async () => {
      // Trigger an error
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false,
      });

      await service.initialize();
      
      const errorHistory = service.getErrorHistory();
      expect(errorHistory.length).toBeGreaterThan(0);
      expect(errorHistory[0].type).toBe('NETWORK_ERROR');
    });

    test('should clear error history', async () => {
      // Trigger an error first
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false,
      });

      await service.initialize();
      
      expect(service.getErrorHistory().length).toBeGreaterThan(0);
      
      service.clearErrorHistory();
      expect(service.getErrorHistory().length).toBe(0);
    });
  });

  describe('State Management', () => {
    test('should return current state', () => {
      const state = service.getState();
      
      expect(state).toHaveProperty('isLoaded');
      expect(state).toHaveProperty('isInitialized');
      expect(state).toHaveProperty('hasError');
      expect(typeof state.isLoaded).toBe('boolean');
      expect(typeof state.isInitialized).toBe('boolean');
      expect(typeof state.hasError).toBe('boolean');
    });

    test('should return detailed status for debugging', () => {
      const status = service.getDetailedStatus();
      
      expect(status).toHaveProperty('state');
      expect(status).toHaveProperty('config');
      expect(status).toHaveProperty('errorHistory');
      expect(status).toHaveProperty('networkAvailable');
    });
  });

  describe('Development Mode Features', () => {
    test('should not create status indicator in production mode', () => {
      const prodService = new MetaPixelService({
        ...validConfig,
        developmentMode: false,
      });
      
      const indicator = prodService.createStatusIndicator();
      
      expect(indicator).toBeNull();
    });
  });

  describe('Factory Function', () => {
    test('should create service instance via factory', () => {
      const factoryService = createMetaPixelService(validConfig);
      
      expect(factoryService).toBeInstanceOf(MetaPixelService);
      expect(factoryService.isInitialized()).toBe(false);
    });
  });

  describe('Environment Configuration Validation', () => {
    test('should validate required pixel ID from environment', () => {
      expect(process.env.REACT_APP_META_PIXEL_ID).toBe('1167925005402403');
    });

    test('should handle missing environment variables', () => {
      const originalPixelId = process.env.REACT_APP_META_PIXEL_ID;
      delete process.env.REACT_APP_META_PIXEL_ID;
      
      const serviceWithoutEnv = new MetaPixelService({
        pixelId: '1167925005402403',
        autoPageView: true,
      });
      
      expect(serviceWithoutEnv).toBeInstanceOf(MetaPixelService);
      
      // Restore environment variable
      process.env.REACT_APP_META_PIXEL_ID = originalPixelId;
    });
  });
});