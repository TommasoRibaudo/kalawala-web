import React, { useEffect } from "react";
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
import { GENERAL_PUERTO_VIEJO_RECOMMENDATIONS, GENERAL_PUERTO_VIEJO_RECOMMENDATIONS_ES } from "../../../utils/constants";
import { useLocale, useMessages } from "../../../i18n";
import { localeSuffix, bookingLanguage, homePath } from "../../../i18n/paths";
import { directionOf } from "../../../i18n/locales";
import { canonicalUrl, hreflangLinks } from "../../../i18n/seo";
import { indigenousTravelContent } from "../../../i18n/content/blog";

const HERO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Palenque_bribri._Costa_Rica.jpg/960px-Palenque_bribri._Costa_Rica.jpg";

const IndigenousTravel = () => {
    const locale = useLocale();
    const m = useMessages();
    const content = indigenousTravelContent(locale);
    const lang = bookingLanguage(locale);
    const selfId = `indigenousTravelPV${localeSuffix(locale)}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (

        <div className={`listingContainer`}>
            <Helmet>
                <html lang={locale} dir={directionOf(locale)} />
                <meta charSet="utf-8" />
                <title>{content.seoTitle}</title>
                <meta
                    name="description"
                    content={content.seoDescription}
                />
                <link
                    rel="canonical"
                    href={canonicalUrl('blogIndigenous', locale)}
                />
                {hreflangLinks('blogIndigenous')}
            </Helmet>

            <FixedNavigation isBlog={true} />

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
                            {content.heading}
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
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                src={HERO_IMAGE}
                                className="responsive-image"
                                alt={content.heroAlt}
                            />
                        </div>

                        <br />

                        <p>{content.introParagraph}</p>
                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title={content.stayRecommendationTitle}
                            properties={locale === 'es' ? GENERAL_PUERTO_VIEJO_RECOMMENDATIONS_ES : GENERAL_PUERTO_VIEJO_RECOMMENDATIONS}
                            language={lang}
                        />

                        <p>{content.afterStayParagraph}</p>

                        <br />

                        <h2>{content.territoriesHeading}</h2>

                        <p>{content.territoriesParagraphs[0]}</p>

                        <br />

                        <p>{content.territoriesParagraphs[1]}</p>

                        <br />

                        <h2>{content.experiencesHeading}</h2>

                        <p>{content.experiencesIntro}</p>

                        <br />

                        <h3>{content.dailyLifeHeading}</h3>

                        <p>{content.dailyLifeParagraph}</p>

                        <br />

                        <h3>{content.cacaoHeading}</h3>

                        <p>{content.cacaoParagraphs[0]}</p>

                        <br />

                        <p>{content.cacaoParagraphs[1]}</p>

                        <br />

                        <h3>{content.medicinalHeading}</h3>

                        <p>{content.medicinalParagraphs[0]}</p>

                        <br />

                        <p>{content.medicinalParagraphs[1]}</p>

                        <br />

                        <h2>{content.operatorsHeading}</h2>

                        <p>{content.operatorsIntro}</p>

                        <br />

                        <ul>
                            {content.operators.map((op) => (
                                <li key={op.href}>
                                    <a href={op.href} target="_blank" rel="noopener noreferrer">
                                        <strong>{op.name}</strong>
                                    </a> – {op.description}
                                </li>
                            ))}
                        </ul>

                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs
                                language={lang}
                                ctaLink={homePath(locale)}
                            />
                        </div>

                        <p>{content.askAboutTourParagraph}</p>

                        <br />

                        <h2>{content.tipsHeading}</h2>

                        <p>{content.tipsParagraphs[0]}</p>

                        <br />

                        <p>{content.tipsParagraphs[1]}</p>

                        <br />

                        <p>{content.tipsParagraphs[2]}</p>

                        <br />

                        <h2>{content.differentWayHeading}</h2>

                        <p>{content.differentWayParagraphs[0]}</p>

                        <br />

                        <p>{content.differentWayParagraphs[1]}</p>
                    </div>

                    <div
                        className="blog-smoobu-container"
                        style={{
                            maxWidth: 1000,
                            marginTop: '2rem',
                            marginBottom: '2rem',
                        }}
                    >
                        <h2 className="smoobu-title">{m.blog.bookYourStay}</h2>
                        <div className="smoobu-wrapper">
                            <Smoobu2 targetId="blogSmoobuBooking" />
                        </div>
                    </div>

                    <OtherBlogs
                        currentBlog={selfId}
                        blogs={locale === 'es' ? blogsES : blogs}
                    />
                </Col>
            </Row>

            <ContactUs />
        </div>

    )

}

export default IndigenousTravel;
