import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import '../Listing.style.scss'
import OtherListings from "../components/OtherListings/OtherListings.component";
import Smoobu from "../../../components/Smoobu/Smoobu.component";
import ImagesContainer from "../components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "../components/ImagesModal/ImagesModal.component";
import { VillaSnippet } from "../../../utils/constants";
import { HouseDataType } from "../../../utils/types";
import Amenities from "../components/Amenities/Amenities.component";
import { AmenityType } from "../../../utils/types";
import { VillasDataList } from "../../../utils/constants";
import { Helmet } from "react-helmet";
import { useMediaQuery } from '@react-hook/media-query';
import FixedNavigationRib from "../../../components/FixedNavigation/FixedNavigation.componentRIB";
import MessageTipContainer from "../../../components/MessageTip/MessageTipContainer.component";
import { useSmoobuBookingTip } from "../../../hooks/useSmoobuBookingTip";
import ListingMarketingSection from "../../../components/ListingMarketingSection/ListingMarketingSection.component";
import SocialStatement from "../../../components/SocialStatement/SocialStatement.component";
import FeatureHighlights from "../../../components/FeatureHighlights/FeatureHighlights.component";
import PriceConfirmationSection from "../../../components/PriceConfirmationSection/PriceConfirmationSection.component";
import { useSmoobuMobileScrollTip } from "../../../hooks/useSmoobuMobileScrollTip";


const ListingVillaCoral = () => {
    const listing = 'Villa Coral'
    const isScreenSmall = useMediaQuery('(max-width: 992px)');
    // Show booking encouragement tip when user interacts with Smoobu widget
    useSmoobuBookingTip({ isSpanishPage: false, propertyName: 'Villa Coral' });
    useSmoobuMobileScrollTip({ 
        isSpanishPage: false, 
        isScreenSmall: isScreenSmall 
    });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const houseData: HouseDataType | undefined = VillasDataList.find((house) => house.name === listing);
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
                <title>Villa Coral - Home with private pool in Playa Chiquita</title>
                <meta name="description" content="Discover the perfect retreat in Playa Chiquita, Puerto Viejo. Our newly built luxury villa offers an ideal vacation experience, combining comfort and convenience in a serene tropical setting." />
                <link rel="canonical" href="https://www.reservaskalawala.com/VillaCoral" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/VillaCoral" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/VillaCoralES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/VillaCoral" />
            </Helmet>
            <FixedNavigationRib isBlog={false} />
            {isScreenSmall && (
                <div className="button-hold fixed-bottom sticky-cta-mobile" style={{ paddingBottom: "env(safe-area-inset-bottom);" }}><Button className='btn-darker sticky-cta-button' href="#smoobuComp">Check Availability</Button></div>)}

            <Row className="subContainer">
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={{ order: 'first', span: 12 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">Villa Coral</h1>
                        <h3 className="location">
                            <a href="https://maps.app.goo.gl/cJa27cXoXunmuNkf7" target="_blank" rel="noopener noreferrer">
                                Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica
                            </a>
                        </h3>
                        {/* Add marketing section after title */}
                        <ListingMarketingSection propertyKey="VillaCoral" isSpanish={false} />
                    </div>
                    <ImagesContainer showModal={handleShow} houseName={listing!} />
                    {/* Add social statement after images */}
                    <SocialStatement propertyKey="VillaCoral" isSpanish={false} />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} />
                    </div>

                    {/* Add feature highlights before description */}
                    <FeatureHighlights propertyKey="VillaCoral" propertyName="Villa Coral" isSpanish={false} />

                    <div className="description">
                        <div className="check-times" style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px' }}>
                            <p ><strong>Check-in:</strong> 3:00 PM</p>
                            <p ><strong>Check-out:</strong> 12:00 PM (noon)</p>
                        </div>
                        <p>
                            Discover the perfect retreat in Playa Chiquita, Puerto Viejo. Our newly built luxury villa offers an ideal vacation experience, combining comfort and convenience in a serene tropical setting.
                            <br />
                        </p>
                        <p>
                            Stay connected with high-speed internet up to 100Mbps and take advantage of the dedicated workspace if you need to attend to tasks during your visit.
                            <br />
                        </p>
                        <p>
                            The villa, boasting a private pool, kitchen and bathroom, has been decorated by Puerto Rican Interior designer Lourdes Menéndez
                            <br />
                        </p>
                        <p>
                            Relax and unwind in your own private paradise with a pristine pool just for you. The villa features a spacious main bedroom and living room, both equipped with air conditioning to escape the heat.
                        </p>
                        <p>
                            Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.
                            <br />
                        </p>
                        <p>
                            If you require a pack- and - play crib during your stay, please inform us ahead of time. We'll make sure to set it up in your room during our cleaning process.
                            <br />
                        </p>
                        <p>
                            Explore the beauty of Playa Chiquita, Punta Uva and the vibrant culture of Puerto Viejo, all while having a comfortable home base to return to. Make the most of your Costa Rican getaway with this inviting villa as your accommodation.
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
                            <OtherListings listings={VillaSnippet} currentListing={listing || ''} />
                        </div>
                    )}

                </Col>
                <Col id="smoobuComp" className="book col" lg={2} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                    {/* Add price and confirmation above Smoobu */}
                    <PriceConfirmationSection propertyKey="VillaCoral" isSpanish={false} />
                    <Smoobu homeCode={houseData!.houseCode} />
                </Col>
            </Row>

            {/* Show OtherListings here only on mobile - after the entire row */}
            {isScreenSmall && (
                <div className="other-listings-mobile">
                    <OtherListings listings={VillaSnippet} currentListing={listing || ''} />
                </div>
            )}
            {show && <ImagesModal closeModal={handleClose} houseName={listing!} />}

            {/* Message Tip Container */}
            <MessageTipContainer />
        </div>
    )

}

export default ListingVillaCoral;
