/**
 * Meta Pixel Verification Utility
 * 
 * This utility helps verify that Meta Pixel is properly installed and working
 * without interfering with the actual pixel functionality
 */

export interface PixelVerificationResult {
  isInstalled: boolean;
  isWorking: boolean;
  pixelId: string | null;
  issues: string[];
  recommendations: string[];
}

/**
 * Verify Meta Pixel installation and functionality
 */
export const verifyMetaPixel = (): PixelVerificationResult => {
  const result: PixelVerificationResult = {
    isInstalled: false,
    isWorking: false,
    pixelId: null,
    issues: [],
    recommendations: []
  };

  try {
    // Check if fbq function exists
    if (!window.fbq || typeof window.fbq !== 'function') {
      result.issues.push('Meta Pixel script not loaded - fbq function not available');
      result.recommendations.push('Ensure Meta Pixel script is properly loaded from Facebook CDN');
      return result;
    }

    result.isInstalled = true;

    // Check pixel configuration
    const configuredPixelId = process.env.REACT_APP_META_PIXEL_ID;
    if (!configuredPixelId) {
      result.issues.push('REACT_APP_META_PIXEL_ID environment variable not set');
      result.recommendations.push('Set REACT_APP_META_PIXEL_ID in your .env file');
    } else {
      result.pixelId = configuredPixelId;
    }

    // Check if pixel script is in DOM
    const pixelScript = document.querySelector('script[src*="connect.facebook.net"]');
    if (!pixelScript) {
      result.issues.push('Meta Pixel script element not found in DOM');
      result.recommendations.push('Ensure Meta Pixel script is properly injected into the page');
    }

    // Check noscript fallback
    const noscriptFallback = document.querySelector('noscript img[src*="facebook.com/tr"]');
    if (!noscriptFallback) {
      result.issues.push('Noscript fallback image not found');
      result.recommendations.push('Add noscript fallback for users with JavaScript disabled');
    }

    // Test basic functionality
    try {
      // This should not throw an error if pixel is working
      window.fbq('track', 'PageView');
      result.isWorking = true;
    } catch (error) {
      result.issues.push(`Pixel tracking test failed: ${(error as Error).message}`);
      result.recommendations.push('Check browser console for JavaScript errors');
    }

    // Check for traffic permissions error in console
    const consoleErrors = (window as any).__metaPixelConsoleErrors__ || [];
    const trafficPermissionError = consoleErrors.find((error: string) => 
      error.includes('traffic permission') || error.includes('unavailable on this website')
    );
    
    if (trafficPermissionError) {
      result.issues.push('Traffic permissions blocking pixel - domain not in allowlist');
      result.recommendations.push('Add your domain to Traffic Permissions allowlist in Events Manager');
      result.recommendations.push('Run __fixTrafficPermissions__() for step-by-step instructions');
    }

    // Check for common issues
    if (navigator.onLine === false) {
      result.issues.push('Browser reports offline status');
      result.recommendations.push('Check internet connection');
    }

    // Check for ad blockers (common cause of pixel issues)
    if (window.fbq && window.fbq.queue && window.fbq.queue.length > 10) {
      result.issues.push('Large fbq queue detected - possible ad blocker interference');
      result.recommendations.push('Test with ad blockers disabled');
    }

  } catch (error) {
    result.issues.push(`Verification failed: ${(error as Error).message}`);
    result.recommendations.push('Check browser console for detailed error information');
  }

  return result;
};

/**
 * Display verification results in console
 */
export const displayVerificationResults = (result: PixelVerificationResult): void => {
  console.group('🔍 Meta Pixel Verification Results');
  
  // Overall status
  if (result.isInstalled && result.isWorking) {
    console.log('%c✅ Meta Pixel is installed and working correctly!', 'color: #28a745; font-weight: bold;');
  } else if (result.isInstalled) {
    console.log('%c⚠️ Meta Pixel is installed but may have issues', 'color: #ffc107; font-weight: bold;');
  } else {
    console.log('%c❌ Meta Pixel is not properly installed', 'color: #dc3545; font-weight: bold;');
  }

  // Pixel ID
  if (result.pixelId) {
    console.log(`📊 Pixel ID: ${result.pixelId}`);
  }

  // Issues
  if (result.issues.length > 0) {
    console.group('❌ Issues Found:');
    result.issues.forEach(issue => {
      console.log(`  • ${issue}`);
    });
    console.groupEnd();
  }

  // Recommendations
  if (result.recommendations.length > 0) {
    console.group('💡 Recommendations:');
    result.recommendations.forEach(rec => {
      console.log(`  • ${rec}`);
    });
    console.groupEnd();
  }

  // Additional debugging info
  console.group('🔧 Debug Information:');
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Pixel Enabled:', process.env.REACT_APP_META_PIXEL_ENABLED);
  console.log('Debug Mode:', process.env.REACT_APP_META_PIXEL_DEBUG);
  console.log('Browser Online:', navigator.onLine);
  console.log('Current URL:', window.location.href);
  
  if (window.fbq) {
    console.log('fbq Version:', window.fbq.version || 'unknown');
    console.log('fbq Queue Length:', window.fbq.queue?.length || 0);
  }
  console.groupEnd();

  console.groupEnd();
};

/**
 * Test Meta Pixel with Facebook's official test
 */
export const testWithFacebookPixelHelper = (): void => {
  console.group('🧪 Facebook Pixel Helper Test');
  
  console.log('To verify your pixel with Facebook\'s official tools:');
  console.log('');
  console.log('1. Install Facebook Pixel Helper browser extension:');
  console.log('   https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc');
  console.log('');
  console.log('2. Visit your website and check the extension icon');
  console.log('');
  console.log('3. Use Facebook\'s Test Events tool:');
  console.log('   https://www.facebook.com/events_manager/');
  console.log('');
  console.log('4. Check Events Manager for real-time events:');
  console.log('   Business Manager > Events Manager > Data Sources > Your Pixel');
  
  console.groupEnd();
};

/**
 * Generate Meta Pixel diagnostic report
 */
export const generateDiagnosticReport = (): string => {
  const result = verifyMetaPixel();
  
  const report = `
Meta Pixel Diagnostic Report
Generated: ${new Date().toISOString()}

INSTALLATION STATUS: ${result.isInstalled ? 'INSTALLED' : 'NOT INSTALLED'}
FUNCTIONALITY STATUS: ${result.isWorking ? 'WORKING' : 'NOT WORKING'}
PIXEL ID: ${result.pixelId || 'NOT SET'}

ISSUES (${result.issues.length}):
${result.issues.map(issue => `- ${issue}`).join('\n')}

RECOMMENDATIONS (${result.recommendations.length}):
${result.recommendations.map(rec => `- ${rec}`).join('\n')}

ENVIRONMENT:
- Node Environment: ${process.env.NODE_ENV}
- Pixel Enabled: ${process.env.REACT_APP_META_PIXEL_ENABLED}
- Debug Mode: ${process.env.REACT_APP_META_PIXEL_DEBUG}
- Browser Online: ${navigator.onLine}
- Current URL: ${window.location.href}

TECHNICAL DETAILS:
- fbq Available: ${typeof window.fbq === 'function'}
- fbq Version: ${window.fbq?.version || 'unknown'}
- fbq Queue Length: ${window.fbq?.queue?.length || 0}
- Script in DOM: ${!!document.querySelector('script[src*="connect.facebook.net"]')}
- Noscript Fallback: ${!!document.querySelector('noscript img[src*="facebook.com/tr"]')}
`;

  return report;
};

// Global functions for easy access
if (typeof window !== 'undefined') {
  (window as any).__verifyMetaPixel__ = () => {
    const result = verifyMetaPixel();
    displayVerificationResults(result);
    return result;
  };

  (window as any).__metaPixelDiagnostic__ = () => {
    const report = generateDiagnosticReport();
    console.log(report);
    return report;
  };

  (window as any).__testMetaPixelWithFacebook__ = testWithFacebookPixelHelper;
}