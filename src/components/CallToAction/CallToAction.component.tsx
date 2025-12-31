import React, { useState, useEffect } from 'react';
import './CallToAction.style.scss'
import Smoobu2 from '../Smoobu2/Smoobu2.component';

const CallToAction = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section 
      id="callToAction" 
      className="call-to-action overly bg-1" 
      style={{ 
        backgroundImage: `url(https://drive.google.com/thumbnail?id=1NoeXMkl7483dB0hVfCYuGPbqKTkRpQXq&sz=w1000)`,
        paddingTop: isMobile ? '80px' : undefined,
        minHeight: isMobile ? 'auto' : undefined
      }}
    >
      <div className="test section-sm">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center" >
              <p style={{ fontWeight: 400, fontSize: 28 }}>Explore Availability and Prices Across All Our Properties in Puerto Viejo and Playa Chiquita.</p>
              <p>Use the code <b>#norefundallowed</b> to enjoy a 10% discount on non-refundable reservations.</p>
              <div 
            className='Smoobo' 
            style={{ 
              backgroundColor: 'rgba(245, 242, 233, 0.86)', 
              borderRadius: '15px', 
              padding: '5px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            }}
            >
              <Smoobu2 targetId="callToActionSmoobu" /> 
              <p style={{ color: 'black', fontWeight: 550, fontSize: 12 }}>*Showing availability for all available properties in the puerto viejo area, including properties advertised on other pages, make sure you check the name of the house and its photo before booking!</p>
            </div>
            <p style={{marginTop: 10}}>Prefer to pay via bank transfer or SINPE? Book securely with us and send your deposit confirmation to <a href="mailto:reservas.kalawala@gmail.com">reservas.kalawala@gmail.com</a> or via WhatsApp at <a href="https://wa.me/50684632276" target="_blank" rel="noreferrer">+506 8463 2276</a> within 6 hours of making your reservation.</p>
          </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default CallToAction;
