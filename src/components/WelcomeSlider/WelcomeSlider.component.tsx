import React from 'react';
import banner from '../../assets/images/banner/banner-1.jpg';
import './WelcomeSlider.style.scss';
import Button from 'react-bootstrap/Button';

const WelcomeSlider = () => {
  return (
    <section className="hero-area overlay" style={{ backgroundImage: `url(${banner})`}}>
      <div className = "block" >
        <h1>RESERVAS KALAMALA</h1>
        <p id="short-description">Fully equipped vacation homes in the heart of Puerto Viejo.</p>
        <Button variant="outline-light" className='btn-transparent' href="#house-list">Explore</Button>
        {/* <a data-scroll href="#house-list" className="btn btn-transparent">Explore Us</a> */}
        <br />
        {/* //TODO: <a href="#" onClick={() => setLanguage('en')}>English</a> | <a href="#" onClick={() => setLanguage('es')}>Spanish</a> */ }
      </div >
    </section >
  );
};

export default WelcomeSlider;