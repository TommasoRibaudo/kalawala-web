import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';
// import Amenities from "./components/Amenities/Amenities.component";
import { blogsES } from "../../../assets/blogs/blogs";
import { allHomesSnippetES } from "../../../utils/constants";
import OtherBlogs from "../Components/OtherBlogs.Component";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import { Helmet } from "react-helmet";
import FixedNavigationES from "../../../components/FixedNavigation/FixedNavigation.componentES";
import ListingAdES from "../Components/ListingAd/ListingAd.componentES";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";
import Smoobu2 from "../../../components/Smoobu2/Smoobu2.component";
import { PUERTO_VIEJO_BLOG_RECOMMENDATIONS_ES } from "../../../utils/constants";


const TravellingToPuertoES = () => {
    // const { blogId } = useParams();
    const blogId = 'travellingtopuertoES'
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
                <title>Como llegar a Puerto Viejo desde San Jose</title>
                <meta name="description" content="Si estás planeando un viaje a Puerto Viejo, Costa Rica, es posible que te preguntes cómo llegar allí usando transporte público. Afortunadamente, hay varias opciones disponibles que pueden llevarte a este hermoso pueblo caribeño en Talamanca." />
                <link rel="canonical" href="https://www.reservaskalawala.com/travellingtopuertoviejoES" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/travellingtopuertoviejo" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/travellingtopuertoviejoES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/travellingtopuertoviejo" />
            </Helmet>
            <FixedNavigationES isBlog={true} />
            <Row className="subContainer" style={{ justifyContent: 'center' }}>

                <Col className="info col" lg={{ order: 'first', span: 8 }} md={{ order: 'first', span: 10 }} sm={12} xs={12}>

                    <br />
                    <div className="heading title-container" style={{ maxWidth: 1000, }}>

                        <h1 className="title blog-title">Cómo llegar a Puerto Viejo desde San José
                        </h1>

                        <div className="border"></div>

                    </div>
                    <br />
                    <div className="description" style={{ maxWidth: 1000, }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src="https://drive.google.com/thumbnail?id=1JxE6lYoK9C2maxtGP9rlUp2a47Ce5C9W&sz=w1000" className="responsive-image" alt="Surqui" />
                        </div>
                        <br />
                        <p>Si estás planeando un viaje a Puerto Viejo, Costa Rica, es posible que te preguntes cómo llegar allí usando transporte público. Afortunadamente, hay varias opciones disponibles que pueden llevarte a este hermoso pueblo caribeño en Talamanca.</p>
                        <br />

                        <p>Una de las formas más populares de llegar a Puerto Viejo es en bús público. La principal compañía de autobuses que ofrece la ruta desde San José a Puerto Viejo es <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">MEPE</a>.
                            La estación de autobuses está ubicada en el centro de San José, exactamente en la avenida 9 y calle 12, por lo que es fácil de encontrar.</p>
                        <br />
                        <p><b><i>El <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">horario de autobuses</a> a Puerto Viejo es el siguiente: 6am, 8am, 10am, 2pm y el último a las 4pm.</i></b></p>
                        <br />
                        <p>Si bien no es posible reservar boletos con anticipación, siempre es una buena idea llegar temprano a la estación de autobuses para asegurar tu lugar en el autobús. Ten en cuenta que durante los periodos de temporada alta, como vacaciones y fines de semana,
                            los autobuses pueden llenarse rápidamente, así que planifica con anticipación.</p>
                        <br />

                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title="¿Dónde hospedarte cuando viajes a Puerto Viejo?"
                            properties={PUERTO_VIEJO_BLOG_RECOMMENDATIONS_ES}
                            language="es"
                        />
                        <br />

                        <p>El autobús tiene muchas paradas y también se detendrá en la estación de autobuses de Limón, Cahuita y finalmente, Puerto Viejo.</p>
                        <br />
                        <p>Si estás buscando ahorrar algo de dinero en costos de transporte, la opción más económica es tomar el autobús público. Estos autobuses son limpios, confiables y ofrecen una forma asequible de llegar a Puerto Viejo.
                            Aunque no sean tan lujosos como algunos de los servicios de transporte privado, te llevarán a tu destino de manera segura y a tiempo.</p>
                        <br />
                        <p>Con horarios de autobuses regulares desde San José y otras ciudades cercanas, es fácil planificar tu viaje y disfrutar de todo lo que Puerto Viejo tiene para ofrecer.</p>
                        <br />
                        <p><b><i>Una otra opción para llegar a Puerto Viejo desde San José <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">parada de Caribeños</a> ubicada en Calle Central, Cinco Esquinas. Los autobuses salen cada hora desde las 6am hasta las 7pm, por lo que es fácil planificar tu viaje con antelación. Una vez que llegues a Limón,
                            puedes caminar hasta la parada de autobús de <a href="https://maps.app.goo.gl/WV4CmLqzco2Eft7y9" target="_blank" rel="noopener noreferrer">Mepe</a>, que está cerca del mercado central, y tomar un autobús que sale cada hora hacia Puerto Viejo.</i></b></p>
                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs
                                language="es"
                                ctaLink="/"
                            />
                        </div>
                        <br />
                        <p>Sin embargo, es importante tener en cuenta que el viaje desde San José a Limón puede durar entre 3 y 4 horas, dependiendo del tráfico y las condiciones de la carretera. Por lo tanto, es crucial planificar con anticipación para evitar quedarte atrapado en Limón durante la noche.
                            Además, el último autobús de Limón a Puerto Viejo sale a las 8pm, así que asegúrate de llegar a Limón con tiempo suficiente para hacer la transferencia.</p>
                        <p>Otra forma de llegar a Puerto Viejo es utilizando <a href="mailto:reservas.kalawala@gmail.com?subject=Organise private transportation&body= " target="_blank" rel="noopener noreferrer">transporte privado</a>. Esta opción se puede compartir con otros viajeros o ser privada para ti y tus acompañantes, lo que la convierte en una forma conveniente y cómoda de viajar a tu destino.</p>
                        <br />
                        <p>Con el transporte privado, puedes ser recogido en el lugar que prefieras y ser dejado directamente en tu alojamiento en Puerto Viejo. Esta opción puede ser especialmente útil para aquellos que tienen equipaje pesado, prefieren más privacidad
                            o tienen necesidades de viaje específicas.</p>
                        <br />
                        <p>Dependiendo del número de viajeros, el transporte privado puede ser una opción más rentable en comparación con tomar un servicio de transporte compartido.</p>
                        <br />
                        <p>Además, ofrece la flexibilidad de establecer tu propio horario y hacer paradas en el camino para disfrutar de algunas de las hermosas vistas a lo largo de la ruta.</p>
                        {/* Smoobu Booking Component */}
                        <div className="blog-smoobu-container" style={{ maxWidth: 1000, marginTop: '2rem', marginBottom: '2rem' }}>
                            <h3 className="smoobu-title">Reserva tu Estadía</h3>
                            <div className="smoobu-wrapper">
                                <Smoobu2 targetId="travellingESSmoobuBooking" />
                            </div>
                        </div>
                        <p>Si estás interesado en reservar transporte privado a Puerto Viejo, hay varias empresas de buena reputación que ofrecen este servicio. Siempre es una buena idea investigar tus opciones y comparar precios para encontrar la mejor oferta.</p>
                        <br />
                        <p>También ofrecemos este servicio y podemos proporcionarte las rutas y precios para ayudarte a tomar la decisión más informada para tu viaje.</p>
                        <br />
                        <p>En general, ya sea que prefieras la conveniencia del transporte público o la comodidad del transporte privado, hay varias formas de llegar a Puerto Viejo. Independientemente de tu elección, seguro disfrutarás de los impresionantes paisajes
                            y la vibrante cultura de este hermoso pueblo caribeño en Talamanca, Costa Rica.
                        </p>
                        <br />
                    </div>




                    <OtherBlogs currentBlog="travellingtopuertoviejoES" blogs={blogsES} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default TravellingToPuertoES;