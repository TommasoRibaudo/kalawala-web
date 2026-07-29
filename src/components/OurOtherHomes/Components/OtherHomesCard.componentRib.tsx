import React, { FC } from 'react';
import { cdnSrcSet } from '../../../utils/imageCdn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faUtensils, faWifi, faUser, faSwimmingPool, faParking } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import './OtherHomesCard.style.scss';

interface IOtherHomesCard {
    name: string;
    guestNumber: number;
    image: string;
    redirectPath?: string;
}

const OtherHomesCardRib: FC<IOtherHomesCard> = ({ guestNumber, name, image, redirectPath }) => {
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
                    <FontAwesomeIcon icon={faParking} />
                </div>
            </div>
        </a>
    );
};

export default OtherHomesCardRib;
