import React from 'react';
import './WelcomeSlider.style.scss';
import Button from 'react-bootstrap/Button';

const WelcomeSliderRib = () => {
  const banner = 'https://drive.google.com/thumbnail?id=1IzO1ErB7f2RbnW35G78njQkT8ulSgMOJ&sz=w1000';

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
        <h1>VILLAS MAR DE CORAL</h1>
        <p id="short-description">
          Private Pool, Fully Equipped Villas near Playa Chiquita, Puerto Viejo.
        </p>
        <Button variant="outline-light" className='btn-transparent' href="#callToAction">
          Book Now - Lowest Online Prices!
        </Button>
        <p style={{ marginTop: '20px', color: 'white' }}>
          ✓ Instant confirmation · ✓ Secure booking · ✓ No platform fees
        </p>
        <br />
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

export default WelcomeSliderRib;
