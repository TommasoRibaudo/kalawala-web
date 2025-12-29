/**
 * Delfin Integration Tests
 * 
 * Tests to verify Delfin property integration with existing components
 * Requirements: 4.1, 4.2, 4.3, 4.4, 3.1, 3.2, 3.3, 1.4, 2.4
 */

import { houseDataList, houseDataEngList, homesSnippet, delfinImageDescriptions, delfinImageDescriptionsES } from '../constants';

describe('Delfin Integration Tests', () => {
  
  test('should include Delfin in homesSnippet for home page display', () => {
    // Requirement 3.1, 3.2, 3.3: Delfin should appear in home page widgets
    const delfinInSnippet = homesSnippet.find(home => home.name === 'Delfin');
    
    expect(delfinInSnippet).toBeDefined();
    expect(delfinInSnippet?.name).toBe('Delfin');
    expect(delfinInSnippet?.mainImage).toBeDefined();
    expect(delfinInSnippet?.mainImage).toContain('drive.google.com');
  });

  test('should include Delfin in houseDataList with correct configuration', () => {
    // Requirement 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7: Proper data integration
    const delfinEnglish = houseDataList.find(house => house.houseLangCode === 'Delfin');
    const delfinSpanish = houseDataList.find(house => house.houseLangCode === 'DelfinES');
    
    // English version
    expect(delfinEnglish).toBeDefined();
    expect(delfinEnglish?.name).toBe('Delfin');
    expect(delfinEnglish?.guestNumber).toBe(6);
    expect(delfinEnglish?.houseCode).toBe(10);
    expect(delfinEnglish?.parking).toBe(true);
    
    // Spanish version
    expect(delfinSpanish).toBeDefined();
    expect(delfinSpanish?.name).toBe('Delfín');
    expect(delfinSpanish?.guestNumber).toBe(6);
    expect(delfinSpanish?.houseCode).toBe(10);
    expect(delfinSpanish?.parking).toBe(true);
  });

  test('should have correct amenities excluding pet-friendly', () => {
    // Requirement 5.4: Exclude pet-friendly amenities
    const delfinEnglish = houseDataList.find(house => house.houseLangCode === 'Delfin');
    const delfinSpanish = houseDataList.find(house => house.houseLangCode === 'DelfinES');
    
    // Check English amenities
    expect(delfinEnglish?.amenities).toBeDefined();
    const englishAmenityNames = delfinEnglish?.amenities.map(a => a.name) || [];
    expect(englishAmenityNames).toContain('Private Equipped Bathroom');
    expect(englishAmenityNames).toContain('Private Equipped Kitchen');
    expect(englishAmenityNames).toContain('A/C');
    expect(englishAmenityNames).toContain('Private Fenced Parking');
    expect(englishAmenityNames).toContain('100Mbps WiFi');
    expect(englishAmenityNames).not.toContain('Pet Friendly');
    
    // Check Spanish amenities
    expect(delfinSpanish?.amenities).toBeDefined();
    const spanishAmenityNames = delfinSpanish?.amenities.map(a => a.name) || [];
    expect(spanishAmenityNames).toContain('Baño Privado Equipado');
    expect(spanishAmenityNames).toContain('Cocina Privada Equipada');
    expect(spanishAmenityNames).toContain('A/C');
    expect(spanishAmenityNames).toContain('Parqueo Privado Encerrado');
    expect(spanishAmenityNames).toContain('100Mbps WiFi');
    expect(spanishAmenityNames).not.toContain('Pet Friendly');
  });

  test('should have correct Smoobu houseCode configuration', () => {
    // Requirement: Smoobu component should work with houseCode 10
    const delfinEnglish = houseDataList.find(house => house.houseLangCode === 'Delfin');
    const delfinSpanish = houseDataList.find(house => house.houseLangCode === 'DelfinES');
    
    expect(delfinEnglish?.houseCode).toBe(10);
    expect(delfinSpanish?.houseCode).toBe(10);
  });

  test('should have image descriptions arrays for modal functionality', () => {
    // Requirement: Image modal functionality should work with copied Rana images
    expect(delfinImageDescriptions).toBeDefined();
    expect(delfinImageDescriptionsES).toBeDefined();
    
    expect(Array.isArray(delfinImageDescriptions)).toBe(true);
    expect(Array.isArray(delfinImageDescriptionsES)).toBe(true);
    
    expect(delfinImageDescriptions.length).toBeGreaterThan(0);
    expect(delfinImageDescriptionsES.length).toBeGreaterThan(0);
    
    // Check structure of image descriptions
    delfinImageDescriptions.forEach(desc => {
      expect(desc).toHaveProperty('roomType');
      expect(desc).toHaveProperty('roomDescription');
      expect(desc).toHaveProperty('imageLink');
      expect(desc.imageLink).toContain('drive.google.com');
    });
    
    delfinImageDescriptionsES.forEach(desc => {
      expect(desc).toHaveProperty('roomType');
      expect(desc).toHaveProperty('roomDescription');
      expect(desc).toHaveProperty('imageLink');
      expect(desc.imageLink).toContain('drive.google.com');
    });
  });

  test('should be available for OtherListings component filtering', () => {
    // Requirement 4.1, 4.2, 4.3, 4.4: Delfin should appear in other listings
    const allHouses = houseDataList;
    const delfinHouses = allHouses.filter(house => 
      house.houseLangCode === 'Delfin' || house.houseLangCode === 'DelfinES'
    );
    
    expect(delfinHouses.length).toBe(2); // English and Spanish versions
    
    // Verify it can be filtered out when viewing Delfin page itself
    const otherHousesWhenViewingDelfin = allHouses.filter(house => house.name !== 'Delfin');
    expect(otherHousesWhenViewingDelfin.length).toBe(allHouses.length - 1);
  });

  test('should have proper description content', () => {
    // Requirement 7.1, 7.2, 7.3, 7.4, 7.5: Proper description content
    const delfinEnglish = houseDataList.find(house => house.houseLangCode === 'Delfin');
    const delfinSpanish = houseDataList.find(house => house.houseLangCode === 'DelfinES');
    
    // English description checks
    expect(delfinEnglish?.description).toContain('6 guests');
    expect(delfinEnglish?.description).toContain('2 A/C units');
    expect(delfinEnglish?.description).toContain('private parking');
    expect(delfinEnglish?.description).toContain('lockbox key drop-off');
    
    // Spanish description checks
    expect(delfinSpanish?.description).toContain('6 huéspedes');
    expect(delfinSpanish?.description).toContain('2 unidades de aire acondicionado');
    expect(delfinSpanish?.description).toContain('estacionamiento privado');
    expect(delfinSpanish?.description).toContain('caja de seguridad');
  });

  test('should be included in houseDataEngList for home page display', () => {
    // Requirement 3.1, 3.2, 3.3: Home page integration
    const delfinInEngList = houseDataEngList.find(house => house.name === 'Delfin');
    
    expect(delfinInEngList).toBeDefined();
    expect(delfinInEngList?.guestNumber).toBe(6);
    expect(delfinInEngList?.houseLangCode).toBe('Delfin');
  });
});