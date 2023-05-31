import { FC } from 'react';
import HomeCard from './Components/HomeCard.component';
import './OurHomes.style.scss'
import { TucanoImage, GecoImage, PappagalloImage, RanaImage } from '../../assets/images'

interface IOurHomes{
    style?: any;
}

const OurHomes = ({style}:IOurHomes) => {

    const homes = [
        {
            name: 'Tucano',
            gusestNumber: 5,
            parking: false,
            image: TucanoImage
        },
        {
            name: 'Geco',
            gusestNumber: 5,
            parking: true,
            image: GecoImage
        },
        {
            name: 'Pappagallo',
            gusestNumber: 5,
            parking: false,
            image: PappagalloImage
        },
        {
            name: 'Rana',
            gusestNumber: 5,
            parking: true,
            image: RanaImage
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
                    {homes.map(({ name, gusestNumber, parking, image }) => <HomeCard guestNumber={gusestNumber} parking={parking} name={name} image={image} />)}
                </div>
            </div>
        </section>
    )
}

export default OurHomes;