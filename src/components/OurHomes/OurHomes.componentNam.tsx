import { FC } from 'react';
<<<<<<< Updated upstream
import NamCard from './Components/NamCard.component';
=======
import HomeCard from './Components/HomeCard.component';
>>>>>>> Stashed changes
import './OurHomes.style.scss'
import { HouseDataType } from '../../utils/types';
import React from 'react';

interface IOurHomes{
    style?: any;
<<<<<<< Updated upstream
    houseDataList:HouseDataType[];
}

const OurHomesNam = ({style, houseDataList}:IOurHomes) => {
=======
    NamDataList:HouseDataType[];
}

const OurHomesNam = ({style, NamDataList}:IOurHomes) => {
>>>>>>> Stashed changes

    const homes = [
        {
            name: 'Areka',
            gusestNumber: 2,
            parking: false,
<<<<<<< Updated upstream
            image: "https://drive.google.com/thumbnail?id=1iHyOve78WkDNdTcQcUtKkiM8rXx2iRey&sz=w1000"
=======
            image: "https://drive.google.com/thumbnail?id=10qvLOMLs4_JsBIF99igVeh4baDR7EB-Q&sz=w1000"
>>>>>>> Stashed changes
        },
        {
            name: 'Plumeria',
            gusestNumber: 2,
<<<<<<< Updated upstream
            parking: false,
            image: "https://drive.google.com/thumbnail?id=1b2x2aVIjqlSws4KePOS_NVb4NItGsra1&sz=w1000"
=======
            parking: true,
            image: "https://drive.google.com/thumbnail?id=1jT7zlcGcyVcxulbxFo-DQ7x9zc5FE9HF&sz=w1000"
>>>>>>> Stashed changes
        },
        {
            name: 'Giulia',
            gusestNumber: 4,
            parking: false,
<<<<<<< Updated upstream
            image: "https://drive.google.com/thumbnail?id=1e0esqkSBKBdT-F2kLg5PsyF46zEWtWQ8&sz=w1000"
        },
        
=======
            image: "https://drive.google.com/thumbnail?id=1owhxss4VVXLLJAQP1ByDyBMH_NwQsIuY&sz=w1000"
        },

>>>>>>> Stashed changes
    ]
    return (
        <section id="house-list" className="bg-one about section" style={style}>
            <div className="container">
                <div className="row">
                    <div className="title text-center wow fadeIn" data-wow-duration="1500ms">
<<<<<<< Updated upstream
                        <h2>Our <span className="color">Homes</span> </h2>
                        <div className="border"></div>
                    </div>
                    {houseDataList.map(({ name, guestNumber, parking, image, houseLangCode }) => <NamCard guestNumber={guestNumber} name={name} image={image} houseLangCode={houseLangCode}/>)}
                </div>
            </div>
        </section>
=======
                        <h2>Our <span className="color">Home</span> </h2>
                        <div className="border"></div>
                    </div>
                    {NamDataList.map(({ name, guestNumber, parking, image, houseLangCode }) => <HomeCard guestNumber={guestNumber} parking={parking} name={name} image={image} houseLangCode={houseLangCode}/>)}
                </div>
            </div>
        </section>
        
>>>>>>> Stashed changes
    )
}

export default OurHomesNam;