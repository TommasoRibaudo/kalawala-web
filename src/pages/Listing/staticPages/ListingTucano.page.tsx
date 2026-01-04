import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import '../Listing.style.scss'
import OtherListings from "../components/OtherListings/OtherListings.component";
import Smoobu from "../../../components/Smoobu/Smoobu.component";
import ImagesContainer from "../components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "../components/ImagesModal/ImagesModal.component";
import { HouseDataType } from "../../../utils/types";
import { homesSnippet} from "../../../utils/constants";
import Amenities from "../components/Amenities/Amenities.component";
import { AmenityType } from "../../../utils/types";
import { houseDataList } from "../../../utils/constants";
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import { Helmet } from "react-helmet";
import { useMediaQuery } from '@react-hook/media-query';
import MessageTipContainer from "../../../components/MessageTip/MessageTipContainer.component";
import { useSmoobuBookingTip } from "../../../hooks/useSmoobuBookingTip";
import ListingMarketingSection from "../../../components/ListingMarketingSection/ListingMarketingSection.component";
import SocialStatement from "../../../components/SocialStatement/SocialStatement.component";
import FeatureHighlights from "../../../components/FeatureHighlights/FeatureHighlights.component";
import PriceConfirmationSection from "../../../components/PriceConfirmationSection/PriceConfirmationSection.component";
import { useSmoobuMobileScrollTip } from "../../../hooks/useSmoobuMobileScrollTip";


const ListingTucano = () => {
    const listing = 'Tucano'
    const isScreenSmall = useMediaQuery('(max-width: 992px)');

    const [show, setShow] = useState(false);
    
    // Show booking encouragement tip when user interacts with Smoobu widget
    useSmoobuBookingTip({ isSpanishPage: false, propertyName: 'House Tucano' });
    useSmoobuMobileScrollTip({ 
        isSpanishPage: false, 
        isScreenSmall: isScreenSmall 
    });
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
                <title>House Tucano - Like Nothing Else in Puerto Viejo</title>
                <meta name="description" content="This house offers a delightful experience in the heart of Puerto Viejo with a charming wooden apartment located above an Italian bakery. The apartment features two comfortable bedrooms, a well-equipped bathroom, a fully equipped kitchen, a lovely terrace, and two A/C units." />
                <link rel="canonical" href="https://www.reservaskalawala.com/Tucano" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/Tucano" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/TucanoES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/Tucano" />
            </Helmet>
            <FixedNavigation isBlog={false}/>
            <Row className="subContainer">
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={{ order: 'first', span: 12 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">House Tucano</h1>
                        <h3 className="location">
                            <a href="https://maps.app.goo.gl/ixZHjG7yYsMF9U2e9" target="_blank" rel="noopener noreferrer">
                                Puerto Viejo de Talamanca, Limón, Costa Rica
                            </a>
                        </h3>
                        {/* Add marketing section after title */}
                        <ListingMarketingSection propertyKey="Tucano" isSpanish={false} />
                        {isScreenSmall && (
                            <div className="button-hold sticky-cta-mobile"><Button className='btn-darker sticky-cta-button' href="#smoobuComp">Check Availability</Button></div>)}
                    </div>
                    <ImagesContainer showModal={handleShow} houseName={listing!} />
                    {/* Add social statement after images */}
                    <SocialStatement propertyKey="Tucano" isSpanish={false} />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} />
                    </div>
                   
                    {/* Add feature highlights before description */}
                    <FeatureHighlights propertyKey="Tucano" propertyName="House Tucano" isSpanish={false} />
                   
                    <div className="description">
                    <div className="check-times" style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px' }}>
                        <p ><strong>Check-in:</strong> 2:00 PM</p>
                        <p ><strong>Check-out:</strong> 11:00 AM</p>
                    </div>
                        <p>
                        This house offers a delightful experience in the heart of Puerto Viejo with a charming wooden apartment located above an Italian bakery. The apartment features two comfortable bedrooms, a well-equipped bathroom, a fully equipped kitchen, a lovely terrace, and two A/C units, ensuring a cozy stay.
                            <br />
                        </p>
                        <p>
                        These apartments provide private spaces, including the kitchen and bathroom, offering everything you need to feel at home. For stays of 5 nights or more, we provide complimentary cleaning services, and our team will coordinate a suitable time with you during your visit.
                            <br />
                        </p>
                        <p>
                        If you have any special requests, we're happy to accommodate them whenever possible, so don't hesitate to let us know. Should you need a pack-and-play crib for your stay, please inform us in advance, and we'll ensure it's set up in your room during the cleaning process.
                            <br />
                        </p>
                        <p>
                        Puerto Viejo attracts visitors from all over the globe with its breathtaking landscapes. The town is renowned for its expansive beaches bordered by tropical rainforests and features two National Parks, Manzanillo and Cahuita. The nightlife here is vibrant and lively, offering a unique experience after dark. Staying in Puerto Viejo allows you to fully immerse yourself in its unique charm.
                            <br />
                        </p>
                        <p>
                        Our house is conveniently located near a beach path that leads eventually to Cocles. On your way, you can observe a variety of wildlife and enjoy the natural coral pools. A hidden sightseeing spot is also waiting to be explored!.
                            <br />
                        </p>
                        <p>
                        Exploring Puerto Viejo and its surroundings is most convenient by renting a bike or a scooter. Additionally, there is a good public bus service available that connects you to Cahuita, Manzanillo, and Sixaola. If you prefer driving, we provide private parking. Please inform us if you have a larger pickup truck that needs extra space.
                            <br />
                        </p>
                    </div>

                    {/* Move OtherListings to bottom after description */}
                    <div className="other-listings-bottom">
                        <OtherListings listings={homesSnippet} currentListing={listing || ''} />
                    </div>

                </Col>
                <Col id="smoobuComp" className="book col" lg={2} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                    {/* Add price and confirmation above Smoobu */}
                    <PriceConfirmationSection propertyKey="Tucano" isSpanish={false} />
                    <Smoobu homeCode={houseData!.houseCode} />
                </Col>
            </Row>
            {show && <ImagesModal closeModal={handleClose} houseName={listing!} />}
            
            {/* Message Tip Container */}
            <MessageTipContainer />
        </div>
    )

}

export default ListingTucano;