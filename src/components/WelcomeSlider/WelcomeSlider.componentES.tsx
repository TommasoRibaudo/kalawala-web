import React from 'react';
import { cdnImage, cdnSrcSet } from '../../utils/imageCdn';
import './WelcomeSlider.style.scss';
import BookingSearchWidget from '../BookingSearchWidget/BookingSearchWidget.component';

const HERO_BANNER =
  'https://lh3.googleusercontent.com/d/1c25flui45r6oVIvPMqKLemVsWgjbhsAH=w1000';

const WelcomeSliderES = () => {

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
        <h1>RESERVAS KALAWALA</h1>
        <p id="short-description">
          Casas completamente equipadas en el corazon de Puerto Viejo y Playa Chiquita.
        </p>
        <br />

        <div className="hero-booking">
          <BookingSearchWidget locale="es" variant="hero" />
          <p className="hero-trust">✓ Confirmación instantánea · ✓ Reserva segura · ✓ Sin comisiones</p>
        </div>
      </div>

      {/* ⭐ NOW pinned to the bottom of the SECTION */}
      <div className="hero-rating">
        <p >⭐⭐⭐⭐⭐ 4.9/5 de miles de estadías desde 2015</p>
      </div>
    </section>
  );
};

export default WelcomeSliderES;
