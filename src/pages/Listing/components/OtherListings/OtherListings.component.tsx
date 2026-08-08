import React, { FC, useEffect, useRef, useState, useCallback, useMemo } from "react";
import './OtherListings.style.scss'
import { ListingType } from "../../../../utils/types";
import { useNavigate } from "react-router-dom";
import { useLocale, useMessages } from "../../../../i18n";
import { pathForKey, routeKeyForSlug } from "../../../../routes.config";

interface IOtherListings {
    currentListing: string
    listings: ListingType[]
}

/**
 * PHASE 3a merged the Spanish copy into this one. Three of the divergences were
 * not translation, and each is resolved deliberately:
 *
 * 1. **Memoisation.** Spanish wrapped the resize handler and the filtering in
 *    useCallback/useMemo; English used plain functions. Merged onto the memoised
 *    version. This changes re-render cost on English pages, not their output —
 *    so it is invisible to a prerender diff and is called out here instead.
 *
 * 2. **Name normalisation.** `currentListing` is the page's houseLangCode, so it
 *    carries the locale suffix ("GecoES") while `homesSnippet` names do not
 *    ("Geco"). English compared them raw, which was only ever correct because
 *    English has no suffix — the same code on a Spanish page would have listed
 *    the current property among the "other" ones. `baseName` strips the suffix
 *    from both sides, which is right in every locale.
 *
 * 3. **Route building.** English navigated to `/Geco`, Spanish appended or
 *    preserved "ES" with a substring test. Both are now the same expression:
 *    base name looked up in routes.config.ts + the current locale (PHASE 4).
 *
 * The Spanish copy also used `name.replace('ES', '')`, which is unanchored and
 * would eat "ES" from the middle of a name. `baseName` anchors to the end. No
 * current property name trips the difference, but "Esmeralda" would have.
 *
 * `NamSnippetES` in constants.ts now produces the same result as `NamSnippet`
 * and is redundant. It is left alone here — deleting it belongs with PHASE 3b,
 * when the Spanish listing pages that reference it are merged away.
 */

/** The property name without its locale suffix: "PlumeriaES" -> "Plumeria". */
const baseName = (name: string) => name.replace(/ES$/, '')

const OtherListings: FC<IOtherListings> = ({ currentListing, listings }) => {
    // Seeded null, not window.innerWidth — react-snap's puppeteer viewport at
    // prerender time and a real visitor's viewport at hydration time are
    // different numbers, and isMobile below drives the layout class, so
    // reading the width during render produces a hydration mismatch. Null means
    // "not measured yet"; the effect below fills it in after mount.
    const [windowWidth, setWindowWidth] = useState<number | null>(null)
    const navigate = useNavigate()
    const gridRef = useRef<HTMLDivElement>(null)
    const locale = useLocale()
    const m = useMessages()

    const handleResize = useCallback(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    useEffect(() => {
        handleResize() // real width, read only after mount
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [handleResize])

    // Only horizontally-scrollable in the 'mobile-scroll' layout. Chromium
    // redirects a vertical wheel gesture into horizontal scroll on any
    // horizontally-overflowing element, which made the page feel stuck.
    useEffect(() => {
        const grid = gridRef.current
        if (!grid) return

        const onWheel = (e: WheelEvent) => {
            if (!grid.classList.contains('mobile-scroll')) return
            if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
            if (grid.scrollWidth <= grid.clientWidth) return
            e.preventDefault()
            grid.scrollLeft += e.deltaY
        }

        grid.addEventListener('wheel', onWheel, { passive: false })
        return () => grid.removeEventListener('wheel', onWheel)
    }, [])

    const otherListings = useMemo(
        () => listings.filter(listing => baseName(listing.name) !== baseName(currentListing)),
        [listings, currentListing]
    )

    const handleListingClick = useCallback((name: string) => {
        const routeName = baseName(name).replace(/\s/g, "")
        const key = routeKeyForSlug(routeName)
        if (!key) return
        navigate(pathForKey(key, locale))
    }, [navigate, locale])

    const layoutClass = useMemo(() => {
        const isMobile = windowWidth !== null && windowWidth <= 1199
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
            <h2 className="other-listings-header">{m.sections.otherListingsHeading}</h2>
            <div
                className={`other-listings-grid ${layoutClass}`}
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
                        aria-label={m.property.viewListing(baseName(name))}
                    >
                        <div className="listing-card-overlay">
                            <h3 className="listing-card-title">{baseName(name)}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OtherListings
