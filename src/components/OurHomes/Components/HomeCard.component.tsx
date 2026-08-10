import React, { FC } from 'react'
import { cdnSrcSet } from '../../../utils/imageCdn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSnowflake, faUtensils, faWifi, faUser, faParking } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import './HomeCard.style.scss'
import type { Locale } from '../../../i18n';
import { pathForLegacyId } from '../../../routes.config';

interface IHomeCard {
    name: string;
    guestNumber: number;
    // Only private *fenced* parking earns the icon — unfenced/outside parking
    // doesn't count, per product decision.
    hasFencedParking: boolean;
    image: string
    houseLangCode:string;
}


const HomeCard: FC<IHomeCard> = ({ guestNumber, hasFencedParking, name, image, houseLangCode }) => {

    // Spanish house codes contain "ES" (see OurHomes.component filter), so the
    // card can label its own CTA without threading a language prop from parents.
    const cardLocale: Locale = houseLangCode.includes('ES') ? 'es' : 'en';
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        // A real href already handles ctrl/cmd-click, middle-click and "open in
        // new tab" correctly — only take over plain left-clicks so those keep
        // working, and use the SPA transition (no full reload) for everything else.
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }
        event.preventDefault();
        navigate(pathForLegacyId(houseLangCode));
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    };
    return (
        <a className="home-card-item" data-wow-duration="500ms" href={pathForLegacyId(houseLangCode)} onClick={handleClick}>
            <div className="block">
                <div className="icon-box d-block mx-auto">
                    <img src={image} alt={name} className="img-fluid rounded our-homes-img-m" width={1000} height={667} loading="lazy" decoding="async" srcSet={cdnSrcSet(image)} sizes="(max-width: 767px) 90vw, (max-width: 1199px) 45vw, 350px" />
                </div>
                <div className="content text-center">
                    <h3 className="highlight">{name}</h3>
                    {/* Same .icons / .icon-group markup as OtherHomesCard so the
                        "Our Homes" and "Explore other stays" amenity rows render
                        identically (brand-green, flat, no bordered guest pill). */}
                    <div className="icons">
                        <div className="icon-group">
                            <FontAwesomeIcon icon={faUser} />
                            <span>{`X${guestNumber}`}</span>
                        </div>
                        <FontAwesomeIcon icon={faSnowflake} />
                        <FontAwesomeIcon icon={faUtensils} />
                        <FontAwesomeIcon icon={faWifi} />
                        {hasFencedParking && <FontAwesomeIcon icon={faParking} />}
                    </div>
                    <span className="card-cta">{cardLocale === 'es' ? 'Ver casa →' : 'View home →'}</span>
                </div>
            </div>

        </a>
    )
}
export default HomeCard;