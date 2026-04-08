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
    const navigate = useNavigate()
    const otherListings = listings.filter(listing => listing.name !== currentListing)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const isMobile = windowWidth <= 1199

    const getLayoutClass = () => {
        if (otherListings.length === 0) return 'no-listings'
        if (otherListings.length === 1) return 'single-listing'
        if (isMobile && otherListings.length <= 2) return 'mobile-grid'
        if (isMobile) return 'mobile-scroll'
        return 'desktop-grid'
    }

    const handleListingClick = (name: string) => {
        navigate(`/${name.replace(/\s/g, "")}`)
    }

    if (otherListings.length === 0) {
        return null
    }

    return (
        <div className="other-listings-container">
            <h3 className="other-listings-header">Check out our other options!</h3>
            <div className={`other-listings-grid ${getLayoutClass()}`}>
                {otherListings.map(({ name, mainImage }) => (
                    <div
                        key={name}
                        className="listing-card"
                        style={{ backgroundImage: `url(${mainImage})` }}
                        onClick={() => handleListingClick(name)}
                        onKeyDown={(e) => e.key === 'Enter' && handleListingClick(name)}
                        role="button"
                        tabIndex={0}
                        aria-label={`View listing: ${name}`}
                    >
                        <div className="listing-card-overlay">
                            <h4 className="listing-card-title">{name}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OtherListings
