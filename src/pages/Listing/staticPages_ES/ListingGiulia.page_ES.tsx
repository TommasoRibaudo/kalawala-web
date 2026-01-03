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


const ListingGiuliaES = () => {
    const listing = "GiuliaES"
    const isScreenSmall = useMediaQuery('(max-width: 992px)');

    const [show, setShow] = useState(false);

    // Add random popup functionality for Spanish listing page
    useRandomPopup({ isSpanishPage: true });

    // Show booking encouragement tip when user interacts with Smoobu widget
    useSmoobuBookingTip({ isSpanishPage: true, propertyName: 'Casa Giulia' });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const houseData: HouseDataType | undefined = NamDataListES.find((house) => house.houseLangCode === "GiuliaES");
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
                <title>Casa Giulia - Retiro Familiar</title>
                <meta name="description" content="Nuevos bungalows totalmente equipados con A/C ubicados a 200mts de la hermosa playa Playa Chiquita, en uno de los barrios más seguros y tranquilos del Caribe. Perfecto para familias hasta 4 personas." />
                <link rel="canonical" href="https://www.reservaskalawala.com/GiuliaES" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/Giulia" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/GiuliaES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/Giulia" />
            </Helmet>
            <FixedNavigationNamES isBlog={false} />
            {isScreenSmall && (
                <div className="button-hold fixed-bottom sticky-cta-mobile" style={{ paddingBottom: "env(safe-area-inset-bottom);" }}><Button className='btn-darker sticky-cta-button' href="#smoobuComp">Check Availability</Button></div>)}

            <Row className="subContainer">
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={{ order: 'first', span: 12 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">Casa Giulia</h1>
                        <h3 className="location">
                            <a href="https://maps.app.goo.gl/cT74qg6iqX35aa5t9" target="_blank" rel="noopener noreferrer">
                                Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica
                            </a>
                        </h3>
                        {/* Add marketing section after title */}
                        <ListingMarketingSection propertyKey="Giulia" isSpanish={true} />
                    </div>
                    <ImagesContainer showModal={handleShow} houseName="Giulia" />
                    {/* Add social statement after images */}
                    <SocialStatement propertyKey="Giulia" isSpanish={true} />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} />
                    </div>

                    {/* Add feature highlights before description */}
                    <FeatureHighlights propertyKey="Giulia" propertyName="Casa Giulia" isSpanish={true} />
                    <div className="description">
                        <div className="check-times" style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px' }}>
                            <p><strong>Entrada:</strong> 3:00 PM</p>
                            <p><strong>Salida:</strong> 12:00 PM (mediodía)</p>
                        </div>
                        <p>
                            Escápate a Puerto Viejo en nuestra casa con aire acondicionado, cocina de gas y un amplio clóset. Relájate en tu terraza privada techada. Nuestra casa está ubicada a solo 200 metros de la impresionante playa Chiquita, en uno de los vecindarios más seguros y tranquilos del Caribe. Explora atracciones cercanas como Puerto Viejo, Manzanillo, la playa de Punta Uva y Arrecife desde nuestra ubicación perfecta.
                            <br />
                        </p>
                        <p>
                            El espacio, completamente privado, cuenta con 2 aires acondicionados, cocina totalmente equipada y 2 baños privados con agua caliente. El espacio de parqueo es privado, para un carro, y se encuentra fuera de la propiedad. La casa tiene un porche para nuestros huéspedes. ✓ A/C ✓ cocina ✓ wifi ✓ porche privado ✓ parqueo privado.
                        </p>
                        <br />
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
                    <PriceConfirmationSection propertyKey="Giulia" isSpanish={true} />
                    <Smoobu homeCode={houseData!.houseCode} />
                </Col>
            </Row>

            {/* Show OtherListings here only on mobile - after the entire row */}
            {isScreenSmall && (
                <div className="other-listings-mobile">
                    <OtherListingsES listings={NamSnippetES} currentListing={listing || ''} />
                </div>
            )}
            {show && <ImagesModal closeModal={handleClose} houseName="Giulia" />}

            {/* Message Tip Container */}
            <MessageTipContainer />
        </div>
    )

}

export default ListingGiuliaES;


