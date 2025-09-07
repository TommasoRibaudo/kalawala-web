import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages';
import ListingGeco from '../pages/Listing/staticPages/ListingGeco.page';
import ListingRana from '../pages/Listing/staticPages/ListingRana.page';
import ListingTucano from '../pages/Listing/staticPages/ListingTucano.page';
import ListingPappagallo from '../pages/Listing/staticPages/ListingPappagallo.page';
import TwoDaysInPV from '../pages/Blog/staticPages/TwoDaysInPV';
import GettingToGandoca from '../pages/Blog/staticPages/GettingToGandoca';
import TravellingToPuerto from '../pages/Blog/staticPages/TravellingToPuerto';
import PuertoViejoByPlane from '../pages/Blog/staticPages/PuertoViejoByPlane';
import TenHoursInPuerto from '../pages/Blog/staticPages/TenHoursInPuerto';
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
// import About from './About';
// import Contact from './Contact';

const AppRouter = () => (
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
      <Route path='/twodaysinpuertoviejo' element={<TwoDaysInPV />} />
      <Route path='/gettingtogandoca' element={<GettingToGandoca />} />
      <Route path='/travellingtopuertoviejo' element={<TravellingToPuerto />} />
      <Route path='/puertoviejobyplane' element={<PuertoViejoByPlane />} />
      <Route path='/TenHoursInPuerto' element={<TenHoursInPuerto />} />
      <Route path='/GecoES'  element={<ListingGecoES />}/>
      <Route path='/RanaES'  element={<ListingRanaES />}/>
      <Route path='/TucanoES'  element={<ListingTucanoES />}/>
      <Route path='/PappagalloES'  element={<ListingPappagalloES />}/>
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
  </BrowserRouter>
);
 
export default AppRouter;


