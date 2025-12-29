/**
 * GA4 Smoobu Testing Utilities
 * 
 * Manual testing utilities for GA4 Smoobu tracking validation and debugging.
 * These utilities help developers and QA testers validate the tracking implementation.
 */

import { GA4SmoobuTrackingService, TrackingParameter } from '../services/GA4SmoobuTracking.service';

// Global testing interface
declare global {
  interface Window {
    __GA4_SMOOBU_TEST__: GA4SmoobuTestingUtils;
  }
}

export interface GA4TestResult {
  success: boolean;
  message: string;
  data?: any;
  timestamp: number;
}

export interface UTMTestScenario {
  name: string;
  url: string;
  expectedParameters: Record<string, string>;
  description: string;
}

export interface GA4EventValidation {
  eventName: string;
  eventCategory: string;
  fired: boolean;
  timestamp?: number;
  parameters?: Record<string, any>;
}

export class GA4SmoobuTestingUtils {
  private eventHistory: GA4EventValidation[] = [];
  private originalGtag: any;
  private testResults: GA4TestResult[] = [];

  constructor() {
    this.setupEventInterception();
    this.initializeGlobalTestingInterface();
  }

  /**
   * Setup event interception to track GA4 events
   */
  private setupEventInterception(): void {
    if (typeof window !== 'undefined' && window.gtag) {
      this.originalGtag = window.gtag;
      
      // Intercept gtag calls to track events
      window.gtag = (...args: any[]) => {
        // Call original gtag
        if (this.originalGtag) {
          this.originalGtag.apply(window, args);
        }

        // Track the event if it's a GA4 event
        if (args[0] === 'event' && args[1]) {
          this.recordEvent(args[1], args[2] || {});
        }
      };
    }
  }

  /**
   * Record GA4 event for validation
   */
  private recordEvent(eventName: string, parameters: Record<string, any>): void {
    const validation: GA4EventValidation = {
      eventName,
      eventCategory: parameters.event_category || 'unknown',
      fired: true,
      timestamp: Date.now(),
      parameters
    };

    this.eventHistory.push(validation);
    
    // Keep only last 50 events to prevent memory issues
    if (this.eventHistory.length > 50) {
      this.eventHistory = this.eventHistory.slice(-50);
    }

    console.log('%c[GA4 Test] Event Recorded', 'color: #4caf50; font-weight: bold;', validation);
  }

  /**
   * Initialize global testing interface
   */
  private initializeGlobalTestingInterface(): void {
    if (typeof window !== 'undefined') {
      window.__GA4_SMOOBU_TEST__ = this;
      
      console.log('%c[GA4 Smoobu Testing]', 'color: #4caf50; font-weight: bold;', {
        message: 'Testing utilities loaded',
        usage: 'Access window.__GA4_SMOOBU_TEST__ for testing functions',
        availableMethods: [
          'runFullValidation()', 'testUTMParameters()', 'validateGA4Events()',
          'simulateUserInteraction()', 'testParameterPassthrough()', 'generateTestReport()',
          'clearEventHistory()', 'getEventHistory()', 'testGA4DebugView()'
        ]
      });
    }
  }

  /**
   * Run full validation suite
   */
  public async runFullValidation(): Promise<GA4TestResult[]> {
    console.log('%c[GA4 Test] Starting Full Validation Suite', 'color: #4caf50; font-weight: bold;');
    
    this.testResults = [];
    
    // Test 1: GA4 Setup Validation
    this.testResults.push(await this.validateGA4Setup());
    
    // Test 2: UTM Parameter Detection
    this.testResults.push(await this.testUTMParameters());
    
    // Test 3: Smoobu Iframe Detection
    this.testResults.push(await this.testSmoobuIframeDetection());
    
    // Test 4: Event Tracking Validation
    this.testResults.push(await this.validateGA4Events());
    
    // Test 5: Cookie Consent Integration
    this.testResults.push(await this.testCookieConsentIntegration());

    console.log('%c[GA4 Test] Validation Suite Complete', 'color: #4caf50; font-weight: bold;', {
      results: this.testResults,
      summary: this.generateTestSummary()
    });

    return this.testResults;
  }

  /**
   * Validate GA4 setup and configuration
   */
  private async validateGA4Setup(): Promise<GA4TestResult> {
    try {
      const checks = {
        gtagAvailable: typeof window.gtag === 'function',
        dataLayerExists: Array.isArray(window.dataLayer),
        measurementId: this.findMeasurementId(),
        configLoaded: this.checkGA4Config()
      };

      const allPassed = Object.values(checks).every(check => !!check);

      return {
        success: allPassed,
        message: allPassed ? 'GA4 setup validation passed' : 'GA4 setup validation failed',
        data: checks,
        timestamp: Date.now()
      };
    } catch (error) {
      return {
        success: false,
        message: `GA4 setup validation error: ${(error as Error).message}`,
        timestamp: Date.now()
      };
    }
  }

  /**
   * Test UTM parameter detection and validation
   */
  public async testUTMParameters(customUrl?: string): Promise<GA4TestResult> {
    try {
      const testScenarios: UTMTestScenario[] = [
        {
          name: 'Google Ads Campaign',
          url: 'https://example.com?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale&gclid=abc123',
          expectedParameters: {
            utm_source: 'google',
            utm_medium: 'cpc',
            utm_campaign: 'summer_sale',
            gclid: 'abc123'
          },
          description: 'Test Google Ads campaign with UTM parameters and gclid'
        },
        {
          name: 'Facebook Campaign',
          url: 'https://example.com?utm_source=facebook&utm_medium=social&utm_campaign=brand_awareness&utm_content=video_ad',
          expectedParameters: {
            utm_source: 'facebook',
            utm_medium: 'social',
            utm_campaign: 'brand_awareness',
            utm_content: 'video_ad'
          },
          description: 'Test Facebook campaign with UTM parameters'
        },
        {
          name: 'Email Campaign',
          url: 'https://example.com?utm_source=newsletter&utm_medium=email&utm_campaign=monthly&utm_term=booking',
          expectedParameters: {
            utm_source: 'newsletter',
            utm_medium: 'email',
            utm_campaign: 'monthly',
            utm_term: 'booking'
          },
          description: 'Test email campaign with UTM parameters'
        }
      ];

      const results = testScenarios.map(scenario => {
        const url = new URL(scenario.url);
        const detected: Record<string, string> = {};
        
        Object.keys(scenario.expectedParameters).forEach(param => {
          const value = url.searchParams.get(param);
          if (value) {
            detected[param] = value;
          }
        });

        const matches = Object.keys(scenario.expectedParameters).every(
          param => detected[param] === scenario.expectedParameters[param]
        );

        return {
          scenario: scenario.name,
          expected: scenario.expectedParameters,
          detected,
          matches,
          description: scenario.description
        };
      });

      const allPassed = results.every(result => result.matches);

      return {
        success: allPassed,
        message: allPassed ? 'UTM parameter tests passed' : 'Some UTM parameter tests failed',
        data: { results, customUrl },
        timestamp: Date.now()
      };
    } catch (error) {
      return {
        success: false,
        message: `UTM parameter test error: ${(error as Error).message}`,
        timestamp: Date.now()
      };
    }
  }

  /**
   * Test Smoobu iframe detection
   */
  private async testSmoobuIframeDetection(): Promise<GA4TestResult> {
    try {
      const iframes = Array.from(document.querySelectorAll('iframe'));
      const smoobuIframes = iframes.filter(iframe => 
        iframe.src && iframe.src.toLowerCase().includes('smoobu')
      );

      const testData = {
        totalIframes: iframes.length,
        smoobuIframes: smoobuIframes.length,
        smoobuSources: smoobuIframes.map(iframe => iframe.src),
        allIframeSources: iframes.map(iframe => iframe.src || 'no-src')
      };

      return {
        success: smoobuIframes.length > 0,
        message: smoobuIframes.length > 0 
          ? `Found ${smoobuIframes.length} Smoobu iframe(s)` 
          : 'No Smoobu iframes detected on page',
        data: testData,
        timestamp: Date.now()
      };
    } catch (error) {
      return {
        success: false,
        message: `Iframe detection test error: ${(error as Error).message}`,
        timestamp: Date.now()
      };
    }
  }

  /**
   * Validate GA4 event tracking
   */
  public async validateGA4Events(): Promise<GA4TestResult> {
    try {
      const bookingEvents = this.eventHistory.filter(event => 
        event.eventCategory === 'booking' && 
        (event.eventName === 'booking_widget_view' || event.eventName === 'booking_widget_interact')
      );

      const viewEvents = bookingEvents.filter(event => event.eventName === 'booking_widget_view');
      const interactionEvents = bookingEvents.filter(event => event.eventName === 'booking_widget_interact');

      const validation = {
        totalBookingEvents: bookingEvents.length,
        viewEvents: viewEvents.length,
        interactionEvents: interactionEvents.length,
        eventHistory: bookingEvents,
        lastViewEvent: viewEvents[viewEvents.length - 1],
        lastInteractionEvent: interactionEvents[interactionEvents.length - 1]
      };

      return {
        success: bookingEvents.length > 0,
        message: bookingEvents.length > 0 
          ? `Validated ${bookingEvents.length} booking events` 
          : 'No booking events detected',
        data: validation,
        timestamp: Date.now()
      };
    } catch (error) {
      return {
        success: false,
        message: `Event validation error: ${(error as Error).message}`,
        timestamp: Date.now()
      };
    }
  }

  /**
   * Simulate user interaction for testing
   */
  public async simulateUserInteraction(): Promise<GA4TestResult> {
    try {
      const iframes = Array.from(document.querySelectorAll('iframe'));
      const smoobuIframes = iframes.filter(iframe => 
        iframe.src && iframe.src.toLowerCase().includes('smoobu')
      );

      if (smoobuIframes.length === 0) {
        return {
          success: false,
          message: 'No Smoobu iframes found to simulate interaction',
          timestamp: Date.now()
        };
      }

      const iframe = smoobuIframes[0];
      const initialEventCount = this.eventHistory.length;

      // Simulate mouseenter event
      const mouseenterEvent = new MouseEvent('mouseenter', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      iframe.dispatchEvent(mouseenterEvent);

      // Wait a bit for event processing
      await new Promise(resolve => setTimeout(resolve, 100));

      // Simulate focus event
      iframe.focus();

      // Wait for event processing
      await new Promise(resolve => setTimeout(resolve, 100));

      const newEventCount = this.eventHistory.length;
      const eventsTriggered = newEventCount - initialEventCount;

      return {
        success: eventsTriggered > 0,
        message: `Simulated interaction triggered ${eventsTriggered} event(s)`,
        data: {
          iframesSrc: iframe.src,
          eventsTriggered,
          newEvents: this.eventHistory.slice(initialEventCount)
        },
        timestamp: Date.now()
      };
    } catch (error) {
      return {
        success: false,
        message: `Interaction simulation error: ${(error as Error).message}`,
        timestamp: Date.now()
      };
    }
  }

  /**
   * Test parameter pass-through to iframe
   */
  public async testParameterPassthrough(testParams?: Record<string, string>): Promise<GA4TestResult> {
    try {
      const params = testParams || {
        utm_source: 'test',
        utm_medium: 'manual',
        utm_campaign: 'validation',
        gclid: 'test123'
      };

      // Create test URL with parameters
      const testUrl = new URL(window.location.href);
      Object.entries(params).forEach(([key, value]) => {
        testUrl.searchParams.set(key, value);
      });

      // Temporarily update URL (for testing purposes)
      const originalUrl = window.location.href;
      window.history.replaceState({}, '', testUrl.toString());

      // Find Smoobu iframes and check if parameters are passed
      const iframes = Array.from(document.querySelectorAll('iframe'));
      const smoobuIframes = iframes.filter(iframe => 
        iframe.src && iframe.src.toLowerCase().includes('smoobu')
      );

      const results = smoobuIframes.map(iframe => {
        const iframeUrl = new URL(iframe.src);
        const passedParams: Record<string, string> = {};
        
        Object.keys(params).forEach(param => {
          const value = iframeUrl.searchParams.get(param);
          if (value) {
            passedParams[param] = value;
          }
        });

        return {
          iframeSrc: iframe.src,
          expectedParams: params,
          passedParams,
          allParamsPassed: Object.keys(params).every(param => 
            passedParams[param] === params[param]
          )
        };
      });

      // Restore original URL
      window.history.replaceState({}, '', originalUrl);

      const allPassed = results.every(result => result.allParamsPassed);

      return {
        success: allPassed,
        message: allPassed 
          ? 'Parameter pass-through test passed' 
          : 'Some parameters were not passed correctly',
        data: { results, testParams: params },
        timestamp: Date.now()
      };
    } catch (error) {
      return {
        success: false,
        message: `Parameter pass-through test error: ${(error as Error).message}`,
        timestamp: Date.now()
      };
    }
  }

  /**
   * Test cookie consent integration
   */
  private async testCookieConsentIntegration(): Promise<GA4TestResult> {
    try {
      // Check if CookieConsentService is available
      const { CookieConsentService } = await import('../services/CookieConsent.service');
      
      const consentStatus = {
        canTrack: CookieConsentService.canTrack(),
        serviceAvailable: typeof CookieConsentService !== 'undefined',
        hasConsentMethods: typeof CookieConsentService.onConsentChange === 'function'
      };

      const allPassed = consentStatus.serviceAvailable && consentStatus.hasConsentMethods;

      return {
        success: allPassed,
        message: allPassed 
          ? 'Cookie consent integration test passed' 
          : 'Cookie consent integration issues detected',
        data: consentStatus,
        timestamp: Date.now()
      };
    } catch (error) {
      return {
        success: false,
        message: `Cookie consent test error: ${(error as Error).message}`,
        timestamp: Date.now()
      };
    }
  }

  /**
   * Test GA4 DebugView validation
   */
  public testGA4DebugView(): GA4TestResult {
    try {
      const debugInfo = {
        debugModeEnabled: this.checkDebugMode(),
        measurementId: this.findMeasurementId(),
        debugViewInstructions: {
          step1: 'Open GA4 property in Google Analytics',
          step2: 'Navigate to Configure > DebugView',
          step3: 'Look for events from this session',
          step4: 'Verify booking_widget_view and booking_widget_interact events appear'
        },
        currentEvents: this.eventHistory.filter(event => event.eventCategory === 'booking'),
        debugViewUrl: 'https://analytics.google.com/analytics/web/#/debugview'
      };

      return {
        success: true,
        message: 'GA4 DebugView validation information generated',
        data: debugInfo,
        timestamp: Date.now()
      };
    } catch (error) {
      return {
        success: false,
        message: `DebugView validation error: ${(error as Error).message}`,
        timestamp: Date.now()
      };
    }
  }

  /**
   * Generate comprehensive test report
   */
  public generateTestReport(): any {
    const report = {
      timestamp: new Date().toISOString(),
      testResults: this.testResults,
      eventHistory: this.eventHistory,
      summary: this.generateTestSummary(),
      environment: {
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: Date.now()
      },
      recommendations: this.generateRecommendations()
    };

    console.log('%c[GA4 Test Report]', 'color: #4caf50; font-weight: bold;', report);
    return report;
  }

  /**
   * Generate test summary
   */
  private generateTestSummary(): any {
    const passed = this.testResults.filter(result => result.success).length;
    const total = this.testResults.length;
    
    return {
      totalTests: total,
      passed,
      failed: total - passed,
      successRate: total > 0 ? Math.round((passed / total) * 100) : 0,
      status: passed === total ? 'ALL_PASSED' : passed > 0 ? 'PARTIAL_SUCCESS' : 'ALL_FAILED'
    };
  }

  /**
   * Generate recommendations based on test results
   */
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    this.testResults.forEach(result => {
      if (!result.success) {
        if (result.message.includes('GA4 setup')) {
          recommendations.push('Check GA4 configuration and ensure gtag is properly loaded');
        }
        if (result.message.includes('UTM parameter')) {
          recommendations.push('Verify UTM parameter detection logic and URL parsing');
        }
        if (result.message.includes('Smoobu iframe')) {
          recommendations.push('Ensure Smoobu iframes are present on the page for testing');
        }
        if (result.message.includes('event')) {
          recommendations.push('Check event tracking implementation and gtag function calls');
        }
        if (result.message.includes('consent')) {
          recommendations.push('Verify cookie consent service integration');
        }
      }
    });

    return Array.from(new Set(recommendations)); // Remove duplicates
  }

  // Helper methods
  private findMeasurementId(): string | null {
    const scripts = Array.from(document.querySelectorAll('script'));
    for (const script of scripts) {
      const match = script.textContent?.match(/G-[A-Z0-9]+/);
      if (match) {
        return match[0];
      }
    }
    return null;
  }

  private checkGA4Config(): boolean {
    return window.dataLayer?.some((item: any) => 
      Array.isArray(item) && item[0] === 'config' && item[1]?.startsWith('G-')
    ) || false;
  }

  private checkDebugMode(): boolean {
    return window.location.search.includes('debug_mode=1') ||
           window.dataLayer?.some((item: any) => 
             Array.isArray(item) && item.includes('debug_mode')
           ) || false;
  }

  // Public utility methods
  public clearEventHistory(): void {
    this.eventHistory = [];
    console.log('%c[GA4 Test] Event history cleared', 'color: #4caf50;');
  }

  public getEventHistory(): GA4EventValidation[] {
    return [...this.eventHistory];
  }

  public getTestResults(): GA4TestResult[] {
    return [...this.testResults];
  }
}

// Initialize testing utilities if in development mode
export const initializeGA4SmoobuTesting = (): GA4SmoobuTestingUtils | null => {
  if (process.env.NODE_ENV === 'development' || 
      process.env.REACT_APP_GA4_SMOOBU_TRACKING_DEBUG === 'true') {
    return new GA4SmoobuTestingUtils();
  }
  return null;
};

// Export singleton instance
export const ga4SmoobuTestingUtils = initializeGA4SmoobuTesting();