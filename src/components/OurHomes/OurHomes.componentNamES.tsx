import { FC } from 'react';
import HomeCard from './Components/HomeCard.component';
import './OurHomes.style.scss'
import { HouseDataType } from '../../utils/types';
import React from 'react';

interface IOurHomes{
    style?: any;
    houseDataList:HouseDataType[];
}

const OurHomes = ({style, houseDataList}:IOurHomes) => {

    const homes = [
        {
            name: 'Areka',
            gusestNumber: 2,
            parking: true,
            image: "https://drive.google.com/thumbnail?id=10qvLOMLs4_JsBIF99igVeh4baDR7EB-Q&sz=w1000"
        },
        {
            name: 'Plumeria',
            gusestNumber: 2,
            parking: true,
            image: "https://drive.google.com/thumbnail?id=1jT7zlcGcyVcxulbxFo-DQ7x9zc5FE9HF&sz=w1000"
        },
        {
            name: 'Giulia',
            gusestNumber: 4,
            parking: true,
            image: "https://drive.google.com/thumbnail?id=1owhxss4VVXLLJAQP1ByDyBMH_NwQsIuY&sz=w1000"
        },
    ]
    return (
        <section id="house-list" className="bg-one about section" style={style}>
            <div className="container">
                <div className="row">
                    <div className="title text-center wow fadeIn" data-wow-duration="1500ms">
                        <h2>Nuestras <span className="color">Casas</span> </h2>
                        <div className="border"></div>
                    </div>
                    {houseDataList.map(({ name, guestNumber, parking, image, houseLangCode }) => <HomeCard guestNumber={guestNumber} parking={parking} name={name} image={image} houseLangCode={houseLangCode}/>)}
                </div>
            </div>
        </section>
    )
}

export default OurHomes;