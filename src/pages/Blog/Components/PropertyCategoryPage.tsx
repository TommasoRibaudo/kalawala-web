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
import { pathForKey, RouteKey } from "../../../routes.config";
import { CATEGORY_PROPERTIES, propertyCategoryContent } from "../../../i18n/content/propertyCategories";

type CategoryKey = keyof typeof CATEGORY_PROPERTIES;

interface IPropertyCategoryPage {
    routeKey: RouteKey;
    categoryKey: CategoryKey;
}

/**
 * Shared template for the 5 "casa vacacional" category spoke pages (2
 * location, 3 traveler-type) — see propertyCategories.tsx for why these are
 * separate single-topic pages rather than sections of one guide: each needs
 * its own title a searcher can actually click into.
 */
const PropertyCategoryPage: React.FC<IPropertyCategoryPage> = ({ routeKey, categoryKey }) => {
    const locale = useLocale();
    const content = propertyCategoryContent(categoryKey, locale);
    const houseCodes = CATEGORY_PROPERTIES[categoryKey];
    const houses = houseCodes
        .map((code) => houseDataByLangCode(locale === 'es' ? `${code}ES` : code))
        .filter((house): house is NonNullable<typeof house> => house !== undefined);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                    </div>

                    <div className="description" style={{ maxWidth: 1000 }}>
                        <p>{content.introParagraphs[0]}</p>
                        <br />
                        <p>{content.introParagraphs[1]}</p>
                    </div>

                    <h2 style={{ maxWidth: 1000, marginTop: '2rem' }}>{content.gridHeading}</h2>
                    <div className={`homes-grid${houses.length === 5 ? ' homes-grid--five' : ''}`} style={{ marginTop: '1rem', marginBottom: '2rem' }}>
                        {houses.map((house) => (
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

                    <p style={{ maxWidth: 1000 }}>
                        <Link to={pathForKey('blogVacationRentals', locale)}><strong>{content.backToHubLabel}</strong></Link>
                    </p>

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

export default PropertyCategoryPage;
