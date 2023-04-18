import React, {FC} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBath, faKitchenSet, faSnowflake, faSquareParking, faWifi, faPaw } from '@fortawesome/free-solid-svg-icons';
import './AmenityIcon.style.scss'

interface IAmenityIcon{
    icon?: string;
    text?: string;
}

const AmenityIcon: FC<IAmenityIcon> = ({icon, text}) => {
    const iconList = {
        bath: faBath,
        kitchen: faKitchenSet,
        ac: faSnowflake,
        parking: faSquareParking,
        wifi: faWifi,
        pet: faPaw
    }
    return(
        <div className="iconContainer">
            <FontAwesomeIcon icon={iconList['pet']} color='#57cbcc' fontSize={"30px"}/>
            <div>{text || 'tes asdsadsat'}</div>
        </div>)
}

export default AmenityIcon