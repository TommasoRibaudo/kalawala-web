import React from 'react';
import './WelcomeSlider.style.scss';
import Button from 'react-bootstrap/Button';

const WelcomeSliderRib = () => {
  let banner = 'https://drive.google.com/thumbnail?id=1IzO1ErB7f2RbnW35G78njQkT8ulSgMOJ&sz=w1000';
  return (
    <section className="hero-area overlay" style={{ backgroundImage: `url(${banner})`}}>
      <div className = "block" >
        <h1>VILLAS MAR DE CORAL</h1>
        <p id="short-description">Private Pool, Fully Equipped Villas near Playa Chiquita, Puerto Viejo.</p>
        <Button variant="outline-light" className='btn-transparent' href="#callToAction">Book Now - Lowest Online Prices!</Button> {/*TODO CHANGE HREF*/}
        <br />
      </div >
    </section > 
  );
};

export default WelcomeSliderRib;
