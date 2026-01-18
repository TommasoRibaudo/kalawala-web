import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';
import { allHomesSnippetES } from "../../../utils/constants";

// import Amenities from "./components/Amenities/Amenities.component";
import { blogsES } from "../../../assets/blogs/blogs";
import FixedNavigationES from "../../../components/FixedNavigation/FixedNavigation.componentES";
import { Helmet } from "react-helmet";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import ListingAdES from "../Components/ListingAd/ListingAd.componentES";
import OtherBlogs from "../Components/OtherBlogs.Component";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";
import Smoobu2 from "../../../components/Smoobu2/Smoobu2.component";
import { PUERTO_VIEJO_BLOG_RECOMMENDATIONS_ES } from "../../../utils/constants";


const TenHoursInPuertoES = () => {
    // const { blogId } = useParams();
    const blogId = 'TenHoursInPuertoES'
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
                <title>Diez Horas Para Explorar Cahuita</title>
                <meta name="description" content="Si tienes solo diez horas para explorar Cahuita, ¡aprovechemos al máximo el tiempo! Empezamos nuestra aventura temprano, despertándonos a las 7 am. Lo primero es tomar un café y disfrutar de un delicioso croissant de jamón y queso recién salido del horno en Degustibus Bakery." />
                <link rel="canonical" href="https://www.reservaskalawala.com/TenHoursInPuertoES" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/TenHoursInPuerto" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/TenHoursInPuertoES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/TenHoursInPuerto" />
            </Helmet>
            <FixedNavigationES isBlog={true} />
            <Row className="subContainer" style={{ justifyContent: 'center' }}>

                <Col className="info col" lg={{ order: 'first', span: 8 }} md={{ order: 'first', span: 10 }} sm={12} xs={12}>

                    <br />
                    <div className="heading title-container" style={{ maxWidth: 1000, }}>

                        <h1 className="title blog-title">Diez horas para explorar Cahuita
                        </h1>

                        <div className="border"></div>

                    </div>
                    <br />
                    <div className="description" style={{ maxWidth: 1000, }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src="https://drive.google.com/thumbnail?id=1H81sxVh2z1VmcbZvVTlhdEINmQ0tQ5Es&sz=w1000" className="responsive-image" alt="Traveling to Puerto Viejo by bus" />
                        </div>
                        <br />
                        <p>Si tienes solo diez horas para explorar Cahuita, ¡aprovechemos al máximo el tiempo! Empezamos nuestra aventura temprano, despertándonos a las 7 am. Lo primero es tomar un café y disfrutar de un delicioso croissant de jamón y queso recién salido del horno en Degustibus Bakery.</p>
                        <br />
                        <p>Después del delicioso desayuno, caminamos hasta la parada de buses que se ubica cerca de la cancha de baloncesto del pueblo, frente a la heladería Deelite. Es importante saber que hay dos paradas de buses en la zona: la más grande es para los autobuses de MEPE que van a San José, y la más pequeña es para los autobuses que van a Limón. Tomaremos esta última. Puedes comprar el boleto el mismo día o pagar directamente al subir al bus. La boletería es una pequeña caseta al lado del shuttle.</p>
                        <br />
                        <p> Tomamos el bus que pasa por nuestra parada a las 8:20 am. El trayecto dura aproximadamente 30 minutos y nos bajamos en la terminal principal de Cahuita, que nos deja muy cerca de nuestro primer destino: el Parque Nacional Cahuita. Con de google maps y los habitantes de la zona , nos dirigimos en dirección, observando el movimiento del pueblo  que nos indican que se preparan para recibir a los turistas.</p>
                        <br />
                        <p>El Parque Nacional Cahuita abre de 8 am a 4 pm en ambos sectores: Playa Blanca y Puerto Vargas. Hoy visitaremos Playa Blanca, donde la entrada es gratuita, aunque se acepta una colaboración voluntaria. Recuerda que, al ser un parque nacional, no se permite el ingreso de animales domésticos ni bebidas alcohólicas.</p>
                        <br />
                        
                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title="¿Dónde hospedarte cuando explores Cahuita?"
                            properties={PUERTO_VIEJO_BLOG_RECOMMENDATIONS_ES}
                            language="es"
                        />
                        <br />
                        
                        <p><b><i>Llegamos al parque a las 9:15 am, justo cuando el sol empieza a calentar. Contratamos un guía para nuestra caminata, ya que queremos aprender sobre la biodiversidad del parque y observar especies que a veces es difícil ver por nuestra cuenta. Logramos ver distintos animales como especies de pájaros, además de escuchar y ver a los monos congos, osos perezosos y muchas especies de flora. El recorrido tomó aproximadamente dos horas.</i></b></p>
                        <br />
                        <p>Después de la caminata, fuimos directamente a almorzar a una soda típica llamada Kawe, donde disfrutamos de un delicioso rice and beans que nos dio la energía para seguir explorando este calmo y hermoso pueblo. Luego, nos dimos una vuelta por las tiendas del pueblo, donde compramos algunos souvenirs.</p>
                        <br />
                        <p>Nuestra próxima parada eran unas hermosas piscinas naturales de las que habíamos oído hablar y que estábamos ansiosos por conocer. ¡Quedamos sorprendidos de este lugar! Piscinas naturales en un lugar poco concurrido, perfecto para relajarse.</p>
                        <br />
                        <p>Aún nos quedan unas horas más, y a las 4 pm nos dirigimos nuevamente al centro del pueblo de Cahuita a comernos un delicioso Pati en Delrita, cuya fama es bien merecida, ¡es delicioso! Así vamos terminando nuestro día. Nos dirigimos a la terminal de buses para tomar el bus de las 5:15 pm hacia Puerto Viejo, y nos vamos con ganas de volver a este hermoso pueblo caribeño.</p>
                        <br />
                        <br />
                    </div>

                    {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                    <div style={{ maxWidth: 1000 }}>
                        <WhyStayWithUs
                            language="es"
                            ctaLink="/HomeES"
                        />
                    </div>

                    {/* Smoobu Booking Component */}
                    <div className="blog-smoobu-container" style={{ maxWidth: 1000, marginTop: '2rem', marginBottom: '2rem' }}>
                        <h3 className="smoobu-title">Reserva tu Estadía</h3>
                        <div className="smoobu-wrapper">
                            <Smoobu2 targetId="tenHoursESSmoobuBooking" />
                        </div>
                    </div>

                    <OtherBlogs currentBlog="TravellingToPuertoByBus" blogs={blogsES} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default TenHoursInPuertoES;