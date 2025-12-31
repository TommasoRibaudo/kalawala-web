import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages';
import MessageTipContainer from '../components/MessageTip/MessageTipContainer.component';
import ListingGeco from '../pages/Listing/staticPages/ListingGeco.page';
import ListingRana from '../pages/Listing/staticPages/ListingRana.page';
import ListingTucano from '../pages/Listing/staticPages/ListingTucano.page';
import ListingPappagallo from '../pages/Listing/staticPages/ListingPappagallo.page';
import TwoDaysInPV from '../pages/Blog/staticPages/TwoDaysInPV';
import GettingToGandoca from '../pages/Blog/staticPages/GettingToGandoca';
import TravellingToPuerto from '../pages/Blog/staticPages/TravellingToPuerto';
import PuertoViejoByPlane from '../pages/Blog/staticPages/PuertoViejoByPlane';
import TenHoursInPuerto from '../pages/Blog/staticPages/TenHoursInPuerto';
import BusHours from '../pages/Blog/staticPages/BusHours';
import BusHoursES from '../pages/Blog/staticPages_ES/BusHoursES';
import ListingGecoES from '../pages/Listing/staticPages_ES/ListingGeco.page_ES';
import ListingRanaES from '../pages/Listing/staticPages_ES/ListingRana.page_ES';
import ListingTucanoES from '../pages/Listing/staticPages_ES/ListingTucano.page_ES';
import ListingPappagalloES from '../pages/Listing/staticPages_ES/ListingPappagallo.page_ES';
import TwoDaysInPVES from '../pages/Blog/staticPages_ES/TwoDaysInPV_ES';
import GettingToGandocaES from '../pages/Blog/staticPages_ES/GettingToGandoca_ES';
import TravellingToPuertoES from '../pages/Blog/staticPages_ES/TravellingToPuerto_ES';
import PuertoViejoByPlaneES from '../pages/Blog/staticPages_ES/PuertoViejoByPlane_ES';
import TenHoursInPuertoES from '../pages/Blog/staticPages_ES/TenHoursInPuerto_ES';
import HomeES from '../pages/Home/Home.pageES';
import Success from '../pages/Home/Success.page';
import HomeNam from '../pages/Home/Home.page.nam';
import HomeNamES from '../pages/Home/Home.pageES.nam';
import HomeRib from '../pages/Home/Home.page.rib';
import HomeRibES from '../pages/Home/Home.pageES.rib';
import ListingAreka from '../pages/Listing/staticPages/ListingAreka.page';
import ListingGiulia from '../pages/Listing/staticPages/ListingGiulia.page';
import ListingPlumeria from '../pages/Listing/staticPages/ListingPlumeria.page';
import ListingVillaMar from '../pages/Listing/staticPages/ListingVillaMar.page';
import ListingVillaCoral from '../pages/Listing/staticPages/ListingVillaCoral.page';
import ListingArekaES from '../pages/Listing/staticPages_ES/ListingAreka.page_ES';
import ListingGiuliaES from '../pages/Listing/staticPages_ES/ListingGiulia.page_ES';
import ListingPlumeriaES from '../pages/Listing/staticPages_ES/ListingPlumeria.page_ES';
import ListingVillaMarES from '../pages/Listing/staticPages_ES/ListingVillaMar.page_ES';
import ListingVillaCoralES from '../pages/Listing/staticPages_ES/ListingVillaCoral.page_ES';
import ListingDelfin from '../pages/Listing/staticPages/ListingDelfin.page';
import ListingDelfinES from '../pages/Listing/staticPages_ES/ListingDelfin.page_ES';
// import About from './About';
// import Contact from './Contact';

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
      <Routes>
      <Route path="/" element={<Home />} />
      {/*   <Route path='listing'>
        <Route path=':listing' element={<Listing />} />
      </Route> */}
      <Route path='/Geco'  element={<ListingGeco />}/>
      <Route path='/Rana'  element={<ListingRana />}/>
      <Route path='/Tucano'  element={<ListingTucano />}/>
      <Route path='/Pappagallo'  element={<ListingPappagallo />}/>
      <Route path='/Delfin'  element={<ListingDelfin />}/>
      <Route path='/twodaysinpuertoviejo' element={<TwoDaysInPV />} />
      <Route path='/gettingtogandoca' element={<GettingToGandoca />} />
      <Route path='/travellingtopuertoviejo' element={<TravellingToPuerto />} />
      <Route path='/puertoviejobyplane' element={<PuertoViejoByPlane />} />
      <Route path='/TenHoursInPuerto' element={<TenHoursInPuerto />} />
      <Route path='/bushours' element={<BusHours />} />
      <Route path='/bushoursES' element={<BusHoursES />} />
      <Route path='/GecoES'  element={<ListingGecoES />}/>
      <Route path='/RanaES'  element={<ListingRanaES />}/>
      <Route path='/TucanoES'  element={<ListingTucanoES />}/>
      <Route path='/PappagalloES'  element={<ListingPappagalloES />}/>
      <Route path='/DelfinES'  element={<ListingDelfinES />}/>
      <Route path='/twodaysinpuertoviejoES' element={<TwoDaysInPVES />} />
      <Route path='/gettingtogandocaES' element={<GettingToGandocaES />} />
      <Route path='/travellingtopuertoviejoES' element={<TravellingToPuertoES />} />
      <Route path='/puertoviejobyplaneES' element={<PuertoViejoByPlaneES />} />
      <Route path='/TenHoursInPuertoES' element={<TenHoursInPuertoES />} />
      <Route path='/HomeES' element={<HomeES/>} />
      <Route path='/Success' element={<Success/>} />
      <Route path='/HomeNam' element={<HomeNam/>} />
      <Route path='/HomeNamES' element={<HomeNamES/>} />
      <Route path='/HomeVillas' element={<HomeRib/>} />
      <Route path='/HomeVillasES' element={<HomeRibES/>} />
      <Route path='/Areka' element={<ListingAreka/>}/>
      <Route path='/Giulia' element={<ListingGiulia/>}/>
      <Route path='/Plumeria' element={<ListingPlumeria/>}/>
      <Route path='/VillaMar' element={<ListingVillaMar/>}/>
      <Route path='/VillaCoral' element={<ListingVillaCoral/>}/>
      <Route path='/ArekaES' element={<ListingArekaES/>}/>
      <Route path='/GiuliaES' element={<ListingGiuliaES/>}/>
      <Route path='/PlumeriaES' element={<ListingPlumeriaES/>}/>
      <Route path='/VillaMarES' element={<ListingVillaMarES/>}/>
      <Route path='/VillaCoralES' element={<ListingVillaCoralES/>}/>
      





      {/* <Route path='blog'>
        <Route path=':blogId' element={<Blog />} />
      </Route> */} 
      {/* <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} /> */}
      </Routes>
      <MessageTipContainer />
    </BrowserRouter>
  );
};
 
export default AppRouter;


