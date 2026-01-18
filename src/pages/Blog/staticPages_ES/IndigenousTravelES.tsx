import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';

// import Amenities from "./components/Amenities/Amenities.component";
import { blogsES } from "../../../assets/blogs/blogs";
//import constants
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import { Helmet } from "react-helmet";
import ListingAdES from "../Components/ListingAd/ListingAd.componentES";
import FixedNavigationES from "../../../components/FixedNavigation/FixedNavigation.componentES";
import { allHomesSnippetES } from "../../../utils/constants";
import OtherBlogs from "../Components/OtherBlogs.Component";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";
import Smoobu2 from "../../../components/Smoobu2/Smoobu2.component";
import { PUERTO_VIEJO_BLOG_RECOMMENDATIONS_ES } from "../../../utils/constants";


const IndigenousTravelES = () => {
    // const { blogId } = useParams();
    const blogId = 'indigenousTravelPVES'
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
                <title>Cultura Indígena Cerca de Puerto Viejo de Talamanca</title>
                <meta
                    name="description"
                    content="Descubre la cultura indígena Bribri cerca de Puerto Viejo de Talamanca. Aprende sobre cacao ancestral, medicina tradicional y experiencias culturales auténticas en comunidades indígenas del Caribe Sur de Costa Rica."
                />
                <link
                    rel="canonical"
                    href="https://www.reservaskalawala.com/indigenousTravelPVES"
                />
                <link
                    rel="alternate"
                    hrefLang="en"
                    href="https://www.reservaskalawala.com/indigenousTravelPV"
                />
                <link
                    rel="alternate"
                    hrefLang="es"
                    href="https://www.reservaskalawala.com/indigenousTravelPVES"
                />
                <link
                    rel="alternate"
                    hrefLang="x-default"
                    href="https://www.reservaskalawala.com/indigenousTravelPV"
                />
            </Helmet>

            <FixedNavigationES isBlog={true} />

            <Row className="subContainer" style={{ justifyContent: 'center' }}>
                <Col
                    className="info col"
                    lg={{ order: 'first', span: 8 }}
                    md={{ order: 'first', span: 10 }}
                    sm={12}
                    xs={12}
                >
                    <br />

                    <div className="heading title-container" style={{ maxWidth: 1000 }}>
                        <h1 className="title blog-title">
                            Cultura Indígena Cerca de Puerto Viejo de Talamanca
                        </h1>
                        <br />
                        <div className="border"></div>
                    </div>

                    <br />
                    <br />
                    <br />
                    <br />

                    <div className="description" style={{ maxWidth: 1000 }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Palenque_bribri._Costa_Rica.jpg?20170604221517"
                                className="responsive-image"
                                alt="Cultura indígena Bribri cerca de Puerto Viejo"
                            />
                        </div>

                        <br />

                        <p>
                            Puerto Viejo de Talamanca es conocido por sus playas, su
                            ambiente relajado y su selva tropical. Pero muy cerca del
                            pueblo existe otra experiencia que muchos viajeros pasan
                            por alto.
                        </p>

                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title="¿Busca Casas Equipadas en Puerto Viejo?"
                            properties={PUERTO_VIEJO_BLOG_RECOMMENDATIONS_ES}
                            language="es"
                        />
                        <p>
                            Lejos de las costas turisticas, se encuentran territorios indígenas donde
                            la cultura no es un espectáculo, sino parte de la vida
                            diaria. Visitar estas comunidades permite entender otra
                            forma de vivir en el Caribe Sur de Costa Rica.
                        </p>

                        <br />

                        <h2>Territorios Indígenas Cerca de Puerto Viejo</h2>

                        <p>
                            Puerto Viejo se ubica cerca del Territorio Indígena Bribri
                            de Talamanca y de la Reserva Indígena Keköldi. Estas tierras
                            son hogar del pueblo Bribri, uno de los grupos indígenas
                            más importantes del país.
                        </p>

                        <br />

                        <p>
                            Aquí se conservan el idioma Bribri, la agricultura
                            tradicional, el uso de plantas medicinales y una fuerte
                            conexión con la naturaleza. No son zonas turísticas
                            artificiales, son comunidades vivas.
                        </p>

                        <br />

                        <h2>¿Cómo Son las Experiencias Culturales?</h2>

                        <p>
                            Las visitas suelen ser guiadas por personas de la misma
                            comunidad. Los grupos son pequeños y el enfoque es
                            educativo y respetuoso.
                        </p>

                        <br />

                        <h3>Vida diaria y comunidad</h3>

                        <p>
                            Durante el recorrido, los visitantes conocen cómo viven
                            las familias, cómo organizan su trabajo diario y cómo se
                            relacionan con la tierra que habitan.
                        </p>

                        <br />

                        <h3>Cacao y tradición</h3>

                        <p>
                            El cacao tiene un papel central en la cultura Bribri. Muchas
                            experiencias muestran el proceso ancestral de preparación,
                            desde el fruto hasta la bebida final.
                        </p>

                        <br />

                        <p>
                            Además de probar el cacao, los guías explican su valor
                            cultural y espiritual dentro de la comunidad.
                        </p>

                        <br />

                        <h3>Plantas medicinales y naturaleza</h3>

                        <p>
                            Algunos recorridos incluyen caminatas por el bosque para
                            aprender sobre plantas medicinales y su uso tradicional.
                        </p>

                        <br />

                        <p>
                            Muchas visitas terminan en cascadas ubicadas dentro del
                            territorio indígena, espacios valorados tanto por su
                            belleza natural como por su significado cultural.
                        </p>

                        <br />

                        <h2>Agencias Locales en Puerto Viejo</h2>

                        <p>
                            En Puerto Viejo existen agencias locales que trabajan en
                            conjunto con comunidades indígenas para ofrecer estas
                            experiencias de forma responsable.
                        </p>

                        <br />

                        <ul>
                            <li>
                                <a href="https://lifeculturetravelcostarica.com/" target="_blank" rel="noopener noreferrer">
                                    <strong>Life Culture Travel Costa Rica</strong>
                                </a> – Ofrece experiencias culturales que incluyen visitas a comunidades Bribri, tours de cacao, caminatas de plantas medicinales y aprendizaje sobre la vida local.
                            </li>
                            <li>
                                <a href="https://exploradoresoutdoors.com/tours/indigenous-experience-chocolate-tour/" target="_blank" rel="noopener noreferrer">
                                    <strong>Exploradores Outdoors</strong>
                                </a> – Brinda tours indígenas enfocados en tradiciones Bribri, cacao ancestral, plantas medicinales y visitas a cascadas dentro del territorio indígena.
                            </li>
                            <li>
                                <a href="https://www.viator.com/tours/Limon/Chocolate-taste-true/d4513-238841P2" target="_blank" rel="noopener noreferrer">
                                    <strong>Bribri Magic Chocolate & Waterfall Experience</strong>
                                </a> – Operador de grupos pequeños que combina la preparación tradicional de cacao, aprendizaje cultural Bribri y una visita a una cascada.
                            </li>
                        </ul>
                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs
                                language="es"
                                ctaLink="/HomeES"
                            />
                        </div>

                        <p>
                            Al reservar, es recomendable preguntar si el tour es guiado
                            por miembros de la comunidad y cómo se distribuyen los
                            beneficios.
                        </p>

                        <br />

                        <h2>Consejos Prácticos para la Visita</h2>

                        <p>
                            Estas experiencias están disponibles durante todo el año y
                            suelen comenzar por la mañana.
                        </p>

                        <br />

                        <p>
                            Se recomienda llevar zapatos cerrados, agua, protección
                            solar y repelente. Siempre sigue las indicaciones del guía
                            y pide permiso antes de tomar fotografías.
                        </p>

                        <br />

                        <p>
                            Comprar artesanías o productos directamente a las familias
                            es una forma concreta de apoyar a la comunidad.
                        </p>

                        <br />

                        <h2>Una Forma Distinta de Conocer el Caribe Sur</h2>

                        <p>
                            Explorar la cultura indígena cerca de Puerto Viejo añade una
                            dimensión más profunda al viaje. Es una oportunidad para aprender y conocer la cultura local
                        </p>

                        <br />

                        <p>
                            Es una experiencia tranquila, auténtica y muy distinta a
                            las actividades típicas de playa. Ideal para quienes
                            buscan entender mejor el lugar que visitan.
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
                        <h3 className="smoobu-title">Reserva tu Estadía</h3>
                        <div className="smoobu-wrapper">
                            <Smoobu2 targetId="indigenousCultureESSmoobuBooking" />
                        </div>
                    </div>

                    <OtherBlogs
                        currentBlog="indigenousTravelPVES"
                        blogs={blogsES}
                    />
                </Col>
            </Row>

            <ContactUs />
        </div>

    )

}

export default IndigenousTravelES;