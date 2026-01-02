# Design Document: Listing Page Enhancements

## Overview

This design enhances all property listing pages with new marketing elements including descriptive titles, pricing displays, social proof statements, feature highlights, and instant confirmation badges. The layout is reorganized to move the comparison section to the bottom of the page.

## Architecture

The implementation follows the existing React component architecture with TypeScript. New content will be managed through a centralized configuration object that maps property names to their specific marketing content.

```
┌─────────────────────────────────────────────────────────────┐
│                    Listing Page Layout                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Header: Title + Descriptive Subtitle + Price        │   │
│  │ [Blue Section] "casa familiar, pet friendly..."     │   │
│  │ [Bold] "Precio promedio: 75,000 CRC la noche"       │   │
│  │ [Red Badge] "✔ Confirmación inmediata"              │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Images Container                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Social Statement                                     │   │
│  │ "Elegida por su parqueo privado interno..."         │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Amenities                                            │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Feature Highlights (Why guests choose...)           │   │
│  │ 📍 Ubicación caminable...                           │   │
│  │ 🏡 Espacio privado para hasta 5 personas            │   │
│  │ ❄️ A/C en habitaciones                              │   │
│  │ 💻 WiFi rápido ideal para trabajo remoto            │   │
│  │ 🐾 Pet-friendly con espacio exterior                │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Description                                          │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Other Listings (Comparison Section) - MOVED HERE    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### New Type: PropertyMarketingContent

```typescript
interface PropertyMarketingContent {
  propertyKey: string;           // e.g., 'Rana', 'RanaES'
  descriptiveTitle: {
    en: string;
    es: string;
  };
  price: {
    crc: number;                 // e.g., 75000
    usd: number;                 // e.g., 150
  };
  socialStatement: {
    en: string;
    es: string;
  };
  featureHighlights: {
    en: string[];
    es: string[];
  };
}
```

### New Component: ListingMarketingSection

A reusable component that renders the descriptive title, price, and confirmation badge.

```typescript
interface ListingMarketingSectionProps {
  propertyKey: string;
  isSpanish: boolean;
}
```

### New Component: SocialStatement

A component that renders the social proof statement below images.

```typescript
interface SocialStatementProps {
  propertyKey: string;
  isSpanish: boolean;
}
```

### New Component: FeatureHighlights

A component that renders the "Why guests choose" section with icons.

```typescript
interface FeatureHighlightsProps {
  propertyKey: string;
  propertyName: string;
  isSpanish: boolean;
}
```

### New Component: InstantConfirmationBadge

A styled badge component for the confirmation message.

```typescript
interface InstantConfirmationBadgeProps {
  isSpanish: boolean;
}
```

## Data Models

### Property Marketing Configuration

A new configuration object in `src/utils/constants.ts`:

```typescript
export const PROPERTY_MARKETING_CONFIG: Record<string, PropertyMarketingContent> = {
  'Rana': {
    propertyKey: 'Rana',
    descriptiveTitle: {
      en: 'Family home, pet friendly with air conditioning',
      es: 'Casa familiar, pet friendly con aire acondicionado'
    },
    price: { crc: 75000, usd: 150 },
    socialStatement: {
      en: 'Chosen for its private internal parking and small garden for pets',
      es: 'Elegida por su parqueo privado interno y pequeño jardín para las mascotas'
    },
    featureHighlights: {
      en: [
        '📍 Walkable location in downtown Puerto Viejo',
        '🏡 Private space for up to 5 people',
        '❄️ A/C in bedrooms',
        '💻 Fast WiFi ideal for remote work',
        '🐾 Pet-friendly with outdoor space'
      ],
      es: [
        '📍 Ubicación caminable en el centro de Puerto Viejo',
        '🏡 Espacio privado para hasta 5 personas',
        '❄️ A/C en habitaciones',
        '💻 WiFi rápido ideal para trabajo remoto',
        '🐾 Pet-friendly con espacio exterior'
      ]
    }
  },
  // ... similar entries for all other properties
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Price Currency Matches Page Language

*For any* listing page, if the page is a Spanish variant (URL ends with "ES"), the price display SHALL contain "CRC" or "colones", and if the page is an English variant, the price display SHALL contain "$" or "USD".

**Validates: Requirements 2.1, 2.2**

### Property 2: Text Content Language Consistency

*For any* listing page, all marketing text content (descriptive title, social statement, feature highlights, confirmation badge) SHALL be displayed in the language matching the page variant (Spanish for ES pages, English for EN pages).

**Validates: Requirements 1.2, 3.3, 5.1, 5.2**

### Property 3: Feature Highlights Contain Configured Features

*For any* listing page and its corresponding property configuration, the rendered feature highlights section SHALL contain all features defined in the property's `featureHighlights` array, and each feature SHALL include an emoji icon.

**Validates: Requirements 4.1, 4.2, 4.4**

### Property 4: Property Content Configuration Mapping

*For any* property name, the displayed marketing content (price, social statement, features) SHALL exactly match the values defined in `PROPERTY_MARKETING_CONFIG` for that property.

**Validates: Requirements 7.1, 7.2**

### Property 5: Comparison Section Position

*For any* listing page, the OtherListings component SHALL be rendered after the description section and SHALL NOT be rendered inside the sidebar column.

**Validates: Requirements 6.1, 6.2**

## Error Handling

- If a property key is not found in `PROPERTY_MARKETING_CONFIG`, the marketing sections should gracefully hide rather than crash
- Missing translations should fall back to English content
- Invalid price values (NaN, negative) should display a placeholder or hide the price section

## Testing Strategy

### Unit Tests
- Test that `PROPERTY_MARKETING_CONFIG` contains entries for all properties
- Test that each property has both English and Spanish content
- Test price formatting functions for CRC and USD

### Property-Based Tests
- Use fast-check to generate random property keys and verify content mapping
- Test language consistency across all page variants
- Test that all configured features render with emojis

### Integration Tests
- Render each listing page and verify all new sections appear
- Verify DOM ordering of new elements
- Test responsive behavior of new components
