/**
 * Cookie Consent Banner Component
 * 
 * Displays cookie consent banner and manages user preferences
 */

import React, { useState, useEffect } from 'react';
import { CookieConsentService, ConsentPreferences } from '../../services/CookieConsent.service';
import './CookieConsentBanner.scss';

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

  // Detect language from URL or browser
  const currentPath = window.location.pathname;
  const currentSearch = window.location.search;
  const currentHash = window.location.hash;
  
  const isSpanish = currentPath.toUpperCase().endsWith('ES') || 
                   currentPath.toUpperCase().endsWith('/ES') ||
                   currentPath.includes('/es') || 
                   currentPath.includes('/spanish') ||
                   currentSearch.includes('lang=es') ||
                   currentHash.includes('es') ||
                   navigator.language.startsWith('es');

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Cookie Banner Language Detection:', {
      pathname: currentPath,
      search: currentSearch,
      hash: currentHash,
      browserLang: navigator.language,
      isSpanish,
      endsWithES: currentPath.toUpperCase().endsWith('ES')
    });
  }

  // Text content based on language
  const text = {
    title: isSpanish ? '🍪 Cookies' : '🍪 Cookies',
    description: isSpanish 
      ? 'Usamos cookies para mejorar tu experiencia y analizar el tráfico.'
      : 'We use cookies to improve your experience and analyze traffic.',
    acceptAll: isSpanish ? 'Aceptar' : 'Accept',
    rejectAll: isSpanish ? 'Rechazar' : 'Reject',
    customize: isSpanish ? 'Opciones' : 'Options',
    essential: isSpanish ? 'Esenciales' : 'Essential',
    analytics: isSpanish ? 'Análisis' : 'Analytics',
    marketing: isSpanish ? 'Marketing' : 'Marketing',
    required: isSpanish ? '(Req.)' : '(Req.)',
    essentialDesc: isSpanish 
      ? 'Necesarias para el funcionamiento del sitio.'
      : 'Required for the site to function.',
    analyticsDesc: isSpanish
      ? 'Nos ayudan a entender el uso del sitio.'
      : 'Help us understand site usage.',
    marketingDesc: isSpanish
      ? 'Para mostrar anuncios relevantes.'
      : 'To show relevant ads.',
    savePreferences: isSpanish ? 'Guardar' : 'Save',
    cancel: isSpanish ? 'Cancelar' : 'Cancel'
  };

  useEffect(() => {
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