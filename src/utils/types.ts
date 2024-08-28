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