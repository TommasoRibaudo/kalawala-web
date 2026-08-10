/**
 * StayRecommendation Component Tests
 * 
 * Tests for the StayRecommendation component rendering and functionality
 * Requirements: 1.1, 1.2, 1.3, 1.4
 */

import { render, screen } from '@testing-library/react';
import StayRecommendation from '../StayRecommendation.component';
import { puertoViejoBlogRecommendations } from '../../../utils/constants';

describe('StayRecommendation Component', () => {
  const mockProps = {
    title: 'Where to stay if you only have 2 days in Puerto Viejo?',
    properties: puertoViejoBlogRecommendations('en')
  };

  test('renders the component with title and properties', () => {
    render(<StayRecommendation {...mockProps} />);

    // Check if title is rendered
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();

    // Check if all properties are rendered
    expect(screen.getByText('Casa Geco')).toBeInTheDocument();
    expect(screen.getByText('Casa Plumeria')).toBeInTheDocument();
    expect(screen.getByText('Villa Coral')).toBeInTheDocument();

    // Check if reasons are rendered
    expect(screen.getByText('Ideal for getting around on foot')).toBeInTheDocument();
    expect(screen.getByText('Perfect for relaxing near the beach')).toBeInTheDocument();
    expect(screen.getByText('Great for a short getaway with a private pool')).toBeInTheDocument();
  });

  test('renders property links correctly', () => {
    render(<StayRecommendation {...mockProps} />);
    
    // Check if links are rendered with correct href attributes
    const gecoLink = screen.getByRole('link', { name: /Casa Geco/i });
    const plumeriaLink = screen.getByRole('link', { name: /Plumeria/i });
    const villaCoralLink = screen.getByRole('link', { name: /Villa Coral/i });
    
    expect(gecoLink).toHaveAttribute('href', '/en/geco');
    expect(plumeriaLink).toHaveAttribute('href', '/en/plumeria');
    expect(villaCoralLink).toHaveAttribute('href', '/en/villacoral');
    
    // Check if links open in new tab
    expect(gecoLink).toHaveAttribute('target', '_blank');
    expect(plumeriaLink).toHaveAttribute('target', '_blank');
    expect(villaCoralLink).toHaveAttribute('target', '_blank');
  });

  test('renders with custom properties', () => {
    const customProps = {
      title: 'Custom Title',
      properties: [
        {
          name: 'Test Property',
          reason: 'Test reason',
          link: '/test'
        }
      ]
    };

    render(<StayRecommendation {...customProps} />);
    
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
    expect(screen.getByText('Test Property')).toBeInTheDocument();
    expect(screen.getByText('Test reason')).toBeInTheDocument();
    
    const testLink = screen.getByRole('link', { name: /Test Property/i });
    expect(testLink).toHaveAttribute('href', '/test');
  });
});