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
import OtherListingsES from "../components/OtherListings/OtherListings.componentES";
import FixedNavigationES from "../../../components/FixedNavigation/FixedNavigation.componentES";


const ListingTucanoES = () => {
    const listing = 'TucanoES'
    const isScreenSmall = useMediaQuery('(max-width: 992px)');

    const amenities: AmenityType[] = [
        { icon: 'ac', name: '2 A/C Units' },
        { icon: 'ac', name: '2 A/C Units' },
        { icon: 'ac', name: '2 A/C Units' }
    ]

    const [show, setShow] = useState(false);

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
            <FixedNavigationES isBlog={false}/>
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 2 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } :  { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <OtherListingsES listings={homesSnippet} currentListing={listing || ''} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 7 }} md={windowWidth <= 991 ?{  order: 'first', span: 12 } : { order: 'first', span: 8 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">Casa Tucano</h1>
                        <h3 className="location">
                            <a href="https://maps.app.goo.gl/ixZHjG7yYsMF9U2e9" target="_blank" rel="noopener noreferrer">
                                Puerto Viejo de Talamanca, Limón, Costa Rica
                            </a>
                        </h3>
                        {isScreenSmall && (
                            <div className="button-hold"><Button className='btn-darker' href="#smoobuComp">Reverva en linea!</Button></div>)}
                    </div>
                    <ImagesContainer showModal={handleShow} houseName={listing!} />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} />
                    </div>
                    
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

                </Col>
                <Col id="smoobuComp" className="book col" lg={3} md={windowWidth <= 991 ?{ span: 12 } : { order: 'first', span: 4 }} sm={{  span: 12 }} xs={{ span: 12 }}>
                    <Smoobu homeCode={houseData!.houseCode} />
                </Col>
            </Row>
            {show && <ImagesModal closeModal={handleClose} houseName={listing!} />}
        </div>
    )

}

export default ListingTucanoES;