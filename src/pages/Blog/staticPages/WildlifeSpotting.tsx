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
import { pathForKey } from "../../../routes.config";
import { internalLinkLabel } from "../../../i18n/content/internalLinks";
import { wildlifeSpottingContent } from "../../../i18n/content/blog";

const HERO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Three-toed_sloth_crossing_road_in_Costa_Rica.jpg/1280px-Three-toed_sloth_crossing_road_in_Costa_Rica.jpg";

const WildlifeSpotting = () => {
    const locale = useLocale();
    const m = useMessages();
    const content = wildlifeSpottingContent(locale);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{content.seoTitle}</title>
                <meta name="description" content={content.seoDescription} />
                <link rel="canonical" href={canonicalUrl('blogWildlife', locale)} />
                {hreflangLinks('blogWildlife')}
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
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            marginTop: '1.5rem', borderRadius: '8px', overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}>
                            <img loading="eager" fetchPriority="high" decoding="async" src={HERO_IMAGE}
                                className="responsive-image" style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                                alt={content.heroAlt} width="1000" height="600" />
                            <p style={{ fontSize: '0.85rem', margin: '4px 0 0' }}>{content.photoCredit}</p>
                        </div>
                    </div>

                    <div className="description" style={{ maxWidth: 1000 }}>
                        <p>{content.introParagraphs[0]}</p>
                        <br />
                        <p>{content.introParagraphs[1]}</p>
                        <br />

                        <h2>{content.animalsHeading}</h2>
                        <p>{content.animalsIntro}</p>
                        <ul>
                            {content.animals.map((animal, i) => (
                                <li key={i}><strong>{animal.name}</strong> — {animal.description}</li>
                            ))}
                        </ul>
                        <br />

                        <StayRecommendation title={content.stayRecommendationTitle} properties={generalPuertoViejoRecommendations(locale)} />
                        <br />

                        <h2>{content.whereHeading}</h2>
                        <p>{content.whereParagraphs[0]}</p>
                        <p>
                            <Link to={pathForKey('blogCahuitapark', locale)}><strong>{internalLinkLabel('blogCahuitapark', locale)}</strong></Link>
                        </p>
                        <p>{content.whereParagraphs[1]}</p>
                        <p>
                            <Link to={pathForKey('blogGandocaRefuge', locale)}><strong>{internalLinkLabel('blogGandocaRefuge', locale)}</strong></Link>
                        </p>
                        <p>{content.whereParagraphs[2]}</p>
                        <p>{content.whereParagraphs[3]}</p>
                        <br />

                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs locale={locale} ctaLink={homePath(locale)} />
                        </div>
                        <br />

                        <h2>{content.tipsHeading}</h2>
                        <ul>
                            {content.tipsItems.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                        <br />

                        <h2>{content.safetyHeading}</h2>
                        <p>{content.safetyParagraph}</p>
                        <br />

                        <h2>{content.takeawaysHeading}</h2>
                        <p>{content.takeawaysParagraph}</p>
                    </div>

                    <div className="blog-smoobu-container" style={{ maxWidth: 1000, marginTop: '2rem', marginBottom: '2rem' }}>
                        <h2 className="smoobu-title">{m.blog.bookYourStay}</h2>
                        <div className="smoobu-wrapper">
                            <Smoobu2 targetId="blogSmoobuBooking" />
                        </div>
                    </div>

                    <OtherBlogs currentBlog="wildlife-puerto-viejo" locale={locale} />
                </Col>
            </Row>

            <ContactUs />
        </div>
    );
};

export default WildlifeSpotting;
