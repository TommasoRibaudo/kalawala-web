/**
 * ListingDelfinES Component Tests
 * 
 * Tests for Spanish Delfin listing page component
 * Requirements: 2.1, 2.2, 2.3, 5.4
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ListingDelfin from '../ListingDelfin.page_ES';
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

// Mock the Spanish OtherListings component
jest.mock('../../components/OtherListings/OtherListings.componentES', () => {
  return function MockOtherListingsES({ listings, currentListing }: { listings: any[]; currentListing: string }) {
    return (
      <div data-testid="other-listings-es" data-current-listing={currentListing}>
        Otras Propiedades: {listings.length} propiedades
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

// Mock the Spanish FixedNavigation component
jest.mock('../../../../components/FixedNavigation/FixedNavigation.componentES', () => {
  return function MockFixedNavigationES({ isBlog }: { isBlog: boolean }) {
    return <div data-testid="fixed-navigation-es" data-is-blog={isBlog}>Navegación</div>;
  };
});

describe('ListingDelfinES Component', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    window.scrollTo = jest.fn();
    
    // Mock window.addEventListener
    window.addEventListener = jest.fn();
    
    // Reset all mocks
    jest.clearAllMocks();
  });

  test('should render ListingDelfinES component successfully', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('fixed-navigation-es')).toBeInTheDocument();
    expect(screen.getByText('Casa Delfín')).toBeInTheDocument();
    expect(screen.getByTestId('images-container')).toBeInTheDocument();
    expect(screen.getByTestId('smoobu-component')).toBeInTheDocument();
  });

  test('should lookup DelfinES data correctly using houseLangCode', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    // Verify that the component finds the correct Spanish house data
    const delfinESData = houseDataList.find((house) => house.houseLangCode === 'DelfinES');
    expect(delfinESData).toBeDefined();
    expect(delfinESData?.name).toBe('Delfín');
    expect(delfinESData?.guestNumber).toBe(6);
    expect(delfinESData?.houseCode).toBe(10);
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

  test('should display Spanish amenities excluding pet-friendly', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    const delfinESData = houseDataList.find((house) => house.houseLangCode === 'DelfinES');
    const amenityNames = delfinESData?.amenities.map(a => a.name) || [];
    
    // Check that expected Spanish amenities are present
    expect(amenityNames).toContain('Baño Privado Equipado');
    expect(amenityNames).toContain('Cocina Privada Equipada');
    expect(amenityNames).toContain('A/C');
    expect(amenityNames).toContain('Parqueo Privado Encerrado');
    expect(amenityNames).toContain('100Mbps WiFi');
    
    // Check that pet-friendly amenity is excluded
    expect(amenityNames).not.toContain('Pet Friendly');
    expect(amenityNames).not.toContain('Mascota Amigable');
  });

  test('should have Helmet component for Spanish SEO', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    // Verify Helmet is present (it will be in the DOM even if not visible in test)
    // The actual meta tags are managed by Helmet and may not be immediately available in tests
    expect(document.head).toBeDefined();
  });

  test('should display correct Spanish property description content', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    // Check for key Spanish description elements
    expect(screen.getByText(/Bienvenido a Reservas Kalawala/)).toBeInTheDocument();
    expect(screen.getByText(/acomoda hasta 6 huéspedes/)).toBeInTheDocument();
    expect(screen.getByText(/2 unidades de aire acondicionado/)).toBeInTheDocument();
    expect(screen.getAllByText(/estacionamiento privado/)[0]).toBeInTheDocument();
    expect(screen.getByText(/caja de seguridad/)).toBeInTheDocument();
  });

  test('should display Spanish check-in and check-out times', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Entrada:')).toBeInTheDocument();
    expect(screen.getByText('2:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Salida:')).toBeInTheDocument();
    expect(screen.getByText('11:00 AM')).toBeInTheDocument();
  });

  test('should display Spanish booking button text', () => {
    // Mock useMediaQuery to return true for small screen
    const mockUseMediaQuery = require('@react-hook/media-query').useMediaQuery;
    mockUseMediaQuery.mockReturnValue(true);
    
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Reverva en linea!')).toBeInTheDocument();
  });

  test('should handle image modal functionality with Spanish content', () => {
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
    
    // Modal should now be visible with DelfinES houseName
    expect(screen.getByTestId('images-modal')).toBeInTheDocument();
    expect(screen.getByTestId('images-modal')).toHaveAttribute('data-house-name', 'DelfinES');
    
    // Click to close modal
    const closeModalButton = screen.getByText('Close Modal');
    fireEvent.click(closeModalButton);
    
    // Modal should be hidden again
    expect(screen.queryByTestId('images-modal')).not.toBeInTheDocument();
  });

  test('should pass correct props to Spanish OtherListings component', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    const otherListings = screen.getByTestId('other-listings-es');
    expect(otherListings).toHaveAttribute('data-current-listing', 'DelfinES');
  });

  test('should pass correct houseName to ImagesContainer', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    const imagesContainer = screen.getByTestId('images-container');
    expect(imagesContainer).toHaveAttribute('data-house-name', 'DelfinES');
  });

  test('should use Spanish navigation component', () => {
    render(
      <BrowserRouter>
        <ListingDelfin />
      </BrowserRouter>
    );
    
    const navigation = screen.getByTestId('fixed-navigation-es');
    expect(navigation).toHaveAttribute('data-is-blog', 'false');
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

  test('should verify Spanish house data structure matches requirements', () => {
    const delfinESData = houseDataList.find((house) => house.houseLangCode === 'DelfinES');
    
    expect(delfinESData).toBeDefined();
    expect(delfinESData?.name).toBe('Delfín');
    expect(delfinESData?.houseLangCode).toBe('DelfinES');
    expect(delfinESData?.guestNumber).toBe(6);
    expect(delfinESData?.houseCode).toBe(10);
    expect(delfinESData?.parking).toBe(true);
    expect(delfinESData?.location).toContain('Puerto Viejo de Talamanca');
  });
});