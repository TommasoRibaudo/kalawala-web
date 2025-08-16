import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSnowflake, faUtensils, faWifi, faUser, faSwimmingPool, faParking } from '@fortawesome/free-solid-svg-icons';

import './OtherHomesCard.style.scss';

interface IOtherHomesCard {
    name: string;
    guestNumber: number;
    image: string;
}

const OtherHomesCardRib: FC<IOtherHomesCard> = ({ guestNumber, name, image }) => {
    return (
        <div className="other-homes-card">
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
