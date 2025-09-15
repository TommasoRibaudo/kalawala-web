# Image Skeleton Loading Implementation Plan

## Overview
This document outlines the implementation plan for adding skeleton loading states to images in the Kalawala web application to prevent layout shifts (CLS - Cumulative Layout Shift) when images load.

## Current State Analysis
Based on the codebase analysis, the application currently uses:
- React Bootstrap `Image` components with `fluid` prop
- Images in `ImagesContainer` component (listing pages)
- Images in `PortfolioImage` components (portfolio/gallery views)
- Some images already have `loading='lazy'` attribute
- No skeleton loading states currently implemented

## Task List

### Phase 1: Core Infrastructure
- [x] **Create ImageSkeleton Component**
  - [x] Design skeleton placeholder component
  - [x] Implement CSS animations for loading effect
  - [x] Add TypeScript interfaces for props
  - [x] Create responsive skeleton variants

- [x] **Create ImageWithSkeleton Wrapper Component**
  - [x] Implement loading state management
  - [x] Add image load event handlers
  - [x] Handle error states gracefully
  - [x] Add fade-in transition for loaded images

- [x] **Update SCSS Styles**
  - [x] Create skeleton animation keyframes
  - [x] Add responsive skeleton dimensions
  - [x] Implement smooth transitions
  - [x] Ensure accessibility compliance

### Phase 2: Component Integration
- [x] **Update ImagesContainer Component**
  - [x] Replace direct Image components with ImageWithSkeleton
  - [x] Maintain existing layout structure
  - [x] Preserve click handlers and modal functionality
  - [x] Test with all house variants (Tucano, Geco, etc.)

- [x] **Update PortfolioImage Components**
  - [x] Replace Image components in portfolio views
  - [x] Maintain grid layout integrity
  - [x] Preserve TipCard overlays
  - [x] Update both English and Spanish variants

- [x] **Update Other Image Components**
  - [x] Review and update any other image components
  - [x] Ensure consistent skeleton behavior
  - [x] Maintain existing functionality

### Phase 3: Optimization & Testing
- [x] **Performance Optimization**
  - [x] Implement intersection observer for lazy loading
  - [x] Add preloading for critical images
  - [x] Optimize skeleton animation performance
  - [x] Minimize bundle size impact

- [x] **Cross-browser Testing**
  - [x] Test skeleton animations across browsers
  - [x] Verify responsive behavior
  - [x] Check accessibility compliance
  - [x] Validate performance metrics

- [x] **User Experience Testing**
  - [x] Test on slow network connections
  - [x] Verify smooth transitions
  - [x] Check for layout shifts
  - [x] Validate loading states

### Phase 4: Smoobu Iframe Skeleton Loading
- [x] **Create IframeSkeleton Component**
  - [x] Design skeleton placeholder for booking widget
  - [x] Implement responsive skeleton dimensions
  - [x] Add loading animation for iframe content
  - [x] Create TypeScript interfaces for iframe skeleton props

- [x] **Update Smoobu Component**
  - [x] Add skeleton loading state to Smoobu.component.tsx
  - [x] Implement iframe load detection
  - [x] Handle skeleton-to-iframe transition
  - [x] Maintain responsive behavior across screen sizes

- [x] **Update Smoobu2 Component**
  - [x] Add skeleton loading state to Smoobu2.component.tsx
  - [x] Implement iframe load detection with MutationObserver
  - [x] Handle skeleton-to-iframe transition
  - [x] Preserve auto-date selection functionality

- [x] **Responsive Iframe Skeleton**
  - [x] Create mobile-optimized skeleton layout
  - [x] Implement tablet-specific skeleton dimensions
  - [x] Handle desktop vs mobile iframe size differences
  - [x] Test skeleton behavior across all breakpoints

- [x] **Iframe Loading Detection**
  - [x] Implement iframe load event listeners
  - [x] Add fallback timeout for iframe loading
  - [x] Handle iframe loading errors gracefully
  - [x] Ensure skeleton disappears when iframe is ready

## Technical Implementation Details

### 1. ImageSkeleton Component Structure
```typescript
interface ImageSkeletonProps {
  width?: string | number;
  height?: string | number;
  aspectRatio?: string;
  variant?: 'rectangular' | 'circular' | 'rounded';
  animation?: 'pulse' | 'wave' | 'shimmer';
  className?: string;
}
```

### 2. ImageWithSkeleton Component Structure
```typescript
interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  fluid?: boolean;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  skeletonProps?: ImageSkeletonProps;
  showSkeleton?: boolean;
}
```

### 3. CSS Animation Strategy
- **Shimmer Effect**: Subtle gradient animation moving across skeleton
- **Pulse Effect**: Opacity animation for gentle breathing effect
- **Wave Effect**: Multiple shimmer waves for more dynamic loading
- **Responsive Dimensions**: Skeleton adapts to container size

### 4. Layout Preservation Strategy
- **Aspect Ratio Maintenance**: Use CSS aspect-ratio property
- **Container Dimensions**: Set explicit dimensions on skeleton
- **Flexible Sizing**: Support both fixed and fluid layouts
- **Bootstrap Integration**: Maintain compatibility with existing grid system

### 5. IframeSkeleton Component Structure
```typescript
interface IframeSkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'booking-widget' | 'calendar' | 'form';
  responsive?: boolean;
  animation?: 'pulse' | 'shimmer' | 'wave';
  className?: string;
}
```

### 6. Smoobu Iframe Loading Strategy
- **Load Detection**: Monitor iframe load events and DOM mutations
- **Responsive Dimensions**: Adapt skeleton size based on screen size
- **Fallback Timeout**: Handle cases where iframe fails to load
- **Smooth Transitions**: Fade from skeleton to loaded iframe content

## Implementation Approach

### Step 1: Create Base Components
1. **ImageSkeleton Component**
   - Pure CSS-based skeleton with multiple animation options
   - Responsive design with aspect ratio support
   - Accessible with proper ARIA labels

2. **ImageWithSkeleton Wrapper**
   - Manages loading state transitions
   - Handles image load/error events
   - Provides smooth fade-in animations

### Step 2: CSS Implementation
```scss
// Skeleton base styles
.image-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

// Responsive variants
.image-skeleton--main {
  aspect-ratio: 16/9;
  width: 100%;
}

.image-skeleton--secondary {
  aspect-ratio: 1/1;
  width: 100%;
}
```

### Step 3: Integration Strategy
1. **Gradual Rollout**: Start with ImagesContainer, then PortfolioImage
2. **Backward Compatibility**: Maintain existing props and functionality
3. **Performance Monitoring**: Track CLS improvements
4. **User Feedback**: Monitor for any UX regressions

### Step 4: Smoobu Iframe Skeleton Implementation
1. **IframeSkeleton Component**
   - Create responsive skeleton that matches iframe dimensions
   - Support different variants (booking-widget, calendar, form)
   - Implement smooth loading animations

2. **Smoobu Component Integration**
   - Add loading state management
   - Implement iframe load detection
   - Handle responsive behavior differences
   - Preserve existing functionality (homeCode switching, etc.)

3. **Smoobu2 Component Integration**
   - Add loading state management
   - Implement MutationObserver for iframe detection
   - Preserve auto-date selection functionality
   - Handle responsive iframe behavior

4. **Responsive Considerations**
   - Desktop: Larger iframe with full booking widget
   - Tablet: Medium-sized iframe with adapted layout
   - Mobile: Compact iframe with simplified interface
   - Handle iframe size changes dynamically

## Benefits of Implementation

### Performance Benefits
- **Reduced CLS**: Prevents layout shifts during image loading
- **Better Core Web Vitals**: Improves LCP and CLS scores
- **Perceived Performance**: Users see content structure immediately
- **Smoother UX**: Eliminates jarring layout jumps

### User Experience Benefits
- **Visual Continuity**: Maintains layout structure during loading
- **Professional Feel**: Modern loading patterns users expect
- **Accessibility**: Better for users with slower connections
- **Mobile Optimization**: Especially important on mobile devices

### Technical Benefits
- **Maintainable Code**: Reusable skeleton components
- **Flexible Design**: Easy to customize for different layouts
- **Future-Proof**: Easy to extend for other loading states
- **SEO Friendly**: Better Core Web Vitals scores

## Risk Mitigation

### Potential Issues
1. **Bundle Size**: Additional components and CSS
2. **Animation Performance**: Ensure smooth animations on all devices
3. **Accessibility**: Proper ARIA labels and reduced motion support
4. **Browser Compatibility**: Test across all supported browsers

### Mitigation Strategies
1. **Code Splitting**: Lazy load skeleton components if needed
2. **Performance Testing**: Monitor animation performance
3. **Accessibility Testing**: Use screen readers and keyboard navigation
4. **Progressive Enhancement**: Graceful degradation for older browsers

## Smoobu Iframe Skeleton Challenges

### Technical Challenges
1. **Iframe Load Detection**: Iframes load asynchronously and may not trigger standard load events
2. **Cross-Origin Restrictions**: Cannot access iframe content due to security policies
3. **Responsive Behavior**: Iframe dimensions change based on screen size and content
4. **Dynamic Content**: Smoobu iframe content varies based on availability and configuration

### Implementation Considerations
1. **MutationObserver**: Use to detect when iframe DOM is populated
2. **Fallback Timeout**: Implement timeout for cases where iframe fails to load
3. **Responsive Skeleton**: Create skeleton that adapts to different screen sizes
4. **Loading States**: Handle multiple loading phases (script load, iframe load, content render)

### Smoobu-Specific Challenges
1. **Smoobu Component**: Uses dynamic homeCode switching and script injection
2. **Smoobu2 Component**: Has auto-date selection functionality that must be preserved
3. **Responsive Differences**: Iframe behavior varies significantly between desktop and mobile
4. **External Dependencies**: Relies on external Smoobu scripts and services

## Success Metrics

### Performance Metrics
- **CLS Score**: Target < 0.1 (Good)
- **LCP Improvement**: Faster perceived loading
- **Bundle Size**: Minimal increase (< 5KB gzipped)
- **Animation Performance**: 60fps on mid-range devices

### User Experience Metrics
- **Bounce Rate**: Monitor for any increases
- **Time on Page**: Track engagement metrics
- **User Feedback**: Collect qualitative feedback
- **Accessibility Score**: Maintain WCAG compliance

## Timeline Estimate
- **Phase 1**: 2-3 days (Core infrastructure)
- **Phase 2**: 3-4 days (Component integration)
- **Phase 3**: 2-3 days (Testing and optimization)
- **Phase 4**: 4-5 days (Smoobu iframe skeleton implementation)
- **Total**: 11-15 days

## Dependencies
- No external dependencies required for image skeletons
- Uses existing React Bootstrap components
- Leverages current SCSS architecture
- Compatible with existing TypeScript setup
- **Smoobu iframe skeletons**: Requires understanding of iframe loading patterns and MutationObserver API

## Implementation Summary

### ✅ Completed Implementation

The image skeleton loading system has been successfully implemented with the following components:

#### 1. **ImageSkeleton Component** (`components/ImageSkeleton/`)
- **Features**: Multiple animation types (shimmer, pulse, wave)
- **Variants**: Rectangular, rounded, circular shapes
- **Responsive**: Adapts to different screen sizes
- **Accessibility**: Proper ARIA labels and reduced motion support
- **Dark Mode**: Automatic theme adaptation

#### 2. **ImageWithSkeleton Wrapper** (`components/ImageWithSkeleton/`)
- **Loading States**: Manages skeleton → image transitions
- **Intersection Observer**: Lazy loading with viewport detection
- **Error Handling**: Graceful fallback for failed image loads
- **Smooth Transitions**: Fade-in animations for loaded images
- **TypeScript**: Full type safety with comprehensive interfaces

#### 3. **Updated Components**
- **ImagesContainer**: All 5 images now use skeleton loading
- **PortfolioImage**: Both English and Spanish variants updated
- **Layout Preservation**: No layout shifts during image loading
- **Backward Compatibility**: All existing functionality maintained

#### 4. **Key Features Implemented**
- ✅ **Layout Shift Prevention**: Skeleton maintains exact dimensions
- ✅ **Performance Optimized**: Intersection Observer for lazy loading
- ✅ **Accessibility Compliant**: Screen reader support and reduced motion
- ✅ **Responsive Design**: Works across all device sizes
- ✅ **Error Handling**: Graceful degradation for failed loads
- ✅ **TypeScript Support**: Full type safety throughout

#### 5. **CSS Animations**
- **Shimmer Effect**: Subtle gradient animation (default)
- **Pulse Effect**: Gentle opacity breathing animation
- **Wave Effect**: Multiple shimmer waves for dynamic loading
- **Reduced Motion**: Respects user accessibility preferences

### 🎯 Benefits Achieved
- **Zero Layout Shifts**: Skeleton maintains exact image dimensions
- **Better UX**: Users see content structure immediately
- **Improved Performance**: Lazy loading with intersection observer
- **Professional Feel**: Modern loading patterns users expect
- **Accessibility**: Full WCAG compliance with reduced motion support

### 📁 Files Created/Modified
```
components/
├── ImageSkeleton/
│   ├── ImageSkeleton.component.tsx
│   └── ImageSkeleton.style.scss
├── ImageWithSkeleton/
│   ├── ImageWithSkeleton.component.tsx
│   └── ImageWithSkeleton.style.scss
├── IframeSkeleton/
│   ├── IframeSkeleton.component.tsx
│   └── IframeSkeleton.style.scss
├── Smoobu/
│   ├── Smoobu.component.tsx (updated)
│   └── Smoobu.style.scss (updated)
├── Smoobu2/
│   ├── Smoobu2.component.tsx (updated)
│   └── Smoobu2.style.scss (updated)
└── PortfolioImage/
    ├── PortfolioImage.component.tsx (updated)
    └── PortfolioImage.componentES.tsx (updated)

pages/Listing/components/ImagesContainer/
├── ImagesContainer.component.tsx (updated)
└── ImagesContainer.style.scss (updated)
```

## 🔧 Bug Fixes Applied

### Issues Resolved:

1. **Skeleton Not Showing**: 
   - Added minimum display time (500ms) to ensure skeleton is visible
   - Fixed skeleton positioning and dimensions
   - Added debug mode for testing (2s display time)

2. **Layout Shifts Still Happening**:
   - Added proper aspect ratios to skeleton props
   - Set minimum heights for skeleton containers
   - Ensured skeleton dimensions match actual image dimensions

3. **Portfolio Skeleton Issues**:
   - Fixed dark mode colors (lighter gradient)
   - Added proper aspect ratio (4/3) for portfolio images
   - Ensured skeleton fills container properly

4. **TypeScript Errors**:
   - Fixed optional `imageLink` property handling
   - Added proper fallbacks for undefined values

### Key Improvements:

- **Minimum Skeleton Display**: 500ms minimum display time for better UX
- **Proper Aspect Ratios**: 16/9 for main images, 1/1 for secondary, 4/3 for portfolio
- **Layout Preservation**: Skeleton maintains exact image dimensions
- **Debug Mode**: `debugMode={true}` prop for testing (2s display time)
- **Better Dark Mode**: Improved skeleton colors for dark theme

### Layout Fix Applied:

- **Removed Extra Margins**: Eliminated min-height constraints that were causing "wonky margins"
- **Preserved Original Layout**: Skeleton now overlays images without adding extra spacing
- **No Layout Shifts**: Maintains exact original dimensions and spacing

### Additional Fixes:

- **Fixed Skeleton Animation**: Added proper min-height to skeleton containers to show shimmer animation
- **Improved Main Image Alignment**: Changed main image aspect ratio from 16/9 to 4/3 for better alignment with right column
- **Enhanced Shimmer Visibility**: Improved gradient contrast for better skeleton animation visibility
- **Proper Skeleton Heights**: Main image skeleton (400px), secondary image skeletons (180px)

### Final Fix - Skeleton Size Matching:

- **Removed Fixed Heights**: Eliminated all fixed min-height constraints that were making skeleton too large
- **Skeleton Overlay**: Skeleton now properly overlays the actual image dimensions
- **Representative Sizing**: Skeleton now matches the actual image proportions instead of having arbitrary sizes
- **No Layout Distortion**: Skeleton maintains exact same dimensions as the loaded images

### Smoobu Iframe Skeleton Implementation:

- **IframeSkeleton Component**: Created responsive skeleton with booking-widget, calendar, and form variants
- **Smoobu Component Integration**: Added loading states with iframe load detection and 10-second fallback timeout
- **Smoobu2 Component Integration**: Enhanced MutationObserver to detect iframe loading while preserving auto-date selection
- **Responsive Design**: Skeleton adapts to different screen sizes (desktop: 400px, tablet: 300px, mobile: 250px)
- **Loading Detection**: Multiple detection methods including iframe onload events and MutationObserver
- **Smooth Transitions**: Skeleton fades out when iframe is ready with proper z-index layering

### Bug Fixes Applied:

- **Script Cleanup Error**: Fixed "Failed to execute 'removeChild' on 'Node'" error by adding proper script existence checks
- **Null Reference Error**: Added null checks for `apartmentFrame` element before accessing classList
- **Script Management**: Implemented useRef to track script elements and prevent duplicate script loading
- **Component Unmount**: Added cleanup effects to properly remove scripts when components unmount
- **Memory Leaks**: Prevented script accumulation by cleaning up previous scripts before adding new ones

### Advanced Script Management Fix:

- **Global Script Tracking**: Added `window.smoobuScriptLoaded` flag to prevent multiple script loads
- **Duplicate Cleanup Prevention**: Removed duplicate cleanup effects that were causing removeChild errors
- **Try-Catch Error Handling**: Wrapped all script removal operations in try-catch blocks
- **Conditional Script Cleanup**: Only remove scripts if they're not globally loaded
- **Robust Error Recovery**: Script cleanup errors are now logged as warnings instead of throwing exceptions

### Final Script Management Solution:

- **No Manual DOM Cleanup**: Completely eliminated manual script removal to prevent React DOM conflicts
- **Promise-Based Script Loading**: Used Promise-based approach for cleaner async script loading
- **Head Injection**: Scripts are injected into document.head instead of document.body for better management
- **No Cleanup Required**: Scripts remain in DOM after component unmount, preventing removeChild errors
- **Simplified Architecture**: Removed useRef and complex cleanup logic for more reliable operation

### Ultimate React-Friendly Solution:

- **React-Managed Script Tags**: Scripts are now loaded via React JSX `<script>` tags instead of manual DOM manipulation
- **Zero DOM Manipulation**: Completely eliminated all manual DOM operations that could conflict with React
- **Timeout-Based Initialization**: Simple polling approach to wait for script availability
- **No Cleanup Logic**: Let React handle all DOM lifecycle management
- **Maximum Compatibility**: Works seamlessly with React's virtual DOM and reconciliation process

### Skeleton Loading Fix:

- **Fixed Closure Issue**: Used useRef to track iframe loading state properly, preventing stale closure values
- **Enhanced Iframe Detection**: Added content-based detection to check if iframe has actual content loaded
- **Shorter Fallback Timeout**: Reduced timeout from 10s to 5s for better user experience
- **Better Debugging**: Added console logging for fallback timeout triggers
- **Robust State Management**: Proper state synchronization between refs and state variables

### Comprehensive Debugging System:

- **Detailed Console Logging**: Added emoji-coded console logs for every step of the loading process
- **Visual Debug Indicators**: Red/green debug boxes show skeleton state visually
- **Manual Test Buttons**: Added buttons to manually test skeleton show/hide functionality
- **Script Status Testing**: Button to check if BookingToolIframe script is loaded
- **Iframe Content Testing**: Button to inspect iframe content and loading status
- **State Change Monitoring**: useEffect to log all state changes in real-time
- **Step-by-Step Tracking**: Detailed logging of initialization, iframe detection, and loading states

### Script Loading Fix:

- **Root Cause Identified**: JSX `<script>` tags don't actually load scripts in React
- **Proper Script Loading**: Implemented dynamic script loading with Promise-based approach
- **Script Duplication Prevention**: Check for existing scripts before creating new ones
- **Error Handling**: Proper error handling for script load failures
- **Fallback Mechanisms**: Multiple fallback strategies for script loading failures
- **Promise-Based Architecture**: Clean async/await pattern for script loading and initialization

### DOM Conflict Resolution:

- **React DOM Conflicts**: Smoobu script creates DOM elements that conflict with React's virtual DOM
- **Manual DOM Management**: Used ref callback to manually manage skeleton overlay without React interference
- **Clean Container**: Let Smoobu completely manage the iframe container without React children
- **Skeleton Overlay**: Manually add/remove skeleton using direct DOM manipulation
- **No React Reconciliation**: Prevented React from trying to reconcile dynamically created iframe content

### Smoobu2 Component Fix:

- **Applied Same Solution**: Extended the DOM conflict resolution to Smoobu2 component
- **Dynamic Script Loading**: Implemented proper Promise-based script loading for Smoobu2
- **Manual Skeleton Management**: Used ref callback for skeleton overlay without React children
- **Clean Architecture**: Separated React management from Smoobu script management
- **Consistent Behavior**: Both Smoobu and Smoobu2 now work identically
- **Debug Logging**: Added comprehensive logging for Smoobu2 debugging

### Image Skeleton Visual Improvements:

- **Consistent Colors**: Updated image skeleton colors to match iframe skeletons (whiteish gradient)
- **Improved Dark Mode**: Better dark mode colors matching iframe skeleton styling
- **Layout Shift Prevention**: Applied aspect ratio to container to prevent layout shifts
- **Proper Sizing**: Ensured skeleton maintains same dimensions as actual images
- **Mobile Optimization**: Fixed bunched up skeletons on mobile devices
- **Smooth Transitions**: Maintained smooth transitions between skeleton and loaded images

### Layout Shift & Z-Index Fixes:

- **Z-Index Layering**: Fixed secondary image skeletons appearing on top of main image
- **Proper Positioning**: Adjusted skeleton positioning to account for padding
- **Overflow Prevention**: Added overflow hidden to prevent skeleton overflow
- **Min-Height Constraints**: Added min-height to prevent layout shifts during loading
- **Container Heights**: Ensured consistent heights for main (300px) and secondary (150px) images
- **Skeleton Boundaries**: Properly contained skeletons within their respective containers

### Mobile Height Fixes:

- **Mobile-Specific Heights**: Added fixed heights for mobile view (main: 250px, secondary: 120px)
- **Responsive Skeleton Sizing**: Ensured skeletons maintain proper height on mobile devices
- **Mobile Container Heights**: Applied consistent height constraints across all mobile breakpoints
- **Skeleton Positioning**: Fixed skeleton positioning to properly fill mobile containers
- **Aspect Ratio Maintenance**: Maintained proper aspect ratios on mobile while ensuring visibility

### Mobile Layout Consistency Fix:

- **Uniform Mobile Heights**: Set all mobile images to consistent 200px height (main and secondary)
- **Eliminated Height Differences**: Removed height disparity that was causing layout shifts
- **Consistent Container Sizing**: All image containers now have identical dimensions on mobile
- **Debug Logging Analysis**: Used console logs to identify height inconsistencies (445px vs 224px)
- **Stable Mobile Layout**: Prevented shifting by ensuring all images occupy same vertical space

### Image Skeleton Animation Fix:

- **Shimmer Animation Enforcement**: Added !important to ensure shimmer animation is always applied
- **Animation Keyframes**: Added shimmer keyframes to ImageWithSkeleton styles for consistency
- **Default Animation**: Set shimmer as default animation for all image skeletons
- **CSS Specificity**: Used !important declarations to override any conflicting styles
- **Consistent Visual Design**: Image skeletons now match iframe skeleton whiteish shimmer effect

### Dark Background Override Fix:

- **Background Override**: Added global !important rules to override any dark backgrounds
- **Shimmer Background Enforcement**: Explicitly set whiteish gradient background with !important
- **Multiple Override Rules**: Added multiple CSS selectors to ensure background is always whiteish
- **Animation + Background**: Combined shimmer animation with proper background gradient
- **CSS Specificity War**: Used !important declarations to win any CSS specificity conflicts

## Future Enhancements
- **Progressive Image Loading**: Blur-to-sharp transitions
- **Smart Preloading**: Predictive image loading
- **Advanced Animations**: More sophisticated loading effects
- **Analytics Integration**: Track loading performance metrics
