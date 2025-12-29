# Requirements Document

## Introduction

This feature adds a new vacation rental listing called "Delfines" to the Kalawala website. Delfines is a 6-person accommodation with similar amenities to Casa Rana but without pet-friendly features. The listing needs to be available in both English and Spanish and integrated into the existing home page widgets alongside other Kalawala properties.

## Glossary

- **Delfines**: A new vacation rental property that accommodates 6 guests
- **Kalawala_Group**: The collection of houses including Rana, Tucano, Pappagallo, and Geco
- **Listing_Page**: Individual property detail pages showing amenities, photos, and booking information
- **Home_Widget**: Components on the home page that display property cards
- **Other_Homes_Widget**: Component showing related properties on individual listing pages
- **House_Data_List**: The central data structure containing all property information
- **Smoobu_Component**: The booking widget integrated into each listing page

## Requirements

### Requirement 1

**User Story:** As a potential guest, I want to view the Delfines property listing in English, so that I can see details about this 6-person accommodation.

#### Acceptance Criteria

1. WHEN a user navigates to "/Delfin", THE Kalawala_System SHALL display the English Delfin listing page
2. THE Kalawala_System SHALL show that Delfines accommodates 6 guests
3. THE Kalawala_System SHALL display the same amenities as Rana except pet-friendly features
4. THE Kalawala_System SHALL include a Smoobu_Component for booking
5. THE Kalawala_System SHALL display property photos copied from Rana initially

### Requirement 2

**User Story:** As a Spanish-speaking potential guest, I want to view the Delfines property listing in Spanish, so that I can understand the property details in my preferred language.

#### Acceptance Criteria

1. WHEN a user navigates to "/DelfinES", THE Kalawala_System SHALL display the Spanish Delfin listing page
2. THE Kalawala_System SHALL show all content translated to Spanish
3. THE Kalawala_System SHALL display the same amenities as RanaES except pet-friendly features
4. THE Kalawala_System SHALL include a Smoobu_Component for booking
5. THE Kalawala_System SHALL use Spanish navigation components

### Requirement 3

**User Story:** As a user browsing the home page, I want to see Delfines included with other Kalawala properties, so that I can discover this accommodation option.

#### Acceptance Criteria

1. THE Kalawala_System SHALL include Delfin in the homesSnippet array
2. THE Kalawala_System SHALL display Delfin alongside Rana, Tucano, Pappagallo, and Geco
3. THE Kalawala_System SHALL show Delfin with 6 guest capacity on the home page
4. THE Kalawala_System SHALL use placeholder images copied from Rana initially

### Requirement 4

**User Story:** As a user viewing any Kalawala property listing, I want to see Delfines in the "Other Listings" section, so that I can compare accommodation options.

#### Acceptance Criteria

1. THE Kalawala_System SHALL include Delfin in the Other_Homes_Widget on all Kalawala property pages
2. THE Kalawala_System SHALL exclude Delfin from its own Other_Homes_Widget
3. THE Kalawala_System SHALL display Delfin with correct guest capacity and image
4. THE Kalawala_System SHALL link to the appropriate language version of Delfin

### Requirement 5

**User Story:** As a system administrator, I want Delfines data properly integrated into the House_Data_List, so that all components can access consistent property information.

#### Acceptance Criteria

1. THE Kalawala_System SHALL add Delfin entries to the House_Data_List with English and Spanish versions
2. THE Kalawala_System SHALL assign houseCode 10 for Delfin Smoobu integration
3. THE Kalawala_System SHALL set guestNumber to 6 for Delfin
4. THE Kalawala_System SHALL include all Rana amenities except pet-friendly features
5. THE Kalawala_System SHALL use houseLangCode "Delfin" for English and "DelfinES" for Spanish
6. THE Kalawala_System SHALL use the provided property description for both English and Spanish versions
7. THE Kalawala_System SHALL create separate image description arrays for Delfin (copied from Rana initially)

### Requirement 6

**User Story:** As a user, I want proper routing to access Delfines listings, so that I can navigate directly to the property pages via URL.

#### Acceptance Criteria

1. THE Kalawala_System SHALL add "/Delfin" route pointing to the English listing component
2. THE Kalawala_System SHALL add "/DelfinES" route pointing to the Spanish listing component
3. THE Kalawala_System SHALL ensure routes are properly imported in the router configuration
4. THE Kalawala_System SHALL maintain consistent routing patterns with existing properties
### R
equirement 7

**User Story:** As a guest, I want to see accurate property description for Delfines, so that I understand what amenities and features are available.

#### Acceptance Criteria

1. THE Kalawala_System SHALL display the provided description text for Delfin
2. THE Kalawala_System SHALL specify that Delfin accommodates up to 6 people
3. THE Kalawala_System SHALL mention 2 A/C units (not in kitchen or living room)
4. THE Kalawala_System SHALL include information about private parking and prime location
5. THE Kalawala_System SHALL note the flexible check-out policy with lockbox key drop-off