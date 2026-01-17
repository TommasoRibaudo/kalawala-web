# Design Document

## Overview

This design outlines the enhancement of the "Two Days in Puerto Viejo" blog article with three key components: a repositioned stay recommendation block, a "Why stay with us" micro-block, and a Smoobu booking component. The design leverages existing React components and follows the current architecture patterns while introducing new reusable components for blog enhancements.

## Architecture

### Current Blog Structure
The blog system uses a static page approach with individual TSX files for each article. The "TwoDaysInPV.tsx" component follows a standard layout with:
- Fixed navigation
- Two-column layout (sidebar with ListingAd, main content area)
- Article content in the main column
- ContactUs component at the bottom

### Enhancement Integration Points
1. **Stay Recommendation Block**: Will be inserted in the middle of the article content
2. **Why Stay With Us Block**: Will be positioned after the main content but before OtherBlogs
3. **Smoobu Component**: Will be placed at the end of the article, before ContactUs

## Components and Interfaces

### 1. StayRecommendation Component

```typescript
interface StayRecommendationProps {
  title: string;
  properties: {
    name: string;
    reason: string;
    link: string;
  }[];
}
```

**Purpose**: Display targeted accommodation recommendations in the middle of the article
**Location**: `src/components/StayRecommendation/StayRecommendation.component.tsx`

**Features**:
- Responsive design matching blog styling
- Three specific properties with reasons
- Links to individual property pages
- Spanish language support

### 2. WhyStayWithUs Component

```typescript
interface WhyStayWithUsProps {
  title: string;
  benefits: string[];
  ctaText: string;
  ctaLink: string;
}
```

**Purpose**: Highlight unique value propositions for direct booking
**Location**: `src/components/WhyStayWithUs/WhyStayWithUs.component.tsx`

**Features**:
- Concise micro-block design
- Four key benefit points
- Call-to-action button
- Minimal styling to avoid overwhelming content

### 3. Existing Smoobu2 Component Integration

**Purpose**: Reuse existing Smoobu booking functionality at article end
**Location**: `src/components/Smoobu2/Smoobu2.component.tsx` (existing)

**Features**:
- Already implemented iframe integration with Smoobu booking system
- Existing loading states with skeleton UI
- Built-in error handling for script and iframe loading failures
- Responsive design considerations
- Proper script loading with fallbacks

**Integration Approach**:
- Import existing Smoobu2 component
- Configure with appropriate targetId for blog context
- Ensure styling works within blog layout

### 4. Enhanced TwoDaysInPV Component

The existing `TwoDaysInPV.tsx` will be modified to include the new components at strategic positions within the article flow.

## Data Models

### Property Recommendation Data
```typescript
interface PropertyRecommendation {
  name: 'Casa Geco' | 'Plumeria' | 'Villa Coral';
  reason: string;
  link: string;
  houseCode?: number;
}
```

### Why Stay Benefits Data
```typescript
interface StayBenefit {
  text: string;
  icon?: string;
}
```

## Integration with Existing Systems

### 1. Property Data Integration
- Leverage existing `houseDataEngList` from constants.ts
- Use existing property images and links
- Maintain consistency with current property naming conventions

### 2. Smoobu Integration
- Utilize existing `GA4SmoobuTrackingService` for analytics
- Follow existing iframe patterns from the codebase
- Ensure UTM parameter pass-through functionality

### 3. Styling Integration
- Use existing SCSS patterns from `Listing.style.scss`
- Maintain responsive design consistency
- Follow current color scheme and typography

## Error Handling

### Component-Level Error Handling
1. **StayRecommendation**: Graceful degradation if property data is unavailable
2. **WhyStayWithUs**: Fallback content if benefits data is missing
3. **SmoobuBooking**: Error boundary for iframe loading failures

### Data Validation
- Validate property links before rendering
- Ensure required props are provided
- Handle missing translations gracefully

## Testing Strategy

### Unit Testing Approach
- Test component rendering with various prop combinations
- Validate property data mapping
- Test responsive behavior
- Verify accessibility compliance

### Integration Testing
- Test component integration within TwoDaysInPV page
- Validate Smoobu iframe functionality
- Test GA4 tracking integration
- Verify responsive layout behavior

### Manual Testing Checklist
- Visual consistency across devices
- Link functionality to property pages
- Smoobu booking flow completion
- Performance impact assessment

## Performance Considerations

### Loading Optimization
- Lazy load Smoobu iframe to improve initial page load
- Optimize component bundle size
- Use React.memo for static components

### SEO Considerations
- Maintain existing meta tags and structured data
- Ensure new content is crawlable
- Preserve existing canonical URLs and hreflang tags

## Accessibility

### WCAG Compliance
- Proper heading hierarchy for new sections
- Alt text for any new images
- Keyboard navigation support
- Screen reader compatibility

### Focus Management
- Logical tab order through new components
- Proper ARIA labels where needed
- Color contrast compliance

## Responsive Design

### Breakpoint Strategy
- Mobile-first approach matching existing patterns
- Tablet optimization for middle-sized screens
- Desktop layout optimization

### Component Responsiveness
- StayRecommendation: Stack vertically on mobile
- WhyStayWithUs: Compact mobile layout
- SmoobuBooking: Responsive iframe sizing

### Blog Layout Centering
- **Large screens (lg)**: 8-column span with centered alignment for optimal readability
- **Medium screens (md)**: 10-column span to maintain good spacing
- **Small screens (sm/xs)**: Full width (12 columns) for mobile optimization
- **Container**: Flexbox centering with `justifyContent: center` on Row
- **Column**: Flexbox column layout with `alignItems: center` for content alignment

## Implementation Phases

### Phase 1: Component Creation
Create the three new components with basic functionality and styling

### Phase 2: Integration
Integrate components into the TwoDaysInPV page at specified positions

### Phase 3: Styling and Polish
Apply responsive design and ensure visual consistency

### Phase 4: Testing and Optimization
Comprehensive testing and performance optimization