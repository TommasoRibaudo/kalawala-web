import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages';
// import About from './About';
// import Contact from './Contact';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} /> */}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;


