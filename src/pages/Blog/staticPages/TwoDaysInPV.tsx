import React, { useEffect } from "react";
import { cdnImage, cdnSrcSet } from '../../../utils/imageCdn';
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';

import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import OtherBlogs from "../Components/OtherBlogs.Component";
import { puertoViejoBlogRecommendations } from "../../../utils/constants";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import { Helmet } from "react-helmet";
import Smoobu2 from "../../../components/Smoobu2/Smoobu2.component";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";
import { useLocale, useMessages } from "../../../i18n";
import { homePath } from "../../../i18n/paths";
import { canonicalUrl, hreflangLinks } from "../../../i18n/seo";
import { twoDaysInPVContent } from "../../../i18n/content/blog";

const HERO_IMAGE =
  'https://lh3.googleusercontent.com/d/13j6FfwVMxVg9lU4SuGST8ljrVkyW7rla=w1000';

const TwoDaysInPV = () => {
    const locale = useLocale();
    const m = useMessages();
    const content = twoDaysInPVContent(locale);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (

        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{content.seoTitle}</title>
                <meta name="description" content={content.seoDescription} />
                <link rel="canonical" href={canonicalUrl('blogTwodays', locale)} />
                {hreflangLinks('blogTwodays')}
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
                                alt="Kayaking in Punta Uva"
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
                            properties={puertoViejoBlogRecommendations(locale)}
                        />
                        <br />

                        {content.day1Paragraphs.map((paragraph, i) => (
                            <React.Fragment key={i}>
                                <p>{paragraph}</p>
                                <br />
                            </React.Fragment>
                        ))}

                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs
                                locale={locale}
                                ctaLink={homePath(locale)}
                            />
                        </div>

                        {content.day2Paragraphs.map((paragraph, i) => (
                            <React.Fragment key={i}>
                                <p>{paragraph}</p>
                                <br />
                            </React.Fragment>
                        ))}

                        <p>{content.closing}</p>
                    </div>



                    {/* Smoobu Booking Component */}
                    <div className="blog-smoobu-container" style={{ maxWidth: 1000, marginTop: '2rem', marginBottom: '2rem' }}>
                        <h2 className="smoobu-title">{m.blog.bookYourStay}</h2>
                        <div className="smoobu-wrapper">
                            <Smoobu2 targetId="blogSmoobuBooking" />
                        </div>
                    </div>

                    <OtherBlogs currentBlog="twodaysinpuertoviejo" locale={locale} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default TwoDaysInPV;
