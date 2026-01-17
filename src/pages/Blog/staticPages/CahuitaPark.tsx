import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import { Helmet } from "react-helmet";
import { blogs } from "../../../assets/blogs/blogs";
import OtherBlogs from "../Components/OtherBlogs.Component";
import Smoobu2 from "../../../components/Smoobu2/Smoobu2.component";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";
import { PUERTO_VIEJO_BLOG_RECOMMENDATIONS } from "../../../utils/constants";


const CahuitaPark = () => {
    // const { blogId } = useParams();

    const blogId = 'cahuitaParkwhattodo'
    const blogData = blogs.find((blog) => blog.id === blogId);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, [])
    return (

        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Visiting Cahuita National Park: What to Know Before You Go</title>
                <meta name="description" content="Cahuita National Park is one of the easiest and most relaxed national parks to visit on Costa Rica’s Caribbean coast. It combines jungle trails, white-sand beaches, wildlife, and coral reefs in one place." />
                <link rel="canonical" href="https://www.reservaskalawala.com/cahuitaparkwhattodo" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/cahuitaparkwhattodo" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/cahuitaparkwhattodoES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/cahuitaparkwhattodo" />
            </Helmet>
            <FixedNavigation isBlog={true} />
            <Row className="subContainer" style={{ justifyContent: 'center' }}>

                <Col className="info col" lg={{ order: 'first', span: 8 }} md={{ order: 'first', span: 10 }} sm={12} xs={12}>

                    <div className="blog-header" style={{ maxWidth: 1000, marginBottom: '2rem' }}>
                        <div className="heading title-container">
                            <h1 className="title blog-title">Visiting Cahuita National Park: What to Know Before You Go</h1>
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
                                src="https://pixabay.com/get/g648d00416193a3478059ee6a683f1fe0ccf051614aeaa74b633c7aaf78894891e22ae09c588bb97a06725ac09e08253ad077e3ef0b11c705e588e1895d987a05_1280.jpg"
                                className="responsive-image"
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    display: 'block'
                                }}
                                alt="Cahuita National Park Beach"
                                width="1000"
                                height="600"
                                loading="lazy"
                            />
                        </div>
                    </div>
                    <div className="description" style={{ maxWidth: 1000, }}>

                        <p><a href="https://maps.app.goo.gl/vHs1CB5nqzLDoGhv9" target="_blank" rel="noopener noreferrer">Cahuita National Park</a> is one of the easiest and most relaxed national parks to visit on Costa Rica’s Caribbean coast. It combines jungle trails, white-sand beaches, wildlife, and coral reefs in one place.</p>
                        <p>If you are staying near Cahuita town or Puerto Viejo, this is a great half-day or full-day trip. Below is a clear guide to help you plan your visit.</p>

                        <br />
                        <h3><strong>Enter from Cahuita Town</strong></h3>
                        <p></p>
                        <p>The most common entrance is in Cahuita town, near Playa Blanca.</p>
                        <p>This entrance works on a <strong>donation basis</strong>, which makes it cheaper than other park entrances. The donation helps support park maintenance and local guides.</p>
                        <p>Arrive early in the morning if you can. It is cooler, quieter, and better for wildlife spotting.</p>

                        <br />
                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title="Where to stay near Cahuita National Park?"
                            properties={PUERTO_VIEJO_BLOG_RECOMMENDATIONS}
                            language="en"
                        />
                        <br />

                        <h3><strong>Snorkeling Inside the Park</strong></h3>
                        <p>Snorkeling is one of the main reasons people visit Cahuita National Park.</p>
                        <p>The coral reef here is one of the largest on Costa Rica’s Caribbean coast. You can see colorful fish, coral formations, and sometimes rays.</p>
                        <p>Most visitors book a guided snorkeling tour, which includes:</p>
                        <ul>
                            <li><strong>A local guide</strong></li>
                            <li><strong>Snorkeling gear</strong> </li>
                            <li><strong>A boat ride to the reef</strong> </li>
                        </ul>
                        <br />

                        <p>Conditions depend on the weather, so visibility can change from day to day.</p>

                        <br />
                        <h3><strong>Watch Your Food Around Wildlife</strong></h3>
                        <p>Cahuita is full of animals. You may see monkeys, raccoons, iguanas, coatis, and sloths.</p>
                        <p>Some animals are very used to visitors and may try to steal food. Keep snacks in a closed bag and never leave food unattended.</p>
                        <p>Feeding animals is not allowed and can harm them.</p>

                        <br />
                        <h3><strong>Know the Park Schedule</strong></h3>
                        <p>The park <strong>closes at 4:00 p.m.</strong> Visitors must exit before that time.</p>
                        <p>This is another reason to enter early. You will have more time to walk, swim, and relax without rushing.</p>

                    {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                    <div style={{ maxWidth: 1000 }}>
                        <WhyStayWithUs
                            language="en"
                            ctaLink="/"
                        />
                    </div>

                        <h3><strong>Boat Ride Back Instead of Walking</strong></h3>
                        <p>The main trail runs along the coast and can be long if you walk the full route.</p>
                        <p>Many visitors choose to walk one way and <strong>return by boat</strong>. Local boat operators offer rides back toward Cahuita town.</p>
                        <p>This is a good option if you want to enjoy the trail without walking the entire distance.</p>

                        <br />
                        <h3><strong>Plastic Is Not Allowed</strong></h3>
                        <p><strong>Single-use plastics</strong> are not allowed inside the park.</p>
                        <p>This includes plastic bags, disposable bottles, and plastic food packaging. Bring reusable bottles and containers.</p>
                        <p>Park staff may check bags at the entrance.</p>

                        <br />
                        <h3><strong>Final Tips Before You Go</strong></h3>
                        <ul>
                            <li><strong>Wear comfortable walking shoes or sandals</strong></li>
                            <li><strong>Bring water in a reusable bottle</strong> </li>
                            <li><strong>Use reef-safe sunscreen</strong> </li>
                            <li><strong>Start early to avoid heat and crowds</strong> </li>
                        </ul>
                        <p><strong>Cahuita National Park is calm, beautiful, and easy to visit.</strong> With a little planning, it is one of the best nature experiences on the Caribbean coast of Costa Rica.</p>
                    </div>


                    {/* Smoobu Booking Component */}
                    <div className="blog-smoobu-container" style={{ maxWidth: 1000, marginTop: '2rem', marginBottom: '2rem' }}>
                        <h3 className="smoobu-title">Book Your Stay</h3>
                        <div className="smoobu-wrapper">
                            <Smoobu2 targetId="cahuitaParkSmoobuBooking" />
                        </div>
                    </div>

                    <OtherBlogs currentBlog="cahuitaParkwhattodo" blogs={blogs} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default CahuitaPark;