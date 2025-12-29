import React from 'react';
import HomeCard from './Components/HomeCard.component';
import './OurHomes.style.scss'
import { HouseDataType } from '../../utils/types';
interface IOurHomes {
    style?: any;
    houseDataList: HouseDataType[];
}

const OurHomesES: React.FC<IOurHomes> = ({ style, houseDataList }) => {


    return (
        <section id="house-list" className="bg-one about section" style={style}>
            <div className="container">
                <div className="row">
                    <div className="title text-center wow fadeIn" data-wow-duration="1500ms">
                        <h2>Nuestras <span className="color">Casas</span> </h2>
                        <div className="border"></div>
                    </div>
                    <div className="homes-grid">
                        {houseDataList.filter(houseData => houseData.houseLangCode.includes('ES')).map(({ name, guestNumber, parking, image, houseLangCode }, index) => (
                            <HomeCard
                                key={`${name}-${index}`}
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

export default OurHomesES;