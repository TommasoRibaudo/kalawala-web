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
import { cahuitaParkContent } from "../../../i18n/content/blog";

const HERO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Cahuita_national_park%2C_Costa_Rica.jpg/1280px-Cahuita_national_park%2C_Costa_Rica.jpg?20090819063715";

const CahuitaPark = () => {
    const locale = useLocale();
    const m = useMessages();
    const content = cahuitaParkContent(locale);
    const lang = bookingLanguage(locale);
    const selfId = `cahuitaParkwhattodo${localeSuffix(locale)}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (

        <div className={`listingContainer`}>
            <Helmet>
                <html lang={locale} dir={directionOf(locale)} />
                <meta charSet="utf-8" />
                <title>{content.seoTitle}</title>
                <meta name="description" content={content.seoDescription} />
                <link rel="canonical" href={canonicalUrl('blogCahuitapark', locale)} />
                {hreflangLinks('blogCahuitapark')}
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
                                alt="Cahuita National Park Beach"
                                width="1000"
                                height="600"
                            />
                            <p style={{ fontSize: '0.85rem', margin: '4px 0 0' }}>{content.photoCredit}</p>
                        </div>
                    </div>
                    <div className="description" style={{ maxWidth: 1000, }}>

                        {content.introParagraphs.map((p, i) => <p key={i}>{p}</p>)}

                        <br />
                        <h3><strong>{content.enterHeading}</strong></h3>
                        <p></p>
                        {content.enterParagraphs.map((p, i) => <p key={i}>{p}</p>)}

                        <br />
                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title={content.stayRecommendationTitle}
                            properties={locale === 'es' ? GENERAL_PUERTO_VIEJO_RECOMMENDATIONS_ES : GENERAL_PUERTO_VIEJO_RECOMMENDATIONS}
                            language={lang}
                        />
                        <br />

                        <h3><strong>{content.snorkelHeading}</strong></h3>
                        <p>{content.snorkelParagraphs[0]}</p>
                        <p>{content.snorkelParagraphs[1]}</p>
                        <p>{content.snorkelParagraphs[2]}</p>
                        <ul>
                            <li><strong>{content.snorkelListItems[0]}</strong></li>
                            <li><strong>{content.snorkelListItems[1]}</strong> </li>
                            <li><strong>{content.snorkelListItems[2]}</strong> </li>
                        </ul>
                        <br />

                        <p>{content.snorkelClosing}</p>

                        <br />
                        <h3><strong>{content.wildlifeHeading}</strong></h3>
                        {content.wildlifeParagraphs.map((p, i) => <p key={i}>{p}</p>)}

                        <br />
                        <h3><strong>{content.scheduleHeading}</strong></h3>
                        <p>{content.scheduleParagraphs[0]}</p>
                        <p>{content.scheduleParagraphs[1]}</p>

                    {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                    <div style={{ maxWidth: 1000 }}>
                        <WhyStayWithUs
                            language={lang}
                            ctaLink={homePath(locale)}
                        />
                    </div>

                        <h3><strong>{content.boatHeading}</strong></h3>
                        <p>{content.boatParagraphs[0]}</p>
                        <p>{content.boatParagraphs[1]}</p>
                        <p>{content.boatParagraphs[2]}</p>

                        <br />
                        <h3><strong>{content.plasticHeading}</strong></h3>
                        <p>{content.plasticParagraphs[0]}</p>
                        <p>{content.plasticParagraphs[1]}</p>
                        <p>{content.plasticParagraphs[2]}</p>

                        <br />
                        <h3><strong>{content.tipsHeading}</strong></h3>
                        <ul>
                            <li><strong>{content.tipsListItems[0]}</strong></li>
                            <li><strong>{content.tipsListItems[1]}</strong> </li>
                            <li><strong>{content.tipsListItems[2]}</strong> </li>
                            <li><strong>{content.tipsListItems[3]}</strong> </li>
                        </ul>
                        <p>{content.closing}</p>
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

export default CahuitaPark;
