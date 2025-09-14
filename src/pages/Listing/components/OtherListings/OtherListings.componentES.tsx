import React, { FC, useEffect, useState } from "react";
import './OtherListings.style.scss'
import { ListingType } from "../../../../utils/types";
import { useNavigate } from "react-router-dom";

interface IOtherListing {
    currentListing: string
    listings: ListingType[]
}

const OtherListingsES: FC<IOtherListing> = ({ currentListing, listings }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const naviagate = useNavigate()

    // Filter out the current listing
    // Normalize names by removing 'ES' suffix for comparison
    const normalizeName = (name: string) => name.replace(/ES$/, '');
    const otherListings = listings.filter(listing => normalizeName(listing.name) !== normalizeName(currentListing))

    useEffect(() => {
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));


    }, [])

    return (
        <>

            <div className="cont d-flex justify-content-center">
                <div className="header">¡Revisa nuestras otras opciones!</div>
                <div className={`${otherListings.length === 1 ? 'single-listing-container' : (windowWidth <= 1199 ? 'hstack' : 'vstack')} gap-5 subCont`}>
                    {otherListings.map(({ name, mainImage }) => {
                        // For Spanish listings, ensure we route to the correct Spanish page
                        const routeName = name.includes('ES') ? name.replace(/\s/g, "") : `${name.replace(/\s/g, "")}ES`;
                        return (
                            <div key={name} style={{ backgroundImage: `url(${mainImage})`, }} className="listing d-flex align-items-end" onClick={() => { naviagate(`/${routeName}`) }}>
                                <div className="name">{name.replace('ES', '')}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>)
}

export default OtherListingsES