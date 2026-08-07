import React, { useEffect } from "react";
import { cdnImage, cdnSrcSet } from '../../../utils/imageCdn';
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';

import { blogs, blogsES } from "../../../assets/blogs/blogs";
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import OtherBlogs from "../Components/OtherBlogs.Component";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import { Helmet } from "react-helmet";
import Smoobu2 from "../../../components/Smoobu2/Smoobu2.component";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";
import { GENERAL_PUERTO_VIEJO_RECOMMENDATIONS, GENERAL_PUERTO_VIEJO_RECOMMENDATIONS_ES } from "../../../utils/constants";
import { useLocale, useMessages } from "../../../i18n";
import { localeSuffix, bookingLanguage, homePath } from "../../../i18n/paths";
import { puertoViejoByPlaneContent } from "../../../i18n/content/blog";

// The pre-merge English page pointed this at a placeholder id
// ("1example-plane-image") that 404s. This is the real photo — the one the
// Spanish page and assets/blogs/blogs.ts's "puertoviejobyplane" entry both
// already used.
const HERO_IMAGE =
  'https://lh3.googleusercontent.com/d/1kE3Zq-IbD47bdiLkW25IKuBncif7J7YR=w1000';

const PuertoViejoByPlane = () => {
    const locale = useLocale();
    const m = useMessages();
    const content = puertoViejoByPlaneContent(locale);
    const lang = bookingLanguage(locale);
    const selfId = `puertoviejobyplane${localeSuffix(locale)}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (

        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{content.seoTitle}</title>
                <meta name="description" content={content.seoDescription} />
                <link rel="canonical" href={`https://www.reservaskalawala.com/puertoviejobyplane${localeSuffix(locale)}`} />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/puertoviejobyplane" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/puertoviejobyplaneES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/puertoviejobyplane" />
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
                            justifyContent: 'center',
                            marginTop: '1.5rem',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}>
                            <img
                                loading="eager"
                                fetchPriority="high"
                                srcSet={cdnSrcSet(HERO_IMAGE)}
                                sizes="(max-width: 767px) 92vw, (max-width: 1199px) 78vw, 880px"
                                decoding="async"
                                src={cdnImage(HERO_IMAGE, 960)}
                                className="responsive-image"
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    display: 'block'
                                }}
                                alt={content.heroAlt}
                                width="1000"
                                height="600"
                            />
                        </div>
                    </div>

                    <div className="description" style={{ maxWidth: 1000, }}>
                        <p>{content.intro}</p>
                        <br />

                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title={content.stayRecommendationTitle}
                            properties={locale === 'es' ? GENERAL_PUERTO_VIEJO_RECOMMENDATIONS_ES : GENERAL_PUERTO_VIEJO_RECOMMENDATIONS}
                            language={lang}
                        />
                        <br />

                        {content.bodyParagraphs.map((paragraph, i) => (
                            <React.Fragment key={i}>
                                <p>{paragraph}</p>
                                <br />
                            </React.Fragment>
                        ))}

                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs
                                language={lang}
                                ctaLink={homePath(locale)}
                            />
                        </div>

                        {content.closingParagraphs.map((paragraph, i) => (
                            <React.Fragment key={i}>
                                <p>{paragraph}</p>
                                <br />
                            </React.Fragment>
                        ))}
                    </div>


                    {/* Smoobu Booking Component */}
                    <div className="blog-smoobu-container" style={{ maxWidth: 1000, marginTop: '2rem', marginBottom: '2rem' }}>
                        <h2 className="smoobu-title">{m.blog.bookYourStay}</h2>
                        <div className="smoobu-wrapper">
                            <Smoobu2 targetId={`plane${localeSuffix(locale)}SmoobuBooking`} />
                        </div>
                    </div>

                    <OtherBlogs currentBlog={selfId} blogs={locale === 'es' ? blogsES : blogs} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default PuertoViejoByPlane;
