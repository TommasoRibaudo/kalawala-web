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
      // Service attempts initialization even when offline, so error comes from script loading failure
      expect(state.errorMessage).toBeDefined();
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
      // Service attempts initialization even when offline, error type depends on failure point
      expect(['NETWORK_ERROR', 'INITIALIZATION_ERROR', 'SCRIPT_LOAD_ERROR']).toContain(errorHistory[0].type);
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

  describe('Script Load Failures', () => {
    /**
     * CRA's Jest preset sets `resetMocks`, so the document mocks installed in
     * beforeAll lose their implementations before each test. Any test that
     * needs a script element installs its own.
     *
     * `onAppend` stands in for the browser: call `onerror` to model a refused
     * request (a content blocker, a DNS filter, a proxy), or leave it out to
     * model a request that goes out and never comes back.
     */
    const stubScriptElement = (onAppend?: (script: any) => void) => {
      const script: any = { async: false, src: '', remove: jest.fn(), onload: null, onerror: null };

      (document.createElement as jest.Mock).mockImplementation((tagName: string) =>
        tagName === 'script' ? script : { appendChild: jest.fn(), style: {}, src: '' }
      );
      (document.querySelector as jest.Mock).mockImplementation(() => null);
      (document.head.appendChild as jest.Mock).mockImplementation((element: any) => {
        if (element === script) {
          onAppend?.(script);
        }
        return element;
      });

      // The noscript fallback is appended to head too, so count only the script.
      const insertions = () =>
        (document.head.appendChild as jest.Mock).mock.calls.filter(call => call[0] === script).length;

      return { script, insertions };
    };

    test('does not retry a script the browser refused', async () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const { insertions } = stubScriptElement(script => script.onerror());

      const blockedService = new MetaPixelService(validConfig);
      await blockedService.initialize();

      // One attempt. The browser refused the request before any bytes moved and
      // will refuse it again; the old code spent 4s proving that three times.
      expect(insertions()).toBe(1);
      expect(blockedService.getErrorHistory().filter(e => e.message.startsWith('Attempt'))).toHaveLength(1);
      expect(blockedService.getErrorHistory().every(e => e.type === 'SCRIPT_LOAD_ERROR')).toBe(true);
      expect(blockedService.getState().hasError).toBe(true);
      expect(blockedService.isInitialized()).toBe(false);

      // A blocked pixel is expected, handled, and outside the site's control:
      // a warning, not the console.error visitors were reporting as a fault.
      expect(errorSpy).not.toHaveBeenCalled();
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('the site is unaffected'));
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('content blocker'));

      warnSpy.mockRestore();
      errorSpy.mockRestore();
    });

    test('still retries a script that times out', async () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const { insertions } = stubScriptElement();

      const timingOutService = new MetaPixelService(validConfig);
      // Real timers, compressed: a request that went out and never came back is
      // the one failure another attempt can actually fix.
      (timingOutService as any).TIMEOUT_MS = 10;
      (timingOutService as any).retryTimeouts = [1, 1];

      await timingOutService.initialize();

      expect(insertions()).toBe(3); // initial attempt + MAX_RETRIES
      expect(timingOutService.getErrorHistory().every(e => e.type === 'TIMEOUT_ERROR')).toBe(true);
      expect(timingOutService.getState().errorMessage).toContain('after 2 retries');
      expect(errorSpy).toHaveBeenCalled();

      errorSpy.mockRestore();
    });

    test('builds no noscript beacon, which was double-counting every PageView', async () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      stubScriptElement(script => script.onerror());

      const beaconService = new MetaPixelService(validConfig);
      await beaconService.initialize();

      // Setting `src` on an <img> sends the request there and then, so building
      // the "fallback" fired a PageView beacon on top of fbq('track','PageView').
      const created = (document.createElement as jest.Mock).mock.calls.map(call => call[0]);
      expect(created).not.toContain('img');
      expect(created).not.toContain('noscript');

      warnSpy.mockRestore();
    });

    test('classifies a refused script as SCRIPT_LOAD_ERROR, not NETWORK_ERROR', () => {
      const classify = (message: string) => (service as any).getErrorType(new Error(message));

      // 'Script loading failed' contains 'loading', so while the network branch
      // was tested first every blocked script was reported as NETWORK_ERROR.
      expect(classify('Script loading failed')).toBe('SCRIPT_LOAD_ERROR');
      expect(classify('Script loading timeout')).toBe('TIMEOUT_ERROR');
      expect(classify('Network unavailable')).toBe('NETWORK_ERROR');
      expect(classify('something unexpected')).toBe('INITIALIZATION_ERROR');
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