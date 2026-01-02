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

export interface PropertyMarketingContent {
    propertyKey: string;           // e.g., 'Rana', 'RanaES'
    descriptiveTitle: {
        en: string;
        es: string;
    };
    price: {
        crc: number;                 // e.g., 75000
        usd: number;                 // e.g., 150
    };
    socialStatement: {
        en: string;
        es: string;
    };
    featureHighlights: {
        en: string[];
        es: string[];
    };
}