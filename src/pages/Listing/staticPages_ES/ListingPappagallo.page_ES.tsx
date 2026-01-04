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
import { useSmoobuBookingTip } from "../../../hooks/useSmoobuBookingTip";
import OtherListingsES from "../components/OtherListings/OtherListings.componentES";
import FixedNavigationES from "../../../components/FixedNavigation/FixedNavigation.componentES";
import ListingMarketingSection from "../../../components/ListingMarketingSection/ListingMarketingSection.component";
import SocialStatement from "../../../components/SocialStatement/SocialStatement.component";
import FeatureHighlights from "../../../components/FeatureHighlights/FeatureHighlights.component";
import PriceConfirmationSection from "../../../components/PriceConfirmationSection/PriceConfirmationSection.component";
import { useSmoobuMobileScrollTip } from "../../../hooks/useSmoobuMobileScrollTip";


const ListingPappagalloES = () => {
    const listing = 'PappagalloES'
    const isScreenSmall = useMediaQuery('(max-width: 992px)');


    const [show, setShow] = useState(false);
    // Show booking encouragement tip when user interacts with Smoobu widget
    useSmoobuBookingTip({ isSpanishPage: true, propertyName: 'Casa Pappagallo' });
    useSmoobuMobileScrollTip({
        isSpanishPage: true,
        isScreenSmall: isScreenSmall
    });
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
                <title>Casa Pappagallo - Casa Totalmente Equipada en Puerto Viejo</title>
                <meta name="description" content="Bienvenido a Kalawala, un complejo encantador de dos apartamentos ubicado en el corazón de Puerto Viejo. Cada apartamento está construido completamente de madera y está situado encima de una deliciosa panadería italiana y están equipados con todo lo que necesitas para una estancia cómoda." />
                <link rel="canonical" href="https://www.reservaskalawala.com/PappagalloES" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/Pappagallo" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/PappagalloES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/Pappagallo" />
            </Helmet>
            <FixedNavigationES isBlog={false} />
            {isScreenSmall && (
                <div className="button-hold fixed-bottom sticky-cta-mobile" style={{ paddingBottom: "env(safe-area-inset-bottom);" }}><Button className='btn-darker sticky-cta-button' href="#smoobuComp">VER DISPONIBILIDAD</Button></div>)}

            <Row className="subContainer">
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={{ order: 'first', span: 12 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">Casa Pappagallo</h1>
                        <h3 className="location">
                            <a href="https://maps.app.goo.gl/ixZHjG7yYsMF9U2e9" target="_blank" rel="noopener noreferrer">
                                Puerto Viejo de Talamanca, Limón, Costa Rica
                            </a>
                        </h3>
                        {/* Add marketing section after title */}
                        <ListingMarketingSection propertyKey="Pappagallo" isSpanish={true} />
                    </div>
                    <ImagesContainer showModal={handleShow} houseName={listing!} />
                    {/* Add social statement after images */}
                    <SocialStatement propertyKey="Pappagallo" isSpanish={true} />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} />
                    </div>

                    {/* Add feature highlights before description */}
                    <FeatureHighlights propertyKey="Pappagallo" propertyName="Casa Pappagallo" isSpanish={true} />
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
                            Todos los espacios aquí descritos son privados, incluyendo la cocina y el baño totalmente equipados. Tendrás todo lo que necesitas para sentirte como en casa.
                            <br />
                        </p>
                        <p>
                            Ofrecemos el servicio de limpieza para reservas de 5 noches o más. Nuestro equipo se contactará contigo durante tu estadía para coordinar una hora conveniente para la limpieza.
                            <br />
                        </p>
                        <p>
                            ¿Tienes alguna petición específica? Nos encantaría complacerla lo mejor que podamos. Por favor, no dudes en hacérnoslo saber.
                            <br />
                        </p>
                        <p>
                            Si requieres de una cuna durante tu estadía, háznoslo saber en tu reservación. Nos encargaremos de prepararla en la habitación antes de tu llegada.
                            <br />
                        </p>
                        <p>
                            Puerto Viejo es un popular destino para los turistas de todo el mundo, gracias a sus espectaculares alrededores. El pueblo cuenta con inmensas playas rodeadas por el bosque tropical lluvioso, además de dos Parques Nacionales (Manzanillo y Cahuita). De noche, el pueblo cobra vida con una vibrante y activa escena nocturna. Cuando te hospedas aquí, serás capaz de adentrarte en todo lo que hace a Puerto Viejo único.
                            <br />
                        </p>
                        <p>
                            La casa está localizada cerca del acceso a la playa que eventualmente lleva a la playa Cocles. A lo largo del camino tendrás la oportunidad de avistar una variedad de animales y admirar las piscinas naturales que se forman en el coral. ¡Incluso hay un mirador oculto esperando a que lo descubras!
                            <br />
                        </p>
                        <p>
                            Moverse por Puerto Viejo y sus alrededores es más fácil si rentas una bicicleta o un scooter. Aunque, si no te interesa esta opción, también hay un servicio de bus público muy confiable que te puede llevar a Cahuita, Manzanillo y Sixaola. Si prefieres conducir, podemos proporcionar el servicio de alquiler de autos también. Ofrecemos parqueo privado, solo haznos saber si tienes una camioneta grande que requiera de algo de espacio adicional para parquear.
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
                    <PriceConfirmationSection propertyKey="Pappagallo" isSpanish={true} />
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

export default ListingPappagalloES;


