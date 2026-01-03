import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import '../Listing.style.scss'
import OtherListings from "../components/OtherListings/OtherListings.component";
import Smoobu from "../../../components/Smoobu/Smoobu.component";
import ImagesContainer from "../components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "../components/ImagesModal/ImagesModal.component";
import { NamSnippet } from "../../../utils/constants";
import { HouseDataType } from "../../../utils/types";
import Amenities from "../components/Amenities/Amenities.component";
import { AmenityType } from "../../../utils/types";
import { NamDataList } from "../../../utils/constants";
import { Helmet } from "react-helmet";
import { useMediaQuery } from '@react-hook/media-query';
import FixedNavigationNam from "../../../components/FixedNavigation/FixedNavigation.componentNam";
import MessageTipContainer from "../../../components/MessageTip/MessageTipContainer.component";
import { useRandomPopup } from "../../../hooks/useRandomPopup";
import { useSmoobuBookingTip } from "../../../hooks/useSmoobuBookingTip";
import ListingMarketingSection from "../../../components/ListingMarketingSection/ListingMarketingSection.component";
import SocialStatement from "../../../components/SocialStatement/SocialStatement.component";
import FeatureHighlights from "../../../components/FeatureHighlights/FeatureHighlights.component";
import PriceConfirmationSection from "../../../components/PriceConfirmationSection/PriceConfirmationSection.component";


const ListingGiulia = () => {
    const listing = "Giulia"
    const isScreenSmall = useMediaQuery('(max-width: 992px)');

    // Add random popup functionality for English listing page
    useRandomPopup({ isSpanishPage: false });

    // Show booking encouragement tip when user interacts with Smoobu widget
    useSmoobuBookingTip({ isSpanishPage: false, propertyName: 'House Giulia' });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const houseData: HouseDataType | undefined = NamDataList.find((house) => house.name === listing);
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
                <title>House Giulia - Family Retreat</title>
                <meta name="description" content="New fully equipped Bungalows with A/C and private pool located 200mts from the beautiful Playa Chiquita beach, in one of the safest and calm neighborhoods in the Caribbean. Perfect for families up to 4 people." />
                <link rel="canonical" href="https://www.reservaskalawala.com/Giulia" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/Giulia" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/GiuliaES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/Giulia" />
            </Helmet>
            <FixedNavigationNam isBlog={false} />
            {isScreenSmall && (
                <div className="button-hold fixed-bottom sticky-cta-mobile" style={{ paddingBottom: "env(safe-area-inset-bottom);" }}><Button className='btn-darker sticky-cta-button' href="#smoobuComp">Check Availability</Button></div>)}

            <Row className="subContainer">
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={{ order: 'first', span: 12 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">House Giulia</h1>
                        <h3 className="location">
                            <a href="https://maps.app.goo.gl/cT74qg6iqX35aa5t9" target="_blank" rel="noopener noreferrer">
                                Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica
                            </a>
                        </h3>
                        {/* Add marketing section after title */}
                        <ListingMarketingSection propertyKey="Giulia" isSpanish={false} />
                    </div>
                    <ImagesContainer showModal={handleShow} houseName={listing!} />
                    {/* Add social statement after images */}
                    <SocialStatement propertyKey="Giulia" isSpanish={false} />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} />
                    </div>

                    {/* Add feature highlights before description */}
                    <FeatureHighlights propertyKey="Giulia" propertyName="House Giulia" isSpanish={false} />

                    <div className="description">
                        <div className="check-times" style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px' }}>
                            <p ><strong>Check-in:</strong> 3:00 PM</p>
                            <p ><strong>Check-out:</strong> 12:00 PM (noon)</p>
                        </div>
                        <p>
                            Escape to Puerto Viejo in our home with A/C, gas kitchen, and a spacious closet. Relax on your private covered patio. Our home is located just 200 meters from the stunning Playa Chiquita beach, in one of the safest and calmest neighborhoods in the Caribbean. Explore nearby attractions like Puerto Viejo, Manzanillo, Punta Uva beach, and Arrecife from our perfect location.<br />
                        </p>
                        <p>
                            The space, completely private, has 2 A/C units, fully equipped kitchen and 2 private bathrooms with hot water. The parking space is private, for one car, and outside of the property. The house has a porch for our guests.

                            ✓ A/C ✓ kitchen ✓ wifi ✓ private porch ✓ private parking.
                            <br />
                        </p>
                        <p>
                            All of the spaces described here are private, including the fully equipped kitchen and bathrooms. You'll have everything you need to make yourself at home.
                            <br />
                        </p>
                        <p>
                            Close by you may find restaurants, supermarkets, and bike rentals. We trust our guests to follow common sense when leaving our house, that's why we have 0 check-out rules and no check-out list.
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
                    </div>

                    {/* Show OtherListings here only on desktop */}
                    {!isScreenSmall && (
                        <div className="other-listings-bottom">
                            <OtherListings listings={NamSnippet} currentListing={listing || ''} />
                        </div>
                    )}

                </Col>
                <Col id="smoobuComp" className="book col" lg={2} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                    {/* Add price and confirmation above Smoobu */}
                    <PriceConfirmationSection propertyKey="Giulia" isSpanish={false} />
                    <Smoobu homeCode={houseData!.houseCode} />
                </Col>
            </Row>

            {/* Show OtherListings here only on mobile - after the entire row */}
            {isScreenSmall && (
                <div className="other-listings-mobile">
                    <OtherListings listings={NamSnippet} currentListing={listing || ''} />
                </div>
            )}
            {show && <ImagesModal closeModal={handleClose} houseName={listing!} />}

            {/* Message Tip Container */}
            <MessageTipContainer />
        </div>
    )

}

export default ListingGiulia;
