import React from 'react';
import './Discover.style.scss';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faConciergeBell, faCalendarCheck, faDollarSign, faCancel } from '@fortawesome/free-solid-svg-icons';

const DiscoverRIB = () => {
  return (
    <section className="section about-2 padding-0 b-light" id="about">

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 padding-0">
            <Image className="img-responsive" src="https://drive.google.com/thumbnail?id=13FO4GX8mxrPWVvYxgxZwLSoX562YeZ6o&sz=w1000" alt="" />
          </div>
          <div className="col-md-6">
            <div className="content-block">
              <h2>Luxurious Villas with Private Pool Just 2 Minutes from Punta Uva</h2>
              <p>Explore the Caribbean coast comfortably from our villas in Playa Chiquita, Puerto Viejo. Each house features a fully equipped private kitchen and bathroom. With one bedroom and two air conditioning units, you'll have everything you need for a relaxing stay.</p>
              <p>Surrounded by nature, each villa offers a private pool exclusively for your use. Punta Uva Beach is just a 2-minute drive away, and we can help you arrange scooter or ATV rentals to easily explore Cocles, Cahuita, and Manzanillo—even without a car!</p>
              <p>Working from home? We offer free Wi-Fi and Ethernet connections with speeds up to 100 Mbps. We have two different internet sources, so we can switch between them in case of a service interruption.</p>
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

export default DiscoverRIB;
