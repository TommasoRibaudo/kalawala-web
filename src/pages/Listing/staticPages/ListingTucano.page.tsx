import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import '../Listing.style.scss'
import OtherListings from "../components/OtherListings/OtherListings.component";
import Smoobu from "../../../components/Smoobu/Smoobu.component";
import ImagesContainer from "../components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "../components/ImagesModal/ImagesModal.component";
import { useParams } from "react-router-dom";
import { HouseDataType, ListingType } from "../../../utils/types";
import { homesSnippet} from "../../../utils/constants";
import Amenities from "../components/Amenities/Amenities.component";
import { AmenityType } from "../../../utils/types";
import { houseDataList } from "../../../utils/constants";
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import { Helmet } from "react-helmet";
import { useMediaQuery } from '@react-hook/media-query';


const ListingTucano = () => {
    const listing = 'Tucano'
    const isScreenSmall = useMediaQuery('(max-width: 992px)');

    const amenities: AmenityType[] = [
        { icon: 'ac', name: '2 A/C Units' },
        { icon: 'ac', name: '2 A/C Units' },
        { icon: 'ac', name: '2 A/C Units' }
    ]

    const [show, setShow] = useState(false);

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
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 2 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } :  { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <OtherListings listings={homesSnippet} currentListing={listing || ''} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 7 }} md={windowWidth <= 991 ?{  order: 'first', span: 12 } : { order: 'first', span: 8 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">House Tucano</h1>
                        <h3 className="location">
                            <a href="https://maps.app.goo.gl/ixZHjG7yYsMF9U2e9" target="_blank" rel="noopener noreferrer">
                                Puerto Viejo de Talamanca, Limón, Costa Rica
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

                </Col>
                <Col id="smoobuComp" className="book col" lg={3} md={windowWidth <= 991 ?{ span: 12 } : { order: 'first', span: 4 }} sm={{  span: 12 }} xs={{ span: 12 }}>
                    <Smoobu homeCode={houseData!.houseCode} />
                </Col>
            </Row>
            {show && <ImagesModal closeModal={handleClose} houseName={listing!} />}
        </div>
    )

}

export default ListingTucano;