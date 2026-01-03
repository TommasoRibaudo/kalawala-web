import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import '../Listing.style.scss'
import Smoobu from "../../../components/Smoobu/Smoobu.component";
import ImagesContainer from "../components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "../components/ImagesModal/ImagesModal.component";
import { homesSnippet } from "../../../utils/constants";
import Amenities from "../components/Amenities/Amenities.component";
import { AmenityType, HouseDataType } from "../../../utils/types";
import { houseDataList } from "../../../utils/constants";
import { useMediaQuery } from '@react-hook/media-query';
import OtherListingsES from "../components/OtherListings/OtherListings.componentES";
import FixedNavigationES from "../../../components/FixedNavigation/FixedNavigation.componentES";
import { Helmet } from "react-helmet";
import MessageTipContainer from "../../../components/MessageTip/MessageTipContainer.component";
import { useRandomPopup } from "../../../hooks/useRandomPopup";
import { useSmoobuBookingTip } from "../../../hooks/useSmoobuBookingTip";
import ListingMarketingSection from "../../../components/ListingMarketingSection/ListingMarketingSection.component";
import SocialStatement from "../../../components/SocialStatement/SocialStatement.component";
import FeatureHighlights from "../../../components/FeatureHighlights/FeatureHighlights.component";
import PriceConfirmationSection from "../../../components/PriceConfirmationSection/PriceConfirmationSection.component";


const ListingDelfin = () => {
    //const { listing } = useParams()
    const listing = 'DelfinES'
    const isScreenSmall = useMediaQuery('(max-width: 992px)');

    const [show, setShow] = useState(false);

    // Add random popup functionality for Spanish listing page
    useRandomPopup({ isSpanishPage: true });

    // Show booking encouragement tip when user interacts with Smoobu widget
    useSmoobuBookingTip({ isSpanishPage: true, propertyName: 'Casa Delfín' });

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
                <title>Casa Delfín - Alquiler de Casa de Vacaciones en Puerto Viejo</title>
                <meta name="description" content="Bienvenido a Reservas Kalawala. Ubicada en el corazón del pueblo, esta casa acomoda hasta 6 huéspedes con cocina totalmente equipada, baño, 2 unidades de aire acondicionado y estacionamiento privado." />
                <link rel="canonical" href="https://www.reservaskalawala.com/DelfinES" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/Delfin" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/DelfinES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/Delfin" />
            </Helmet>
            <FixedNavigationES isBlog={false} />
            {isScreenSmall && (
                <div className="button-hold fixed-bottom sticky-cta-mobile" style={{ paddingBottom: "env(safe-area-inset-bottom);" }}><Button className='btn-darker sticky-cta-button' href="#smoobuComp">Check Availability</Button></div>)}

            <Row className="subContainer">
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={{ order: 'first', span: 12 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">Casa Delfines</h1>
                        <h3 className="location">
                            <a href="https://maps.app.goo.gl/ixZHjG7yYsMF9U2e9" target="_blank" rel="noopener noreferrer">
                                Puerto Viejo de Talamanca, Limón, Costa Rica
                            </a>
                        </h3>
                        {/* Add marketing section after title */}
                        <ListingMarketingSection propertyKey="Delfin" isSpanish={true} />

                    </div>
                    <ImagesContainer showModal={handleShow} houseName={listing!} />
                    {/* Add social statement after images */}
                    <SocialStatement propertyKey="Delfin" isSpanish={true} />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} />
                    </div>

                    {/* Add feature highlights before description */}
                    <FeatureHighlights propertyKey="Delfin" propertyName="Casa Delfín" isSpanish={true} />

                    <div className="description">
                        <div className="check-times" style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px' }}>
                            <p><strong>Entrada:</strong> 3:00 PM</p>
                            <p><strong>Salida:</strong> 12:00 PM (mediodía)</p>
                        </div>
                        <p>
                            Bienvenido a Reservas Kalawala. Ubicada en el corazón del pueblo, esta casa acomoda hasta 6 huéspedes con cocina totalmente equipada, baño, 2 unidades de aire acondicionado (no en cocina o sala de estar), y estacionamiento privado. Nuestra ubicación privilegiada ofrece fácil acceso tanto al centro del pueblo como a las playas más hermosas que Puerto Viejo tiene para ofrecer.
                            <br />
                        </p>
                        <p>
                            Todos los espacios descritos aquí son privados, incluyendo la cocina totalmente equipada y el baño. Tendrás todo lo que necesitas para sentirte como en casa.
                            <br />
                        </p>
                        <p>
                            Ofrecemos check-out flexible con entrega de llaves en caja de seguridad para tu conveniencia.
                            <br />
                        </p>
                        <p>
                            ¿Tienes alguna solicitud especial? Estaremos más que felices de complacerte si podemos. Por favor no dudes en hacérnoslo saber.
                            <br />
                        </p>
                        <p>
                            Ofrecemos servicios de limpieza para reservas de 5 noches o más. Nuestro equipo se comunicará con usted durante su estadía para coordinar un horario conveniente para la limpieza.
                            <br />
                        </p>
                        <p>
                            Si requieres de una cuna durante tu estadía, háznoslo saber en tu reservación. Nos encargaremos de prepararla en la habitación antes de tu llegada.
                            <br />
                        </p>
                        <p>
                            Puerto Viejo es un destino popular para turistas de todo el mundo, gracias a sus impresionantes alrededores. El pueblo cuenta con playas inmensas rodeadas de selva tropical, así como dos Parques Nacionales (Manzanillo y Cahuita). Por la noche, el pueblo cobra vida con una escena nocturna animada y activa. Cuando te hospedes aquí, podrás sumergirte completamente en todo lo que hace único a Puerto Viejo.
                            <br />
                        </p>
                        <p>
                            La casa está ubicada cerca del acceso a la playa que eventualmente lleva a Cocles. En el camino, tendrás la oportunidad de observar una variedad de animales y admirar piscinas naturales en el coral. ¡Incluso hay un lugar de observación oculto esperando ser descubierto!
                            <br />
                        </p>
                        <p>
                            Moverse por Puerto Viejo y sus alrededores es más fácil alquilando una bicicleta o un scooter. Sin embargo, también hay un servicio de autobús público confiable disponible que puede llevarte a Cahuita, Manzanillo y Sixaola. Si prefieres conducir, también podemos acomodar autos.
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
                    <PriceConfirmationSection propertyKey="Delfin" isSpanish={true} />
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

export default ListingDelfin;