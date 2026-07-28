import React, { FC } from 'react'
import { cdnSrcSet } from '../../../utils/imageCdn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSnowflake, faUtensils, faWifi, faUser, faParking } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import './HomeCard.style.scss'

interface IHomeCard {
    name: string;
    guestNumber: number;
    parking: boolean;
    image: string
    houseLangCode:string;
}


const HomeCard: FC<IHomeCard> = ({ guestNumber, parking, name, image, houseLangCode }) => {

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
        <a className="home-card-item" data-wow-duration="500ms" href={`/${houseLangCode}`} onClick={handleClick}>
            <div className="block">
                <div className="icon-box d-block mx-auto">
                    <img src={image} alt={name} className="img-fluid rounded our-homes-img-m" width={1000} height={667} loading="lazy" decoding="async" srcSet={cdnSrcSet(image)} sizes="(max-width: 767px) 90vw, (max-width: 1199px) 45vw, 350px" />
                </div>
                <div className="content text-center">
                    <h3 className="highlight">{name}</h3>
                    <div style={{ display: "block" }}>
                        <div className="container-rounded-border border-highlight" style={{ marginRight: '6px' }}>
                            <FontAwesomeIcon icon={faUser} fontSize={"18px"} style={{ margin: '2px 4px 2px 2px', color: '#5A6570' }} />
                            <b className="highlight" style={{ fontSize: '18px', color: '#5A6570' }}>{`X${guestNumber}`}</b>
                        </div>
                        <FontAwesomeIcon icon={faSnowflake} fontSize={"20px"} style={{ marginRight: '6px', color: '#5A6570' }} />
                        <FontAwesomeIcon icon={faUtensils} fontSize={"20px"} style={{ marginRight: '6px', color: '#5A6570' }} />
                        <FontAwesomeIcon icon={faWifi} fontSize={"20px"} style={{ color: '#5A6570' }} />
                        <FontAwesomeIcon icon={faParking} fontSize={"20px"} style={{ marginLeft: '6px', color: '#5A6570' }} />
                    </div>
                </div>
            </div>

        </a>
    )
}
export default HomeCard;