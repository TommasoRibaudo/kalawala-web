/**
 * Cookie Consent Service
 * 
 * Manages user consent for cookies and tracking
 */

export type ConsentStatus = 'pending' | 'accepted' | 'rejected';

export interface ConsentPreferences {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export interface ConsentState {
  status: ConsentStatus;
  preferences: ConsentPreferences;
  timestamp: number;
  version: string;
}

export class CookieConsentService {
  private static readonly STORAGE_KEY = 'cookie_consent';
  private static readonly CONSENT_VERSION = '1.0';
  private static readonly EXPIRY_DAYS = 365;
  /** Must stay in sync with the GA4 measurement ID configured in public/index.html. */
  private static readonly GA4_MEASUREMENT_ID = 'G-Q1LMHMNCMW';

  /**
   * Get current consent state
   */
  public static getConsentState(): ConsentState | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;

      const state: ConsentState = JSON.parse(stored);
      
      // Check if consent is expired (older than EXPIRY_DAYS)
      const expiryTime = state.timestamp + (this.EXPIRY_DAYS * 24 * 60 * 60 * 1000);
      if (Date.now() > expiryTime) {
        this.clearConsent();
        return null;
      }

      // Check if consent version is outdated
      if (state.version !== this.CONSENT_VERSION) {
        this.clearConsent();
        return null;
      }

      return state;
    } catch (error) {
      console.warn('Failed to read consent state:', error);
      return null;
    }
  }

  /**
   * Push the current preferences into Google Consent Mode v2.
   *
   * index.html defaults every storage type to 'denied' before gtag.js loads, so
   * without this update GA4 stays in cookieless-ping mode forever and Google Ads
   * gets no ad_user_data / ad_personalization signal.
   */
  public static syncGoogleConsent(preferences: ConsentPreferences): void {
    try {
      const gtag = (window as any).gtag;
      if (typeof gtag !== 'function') return;

      const analytics = preferences.analytics ? 'granted' : 'denied';
      const marketing = preferences.marketing ? 'granted' : 'denied';

      gtag('consent', 'update', {
        analytics_storage: analytics,
        ad_storage: marketing,
        ad_user_data: marketing,
        ad_personalization: marketing
      });
    } catch (error) {
      console.warn('Failed to sync Google consent state:', error);
    }
  }

  /**
   * GA4 only decides whether a hit marks a new session_start/first_visit
   * (the internal `_ss`/`_fv` flags) as part of processing a 'config' call —
   * that's when it checks for an existing `_ga`/`_ga_<container>` session
   * cookie. index.html's gtag('config', ...) runs before the banner is ever
   * answered, so that check already ran once under denied consent, when no
   * cookie could be written either way, and produced a denied cookieless
   * ping that GA4 never counts.
   *
   * A bare gtag('event', 'page_view', ...) after granting consent does NOT
   * rerun that check — verified against production traffic, it lands as a
   * plain `user_engagement` hit with no `_ss`/`_fv` flags, because event
   * calls don't get the session-initialization treatment that 'config' does.
   * Re-issuing 'config' (the same pattern used for SPA route-change
   * pageviews, see analyticsCompatibilityValidation.ts) forces gtag.js to
   * redo that check now that analytics_storage is granted — this time it
   * finds no session cookie, writes one, and correctly marks the hit as a
   * real, countable session start.
   */
  private static refireInitialPageview(): void {
    try {
      const gtag = (window as any).gtag;
      if (typeof gtag !== 'function') return;

      gtag('config', this.GA4_MEASUREMENT_ID, {
        page_path: window.location.pathname + window.location.search
      });
    } catch (error) {
      console.warn('Failed to refire initial pageview after consent grant:', error);
    }
  }

  /**
   * Save consent preferences
   */
  public static saveConsent(preferences: ConsentPreferences): void {
    const state: ConsentState = {
      status: 'accepted',
      preferences,
      timestamp: Date.now(),
      version: this.CONSENT_VERSION
    };

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));

      this.syncGoogleConsent(preferences);

      // This is a first-time decision (index.tsx's returning-visitor replay
      // calls syncGoogleConsent directly, not saveConsent), so if analytics
      // was just granted, GA4's denied initial pageview never counted a real
      // session — give it one under the now-granted state.
      if (preferences.analytics) {
        this.refireInitialPageview();
      }

      // Dispatch custom event for other components to listen
      window.dispatchEvent(new CustomEvent('consentChanged', {
        detail: state
      }));
    } catch (error) {
      console.error('Failed to save consent state:', error);
    }
  }

  /**
   * Reject all cookies
   */
  public static rejectAll(): void {
    const state: ConsentState = {
      status: 'rejected',
      preferences: {
        analytics: false,
        marketing: false,
        functional: true // Keep functional cookies for basic site operation
      },
      timestamp: Date.now(),
      version: this.CONSENT_VERSION
    };

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));

      this.syncGoogleConsent(state.preferences);

      // Clear any existing tracking cookies
      this.clearTrackingCookies();
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('consentChanged', { 
        detail: state 
      }));
    } catch (error) {
      console.error('Failed to save rejection state:', error);
    }
  }

  /**
   * Accept all cookies
   */
  public static acceptAll(): void {
    this.saveConsent({
      analytics: true,
      marketing: true,
      functional: true
    });
  }

  /**
   * Clear consent state (for testing or reset)
   */
  public static clearConsent(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('consentCleared'));
    } catch (error) {
      console.warn('Failed to clear consent state:', error);
    }
  }

  /**
   * Check if user has given consent for specific category
   */
  public static hasConsent(category: keyof ConsentPreferences): boolean {
    const state = this.getConsentState();
    if (!state || state.status === 'rejected') return false;
    
    return state.preferences[category];
  }

  /**
   * Check if consent banner should be shown
   */
  public static shouldShowBanner(): boolean {
    const state = this.getConsentState();
    return state === null || state.status === 'pending';
  }

  /**
   * Clear tracking cookies when consent is rejected
   */
  private static clearTrackingCookies(): void {
    try {
      // Clear Facebook Pixel cookies
      const fbCookies = ['_fbp', '_fbc', 'fr'];
      fbCookies.forEach(cookieName => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      });

      // Clear Google Analytics cookies
      const gaCookies = ['_ga', '_ga_*', '_gid', '_gat', '_gat_*'];
      gaCookies.forEach(cookieName => {
        if (cookieName.includes('*')) {
          // Handle wildcard cookies
          const prefix = cookieName.replace('*', '');
          Object.keys(document.cookie.split(';')).forEach(cookie => {
            const name = cookie.trim().split('=')[0];
            if (name.startsWith(prefix)) {
              document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`;
              document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
            }
          });
        } else {
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`;
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        }
      });
    } catch (error) {
      console.warn('Failed to clear tracking cookies:', error);
    }
  }

  /**
   * Get consent status for analytics/marketing
   */
  public static canTrack(): boolean {
    return this.hasConsent('analytics') && this.hasConsent('marketing');
  }

  /**
   * Listen for consent changes
   */
  public static onConsentChange(callback: (state: ConsentState) => void): () => void {
    const handler = (event: CustomEvent) => {
      callback(event.detail);
    };

    window.addEventListener('consentChanged', handler as EventListener);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('consentChanged', handler as EventListener);
    };
  }
}