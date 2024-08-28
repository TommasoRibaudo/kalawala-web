import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages';
import ListingGeco from '../pages/Listing/staticPages/ListingGeco.page';
import ListingRana from '../pages/Listing/staticPages/ListingRana.page';
import ListingTucano from '../pages/Listing/staticPages/ListingTucano.page';
import ListingPappagallo from '../pages/Listing/staticPages/ListingPappagallo.page';
import TwoDaysInPV from '../pages/Blog/staticPages/TwoDaysInPV';
import TravellingToPuerto from '../pages/Blog/staticPages/TravellingToPuerto';
import PuertoViejoByPlane from '../pages/Blog/staticPages/PuertoViejoByPlane';
import TenHoursInPuerto from '../pages/Blog/staticPages/TenHoursInPuerto';
import ListingGecoES from '../pages/Listing/staticPages_ES/ListingGeco.page_ES';
import ListingRanaES from '../pages/Listing/staticPages_ES/ListingRana.page_ES';
import ListingTucanoES from '../pages/Listing/staticPages_ES/ListingTucano.page_ES';
import ListingPappagalloES from '../pages/Listing/staticPages_ES/ListingPappagallo.page_ES';
import TwoDaysInPVES from '../pages/Blog/staticPages_ES/TwoDaysInPV_ES';
import TravellingToPuertoES from '../pages/Blog/staticPages_ES/TravellingToPuerto_ES';
import PuertoViejoByPlaneES from '../pages/Blog/staticPages_ES/PuertoViejoByPlane_ES';
import TenHoursInPuertoES from '../pages/Blog/staticPages_ES/TenHoursInPuerto_ES';
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
      <Route path='/travellingtopuertoviejo' element={<TravellingToPuerto />} />
      <Route path='/puertoviejobyplane' element={<PuertoViejoByPlane />} />
      <Route path='/TenHoursInPuerto' element={<TenHoursInPuerto />} />
      <Route path='/GecoES'  element={<ListingGecoES />}/>
      <Route path='/RanaES'  element={<ListingRanaES />}/>
      <Route path='/TucanoES'  element={<ListingTucanoES />}/>
      <Route path='/PappagalloES'  element={<ListingPappagalloES />}/>
      <Route path='/twodaysinpuertoviejoES' element={<TwoDaysInPVES />} />
      <Route path='/travellingtopuertoviejoES' element={<TravellingToPuertoES />} />
      <Route path='/puertoviejobyplaneES' element={<PuertoViejoByPlaneES />} />
      <Route path='/TenHoursInPuertoES' element={<TenHoursInPuertoES />} />

      {/* <Route path='blog'>
        <Route path=':blogId' element={<Blog />} />
      </Route> */} 
      {/* <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} /> */}
    </Routes>
  </BrowserRouter>
);
 
export default AppRouter;


