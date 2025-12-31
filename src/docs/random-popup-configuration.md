# Random Popup Configuration

This document explains how to configure the random popup feature that shows "Recent guests booked directly on our website" messages.

## Configuration

The popup behavior is controlled by the `RANDOM_POPUP_CONFIG` object in `src/utils/constants.ts`:

```typescript
export const RANDOM_POPUP_CONFIG = {
  // Probability of showing the popup (0-1, where 1 = 100% chance)
  showProbability: 0.7, // 70% chance to show
  
  // Time range in milliseconds for random delay
  minDelay: 5000, // 5 seconds
  maxDelay: 15000, // 15 seconds
  
  // Duration the popup stays visible
  duration: 8000, // 8 seconds
  
  // Messages for different languages
  messages: {
    en: "Recent guests booked directly on our website.",
    es: "Huéspedes recientes reservaron directamente en nuestro sitio."
  }
};
```

## Configuration Options

### `showProbability` (0-1)
- Controls how often the popup appears
- `0.7` = 70% chance to show
- `1.0` = Always show
- `0.0` = Never show

### `minDelay` and `maxDelay` (milliseconds)
- Controls the random time delay before showing the popup
- Current: Between 5-15 seconds after page load
- Example: `minDelay: 3000, maxDelay: 10000` = 3-10 seconds

### `duration` (milliseconds)
- How long the popup stays visible
- Current: 8 seconds
- Example: `duration: 5000` = 5 seconds

### `messages`
- Text content for different languages
- `en`: English version
- `es`: Spanish version

## Session Behavior

- The popup appears only **once per session**
- Uses `sessionStorage` to track if already shown
- Resets when user closes browser tab/window

## Pages with Popup

The popup is automatically enabled on:
- Home page (English and Spanish)
- All listing pages (English and Spanish)

## How It Works

1. When a page loads, the `useRandomPopup` hook is called
2. It checks the probability setting
3. If popup should show, it waits a random delay
4. Shows the popup with appropriate language message
5. Marks as shown in session storage

## Testing

To test the popup:
1. Open browser developer tools
2. Go to Application > Storage > Session Storage
3. Delete the `randomPopupShown` key
4. Refresh the page
5. Popup should appear after the random delay

## Disabling the Popup

To disable the popup completely:
1. Set `showProbability: 0` in the configuration
2. Or remove the `useRandomPopup()` calls from pages