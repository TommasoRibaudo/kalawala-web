/**
 * Guest picker capping (#309).
 *
 * On a listing page the picker must not exceed that home's own capacity — you
 * can't book Villa Mar (sleeps 2) for six. The portfolio-wide hero keeps the
 * portfolio max. The calendar is stubbed here so these tests stay about the
 * guest control alone and make no rate request.
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingSearchWidget from './BookingSearchWidget.component';

jest.mock('posthog-js', () => ({ __esModule: true, default: { capture: jest.fn() }, capture: jest.fn() }));
jest.mock('../CalendarWithPriceDots', () => ({
  __esModule: true,
  default: () => null,
}));

function renderWidget(props: Partial<React.ComponentProps<typeof BookingSearchWidget>> = {}) {
  return render(
    <MemoryRouter>
      <BookingSearchWidget locale="en" {...props} />
    </MemoryRouter>
  );
}

describe('BookingSearchWidget guest cap', () => {
  test('a listing caps the picker at its own max occupancy', () => {
    // Villa Mar sleeps 2; defaultGuests comes from the listing's guestNumber.
    renderWidget({ variant: 'sidebar', apartmentSlug: 'VillaMar', defaultGuests: 2 });

    expect(screen.getByText('2')).toBeInTheDocument();
    // Already at the home's max, so the increment is disabled — no way to reach 3.
    expect(screen.getByRole('button', { name: 'Increase guests' })).toBeDisabled();
  });

  test('stepping down then up never exceeds the listing max', () => {
    renderWidget({ variant: 'sidebar', apartmentSlug: 'VillaMar', defaultGuests: 2 });

    fireEvent.click(screen.getByRole('button', { name: 'Decrease guests' }));
    expect(screen.getByText('1')).toBeInTheDocument();

    const increase = screen.getByRole('button', { name: 'Increase guests' });
    fireEvent.click(increase);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(increase).toBeDisabled();
  });

  test('a capped listing points bigger groups at the full-portfolio search', () => {
    renderWidget({ variant: 'sidebar', apartmentSlug: 'VillaMar', defaultGuests: 2 });

    expect(screen.getByText('This home sleeps up to 2.')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Search all our homes for a bigger group.' });
    expect(link).toHaveAttribute('href', expect.stringContaining('book'));
  });

  test('the portfolio hero is not capped to a single home', () => {
    // No apartmentSlug: the picker spans the whole portfolio, so the largest
    // home (> 2 guests) is reachable and the listing-specific hint is absent.
    renderWidget();

    expect(screen.getByRole('button', { name: 'Increase guests' })).toBeEnabled();
    expect(screen.queryByText(/This home sleeps up to/)).not.toBeInTheDocument();
  });
});
