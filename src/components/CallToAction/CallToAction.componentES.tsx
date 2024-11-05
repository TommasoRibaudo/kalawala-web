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
              <div 
            className='Smoobo' 
            style={{ 
              backgroundColor: 'rgba(245, 242, 233, 0.86)', 
              borderRadius: '15px', 
              padding: '5px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            }}
            >
              <Smoobu2 />
              <p style={{color: 'black', fontWeight: 550, fontSize: 12}}>*Showing availability for all available properties in the puerto viejo area, including properties advertised on other pages, make sure you check the name of the house and its photo before booking!</p>
            </div>
            <p style={{fontWeight: 400, fontSize: 20, marginTop: 10}}>Contactanos por Whhatsapp al +506 8463-2276</p>
          </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default CallToActionES;
