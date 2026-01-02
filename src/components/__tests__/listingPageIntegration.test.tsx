/**
 * Listing Page Integration Tests
 * 
 * Integration tests for responsive behavior and layout changes
 * Requirements: 6.1, 6.2
 */

import { render, screen } from '@testing-library/react';
import ListingMarketingSection from '../ListingMarketingSection/ListingMarketingSection.component';
import SocialStatement from '../SocialStatement/SocialStatement.component';
import FeatureHighlights from '../FeatureHighlights/FeatureHighlights.component';
import InstantConfirmationBadge from '../InstantConfirmationBadge/InstantConfirmationBadge.component';
import PriceConfirmationSection from '../PriceConfirmationSection/PriceConfirmationSection.component';

// Mock window.matchMedia for responsive tests
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe('Listing Page Integration Tests', () => {
  beforeEach(() => {
    // Reset matchMedia mock before each test
    mockMatchMedia(false);
  });

  describe('Component Rendering Integration', () => {
    test('ListingMarketingSection renders descriptive title only', () => {
      render(<ListingMarketingSection propertyKey="Rana" isSpanish={false} />);
      
      // Should contain descriptive title only (price and confirmation moved to separate component)
      expect(screen.getByText('Family home, pet friendly with air conditioning')).toBeInTheDocument();
      
      // Should NOT contain price or confirmation (moved to PriceConfirmationSection)
      expect(screen.queryByText(/Average price/)).not.toBeInTheDocument();
      expect(screen.queryByText('Instant confirmation')).not.toBeInTheDocument();
    });

    test('PriceConfirmationSection renders price and confirmation badge', () => {
      render(<PriceConfirmationSection propertyKey="Rana" isSpanish={false} />);
      
      // Should contain price display (note: USD prices include $ symbol)
      expect(screen.getByText(/Average price: \$150 per night/)).toBeInTheDocument();
      
      // Should contain instant confirmation badge (text is split across elements)
      expect(screen.getByText('✔')).toBeInTheDocument();
      expect(screen.getByText('Instant confirmation')).toBeInTheDocument();
    });

    test('ListingMarketingSection renders Spanish descriptive title only', () => {
      render(<ListingMarketingSection propertyKey="Rana" isSpanish={true} />);
      
      // Should contain Spanish descriptive title only
      expect(screen.getByText('Casa familiar, pet friendly con aire acondicionado')).toBeInTheDocument();
      
      // Should NOT contain price or confirmation (moved to PriceConfirmationSection)
      expect(screen.queryByText(/Precio promedio/)).not.toBeInTheDocument();
      expect(screen.queryByText('Confirmación inmediata')).not.toBeInTheDocument();
    });

    test('PriceConfirmationSection renders Spanish price and confirmation badge', () => {
      render(<PriceConfirmationSection propertyKey="Rana" isSpanish={true} />);
      
      // Should contain Spanish price display with CRC (note: space formatting)
      expect(screen.getByText(/Precio promedio: 75 000 CRC la noche/)).toBeInTheDocument();
      
      // Should contain Spanish instant confirmation badge (text is split across elements)
      expect(screen.getByText('✔')).toBeInTheDocument();
      expect(screen.getByText('Confirmación inmediata')).toBeInTheDocument();
    });

    test('SocialStatement renders property-specific content', () => {
      render(<SocialStatement propertyKey="VillaMar" isSpanish={false} />);
      
      expect(screen.getByText('Chosen for its private pool perfect for romantic getaways')).toBeInTheDocument();
    });

    test('FeatureHighlights renders with emoji icons', () => {
      render(<FeatureHighlights propertyKey="Tucano" propertyName="Casa Tucano" isSpanish={false} />);
      
      expect(screen.getByText('Why guests choose Casa Tucano')).toBeInTheDocument();
      
      // Check for features with emojis
      expect(screen.getByText(/📍 Central location above Italian bakery/)).toBeInTheDocument();
      expect(screen.getByText(/🏡 Cozy apartment for up to 5 people/)).toBeInTheDocument();
      expect(screen.getByText(/❄️ A\/C in bedrooms/)).toBeInTheDocument();
    });

    test('InstantConfirmationBadge renders with correct styling', () => {
      render(<InstantConfirmationBadge isSpanish={false} />);
      
      const badge = screen.getByText('✔');
      expect(badge).toBeInTheDocument();
      expect(screen.getByText('Instant confirmation')).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior Tests', () => {
    test('Components render correctly on mobile viewport', () => {
      // Mock mobile viewport
      mockMatchMedia(true); // Simulate mobile media query match
      
      render(<ListingMarketingSection propertyKey="Delfin" isSpanish={false} />);
      
      // Components should still render descriptive title on mobile
      expect(screen.getByText('Spacious house perfect for large families')).toBeInTheDocument();
      
      // Price and confirmation should be tested separately in PriceConfirmationSection
      render(<PriceConfirmationSection propertyKey="Delfin" isSpanish={false} />);
      expect(screen.getByText(/Average price: \$180 per night/)).toBeInTheDocument();
      expect(screen.getByText('✔')).toBeInTheDocument();
      expect(screen.getByText('Instant confirmation')).toBeInTheDocument();
    });

    test('Components render correctly on desktop viewport', () => {
      // Mock desktop viewport
      mockMatchMedia(false); // Simulate desktop media query (no match for mobile)
      
      render(<FeatureHighlights propertyKey="VillaCoral" propertyName="Villa Coral" isSpanish={true} />);
      
      // Components should render all content on desktop
      expect(screen.getByText('¿Por qué los huéspedes eligen Villa Coral?')).toBeInTheDocument();
      expect(screen.getByText(/🏊 Piscina privada exclusiva para huéspedes/)).toBeInTheDocument();
    });

    test('Layout maintains proper structure across different screen sizes', () => {
      render(
        <div>
          <ListingMarketingSection propertyKey="Areka" isSpanish={false} />
          <PriceConfirmationSection propertyKey="Areka" isSpanish={false} />
          <SocialStatement propertyKey="Areka" isSpanish={false} />
          <FeatureHighlights propertyKey="Areka" propertyName="Casa Areka" isSpanish={false} />
        </div>
      );
      
      // Verify all components are present
      expect(screen.getByText('Cozy retreat perfect for couples exploring Punta Uva')).toBeInTheDocument();
      expect(screen.getByText(/Average price: \$94 per night/)).toBeInTheDocument();
      expect(screen.getByText('Chosen for its peaceful location and proximity to Punta Uva beach')).toBeInTheDocument();
      expect(screen.getByText('Why guests choose Casa Areka')).toBeInTheDocument();
      
      // Test mobile layout
      mockMatchMedia(true);
      
      // Components should still be present and functional on mobile
      expect(screen.getByText('Cozy retreat perfect for couples exploring Punta Uva')).toBeInTheDocument();
      expect(screen.getByText(/Average price: \$94 per night/)).toBeInTheDocument();
      expect(screen.getByText('Chosen for its peaceful location and proximity to Punta Uva beach')).toBeInTheDocument();
      expect(screen.getByText('Why guests choose Casa Areka')).toBeInTheDocument();
    });
  });

  describe('Error Handling Integration', () => {
    test('Components handle missing configuration gracefully', () => {
      // Test with non-existent property key
      render(<ListingMarketingSection propertyKey="NonExistentProperty" isSpanish={false} />);
      
      // Component should not crash and should render nothing
      expect(screen.queryByText(/Average price/)).not.toBeInTheDocument();
    });

    test('PriceConfirmationSection handles missing configuration gracefully', () => {
      // Test with non-existent property key
      render(<PriceConfirmationSection propertyKey="NonExistentProperty" isSpanish={false} />);
      
      // Component should not crash and should render nothing
      expect(screen.queryByText(/Average price/)).not.toBeInTheDocument();
    });

    test('Components handle invalid property keys gracefully', () => {
      render(<SocialStatement propertyKey="" isSpanish={false} />);
      
      // Component should not crash
      expect(document.body).toBeInTheDocument();
    });

    test('FeatureHighlights handles missing property name gracefully', () => {
      render(<FeatureHighlights propertyKey="Giulia" propertyName="" isSpanish={false} />);
      
      // Should still render the section, even with empty property name
      expect(screen.getByText(/Why guests choose/)).toBeInTheDocument();
    });
  });

  describe('Language Consistency Integration', () => {
    test('All components use consistent language when isSpanish=true', () => {
      render(
        <div>
          <ListingMarketingSection propertyKey="Plumeria" isSpanish={true} />
          <PriceConfirmationSection propertyKey="Plumeria" isSpanish={true} />
          <SocialStatement propertyKey="Plumeria" isSpanish={true} />
          <FeatureHighlights propertyKey="Plumeria" propertyName="Casa Plumeria" isSpanish={true} />
          <InstantConfirmationBadge isSpanish={true} />
        </div>
      );
      
      // All text should be in Spanish
      expect(screen.getByText('Refugio acogedor perfecto para parejas explorando Punta Uva')).toBeInTheDocument();
      expect(screen.getByText(/Precio promedio: 47 000 CRC la noche/)).toBeInTheDocument();
      expect(screen.getByText('Elegida por su ubicación tranquila y proximidad a la playa Punta Uva')).toBeInTheDocument();
      expect(screen.getByText('¿Por qué los huéspedes eligen Casa Plumeria?')).toBeInTheDocument();
      expect(screen.getAllByText('✔')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Confirmación inmediata')[0]).toBeInTheDocument();
    });

    test('All components use consistent language when isSpanish=false', () => {
      render(
        <div>
          <ListingMarketingSection propertyKey="Giulia" isSpanish={false} />
          <PriceConfirmationSection propertyKey="Giulia" isSpanish={false} />
          <SocialStatement propertyKey="Giulia" isSpanish={false} />
          <FeatureHighlights propertyKey="Giulia" propertyName="Casa Giulia" isSpanish={false} />
          <InstantConfirmationBadge isSpanish={false} />
        </div>
      );
      
      // All text should be in English
      expect(screen.getByText('Family-friendly house near Punta Uva')).toBeInTheDocument();
      expect(screen.getByText(/Average price: \$159 per night/)).toBeInTheDocument();
      expect(screen.getByText('Chosen for its family-friendly amenities and beach proximity')).toBeInTheDocument();
      expect(screen.getByText('Why guests choose Casa Giulia')).toBeInTheDocument();
      expect(screen.getAllByText('✔')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Instant confirmation')[0]).toBeInTheDocument();
    });
  });
});