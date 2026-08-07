import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import '../Listing.style.scss'
import BookingSearchWidget from "../../../components/BookingSearchWidget/BookingSearchWidget.component";
import ImagesContainer from "../components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "../components/ImagesModal/ImagesModal.component";
import Footer from "../../../components/Footer/Footer.component";
import { NamSnippetES } from "../../../utils/constants";
import { HouseDataType } from "../../../utils/types";
import Amenities from "../components/Amenities/Amenities.component";
import { AmenityType } from "../../../utils/types";
import { NamDataListES } from "../../../utils/constants";
import { Helmet } from "react-helmet";

import OtherListings from "../components/OtherListings/OtherListings.component";
import ListingMarketingSection from "../../../components/ListingMarketingSection/ListingMarketingSection.component";
import PriceConfirmationSection from "../../../components/PriceConfirmationSection/PriceConfirmationSection.component";
import SocialStatement from "../../../components/SocialStatement/SocialStatement.component";
import FeatureHighlights from "../../../components/FeatureHighlights/FeatureHighlights.component";

import GuestReviews from "../../../components/GuestReviews/GuestReviews.component";
import FixedNavigation from '../../../components/FixedNavigation/FixedNavigation.component';


const ListingGiuliaES = () => {
    const listing = "GiuliaES"
    // Seeded null, not read from useMediaQuery/matchMedia synchronously —
    // react-snap's puppeteer viewport at prerender time and a real visitor's
    // viewport at hydration time are different numbers, and isScreenSmall
    // drives whether the sticky mobile CTA div renders at all (a structural
    // difference, not just style). Same fix as
    // MessageTipContainer.component.tsx: null means "not yet measured" (no
    // CTA div, matching react-snap's desktop-sized prerender) until the
    // effect below sets the real match post-mount.
    const [isScreenSmall, setIsScreenSmall] = useState<boolean | null>(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const houseData: HouseDataType | undefined = NamDataListES.find((house) => house.houseLangCode === "GiuliaES");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 992px)');
        setIsScreenSmall(mq.matches); // real match, read only after mount
        const handleChange = () => setIsScreenSmall(mq.matches);
        mq.addEventListener('change', handleChange);
        return () => mq.removeEventListener('change', handleChange);
    }, [])
    //const description = houseData?.description.split('<br/>');
    //const neighborhood = houseData?.neighborhood.split('<br/>');
    return (
        <div className={`listingContainer${show ? ' modal-open' : ''}`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Casa Giulia - Retiro Familiar</title>
                <meta name="description" content="Nuevos bungalows totalmente equipados con A/C ubicados a 200mts de la hermosa playa Playa Chiquita, en uno de los barrios más seguros y tranquilos del Caribe. Perfecto para familias hasta 4 personas." />
                <link rel="canonical" href="https://www.reservaskalawala.com/GiuliaES" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/Giulia" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/GiuliaES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/Giulia" />
            </Helmet>
            <FixedNavigation isBlog={false} />
            {isScreenSmall && (
                <div className="button-hold fixed-bottom sticky-cta-mobile" style={{ paddingBottom: "env(safe-area-inset-bottom);" }}><Button className='btn-darker sticky-cta-button' href="#smoobuComp">VER DISPONIBILIDAD</Button></div>)}

            <Row className="subContainer">
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={{ order: 'first', span: 12 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">Casa Giulia</h1>
                        <p className="location">
                            <a href="https://maps.app.goo.gl/cT74qg6iqX35aa5t9" target="_blank" rel="noopener noreferrer">
                                Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica
                            </a>
                        </p>
                        {/* Add marketing section after title */}
                        <ListingMarketingSection propertyKey="Giulia" locale="es" />
                    </div>
                    <ImagesContainer showModal={handleShow} houseName="Giulia" />
                    {/* Add social statement after images */}
                    <SocialStatement propertyKey="Giulia" locale="es" />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} propertyKey="Giulia" locale="es" />
                    </div>

                    {/* Add feature highlights before description */}
                    <FeatureHighlights propertyKey="Giulia" propertyName="Casa Giulia" locale="es" />
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

                    <GuestReviews propertyKey="GIULIA" locale="es" />

                </Col>
                <Col id="smoobuComp" className="book col" lg={2} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                    <PriceConfirmationSection propertyKey="Giulia" locale="es" />
                    <BookingSearchWidget locale="es" defaultGuests={houseData!.guestNumber} variant="sidebar" apartmentSlug="Giulia" />
                </Col>
            </Row>

            <div className="other-listings-bottom">
                <OtherListings listings={NamSnippetES} currentListing={listing || ''} />
            </div>
            {show && <ImagesModal closeModal={handleClose} houseName="Giulia" />}
            <Footer locale="es" />

        </div>
    )

}

export default ListingGiuliaES;


