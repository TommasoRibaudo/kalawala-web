import React from 'react';
import './Discover.style.scss';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faConciergeBell, faCalendarCheck, faCancel, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const DiscoverNam = () => {
  return (
    <section className="section about-2 padding-0 b-light" id="about">

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 padding-0">
            <Image className="img-responsive" src="https://drive.google.com/thumbnail?id=1eY5XspXUIP7mqOkMSRYdeHHr5SKEoYk4&sz=w1000" alt="" />
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
                      <FontAwesomeIcon icon={faConciergeBell} color='#57cbcc' fontSize={"30px"} />
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
                      <FontAwesomeIcon icon={faDollarSign} color='#57cbcc' fontSize={"30px"} />

                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">Cheapest Prices</h4>
                      <p>And extra discounts when booking directly on the website.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="media">
                    <div className="pull-left">
                      <FontAwesomeIcon icon={faCancel} color='#57cbcc' fontSize={"30px"} />
                    </div>
                    <div className="media-body" style={{ verticalAlign: "middle" }}>
                      <h4 className="media-heading">Non Refundable Discount</h4>
                      <p>Include discount code #norefundallowed at checkout to get an extra 10% discount, but you won't be eligible for a cancellation refund.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media">
                    <div className="pull-left">
                      <FontAwesomeIcon icon={faCalendarCheck} color='#57cbcc' fontSize={"30px"} />

                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">Flexible Cancellation Policy</h4>
                      <p>Full refund up to one day before check-in, for any reservation that does not include the #norefundallowed discount.</p>
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

export default DiscoverNam;
