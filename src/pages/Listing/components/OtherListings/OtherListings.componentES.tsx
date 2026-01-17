import React, { FC, useEffect, useState, useCallback, useMemo } from "react";
import './OtherListings.style.scss'
import { ListingType } from "../../../../utils/types";
import { useNavigate } from "react-router-dom";

interface IOtherListings {
    currentListing: string
    listings: ListingType[]
}

const OtherListingsES: FC<IOtherListings> = ({ currentListing, listings }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const navigate = useNavigate()

    const handleResize = useCallback(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [handleResize])

    const normalizeName = useCallback((name: string) => name.replace(/ES$/, ''), [])

    const otherListings = useMemo(() => 
        listings.filter(listing => 
            normalizeName(listing.name) !== normalizeName(currentListing)
        ), 
        [listings, currentListing, normalizeName]
    )

    const handleListingClick = useCallback((name: string) => {
        const routeName = name.includes('ES') 
            ? name.replace(/\s/g, "") 
            : `${name.replace(/\s/g, "")}ES`
        navigate(`/${routeName}`)
    }, [navigate])

    const getLayoutClass = useMemo(() => {
        const isMobile = windowWidth <= 1199
        const listingCount = otherListings.length

        if (listingCount === 0) return 'no-listings'
        if (listingCount === 1) return 'single-listing'
        if (isMobile && listingCount <= 2) return 'mobile-grid'
        if (isMobile) return 'mobile-scroll'
        return 'desktop-grid'
    }, [windowWidth, otherListings.length])

    if (otherListings.length === 0) {
        return null
    }

    return (
        <div className="other-listings-container">
            <h3 className="other-listings-header">¡Revisa nuestras otras opciones!</h3>
            <div className={`other-listings-grid ${getLayoutClass}`}>
                {otherListings.map(({ name, mainImage }) => (
                    <div 
                        key={name} 
                        className="listing-card"
                        style={{ backgroundImage: `url(${mainImage})` }}
                        onClick={() => handleListingClick(name)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleListingClick(name)}
                        aria-label={`View listing: ${name.replace('ES', '')}`}
                    >
                        <div className="listing-card-overlay">
                            <h4 className="listing-card-title">{name.replace('ES', '')}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OtherListingsES