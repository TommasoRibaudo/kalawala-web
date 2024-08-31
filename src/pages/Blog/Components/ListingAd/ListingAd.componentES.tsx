import React, { FC, useEffect, useState } from "react";
import './ListingAd.style.scss'
import { ListingType } from "../../../../utils/types";
import { useNavigate } from "react-router-dom";

interface IOtherListing {
    listings: ListingType[]
}

const ListingAdES: FC<IOtherListing> = ({ listings }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const naviagate = useNavigate()

    useEffect(() => {
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, [])

    return (
        <>

            <div className="cont d-flex justify-content-center adContainer">
                <div className="header">¿Buscas hospedaje en Puerto Viejo? Ofrecemos casas completamente equipadas en el centro del Pueblo.
                    <br />
                </div>
                <div className={`${windowWidth <= 1199 ? 'hstack' : 'vstack'} gap-5 subCont`}>
                    {listings.map(({ name, mainImage }) => {
                        return (
                            <div style={{ backgroundImage: `url(${mainImage})`, }} className="listing d-flex align-items-end" onClick={() => { naviagate(`/${name}ES`) }}>
                                <div className="name">{name}</div>
                            </div>)
                    })}
                </div>
            </div>
        </>)
}

export default ListingAdES