import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { CookieConsentService } from '../services/CookieConsent.service';
import * as PostHog from '../services/PostHog.service';
import MessageTipContainer from '../components/MessageTip/MessageTipContainer.component';
import { useRandomPopup } from '../hooks/useRandomPopup';
import PortalGuard from '../components/PortalGuard/PortalGuard.component';
import { useLocale } from '../i18n';
import LocaleHtmlAttrs from '../components/LocaleHtmlAttrs/LocaleHtmlAttrs.component';

/*
 * Every routed page is code-split.
 *
 * All 50 page components used to be static imports, so visiting any single
 * page downloaded and parsed all of them — the whole site in one 1.3 MB
 * bundle.
 *
 * The webpackChunkName comments are load-bearing, not cosmetic:
 * scripts/inject-route-preloads.js runs after react-snap and injects a
 * <link rel="preload" as="script"> for the matching chunk into each
 * pre-rendered page, so the chunk is already in flight before hydration
 * starts. That injector recomputes these names with the same rule and fails
 * the build if one is missing from asset-manifest.json.
 */
const Home = lazy(() => import(/* webpackChunkName: "route-home" */ '../pages/Home/Home.page'));
const BookingPage = lazy(() => import(/* webpackChunkName: "route-book" */ '../pages/Booking.page'));
const PortalLoginPage = lazy(() => import(/* webpackChunkName: "route-portal" */ '../pages/Portal.page'));
const PortalDetailPage = lazy(() => import(/* webpackChunkName: "route-portal-detail" */ '../pages/PortalDetail.page'));
const ListingGeco = lazy(() => import(/* webpackChunkName: "route-geco" */ '../pages/Listing/staticPages/ListingGeco.page'));
const ListingRana = lazy(() => import(/* webpackChunkName: "route-rana" */ '../pages/Listing/staticPages/ListingRana.page'));
const ListingTucano = lazy(() => import(/* webpackChunkName: "route-tucano" */ '../pages/Listing/staticPages/ListingTucano.page'));
const ListingPappagallo = lazy(() => import(/* webpackChunkName: "route-pappagallo" */ '../pages/Listing/staticPages/ListingPappagallo.page'));
const ListingDelfin = lazy(() => import(/* webpackChunkName: "route-delfin" */ '../pages/Listing/staticPages/ListingDelfin.page'));
const ListingAreka = lazy(() => import(/* webpackChunkName: "route-areka" */ '../pages/Listing/staticPages/ListingAreka.page'));
const ListingGiulia = lazy(() => import(/* webpackChunkName: "route-giulia" */ '../pages/Listing/staticPages/ListingGiulia.page'));
const ListingPlumeria = lazy(() => import(/* webpackChunkName: "route-plumeria" */ '../pages/Listing/staticPages/ListingPlumeria.page'));
const ListingVillaMar = lazy(() => import(/* webpackChunkName: "route-villamar" */ '../pages/Listing/staticPages/ListingVillaMar.page'));
const ListingVillaCoral = lazy(() => import(/* webpackChunkName: "route-villacoral" */ '../pages/Listing/staticPages/ListingVillaCoral.page'));
const TwoDaysInPV = lazy(() => import(/* webpackChunkName: "route-twodaysinpuertoviejo" */ '../pages/Blog/staticPages/TwoDaysInPV'));
const GettingToGandoca = lazy(() => import(/* webpackChunkName: "route-gettingtogandoca" */ '../pages/Blog/staticPages/GettingToGandoca'));
const TravellingToPuerto = lazy(() => import(/* webpackChunkName: "route-travellingtopuertoviejo" */ '../pages/Blog/staticPages/TravellingToPuerto'));
const PuertoViejoByPlane = lazy(() => import(/* webpackChunkName: "route-puertoviejobyplane" */ '../pages/Blog/staticPages/PuertoViejoByPlane'));
const TenHoursInPuerto = lazy(() => import(/* webpackChunkName: "route-tenhoursinpuerto" */ '../pages/Blog/staticPages/TenHoursInPuerto'));
const BusHours = lazy(() => import(/* webpackChunkName: "route-bushours" */ '../pages/Blog/staticPages/BusHours'));
const CahuitaPark = lazy(() => import(/* webpackChunkName: "route-cahuitaparkwhattodo" */ '../pages/Blog/staticPages/CahuitaPark'));
const IndigenousTravel = lazy(() => import(/* webpackChunkName: "route-indigenoustravelpv" */ '../pages/Blog/staticPages/IndigenousTravel'));
const BestTimeToVisitPuerto = lazy(() => import(/* webpackChunkName: "route-besttimetovisitpuerto" */ '../pages/Blog/staticPages/BestTimeToVisitPuerto'));
const PuertoHiddenGems = lazy(() => import(/* webpackChunkName: "route-puertohiddengems" */ '../pages/Blog/staticPages/PuertoHiddenGems'));
const BusHoursES = lazy(() => import(/* webpackChunkName: "route-bushourses" */ '../pages/Blog/staticPages_ES/BusHoursES'));
const HomeES = lazy(() => import(/* webpackChunkName: "route-homees" */ '../pages/Home/Home.pageES'));
const Success = lazy(() => import(/* webpackChunkName: "route-success" */ '../pages/Home/Success.page'));
const NotFound = lazy(() => import(/* webpackChunkName: "route-404" */ '../pages/NotFound.page'));
const BlogIndex = lazy(() => import(/* webpackChunkName: "route-blog" */ '../pages/Blog/BlogIndex.page'));
const BlogIndexES = lazy(() => import(/* webpackChunkName: "route-bloges" */ '../pages/Blog/BlogIndex.page_ES'));
// import About from './About';
// import Contact from './Contact';

// Component to capture pageviews on route changes and manage PostHog consent
const PostHogPageView = () => {
  const location = useLocation();

  // Opt-in/out when consent changes
  React.useEffect(() => {
    const cleanup = CookieConsentService.onConsentChange((state) => {
      if (state.preferences.analytics) {
        PostHog.optIn();
      } else {
        PostHog.optOut();
      }
    });
    return cleanup;
  }, []);

  // Capture pageview only if analytics consent is given
  React.useEffect(() => {
    if (CookieConsentService.hasConsent('analytics')) {
      PostHog.capture('$pageview');
    }
  }, [location]);

  return null;
};

// Component to handle random popup logic inside Router context
const RandomPopupHandler = () => {
  // Was a fourth hand-rolled copy of the Spanish-route check; now the shared
  // detector. useRandomPopup still takes a boolean — it moves to a locale with
  // the message catalogs in Phase 2.
  const locale = useLocale();

  useRandomPopup({ locale });

  return null; // This component doesn't render anything
};

const AppRouter = () => {
  // Web Vitals CLS tracking - runs on every page
  React.useEffect(() => {
    // Check if script already exists to avoid duplicates
    // if (document.querySelector('script[data-web-vitals]')) {
    //   return;
    // }

    // const script = document.createElement('script');
    // script.type = 'module';
    // script.setAttribute('data-web-vitals', 'true');
    // script.textContent = `
    //   import {onCLS, onLCP, onFID, onFCP, onTTFB} from 'https://unpkg.com/web-vitals@4/dist/web-vitals.attribution.js';
      
    //   const getPerformanceStatus = (metric, value, threshold) => {
    //     const status = value <= threshold ? '✅ GOOD' : '⚠️ NEEDS IMPROVEMENT';
    //     const color = value <= threshold ? '#28a745' : '#ffc107';
    //     return { status, color };
    //   };
      
    //   // CLS tracking
    //   onCLS(({value, id, attribution}) => {
    //     const { status, color } = getPerformanceStatus('CLS', value, 0.1);
    //     console.log('%c🔍 CLS: ' + status + ' (' + value.toFixed(3) + ')', 'color: ' + color + '; font-weight: bold;');
    //     if (value > 0.1) {
    //       console.log('   📍 Element causing shift:', attribution.largestShiftTarget);
    //     }
    //   });
      
    //   // LCP tracking
    //   onLCP(({value, id, attribution}) => {
    //     const { status, color } = getPerformanceStatus('LCP', value, 2500);
    //     console.log('%c⚡ LCP: ' + status + ' (' + Math.round(value) + 'ms)', 'color: ' + color + '; font-weight: bold;');
    //     if (value > 2500) {
    //       console.log('   📍 Slowest element:', attribution.element);
    //     }
    //   });
      
    //   // FID tracking
    //   onFID(({value, id, attribution}) => {
    //     const { status, color } = getPerformanceStatus('FID', value, 100);
    //     console.log('%c🖱️ FID: ' + status + ' (' + Math.round(value) + 'ms)', 'color: ' + color + '; font-weight: bold;');
    //     if (value > 100) {
    //       console.log('   📍 Interactive element:', attribution.eventTarget);
    //     }
    //   });
      
    //   // FCP tracking
    //   onFCP(({value, id, attribution}) => {
    //     const { status, color } = getPerformanceStatus('FCP', value, 1800);
    //     console.log('%c🎨 FCP: ' + status + ' (' + Math.round(value) + 'ms)', 'color: ' + color + '; font-weight: bold;');
    //   });
      
    //   // TTFB tracking
    //   onTTFB(({value, id, attribution}) => {
    //     const { status, color } = getPerformanceStatus('TTFB', value, 600);
    //     console.log('%c🌐 TTFB: ' + status + ' (' + Math.round(value) + 'ms)', 'color: ' + color + '; font-weight: bold;');
    //   });
      
    //   console.log('📊 Web Vitals monitoring active - Performance status will appear below:');
    // `;
    // document.head.appendChild(script);
    // console.log('📊 Web Vitals CLS tracking initialized');
  }, []);

  return (
    <BrowserRouter>
      <LocaleHtmlAttrs />
      <PostHogPageView />
      <RandomPopupHandler />
      <Suspense fallback={null}>
        <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/book' element={<BookingPage />} />
      <Route path='/book/return' element={<BookingPage />} />
      <Route path='/book/confirmed' element={<BookingPage />} />
      <Route path='/bookES' element={<BookingPage />} />
      <Route path='/bookES/return' element={<BookingPage />} />
      <Route path='/bookES/confirmed' element={<BookingPage />} />
      <Route path='/portal' element={<PortalLoginPage />} />
      <Route path='/portalES' element={<PortalLoginPage />} />
      <Route path='/portal/:reservationPublicId' element={<PortalGuard><PortalDetailPage /></PortalGuard>} />
      <Route path='/portalES/:reservationPublicId' element={<PortalGuard><PortalDetailPage /></PortalGuard>} />
      {/*   <Route path='listing'>
        <Route path=':listing' element={<Listing />} />
      </Route> */}
      <Route path='/Geco'  element={<ListingGeco />}/>
      <Route path='/Rana'  element={<ListingRana />}/>
      <Route path='/Tucano'  element={<ListingTucano />}/>
      <Route path='/Pappagallo'  element={<ListingPappagallo />}/>
      <Route path='/Delfin'  element={<ListingDelfin />}/>
      <Route path='/blog' element={<BlogIndex />} />
      <Route path='/blogES' element={<BlogIndexES />} />
      <Route path='/twodaysinpuertoviejo' element={<TwoDaysInPV />} />
      <Route path='/gettingtogandoca' element={<GettingToGandoca />} />
      <Route path='/travellingtopuertoviejo' element={<TravellingToPuerto />} />
      <Route path='/puertoviejobyplane' element={<PuertoViejoByPlane />} />
      <Route path='/TenHoursInPuerto' element={<TenHoursInPuerto />} />
      <Route path='/bushours' element={<BusHours />} />
      <Route path='/bushoursES' element={<BusHoursES />} />
      <Route path='/GecoES'  element={<ListingGeco />}/>
      <Route path='/RanaES'  element={<ListingRana />}/>
      <Route path='/TucanoES'  element={<ListingTucano />}/>
      <Route path='/PappagalloES'  element={<ListingPappagallo />}/>
      <Route path='/DelfinES'  element={<ListingDelfin />}/>
      <Route path='/twodaysinpuertoviejoES' element={<TwoDaysInPV />} />
      <Route path='/gettingtogandocaES' element={<GettingToGandoca />} />
      <Route path='/travellingtopuertoviejoES' element={<TravellingToPuerto />} />
      <Route path='/puertoviejobyplaneES' element={<PuertoViejoByPlane />} />
      <Route path='/TenHoursInPuertoES' element={<TenHoursInPuerto />} />
      <Route path='/cahuitaparkwhattodo' element={<CahuitaPark />} />
      <Route path='/cahuitaparkwhattodoES' element={<CahuitaPark />} />
      <Route path='/indigenousTravelPV' element={<IndigenousTravel />} />
      <Route path='/indigenousTravelPVES' element={<IndigenousTravel />} />
      <Route path='/bestTimeToVisitPuerto' element={<BestTimeToVisitPuerto />} />
      <Route path='/bestTimeToVisitPuertoES' element={<BestTimeToVisitPuerto />} />
      <Route path='/puertoHiddenGemsES' element={<PuertoHiddenGems />} />
      <Route path='/puertoHiddenGems' element={<PuertoHiddenGems />} />
      <Route path='/HomeES' element={<HomeES/>} />
      <Route path='/Success' element={<Success/>} />
      <Route path='/Areka' element={<ListingAreka/>}/>
      <Route path='/Giulia' element={<ListingGiulia/>}/>
      <Route path='/Plumeria' element={<ListingPlumeria/>}/>
      <Route path='/VillaMar' element={<ListingVillaMar/>}/>
      <Route path='/VillaCoral' element={<ListingVillaCoral/>}/>
      <Route path='/ArekaES' element={<ListingAreka />}/>
      <Route path='/GiuliaES' element={<ListingGiulia />}/>
      <Route path='/PlumeriaES' element={<ListingPlumeria />}/>
      <Route path='/VillaMarES' element={<ListingVillaMar />}/>
      <Route path='/VillaCoralES' element={<ListingVillaCoral />}/>
      





      {/* <Route path='blog'>
        <Route path=':blogId' element={<Blog />} />
      </Route> */} 
      {/* <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} /> */}
        {/*
          A dedicated route, separate from the "*" catch-all below, so
          react-snap (which navigates to explicit paths, not wildcards — see
          package.json's reactSnap.include) can prerender a static 404.html.
          scripts/generate-404.js copies the resulting build/404/index.html
          to build/404.html, and .htaccess serves it with a real HTTP 404
          status via ErrorDocument, instead of the soft-404 (200 + blank/
          generic page) unknown URLs used to get.
        */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      <MessageTipContainer />
    </BrowserRouter>
  );
};
 
export default AppRouter;


