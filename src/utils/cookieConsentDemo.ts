/**
 * Cookie Consent Demo Utilities
 * 
 * Helper functions for testing and demonstrating cookie consent functionality
 */

import { CookieConsentService } from '../services/CookieConsent.service';

/**
 * Demo functions for testing cookie consent in development
 */
export const CookieConsentDemo = {
  /**
   * Reset consent to show banner again
   */
  resetConsent: () => {
    CookieConsentService.clearConsent();
    console.log('✅ Cookie consent reset - banner will show on next page load');
  },

  /**
   * Accept all cookies programmatically
   */
  acceptAll: () => {
    CookieConsentService.acceptAll();
    console.log('✅ All cookies accepted');
  },

  /**
   * Reject all cookies programmatically
   */
  rejectAll: () => {
    CookieConsentService.rejectAll();
    console.log('❌ All non-essential cookies rejected');
  },

  /**
   * Set custom preferences
   */
  setCustomPreferences: (analytics: boolean, marketing: boolean) => {
    CookieConsentService.saveConsent({
      analytics,
      marketing,
      functional: true // Always true
    });
    console.log(`✅ Custom preferences saved: Analytics=${analytics}, Marketing=${marketing}`);
  },

  /**
   * Check current consent status
   */
  checkStatus: () => {
    const state = CookieConsentService.getConsentState();
    const canTrack = CookieConsentService.canTrack();
    
    console.group('🍪 Cookie Consent Status');
    console.log('State:', state);
    console.log('Can Track:', canTrack);
    console.log('Should Show Banner:', CookieConsentService.shouldShowBanner());
    
    if (state) {
      console.log('Analytics Consent:', CookieConsentService.hasConsent('analytics'));
      console.log('Marketing Consent:', CookieConsentService.hasConsent('marketing'));
      console.log('Functional Consent:', CookieConsentService.hasConsent('functional'));
    }
    
    console.groupEnd();
    
    return { state, canTrack };
  },

  /**
   * Simulate different consent scenarios
   */
  simulateScenarios: () => {
    console.group('🎭 Cookie Consent Scenarios');
    
    console.log('1. Testing Accept All...');
    CookieConsentDemo.acceptAll();
    CookieConsentDemo.checkStatus();
    
    console.log('\n2. Testing Reject All...');
    CookieConsentDemo.rejectAll();
    CookieConsentDemo.checkStatus();
    
    console.log('\n3. Testing Custom Preferences (Analytics only)...');
    CookieConsentDemo.setCustomPreferences(true, false);
    CookieConsentDemo.checkStatus();
    
    console.log('\n4. Testing Reset...');
    CookieConsentDemo.resetConsent();
    CookieConsentDemo.checkStatus();
    
    console.groupEnd();
  }
};

// Make demo functions available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).__cookieConsentDemo__ = CookieConsentDemo;
  
  console.log('🍪 Cookie Consent Demo loaded!');
  console.log('Available functions:');
  console.log('  • __cookieConsentDemo__.checkStatus() - Check current status');
  console.log('  • __cookieConsentDemo__.resetConsent() - Reset to show banner');
  console.log('  • __cookieConsentDemo__.acceptAll() - Accept all cookies');
  console.log('  • __cookieConsentDemo__.rejectAll() - Reject all cookies');
  console.log('  • __cookieConsentDemo__.setCustomPreferences(analytics, marketing) - Set custom');
  console.log('  • __cookieConsentDemo__.simulateScenarios() - Run all scenarios');
}