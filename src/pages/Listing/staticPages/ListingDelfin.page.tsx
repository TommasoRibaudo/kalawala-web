import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import '../Listing.style.scss'
import OtherListings from "../components/OtherListings/OtherListings.component";
import Smoobu from "../../../components/Smoobu/Smoobu.component";
import ImagesContainer from "../components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "../components/ImagesModal/ImagesModal.component";
import { HouseDataType } from "../../../utils/types";
import { homesSnippet } from "../../../utils/constants";
import Amenities from "../components/Amenities/Amenities.component";
import { AmenityType } from "../../../utils/types";
import { houseDataList } from "../../../utils/constants";
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import { Helmet } from "react-helmet";
import { useMediaQuery } from '@react-hook/media-query';
import MessageTipContainer from "../../../components/MessageTip/MessageTipContainer.component";
import { useRandomPopup } from "../../../hooks/useRandomPopup";
import { useSmoobuBookingTip } from "../../../hooks/useSmoobuBookingTip";
import ListingMarketingSection from "../../../components/ListingMarketingSection/ListingMarketingSection.component";
import SocialStatement from "../../../components/SocialStatement/SocialStatement.component";
import FeatureHighlights from "../../../components/FeatureHighlights/FeatureHighlights.component";
import PriceConfirmationSection from "../../../components/PriceConfirmationSection/PriceConfirmationSection.component";


const ListingDelfin = () => {
    //const { listing } = useParams()
    const listing = 'Delfin'
    const isScreenSmall = useMediaQuery('(max-width: 992px)');

    const [show, setShow] = useState(false);

    // Add random popup functionality for English listing page
    useRandomPopup({ isSpanishPage: false });

    // Show booking encouragement tip when user interacts with Smoobu widget
    useSmoobuBookingTip({ isSpanishPage: false, propertyName: 'House Delfin' });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const houseData: HouseDataType | undefined = houseDataList.find((house) => house.name === listing);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, [])
    //const description = houseData?.description.split('<br/>');
    //const neighborhood = houseData?.neighborhood.split('<br/>');
    return (
        <div className={`listingContainer ${show && 'modal-open'}`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>House Delfin - Puerto Viejo Vacation Home Rental</title>
                <meta name="description" content="Welcome to Reservas Kalawala. Located in the heart of town, this house accommodates up to 6 guests with fully equipped kitchen, bathroom, 2 A/C units, and private parking." />
                <link rel="canonical" href="https://www.reservaskalawala.com/Delfin" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/Delfin" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/DelfinES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/Delfin" />
            </Helmet>
            <FixedNavigation isBlog={false} />
            {isScreenSmall && (
                <div className="button-hold fixed-bottom sticky-cta-mobile" style={{ paddingBottom: "env(safe-area-inset-bottom);" }}><Button className='btn-darker sticky-cta-button' href="#smoobuComp">Check Availability</Button></div>)}

            <Row className="subContainer">
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={{ order: 'first', span: 12 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">House Delfines</h1>
                        <h3 className="location">
                            <a href="https://maps.app.goo.gl/ixZHjG7yYsMF9U2e9" target="_blank" rel="noopener noreferrer">
                                Puerto Viejo de Talamanca, Limón, Costa Rica
                            </a>
                        </h3>
                        {/* Add marketing section after title */}
                        <ListingMarketingSection propertyKey="Delfin" isSpanish={false} />

                    </div>
                    <ImagesContainer showModal={handleShow} houseName={listing!} />
                    {/* Add social statement after images */}
                    <SocialStatement propertyKey="Delfin" isSpanish={false} />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} />
                    </div>

                    {/* Add feature highlights before description */}
                    <FeatureHighlights propertyKey="Delfin" propertyName="House Delfin" isSpanish={false} />

                    <div className="description">
                        <div className="check-times" style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px' }}>
                            <p ><strong>Check-in:</strong> 3:00 PM</p>
                            <p ><strong>Check-out:</strong> 12:00 PM (noon)</p>
                        </div>
                        <p>
                            Welcome to Reservas Kalawala. Located in the heart of town, this house accommodates up to 6 guests with fully equipped kitchen, bathroom, 2 A/C units (not in kitchen or living room), and private parking. Our prime location offers easy access to both the town center and the most beautiful beaches that Puerto Viejo has to offer.
                            <br />
                        </p>
                        <p>
                            All of the spaces described here are private, including the fully equipped kitchen and bathroom. You'll have everything you need to make yourself at home.
                            <br />
                        </p>
                        <p>
                            We offer flexible check-out with lockbox key drop-off for your convenience.
                            <br />
                        </p>
                        <p>
                            Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.
                            <br />
                        </p>
                        <p>
                            Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.
                            <br />
                        </p>
                        <p>
                            The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!
                            <br />
                        </p>
                        <p>
                            Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space.
                            <br />
                        </p>
                    </div>

                    {/* Show OtherListings here only on desktop */}
                    {!isScreenSmall && (
                        <div className="other-listings-bottom">
                            <OtherListings listings={homesSnippet} currentListing={listing || ''} />
                        </div>
                    )}

                </Col>
                <Col id="smoobuComp" className="book col" lg={2} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                    {/* Add price and confirmation above Smoobu */}
                    <PriceConfirmationSection propertyKey="Delfin" isSpanish={false} />
                    <Smoobu homeCode={houseData!.houseCode} />
                </Col>
            </Row>

            {/* Show OtherListings here only on mobile - after the entire row */}
            {isScreenSmall && (
                <div className="other-listings-mobile">
                    <OtherListings listings={homesSnippet} currentListing={listing || ''} />
                </div>
            )}
            {show && <ImagesModal closeModal={handleClose} houseName={listing!} />}

            {/* Message Tip Container */}
            <MessageTipContainer />
        </div>
    )

}

export default ListingDelfin;