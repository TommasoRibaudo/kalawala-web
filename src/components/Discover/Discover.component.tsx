import React from 'react';
import { cdnImage, cdnSrcSet } from '../../utils/imageCdn';
import './Discover.style.scss';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faConciergeBell, faCalendarCheck, faCancel, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { useLocale } from '../../i18n';
import { discoverContent } from '../../i18n/content/discover';

const DISCOVER_IMAGE =
  'https://lh3.googleusercontent.com/d/1RIAdGXizO6a6cCoL8ErA881olP-9YGNW=w1000';

const Discover = () => {
  const content = discoverContent(useLocale());

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
              <h2>{content.heading}</h2>
              {content.paragraphs.map((paragraph, i) => (
                // Index keys are safe here: the list is a fixed, ordered block
                // of prose that is never reordered, filtered or appended to.
                <p key={i}>{paragraph}</p>
              ))}
              <div className="row">
                <div className="col-md-6">
                  <div className="media d-flex align-items-start">
                    <div className="pull-left flex-shrink-0">
                      <FontAwesomeIcon icon={faConciergeBell} color='#57cbcc' fontSize={"30px"} />
                    </div>
                    <div className="media-body flex-grow-1" style={{ verticalAlign: "middle" }}>
                      <h3 className="media-heading mt-0 mb-1">{content.features.selfCheckIn.heading}</h3>
                      <p>{content.features.selfCheckIn.text}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media d-flex align-items-start">
                    <div className="pull-left flex-shrink-0">
                      <FontAwesomeIcon icon={faDollarSign} color='#57cbcc' fontSize={"30px"} />

                    </div>
                    <div className="media-body flex-grow-1">
                      <h3 className="media-heading mt-0 mb-1">{content.features.cheapestPrices.heading}</h3>
                      <p>{content.features.cheapestPrices.text}</p>
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
                      <h3 className="media-heading mt-0 mb-1">{content.features.nonRefundable.heading}</h3>
                      <p>{content.features.nonRefundable.text}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media d-flex align-items-start">
                    <div className="pull-left flex-shrink-0">
                      <FontAwesomeIcon icon={faCalendarCheck} color='#57cbcc' fontSize={"30px"} />

                    </div>
                    <div className="media-body flex-grow-1">
                      <h3 className="media-heading mt-0 mb-1">{content.features.flexibleCancellation.heading}</h3>
                      <p>{content.features.flexibleCancellation.text}</p>
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
