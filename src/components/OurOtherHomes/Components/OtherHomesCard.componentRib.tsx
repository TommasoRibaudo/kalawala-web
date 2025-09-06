import React, { FC } from 'react';
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

    const handleClick = () => {
        if (redirectPath) {
            navigate(redirectPath);
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
        }
    };

    return (
        <div className="other-homes-card" onClick={handleClick} style={{ cursor: redirectPath ? 'pointer' : 'default' }}>
            <div className="image-container">
                <img src={image} alt={name} className="home-image" />
            </div>
            <div className="content">
                <h3 className="home-name">{name}</h3>
                <div className="icons">
                    <div className="icon-group">
                        <FontAwesomeIcon icon={faUser} />
                        <span>X{guestNumber}</span>
                    </div>
                    <FontAwesomeIcon icon={faSwimmingPool} />
                    <FontAwesomeIcon icon={faSnowflake} />
                    <FontAwesomeIcon icon={faUtensils} />
                    <FontAwesomeIcon icon={faWifi} />
                    <FontAwesomeIcon icon={faParking} />
                </div>
            </div>
        </div>
    );
};

export default OtherHomesCardRib;
