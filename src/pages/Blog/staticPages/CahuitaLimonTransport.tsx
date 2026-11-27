import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Listing/Listing.style.scss';
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import { Helmet } from "react-helmet";
import OtherBlogs from "../Components/OtherBlogs.Component";
import BookingSearchWidget from "../../../components/BookingSearchWidget/BookingSearchWidget.component";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";
import { generalPuertoViejoRecommendations } from "../../../utils/constants";
import { useLocale, useMessages } from "../../../i18n";
import { homePath } from "../../../i18n/paths";
import { canonicalUrl, hreflangLinks } from "../../../i18n/seo";
import { pathForKey } from "../../../routes.config";
import { internalLinkLabel } from "../../../i18n/content/internalLinks";
import { cahuitaLimonTransportContent } from "../../../i18n/content/blog";
import { LIMON_PUERTO_VIEJO_SCHEDULE } from "../busSchedules";

// Same MEPE bus photo the bus-hours and San José guides use.
const HERO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Lim%C3%B3n_Province%2C_Sixaola%2C_Costa_Rica_-_panoramio_%282%29.jpg/960px-Lim%C3%B3n_Province%2C_Sixaola%2C_Costa_Rica_-_panoramio_%282%29.jpg";

const cell: React.CSSProperties = { border: '1px solid #ddd', padding: '10px 12px', verticalAlign: 'top' };

const badges = (times: string[], color: string) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px', fontSize: '14px' }}>
        {times.map((time) => (
            <span key={time} style={{ backgroundColor: color, padding: '4px 8px', borderRadius: '4px', textAlign: 'center' }}>{time}</span>
        ))}
    </div>
);

const CahuitaLimonTransport = () => {
    const locale = useLocale();
    const m = useMessages();
    const content = cahuitaLimonTransportContent(locale);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{content.seoTitle}</title>
                <meta name="description" content={content.seoDescription} />
                <link rel="canonical" href={canonicalUrl('blogCahuitaLimon', locale)} />
                {hreflangLinks('blogCahuitaLimon')}
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
                        {content.introParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                        <br />

                        <h2>{content.compareHeading}</h2>
                        <p>{content.compareIntro}</p>
                        <br />
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                                        <th style={{ ...cell, textAlign: 'left' }}>{content.colOption}</th>
                                        <th style={{ ...cell, textAlign: 'left' }}>{content.colCost}</th>
                                        <th style={{ ...cell, textAlign: 'left' }}>{content.colTime}</th>
                                        <th style={{ ...cell, textAlign: 'left' }}>{content.colBestFor}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {content.rows.map((r, i) => (
                                        <tr key={r.option} style={i % 2 === 1 ? { backgroundColor: '#f9f9f9' } : undefined}>
                                            <td style={cell}><strong>{r.option}</strong></td>
                                            <td style={cell}>{r.cost}</td>
                                            <td style={cell}>{r.time}</td>
                                            <td style={cell}>{r.bestFor}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p>{content.compareFootnote}</p>
                        <br />

                        <h2>{content.busHeading}</h2>
                        {content.busParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                        <br />
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                                        <th style={{ ...cell, textAlign: 'left', width: '25%' }}>{content.tableRouteHeader}</th>
                                        <th style={{ ...cell, textAlign: 'center', width: '37.5%' }}>{content.tableWeekdayHeader}</th>
                                        <th style={{ ...cell, textAlign: 'center', width: '37.5%' }}>{content.tableSundayHeader}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {LIMON_PUERTO_VIEJO_SCHEDULE.map(([route, weekday, sunday], i) => (
                                        <tr key={route} style={i % 2 === 1 ? { backgroundColor: '#f9f9f9' } : undefined}>
                                            <td style={cell}><strong>{route}</strong></td>
                                            <td style={cell}>{badges(weekday, '#e8f4f8')}</td>
                                            <td style={cell}>{badges(sunday, '#f0f8e8')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p>{content.busScheduleNote}</p>
                        <p>
                            <Link to={pathForKey('blogBushours', locale)}><strong>{content.busLinkText}</strong></Link>
                        </p>
                        <br />

                        <h2>{content.cahuitaHeading}</h2>
                        {content.cahuitaParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                        <p>
                            <Link to={pathForKey('blogCahuitapark', locale)}><strong>{internalLinkLabel('blogCahuitapark', locale)}</strong></Link>
                        </p>
                        <br />

                        <StayRecommendation
                            title={content.stayRecommendationTitle}
                            properties={generalPuertoViejoRecommendations(locale)}
                        />
                        <br />

                        <h2>{content.limonHeading}</h2>
                        {content.limonParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                        <p>
                            <Link to={pathForKey('blogByplane', locale)}><strong>{content.byPlaneLinkText}</strong></Link>
                        </p>
                        <p>
                            <Link to={pathForKey('blogSanjoseOptions', locale)}><strong>{content.sanJoseLinkText}</strong></Link>
                        </p>
                        <br />

                        <h2>{content.taxiHeading}</h2>
                        {content.taxiParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                        <br />

                        <h2>{content.bikeHeading}</h2>
                        {content.bikeParagraphs.map((p, i) => <p key={i}>{p}</p>)}
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

                        <h2>{content.takeawaysHeading}</h2>
                        <p>{content.takeawaysParagraph}</p>
                    </div>

                    <div className="blog-smoobu-container" style={{ maxWidth: 1000, marginTop: '2rem', marginBottom: '2rem' }}>
                        <h2 className="smoobu-title">{m.blog.bookYourStay}</h2>
                        <div className="smoobu-wrapper">
                            <BookingSearchWidget locale={locale} variant="hero" />
                        </div>
                    </div>

                    <OtherBlogs currentBlog="puerto-viejo-to-cahuita-and-limon" locale={locale} />
                </Col>
            </Row>

            <ContactUs />
        </div>
    );
};

export default CahuitaLimonTransport;
