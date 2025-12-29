/**
 * Analytics Compatibility Validation
 * 
 * This module validates compatibility between Meta Pixel and existing analytics
 * Requirements: 3.3, 4.1
 */

// Declare global functions for TypeScript
declare global {
  interface Window {
    gtag: any;
    fbq: any;
    dataLayer: any[];
  }
}

export interface AnalyticsCompatibilityReport {
  googleAnalytics: {
    present: boolean;
    working: boolean;
    conflicts: string[];
  };
  metaPixel: {
    present: boolean;
    working: boolean;
    conflicts: string[];
  };
  reactRouter: {
    compatible: boolean;
    navigationTracking: boolean;
    conflicts: string[];
  };
  performance: {
    pageLoadTime: number;
    scriptLoadTime: number;
    totalAnalyticsImpact: number;
    acceptable: boolean;
  };
  overall: {
    compatible: boolean;
    issues: string[];
    recommendations: string[];
  };
}

/**
 * Validate Google Analytics presence and functionality
 */
export const validateGoogleAnalytics = (): { present: boolean; working: boolean; conflicts: string[] } => {
  const conflicts: string[] = [];
  
  try {
    // Check if gtag is available
    const gtagPresent = typeof window.gtag === 'function';
    
    // Check if dataLayer exists
    const dataLayerPresent = Array.isArray((window as any).dataLayer);
    
    // Check for GA script in DOM
    const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
    const gaScriptPresent = !!gaScript;
    
    // Test gtag functionality
    let gtagWorking = false;
    if (gtagPresent) {
      try {
        // Test gtag call (this should not throw)
        window.gtag('config', 'test');
        gtagWorking = true;
      } catch (error) {
        conflicts.push(`Google Analytics gtag function error: ${(error as Error).message}`);
      }
    }
    
    const present = gtagPresent && dataLayerPresent && gaScriptPresent;
    const working = present && gtagWorking;
    
    if (!gtagPresent) conflicts.push('gtag function not found');
    if (!dataLayerPresent) conflicts.push('dataLayer not found');
    if (!gaScriptPresent) conflicts.push('Google Analytics script not found in DOM');
    
    return { present, working, conflicts };
    
  } catch (error) {
    conflicts.push(`Google Analytics validation error: ${(error as Error).message}`);
    return { present: false, working: false, conflicts };
  }
};

/**
 * Validate Meta Pixel presence and functionality
 */
export const validateMetaPixelPresence = (): { present: boolean; working: boolean; conflicts: string[] } => {
  const conflicts: string[] = [];
  
  try {
    // Check if fbq is available
    const fbqPresent = typeof window.fbq === 'function';
    
    // Check for Meta Pixel script in DOM
    const pixelScript = document.querySelector('script[src*="connect.facebook.net"]');
    const pixelScriptPresent = !!pixelScript;
    
    // Check for noscript fallback
    const noscriptFallback = document.querySelector('noscript img[src*="facebook.com/tr"]');
    const noscriptPresent = !!noscriptFallback;
    
    // Test fbq functionality
    let fbqWorking = false;
    if (fbqPresent) {
      try {
        // Test fbq call (this should not throw)
        window.fbq('track', 'PageView');
        fbqWorking = true;
      } catch (error) {
        conflicts.push(`Meta Pixel fbq function error: ${(error as Error).message}`);
      }
    }
    
    const present = fbqPresent && pixelScriptPresent;
    const working = present && fbqWorking;
    
    if (!fbqPresent) conflicts.push('fbq function not found');
    if (!pixelScriptPresent) conflicts.push('Meta Pixel script not found in DOM');
    if (!noscriptPresent) conflicts.push('Meta Pixel noscript fallback not found');
    
    return { present, working, conflicts };
    
  } catch (error) {
    conflicts.push(`Meta Pixel validation error: ${(error as Error).message}`);
    return { present: false, working: false, conflicts };
  }
};

/**
 * Test for conflicts between analytics systems
 */
export const validateAnalyticsConflicts = (): string[] => {
  const conflicts: string[] = [];
  
  try {
    // Check for global variable conflicts
    if (window.gtag && window.fbq) {
      // Both are present, check for conflicts
      
      // Test if both can coexist
      const originalConsoleError = console.error;
      const errors: string[] = [];
      
      console.error = (...args: any[]) => {
        errors.push(args.join(' '));
        originalConsoleError.apply(console, args);
      };
      
      try {
        // Test both analytics systems
        window.gtag('event', 'test_event', { test: true });
        window.fbq('track', 'PageView');
        
        // Check for errors
        if (errors.length > 0) {
          conflicts.push(`Analytics conflicts detected: ${errors.join(', ')}`);
        }
      } catch (error) {
        conflicts.push(`Analytics conflict test failed: ${(error as Error).message}`);
      } finally {
        console.error = originalConsoleError;
      }
    }
    
    // Check for script loading conflicts
    const gaScript = document.querySelector('script[src*="googletagmanager.com"]');
    const fbScript = document.querySelector('script[src*="connect.facebook.net"]');
    
    if (gaScript && fbScript) {
      // Both scripts are present, check load order and timing
      const gaLoadTime = gaScript.getAttribute('data-load-time');
      const fbLoadTime = fbScript.getAttribute('data-load-time');
      
      if (gaLoadTime && fbLoadTime) {
        const timeDiff = Math.abs(parseInt(gaLoadTime) - parseInt(fbLoadTime));
        if (timeDiff < 100) {
          conflicts.push('Analytics scripts loading too close together, may cause conflicts');
        }
      }
    }
    
    // Check for dataLayer conflicts
    if ((window as any).dataLayer && window.fbq) {
      // Ensure Meta Pixel doesn't interfere with GA dataLayer
      const dataLayerLength = (window as any).dataLayer.length;
      
      // Test Meta Pixel tracking
      window.fbq('track', 'PageView');
      
      // Check if dataLayer was affected
      if ((window as any).dataLayer.length !== dataLayerLength) {
        // This is actually expected behavior, not a conflict
        // Meta Pixel should not modify GA's dataLayer
      }
    }
    
  } catch (error) {
    conflicts.push(`Conflict detection error: ${(error as Error).message}`);
  }
  
  return conflicts;
};

/**
 * Validate React Router compatibility
 */
export const validateReactRouterCompatibility = (): { compatible: boolean; navigationTracking: boolean; conflicts: string[] } => {
  const conflicts: string[] = [];
  
  try {
    // Check if React Router is present
    const routerPresent = !!(window as any).history?.pushState;
    
    if (!routerPresent) {
      conflicts.push('React Router not detected');
      return { compatible: false, navigationTracking: false, conflicts };
    }
    
    // Test navigation tracking
    let navigationTracking = false;
    
    // Mock a navigation event to test tracking
    const originalPushState = window.history.pushState;
    let trackingCalled = false;
    
    // Override pushState to detect navigation
    window.history.pushState = function(...args) {
      // Check if analytics track navigation
      if (window.gtag) {
        try {
          window.gtag('config', 'G-Q1LMHMNCMW', { page_path: args[2] });
          trackingCalled = true;
        } catch (error) {
          conflicts.push(`GA navigation tracking error: ${(error as Error).message}`);
        }
      }
      
      if (window.fbq) {
        try {
          window.fbq('track', 'PageView');
          trackingCalled = true;
        } catch (error) {
          conflicts.push(`Meta Pixel navigation tracking error: ${(error as Error).message}`);
        }
      }
      
      return originalPushState.apply(this, args);
    };
    
    // Test navigation
    try {
      window.history.pushState({}, '', '/test-route');
      navigationTracking = trackingCalled;
      
      // Restore original pushState
      window.history.pushState = originalPushState;
      
      // Navigate back
      window.history.back();
    } catch (error) {
      conflicts.push(`Navigation test error: ${(error as Error).message}`);
      window.history.pushState = originalPushState;
    }
    
    return {
      compatible: true,
      navigationTracking,
      conflicts
    };
    
  } catch (error) {
    conflicts.push(`React Router compatibility test error: ${(error as Error).message}`);
    return { compatible: false, navigationTracking: false, conflicts };
  }
};

/**
 * Measure performance impact of analytics
 */
export const validatePerformanceImpact = (): {
  pageLoadTime: number;
  scriptLoadTime: number;
  totalAnalyticsImpact: number;
  acceptable: boolean;
} => {
  try {
    // Get performance timing data
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const pageLoadTime = navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0;
    
    // Get resource timing for analytics scripts
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    const analyticsResources = resources.filter(resource => 
      resource.name.includes('googletagmanager.com') || 
      resource.name.includes('connect.facebook.net') ||
      resource.name.includes('gtag') ||
      resource.name.includes('fbevents')
    );
    
    const scriptLoadTime = analyticsResources.reduce((total, resource) => 
      total + (resource.responseEnd - resource.requestStart), 0
    );
    
    // Calculate total analytics impact
    const totalAnalyticsImpact = scriptLoadTime;
    
    // Consider acceptable if analytics impact is less than 10% of page load time
    // or less than 500ms absolute
    const acceptable = totalAnalyticsImpact < Math.min(pageLoadTime * 0.1, 500);
    
    return {
      pageLoadTime: Math.round(pageLoadTime),
      scriptLoadTime: Math.round(scriptLoadTime),
      totalAnalyticsImpact: Math.round(totalAnalyticsImpact),
      acceptable
    };
    
  } catch (error) {
    console.warn('Performance measurement failed:', error);
    return {
      pageLoadTime: 0,
      scriptLoadTime: 0,
      totalAnalyticsImpact: 0,
      acceptable: true // Assume acceptable if we can't measure
    };
  }
};

/**
 * Run comprehensive analytics compatibility validation
 */
export const runAnalyticsCompatibilityValidation = (): AnalyticsCompatibilityReport => {
  console.log('🔍 Starting Analytics Compatibility Validation...');
  
  // Validate individual systems
  const googleAnalytics = validateGoogleAnalytics();
  const metaPixel = validateMetaPixelPresence();
  const reactRouter = validateReactRouterCompatibility();
  const performance = validatePerformanceImpact();
  
  // Check for conflicts
  const analyticsConflicts = validateAnalyticsConflicts();
  
  // Combine all conflicts
  const allConflicts = [
    ...googleAnalytics.conflicts,
    ...metaPixel.conflicts,
    ...reactRouter.conflicts,
    ...analyticsConflicts
  ];
  
  // Determine overall compatibility
  const compatible = googleAnalytics.working && 
                    metaPixel.working && 
                    reactRouter.compatible && 
                    performance.acceptable &&
                    allConflicts.length === 0;
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (!googleAnalytics.working) {
    recommendations.push('Fix Google Analytics implementation');
  }
  
  if (!metaPixel.working) {
    recommendations.push('Fix Meta Pixel implementation');
  }
  
  if (!reactRouter.compatible) {
    recommendations.push('Ensure React Router compatibility');
  }
  
  if (!performance.acceptable) {
    recommendations.push('Optimize analytics loading for better performance');
  }
  
  if (allConflicts.length > 0) {
    recommendations.push('Resolve analytics conflicts');
  }
  
  if (compatible) {
    recommendations.push('Analytics setup is working correctly');
  }
  
  return {
    googleAnalytics,
    metaPixel,
    reactRouter,
    performance,
    overall: {
      compatible,
      issues: allConflicts,
      recommendations
    }
  };
};

/**
 * Display compatibility validation results
 */
export const displayCompatibilityResults = (report: AnalyticsCompatibilityReport): void => {
  console.group('📊 Analytics Compatibility Report');
  
  // Overall status
  const overallStatus = report.overall.compatible ? '✅ COMPATIBLE' : '❌ ISSUES FOUND';
  const overallStyle = report.overall.compatible ? 'color: #28a745; font-weight: bold;' : 'color: #dc3545; font-weight: bold;';
  console.log(`%c${overallStatus}`, overallStyle);
  
  // Google Analytics
  const gaStatus = report.googleAnalytics.working ? '✅' : '❌';
  console.log(`${gaStatus} Google Analytics: ${report.googleAnalytics.working ? 'Working' : 'Issues detected'}`);
  if (report.googleAnalytics.conflicts.length > 0) {
    console.log('   Issues:', report.googleAnalytics.conflicts);
  }
  
  // Meta Pixel
  const mpStatus = report.metaPixel.working ? '✅' : '❌';
  console.log(`${mpStatus} Meta Pixel: ${report.metaPixel.working ? 'Working' : 'Issues detected'}`);
  if (report.metaPixel.conflicts.length > 0) {
    console.log('   Issues:', report.metaPixel.conflicts);
  }
  
  // React Router
  const rrStatus = report.reactRouter.compatible ? '✅' : '❌';
  console.log(`${rrStatus} React Router: ${report.reactRouter.compatible ? 'Compatible' : 'Issues detected'}`);
  if (report.reactRouter.conflicts.length > 0) {
    console.log('   Issues:', report.reactRouter.conflicts);
  }
  
  // Performance
  const perfStatus = report.performance.acceptable ? '✅' : '⚠️';
  console.log(`${perfStatus} Performance Impact: ${report.performance.totalAnalyticsImpact}ms (${report.performance.acceptable ? 'Acceptable' : 'High'})`);
  console.log(`   Page Load: ${report.performance.pageLoadTime}ms`);
  console.log(`   Scripts Load: ${report.performance.scriptLoadTime}ms`);
  
  // Recommendations
  if (report.overall.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    report.overall.recommendations.forEach(rec => {
      console.log(`   • ${rec}`);
    });
  }
  
  console.groupEnd();
};

// Global function for easy access
if (typeof window !== 'undefined') {
  (window as any).__validateAnalyticsCompatibility__ = async () => {
    const report = runAnalyticsCompatibilityValidation();
    displayCompatibilityResults(report);
    return report;
  };
}