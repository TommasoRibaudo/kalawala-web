import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import '../Listing.style.scss'
import OtherListings from "../components/OtherListings/OtherListings.component";
import Smoobu from "../../../components/Smoobu/Smoobu.component";
import ImagesContainer from "../components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "../components/ImagesModal/ImagesModal.component";
import { HouseDataType } from "../../../utils/types";
import {homesSnippet} from "../../../utils/constants";
import Amenities from "../components/Amenities/Amenities.component";
import { AmenityType } from "../../../utils/types";
import { houseDataList } from "../../../utils/constants";
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import {Helmet} from "react-helmet";
import { useMediaQuery } from '@react-hook/media-query';
import MessageTipContainer from "../../../components/MessageTip/MessageTipContainer.component";
import { useRandomPopup } from "../../../hooks/useRandomPopup";
import { useSmoobuBookingTip } from "../../../hooks/useSmoobuBookingTip";
import ListingMarketingSection from "../../../components/ListingMarketingSection/ListingMarketingSection.component";
import SocialStatement from "../../../components/SocialStatement/SocialStatement.component";
import FeatureHighlights from "../../../components/FeatureHighlights/FeatureHighlights.component";
import PriceConfirmationSection from "../../../components/PriceConfirmationSection/PriceConfirmationSection.component";


const ListingRana = () => {
    //const { listing } = useParams()
    const listing = 'Rana'
    const isScreenSmall = useMediaQuery('(max-width: 992px)');

    const [show, setShow] = useState(false);
    
    // Add random popup functionality for English listing page
    useRandomPopup({ isSpanishPage: false });
    
    // Show booking encouragement tip when user interacts with Smoobu widget
    useSmoobuBookingTip({ isSpanishPage: false, propertyName: 'House Rana' });

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
                <title>House Rana - Puerto Viejo Vacation Home Rental</title>
                <meta name="description" content="Nestled in the heart of town, this charming house comfortably accommodates up to 5 guests. It boasts a fully equipped kitchen, a bathroom, two A/C units, and a private parking space." />
                <link rel="canonical" href="https://www.reservaskalawala.com/Rana" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/Rana" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/RanaES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/Rana" />
            </Helmet>
            <FixedNavigation isBlog={false}/>
            <Row className="subContainer">
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={{ order: 'first', span: 12 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">House Rana</h1>
                        <h3 className="location">
                            <a href="https://maps.app.goo.gl/ixZHjG7yYsMF9U2e9" target="_blank" rel="noopener noreferrer">
                                Puerto Viejo de Talamanca, Limón, Costa Rica
                            </a>
                        </h3>
                        {/* Add marketing section after title */}
                        <ListingMarketingSection propertyKey="Rana" isSpanish={false} />
                        {isScreenSmall && (
                            <div className="button-hold"><Button className='btn-darker' href="#smoobuComp">Book Online Now!</Button></div>)}
                    
                    </div>
                    <ImagesContainer showModal={handleShow} houseName={listing!} />
                    {/* Add social statement after images */}
                    <SocialStatement propertyKey="Rana" isSpanish={false} />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} />
                    </div>
                    
                    {/* Add feature highlights before description */}
                    <FeatureHighlights propertyKey="Rana" propertyName="House Rana" isSpanish={false} />
                    
                    <div className="description">
                    <div className="check-times" style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px' }}>
                        <p ><strong>Check-in:</strong> 2:00 PM</p>
                        <p ><strong>Check-out:</strong> 11:00 AM</p>
                    </div>
                        <p>
                        Nestled in the heart of town, this charming house comfortably accommodates up to 5 guests. It boasts a fully equipped kitchen, a bathroom, two A/C units, and a private parking space. Our prime location ensures easy access to both the town center and the beaches of Puerto Viejo.
                            <br />
                        </p>
                        <p>
                        The house offers complete privacy, with all described spaces, including the kitchen and bathroom, exclusively for your use. You'll have all the amenities needed to feel at home.
                            <br />
                        </p>
                        <p>
                        You'll find most shops and restaurants within a short walking distance. Additionally, a nearby jungle path along the ocean leads to natural coral pools and Cocles.
                            <br />
                        </p>
                        <p>
                        Have a special request? We are happy to accommodate if possible. Please don't hesitate to let us know.
                            <br />
                        </p>
                        <p>
                        Puerto Viejo is a well known destination for tourists from around the globe. The town features beautiful beaches bordered by lush tropical rainforest and is home to two National Parks, Manzanillo and Cahuita. At night, Puerto Viejo transforms with a vibrant nightlife scene. Staying here allows you to fully experience everything that makes Puerto Viejo special.
                            <br />
                        </p>
                        <p>
                        The house is conveniently situated near a beach path that eventually leads to Cocles. Along the path, you'll have the chance to observe diverse wildlife and enjoy natural coral pools. There's even a hidden sightseeing spot to discover!
                            <br />
                        </p>
                        <p>
                        Getting around Puerto Viejo and its vicinity is best done by renting a bike or an electric bike. Additionally, the public bus service is available, connecting you to Cahuita, Manzanillo, and Sixaola. If you prefer driving, we can accommodate cars and provide private parking. Please inform us if you have a larger pickup truck that requires extra space.
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
                    <PriceConfirmationSection propertyKey="Rana" isSpanish={false} />
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

export default ListingRana;