import { useEffect, useRef, useCallback } from 'react';
import { useMessageTip } from '../components/MessageTip/MessageTipContainer.component';
import { getMessages, type Locale } from '../i18n';

interface UseSmoobuBookingTipOptions {
  locale?: Locale;
  propertyName?: string;
}

/**
 * Hook that shows a reassuring booking tip when user interacts with the Smoobu booking widget.
 * Detects both clicks on the container and focus on the iframe (for clicks inside iframe).
 * The tip is shown only once per session and encourages users to complete their booking.
 * 
 * @example
 * // In English listing pages:
 * useSmoobuBookingTip({ locale: 'en', propertyName: 'House Delfin' });
 * 
 * // In Spanish listing pages:
 * useSmoobuBookingTip({ locale: 'es', propertyName: 'Casa Delfín' });
 */
export const useSmoobuBookingTip = (options: UseSmoobuBookingTipOptions = {}) => {
  const { locale = 'en', propertyName = 'this property' } = options;
  const { addMessageTip, getMessageTipsCount } = useMessageTip();
  const hasTriggeredRef = useRef(false);

  const showBookingTip = useCallback(() => {
    if (hasTriggeredRef.current) return;
    
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 992; // Match the breakpoint used in the component
    
    // Don't show this tip on mobile - let the mobile scroll tip handle it instead
    if (isMobile) {
      return;
    }
    
    // On desktop, only show if no other tips are currently showing
    if (getMessageTipsCount() > 0) {
      return;
    }
    
    hasTriggeredRef.current = true;

    const message = getMessages(locale).tips.instantConfirmation(propertyName);

    addMessageTip({
      id: 'booking-encouragement',
      text: message,
      delay: 2000,
      duration: 15000
    });
  }, [addMessageTip, getMessageTipsCount, locale, propertyName]);

  useEffect(() => {
    let cleanup: (() => void) | null = null;
    let pollInterval: NodeJS.Timeout | null = null;

    const setupEventListeners = (smoobuElement: HTMLElement) => {
      // Handle direct clicks on the container
      const handleClick = () => {
        showBookingTip();
      };

      // Handle iframe focus (triggered when user clicks inside iframe)
      const handleWindowBlur = () => {
        // When window loses focus, check if an iframe inside Smoobu gained focus
        setTimeout(() => {
          const activeElement = document.activeElement;
          if (activeElement?.tagName === 'IFRAME' && smoobuElement.contains(activeElement)) {
            showBookingTip();
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
  }, [showBookingTip]);

  return { hasTriggered: hasTriggeredRef.current };
};