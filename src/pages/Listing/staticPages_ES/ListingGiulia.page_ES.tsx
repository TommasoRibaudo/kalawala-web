import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import '../Listing.style.scss'
import OtherListings from "../components/OtherListings/OtherListings.component";
import Smoobu from "../../../components/Smoobu/Smoobu.component";
import ImagesContainer from "../components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "../components/ImagesModal/ImagesModal.component";
import { useParams } from "react-router-dom";
import { NamSnippetES } from "../../../utils/constants";
import { HouseDataType, ListingType } from "../../../utils/types";
import Amenities from "../components/Amenities/Amenities.component";
import { AmenityType } from "../../../utils/types";
import { NamDataList } from "../../../utils/constants";
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import { Helmet } from "react-helmet";
import { useMediaQuery } from '@react-hook/media-query';
import OtherListingsES from "../components/OtherListings/OtherListings.componentES";
import FixedNavigationES from "../../../components/FixedNavigation/FixedNavigation.componentES";


const ListingGiuliaES = () => {
    const listing = "GiuliaES"
    const isScreenSmall = useMediaQuery('(max-width: 992px)');
    const amenities: AmenityType[] = [
        { icon: 'ac', name: '1 A/C Units' }
    ]

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const houseData: HouseDataType | undefined = NamDataList.find((house) => house.houseLangCode === "Giulia");
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
            </Helmet>
            <FixedNavigationES isBlog={false} />
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 2 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } : { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <OtherListingsES listings={NamSnippetES} currentListing={listing || ''} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 7 }} md={windowWidth <= 991 ? { order: 'first', span: 12 } : { order: 'first', span: 8 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">Casa Giulia</h1>
                        <h3 className="location">Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica</h3>
                        {isScreenSmall && (
                            <div className="button-hold"><Button className='btn-darker' href="#smoobuComp">¡Reserva en línea!</Button></div>)}
                    </div>
                    <ImagesContainer showModal={handleShow} houseName="Giulia" />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} />
                    </div>
                    <div className="description">
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

                </Col>
                <Col id="smoobuComp" className="book col" lg={3} md={windowWidth <= 991 ? { span: 12 } : { order: 'first', span: 4 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                    <Smoobu homeCode={houseData!.houseCode} />
                </Col>
            </Row>
            {show && <ImagesModal closeModal={handleClose} houseName="Giulia" />}
        </div>
    )

}

export default ListingGiuliaES;