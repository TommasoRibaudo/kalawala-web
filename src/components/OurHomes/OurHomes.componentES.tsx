import { FC } from 'react';
import HomeCard from './Components/HomeCard.component';
import './OurHomes.style.scss'
import { HouseDataType } from '../../utils/types';
import React from 'react';
interface IOurHomes{
    style?: any;
    houseDataList:HouseDataType[];
}

const OurHomesES = ({style, houseDataList}:IOurHomes) => {

    
    return (
        <section id="house-list" className="bg-one about section" style={style}>
            <div className="container">
                <div className="row">
                    <div className="title text-center wow fadeIn" data-wow-duration="1500ms">
                        <h2>Nuestras <span className="color">Casas</span> </h2>
                        <div className="border"></div>
                    </div>
                    {houseDataList.filter(houseData => houseData.houseLangCode.includes('ES')).map(({ name, guestNumber, parking, image, houseLangCode }) => <HomeCard guestNumber={guestNumber} parking={parking} name={name} image={image} houseLangCode={houseLangCode}/>)}

                </div>
            </div>
        </section>
    )
}

export default OurHomesES;