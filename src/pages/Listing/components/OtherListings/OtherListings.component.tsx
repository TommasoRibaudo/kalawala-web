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

    // Filter out the current listing
    const otherListings = listings.filter(listing => listing.name !== currentListing)

    useEffect(() => {
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));


    }, [])

    const isMobile = windowWidth <= 1199;
    const shouldUseCarousel = isMobile && otherListings.length > 2;

    return (
        <>
            <div className="cont d-flex justify-content-center">
                <div className="header">Check out our other options!</div>
                <div className={`${otherListings.length === 1 ? 'single-listing-container' : 
                    shouldUseCarousel ? 'mobile-carousel' : 
                    (isMobile ? 'mobile-vertical' : 'hstack gap-5')} subCont`}>
                    {otherListings.map(({ name, mainImage }) => (
                        <div key={name} style={{ backgroundImage: `url(${mainImage})`, }} className="listing d-flex align-items-end" onClick={() => { naviagate(`/${name.replace(/\s/g, "")}`) }}>
                            <div className="name">{name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>)
}

export default OtherListings