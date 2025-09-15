import React, { useState, useCallback } from 'react';
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

  const addMessageTip = useCallback((messageData: MessageTipData) => {
    setMessageTips(prev => [...prev, messageData]);
  }, []);

  const removeMessageTip = useCallback((id: string) => {
    setMessageTips(prev => prev.filter(tip => tip.id !== id));
  }, []);

  // Expose the addMessageTip function globally or through context
  React.useEffect(() => {
    // You can expose this through a context or global function
    (window as any).addMessageTip = addMessageTip;
    
    return () => {
      delete (window as any).addMessageTip;
    };
  }, [addMessageTip]);

  return (
    <div className={`message-tip-container ${className || ''}`}>
      {messageTips.map((tip, index) => (
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
