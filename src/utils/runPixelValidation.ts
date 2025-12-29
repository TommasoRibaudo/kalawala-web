/**
 * Pixel Validation Runner
 * 
 * This script runs comprehensive validation tests for Meta Pixel implementation
 * according to requirements 1.1, 1.2, and 3.1
 */

import { runPixelValidation, displayValidationResults, PixelValidationReport } from './metaPixelValidation';

/**
 * Main validation function that can be called from anywhere in the application
 */
export const validatePixelImplementation = async (): Promise<PixelValidationReport> => {
  console.log('🚀 Starting Meta Pixel Implementation Validation');
  console.log('Testing requirements: 1.1, 1.2, 3.1');
  console.log('---');

  try {
    // Wait a moment to ensure pixel has time to initialize
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Run comprehensive validation
    const report = await runPixelValidation();

    // Display results
    displayValidationResults(report);

    // Additional detailed logging for development
    if (process.env.NODE_ENV === 'development') {
      console.group('🔧 Development Details');
      
      // Environment configuration check
      console.log('Environment Configuration:');
      console.log('  REACT_APP_META_PIXEL_ID:', process.env.REACT_APP_META_PIXEL_ID);
      console.log('  REACT_APP_META_PIXEL_ENABLED:', process.env.REACT_APP_META_PIXEL_ENABLED);
      console.log('  REACT_APP_META_PIXEL_DEBUG:', process.env.REACT_APP_META_PIXEL_DEBUG);
      console.log('  NODE_ENV:', process.env.NODE_ENV);

      // Browser information
      console.log('Browser Information:');
      console.log('  User Agent:', navigator.userAgent);
      console.log('  Online Status:', navigator.onLine);
      console.log('  Current URL:', window.location.href);

      // Pixel script information
      const pixelScript = document.querySelector('script[src*="connect.facebook.net"]');
      if (pixelScript) {
        console.log('Pixel Script:');
        console.log('  Source:', pixelScript.getAttribute('src'));
        console.log('  Loaded:', pixelScript.getAttribute('data-loaded') || 'unknown');
      }

      // fbq function details
      if (window.fbq) {
        console.log('fbq Function:');
        console.log('  Type:', typeof window.fbq);
        console.log('  Version:', window.fbq.version || 'unknown');
        console.log('  Queue Length:', window.fbq.queue?.length || 0);
        console.log('  Loaded:', window.fbq.loaded || false);
      }

      console.groupEnd();
    }

    // Provide recommendations based on results
    if (!report.overall.success) {
      console.group('💡 Recommendations');
      
      if (!report.scriptLoading.success) {
        console.log('❌ Script Loading Issues:');
        console.log('  - Check network connectivity');
        console.log('  - Verify Facebook CDN is accessible');
        console.log('  - Check for ad blockers or content security policies');
      }

      if (!report.pixelInitialization.success) {
        console.log('❌ Pixel Initialization Issues:');
        console.log('  - Verify REACT_APP_META_PIXEL_ID is set correctly');
        console.log('  - Check that pixel ID matches requirements (1167925005402403)');
        console.log('  - Ensure REACT_APP_META_PIXEL_ENABLED is not set to false');
      }

      if (!report.pageViewTracking.success) {
        console.log('❌ PageView Tracking Issues:');
        console.log('  - Ensure pixel is properly initialized before tracking');
        console.log('  - Check for JavaScript errors in console');
        console.log('  - Verify fbq function is available');
      }

      if (!report.errorHandling.success) {
        console.log('❌ Error Handling Issues:');
        console.log('  - Review error handling implementation');
        console.log('  - Check that application gracefully handles pixel failures');
        console.log('  - Ensure network error scenarios are handled');
      }

      console.groupEnd();
    } else {
      console.log('✅ All validation tests passed! Meta Pixel implementation is working correctly.');
    }

    return report;

  } catch (error) {
    console.error('❌ Validation failed with error:', error);
    
    const errorReport: PixelValidationReport = {
      scriptLoading: { success: false, message: 'Validation error', timestamp: Date.now() },
      pixelInitialization: { success: false, message: 'Validation error', timestamp: Date.now() },
      pageViewTracking: { success: false, message: 'Validation error', timestamp: Date.now() },
      pixelIdValidation: { success: false, message: 'Validation error', timestamp: Date.now() },
      errorHandling: { success: false, message: 'Validation error', timestamp: Date.now() },
      overall: { 
        success: false, 
        message: `Validation failed: ${(error as Error).message}`, 
        timestamp: Date.now() 
      }
    };

    return errorReport;
  }
};

/**
 * Validate pixel on route navigation
 * This function should be called when routes change to ensure PageView tracking works
 */
export const validatePixelOnNavigation = async (): Promise<boolean> => {
  try {
    console.log('🔄 Validating pixel on route navigation...');

    // Check if pixel is still initialized after navigation
    if (!window.fbq || typeof window.fbq !== 'function') {
      console.warn('❌ fbq function not available after navigation');
      return false;
    }

    // Test PageView tracking on navigation
    let trackingWorked = false;
    
    try {
      window.fbq('track', 'PageView');
      trackingWorked = true;
      console.log('✅ PageView tracking works on navigation');
    } catch (error) {
      console.error('❌ PageView tracking failed on navigation:', error);
      trackingWorked = false;
    }

    return trackingWorked;

  } catch (error) {
    console.error('❌ Navigation validation failed:', error);
    return false;
  }
};

/**
 * Performance impact validation
 * Measures the impact of Meta Pixel on page load performance
 */
export const validatePerformanceImpact = (): {
  loadTime: number;
  scriptSize: number;
  networkRequests: number;
} => {
  const performanceEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
  const loadTime = performanceEntries[0]?.loadEventEnd - performanceEntries[0]?.loadEventStart || 0;

  // Check for Meta Pixel related network requests
  const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  const pixelRequests = resourceEntries.filter(entry => 
    entry.name.includes('facebook.net') || 
    entry.name.includes('fbevents.js')
  );

  const scriptSize = pixelRequests.reduce((total, request) => 
    total + (request.transferSize || 0), 0
  );

  console.log('📊 Performance Impact Analysis:');
  console.log(`  Page Load Time: ${loadTime}ms`);
  console.log(`  Pixel Script Size: ${scriptSize} bytes`);
  console.log(`  Pixel Network Requests: ${pixelRequests.length}`);

  return {
    loadTime,
    scriptSize,
    networkRequests: pixelRequests.length
  };
};

// Export for global access in development
if (typeof window !== 'undefined') {
  (window as any).__runPixelValidation__ = validatePixelImplementation;
  (window as any).__validatePixelNavigation__ = validatePixelOnNavigation;
  (window as any).__validatePixelPerformance__ = validatePerformanceImpact;
}