import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import '../Listing.style.scss'
import OtherListings from "../components/OtherListings/OtherListings.component";
import Smoobu from "../../../components/Smoobu/Smoobu.component";
import ImagesContainer from "../components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "../components/ImagesModal/ImagesModal.component";
import { useParams } from "react-router-dom";
import { NamSnippet } from "../../../utils/constants";
import { HouseDataType, ListingType } from "../../../utils/types";
import Amenities from "../components/Amenities/Amenities.component";
import { AmenityType } from "../../../utils/types";
import { NamDataList } from "../../../utils/constants";
import { Helmet } from "react-helmet";
import { useMediaQuery } from '@react-hook/media-query';
import FixedNavigationNam from "../../../components/FixedNavigation/FixedNavigation.componentNam";


const ListingPlumeria = () => {
    const listing = "Plumeria"
    const isScreenSmall = useMediaQuery('(max-width: 992px)');
    const amenities: AmenityType[] = [
        { icon: 'ac', name: '1 A/C Units' }
    ]

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
                <title>House Plumeria - Couples Retreat with Private Pool</title>
                <meta name="description" content="New fully equipped Bungalows with A/C and private pool located 200mts from the beautiful Playa Chiquita beach, in one of the safest and calm neighborhoods in the Caribbean. A few minutes from Puerto Viejo and Manzanillo, we are perfectly located to visit Punta Uva beach and Arrecife." />
                <link rel="canonical" href="https://www.reservaskalawala.com/Plumeria" />
            </Helmet>
            <FixedNavigationNam isBlog={false} />
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 2 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } : { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <OtherListings listings={NamSnippet} currentListing={listing || ''} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 7 }} md={windowWidth <= 991 ? { order: 'first', span: 12 } : { order: 'first', span: 8 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">House Plumeria</h1>
                        <h3 className="location">Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica</h3>
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
                            New fully equipped Bungalows with A/C and private pool located 200mts from the beautiful Playa Chiquita beach, in one of the safest and calm neighborhoods in the Caribbean. A few minutes from Puerto Viejo and Manzanillo, we are perfectly located to visit Punta Uva beach and Arrecife.
                            <br />
                        </p>
                        <p>
                            The space, completely private, has A/C, fully equipped kitchen, a private bathroom with hot water. The parking space is private, spacious and enclosed. Every house has a small porch for our guests.
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

                </Col>
                <Col id="smoobuComp" className="book col" lg={3} md={windowWidth <= 991 ? { span: 12 } : { order: 'first', span: 4 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                    <Smoobu homeCode={houseData!.houseCode} />
                </Col>
            </Row>
            {show && <ImagesModal closeModal={handleClose} houseName={listing!} />}
        </div>
    )

}

export default ListingPlumeria;