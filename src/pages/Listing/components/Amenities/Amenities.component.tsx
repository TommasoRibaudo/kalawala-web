import React, { FC } from "react";
import { AmenityType } from "../../../../utils/types";
import AmenityIcon from "../../../../components/AmenityIcon/AmenityIcon.component";
import './Amenities.style.scss'

interface IAmenities {
    amenities: AmenityType[]
}

const Amenities: FC<IAmenities> = ({ amenities }) => {
    return (
        <div className="hstack amenitiesCont d-flex justify-content-center">
            {
                amenities.map(({ icon, name }) => {
                    return <AmenityIcon icon={icon} name={name} />
                })
            }
        </div>


    )
}

export default Amenities;