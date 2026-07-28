/**
 * Meta Pixel Verification Utility
 * 
 * This utility helps verify that Meta Pixel is properly installed and working
 * without interfering with the actual pixel functionality
 */

export interface PixelVerificationResult {
  /** The pixel bootstrap ran on this page: `fbq` exists and accepts calls. */
  isInstalled: boolean;
  /** Facebook's library took over from the stub, so events actually leave the browser. */
  isWorking: boolean;
  pixelId: string | null;
  issues: string[];
  recommendations: string[];
}

/**
 * The index.html fallback is only readable as text.
 *
 * When scripting is enabled a <noscript> element's content is never parsed into
 * the DOM, so `document.querySelector('noscript img')` matches nothing however
 * many fallbacks the page ships — which is why this used to be reported as a
 * missing fallback on every single run.
 */
export const hasNoscriptFallback = (): boolean =>
  Array.from(document.querySelectorAll('noscript'))
    .some(noscript => /facebook\.com\/tr/.test(noscript.textContent || ''));

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
    // Check if fbq function exists. Note this only proves the bootstrap ran:
    // the stub is installed by our own code before the script is requested.
    if (!window.fbq || typeof window.fbq !== 'function') {
      result.issues.push('Meta Pixel bootstrap has not run - fbq function not available');
      result.recommendations.push('Check that tracking consent was granted and REACT_APP_META_PIXEL_ENABLED is not "false"');
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

    // Two independent signals that fbevents.js actually arrived. Neither can be
    // faked by the stub, which is the point: the previous check called
    // fbq('track', 'PageView') and treated "it didn't throw" as working. The
    // stub never throws — it queues — so that reported a healthy pixel even
    // when the script had been blocked, while listing the block as an issue in
    // the same breath. It also billed Facebook for a PageView per check.
    const scriptInDom = !!document.querySelector('script[src*="connect.facebook.net"]');
    const libraryTookOver = typeof window.fbq.callMethod === 'function';

    if (!scriptInDom) {
      result.issues.push('Meta Pixel script element not found in DOM');
      result.recommendations.push('The request was refused before it loaded - check for a content blocker, DNS filter or CSP rule');
    }

    if (!libraryTookOver) {
      result.issues.push('fbevents.js has not replaced the fbq stub - events are being queued, not sent');
      result.recommendations.push('Confirm https://connect.facebook.net/en_US/fbevents.js is reachable from this browser');
    }

    result.isWorking = scriptInDom && libraryTookOver;

    // Check noscript fallback (for browsers that never run any of this)
    if (!hasNoscriptFallback()) {
      result.issues.push('Noscript fallback image not found in index.html');
      result.recommendations.push('Add noscript fallback for users with JavaScript disabled');
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

    // Anything still in the queue once the library is live has been handed over;
    // anything queued while it is not is going nowhere.
    const queued = window.fbq?.queue?.length ?? 0;
    if (!libraryTookOver && queued > 0) {
      result.issues.push(`${queued} event(s) queued on the stub and undeliverable`);
      result.recommendations.push('Test with content blockers disabled to confirm');
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
  
  // Overall status. The pass requires a clean run, not just a live library —
  // this used to print the green line above a list of issues explaining that
  // the script had never loaded.
  if (result.isWorking && result.issues.length === 0) {
    console.log('%c✅ Meta Pixel is installed and working correctly!', 'color: #28a745; font-weight: bold;');
  } else if (result.isWorking) {
    console.log('%c⚠️ Meta Pixel is sending events, but the check found issues', 'color: #ffc107; font-weight: bold;');
  } else if (result.isInstalled) {
    console.log('%c⚠️ Meta Pixel bootstrapped but is not sending events', 'color: #ffc107; font-weight: bold;');
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
- Library Took Over: ${typeof window.fbq?.callMethod === 'function'}
- Noscript Fallback: ${hasNoscriptFallback()}
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