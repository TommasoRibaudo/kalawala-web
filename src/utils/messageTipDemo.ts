/**
 * MessageTip Demo Utility
 * 
 * Provides functions to test MessageTip positioning and behavior
 */

export function showDemoMessageTip(): void {
  if (typeof window !== 'undefined' && (window as any).addMessageTip) {
    (window as any).addMessageTip({
      id: `demo-${Date.now()}`,
      text: 'This is a demo message tip to test positioning with the cookie banner!',
      duration: 5000
    });
  } else {
    console.warn('MessageTip system not available');
  }
}

export function showMultipleDemoMessageTips(): void {
  if (typeof window !== 'undefined' && (window as any).addMessageTip) {
    const messages = [
      'First message tip',
      'Second message tip - notice how they stack',
      'Third message tip - they should not overlap with the cookie banner'
    ];

    messages.forEach((text, index) => {
      setTimeout(() => {
        (window as any).addMessageTip({
          id: `demo-multi-${Date.now()}-${index}`,
          text,
          duration: 4000
        });
      }, index * 1000);
    });
  } else {
    console.warn('MessageTip system not available');
  }
}

// Expose global functions for manual testing
if (typeof window !== 'undefined') {
  (window as any).__showDemoMessageTip__ = showDemoMessageTip;
  (window as any).__showMultipleDemoMessageTips__ = showMultipleDemoMessageTips;
}