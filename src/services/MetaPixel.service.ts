// TypeScript interfaces for Meta Pixel configuration and state management

export interface MetaPixelConfig {
  pixelId: string;
  autoPageView: boolean;
  debug?: boolean;
  developmentMode?: boolean;
}

export interface PixelState {
  isLoaded: boolean;
  isInitialized: boolean;
  hasError: boolean;
  errorMessage?: string;
}

export interface PixelError {
  type: 'SCRIPT_LOAD_ERROR' | 'INITIALIZATION_ERROR' | 'TIMEOUT_ERROR' | 'NETWORK_ERROR';
  message: string;
  timestamp: number;
}

// Declare global fbq function for TypeScript
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
    gtag: any;
    dataLayer: any[];
  }
}

export class MetaPixelService {
  private config: MetaPixelConfig;
  private state: PixelState;
  private readonly SCRIPT_URL = 'https://connect.facebook.net/en_US/fbevents.js';
  private readonly TIMEOUT_MS = 10000;
  private readonly MAX_RETRIES = 2;
  private errorHistory: PixelError[] = [];
  private retryTimeouts: number[] = [1000, 3000]; // Progressive retry delays

  constructor(config: MetaPixelConfig) {
    this.config = {
      ...config,
      developmentMode: config.developmentMode ?? process.env.NODE_ENV === 'development'
    };
    this.state = {
      isLoaded: false,
      isInitialized: false,
      hasError: false
    };

    // Initialize development mode features
    if (this.config.developmentMode) {
      this.initializeDevelopmentMode();
    }
  }

  /**
   * Initialize Meta Pixel with comprehensive error handling and recovery
   */
  public async initialize(): Promise<void> {
    try {
      if (this.state.isInitialized) {
        this.logDebug('Meta Pixel already initialized', 'warn');
        return;
      }

      // Check network connectivity before attempting initialization
      // Only block if we're certain the network is unavailable
      if (!this.isNetworkAvailable()) {
        this.logDebug('Network appears unavailable, but attempting initialization anyway', 'warn');
        // Don't throw error immediately - let the script loading attempt and fail naturally
        // This prevents false positives from navigator.onLine
      }

      this.logDebug('Starting Meta Pixel initialization', 'info', { pixelId: this.config.pixelId });

      // Initialize fbq function if not already present
      this.initializeFbqFunction();

      // Use lazy loading with requestIdleCallback for better performance
      await this.lazyLoadPixelScript();

      // Initialize the pixel with validation
      this.initializePixelWithValidation();

      this.state.isInitialized = true;
      this.state.hasError = false;
      this.state.errorMessage = undefined;
      
      this.logDebug('Meta Pixel initialized successfully', 'info', { 
        pixelId: this.config.pixelId,
        retryCount: this.errorHistory.length 
      });

    } catch (error) {
      const pixelError = this.handleError(error as Error);
      this.logError('Meta Pixel initialization failed', error as Error, pixelError);
      
      // Don't throw error to allow graceful degradation
      // Application should continue to work even if pixel fails
      this.state.hasError = true;
      this.state.errorMessage = (error as Error).message;
    }
  }

  /**
   * Lazy load pixel script using requestIdleCallback for better performance
   */
  private async lazyLoadPixelScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const loadScript = async () => {
        try {
          await this.loadPixelScriptWithRecovery();
          resolve();
        } catch (error) {
          reject(error);
        }
      };

      // Check if page is already loaded for immediate execution
      if (document.readyState === 'complete') {
        // Use requestIdleCallback for non-critical loading
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            loadScript();
          }, { timeout: 1500 }); // Reduced timeout for better performance
        } else {
          // Fallback for browsers without requestIdleCallback
          setTimeout(() => {
            loadScript();
          }, 50); // Reduced delay
        }
      } else {
        // Wait for page load, then use idle callback
        window.addEventListener('load', () => {
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              loadScript();
            }, { timeout: 1000 });
          } else {
            setTimeout(() => {
              loadScript();
            }, 100);
          }
        }, { once: true });
      }
    });
  }

  /**
   * Initialize the fbq function before script loads
   */
  private initializeFbqFunction(): void {
    if (!window.fbq) {
      window.fbq = function() {
        window.fbq.callMethod ? 
          window.fbq.callMethod.apply(window.fbq, arguments) : 
          window.fbq.queue.push(arguments);
      };
      
      if (!window._fbq) {
        window._fbq = window.fbq;
      }
      
      window.fbq.push = window.fbq;
      window.fbq.loaded = true;
      window.fbq.version = '2.0';
      window.fbq.queue = [];
    }

    // Ensure noscript fallback is present
    this.ensureNoscriptFallback();
  }

  /**
   * Ensure noscript fallback is present in the DOM
   */
  private ensureNoscriptFallback(): void {
    try {
      // Check if noscript fallback already exists
      const existingNoscript = document.querySelector('noscript img[src*="facebook.com/tr"]');
      if (existingNoscript) {
        this.logDebug('Noscript fallback already exists', 'info');
        return;
      }

      // Find or create noscript element
      let noscriptElement = document.querySelector('noscript');
      if (!noscriptElement) {
        noscriptElement = document.createElement('noscript');
        document.head.appendChild(noscriptElement);
      }

      // Create fallback image
      const fallbackImg = document.createElement('img');
      fallbackImg.height = 1;
      fallbackImg.width = 1;
      fallbackImg.style.display = 'none';
      fallbackImg.src = `https://www.facebook.com/tr?id=${this.config.pixelId}&ev=PageView&noscript=1`;

      // Add to noscript element
      noscriptElement.appendChild(fallbackImg);

      this.logDebug('Noscript fallback added dynamically', 'info', {
        pixelId: this.config.pixelId,
        src: fallbackImg.src
      });

    } catch (error) {
      this.logDebug('Failed to add noscript fallback', 'warn', {
        error: (error as Error).message
      });
    }
  }

  /**
   * Load Meta Pixel script with enhanced recovery mechanisms
   */
  private async loadPixelScriptWithRecovery(): Promise<void> {
    let retryCount = 0;
    let lastError: Error | null = null;
    
    while (retryCount <= this.MAX_RETRIES) {
      try {
        // Check network before each attempt, but don't fail immediately
        if (!this.isNetworkAvailable()) {
          this.logDebug(`Network check failed on attempt ${retryCount + 1}, but continuing with script loading`, 'warn');
          // Continue with the attempt - let the actual network request determine success/failure
        }

        await this.loadScriptWithTimeout();
        this.state.isLoaded = true;
        
        this.logDebug(`Meta Pixel script loaded successfully${retryCount > 0 ? ` after ${retryCount} retries` : ''}`, 'info');
        return;
        
      } catch (error) {
        lastError = error as Error;
        retryCount++;
        
        const pixelError: PixelError = {
          type: this.getErrorType(lastError),
          message: `Attempt ${retryCount}: ${lastError.message}`,
          timestamp: Date.now()
        };
        
        this.errorHistory.push(pixelError);
        
        if (retryCount > this.MAX_RETRIES) {
          const finalError = new Error(
            `Failed to load Meta Pixel script after ${this.MAX_RETRIES} retries. ` +
            `Last error: ${lastError.message}. ` +
            `Error history: ${this.errorHistory.map(e => e.type).join(', ')}`
          );
          throw finalError;
        }
        
        const retryDelay = this.retryTimeouts[retryCount - 1] || 3000;
        this.logDebug(`Meta Pixel script load attempt ${retryCount} failed, retrying in ${retryDelay}ms`, 'warn', {
          error: lastError.message,
          errorType: pixelError.type
        });
        
        // Progressive delay before retry
        await this.delay(retryDelay);
      }
    }
  }

  /**
   * Load script with timeout handling
   */
  private loadScriptWithTimeout(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      const existingScript = document.querySelector(`script[src="${this.SCRIPT_URL}"]`);
      if (existingScript) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = this.SCRIPT_URL;

      // Set up timeout
      const timeout = setTimeout(() => {
        script.remove();
        reject(new Error('Script loading timeout'));
      }, this.TIMEOUT_MS);

      script.onload = () => {
        clearTimeout(timeout);
        resolve();
      };

      script.onerror = () => {
        clearTimeout(timeout);
        script.remove();
        reject(new Error('Script loading failed'));
      };

      // Add script to document head
      document.head.appendChild(script);
    });
  }

  /**
   * Initialize pixel with validation and error handling
   */
  private initializePixelWithValidation(): void {
    try {
      if (!window.fbq) {
        throw new Error('fbq function not available after script loading');
      }

      if (!this.config.pixelId || this.config.pixelId.trim() === '') {
        throw new Error('Invalid pixel ID provided');
      }

      this.logDebug('Initializing pixel with ID', 'info', { pixelId: this.config.pixelId });

      // Initialize pixel with ID
      window.fbq('init', this.config.pixelId);

      // Validate initialization by checking if fbq is properly configured
      if (typeof window.fbq !== 'function') {
        throw new Error('Pixel initialization failed - fbq function invalid');
      }

      // Track PageView if auto tracking is enabled
      if (this.config.autoPageView) {
        this.trackPageViewSafely();
      }

      this.logDebug('Pixel initialization completed', 'info');

    } catch (error) {
      const initError = new Error(`Pixel initialization failed: ${(error as Error).message}`);
      throw initError;
    }
  }

  /**
   * Safely track PageView with error handling
   */
  private trackPageViewSafely(): void {
    try {
      // Check consent before tracking
      if (!this.hasTrackingConsent()) {
        this.logDebug('Initial PageView tracking blocked: user has not consented', 'warn');
        return;
      }

      window.fbq('track', 'PageView');
      this.logDebug('Initial PageView tracked', 'info');
    } catch (error) {
      this.logDebug('Failed to track initial PageView', 'warn', { error: (error as Error).message });
      // Don't throw - PageView tracking failure shouldn't break initialization
    }
  }

  /**
   * Manually track PageView event with comprehensive error handling
   */
  public trackPageView(): void {
    try {
      // Check consent before tracking
      if (!this.hasTrackingConsent()) {
        this.logDebug('Meta Pixel tracking blocked: user has not consented', 'warn');
        return;
      }

      if (!this.state.isInitialized) {
        this.logDebug('Meta Pixel not initialized, cannot track PageView', 'warn');
        return;
      }

      if (this.state.hasError) {
        this.logDebug('Meta Pixel has errors, skipping PageView tracking', 'warn', {
          errorMessage: this.state.errorMessage
        });
        return;
      }

      if (!window.fbq || typeof window.fbq !== 'function') {
        this.logDebug('fbq function not available, cannot track PageView', 'warn');
        return;
      }

      window.fbq('track', 'PageView');
      this.logDebug('Meta Pixel PageView tracked successfully', 'info');

    } catch (error) {
      const trackingError = new Error(`PageView tracking failed: ${(error as Error).message}`);
      this.handleError(trackingError);
      this.logError('PageView tracking error', error as Error);
      
      // Don't throw - tracking failures shouldn't break the application
    }
  }

  /**
   * Track custom events for better Meta integration
   */
  public trackEvent(eventName: string, parameters?: Record<string, any>): void {
    try {
      // Check consent before tracking
      if (!this.hasTrackingConsent()) {
        this.logDebug(`Meta Pixel custom event tracking blocked: user has not consented`, 'warn');
        return;
      }

      if (!this.state.isInitialized || this.state.hasError) {
        this.logDebug(`Cannot track custom event ${eventName}: pixel not properly initialized`, 'warn');
        return;
      }

      if (!window.fbq || typeof window.fbq !== 'function') {
        this.logDebug(`Cannot track custom event ${eventName}: fbq function not available`, 'warn');
        return;
      }

      if (parameters) {
        window.fbq('track', eventName, parameters);
      } else {
        window.fbq('track', eventName);
      }

      this.logDebug(`Meta Pixel custom event tracked: ${eventName}`, 'info', { parameters });

    } catch (error) {
      this.logError(`Custom event tracking failed for ${eventName}`, error as Error);
    }
  }

  /**
   * Track standard e-commerce events
   */
  public trackViewContent(contentId?: string, contentType?: string): void {
    const parameters: Record<string, any> = {};
    if (contentId) parameters.content_ids = [contentId];
    if (contentType) parameters.content_type = contentType;
    
    this.trackEvent('ViewContent', Object.keys(parameters).length > 0 ? parameters : undefined);
  }

  /**
   * Verify pixel is working by sending a test event
   */
  public verifyPixelWorking(): boolean {
    try {
      if (!this.state.isInitialized || !window.fbq) {
        return false;
      }

      // Send a test event to verify connectivity
      window.fbq('track', 'PageView');
      return true;
    } catch (error) {
      this.logError('Pixel verification failed', error as Error);
      return false;
    }
  }

  /**
   * Check if user has consented to tracking
   */
  private hasTrackingConsent(): boolean {
    try {
      // Import dynamically to avoid circular dependencies
      const { CookieConsentService } = require('./CookieConsent.service');
      return CookieConsentService.canTrack();
    } catch (error) {
      // If consent service is not available, assume no consent
      this.logDebug('Could not check consent status, assuming no consent', 'warn');
      return false;
    }
  }

  /**
   * Check if pixel is initialized
   */
  public isInitialized(): boolean {
    return this.state.isInitialized;
  }

  /**
   * Get current pixel state
   */
  public getState(): PixelState {
    return { ...this.state };
  }

  /**
   * Handle errors with comprehensive logging and state management
   */
  private handleError(error: Error): PixelError {
    this.state.hasError = true;
    this.state.errorMessage = error.message;

    const pixelError: PixelError = {
      type: this.getErrorType(error),
      message: error.message,
      timestamp: Date.now()
    };

    // Add to error history for debugging
    this.errorHistory.push(pixelError);

    // Keep only last 10 errors to prevent memory issues
    if (this.errorHistory.length > 10) {
      this.errorHistory = this.errorHistory.slice(-10);
    }

    return pixelError;
  }

  /**
   * Determine error type based on error message
   */
  private getErrorType(error: Error): PixelError['type'] {
    const message = error.message.toLowerCase();
    
    if (message.includes('timeout')) {
      return 'TIMEOUT_ERROR';
    } else if (message.includes('network') || message.includes('loading') || message.includes('unavailable')) {
      return 'NETWORK_ERROR';
    } else if (message.includes('script')) {
      return 'SCRIPT_LOAD_ERROR';
    } else {
      return 'INITIALIZATION_ERROR';
    }
  }

  /**
   * Check network availability with enhanced detection
   */
  private isNetworkAvailable(): boolean {
    try {
      // If we're in a browser environment, do more comprehensive checks
      if (typeof navigator !== 'undefined') {
        // Check navigator.onLine first
        if ('onLine' in navigator && !navigator.onLine) {
          return false;
        }
        
        // Additional check: if we can access window and document, network is likely available
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          // If the page loaded and we can execute JavaScript, network was available
          return true;
        }
      }
      
      // Assume network is available if we can't detect or if checks pass
      return true;
    } catch (error) {
      // If any error occurs during network detection, assume network is available
      // This prevents false negatives that block pixel initialization
      return true;
    }
  }

  /**
   * Utility method for delays with error handling
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => {
      try {
        setTimeout(resolve, ms);
      } catch (error) {
        // Fallback if setTimeout fails
        resolve();
      }
    });
  }



  /**
   * Enhanced error logging
   */
  private logError(message: string, error: Error, pixelError?: PixelError): void {
    const errorData = {
      timestamp: new Date().toISOString(),
      pixelId: this.config.pixelId,
      errorMessage: error.message,
      errorStack: error.stack,
      pixelError,
      errorHistory: this.errorHistory.slice(-3), // Last 3 errors for context
      state: this.state
    };

    if (this.config.debug) {
      console.error(`[Meta Pixel Error] ${message}`, errorData);
    } else {
      // Always log errors in production, but with less detail
      console.error(`[Meta Pixel Error] ${message}: ${error.message}`);
    }
  }

  /**
   * Get error history for debugging
   */
  public getErrorHistory(): PixelError[] {
    return [...this.errorHistory];
  }

  /**
   * Clear error history
   */
  public clearErrorHistory(): void {
    this.errorHistory = [];
  }

  /**
   * Get detailed status for debugging
   */
  public getDetailedStatus(): {
    state: PixelState;
    config: MetaPixelConfig;
    errorHistory: PixelError[];
    networkAvailable: boolean;
  } {
    return {
      state: { ...this.state },
      config: { ...this.config },
      errorHistory: [...this.errorHistory],
      networkAvailable: this.isNetworkAvailable()
    };
  }

  /**
   * Initialize development mode features
   */
  private initializeDevelopmentMode(): void {
    if (!this.config.developmentMode) return;

    // Add global debug helper
    if (typeof window !== 'undefined') {
      (window as any).__META_PIXEL_DEBUG__ = {
        getStatus: () => this.getDetailedStatus(),
        getErrorHistory: () => this.getErrorHistory(),
        clearErrors: () => this.clearErrorHistory(),
        trackPageView: () => this.trackPageView(),
        reinitialize: () => this.reinitialize()
      };
    }

    // Log development mode activation
    console.log('%c[Meta Pixel Development Mode]', 'color: #1877f2; font-weight: bold;', {
      message: 'Development debugging enabled',
      pixelId: this.config.pixelId,
      debugHelper: 'Access __META_PIXEL_DEBUG__ in console for debugging tools'
    });

    // Validate configuration in development
    this.validateDevelopmentConfiguration();
  }

  /**
   * Validate configuration and show warnings in development
   */
  private validateDevelopmentConfiguration(): void {
    const warnings: string[] = [];

    // Check pixel ID format
    if (!this.config.pixelId || this.config.pixelId.trim() === '') {
      warnings.push('Pixel ID is empty or undefined');
    } else if (!/^\d+$/.test(this.config.pixelId)) {
      warnings.push('Pixel ID should contain only numbers');
    }

    // Check environment variables
    if (!process.env.REACT_APP_META_PIXEL_ID) {
      warnings.push('REACT_APP_META_PIXEL_ID environment variable not set');
    }

    // Check for common configuration issues
    if (this.config.pixelId === 'your-pixel-id-here' || this.config.pixelId === '123456789') {
      warnings.push('Pixel ID appears to be a placeholder value');
    }

    // Display warnings
    if (warnings.length > 0) {
      console.warn('%c[Meta Pixel Configuration Warnings]', 'color: #ff6b35; font-weight: bold;');
      warnings.forEach(warning => {
        console.warn(`  ⚠️  ${warning}`);
      });
    } else {
      console.log('%c[Meta Pixel Configuration]', 'color: #28a745; font-weight: bold;', '✅ Configuration looks good');
    }
  }

  /**
   * Enhanced debug logging with development-specific features
   */
  private logDebug(message: string, level: 'info' | 'warn' | 'error' = 'info', data?: any): void {
    if (!this.config.debug && !this.config.developmentMode) return;

    const logData = {
      timestamp: new Date().toISOString(),
      pixelId: this.config.pixelId,
      state: this.state,
      ...data
    };

    // Enhanced styling for development mode
    const styles = {
      info: 'color: #1877f2; font-weight: bold;',
      warn: 'color: #ff6b35; font-weight: bold;',
      error: 'color: #dc3545; font-weight: bold;'
    };

    if (this.config.developmentMode) {
      switch (level) {
        case 'info':
          console.log(`%c[Meta Pixel] ${message}`, styles.info, logData);
          break;
        case 'warn':
          console.warn(`%c[Meta Pixel] ${message}`, styles.warn, logData);
          break;
        case 'error':
          console.error(`%c[Meta Pixel] ${message}`, styles.error, logData);
          break;
      }
    } else {
      // Standard debug logging
      switch (level) {
        case 'info':
          console.log(`[Meta Pixel] ${message}`, logData);
          break;
        case 'warn':
          console.warn(`[Meta Pixel] ${message}`, logData);
          break;
        case 'error':
          console.error(`[Meta Pixel] ${message}`, logData);
          break;
      }
    }

    // Add to development console if available
    if (this.config.developmentMode && typeof window !== 'undefined') {
      this.addToDevConsole(level, message, logData);
    }
  }

  /**
   * Add log entry to development console
   */
  private addToDevConsole(level: string, message: string, data: any): void {
    if (typeof window === 'undefined') return;

    // Create or get development console
    if (!(window as any).__META_PIXEL_DEV_CONSOLE__) {
      (window as any).__META_PIXEL_DEV_CONSOLE__ = [];
    }

    const devConsole = (window as any).__META_PIXEL_DEV_CONSOLE__;
    
    devConsole.push({
      timestamp: new Date().toISOString(),
      level,
      message,
      data
    });

    // Keep only last 50 entries
    if (devConsole.length > 50) {
      devConsole.splice(0, devConsole.length - 50);
    }
  }

  /**
   * Reinitialize pixel (development helper)
   */
  private async reinitialize(): Promise<void> {
    if (!this.config.developmentMode) {
      console.warn('[Meta Pixel] Reinitialize is only available in development mode');
      return;
    }

    console.log('%c[Meta Pixel] Reinitializing...', 'color: #1877f2; font-weight: bold;');
    
    // Reset state
    this.state = {
      isLoaded: false,
      isInitialized: false,
      hasError: false
    };
    
    this.errorHistory = [];

    // Remove existing script
    const existingScript = document.querySelector(`script[src="${this.SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.remove();
    }

    // Reinitialize
    await this.initialize();
  }

  /**
   * Create development status indicator
   */
  public createStatusIndicator(): HTMLElement | null {
    if (!this.config.developmentMode || typeof document === 'undefined') {
      return null;
    }

    const indicator = document.createElement('div');
    indicator.id = 'meta-pixel-status-indicator';
    indicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: ${this.state.hasError ? '#dc3545' : this.state.isInitialized ? '#28a745' : '#ffc107'};
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    `;

    const status = this.state.hasError ? 'ERROR' : this.state.isInitialized ? 'ACTIVE' : 'LOADING';
    indicator.textContent = `Meta Pixel: ${status}`;
    indicator.title = 'Click for details';

    indicator.addEventListener('click', () => {
      console.log('%c[Meta Pixel Status]', 'color: #1877f2; font-weight: bold;', this.getDetailedStatus());
    });

    return indicator;
  }

  /**
   * Show development console logs
   */
  public showDevConsole(): void {
    if (!this.config.developmentMode) return;

    const devConsole = (window as any).__META_PIXEL_DEV_CONSOLE__ || [];
    
    console.group('%c[Meta Pixel Development Console]', 'color: #1877f2; font-weight: bold;');
    devConsole.forEach((entry: any) => {
      const style = entry.level === 'error' ? 'color: #dc3545' : 
                   entry.level === 'warn' ? 'color: #ff6b35' : 'color: #1877f2';
      console.log(`%c${entry.timestamp} [${entry.level.toUpperCase()}]`, style, entry.message, entry.data);
    });
    console.groupEnd();
  }
}

// Export a singleton instance factory
export const createMetaPixelService = (config: MetaPixelConfig): MetaPixelService => {
  return new MetaPixelService(config);
};