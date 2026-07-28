/**
 * True while react-snap is crawling the app at build time.
 *
 * react-snap is not `renderToString`. It drives a real browser, lets the page
 * settle, and saves the DOM it finds — *after* effects have run, timers have
 * fired and network requests have resolved or been blocked. Hydration, by
 * contrast, compares that saved HTML against React's very first client render,
 * when no effect has run yet.
 *
 * So any component whose first render differs from its settled state bakes the
 * settled state into the snapshot and mismatches on every page load. React
 * reports it as error #418, then #423 when it gives up and re-renders the whole
 * root on the client — which throws away the pre-rendered DOM that is the
 * entire point of pre-rendering. The repaired DOM looks correct afterwards, so
 * the only visible symptom is the console.
 *
 * Two cases hit this in practice, both fixed by checking this flag:
 *
 *   - ImageWithSkeleton: `skipThirdPartyRequests` blocks every image during the
 *     crawl, so `onError` fired and 129 "Failed to load image" blocks were
 *     saved into 25 of the 46 pages.
 *   - CookieConsentBanner: an effect reveals the banner, so it was baked into
 *     every page even though the client's first render omits it.
 *
 * Guard the state change, not the render. The goal is for the snapshot to equal
 * the initial client render, which is exactly what hydration expects to find.
 */
export function isPrerender(): boolean {
  return typeof navigator !== 'undefined' && navigator.userAgent.includes('ReactSnap');
}
