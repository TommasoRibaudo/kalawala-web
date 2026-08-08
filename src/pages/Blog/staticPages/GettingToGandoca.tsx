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
import { canonicalUrl, hreflangLinks } from "../../../i18n/seo";
import { gettingToGandocaContent } from "../../../i18n/content/blog";

// Matches the real "gettingtogandoca" thumbnail in assets/blogs/blogs.ts and
// the pre-merge Spanish page. The pre-merge English page pointed at a
// placeholder id ("1example-gandoca-image") that 404s.
const HERO_IMAGE = 'https://cdn.pixabay.com/photo/2020/01/07/05/11/beach-4746787_960_720.jpg';

const scheduleBadges = (times: string[]) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', fontSize: '14px' }}>
        {times.map((time) => (
            <span key={time} style={{ backgroundColor: '#e8f4f8', padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>{time}</span>
        ))}
    </div>
);

const TO_MANZANILLO = ['7:40 AM', '8:10 AM', '9:40 AM', '11:40 AM', '1:40 PM', '4:40 PM', '6:40 PM'];
const TO_PUERTO_VIEJO = ['5:00 AM', '6:30 AM', '8:00 AM', '10:00 AM', '10:30 AM', '12:30 PM', '1:30 PM', '3:30 PM', '4:00 PM', '5:00 PM'];

const GettingToGandoca = () => {
    const locale = useLocale();
    const m = useMessages();
    const content = gettingToGandocaContent(locale);
    const lang = bookingLanguage(locale);
    const selfId = `gettingtogandoca${localeSuffix(locale)}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (

        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{content.seoTitle}</title>
                <meta name="description" content={content.seoDescription} />
                <link rel="canonical" href={canonicalUrl('blogGandoca', locale)} />
                {hreflangLinks('blogGandoca')}
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
                        <h3><strong>{content.transportOptionsHeading}</strong></h3>
                        <br />
                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title={content.stayRecommendationTitle}
                            properties={locale === 'es' ? GENERAL_PUERTO_VIEJO_RECOMMENDATIONS_ES : GENERAL_PUERTO_VIEJO_RECOMMENDATIONS}
                            language={lang}
                        />
                        <br />

                        <h4><strong>{content.busHeading}</strong></h4>
                        <p>{content.busIntro}</p>
                        <br />
                        <p><strong>{content.busSchedulesLabel}</strong></p>
                        <br />
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>{content.tableRouteHeader}</th>
                                        <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{content.tableDepartureHeader}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}><strong>Puerto Viejo → Manzanillo</strong></td>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>{scheduleBadges(TO_MANZANILLO)}</td>
                                    </tr>
                                    <tr style={{ backgroundColor: '#f9f9f9' }}>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}><strong>Manzanillo → Puerto Viejo</strong></td>
                                        <td style={{ border: '1px solid #ddd', padding: '12px', verticalAlign: 'top' }}>{scheduleBadges(TO_PUERTO_VIEJO)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs
                                language={lang}
                                ctaLink={homePath(locale)}
                            />
                        </div>
                        <h4><strong>{content.scooterHeading}</strong></h4>
                        <p>{content.scooterParagraph1}</p>
                        <br />
                        <p>{content.scooterParagraph2}</p>
                        <br />
                        <h4><strong>{content.carHeading}</strong></h4>
                        <p>{content.carParagraph}</p>
                        <br />
                        <h3><strong>{content.conclusionHeading}</strong></h3>
                        <p>{content.conclusionParagraph1}</p>
                        <br />
                        <p>{content.conclusionParagraph2}</p>
                    </div>


                    {/* Smoobu Booking Component */}
                    <div className="blog-smoobu-container" style={{ maxWidth: 1000, marginTop: '2rem', marginBottom: '2rem' }}>
                        <h2 className="smoobu-title">{m.blog.bookYourStay}</h2>
                        <div className="smoobu-wrapper">
                            <Smoobu2 targetId="blogSmoobuBooking" />
                        </div>
                    </div>

                    <OtherBlogs currentBlog={selfId} blogs={locale === 'es' ? blogsES : blogs} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default GettingToGandoca;
