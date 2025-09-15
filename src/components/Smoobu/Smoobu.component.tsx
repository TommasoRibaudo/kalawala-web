import { useEffect, useState, useRef } from 'react';
import './Smoobu.style.scss';
import React from 'react';
import IframeSkeleton from '../IframeSkeleton/IframeSkeleton.component';
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
  const smoobuUrl: string = process.env.REACT_APP_SMOOBU_URL!;
  const houseCodesObject = JSON.parse(process.env.REACT_APP_HOUSE_CODES!);
  const url: string = homeCode ? smoobuUrl + houseCodesObject[homeCode] : smoobuUrl;

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
      
      <p style={{ color: 'black', fontWeight: 550, fontSize: 12 }}>
        Add Discount code: <strong>#norefundallowed</strong> Reservation becomes Non Refundable / Agrega el codigo para obtener un descuento pero la Reservación no tendrá reembolso
      </p>
    </div>
  );

}

export default Smoobu;

