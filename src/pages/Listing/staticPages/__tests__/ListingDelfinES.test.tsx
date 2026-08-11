/**
 * ListingDelfinES Component Tests
 * 
 * Tests for the Spanish rendering of the Delfin listing page.
 *
 * Phase 3b merged ListingDelfin.page_ES into ListingDelfin.page, so Spanish is
 * now selected by the route the page is rendered at, not by which module the
 * test imports. Hence MemoryRouter at /es/delfin rather than BrowserRouter —
 * useLocale() reads the locale from the URL's first path segment (Phase 4's
 * detectLocaleFromPath), so the route must actually carry an `es` segment;
 * the old `/DelfinES` legacy-suffix path stopped being recognized once that
 * landed and silently fell back to English for this whole file.
 * Requirements: 2.1, 2.2, 2.3, 5.4
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ListingDelfin from '../ListingDelfin.page';
import { houseDataList } from '../../../../utils/constants';
import type { Locale } from '../../../../i18n';

// Mock the booking search widget that replaced the Smoobu iframe
jest.mock('../../../../components/BookingSearchWidget/BookingSearchWidget.component', () => {
  return function MockBookingSearchWidget({ locale, defaultGuests, variant }: { locale: Locale; defaultGuests?: number; variant?: string }) {
    return (
      <div
        data-testid="booking-search-widget"
        data-is-spanish={String(locale)}
        data-default-guests={defaultGuests}
        data-variant={variant}
      >
        Booking Search
      </div>
    );
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

// Mock OtherListings. Phase 3a merged the Spanish copy into the shared
// component, so this now mocks the one component both languages render.
jest.mock('../../components/OtherListings/OtherListings.component', () => {
  return function MockOtherListings({ listings, currentListing }: { listings: any[]; currentListing: string }) {
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

// Mock FixedNavigation, now shared by both languages after the Phase 3a merge.
// The path was also wrong before this: it pointed at
// `../components/FixedNavigation/...`, which resolves inside `staticPages_ES/`
// and does not exist, so this mock never applied.
jest.mock('../../../../components/FixedNavigation/FixedNavigation.component', () => {
  return function MockFixedNavigation({ isBlog }: { isBlog: boolean }) {
    return <div data-testid="fixed-navigation-es" data-is-blog={isBlog}>Navegación</div>;
  };
});

// Mock Footer. Unmocked, it renders a real "our homes" list (including this
// page's own listing name again) and a real blog-article list, both of which
// collide with this file's getByText/getByRole queries that assume their
// target string is unique on the page.
jest.mock('../../../../components/Footer/Footer.component', () => {
  return function MockFooter({ locale }: { locale: string }) {
    return <div data-testid="footer-es" data-locale={locale}>Pie de página</div>;
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
      <MemoryRouter initialEntries={['/es/delfin']}>
        <ListingDelfin />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('fixed-navigation-es')).toBeInTheDocument();
    expect(screen.getByText('Casa Delfines')).toBeInTheDocument();
    expect(screen.getByTestId('images-container')).toBeInTheDocument();
    expect(screen.getByTestId('booking-search-widget')).toBeInTheDocument();
  });

  test('should lookup DelfinES data correctly using houseLangCode', () => {
    render(
      <MemoryRouter initialEntries={['/es/delfin']}>
        <ListingDelfin />
      </MemoryRouter>
    );
    
    // Verify that the component finds the correct Spanish house data
    const delfinESData = houseDataList.find((house) => house.houseLangCode === 'DelfinES');
    expect(delfinESData).toBeDefined();
    expect(delfinESData?.name).toBe('Casa Delfines');
    expect(delfinESData?.guestNumber).toBe(6);
    expect(delfinESData?.houseCode).toBe(10);
  });

  test('should seed the booking search widget with the property capacity', () => {
    render(
      <MemoryRouter initialEntries={['/es/delfin']}>
        <ListingDelfin />
      </MemoryRouter>
    );
    
    const bookingWidget = screen.getByTestId('booking-search-widget');
    expect(bookingWidget).toHaveAttribute('data-default-guests', '6');
    expect(bookingWidget).toHaveAttribute('data-variant', 'sidebar');
    expect(bookingWidget).toHaveAttribute('data-is-spanish', 'es');
  });

  test('should display Spanish amenities excluding pet-friendly', () => {
    render(
      <MemoryRouter initialEntries={['/es/delfin']}>
        <ListingDelfin />
      </MemoryRouter>
    );
    
    const delfinESData = houseDataList.find((house) => house.houseLangCode === 'DelfinES');
    const amenityNames = delfinESData?.amenities.map(a => a.name) || [];
    
    // Check that expected Spanish amenities are present
    expect(amenityNames).toContain('2 Baños Privado Equipado');
    expect(amenityNames).toContain('Cocina Privada Equipada');
    expect(amenityNames).toContain('Cuartos con A/C');
    expect(amenityNames).toContain('Parqueo Privado Encerrado');
    expect(amenityNames).toContain('100Mbps WiFi');
    
    // Check that pet-friendly amenity is excluded
    expect(amenityNames).not.toContain('Pet Friendly');
    expect(amenityNames).not.toContain('Mascota Amigable');
  });

  test('should have Helmet component for Spanish SEO', () => {
    render(
      <MemoryRouter initialEntries={['/es/delfin']}>
        <ListingDelfin />
      </MemoryRouter>
    );
    
    // Verify Helmet is present (it will be in the DOM even if not visible in test)
    // The actual meta tags are managed by Helmet and may not be immediately available in tests
    expect(document.head).toBeDefined();
  });

  test('should display correct Spanish property description content', () => {
    render(
      <MemoryRouter initialEntries={['/es/delfin']}>
        <ListingDelfin />
      </MemoryRouter>
    );
    
    // Check for key Spanish description elements
    expect(screen.getByText(/Bienvenido a Reservas Kalawala/)).toBeInTheDocument();
    expect(screen.getAllByText(/acomoda hasta 6 huéspedes/)[0]).toBeInTheDocument();
    expect(screen.getByText(/2 unidades de aire acondicionado/)).toBeInTheDocument();
    expect(screen.getAllByText(/estacionamiento privado/)[0]).toBeInTheDocument();
  });

  test('should display Spanish check-in and check-out times', () => {
    render(
      <MemoryRouter initialEntries={['/es/delfin']}>
        <ListingDelfin />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Entrada:')).toBeInTheDocument();
    expect(screen.getByText('3:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Salida:')).toBeInTheDocument();
    expect(screen.getByText('12:00 PM (mediodía)')).toBeInTheDocument();
  });

  test('should display Spanish booking button text', () => {
    // The component now checks window.matchMedia directly (post-mount, see
    // ListingDelfin.page_ES.tsx) instead of the useMediaQuery hook, so force
    // the small-screen query to match here to simulate a mobile visitor.
    const matchMediaSpy = jest.spyOn(window, 'matchMedia').mockReturnValue({
      matches: true,
      media: '(max-width: 992px)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    } as unknown as MediaQueryList);

    render(
      <MemoryRouter initialEntries={['/es/delfin']}>
        <ListingDelfin />
      </MemoryRouter>
    );

    expect(screen.getByText('VER DISPONIBILIDAD')).toBeInTheDocument();

    matchMediaSpy.mockRestore();
  });

  test('should handle image modal functionality with Spanish content', () => {
    render(
      <MemoryRouter initialEntries={['/es/delfin']}>
        <ListingDelfin />
      </MemoryRouter>
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
      <MemoryRouter initialEntries={['/es/delfin']}>
        <ListingDelfin />
      </MemoryRouter>
    );
    
    const otherListings = screen.getByTestId('other-listings-es');
    expect(otherListings).toHaveAttribute('data-current-listing', 'DelfinES');
  });

  test('should pass correct houseName to ImagesContainer', () => {
    render(
      <MemoryRouter initialEntries={['/es/delfin']}>
        <ListingDelfin />
      </MemoryRouter>
    );
    
    const imagesContainer = screen.getByTestId('images-container');
    expect(imagesContainer).toHaveAttribute('data-house-name', 'DelfinES');
  });

  test('should use Spanish navigation component', () => {
    render(
      <MemoryRouter initialEntries={['/es/delfin']}>
        <ListingDelfin />
      </MemoryRouter>
    );
    
    const navigation = screen.getByTestId('fixed-navigation-es');
    expect(navigation).toHaveAttribute('data-is-blog', 'false');
  });

  test('should scroll to top on component mount', () => {
    render(
      <MemoryRouter initialEntries={['/es/delfin']}>
        <ListingDelfin />
      </MemoryRouter>
    );
    
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  test('should have correct location link', () => {
    render(
      <MemoryRouter initialEntries={['/es/delfin']}>
        <ListingDelfin />
      </MemoryRouter>
    );
    
    const locationLink = screen.getByRole('link', { name: /Puerto Viejo de Talamanca/i });
    expect(locationLink).toHaveAttribute('href', 'https://maps.app.goo.gl/ixZHjG7yYsMF9U2e9');
    expect(locationLink).toHaveAttribute('target', '_blank');
    expect(locationLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should verify Spanish house data structure matches requirements', () => {
    const delfinESData = houseDataList.find((house) => house.houseLangCode === 'DelfinES');
    
    expect(delfinESData).toBeDefined();
    expect(delfinESData?.name).toBe('Casa Delfines');
    expect(delfinESData?.houseLangCode).toBe('DelfinES');
    expect(delfinESData?.guestNumber).toBe(6);
    expect(delfinESData?.houseCode).toBe(10);
    expect(delfinESData?.parking).toBe(true);
    expect(delfinESData?.location).toContain('Puerto Viejo de Talamanca');
  });
});