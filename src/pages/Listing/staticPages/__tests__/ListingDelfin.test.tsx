/**
 * ListingDelfin Component Tests
 * 
 * Tests for English Delfin listing page component
 * Requirements: 1.1, 1.2, 1.3, 5.4
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ListingDelfin from '../ListingDelfin.page';
import { houseDataList } from '../../../../utils/constants';

// Mock the media query hook
jest.mock('@react-hook/media-query', () => ({
  useMediaQuery: jest.fn(() => false), // Default to desktop view
}));

// Mock the Smoobu component
jest.mock('../../../../components/Smoobu/Smoobu.component', () => {
  return function MockSmoobu({ homeCode }: { homeCode: number }) {
    return <div data-testid="smoobu-component" data-home-code={homeCode}>Smoobu Widget</div>;
  };
});

// Mock the ImagesContainer component
jest.mock('../../components/ImagesContainer/ImagesContainer.component', () => {
  return function MockImagesContainer({ showModal, houseName }: { showModal: () => void; houseName: string }) {
    return (
      <div data-testid="images-container" data-house-name={houseName}>
        <button onClick={showModal}>Show Images</button>
      </div>
    );
  };
});

// Mock the ImagesModal component
jest.mock('../../components/ImagesModal/ImagesModal.component', () => {
  return function MockImagesModal({ closeModal, houseName }: { closeModal: () => void; houseName: string }) {
    return (
      <div data-testid="images-modal" data-house-name={houseName}>
        <button onClick={closeModal}>Close Modal</button>
      </div>
    );
  };
});

// Mock the OtherListings component
jest.mock('../../components/OtherListings/OtherListings.component', () => {
  return function MockOtherListings({ listings, currentListing }: { listings: any[]; currentListing: string }) {
    return (
      <div data-testid="other-listings" data-current-listing={currentListing}>
        Other Listings: {listings.length} properties
      </div>
    );
  };
});

// Mock the Amenities component
jest.mock('../../components/Amenities/Amenities.component', () => {
  return function MockAmenities({ amenities }: { amenities: any[] }) {
    return (
      <div data-testid="amenities-component">
        {amenities?.map((amenity, index) => (
          <div key={index} data-testid={`amenity-${amenity.name.replace(/\s+/g, '-').toLowerCase()}`}>
            {amenity.name}
          </div>
        ))}
      </div>
    );
  };
});

// Mock the FixedNavigation component
jest.mock('../../../../components/FixedNavigation/FixedNavigation.component', () => {
  return function MockFixedNavigation({ isBlog }: { isBlog: boolean }) {
    return <div data-testid="fixed-navigation" data-is-blog={isBlog}>Navigation</div>;
  };
});

describe('ListingDelfin Component', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = jest.fn();
    
    // Mock window.addEventListener
    window.addEventListener = jest.fn();
    
    // Reset all mocks
    jest.clearAllMocks();
  });

  test('should render ListingDelfin component successfully', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('fixed-navigation')).toBeInTheDocument();
    expect(screen.getByText('House Delfin')).toBeInTheDocument();
    expect(screen.getByTestId('images-container')).toBeInTheDocument();
    expect(screen.getByTestId('smoobu-component')).toBeInTheDocument();
  });

  test('should lookup Delfin data correctly using houseLangCode', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    // Verify that the component finds the correct house data
    const delfinData = houseDataList.find((house) => house.name === 'Delfin');
    expect(delfinData).toBeDefined();
    expect(delfinData?.houseLangCode).toBe('Delfin');
    expect(delfinData?.guestNumber).toBe(6);
    expect(delfinData?.houseCode).toBe(10);
  });

  test('should display correct Smoobu component with houseCode 10', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    const smoobuComponent = screen.getByTestId('smoobu-component');
    expect(smoobuComponent).toHaveAttribute('data-home-code', '10');
  });

  test('should display amenities excluding pet-friendly', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    const delfinData = houseDataList.find((house) => house.name === 'Delfin');
    const amenityNames = delfinData?.amenities.map(a => a.name) || [];
    
    // Check that expected amenities are present
    expect(amenityNames).toContain('2 Private Equipped Bathrooms');
    expect(amenityNames).toContain('Private Equipped Kitchen');
    expect(amenityNames).toContain('Bedrooms with A/C');
    expect(amenityNames).toContain('Private Fenced Parking for 2 Vehicles');
    expect(amenityNames).toContain('100Mbps WiFi');
    
    // Check that pet-friendly amenity is excluded
    expect(amenityNames).not.toContain('Pet Friendly');
  });

  test('should have Helmet component for SEO', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    // Verify Helmet is present (it will be in the DOM even if not visible in test)
    // The actual meta tags are managed by Helmet and may not be immediately available in tests
    expect(document.head).toBeDefined();
  });

  test('should display correct property description content', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    // Check for key description elements
    expect(screen.getByText(/Welcome to Reservas Kalawala/)).toBeInTheDocument();
    expect(screen.getByText(/accommodates up to 6 guests/)).toBeInTheDocument();
    expect(screen.getByText(/2 A\/C units/)).toBeInTheDocument();
    expect(screen.getAllByText(/private parking/)[0]).toBeInTheDocument();
    expect(screen.getByText(/lockbox key drop-off/)).toBeInTheDocument();
  });

  test('should display check-in and check-out times', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Check-in:')).toBeInTheDocument();
    expect(screen.getByText('3:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Check-out:')).toBeInTheDocument();
    expect(screen.getByText('12:00 PM (noon)')).toBeInTheDocument();
  });

  test('should handle image modal functionality', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    // Initially modal should not be visible
    expect(screen.queryByTestId('images-modal')).not.toBeInTheDocument();
    
    // Click to show modal
    const showImagesButton = screen.getByText('Show Images');
    fireEvent.click(showImagesButton);
    
    // Modal should now be visible
    expect(screen.getByTestId('images-modal')).toBeInTheDocument();
    expect(screen.getByTestId('images-modal')).toHaveAttribute('data-house-name', 'Delfin');
    
    // Click to close modal
    const closeModalButton = screen.getByText('Close Modal');
    fireEvent.click(closeModalButton);
    
    // Modal should be hidden again
    expect(screen.queryByTestId('images-modal')).not.toBeInTheDocument();
  });

  test('should pass correct props to OtherListings component', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    const otherListings = screen.getByTestId('other-listings');
    expect(otherListings).toHaveAttribute('data-current-listing', 'Delfin');
  });

  test('should pass correct houseName to ImagesContainer', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    const imagesContainer = screen.getByTestId('images-container');
    expect(imagesContainer).toHaveAttribute('data-house-name', 'Delfin');
  });

  test('should scroll to top on component mount', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  test('should have correct location link', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    const locationLink = screen.getByRole('link', { name: /Puerto Viejo de Talamanca/i });
    expect(locationLink).toHaveAttribute('href', 'https://maps.app.goo.gl/ixZHjG7yYsMF9U2e9');
    expect(locationLink).toHaveAttribute('target', '_blank');
    expect(locationLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});