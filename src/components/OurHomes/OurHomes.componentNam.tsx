import HomeCard from './Components/HomeCard.component';
import './OurHomes.style.scss'
import { HouseDataType } from '../../utils/types';
import React from 'react';
import { useMessages } from '../../i18n';

interface IOurHomes{
    style?: any;
    NamDataList:HouseDataType[];
}

const OurHomesNam = ({style, NamDataList}:IOurHomes) => {
    const m = useMessages();

    
    return (
        <section id="house-list" className="bg-one about section" style={style}>
            <div className="container">
                <div className="row">
                    <div className="title text-center wow fadeIn" data-wow-duration="1500ms">
                        <h2>{m.sections.ourLead} <span className="color">{m.sections.homeHighlight}</span> </h2>
                        <div className="border"></div>
                    </div>
                    <div className="homes-grid">
                        {NamDataList.map(({ name, guestNumber, parking, image, houseLangCode }) => (
                            <HomeCard 
                                key={houseLangCode}
                                guestNumber={guestNumber} 
                                parking={parking} 
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

export default OurHomesNam;