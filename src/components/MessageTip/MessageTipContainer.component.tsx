import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MessageTip from './MessageTip.component';
import './MessageTip.style.scss';

export interface MessageTipData {
  id: string;
  text: string;
  delay?: number;
  duration?: number;
}

interface MessageTipContainerProps {
  className?: string;
}

const MessageTipContainer: React.FC<MessageTipContainerProps> = ({ className }) => {
  const [messageTips, setMessageTips] = useState<MessageTipData[]>([]);
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false);
  const [stickyCTAHeight, setStickyCTAHeight] = useState(0);
  // Seeded from window.innerWidth, this read react-snap's puppeteer viewport
  // at prerender time and a real visitor's actual viewport at hydration time
  // — two different numbers baked into the same first render, so the mobile
  // bottom-offset style below came out different on the client than what was
  // pre-rendered. React error #418 (hydration mismatch), the same failure
  // mode WelcomeSlider.component.tsx already documents and fixes for the
  // hero. null here means "not yet measured": isMobile stays false (matching
  // whatever react-snap's own settled-DOM snapshot shows for a typical
  // desktop-width prerender) until the resize-listener effect below runs and
  // sets the visitor's real width post-hydration, when React is free to
  // update without a mismatch.
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const location = useLocation();

  // Clear all message tips when route changes (language switching)
  useEffect(() => {
    setMessageTips([]);
    // Also clear the random popup session flag so it can show again on the new language page
    sessionStorage.removeItem('randomPopupShown');
  }, [location.pathname]);

  const addMessageTip = useCallback((messageData: MessageTipData) => {
    setMessageTips(prev => [...prev, messageData]);
  }, []);

  const removeMessageTip = useCallback((id: string) => {
    setMessageTips(prev => prev.filter(tip => tip.id !== id));
  }, []);

  const getMessageTipsCount = useCallback(() => {
    return messageTips.length;
  }, [messageTips.length]);

  // Check for cookie banner visibility and sticky CTA height
  useEffect(() => {
    const checkElements = () => {
      const cookieBanner = document.querySelector('.cookie-consent-banner');
      const stickyCTA = document.querySelector('.sticky-cta-mobile');
      
      // Use React.startTransition to avoid act() warnings in tests
      if (typeof React.startTransition === 'function') {
        React.startTransition(() => {
          setIsCookieBannerVisible(!!cookieBanner);
          setStickyCTAHeight(stickyCTA ? stickyCTA.getBoundingClientRect().height : 0);
        });
      } else {
        setIsCookieBannerVisible(!!cookieBanner);
        setStickyCTAHeight(stickyCTA ? stickyCTA.getBoundingClientRect().height : 0);
      }
    };

    // Initial check
    checkElements();
    // Real width, read only after mount — see the windowWidth state comment.
    setWindowWidth(window.innerWidth);

    // Set up observer to watch for changes
    const observer = new MutationObserver(checkElements);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    // Also listen for resize events to recalculate heights
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      checkElements();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Expose the addMessageTip function globally or through context
  React.useEffect(() => {
    // You can expose this through a context or global function
    (window as any).addMessageTip = addMessageTip;
    (window as any).getMessageTipsCount = getMessageTipsCount;

    return () => {
      delete (window as any).addMessageTip;
      delete (window as any).getMessageTipsCount;
    };
  }, [addMessageTip, getMessageTipsCount]);

  const containerClassName = `message-tip-container ${className || ''} ${isCookieBannerVisible ? 'cookie-banner-visible' : ''
    } ${stickyCTAHeight > 0 ? 'with-sticky-cta' : ''}`.trim();

  // Calculate dynamic bottom position
  const containerStyle: React.CSSProperties = {};
  const isMobile = windowWidth !== null && windowWidth <= 768;
  
  if (isMobile) {
    let bottomOffset = 20; // Base margin
    
    if (stickyCTAHeight > 0) {
      // Add sticky CTA height plus margin
      bottomOffset += stickyCTAHeight;
    }
    
    if (isCookieBannerVisible) {
      // Add additional offset for cookie banner (typical height ~100px)
      bottomOffset += 100;
    }
    
    containerStyle.bottom = `calc(${bottomOffset}px + env(safe-area-inset-bottom))`;
  }

  return (
    <div className={containerClassName} style={containerStyle}>
      {messageTips.map((tip) => (
        <MessageTip
          key={tip.id}
          id={tip.id}
          text={tip.text}
          delay={tip.delay}
          duration={tip.duration}
          onClose={removeMessageTip}
        />
      ))}
    </div>
  );
};

// Export a hook for easier usage
export const useMessageTip = () => {
  const addMessageTip = useCallback((messageData: MessageTipData) => {
    if ((window as any).addMessageTip) {
      (window as any).addMessageTip(messageData);
    }
  }, []);

  const getMessageTipsCount = useCallback(() => {
    if ((window as any).getMessageTipsCount) {
      return (window as any).getMessageTipsCount();
    }
    return 0;
  }, []);

  return { addMessageTip, getMessageTipsCount };
};

export default MessageTipContainer;
