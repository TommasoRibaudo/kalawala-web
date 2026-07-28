import React, { FC, useEffect, useRef, useState, useCallback, useMemo } from "react";
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
    const gridRef = useRef<HTMLDivElement>(null)

    const handleResize = useCallback(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [handleResize])

    // Only horizontally-scrollable in the 'mobile-scroll' layout. Chromium
    // redirects a vertical wheel gesture into horizontal scroll on any
    // element that can only scroll on the X axis, so without this a visitor
    // scrolling down the page gets stuck the moment the cursor crosses this
    // row. React attaches wheel listeners as passive by default, so
    // preventDefault() from an onWheel prop is silently ignored — this has
    // to be a real DOM listener registered with { passive: false }.
    useEffect(() => {
        const grid = gridRef.current
        if (!grid) return
        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault()
                window.scrollBy(0, e.deltaY)
            }
        }
        grid.addEventListener('wheel', onWheel, { passive: false })
        return () => grid.removeEventListener('wheel', onWheel)
    }, [])

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
            <h2 className="other-listings-header">¡Revisa nuestras otras opciones!</h2>
            <div
                className={`other-listings-grid ${getLayoutClass}`}
                ref={gridRef}
            >
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
                            <h3 className="listing-card-title">{name.replace('ES', '')}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OtherListingsES