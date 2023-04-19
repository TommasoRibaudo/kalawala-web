export type ListingType = {
    name: string
    mainImage: string
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