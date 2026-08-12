import React, { FC, useMemo } from "react";
import './OtherListings.style.scss'
import { ListingType } from "../../../../utils/types";
import { useLocale, useMessages } from "../../../../i18n";
import { houseDataByLangCode } from "../../../../utils/constants";
import HomeCard from "../../../../components/OurHomes/Components/HomeCard.component";

interface IOtherListings {
    currentListing: string
    listings: ListingType[]
}

/** The property name without its locale suffix: "PlumeriaES" -> "Plumeria". */
const baseName = (name: string) => name.replace(/ES$/, '')

/** Snippet display name -> houseLangCode / route slug: "Villa Mar" -> "VillaMar". */
const langCodeForName = (name: string) => baseName(name).replace(/\s/g, "")

/**
 * The "other homes" block on a listing page now renders the same HomeCard the
 * home page uses (issue #310) instead of the old bespoke background-image tiles,
 * so the two sections read as one system.
 *
 * The blocker was data: HomeCard needs guestNumber / parking / houseLangCode,
 * but a ListingType snippet only carries { name, mainImage }. We resolve the
 * full house record from the snippet name via houseDataByLangCode — the same
 * lookup OurOtherHomes uses. Entries with no matching record are dropped rather
 * than rendered half-populated (the old code likewise no-op'd navigation when
 * routeKeyForSlug found nothing).
 *
 * This version renders deterministically, so — unlike the previous windowWidth-
 * driven layout — it needs no isPrerender guard to avoid a hydration mismatch.
 */
const OtherListings: FC<IOtherListings> = ({ currentListing, listings }) => {
    const locale = useLocale()
    const m = useMessages()

    const cards = useMemo(
        () => listings
            .filter(listing => baseName(listing.name) !== baseName(currentListing))
            .map(({ name, mainImage }) => {
                const houseLangCode = langCodeForName(name)
                const houseData = houseDataByLangCode(houseLangCode)
                return houseData ? { name: baseName(name), mainImage, houseLangCode, houseData } : null
            })
            .filter((card): card is NonNullable<typeof card> => card !== null),
        [listings, currentListing]
    )

    if (cards.length === 0) {
        return null
    }

    return (
        // `about` activates the shared card-surface styling (`.about .block …` in
        // HomeCard.style.scss), exactly as OurHomes' <section className="… about">
        // does on the home page — that's what makes these cards match.
        <div className="other-listings-container about">
            <h2 className="other-listings-header">{m.sections.otherListingsHeading}</h2>
            <div className="homes-grid">
                {cards.map(({ name, mainImage, houseLangCode, houseData }) => (
                    <HomeCard
                        key={houseLangCode}
                        name={name}
                        guestNumber={houseData.guestNumber}
                        hasFencedParking={houseData.parking}
                        image={mainImage}
                        houseLangCode={houseLangCode}
                        locale={locale}
                    />
                ))}
            </div>
        </div>
    )
}

export default OtherListings
