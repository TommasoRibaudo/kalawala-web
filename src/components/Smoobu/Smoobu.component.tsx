import { useEffect, useState, useRef } from 'react';
import './Smoobu.style.scss';
import React from 'react';
import IframeSkeleton from '../IframeSkeleton/IframeSkeleton.component';
import { GA4SmoobuTrackingService, createGA4SmoobuConfig } from '../../services/GA4SmoobuTracking.service';
import { CookieConsentService } from '../../services/CookieConsent.service';
import { useLanguageDetection } from '../../hooks/useLanguageDetection';
declare global {
  interface Window {
    BookingToolIframe: {
      initialize: (params: {
        url: string;
        baseUrl: string;
        target: string;
      }) => void;
    };
  }
}

interface ISmoobu {
  homeCode?: number;
}

function Smoobu({ homeCode }: ISmoobu) {
  const [key, setKey] = useState(0); // Add key state
  const [isLoading, setIsLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeLoadedRef = useRef(false);
  const trackingServiceRef = useRef<GA4SmoobuTrackingService | null>(null);
  const consentCleanupRef = useRef<(() => void) | null>(null);
  const processingConsentRef = useRef<boolean>(false);
  const smoobuUrl: string = process.env.REACT_APP_SMOOBU_URL!;
  const houseCodesObject = process.env.REACT_APP_HOUSE_CODES ? JSON.parse(process.env.REACT_APP_HOUSE_CODES) : {};
  const url: string = homeCode ? smoobuUrl + houseCodesObject[homeCode] : smoobuUrl;
  const isSpanishPage = useLanguageDetection();

  // Initialize GA4 tracking service
  const initializeTracking = (iframe: HTMLIFrameElement) => {
    try {
      // Check if user has consented to tracking
      if (!CookieConsentService.canTrack()) {
        console.log('[Smoobu] GA4 tracking blocked: user has not consented');
        return;
      }

      // Create and initialize tracking service if not already done
      if (!trackingServiceRef.current) {
        const config = createGA4SmoobuConfig();
        trackingServiceRef.current = new GA4SmoobuTrackingService(config);
        trackingServiceRef.current.initialize();
      }

      // Start tracking for this iframe
      if (trackingServiceRef.current && trackingServiceRef.current.isInitialized()) {
        trackingServiceRef.current.trackPageWithSmoobu(iframe);
        console.log('[Smoobu] GA4 tracking initialized for iframe');
      }
    } catch (error) {
      console.error('[Smoobu] Failed to initialize GA4 tracking:', error);
    }
  };

  // Handle consent changes with debouncing to prevent rapid changes
  const setupConsentListener = () => {
    // Clean up existing listener
    if (consentCleanupRef.current) {
      consentCleanupRef.current();
    }

    let debounceTimeout: NodeJS.Timeout;

    // Set up new consent change listener with debouncing
    consentCleanupRef.current = CookieConsentService.onConsentChange((state) => {
      // Clear previous timeout
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      // Debounce consent changes to prevent rapid firing
      debounceTimeout = setTimeout(() => {
        // Prevent processing if already processing a consent change
        if (processingConsentRef.current) {
          return;
        }

        processingConsentRef.current = true;
        
        try {
          const canTrack = state.preferences.analytics && state.preferences.marketing;
          
          if (!canTrack && trackingServiceRef.current) {
            // User revoked consent, cleanup tracking
            console.log('[Smoobu] Consent revoked, stopping GA4 tracking');
            trackingServiceRef.current.cleanup();
            trackingServiceRef.current = null;
          } else if (canTrack && !trackingServiceRef.current) {
            // User granted consent, try to initialize tracking
            console.log('[Smoobu] Consent granted, attempting to initialize GA4 tracking');
            const iframe = document.querySelector('#apartmentIframeAll iframe') as HTMLIFrameElement;
            if (iframe && iframeLoadedRef.current) {
              initializeTracking(iframe);
            }
          }
        } finally {
          // Reset processing flag after a short delay
          setTimeout(() => {
            processingConsentRef.current = false;
          }, 100);
        }
      }, 300); // 300ms debounce delay
    });

    // Return cleanup function that also clears the timeout
    const originalCleanup = consentCleanupRef.current;
    consentCleanupRef.current = () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
      originalCleanup();
    };
  };

  useEffect(() => {
    
    if (homeCode) {
      setIsLoading(true);
      setIframeLoaded(false);
      iframeLoadedRef.current = false;
      
      // Load script properly using dynamic script loading
      const loadScript = () => {
        return new Promise<void>((resolve, reject) => {
          // Check if script already exists
          const existingScript = document.querySelector('script[src="https://login.smoobu.com/js/Settings/BookingToolIframe.js"]');
          if (existingScript) {
            if (window.BookingToolIframe) {
              resolve();
            } else {
              existingScript.addEventListener('load', () => resolve());
              existingScript.addEventListener('error', () => reject());
            }
            return;
          }
          
          const script = document.createElement('script');
          script.src = 'https://login.smoobu.com/js/Settings/BookingToolIframe.js';
          script.async = true;
          script.onload = () => {
            resolve();
          };
          script.onerror = () => {
            reject();
          };
          document.head.appendChild(script);
        });
      };
      
      // Load script and then initialize
      loadScript()
        .then(() => {
          
          if (window.BookingToolIframe) {
            try {
              window.BookingToolIframe.initialize({
                url: url,
                baseUrl: 'https://login.smoobu.com/',
                target: '#apartmentIframeAll'
              });
            } catch (error) {
              console.error('❌ Error initializing BookingToolIframe:', error);
            }
            
            const apartmentFrame = document.getElementById('apartmentIframeAll');
            if (apartmentFrame) {
              apartmentFrame.classList.add('apartment-frame-loaded');
            }
            
            // Set up iframe load detection
            const checkIframeLoaded = () => {
              const iframe = document.querySelector('#apartmentIframeAll iframe') as HTMLIFrameElement;
              
              if (iframe) {
                
                // Check if iframe has content
                if (iframe.contentDocument && iframe.contentDocument.body && iframe.contentDocument.body.children.length > 0) {
                  iframeLoadedRef.current = true;
                  setIframeLoaded(true);
                  setIsLoading(false);
                  
                  // Initialize GA4 tracking after iframe loads
                  initializeTracking(iframe);
                  return;
                }
                
                iframe.onload = () => {
                  setTimeout(() => {
                    iframeLoadedRef.current = true;
                    setIframeLoaded(true);
                    setIsLoading(false);
                    
                    // Initialize GA4 tracking after iframe loads
                    initializeTracking(iframe);
                  }, 500);
                };
              } else {
                setTimeout(checkIframeLoaded, 100);
              }
            };
            
            setTimeout(checkIframeLoaded, 200);
            
            // Fallback timeout - shorter timeout for better UX
            setTimeout(() => {
              if (!iframeLoadedRef.current) {
                iframeLoadedRef.current = true;
                setIframeLoaded(true);
                setIsLoading(false);
                
                // Try to initialize tracking even on fallback timeout
                const iframe = document.querySelector('#apartmentIframeAll iframe') as HTMLIFrameElement;
                if (iframe) {
                  initializeTracking(iframe);
                }
              }
            }, 5000);
          } else {
            console.error('❌ BookingToolIframe not available after script load');
            // Force hide skeleton after script load failure
            setTimeout(() => {
              iframeLoadedRef.current = true;
              setIframeLoaded(true);
              setIsLoading(false);
            }, 2000);
          }
        })
        .catch((error) => {
          // Force hide skeleton on script load failure
          setTimeout(() => {
            iframeLoadedRef.current = true;
            setIframeLoaded(true);
            setIsLoading(false);
          }, 2000);
        });
    } 
  }, [homeCode, url]);

  // Set up consent listener when component mounts
  useEffect(() => {
    setupConsentListener();
    
    // Cleanup function
    return () => {
      if (consentCleanupRef.current) {
        consentCleanupRef.current();
      }
      if (trackingServiceRef.current) {
        trackingServiceRef.current.cleanup();
      }
    };
  }, []);

  useEffect(() => {
    setKey(prevKey => prevKey + 1); // Increment key to trigger component re-render
  }, [homeCode]);

  // Debug state changes
  useEffect(() => {
  }, [isLoading, iframeLoaded]);

  if (!homeCode) {
    return null; // Return null if homeCode is not provided to unmount the component
  }


  return (
    <div style={{ textAlign: "center" }}>
        
      {/* Iframe container - let Smoobu manage this completely */}
      <div 
        id="apartmentIframeAll" 
        style={{ 
          position: 'relative',
          minHeight: isLoading ? '400px' : 'auto'
        }}
        ref={(el) => {
          if (el && isLoading) {
            // Only add skeleton when loading and container exists
            const existingSkeleton = el.querySelector('.smoobu-skeleton-overlay');
            if (!existingSkeleton) {
              const skeletonDiv = document.createElement('div');
              skeletonDiv.className = 'smoobu-skeleton-overlay';
              skeletonDiv.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: shimmer 1.5s infinite;
                border-radius: 4px;
                overflow: hidden;
              `;
              el.appendChild(skeletonDiv);
            }
          } else if (el && !isLoading) {
            // Remove skeleton when not loading
            const existingSkeleton = el.querySelector('.smoobu-skeleton-overlay');
            if (existingSkeleton) {
              existingSkeleton.remove();
            }
          }
        }}
      />
      
    </div>
  );

}

export default Smoobu;

