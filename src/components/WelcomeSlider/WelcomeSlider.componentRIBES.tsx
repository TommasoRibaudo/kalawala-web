import React from 'react';
import './WelcomeSlider.style.scss';
import Button from 'react-bootstrap/Button';

const WelcomeSliderRibES = () => {
  const banner = 'https://drive.google.com/thumbnail?id=1IzO1ErB7f2RbnW35G78njQkT8ulSgMOJ&sz=w1000';

  return (
    <section
      className="hero-area overlay"
      style={{
        backgroundImage: `url(${banner})`,
        minHeight: '100vh',
      }}
    >
      <div className="block">
        <h1>VILLAS MAR DE CORAL</h1>
        <p id="short-description">
          Villas completamente equipadas con Piscina Privada, cerca de Playa Chiquita, Puerto Viejo.
        </p>
        <Button variant="outline-light" className='btn-transparent' href="homeVillasES#callToActionES">
          Reservá Ahora - Los precios más barato!
        </Button>
        <p style={{ marginTop: '20px', color: 'white' }}>
          ✓ Confirmación instantánea · ✓ Reserva segura · ✓ Sin comisiones
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
        <p >⭐⭐⭐⭐⭐ 4.9/5 de miles de estadías desde 2015</p>
      </div>
    </section >
  );
};

export default WelcomeSliderRibES;
