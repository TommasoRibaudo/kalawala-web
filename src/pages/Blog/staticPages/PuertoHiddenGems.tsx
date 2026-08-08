import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';

import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import OtherBlogs from "../Components/OtherBlogs.Component";
import { GENERAL_PUERTO_VIEJO_RECOMMENDATIONS, GENERAL_PUERTO_VIEJO_RECOMMENDATIONS_ES } from "../../../utils/constants";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import { Helmet } from "react-helmet";
import { blogs, blogsES } from "../../../assets/blogs/blogs";
import Smoobu2 from "../../../components/Smoobu2/Smoobu2.component";
import StayRecommendation from "../../../components/StayRecommendation/StayRecommendation.component";
import WhyStayWithUs from "../../../components/WhyStayWithUs/WhyStayWithUs.component";
import { useLocale, useMessages } from "../../../i18n";
import { localeSuffix, bookingLanguage, homePath } from "../../../i18n/paths";
import { canonicalUrl, hreflangLinks } from "../../../i18n/seo";
import { puertoHiddenGemsContent, HiddenGemSection } from "../../../i18n/content/blog";

const HERO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Puerto_Viejo_de_Talamanca%2C_Costa_Rica_2012.JPG/960px-Puerto_Viejo_de_Talamanca%2C_Costa_Rica_2012.JPG?20120902175205";

const Section = ({ section }: { section: HiddenGemSection }) => (
    <>
        <h2>
            {section.headingHref ? (
                <a href={section.headingHref} target="_blank" rel="noopener noreferrer">{section.headingText}</a>
            ) : section.headingText}
        </h2>
        <p>{section.paragraphs[0]}</p>
        <br />
        <p>{section.paragraphs[1]}</p>
        <br />
        {section.list && (
            <p>
                {section.list.label}
                <ul>
                    {section.list.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
            </p>
        )}
        {section.tipLine && <p>{section.tipLine}</p>}
        <br />
    </>
);

const PuertoHiddenGems = () => {
    const locale = useLocale();
    const m = useMessages();
    const content = puertoHiddenGemsContent(locale);
    const lang = bookingLanguage(locale);
    const selfId = `puertoHiddenGems${localeSuffix(locale)}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (

        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{content.seoTitle}</title>
                <meta name="description" content={content.seoDescription} />
                <link rel="canonical" href={canonicalUrl('blogHiddengems', locale)} />
                {hreflangLinks('blogHiddengems')}
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
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    display: 'block'
                                }}
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

                        {/* Optional: Stay Recommendation Component - place near the top */}
                        <StayRecommendation
                            title={content.stayRecommendationTitle}
                            properties={locale === 'es' ? GENERAL_PUERTO_VIEJO_RECOMMENDATIONS_ES : GENERAL_PUERTO_VIEJO_RECOMMENDATIONS}
                            language={lang}
                        />
                        <br />

                        {content.sections.slice(0, 6).map((section, i) => (
                            <Section key={i} section={section} />
                        ))}

                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs language={lang} ctaLink={homePath(locale)} />
                        </div>

                        <h2>{content.tipsHeading}</h2>
                        <p>{content.tipsIntro}</p>
                        <br />
                        <p>
                            <ul>
                                {content.tipsListItems.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </p>
                        <br />

                        <p>{content.closingParagraph}</p>
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

export default PuertoHiddenGems;
