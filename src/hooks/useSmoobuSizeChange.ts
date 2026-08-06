import { useEffect, useRef, useCallback } from 'react';
import { useMessageTip } from '../components/MessageTip/MessageTipContainer.component';
import { getMessages, type Locale } from '../i18n';

interface UseSmoobuClickOptions {
  locale?: Locale;
}

/**
 * Hook that shows the discount tip when user interacts with the Smoobu container.
 * Detects both clicks on the container and focus on the iframe (for clicks inside iframe).
 * The tip is shown only once per session.
 */
export const useSmoobuSizeChange = (options: UseSmoobuClickOptions = {}) => {
  const { locale = 'en' } = options;
  const { addMessageTip, getMessageTipsCount } = useMessageTip();
  const hasTriggeredRef = useRef(false);

  const showDiscountTip = useCallback(() => {
    if (hasTriggeredRef.current) return;
    
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    
    // On mobile, only show if no other tips are currently showing
    if (isMobile && getMessageTipsCount() > 0) {
      return;
    }
    
    hasTriggeredRef.current = true;

    const message = getMessages(locale).tips.nonRefundableDiscount;

    addMessageTip({
      id: 'welcome-message',
      text: message,
      delay: 2000,
      duration: 20000
    });
  }, [addMessageTip, getMessageTipsCount, locale]);

  useEffect(() => {
    const smoobuElement = document.querySelector('.Smoobo') as HTMLElement;
    
    if (!smoobuElement) {
      console.warn('Smoobu element (.Smoobo) not found');
      return;
    }

    // Handle direct clicks on the container
    const handleClick = () => {
      showDiscountTip();
    };

    // Handle iframe focus (triggered when user clicks inside iframe)
    const handleWindowBlur = () => {
      // When window loses focus, check if an iframe inside Smoobo gained focus
      setTimeout(() => {
        const activeElement = document.activeElement;
        if (activeElement?.tagName === 'IFRAME' && smoobuElement.contains(activeElement)) {
          showDiscountTip();
        }
      }, 0);
    };

    smoobuElement.addEventListener('click', handleClick);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      smoobuElement.removeEventListener('click', handleClick);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [showDiscountTip]);

  return { hasTriggered: hasTriggeredRef.current };
};
