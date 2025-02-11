import { FC } from 'react';
import NamCard from './Components/NamCard.component';
import './OurHomes.style.scss'
import { HouseDataType } from '../../utils/types';
import React from 'react';

interface IOurHomes{
    style?: any;
    houseDataList:HouseDataType[];
}

const OurHomesNam = ({style, houseDataList}:IOurHomes) => {

    const homes = [
        {
            name: 'Areka',
            gusestNumber: 2,
            parking: false,
            image: "https://drive.google.com/thumbnail?id=1iHyOve78WkDNdTcQcUtKkiM8rXx2iRey&sz=w1000"
        },
        {
            name: 'Plumeria',
            gusestNumber: 2,
            parking: false,
            image: "https://drive.google.com/thumbnail?id=1b2x2aVIjqlSws4KePOS_NVb4NItGsra1&sz=w1000"
        },
        {
            name: 'Giulia',
            gusestNumber: 4,
            parking: false,
            image: "https://drive.google.com/thumbnail?id=1e0esqkSBKBdT-F2kLg5PsyF46zEWtWQ8&sz=w1000"
        },
        
    ]
    return (
        <section id="house-list" className="bg-one about section" style={style}>
            <div className="container">
                <div className="row">
                    <div className="title text-center wow fadeIn" data-wow-duration="1500ms">
                        <h2>Our <span className="color">Homes</span> </h2>
                        <div className="border"></div>
                    </div>
                    {houseDataList.map(({ name, guestNumber, parking, image, houseLangCode }) => <NamCard guestNumber={guestNumber} name={name} image={image} houseLangCode={houseLangCode}/>)}
                </div>
            </div>
        </section>
    )
}

export default OurHomesNam;