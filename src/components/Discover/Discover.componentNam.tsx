import React from 'react';
import { cdnImage, cdnSrcSet } from '../../utils/imageCdn';
import './Discover.style.scss';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faConciergeBell, faCalendarCheck, faCancel, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const DISCOVER_IMAGE =
  'https://lh3.googleusercontent.com/d/1eY5XspXUIP7mqOkMSRYdeHHr5SKEoYk4=w1000';

const DiscoverNam = () => {
  return (
    <section className="section about-2 padding-0 b-light" id="about">

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 padding-0">
            <Image className="img-fluid" src={cdnImage(DISCOVER_IMAGE, 960)} srcSet={cdnSrcSet(DISCOVER_IMAGE)}
              sizes="(max-width: 768px) 100vw, 50vw" width={1000} height={667}
              loading="lazy" decoding="async" alt="" />
          </div>
          <div className="col-md-6">
            <div className="content-block">
              <h2>Discover Puerto Viejo from the comfort of our homes.</h2>
              <p>At Casitas Namaitami, you’ll find two charming private retreats for couples and a spacious house for up to 4 guests all with a <b>fully equipped private kitchen and bathroom</b>. 
              Each home features a cozy bedroom and <b>air conditioning</b> for your comfort.</p> 
              <p>Nestled in the heart of Playa Chiquita, we’re just minutes from the stunning beaches of Punta Uva and Cocles, and only a <b>short stroll to Playa Chiquita</b> itself. Bike rentals are close by, making it easy to explore the coastline, no car needed!</p>
               <p><b>Need to work remotely?</b> Stay connected with our <b>free high-speed Wi-Fi</b>, with two separate internet contracts, our network is shared among fewer devices, giving you smoother video calls and faster browsing, as well as stability in case one of them fails.</p> 
               <p><b>Driving an electric car?</b> We’ve got you covered with charging outlets right at your parking spot. Each house has its own private space for one vehicle. While the parking is open-air, our neighborhood is quiet, safe, and wonderfully peaceful.</p>
              <div className="row">
                <div className="col-md-6">
                  <div className="media d-flex align-items-start">
                    <div className="pull-left flex-shrink-0">
                      <FontAwesomeIcon icon={faConciergeBell} color='#57cbcc' fontSize={"30px"} />
                    </div>
                    <div className="media-body flex-grow-1" style={{ verticalAlign: "middle" }}>
                      <h3 className="media-heading mt-0 mb-1">Self Check-in</h3>
                      <p>Easy to follow, contactless check-in process.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media d-flex align-items-start">
                    <div className="pull-left flex-shrink-0">
                      <FontAwesomeIcon icon={faDollarSign} color='#57cbcc' fontSize={"30px"} />

                    </div>
                    <div className="media-body flex-grow-1">
                      <h3 className="media-heading mt-0 mb-1">Cheapest Prices</h3>
                      <p>And extra discounts when booking directly on the website.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="media d-flex align-items-start">
                    <div className="pull-left flex-shrink-0">
                      <FontAwesomeIcon icon={faCancel} color='#57cbcc' fontSize={"30px"} />
                    </div>
                    <div className="media-body flex-grow-1" style={{ verticalAlign: "middle" }}>
                      <h3 className="media-heading mt-0 mb-1">Non Refundable Discount</h3>
                      <p>Choose the non-refundable rate when you book to get an extra 10% discount, but you won't be eligible for a cancellation refund.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media d-flex align-items-start">
                    <div className="pull-left flex-shrink-0">
                      <FontAwesomeIcon icon={faCalendarCheck} color='#57cbcc' fontSize={"30px"} />

                    </div>
                    <div className="media-body flex-grow-1">
                      <h3 className="media-heading mt-0 mb-1">Flexible Cancellation Policy</h3>
                      <p>Full refund up to one day before check-in on any reservation booked at the standard rate.</p>
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
