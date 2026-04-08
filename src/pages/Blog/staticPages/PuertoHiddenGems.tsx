import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';

import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import OtherBlogs from "../Components/OtherBlogs.Component";
import { GENERAL_PUERTO_VIEJO_RECOMMENDATIONS, PUERTO_VIEJO_BLOG_RECOMMENDATIONS } from "../../../utils/constants";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import { Helmet } from "react-helmet";
import { blogs } from "../../../assets/blogs/blogs";
import Smoobu2 from "../../../components/Smoobu2/Smoobu2.component";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";


const PuertoHiddenGems = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, [])
    return (

        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Hidden Gems in Puerto Viejo: Quiet Spots Locals Love</title>
                <meta name="description" content="Puerto Viejo has famous beaches, music, and nightlife. But some of its best places stay off the main list. These spots feel calmer, closer to nature, and more personal. If you want fewer crowds and real local flavor, start here. These hidden gems are easy to reach and worth the effort." />
                <link rel="canonical" href="https://www.reservaskalawala.com/puertoHiddenGems" />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/puertoHiddenGems" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/puertoHiddenGemsES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/puertoHiddenGems" />
            </Helmet>
            <FixedNavigation isBlog={true} />
            <Row className="subContainer" style={{ justifyContent: 'center' }}>

                <Col className="info col" lg={{ order: 'first', span: 8 }} md={{ order: 'first', span: 10 }} sm={12} xs={12}>

                    <div className="blog-header" style={{ maxWidth: 1000, marginBottom: '2rem' }}>
                        <div className="heading title-container">
                            <h1 className="title blog-title">Hidden Gems in Puerto Viejo: Quiet Spots Locals Love</h1>
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
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Puerto_Viejo_de_Talamanca%2C_Costa_Rica_2012.JPG/960px-Puerto_Viejo_de_Talamanca%2C_Costa_Rica_2012.JPG?20120902175205"
                                className="responsive-image"
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    display: 'block'
                                }}
                                alt="Kayaking in Punta Uva"
                                width="1000"
                                height="600"
                                loading="lazy"
                            />
                        </div>
                    </div>
                    Photo by <a href="https://commons.wikimedia.org/wiki/User:Letartean" target="_blank" rel="noopener noreferrer">Letartean</a>
                    <br />
                    <br />
                    <div className="description" style={{ maxWidth: 1000 }}>
                        <p>
                            Puerto Viejo is easy to love. Most visitors hit the famous beaches, grab a
                            cocktail in town, and call it a day. But the best moments often happen in
                            quieter places: small coves, hidden stretches of sand, and simple local meals
                            that taste like the Caribbean.
                        </p>
                        <br />

                        <p>
                            Below are a few hidden gems around Puerto Viejo that feel calmer and more
                            personal. None of them require a complicated plan. You just need a bit of
                            time, sun protection, and a slow pace.
                        </p>
                        <br />

                        {/* Optional: Stay Recommendation Component - place near the top */}
                        <StayRecommendation
                            title="Where to stay in Puerto Viejo for easy access to these hidden gems"
                            properties={GENERAL_PUERTO_VIEJO_RECOMMENDATIONS}
                            language="en"
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
                            Playa Chiquita is a more secluded stretch of sand that many people skip. It
                            feels tucked away, with fewer crowds and a calmer mood.
                        </p>
                        <br />
                        <p>
                            The water is not always calm, but the vibes there definitely are. It's the
                            perfect spot for a slow morning.
                        </p>
                        <br />
                        <p>
                            Perfect for:
                            <ul>
                                <li>Relaxing under the trees</li>
                                <li>Exploring on foot</li>
                                <li>A simple picnic</li>
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
                            Playa Grande is known by surfers, but it’s also one of the most striking
                            beaches in the area. It feels wide, open, and less traveled than other
                            spots.
                        </p>
                        <br />
                        <p>
                            Even if you don’t surf, it’s worth a visit for the scenery and long walks.
                            Just keep in mind the waves can be strong.
                        </p>
                        <br />
                        <p>
                            Good to know:
                            <ul>
                                <li>Better for experienced surfers than swimmers</li>
                                <li>Great for photos and walks</li>
                                <li>Usually quieter than Cocles</li>
                            </ul>
                        </p>
                        <br />

                        <h2>
                            <a
                                href="https://www.jaguarrescue.foundation"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Punta Cocles Coves & Jaguar Rescue Center
                            </a>
                        </h2>
                        <p>
                            In front of the <a href="https://www.jaguarrescue.foundation" target="_blank" rel="noopener noreferrer">Jaguar Rescue Center</a>, you’ll find small coves and quieter
                            beach corners. The rocky points break up the coastline, so it’s easy to
                            find a spot that feels private.
                        </p>
                        <br />
                        <p>
                            This area is also one of the best places to spot wildlife. You might see
                            monkeys in the trees or a sloth high up near the road.
                        </p>
                        <br />
                        <p>Tip: Go early in the morning for fewer people and more animal activity.</p>
                        <br />

                        <h2>Punta Uva Kayaking Without a Tour</h2>
                        <p>
                            Punta Uva is famous for its beach, but the river is the real secret. You
                            don’t need a tour to enjoy it. Just rent a kayak and explore at your own
                            pace.
                        </p>
                        <br />
                        <p>
                            The water is usually smooth, and the jungle feels close on both sides. It’s
                            peaceful and easy, even if you’re not an expert paddler.
                        </p>
                        <br />
                        <p>
                            Bring:
                            <ul>
                                <li>Sun protection</li>
                                <li>Water and a dry bag</li>
                                <li>Respectful distance for wildlife</li>
                            </ul>
                        </p>
                        <br />

                        <h2>Restaurante Caribeño 1872 for Rice and Beans</h2>
                        <p>
                            If you want one meal that feels truly local, check out
                            <a
                                href="https://maps.app.goo.gl/ynskDRDozJkGW1ML6"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Restaurante Caribeño 1872
                            </a>
                            for rich, flavorful Caribbean food.
                        </p>
                        <br />
                        <p>
                            The flavor is rich, the portions feel generous, and the vibe is relaxed. It’s
                            the kind of place you’ll want to return to.
                        </p>
                        <br />

                        <h2>
                            <a
                                href="https://maps.app.goo.gl/8dDzcZiUrhuuPmCy8"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Punta Mona & Gandoca-Manzanillo Wildlife Refuge
                            </a>
                        </h2>
                        <p>
                            Punta Mona feels far, in the best way. You can rent a boat and ask the
                            driver to take you along the coast to the pristine beaches and quiet shores
                            inside the Gandoca-Manzanillo National Wildlife Refuge.
                        </p>
                        <br />
                        <p>
                            The reward is clear water, quiet shoreline, and a sense that you’ve left the
                            busy world behind.
                        </p>
                        <br />
                        <p>
                            Good to know:
                            <ul>
                                <li>Bring snacks and water (there are no shops)</li>
                                <li>Go with calm weather and sea conditions</li>
                                <li>Pack out everything you bring in</li>
                            </ul>
                        </p>
                        <br />

                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs language="en" ctaLink="/" />
                        </div>

                        <h2>Quick Tips to Enjoy These Spots</h2>
                        <p>
                            A few small choices make a big difference in Puerto Viejo—both for your day
                            and for the places you visit.
                        </p>
                        <br />
                        <p>
                            <ul>
                                <li>Start early to get calm beaches and cooler weather</li>
                                <li>Use reef-safe sunscreen when you swim or snorkel</li>
                                <li>Keep a respectful distance from wildlife</li>
                                <li>Don’t leave valuables on the beach</li>
                            </ul>
                        </p>
                        <br />

                        <p>
                            These hidden gems are what make the trip feel special—quiet water, wild
                            coastlines, and food that tastes like home in the Caribbean. Pick two or
                            three from this list and leave space for slow moments. That’s when Puerto
                            Viejo shows its best side.
                        </p>
                    </div>





                    {/* Smoobu Booking Component */}
                    <div className="blog-smoobu-container" style={{ maxWidth: 1000, marginTop: '2rem', marginBottom: '2rem' }}>
                        <h3 className="smoobu-title">Book Your Stay</h3>
                        <div className="smoobu-wrapper">
                            <Smoobu2 targetId="blogSmoobuBooking" />
                        </div>
                    </div>

                    <OtherBlogs currentBlog="twodaysinpuertoviejo" blogs={blogs} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default PuertoHiddenGems;