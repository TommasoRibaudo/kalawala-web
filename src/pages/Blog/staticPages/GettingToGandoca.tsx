import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';

import { blogs } from "../../../assets/blogs/blogs";
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import OtherBlogs from "../Components/OtherBlogs.Component";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import { Helmet } from "react-helmet";
import Smoobu2 from "../../../components/Smoobu2/Smoobu2.component";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";
import { PUERTO_VIEJO_BLOG_RECOMMENDATIONS } from "../../../utils/constants";


const GettingToGandoca = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, [])
    return (

        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>How to Get to Gandoca-Manzanillo National Wildlife Refuge from Puerto Viejo, Costa Rica</title>
                <meta name="description" content="The Gandoca-Manzanillo National Wildlife Refuge, located in the province of Limón, is one of the best-kept secrets of Costa Rica's Southern Caribbean. This impressive wildlife refuge offers a rich variety of ecosystems, from mangroves and coral reefs to pristine beaches." />
                <link rel="canonical" href="https://www.reservaskalawala.com/gettingtogandoca" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/gettingtogandoca" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/gettingtogandocaES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/gettingtogandoca" />
            </Helmet>
            <FixedNavigation isBlog={true} />
            <Row className="subContainer" style={{ justifyContent: 'center' }}>

                <Col className="info col" lg={{ order: 'first', span: 8 }} md={{ order: 'first', span: 10 }} sm={12} xs={12}>

                    <div className="blog-header" style={{ maxWidth: 1000, marginBottom: '2rem' }}>
                        <div className="heading title-container">
                            <h1 className="title blog-title">How to Get to Gandoca-Manzanillo National Wildlife Refuge from Puerto Viejo, Costa Rica</h1>
                            <div className="border"></div>
                        </div>

                        <div className="blog-hero-image" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '1.5rem',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}>
                            <img
                                src="https://drive.google.com/thumbnail?id=1example-gandoca-image&sz=w1000"
                                className="responsive-image"
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    display: 'block'
                                }}
                                alt="Gandoca-Manzanillo National Wildlife Refuge"
                                width="1000"
                                height="600"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="description" style={{ maxWidth: 1000, }}>
                        <p>The <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Gandoca-Manzanillo National Wildlife Refuge</a>, located in the province of Limón, is one of the best-kept secrets of Costa Rica's Southern Caribbean. This impressive wildlife refuge offers a rich variety of ecosystems, from mangroves and coral reefs to pristine beaches. If you're in Puerto Viejo de Talamanca and looking for a nature getaway, this is an excellent option. In this guide, we show you how to easily get there from Puerto Viejo so you can fully explore this natural paradise.</p>
                        <br />
                        <h3><strong>Transportation Options</strong></h3>
                        <br />
                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title="Where to stay when visiting Gandoca-Manzanillo?"
                            properties={PUERTO_VIEJO_BLOG_RECOMMENDATIONS}
                            language="en"
                        />
                        <br />

                        <h4><strong>1. Bus from Puerto Viejo to Manzanillo</strong></h4>
                        <p>The simplest and most economical way to reach <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">Gandoca-Manzanillo National Wildlife Refuge</a> is by taking a bus from downtown Puerto Viejo to Manzanillo. The <a href="https://maps.app.goo.gl/orUHFbrZvpJH1fnb9" target="_blank" rel="noopener noreferrer">bus stop</a> is located where you buy the tickets, near the basketball court or by the Deleite Ice Cream Shop.</p>
                        <br />
                        <p><strong>Bus schedules:</strong></p>
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
                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs
                                language="en"
                                ctaLink="/"
                            />
                        </div>
                        <h4><strong>2. Rent a Scooter or a 4x4</strong></h4>
                        <p>If you prefer to explore at your own pace, renting a scooter or a 4x4 is an excellent option. If you're staying in our houses in downtown Puerto Viejo, you can rent vehicles at <a href="https://maps.app.goo.gl/uao7BMUuwFLyRL6dA" target="_blank" rel="noopener noreferrer">Mistery Jungle</a>, right in front, with prices starting at $30. If you're staying in our villas in Playa Chiquita, you can request to have the vehicle delivered directly to your villa.</p>
                        <br />
                        <p>This option is ideal for those seeking a personalized adventure, as it allows you to make stops wherever you like and explore the charming town of Manzanillo without worrying about bus schedules. Enjoy the freedom to explore your way and discover all the corners this beautiful destination has to offer.</p>
                        <br />
                        <h4><strong>3. Travel by Car from Puerto Viejo</strong></h4>
                        <p>If you decide to travel by car from Puerto Viejo, simply head towards Manzanillo and cover the 14 km distance. Upon arrival, you'll find parking available outside the reserve, where some locals offer to watch your vehicle for a small fee. We recommend not leaving valuables inside the car as a safety measure.</p>
                        <br />
                        <h3><strong>Conclusion</strong></h3>
                        <p>Gandoca-Manzanillo National Wildlife Refuge is a must-visit destination for nature and adventure lovers. Whether you choose to travel by bus, rent a vehicle, or drive, getting to this natural paradise is easy and accessible.</p>
                        <br />
                        <p>We invite you to plan your visit to this beautiful refuge and take the opportunity to stay in our cozy houses in Puerto Viejo de Talamanca. We offer a comfortable and relaxing environment, perfect for enjoying nature and exploring all that the region has to offer. Discover the charm of Gandoca-Manzanillo National Wildlife Refuge and the warmth of our villas!</p>
                    </div>


                    {/* Smoobu Booking Component */}
                    <div className="blog-smoobu-container" style={{ maxWidth: 1000, marginTop: '2rem', marginBottom: '2rem' }}>
                        <h3 className="smoobu-title">Book Your Stay</h3>
                        <div className="smoobu-wrapper">
                            <Smoobu2 targetId="gandocaSmoobuBooking" />
                        </div>
                    </div>

                    <OtherBlogs currentBlog="gettingtogandoca" blogs={blogs} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default GettingToGandoca;