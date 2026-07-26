/**
 * Portal session + credential cache.
 *
 * The "Manage booking" button on the confirmation page and the pre-filled portal
 * login both depend on this, so its behaviour is load-bearing even though it is
 * only browser storage. Untested until now.
 */

import {
  clearAllPortalCredentials,
  clearPortalSession,
  persistPortalSession,
  readLatestPortalCredentials,
  readPortalCredentials,
  readPortalToken,
  removePortalCredentials,
  savePortalCredentials,
} from '../PortalSession.service';

beforeEach(() => {
  window.sessionStorage.clear();
  window.localStorage.clear();
});

// ── session token ────────────────────────────────────────────────────────────

test('persists and reads back a portal session token', () => {
  expect(readPortalToken()).toBeNull();

  persistPortalSession('token-abc', 'KWL-ABCD1234');

  expect(readPortalToken()).toBe('token-abc');
});

test('clearing the session removes the token', () => {
  persistPortalSession('token-abc', 'KWL-ABCD1234');
  clearPortalSession();

  expect(readPortalToken()).toBeNull();
});

test('the session token lives in sessionStorage, not localStorage', () => {
  // It must not survive a browser restart — the credential cache is the durable
  // half, and it stores a password the guest chose rather than a bearer token.
  persistPortalSession('token-abc', 'KWL-ABCD1234');

  expect(window.sessionStorage.getItem('kalawala_portal_token')).toBe('token-abc');
  expect(window.localStorage.getItem('kalawala_portal_token')).toBeNull();
});

// ── credential cache ─────────────────────────────────────────────────────────

test('saves and reads credentials for a specific reservation', () => {
  savePortalCredentials('KWL-AAAA1111', 'first-password');
  savePortalCredentials('KWL-BBBB2222', 'second-password');

  expect(readPortalCredentials('KWL-AAAA1111')).toMatchObject({
    reservationPublicId: 'KWL-AAAA1111',
    password: 'first-password',
  });
  expect(readPortalCredentials('KWL-BBBB2222')?.password).toBe('second-password');
  expect(readPortalCredentials('KWL-NOPE0000')).toBeNull();
});

test('the most recently saved reservation is returned first', () => {
  // The portal login page pre-fills from this when no reservation id is in the URL.
  savePortalCredentials('KWL-AAAA1111', 'first-password');
  savePortalCredentials('KWL-BBBB2222', 'second-password');

  expect(readLatestPortalCredentials()?.reservationPublicId).toBe('KWL-BBBB2222');
});

test('re-saving a reservation updates its password and moves it to the front', () => {
  savePortalCredentials('KWL-AAAA1111', 'first-password');
  savePortalCredentials('KWL-BBBB2222', 'second-password');
  savePortalCredentials('KWL-AAAA1111', 'changed-password');

  expect(readLatestPortalCredentials()?.reservationPublicId).toBe('KWL-AAAA1111');
  expect(readPortalCredentials('KWL-AAAA1111')?.password).toBe('changed-password');
});

test('the cache is capped so it cannot grow without bound', () => {
  for (let i = 0; i < 15; i += 1) {
    savePortalCredentials(`KWL-TEST${String(i).padStart(4, '0')}`, `password-${i}`);
  }

  const stored = JSON.parse(window.localStorage.getItem('kalawala_portal_credentials') ?? '[]');
  expect(stored).toHaveLength(10);
  // The oldest entries are the ones dropped.
  expect(readPortalCredentials('KWL-TEST0000')).toBeNull();
  expect(readPortalCredentials('KWL-TEST0014')?.password).toBe('password-14');
});

test('removing one reservation leaves the others intact', () => {
  savePortalCredentials('KWL-AAAA1111', 'first-password');
  savePortalCredentials('KWL-BBBB2222', 'second-password');

  removePortalCredentials('KWL-AAAA1111');

  expect(readPortalCredentials('KWL-AAAA1111')).toBeNull();
  expect(readPortalCredentials('KWL-BBBB2222')?.password).toBe('second-password');
});

test('clearAllPortalCredentials empties the cache', () => {
  savePortalCredentials('KWL-AAAA1111', 'first-password');
  clearAllPortalCredentials();

  expect(readLatestPortalCredentials()).toBeNull();
});

// ── resilience ───────────────────────────────────────────────────────────────

test('corrupt cache contents are treated as empty rather than throwing', () => {
  // A user editing localStorage, or a half-written value, must not break login.
  window.localStorage.setItem('kalawala_portal_credentials', '{not json');

  expect(readLatestPortalCredentials()).toBeNull();
  expect(readPortalCredentials('KWL-AAAA1111')).toBeNull();

  // And the cache recovers on the next write.
  savePortalCredentials('KWL-AAAA1111', 'first-password');
  expect(readPortalCredentials('KWL-AAAA1111')?.password).toBe('first-password');
});

test('entries missing required fields are ignored', () => {
  window.localStorage.setItem(
    'kalawala_portal_credentials',
    JSON.stringify([{ reservationPublicId: 'KWL-AAAA1111' }, { password: 'orphan' }])
  );

  expect(readLatestPortalCredentials()).toBeNull();
});
