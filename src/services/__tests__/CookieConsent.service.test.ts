/**
 * Cookie Consent Service Tests
 * 
 * Unit tests for cookie consent management
 */

import { CookieConsentService, ConsentPreferences } from '../CookieConsent.service';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock document.cookie
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
});

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    hostname: 'example.com',
  },
  writable: true,
});

describe('CookieConsentService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
    
    // Reset document.cookie
    document.cookie = '';
    
    // Clear any existing event listeners
    window.removeEventListener('consentChanged', jest.fn());
    window.removeEventListener('consentCleared', jest.fn());
  });

  describe('getConsentState', () => {
    test('should return null when no consent is stored', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      const result = CookieConsentService.getConsentState();
      
      expect(result).toBeNull();
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('cookie_consent');
    });

    test('should return stored consent state', () => {
      const mockState = {
        status: 'accepted',
        preferences: {
          analytics: true,
          marketing: true,
          functional: true,
        },
        timestamp: Date.now(),
        version: '1.0',
      };
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockState));
      
      const result = CookieConsentService.getConsentState();
      
      expect(result).toEqual(mockState);
    });

    test('should return null for expired consent', () => {
      const expiredState = {
        status: 'accepted',
        preferences: {
          analytics: true,
          marketing: true,
          functional: true,
        },
        timestamp: Date.now() - (366 * 24 * 60 * 60 * 1000), // 366 days ago
        version: '1.0',
      };
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(expiredState));
      
      const result = CookieConsentService.getConsentState();
      
      expect(result).toBeNull();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('cookie_consent');
    });

    test('should return null for outdated consent version', () => {
      const outdatedState = {
        status: 'accepted',
        preferences: {
          analytics: true,
          marketing: true,
          functional: true,
        },
        timestamp: Date.now(),
        version: '0.9', // Old version
      };
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(outdatedState));
      
      const result = CookieConsentService.getConsentState();
      
      expect(result).toBeNull();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('cookie_consent');
    });

    test('should handle invalid JSON gracefully', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid json');
      
      const result = CookieConsentService.getConsentState();
      
      expect(result).toBeNull();
    });
  });

  describe('saveConsent', () => {
    test('should save consent preferences', () => {
      const preferences: ConsentPreferences = {
        analytics: true,
        marketing: false,
        functional: true,
      };
      
      const mockDispatchEvent = jest.fn();
      window.dispatchEvent = mockDispatchEvent;
      
      CookieConsentService.saveConsent(preferences);
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'cookie_consent',
        expect.stringContaining('"status":"accepted"')
      );
      
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'consentChanged',
        })
      );
    });

    test('should handle storage errors gracefully', () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      
      const preferences: ConsentPreferences = {
        analytics: true,
        marketing: true,
        functional: true,
      };
      
      // Should not throw
      expect(() => {
        CookieConsentService.saveConsent(preferences);
      }).not.toThrow();
    });
  });

  describe('rejectAll', () => {
    test('should save rejection state', () => {
      const mockDispatchEvent = jest.fn();
      window.dispatchEvent = mockDispatchEvent;
      
      CookieConsentService.rejectAll();
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'cookie_consent',
        expect.stringContaining('"status":"rejected"')
      );
      
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'consentChanged',
        })
      );
    });

    test('should keep functional cookies enabled', () => {
      CookieConsentService.rejectAll();
      
      const savedData = mockLocalStorage.setItem.mock.calls[0][1];
      const parsedData = JSON.parse(savedData);
      
      expect(parsedData.preferences.functional).toBe(true);
      expect(parsedData.preferences.analytics).toBe(false);
      expect(parsedData.preferences.marketing).toBe(false);
    });
  });

  describe('acceptAll', () => {
    test('should accept all cookie categories', () => {
      CookieConsentService.acceptAll();
      
      const savedData = mockLocalStorage.setItem.mock.calls[0][1];
      const parsedData = JSON.parse(savedData);
      
      expect(parsedData.preferences.functional).toBe(true);
      expect(parsedData.preferences.analytics).toBe(true);
      expect(parsedData.preferences.marketing).toBe(true);
    });
  });

  describe('hasConsent', () => {
    test('should return true when user has consented to category', () => {
      const mockState = {
        status: 'accepted',
        preferences: {
          analytics: true,
          marketing: false,
          functional: true,
        },
        timestamp: Date.now(),
        version: '1.0',
      };
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockState));
      
      expect(CookieConsentService.hasConsent('analytics')).toBe(true);
      expect(CookieConsentService.hasConsent('marketing')).toBe(false);
      expect(CookieConsentService.hasConsent('functional')).toBe(true);
    });

    test('should return false when consent is rejected', () => {
      const mockState = {
        status: 'rejected',
        preferences: {
          analytics: false,
          marketing: false,
          functional: true,
        },
        timestamp: Date.now(),
        version: '1.0',
      };
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockState));
      
      expect(CookieConsentService.hasConsent('analytics')).toBe(false);
      expect(CookieConsentService.hasConsent('marketing')).toBe(false);
    });

    test('should return false when no consent state exists', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      expect(CookieConsentService.hasConsent('analytics')).toBe(false);
    });
  });

  describe('shouldShowBanner', () => {
    test('should return true when no consent exists', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      
      expect(CookieConsentService.shouldShowBanner()).toBe(true);
    });

    test('should return false when consent exists', () => {
      const mockState = {
        status: 'accepted',
        preferences: {
          analytics: true,
          marketing: true,
          functional: true,
        },
        timestamp: Date.now(),
        version: '1.0',
      };
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockState));
      
      expect(CookieConsentService.shouldShowBanner()).toBe(false);
    });

    test('should return true when consent is pending', () => {
      const mockState = {
        status: 'pending',
        preferences: {
          analytics: false,
          marketing: false,
          functional: true,
        },
        timestamp: Date.now(),
        version: '1.0',
      };
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockState));
      
      expect(CookieConsentService.shouldShowBanner()).toBe(true);
    });
  });

  describe('canTrack', () => {
    test('should return true when both analytics and marketing are consented', () => {
      const mockState = {
        status: 'accepted',
        preferences: {
          analytics: true,
          marketing: true,
          functional: true,
        },
        timestamp: Date.now(),
        version: '1.0',
      };
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockState));
      
      expect(CookieConsentService.canTrack()).toBe(true);
    });

    test('should return false when analytics is not consented', () => {
      const mockState = {
        status: 'accepted',
        preferences: {
          analytics: false,
          marketing: true,
          functional: true,
        },
        timestamp: Date.now(),
        version: '1.0',
      };
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockState));
      
      expect(CookieConsentService.canTrack()).toBe(false);
    });

    test('should return false when marketing is not consented', () => {
      const mockState = {
        status: 'accepted',
        preferences: {
          analytics: true,
          marketing: false,
          functional: true,
        },
        timestamp: Date.now(),
        version: '1.0',
      };
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockState));
      
      expect(CookieConsentService.canTrack()).toBe(false);
    });
  });

  describe('onConsentChange', () => {
    test('should register and call event listener', () => {
      const callback = jest.fn();
      const cleanup = CookieConsentService.onConsentChange(callback);
      
      const mockState = {
        status: 'accepted',
        preferences: {
          analytics: true,
          marketing: true,
          functional: true,
        },
        timestamp: Date.now(),
        version: '1.0',
      };
      
      // Simulate consent change event
      window.dispatchEvent(new CustomEvent('consentChanged', { detail: mockState }));
      
      expect(callback).toHaveBeenCalledWith(mockState);
      
      // Test cleanup
      cleanup();
      
      // Should not be called after cleanup
      callback.mockClear();
      window.dispatchEvent(new CustomEvent('consentChanged', { detail: mockState }));
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('clearConsent', () => {
    test('should remove consent from storage', () => {
      const mockDispatchEvent = jest.fn();
      window.dispatchEvent = mockDispatchEvent;
      
      CookieConsentService.clearConsent();
      
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('cookie_consent');
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'consentCleared',
        })
      );
    });
  });
});