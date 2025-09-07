import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';
import { useParams } from "react-router-dom";
import { HouseDataType, ListingType } from "../../../utils/types";

// import Amenities from "./components/Amenities/Amenities.component";
import { AmenityType, BlogType } from "../../../utils/types";
import { blogsES } from "../../../assets/blogs/blogs";
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import ImagesContainer from "../../Listing/components/ImagesContainer/ImagesContainer.component";
import Amenities from "../../Listing/components/Amenities/Amenities.component";
import ImagesModal from "../../Listing/components/ImagesModal/ImagesModal.component";
import OtherBlogs from "../Components/OtherBlogs.Component";
import OurHomes from "../../../components/OurHomes/OurHomes.component";
//import constants
import { allHomesSnippetES } from "../../../utils/constants";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import ListingAd from "../Components/ListingAd/ListingAd.component";
import { Helmet } from "react-helmet";
import FixedNavigationES from "../../../components/FixedNavigation/FixedNavigation.componentES";
import ListingAdES from "../Components/ListingAd/ListingAd.componentES";


const TwoDaysInPV = () => {
    // const { blogId } = useParams();
    const blogId = 'twodaysinpuertoviejoES'
    const blogData = blogsES.find((blog) => blog.id === blogId);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, [])
    console.log("data:", blogData);
    const description = blogData?.text.split('<br/>');
    return (

        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>2 Días y Una Noche en Puerto Viejo</title>
                <meta name="description" content="¿Solo tienes un par de días para visitar Puerto Viejo? ¡Nosotros también! Solo tuvimos una noche viniendo desde Tortuguero y queríamos aprovechar al máximo el tiempo que teníamos en este encantador pueblo de playa ubicado en la costa caribeña sur de Costa Rica." />
                <link rel="canonical" href="https://www.reservaskalawala.com/blog/twodaysinpuertoviejo" />
            </Helmet>
            <FixedNavigationES isBlog={true} />
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 4 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } : { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <ListingAdES listings={allHomesSnippetES} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={windowWidth <= 991 ? { order: 'first', span: 12 } : { order: 'first', span: 12 }} sm={12} xs={12}>

                    <br />
                    <div className="heading title-container" style={{ maxWidth: 1000, }}>

                        <h1 className="title blog-title">2 Días y Una Noche en Puerto Viejo</h1>
                        <br />
                        <div className="border"></div>

                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="description" style={{ maxWidth: 1000, }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src="https://drive.google.com/thumbnail?id=13j6FfwVMxVg9lU4SuGST8ljrVkyW7rla&sz=w1000" className="responsive-image" alt="Kayaking in Punta Uva" />
                        </div>
                        <br />
                        <p>¿Solo tienes un par de días para visitar Puerto Viejo? ¡Nosotros también! Solo tuvimos una noche viniendo desde Tortuguero y queríamos aprovechar al máximo el tiempo que teníamos en este encantador pueblo de playa
                            ubicado en la costa caribeña sur de Costa Rica. Con su ambiente relajado, playas vírgenes y exuberante jungla tropical, Puerto Viejo es el destino perfecto para una rápida escapada de fin de semana.
                            En este artículo, compartiremos nuestra experiencia de pasar dos días en Puerto Viejo y te daremos consejos sobre cómo aprovechar al máximo tu viaje.</p>
                        <br />
                        <p>Llegamos a Puerto Viejo temprano un sábado por la mañana, emocionados por comenzar nuestra aventura. Nuestro <a href="https://reservaskalawala.com/Tucano" target="_blank" rel="noopener noreferrer">Airbnb</a> no estaba listo aún,
                            así que decidimos alquilar un ATV cerca y dirigirnos a Punta Uva para disfrutar del sol. La playa era impresionante, con aguas turquesas y tranquilas. Alquilamos kayaks y exploramos la costa.
                            Para el almuerzo, nos detuvimos en <a href="https://maps.app.goo.gl/TnyD131GeLKYeARSA" target="_blank" rel="noopener noreferrer">Selvin's</a>, un restaurante caribeño local, y probamos un delicioso pollo caribeño con rice and beans.</p>
                        <br />

                        <p>Después, nos registramos en nuestro Airbnb, tomamos una ducha refrescante y descansamos por un rato. Para la cena, decidimos probar <a href="https://maps.app.goo.gl/2vNghKagTvPVHnip6" target="_blank" rel="noopener noreferrer">Cafe Viejo</a>, un
                            restaurante italiano ubicado en el centro del pueblo. La comida fue fantástica; probamos el “Fritto Misto”, una mezcla de pescado y mariscos fritos. Más tarde esa noche, nos dirigimos a <a href="https://maps.app.goo.gl/fXnSossA1PqAfkbh9" target="_blank" rel="noopener noreferrer">Salsa Brava</a>, un bar en la playa conocido por sus noches de reggae y ambiente relajado.</p>
                        <br />

                        <p>Al día siguiente, nos levantamos más tarde de lo que hubiéramos querido, tomamos café y croissants en la <a href="https://maps.app.goo.gl/UW6EWzA4h9WQTsbX6" target="_blank" rel="noopener noreferrer">Panadería Degustibus</a> y nos dirigimos a Cocles. Hay un camino agradable y bien cuidado cerca de la panadería que conduce a Cocles, donde descubrimos un bonito mirador antes de llegar a la playa.</p>
                        <br />

                        <p>Después de nuestra caminata, regresamos a la casa para empacar y hacer el check-out. Tuvimos suerte de irnos un domingo, ya que nos dijeron que no se permiten camiones grandes en la carretera,
                            lo que hizo nuestro viaje de regreso a San José más suave de lo esperado.</p>
                        <br />

                        <p>Puerto Viejo es un excelente destino para una escapada rápida de fin de semana. Con sus impresionantes playas, vibrante vida nocturna y belleza natural, nunca te quedarás sin cosas que hacer.
                            Ya sea que busques aventura o descansar, Puerto Viejo tiene algo que ofrecer para todos. ¿Qué estás esperando? ¡Reserva tu viaje hoy y experimenta la magia de Puerto Viejo por ti mismo!
                        </p>
                    </div>
                    <OtherBlogs currentBlog="twodaysinpuertoviejoES" blogs={blogsES} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default TwoDaysInPV;