import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import { Helmet } from "react-helmet";
import { blogs, blogsES } from "../../../assets/blogs/blogs";
import OtherBlogs from "../Components/OtherBlogs.Component";
import Smoobu2 from "../../../components/Smoobu2/Smoobu2.component";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";
import { PUERTO_VIEJO_BLOG_RECOMMENDATIONS } from "../../../utils/constants";
import FixedNavigationES from "../../../components/FixedNavigation/FixedNavigation.componentES";


const IndigenousTravel = () => {
    // const { blogId } = useParams();

    const blogId = 'indigenousTravelPV'
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
                <title>Indigenous Culture Near Puerto Viejo de Talamanca</title>
                <meta
                    name="description"
                    content="Discover Indigenous Bribri culture near Puerto Viejo de Talamanca. Learn about ancestral cacao, traditional medicine, and authentic cultural experiences in Indigenous communities of Costa Rica’s South Caribbean."
                />
                <link
                    rel="canonical"
                    href="https://www.reservaskalawala.com/indigenousTravelPV"
                />
                <link
                    rel="alternate"
                    hrefLang="es"
                    href="https://www.reservaskalawala.com/indigenousTravelPVES"
                />
                <link
                    rel="alternate"
                    hrefLang="en"
                    href="https://www.reservaskalawala.com/indigenousTravelPV"
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
                            Indigenous Culture Near Puerto Viejo de Talamanca
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
                                alt="Bribri Indigenous culture near Puerto Viejo"
                            />
                        </div>

                        <br />

                        <p>
                            Puerto Viejo de Talamanca is known for its beaches, relaxed
                            atmosphere, and incredible jungle. But just inland, there is
                            another side of the region that many travelers never see.
                        </p>
                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title="Looking to stay in Puerto Viejo?"
                            properties={PUERTO_VIEJO_BLOG_RECOMMENDATIONS}
                            language="en"
                        />

                        <p>
                            Close to town, Indigenous territories offer a deeper look
                            into life on Costa Rica’s South Caribbean coast. Here,
                            culture is part of everyday life.
                        </p>

                        <br />

                        <h2>Indigenous Territories Near Puerto Viejo</h2>

                        <p>
                            Puerto Viejo is located near the Bribri Indigenous Territory
                            of Talamanca and the Keköldi Indigenous Reserve. These lands
                            belong to the Bribri people, one of Costa Rica’s most
                            important Indigenous groups.
                        </p>

                        <br />

                        <p>
                            Many families still speak the Bribri language, grow their
                            own food, and use traditional knowledge in their daily
                            routines.
                        </p>

                        <br />

                        <h2>What Cultural Experiences Are Like</h2>

                        <p>
                            Most visits are led by members of the community. Groups are
                            small, and the focus is on learning, respect, and personal
                            connection.
                        </p>

                        <br />

                        <h3>Daily life and community visits</h3>

                        <p>
                            Visitors walk through family land, see traditional homes,
                            and learn how Bribri families organize daily life, work,
                            and social roles.
                        </p>

                        <br />

                        <h3>Cacao and tradition</h3>

                        <p>
                            Cacao plays a central role in Bribri culture. Many tours
                            show the ancestral preparation process, from the cacao pod
                            to the final drink.
                        </p>

                        <br />

                        <p>
                            Guides explain why cacao is important in ceremonies and
                            everyday life, and visitors usually taste it prepared in
                            the traditional way.
                        </p>

                        <br />

                        <h3>Medicinal plants and nature</h3>

                        <p>
                            Some experiences include forest walks focused on medicinal
                            plants and their traditional uses for health and daily
                            care.
                        </p>

                        <br />

                        <p>
                            Many tours end with a visit to a waterfall inside Indigenous
                            territory, valued for both its natural beauty and cultural
                            meaning.
                        </p>

                        <br />

                        <h2>Local Tour Operators in Puerto Viejo</h2>

                        <p>
                            Several local agencies work directly with Indigenous
                            communities to offer these experiences in a responsible
                            way.
                        </p>

                        <br />

                        <ul>
                            <li>
                                <a href="https://lifeculturetravelcostarica.com/" target="_blank" rel="noopener noreferrer">
                                    <strong>Life Culture Travel Costa Rica</strong>
                                </a> – Offers cultural experiences including Bribri shaman and chocolate tours, medicinal plant walks, and local community immersion.
                            </li>
                            <li>
                                <a href="https://exploradoresoutdoors.com/tours/indigenous-experience-chocolate-tour/" target="_blank" rel="noopener noreferrer">
                                    <strong>Exploradores Outdoors</strong>
                                </a> – Provides an Indigenous experience and chocolate tour that covers Bribri traditions, medicinal plants, and a visit to a waterfall.
                            </li>
                            <li>
                                <a href="https://www.viator.com/tours/Limon/Chocolate-taste-true/d4513-238841P2" target="_blank" rel="noopener noreferrer">
                                    <strong>Bribri Magic Chocolate & Waterfall Experience</strong>
                                </a> – Small-group tour from Puerto Viejo to learn Bribri culture, make cacao, and swim in a waterfall.
                            </li>
                        </ul>

                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs
                                language="en"
                                ctaLink="/"
                            />
                        </div>

                        <p>
                            When booking, ask if the tour is guided by community members
                            and how the visit supports local families.
                        </p>

                        <br />

                        <h2>Practical Tips for Visitors</h2>

                        <p>
                            Tours operate year-round and usually start in the morning.
                        </p>

                        <br />

                        <p>
                            Bring closed shoes, water, sun protection, and insect
                            repellent. Always follow your guide’s instructions and ask
                            before taking photos.
                        </p>

                        <br />

                        <p>
                            Buying crafts or food directly from families is one of the
                            best ways to support the community.
                        </p>

                        <br />

                        <h2>A Different Way to Experience the South Caribbean</h2>

                        <p>
                            Visiting Indigenous communities near Puerto Viejo adds depth
                            and meaning to your trip. It is about learning, not rushing.
                        </p>

                        <br />

                        <p>
                            This experience suits travelers who want a calmer, more
                            authentic connection with the place they are visiting.
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
                        <h3 className="smoobu-title">Book Your Stay</h3>
                        <div className="smoobu-wrapper">
                            <Smoobu2 targetId="indigenousCultureENSmoobuBooking" />
                        </div>
                    </div>

                    <OtherBlogs
                        currentBlog="indigenousTravelPV"
                        blogs={blogsES}
                    />
                </Col>
            </Row>

            <ContactUs />
        </div>

    )

}

export default IndigenousTravel;