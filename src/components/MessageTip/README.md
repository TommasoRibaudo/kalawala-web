# Message Tip Component

A customizable message tip system that displays messages after a specified delay with smooth animations and mobile responsiveness.

## Features

- ✅ Configurable delay before showing message
- ✅ Customizable text content
- ✅ Click to close functionality
- ✅ Close button (×) for explicit closing
- ✅ Auto-close after specified duration (optional)
- ✅ Smooth fade-in animation
- ✅ Bottom-right positioning
- ✅ Mobile responsive design
- ✅ Multiple message stacking with proper z-index
- ✅ Accessibility support (keyboard navigation, ARIA labels)
- ✅ High contrast mode support
- ✅ Reduced motion support

## Usage

### 1. Add the Container to Your App

```tsx
import MessageTipContainer from './components/MessageTip/MessageTipContainer.component';

function App() {
  return (
    <div className="App">
      {/* Your app content */}
      
      {/* Add the message tip container */}
      <MessageTipContainer />
    </div>
  );
}
```

### 2. Using the Hook (Recommended)

```tsx
import { useMessageTip } from './components/MessageTip/MessageTipContainer.component';

function MyComponent() {
  const { addMessageTip } = useMessageTip();

  const showMessage = () => {
    addMessageTip({
      id: 'unique-id-' + Date.now(),
      text: 'This is a test message!',
      delay: 2000, // Show after 2 seconds
      duration: 5000 // Auto-close after 5 seconds (optional)
    });
  };

  return (
    <button onClick={showMessage}>
      Show Message Tip
    </button>
  );
}
```

### 3. Using the Global Function

```tsx
// Add a message tip
(window as any).addMessageTip({
  id: 'my-message-id',
  text: 'Welcome to our website!',
  delay: 3000, // Show after 3 seconds
  duration: 8000 // Auto-close after 8 seconds
});
```

## Props

### MessageTipData Interface

```tsx
interface MessageTipData {
  id: string;           // Unique identifier for the message
  text: string;         // Message content to display
  delay?: number;       // Delay in milliseconds before showing (default: 0)
  duration?: number;    // Auto-close duration in milliseconds (optional)
}
```

## Styling

The component uses SCSS with the following key features:

- **Position**: Fixed bottom-right positioning
- **Background**: White with light border
- **Animation**: Smooth slide-in from right with fade effect
- **Mobile**: Full-width on mobile devices with adjusted spacing
- **Accessibility**: High contrast and reduced motion support

## Mobile Responsiveness

- Messages take full width on mobile devices
- Adjusted padding and font sizes for smaller screens
- Touch-friendly close button
- Proper stacking order for multiple messages

## Accessibility

- Keyboard navigation support (Enter/Space to close)
- ARIA labels for screen readers
- Focus management
- High contrast mode support
- Reduced motion support for users with motion sensitivity
