import React from 'react';
import './WelcomeSlider.style.scss';
import Button from 'react-bootstrap/Button';

const WelcomeSliderNamES = () => {
  let banner = 'https://drive.google.com/thumbnail?id=1bbRn5NLsJ8cKqm0I697TMNT5z9iDASxF&sz=w1000';
  return (
    <section className="hero-area overlay" style={{ backgroundImage: `url(${banner})`}}>
      <div className = "block" >
        <h1>Casitas Namaitami</h1>
        <p id="short-description">Casas completamente equipadas en el corazon de Playa Chiquita.</p>
        <Button variant="outline-light" className='btn-transparent' href="#callToAction">Reservá Ahora - Los precios más barato!</Button>
        <br />
      </div >
    </section > 
  );
};

export default WelcomeSliderNamES;
