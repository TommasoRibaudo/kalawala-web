import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSnowflake, faUtensils, faWifi, faUser, faParking } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

import './HomeCard.style.scss'

interface IHomeCard {
    name: string;
    guestNumber: number;
    parking: boolean;
    image: string
}


const HomeCard: FC<IHomeCard> = ({ guestNumber, parking, name, image }) => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/listing/${name}`);
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    };
    return (
        <div className=" col-lg-3 col-md-6 col-sm-12 " data-wow-duration="500ms" onClick={handleClick}>
            <div className="block ">
                <div className="icon-box center-block">
                    <img src={image} alt={name} className="img-responsive img-rounded  our-homes-img-m" />
                </div>
                <div className="content text-center">
                    <h3 className="highlight">{name}</h3>
                    <div style={{ display: "block" }}>
                        <div className="container-rounded-border border-highlight" style={{ marginRight: '6px' }}>
                            <FontAwesomeIcon icon={faUser} fontSize={"18x"} style={{ margin: '2px 4px 2px 2px' }} />
                            <b className="highlight" style={{ fontSize: '18px' }}>X{guestNumber}</b>
                        </div>
                        <FontAwesomeIcon icon={faSnowflake} fontSize={"20px"} style={{ marginRight: '6px' }} className='test' />
                        <FontAwesomeIcon icon={faUtensils} fontSize={"20px"} style={{ marginRight: '6px' }} />
                        <FontAwesomeIcon icon={faWifi} fontSize={"20px"} />
                        {parking && <FontAwesomeIcon icon={faParking} fontSize={"20px"} style={{ marginLeft: '6px' }} />}
                    </div>
                </div>
            </div>

        </div>
    )
}
export default HomeCard;