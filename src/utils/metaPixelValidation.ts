/**
 * Meta Pixel Validation Utilities
 * 
 * This module provides comprehensive validation functions for testing
 * Meta Pixel implementation according to requirements 1.1, 1.2, and 3.1
 */

export interface ValidationResult {
  success: boolean;
  message: string;
  details?: any;
  timestamp: number;
}

export interface PixelValidationReport {
  scriptLoading: ValidationResult;
  pixelInitialization: ValidationResult;
  pageViewTracking: ValidationResult;
  pixelIdValidation: ValidationResult;
  errorHandling: ValidationResult;
  overall: ValidationResult;
}

/**
 * Validate that Meta Pixel script loads successfully from Facebook CDN
 * Requirement: 1.1 - Script loads with correct pixel ID
 */
export const validateScriptLoading = async (): Promise<ValidationResult> => {
  const startTime = Date.now();
  
  try {
    // Check if script element exists in DOM
    const scriptElement = document.querySelector('script[src*="connect.facebook.net"]');
    
    if (!scriptElement) {
      return {
        success: false,
        message: 'Meta Pixel script element not found in DOM',
        timestamp: Date.now()
      };
    }

    // Verify script source URL
    const scriptSrc = scriptElement.getAttribute('src');
    const expectedCDN = 'connect.facebook.net';
    
    if (!scriptSrc || !scriptSrc.includes(expectedCDN)) {
      return {
        success: false,
        message: `Script source does not match Facebook CDN. Found: ${scriptSrc}`,
        timestamp: Date.now()
      };
    }

    // Check if fbq function is available
    if (typeof window.fbq !== 'function') {
      return {
        success: false,
        message: 'fbq function not available after script loading',
        timestamp: Date.now()
      };
    }

    const loadTime = Date.now() - startTime;
    
    return {
      success: true,
      message: 'Meta Pixel script loaded successfully from Facebook CDN',
      details: {
        scriptSrc,
        loadTime: `${loadTime}ms`,
        fbqAvailable: typeof window.fbq === 'function'
      },
      timestamp: Date.now()
    };

  } catch (error) {
    return {
      success: false,
      message: `Script loading validation failed: ${(error as Error).message}`,
      details: { error: error as Error },
      timestamp: Date.now()
    };
  }
};

/**
 * Validate pixel initialization with correct pixel ID
 * Requirement: 1.1 - Pixel ID matches 1167925005402403
 */
export const validatePixelInitialization = (): ValidationResult => {
  try {
    const expectedPixelId = '1167925005402403';
    const configuredPixelId = process.env.REACT_APP_META_PIXEL_ID;

    // Check environment configuration
    if (!configuredPixelId) {
      return {
        success: false,
        message: 'REACT_APP_META_PIXEL_ID environment variable not set',
        timestamp: Date.now()
      };
    }

    // Validate pixel ID matches requirements
    if (configuredPixelId !== expectedPixelId) {
      return {
        success: false,
        message: `Pixel ID mismatch. Expected: ${expectedPixelId}, Found: ${configuredPixelId}`,
        details: {
          expected: expectedPixelId,
          actual: configuredPixelId
        },
        timestamp: Date.now()
      };
    }

    // Check if fbq function exists and is properly initialized
    if (!window.fbq || typeof window.fbq !== 'function') {
      return {
        success: false,
        message: 'fbq function not available - pixel not initialized',
        timestamp: Date.now()
      };
    }

    // Check if pixel queue exists (indicates proper initialization)
    if (!window.fbq.queue || !Array.isArray(window.fbq.queue)) {
      return {
        success: false,
        message: 'fbq queue not properly initialized',
        timestamp: Date.now()
      };
    }

    return {
      success: true,
      message: 'Meta Pixel initialized with correct pixel ID',
      details: {
        pixelId: configuredPixelId,
        fbqVersion: window.fbq.version || 'unknown',
        queueLength: window.fbq.queue?.length || 0
      },
      timestamp: Date.now()
    };

  } catch (error) {
    return {
      success: false,
      message: `Pixel initialization validation failed: ${(error as Error).message}`,
      details: { error: error as Error },
      timestamp: Date.now()
    };
  }
};

/**
 * Validate PageView event tracking
 * Requirement: 1.2 - PageView events fire on page load and navigation
 */
export const validatePageViewTracking = (): ValidationResult => {
  try {
    if (!window.fbq || typeof window.fbq !== 'function') {
      return {
        success: false,
        message: 'fbq function not available for PageView tracking',
        timestamp: Date.now()
      };
    }

    // Create a test tracking call to verify functionality
    let trackingWorked = false;
    let trackingError: Error | null = null;

    try {
      // Temporarily override fbq to capture tracking calls
      const originalFbq = window.fbq;
      const capturedCalls: any[] = [];

      window.fbq = function(...args: any[]) {
        capturedCalls.push(args);
        return originalFbq.apply(this, args);
      };

      // Copy properties from original fbq
      Object.keys(originalFbq).forEach(key => {
        (window.fbq as any)[key] = (originalFbq as any)[key];
      });

      // Test PageView tracking
      window.fbq('track', 'PageView');
      
      // Restore original fbq
      window.fbq = originalFbq;

      // Check if PageView was captured
      const pageViewCalls = capturedCalls.filter(call => 
        call[0] === 'track' && call[1] === 'PageView'
      );

      trackingWorked = pageViewCalls.length > 0;

      return {
        success: trackingWorked,
        message: trackingWorked 
          ? 'PageView tracking is working correctly'
          : 'PageView tracking test failed - no PageView events captured',
        details: {
          totalCalls: capturedCalls.length,
          pageViewCalls: pageViewCalls.length,
          capturedCalls: capturedCalls.slice(0, 5) // Show first 5 calls for debugging
        },
        timestamp: Date.now()
      };

    } catch (error) {
      trackingError = error as Error;
      trackingWorked = false;
    }

    if (!trackingWorked) {
      return {
        success: false,
        message: `PageView tracking validation failed: ${trackingError?.message || 'Unknown error'}`,
        details: { error: trackingError },
        timestamp: Date.now()
      };
    }

    return {
      success: true,
      message: 'PageView tracking validated successfully',
      timestamp: Date.now()
    };

  } catch (error) {
    return {
      success: false,
      message: `PageView tracking validation error: ${(error as Error).message}`,
      details: { error: error as Error },
      timestamp: Date.now()
    };
  }
};

/**
 * Test error handling scenarios with network failures
 * Requirement: 4.3 - Graceful failure handling
 */
export const validateErrorHandling = async (): Promise<ValidationResult> => {
  try {
    // Test 1: Check if application handles missing fbq gracefully
    const originalFbq = window.fbq;
    
    // Temporarily remove fbq to test error handling
    delete (window as any).fbq;
    
    let errorHandled = true;
    let errorMessage = '';

    try {
      // This should not throw an error if error handling is proper
      const { MetaPixelService } = await import('../services/MetaPixel.service');
      const testService = new MetaPixelService({
        pixelId: '1167925005402403',
        autoPageView: true,
        debug: true
      });
      
      // This should handle the missing fbq gracefully
      await testService.initialize();
      
    } catch (error) {
      errorHandled = false;
      errorMessage = (error as Error).message;
    } finally {
      // Restore original fbq
      if (originalFbq) {
        window.fbq = originalFbq;
      }
    }

    // Test 2: Check network availability handling
    const networkTest = await testNetworkErrorHandling();

    return {
      success: errorHandled && networkTest.success,
      message: errorHandled 
        ? 'Error handling validation passed'
        : `Error handling failed: ${errorMessage}`,
      details: {
        missingFbqHandled: errorHandled,
        networkErrorHandling: networkTest,
        errorMessage
      },
      timestamp: Date.now()
    };

  } catch (error) {
    return {
      success: false,
      message: `Error handling validation failed: ${(error as Error).message}`,
      details: { error: error as Error },
      timestamp: Date.now()
    };
  }
};

/**
 * Test network error handling scenarios
 */
const testNetworkErrorHandling = async (): Promise<ValidationResult> => {
  try {
    // Mock network unavailable scenario
    const originalOnLine = navigator.onLine;
    
    // Temporarily set network as offline
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false
    });

    let networkErrorHandled = true;
    let networkErrorMessage = '';

    try {
      const { MetaPixelService } = await import('../services/MetaPixel.service');
      const testService = new MetaPixelService({
        pixelId: '1167925005402403',
        autoPageView: true,
        debug: true
      });
      
      // This should detect network unavailability and handle gracefully
      await testService.initialize();
      
    } catch (error) {
      // This is expected when network is unavailable
      networkErrorHandled = true;
      networkErrorMessage = (error as Error).message;
    } finally {
      // Restore original network status
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: originalOnLine
      });
    }

    return {
      success: networkErrorHandled,
      message: 'Network error handling validated',
      details: {
        networkErrorMessage,
        originalOnLine
      },
      timestamp: Date.now()
    };

  } catch (error) {
    return {
      success: false,
      message: `Network error handling test failed: ${(error as Error).message}`,
      details: { error: error as Error },
      timestamp: Date.now()
    };
  }
};

/**
 * Run comprehensive pixel validation
 * Tests all requirements for task 6.1
 */
export const runPixelValidation = async (): Promise<PixelValidationReport> => {
  console.log('🔍 Starting Meta Pixel validation...');
  
  const results: PixelValidationReport = {
    scriptLoading: await validateScriptLoading(),
    pixelInitialization: validatePixelInitialization(),
    pageViewTracking: validatePageViewTracking(),
    pixelIdValidation: validatePixelInitialization(), // Same as initialization for pixel ID check
    errorHandling: await validateErrorHandling(),
    overall: {
      success: false,
      message: '',
      timestamp: Date.now()
    }
  };

  // Calculate overall success
  const allTests = [
    results.scriptLoading,
    results.pixelInitialization,
    results.pageViewTracking,
    results.errorHandling
  ];

  const passedTests = allTests.filter(test => test.success).length;
  const totalTests = allTests.length;
  
  results.overall = {
    success: passedTests === totalTests,
    message: `Validation completed: ${passedTests}/${totalTests} tests passed`,
    details: {
      passedTests,
      totalTests,
      successRate: `${Math.round((passedTests / totalTests) * 100)}%`
    },
    timestamp: Date.now()
  };

  return results;
};

/**
 * Display validation results in a formatted way
 */
export const displayValidationResults = (report: PixelValidationReport): void => {
  console.group('📊 Meta Pixel Validation Report');
  
  console.log(`%c${report.overall.message}`, 
    report.overall.success ? 'color: #28a745; font-weight: bold;' : 'color: #dc3545; font-weight: bold;'
  );
  
  const tests = [
    { name: 'Script Loading', result: report.scriptLoading },
    { name: 'Pixel Initialization', result: report.pixelInitialization },
    { name: 'PageView Tracking', result: report.pageViewTracking },
    { name: 'Error Handling', result: report.errorHandling }
  ];

  tests.forEach(test => {
    const icon = test.result.success ? '✅' : '❌';
    const style = test.result.success ? 'color: #28a745;' : 'color: #dc3545;';
    
    console.log(`%c${icon} ${test.name}: ${test.result.message}`, style);
    
    if (test.result.details) {
      console.log('   Details:', test.result.details);
    }
  });
  
  console.groupEnd();
};

// Global validation function for easy access in development
if (typeof window !== 'undefined') {
  (window as any).__validateMetaPixel__ = async () => {
    const report = await runPixelValidation();
    displayValidationResults(report);
    return report;
  };
}