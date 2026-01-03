import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import '../Listing.style.scss'
import Smoobu from "../../../components/Smoobu/Smoobu.component";
import ImagesContainer from "../components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "../components/ImagesModal/ImagesModal.component";
import { HouseDataType } from "../../../utils/types";
import { homesSnippet } from "../../../utils/constants";
import Amenities from "../components/Amenities/Amenities.component";
import { AmenityType } from "../../../utils/types";
import { houseDataList } from "../../../utils/constants";
import { Helmet } from "react-helmet";
import { useMediaQuery } from '@react-hook/media-query';
import MessageTipContainer from "../../../components/MessageTip/MessageTipContainer.component";
import { useRandomPopup } from "../../../hooks/useRandomPopup";
import { useSmoobuBookingTip } from "../../../hooks/useSmoobuBookingTip";
import OtherListingsES from "../components/OtherListings/OtherListings.componentES";
import FixedNavigationES from "../../../components/FixedNavigation/FixedNavigation.componentES";
import ListingMarketingSection from "../../../components/ListingMarketingSection/ListingMarketingSection.component";
import SocialStatement from "../../../components/SocialStatement/SocialStatement.component";
import FeatureHighlights from "../../../components/FeatureHighlights/FeatureHighlights.component";
import PriceConfirmationSection from "../../../components/PriceConfirmationSection/PriceConfirmationSection.component";


const ListingTucanoES = () => {
    const listing = 'TucanoES'
    const isScreenSmall = useMediaQuery('(max-width: 992px)');

    const [show, setShow] = useState(false);

    // Add random popup functionality for Spanish listing page
    useRandomPopup({ isSpanishPage: true });

    // Show booking encouragement tip when user interacts with Smoobu widget
    useSmoobuBookingTip({ isSpanishPage: true, propertyName: 'Casa Tucano' });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const houseData: HouseDataType | undefined = houseDataList.find((house) => house.houseLangCode === listing);
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
                <title>Casa Tucano - Como Ninguna Otra en Puerto Viejo</title>
                <meta name="description" content="Esta casa ofrece una experiencia encantadora en el corazón de Puerto Viejo con un encantador apartamento de madera ubicado encima de una panadería italiana. El apartamento cuenta con dos cómodas habitaciones, un baño bien equipado, una cocina totalmente equipada, una hermosa terraza y dos unidades de aire acondicionado." />
                <link rel="canonical" href="https://www.reservaskalawala.com/TucanoES" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/Tucano" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/TucanoES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/Tucano" />
            </Helmet>
            <FixedNavigationES isBlog={false} />
            {isScreenSmall && (
                <div className="button-hold fixed-bottom sticky-cta-mobile" style={{ paddingBottom: "env(safe-area-inset-bottom);" }}><Button className='btn-darker sticky-cta-button' href="#smoobuComp">Check Availability</Button></div>)}

            <Row className="subContainer">
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={{ order: 'first', span: 12 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">Casa Tucano</h1>
                        <h3 className="location">
                            <a href="https://maps.app.goo.gl/ixZHjG7yYsMF9U2e9" target="_blank" rel="noopener noreferrer">
                                Puerto Viejo de Talamanca, Limón, Costa Rica
                            </a>
                        </h3>
                        {/* Add marketing section after title */}
                        <ListingMarketingSection propertyKey="Tucano" isSpanish={true} />
                    </div>
                    <ImagesContainer showModal={handleShow} houseName={listing!} />
                    {/* Add social statement after images */}
                    <SocialStatement propertyKey="Tucano" isSpanish={true} />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} />
                    </div>

                    {/* Add feature highlights before description */}
                    <FeatureHighlights propertyKey="Tucano" propertyName="Casa Tucano" isSpanish={true} />

                    <div className="description">
                        <div className="check-times" style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px' }}>
                            <p><strong>Entrada:</strong> 2:00 PM</p>
                            <p><strong>Salida:</strong> 11:00 AM</p>
                        </div>
                        <p>
                            Bienvenido a Kalawala. Esta casa ofrece una experiencia encantadora en el corazón de Puerto Viejo con un encantador apartamento de madera ubicado encima de una panadería italiana. El apartamento cuenta con dos cómodas habitaciones, un baño bien equipado, una cocina totalmente equipada, una hermosa terraza y dos unidades de aire acondicionado, lo que garantiza una estancia acogedora.
                            <br />
                        </p>
                        <p>
                            Estos apartamentos brindan espacios privados, incluida la cocina y el baño, ofreciendo todo lo que necesitas para sentirte como en casa. Para estancias de 5 noches o más, brindamos servicios de limpieza de cortesía y nuestro equipo coordinará un horario adecuado con usted durante su visita.
                            <br />
                        </p>
                        <p>
                            Si tiene alguna solicitud especial, estaremos encantados de atenderla siempre que sea posible, así que no dude en hacérnoslo saber. Si necesita una cuna plegable para su estadía, infórmenos con anticipación y nos aseguraremos de que esté instalada en su habitación durante el proceso de limpieza.
                            <br />
                        </p>
                        <p>
                            Puerto Viejo atrae a visitantes de todo el mundo con sus impresionantes paisajes. La ciudad es famosa por sus extensas playas rodeadas de bosques tropicales y cuenta con dos parques nacionales, Manzanillo y Cahuita. La vida nocturna aquí es vibrante y animada, y ofrece una experiencia única al anochecer. Alojarse en Puerto Viejo te permite sumergirte de lleno en su encanto único.
                            <br />
                        </p>
                        <p>
                            Nuestra casa está convenientemente ubicada cerca de un sendero de playa que eventualmente conduce a Cocles. En el camino podrás observar una variedad de vida silvestre y disfrutar de las piscinas naturales de coral. ¡Un lugar turístico escondido también está esperando ser explorado!
                            <br />
                        </p>
                        <p>
                            Explorar Puerto Viejo y sus alrededores es más conveniente alquilando una bicicleta o un scooter. Además, hay un buen servicio de autobús público disponible que te conecta con Cahuita, Manzanillo y Sixaola. Si prefiere conducir, disponemos de aparcamiento privado. Infórmenos si tiene una camioneta más grande que necesita espacio adicional.
                            <br />
                        </p>
                    </div>

                    {/* Show OtherListings here only on desktop */}
                    {!isScreenSmall && (
                        <div className="other-listings-bottom">
                            <OtherListingsES listings={homesSnippet} currentListing={listing || ''} />
                        </div>
                    )}

                </Col>
                <Col id="smoobuComp" className="book col" lg={2} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                    {/* Add price and confirmation above Smoobu */}
                    <PriceConfirmationSection propertyKey="Tucano" isSpanish={true} />
                    <Smoobu homeCode={houseData!.houseCode} />
                </Col>
            </Row>

            {/* Show OtherListings here only on mobile - after the entire row */}
            {isScreenSmall && (
                <div className="other-listings-mobile">
                    <OtherListingsES listings={homesSnippet} currentListing={listing || ''} />
                </div>
            )}
            {show && <ImagesModal closeModal={handleClose} houseName={listing!} />}

            {/* Message Tip Container */}
            <MessageTipContainer />
        </div>
    )

}

export default ListingTucanoES;


