/**
 * GA4 Smoobu Tracking Service
 * 
 * Manages Google Analytics 4 tracking enhancements for Smoobu booking iframes.
 * Provides UTM parameter pass-through and widget interaction tracking.
 */

import { CookieConsentService } from './CookieConsent.service';

// TypeScript interfaces for GA4 Smoobu tracking configuration and state management
export interface GA4SmoobuTrackingConfig {
  enabled: boolean;
  debug: boolean;
  visibilityThreshold: number; // milliseconds (default: 3000)
  developmentMode?: boolean;
}

export interface GA4TrackingState {
  isInitialized: boolean;
  trackedIframes: Set<HTMLIFrameElement>;
  eventsTracked: {
    viewEvents: number;
    interactionEvents: number;
  };
  hasError: boolean;
  errorMessage?: string;
}

export interface GA4TrackingError {
  type: 'INITIALIZATION_ERROR' | 'IFRAME_DETECTION_ERROR' | 'UTM_PROCESSING_ERROR' | 'EVENT_TRACKING_ERROR';
  message: string;
  timestamp: number;
}

export interface GA4WidgetEvent {
  event_name: 'booking_widget_view' | 'booking_widget_interact';
  event_category: 'booking';
  custom_parameters?: Record<string, any>;
}

// Supported UTM and Google Ads parameters
export type UTMParameter = 
  | 'utm_source' 
  | 'utm_medium' 
  | 'utm_campaign' 
  | 'utm_content' 
  | 'utm_term';

export type GoogleAdsParameter = 
  | 'gclid' 
  | 'gbraid' 
  | 'wbraid';

export type TrackingParameter = UTMParameter | GoogleAdsParameter;

// Declare global gtag function for TypeScript
declare global {
  interface Window {
    gtag: any;
    dataLayer: any[];
  }
}

export class GA4SmoobuTrackingService {
  private config: GA4SmoobuTrackingConfig;
  private state: GA4TrackingState;
  private errorHistory: GA4TrackingError[] = [];
  private visibilityObserver: IntersectionObserver | null = null;
  private trackedElements: WeakSet<HTMLIFrameElement> = new WeakSet();
  private eventListeners: WeakMap<HTMLIFrameElement, (() => void)[]> = new WeakMap();

  // Supported tracking parameters
  private readonly SUPPORTED_PARAMETERS: TrackingParameter[] = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
    'gclid', 'gbraid', 'wbraid'
  ];

  constructor(config: GA4SmoobuTrackingConfig) {
    this.config = {
      ...config,
      developmentMode: config.developmentMode ?? (process.env.NODE_ENV === 'development')
    };

    this.state = {
      isInitialized: false,
      trackedIframes: new Set(),
      eventsTracked: {
        viewEvents: 0,
        interactionEvents: 0
      },
      hasError: false
    };

    // Initialize development mode features
    if (this.config.developmentMode) {
      this.initializeDevelopmentMode();
    }
  }

  /**
   * Initialize GA4 Smoobu tracking service
   */
  public initialize(): void {
    try {
      if (this.state.isInitialized) {
        this.logDebug('GA4 Smoobu tracking already initialized', 'warn');
        return;
      }

      // Check if service is enabled
      if (!this.config.enabled) {
        this.logDebug('GA4 Smoobu tracking is disabled', 'info');
        return;
      }

      // Check cookie consent before initializing
      if (!this.hasTrackingConsent()) {
        this.logDebug('GA4 Smoobu tracking blocked: user has not consented', 'warn');
        return;
      }

      // Check if gtag is available
      if (!this.isGtagAvailable()) {
        this.logDebug('gtag function not available, GA4 Smoobu tracking cannot initialize', 'warn');
        return;
      }

      this.logDebug('Starting GA4 Smoobu tracking initialization', 'info', { 
        config: this.config 
      });

      // Initialize intersection observer for visibility tracking
      this.initializeVisibilityObserver();

      // Note: Consent change listener is handled by parent component (Smoobu)
      // to avoid duplicate listeners and ensure proper cleanup

      this.state.isInitialized = true;
      this.state.hasError = false;
      this.state.errorMessage = undefined;

      this.logDebug('GA4 Smoobu tracking initialized successfully', 'info');

    } catch (error) {
      const trackingError = this.handleError(error as Error);
      this.logError('GA4 Smoobu tracking initialization failed', error as Error, trackingError);
      
      // Don't throw error to allow graceful degradation
      this.state.hasError = true;
      this.state.errorMessage = (error as Error).message;
    }
  }

  /**
   * Track a page that contains a Smoobu iframe
   */
  public trackPageWithSmoobu(iframeElement: HTMLIFrameElement): void {
    try {
      if (!this.state.isInitialized) {
        this.logDebug('Service not initialized, cannot track Smoobu iframe', 'warn');
        return;
      }

      if (!this.hasTrackingConsent()) {
        this.logDebug('Tracking blocked: user has not consented', 'warn');
        return;
      }

      if (!this.isSmoobuIframe(iframeElement)) {
        this.logDebug('Element is not a Smoobu iframe, skipping tracking', 'warn');
        return;
      }

      if (this.trackedElements.has(iframeElement)) {
        this.logDebug('Iframe already being tracked, skipping', 'info');
        return;
      }

      this.logDebug('Starting tracking for Smoobu iframe', 'info', {
        src: iframeElement.src
      });

      // Process UTM parameters and modify iframe URL
      this.processUTMParameters(iframeElement);

      // Start visibility tracking
      this.startVisibilityTracking(iframeElement);

      // Start interaction tracking
      this.startInteractionTracking(iframeElement);

      // Mark as tracked
      this.trackedElements.add(iframeElement);
      this.state.trackedIframes.add(iframeElement);

      this.logDebug('Smoobu iframe tracking setup complete', 'info');

    } catch (error) {
      const trackingError = this.handleError(error as Error);
      this.logError('Failed to track Smoobu iframe', error as Error, trackingError);
    }
  }

  /**
   * Check if element is a Smoobu iframe
   */
  private isSmoobuIframe(element: HTMLIFrameElement): boolean {
    return element.tagName.toLowerCase() === 'iframe' && 
           !!element.src && 
           element.src.toLowerCase().includes('smoobu');
  }

  /**
   * Process UTM parameters and append to iframe URL
   */
  private processUTMParameters(iframe: HTMLIFrameElement): void {
    try {
      const currentParams = this.detectUTMParameters();
      
      if (currentParams.size === 0) {
        this.logDebug('No UTM parameters detected in current page URL', 'info');
        return;
      }

      this.logDebug('Detected UTM parameters', 'info', {
        parameters: Object.fromEntries(currentParams.entries())
      });

      this.appendParametersToIframe(iframe, currentParams);

    } catch (error) {
      const trackingError = this.handleError(error as Error);
      this.logError('Failed to process UTM parameters', error as Error, trackingError);
    }
  }

  /**
   * Detect UTM and Google Ads parameters from current page URL
   */
  private detectUTMParameters(): URLSearchParams {
    const detectedParams = new URLSearchParams();
    const currentUrl = new URL(window.location.href);

    this.SUPPORTED_PARAMETERS.forEach(param => {
      const value = currentUrl.searchParams.get(param);
      if (value) {
        detectedParams.set(param, value);
      }
    });

    return detectedParams;
  }

  /**
   * Append parameters to iframe URL while preserving existing parameters
   */
  private appendParametersToIframe(iframe: HTMLIFrameElement, parameters: URLSearchParams): void {
    try {
      const iframeUrl = new URL(iframe.src);
      let modified = false;

      parameters.forEach((value, key) => {
        // Only add parameter if it doesn't already exist in iframe URL
        if (!iframeUrl.searchParams.has(key)) {
          iframeUrl.searchParams.set(key, value);
          modified = true;
        }
      });

      if (modified) {
        const newUrl = iframeUrl.toString();
        iframe.src = newUrl;
        
        this.logDebug('Updated iframe URL with UTM parameters', 'info', {
          originalUrl: iframe.src,
          newUrl: newUrl,
          addedParameters: Object.fromEntries(parameters.entries())
        });
      } else {
        this.logDebug('No new parameters to add to iframe URL', 'info');
      }

    } catch (error) {
      throw new Error(`Failed to modify iframe URL: ${(error as Error).message}`);
    }
  }

  /**
   * Initialize intersection observer for visibility tracking
   */
  private initializeVisibilityObserver(): void {
    if (!('IntersectionObserver' in window)) {
      this.logDebug('IntersectionObserver not supported, visibility tracking disabled', 'warn');
      return;
    }

    this.visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.handleIframeVisible(entry.target as HTMLIFrameElement);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of iframe is visible
        rootMargin: '0px'
      }
    );
  }

  /**
   * Start visibility tracking for an iframe
   */
  private startVisibilityTracking(iframe: HTMLIFrameElement): void {
    if (!this.visibilityObserver) {
      this.logDebug('Visibility observer not available, skipping visibility tracking', 'warn');
      return;
    }

    try {
      this.visibilityObserver.observe(iframe);
      this.logDebug('Started visibility tracking for iframe', 'info');
    } catch (error) {
      this.logError('Failed to start visibility tracking', error as Error);
    }
  }

  /**
   * Handle iframe becoming visible
   */
  private handleIframeVisible(iframe: HTMLIFrameElement): void {
    // Use a timeout to ensure 3-second visibility threshold
    setTimeout(() => {
      // Check if iframe is still visible and hasn't been tracked yet
      if (this.isElementVisible(iframe) && !this.hasTrackedViewEvent(iframe)) {
        this.fireBookingWidgetViewEvent();
        this.markViewEventTracked(iframe);
      }
    }, this.config.visibilityThreshold);
  }

  /**
   * Check if element is currently visible in viewport
   */
  private isElementVisible(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  /**
   * Start interaction tracking for an iframe
   */
  private startInteractionTracking(iframe: HTMLIFrameElement): void {
    const listeners: (() => void)[] = [];

    // Mouseenter event listener
    const mouseenterListener = () => {
      if (!this.hasTrackedInteractionEvent(iframe)) {
        this.fireBookingWidgetInteractEvent();
        this.markInteractionEventTracked(iframe);
      }
    };

    // Focus event listener
    const focusListener = () => {
      if (!this.hasTrackedInteractionEvent(iframe)) {
        this.fireBookingWidgetInteractEvent();
        this.markInteractionEventTracked(iframe);
      }
    };

    iframe.addEventListener('mouseenter', mouseenterListener);
    iframe.addEventListener('focus', focusListener);

    listeners.push(
      () => iframe.removeEventListener('mouseenter', mouseenterListener),
      () => iframe.removeEventListener('focus', focusListener)
    );

    // Store listeners for cleanup
    this.eventListeners.set(iframe, listeners);

    this.logDebug('Started interaction tracking for iframe', 'info');
  }

  /**
   * Fire booking_widget_view event to GA4
   */
  private fireBookingWidgetViewEvent(): void {
    try {
      if (!this.isGtagAvailable()) {
        this.logDebug('gtag not available, cannot fire view event', 'warn');
        return;
      }

      window.gtag('event', 'booking_widget_view', {
        event_category: 'booking'
      });

      this.state.eventsTracked.viewEvents++;
      this.logDebug('Fired booking_widget_view event', 'info');

    } catch (error) {
      const trackingError = this.handleError(error as Error);
      this.logError('Failed to fire booking_widget_view event', error as Error, trackingError);
    }
  }

  /**
   * Fire booking_widget_interact event to GA4
   */
  private fireBookingWidgetInteractEvent(): void {
    try {
      if (!this.isGtagAvailable()) {
        this.logDebug('gtag not available, cannot fire interaction event', 'warn');
        return;
      }

      window.gtag('event', 'booking_widget_interact', {
        event_category: 'booking'
      });

      this.state.eventsTracked.interactionEvents++;
      this.logDebug('Fired booking_widget_interact event', 'info');

    } catch (error) {
      const trackingError = this.handleError(error as Error);
      this.logError('Failed to fire booking_widget_interact event', error as Error, trackingError);
    }
  }

  /**
   * Check if gtag function is available
   */
  private isGtagAvailable(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    
    if (!window.gtag) {
      return false;
    }
    
    if (typeof window.gtag !== 'function') {
      return false;
    }
    
    return true;
  }

  /**
   * Check if user has consented to tracking
   */
  private hasTrackingConsent(): boolean {
    try {
      return CookieConsentService.canTrack();
    } catch (error) {
      this.logDebug('Could not check consent status, assuming no consent', 'warn');
      return false;
    }
  }

  /**
   * Setup consent change listener
   * NOTE: This is now handled by parent components to avoid duplicate listeners
   */
  private setupConsentChangeListener(): void {
    // Disabled to prevent duplicate consent listeners
    // Parent components (like Smoobu) should handle consent changes
    // and call cleanup() or reinitialize as needed
    
    this.logDebug('Consent change listener setup skipped - handled by parent component', 'info');
  }

  /**
   * Cleanup tracking resources
   */
  public cleanup(): void {
    try {
      // Stop visibility observer
      if (this.visibilityObserver) {
        try {
          this.visibilityObserver.disconnect();
        } catch (error) {
          this.logError('Error disconnecting visibility observer', error as Error);
        }
        this.visibilityObserver = null;
      }

      // Remove event listeners
      this.state.trackedIframes.forEach(iframe => {
        const listeners = this.eventListeners.get(iframe);
        if (listeners) {
          listeners.forEach(cleanup => {
            try {
              cleanup();
            } catch (error) {
              this.logError('Error removing event listener', error as Error);
            }
          });
        }
      });

      // Clear tracking state
      this.state.trackedIframes.clear();
      this.trackedElements = new WeakSet();
      this.eventListeners = new WeakMap();

      // Cleanup consent listener
      if ((this as any).consentCleanup) {
        try {
          (this as any).consentCleanup();
        } catch (error) {
          this.logError('Error cleaning up consent listener', error as Error);
        }
      }

      this.logDebug('GA4 Smoobu tracking cleanup completed', 'info');

    } catch (error) {
      this.logError('Error during cleanup', error as Error);
    }
  }

  /**
   * Get current tracking state
   */
  public getState(): GA4TrackingState {
    return {
      ...this.state,
      trackedIframes: new Set(this.state.trackedIframes)
    };
  }

  /**
   * Check if service is initialized
   */
  public isInitialized(): boolean {
    return this.state.isInitialized;
  }

  /**
   * Get supported tracking parameters
   */
  public getSupportedParameters(): TrackingParameter[] {
    return [...this.SUPPORTED_PARAMETERS];
  }

  // Private helper methods for tracking state
  private hasTrackedViewEvent(iframe: HTMLIFrameElement): boolean {
    return (iframe as any).__ga4_view_tracked === true;
  }

  private markViewEventTracked(iframe: HTMLIFrameElement): void {
    (iframe as any).__ga4_view_tracked = true;
  }

  private hasTrackedInteractionEvent(iframe: HTMLIFrameElement): boolean {
    return (iframe as any).__ga4_interaction_tracked === true;
  }

  private markInteractionEventTracked(iframe: HTMLIFrameElement): void {
    (iframe as any).__ga4_interaction_tracked = true;
  }

  /**
   * Handle errors with comprehensive logging and state management
   */
  private handleError(error: Error): GA4TrackingError {
    this.state.hasError = true;
    this.state.errorMessage = error.message;

    const trackingError: GA4TrackingError = {
      type: this.getErrorType(error),
      message: error.message,
      timestamp: Date.now()
    };

    // Add to error history for debugging
    this.errorHistory.push(trackingError);

    // Keep only last 10 errors to prevent memory issues
    if (this.errorHistory.length > 10) {
      this.errorHistory = this.errorHistory.slice(-10);
    }

    return trackingError;
  }

  /**
   * Determine error type based on error message
   */
  private getErrorType(error: Error): GA4TrackingError['type'] {
    const message = error.message.toLowerCase();
    
    if (message.includes('iframe') || message.includes('element')) {
      return 'IFRAME_DETECTION_ERROR';
    } else if (message.includes('utm') || message.includes('parameter')) {
      return 'UTM_PROCESSING_ERROR';
    } else if (message.includes('event') || message.includes('gtag')) {
      return 'EVENT_TRACKING_ERROR';
    } else {
      return 'INITIALIZATION_ERROR';
    }
  }

  /**
   * Enhanced debug logging
   */
  private logDebug(message: string, level: 'info' | 'warn' | 'error' = 'info', data?: any): void {
    if (!this.config.debug && !this.config.developmentMode) return;

    const logData = {
      timestamp: new Date().toISOString(),
      state: this.state,
      ...data
    };

    const styles = {
      info: 'color: #4285f4; font-weight: bold;',
      warn: 'color: #ff9800; font-weight: bold;',
      error: 'color: #f44336; font-weight: bold;'
    };

    if (this.config.developmentMode) {
      switch (level) {
        case 'info':
          console.log(`%c[GA4 Smoobu] ${message}`, styles.info, logData);
          break;
        case 'warn':
          console.warn(`%c[GA4 Smoobu] ${message}`, styles.warn, logData);
          break;
        case 'error':
          console.error(`%c[GA4 Smoobu] ${message}`, styles.error, logData);
          break;
      }
    } else {
      switch (level) {
        case 'info':
          console.log(`[GA4 Smoobu] ${message}`, logData);
          break;
        case 'warn':
          console.warn(`[GA4 Smoobu] ${message}`, logData);
          break;
        case 'error':
          console.error(`[GA4 Smoobu] ${message}`, logData);
          break;
      }
    }
  }

  /**
   * Enhanced error logging
   */
  private logError(message: string, error: Error, trackingError?: GA4TrackingError): void {
    const errorData = {
      timestamp: new Date().toISOString(),
      errorMessage: error.message,
      errorStack: error.stack,
      trackingError,
      errorHistory: this.errorHistory.slice(-3),
      state: this.state
    };

    if (this.config.debug) {
      console.error(`[GA4 Smoobu Error] ${message}`, errorData);
    } else {
      console.error(`[GA4 Smoobu Error] ${message}: ${error.message}`);
    }
  }

  /**
   * Get error history for debugging
   */
  public getErrorHistory(): GA4TrackingError[] {
    return [...this.errorHistory];
  }

  /**
   * Initialize development mode features
   */
  private initializeDevelopmentMode(): void {
    if (!this.config.developmentMode) return;

    // Add global debug helper
    if (typeof window !== 'undefined') {
      (window as any).__GA4_SMOOBU_DEBUG__ = {
        getState: () => this.getState(),
        getErrorHistory: () => this.getErrorHistory(),
        getSupportedParameters: () => this.getSupportedParameters(),
        detectUTMParameters: () => Object.fromEntries(this.detectUTMParameters().entries()),
        cleanup: () => this.cleanup(),
        reinitialize: () => this.initialize(),
        validateParameters: (url?: string) => this.validateParametersDebug(url),
        simulateEvents: () => this.simulateEventsDebug(),
        getPerformanceMetrics: () => this.getPerformanceMetrics(),
        validateGA4Setup: () => this.validateGA4Setup(),
        logCurrentState: () => this.logCurrentStateDebug()
      };
    }

    console.log('%c[GA4 Smoobu Development Mode]', 'color: #4285f4; font-weight: bold;', {
      message: 'Development debugging enabled',
      config: this.config,
      debugHelper: 'Access __GA4_SMOOBU_DEBUG__ in console for debugging tools',
      availableMethods: [
        'getState()', 'getErrorHistory()', 'getSupportedParameters()',
        'detectUTMParameters()', 'validateParameters(url?)', 'simulateEvents()',
        'getPerformanceMetrics()', 'validateGA4Setup()', 'logCurrentState()'
      ]
    });
  }

  /**
   * Debug helper: Validate UTM parameters in URL
   */
  private validateParametersDebug(url?: string): any {
    const targetUrl = url || window.location.href;
    const urlObj = new URL(targetUrl);
    const validation = {
      url: targetUrl,
      detectedParameters: {} as Record<string, string>,
      supportedParameters: this.SUPPORTED_PARAMETERS,
      validParameters: [] as string[],
      invalidParameters: [] as string[],
      recommendations: [] as string[]
    };

    // Check each parameter
    this.SUPPORTED_PARAMETERS.forEach(param => {
      const value = urlObj.searchParams.get(param);
      if (value) {
        validation.detectedParameters[param] = value;
        validation.validParameters.push(param);
      }
    });

    // Check for common parameter mistakes
    urlObj.searchParams.forEach((value, key) => {
      if (key.startsWith('utm_') && !this.SUPPORTED_PARAMETERS.includes(key as UTMParameter)) {
        validation.invalidParameters.push(key);
        validation.recommendations.push(`Parameter '${key}' is not supported. Did you mean one of: ${this.SUPPORTED_PARAMETERS.filter(p => p.startsWith('utm_')).join(', ')}?`);
      }
    });

    console.log('%c[GA4 Smoobu Debug] Parameter Validation', 'color: #4285f4; font-weight: bold;', validation);
    return validation;
  }

  /**
   * Debug helper: Simulate GA4 events for testing
   */
  private simulateEventsDebug(): void {
    console.log('%c[GA4 Smoobu Debug] Simulating Events', 'color: #4285f4; font-weight: bold;');
    
    // Simulate view event
    setTimeout(() => {
      console.log('%c[GA4 Smoobu Debug] Simulating booking_widget_view event', 'color: #ff9800;');
      this.fireBookingWidgetViewEvent();
    }, 1000);

    // Simulate interaction event
    setTimeout(() => {
      console.log('%c[GA4 Smoobu Debug] Simulating booking_widget_interact event', 'color: #ff9800;');
      this.fireBookingWidgetInteractEvent();
    }, 2000);
  }

  /**
   * Debug helper: Get performance metrics
   */
  private getPerformanceMetrics(): any {
    const metrics = {
      timestamp: new Date().toISOString(),
      serviceState: this.getState(),
      browserSupport: {
        intersectionObserver: 'IntersectionObserver' in window,
        urlSearchParams: 'URLSearchParams' in window,
        gtag: this.isGtagAvailable()
      },
      memoryUsage: {
        trackedIframes: this.state.trackedIframes.size,
        errorHistoryLength: this.errorHistory.length,
        eventListenersCount: this.eventListeners ? 'WeakMap (cannot count)' : 0
      },
      configuration: this.config
    };

    console.log('%c[GA4 Smoobu Debug] Performance Metrics', 'color: #4285f4; font-weight: bold;', metrics);
    return metrics;
  }

  /**
   * Debug helper: Validate GA4 setup
   */
  private validateGA4Setup(): any {
    const validation = {
      timestamp: new Date().toISOString(),
      gtag: {
        available: this.isGtagAvailable(),
        type: typeof window.gtag,
        dataLayer: Array.isArray(window.dataLayer),
        dataLayerLength: window.dataLayer?.length || 0
      },
      cookieConsent: {
        canTrack: this.hasTrackingConsent(),
        serviceAvailable: typeof CookieConsentService !== 'undefined'
      },
      environment: {
        nodeEnv: process.env.NODE_ENV,
        trackingEnabled: process.env.REACT_APP_GA4_SMOOBU_TRACKING_ENABLED,
        debugMode: process.env.REACT_APP_GA4_SMOOBU_TRACKING_DEBUG,
        visibilityThreshold: process.env.REACT_APP_GA4_SMOOBU_VISIBILITY_THRESHOLD
      },
      recommendations: [] as string[]
    };

    // Add recommendations based on validation
    if (!validation.gtag.available) {
      validation.recommendations.push('GA4 gtag function is not available. Ensure GA4 is properly loaded.');
    }
    if (!validation.cookieConsent.canTrack) {
      validation.recommendations.push('Cookie consent not granted. Tracking will be blocked.');
    }
    if (!validation.gtag.dataLayer) {
      validation.recommendations.push('dataLayer is not available. GA4 events may not be processed.');
    }

    console.log('%c[GA4 Smoobu Debug] GA4 Setup Validation', 'color: #4285f4; font-weight: bold;', validation);
    return validation;
  }

  /**
   * Debug helper: Log current state with detailed information
   */
  private logCurrentStateDebug(): void {
    const debugState = {
      timestamp: new Date().toISOString(),
      service: this.getState(),
      config: this.config,
      errorHistory: this.getErrorHistory(),
      currentUrl: window.location.href,
      detectedParameters: Object.fromEntries(this.detectUTMParameters().entries()),
      smoobuIframes: this.findAllSmoobuIframes(),
      browserInfo: {
        userAgent: navigator.userAgent,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine
      }
    };

    console.log('%c[GA4 Smoobu Debug] Current State', 'color: #4285f4; font-weight: bold;', debugState);
  }

  /**
   * Debug helper: Find all Smoobu iframes on the page
   */
  private findAllSmoobuIframes(): Array<{src: string, id?: string, className?: string}> {
    const iframes = Array.from(document.querySelectorAll('iframe'));
    return iframes
      .filter(iframe => this.isSmoobuIframe(iframe))
      .map(iframe => ({
        src: iframe.src,
        id: iframe.id || undefined,
        className: iframe.className || undefined
      }));
  }
}

// Export a singleton instance factory
export const createGA4SmoobuTrackingService = (config: GA4SmoobuTrackingConfig): GA4SmoobuTrackingService => {
  return new GA4SmoobuTrackingService(config);
};

// Export default configuration factory
export const createGA4SmoobuConfig = (): GA4SmoobuTrackingConfig => {
  return {
    enabled: process.env.REACT_APP_GA4_SMOOBU_TRACKING_ENABLED !== 'false',
    debug: process.env.REACT_APP_GA4_SMOOBU_TRACKING_DEBUG === 'true',
    visibilityThreshold: parseInt(process.env.REACT_APP_GA4_SMOOBU_VISIBILITY_THRESHOLD || '3000', 10),
    developmentMode: process.env.NODE_ENV === 'development'
  };
};