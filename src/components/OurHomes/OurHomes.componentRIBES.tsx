import { FC } from 'react';
import HomeCard from './Components/HomeCard.component';
import './OurHomes.style.scss'
import { HouseDataType } from '../../utils/types';
import React from 'react';
import VillaCard from './Components/VillaCard.component';

interface IOurHomes{
    style?: any;
    houseDataList:HouseDataType[];
}

const OurHomesRIB = ({style, houseDataList}:IOurHomes) => {

    const homes = [
        {
            name: 'Villa Mar',
            gusestNumber: 2,
            parking: false,
            image: "https://drive.google.com/thumbnail?id=1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn&sz=w1000"
        },
        {
            name: 'Villa Coral',
            gusestNumber: 2,
            parking: false,
            image: "https://drive.google.com/thumbnail?id=1frKDGGLk1nJQQaxoxng6TgmUVzxTx08A&sz=w1000"
        },
    ]
    return (
        <section id="house-list" className="bg-one about section" style={style}>
            <div className="container">
                <div className="row">
                    <div className="title text-center wow fadeIn" data-wow-duration="1500ms">
                        <h2>Our <span className="color">Villas</span> </h2>
                        <div className="border"></div>
                    </div>
                    {houseDataList.filter(houseData => houseData.houseLangCode.includes('ES')).map(({ name, guestNumber, parking, image, houseLangCode }) => <VillaCard guestNumber={guestNumber} name={name} image={image} houseLangCode={houseLangCode}/>)}
                </div>
            </div>
        </section>
    )
}

export default OurHomesRIB;