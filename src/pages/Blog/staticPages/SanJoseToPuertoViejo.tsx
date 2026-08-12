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
import { sanJoseOptionsContent } from "../../../i18n/content/blog";

const HERO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Lim%C3%B3n_Province%2C_Sixaola%2C_Costa_Rica_-_panoramio_%282%29.jpg/960px-Lim%C3%B3n_Province%2C_Sixaola%2C_Costa_Rica_-_panoramio_%282%29.jpg";

const SanJoseToPuertoViejo = () => {
    const locale = useLocale();
    const m = useMessages();
    const content = sanJoseOptionsContent(locale);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const cell: React.CSSProperties = { border: '1px solid #ddd', padding: '10px 12px', verticalAlign: 'top' };

    return (
        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{content.seoTitle}</title>
                <meta name="description" content={content.seoDescription} />
                <link rel="canonical" href={canonicalUrl('blogSanjoseOptions', locale)} />
                {hreflangLinks('blogSanjoseOptions')}
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

                        {/* Comparison table */}
                        <h2>{content.tableHeading}</h2>
                        <p>{content.tableIntro}</p>
                        <br />
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                                        <th style={{ ...cell, textAlign: 'left' }}>{content.colOption}</th>
                                        <th style={{ ...cell, textAlign: 'left' }}>{content.colCost}</th>
                                        <th style={{ ...cell, textAlign: 'left' }}>{content.colTime}</th>
                                        <th style={{ ...cell, textAlign: 'left' }}>{content.colComfort}</th>
                                        <th style={{ ...cell, textAlign: 'left' }}>{content.colBestFor}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {content.rows.map((r, i) => (
                                        <tr key={r.option} style={i % 2 === 1 ? { backgroundColor: '#f9f9f9' } : undefined}>
                                            <td style={cell}><strong>{r.option}</strong></td>
                                            <td style={cell}>{r.cost}</td>
                                            <td style={cell}>{r.time}</td>
                                            <td style={cell}>{r.comfort}</td>
                                            <td style={cell}>{r.bestFor}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <br />

                        <h2>{content.busHeading}</h2>
                        {content.busParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                        <p>
                            <Link to={pathForKey('blogBushours', locale)}><strong>{content.busLinkText}</strong></Link>
                        </p>
                        <br />

                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title={content.stayRecommendationTitle}
                            properties={generalPuertoViejoRecommendations(locale)}
                        />
                        <br />

                        <h2>{content.shuttleHeading}</h2>
                        {content.shuttleParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                        <br />

                        <h2>{content.transferHeading}</h2>
                        {content.transferParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                        <br />

                        <h2>{content.flightHeading}</h2>
                        {content.flightParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                        <p>
                            <Link to={pathForKey('blogByplane', locale)}><strong>{content.flightLinkText}</strong></Link>
                        </p>
                        <br />

                        <h2>{content.returnHeading}</h2>
                        <p>{content.returnParagraph}</p>
                        <br />

                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs locale={locale} ctaLink={homePath(locale)} />
                        </div>
                        <br />

                        <h2>{content.chooseHeading}</h2>
                        <p>{content.chooseIntro}</p>
                        <ul>
                            {content.chooseListItems.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
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

                    <OtherBlogs currentBlog="san-jose-to-puerto-viejo" locale={locale} />
                </Col>
            </Row>

            <ContactUs />
        </div>
    );
};

export default SanJoseToPuertoViejo;
