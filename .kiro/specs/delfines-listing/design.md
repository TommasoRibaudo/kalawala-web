# Design Document

## Overview

This design outlines the implementation of the Delfines listing feature for the Kalawala vacation rental website. The solution follows the existing architectural patterns used for other properties (Rana, Tucano, Pappagallo, Geco) while accommodating the specific requirements for Delfines as a 6-person, non-pet-friendly accommodation.

## Architecture

The Delfines listing implementation follows the established multi-language, component-based architecture:

```
src/
├── pages/Listing/staticPages/
│   └── ListingDelfines.page.tsx          # English listing page
├── pages/Listing/staticPages_ES/
│   └── ListingDelfines.page_ES.tsx       # Spanish listing page
├── utils/
│   └── constants.ts                      # Updated with Delfines data
└── Router/
    └── Router.tsx                        # Updated with new routes
```

### Data Flow

1. **Route Access**: User navigates to `/Delfin` or `/DelfinES`
2. **Component Rendering**: Appropriate listing component loads
3. **Data Retrieval**: Component queries `houseDataList` for Delfines data
4. **Content Display**: Page renders with property details, amenities, and booking widget
5. **Related Properties**: Other listings component shows remaining Kalawala properties

## Components and Interfaces

### New Components

#### ListingDelfines.page.tsx
- **Purpose**: English version of Delfines listing page
- **Props**: None (uses static listing name)
- **Key Features**:
  - Helmet configuration for SEO
  - Image container with modal functionality
  - Amenities display (excluding pet-friendly)
  - Smoobu booking widget with houseCode 10
  - Other listings sidebar

#### ListingDelfines.page_ES.tsx
- **Purpose**: Spanish version of Delfines listing page
- **Props**: None (uses static listing name)
- **Key Features**:
  - Spanish Helmet configuration for SEO
  - Spanish navigation components
  - Translated amenities display
  - Same Smoobu integration
  - Spanish other listings sidebar

### Updated Components

#### Router.tsx
- **New Routes**:
  - `/Delfin` → `ListingDelfines` (English version)
  - `/DelfinES` → `ListingDelfinesES` (Spanish version)
- **Note**: URL uses "Delfin" (singular) to maintain consistency with cookie banner logic that checks for "ES" suffix

#### constants.ts
- **New Data Structures**:
  - Delfines entries in `houseDataList`
  - Delfines in `homesSnippet`
  - New image description arrays

## Data Models

### House Data Structure

```typescript
// English Version
{
  name: "Delfin",
  guestNumber: 6,
  location: "Puerto Viejo de Talamanca, Limón, Costa Rica",
  description: "Welcome to Reservas Kalawala. Located in the heart of town...",
  neighborhood: "Puerto Viejo is a popular destination...",
  houseCode: 10,
  houseLangCode: "Delfin",
  parking: true,
  image: "https://drive.google.com/thumbnail?id=1UiGI8gFf6UR5kn8Eo30u457NX8NkP95X&sz=w1000", // Rana image initially
  amenities: [
    // All Rana amenities except pet-friendly
  ]
}

// Spanish Version
{
  name: "Delfín",
  guestNumber: 6,
  location: "AAA Puerto Viejo de Talamanca, Limón, Costa Rica",
  description: "Bienvenido a Reservas Kalawala. Ubicada en el corazón del pueblo...",
  neighborhood: "Puerto Viejo es un destino popular...",
  houseCode: 10,
  houseLangCode: "DelfinES",
  parking: true,
  image: "https://drive.google.com/thumbnail?id=1UiGI8gFf6UR5kn8Eo30u457NX8NkP95X&sz=w1000", // Rana image initially
  amenities: [
    // Spanish amenities (all Rana amenities except pet-friendly)
  ]
}
```

### Amenities Configuration

Based on Rana's amenities, excluding pet-friendly:

**English Amenities:**
- Private Equipped Bathroom
- Private Equipped Kitchen  
- A/C
- Private Fenced Parking
- 100Mbps WiFi

**Spanish Amenities:**
- Baño Privado Equipado
- Cocina Privada Equipada
- A/C
- Parqueo Privado Encerrado
- 100Mbps WiFi

### Image Descriptions

New arrays will be created:
- `delfinImageDescriptions` (English)
- `delfinImageDescriptionsES` (Spanish)

Initially copied from `ranaImageDescriptions` and `ranaImageDescriptionsES` respectively.

### Home Page Integration

**homesSnippet Update:**
```typescript
export const homesSnippet: ListingType[] = [
    {
        name: 'Tucano',
        mainImage: "https://drive.google.com/thumbnail?id=10qvLOMLs4_JsBIF99igVeh4baDR7EB-Q&sz=w1000"
    },
    {
        name: 'Geco',
        mainImage: "https://drive.google.com/thumbnail?id=1tYQxiwEXhxhv2r0_mJQhXVAHOMrE0y_2&sz=w1000"
    },
    {
        name: 'Pappagallo',
        mainImage: "https://drive.google.com/thumbnail?id=1owhxss4VVXLLJAQP1ByDyBMH_NwQsIuY&sz=w1000"
    },
    {
        name: 'Rana',
        mainImage: "https://drive.google.com/thumbnail?id=1UiGI8gFf6UR5kn8Eo30u457NX8NkP95X&sz=w1000"
    },
    {
        name: 'Delfin',
        mainImage: "https://drive.google.com/thumbnail?id=1UiGI8gFf6UR5kn8Eo30u457NX8NkP95X&sz=w1000" // Rana image initially
    }
]
```

## Error Handling

### Route Protection
- Invalid routes will fall back to existing 404 handling
- Missing house data will be handled by existing null checks in components

### Data Validation
- House data structure validation follows existing patterns
- Image loading errors handled by existing image components
- Smoobu widget errors handled by existing Smoobu component

### Responsive Design
- Follows existing responsive patterns used in other listing pages
- Mobile-first approach with Bootstrap grid system
- Image modal functionality consistent with other listings

## Testing Strategy

### Component Testing
- **Unit Tests**: Test individual component rendering with Delfines data
- **Integration Tests**: Verify routing to Delfines pages works correctly
- **Data Tests**: Ensure Delfines data is properly structured and accessible

### User Acceptance Testing
- **Navigation**: Verify users can access both English and Spanish Delfines pages
- **Content Display**: Confirm all property information displays correctly
- **Booking Integration**: Test Smoobu widget functionality with houseCode 10
- **Related Properties**: Verify other listings show correctly on Delfines pages

### Cross-Language Testing
- **Content Consistency**: Ensure English and Spanish versions show equivalent information
- **Navigation**: Test language switching and proper component usage
- **SEO**: Verify meta tags and canonical links are properly configured

### Performance Testing
- **Image Loading**: Test initial load with Rana images
- **Component Rendering**: Ensure no performance regression with additional data
- **Mobile Performance**: Verify responsive behavior on various screen sizes

## SEO Configuration

### Meta Tags
**English Version:**
```html
<title>House Delfin - Puerto Viejo Vacation Home Rental</title>
<meta name="description" content="Welcome to Reservas Kalawala. Located in the heart of town, this house accommodates up to 6 guests with fully equipped kitchen, bathroom, 2 A/C units, and private parking." />
<link rel="canonical" href="https://www.reservaskalawala.com/Delfin" />
<link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/Delfin" />
<link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/DelfinES" />
```

**Spanish Version:**
```html
<title>Casa Delfín - Alquiler de Casa de Vacaciones en Puerto Viejo</title>
<meta name="description" content="Bienvenido a Reservas Kalawala. Ubicada en el corazón del pueblo, esta casa acomoda hasta 6 huéspedes con cocina totalmente equipada, baño, 2 unidades de aire acondicionado y estacionamiento privado." />
<link rel="canonical" href="https://www.reservaskalawala.com/DelfinES" />
<link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/Delfin" />
<link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/DelfinES" />
```

## Implementation Notes

### Photo Management
- Initial implementation uses Rana photos as placeholders
- Separate image description arrays created for future photo updates
- Image links can be updated independently without affecting Rana

### Content Translation
- Spanish description will be translated from provided English text
- Neighborhood description will follow Rana's pattern but adapted for Delfines
- All UI elements will use existing Spanish components

### Smoobu Integration
- Uses houseCode 10 as specified
- Follows existing Smoobu component integration pattern
- No changes needed to Smoobu component itself

### Future Extensibility
- Structure allows easy photo updates when new images are available
- Content can be modified independently for each language
- Additional amenities can be added following existing patterns