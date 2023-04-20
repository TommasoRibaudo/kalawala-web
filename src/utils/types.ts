export type ListingType = {
    name: string
    mainImage: string
}

export type AmenityType = {
    icon: string
    text: string
}
export type HouseDataType = {
    name: string;
    guestNumber: number;
    location: string;
    description: string;
    neighborhood: string;
    amenities: {
        name: string;
        icon: string;
    }[];
}