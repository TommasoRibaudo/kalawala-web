import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';

// import Amenities from "./components/Amenities/Amenities.component";
import { blogsES } from "../../../assets/blogs/blogs";
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import OtherBlogs from "../Components/OtherBlogs.Component";
//import constants
import { allHomesSnippetES} from "../../../utils/constants";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import ListingAdES from "../Components/ListingAd/ListingAd.componentES";
import { Helmet } from "react-helmet";


const CahuitaParkES = () => {
    // const { blogId } = useParams();
    
    const blogId = 'cahuitaParkwhattodoES'
    const blogData = blogsES.find((blog) => blog.id === blogId);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, [])
    return (

        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Visitar el Parque Nacional Cahuita: lo que tenés que saber</title>
                <meta name="description" content="El Parque Nacional Cahuita es uno de los parques más accesibles y tranquilos del Caribe costarricense. Combina selva, playa, fauna y arrecife en un solo lugar." />
                <link rel="canonical" href="https://www.reservaskalawala.com/cahuitaparkwhattodoES" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/cahuitaparkwhattodo" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/cahuitaparkwhattodoES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/cahuitaparkwhattodo" />
            </Helmet>
            <FixedNavigation isBlog={true} />
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 4 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } : { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <ListingAdES listings={allHomesSnippetES} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={windowWidth <= 991 ? { order: 'first', span: 12 } : { order: 'first', span: 12 }} sm={12} xs={12}>

                    <br />
                   <div className="heading title-container" style={{ maxWidth: 1000, }}>

                        <h1 className="title blog-title">Visitar el Parque Nacional Cahuita: lo que tenés que saber</h1>
                        <br />
                        <div className="border"></div>

                    </div>
                    <div className="description" style={{ maxWidth: 1000, }}>
                         <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src="https://pixabay.com/get/g648d00416193a3478059ee6a683f1fe0ccf051614aeaa74b633c7aaf78894891e22ae09c588bb97a06725ac09e08253ad077e3ef0b11c705e588e1895d987a05_1280.jpg" className="responsive-image" alt="Traveling to Puerto Viejo by bus" />
                        </div>
                        <br />
                        <p><a href="https://maps.app.goo.gl/vHs1CB5nqzLDoGhv9" target="_blank" rel="noopener noreferrer">El Parque Nacional Cahuita</a> es uno de los parques más accesibles y tranquilos del Caribe costarricense. Combina selva, playa, fauna y arrecife en un solo lugar.</p>
                        <p>Si estás en Cahuita o Puerto Viejo, es una excursión ideal de medio día o de día completo. Acá te dejo una guía clara para organizar tu visita.</p>

                        <br />
                        <h3><strong>Entrada por el pueblo de Cahuita</strong></h3>
                        <p></p>
                        <p>La entrada más usada es la que está en el pueblo de Cahuita, cerca de Playa Blanca.</p>
                        <p>Esta entrada funciona con donación voluntaria, por lo que suele ser más económica. La donación ayuda al mantenimiento del parque y a la comunidad local.</p>
                        <p>Lo mejor es entrar temprano. Hay menos calor, menos gente y más animales activos.</p>

                        <br />
                        <h3><strong>Snorkel dentro del parque</strong></h3>
                        <p>El snorkel es una de las actividades principales del parque.</p>
                        <p>El arrecife de Cahuita es uno de los más grandes del Caribe de Costa Rica. Podés ver peces de colores, corales y, a veces, rayas.</p>
                        <p>Lo más común es hacerlo con un tour guiado, que suele incluir:</p>
                        <ul>
                            <li><strong>Guía local</strong></li>
                            <li><strong>Equipo de snorkel</strong> </li>
                            <li><strong>Traslado en bote hasta el arrecife  </strong> </li>
                        </ul>
                        <br />

                        <p>La visibilidad depende del clima y del estado del mar.</p>

                        <br />
                        <h3><strong>Cuidado con la comida y los animales</strong></h3>
                        <p>El parque tiene mucha fauna. Es común ver monos, mapaches, iguanas, pizotes y perezosos.</p>
                        <p>Algunos animales intentan robar comida. Guardá bien tus snacks y no los dejés a la vista.</p>
                        <p>No está permitido alimentar a los animales.</p>

                        <br />
                        <h3><strong>Horario del parque</strong></h3>
                        <p>El parque cierra a las 4:00 p.m. Todos los visitantes deben salir antes de esa hora.</p>
                        <p>Por eso conviene entrar temprano y recorrer el parque sin apuro.</p>

                        <br />
                        <h3><strong>Boat Ride Back Instead of Walking</strong></h3>
                        <p>El sendero principal es largo si lo caminás completo.</p>
                        <p>Muchos visitantes hacen el recorrido a pie en un solo sentido y regresan en bote hacia Cahuita. Hay lancheros locales que ofrecen este servicio.</p>
                        <p>Es una buena opción si no querés caminar todo el trayecto de regreso.</p>

                        <br />
                        <h3><strong>No se permite plástico</strong></h3>
                        <p>No se permite el ingreso de plásticos de un solo uso.</p>
                        <p>Esto incluye bolsas plásticas, botellas desechables y empaques de comida. Llevá botella reutilizable y recipientes reutilizables.</p>
                        <p>En la entrada pueden revisar los bolsos.</p>

                        <br />
                        <h3><strong>Consejos finales</strong></h3>
                        <ul>
                            <li><strong>Usá zapatos cómodos</strong></li>
                            <li><strong>Llevá agua en botella reutilizable</strong> </li>
                            <li><strong>Usá protector solar biodegradable</strong> </li>
                            <li><strong>Entrá temprano</strong> </li>
                        </ul>
                        <p>El Parque Nacional Cahuita es fácil de visitar, natural y muy especial. Con una buena planificación, es una de las mejores experiencias del Caribe de Costa Rica.</p>
                    </div>
                    <OtherBlogs currentBlog="bushoursES" blogs={blogsES} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default CahuitaParkES;