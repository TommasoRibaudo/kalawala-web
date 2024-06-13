import React, { FC, useEffect, useState } from "react";
import './OtherListings.style.scss'
import { ListingType } from "../../../../utils/types";
import { useNavigate } from "react-router-dom";

interface IOtherListing {
    currentListing: string
    listings: ListingType[]
}

const OtherListings: FC<IOtherListing> = ({ currentListing, listings }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const naviagate = useNavigate()

    useEffect(() => {
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));


    }, [])

    return (
        <>

            <div className="cont d-flex justify-content-center">
                <div className="header">Check out our other options!</div>
                <div className={`${windowWidth <= 1199 ? 'hstack' : 'vstack'} gap-5 subCont`}>
                    {listings.map(({ name, mainImage }) => {
                        return name !== currentListing ? ( //TODO do bootsrtap thing tomake change row/column
                            <div style={{ backgroundImage: `url(${mainImage})`, }} className="listing d-flex align-items-end" onClick={() => { naviagate(`/${name}`) }}>
                                <div className="name">{name}</div>
                            </div>
                        ) : null
                    })}
                </div>
            </div>
        </>)
}

export default OtherListings