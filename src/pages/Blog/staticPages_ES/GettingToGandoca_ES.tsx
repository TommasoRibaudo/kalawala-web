import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';
import { useParams } from "react-router-dom";
import { HouseDataType, ListingType } from "../../../utils/types";

// import Amenities from "./components/Amenities/Amenities.component";
import { AmenityType, BlogType } from "../../../utils/types";
import { blogs } from "../../../assets/blogs/blogs";
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import ImagesContainer from "../../Listing/components/ImagesContainer/ImagesContainer.component";
import Amenities from "../../Listing/components/Amenities/Amenities.component";
import ImagesModal from "../../Listing/components/ImagesModal/ImagesModal.component";
import OtherBlogs from "../Components/OtherBlogs.Component";
import OurHomes from "../../../components/OurHomes/OurHomes.component";
//import constants
import { allHomesSnippetES} from "../../../utils/constants";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import ListingAd from "../Components/ListingAd/ListingAd.component";
import { Helmet } from "react-helmet";


const TwoDaysInPV = () => {
    // const { blogId } = useParams();
    
    const blogId = 'gettingtogandocaES'
    const blogData = blogs.find((blog) => blog.id === blogId);
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
                <title>Cómo Llegar al Refugio Nacional Gandoca-Manzanillo desde Puerto Viejo, Costa Rica</title>
                <meta name="description" content="El Refugio Nacional Gandoca-Manzanillo, ubicado en la provincia de Limón, es uno de los secretos mejor guardados del Caribe Sur de Costa Rica. Este impresionante refugio de vida silvestre ofrece una rica variedad de ecosistemas, desde manglares y arrecifes de coral hasta playas vírgenes." />
                <link rel="canonical" href="https://www.reservaskalawala.com/blog/gettingtogandocaES" />
            </Helmet>
            <FixedNavigation isBlog={true} />
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 4 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } : { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <ListingAd listings={allHomesSnippetES} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={windowWidth <= 991 ? { order: 'first', span: 12 } : { order: 'first', span: 12 }} sm={12} xs={12}>

                    <br />
                    <div className="heading title-container" style={{ maxWidth: 1000, }}>

                        <h1 className="title blog-title">Cómo Llegar al Refugio Nacional Gandoca-Manzanillo desde Puerto Viejo, Costa Rica</h1>
                        <br />
                        <div className="border"></div>

                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="description" style={{ maxWidth: 1000, }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src="https://cdn.pixabay.com/photo/2020/01/07/05/11/beach-4746787_960_720.jpg" className="responsive-image" style={{ maxWidth: 1000, }} alt="Playa del Refugio Nacional Gandoca-Manzanillo" />
                        </div>
                        <br />
                        <p>El <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Refugio Nacional Gandoca-Manzanillo</a>, ubicado en la provincia de Limón, es uno de los secretos mejor guardados del Caribe Sur de Costa Rica. Este impresionante refugio de vida silvestre ofrece una rica variedad de ecosistemas, desde manglares y arrecifes de coral hasta playas vírgenes. Si estás en Puerto Viejo de Talamanca y buscas una escapada a la naturaleza, esta es una excelente opción. En esta guía, te mostramos cómo llegar fácilmente desde Puerto Viejo para que puedas explorar al máximo este paraíso natural.</p>
                        <br />
                        <h3><strong>Opciones de Transporte</strong></h3>
                        <br />
                        <h4><strong>1. Autobús desde Puerto Viejo a Manzanillo</strong></h4>
                        <p>La forma más sencilla y económica de llegar al <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Refugio Nacional Gandoca-Manzanillo</a> es tomando un autobús desde el centro de Puerto Viejo con destino a Manzanillo. La <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">parada</a> se encuentra donde se compran los tiquetes, cerca de la cancha de baloncesto o por la Heladería Deleite.</p>
                        <br />
                        <p><strong>Horarios de los buses:</strong></p>
                        <br />
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Ruta</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Horarios de Salida</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}><strong>Puerto Viejo → Manzanillo</strong></td>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', fontSize: '14px' }}>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>7:40 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>8:10 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>9:40 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>11:40 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>1:40 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>4:40 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>6:40 PM</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: '#f9f9f9' }}>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}><strong>Manzanillo → Puerto Viejo</strong></td>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', fontSize: '14px' }}>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>5:00 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>6:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>8:00 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>10:00 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>10:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>12:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>1:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>3:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>4:00 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>5:00 PM</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <h4><strong>2. Rentar un Scooter o un 4x4</strong></h4>
                        <p>Si prefieres explorar a tu propio ritmo, rentar un scooter o un 4x4 es una excelente opción. Si te hospedas en nuestras casas en el centro de Puerto Viejo, puedes rentar vehículos en <a href="https://maps.app.goo.gl/uao7BMUuwFLyRL6dA" target="_blank" rel="noopener noreferrer">Mistery Jungle</a>, justo al frente, con precios que comienzan en $30. Si estás alojado en nuestras villas en Playa Chiquita, puedes solicitar que te entreguen el vehículo directamente en tu villa.</p>
                        <br />
                        <p>Esta opción es ideal para quienes buscan una aventura personalizada, ya que te permite hacer paradas donde desees y recorrer el encantador pueblo de Manzanillo sin preocuparte por los horarios del autobús. Disfruta de la libertad de explorar a tu manera y descubre todos los rincones que este hermoso destino tiene para ofrecer.</p>
                        <br />
                        <h4><strong>3. Viajar en Carro desde Puerto Viejo</strong></h4>
                        <p>Si decides viajar en carro desde Puerto Viejo, simplemente toma dirección a Manzanillo y recorre los 14 km de distancia. Al llegar, encontrarás estacionamiento disponible fuera de la reserva, donde algunas personas de la zona ofrecen cuidar tu vehículo a cambio de una pequeña tarifa. Te recomendamos no dejar objetos de valor dentro del carro por seguridad.</p>
                        <br />
                        <h3><strong>Conclusión</strong></h3>
                        <p>El Refugio Nacional Gandoca-Manzanillo es un destino imperdible para los amantes de la naturaleza y la aventura. Ya sea que decidas viajar en autobús, rentar un vehículo o ir en carro, llegar a este paraíso natural es fácil y accesible.</p>
                        <br />
                        <p>Te invitamos a planificar tu visita a este hermoso refugio y a aprovechar la oportunidad de hospedarte en nuestras acogedoras casas en Puerto Viejo de Talamanca. Ofrecemos un ambiente cómodo y relajante, perfecto para disfrutar de la naturaleza y explorar todo lo que la región tiene para ofrecer. ¡No esperes más y ven a descubrir el encanto del Refugio Nacional Gandoca-Manzanillo y la calidez de nuestras villas!</p>
                    </div>
                    <OtherBlogs currentBlog="gettingtogandocaES" blogs={blogs} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default TwoDaysInPV;