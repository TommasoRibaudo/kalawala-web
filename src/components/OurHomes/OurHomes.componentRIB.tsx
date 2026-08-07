import './OurHomes.style.scss'
import { HouseDataType } from '../../utils/types';
import React from 'react';
import VillaCard from './Components/VillaCard.component';
import { useMessages } from '../../i18n';

interface IOurHomes{
    style?: any;
    houseDataList:HouseDataType[];
}

const OurHomesRIB = ({style, houseDataList}:IOurHomes) => {
    const m = useMessages();

    
    return (
        <section id="house-list" className="bg-one about section" style={style}>
            <div className="container">
                <div className="row">
                    <div className="title text-center wow fadeIn" data-wow-duration="1500ms">
                        <h2>{m.sections.ourLead} <span className="color">{m.sections.villasHighlight}</span> </h2>
                        <div className="border"></div>
                    </div>
                    <div className="homes-grid">
                        {houseDataList.map(({ name, guestNumber, parking, image, houseLangCode }) => (
                            <VillaCard 
                                key={houseLangCode}
                                guestNumber={guestNumber} 
                                name={name} 
                                image={image} 
                                houseLangCode={houseLangCode}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurHomesRIB;