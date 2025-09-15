import React from 'react';
import './WelcomeSlider.style.scss';
import Smoobu2 from '../Smoobu2/Smoobu2.component';

const WelcomeSliderNam = () => {
  let banner = 'https://drive.google.com/thumbnail?id=1bbRn5NLsJ8cKqm0I697TMNT5z9iDASxF&sz=w1000';
  return (
    <section className="hero-area overlay" style={{ backgroundImage: `url(${banner})`}}>
      <div className = "block" >
        <h1>Namaitami Homes</h1>
        <p id="short-description">Fully equipped vacation homes in the heart of Puerto Viejo and Playa Chiquita.</p>
        <br />

        <div
          className='Smoobo'
          style={{
            backgroundColor: 'rgba(245, 242, 233, 0.86)',
            borderRadius: '15px',
            padding: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: "visible",
          }}
        >
          <Smoobu2 targetId="welcomeSliderSmoobu" />
        </div>
        <br />
      </div > 
    </section > 
  );
};

export default WelcomeSliderNam;
