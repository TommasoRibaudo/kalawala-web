import React, { FC, useEffect, useState } from "react";
import './ListingAd.style.scss'
import { ListingType } from "../../../../utils/types";
import { useNavigate } from "react-router-dom";
import { SampleNextArrow, SamplePrevArrow } from "../../../../components/CustomSlick/SlickDarkArrow.Component";
import Slider from "react-slick";

interface IOtherListing {
    listings: ListingType[]
}

const ListingAdES: FC<IOtherListing> = ({ listings }) => {


    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow:  windowWidth<881?1 : 4, // Adjust based on screen size
        slidesToScroll: 1,
        adaptiveHeight: true, // Ensure the height of the slider adapts to its content
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <>
            <div className="cont d-flex justify-content-center adContainer">
                <div className="header">¿Buscas hospedaje en Puerto Viejo? Ofrecemos casas completamente equipadas en Puerto Viejo y Playa Chiquita:
                    <br />
                </div>
                {windowWidth <= 1199 ?
                    <Slider {...sliderSettings} className="subCont">
                        {listings.map(({ name, mainImage }) => {
                            const displayName = name.replace('ES', '');
                            return (
                                <div key={name} className="houseContainer" ><div
                                    key={name}
                                    style={{
                                        backgroundImage: `url(${mainImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    className="listing d-flex align-items-end"
                                    onClick={() => { navigate(`/${name}`) }}

                                >
                                    <div className="name">{displayName}</div>
                                </div></div>
                            );
                        })}
                    </Slider> :
                    <div className={`${windowWidth <= 1199 ? 'hstack' : 'vstack'} gap-5 subCont`}>
                        {listings.map(({ name, mainImage }) => {
                            const displayName = name.replace('ES', '');
                            return (
                                <div key={name} style={{ backgroundImage: `url(${mainImage})`, }} className="listing d-flex align-items-end" onClick={() => { navigate(`/${name}`) }}>
                                    <div className="name">{displayName}</div>
                                </div>)
                        })} 
                    </div>
                }
            </div>
        </>)
}

export default ListingAdES