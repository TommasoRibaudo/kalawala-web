import React from 'react';
import './Discover.style.scss';
import { Image } from 'react-bootstrap';
import image from "../../assets/images/about/about-second-page.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faConciergeBell, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const  Discover = () => {
  return (
    <section className="section about-2 padding-0 b-light" id="about">
      
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 padding-0">
            <Image className="img-responsive" src="https://drive.google.com/thumbnail?id=1RIAdGXizO6a6cCoL8ErA881olP-9YGNW&sz=w1000"  alt="" />
          </div>
          <div className="col-md-6">
            <div className="content-block">
              <h2>Discover Puerto Viejo from the comfort of our homes.</h2>
              <p>Reservas Kalawala offers 4 remodeled homes, <b>with fully equipped, private kitchen and bathroom</b>. Each house has 2 bedrooms and <b>2 Air Conditioning units</b>.</p>
              <p>Located in the center of Puerto Viejo, all the bars and restaurants are within <b>walking distance</b>. Cocles beach can be reached by car in 2 minutes, and there are closeby bike and motorbike rentals so that also Punta Uva, Cahuita and Manzanillo are within reach, even without a car!</p>
              <p><b>Working from home?</b> We offer <b>free WIFI</b>, with a maximum speed of <b>100Mbps</b>. We stipulated two different contracts with our internet provider, so your internet connection will be shared between fewer devices, achieving less latency during meetings.</p>
              <p><b>Pet Friendly!</b> In all our spaces. Casa Rana and Casa Gecko are the perfect options for your pet, as they come with a garden. But a small house pet could comfortably stay in the other houses too!</p>
              <div className="row">
                <div className="col-md-6">
                  <div className="media">
                    <div className="pull-left">
                      <FontAwesomeIcon icon={faConciergeBell} color='#57cbcc' fontSize={"30px"}/>
                    </div>
                    <div className="media-body" style={{ verticalAlign: "middle" }}>
                      <h4 className="media-heading">Self Check-in</h4>
                      <p>Easy to follow, contactless check-in process.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media">
                    <div className="pull-left">
                      <FontAwesomeIcon icon={faCalendarCheck} color='#57cbcc' fontSize={"30px"}/>

                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">Flexible Cancellation Policy</h4>
                      <p>Full refund up to one day before check-in.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Discover;
