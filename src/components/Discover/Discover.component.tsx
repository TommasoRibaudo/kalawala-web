import React from 'react';
import { cdnImage, cdnSrcSet } from '../../utils/imageCdn';
import './Discover.style.scss';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faConciergeBell, faCalendarCheck, faCancel, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { PORTFOLIO_PROPERTY_COUNT, PORTFOLIO_BEDROOM_RANGE, PORTFOLIO_GUEST_RANGE } from '../../utils/constants';

const DISCOVER_IMAGE =
  'https://lh3.googleusercontent.com/d/1RIAdGXizO6a6cCoL8ErA881olP-9YGNW=w1000';

const Discover = () => {
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
              <p>Reservas Kalawala offers {PORTFOLIO_PROPERTY_COUNT} remodeled homes and villas, <b>each with a fully equipped private kitchen and bathroom</b>. Houses sleep {PORTFOLIO_GUEST_RANGE.min} to {PORTFOLIO_GUEST_RANGE.max} guests, with {PORTFOLIO_BEDROOM_RANGE.min} to {PORTFOLIO_BEDROOM_RANGE.max} bedrooms and <b>air conditioning throughout</b>.</p>
              <p>Our homes in the center of Puerto Viejo put you right in the heart of town, with <b>bars, restaurants and shops within walking distance</b>. Cocles beach is a 2-minute drive, and nearby bike and motorbike rentals bring Punta Uva, Cahuita and Manzanillo within reach, even without a car!</p>
              <p>Our homes in <b>Playa Chiquita</b> sit a short ride southeast of town, in a quieter, greener setting wrapped in jungle and just minutes from some of the coast's most beautiful beaches, like Punta Uva. It's an ideal base if you're after nature and calm, with the buzz of Puerto Viejo close by whenever you want it.</p>
              <p><b>Working from home?</b> We offer <b>free WIFI</b>, with a maximum speed of <b>100Mbps</b>. We stipulated two different contracts with our internet provider, so your internet connection will be shared between fewer devices, achieving less latency during meetings.</p>
              <p><b>Pet friendly:</b> Casa Rana, Casa Geco, Casa Tucano and Casa Pappagallo welcome pets. Rana and Geco are the best fit, as they have their own garden.</p>
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

export default Discover;
