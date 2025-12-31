import React from 'react';
import './WelcomeSlider.style.scss';
import Smoobu2 from '../Smoobu2/Smoobu2.component';

const WelcomeSliderNam = () => {
  const banner = 'https://drive.google.com/thumbnail?id=1bbRn5NLsJ8cKqm0I697TMNT5z9iDASxF&sz=w1000';

  return (
    <section
      className="hero-area overlay"
      style={{
        backgroundImage: `url(${banner})`,
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <div className="block">
        <h1>Namaitami Homes</h1>
        <p id="short-description">
          Fully equipped vacation homes in the heart of Puerto Viejo and Playa Chiquita.
        </p>
        <br />

        <div
          className="Smoobo"
          style={{
            backgroundColor: 'rgba(245, 242, 233, 0.86)',
            borderRadius: '15px',
            padding: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'visible',
          }}
        >
          <Smoobu2 targetId="welcomeSliderSmoobu" />
          <p className="hero-trust">✓ Instant confirmation · ✓ Secure booking · ✓ No platform fees</p>
        </div>
      </div>

      {/* ⭐ NOW pinned to the bottom of the SECTION */}
      <div className="hero-rating"
        style={{
          position: 'absolute',
          bottom: '35px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          textAlign: 'center',
          width: '100%',
          pointerEvents: 'none',
        }}
      >
        <p >⭐⭐⭐⭐⭐ 4.9/5 from thousands of stays since 2015</p>
      </div>
    </section>
  );
};

export default WelcomeSliderNam;
