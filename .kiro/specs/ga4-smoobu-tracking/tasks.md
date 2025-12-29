# Implementation Plan

- [x] 1. Create GA4 Smoobu tracking service foundation





  - Create `src/services/GA4SmoobuTracking.service.ts` with core interfaces and configuration
  - Implement service initialization with cookie consent integration using `CookieConsentService.canTrack()`
  - Add environment variable support for enabling/disabling the service
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Implement UTM parameter detection and pass-through system




  - [x] 2.1 Create UTM parameter manager class


    - Implement detection of UTM parameters (utm_source, utm_medium, utm_campaign, utm_content, utm_term) from current page URL
    - Add support for Google Ads parameters (gclid, gbraid, wbraid)
    - Create URL modification logic to append parameters to iframe src
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_
  
  - [x] 2.2 Integrate UTM pass-through with Smoobu iframe detection

    - Add iframe detection logic to identify Smoobu iframes by src attribute containing 'smoobu'
    - Implement parameter appending that preserves existing iframe parameters
    - Add validation to prevent duplicate parameters
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 3. Implement widget visibility and interaction tracking





  - [x] 3.1 Create widget visibility tracker

    - Implement viewport visibility detection using Intersection Observer API
    - Add 3-second visibility threshold before firing booking_widget_view event
    - Ensure single event firing per page load with state management
    - _Requirements: 3.1, 3.4_
  
  - [x] 3.2 Create widget interaction tracker

    - Add mouseenter and focus event listeners to Smoobu iframes
    - Implement booking_widget_interact event firing with single execution per page load
    - Ensure both events use event_category 'booking' for GA4
    - _Requirements: 3.2, 3.3, 3.5, 3.6_
  
  - [x] 3.3 Integrate with existing GA4 gtag function

    - Add gtag availability checking before firing events
    - Implement event firing using existing window.gtag function
    - Add error handling for missing GA4 implementation
    - _Requirements: 5.4_

- [x] 4. Integrate tracking service with Smoobu component





  - [x] 4.1 Modify Smoobu component to initialize tracking


    - Import and initialize GA4SmoobuTracking service in `src/components/Smoobu/Smoobu.component.tsx`
    - Add tracking service activation after iframe loads successfully
    - Integrate with existing iframe loading detection logic
    - _Requirements: 4.1, 4.2_
  
  - [x] 4.2 Add cookie consent integration to Smoobu component


    - Use `CookieConsentService.canTrack()` to check consent before initializing tracking
    - Listen for consent changes using `CookieConsentService.onConsentChange()`
    - Implement tracking activation/deactivation based on consent status
    - _Requirements: 1.1, 1.2_
  
  - [x] 4.3 Implement cleanup and memory management


    - Add proper cleanup in component unmount to prevent memory leaks
    - Remove event listeners and clear tracking state on component destruction
    - Handle multiple Smoobu components on the same page
    - _Requirements: 4.2, 4.3_

- [x] 5. Add development and testing utilities





  - [x] 5.1 Create debug mode functionality


    - Add console logging for all tracking operations when debug mode is enabled
    - Implement parameter validation logging and iframe URL modification tracking
    - Add event firing confirmations and error reporting
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [x] 5.2 Create manual testing utilities


    - Add global testing functions for manual GA4 event validation
    - Implement UTM parameter testing helpers for development
    - Create GA4 DebugView validation utilities
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [x] 5.3 Write unit tests for tracking service


    - Create tests for UTM parameter detection and URL modification
    - Add tests for visibility and interaction tracking logic
    - Test cookie consent integration and service state management
    - _Requirements: 1.1, 2.1, 3.1, 4.1_

- [x] 6. Environment configuration and deployment preparation





  - [x] 6.1 Add environment variables for configuration


    - Add `REACT_APP_GA4_SMOOBU_TRACKING_ENABLED` for enabling/disabling the feature
    - Add `REACT_APP_GA4_SMOOBU_TRACKING_DEBUG` for debug mode control
    - Add `REACT_APP_GA4_SMOOBU_VISIBILITY_THRESHOLD` for visibility timing configuration
    - _Requirements: 1.1, 1.4_
  
  - [x] 6.2 Update existing App.tsx integration


    - Ensure GA4 Smoobu tracking respects the same cookie consent logic as Meta Pixel
    - Add tracking service to the existing analytics initialization flow
    - Implement consistent error handling and logging patterns
    - _Requirements: 1.1, 1.2, 1.3_