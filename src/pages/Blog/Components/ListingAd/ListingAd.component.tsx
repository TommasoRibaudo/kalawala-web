import React, { FC, useEffect, useState } from "react";
import './ListingAd.style.scss'
import { ListingType } from "../../../../utils/types";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "../../../../components/CustomSlick/SlickDarkArrow.Component";
import { useMessages } from '../../../../i18n';
import { pathForLegacyId } from '../../../../routes.config';
import { isPrerender } from '../../../../utils/isPrerender';

interface IOtherListing {
    listings: ListingType[]
}

const ListingAd: FC<IOtherListing> = ({ listings }) => {
    const m = useMessages();

    // Seeded null, not window.innerWidth — react-snap's puppeteer viewport at
    // prerender time and a real visitor's viewport at hydration time are
    // different numbers, and windowWidth below decides whether a <Slider>
    // or a plain <div> renders, a structural (not just style) difference.
    // Same fix as MessageTipContainer.component.tsx: null defaults every
    // check below to the "desktop" branch, matching react-snap's
    // desktop-sized prerender, until the resize effect sets the real width
    // post-mount.
    const [windowWidth, setWindowWidth] = useState<number | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        // react-snap's crawl gives this effect time to settle before it
        // captures the page, so without this guard windowWidth gets seeded
        // from the crawl's own viewport and bakes a structural difference
        // (Slider vs plain div) into the static HTML — mismatching a real
        // client's null-seeded first render at any other viewport. Same
        // pattern as OtherListings/MessageTipContainer; see
        // docs/i18n-rollout-plan.md Phase 11 P2.
        if (isPrerender()) return;
        const handleResize = () => setWindowWidth(window.innerWidth);
        handleResize(); // real width, read only after mount
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowWidth !== null && windowWidth <= 1199

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: windowWidth !== null && windowWidth < 881 ? 1 : 4, // Adjust based on screen size
        slidesToScroll: 1,
        adaptiveHeight: true, // Ensure the height of the slider adapts to its content
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <>
            <div className="cont d-flex justify-content-center adContainer">
                <div className="header">{m.sections.weOfferEquipped}
                    <br />
                </div>
                {isMobile ?
                    <Slider {...sliderSettings} className="subCont">
                        {listings.map(({ name, mainImage }) => (
                            <div key={name} className="houseContainer" ><div
                                key={name}
                                style={{
                                    backgroundImage: `url(${mainImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                                className="listing d-flex align-items-end"
                                onClick={() => { navigate(pathForLegacyId(name)) }}

                            >
                                <div className="name">{name}</div>
                            </div></div>
                        ))}
                    </Slider> :
                    <div className={`${isMobile ? 'hstack' : 'vstack'} gap-5 subCont`}>
                        {listings.map(({ name, mainImage }) => {
                            return (
                                <div style={{ backgroundImage: `url(${mainImage})`, }} className="listing d-flex align-items-end" onClick={() => { navigate(pathForLegacyId(name)) }}>
                                    <div className="name">{name}</div>
                                </div>)
                        })} 
                    </div>
                }
            </div>
        </>)
}

export default ListingAd