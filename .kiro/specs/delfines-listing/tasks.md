# Implementation Plan: Listing Page Enhancements

## Overview

This implementation plan converts the design into discrete coding tasks that build incrementally. The approach focuses on creating reusable components first, then integrating them into all listing pages, and finally moving the comparison section to the bottom.

## Tasks

- [x] 1. Set up types and configuration data
  - Add `PropertyMarketingContent` interface to `src/utils/types.ts`
  - Create `PROPERTY_MARKETING_CONFIG` object in `src/utils/constants.ts` with all property data
  - _Requirements: 7.1, 7.2_

- [x] 2. Create core marketing components
  - [x] 2.1 Create `InstantConfirmationBadge` component
    - Build styled badge component with Spanish/English text
    - Add red/highlighted styling as specified
    - _Requirements: 5.1, 5.2_

  - [ ]* 2.2 Write unit tests for `InstantConfirmationBadge`
    - Test Spanish and English text rendering
    - Test styling application
    - _Requirements: 5.1, 5.2_

  - [x] 2.3 Create `ListingMarketingSection` component
    - Render descriptive title in blue section
    - Display price in bold with correct currency format
    - Include instant confirmation badge
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 5.3_

  - [ ] 2.4 Write property test for price currency formatting

    - **Property 1: Price Currency Matches Page Language**
    - **Validates: Requirements 2.1, 2.2**

- [x] 3. Create content components
  - [x] 3.1 Create `SocialStatement` component
    - Render property-specific social proof text
    - Support Spanish/English language variants
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 3.2 Create `FeatureHighlights` component
    - Render "Why guests choose [Property Name]" section
    - Display features with emoji icons
    - Support Spanish/English content
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ]* 3.3 Write property test for feature highlights content
    - **Property 3: Feature Highlights Contain Configured Features**
    - **Validates: Requirements 4.1, 4.2, 4.4**

- [x] 4. Checkpoint - Test core components
  - Ensure all tests pass, ask the user if questions arise.

- [-] 5. Update English listing pages (11 files)
  - [x] 5.1 Update `ListingRana.page.tsx`
    - Add marketing section after title
    - Add social statement after images
    - Add feature highlights before description
    - Move OtherListings to bottom after description
    - _Requirements: 1.1, 2.4, 3.1, 4.3, 6.1_

  - [x] 5.2 Update `ListingGeco.page.tsx`
    - Apply same enhancements as Rana
    - _Requirements: 1.1, 2.4, 3.1, 4.3, 6.1_

  - [x] 5.3 Update `ListingTucano.page.tsx`
    - Apply same enhancements
    - _Requirements: 1.1, 2.4, 3.1, 4.3, 6.1_

  - [x] 5.4 Update `ListingPappagallo.page.tsx`
    - Apply same enhancements
    - _Requirements: 1.1, 2.4, 3.1, 4.3, 6.1_

  - [x] 5.5 Update `ListingVillaMar.page.tsx`
    - Apply same enhancements
    - _Requirements: 1.1, 2.4, 3.1, 4.3, 6.1_

  - [x] 5.6 Update `ListingVillaCoral.page.tsx`
    - Apply same enhancements
    - _Requirements: 1.1, 2.4, 3.1, 4.3, 6.1_

  - [x] 5.7 Update `ListingAreka.page.tsx`
    - Apply same enhancements
    - _Requirements: 1.1, 2.4, 3.1, 4.3, 6.1_

  - [x] 5.8 Update `ListingPlumeria.page.tsx`
    - Apply same enhancements
    - _Requirements: 1.1, 2.4, 3.1, 4.3, 6.1_

  - [x] 5.9 Update `ListingGiulia.page.tsx`
    - Apply same enhancements
    - _Requirements: 1.1, 2.4, 3.1, 4.3, 6.1_

  - [x] 5.10 Update `ListingDelfin.page.tsx`
    - Apply same enhancements
    - _Requirements: 1.1, 2.4, 3.1, 4.3, 6.1_

- [ ]* 5.11 Write property test for comparison section position
  - **Property 5: Comparison Section Position**
  - **Validates: Requirements 6.1, 6.2**

- [x] 6. Update Spanish listing pages (11 files)
  - [x] 6.1 Update `ListingRana.page_ES.tsx`
    - Add marketing section with Spanish content
    - Add social statement after images
    - Add feature highlights before description
    - Move OtherListings to bottom
    - _Requirements: 1.2, 2.1, 3.3, 4.3, 6.1_

  - [x] 6.2 Update `ListingGeco.page_ES.tsx`
    - Apply same Spanish enhancements
    - _Requirements: 1.2, 2.1, 3.3, 4.3, 6.1_

  - [x] 6.3 Update `ListingTucano.page_ES.tsx`
    - Apply same Spanish enhancements
    - _Requirements: 1.2, 2.1, 3.3, 4.3, 6.1_

  - [x] 6.4 Update `ListingPappagallo.page_ES.tsx`
    - Apply same Spanish enhancements
    - _Requirements: 1.2, 2.1, 3.3, 4.3, 6.1_

  - [x] 6.5 Update `ListingVillaMar.page_ES.tsx`
    - Apply same Spanish enhancements
    - _Requirements: 1.2, 2.1, 3.3, 4.3, 6.1_

  - [x] 6.6 Update `ListingVillaCoral.page_ES.tsx`
    - Apply same Spanish enhancements
    - _Requirements: 1.2, 2.1, 3.3, 4.3, 6.1_

  - [x] 6.7 Update `ListingAreka.page_ES.tsx`
    - Apply same Spanish enhancements
    - _Requirements: 1.2, 2.1, 3.3, 4.3, 6.1_

  - [x] 6.8 Update `ListingPlumeria.page_ES.tsx`
    - Apply same Spanish enhancements
    - _Requirements: 1.2, 2.1, 3.3, 4.3, 6.1_

  - [x] 6.9 Update `ListingGiulia.page_ES.tsx`
    - Apply same Spanish enhancements
    - _Requirements: 1.2, 2.1, 3.3, 4.3, 6.1_

  - [x] 6.10 Update `ListingDelfin.page_ES.tsx`
    - Apply same Spanish enhancements
    - _Requirements: 1.2, 2.1, 3.3, 4.3, 6.1_

- [ ]* 6.11 Write property test for language consistency
  - **Property 2: Text Content Language Consistency**
  - **Validates: Requirements 1.2, 3.3, 5.1, 5.2**

- [x] 7. Integration testing and validation
  - [ ]* 7.1 Write property test for content configuration mapping
    - **Property 4: Property Content Configuration Mapping**
    - **Validates: Requirements 7.1, 7.2**

  - [ ]* 7.2 Write integration tests for responsive behavior
    - Test component rendering on different screen sizes
    - Verify layout changes work correctly
    - _Requirements: 6.1, 6.2_

- [x] 8. Final checkpoint - Complete testing and validation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- All 22 listing page files need to be updated (11 English + 11 Spanish)
- The OtherListings component move is a layout change that affects all pages