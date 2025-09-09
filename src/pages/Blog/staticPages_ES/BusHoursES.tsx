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
import { allHomesSnippetES} from "../../../utils/constants";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import ListingAdES from "../Components/ListingAd/ListingAd.componentES";
import { Helmet } from "react-helmet";


const BusHoursES = () => {
    // const { blogId } = useParams();
    
    const blogId = 'bushoursES'
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
                <title>Horarios Completos de Autobuses desde Puerto Viejo, Costa Rica - Rutas y Horarios MEPE</title>
                <meta name="description" content="Encuentra los horarios completos de autobuses desde Puerto Viejo hacia San José, Limón, Cahuita, Manzanillo y Sixaola. Horarios MEPE, rutas e información de transporte para la costa caribeña de Costa Rica." />
                <link rel="canonical" href="https://www.reservaskalawala.com/bushoursES" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/bushours" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/bushoursES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/bushours" />
            </Helmet>
            <FixedNavigation isBlog={true} />
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 4 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } : { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <ListingAdES listings={allHomesSnippetES} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={windowWidth <= 991 ? { order: 'first', span: 12 } : { order: 'first', span: 12 }} sm={12} xs={12}>

                    <br />
                    <div className="heading title-container" style={{ maxWidth: 1000, }}>

                        <h1 className="title blog-title">Horarios Completos de Autobuses desde Puerto Viejo, Costa Rica - Rutas y Horarios MEPE</h1>
                        <br />
                        <div className="border"></div>

                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="description" style={{ maxWidth: 1000, }}>
                        <p>¿Planificando tu transporte en la costa caribeña de Costa Rica? ¡No busques más! Esta guía completa te proporciona todos los horarios de autobuses que necesitas para viajar desde Puerto Viejo a destinos principales incluyendo <strong>San José</strong>, <strong>Limón</strong>, <strong>Cahuita</strong>, <strong>Manzanillo</strong> y <strong>Sixaola</strong>. Ya sea que busques "autobús San José Puerto Viejo", "autobús Cahuita Puerto Viejo" o "autobús de Puerto Viejo a San José", te tenemos cubierto con los horarios MEPE más actualizados.</p>
                        <br />
                        <h3><strong>Acerca del Servicio de Autobuses <a href="https://www.mepe.co.cr/Ingles/index.html" target="_blank" rel="noopener noreferrer">MEPE</a></strong></h3>
                        <p><strong>MEPE (Empresa de Transportes Públicos de Limón)</strong> es la empresa de autobuses principal que opera en toda la costa caribeña de Costa Rica. Conocida por su servicio confiable y red extensa, los autobuses MEPE conectan Puerto Viejo con las principales ciudades y destinos turísticos de la región. Su flota moderna proporciona transporte cómodo tanto para locales como visitantes, convirtiéndola en la opción preferida para viajeros conscientes del presupuesto que exploran la impresionante costa caribeña de Costa Rica.</p>
                        <br />
                        <p>Los autobuses MEPE son fácilmente reconocibles por sus distintivos colores azul y blanco, y operan en horarios fijos que generalmente son puntuales. La empresa ha estado sirviendo a la región del Caribe durante décadas, construyendo una reputación de seguridad, asequibilidad y cobertura integral de las rutas más importantes del área.</p>
                        <br />
                        <h3><strong>Rutas de Autobuses desde Puerto Viejo</strong></h3>
                        <p>Puerto Viejo sirve como un importante centro de transporte para la región del Caribe Sur. Desde aquí, puedes llegar fácilmente a:</p>
                        <ul>
                            <li><strong>San José</strong> - La capital de Costa Rica (aproximadamente 4-5 horas)</li>
                            <li><strong>Limón</strong> - La ciudad portuaria del Caribe (aproximadamente 1 hora)</li>
                            <li><strong>Cahuita</strong> - Famosa por su parque nacional y playas (aproximadamente 30 minutos)</li>
                            <li><strong>Manzanillo</strong> - Puerta de entrada al Refugio de Vida Silvestre Gandoca-Manzanillo (aproximadamente 20 minutos)</li>
                            <li><strong>Sixaola</strong> - Ciudad fronteriza con Panamá (aproximadamente 1.5 horas)</li>
                        </ul>
                        <br />
                        <h3><strong>Horarios Completos de Autobuses</strong></h3>
                        <br />
                        <h4><strong>San José ↔ Puerto Viejo (para en Cahuita)</strong></h4>
                        <p>Esta es la ruta principal que conecta Puerto Viejo con la capital de Costa Rica. Perfecta para viajeros que llegan o se dirigen al Aeropuerto Internacional de San José.</p>
                        <br />
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', width: '50%' }}>Ruta</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '50%' }}>Horarios de Salida</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}><strong>San José → Puerto Viejo</strong></td>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', fontSize: '14px' }}>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>6:00 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>8:00 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>10:00 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>2:00 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>4:00 PM</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: '#f9f9f9' }}>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}><strong>Puerto Viejo → San José</strong></td>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', fontSize: '14px' }}>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>3:00 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>5:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>9:00 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>12:00 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>4:00 PM</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <h4><strong>Limón ↔ Puerto Viejo (para en Cahuita)</strong></h4>
                        <p>Esta es una de las rutas más frecuentes, conectando Puerto Viejo con la ciudad portuaria de Limón. Perfecta para viajeros que se dirigen hacia o desde San José, ya que Limón sirve como un importante punto de conexión.</p>
                        <br />
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', width: '25%' }}>Ruta</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '37.5%' }}>Lunes - Sábado</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '37.5%' }}>Domingo y Feriados</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}><strong>Limón → Puerto Viejo</strong></td>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', fontSize: '14px' }}>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>5:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>6:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>7:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>8:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>9:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>10:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>11:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>12:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>1:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>2:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>3:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>4:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>6:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>7:00 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>8:00 PM</span>
                                            </div>
                                        </td>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', fontSize: '14px' }}>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>6:30 AM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>8:30 AM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>9:30 AM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>10:30 AM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>11:30 AM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>12:30 PM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>2:30 PM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>4:30 PM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>6:30 PM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>7:00 PM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>8:00 PM</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: '#f9f9f9' }}>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}><strong>Puerto Viejo → Limón</strong></td>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', fontSize: '14px' }}>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>5:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>6:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>7:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>8:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>9:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>10:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>11:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>12:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>1:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>2:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>3:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>4:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>5:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>6:30 PM</span>
                                            </div>
                                        </td>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', fontSize: '14px' }}>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>5:30 AM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>7:30 AM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>9:30 AM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>11:30 AM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>1:30 PM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>3:30 PM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>5:30 PM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>6:30 PM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>8:15 PM</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <h4><strong>Puerto Viejo ↔ Manzanillo</strong></h4>
                        <p>Esta ruta te lleva a las hermosas playas de Manzanillo y proporciona acceso al Refugio Nacional de Vida Silvestre Gandoca-Manzanillo.</p>
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
                        <h4><strong>Sixaola ↔ Puerto Viejo (para en Bri Bri)</strong></h4>
                        <p>Esta ruta conecta Puerto Viejo con la ciudad fronteriza de Sixaola, perfecta para viajeros que se dirigen a Panamá. La ruta también para en Bri Bri, proporcionando acceso a comunidades indígenas y experiencias culturales.</p>
                        <br />
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', width: '25%' }}>Ruta</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '37.5%' }}>Lunes - Sábado</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '37.5%' }}>Domingo y Feriados</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}><strong>Sixaola → Puerto Viejo</strong></td>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', fontSize: '14px' }}>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>5:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>6:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>7:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>8:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>9:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>10:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>11:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>12:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>1:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>2:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>3:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>4:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>5:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>7:00 PM</span>
                                            </div>
                                        </td>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', fontSize: '14px' }}>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>5:30 AM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>7:30 AM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>9:30 AM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>11:30 AM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>1:30 PM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>3:30 PM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>5:30 PM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>7:00 PM</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ backgroundColor: '#f9f9f9' }}>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}><strong>Puerto Viejo → Sixaola</strong></td>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', fontSize: '14px' }}>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>6:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>7:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>8:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>9:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>10:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>11:30 AM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>12:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>1:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>2:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>3:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>4:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>5:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>6:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>7:30 PM</span>
                                                <span style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>8:15 PM</span>
                                            </div>
                                        </td>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', fontSize: '14px' }}>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>6:30 AM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>8:30 AM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>10:30 AM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>12:30 PM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>2:30 PM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>4:30 PM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>6:30 PM</span>
                                                <span style={{ backgroundColor: '#f0f8e8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>8:15 PM</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <h3><strong>Consejos para Viajar en Autobús en Puerto Viejo</strong></h3>
                        <ul>
                            <li><strong>Llega Temprano:</strong> Los autobuses pueden llenarse rápidamente, especialmente durante la temporada alta turística</li>
                            <li><strong>Solo Efectivo:</strong> Los autobuses MEPE solo aceptan pagos en efectivo - ten colones listos</li>
                            <li><strong>Equipaje:</strong> Las bolsas pequeñas se pueden guardar arriba, el equipaje más grande va en el área de carga</li>
                            <li><strong>Comodidad:</strong> Trae agua y bocadillos para viajes más largos</li>
                            <li><strong>Conexiones:</strong> aunque Limón es el centro principal para conexiones a San José y otros destinos, también puedes llegar a Puerto Viejo desde San José.</li>
                        </ul>
                        <br />
                        <h3><strong>Dónde Comprar Boletos</strong></h3>
                        <p>Los boletos de autobús se pueden comprar en las paradas principales de autobús en Puerto Viejo. La parada principal de autobús está ubicada cerca de la cancha de baloncesto en el centro de Puerto Viejo, cerca de la Heladería Deleite.</p>
                        <br />
                        <h3><strong>Contacto para Información de Autobuses</strong></h3>
                        <p>¿Necesitas información actualizada sobre horarios o rutas? Puedes contactarnos por WhatsApp para obtener la información más reciente sobre los servicios de autobús:</p>
                        <p><strong>WhatsApp: <a href="https://wa.me/50672852592" target="_blank" rel="noopener noreferrer">+(506) 7285-2592</a></strong></p>
                        <br />
                        <p>Para la estadía más cómoda mientras exploras la costa caribeña, considera reservar una de nuestras casas completamente equipadas en Puerto Viejo o Playa Chiquita. ¡Ofrecemos ubicaciones convenientes cerca de las paradas de autobús y proporcionamos todas las comodidades que necesitas para una escapada perfecta costarricense!</p>
                    </div>
                    <OtherBlogs currentBlog="bushoursES" blogs={blogsES} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default BusHoursES;