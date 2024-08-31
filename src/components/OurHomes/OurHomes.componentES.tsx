import { FC } from 'react';
import HomeCard from './Components/HomeCard.component';
import './OurHomes.style.scss'
import { HouseDataType } from '../../utils/types';
interface IOurHomes{
    style?: any;
    houseDataList:HouseDataType[];
}

const OurHomesES = ({style, houseDataList}:IOurHomes) => {

    const homes = [
        {
            name: 'Tucano',
            gusestNumber: 5,
            parking: false,
            image: "https://drive.google.com/thumbnail?id=10qvLOMLs4_JsBIF99igVeh4baDR7EB-Q&sz=w1000"
        },
        {
            name: 'Geco',
            gusestNumber: 5,
            parking: true,
            image: "https://drive.google.com/thumbnail?id=1jT7zlcGcyVcxulbxFo-DQ7x9zc5FE9HF&sz=w1000"
        },
        {
            name: 'Pappagallo',
            gusestNumber: 5,
            parking: false,
            image: "https://drive.google.com/thumbnail?id=1owhxss4VVXLLJAQP1ByDyBMH_NwQsIuY&sz=w1000"
        },
        {
            name: 'Rana',
            gusestNumber: 5,
            parking: true,
            image: "https://drive.google.com/thumbnail?id=1UiGI8gFf6UR5kn8Eo30u457NX8NkP95X&sz=w1000"
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
                    {houseDataList.filter(houseData => houseData.houseLangCode.includes('ES')).map(({ name, guestNumber, parking, image, houseLangCode }) => <HomeCard guestNumber={guestNumber} parking={parking} name={name} image={image} houseLangCode={houseLangCode}/>)}

                </div>
            </div>
        </section>
    )
}

export default OurHomesES;