import React, { FC } from 'react'
import { cdnSrcSet } from '../../../utils/imageCdn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSnowflake, faUtensils, faWifi, faUser, faParking, faSwimmingPool } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

import './HomeCard.style.scss'

interface IHomeCard {
    name: string;
    guestNumber: number;
    image: string
    houseLangCode:string;
}


const NamCard: FC<IHomeCard> = ({ guestNumber, name, image, houseLangCode }) => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/${houseLangCode}`);
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    };
    return (
        <div className="col-lg-3 col-md-6 col-sm-6 col-12" data-wow-duration="500ms" onClick={handleClick}>
            <div className="block">
                <div className="icon-box d-block mx-auto">
                    <img src={image} alt={name} className="img-fluid rounded our-homes-img-m" width={1000} height={667} loading="lazy" decoding="async" srcSet={cdnSrcSet(image)} sizes="(max-width: 768px) 100vw, 400px" />
                </div>
                <div className="content text-center">
                    <h3 className="highlight">{name}</h3>
                    <div style={{ display: "block" }}>
                        <div className="container-rounded-border border-highlight" style={{ marginRight: '6px' }}>
                            <FontAwesomeIcon icon={faUser} fontSize={"18x"} style={{ margin: '2px 4px 2px 2px', color: '#5A6570' }} />
                            <b className="highlight" style={{ fontSize: '18px', color: '#5A6570' }}>{`X${guestNumber}`}</b>
                        </div>
                        <FontAwesomeIcon icon={faSnowflake} fontSize={"20px"} style={{ marginRight: '6px', color: '#5A6570' }} />
                        <FontAwesomeIcon icon={faUtensils} fontSize={"20px"} style={{ marginRight: '6px', color: '#5A6570' }} />
                        <FontAwesomeIcon icon={faWifi} fontSize={"20px"} style={{ color: '#5A6570' }} />
                    </div>
                </div>
            </div>

        </div>
    )
}
export default NamCard;