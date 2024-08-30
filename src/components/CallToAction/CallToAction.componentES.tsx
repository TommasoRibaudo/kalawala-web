import React from 'react';
import background from '../../assets/images/backgrounds/bg-1.jpg';
import Smoobu from '../Smoobu/Smoobu.component';
import './CallToAction.style.scss'
import Smoobu2 from '../Smoobu2/Smoobu2.component';

const CallToActionES = () => {
  return (
    <section id="callToActionES" className="call-to-action overly bg-1" style={{ backgroundImage: `url(https://drive.google.com/thumbnail?id=16VEmEiyt0Szm76Zth7MTuOvvHZ689W2f&sz=w1000)` }}>
      <div className="test section-sm">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center" >
              <p style={{fontWeight: 400, fontSize: 28}}>Revisa la disponibilidad y precios</p>
              <p>Descubre nuestros descuentos.</p>
              <Smoobu2 />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default CallToActionES;
