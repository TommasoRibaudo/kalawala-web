# useSmoobuBookingTip Hook

This hook shows a reassuring booking message when users interact with the Smoobu booking widget on listing pages. It's designed to encourage bookings by providing instant confirmation messaging.

## Features

- Shows message only once per session
- Detects both direct clicks and iframe interactions
- Supports both English and Spanish
- Customizable property name
- 1.5 second delay before showing
- 45 second display duration
- Works on both home pages (`.Smoobo` class) and listing pages (`#apartmentIframeAll` ID)
- Polls for Smoobu element if not immediately available (handles async iframe loading)

## Usage

### English Listing Pages

```typescript
import { useSmoobuBookingTip } from "../../../hooks/useSmoobuBookingTip";

// In your component
useSmoobuBookingTip({ 
  isSpanishPage: false, 
  propertyName: 'House Delfin' 
});
```

### Spanish Listing Pages

```typescript
import { useSmoobuBookingTip } from "../../../hooks/useSmoobuBookingTip";

// In your component
useSmoobuBookingTip({ 
  isSpanishPage: true, 
  propertyName: 'Casa Delfín' 
});
```

## Message Format

- **English**: "✔ Instant confirmation guaranteed for [Property Name]. Book now and secure your stay!"
- **Spanish**: "✔ Confirmación inmediata garantizada para [Property Name]. ¡Reserva ahora y asegura tu estadía!"

## Technical Details

The hook automatically detects the Smoobu widget by:
1. First trying to find `#apartmentIframeAll` (used in listing pages)
2. If not found, trying `.Smoobo` (used in home page components)
3. If neither is found immediately, it polls every 500ms for up to 10 seconds to handle async iframe loading

## Implementation Status

Currently implemented in **ALL** listing pages:

**English Pages (staticPages/):**
- ✅ ListingDelfin.page.tsx
- ✅ ListingAreka.page.tsx  
- ✅ ListingRana.page.tsx
- ✅ ListingGeco.page.tsx
- ✅ ListingTucano.page.tsx
- ✅ ListingPappagallo.page.tsx
- ✅ ListingVillaMar.page.tsx
- ✅ ListingVillaCoral.page.tsx
- ✅ ListingPlumeria.page.tsx
- ✅ ListingGiulia.page.tsx

**Spanish Pages (staticPages_ES/):**
- ✅ ListingDelfin.page_ES.tsx
- ✅ ListingAreka.page_ES.tsx
- ✅ ListingRana.page_ES.tsx
- ✅ ListingGeco.page_ES.tsx
- ✅ ListingTucano.page_ES.tsx
- ✅ ListingPappagallo.page_ES.tsx
- ✅ ListingVillaMar.page_ES.tsx
- ✅ ListingVillaCoral.page_ES.tsx
- ✅ ListingPlumeria.page_ES.tsx
- ✅ ListingGiulia.page_ES.tsx

**Total: 20/20 listing pages completed** ✅

## Adding to Other Listing Pages

1. Import the hook at the top of your listing component
2. Add the hook call after the `useRandomPopup` hook
3. Use the appropriate `isSpanishPage` value and `propertyName`

Example for a new listing:
```typescript
// Add import
import { useSmoobuBookingTip } from "../../../hooks/useSmoobuBookingTip";

// Add hook call in component
useSmoobuBookingTip({ 
  isSpanishPage: false, // or true for Spanish pages
  propertyName: 'House [PropertyName]' // or 'Casa [PropertyName]' for Spanish
});
```

## Troubleshooting

If the hook isn't working:
1. Check browser console for warnings about Smoobu element not found
2. Verify the Smoobu component is rendering on the page
3. Make sure the hook is called after the component mounts
4. The hook will automatically retry finding the element for up to 10 seconds