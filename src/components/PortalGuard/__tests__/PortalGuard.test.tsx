/**
 * PortalGuard keeps the reservation detail page behind a portal session and,
 * when there isn't one, sends the guest to login with their reservation id
 * pre-filled — so a bookmarked or emailed link still lands somewhere useful.
 */

import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import PortalGuard from '../PortalGuard.component';
import { clearPortalSession, persistPortalSession } from '../../../services/PortalSession.service';

function LocationProbe() {
  const location = useLocation();
  return <div data-testid="location">{`${location.pathname}${location.search}`}</div>;
}

function renderGuard(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/portal/:reservationPublicId"
          element={
            <PortalGuard>
              <div>Reservation details</div>
            </PortalGuard>
          }
        />
        <Route
          path="/portalES/:reservationPublicId"
          element={
            <PortalGuard>
              <div>Detalles de la reserva</div>
            </PortalGuard>
          }
        />
        <Route path="/portal" element={<LocationProbe />} />
        <Route path="/portalES" element={<LocationProbe />} />
      </Routes>
    </MemoryRouter>
  );
}

afterEach(() => {
  clearPortalSession();
  window.sessionStorage.clear();
});

test('renders the reservation when a portal session exists', () => {
  persistPortalSession('token-abc', 'KWL-ABCD1234');

  renderGuard('/portal/KWL-ABCD1234');

  expect(screen.getByText('Reservation details')).toBeInTheDocument();
});

test('redirects to login with the reservation id when there is no session', () => {
  renderGuard('/portal/KWL-ABCD1234');

  expect(screen.queryByText('Reservation details')).not.toBeInTheDocument();
  // The id is carried across so the login form can pre-fill it.
  expect(screen.getByTestId('location')).toHaveTextContent('/portal?reservationId=KWL-ABCD1234');
});

test('redirects to the Spanish login for Spanish portal URLs', () => {
  renderGuard('/portalES/KWL-ABCD1234');

  expect(screen.getByTestId('location')).toHaveTextContent('/portalES?reservationId=KWL-ABCD1234');
});

test('encodes the reservation id in the redirect', () => {
  renderGuard('/portal/KWL%20ABCD%261234');

  expect(screen.getByTestId('location')).toHaveTextContent('reservationId=KWL%20ABCD%261234');
});
