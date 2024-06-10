import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Blog } from '../pages';
import ListingGeco from '../pages/Listing/staticPages/ListingGeco.page';
import ListingRana from '../pages/Listing/staticPages/ListingRana.page';
import ListingTucano from '../pages/Listing/staticPages/ListingTucano.page';
import ListingPappagallo from '../pages/Listing/staticPages/ListingPappagallo.page';
// import About from './About';
// import Contact from './Contact';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path='listing'>
        <Route path=':listing' element={<Listing />} />
      </Route> */}
      <Route path='Geco'  element={<ListingGeco />}/>
      <Route path='Rana'  element={<ListingRana />}/>
      <Route path='Tucano'  element={<ListingTucano />}/>
      <Route path='Pappagallo'  element={<ListingPappagallo />}/>
      {/* <Route path='blog'>
        <Route path=':blogId' element={<Blog />} />
      </Route> */}
      {/* <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} /> */}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;


