import React, { useState, useEffect } from 'react';
import './MessageTip.style.scss';

export interface MessageTipProps {
  id: string;
  text: string;
  delay?: number; // in milliseconds
  onClose: (id: string) => void;
  duration?: number; // auto-close duration in milliseconds (optional)
}

const MessageTip: React.FC<MessageTipProps> = ({
  id,
  text,
  delay = 0,
  onClose,
  duration
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before removing from DOM
    setTimeout(() => {
      setShouldRender(false);
      onClose(id);
    }, 300); // Match animation duration
  };

  useEffect(() => {
    // Show the message after the specified delay
    const showTimer = setTimeout(() => {
      setShouldRender(true);
      // Small delay to ensure DOM is ready before animation
      setTimeout(() => setIsVisible(true), 10);
    }, delay);

    // Auto-close after duration if specified
    let autoCloseTimer: NodeJS.Timeout;
    if (duration && duration > 0) {
      autoCloseTimer = setTimeout(() => {
        handleClose();
      }, delay + duration);
    }

    return () => {
      clearTimeout(showTimer);
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
      }
    };
  }, [delay, duration, handleClose, id, onClose]);

  const handleClick = () => {
    handleClose();
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <div 
      className={`message-tip ${isVisible ? 'message-tip--visible' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClose();
        }
      }}
      aria-label="Close message"
    >
      <div className="message-tip__content">
        <span className="message-tip__text">{text}</span>
        <button 
          className="message-tip__close"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          aria-label="Close message"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default MessageTip;
