import React from 'react';
import './WelcomeSlider.style.scss';
import Button from 'react-bootstrap/Button';

const WelcomeSliderNam = () => {
  let banner = 'https://drive.google.com/thumbnail?id=1bbRn5NLsJ8cKqm0I697TMNT5z9iDASxF&sz=w1000';
  return (
    <section className="hero-area overlay" style={{ backgroundImage: `url(${banner})`}}>
      <div className = "block" >
        <h1>Namaitami Homes</h1>
        <p id="short-description">Fully equipped vacation Houses in Playa Chiquita.</p>
        <Button variant="outline-light" className='btn-transparent' href="#callToAction">Book Now - Lowest Prices!</Button>
        <br />
      </div >
    </section > 
  );
};

export default WelcomeSliderNam;
