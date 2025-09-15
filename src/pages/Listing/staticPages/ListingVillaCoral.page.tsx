import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import '../Listing.style.scss'
import OtherListings from "../components/OtherListings/OtherListings.component";
import Smoobu from "../../../components/Smoobu/Smoobu.component";
import ImagesContainer from "../components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "../components/ImagesModal/ImagesModal.component";
import { useParams } from "react-router-dom";
import { homesSnippet, VillaSnippet } from "../../../utils/constants";
import { HouseDataType, ListingType } from "../../../utils/types";
import Amenities from "../components/Amenities/Amenities.component";
import { AmenityType } from "../../../utils/types";
import { VillasDataList } from "../../../utils/constants";
import { Helmet } from "react-helmet";
import { useMediaQuery } from '@react-hook/media-query';
import FixedNavigationRib from "../../../components/FixedNavigation/FixedNavigation.componentRIB";


const ListingVillaCoral = () => {
    const listing = 'Villa Coral'
    const isScreenSmall = useMediaQuery('(max-width: 992px)');
    const amenities: AmenityType[] = [
        { icon: 'ac', name: '2 A/C Units' },
        { icon: 'ac', name: '2 A/C Units' },
        { icon: 'ac', name: '2 A/C Units' }
    ]

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
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 2 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } : { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <OtherListings listings={VillaSnippet} currentListing={listing || ''} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 7 }} md={windowWidth <= 991 ? { order: 'first', span: 12 } : { order: 'first', span: 8 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">Villa Coral</h1>
                        <h3 className="location">
                            <a href="https://maps.app.goo.gl/cJa27cXoXunmuNkf7" target="_blank" rel="noopener noreferrer">
                                Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica
                            </a>
                        </h3>
                        {isScreenSmall && (
                            <div className="button-hold"><Button className='btn-darker' href="#smoobuComp">Book Online Now!</Button></div>)}
                    </div>
                    <ImagesContainer showModal={handleShow} houseName={listing!} />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} />
                    </div>
                    
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

                </Col>
                <Col id="smoobuComp" className="book col" lg={3} md={windowWidth <= 991 ? { span: 12 } : { order: 'first', span: 4 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                    <Smoobu homeCode={houseData!.houseCode} />
                </Col>
            </Row>
            {show && <ImagesModal closeModal={handleClose} houseName={listing!} />}
        </div>
    )

}

export default ListingVillaCoral;