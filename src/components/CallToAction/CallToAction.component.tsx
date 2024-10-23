import React from 'react';
import background from '../../assets/images/backgrounds/bg-1.jpg';
import Smoobu from '../Smoobu/Smoobu.component';
import './CallToAction.style.scss'
import Smoobu2 from '../Smoobu2/Smoobu2.component';

const CallToAction = () => {
  return (
    <section id="callToAction" className="call-to-action overly bg-1" style={{ backgroundImage: `url(https://drive.google.com/thumbnail?id=1NoeXMkl7483dB0hVfCYuGPbqKTkRpQXq&sz=w1000)` }}>
      <div className="test section-sm">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center" >
              <p style={{fontWeight: 700, fontSize: 28}}>Check Availability and Prices</p>
              <p>The cheapest prices online!</p>
              <div 
            className='Smoobo' 
            style={{ 
              backgroundColor: 'rgba(245, 242, 233, 0.75)', 
              borderRadius: '15px', 
              padding: '20px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            }}
            >
              <Smoobu2 />
            </div>
            <p style={{fontWeight: 700, fontSize: 28}}>Got any questions?</p>
            <p style={{fontWeight: 400, fontSize: 20}}>Contact us +506 84632276</p>
          </div>
            </div>
            
        </div>
      </div>

    </section>
  );
}

export default CallToAction;
