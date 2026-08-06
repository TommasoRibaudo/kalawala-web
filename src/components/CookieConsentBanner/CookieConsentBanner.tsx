/**
 * Cookie Consent Banner Component
 * 
 * Displays cookie consent banner and manages user preferences
 */

import React, { useState, useEffect } from 'react';
import { CookieConsentService, ConsentPreferences } from '../../services/CookieConsent.service';
import { isPrerender } from '../../utils/isPrerender';
import './CookieConsentBanner.scss';
import type { Locale } from '../../i18n';

interface CookieConsentBannerProps {
  onConsentChange?: (canTrack: boolean) => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onConsentChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    analytics: true,
    marketing: true,
    functional: true
  });

  // Language comes from the URL, matching the site-wide convention that a
  // Spanish route ends in "ES" (see hooks/useLanguageDetection.ts).
  //
  // navigator.language used to be part of this test, and it caused two
  // problems. Every page is pre-rendered at build time, when no visitor's
  // browser language exists — so a visitor with a Spanish-locale browser on an
  // English page got English markup from the server and Spanish markup from
  // React, which is a hydration mismatch (React error #418) severe enough that
  // React can throw away the pre-rendered DOM and re-render the whole root
  // (#423). It was also just wrong: it produced a Spanish cookie banner
  // underneath an otherwise entirely English page.
  //
  // Anything derived from the browser rather than the URL has to stay out of
  // the first render for the same reason. If per-browser language is wanted
  // later, apply it in a useEffect after mount, not during render.
  const currentPath = window.location.pathname;
  const currentSearch = window.location.search;

  // Kept verbatim rather than delegating to detectLocaleFromPath: this one also
  // honours /es, /spanish and ?lang=es, which the shared detector deliberately
  // does not. Phase 4 folds these in once the locale is a real route segment.
  const spanish = currentPath.toUpperCase().endsWith('ES') ||
                   currentPath.includes('/es') ||
                   currentPath.includes('/spanish') ||
                   currentSearch.includes('lang=es');
  const locale: Locale = spanish ? 'es' : 'en';

  // Text content based on language
  const text = {
    title: (locale === 'es') ? '🍪 Cookies' : '🍪 Cookies',
    description: (locale === 'es') 
      ? 'Usamos cookies para mejorar tu experiencia y analizar el tráfico.'
      : 'We use cookies to improve your experience and analyze traffic.',
    acceptAll: (locale === 'es') ? 'Aceptar' : 'Accept',
    rejectAll: (locale === 'es') ? 'Rechazar' : 'Reject',
    customize: (locale === 'es') ? 'Opciones' : 'Options',
    essential: (locale === 'es') ? 'Esenciales' : 'Essential',
    analytics: (locale === 'es') ? 'Análisis' : 'Analytics',
    marketing: (locale === 'es') ? 'Marketing' : 'Marketing',
    required: (locale === 'es') ? '(Req.)' : '(Req.)',
    essentialDesc: (locale === 'es') 
      ? 'Necesarias para el funcionamiento del sitio.'
      : 'Required for the site to function.',
    analyticsDesc: (locale === 'es')
      ? 'Nos ayudan a entender el uso del sitio.'
      : 'Help us understand site usage.',
    marketingDesc: (locale === 'es')
      ? 'Para mostrar anuncios relevantes.'
      : 'To show relevant ads.',
    savePreferences: (locale === 'es') ? 'Guardar' : 'Save',
    cancel: (locale === 'es') ? 'Cancelar' : 'Cancel'
  };

  useEffect(() => {
    // react-snap saves the DOM after effects have run, so revealing the banner
    // here baked it into all 46 pre-rendered pages. The client's first render
    // has isVisible=false, so hydration found a banner where React rendered
    // nothing — a mismatch on every single page load (React #418, then #423).
    // Staying invisible during the crawl keeps the snapshot equal to the first
    // client render, and it is better behaviour anyway: a visitor who already
    // answered no longer gets a banner flashing in before JavaScript removes it.
    if (isPrerender()) return;

    try {
      // Check if banner should be shown
      const shouldShow = CookieConsentService.shouldShowBanner();
      setIsVisible(shouldShow);

      // Listen for consent changes
      const cleanup = CookieConsentService.onConsentChange((state) => {
        setIsVisible(false);
        if (onConsentChange) {
          onConsentChange(CookieConsentService.canTrack());
        }
      });

      return cleanup;
    } catch (error) {
      console.error('Cookie consent banner error:', error);
      setIsVisible(false);
      return () => {};
    }
  }, [onConsentChange]);

  const handleAcceptAll = () => {
    CookieConsentService.acceptAll();
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    CookieConsentService.rejectAll();
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    CookieConsentService.saveConsent(preferences);
    setIsVisible(false);
  };

  const handlePreferenceChange = (category: keyof ConsentPreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie-consent-banner" role="dialog" aria-labelledby="cookie-banner-title">
      <div className="cookie-consent-content">
        <div className="cookie-consent-main">
          <div className="cookie-consent-text">
            <h3 id="cookie-banner-title">{text.title}</h3>
            <p>
              {text.description}
            </p>
          </div>

          <div className="cookie-consent-actions">
            <button 
              className="btn btn-primary"
              onClick={handleAcceptAll}
              aria-label={text.acceptAll}
            >
              {text.acceptAll}
            </button>
            
            <button 
              className="btn btn-secondary"
              onClick={handleRejectAll}
              aria-label={text.rejectAll}
            >
              {text.rejectAll}
            </button>
            
            <button 
              className="btn btn-link"
              onClick={() => setShowDetails(!showDetails)}
              aria-label={text.customize}
              aria-expanded={showDetails}
            >
              {text.customize}
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="cookie-consent-details">
            <div className="cookie-categories">
              <div className="cookie-category">
                <div className="cookie-category-header">
                  <label className="cookie-category-label">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => handlePreferenceChange('functional', e.target.checked)}
                      disabled={true} // Functional cookies are always required
                    />
                    <span className="cookie-category-title">{text.essential}</span>
                    <span className="cookie-category-required">{text.required}</span>
                  </label>
                </div>
                <p className="cookie-category-description">
                  {text.essentialDesc}
                </p>
              </div>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <label className="cookie-category-label">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                    />
                    <span className="cookie-category-title">{text.analytics}</span>
                  </label>
                </div>
                <p className="cookie-category-description">
                  {text.analyticsDesc}
                </p>
              </div>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <label className="cookie-category-label">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                    />
                    <span className="cookie-category-title">{text.marketing}</span>
                  </label>
                </div>
                <p className="cookie-category-description">
                  {text.marketingDesc}
                </p>
              </div>
            </div>

            <div className="cookie-consent-custom-actions">
              <button 
                className="btn btn-primary"
                onClick={handleSavePreferences}
                aria-label={text.savePreferences}
              >
                {text.savePreferences}
              </button>
              
              <button 
                className="btn btn-link"
                onClick={() => setShowDetails(false)}
                aria-label={text.cancel}
              >
                {text.cancel}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};