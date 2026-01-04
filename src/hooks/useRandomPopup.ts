import { useEffect } from 'react';
import { useMessageTip } from '../components/MessageTip/MessageTipContainer.component';
import { RANDOM_POPUP_CONFIG } from '../utils/constants';

interface UseRandomPopupOptions {
  isSpanishPage?: boolean;
  enabled?: boolean;
}

// Global flag to track if popup has been shown in this session
let globalPopupShown = false;

// Helper function to check if popup was already shown
const hasPopupBeenShown = (): boolean => {
  try {
    // Check multiple storage methods for better mobile compatibility
    const sessionShown = sessionStorage.getItem('randomPopupShown');
    const localShown = localStorage.getItem('randomPopupShown');
    
    // If either storage method indicates it was shown, consider it shown
    return !!(sessionShown || localShown || globalPopupShown);
  } catch (error) {
    // Fallback to global flag if storage is not available
    return globalPopupShown;
  }
};

// Helper function to mark popup as shown
const markPopupAsShown = (): void => {
  globalPopupShown = true;
  try {
    sessionStorage.setItem('randomPopupShown', 'true');
    // Also use localStorage as backup for mobile browsers
    localStorage.setItem('randomPopupShown', 'true');
  } catch (error) {
    // Storage might not be available, but global flag is set
    console.warn('Storage not available, using memory flag only');
  }
};

export const useRandomPopup = (options: UseRandomPopupOptions = {}) => {
  const { isSpanishPage = false, enabled = true } = options;
  const { addMessageTip } = useMessageTip();

  useEffect(() => {
    if (!enabled) return;

    // Check if popup was already shown using improved detection
    if (hasPopupBeenShown()) {
      return;
    }

    // Check if popup should be shown based on probability
    if (Math.random() > RANDOM_POPUP_CONFIG.showProbability) {
      return;
    }

    // Calculate random delay
    const randomDelay = Math.random() * 
      (RANDOM_POPUP_CONFIG.maxDelay - RANDOM_POPUP_CONFIG.minDelay) + 
      RANDOM_POPUP_CONFIG.minDelay;

    // Set timeout to show popup
    const timer = setTimeout(() => {
      // Double-check if popup was shown before displaying
      if (hasPopupBeenShown()) {
        return;
      }
      
      // Mark as shown using improved method
      markPopupAsShown();
      
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
  }, [addMessageTip, isSpanishPage, enabled]);

  // Return function to manually trigger popup (for testing)
  return {
    triggerPopup: () => {
      // Clear all storage methods
      globalPopupShown = false;
      try {
        sessionStorage.removeItem('randomPopupShown');
        localStorage.removeItem('randomPopupShown');
      } catch (error) {
        console.warn('Storage not available for clearing');
      }
      
      // Get appropriate message based on language
      const message = isSpanishPage 
        ? RANDOM_POPUP_CONFIG.messages.es 
        : RANDOM_POPUP_CONFIG.messages.en;

      // Show the popup immediately
      addMessageTip({
        id: 'random-booking-popup',
        text: message,
        delay: 0,
        duration: RANDOM_POPUP_CONFIG.duration
      });
    }
  };
};