import React from 'react';
import './WelcomeSlider.style.scss';
import Button from 'react-bootstrap/Button';

const WelcomeSlider = () => {
  let banner = 'https://drive.google.com/thumbnail?id=1uahGi9p2U4rcoVK2hq55HMgsrtXI0xWy&sz=w1000';
  return (
    <section className="hero-area overlay" style={{ backgroundImage: `url(${banner})`}}>
      <div className = "block" >
        <h1>RESERVAS KALAWALA</h1>
        <p id="short-description">Fully equipped vacation homes in the heart of Puerto Viejo.</p>
        <Button variant="outline-light" className='btn-transparent' href="#callToAction">Book Now Online!</Button>
        {/* <a data-scroll href="#house-list" className="btn btn-transparent">Explore Us</a> */}
        <br />
        {/* //TODO: <a href="#" onClick={() => setLanguage('en')}>English</a> | <a href="#" onClick={() => setLanguage('es')}>Spanish</a> */ }
      </div >
    </section > 
  );
};

export default WelcomeSlider;