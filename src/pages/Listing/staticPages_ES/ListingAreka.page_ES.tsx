import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import '../Listing.style.scss'
import Smoobu from "../../../components/Smoobu/Smoobu.component";
import ImagesContainer from "../components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "../components/ImagesModal/ImagesModal.component";
import { NamSnippetES } from "../../../utils/constants";
import { HouseDataType } from "../../../utils/types";
import Amenities from "../components/Amenities/Amenities.component";
import { AmenityType } from "../../../utils/types";
import { NamDataListES } from "../../../utils/constants";
import { Helmet } from "react-helmet";
import { useMediaQuery } from '@react-hook/media-query';
import MessageTipContainer from "../../../components/MessageTip/MessageTipContainer.component";
import { useRandomPopup } from "../../../hooks/useRandomPopup";
import { useSmoobuBookingTip } from "../../../hooks/useSmoobuBookingTip";
import OtherListingsES from "../components/OtherListings/OtherListings.componentES";
import FixedNavigationNamES from "../../../components/FixedNavigation/FixedNavigation.componentNamES";
import ListingMarketingSection from "../../../components/ListingMarketingSection/ListingMarketingSection.component";
import PriceConfirmationSection from "../../../components/PriceConfirmationSection/PriceConfirmationSection.component";
import SocialStatement from "../../../components/SocialStatement/SocialStatement.component";
import FeatureHighlights from "../../../components/FeatureHighlights/FeatureHighlights.component";


const ListingArekaES = () => {
    const listing = "ArekaES"
    const isScreenSmall = useMediaQuery('(max-width: 992px)');

    const [show, setShow] = useState(false);

    // Add random popup functionality for Spanish listing page
    useRandomPopup({ isSpanishPage: true });

    // Show booking encouragement tip when user interacts with Smoobu widget
    useSmoobuBookingTip({ isSpanishPage: true, propertyName: 'Casa Areka' });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const houseData: HouseDataType | undefined = NamDataListES.find((house) => house.houseLangCode === "ArekaES");
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
                <title>Casa Areka - Retiro para Parejas con A/C</title>
                <meta name="description" content="Nuevos bungalows totalmente equipados con A/C ubicados a 200mts de la hermosa playa Playa Chiquita, en uno de los barrios más seguros y tranquilos del Caribe. A pocos minutos de Puerto Viejo y Manzanillo, estamos perfectamente ubicados para visitar la playa Punta Uva y Arrecife." />
                <link rel="canonical" href="https://www.reservaskalawala.com/ArekaES" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/Areka" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/ArekaES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/Areka" />
            </Helmet>
            <FixedNavigationNamES isBlog={false} />
            {isScreenSmall && (
                <div className="button-hold fixed-bottom sticky-cta-mobile" style={{ paddingBottom: "env(safe-area-inset-bottom);" }}><Button className='btn-darker sticky-cta-button' href="#smoobuComp">Check Availability</Button></div>)}

            <Row className="subContainer">
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={{ order: 'first', span: 12 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">Casa Areka</h1>
                        <h3 className="location">
                            <a href="https://maps.app.goo.gl/cT74qg6iqX35aa5t9" target="_blank" rel="noopener noreferrer">
                                Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica
                            </a>
                        </h3>
                        {/* Add marketing section after title */}
                        <ListingMarketingSection propertyKey="Areka" isSpanish={true} />
                    </div>
                    <ImagesContainer showModal={handleShow} houseName="Areka" />
                    {/* Add social statement after images */}
                    <SocialStatement propertyKey="Areka" isSpanish={true} />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} />
                    </div>

                    {/* Add feature highlights before description */}
                    <FeatureHighlights propertyKey="Areka" propertyName="Casa Areka" isSpanish={true} />

                    <div className="description">
                        <div className="check-times" style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px' }}>
                            <p><strong>Entrada:</strong> 3:00 PM</p>
                            <p><strong>Salida:</strong> 12:00 PM (mediodía)</p>
                        </div>
                        <p>
                            Nuevos bungalows totalmente equipados con A/C ubicados a 200mts de la hermosa playa Playa Chiquita, en uno de los barrios más seguros y tranquilos del Caribe. A pocos minutos de Puerto Viejo y Manzanillo, estamos perfectamente ubicados para visitar la playa Punta Uva y Arrecife.
                            <br />
                        </p>
                        <p>
                            El espacio, completamente privado, tiene A/C, cocina totalmente equipada y un baño privado con agua caliente. El espacio de estacionamiento es privado, espacioso y fuera de la propiedad. Cada casa tiene un pequeño porche para nuestros huéspedes.
                            <br />
                        </p>
                        <p>
                            Todos los espacios descritos aquí son privados, incluida la cocina y el baño totalmente equipados. Tendrás todo lo que necesitas para sentirte como en casa.
                            <br />
                        </p>
                        <p>
                            Cerca puedes encontrar restaurantes, supermercados y alquiler de bicicletas. Confiamos en nuestros huéspedes para seguir el sentido común al salir de nuestra casa, por eso tenemos 0 reglas de salida y ninguna lista de salida.
                            <br />
                        </p>
                        <p>
                            ¿Tienes alguna petición especial? Estaríamos más que felices de acomodarte si podemos. Por favor, no dudes en hacérnoslo saber.
                            <br />
                        </p>
                        <p>
                            Puerto Viejo es un destino popular para turistas de todo el mundo, gracias a sus impresionantes alrededores. El pueblo cuenta con inmensas playas que están rodeadas de selva tropical, así como dos Parques Nacionales (Manzanillo y Cahuita). Por la noche, el pueblo cobra vida con una escena nocturna animada y activa. Cuando te hospedas aquí, podrás sumergirte completamente en todo lo que hace único a Puerto Viejo.
                            <br />
                        </p>
                    </div>

                    {/* Show OtherListings here only on desktop */}
                    {!isScreenSmall && (
                        <div className="other-listings-bottom">
                            <OtherListingsES listings={NamSnippetES} currentListing={listing || ''} />
                        </div>
                    )}

                </Col>
                <Col id="smoobuComp" className="book col" lg={2} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                    {/* Add price and confirmation section above Smoobu */}
                    <PriceConfirmationSection propertyKey="Areka" isSpanish={true} />
                    <Smoobu homeCode={houseData!.houseCode} />
                </Col>
            </Row>

            {/* Show OtherListings here only on mobile - after the entire row */}
            {isScreenSmall && (
                <div className="other-listings-mobile">
                    <OtherListingsES listings={NamSnippetES} currentListing={listing || ''} />
                </div>
            )}
            {show && <ImagesModal closeModal={handleClose} houseName="Areka" />}

            {/* Message Tip Container */}
            <MessageTipContainer />
        </div>
    )

}

export default ListingArekaES;


