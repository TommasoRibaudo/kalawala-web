import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSnowflake, faUtensils, faWifi, faUser, faParking, faSwimmingPool } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { cdnImage, cdnSrcSet } from '../../../utils/imageCdn';

import './HomeCard.style.scss'

interface IHomeCard {
    name: string;
    guestNumber: number;
    image: string
    houseLangCode: string;
}


const VillaCard: FC<IHomeCard> = ({ guestNumber, name, image, houseLangCode }) => {

    // Spanish house codes contain "ES", so the card can label its own CTA
    // without threading a language prop from parents.
    const isSpanish = houseLangCode.includes('ES');
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        // A real href already handles ctrl/cmd-click, middle-click and "open in
        // new tab" correctly — only take over plain left-clicks so those keep
        // working, and use the SPA transition (no full reload) for everything else.
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }
        event.preventDefault();
        navigate(`/${houseLangCode}`);
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    };
    return (
        <a className="col-lg-3 col-md-6 col-sm-6 col-12 grid-card-link" data-wow-duration="500ms" href={`/${houseLangCode}`} onClick={handleClick}>
            <div className="block">
                <div className="icon-box d-block mx-auto">
                    {/* Card now shows a full-width photo (see HomeCard.style.scss
                        .icon-box), so `sizes` tracks the card width per breakpoint
                        instead of the old fixed 156px icon frame — re-measure with
                        scripts/image-audit.mjs if the grid layout changes. */}
                    <img
                        src={cdnImage(image, 640)}
                        alt={name}
                        className="img-fluid rounded our-homes-img-m"
                        width="300"
                        height="200"
                        loading="lazy"
                        decoding="async"
                        srcSet={cdnSrcSet(image)}
                        sizes="(max-width: 767px) 90vw, (max-width: 1199px) 45vw, 350px"
                    />
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
                        <FontAwesomeIcon icon={faSwimmingPool} />
                        <FontAwesomeIcon icon={faSnowflake} />
                        <FontAwesomeIcon icon={faUtensils} />
                        <FontAwesomeIcon icon={faWifi} />
                        <FontAwesomeIcon icon={faParking} />
                    </div>
                    <span className="card-cta">{isSpanish ? 'Ver casa →' : 'View home →'}</span>
                </div>
            </div>

        </a>
    )
}
export default VillaCard;