import React, { FC } from "react";
import { AmenityType } from "../../../../utils/types";
import AmenityIcon from "../../../../components/AmenityIcon/AmenityIcon.component";
import { getCapacityFacts } from "../../../../utils/propertyCapacity";
import './Amenities.style.scss'

interface IAmenities {
    amenities: AmenityType[]
    // Optional: when given, the grid leads with the property's bedroom, bathroom
    // and occupancy counts before the amenities themselves.
    propertyKey?: string
    isSpanish?: boolean
}

const Amenities: FC<IAmenities> = ({ amenities, propertyKey, isSpanish = false }) => {
    const capacityFacts = propertyKey ? getCapacityFacts(propertyKey, isSpanish) : [];

    return (
        <div className="amenitiesCont d-flex justify-content-center">
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4" style={{margin:"-0.1px"}}>
                {
                    capacityFacts.map(({ key, icon, label }) => {
                        return (
                            <div className="col amenitiesCont__capacity" key={`capacity-${key}`}>
                                <AmenityIcon icon={icon} name={label} />
                            </div>
                        );
                    })
                }
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
