import React, {FC} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBath, faKitchenSet, faSnowflake, faSquareParking, faWifi, faPaw, faSwimmingPool, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import './AmenityIcon.style.scss'
import { AmenityType } from "../../utils/types";

const AmenityIcon: FC<AmenityType> = ({icon, name}) => {

    type IconListType = {
        [key: string]: IconDefinition
    }
    const iconList: IconListType = {
        bath: faBath,
        kitchen: faKitchenSet,
        ac: faSnowflake,
        parking: faSquareParking,
        wifi: faWifi,
        pet: faPaw,
        pool: faSwimmingPool
    }

    return(
        <div className="iconContainer" style={{margin:"-0.1px"}}>
            <FontAwesomeIcon icon={iconList[icon]} color='#57cbcc' fontSize={"30px"}/>
            <div>{name}</div>
        </div>)
}

export default AmenityIcon