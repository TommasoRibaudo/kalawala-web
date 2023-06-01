import { HouseDataType } from "./types";

export interface IImageDescription {
    roomType: string;
    roomDescription: string;
}

export const gecoImageDescriptions: IImageDescription[] = [
    {
        roomType: "Bathroom",
        roomDescription: "We always provide towels and toiletries."
    },
    {
        roomType: "Second Bedroom",
        roomDescription: "Bed Linens always included."
    },
    {
        roomType: "Kitchen",
        roomDescription: "Microwave, coffeemaker and blender also included."
    },
    {
        roomType: "Livingroom",
        roomDescription: "Don't forget about our 15% discount for every purchase at the bakery, there are menus in the house."
    },
    {
        roomType: "Livingroom",
        roomDescription: "100Mbps Free Wifi everywhere in your house."
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "This room has a TV with hundreds of channels and HDMI port."
    },
    {
        roomType: "Garden",
        roomDescription: "Free private parking is available at this location."
    },
    {
        roomType: "Front Porch",
        roomDescription: "All the spaces shown are completely private, for you only."
    }
]
export const pappagalloImageDescriptions: IImageDescription[] = [
    {
        roomType: "Bathroom",
        roomDescription: "We always provide towels and toiletries."
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "This room has a TV with hundreds of channels and HDMI port."
    },
    {
        roomType: "Second Bedroom",
        roomDescription: "Bed Linens always included."
    },
    {
        roomType: "Kitchen",
        roomDescription: "Microwave, coffeemaker and blender also included."
    },
    {
        roomType: "Livingroom",
        roomDescription: "100Mbps Free Wifi everywhere in your house."
    },
    {
        roomType: "Living Room",
        roomDescription: "100Mbps Free Wifi everywhere in your house."
    },
    {
        roomType: "Balcony",
        roomDescription: "Casa Tucano and Casa Pappagallo were remodeled by an interior designer from spain, in June 2021."
    },
    {
        roomType: "Livingroom",
        roomDescription: "Shh... Secret discount! Use discount code #5off to get an additional discount!"
    }
]
export const ranaImageDescriptions: IImageDescription[] = [
    {
        roomType: "Bathroom",
        roomDescription: "We always provide towels and toiletries."
    },
    {
        roomType: "Bathroom",
        roomDescription: "We're available 24/7 in case you need any help."
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "This room has a TV with hundreds of channels and HDMI port."
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "10inches/25cm tall matresses in every house."
    },
    {
        roomType: "Second Bedroom",
        roomDescription: "Bed Linens always included."
    },
    {
        roomType: "Kitchen",
        roomDescription: "Microwave, coffeemaker and blender also included."
    },
    {
        roomType: "Kitchen",
        roomDescription: "We offer last-minute discounts, prices are updated daily!"
    },
    {
        roomType: "Livingroom",
        roomDescription: "100Mbps Free Wifi everywhere in your house."
    },
    {
        roomType: "Garden",
        roomDescription: "Free private parking is available at this location."
    }
]
export const tucanoImageDescriptions: IImageDescription[] = [
    {
        roomType: "Bathroom",
        roomDescription: "We always provide towels and toiletries."
    },
    {
        roomType: "Bathroom",
        roomDescription: "We offer free cleaning services for longer reservations."
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "This room has a TV with hundreds of channels and HDMI port."
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "10inches/25cm tall matresses in every house."
    },
    {
        roomType: "Second Bedroom",
        roomDescription: "Bed Linens always included."
    },
    {
        roomType: "Kitchen",
        roomDescription: "Microwave, coffeemaker and blender also included."
    },
    {
        roomType: "Livingroom",
        roomDescription: "100Mbps Free Wifi everywhere in your house."
    },
    {
        roomType: "Livingroom",
        roomDescription: "Don't forget about our 15% discount for every purchase at the bakery, there are menus in the house."
    },
    {
        roomType: "Balcony",
        roomDescription: "All the spaces shown are completely private, for you only."
    }
]

export const houseDataList: HouseDataType[] = [
    {
        name: "Geco",
        guestNumber: 5,
        location: "Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "Located in the heart of town, this house has space for up to 5 people and features a fully equipped kitchen, a bathroom, 2 A/C units, and a private parking lot. Our prime location offers easy access to both the town center and the most beautiful beaches that Puerto Viejo has to offer.<br/>   Most shops and restaurants are just a short walk away, and there is a nearby jungle path that runs along the ocean and leads to natural pools in the coral and to Cocles.<br/>    All of the spaces described here are private, including the fully equipped kitchen and bathroom. You'll have everything you need to make yourself at home.<br/>    We offer cleaning services for reservations of 5 nights or longer. Our team will contact you during your stay to coordinate a convenient time for the cleaning.<br/>   Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.<br/>    If you require a pack- and - play crib during your stay, please inform us ahead of time. We'll make sure to set it up in your room during our cleaning process.",
        neighborhood: "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.<br/>    The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!<br/>    Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or an electric bike. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space. Additionally, we have a charging station by the bakery.",
        houseCode: 1,
        amenities: [
            {
                name: "Private Equipped Bathroom",
                icon: "bath"
            },
            {
                name: "Private Equipped Kitchen",
                icon: "kitchen"
            },
            {
                name: "A/C",
                icon: "ac"
            },
            {
                name: "Private Fenced Parking",
                icon: "parking"
            },
            {
                name: "100Mbps WiFi",
                icon: "wifi"
            },
            {
                name: "Pet Friendly",
                icon: "pet"
            },
            
        ],
    },
    {
        name: "Rana",
        guestNumber: 5,
        location: "Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "Located in the heart of town, this house has space for up to 5 people and features a fully equipped kitchen, a bathroom, 2 A/C units, and a private parking lot. Our prime location offers easy access to both the town center and the most beautiful beaches that Puerto Viejo has to offer.<br/>     Most shops and restaurants are just a short walk away, and there is a nearby jungle path that runs along the ocean and leads to natural pools in the coral and to Cocles.<br/>     All of the spaces described here are private, including the fully equipped kitchen and bathroom. You'll have everything you need to make yourself at home.<br/>     We offer cleaning services for reservations of 5 nights or longer. Our team will contact you during your stay to coordinate a convenient time for the cleaning.<br/>     Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.<br/>    If you require a pack - and - play crib during your stay, please inform us ahead of time. We'll make sure to set it up in your room during our cleaning process.",
        neighborhood: "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.<br/>    The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!<br/>    Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or an electric bike. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space. Additionally, we have a charging station by the bakery.",
        houseCode: 2,
        amenities: [
            {
                name: "Private Equipped Bathroom",
                icon: "bath"
            },
            {
                name: "Private Equipped Kitchen",
                icon: "kitchen"
            },
            {
                name: "A/C",
                icon: "ac"
            },
            {
                name: "Private Fenced Parking",
                icon: "parking"
            },
            {
                name: "100Mbps WiFi",
                icon: "wifi"
            },
            {
                name: "Pet Friendly",
                icon: "pet"
            }
        ],
    },
    {
        name: "Tucano",
        guestNumber: 5,
        location: "Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "Welcome to Kalawala, a charming complex of two apartments located in the heart of Puerto Viejo. Each apartment is built entirely of wood and is situated above a delightful Italian bakery. The apartments are equipped with everything you need for a comfortable stay, including a fully equipped kitchen, two cozy bedrooms, a lovely terrace, two A/C units, and one well equipped bathroom.<br/>    All of the spaces described here are private, including the fully equipped kitchen and bathroom. You'll have everything you need to make yourself at home.<br/>    We offer cleaning services for reservations of 5 nights or longer. Our team will contact you during your stay to coordinate a convenient time for the cleaning.<br/>   Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.<br/>    If you require a pack - and - play crib during your stay, please inform us ahead of time. We'll make sure to set it up in your room during our cleaning process.",
        neighborhood: "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.<br/>    The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!<br/>    Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or an electric bike. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space. Additionally, we have a charging station by the bakery.",
        houseCode: 3,
        amenities: [
            {
                name: "Private Equipped Bathroom",
                icon: "bath"
            },
            {
                name: "Private Equipped Kitchen",
                icon: "kitchen"
            },
            {
                name: "A/C",
                icon: "ac"
            },
            {
                name: "100Mbps WiFi",
                icon: "wifi"
            },
            {
                name: "Private Outside Parking",
                icon: "parking"
            },
            {
                name: "Pet Friendly",
                icon: "pet"
            }
            
        ],
    },

    {
        name: "Pappagallo",
        guestNumber: 5,
        location: "Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "Welcome to Kalawala, a charming complex of two apartments located in the heart of Puerto Viejo. Each apartment is built entirely of wood and is situated above a delightful Italian bakery. The apartments are equipped with everything you need for a comfortable stay, including a fully equipped kitchen, two cozy bedrooms, a lovely terrace, two A/C units, and one well equipped bathroom.<br/>    All of the spaces described here are private, including the fully equipped kitchen and bathroom. You'll have everything you need to make yourself at home.<br/>    We offer cleaning services for reservations of 5 nights or longer. Our team will contact you during your stay to coordinate a convenient time for the cleaning.<br/>    Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.<br/>    If you require a pack - and - play crib during your stay, please inform us ahead of time. We'll make sure to set it up in your room during our cleaning process.",
        neighborhood: "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.<br/>    The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!<br/>    Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or an electric bike. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space. Additionally, we have a charging station by the bakery.",
        houseCode: 4,
        amenities: [
            {
                name: "Private Equipped Bathroom",
                icon: "bath"
            },
            {
                name: "Private Equipped Kitchen",
                icon: "kitchen"
            },
            {
                name: "A/C",
                icon: "ac"
            },
            {
                name: "100Mbps WiFi",
                icon: "wifi"
            },
            {
                name: "Private Outside Parking",
                icon: "parking"
            },
            {
                name: "Pet Friendly",
                icon: "pet"
            }
        ],
    }
]