/**
 * Browser Compatibility Test for Meta Pixel
 * 
 * Tests Meta Pixel functionality across different browsers and devices
 * Requirements: 3.3, 4.1
 */

export interface BrowserCompatibilityReport {
  browser: {
    name: string;
    version: string;
    engine: string;
  };
  device: {
    type: 'desktop' | 'tablet' | 'mobile';
    os: string;
  };
  features: {
    javascript: boolean;
    cookies: boolean;
    localStorage: boolean;
    fetch: boolean;
    promises: boolean;
  };
  metaPixel: {
    scriptLoading: boolean;
    initialization: boolean;
    tracking: boolean;
    noscriptFallback: boolean;
  };
  performance: {
    scriptLoadTime: number;
    initializationTime: number;
    trackingLatency: number;
  };
  compatibility: {
    score: number; // 0-100
    issues: string[];
    recommendations: string[];
  };
}

/**
 * Detect browser information
 */
export const detectBrowser = (): { name: string; version: string; engine: string } => {
  const userAgent = navigator.userAgent;
  
  let name = 'Unknown';
  let version = 'Unknown';
  let engine = 'Unknown';
  
  // Chrome
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    name = 'Chrome';
    const match = userAgent.match(/Chrome\/(\d+)/);
    version = match ? match[1] : 'Unknown';
    engine = 'Blink';
  }
  // Firefox
  else if (userAgent.includes('Firefox')) {
    name = 'Firefox';
    const match = userAgent.match(/Firefox\/(\d+)/);
    version = match ? match[1] : 'Unknown';
    engine = 'Gecko';
  }
  // Safari
  else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    name = 'Safari';
    const match = userAgent.match(/Version\/(\d+)/);
    version = match ? match[1] : 'Unknown';
    engine = 'WebKit';
  }
  // Edge
  else if (userAgent.includes('Edg')) {
    name = 'Edge';
    const match = userAgent.match(/Edg\/(\d+)/);
    version = match ? match[1] : 'Unknown';
    engine = 'Blink';
  }
  // Internet Explorer
  else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
    name = 'Internet Explorer';
    const match = userAgent.match(/(?:MSIE |rv:)(\d+)/);
    version = match ? match[1] : 'Unknown';
    engine = 'Trident';
  }
  
  return { name, version, engine };
};

/**
 * Detect device information
 */
export const detectDevice = (): { type: 'desktop' | 'tablet' | 'mobile'; os: string } => {
  const userAgent = navigator.userAgent;
  
  let type: 'desktop' | 'tablet' | 'mobile' = 'desktop';
  let os = 'Unknown';
  
  // Mobile detection
  if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    if (/iPad/i.test(userAgent)) {
      type = 'tablet';
    } else {
      type = 'mobile';
    }
  }
  
  // OS detection
  if (userAgent.includes('Windows')) {
    os = 'Windows';
  } else if (userAgent.includes('Mac')) {
    os = 'macOS';
  } else if (userAgent.includes('Linux')) {
    os = 'Linux';
  } else if (userAgent.includes('Android')) {
    os = 'Android';
  } else if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    os = 'iOS';
  }
  
  return { type, os };
};

/**
 * Test browser features required for Meta Pixel
 */
export const testBrowserFeatures = (): {
  javascript: boolean;
  cookies: boolean;
  localStorage: boolean;
  fetch: boolean;
  promises: boolean;
} => {
  const features = {
    javascript: true, // If this runs, JS is enabled
    cookies: false,
    localStorage: false,
    fetch: false,
    promises: false
  };
  
  // Test cookies
  try {
    document.cookie = 'test=1';
    features.cookies = document.cookie.includes('test=1');
    // Clean up
    document.cookie = 'test=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  } catch (error) {
    features.cookies = false;
  }
  
  // Test localStorage
  try {
    localStorage.setItem('test', '1');
    features.localStorage = localStorage.getItem('test') === '1';
    localStorage.removeItem('test');
  } catch (error) {
    features.localStorage = false;
  }
  
  // Test fetch API
  features.fetch = typeof fetch === 'function';
  
  // Test Promises
  features.promises = typeof Promise === 'function';
  
  return features;
};

/**
 * Test Meta Pixel functionality in current browser
 */
export const testMetaPixelCompatibility = async (): Promise<{
  scriptLoading: boolean;
  initialization: boolean;
  tracking: boolean;
  noscriptFallback: boolean;
}> => {
  const results = {
    scriptLoading: false,
    initialization: false,
    tracking: false,
    noscriptFallback: false
  };
  
  try {
    // Test script loading
    const pixelScript = document.querySelector('script[src*="connect.facebook.net"]');
    results.scriptLoading = !!pixelScript;
    
    // Test initialization
    results.initialization = typeof window.fbq === 'function';
    
    // Test tracking
    if (window.fbq) {
      try {
        // Test if fbq can be called without errors
        window.fbq('track', 'PageView');
        results.tracking = true;
      } catch (error) {
        console.warn('Meta Pixel tracking test failed:', error);
        results.tracking = false;
      }
    }
    
    // Test noscript fallback
    const noscriptImg = document.querySelector('noscript img[src*="facebook.com/tr"]');
    results.noscriptFallback = !!noscriptImg;
    
  } catch (error) {
    console.error('Meta Pixel compatibility test failed:', error);
  }
  
  return results;
};

/**
 * Measure Meta Pixel performance in current browser
 */
export const measureMetaPixelPerformance = (): {
  scriptLoadTime: number;
  initializationTime: number;
  trackingLatency: number;
} => {
  const performance = {
    scriptLoadTime: 0,
    initializationTime: 0,
    trackingLatency: 0
  };
  
  try {
    // Get resource timing for Meta Pixel script
    const resources = window.performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const pixelResource = resources.find(resource => 
      resource.name.includes('connect.facebook.net') || 
      resource.name.includes('fbevents.js')
    );
    
    if (pixelResource) {
      performance.scriptLoadTime = pixelResource.responseEnd - pixelResource.requestStart;
    }
    
    // Measure tracking latency
    if (window.fbq) {
      const startTime = Date.now();
      try {
        window.fbq('track', 'PageView');
        performance.trackingLatency = Date.now() - startTime;
      } catch (error) {
        console.warn('Tracking latency measurement failed:', error);
      }
    }
    
    // Initialization time is harder to measure precisely
    // We'll estimate based on when fbq becomes available
    performance.initializationTime = performance.scriptLoadTime + 50; // Estimate
    
  } catch (error) {
    console.warn('Performance measurement failed:', error);
  }
  
  return {
    scriptLoadTime: Math.round(performance.scriptLoadTime),
    initializationTime: Math.round(performance.initializationTime),
    trackingLatency: Math.round(performance.trackingLatency)
  };
};

/**
 * Calculate compatibility score and generate recommendations
 */
export const calculateCompatibilityScore = (
  browser: { name: string; version: string; engine: string },
  features: any,
  metaPixel: any,
  performance: any
): { score: number; issues: string[]; recommendations: string[] } => {
  let score = 100;
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  // Browser compatibility scoring
  const browserVersion = parseInt(browser.version);
  
  // Check for outdated browsers
  if (browser.name === 'Internet Explorer') {
    score -= 50;
    issues.push('Internet Explorer is not fully supported');
    recommendations.push('Upgrade to a modern browser (Chrome, Firefox, Safari, Edge)');
  } else if (browser.name === 'Chrome' && browserVersion < 60) {
    score -= 20;
    issues.push('Chrome version is outdated');
    recommendations.push('Update Chrome to the latest version');
  } else if (browser.name === 'Firefox' && browserVersion < 55) {
    score -= 20;
    issues.push('Firefox version is outdated');
    recommendations.push('Update Firefox to the latest version');
  } else if (browser.name === 'Safari' && browserVersion < 12) {
    score -= 20;
    issues.push('Safari version is outdated');
    recommendations.push('Update Safari to the latest version');
  }
  
  // Feature compatibility scoring
  if (!features.javascript) {
    score -= 50;
    issues.push('JavaScript is disabled');
    recommendations.push('Enable JavaScript for full functionality');
  }
  
  if (!features.cookies) {
    score -= 20;
    issues.push('Cookies are disabled');
    recommendations.push('Enable cookies for proper tracking');
  }
  
  if (!features.fetch) {
    score -= 10;
    issues.push('Fetch API not supported');
    recommendations.push('Browser may have limited functionality');
  }
  
  if (!features.promises) {
    score -= 15;
    issues.push('Promises not supported');
    recommendations.push('Browser may have compatibility issues');
  }
  
  // Meta Pixel functionality scoring
  if (!metaPixel.scriptLoading) {
    score -= 30;
    issues.push('Meta Pixel script failed to load');
    recommendations.push('Check network connectivity and ad blockers');
  }
  
  if (!metaPixel.initialization) {
    score -= 25;
    issues.push('Meta Pixel failed to initialize');
    recommendations.push('Check for JavaScript errors and conflicts');
  }
  
  if (!metaPixel.tracking) {
    score -= 20;
    issues.push('Meta Pixel tracking not working');
    recommendations.push('Verify pixel configuration and network access');
  }
  
  if (!metaPixel.noscriptFallback) {
    score -= 5;
    issues.push('Noscript fallback not found');
    recommendations.push('Add noscript fallback for better coverage');
  }
  
  // Performance scoring
  if (performance.scriptLoadTime > 2000) {
    score -= 10;
    issues.push('Slow script loading');
    recommendations.push('Optimize network connection or use CDN');
  }
  
  if (performance.trackingLatency > 100) {
    score -= 5;
    issues.push('High tracking latency');
    recommendations.push('Check network performance');
  }
  
  // Ensure score doesn't go below 0
  score = Math.max(0, score);
  
  return { score, issues, recommendations };
};

/**
 * Run comprehensive browser compatibility test
 */
export const runBrowserCompatibilityTest = async (): Promise<BrowserCompatibilityReport> => {
  console.log('🌐 Starting Browser Compatibility Test...');
  
  const browser = detectBrowser();
  const device = detectDevice();
  const features = testBrowserFeatures();
  const metaPixel = await testMetaPixelCompatibility();
  const performance = measureMetaPixelPerformance();
  
  const compatibility = calculateCompatibilityScore(browser, features, metaPixel, performance);
  
  return {
    browser,
    device,
    features,
    metaPixel,
    performance,
    compatibility
  };
};

/**
 * Display browser compatibility results
 */
export const displayBrowserCompatibilityResults = (report: BrowserCompatibilityReport): void => {
  console.group('🌐 Browser Compatibility Report');
  
  // Browser info
  console.log(`Browser: ${report.browser.name} ${report.browser.version} (${report.browser.engine})`);
  console.log(`Device: ${report.device.type} - ${report.device.os}`);
  
  // Compatibility score
  const scoreColor = report.compatibility.score >= 80 ? '#28a745' : 
                    report.compatibility.score >= 60 ? '#ffc107' : '#dc3545';
  console.log(`%cCompatibility Score: ${report.compatibility.score}/100`, `color: ${scoreColor}; font-weight: bold;`);
  
  // Features
  console.log('\n🔧 Browser Features:');
  Object.entries(report.features).forEach(([feature, supported]) => {
    const icon = supported ? '✅' : '❌';
    console.log(`  ${icon} ${feature}: ${supported ? 'Supported' : 'Not supported'}`);
  });
  
  // Meta Pixel functionality
  console.log('\n📊 Meta Pixel Functionality:');
  Object.entries(report.metaPixel).forEach(([feature, working]) => {
    const icon = working ? '✅' : '❌';
    console.log(`  ${icon} ${feature}: ${working ? 'Working' : 'Not working'}`);
  });
  
  // Performance
  console.log('\n⚡ Performance:');
  console.log(`  Script Load Time: ${report.performance.scriptLoadTime}ms`);
  console.log(`  Initialization Time: ${report.performance.initializationTime}ms`);
  console.log(`  Tracking Latency: ${report.performance.trackingLatency}ms`);
  
  // Issues and recommendations
  if (report.compatibility.issues.length > 0) {
    console.log('\n⚠️ Issues:');
    report.compatibility.issues.forEach(issue => {
      console.log(`  • ${issue}`);
    });
  }
  
  if (report.compatibility.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    report.compatibility.recommendations.forEach(rec => {
      console.log(`  • ${rec}`);
    });
  }
  
  console.groupEnd();
};

// Global function for easy access
if (typeof window !== 'undefined') {
  (window as any).__testBrowserCompatibility__ = async () => {
    const report = await runBrowserCompatibilityTest();
    displayBrowserCompatibilityResults(report);
    return report;
  };
}