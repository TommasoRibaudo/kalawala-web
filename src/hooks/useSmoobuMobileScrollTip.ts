import { useEffect, useRef, useCallback } from 'react';
import { useMessageTip } from '../components/MessageTip/MessageTipContainer.component';

interface UseSmoobuMobileScrollTipOptions {
  isSpanishPage?: boolean;
  isScreenSmall: boolean;
}

/**
 * Hook that shows a scroll instruction tip on mobile when user interacts with the Smoobu booking widget.
 * Only shows on small screens and instructs users to scroll down after selecting dates.
 * 
 * @example
 * // In listing pages:
 * useSmoobuMobileScrollTip({ isSpanishPage: false, isScreenSmall: true });
 */
export const useSmoobuMobileScrollTip = (options: UseSmoobuMobileScrollTipOptions) => {
  const { isSpanishPage = false, isScreenSmall } = options;
  const { addMessageTip, getMessageTipsCount } = useMessageTip();
  const hasTriggeredRef = useRef(false);

  const showScrollTip = useCallback(() => {
    if (hasTriggeredRef.current || !isScreenSmall) return;
    
    // Only show if no other tips are currently showing
    if (getMessageTipsCount() > 0) {
      return;
    }
    
    hasTriggeredRef.current = true;

    const message = isSpanishPage
      ? `Después de seleccionar fechas y presionar buscar, desplázate hacia abajo para ver el precio y reservar.`
      : `After selecting dates and pressing search, scroll down to see the price and book.`;

    addMessageTip({
      id: 'mobile-scroll-instruction',
      text: message,
      delay: 5000,
      duration: 12000
    });
  }, [addMessageTip, getMessageTipsCount, isSpanishPage, isScreenSmall]);

  useEffect(() => {
    // Only set up listeners if on small screen
    if (!isScreenSmall) return;

    let cleanup: (() => void) | null = null;
    let pollInterval: NodeJS.Timeout | null = null;

    const setupEventListeners = (smoobuElement: HTMLElement) => {
      // Handle direct clicks on the container
      const handleClick = () => {
        showScrollTip();
      };

      // Handle iframe focus (triggered when user clicks inside iframe)
      const handleWindowBlur = () => {
        // When window loses focus, check if an iframe inside Smoobu gained focus
        setTimeout(() => {
          const activeElement = document.activeElement;
          if (activeElement?.tagName === 'IFRAME' && smoobuElement.contains(activeElement)) {
            showScrollTip();
          }
        }, 0);
      };

      smoobuElement.addEventListener('click', handleClick);
      window.addEventListener('blur', handleWindowBlur);

      return () => {
        smoobuElement.removeEventListener('click', handleClick);
        window.removeEventListener('blur', handleWindowBlur);
      };
    };

    const findAndSetupSmoobu = () => {
      // Try to find Smoobu element - first try the listing page selector, then home page selector
      let smoobuElement = document.getElementById('apartmentIframeAll') as HTMLElement;
      
      if (!smoobuElement) {
        smoobuElement = document.querySelector('.Smoobo') as HTMLElement;
      }
      
      if (smoobuElement) {
        cleanup = setupEventListeners(smoobuElement);
        if (pollInterval) {
          clearInterval(pollInterval);
          pollInterval = null;
        }
        return true;
      }
      return false;
    };

    // Try to find element immediately
    if (!findAndSetupSmoobu()) {
      // If not found, poll for it (Smoobu iframe loads asynchronously)
      pollInterval = setInterval(() => {
        if (findAndSetupSmoobu()) {
          // Found and set up, stop polling
          return;
        }
      }, 500);

      // Stop polling after 10 seconds
      setTimeout(() => {
        if (pollInterval) {
          clearInterval(pollInterval);
          pollInterval = null;
          console.warn('Smoobu element not found after 10 seconds (tried #apartmentIframeAll and .Smoobo)');
        }
      }, 10000);
    }

    return () => {
      if (cleanup) {
        cleanup();
      }
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [showScrollTip, isScreenSmall]);

  return { hasTriggered: hasTriggeredRef.current };
};