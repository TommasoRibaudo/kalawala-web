import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';

import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import { Helmet } from "react-helmet";
import { blogs } from "../../../assets/blogs/blogs";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import OtherBlogs from "../Components/OtherBlogs.Component";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";
import Smoobu2 from "../../../components/Smoobu2/Smoobu2.component";
import { GENERAL_PUERTO_VIEJO_RECOMMENDATIONS } from "../../../utils/constants";


const TravellingToPuerto = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, [])
    return (

        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>How to get to Puerto Viejo from San Jose</title>
                <meta name="description" content="If you're planning a trip to Puerto Viejo, Costa Rica, you may be wondering how to get there using public transportation. Fortunately, there are several options available that can take you to this beautiful Caribbean town in Talamanca." />
                <link rel="canonical" href="https://www.reservaskalawala.com/travellingtopuertoviejo" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/travellingtopuertoviejo" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/travellingtopuertoviejoES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/travellingtopuertoviejo" />
            </Helmet>
            <FixedNavigation isBlog={true} />
            <Row className="subContainer" style={{ justifyContent: 'center' }}>

                <Col className="info col" lg={{ order: 'first', span: 8 }} md={{ order: 'first', span: 10 }} sm={12} xs={12}>

                    <div className="blog-header" style={{ maxWidth: 1000, marginBottom: '2rem' }}>
                        <div className="heading title-container">
                            <h1 className="title blog-title">How to get to Puerto Viejo from San Jose</h1>
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
                                src="https://drive.google.com/thumbnail?id=1JxE6lYoK9C2maxtGP9rlUp2a47Ce5C9W&sz=w1000"
                                className="responsive-image"
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    display: 'block'
                                }}
                                alt="Surqui"
                                width="1000"
                                height="600"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="description" style={{ maxWidth: 1000, }}>
                        <p>If you're planning a trip to Puerto Viejo, Costa Rica, you may be wondering how to get there using public transportation. Fortunately, there are several options available that can take you to this beautiful Caribbean town in Talamanca.</p>
                        <br />

                        <p>One of the most popular ways to get to Puerto Viejo is by bus. The primary bus company that services the route from San José to Puerto Viejo is <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">MEPE</a>. 
                        The bus station is located in the center of San José, exactly on 9th avenue and 12th street, making it easy to find.</p>
                        <br />
                        <p><b><i>The <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">bus schedule</a> to Puerto Viejo is as follows: 6am, 8am, 10am, 2pm, and the last one at 4pm.</i></b></p>
                        <br />
                        <p>While you cannot reserve tickets in advance, it's always a good idea to arrive at the bus station early to secure your spot on the bus. Keep in mind that during peak travel seasons, such as holidays and weekends, 
                            the buses can get crowded quickly, so plan accordingly.</p>
                        <br />
                        
                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title="Where to stay when traveling to Puerto Viejo?"
                            properties={GENERAL_PUERTO_VIEJO_RECOMMENDATIONS}
                            language="en"
                        />
                        <br />
                        
                        <p>The bus has many stops, and will also stop at the bus station in limón, Cahuita and finally, Puerto Viejo.</p>
                        <br />
                        <p> If you're looking to save some money on transportation costs, the cheapest option is to take the public bus. These buses are clean, reliable, and offer an affordable way to get to Puerto Viejo. 
                            While they may not be as luxurious as some of the private shuttle services, they will get you to your destination safely and on time.</p>
                        <br />
                        <p>With regular bus schedules from San José and other nearby towns, it's easy to plan your trip and enjoy all that Puerto Viejo has to offer.</p>
                        <br />
                        <p><b><i>Another option to get to Puerto Viejo from San Jose is to take the bus from <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños</a>, which goes directly to Limón. From there, you can transfer to a bus that goes to Puerto Viejo.</i></b></p>
                        <br />
                        <p>The bus schedule from San Jose to Limón leaves from the <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños stop</a> located in Calle Central, Cinco Esquinas. Buses leave every hour from 6am until 7pm, so it's easy to plan your trip accordingly. Once you arrive in Limón,
                             you can walk to the <a href="https://maps.app.goo.gl/WV4CmLqzco2Eft7y9" target="_blank" rel="noopener noreferrer">Mepe</a> Bus stop, which is located near the central market, and take a bus that leaves every hour to Puerto Viejo.</p>
                        <br />
                        <p>However, it's important to note that the journey from San Jose to Limón can take around 3 to 4 hours, depending on traffic and road conditions. So, it's crucial to plan ahead to avoid being stuck in Limón overnight. 
                            Also, the last bus from Limón to Puerto Viejo leaves at 8pm, so make sure to arrive in Limón with enough time to make the transfer.</p>
                        <br />
                        <p>Another way to get to Puerto Viejo is by using <a href="mailto:reservas.kalawala@gmail.com?subject=Organise private transportation&body= " target="_blank" rel="noopener noreferrer">private transportation</a>. This option can be shared with other travelers or private for you and your companions, making it a convenient and comfortable way to travel to your destination.</p>
                        <br />
                        <p> With private transportation, you can be picked up from wherever you prefer and be dropped off directly at your accommodation in Puerto Viejo. This option can be especially helpful for those who have heavy luggage, prefer more privacy, 
                            or have specific travel needs.</p>
                        <br />
                        <p>Depending on the number of travelers, private transportation can be a more cost-effective option compared to taking a shared shuttle.</p>
                        <br />
                        <p> Additionally, it offers the flexibility to set your own schedule and stop along the way to enjoy some of the beautiful sights along the route.</p>
                        <br />
                        <p>If you're interested in booking private transportation to Puerto Viejo, there are several reputable companies that offer this service. It's always a good idea to research your options and compare prices to find the best deal.</p>
                        <br />
                        <p>We also offer this service and can provide you with the routes and prices to help you make the most informed decision for your travels.</p>
                        <br />
                        <p>Overall, whether you prefer the convenience of public transportation or the comfort of private transportation, there are several ways to get to Puerto Viejo. Regardless of your choice, you're sure to enjoy the stunning scenery 
                            and vibrant culture of this beautiful Caribbean town in Talamanca, Costa Rica.
                        </p>
                        <br />
                    </div>

                    {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                    <div style={{ maxWidth: 1000 }}>
                        <WhyStayWithUs
                            language="en"
                            ctaLink="/"
                        />
                    </div>

                    {/* Smoobu Booking Component */}
                    <div className="blog-smoobu-container" style={{ maxWidth: 1000, marginTop: '2rem', marginBottom: '2rem' }}>
                        <h3 className="smoobu-title">Book Your Stay</h3>
                        <div className="smoobu-wrapper">
                            <Smoobu2 targetId="travellingSmoobuBooking" />
                        </div>
                    </div>

                    <OtherBlogs currentBlog="travellingtopuertoviejo" blogs={blogs} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default TravellingToPuerto;