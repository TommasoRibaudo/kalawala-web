import { useEffect, useCallback } from 'react';
import { useMessageTip } from '../components/MessageTip/MessageTipContainer.component';
import { RANDOM_POPUP_CONFIG } from '../utils/constants';

interface UseRandomPopupOptions {
  isSpanishPage?: boolean;
  enabled?: boolean;
}

export const useRandomPopup = (options: UseRandomPopupOptions = {}) => {
  const { isSpanishPage = false, enabled = true } = options;
  const { addMessageTip } = useMessageTip();

  const showRandomPopup = useCallback(() => {
    // Check if popup should be shown based on probability
    if (Math.random() > RANDOM_POPUP_CONFIG.showProbability) {
      return;
    }

    // Check if popup was already shown in this session
    const sessionKey = 'randomPopupShown';
    if (sessionStorage.getItem(sessionKey)) {
      return;
    }

    // Calculate random delay
    const randomDelay = Math.random() * 
      (RANDOM_POPUP_CONFIG.maxDelay - RANDOM_POPUP_CONFIG.minDelay) + 
      RANDOM_POPUP_CONFIG.minDelay;

    // Set timeout to show popup
    const timer = setTimeout(() => {
      // Mark as shown in session
      sessionStorage.setItem(sessionKey, 'true');
      
      // Get appropriate message based on language
      const message = isSpanishPage 
        ? RANDOM_POPUP_CONFIG.messages.es 
        : RANDOM_POPUP_CONFIG.messages.en;

      // Show the popup
      addMessageTip({
        id: 'random-booking-popup',
        text: message,
        delay: 0,
        duration: RANDOM_POPUP_CONFIG.duration
      });
    }, randomDelay);

    return () => clearTimeout(timer);
  }, [addMessageTip, isSpanishPage]);

  useEffect(() => {
    if (!enabled) return;

    const cleanup = showRandomPopup();
    return cleanup;
  }, [showRandomPopup, enabled]);

  // Return function to manually trigger popup (for testing)
  return {
    triggerPopup: () => {
      sessionStorage.removeItem('randomPopupShown');
      showRandomPopup();
    }
  };
};