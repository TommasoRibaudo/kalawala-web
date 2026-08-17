import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Listing/Listing.style.scss';
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import { Helmet } from "react-helmet";
import OtherBlogs from "../Components/OtherBlogs.Component";
import Smoobu2 from "../../../components/Smoobu2/Smoobu2.component";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";
import { generalPuertoViejoRecommendations } from "../../../utils/constants";
import { useLocale, useMessages } from "../../../i18n";
import { homePath } from "../../../i18n/paths";
import { canonicalUrl, hreflangLinks } from "../../../i18n/seo";
import { pathForKey, RouteKey } from "../../../routes.config";
import { thingsToDoContent } from "../../../i18n/content/blog";

const HERO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Puerto_Viejo_de_Talamanca%2C_Costa_Rica_2012.JPG/960px-Puerto_Viejo_de_Talamanca%2C_Costa_Rica_2012.JPG?20120902175205";

// One entry per activity card, paired by index with content.activities.
// `null` = that activity doesn't point at an existing article. Same
// content/routing split as WeatherPuertoViejo's MONTH_ROUTE_KEYS.
const ACTIVITY_LINKS: (RouteKey | null)[] = [
    null, 'blogBeaches', 'blogCahuitapark', 'blogGandocaRefuge', null,
    'blogIndigenous', null, null, null, 'blogWeather',
];

const ThingsToDoPuertoViejo = () => {
    const locale = useLocale();
    const m = useMessages();
    const content = thingsToDoContent(locale);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{content.seoTitle}</title>
                <meta name="description" content={content.seoDescription} />
                <link rel="canonical" href={canonicalUrl('blogThingsToDo', locale)} />
                {hreflangLinks('blogThingsToDo')}
            </Helmet>

            <FixedNavigation isBlog={true} />

            <Row className="subContainer" style={{ justifyContent: 'center' }}>
                <Col className="info col" lg={{ order: 'first', span: 8 }} md={{ order: 'first', span: 10 }} sm={12} xs={12}>

                    <div className="blog-header" style={{ maxWidth: 1000, marginBottom: '2rem' }}>
                        <div className="heading title-container">
                            <h1 className="title blog-title">{content.heading}</h1>
                            <div className="border"></div>
                        </div>

                        <div className="blog-hero-image" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: '1.5rem',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}>
                            <img
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                src={HERO_IMAGE}
                                className="responsive-image"
                                style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                                alt={content.heroAlt}
                                width="1000"
                                height="600"
                            />
                            <p style={{ fontSize: '0.85rem', margin: '4px 0 0' }}>{content.photoCredit}</p>
                        </div>
                    </div>

                    <div className="description" style={{ maxWidth: 1000 }}>
                        <p>{content.introParagraphs[0]}</p>
                        <br />
                        <p>{content.introParagraphs[1]}</p>
                        <br />

                        {content.activities.slice(0, 4).map((activity, i) => {
                            const key = ACTIVITY_LINKS[i];
                            return (
                                <React.Fragment key={activity.title}>
                                    <h2>{activity.title}</h2>
                                    <p>{activity.description}</p>
                                    {key && activity.linkText && (
                                        <p><Link to={pathForKey(key, locale)}><strong>{activity.linkText}</strong></Link></p>
                                    )}
                                    <br />
                                </React.Fragment>
                            );
                        })}

                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title={content.stayRecommendationTitle}
                            properties={generalPuertoViejoRecommendations(locale)}
                        />
                        <br />

                        {content.activities.slice(4).map((activity, i) => {
                            const key = ACTIVITY_LINKS[i + 4];
                            return (
                                <React.Fragment key={activity.title}>
                                    <h2>{activity.title}</h2>
                                    <p>{activity.description}</p>
                                    {key && activity.linkText && (
                                        <p><Link to={pathForKey(key, locale)}><strong>{activity.linkText}</strong></Link></p>
                                    )}
                                    <br />
                                </React.Fragment>
                            );
                        })}

                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs locale={locale} ctaLink={homePath(locale)} />
                        </div>
                        <br />

                        <h2>{content.itineraryHeading}</h2>
                        <p>{content.itineraryParagraphs[0]}</p>
                        <p>{content.itineraryParagraphs[1]}</p>
                        <p><Link to={pathForKey('blogSanjoseOptions', locale)}><strong>{content.itineraryLinkText}</strong></Link></p>
                        <br />

                        <h2>{content.takeawaysHeading}</h2>
                        <p>{content.takeawaysParagraph}</p>
                    </div>

                    {/* Smoobu Booking Component */}
                    <div className="blog-smoobu-container" style={{ maxWidth: 1000, marginTop: '2rem', marginBottom: '2rem' }}>
                        <h2 className="smoobu-title">{m.blog.bookYourStay}</h2>
                        <div className="smoobu-wrapper">
                            <Smoobu2 targetId="blogSmoobuBooking" />
                        </div>
                    </div>

                    <OtherBlogs currentBlog="things-to-do-puerto-viejo" locale={locale} />
                </Col>
            </Row>

            <ContactUs />
        </div>
    );
};

export default ThingsToDoPuertoViejo;
