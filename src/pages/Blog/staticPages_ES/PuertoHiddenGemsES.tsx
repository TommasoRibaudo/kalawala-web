import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';

// import Amenities from "./components/Amenities/Amenities.component";
import { blogsES } from "../../../assets/blogs/blogs";
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import OtherBlogs from "../Components/OtherBlogs.Component";
//import constants
import { allHomesSnippetES, PUERTO_VIEJO_BLOG_RECOMMENDATIONS } from "../../../utils/constants";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import ListingAdES from "../Components/ListingAd/ListingAd.componentES";
import { Helmet } from "react-helmet";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";
import Smoobu2 from "../../../components/Smoobu2/Smoobu2.component";
import { PUERTO_VIEJO_BLOG_RECOMMENDATIONS_ES } from "../../../utils/constants";
import FixedNavigationES from "../../../components/FixedNavigation/FixedNavigation.componentES";
import OtherBlogsES from "../Components/OtherBlogs.ComponentES";


const BestTimeToVisitPuertoES = () => {
    // const { blogId } = useParams();

    const blogId = 'puertoHiddenGemsES'
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
                <title>Joyas escondidas en Puerto Viejo</title>
                <meta
                    name="description"
                    content="Puerto Viejo tiene playas famosas, música y vida nocturna. Pero algunos de sus mejores lugares quedan fuera de las listas más conocidas. Son espacios más tranquilos, conectados con la naturaleza y con un sabor local auténtico. Si buscas menos gente y experiencias reales, empieza aquí."
                />
                <link rel="canonical" href="https://www.reservaskalawala.com/puertoHiddenGemsES" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/puertoHiddenGems" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/puertoHiddenGemsES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/puertoHiddenGems" />
            </Helmet>

            <FixedNavigation isBlog={true} />

            <Row className="subContainer" style={{ justifyContent: 'center' }}>
                <Col
                    className="info col"
                    lg={{ order: 'first', span: 8 }}
                    md={{ order: 'first', span: 10 }}
                    sm={12}
                    xs={12}
                >
                    <div className="blog-header" style={{ maxWidth: 1000, marginBottom: '2rem' }}>
                        <div className="heading title-container">
                            <h1 className="title blog-title">
                                Joyas escondidas en Puerto Viejo
                            </h1>
                            <div className="border"></div>
                        </div>

                        <div
                            className="blog-hero-image"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '1.5rem',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Puerto_Viejo_de_Talamanca%2C_Costa_Rica_2012.JPG/960px-Puerto_Viejo_de_Talamanca%2C_Costa_Rica_2012.JPG?20120902175205"
                                className="responsive-image"
                                style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                                alt="Kayak en Punta Uva"
                                width="1000"
                                height="600"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    Foto por{' '}
                    <a
                        href="https://commons.wikimedia.org/wiki/User:Letartean"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Letartean
                    </a>
                    <br />
                    <br />

                    <div className="description" style={{ maxWidth: 1000 }}>
                        <p>
                            Puerto Viejo es fácil de amar. La mayoría de los visitantes va a las playas más
                            conocidas, se toma un cóctel en el pueblo y sigue al siguiente destino. Pero los mejores
                            momentos suelen aparecer en lugares más tranquilos: pequeñas caletas, tramos de
                            arena escondidos y comidas sencillas que saben a Caribe.
                        </p>
                        <br />

                        <p>
                            A continuación te compartimos algunas joyas escondidas alrededor de Puerto Viejo de Talamanca, Costa Rica,
                            que se sienten más calmadas y personales. No requieren planes complicados. Solo
                            un poco de tiempo, protección solar y ganas de ir despacio.
                        </p>
                        <br />

                        {/* Optional: Stay Recommendation Component - place near the top */}
                        <StayRecommendation
                            title="Dónde hospedarte en Puerto Viejo para llegar fácil a estas joyas escondidas"
                            properties={PUERTO_VIEJO_BLOG_RECOMMENDATIONS}
                            language="es"
                        />
                        <br />

                        <h2>
                            <a
                                href="https://maps.app.goo.gl/tTS4h2KYududsyh8A"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Playa Chiquita
                            </a>
                        </h2>
                        <p>
                            Playa Chiquita es un tramo de playa más apartado que muchas personas pasan por
                            alto. Se siente recogido, con menos gente y un ambiente más relajado.
                        </p>
                        <br />
                        <p>
                            El mar no siempre está completamente calmado, pero la energía del lugar sí lo
                            está. Es un sitio ideal para una mañana lenta.
                        </p>
                        <br />
                        <p>
                            Ideal para:
                            <ul>
                                <li>Descansar bajo los árboles</li>
                                <li>Explorar caminando</li>
                                <li>Un picnic sencillo</li>
                            </ul>
                        </p>
                        <br />

                        <h2>
                            <a
                                href="https://maps.app.goo.gl/zpRcsq96dC9MnVRU7"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Playa Grande
                            </a>
                        </h2>
                        <p>
                            Playa Grande es conocida entre surfistas, pero también es una de las playas más
                            impactantes de la zona. Es amplia, abierta y mucho menos transitada que otras.
                        </p>
                        <br />
                        <p>
                            Aunque no practiques surf, vale la pena visitarla por el paisaje y las caminatas
                            largas. Eso sí, las olas suelen ser fuertes.
                        </p>
                        <br />
                        <p>
                            A tener en cuenta:
                            <ul>
                                <li>Mejor para surfistas con experiencia que para nadar</li>
                                <li>Excelente para fotos y caminatas</li>
                                <li>Suele ser más tranquila que Cocles</li>
                            </ul>
                        </p>
                        <br />

                        <h2>
                            <a
                                href="https://www.jaguarrescue.foundation"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Caletas de Punta Cocles y Jaguar Rescue Center
                            </a>
                        </h2>
                        <p>
                            Frente al{' '}
                            <a
                                href="https://www.jaguarrescue.foundation"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Jaguar Rescue Center
                            </a>
                            , encontrarás pequeñas caletas y rincones de playa más tranquilos. Las formaciones
                            rocosas dividen la costa y facilitan encontrar un espacio con sensación de
                            privacidad.
                        </p>
                        <br />
                        <p>
                            Además, esta zona es excelente para observar fauna. Es común ver monos entre los
                            árboles o algún perezoso cerca de la carretera.
                        </p>
                        <br />
                        <p>Consejo: ve temprano en la mañana para menos gente y más actividad animal.</p>
                        <br />

                        <h2>Kayak en Punta Uva sin tour</h2>
                        <p>
                            Punta Uva es famosa por su playa, pero el río es el verdadero secreto. No necesitas
                            contratar un tour. Basta con alquilar un kayak y explorar a tu ritmo.
                        </p>
                        <br />
                        <p>
                            El agua suele estar tranquila y la selva se siente muy cerca en ambos lados. Es una
                            experiencia relajada, incluso si no tienes mucha experiencia remando.
                        </p>
                        <br />
                        <p>
                            Lleva contigo:
                            <ul>
                                <li>Protección solar</li>
                                <li>Agua y una bolsa seca</li>
                                <li>Distancia respetuosa con la fauna</li>
                            </ul>
                        </p>
                        <br />

                        <h2>Restaurante Caribeño 1872 y su rice and beans</h2>
                        <p>
                            Si buscas una comida realmente local, visita{' '}
                            <a
                                href="https://maps.app.goo.gl/ynskDRDozJkGW1ML6"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Restaurante Caribeño 1872
                            </a>
                            . Su rice and beans es uno de esos platos simples que se vuelven inolvidables
                            cuando están bien hechos.
                        </p>
                        <br />
                        <p>
                            El sabor es intenso, las porciones generosas y el ambiente relajado. Es el tipo de
                            lugar al que dan ganas de volver.
                        </p>
                        <br />

                        <h2>
                            <a
                                href="https://maps.app.goo.gl/8dDzcZiUrhuuPmCy8"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Punta Mona y el Refugio de Vida Silvestre Gandoca-Manzanillo
                            </a>
                        </h2>
                        <p>
                            Punta Mona se siente lejana, en el mejor sentido. Puedes alquilar una lancha y pedir
                            que te lleven por la costa hasta playas vírgenes y tranquilas dentro del Refugio de
                            Vida Silvestre Gandoca-Manzanillo.
                        </p>
                        <br />
                        <p>
                            La recompensa es agua clara, orillas silenciosas y la sensación de haber dejado
                            atrás el movimiento del mundo.
                        </p>
                        <br />
                        <p>
                            Recomendaciones:
                            <ul>
                                <li>Lleva agua y algo de comer (no hay tiendas)</li>
                                <li>Elige días con buen clima y mar tranquilo</li>
                                <li>Llévate de vuelta todo lo que lleves</li>
                            </ul>
                        </p>
                        <br />

                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs language="es" ctaLink="/" />
                        </div>

                        <h2>Consejos rápidos para disfrutar estos lugares</h2>
                        <p>
                            Pequeñas decisiones pueden marcar una gran diferencia en Puerto Viejo, tanto para
                            tu experiencia como para los sitios que visitas.
                        </p>
                        <br />
                        <p>
                            <ul>
                                <li>Empieza temprano para encontrar playas más tranquilas</li>
                                <li>Usa bloqueador solar amigable con los arrecifes</li>
                                <li>Mantén distancia y respeto con la fauna</li>
                                <li>No dejes objetos de valor en la playa</li>
                            </ul>
                        </p>
                        <br />

                        <p>
                            Estas joyas escondidas son las que hacen que el viaje se sienta especial: aguas
                            tranquilas, costas salvajes y comida que sabe a hogar caribeño. Elige dos o tres y
                            deja espacio para ir sin prisa. Ahí es cuando Puerto Viejo muestra su mejor cara.
                        </p>
                    </div>

            <div
                className="blog-smoobu-container"
                style={{
                    maxWidth: 1000,
                    marginTop: '2rem',
                    marginBottom: '2rem',
                }}
            >
                <h3 className="smoobu-title">Reserva Tu Estadía</h3>
                <div className="smoobu-wrapper">
                    <Smoobu2 targetId="mejorEpocaPuertoViejoSmoobuBooking" />
                </div>
            </div>

            <OtherBlogsES currentBlog="mejorEpocaPuertoViejo" blogs={blogsES} />
        </Col>
            </Row >

    <ContactUs />
        </div >

    )

}

export default BestTimeToVisitPuertoES;