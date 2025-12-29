/**
 * Cookie Consent Tracking Test Utility
 * 
 * This utility helps verify that tracking is properly controlled by cookie consent
 */

import { CookieConsentService } from '../services/CookieConsent.service';

export interface TrackingTestResult {
  scenario: string;
  canTrack: boolean;
  analyticsConsent: boolean;
  marketingConsent: boolean;
  functionalConsent: boolean;
  expectedResult: boolean;
  passed: boolean;
}

/**
 * Test cookie consent tracking behavior with minimal disruption
 */
export function testCookieConsentTracking(): TrackingTestResult[] {
  const results: TrackingTestResult[] = [];

  // Save original state
  const originalState = CookieConsentService.getConsentState();

  try {
    // Temporarily disable event dispatching to prevent rapid consent changes
    const originalDispatchEvent = window.dispatchEvent;
    let eventQueue: CustomEvent[] = [];
    
    // Queue events instead of dispatching them immediately
    window.dispatchEvent = (event: Event) => {
      if (event instanceof CustomEvent && event.type === 'consentChanged') {
        eventQueue.push(event);
        return true;
      }
      return originalDispatchEvent.call(window, event);
    };

    // Test 1: Reject All
    CookieConsentService.rejectAll();
    const rejectAllResult: TrackingTestResult = {
      scenario: 'Reject All Cookies',
      canTrack: CookieConsentService.canTrack(),
      analyticsConsent: CookieConsentService.hasConsent('analytics'),
      marketingConsent: CookieConsentService.hasConsent('marketing'),
      functionalConsent: CookieConsentService.hasConsent('functional'),
      expectedResult: false,
      passed: false
    };
    rejectAllResult.passed = rejectAllResult.canTrack === rejectAllResult.expectedResult;
    results.push(rejectAllResult);

    // Test 2: Accept All
    CookieConsentService.acceptAll();
    const acceptAllResult: TrackingTestResult = {
      scenario: 'Accept All Cookies',
      canTrack: CookieConsentService.canTrack(),
      analyticsConsent: CookieConsentService.hasConsent('analytics'),
      marketingConsent: CookieConsentService.hasConsent('marketing'),
      functionalConsent: CookieConsentService.hasConsent('functional'),
      expectedResult: true,
      passed: false
    };
    acceptAllResult.passed = acceptAllResult.canTrack === acceptAllResult.expectedResult;
    results.push(acceptAllResult);

    // Test 3: Analytics only (should not allow tracking - needs both analytics AND marketing)
    CookieConsentService.saveConsent({
      analytics: true,
      marketing: false,
      functional: true
    });
    const analyticsOnlyResult: TrackingTestResult = {
      scenario: 'Analytics Only (Marketing Disabled)',
      canTrack: CookieConsentService.canTrack(),
      analyticsConsent: CookieConsentService.hasConsent('analytics'),
      marketingConsent: CookieConsentService.hasConsent('marketing'),
      functionalConsent: CookieConsentService.hasConsent('functional'),
      expectedResult: false,
      passed: false
    };
    analyticsOnlyResult.passed = analyticsOnlyResult.canTrack === analyticsOnlyResult.expectedResult;
    results.push(analyticsOnlyResult);

    // Test 4: Marketing only (should not allow tracking - needs both analytics AND marketing)
    CookieConsentService.saveConsent({
      analytics: false,
      marketing: true,
      functional: true
    });
    const marketingOnlyResult: TrackingTestResult = {
      scenario: 'Marketing Only (Analytics Disabled)',
      canTrack: CookieConsentService.canTrack(),
      analyticsConsent: CookieConsentService.hasConsent('analytics'),
      marketingConsent: CookieConsentService.hasConsent('marketing'),
      functionalConsent: CookieConsentService.hasConsent('functional'),
      expectedResult: false,
      passed: false
    };
    marketingOnlyResult.passed = marketingOnlyResult.canTrack === marketingOnlyResult.expectedResult;
    results.push(marketingOnlyResult);

    // Test 5: Functional only (should not allow tracking)
    CookieConsentService.saveConsent({
      analytics: false,
      marketing: false,
      functional: true
    });
    const functionalOnlyResult: TrackingTestResult = {
      scenario: 'Functional Only',
      canTrack: CookieConsentService.canTrack(),
      analyticsConsent: CookieConsentService.hasConsent('analytics'),
      marketingConsent: CookieConsentService.hasConsent('marketing'),
      functionalConsent: CookieConsentService.hasConsent('functional'),
      expectedResult: false,
      passed: false
    };
    functionalOnlyResult.passed = functionalOnlyResult.canTrack === functionalOnlyResult.expectedResult;
    results.push(functionalOnlyResult);

    // Restore original event dispatching
    window.dispatchEvent = originalDispatchEvent;

    // Restore original state first
    if (originalState) {
      CookieConsentService.saveConsent(originalState.preferences);
    } else {
      CookieConsentService.clearConsent();
    }

    // Dispatch only the final state change event to prevent rapid changes
    if (eventQueue.length > 0) {
      const finalEvent = eventQueue[eventQueue.length - 1];
      setTimeout(() => {
        originalDispatchEvent.call(window, finalEvent);
      }, 100);
    }

  } catch (error) {
    console.error('Cookie consent test error:', error);
    
    // Restore original state on error
    if (originalState) {
      CookieConsentService.saveConsent(originalState.preferences);
    } else {
      CookieConsentService.clearConsent();
    }
  }

  return results;
}

/**
 * Display test results in console
 */
export function displayTrackingTestResults(results: TrackingTestResult[]): void {
  console.group('%c🍪 Cookie Consent Tracking Test Results', 'color: #0B3028; font-weight: bold; font-size: 16px;');
  
  const passedTests = results.filter(r => r.passed).length;
  const totalTests = results.length;
  
  console.log(`%c${passedTests}/${totalTests} tests passed`, 
    passedTests === totalTests ? 'color: #28a745; font-weight: bold;' : 'color: #dc3545; font-weight: bold;'
  );
  
  results.forEach((result, index) => {
    const icon = result.passed ? '✅' : '❌';
    const color = result.passed ? '#28a745' : '#dc3545';
    
    console.group(`%c${icon} Test ${index + 1}: ${result.scenario}`, `color: ${color}; font-weight: bold;`);
    console.log('Can Track:', result.canTrack, '(Expected:', result.expectedResult + ')');
    console.log('Analytics Consent:', result.analyticsConsent);
    console.log('Marketing Consent:', result.marketingConsent);
    console.log('Functional Consent:', result.functionalConsent);
    console.groupEnd();
  });
  
  if (passedTests === totalTests) {
    console.log('%c🎉 All tracking tests passed! Cookie consent is working correctly.', 'color: #28a745; font-weight: bold;');
  } else {
    console.warn('%c⚠️ Some tracking tests failed. Please review the implementation.', 'color: #dc3545; font-weight: bold;');
  }
  
  console.groupEnd();
}

/**
 * Run complete tracking test and display results
 */
export function runTrackingTest(): void {
  // Check if user already has consent set - if so, warn before running test
  const currentState = CookieConsentService.getConsentState();
  if (currentState && currentState.status !== 'pending') {
    console.warn('%c🍪 Cookie Consent Test Warning', 'color: #ff9800; font-weight: bold;');
    console.warn('User already has consent preferences set. This test will temporarily change them.');
    console.warn('Original state will be restored after testing.');
  }

  const results = testCookieConsentTracking();
  displayTrackingTestResults(results);
}

/**
 * Reset cookie consent for testing
 */
export function resetCookieConsent(): void {
  CookieConsentService.clearConsent();
  console.log('%c🍪 Cookie consent cleared! Refresh the page to see the banner again.', 'color: #0B3028; font-weight: bold;');
}

// Expose global functions for manual testing
if (typeof window !== 'undefined') {
  (window as any).__testCookieTracking__ = runTrackingTest;
  (window as any).__resetCookieConsent__ = resetCookieConsent;
}