import React, { useState, useCallback, useEffect } from 'react';
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

  const addMessageTip = useCallback((messageData: MessageTipData) => {
    setMessageTips(prev => [...prev, messageData]);
  }, []);

  const removeMessageTip = useCallback((id: string) => {
    setMessageTips(prev => prev.filter(tip => tip.id !== id));
  }, []);

  // Check for cookie banner visibility
  useEffect(() => {
    const checkCookieBanner = () => {
      const cookieBanner = document.querySelector('.cookie-consent-banner');
      // Use React.startTransition to avoid act() warnings in tests
      if (typeof React.startTransition === 'function') {
        React.startTransition(() => {
          setIsCookieBannerVisible(!!cookieBanner);
        });
      } else {
        setIsCookieBannerVisible(!!cookieBanner);
      }
    };

    // Initial check
    checkCookieBanner();

    // Set up observer to watch for cookie banner changes
    const observer = new MutationObserver(checkCookieBanner);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Expose the addMessageTip function globally or through context
  React.useEffect(() => {
    // You can expose this through a context or global function
    (window as any).addMessageTip = addMessageTip;

    return () => {
      delete (window as any).addMessageTip;
    };
  }, [addMessageTip]);

  const containerClassName = `message-tip-container ${className || ''} ${isCookieBannerVisible ? 'cookie-banner-visible' : ''
    }`.trim();

  return (
    <div className={containerClassName}>
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

  return { addMessageTip };
};

export default MessageTipContainer;
