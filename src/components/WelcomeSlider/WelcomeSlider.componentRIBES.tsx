import React from 'react';
import { cdnImage, cdnSrcSet } from '../../utils/imageCdn';
import './WelcomeSlider.style.scss';
import Button from 'react-bootstrap/Button';

const HERO_BANNER =
  'https://lh3.googleusercontent.com/d/1IzO1ErB7f2RbnW35G78njQkT8ulSgMOJ=w1000';

const WelcomeSliderRibES = () => {

  return (
    <section className="hero-area overlay">
      <img
        className="hero-area__bg"
        src={cdnImage(HERO_BANNER, 1280)}
        srcSet={cdnSrcSet(HERO_BANNER)}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
      />

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
      <div className="hero-rating">
        <p >⭐⭐⭐⭐⭐ 4.9/5 de miles de estadías desde 2015</p>
      </div>
    </section >
  );
};

export default WelcomeSliderRibES;
