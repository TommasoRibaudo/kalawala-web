import React, { FC } from "react";
import { AmenityType } from "../../../../utils/types";
import AmenityIcon from "../../../../components/AmenityIcon/AmenityIcon.component";
import { getCapacityFacts } from "../../../../utils/propertyCapacity";
import { AMENITY_LABELS } from "../../../../i18n/amenityLabels";
import './Amenities.style.scss'
import type { Locale } from '../../../../i18n';

interface IAmenities {
    amenities: AmenityType[]
    // Optional: when given, the grid leads with the property's bedroom, bathroom
    // and occupancy counts before the amenities themselves.
    propertyKey?: string
    locale?: Locale
}

const Amenities: FC<IAmenities> = ({ amenities, propertyKey, locale = 'en' }) => {
    const capacityFacts = propertyKey ? getCapacityFacts(propertyKey, locale) : [];
    // `name` here is already correctly localized for en/es (houseDataByLangCode
    // resolves straight to the Spanish-suffixed entry) — only the six locales
    // that fall back to the English entry need this table.
    const translateName = (name: string) =>
        (locale !== 'en' && locale !== 'es' ? AMENITY_LABELS[name]?.[locale] : undefined) ?? name;

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
                                <AmenityIcon icon={icon} name={translateName(name)} />
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Amenities;
