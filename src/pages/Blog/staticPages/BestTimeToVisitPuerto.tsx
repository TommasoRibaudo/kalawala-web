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
import { canonicalUrl, hreflangLinks } from "../../../i18n/seo";
import { bestTimeToVisitContent } from "../../../i18n/content/blog";

const HERO_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Lim%C3%B3n_Province%2C_Puerto_Viejo_de_Talamanca%2C_Costa_Rica_-_panoramio_%281%29.jpg/1280px-Lim%C3%B3n_Province%2C_Puerto_Viejo_de_Talamanca%2C_Costa_Rica_-_panoramio_%281%29.jpg?20170313071619";

const BestTimeToVisitPuerto = () => {
    const locale = useLocale();
    const m = useMessages();
    const content = bestTimeToVisitContent(locale);
    const lang = bookingLanguage(locale);
    const selfId = `bestTimeToVisitPuerto${localeSuffix(locale)}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (

        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{content.seoTitle}</title>
                <meta
                    name="description"
                    content={content.seoDescription}
                />
                <link
                    rel="canonical"
                    href={canonicalUrl('blogBesttime', locale)}
                />
                {hreflangLinks('blogBesttime')}
            </Helmet>

            <FixedNavigation isBlog={true} />

            <Row className="subContainer" style={{ justifyContent: 'center' }}>
                <Col
                    className="info col"
                    lg={{ order: 'first', span: 8 }}
                    md={{ order: 'first', span: 10 }}
                    sm={12}
                    xs={12}
                >
                    <br />

                    <div className="heading title-container" style={{ maxWidth: 1000 }}>
                        <h1 className="title blog-title">
                            {content.heading}
                        </h1>
                        <br />
                        <div className="border"></div>
                    </div>

                    <div className="description" style={{ maxWidth: 1000 }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                src={HERO_IMAGE}
                                className="responsive-image"
                                alt={content.heroAlt}
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    display: 'block'
                                }}
                                width="1000"
                                height="600"
                            />
                        </div>
                        {content.photoCredit}

                        <br />
                        <br />

                        <p>{content.introParagraphs[0]}</p>
                        <p>{content.introParagraphs[1]}</p>

                        {/* Stay Recommendation Component - positioned in middle of article */}
                        <StayRecommendation
                            title={content.stayRecommendationTitle}
                            properties={locale === 'es' ? GENERAL_PUERTO_VIEJO_RECOMMENDATIONS_ES : GENERAL_PUERTO_VIEJO_RECOMMENDATIONS}
                            language={lang}
                        />

                        <h2>{content.hardToPredictHeading}</h2>

                        <p>{content.hardToPredictParagraphs[0]}</p>
                        <p>{content.hardToPredictParagraphs[1]}</p>

                        <ul>
                            {content.surprisesListItems.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>

                        <br />

                        <h2>{content.bestTimeHeading}</h2>

                        <p>{content.bestTimeParagraphs[0]}</p>
                        <p>{content.bestTimeParagraphs[1]}</p>

                        <ul>
                            {content.bestTimeListItems.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>

                        <br />

                        <h2>{content.febAprHeading}</h2>

                        <p>{content.febAprParagraphs[0]}</p>
                        <p>{content.febAprParagraphs[1]}</p>

                        <br />

                        <h2>{content.wetMonthsHeading}</h2>

                        <p>{content.wetMonthsParagraphs[0]}</p>
                        <p>{content.wetMonthsParagraphs[1]}</p>
                        <p>{content.wetMonthsParagraphs[2]}</p>
                        <p>{content.wetMonthsParagraphs[3]}</p>

                        {/* Why Stay With Us Component - after main content, before OtherBlogs */}
                        <div style={{ maxWidth: 1000 }}>
                            <WhyStayWithUs language={lang} ctaLink={homePath(locale)} />
                        </div>

                        <br />

                        <h2>{content.tipsHeading}</h2>

                        <ul>
                            {content.tipsListItems.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>

                        <br />

                        <h2>{content.conclusionHeading}</h2>

                        <p>{content.conclusionParagraph}</p>
                    </div>

                    <div
                        className="blog-smoobu-container"
                        style={{
                            maxWidth: 1000,
                            marginTop: '2rem',
                            marginBottom: '2rem',
                        }}
                    >
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

export default BestTimeToVisitPuerto;
