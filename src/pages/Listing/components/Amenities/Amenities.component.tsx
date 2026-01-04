import React, { FC } from "react";
import { AmenityType } from "../../../../utils/types";
import AmenityIcon from "../../../../components/AmenityIcon/AmenityIcon.component";
import './Amenities.style.scss'

interface IAmenities {
    amenities: AmenityType[]
}

const Amenities: FC<IAmenities> = ({ amenities }) => {
    return (
        <div className="amenitiesCont d-flex justify-content-center">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4" style={{margin:"-0.1px"}}>
                {
                    amenities.map(({ icon, name }) => {
                        return (
                            <div className="col" key={name}>
                                <AmenityIcon icon={icon} name={name} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Amenities;