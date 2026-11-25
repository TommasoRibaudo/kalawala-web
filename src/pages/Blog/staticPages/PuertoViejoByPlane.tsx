import React, { useEffect } from "react";
import { cdnImage, cdnSrcSet } from '../../../utils/imageCdn';
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Listing/Listing.style.scss';

import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import OtherBlogs from "../Components/OtherBlogs.Component";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import { Helmet } from "react-helmet";
import BookingSearchWidget from "../../../components/BookingSearchWidget/BookingSearchWidget.component";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";
import { generalPuertoViejoRecommendations } from "../../../utils/constants";
import { useLocale, useMessages } from "../../../i18n";
import { homePath } from "../../../i18n/paths";
import { canonicalUrl, hreflangLinks } from "../../../i18n/seo";
import { pathForKey } from "../../../routes.config";
import { internalLinkLabel } from "../../../i18n/content/internalLinks";
import { puertoViejoByPlaneContent } from "../../../i18n/content/blog";

// The pre-merge English page pointed this at a placeholder id
// ("1example-plane-image") that 404s. This is the real photo — the one the
// Spanish page and assets/blogs/blogs.ts's "puertoviejobyplane" entry both
// already used.
const HERO_IMAGE =
  'https://lh3.googleusercontent.com/d/1kE3Zq-IbD47bdiLkW25IKuBncif7J7YR=w1000';

const cell: React.CSSProperties = { border: '1px solid #ddd', padding: '10px 12px', verticalAlign: 'top' };

const PuertoViejoByPlane = () => {
    const locale = useLocale();
    const m = useMessages();
    const content = puertoViejoByPlaneContent(locale);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (

        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{content.seoTitle}</title>
                <meta name="description" content={content.seoDescription} />
                <link rel="canonical" href={canonicalUrl('blogByplane', locale)} />
                {hreflangLinks('blogByplane')}
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

                        <h2>{content.quickFactsHeading}</h2>
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                <tbody>
                                    {content.quickFacts.map(([label, value], i) => (
                                        <tr key={label} style={i % 2 === 1 ? { backgroundColor: '#f9f9f9' } : undefined}>
                                            <th scope="row" style={{ ...cell, textAlign: 'start', width: '40%' }}>{label}</th>
                                            <td style={cell}>{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <br />

                        <h2>{content.airportHeading}</h2>
                        {content.airportParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                        <p>
                            <Link to={pathForKey('blogBocas', locale)}><strong>{internalLinkLabel('blogBocas', locale)}</strong></Link>
                        </p>
                        <br />

                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title={content.stayRecommendationTitle}
                            properties={generalPuertoViejoRecommendations(locale)}
                        />
                        <br />

                        {content.bodyParagraphs.map((paragraph, i) => (
                            <React.Fragment key={i}>
                                {content.bodyHeadings[i] && <h2>{content.bodyHeadings[i]}</h2>}
                                <p>{paragraph}</p>
                                <br />
                            </React.Fragment>
                        ))}
                        <p>
                            <Link to={pathForKey('blogCahuitaLimon', locale)}><strong>{internalLinkLabel('blogCahuitaLimon', locale)}</strong></Link>
                        </p>
                        <br />

                        <h2>{content.compareHeading}</h2>
                        <p>{content.compareParagraph}</p>
                        <p>
                            <Link to={pathForKey('blogBushours', locale)}><strong>{internalLinkLabel('blogBushours', locale)}</strong></Link>
                        </p>
                        <br />

                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs
                                locale={locale}
                                ctaLink={homePath(locale)}
                            />
                        </div>
                        <br />

                        <h2>{content.faqHeading}</h2>
                        {content.faqItems.map(({ q, a }) => (
                            <React.Fragment key={q}>
                                <h3 style={{ fontSize: '1.15rem', marginTop: '1.25rem' }}>{q}</h3>
                                <p>{a}</p>
                            </React.Fragment>
                        ))}
                        <br />

                        {content.closingParagraphs.map((paragraph, i) => (
                            <React.Fragment key={i}>
                                <p>{paragraph}</p>
                                <br />
                            </React.Fragment>
                        ))}
                        <p>
                            <Link to={pathForKey('blogSanjoseOptions', locale)}><strong>{internalLinkLabel('blogSanjoseOptions', locale)}</strong></Link>
                        </p>
                        <br />
                    </div>


                    {/* Smoobu Booking Component */}
                    <div className="blog-smoobu-container" style={{ maxWidth: 1000, marginTop: '2rem', marginBottom: '2rem' }}>
                        <h2 className="smoobu-title">{m.blog.bookYourStay}</h2>
                        <div className="smoobu-wrapper">
                            <BookingSearchWidget locale={locale} variant="hero" />
                        </div>
                    </div>

                    <OtherBlogs currentBlog="puertoviejobyplane" locale={locale} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default PuertoViejoByPlane;
