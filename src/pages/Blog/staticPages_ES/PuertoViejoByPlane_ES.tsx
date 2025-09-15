import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';

// import Amenities from "./components/Amenities/Amenities.component";
import { blogsES } from "../../../assets/blogs/blogs";
import OtherBlogs from "../Components/OtherBlogs.Component";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import { Helmet } from "react-helmet";
import FixedNavigationES from "../../../components/FixedNavigation/FixedNavigation.componentES";
import ListingAdES from "../Components/ListingAd/ListingAd.componentES";
import { allHomesSnippetES } from "../../../utils/constants";


const PuertoViejoByPlaneES = () => {
    // const { blogId } = useParams();
    const blogId = 'puertoviejobyplaneES'
    const blogData = blogsES.find((blog) => blog.id === blogId);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, [])

    console.log("data:", blogData);
    return (

        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Llegar a Puerto Viejo en Avión</title>
                <meta name="description" content="Llegar a Puerto Viejo en avión es más fácil de lo que piensas. En este artículo, te mostraremos cómo viajar desde cualquier destino a Puerto Viejo tomando un vuelo doméstico desde San José a Limón." />
                <link rel="canonical" href="https://www.reservaskalawala.com/puertoviejobyplaneES" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/puertoviejobyplane" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/puertoviejobyplaneES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/puertoviejobyplane" />
            </Helmet>
            <FixedNavigationES isBlog={true} />
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 4 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } : { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <ListingAdES listings={allHomesSnippetES} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={windowWidth <= 991 ? { order: 'first', span: 12 } : { order: 'first', span: 12 }} sm={12} xs={12}>

                    <br />
                    <div className="heading title-container" style={{ maxWidth: 1000, }}>

                        <h1 className="title blog-title">Llegar a Puerto Viejo en Avión
                        </h1>
                        <div className="border"></div>

                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="description" style={{ maxWidth: 1000, }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src="https://drive.google.com/thumbnail?id=1kE3Zq-IbD47bdiLkW25IKuBncif7J7YR&sz=w1000" className="responsive-image" alt="Kayaking in Punta Uva" />
                        </div>
                        <p style={{ display: 'flex', justifyContent: 'right' }}>Image by <a href="http://www.freepik.com/" target="_blank" rel="noreferrer"> Freepik</a></p>
                        <br />
                        <p>Llegar a Puerto Viejo en avión es más fácil de lo que piensas. En este artículo, te mostraremos cómo viajar desde cualquier destino a Puerto Viejo tomando un vuelo doméstico desde San José a Limón.</p>
                        <br />

                        <p>Para reservar tu vuelo, simplemente visita <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> y selecciona tus fechas y horarios de viaje. Luego se te pedirá que ingreses tus datos personales y de pago para completar tu reserva.
                            Es importante tener en cuenta que Sansa Airlines ofrece varias opciones de vuelo durante el día, lo que facilita encontrar un vuelo que se ajuste a tu horario.</p>
                        <br />
                        <p>La primera parte del viaje consiste en volar al Aeropuerto Internacional de San José, también conocido como <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a>(SJO), el aeropuerto más grande de Costa Rica.
                            SJO está bien conectado con muchos destinos internacionales, lo que lo convierte en un punto de partida conveniente para tu viaje a Puerto Viejo.
                            Una vez que aterrices en SJO, tendrás que pasar por la aduana y dirigirte al Gate Doméstico: hay un avión antiguo grande afuera, así que es fácil de reconocer.</p>
                        <br />
                        <p>El vuelo dura aproximadamente 40 minutos en un pequeño pero seguro Cessna, que te ofrece una vista panorámica del <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">Parque Nacional Braulio Carrillo</a>.</p>
                        <br />
                        <p>Una vez que llegues a Limón, un traslado privado te llevará a Puerto Viejo por aproximadamente $75 USD. Un chófer te estará esperando en el aeropuerto y te llevará directamente a tu alojamiento, garantizando un viaje cómodo y sin estrés.
                            Alternativamente, puedes tomar un autobús o un taxi desde Limón a Puerto Viejo, pero te recomendamos organizar un traslado privado con antelación para ahorrar tiempo y evitar posibles estafas.</p>
                        <br />
                        <p>En este punto, lo único que te queda por hacer es relajarte y disfrutar del ambiente tranquilo de Puerto Viejo. Ya sea que busques relajarte en la playa, explorar la jungla o disfrutar de una deliciosa comida caribeña,
                            Puerto Viejo tiene algo para todos.</p>
                        <br />
                        <p>En conclusión, viajar a Puerto Viejo desde cualquier destino es fácil y conveniente gracias al vuelo doméstico desde San José a Limón. Con un vuelo rápido y cómodo y la opción de organizar un traslado privado,
                            estarás disfrutando de un cóctel tropical en poco tiempo. ¿Qué estás esperando? ¡Reserva tu viaje a Puerto Viejo hoy y experimenta la magia de este encantador pueblo de playa por ti mismo! Y no dudes en contactarnos para ayudarte
                            a organizar tu viaje o programar un traslado privado desde Limón.</p>
                        <br />

                    </div>
                    <OtherBlogs currentBlog="puertoviejobyplane" blogs={blogsES} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default PuertoViejoByPlaneES;