import React, { FC, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Listing/Listing.style.scss';
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import { Helmet } from "react-helmet";
import OtherBlogs from "./OtherBlogs.Component";
import Smoobu2 from "../../../components/Smoobu2/Smoobu2.component";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";
import { generalPuertoViejoRecommendations } from "../../../utils/constants";
import { useLocale, useMessages } from "../../../i18n";
import { homePath } from "../../../i18n/paths";
import { canonicalUrl, hreflangLinks } from "../../../i18n/seo";
import { pathForKey, RouteKey } from "../../../routes.config";
import { monthlyWeatherContent, MonthKey } from "../../../i18n/content/blog";

interface IMonthlyWeatherArticle {
    /** Which month's content to render. */
    month: MonthKey;
    /** This page's own route key — drives canonical/hreflang and the Smoobu id. */
    routeKey: RouteKey;
    /** English slug, used to exclude this article from its own OtherBlogs list. */
    slug: string;
    /** Hero image URL. */
    heroImage: string;
}

/**
 * Shared renderer for the twelve month-specific weather spokes. Each spoke is
 * a one-line wrapper that passes its month/routeKey/slug/heroImage in — the
 * copy lives in monthlyWeatherContent(), the layout lives here, so there is a
 * single component to maintain rather than twelve near-identical pages.
 */
const MonthlyWeatherArticle: FC<IMonthlyWeatherArticle> = ({ month, routeKey, slug, heroImage }) => {
    const locale = useLocale();
    const m = useMessages();
    const content = monthlyWeatherContent(month, locale);

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
                <link rel="canonical" href={canonicalUrl(routeKey, locale)} />
                {hreflangLinks(routeKey)}
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
                                src={heroImage}
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
                        <p style={{ background: '#f7f6f3', border: '1px solid #e6e2d8', padding: '10px 14px', fontStyle: 'italic', borderRadius: '6px', color: '#5a5348' }}>
                            {m.blog.weatherVariabilityNote}
                        </p>
                        <br />

                        {/* Snapshot table */}
                        <h2>{content.snapshotHeading}</h2>
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                                <tbody>
                                    {content.snapshot.map((r, i) => (
                                        <tr key={r.label} style={i % 2 === 1 ? { backgroundColor: '#f9f9f9' } : undefined}>
                                            <td style={{ ...cell, width: '35%' }}><strong>{r.label}</strong></td>
                                            <td style={cell}>{r.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <br />

                        <h2>{content.whatItsLikeHeading}</h2>
                        {content.whatItsLikeParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                        <br />

                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title={content.stayRecommendationTitle}
                            properties={generalPuertoViejoRecommendations(locale)}
                        />
                        <br />

                        <h2>{content.rainHeading}</h2>
                        <p>{content.rainParagraph}</p>
                        <p>{content.rainyDayIntro}</p>
                        <ul>
                            {content.rainyDayItems.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                        <br />

                        <h2>{content.crowdsHeading}</h2>
                        <p>{content.crowdsParagraph}</p>
                        <br />

                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs locale={locale} ctaLink={homePath(locale)} />
                        </div>
                        <br />

                        <h2>{content.verdictHeading}</h2>
                        <p>{content.verdictParagraph}</p>
                        <br />

                        <h2>{content.takeawaysHeading}</h2>
                        <p>{content.takeawaysParagraph}</p>
                        <br />

                        <p>
                            <Link to={pathForKey('blogWeather', locale)}><strong>{content.hubLinkText}</strong></Link>
                        </p>
                    </div>

                    {/* Smoobu Booking Component */}
                    <div className="blog-smoobu-container" style={{ maxWidth: 1000, marginTop: '2rem', marginBottom: '2rem' }}>
                        <h2 className="smoobu-title">{m.blog.bookYourStay}</h2>
                        <div className="smoobu-wrapper">
                            <Smoobu2 targetId="blogSmoobuBooking" />
                        </div>
                    </div>

                    <OtherBlogs currentBlog={slug} locale={locale} />
                </Col>
            </Row>

            <ContactUs />
        </div>
    );
};

export default MonthlyWeatherArticle;
