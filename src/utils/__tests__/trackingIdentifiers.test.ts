import { getTrackingIdentifiers, hasMarketingConsent } from '../trackingIdentifiers';
import { CookieConsentService } from '../../services/CookieConsent.service';

jest.mock('../../services/CookieConsent.service', () => ({
  CookieConsentService: {
    hasConsent: jest.fn(),
  },
}));

const mockHasConsent = CookieConsentService.hasConsent as jest.Mock;

function setCookies(value: string): void {
  Object.defineProperty(document, 'cookie', {
    writable: true,
    configurable: true,
    value,
  });
}

function setSearch(search: string): void {
  Object.defineProperty(window, 'location', {
    writable: true,
    configurable: true,
    value: { ...window.location, search },
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  setCookies('');
  setSearch('');
  mockHasConsent.mockReturnValue(true);
});

describe('getTrackingIdentifiers', () => {
  it('parses the GA4 client ID out of the _ga cookie', () => {
    setCookies('_ga=GA1.1.686566830.1785166389');

    expect(getTrackingIdentifiers()?.gaClientId).toBe('686566830.1785166389');
  });

  it('parses the session ID out of the _ga_<container> cookie', () => {
    setCookies('_ga_Q1LMHMNCMW=GS2.1.s1785166389$o1$g0$t1785166389$j60$l0$h0');

    // Without this GA4 opens a new session and the sale lands in Direct/None.
    expect(getTrackingIdentifiers()?.gaSessionId).toBe('1785166389');
  });

  it('collects Meta identifiers from cookies', () => {
    setCookies('_fbp=fb.1.1785166661469.365729390; _fbc=fb.1.1700000000000.abc123');

    const identifiers = getTrackingIdentifiers();
    expect(identifiers?.fbp).toBe('fb.1.1785166661469.365729390');
    expect(identifiers?.fbc).toBe('fb.1.1700000000000.abc123');
  });

  it('synthesises fbc from fbclid when the cookie has not been set yet', () => {
    setSearch('?fbclid=IwAR_test_click');

    expect(getTrackingIdentifiers()?.fbc).toMatch(/^fb\.1\.\d+\.IwAR_test_click$/);
  });

  it('picks up gclid from the URL', () => {
    setSearch('?gclid=Cj0KCQ_test');

    expect(getTrackingIdentifiers()?.gclid).toBe('Cj0KCQ_test');
  });

  it('returns undefined when marketing consent is absent', () => {
    mockHasConsent.mockReturnValue(false);
    setCookies('_ga=GA1.1.686566830.1785166389; _fbp=fb.1.1.1');

    // The consent gate lives here so no caller can forget it.
    expect(getTrackingIdentifiers()).toBeUndefined();
  });

  it('gates on marketing specifically, not analytics', () => {
    mockHasConsent.mockImplementation((category: string) => category === 'analytics');
    setCookies('_ga=GA1.1.686566830.1785166389');

    expect(getTrackingIdentifiers()).toBeUndefined();
  });

  it('returns undefined when consented but no identifiers exist', () => {
    expect(getTrackingIdentifiers()).toBeUndefined();
  });

  it('ignores a malformed _ga cookie rather than throwing', () => {
    setCookies('_ga=garbage');

    expect(getTrackingIdentifiers()).toBeUndefined();
  });

  it('never throws when the consent service explodes', () => {
    mockHasConsent.mockImplementation(() => {
      throw new Error('storage unavailable');
    });

    expect(getTrackingIdentifiers()).toBeUndefined();
    expect(hasMarketingConsent()).toBe(false);
  });
});
