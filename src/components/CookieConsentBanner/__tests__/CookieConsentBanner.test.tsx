/**
 * Cookie Consent Banner Component Tests
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CookieConsentBanner } from '../CookieConsentBanner';
import { CookieConsentService } from '../../../services/CookieConsent.service';

// Mock the CookieConsentService
jest.mock('../../../services/CookieConsent.service');

const mockCookieConsentService = CookieConsentService as jest.Mocked<typeof CookieConsentService>;

describe('CookieConsentBanner', () => {
  const mockOnConsentChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    mockCookieConsentService.shouldShowBanner.mockReturnValue(true);
    mockCookieConsentService.onConsentChange.mockReturnValue(() => {});
    mockCookieConsentService.canTrack.mockReturnValue(false);
  });

  test('should render banner when consent is needed', () => {
    render(<CookieConsentBanner onConsentChange={mockOnConsentChange} />);
    
    expect(screen.getByText('🍪 We use cookies')).toBeInTheDocument();
    expect(screen.getByText(/We use cookies and similar technologies/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /accept all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reject all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /customize/i })).toBeInTheDocument();
  });

  test('should not render banner when consent is not needed', () => {
    mockCookieConsentService.shouldShowBanner.mockReturnValue(false);
    
    render(<CookieConsentBanner onConsentChange={mockOnConsentChange} />);
    
    expect(screen.queryByText('🍪 We use cookies')).not.toBeInTheDocument();
  });

  test('should call acceptAll when Accept All button is clicked', () => {
    render(<CookieConsentBanner onConsentChange={mockOnConsentChange} />);
    
    const acceptButton = screen.getByRole('button', { name: /accept all/i });
    fireEvent.click(acceptButton);
    
    expect(mockCookieConsentService.acceptAll).toHaveBeenCalled();
  });

  test('should call rejectAll when Reject All button is clicked', () => {
    render(<CookieConsentBanner onConsentChange={mockOnConsentChange} />);
    
    const rejectButton = screen.getByRole('button', { name: /reject all/i });
    fireEvent.click(rejectButton);
    
    expect(mockCookieConsentService.rejectAll).toHaveBeenCalled();
  });

  test('should show customization options when Customize button is clicked', () => {
    render(<CookieConsentBanner onConsentChange={mockOnConsentChange} />);
    
    const customizeButton = screen.getByRole('button', { name: /customize/i });
    fireEvent.click(customizeButton);
    
    expect(screen.getByText('Essential Cookies')).toBeInTheDocument();
    expect(screen.getByText('Analytics Cookies')).toBeInTheDocument();
    expect(screen.getByText('Marketing Cookies')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save preferences/i })).toBeInTheDocument();
  });

  test('should handle preference changes in customization', () => {
    render(<CookieConsentBanner onConsentChange={mockOnConsentChange} />);
    
    // Open customization
    const customizeButton = screen.getByRole('button', { name: /customize/i });
    fireEvent.click(customizeButton);
    
    // Find analytics checkbox and uncheck it
    const analyticsCheckbox = screen.getByRole('checkbox', { name: /analytics cookies/i });
    fireEvent.click(analyticsCheckbox);
    
    // Save preferences
    const saveButton = screen.getByRole('button', { name: /save preferences/i });
    fireEvent.click(saveButton);
    
    expect(mockCookieConsentService.saveConsent).toHaveBeenCalledWith({
      analytics: false,
      marketing: true,
      functional: true
    });
  });

  test('should not allow disabling essential cookies', () => {
    render(<CookieConsentBanner onConsentChange={mockOnConsentChange} />);
    
    // Open customization
    const customizeButton = screen.getByRole('button', { name: /customize/i });
    fireEvent.click(customizeButton);
    
    // Essential cookies checkbox should be disabled
    const essentialCheckbox = screen.getByRole('checkbox', { name: /essential cookies/i });
    expect(essentialCheckbox).toBeDisabled();
    expect(essentialCheckbox).toBeChecked();
  });

  test('should hide banner after consent is given', async () => {
    let consentChangeCallback: (state: any) => void = () => {};
    
    mockCookieConsentService.onConsentChange.mockImplementation((callback) => {
      consentChangeCallback = callback;
      return () => {};
    });
    
    render(<CookieConsentBanner onConsentChange={mockOnConsentChange} />);
    
    expect(screen.getByText('🍪 We use cookies')).toBeInTheDocument();
    
    // Simulate consent change
    consentChangeCallback({
      status: 'accepted',
      preferences: { analytics: true, marketing: true, functional: true },
      timestamp: Date.now(),
      version: '1.0'
    });
    
    await waitFor(() => {
      expect(screen.queryByText('🍪 We use cookies')).not.toBeInTheDocument();
    });
  });

  test('should call onConsentChange callback when consent changes', async () => {
    let consentChangeCallback: (state: any) => void = () => {};
    
    mockCookieConsentService.onConsentChange.mockImplementation((callback) => {
      consentChangeCallback = callback;
      return () => {};
    });
    
    mockCookieConsentService.canTrack.mockReturnValue(true);
    
    render(<CookieConsentBanner onConsentChange={mockOnConsentChange} />);
    
    // Simulate consent change
    consentChangeCallback({
      status: 'accepted',
      preferences: { analytics: true, marketing: true, functional: true },
      timestamp: Date.now(),
      version: '1.0'
    });
    
    await waitFor(() => {
      expect(mockOnConsentChange).toHaveBeenCalledWith(true);
    });
  });

  test('should have proper accessibility attributes', () => {
    render(<CookieConsentBanner onConsentChange={mockOnConsentChange} />);
    
    const banner = screen.getByRole('dialog');
    expect(banner).toHaveAttribute('aria-labelledby', 'cookie-banner-title');
    
    const title = screen.getByText('🍪 We use cookies');
    expect(title).toHaveAttribute('id', 'cookie-banner-title');
    
    const customizeButton = screen.getByRole('button', { name: /customize/i });
    expect(customizeButton).toHaveAttribute('aria-expanded', 'false');
    
    // Open customization and check aria-expanded changes
    fireEvent.click(customizeButton);
    expect(customizeButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('should close customization when Cancel button is clicked', () => {
    render(<CookieConsentBanner onConsentChange={mockOnConsentChange} />);
    
    // Open customization
    const customizeButton = screen.getByRole('button', { name: /customize/i });
    fireEvent.click(customizeButton);
    
    expect(screen.getByText('Essential Cookies')).toBeInTheDocument();
    
    // Close customization
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    
    expect(screen.queryByText('Essential Cookies')).not.toBeInTheDocument();
  });

  test('should handle service errors gracefully', () => {
    // Mock console.error to suppress error output during test
    const originalError = console.error;
    console.error = jest.fn();
    
    mockCookieConsentService.shouldShowBanner.mockImplementation(() => {
      throw new Error('Service error');
    });
    
    // Should render without crashing, but banner won't show due to error
    render(<CookieConsentBanner onConsentChange={mockOnConsentChange} />);
    
    // Banner should not be visible due to error
    expect(screen.queryByText('🍪 We use cookies')).not.toBeInTheDocument();
    
    // Restore console.error
    console.error = originalError;
  });
});