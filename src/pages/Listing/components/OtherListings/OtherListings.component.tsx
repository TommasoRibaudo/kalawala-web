import React, { FC, useEffect, useRef, useState } from "react";
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
    const gridRef = useRef<HTMLDivElement>(null)
    const otherListings = listings.filter(listing => listing.name !== currentListing)

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

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
            <h2 className="other-listings-header">Check out our other options!</h2>
            <div
                className={`other-listings-grid ${getLayoutClass()}`}
                ref={gridRef}
            >
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
                            <h3 className="listing-card-title">{name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OtherListings
