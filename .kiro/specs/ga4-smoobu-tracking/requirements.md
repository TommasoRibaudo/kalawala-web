# Requirements Document

## Introduction

This feature implements Google Analytics 4 (GA4) and Google Ads tracking integration for the Smoobu iframe booking flow. The system maintains global GA4 tracking while enhancing attribution by passing UTM parameters to the Smoobu iframe and tracking widget interactions for funnel analysis.

## Glossary

- **GA4**: Google Analytics 4, the latest version of Google Analytics for web and app analytics
- **Smoobu_Iframe**: The embedded booking widget iframe from Smoobu service
- **UTM_Parameters**: Urchin Tracking Module parameters (utm_source, utm_medium, utm_campaign, utm_content, utm_term) used for campaign attribution
- **Google_Ads_Parameters**: Google Ads click identifiers (gclid, gbraid, wbraid) for conversion tracking
- **Parent_Page**: The main website page that contains the Smoobu iframe
- **Widget_Interaction**: User engagement with the booking iframe through mouse or focus events
- **Viewport_Visibility**: When the iframe is visible within the user's browser viewport

## Requirements

### Requirement 1

**User Story:** As a marketing analyst, I want GA4 to track all page views globally, so that I can measure overall website traffic and user behavior.

#### Acceptance Criteria

1. THE GA4_System SHALL maintain global tracking on all website pages
2. THE GA4_System SHALL use measurement ID G-Q1LMHMNCMW for all tracking events
3. THE GA4_System SHALL continue existing gtag configuration without modification
4. THE GA4_System SHALL load the Google Analytics script asynchronously on every page

### Requirement 2

**User Story:** As a marketing manager, I want UTM parameters and Google Ads identifiers to be passed to the Smoobu iframe, so that booking conversions can be properly attributed to their traffic sources.

#### Acceptance Criteria

1. WHEN a Parent_Page contains UTM_Parameters in the URL, THE UTM_Passthrough_System SHALL append these parameters to the Smoobu_Iframe source URL
2. WHEN a Parent_Page contains Google_Ads_Parameters in the URL, THE UTM_Passthrough_System SHALL append these parameters to the Smoobu_Iframe source URL
3. THE UTM_Passthrough_System SHALL preserve existing iframe parameters while adding new ones
4. THE UTM_Passthrough_System SHALL only add parameters that are not already present in the iframe URL
5. THE UTM_Passthrough_System SHALL support utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid, gbraid, and wbraid parameters

### Requirement 3

**User Story:** As a marketing analyst, I want to track when users view and interact with the booking widget, so that I can measure widget engagement and optimize placement (sales events are handled separately).

#### Acceptance Criteria

1. WHEN the Smoobu_Iframe becomes visible in the Viewport_Visibility for 3 seconds, THE Widget_Tracking_System SHALL fire a booking_widget_view event to GA4
2. WHEN a user performs Widget_Interaction with the Smoobu_Iframe, THE Widget_Tracking_System SHALL fire a booking_widget_interact event to GA4
3. THE Widget_Tracking_System SHALL categorize both events under event_category 'booking'
4. THE Widget_Tracking_System SHALL fire the booking_widget_view event only once per page load
5. THE Widget_Tracking_System SHALL fire the booking_widget_interact event only once per page load
6. THE Widget_Tracking_System SHALL detect mouseenter and focus events as Widget_Interaction triggers
7. THE Widget_Tracking_System SHALL NOT track sales or conversion events from the Smoobu iframe

### Requirement 4

**User Story:** As a developer, I want the tracking system to work only on pages that contain Smoobu iframes, so that unnecessary processing is avoided on other pages.

#### Acceptance Criteria

1. THE Iframe_Detection_System SHALL identify pages containing Smoobu iframes by checking for iframe elements with 'smoobu' in the src attribute
2. WHEN no Smoobu_Iframe is detected on a page, THE UTM_Passthrough_System SHALL not execute
3. WHEN no Smoobu_Iframe is detected on a page, THE Widget_Tracking_System SHALL not execute
4. THE Iframe_Detection_System SHALL use DOM queries to locate Smoobu iframes

### Requirement 5

**User Story:** As a quality assurance tester, I want to verify that tracking events are properly sent to GA4, so that I can confirm the implementation works correctly.

#### Acceptance Criteria

1. THE GA4_System SHALL send booking_widget_view events that appear in GA4 DebugView
2. THE GA4_System SHALL send booking_widget_interact events that appear in GA4 DebugView
3. THE UTM_Passthrough_System SHALL modify iframe URLs to include UTM parameters when present in the parent page URL
4. THE Widget_Tracking_System SHALL only execute when the gtag function is available in the global scope