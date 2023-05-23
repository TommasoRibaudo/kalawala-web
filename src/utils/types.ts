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
    amenities: {
        name: string;
        icon: string;
    }[];
}