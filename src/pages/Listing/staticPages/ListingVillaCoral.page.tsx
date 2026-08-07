import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import '../Listing.style.scss'
import OtherListings from "../components/OtherListings/OtherListings.component";
import BookingSearchWidget from "../../../components/BookingSearchWidget/BookingSearchWidget.component";
import ImagesContainer from "../components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "../components/ImagesModal/ImagesModal.component";
import Footer from "../../../components/Footer/Footer.component";
import { VillaSnippet } from "../../../utils/constants";
import { HouseDataType } from "../../../utils/types";
import Amenities from "../components/Amenities/Amenities.component";
import { AmenityType } from "../../../utils/types";
import { Helmet } from "react-helmet";
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import ListingMarketingSection from "../../../components/ListingMarketingSection/ListingMarketingSection.component";
import SocialStatement from "../../../components/SocialStatement/SocialStatement.component";
import FeatureHighlights from "../../../components/FeatureHighlights/FeatureHighlights.component";
import PriceConfirmationSection from "../../../components/PriceConfirmationSection/PriceConfirmationSection.component";
import GuestReviews from "../../../components/GuestReviews/GuestReviews.component";
import { useLocale, useMessages } from "../../../i18n";
import { localeSuffix } from "../../../i18n/paths";
import { listingContent } from "../../../i18n/content/listings";
import { houseDataByLangCode } from "../../../utils/constants";


const ListingVillaCoral = () => {
    const locale = useLocale();
    const m = useMessages();
    const content = listingContent('VillaCoral', locale);
    const listing = `Villa Coral${localeSuffix(locale)}`
    // Seeded null, not read from useMediaQuery/matchMedia synchronously —
    // react-snap's puppeteer viewport at prerender time and a real visitor's
    // viewport at hydration time are different numbers, and isScreenSmall
    // drives whether the sticky mobile CTA div renders at all (a structural
    // difference, not just style). Same fix as
    // MessageTipContainer.component.tsx: null means "not yet measured" (no
    // CTA div, matching react-snap's desktop-sized prerender) until the
    // effect below sets the real match post-mount.
    const [isScreenSmall, setIsScreenSmall] = useState<boolean | null>(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // `listing` ('Villa Coral', with a space) is the display/snippet-lookup
    // value used below for ImagesContainer/OtherListings/ImagesModal — it is
    // NOT the houseLangCode, which has no space (matches the /VillaCoral
    // route, same as the propertyKey="VillaCoral" literals elsewhere here).
    // The villas are the one place where the property's houseLangCode
    // ("VillaCoral") is not the string used for images and OtherListings
    // ("Villa Coral"). The pre-merge pages hid this by passing a literal to
    // .find() while using `listing` everywhere else.
    const houseData: HouseDataType | undefined = houseDataByLangCode(`VillaCoral${localeSuffix(locale)}`);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 992px)');
        setIsScreenSmall(mq.matches); // real match, read only after mount
        const handleChange = () => setIsScreenSmall(mq.matches);
        mq.addEventListener('change', handleChange);
        return () => mq.removeEventListener('change', handleChange);
    }, [])
    //const description = houseData?.description.split('<br/>');
    //const neighborhood = houseData?.neighborhood.split('<br/>');
    return (
        <div className={`listingContainer${show ? ' modal-open' : ''}`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{content.seoTitle}</title>
                <meta name="description" content={content.seoDescription} />
                <link rel="canonical" href={`https://www.reservaskalawala.com/VillaCoral${localeSuffix(locale)}`} />
                <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/VillaCoral" />
                <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/VillaCoralES" />
                <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/VillaCoral" />
            </Helmet>
            <FixedNavigation isBlog={false} />
            {isScreenSmall && (
                <div className="button-hold fixed-bottom sticky-cta-mobile" style={{ paddingBottom: "env(safe-area-inset-bottom);" }}><Button className='btn-darker sticky-cta-button' href="#smoobuComp">{m.property.stickyCta}</Button></div>)}

            <Row className="subContainer">
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={{ order: 'first', span: 12 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">{content.heading}</h1>
                        <p className="location">
                            <a href="https://maps.app.goo.gl/cJa27cXoXunmuNkf7" target="_blank" rel="noopener noreferrer">
                                Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica
                            </a>
                        </p>
                        {/* Add marketing section after title */}
                        <ListingMarketingSection propertyKey="VillaCoral" locale={locale} />
                    </div>
                    <ImagesContainer showModal={handleShow} houseName={listing!} />
                    {/* Add social statement after images */}
                    <SocialStatement propertyKey="VillaCoral" locale={locale} />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} propertyKey="VillaCoral" locale={locale} />
                    </div>

                    {/* Add feature highlights before description */}
                    <FeatureHighlights propertyKey="VillaCoral" propertyName={content.featureName} locale={locale} />

                    <div className="description">
                        <div className="check-times" style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px' }}>
                            <p><strong>{m.property.checkInLabel}</strong> {content.checkIn}</p>
                            <p><strong>{m.property.checkOutLabel}</strong> {content.checkOut}</p>
                        </div>
                        {content.paragraphs.map((paragraph, i) => {
                            // Index keys: a fixed, ordered block of prose that is
                            // never reordered, filtered or appended to.
                            const text = typeof paragraph === 'string' ? paragraph : paragraph.text;
                            const withBreak = typeof paragraph === 'string';
                            return <p key={i}>{text}{withBreak && <br />}</p>;
                        })}
                    </div>

                    <GuestReviews propertyKey="VILLA CORAL" locale={locale} />

                </Col>
                <Col id="smoobuComp" className="book col" lg={2} md={{ span: 12 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                    <PriceConfirmationSection propertyKey="VillaCoral" locale={locale} />
                    <BookingSearchWidget locale={locale} defaultGuests={houseData!.guestNumber} variant="sidebar" apartmentSlug="VillaCoral" />
                </Col>
            </Row>

            <div className="other-listings-bottom">
                <OtherListings listings={VillaSnippet} currentListing={listing || ''} />
            </div>
            {show && <ImagesModal closeModal={handleClose} houseName={listing!} />}
            <Footer locale={locale} />

        </div>
    )

}

export default ListingVillaCoral;
