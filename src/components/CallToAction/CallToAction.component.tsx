import React from 'react';
import banner from '../../assets/images/backgrounds/bg-1.jpg';

const CallToAction = () => {
  return (
    
        <section className="call-to-action section-sm bg-1 overly" style={{ backgroundImage: `url(${banner})`, height: 500, backgroundAttachment: 'fixed', backgroundPosition : 'center center' }}>

          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h2>Check Availability and Prices</h2>
                <p>discover our discounts.</p>
                <a href="#contact-us" className="btn btn-main">Reserve Now</a>
              </div>
            </div>
          </div>
        </section>
      
  );
}

export default CallToAction;
