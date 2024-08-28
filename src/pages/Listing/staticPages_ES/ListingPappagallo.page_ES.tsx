import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import '../Listing.style.scss'
import OtherListings from "../components/OtherListings/OtherListings.component";
import Smoobu from "../../../components/Smoobu/Smoobu.component";
import ImagesContainer from "../components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "../components/ImagesModal/ImagesModal.component";
import { useParams } from "react-router-dom";
import { HouseDataType, ListingType } from "../../../utils/types";
import { homesSnippet } from "../../../utils/constants";
import Amenities from "../components/Amenities/Amenities.component";
import { AmenityType } from "../../../utils/types";
import { houseDataList } from "../../../utils/constants";
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import { Helmet } from "react-helmet";
import { useMediaQuery } from '@react-hook/media-query';


const ListingPappagalloES = () => {
    const listing = 'PappagalloES'
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
                <title>House Pappagallo - Fully equipped Home in Puerto Viejo</title>
                <meta name="description" content="Welcome to Kalawala, a charming complex of two apartments located in the heart of Puerto Viejo. Each apartment is built entirely of wood and is situated above a delightful Italian bakery and are equipped with everything you need for a comfortable stay." />
                <link rel="canonical" href="https://www.reservaskalawala.com/Pappagallo" />
            </Helmet>
            <FixedNavigation isBlog={false}/>
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 2 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } :  { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <OtherListings listings={homesSnippet} currentListing={listing || ''} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 7 }} md={windowWidth <= 991 ?{  order: 'first', span: 12 } : { order: 'first', span: 8 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">Casa Pappagallo</h1>
                        <h3 className="location">Puerto Viejo de Talamanca, Limón, Costa Rica</h3>
                        {isScreenSmall && (
                            <div className="button-hold"><Button className='btn-darker' href="#smoobuComp">Reserva En Linea!</Button></div>)}
                    </div>
                    <ImagesContainer showModal={handleShow} houseName={listing!} />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} />
                    </div>
                    <div className="description">
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
                        Moverse por Puerto Viejo y sus alrededores es más fácil si rentas una bicicleta o un scooter. Aunque, si no te interesa esta opción, también hay un servicio de bus público muy confiable que te puede llevar a Cahuita, Manzanillo y Sixaola. Si prefieres conducir, podemos proporcionar el servicio de alquiler de autos también. Ofrecemos parqueo privado, solo haznos saber si tienes una camioneta grande que requiera de algo de espacio adicional para parquear. Adicionalmente, contamos con una estación de carga para vehículos eléctricos.
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

export default ListingPappagalloES;