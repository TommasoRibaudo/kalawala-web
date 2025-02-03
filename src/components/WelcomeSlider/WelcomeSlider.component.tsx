import React from 'react';
import './WelcomeSlider.style.scss';
import Button from 'react-bootstrap/Button';

const WelcomeSlider = () => {
  let banner = 'https://drive.google.com/thumbnail?id=1c25flui45r6oVIvPMqKLemVsWgjbhsAH&sz=w1000';
  return (
    <section className="hero-area overlay" style={{ backgroundImage: `url(${banner})`}}>
      <div className = "block" >
        <h1>RESERVAS KALAWALA</h1>
        <p id="short-description">Fully equipped vacation homes in the heart of Puerto Viejo.</p>
        <Button variant="outline-light" className='btn-transparent' href="#callToAction">Book Now - Lowest Prices!</Button>
        <br />
      </div >
    </section > 
  );
};

export default WelcomeSlider;
