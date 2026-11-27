import type { LocalizedValue } from '../i18n';

export type ListingType = {
    name: string
    mainImage: string
}

export type AmenityType = {
    icon: string
    name: string
}
export type HouseDataType = {
    name: string;
    guestNumber: number;
    location: string;
    description: string;
    neighborhood: string;
    houseCode: number;
    image: string;
    houseLangCode:string;
    parking: boolean;
    amenities: {
        name: string;
        icon: string;
    }[];
}

export type BlogType = {
    id: string;
    title: string;
    text: string;
    pictures: string[]
    thumbnail: string
}

export interface PropertyCapacity {
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
}

export interface PropertyMarketingContent {
    propertyKey: string;           // e.g., 'Rana', 'RanaES'
    descriptiveTitle: LocalizedValue<string>;
    // Static fallback "from" price, shown only until the live calendar rate
    // loads. Optional: a property whose rates live entirely in Smoobu (Lirio)
    // leaves it out, and the headline price stays hidden until the live rate
    // arrives instead of showing a hardcoded figure.
    price?: {
        crc: number;                 // e.g., 75000
        usd: number;                 // e.g., 150
    };
    socialStatement: LocalizedValue<string>;
    featureHighlights: LocalizedValue<string[]>;
}