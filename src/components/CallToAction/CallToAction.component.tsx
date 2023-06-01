import React from 'react';
import background from '../../assets/images/backgrounds/bg-1.jpg';
import Smoobu from '../Smoobu/Smoobu.component';
import './CallToAction.style.scss'
import Smoobu2 from '../Smoobu2/Smoobu2.component';

const CallToAction = () => {
  return (
    <section id="callToAction" className="call-to-action  bg-1 overly " style={{ backgroundImage: `url(${background})` }}>
      <div className="test section-sm">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center" >
              <h2>Check Availability and Prices</h2>
              <p>discover our discounts.</p>
              <Smoobu2 />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default CallToAction;
