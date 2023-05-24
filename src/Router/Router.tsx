import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Listing, Blog } from '../pages';
// import About from './About';
// import Contact from './Contact';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='listing'>
        <Route path=':listing' element={<Listing />} />
      </Route>
      <Route path='blog'>
        <Route path=':blogId' element={<Blog />} />
      </Route>
      {/* <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} /> */}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;


