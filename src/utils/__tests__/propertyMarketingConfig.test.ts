/**
 * Property Marketing Configuration Tests
 * 
 * Property-based tests for PROPERTY_MARKETING_CONFIG
 * Requirements: 7.1, 7.2
 */

import { PROPERTY_MARKETING_CONFIG } from '../constants';
import { PropertyMarketingContent } from '../types';

describe('Property Marketing Configuration', () => {
  // Get all property keys from the configuration
  const propertyKeys = Object.keys(PROPERTY_MARKETING_CONFIG);
  // `price` is an optional static fallback. Lirio deliberately has none (its
  // rates come only from Smoobu); every other property still carries one.
  const UNPRICED_KEYS = ['Lirio'];
  const pricedKeys = propertyKeys.filter((key) => !UNPRICED_KEYS.includes(key));

  test.each(pricedKeys)('static fallback price is well-formed for %s', (propertyKey) => {
    const price = PROPERTY_MARKETING_CONFIG[propertyKey].price;
    expect(price).toEqual({ crc: expect.any(Number), usd: expect.any(Number) });
    expect(price!.crc).toBeGreaterThan(0);
    expect(price!.usd).toBeGreaterThan(0);
  });

  test.each(UNPRICED_KEYS)('%s has no static fallback price', (propertyKey) => {
    expect(PROPERTY_MARKETING_CONFIG[propertyKey]).toBeDefined();
    expect(PROPERTY_MARKETING_CONFIG[propertyKey].price).toBeUndefined();
  });
  
  /**
   * Property 4: Property Content Configuration Mapping
   * For any property name, the displayed marketing content (price, social statement, features) 
   * SHALL exactly match the values defined in PROPERTY_MARKETING_CONFIG for that property.
   * 
   * Feature: delfines-listing, Property 4: Property Content Configuration Mapping
   * Validates: Requirements 7.1, 7.2
   */
  test.each(propertyKeys)('Property 4: Content configuration mapping for %s', (propertyKey) => {
    const config = PROPERTY_MARKETING_CONFIG[propertyKey];
    
    // Verify the configuration exists
    expect(config).toBeDefined();
    expect(config).not.toBeNull();
    
    // Verify the property key matches
    expect(config.propertyKey).toBe(propertyKey);
    
    // Verify descriptive title structure
    expect(config.descriptiveTitle).toBeDefined();
    expect(config.descriptiveTitle.en).toBeDefined();
    expect(config.descriptiveTitle.es).toBeDefined();
    expect(typeof config.descriptiveTitle.en).toBe('string');
    expect(typeof config.descriptiveTitle.es).toBe('string');
    expect(config.descriptiveTitle.en.length).toBeGreaterThan(0);
    expect(config.descriptiveTitle.es!.length).toBeGreaterThan(0);
    
    // Price structure is checked separately (pricedKeys / UNPRICED_KEYS above).
    
    // Verify social statement structure
    expect(config.socialStatement).toBeDefined();
    expect(config.socialStatement.en).toBeDefined();
    expect(config.socialStatement.es).toBeDefined();
    expect(typeof config.socialStatement.en).toBe('string');
    expect(typeof config.socialStatement.es).toBe('string');
    expect(config.socialStatement.en.length).toBeGreaterThan(0);
    expect(config.socialStatement.es!.length).toBeGreaterThan(0);
    
    // Verify feature highlights structure
    expect(config.featureHighlights).toBeDefined();
    expect(config.featureHighlights.en).toBeDefined();
    expect(config.featureHighlights.es).toBeDefined();
    expect(Array.isArray(config.featureHighlights.en)).toBe(true);
    expect(Array.isArray(config.featureHighlights.es)).toBe(true);
    expect(config.featureHighlights.en.length).toBeGreaterThan(0);
    expect(config.featureHighlights.es!.length).toBeGreaterThan(0);
    
    // Verify each feature highlight contains an emoji
    config.featureHighlights.en.forEach((feature, index) => {
      expect(typeof feature).toBe('string');
      expect(feature.length).toBeGreaterThan(0);
      // Check that feature contains at least one emoji (basic check for non-ASCII characters)
      expect(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(feature)).toBe(true);
    });
    
    config.featureHighlights.es!.forEach((feature, index) => {
      expect(typeof feature).toBe('string');
      expect(feature.length).toBeGreaterThan(0);
      // Check that feature contains at least one emoji (basic check for non-ASCII characters)
      expect(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(feature)).toBe(true);
    });
  });

  test('All expected properties have configuration entries', () => {
    // Based on the requirements, these are the expected properties
    const expectedProperties = [
      'Rana', 'Geco', 'Tucano', 'Pappagallo', 
      'VillaMar', 'VillaCoral', 'Areka', 'Plumeria', 
      'Giulia', 'Delfin', 'Lirio'
    ];
    
    expectedProperties.forEach(propertyKey => {
      expect(PROPERTY_MARKETING_CONFIG).toHaveProperty(propertyKey);
      expect(PROPERTY_MARKETING_CONFIG[propertyKey]).toBeDefined();
    });
  });

  test('Configuration follows PropertyMarketingContent interface', () => {
    propertyKeys.forEach(propertyKey => {
      const config = PROPERTY_MARKETING_CONFIG[propertyKey];
      
      // Verify it matches the PropertyMarketingContent interface structure
      expect(config).toMatchObject({
        propertyKey: expect.any(String),
        descriptiveTitle: {
          en: expect.any(String),
          es: expect.any(String)
        },
        socialStatement: {
          en: expect.any(String),
          es: expect.any(String)
        },
        featureHighlights: {
          en: expect.any(Array),
          es: expect.any(Array)
        }
      });
    });
  });

  test('Price values are reasonable and consistent', () => {
    pricedKeys.forEach(propertyKey => {
      const price = PROPERTY_MARKETING_CONFIG[propertyKey].price!;
      
      // Verify prices are within reasonable ranges
      expect(price.crc).toBeGreaterThan(30000); // Minimum reasonable price in CRC
      expect(price.crc).toBeLessThan(200000); // Maximum reasonable price in CRC
      expect(price.usd).toBeGreaterThan(50); // Minimum reasonable price in USD
      expect(price.usd).toBeLessThan(400); // Maximum reasonable price in USD
      
      // Verify USD/CRC ratio is approximately correct (around 500-600 CRC per USD)
      const ratio = price.crc / price.usd;
      expect(ratio).toBeGreaterThan(400); // Minimum reasonable exchange rate
      expect(ratio).toBeLessThan(700); // Maximum reasonable exchange rate
    });
  });
});