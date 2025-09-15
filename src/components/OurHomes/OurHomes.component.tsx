import React from 'react';
import HomeCard from './Components/HomeCard.component';
import './OurHomes.style.scss'
import { HouseDataType } from '../../utils/types';

interface IOurHomes{
    style?: any;
    houseDataList:HouseDataType[];
}

const OurHomes = ({style, houseDataList}:IOurHomes) => {

    // Homes data is passed as props
    return (
        <section id="house-list" className="bg-one about section" style={style}>
            <div className="container">
                <div className="row">
                    <div className="title text-center wow fadeIn" data-wow-duration="1500ms">
                        <h2>Our <span className="color">Homes</span> </h2>
                        <div className="border"></div>
                    </div>
                    {houseDataList.map(({ name, guestNumber, parking, image, houseLangCode }) => <HomeCard guestNumber={guestNumber} parking={parking} name={name} image={image} houseLangCode={houseLangCode}/>)}
                </div>
            </div>
        </section>
    )
}

export default OurHomes;