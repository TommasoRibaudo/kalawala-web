import React, { FC } from 'react';
import { cdnSrcSet } from '../../../utils/imageCdn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faUtensils, faWifi, faUser, faSwimmingPool, faParking } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import './OtherHomesCard.style.scss';
import { detectLocaleFromPath, type Locale } from '../../../i18n';

interface IOtherHomesCard {
    name: string;
    guestNumber: number;
    // Only private *fenced* parking earns the icon — unfenced/outside parking
    // doesn't count, per product decision.
    hasFencedParking: boolean;
    image: string;
    redirectPath?: string;
}

const OtherHomesCardRib: FC<IOtherHomesCard> = ({ guestNumber, hasFencedParking, name, image, redirectPath }) => {
    // Spanish routes end in "ES" (e.g. /VillaMarES), so the card labels its own
    // CTA without a language prop.
    const cardLocale: Locale = detectLocaleFromPath(redirectPath ?? '');
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (!redirectPath) return;
        // A real href already handles ctrl/cmd-click, middle-click and "open in
        // new tab" correctly — only take over plain left-clicks so those keep
        // working, and use the SPA transition (no full reload) for everything else.
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }
        event.preventDefault();
        navigate(redirectPath);
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    };

    return (
        <a className="other-homes-card" href={redirectPath || undefined} onClick={handleClick}>
            <div className="image-container">
                <img src={image} alt={name} className="home-image" width={1000} height={667} loading="lazy" decoding="async" srcSet={cdnSrcSet(image)} sizes="(max-width: 575px) 46vw, 220px" />
            </div>
            <div className="content">
                <h3 className="home-name">{name}</h3>
                <div className="icons">
                    <div className="icon-group">
                        <FontAwesomeIcon icon={faUser} />
                        <span>{`X${guestNumber}`}</span>
                    </div>
                    <FontAwesomeIcon icon={faSwimmingPool} />
                    <FontAwesomeIcon icon={faSnowflake} />
                    <FontAwesomeIcon icon={faUtensils} />
                    <FontAwesomeIcon icon={faWifi} />
                    {hasFencedParking && <FontAwesomeIcon icon={faParking} />}
                </div>
                <span className="card-cta">{cardLocale === 'es' ? 'Ver casa →' : 'View home →'}</span>
            </div>
        </a>
    );
};

export default OtherHomesCardRib;
