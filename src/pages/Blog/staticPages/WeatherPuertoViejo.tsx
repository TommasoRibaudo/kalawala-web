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
import { internalLinkLabel } from "../../../i18n/content/internalLinks";
import { weatherHubContent } from "../../../i18n/content/blog";

const HERO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Lim%C3%B3n_Province%2C_Puerto_Viejo_de_Talamanca%2C_Costa_Rica_-_panoramio_%281%29.jpg/1280px-Lim%C3%B3n_Province%2C_Puerto_Viejo_de_Talamanca%2C_Costa_Rica_-_panoramio_%281%29.jpg?20170313071619";

// One entry per table row, January…December. `null` = that month's article
// hasn't shipped yet, so the row renders as plain text instead of a dead
// link. Filled in phase by phase as the monthly spokes are added (Phase 1:
// September–December).
const MONTH_ROUTE_KEYS: (RouteKey | null)[] = [
    'blogWeatherJan', 'blogWeatherFeb', 'blogWeatherMar', 'blogWeatherApr',
    'blogWeatherMay', 'blogWeatherJun', 'blogWeatherJul', 'blogWeatherAug',
    'blogWeatherSep', 'blogWeatherOct', 'blogWeatherNov', 'blogWeatherDec',
];

const WeatherPuertoViejo = () => {
    const locale = useLocale();
    const m = useMessages();
    const content = weatherHubContent(locale);

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
                <link rel="canonical" href={canonicalUrl('blogWeather', locale)} />
                {hreflangLinks('blogWeather')}
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

                        <p style={{ background: '#f7f6f3', border: '1px solid #e6e2d8', padding: '10px 14px', fontStyle: 'italic', borderRadius: '6px', color: '#5a5348' }}>
                            {m.blog.weatherVariabilityNote}
                        </p>
                        <br />

                        {/* Month-by-month table — the hub of the weather cluster */}
                        <h2>{content.tableHeading}</h2>
                        <p>{content.tableIntro}</p>
                        <br />
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                                        <th style={{ ...cell, textAlign: 'left' }}>{content.colMonth}</th>
                                        <th style={{ ...cell, textAlign: 'left' }}>{content.colTemp}</th>
                                        <th style={{ ...cell, textAlign: 'left' }}>{content.colRain}</th>
                                        <th style={{ ...cell, textAlign: 'left' }}>{content.colVerdict}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {content.monthRows.map((r, i) => {
                                        const key = MONTH_ROUTE_KEYS[i];
                                        return (
                                            <tr key={r.month} style={i % 2 === 1 ? { backgroundColor: '#f9f9f9' } : undefined}>
                                                <td style={cell}>
                                                    {key
                                                        ? <Link to={pathForKey(key, locale)}><strong>{r.month}</strong></Link>
                                                        : <strong>{r.month}</strong>}
                                                </td>
                                                <td style={cell}>{r.temp}</td>
                                                <td style={cell}>{r.rain}</td>
                                                <td style={cell}>{r.verdict}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <br />

                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title={content.stayRecommendationTitle}
                            properties={generalPuertoViejoRecommendations(locale)}
                        />
                        <br />

                        <h2>{content.windowsHeading}</h2>
                        <p>{content.windowsParagraphs[0]}</p>
                        <p>{content.windowsParagraphs[1]}</p>
                        <p>{content.windowsParagraphs[2]}</p>
                        <br />

                        <h2>{content.liveHeading}</h2>
                        <p>{content.liveParagraphs[0]}</p>
                        <p>{content.liveParagraphs[1]}</p>
                        <br />

                        <h2>{content.rainyHeading}</h2>
                        <p>{content.rainyIntro}</p>
                        <ul>
                            {content.rainyListItems.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                        <p>
                            <Link to={pathForKey('blogIndigenous', locale)}><strong>{internalLinkLabel('blogIndigenous', locale)}</strong></Link>
                        </p>
                        <p>
                            <Link to={pathForKey('blogCahuitapark', locale)}><strong>{internalLinkLabel('blogCahuitapark', locale)}</strong></Link>
                        </p>
                        <br />

                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs locale={locale} ctaLink={homePath(locale)} />
                        </div>
                        <br />

                        <h2>{content.packHeading}</h2>
                        <ul>
                            {content.packListItems.map((item, i) => <li key={i}>{item}</li>)}
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

                    <OtherBlogs currentBlog="weather-puerto-viejo" locale={locale} />
                </Col>
            </Row>

            <ContactUs />
        </div>
    );
};

export default WeatherPuertoViejo;
