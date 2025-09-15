import { useEffect, useState, useRef } from 'react';
import './Smoobu2.style.scss';
import React from 'react';

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

interface Smoobu2Props {
  targetId?: string;
}

function Smoobu2({ targetId = 'apartmentIframeAll' }: Smoobu2Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const iframeLoadedRef = useRef(false);

  useEffect(() => {

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
              url: 'https://login.smoobu.com/en/booking-tool/iframe/89210',
              baseUrl: 'https://login.smoobu.com/',
              target: `#${targetId}`,
            });

            const apartmentFrame = document.getElementById(targetId);
            if (apartmentFrame) {
              apartmentFrame.classList.add('apartment-frame-loaded');
            }

            // Set up iframe load detection
            const checkIframeLoaded = () => {
              const iframe = document.querySelector(`#${targetId} iframe`) as HTMLIFrameElement;

              if (iframe) {

                // Check if iframe has content
                if (iframe.contentDocument && iframe.contentDocument.body && iframe.contentDocument.body.children.length > 0) {
                  iframeLoadedRef.current = true;
                  setIframeLoaded(true);
                  setIsLoading(false);
                  return;
                }

                iframe.onload = () => {
                  setTimeout(() => {
                    iframeLoadedRef.current = true;
                    setIframeLoaded(true);
                    setIsLoading(false);
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
              }
            }, 5000);
          } catch (error) {
            // Force hide skeleton on initialization error
            setTimeout(() => {
              iframeLoadedRef.current = true;
              setIframeLoaded(true);
              setIsLoading(false);
            }, 2000);
          }
        } else {
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
  }, [targetId]);

  // Debug state changes
  useEffect(() => {
  }, [isLoading, iframeLoaded]);


  return (
    <div 
      id={targetId} 
      style={{ 
        position: 'relative',
        minHeight: isLoading ? '400px' : 'auto'
      }}
      ref={(el) => {
        if (el && isLoading) {
          // Only add skeleton when loading and container exists
          const existingSkeleton = el.querySelector('.smoobu2-skeleton-overlay');
          if (!existingSkeleton) {
            const skeletonDiv = document.createElement('div');
            skeletonDiv.className = 'smoobu2-skeleton-overlay';
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
          const existingSkeleton = el.querySelector('.smoobu2-skeleton-overlay');
          if (existingSkeleton) {
            existingSkeleton.remove();
          }
        }
      }}
    />
  );
}

export default Smoobu2;
