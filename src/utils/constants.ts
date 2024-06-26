import { HouseDataType } from "./types";
import { TucanoImage, GecoImage, PappagalloImage, RanaImage } from '../assets/images'

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
        neighborhood: "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.<br/>    The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!<br/>    Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space. Additionally, we have a charging station by the bakery.",
        houseCode: 1,
        parking: true,
        image: GecoImage,
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
        description: "Nestled in the heart of town, this charming house comfortably accommodates up to 5 guests. It boasts a fully equipped kitchen, a bathroom, two A/C units, and a private parking space. Our prime location ensures easy access to both the town center and the beaches of Puerto Viejo.<br/>     The house offers complete privacy, with all described spaces, including the kitchen and bathroom, exclusively for your use. You'll have all the amenities needed to feel at home.<br/>     You'll find most shops and restaurants within a short walking distance. Additionally, a nearby jungle path along the ocean leads to natural coral pools and Cocles.<br/>     Have a special request? We are happy to accommodate if possible. Please don't hesitate to let us know.<br/>     We strongly recommend this option if you are planning to travel with your pet, as it offers a small, fenced garden.",
        neighborhood: "Puerto Viejo is a well known destination for tourists from around the globe. The town features beautiful beaches bordered by lush tropical rainforest and is home to two National Parks, Manzanillo and Cahuita. At night, Puerto Viejo transforms with a vibrant nightlife scene. Staying here allows you to fully experience everything that makes Puerto Viejo special.<br/>     The house is conveniently situated near a beach path that eventually leads to Cocles. Along the path, you'll have the chance to observe diverse wildlife and enjoy natural coral pools. There's even a hidden sightseeing spot to discover!<br/>     Getting around Puerto Viejo and its vicinity is best done by renting a bike or a scooter. Additionally, the public bus service is available, connecting you to Cahuita, Manzanillo, and Sixaola. If you prefer driving, we can accommodate cars and provide private parking. Please inform us if you have a larger pickup truck that requires extra space.",
        houseCode: 2,
        image: RanaImage,
        parking: true,
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
        description: "This house offers a delightful experience in the heart of Puerto Viejo with a charming wooden apartment located above an Italian bakery. The apartment features two comfortable bedrooms, a well-equipped bathroom, a fully equipped kitchen, a lovely terrace, and two A/C units, ensuring a cozy stay.<br/>    These apartments provide private spaces, including the kitchen and bathroom, offering everything you need to feel at home. For stays of 5 nights or more, we provide complimentary cleaning services, and our team will coordinate a suitable time with you during your visit.<br/>    If you have any special requests, we're happy to accommodate them whenever possible, so don't hesitate to let us know. Should you need a pack-and-play crib for your stay, please inform us in advance, and we'll ensure it's set up in your room during the cleaning process.",
        neighborhood: "Puerto Viejo attracts visitors from all over the globe with its breathtaking landscapes. The town is renowned for its expansive beaches bordered by tropical rainforests and features two National Parks, Manzanillo and Cahuita. The nightlife here is vibrant and lively, offering a unique experience after dark. Staying in Puerto Viejo allows you to fully immerse yourself in its unique charm.<br/>    Our house is conveniently located near a beach path that leads eventually to Cocles. On your way, you can observe a variety of wildlife and enjoy the natural coral pools. A hidden sightseeing spot is also waiting to be explored!.<br/>    Exploring Puerto Viejo and its surroundings is most convenient by renting a bike or a scooter. Additionally, there is a good public bus service available that connects you to Cahuita, Manzanillo, and Sixaola. If you prefer driving, we provide private parking. Please inform us if you have a larger pickup truck that needs extra space.",
        houseCode: 3,
        image: TucanoImage,
        parking: false,
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
        neighborhood: "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.<br/>    The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!<br/>    Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space. Additionally, we have a charging station by the bakery.",
        houseCode: 4,
        image: PappagalloImage,
        parking: false,
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