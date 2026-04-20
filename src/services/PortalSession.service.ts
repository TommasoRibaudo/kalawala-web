const tokenKey = 'kalawala_portal_token';
const reservationKey = 'kalawala_portal_reservation_id';

export function readPortalToken(): string | null {
  try {
    return window.sessionStorage.getItem(tokenKey);
  } catch {
    return null;
  }
}

export function persistPortalSession(token: string, reservationPublicId: string): void {
  try {
    window.sessionStorage.setItem(tokenKey, token);
    window.sessionStorage.setItem(reservationKey, reservationPublicId);
  } catch {
    // Non-critical — the detail page handles missing token gracefully.
  }
}

export function clearPortalSession(): void {
  try {
    window.sessionStorage.removeItem(tokenKey);
    window.sessionStorage.removeItem(reservationKey);
  } catch {
    // Non-critical.
  }
}
