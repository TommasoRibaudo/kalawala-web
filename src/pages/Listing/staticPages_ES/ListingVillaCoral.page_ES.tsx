import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import '../Listing.style.scss'
import OtherListings from "../components/OtherListings/OtherListings.component";
import Smoobu from "../../../components/Smoobu/Smoobu.component";
import ImagesContainer from "../components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "../components/ImagesModal/ImagesModal.component";
import { useParams } from "react-router-dom";
import { homesSnippet, VillaSnippet, VillaCoralSnippet } from "../../../utils/constants";
import { HouseDataType, ListingType } from "../../../utils/types";
import Amenities from "../components/Amenities/Amenities.component";
import { AmenityType } from "../../../utils/types";
import { VillasDataListES } from "../../../utils/constants";
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import { Helmet } from "react-helmet";
import { useMediaQuery } from '@react-hook/media-query';
import OtherListingsES from "../components/OtherListings/OtherListings.componentES";
import FixedNavigationES from "../../../components/FixedNavigation/FixedNavigation.componentES";
import FixedNavigationRib from "../../../components/FixedNavigation/FixedNavigation.componentRIB";
import FixedNavigationRibES from "../../../components/FixedNavigation/FixedNavigation.componentRIBES";


const ListingVillaCoralES = () => {
    const listing = 'Villa CoralES'
    const isScreenSmall = useMediaQuery('(max-width: 992px)');
    const amenities: AmenityType[] = [
        { icon: 'ac', name: '2 A/C Units' },
        { icon: 'ac', name: '2 A/C Units' },
        { icon: 'ac', name: '2 A/C Units' }
    ]

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const houseData: HouseDataType | undefined = VillasDataListES.find((house) => house.houseLangCode === "Villa Coral");
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
                <title>Villa Coral - Casa con piscina privada en Playa Chiquita</title>
                <meta name="description" content="Located in the heart of town, this house has space for up to 5 people and features a fully equipped kitchen, a bathroom, 2 A/C units, and a private parking lot." />
                <link rel="canonical" href="https://www.reservaskalawala.com/villaCoralES" />
            </Helmet>
            <FixedNavigationRibES isBlog={false} />
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 2 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } : { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <OtherListingsES listings={VillaCoralSnippet} currentListing={listing || ''} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 7 }} md={windowWidth <= 991 ? { order: 'first', span: 12 } : { order: 'first', span: 8 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">Villa Coral</h1>
                        <h3 className="location">Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica</h3>
                        {isScreenSmall && (
                            <div className="button-hold"><Button className='btn-darker' href="#smoobuComp">Reverva en linea!</Button></div>)}
                    </div>
                    <ImagesContainer showModal={handleShow} houseName={listing!} />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} />
                    </div>
                    
                    <div className="description">
                    <div className="check-times" style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px' }}>
                        <p><strong>Entrada:</strong> 3:00 PM</p>
                        <p><strong>Salida:</strong> 12:00 PM (mediodía)</p>
                    </div>
                        <p>
                            Descubre el retiro perfecto en Playa Chiquita, Puerto Viejo. Nuestra villa de lujo construida recientemente ofrece una experiencia vacacional ideal, combinando comodidad y conveniencia en un entorno tropical sereno.
                            <br />
                        </p>
                        <p>
                            Mantente conectado con internet de alta velocidad de hasta 100 Mbps y aprovecha el espacio de trabajo dedicado si necesitas atender tareas durante tu visita.
                            <br />
                        </p>
                        <p>
                            La villa, que cuenta con piscina privada, cocina y baño, ha sido decorada por la diseñadora de interiores puertorriqueña Lourdes Menéndez
                            <br />
                        </p>
                        <p>
                            Relájate y descansa en tu propio paraíso privado con una hermosa piscina de agua salada solo para ti. La villa cuenta con un amplio dormitorio principal y una sala de estar, ambos equipados con aire acondicionado para escapar del calor.
                        </p>
                        <p>
                            ¿Tienes alguna solicitud especial? Estaremos más que encantados de atenderla si podemos. No dudes en hacérnoslo saber.
                            <br />
                        </p>
                        <p>
                            Si necesitas que preparemos una cuna de viaje para tu estadía, por favor infórmanos con anticipación. Nos aseguraremos de colocarla en tu habitación durante nuestro proceso de limpieza.
                            <br />
                        </p>
                        <p>
                            Explora la belleza de Playa Chiquita, Punta Uva y la vibrante cultura de Puerto Viejo, todo mientras cuentas con un hogar comodo al cual regresar. Aprovecha al máximo tu escapada a Puerto Viejo con esta acogedora villa como tu alojamiento.
                            <br />
                        </p>
                        <p>
                            Moverse por Puerto Viejo y sus alrededores es más fácil alquilando una bicicleta o una scooter. Sin embargo, también hay un servicio de autobús público confiable que puede llevarte a Cahuita, Manzanillo y Sixaola. Si prefieres conducir, también podemos coordinar la entrega de vehículos. Ofrecemos estacionamiento privado, pero avísanos si tienes una camioneta grande que requiera espacio adicional.
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

export default ListingVillaCoralES;