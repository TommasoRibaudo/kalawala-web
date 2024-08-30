import React from 'react';
import './WelcomeSlider.style.scss';
import Button from 'react-bootstrap/Button';

const WelcomeSliderES = () => {
  let banner = 'https://drive.google.com/thumbnail?id=1c25flui45r6oVIvPMqKLemVsWgjbhsAH&sz=w1000';
  return (
    <section className="hero-area overlay" style={{ backgroundImage: `url(${banner})`}}>
      <div className = "block" >
        <h1>RESERVAS KALAWALA</h1>
        <p id="short-description">Casas completamente equipadas en el corazon de Puerto Viejo.</p>
        <Button variant="outline-light" className='btn-transparent' href="#callToAction">Reserve en linea Ahora!</Button>
        {/* <a data-scroll href="#house-list" className="btn btn-transparent">Explore Us</a> */}
        <br />
        {/* //TODO: <a href="#" onClick={() => setLanguage('en')}>English</a> | <a href="#" onClick={() => setLanguage('es')}>Spanish</a> */ }
      </div >
    </section > 
  );
};

export default WelcomeSliderES;
