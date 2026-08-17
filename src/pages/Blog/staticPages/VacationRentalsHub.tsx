import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../../Listing/Listing.style.scss';
import '../../../components/OurHomes/OurHomes.style.scss';
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import { Helmet } from "react-helmet";
import Smoobu2 from "../../../components/Smoobu2/Smoobu2.component";
import HomeCard from "../../../components/OurHomes/Components/HomeCard.component";
import { houseDataByLangCode } from "../../../utils/constants";
import { useLocale } from "../../../i18n";
import { canonicalUrl, hreflangLinks } from "../../../i18n/seo";
import { pathForKey } from "../../../routes.config";
import { ALL_PROPERTIES, vacationRentalHubContent, CategoryCardLink } from "../../../i18n/content/propertyCategories";

const CardLink: React.FC<{ link: CategoryCardLink; locale: ReturnType<typeof useLocale> }> = ({ link, locale }) => (
    <Link to={pathForKey(link.routeKey, locale)} className="vacation-category-card" style={{
        display: 'block',
        border: '1px solid #e6e2d8',
        borderRadius: '8px',
        padding: '18px 20px',
        textDecoration: 'none',
        color: 'inherit',
        background: '#fff',
        transition: 'box-shadow 0.15s ease',
    }}>
        <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem' }}>{link.title}</h3>
        <p style={{ margin: 0 }}>{link.description}</p>
    </Link>
);

/**
 * Main hub for the "casa vacacional en puerto viejo" cluster — targets the
 * umbrella term (the one with real, sustained Trends volume) and links out to
 * the 2 location spokes + 3 traveler-type spokes, each a real single-topic
 * page. See propertyCategories.tsx for the full rationale.
 */
const VacationRentalsHub = () => {
    const locale = useLocale();
    const content = vacationRentalHubContent(locale);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const allHouses = ALL_PROPERTIES
        .map((code) => houseDataByLangCode(locale === 'es' ? `${code}ES` : code))
        .filter((house): house is NonNullable<typeof house> => house !== undefined);

    return (
        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{content.seoTitle}</title>
                <meta name="description" content={content.seoDescription} />
                <link rel="canonical" href={canonicalUrl('blogVacationRentals', locale)} />
                {hreflangLinks('blogVacationRentals')}
            </Helmet>

            <FixedNavigation isBlog={true} />

            <Row className="subContainer" style={{ justifyContent: 'center' }}>
                <Col className="info col" lg={{ order: 'first', span: 8 }} md={{ order: 'first', span: 10 }} sm={12} xs={12}>

                    <div className="blog-header" style={{ maxWidth: 1000, marginBottom: '2rem' }}>
                        <div className="heading title-container">
                            <h1 className="title blog-title">{content.heading}</h1>
                            <div className="border"></div>
                        </div>
                    </div>

                    <div className="description" style={{ maxWidth: 1000 }}>
                        <p>{content.introParagraphs[0]}</p>
                        <br />
                        <p>{content.introParagraphs[1]}</p>
                    </div>

                    <div style={{ maxWidth: 1000, marginTop: '2.5rem' }}>
                        <h2>{content.neighborhoodHeading}</h2>
                        <p>{content.neighborhoodIntro}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '1rem' }}>
                            {content.neighborhoodLinks.map((link) => <CardLink key={link.routeKey} link={link} locale={locale} />)}
                        </div>
                    </div>

                    <div style={{ maxWidth: 1000, marginTop: '2.5rem' }}>
                        <h2>{content.tripTypeHeading}</h2>
                        <p>{content.tripTypeIntro}</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '1rem' }}>
                            {content.tripTypeLinks.map((link) => <CardLink key={link.routeKey} link={link} locale={locale} />)}
                        </div>
                    </div>

                    <h2 style={{ maxWidth: 1000, marginTop: '2.5rem' }}>{content.allHomesHeading}</h2>
                    <div className={`homes-grid`} style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                        {allHouses.map((house) => (
                            <HomeCard
                                key={house.houseLangCode}
                                guestNumber={house.guestNumber}
                                hasFencedParking={house.parking}
                                name={house.name}
                                image={house.image}
                                houseLangCode={house.houseLangCode}
                                locale={locale}
                            />
                        ))}
                    </div>

                    <div className="blog-smoobu-container" style={{ maxWidth: 1000, marginTop: '2rem', marginBottom: '2rem' }}>
                        <h2 className="smoobu-title">{content.ctaHeading}</h2>
                        <p>{content.ctaText}</p>
                        <div className="smoobu-wrapper">
                            <Smoobu2 targetId="blogSmoobuBooking" />
                        </div>
                    </div>
                </Col>
            </Row>

            <ContactUs />
        </div>
    );
};

export default VacationRentalsHub;
