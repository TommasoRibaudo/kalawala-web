import React from 'react';
import './WelcomeSlider.style.scss';
import Button from 'react-bootstrap/Button';
import Smoobu2 from '../Smoobu2/Smoobu2.component';

const WelcomeSliderES = () => {
  const banner = 'https://drive.google.com/thumbnail?id=1c25flui45r6oVIvPMqKLemVsWgjbhsAH&sz=w1000';

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
        <h1>RESERVAS KALAWALA</h1>
        <p id="short-description">
          Casas completamente equipadas en el corazon de Puerto Viejo y Playa Chiquita.
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
          <p className="hero-trust">✓ Confirmación instantánea · ✓ Reserva segura · ✓ Sin comisiones</p>
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
        <p >⭐⭐⭐⭐⭐ 4.9/5 de miles de estadías desde 2015</p>
      </div>
    </section>
  );
};

export default WelcomeSliderES;
