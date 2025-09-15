import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
//import constants
import { allHomesSnippet} from "../../../utils/constants";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import ListingAd from "../Components/ListingAd/ListingAd.component";
import { Helmet } from "react-helmet";
import { blogs } from "../../../assets/blogs/blogs";
import OtherBlogs from "../Components/OtherBlogs.Component";


const BusHours = () => {
    // const { blogId } = useParams();
    
    const blogId = 'bushours'
    const blogData = blogs.find((blog) => blog.id === blogId);
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
                <title>Complete Bus Schedule from Puerto Viejo, Costa Rica - MEPE Bus Routes & Timetables</title>
                <meta name="description" content="Find the complete bus schedule from Puerto Viejo to San Jose, Limón, Cahuita, Manzanillo, and Sixaola. MEPE bus timetables, routes, and transportation information for Costa Rica's Caribbean coast." />
                <link rel="canonical" href="https://www.reservaskalawala.com/bushours" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/bushours" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/bushoursES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/bushours" />
            </Helmet>
            <FixedNavigation isBlog={true} />
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 4 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } : { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <ListingAd listings={allHomesSnippet} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={windowWidth <= 991 ? { order: 'first', span: 12 } : { order: 'first', span: 12 }} sm={12} xs={12}>

                    <br />
                    <div className="heading title-container" style={{ maxWidth: 1000, }}>

                        <h1 className="title blog-title">Complete Bus Schedule from Puerto Viejo, Costa Rica - MEPE Bus Routes & Timetables</h1>
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
                        <p>Planning your transportation in Costa Rica's Caribbean coast? Look no further! This comprehensive guide provides you with all the bus schedules you need to travel from Puerto Viejo to major destinations including <strong>San Jose</strong>, <strong>Limón</strong>, <strong>Cahuita</strong>, <strong>Manzanillo</strong>, and <strong>Sixaola</strong>. Whether you're searching for "bus San Jose Puerto Viejo", "bus Cahuita Puerto Viejo", or "bus from Puerto Viejo to San Jose", we've got you covered with the most up-to-date MEPE bus timetables.</p>
                        <br />
                        <h3><strong>About MEPE Bus Service</strong></h3>
                        <p><strong><a href="https://www.mepe.co.cr/Ingles/index.html" target="_blank" rel="noopener noreferrer">MEPE</a> (Empresa de Transportes Públicos de Limón)</strong> is the primary bus company operating throughout Costa Rica's Caribbean coast. Known for their reliable service and extensive network, MEPE buses connect Puerto Viejo with major cities and tourist destinations across the region. Their modern fleet provides comfortable transportation for both locals and visitors, making it the preferred choice for budget-conscious travelers exploring Costa Rica's stunning Caribbean coastline.</p>
                        <br />
                        <p>MEPE buses are easily recognizable by their distinctive blue and white colors, and they operate on fixed schedules that are generally punctual. The company has been serving the Caribbean region for decades, building a reputation for safety, affordability, and comprehensive coverage of the area's most important routes.</p>
                        <br />
                        <h3><strong>Bus Routes from Puerto Viejo</strong></h3>
                        <p>Puerto Viejo serves as a major transportation hub for the Southern Caribbean region. From here, you can easily reach:</p>
                        <ul>
                            <li><strong>San Jose</strong> - Costa Rica's capital city (approximately 4-5 hours)</li>
                            <li><strong>Limón</strong> - The Caribbean port city (approximately 1 hour)</li>
                            <li><strong>Cahuita</strong> - Famous for its national park and beaches (approximately 30 minutes)</li>
                            <li><strong>Manzanillo</strong> - Gateway to Gandoca-Manzanillo Wildlife Refuge (approximately 20 minutes)</li>
                            <li><strong>Sixaola</strong> - Border town with Panama (approximately 1.5 hours)</li>
                        </ul>
                        <br />
                        <h3><strong>Complete Bus Schedules</strong></h3>
                        <br />
                        <h4><strong>San José ↔ Puerto Viejo (stops in Cahuita)</strong></h4>
                        <p>This is the main route connecting Puerto Viejo with Costa Rica's capital city. Perfect for travelers arriving from or heading to San José International Airport.</p>
                        <br />
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', width: '50%' }}>Route</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '50%' }}>Departure Times</th>
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
                        <h4><strong>Limón ↔ Puerto Viejo (stops in Cahuita)</strong></h4>
                        <p>This is one of the most frequent routes, connecting Puerto Viejo with the port city of Limón. Perfect for travelers heading to or from San Jose, as Limón serves as a major connection point.</p>
                        <br />
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', width: '25%' }}>Route</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '37.5%' }}>Monday - Saturday</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '37.5%' }}>Sunday & Holidays</th>
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
                        <p>This route takes you to the beautiful beaches of Manzanillo and provides access to the Gandoca-Manzanillo National Wildlife Refuge.</p>
                        <br />
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Route</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Departure Times</th>
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
                        <h4><strong>Sixaola ↔ Puerto Viejo (stops in Bri Bri)</strong></h4>
                        <p>This route connects Puerto Viejo with the border town of Sixaola, perfect for travelers heading to Panama. The route also stops in Bri Bri, providing access to indigenous communities and cultural experiences.</p>
                        <br />
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left', width: '25%' }}>Route</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '37.5%' }}>Monday - Saturday</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center', width: '37.5%' }}>Sunday & Holidays</th>
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
                        <h3><strong>Tips for Bus Travel in Puerto Viejo</strong></h3>
                        <ul>
                            <li><strong>Arrive Early:</strong> Buses can fill up quickly, especially during peak tourist season</li>
                            <li><strong>Cash Only:</strong> MEPE buses accept cash payments only - have colones ready</li>
                            <li><strong>Baggage:</strong> Small bags can be stored overhead, larger luggage goes in the cargo area</li>
                            <li><strong>Comfort:</strong> Bring water and snacks for longer journeys</li>
                            <li><strong>Connections:</strong> while Limón is the main hub for connections to San Jose and other destinations, you can also get to Puerto Viejo from San Jose.</li>
                        </ul>
                        <br />
                        <h3><strong>Where to Buy Tickets</strong></h3>
                        <p>Bus tickets can be purchased at the main bus stops in Puerto Viejo. The primary bus stop is located near the basketball court in downtown Puerto Viejo, close to the Deleite Ice Cream Shop.</p>
                        <br />
                        <h3><strong>Contact for Bus Information</strong></h3>
                        <p>Need updated information about schedules or routes? You can contact us via WhatsApp for the most current information about bus services:</p>
                        <p><strong>WhatsApp: <a href="https://wa.me/50672852592" target="_blank" rel="noopener noreferrer">+(506) 7285-2592</a></strong></p>
                        <br />
                        <p>For the most comfortable stay while exploring the Caribbean coast, consider booking one of our fully equipped homes in Puerto Viejo or Playa Chiquita. We offer convenient locations near bus stops and provide all the amenities you need for a perfect Costa Rican getaway!</p>
                    </div>
                    <OtherBlogs currentBlog="bushours" blogs={blogs} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default BusHours;