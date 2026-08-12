import { HouseDataType, ListingType, PropertyCapacity, PropertyMarketingContent } from "./types";
import { pathForKey, type RouteKey } from "../routes.config";
import { pickLocalized, type Locale, type LocalizedValue } from "../i18n";

// Random popup configuration
export const RANDOM_POPUP_CONFIG = {
  // Probability of showing the popup (0-1, where 1 = 100% chance)
  showProbability: 1, // 100% chance to show

  // Time range in milliseconds for random delay
  minDelay: 25000,
  maxDelay: 50000,

  // Duration the popup stays visible
  duration: 8000, // 8 seconds

  // Messages for different languages
  messages: {
    en: "Recent guests booked directly on our website.",
    es: "Huéspedes recientes reservaron directamente en nuestra web.",
    de: "Kürzlich haben Gäste direkt auf unserer Website gebucht.",
    fr: "Des voyageurs ont récemment réservé directement sur notre site.",
    it: "Ospiti recenti hanno prenotato direttamente sul nostro sito.",
    pt: "Hóspedes recentes reservaram diretamente no nosso site.",
    he: "אורחים הזמינו לאחרונה ישירות באתר שלנו.",
    hi: "हाल ही में मेहमानों ने हमारी वेबसाइट पर सीधे बुकिंग की।",
    nl: "Recente gasten hebben rechtstreeks via onze website geboekt."
  }
};

export interface IImageDescription {
    roomType: string;
    roomDescription: string;
    imageLink?: string;
}
export const homesSnippet: ListingType[] = [
    {
        name: 'Tucano',
        mainImage: "https://lh3.googleusercontent.com/d/10qvLOMLs4_JsBIF99igVeh4baDR7EB-Q=w1000"
    },
    {
        name: 'Geco',
        mainImage: "https://lh3.googleusercontent.com/d/1tYQxiwEXhxhv2r0_mJQhXVAHOMrE0y_2=w1000"
    },
    {
        name: 'Pappagallo',
        mainImage: "https://lh3.googleusercontent.com/d/1owhxss4VVXLLJAQP1ByDyBMH_NwQsIuY=w1000"
    },
    {
        name: 'Rana',
        mainImage: "https://lh3.googleusercontent.com/d/1UiGI8gFf6UR5kn8Eo30u457NX8NkP95X=w1000"
    },
    {
        name: 'Delfin',
        mainImage: "https://lh3.googleusercontent.com/d/1ui0cNzHTb2WM-k59OkwnJXw77m0P7PPW=w1000"
    },
]
export const NamSnippet: ListingType[] = [
    {
        name: 'Areka',
        mainImage: "https://lh3.googleusercontent.com/d/1iHyOve78WkDNdTcQcUtKkiM8rXx2iRey=w1000"
    },
    {
        name: 'Giulia',
        mainImage: "https://lh3.googleusercontent.com/d/1e0esqkSBKBdT-F2kLg5PsyF46zEWtWQ8=w1000"
    },
    {
        name: 'Plumeria',
        mainImage: "https://lh3.googleusercontent.com/d/1b2x2aVIjqlSws4KePOS_NVb4NItGsra1=w1000"
    },
]
export const VillaSnippet: ListingType[] = [
    {
        name: 'Villa Mar',
        mainImage: "https://lh3.googleusercontent.com/d/1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn=w1000"
    },
    {
        name: 'Villa Coral',
        mainImage: "https://lh3.googleusercontent.com/d/1frKDGGLk1nJQQaxoxng6TgmUVzxTx08A=w1000"
    }
]



export const allHomesSnippet: ListingType[] = [
    {
        name: 'Pappagallo',
        mainImage: "https://lh3.googleusercontent.com/d/1owhxss4VVXLLJAQP1ByDyBMH_NwQsIuY=w1000"
    },
    {
        name: 'Geco',
        mainImage: "https://lh3.googleusercontent.com/d/1tYQxiwEXhxhv2r0_mJQhXVAHOMrE0y_2=w1000"
    },
    {
        name: 'Plumeria',
        mainImage: "https://lh3.googleusercontent.com/d/1b2x2aVIjqlSws4KePOS_NVb4NItGsra1=w1000"
    },
    {
        name: 'Giulia',
        mainImage: "https://lh3.googleusercontent.com/d/1e0esqkSBKBdT-F2kLg5PsyF46zEWtWQ8=w1000"
    },
    {
        name: 'Villa Coral',
        mainImage: "https://lh3.googleusercontent.com/d/1frKDGGLk1nJQQaxoxng6TgmUVzxTx08A=w1000"
    }
]

export const allHomesSnippetES: ListingType[] = [
    {
        name: 'PappagalloES',
        mainImage: "https://lh3.googleusercontent.com/d/1owhxss4VVXLLJAQP1ByDyBMH_NwQsIuY=w1000"
    },
    {
        name: 'GecoES',
        mainImage: "https://lh3.googleusercontent.com/d/1tYQxiwEXhxhv2r0_mJQhXVAHOMrE0y_2=w1000"
    },
    {
        name: 'PlumeriaES',
        mainImage: "https://lh3.googleusercontent.com/d/1b2x2aVIjqlSws4KePOS_NVb4NItGsra1=w1000"
    },
    {
        name: 'GiuliaES',
        mainImage: "https://lh3.googleusercontent.com/d/1e0esqkSBKBdT-F2kLg5PsyF46zEWtWQ8=w1000"
    },
    {
        name: 'VillaCoralES',
        mainImage: "https://lh3.googleusercontent.com/d/1frKDGGLk1nJQQaxoxng6TgmUVzxTx08A=w1000"
    }
]
export const gecoImageDescriptionsES: IImageDescription[] = [
    {
        roomType: "Baño",
        roomDescription: "Siempre proporcionamos toallas y artículos de aseo.",
        imageLink: "https://lh3.googleusercontent.com/d/1ocQCVEUW8VFMUjgb6bByd56EF8cqIZzS=w1000"
    },
    {
        roomType: "Segundo Dormitorio",
        roomDescription: "Ropa de cama siempre incluida.",
        imageLink: "https://lh3.googleusercontent.com/d/1pKfUX6k4hl-Idbio56J-QUge0KRrCJ91=w1000"
    },
    {
        roomType: "Cocina",
        roomDescription: "Microondas, cafetera y licuadora incluidos.",
        imageLink: "https://lh3.googleusercontent.com/d/1QBjP84LxcmegtOn_GtIJKFxi8R2ie_Yk=w1000"
    },
    {
        roomType: "Sala de Estar",
        roomDescription: "No olvides nuestro 15% de descuento en cada compra en la panadería, hay menús en la casa.",
        imageLink: "https://lh3.googleusercontent.com/d/1O5hZ0VJhFspi3SvXWUuOJZl82ozQ18rp=w1000"
    },
    {
        roomType: "Sala de Estar",
        roomDescription: "100Mbps de Wifi gratis en toda tu casa.",
        imageLink: "https://lh3.googleusercontent.com/d/1YnACZpnj9I9GgDqZxx0brHIKjdqwu0VT=w1000"
    },
    {
        roomType: "Cuarto Principal",
        roomDescription: "Esta habitación tiene un televisor con un sistema de entretenimiento Roku y puerto HDMI.",
        imageLink: "https://lh3.googleusercontent.com/d/1fbmZQn38bbH_t5Hu0x_vYfQWIuiIIN9W=w1000"
    },
    {
        roomType: "Jardín",
        roomDescription: "Hay estacionamiento privado gratuito en este lugar.",
        imageLink: "https://lh3.googleusercontent.com/d/10brlXHpVyjQmum0BZcobJ6s4huT8My7t=w1000"
    },
    {
        roomType: "Porche",
        roomDescription: "Todos los espacios mostrados son completamente privados, solo para ti.",
        imageLink: "https://lh3.googleusercontent.com/d/1ExyU9JUIgahhBykI4ugoJYkS9ybF2F8-=w1000"
    }
]
export const pappagalloImageDescriptionsES: IImageDescription[] = [
    {
        roomType: "Baño",
        roomDescription: "Siempre proporcionamos toallas y artículos de aseo.",
        imageLink: "https://lh3.googleusercontent.com/d/1qocAtWUCMRttBmWa8fP_KtJDW-5QD6jh=w1000"
    },
    {
        roomType: "Cuarto Principal",
        roomDescription: "Esta habitación tiene un televisor con un sistema de entretenimiento Roku y puerto HDMI.",
        imageLink: "https://lh3.googleusercontent.com/d/1s3MfwR3l7yme47d7IrqSEDYPNMWRzpPh=w1000"
    },
    {
        roomType: "Segundo Dormitorio",
        roomDescription: "Ropa de cama siempre incluida.",
        imageLink: "https://lh3.googleusercontent.com/d/1WGdWpqS0BpOGo6AMhHGocp1jN1OSIPDQ=w1000"
    },
    {
        roomType: "Cocina",
        roomDescription: "Microondas, cafetera y licuadora incluidos.",
        imageLink: "https://lh3.googleusercontent.com/d/1bpwpewoUw6CuYg66IcwpbcCm2Ne1Ryth=w1000"
    },
    {
        roomType: "Sala de Estar",
        roomDescription: "No olvides nuestro 15% de descuento en cada compra en la panadería, hay menús en la casa.",
        imageLink: "https://lh3.googleusercontent.com/d/1dz1y_lAZTfzvj2862Gahw5QY-w4_FjOX=w1000"
    },
    {
        roomType: "Sala de Estar",
        roomDescription: "100Mbps de Wifi gratis en toda tu casa.",
        imageLink: "https://lh3.googleusercontent.com/d/1IGjxWxvODVY5BgAIS21MNxZaCev4qKx5=w1000"
    },
    {
        roomType: "Balcón",
        roomDescription: "Casa Pappagallo y Casa Tucano fueron remodeladas en el 2021.",
        imageLink: "https://lh3.googleusercontent.com/d/16GIFWl5alQgk32AkQdJNsyLGMwDtfdsO=w1000"
    },
    {
        roomType: "Sala de Estar",
        roomDescription: "Shh... ¡No te lo pierdas! ¡Ingresa el codigo #5off para un descuento extra a la hora de reservar con nosotros!",
        imageLink: "https://lh3.googleusercontent.com/d/1yrtj6UM8z-lCu_8inK_nn37p3kzaFIwY=w1000"
    }
]
export const ranaImageDescriptionsES: IImageDescription[] = [
    {
        roomType: "Baño",
        roomDescription: "Siempre proporcionamos toallas y artículos de aseo.",
        imageLink: "https://lh3.googleusercontent.com/d/1N_nhyc-LysiQ5lJo7p6vPRDKviJE2QCO=w1000"
    },
    {
        roomType: "Baño",
        roomDescription: "Siempre estamos disponibles para ayudarte con cualquier pregunta o inquietud que puedas tener.",
        imageLink: "https://lh3.googleusercontent.com/d/1igbIdHZHFVZybTUbI9Ih0AQmjyTT7Y27=w1000"
    },
    {
        roomType: "Cuarto Principal",
        roomDescription: "Esta habitación tiene un televisor con un sistema de entretenimiento Roku y puerto HDMI.",
        imageLink: "https://lh3.googleusercontent.com/d/1Du7hhx0X7ry3QXVFNPBP9LU6ItquZMtV=w1000"
    },
    {
        roomType: "Cuarto Principal",
        roomDescription: "Colchones de 10pulgadas/25cm.",
        imageLink: "https://lh3.googleusercontent.com/d/1Dbna1MUEB126_-QfkRLVVgha6553hQc_=w1000"
    },
    {
        roomType: "Segundo Dormitorio",
        roomDescription: "Ropa de cama siempre incluida.",
        imageLink: "https://lh3.googleusercontent.com/d/1phVUR1WvBJmYT2Anr1BEUhwniwApu0TL=w1000"
    },
    {
        roomType: "Cocina",
        roomDescription: "Microondas, cafetera y licuadora incluidos.",
        imageLink: "https://lh3.googleusercontent.com/d/1HLpqPwUgdTuhP8TfNuFOk2slUPtYNBPP=w1000"
    },
    {
        roomType: "Cocina",
        roomDescription: "Ofrecemos descuentos last-minute para reservas de último minuto.",
        imageLink: "https://lh3.googleusercontent.com/d/10KgLUm_WUcN-GWFvfN52T0j6ckfTvj9G=w1000"
    },
    {
        roomType: "Sala de Estar",
        roomDescription: "100Mbps de Wifi gratis en toda tu casa.",
        imageLink: "https://lh3.googleusercontent.com/d/1UFvJsslx0lQbvGVuEy07mClIw1VS75j0=w1000"
    },
    {
        roomType: "Jardín",
        roomDescription: "Parqueo privado gratuito disponible en este lugar.",
        imageLink: "https://lh3.googleusercontent.com/d/1vzDKoJQ8fQEHXGXFL525sXJ77ZHbGCNO=w1000"
    }
]
export const delfinImageDescriptionsES: IImageDescription[] = [
    {
        roomType: "Terraza",
        roomDescription: "Siempre proporcionamos toallas y artículos de aseo.",
        imageLink: "https://lh3.googleusercontent.com/d/1ui0cNzHTb2WM-k59OkwnJXw77m0P7PPW=w1000"
    },
    {
        roomType: "Baño",
        roomDescription: "Siempre estamos disponibles para ayudarte con cualquier pregunta o inquietud que puedas tener.",
        imageLink: "https://lh3.googleusercontent.com/d/1QxWsMW8dh5m19DGv1ZBKCcifzHMxs9R9=w1000"
    },
    {
        roomType: "Cuarto Principal",
        roomDescription: "Esta habitación tiene un televisor con un sistema de entretenimiento Roku y puerto HDMI.",
        imageLink: "https://lh3.googleusercontent.com/d/166BAE3B571U-S2gRWTNideuHdpXE95c7=w1000"
    },
    {
        roomType: "Cuarto Principal",
        roomDescription: "Colchones de 10pulgadas/25cm.",
        imageLink: "https://lh3.googleusercontent.com/d/1Vp74GumnGJuxjlJEziS7ktA-Du9UHlov=w1000"
    },
    {
        roomType: "Segundo Dormitorio",
        roomDescription: "Ropa de cama siempre incluida.",
        imageLink: "https://lh3.googleusercontent.com/d/14tRFJRifJruesH1iCUCJAeKrQ9wS0cqP=w1000"
    },
    {
        roomType: "Cocina",
        roomDescription: "Microondas, cafetera y licuadora incluidos.",
        imageLink: "https://lh3.googleusercontent.com/d/1dLwcs8QzF6YiGWBGhnDpO6hMj1VtMbIh=w1000"
    },
    {
        roomType: "Cocina",
        roomDescription: "Ofrecemos descuentos last-minute para reservas de último minuto.",
        imageLink: "https://lh3.googleusercontent.com/d/1fTFQ9jumREu-O6Vs2M_7Q6AlWkCJKjYn=w1000"
    },
    {
        roomType: "Sala de Estar",
        roomDescription: "100Mbps de Wifi gratis en toda tu casa.",
        imageLink: "https://lh3.googleusercontent.com/d/1iRP_x0A6BprRBnQ0yWE6a2sa3tPiKIOQ=w1000"
    },
    {
        roomType: "Jardín",
        roomDescription: "Parqueo privado gratuito disponible en este lugar.",
        imageLink: "https://lh3.googleusercontent.com/d/1Zm3lah2psnATqL6UcWB2Jwu0IncFjDnX=w1000"
    }
]
export const tucanoImageDescriptionsES: IImageDescription[] = [
    {
        roomType: "Baño",
        roomDescription: "Siempre proporcionamos toallas y artículos de aseo.",
        imageLink: "https://lh3.googleusercontent.com/d/1SC7QClrubrzsRyiz9igW5oIDiIgdDmeg=w1000"
    },
    {
        roomType: "Baño",
        roomDescription: "Ofrecemos limpieza gratuita para reservas más largas.",
        imageLink: "https://lh3.googleusercontent.com/d/1aiADCh7t1taZ9yFcNfGg3Gpl-IPVabxA=w1000"
    },
    {
        roomType: "Cuarto Principal",
        roomDescription: "Esta habitación tiene un televisor con un sistema de entretenimiento Roku y puerto HDMI.",
        imageLink: "https://lh3.googleusercontent.com/d/12d5__pqzKjeffa0joFLeZn4kTPvJVXE_=w1000"
    },
    {
        roomType: "Cuarto Principal",
        roomDescription: "Colchones de 10pulgadas/25cm.",
        imageLink: "https://lh3.googleusercontent.com/d/16Gd2y03TpdFCVY2ugTbV3d0R-YrOj2bf=w1000"
    },
    {
        roomType: "Segundo Dormitorio",
        roomDescription: "Ropa de cama siempre incluida.",
        imageLink: "https://lh3.googleusercontent.com/d/1CkNL9edZ-a2LVEZZ4dawAhCAB89d29st=w1000"
    },
    {
        roomType: "Cocina",
        roomDescription: "Microondas, cafetera y licuadora incluidos.",
        imageLink: "https://lh3.googleusercontent.com/d/17CUhGccaCV33gbEv4Yt3-Co3vCuOiiyx=w1000"
    },
    {
        roomType: "Sala de Estar",
        roomDescription: "100Mbps de Wifi gratis en toda tu casa.",
        imageLink: "https://lh3.googleusercontent.com/d/16ZLKp3PnfxXbQv_4BD9VbYbr_7_gfyJJ=w1000"
    },
    {
        roomType: "Sala de Estar",
        roomDescription: "No olvides nuestro 15% de descuento en cada compra en la panadería, hay menús en la casa.",
        imageLink: "https://lh3.googleusercontent.com/d/1cp4slCoNdbsJhbReAPlKkOOqpvqTDTVy=w1000"
    },
    {
        roomType: "Balcón",
        roomDescription: "Todos los espacios mostrados son completamente privados, solo para ti.",
        imageLink: "https://lh3.googleusercontent.com/d/1ltpPKGHG46Rl_pTpnTtewt2U3YsKwr8W=w1000"
    }
]


export const gecoImageDescriptions: IImageDescription[] = [
    {
        roomType: "Bathroom",
        roomDescription: "We always provide towels and toiletries.",
        imageLink: "https://lh3.googleusercontent.com/d/1ocQCVEUW8VFMUjgb6bByd56EF8cqIZzS=w1000"
    },
    {
        roomType: "Second Bedroom",
        roomDescription: "Bed Linens always included.",
        imageLink: "https://lh3.googleusercontent.com/d/1pKfUX6k4hl-Idbio56J-QUge0KRrCJ91=w1000"
    },
    {
        roomType: "Kitchen",
        roomDescription: "Microwave, coffeemaker and blender also included.",
        imageLink: "https://lh3.googleusercontent.com/d/1QBjP84LxcmegtOn_GtIJKFxi8R2ie_Yk=w1000"
    },
    {
        roomType: "Livingroom",
        roomDescription: "Don't forget about our 15% discount for every purchase at the bakery, there are menus in the house.",
        imageLink: "https://lh3.googleusercontent.com/d/1O5hZ0VJhFspi3SvXWUuOJZl82ozQ18rp=w1000"
    },
    {
        roomType: "Livingroom",
        roomDescription: "100Mbps Free Wifi everywhere in your house.",
        imageLink: "https://lh3.googleusercontent.com/d/1YnACZpnj9I9GgDqZxx0brHIKjdqwu0VT=w1000"
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "This room has a TV with a Roku Entertainment System and HDMI port.",
        imageLink: "https://lh3.googleusercontent.com/d/1fbmZQn38bbH_t5Hu0x_vYfQWIuiIIN9W=w1000"
    },
    {
        roomType: "Garden",
        roomDescription: "Free private parking is available at this location.",
        imageLink: "https://lh3.googleusercontent.com/d/10brlXHpVyjQmum0BZcobJ6s4huT8My7t=w1000"
    },
    {
        roomType: "Front Porch",
        roomDescription: "All the spaces shown are completely private, for you only.",
        imageLink: "https://lh3.googleusercontent.com/d/1ExyU9JUIgahhBykI4ugoJYkS9ybF2F8-=w1000"
    }
]
export const pappagalloImageDescriptions: IImageDescription[] = [
    {
        roomType: "Bathroom",
        roomDescription: "We always provide towels and toiletries.",
        imageLink: "https://lh3.googleusercontent.com/d/1qocAtWUCMRttBmWa8fP_KtJDW-5QD6jh=w1000"
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "This room has a TV with a Roku Entertainment System of channels and HDMI port.",
        imageLink: "https://lh3.googleusercontent.com/d/1s3MfwR3l7yme47d7IrqSEDYPNMWRzpPh=w1000"
    },
    {
        roomType: "Second Bedroom",
        roomDescription: "Bed Linens always included.",
        imageLink: "https://lh3.googleusercontent.com/d/1WGdWpqS0BpOGo6AMhHGocp1jN1OSIPDQ=w1000"
    },
    {
        roomType: "Kitchen",
        roomDescription: "Microwave, coffeemaker and blender also included.",
        imageLink: "https://lh3.googleusercontent.com/d/1bpwpewoUw6CuYg66IcwpbcCm2Ne1Ryth=w1000"
    },
    {
        roomType: "Livingroom",
        roomDescription: "100Mbps Free Wifi everywhere in your house.",
        imageLink: "https://lh3.googleusercontent.com/d/1dz1y_lAZTfzvj2862Gahw5QY-w4_FjOX=w1000"
    },
    {
        roomType: "Living Room",
        roomDescription: "100Mbps Free Wifi everywhere in your house.",
        imageLink: "https://lh3.googleusercontent.com/d/1IGjxWxvODVY5BgAIS21MNxZaCev4qKx5=w1000"
    },
    {
        roomType: "Balcony",
        roomDescription: "Casa Tucano and Casa Pappagallo were remodeled by an interior designer from spain, in June 2021.",
        imageLink: "https://lh3.googleusercontent.com/d/16GIFWl5alQgk32AkQdJNsyLGMwDtfdsO=w1000"
    },
    {
        roomType: "Livingroom",
        roomDescription: "Shh... Secret discount! Use discount code #5off to get an additional discount!",
        imageLink: "https://lh3.googleusercontent.com/d/1yrtj6UM8z-lCu_8inK_nn37p3kzaFIwY=w1000"
    }
]
export const ranaImageDescriptions: IImageDescription[] = [
    {
        roomType: "Bathroom",
        roomDescription: "We always provide towels and toiletries.",
        imageLink: "https://lh3.googleusercontent.com/d/1-ZKRoDNGsf7J1DMw-J5RI8H4HFlgVAuT=w1000"
    },
    {
        roomType: "Bathroom",
        roomDescription: "We're available 24/7 in case you need any help.",
        imageLink: "https://lh3.googleusercontent.com/d/1igbIdHZHFVZybTUbI9Ih0AQmjyTT7Y27=w1000"
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "This room has a TV with a Roku Entertainment System and HDMI port.",
        imageLink: "https://lh3.googleusercontent.com/d/1Du7hhx0X7ry3QXVFNPBP9LU6ItquZMtV=w1000"
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "10inches/25cm tall matresses in every house.",
        imageLink: "https://lh3.googleusercontent.com/d/1Dbna1MUEB126_-QfkRLVVgha6553hQc_=w1000"
    },
    {
        roomType: "Second Bedroom",
        roomDescription: "Bed Linens always included.",
        imageLink: "https://lh3.googleusercontent.com/d/1phVUR1WvBJmYT2Anr1BEUhwniwApu0TL=w1000"
    },
    {
        roomType: "Kitchen",
        roomDescription: "Microwave, coffeemaker and blender also included.",
        imageLink: "https://lh3.googleusercontent.com/d/1HLpqPwUgdTuhP8TfNuFOk2slUPtYNBPP=w1000"
    },
    {
        roomType: "Kitchen",
        roomDescription: "We offer last-minute discounts, prices are updated daily!",
        imageLink: "https://lh3.googleusercontent.com/d/10KgLUm_WUcN-GWFvfN52T0j6ckfTvj9G=w1000"
    },
    {
        roomType: "Livingroom",
        roomDescription: "100Mbps Free Wifi everywhere in your house.",
        imageLink: "https://lh3.googleusercontent.com/d/1UFvJsslx0lQbvGVuEy07mClIw1VS75j0=w1000"
    },
    {
        roomType: "Garden",
        roomDescription: "Free private parking is available at this location.",
        imageLink: "https://lh3.googleusercontent.com/d/1vzDKoJQ8fQEHXGXFL525sXJ77ZHbGCNO=w1000"
    }
]
export const delfinImageDescriptions: IImageDescription[] = [
    {
        roomType: "Bathroom",
        roomDescription: "We always provide towels and toiletries.",
        imageLink: "https://lh3.googleusercontent.com/d/1ui0cNzHTb2WM-k59OkwnJXw77m0P7PPW=w1000"
    },
    {
        roomType: "Bathroom",
        roomDescription: "We're available 24/7 in case you need any help.",
        imageLink: "https://lh3.googleusercontent.com/d/1QxWsMW8dh5m19DGv1ZBKCcifzHMxs9R9=w1000"
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "This room has a TV with a Roku Entertainment System and HDMI port.",
        imageLink: "https://lh3.googleusercontent.com/d/166BAE3B571U-S2gRWTNideuHdpXE95c7=w1000"
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "10inches/25cm tall matresses in every house.",
        imageLink: "https://lh3.googleusercontent.com/d/1Vp74GumnGJuxjlJEziS7ktA-Du9UHlov=w1000"
    },
    {
        roomType: "Second Bedroom",
        roomDescription: "Bed Linens always included.",
        imageLink: "https://lh3.googleusercontent.com/d/14tRFJRifJruesH1iCUCJAeKrQ9wS0cqP=w1000"
    },
    {
        roomType: "Kitchen",
        roomDescription: "Microwave, coffeemaker and blender also included.",
        imageLink: "https://lh3.googleusercontent.com/d/1dLwcs8QzF6YiGWBGhnDpO6hMj1VtMbIh=w1000"
    },
    {
        roomType: "Kitchen",
        roomDescription: "We offer last-minute discounts, prices are updated daily!",
        imageLink: "https://lh3.googleusercontent.com/d/1fTFQ9jumREu-O6Vs2M_7Q6AlWkCJKjYn=w1000"
    },
    {
        roomType: "Livingroom",
        roomDescription: "100Mbps Free Wifi everywhere in your house.",
        imageLink: "https://lh3.googleusercontent.com/d/1iRP_x0A6BprRBnQ0yWE6a2sa3tPiKIOQ=w1000"
    },
    {
        roomType: "Garden",
        roomDescription: "Free private parking is available at this location.",
        imageLink: "https://lh3.googleusercontent.com/d/1Zm3lah2psnATqL6UcWB2Jwu0IncFjDnX=w1000"
    }
]
export const tucanoImageDescriptions: IImageDescription[] = [
    {
        roomType: "Bathroom",
        roomDescription: "We always provide towels and toiletries.",
        imageLink: "https://lh3.googleusercontent.com/d/1SC7QClrubrzsRyiz9igW5oIDiIgdDmeg=w1000"
    },
    {
        roomType: "Bathroom",
        roomDescription: "We offer free cleaning services for longer reservations.",
        imageLink: "https://lh3.googleusercontent.com/d/1aiADCh7t1taZ9yFcNfGg3Gpl-IPVabxA=w1000"
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "This room has a TV with hundreds of channels and HDMI port.",
        imageLink: "https://lh3.googleusercontent.com/d/12d5__pqzKjeffa0joFLeZn4kTPvJVXE_=w1000"
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "10inches/25cm tall matresses in every house.",
        imageLink: "https://lh3.googleusercontent.com/d/16Gd2y03TpdFCVY2ugTbV3d0R-YrOj2bf=w1000"
    },
    {
        roomType: "Second Bedroom",
        roomDescription: "Bed Linens always included.",
        imageLink: "https://lh3.googleusercontent.com/d/1CkNL9edZ-a2LVEZZ4dawAhCAB89d29st=w1000"
    },
    {
        roomType: "Kitchen",
        roomDescription: "Microwave, coffeemaker and blender also included.",
        imageLink: "https://lh3.googleusercontent.com/d/17CUhGccaCV33gbEv4Yt3-Co3vCuOiiyx=w1000"
    },
    {
        roomType: "Livingroom",
        roomDescription: "100Mbps Free Wifi everywhere in your house.",
        imageLink: "https://lh3.googleusercontent.com/d/16ZLKp3PnfxXbQv_4BD9VbYbr_7_gfyJJ=w1000"
    },
    {
        roomType: "Livingroom",
        roomDescription: "Don't forget about our 15% discount for every purchase at the bakery, there are menus in the house.",
        imageLink: "https://lh3.googleusercontent.com/d/1cp4slCoNdbsJhbReAPlKkOOqpvqTDTVy=w1000"
    },
    {
        roomType: "Balcony",
        roomDescription: "All the spaces shown are completely private, for you only.",
        imageLink: "https://lh3.googleusercontent.com/d/1ltpPKGHG46Rl_pTpnTtewt2U3YsKwr8W=w1000"
    }
]
export const VillaCoralImageDescriptions: IImageDescription[] = [
    {
        roomType: "Private Pool",
        roomDescription: "Exclusive for your use only.",
        imageLink: "https://lh3.googleusercontent.com/d/1rTXsdqpCJQd-rNDma56gWuPgUiVkG4q7=w1000"
    },
    {
        roomType: "Living Room and Kitchen",
        roomDescription: "Microwave, coffeemaker and blender also included.",
        imageLink: "https://lh3.googleusercontent.com/d/13FO4GX8mxrPWVvYxgxZwLSoX562YeZ6o=w1000"
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "King size bed, 10inches thick mattress.",
        imageLink: "https://lh3.googleusercontent.com/d/1fbYlrrmzPPi4qUCZcCWRBZI_T-NoT_0f=w1000"
    },
    {
        roomType: "Living Room",
        roomDescription: "Dedicated workspace with ethernet connection.",
        imageLink: "https://lh3.googleusercontent.com/d/1jnHMs9RZ2W8v7QbwAUpqTahjSEiGogej=w1000"
    },
    {
        roomType: "Porch",
        roomDescription: "Bed Linens always included.",
        imageLink: "https://lh3.googleusercontent.com/d/1iampS1euhTWcvffX6G_4aUCT0tEYBiBZ=w1000"
    },
    {
        roomType: "Bathroom",
        roomDescription: "100Mbps Free Wifi everywhere in your house.",
        imageLink: "https://lh3.googleusercontent.com/d/1SvQcVu19OTlW4ShyWYosrgo4d9XLjpUO=w1000"
    },
    {
        roomType: "Terrace And Pool",
        roomDescription: "All the spaces shown are completely private, for you only.",
        imageLink: "https://lh3.googleusercontent.com/d/1frKDGGLk1nJQQaxoxng6TgmUVzxTx08A=w1000"
    }
]
export const VillaMarImageDescriptions: IImageDescription[] = [
    {
        roomType: "Private Pool",
        roomDescription: "Exclusive for your use only.",
        imageLink: "https://lh3.googleusercontent.com/d/1hDvSUejFzrKK7Kwx_GxG_Wo4FmUMJya7=w1000"
    },
    {
        roomType: "Living Room and Kitchen",
        roomDescription: "We offer cleaning services for longer reservations.",
        imageLink: "https://lh3.googleusercontent.com/d/1uCajab8qKPf7u-uCluPMo_mWCB5Ibizd=w1000"
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "King size bed, 10inches thick mattress.",
        imageLink: "https://lh3.googleusercontent.com/d/1r0sHB3CvdgpgYxDJ5ZT3GPhsROTTH2cN=w1000"
    },
    {
        roomType: "Kitchen",
        roomDescription: "Microwave, coffeemaker and blender also included.",
        imageLink: "https://lh3.googleusercontent.com/d/1yO4pIi_zhNEMUdC21MbfRPM-MYblazLt=w1000"
    },
    {
        roomType: "Porch",
        roomDescription: "Bed Linens always included.",
        imageLink: "https://lh3.googleusercontent.com/d/1tDBJjDp1rwG_A7ZmjHFSIQKT6FvRJyx_=w1000"
    },
    {
        roomType: "Bathroom",
        roomDescription: "100Mbps Free Wifi everywhere in your house.",
        imageLink: "https://lh3.googleusercontent.com/d/1SvQcVu19OTlW4ShyWYosrgo4d9XLjpUO=w1000"
    },
    {
        roomType: "Terrace And Pool",
        roomDescription: "All the spaces shown are completely private, for you only.",
        imageLink: "https://lh3.googleusercontent.com/d/1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn=w1000"
    }
]
export const VillaCoralImageDescriptionsES: IImageDescription[] = [
    {
        roomType: "Piscina Privada",
        roomDescription: "Exclusiva para su uso solamente.",
        imageLink: "https://lh3.googleusercontent.com/d/1rTXsdqpCJQd-rNDma56gWuPgUiVkG4q7=w1000"
    },
    {
        roomType: "Sala de Estar y Cocina",
        roomDescription: "Microondas, cafetera y licuadora también incluidos.",
        imageLink: "https://lh3.googleusercontent.com/d/13FO4GX8mxrPWVvYxgxZwLSoX562YeZ6o=w1000"
    },
    {
        roomType: "Habitación Principal",
        roomDescription: "Cama king size, colchón de 10 pulgadas de grosor.",
        imageLink: "https://lh3.googleusercontent.com/d/1fbYlrrmzPPi4qUCZcCWRBZI_T-NoT_0f=w1000"
    },
    {
        roomType: "Sala de Estar",
        roomDescription: "Espacio de trabajo dedicado con conexión Ethernet.",
        imageLink: "https://lh3.googleusercontent.com/d/1jnHMs9RZ2W8v7QbwAUpqTahjSEiGogej=w1000"
    },
    {
        roomType: "Porche",
        roomDescription: "Ropa de cama siempre incluida.",
        imageLink: "https://lh3.googleusercontent.com/d/1iampS1euhTWcvffX6G_4aUCT0tEYBiBZ=w1000"
    },
    {
        roomType: "Baño",
        roomDescription: "Wifi gratuito de 100 Mbps en toda la casa.",
        imageLink: "https://lh3.googleusercontent.com/d/1SvQcVu19OTlW4ShyWYosrgo4d9XLjpUO=w1000"
    },
    {
        roomType: "Terraza y Piscina",
        roomDescription: "Todos los espacios mostrados son completamente privados, solo para usted.",
        imageLink: "https://lh3.googleusercontent.com/d/1frKDGGLk1nJQQaxoxng6TgmUVzxTx08A=w1000"
    }
]

export const VillaMarImageDescriptionsES: IImageDescription[] = [
    {
        roomType: "Piscina Privada",
        roomDescription: "Exclusiva para su uso solamente.",
        imageLink: "https://lh3.googleusercontent.com/d/1hDvSUejFzrKK7Kwx_GxG_Wo4FmUMJya7=w1000"
    },
    {
        roomType: "Sala de Estar y Cocina",
        roomDescription: "Ofrecemos servicios de limpieza para reservas largas.",
        imageLink: "https://lh3.googleusercontent.com/d/1uCajab8qKPf7u-uCluPMo_mWCB5Ibizd=w1000"
    },
    {
        roomType: "Habitación Principal",
        roomDescription: "Cama king size, colchón de 10 pulgadas de grosor.",
        imageLink: "https://lh3.googleusercontent.com/d/1r0sHB3CvdgpgYxDJ5ZT3GPhsROTTH2cN=w1000"
    },
    {
        roomType: "Cocina",
        roomDescription: "Microondas, cafetera y licuadora también incluidos.",
        imageLink: "https://lh3.googleusercontent.com/d/1yO4pIi_zhNEMUdC21MbfRPM-MYblazLt=w1000"
    },
    {
        roomType: "Porche",
        roomDescription: "Ropa de cama siempre incluida.",
        imageLink: "https://lh3.googleusercontent.com/d/1tDBJjDp1rwG_A7ZmjHFSIQKT6FvRJyx_=w1000"
    },
    {
        roomType: "Baño",
        roomDescription: "Wifi gratuito de 100 Mbps en toda la casa.",
        imageLink: "https://lh3.googleusercontent.com/d/1SvQcVu19OTlW4ShyWYosrgo4d9XLjpUO=w1000"
    },
    {
        roomType: "Terraza y Piscina",
        roomDescription: "Todos los espacios mostrados son completamente privados, solo para usted.",
        imageLink: "https://lh3.googleusercontent.com/d/1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn=w1000"
    }
]
export const ArekaImageDescriptions: IImageDescription[] = [
    {
        roomType: "Bedroom",
        roomDescription: "",
        imageLink: "https://lh3.googleusercontent.com/d/1LJSpQlE5C5C42FEz7M91Pjv4q7QRi-z6=w1000"
    },
    {
        roomType: "Bathroom",
        roomDescription: "We always provide towels and toiletries. ",
        imageLink: "https://lh3.googleusercontent.com/d/1K4SdPnue6pq2HloAAqiS1WZXmc2TlTGb=w1000"
    },
    {
        roomType: "Livingroom",
        roomDescription: "100Mbps Free Wifi everywhere in your house.",
        imageLink: "https://lh3.googleusercontent.com/d/1JLwZIir6MROytS_WMo1anNRyXcbEikJf=w1000"
    },
    {
        roomType: "Garden",
        roomDescription: "Free private parking",
        imageLink: "https://lh3.googleusercontent.com/d/1WhqgYtaq3igaScss30mUr9Vm9xF67Sxn=w1000"
    },
    {
        roomType: "Terrace",
        roomDescription: "We offer last-minute discounts, prices are updated daily!",
        imageLink: "https://lh3.googleusercontent.com/d/10OwN88Pw4C-8CvALS8tz7Tor_Vt1RO6J=w1000"
    },
    {
        roomType: "Kitchen",
        roomDescription: "Microwave, coffeemaker and blender also included.",
        imageLink: "https://lh3.googleusercontent.com/d/1qJrVlpa3UVaLStmjI53Znn11wnD4k90G=w1000"
    },
    {
        roomType: "Bathroom",
        roomDescription: "",
        imageLink: "https://lh3.googleusercontent.com/d/1rERWm7sKifYsdz365dQE1ZFOO2un22tc=w1000"
    },
    {
        roomType: "Bethroom",
        roomDescription: "10inches/25cm tall matresses in every house.",
        imageLink: "https://lh3.googleusercontent.com/d/1MATVhjV7Y1GUS9mAB0RPZDr7kQEVTM3V=w1000"
    },
    {
        roomType: "Livingroom",
        roomDescription: "We're available 24/7 in case you need any help.",
        imageLink: "https://lh3.googleusercontent.com/d/1sDCA9Limfi4RLW2alJF7Avk37ZLinAue=w1000"
    },

]
export const ArekaImageDescriptionsES: IImageDescription[] = [
    {
        roomType: "Dormitorio",
        roomDescription: "",
        imageLink: "https://lh3.googleusercontent.com/d/1LJSpQlE5C5C42FEz7M91Pjv4q7QRi-z6=w1000"
    },
    {
        roomType: "Baño",
        roomDescription: "Siempre proporcionamos toallas y artículos de aseo.",
        imageLink: "https://lh3.googleusercontent.com/d/1K4SdPnue6pq2HloAAqiS1WZXmc2TlTGb=w1000"
    },
    {
        roomType: "Sala de Estar",
        roomDescription: "100Mbps de Wifi gratis en toda tu casa.",
        imageLink: "https://lh3.googleusercontent.com/d/1JLwZIir6MROytS_WMo1anNRyXcbEikJf=w1000"
    },
    {
        roomType: "Jardín",
        roomDescription: "Parqueo privado gratuito.",
        imageLink: "https://lh3.googleusercontent.com/d/1WhqgYtaq3igaScss30mUr9Vm9xF67Sxn=w1000"
    },
    {
        roomType: "Terraza",
        roomDescription: "Ofrecemos descuentos last-minute para reservas de último minuto.",
        imageLink: "https://lh3.googleusercontent.com/d/10OwN88Pw4C-8CvALS8tz7Tor_Vt1RO6J=w1000"
    },
    {
        roomType: "Cocina",
        roomDescription: "Microondas, cafetera y licuadora incluidos.",
        imageLink: "https://lh3.googleusercontent.com/d/1qJrVlpa3UVaLStmjI53Znn11wnD4k90G=w1000"
    },
    {
        roomType: "Baño",
        roomDescription: "",
        imageLink: "https://lh3.googleusercontent.com/d/1rERWm7sKifYsdz365dQE1ZFOO2un22tc=w1000"
    },
    {
        roomType: "Dormitorio",
        roomDescription: "Colchones de 10pulgadas/25cm.",
        imageLink: "https://lh3.googleusercontent.com/d/1MATVhjV7Y1GUS9mAB0RPZDr7kQEVTM3V=w1000"
    },
    {
        roomType: "Sala de Estar",
        roomDescription: "Siempre estamos disponibles para ayudarte con cualquier pregunta o inquietud que puedas tener.",
        imageLink: "https://lh3.googleusercontent.com/d/1sDCA9Limfi4RLW2alJF7Avk37ZLinAue=w1000"
    }
];

export const PlumeriaImageDescriptions: IImageDescription[] = [
    {
        roomType: "Bedroom",
        roomDescription: "We're available 24/7 in case you need any help. ",
        imageLink: "https://lh3.googleusercontent.com/d/1JGQiusfHscT4pSE-1KpejP0uNLUBOTa-=w1000"
    },
    {
        roomType: "Kitchen",
        roomDescription: "Microwave, coffeemaker and blender also included.",
        imageLink: "https://lh3.googleusercontent.com/d/1_tsBq9D5vzz0ozq6DgfAMA3BaLC3is-O=w1000"
    },
    {
        roomType: "Kitchen",
        roomDescription: "We offer last-minute discounts, prices are updated daily!",
        imageLink: "https://lh3.googleusercontent.com/d/1Yt3dRvt3I0gE7OX8DMZ1x1ax-B8ly78T=w1000"
    },
    {
        roomType: "Bathroom",
        roomDescription: "100Mbps Free Wifi everywhere in your house.",
        imageLink: "https://lh3.googleusercontent.com/d/13tzWvEYl-b6x32kJxPV4W-1--01A9z9K=w1000"
    },
    {
        roomType: "Terrace",
        roomDescription: "Free private parking",
        imageLink: "https://lh3.googleusercontent.com/d/1oR1cdPpg6HHGJOqKGVakPiNNYkK8gBtU=w1000"
    },
    {
        roomType: "Bathroom",
        roomDescription: "We always provide towels and toiletries.",
        imageLink: "https://lh3.googleusercontent.com/d/1SsDAb6YcODSPd3ByNtoKIOu4R8j28jFK=w1000"
    }
]
export const PlumeriaImageDescriptionsES: IImageDescription[] = [
    {
        roomType: "Dormitorio",
        roomDescription: "Siempre estamos disponibles para ayudarte con cualquier pregunta o inquietud que puedas tener.",
        imageLink: "https://lh3.googleusercontent.com/d/1JGQiusfHscT4pSE-1KpejP0uNLUBOTa-=w1000"
    },
    {
        roomType: "Cocina",
        roomDescription: "Microondas, cafetera y licuadora incluidos.",
        imageLink: "https://lh3.googleusercontent.com/d/1_tsBq9D5vzz0ozq6DgfAMA3BaLC3is-O=w1000"
    },
    {
        roomType: "Cocina",
        roomDescription: "Ofrecemos descuentos last-minute para reservas de último minuto.",
        imageLink: "https://lh3.googleusercontent.com/d/1Yt3dRvt3I0gE7OX8DMZ1x1ax-B8ly78T=w1000"
    },
    {
        roomType: "Baño",
        roomDescription: "100Mbps de Wifi gratis en toda tu casa.",
        imageLink: "https://lh3.googleusercontent.com/d/13tzWvEYl-b6x32kJxPV4W-1--01A9z9K=w1000"
    },
    {
        roomType: "Terraza",
        roomDescription: "Parqueo privado gratuito.",
        imageLink: "https://lh3.googleusercontent.com/d/1oR1cdPpg6HHGJOqKGVakPiNNYkK8gBtU=w1000"
    },
    {
        roomType: "Baño",
        roomDescription: "Siempre proporcionamos toallas y artículos de aseo.",
        imageLink: "https://lh3.googleusercontent.com/d/1SsDAb6YcODSPd3ByNtoKIOu4R8j28jFK=w1000"
    }
];

export const GiuliaImageDescriptions: IImageDescription[] = [
    {
        roomType: "Livingroom",
        roomDescription: "100Mbps Free Wifi everywhere in your house.",
        imageLink: "https://lh3.googleusercontent.com/d/1yKDSO3SRCADMUeXB3mu4nTmajFdRhRqI=w1000"
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "10inches/25cm tall matresses in every house.",
        imageLink: "https://lh3.googleusercontent.com/d/15YzK9sR2-30k979pFEvSQaSWUaL70I4S=w1000"
    },
    {
        roomType: "Second Bedroom",
        roomDescription: "Bed Linens always included.",
        imageLink: "https://lh3.googleusercontent.com/d/1Lp1mJ-Tgwc8WMnMOvKN2oT9wobpNOLqX=w1000"
    },
    {
        roomType: "Bathroom 2",
        roomDescription: "We're available 24/7 in case you need any help.",
        imageLink: "https://lh3.googleusercontent.com/d/1LX-7Iic67neRM_w79FdmyrWDxdJiJfBr=w1000"
    },
    {
        roomType: "Terrace",
        roomDescription: "Free private parking.",
        imageLink: "https://lh3.googleusercontent.com/d/1bbRn5NLsJ8cKqm0I697TMNT5z9iDASxF=w1000"
    },
    {
        roomType: "Bathroom 1",
        roomDescription: "We always provide towels and toiletries.",
        imageLink: "https://lh3.googleusercontent.com/d/1yI3aOb2sL_IiO-6lOUbxi1TBAL650Mvd=w1000"
    },
    {
        roomType: "Kitchen",
        roomDescription: "Microwave, coffeemaker and blender also included.",
        imageLink: "https://lh3.googleusercontent.com/d/1xiRDZCWwEnvjnGLEGE1WkrUyo6iwnOHi=w1000"
    },
    {
        roomType: "Master Bedroom",
        roomDescription: "This room has a TV with a Roku Entertainment System and HDMI port.",
        imageLink: "https://lh3.googleusercontent.com/d/1HcR7jVW9GqLhV-X5_Luh0OWpZSIMDjHd=w1000"
    },
    {
        roomType: "Kitchen",
        roomDescription: "We offer last-minute discounts, prices are updated daily!",
        imageLink: "https://lh3.googleusercontent.com/d/1PPdoFxDWLSizWhHUIQ7i5W7K1WU09sTm=w1000"
    }

]
export const GiuliaImageDescriptionsES: IImageDescription[] = [
    {
        roomType: "Sala de Estar",
        roomDescription: "100Mbps de Wifi gratis en toda tu casa.",
        imageLink: "https://lh3.googleusercontent.com/d/1yKDSO3SRCADMUeXB3mu4nTmajFdRhRqI=w1000"
    },
    {
        roomType: "Cuarto Principal",
        roomDescription: "Colchones de 10pulgadas/25cm.",
        imageLink: "https://lh3.googleusercontent.com/d/15YzK9sR2-30k979pFEvSQaSWUaL70I4S=w1000"
    },
    {
        roomType: "Segundo Dormitorio",
        roomDescription: "Ropa de cama siempre incluida.",
        imageLink: "https://lh3.googleusercontent.com/d/1Lp1mJ-Tgwc8WMnMOvKN2oT9wobpNOLqX=w1000"
    },
    {
        roomType: "Baño 2",
        roomDescription: "Siempre estamos disponibles para ayudarte con cualquier pregunta o inquietud que puedas tener.",
        imageLink: "https://lh3.googleusercontent.com/d/1LX-7Iic67neRM_w79FdmyrWDxdJiJfBr=w1000"
    },
    {
        roomType: "Terraza",
        roomDescription: "Parqueo privado gratuito.",
        imageLink: "https://lh3.googleusercontent.com/d/1bbRn5NLsJ8cKqm0I697TMNT5z9iDASxF=w1000"
    },
    {
        roomType: "Baño 1",
        roomDescription: "Siempre proporcionamos toallas y artículos de aseo.",
        imageLink: "https://lh3.googleusercontent.com/d/1yI3aOb2sL_IiO-6lOUbxi1TBAL650Mvd=w1000"
    },
    {
        roomType: "Cocina",
        roomDescription: "Microondas, cafetera y licuadora incluidos.",
        imageLink: "https://lh3.googleusercontent.com/d/1xiRDZCWwEnvjnGLEGE1WkrUyo6iwnOHi=w1000"
    },
    {
        roomType: "Cuarto Principal",
        roomDescription: "Esta habitación tiene un televisor con un sistema de entretenimiento Roku y puerto HDMI.",
        imageLink: "https://lh3.googleusercontent.com/d/1HcR7jVW9GqLhV-X5_Luh0OWpZSIMDjHd=w1000"
    },
    {
        roomType: "Cocina",
        roomDescription: "Ofrecemos descuentos last-minute para reservas de último minuto.",
        imageLink: "https://lh3.googleusercontent.com/d/1PPdoFxDWLSizWhHUIQ7i5W7K1WU09sTm=w1000"
    }
];

export const ribHouseDataEngList: HouseDataType[] = [
    {
        name: "Villa Mar",
        guestNumber: 2,
        location: "Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "",
        neighborhood: "",
        houseCode: 5,
        houseLangCode: "VillaMar",
        parking: false,
        image: "https://lh3.googleusercontent.com/d/1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn=w1000",
        amenities: [
            {
                name: "Private Pool, Exclusive for guests of this villa",
                icon: "pool"
            },
            {
                name: "Private Equipped Bathroom",
                icon: "bath"
            },
            {
                name: "Private Equipped Kitchen",
                icon: "kitchen"
            },
            {
                name: "2 A/C Units",
                icon: "ac"
            },
            {
                name: "Private unfenced Parking",
                icon: "parking"
            },
            {
                name: "100Mbps WiFi",
                icon: "wifi"
            }
        ],
    },
    {
        name: "Villa Coral",
        guestNumber: 2,
        location: "Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "",
        neighborhood: "",
        houseCode: 6,
        houseLangCode: "VillaCoral",
        image: "https://lh3.googleusercontent.com/d/1frKDGGLk1nJQQaxoxng6TgmUVzxTx08A=w1000",
        parking: false,
        amenities: [
            {
                name: "Private Pool, Exclusive for guests of this villa",
                icon: "pool"
            },
            {
                name: "Private Equipped Bathroom",
                icon: "bath"
            },
            {
                name: "Private Equipped Kitchen",
                icon: "kitchen"
            },
            {
                name: "2 A/C Units",
                icon: "ac"
            },
            {
                name: "Private unfenced Parking",
                icon: "parking"
            },
            {
                name: "100Mbps WiFi",
                icon: "wifi"
            }
        ],
    }]
export const houseDataEngList: HouseDataType[] = [
    {
        name: "Casa Geco",
        guestNumber: 5,
        location: "Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "Located in the heart of town, this house has space for up to 5 people and features a fully equipped kitchen, a bathroom, 2 A/C units, and a private parking lot. Our prime location offers easy access to both the town center and the most beautiful beaches that Puerto Viejo has to offer.<br/>   Most shops and restaurants are just a short walk away, and there is a nearby jungle path that runs along the ocean and leads to natural pools in the coral and to Cocles.<br/>    All of the spaces described here are private, including the fully equipped kitchen and bathroom. You'll have everything you need to make yourself at home.<br/>    We offer cleaning services for reservations of 5 nights or longer. Our team will contact you during your stay to coordinate a convenient time for the cleaning.<br/>   Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.<br/>    If you require a pack- and - play crib during your stay, please inform us ahead of time. We'll make sure to set it up in your room during our cleaning process.",
        neighborhood: "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.<br/>    The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!<br/>    Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space. Additionally, we have a charging station by the bakery.",
        houseCode: 1,
        houseLangCode: "Geco",
        parking: true,

        image: "https://lh3.googleusercontent.com/d/1tYQxiwEXhxhv2r0_mJQhXVAHOMrE0y_2=w1000",
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
        name: "Casa Rana",
        guestNumber: 5,
        location: "Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "Nestled in the heart of town, this charming house comfortably accommodates up to 5 guests. It boasts a fully equipped kitchen, a bathroom, two A/C units, and a private parking space. Our prime location ensures easy access to both the town center and the beaches of Puerto Viejo.<br/>     The house offers complete privacy, with all described spaces, including the kitchen and bathroom, exclusively for your use. You'll have all the amenities needed to feel at home.<br/>     You'll find most shops and restaurants within a short walking distance. Additionally, a nearby jungle path along the ocean leads to natural coral pools and Cocles.<br/>     Have a special request? We are happy to accommodate if possible. Please don't hesitate to let us know.<br/>     We strongly recommend this option if you are planning to travel with your pet, as it offers a small, fenced garden.",
        neighborhood: "Puerto Viejo is a well known destination for tourists from around the globe. The town features beautiful beaches bordered by lush tropical rainforest and is home to two National Parks, Manzanillo and Cahuita. At night, Puerto Viejo transforms with a vibrant nightlife scene. Staying here allows you to fully experience everything that makes Puerto Viejo special.<br/>     The house is conveniently situated near a beach path that eventually leads to Cocles. Along the path, you'll have the chance to observe diverse wildlife and enjoy natural coral pools. There's even a hidden sightseeing spot to discover!<br/>     Getting around Puerto Viejo and its vicinity is best done by renting a bike or a scooter. Additionally, the public bus service is available, connecting you to Cahuita, Manzanillo, and Sixaola. If you prefer driving, we can accommodate cars and provide private parking. Please inform us if you have a larger pickup truck that requires extra space.",
        houseCode: 2,
        houseLangCode: "Rana",
        image: "https://lh3.googleusercontent.com/d/1UiGI8gFf6UR5kn8Eo30u457NX8NkP95X=w1000",
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
        name: "Casa Tucano",
        guestNumber: 5,
        location: "Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "This house offers a delightful experience in the heart of Puerto Viejo with a charming wooden apartment located above an Italian bakery. The apartment features two comfortable bedrooms, a well-equipped bathroom, a fully equipped kitchen, a lovely terrace, and two A/C units, ensuring a cozy stay.<br/>    These apartments provide private spaces, including the kitchen and bathroom, offering everything you need to feel at home. For stays of 5 nights or more, we provide complimentary cleaning services, and our team will coordinate a suitable time with you during your visit.<br/>    If you have any special requests, we're happy to accommodate them whenever possible, so don't hesitate to let us know. Should you need a pack-and-play crib for your stay, please inform us in advance, and we'll ensure it's set up in your room during the cleaning process.",
        neighborhood: "Puerto Viejo attracts visitors from all over the globe with its breathtaking landscapes. The town is renowned for its expansive beaches bordered by tropical rainforests and features two National Parks, Manzanillo and Cahuita. The nightlife here is vibrant and lively, offering a unique experience after dark. Staying in Puerto Viejo allows you to fully immerse yourself in its unique charm.<br/>    Our house is conveniently located near a beach path that leads eventually to Cocles. On your way, you can observe a variety of wildlife and enjoy the natural coral pools. A hidden sightseeing spot is also waiting to be explored!.<br/>    Exploring Puerto Viejo and its surroundings is most convenient by renting a bike or a scooter. Additionally, there is a good public bus service available that connects you to Cahuita, Manzanillo, and Sixaola. If you prefer driving, we provide private parking. Please inform us if you have a larger pickup truck that needs extra space.",
        houseCode: 3,
        houseLangCode: "Tucano",
        image: "https://lh3.googleusercontent.com/d/10qvLOMLs4_JsBIF99igVeh4baDR7EB-Q=w1000",
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
        name: "Casa Pappagallo",
        guestNumber: 5,
        location: "Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "Welcome to Kalawala, a charming complex of two apartments located in the heart of Puerto Viejo. Each apartment is built entirely of wood and is situated above a delightful Italian bakery. The apartments are equipped with everything you need for a comfortable stay, including a fully equipped kitchen, two cozy bedrooms, a lovely terrace, two A/C units, and one well equipped bathroom.<br/>    All of the spaces described here are private, including the fully equipped kitchen and bathroom. You'll have everything you need to make yourself at home.<br/>    We offer cleaning services for reservations of 5 nights or longer. Our team will contact you during your stay to coordinate a convenient time for the cleaning.<br/>    Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.<br/>    If you require a pack - and - play crib during your stay, please inform us ahead of time. We'll make sure to set it up in your room during our cleaning process.",
        neighborhood: "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.<br/>    The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!<br/>    Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space. Additionally, we have a charging station by the bakery.",
        houseCode: 4,
        houseLangCode: "Pappagallo",
        image: "https://lh3.googleusercontent.com/d/1owhxss4VVXLLJAQP1ByDyBMH_NwQsIuY=w1000",
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
        name: "Casa Delfines",
        guestNumber: 6,
        location: "Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "Welcome to Reservas Kalawala. Located in the heart of town, this house accommodates up to 6 guests with fully equipped kitchen, bathroom, 2 A/C units (not in kitchen or living room), and private parking. Our prime location offers easy access to both the town center and the most beautiful beaches that Puerto Viejo has to offer.<br/>    All of the spaces described here are private, including the fully equipped kitchen and bathroom. You'll have everything you need to make yourself at home.<br/>    We offer Automated check-in and check-out with lockbox key drop-off for your convenience.<br/>    Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.",
        neighborhood: "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.<br/>    The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!<br/>    Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private fenced parking.",
        houseCode: 10,
        houseLangCode: "Delfin",
        image: "https://lh3.googleusercontent.com/d/1ui0cNzHTb2WM-k59OkwnJXw77m0P7PPW=w1000",
        parking: true,
        amenities: [
            {
                name: "2 Private Equipped Bathroom",
                icon: "bath"
            },
            {
                name: "Private Equipped Kitchen",
                icon: "kitchen"
            },
            {
                name: "Bedrooms with A/C",
                icon: "ac"
            },
            {
                name: "Private Fenced Parking",
                icon: "parking"
            },
            {
                name: "100Mbps WiFi",
                icon: "wifi"
            }
        ],
    }]

export const houseDataList: HouseDataType[] = [
    {
        name: "Casa Geco",
        guestNumber: 5,
        location: "Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "Located in the heart of town, this house has space for up to 5 people and features a fully equipped kitchen, a bathroom, 2 A/C units, and a private parking lot. Our prime location offers easy access to both the town center and the most beautiful beaches that Puerto Viejo has to offer.<br/>   Most shops and restaurants are just a short walk away, and there is a nearby jungle path that runs along the ocean and leads to natural pools in the coral and to Cocles.<br/>    All of the spaces described here are private, including the fully equipped kitchen and bathroom. You'll have everything you need to make yourself at home.<br/>    We offer cleaning services for reservations of 5 nights or longer. Our team will contact you during your stay to coordinate a convenient time for the cleaning.<br/>   Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.<br/>    If you require a pack- and - play crib during your stay, please inform us ahead of time. We'll make sure to set it up in your room during our cleaning process.",
        neighborhood: "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.<br/>    The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!<br/>    Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space. Additionally, we have a charging station by the bakery.",
        houseCode: 1,
        houseLangCode: "Geco",

        parking: true,
        image: "https://lh3.googleusercontent.com/d/1tYQxiwEXhxhv2r0_mJQhXVAHOMrE0y_2=w1000",
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
        name: "Casa Rana",
        guestNumber: 5,
        location: "Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "Nestled in the heart of town, this charming house comfortably accommodates up to 5 guests. It boasts a fully equipped kitchen, a bathroom, two A/C units, and a private parking space. Our prime location ensures easy access to both the town center and the beaches of Puerto Viejo.<br/>     The house offers complete privacy, with all described spaces, including the kitchen and bathroom, exclusively for your use. You'll have all the amenities needed to feel at home.<br/>     You'll find most shops and restaurants within a short walking distance. Additionally, a nearby jungle path along the ocean leads to natural coral pools and Cocles.<br/>     Have a special request? We are happy to accommodate if possible. Please don't hesitate to let us know.<br/>     We strongly recommend this option if you are planning to travel with your pet, as it offers a small, fenced garden.",
        neighborhood: "Puerto Viejo is a well known destination for tourists from around the globe. The town features beautiful beaches bordered by lush tropical rainforest and is home to two National Parks, Manzanillo and Cahuita. At night, Puerto Viejo transforms with a vibrant nightlife scene. Staying here allows you to fully experience everything that makes Puerto Viejo special.<br/>     The house is conveniently situated near a beach path that eventually leads to Cocles. Along the path, you'll have the chance to observe diverse wildlife and enjoy natural coral pools. There's even a hidden sightseeing spot to discover!<br/>     Getting around Puerto Viejo and its vicinity is best done by renting a bike or a scooter. Additionally, the public bus service is available, connecting you to Cahuita, Manzanillo, and Sixaola. If you prefer driving, we can accommodate cars and provide private parking. Please inform us if you have a larger pickup truck that requires extra space.",
        houseCode: 2,
        houseLangCode: "Rana",

        image: "https://lh3.googleusercontent.com/d/1UiGI8gFf6UR5kn8Eo30u457NX8NkP95X=w1000",
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
        name: "Casa Tucano",
        guestNumber: 5,
        location: "Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "This house offers a delightful experience in the heart of Puerto Viejo with a charming wooden apartment located above an Italian bakery. The apartment features two comfortable bedrooms, a well-equipped bathroom, a fully equipped kitchen, a lovely terrace, and two A/C units, ensuring a cozy stay.<br/>    These apartments provide private spaces, including the kitchen and bathroom, offering everything you need to feel at home. For stays of 5 nights or more, we provide complimentary cleaning services, and our team will coordinate a suitable time with you during your visit.<br/>    If you have any special requests, we're happy to accommodate them whenever possible, so don't hesitate to let us know. Should you need a pack-and-play crib for your stay, please inform us in advance, and we'll ensure it's set up in your room during the cleaning process.",
        neighborhood: "Puerto Viejo attracts visitors from all over the globe with its breathtaking landscapes. The town is renowned for its expansive beaches bordered by tropical rainforests and features two National Parks, Manzanillo and Cahuita. The nightlife here is vibrant and lively, offering a unique experience after dark. Staying in Puerto Viejo allows you to fully immerse yourself in its unique charm.<br/>    Our house is conveniently located near a beach path that leads eventually to Cocles. On your way, you can observe a variety of wildlife and enjoy the natural coral pools. A hidden sightseeing spot is also waiting to be explored!.<br/>    Exploring Puerto Viejo and its surroundings is most convenient by renting a bike or a scooter. Additionally, there is a good public bus service available that connects you to Cahuita, Manzanillo, and Sixaola. If you prefer driving, we provide private parking. Please inform us if you have a larger pickup truck that needs extra space.",
        houseCode: 3,
        houseLangCode: "Tucano",
        image: "https://lh3.googleusercontent.com/d/10qvLOMLs4_JsBIF99igVeh4baDR7EB-Q=w1000",
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
                name: "Outside Parking",
                icon: "parking"
            },
            {
                name: "Pet Friendly",
                icon: "pet"
            }

        ],
    },

    {
        name: "Casa Pappagallo",
        guestNumber: 5,
        location: "Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "Welcome to Kalawala, a charming complex of two apartments located in the heart of Puerto Viejo. Each apartment is built entirely of wood and is situated above a delightful Italian bakery. The apartments are equipped with everything you need for a comfortable stay, including a fully equipped kitchen, two cozy bedrooms, a lovely terrace, two A/C units, and one well equipped bathroom.<br/>    All of the spaces described here are private, including the fully equipped kitchen and bathroom. You'll have everything you need to make yourself at home.<br/>    We offer cleaning services for reservations of 5 nights or longer. Our team will contact you during your stay to coordinate a convenient time for the cleaning.<br/>    Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.<br/>    If you require a pack - and - play crib during your stay, please inform us ahead of time. We'll make sure to set it up in your room during our cleaning process.",
        neighborhood: "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.<br/>    The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!<br/>    Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space. Additionally, we have a charging station by the bakery.",
        houseCode: 4,
        houseLangCode: "Pappagallo",
        image: "https://lh3.googleusercontent.com/d/1owhxss4VVXLLJAQP1ByDyBMH_NwQsIuY=w1000",
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
                name: "Outside Parking",
                icon: "parking"
            },
            {
                name: "Pet Friendly",
                icon: "pet"
            }
        ],
    },
    {
        name: "Casa Geco",
        guestNumber: 5,
        location: "AAA Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "Located in the heart of town, this house has space for up to 5 people and features a fully equipped kitchen, a bathroom, 2 A/C units, and a private parking lot. Our prime location offers easy access to both the town center and the most beautiful beaches that Puerto Viejo has to offer.<br/>   Most shops and restaurants are just a short walk away, and there is a nearby jungle path that runs along the ocean and leads to natural pools in the coral and to Cocles.<br/>    All of the spaces described here are private, including the fully equipped kitchen and bathroom. You'll have everything you need to make yourself at home.<br/>    We offer cleaning services for reservations of 5 nights or longer. Our team will contact you during your stay to coordinate a convenient time for the cleaning.<br/>   Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.<br/>    If you require a pack- and - play crib during your stay, please inform us ahead of time. We'll make sure to set it up in your room during our cleaning process.",
        neighborhood: "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.<br/>    The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!<br/>    Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space. Additionally, we have a charging station by the bakery.",
        houseCode: 1,
        parking: true,
        houseLangCode: "GecoES",
        image: "https://lh3.googleusercontent.com/d/1tYQxiwEXhxhv2r0_mJQhXVAHOMrE0y_2=w1000",
        amenities: [
            {
                name: "Baño Privado Equipado",
                icon: "bath"
            },
            {
                name: "Cocina Privada Equipada",
                icon: "kitchen"
            },
            {
                name: "A/C",
                icon: "ac"
            },
            {
                name: "Parqueo Privado Encerrado",
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
        name: "Casa Rana",
        guestNumber: 5,
        location: "AAA Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "Nestled in the heart of town, this charming house comfortably accommodates up to 5 guests. It boasts a fully equipped kitchen, a bathroom, two A/C units, and a private parking space. Our prime location ensures easy access to both the town center and the beaches of Puerto Viejo.<br/>     The house offers complete privacy, with all described spaces, including the kitchen and bathroom, exclusively for your use. You'll have all the amenities needed to feel at home.<br/>     You'll find most shops and restaurants within a short walking distance. Additionally, a nearby jungle path along the ocean leads to natural coral pools and Cocles.<br/>     Have a special request? We are happy to accommodate if possible. Please don't hesitate to let us know.<br/>     We strongly recommend this option if you are planning to travel with your pet, as it offers a small, fenced garden.",
        neighborhood: "Puerto Viejo is a well known destination for tourists from around the globe. The town features beautiful beaches bordered by lush tropical rainforest and is home to two National Parks, Manzanillo and Cahuita. At night, Puerto Viejo transforms with a vibrant nightlife scene. Staying here allows you to fully experience everything that makes Puerto Viejo special.<br/>     The house is conveniently situated near a beach path that eventually leads to Cocles. Along the path, you'll have the chance to observe diverse wildlife and enjoy natural coral pools. There's even a hidden sightseeing spot to discover!<br/>     Getting around Puerto Viejo and its vicinity is best done by renting a bike or a scooter. Additionally, the public bus service is available, connecting you to Cahuita, Manzanillo, and Sixaola. If you prefer driving, we can accommodate cars and provide private parking. Please inform us if you have a larger pickup truck that requires extra space.",
        houseCode: 2,
        houseLangCode: "RanaES",
        image: "https://lh3.googleusercontent.com/d/1UiGI8gFf6UR5kn8Eo30u457NX8NkP95X=w1000",
        parking: true,
        amenities: [
            {
                name: "Baño Privado Equipado",
                icon: "bath"
            },
            {
                name: "Cocina Privada Equipada",
                icon: "kitchen"
            },
            {
                name: "A/C",
                icon: "ac"
            },
            {
                name: "Parqueo Privado Encerrado",
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
        name: "Casa Tucano",
        guestNumber: 5,
        location: "AAA Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "This house offers a delightful experience in the heart of Puerto Viejo with a charming wooden apartment located above an Italian bakery. The apartment features two comfortable bedrooms, a well-equipped bathroom, a fully equipped kitchen, a lovely terrace, and two A/C units, ensuring a cozy stay.<br/>    These apartments provide private spaces, including the kitchen and bathroom, offering everything you need to feel at home. For stays of 5 nights or more, we provide complimentary cleaning services, and our team will coordinate a suitable time with you during your visit.<br/>    If you have any special requests, we're happy to accommodate them whenever possible, so don't hesitate to let us know. Should you need a pack-and-play crib for your stay, please inform us in advance, and we'll ensure it's set up in your room during the cleaning process.",
        neighborhood: "Puerto Viejo attracts visitors from all over the globe with its breathtaking landscapes. The town is renowned for its expansive beaches bordered by tropical rainforests and features two National Parks, Manzanillo and Cahuita. The nightlife here is vibrant and lively, offering a unique experience after dark. Staying in Puerto Viejo allows you to fully immerse yourself in its unique charm.<br/>    Our house is conveniently located near a beach path that leads eventually to Cocles. On your way, you can observe a variety of wildlife and enjoy the natural coral pools. A hidden sightseeing spot is also waiting to be explored!.<br/>    Exploring Puerto Viejo and its surroundings is most convenient by renting a bike or a scooter. Additionally, there is a good public bus service available that connects you to Cahuita, Manzanillo, and Sixaola. If you prefer driving, we provide private parking. Please inform us if you have a larger pickup truck that needs extra space.",
        houseCode: 3,
        houseLangCode: "TucanoES",
        image: "https://lh3.googleusercontent.com/d/10qvLOMLs4_JsBIF99igVeh4baDR7EB-Q=w1000",
        parking: false,
        amenities: [
            {
                name: "Baño Privado Equipado",
                icon: "bath"
            },
            {
                name: "Cocina Privada Equipada",
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
                name: "Parqueo Externo",
                icon: "parking"
            },
            {
                name: "Pet Friendly",
                icon: "pet"
            }

        ],
    },

    {
        name: "Casa Pappagallo",
        guestNumber: 5,
        location: "AAA Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "Welcome to Kalawala, a charming complex of two apartments located in the heart of Puerto Viejo. Each apartment is built entirely of wood and is situated above a delightful Italian bakery. The apartments are equipped with everything you need for a comfortable stay, including a fully equipped kitchen, two cozy bedrooms, a lovely terrace, two A/C units, and one well equipped bathroom.<br/>    All of the spaces described here are private, including the fully equipped kitchen and bathroom. You'll have everything you need to make yourself at home.<br/>    We offer cleaning services for reservations of 5 nights or longer. Our team will contact you during your stay to coordinate a convenient time for the cleaning.<br/>    Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.<br/>    If you require a pack - and - play crib during your stay, please inform us ahead of time. We'll make sure to set it up in your room during our cleaning process.",
        neighborhood: "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.<br/>    The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!<br/>    Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space. Additionally, we have a charging station by the bakery.",
        houseCode: 4,
        houseLangCode: "PappagalloES",
        image: "https://lh3.googleusercontent.com/d/1owhxss4VVXLLJAQP1ByDyBMH_NwQsIuY=w1000",
        parking: false,
        amenities: [
            {
                name: "Baño Privado Equipado",
                icon: "bath"
            },
            {
                name: "Cocina Privada Equipada",
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
                name: "Parqueo Externo",
                icon: "parking"
            },
            {
                name: "Pet Friendly",
                icon: "pet"
            }
        ],
    },
    {
        name: "Casa Delfines",
        guestNumber: 6,
        location: "Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "Welcome to Reservas Kalawala. Located in the heart of town, this house accommodates up to 6 guests with fully equipped kitchen, bathroom, 2 A/C units (not in kitchen or living room), and private parking. Our prime location offers easy access to both the town center and the most beautiful beaches that Puerto Viejo has to offer.<br/>    All of the spaces described here are private, including the fully equipped kitchen and bathroom. You'll have everything you need to make yourself at home.<br/>    Do you have a special request? We would be more than happy to accommodate you if we can. Please don't hesitate to let us know.",
        neighborhood: "Puerto Viejo is a popular destination for tourists from all over the world, thanks to its stunning surroundings. The town boasts immense beaches that are surrounded by tropical rainforest, as well as two National Parks (Manzanillo and Cahuita). At night, the town comes alive with a lively and active nightlife scene. When you stay here, you'll be able to fully immerse yourself in everything that makes Puerto Viejo unique.<br/>    The house is located close to beach access that eventually leads to Cocles. Along the way, you'll have the opportunity to spot a variety of animals and admire natural pools in the coral. There's even a hidden sightseeing spot waiting to be discovered!<br/>    Getting around in Puerto Viejo and its surroundings is easiest by renting a bike or a scooter. However, there is also a reliable public bus service available that can take you to Cahuita, Manzanillo, and Sixaola. If you prefer to drive, we can accommodate cars as well. We offer private parking but please let us know if you have a larger pickup truck that requires additional space.",
        houseCode: 10,
        houseLangCode: "Delfin",
        image: "https://lh3.googleusercontent.com/d/1UiGI8gFf6UR5kn8Eo30u457NX8NkP95X=w1000",
        parking: true,
        amenities: [
            {
                name: "2 Private Equipped Bathrooms",
                icon: "bath"
            },
            {
                name: "Private Equipped Kitchen",
                icon: "kitchen"
            },
            {
                name: "Bedrooms with A/C",
                icon: "ac"
            },
            {
                name: "Private Fenced Parking for 2 Vehicles",
                icon: "parking"
            },
            {
                name: "100Mbps WiFi",
                icon: "wifi"
            }
        ],
    },
    {
        name: "Casa Delfines",
        guestNumber: 6,
        location: "AAA Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "Bienvenido a Reservas Kalawala. Ubicada en el corazón del pueblo, esta casa acomoda hasta 6 huéspedes con cocina totalmente equipada, baño, 2 unidades de aire acondicionado (no en cocina o sala de estar), y estacionamiento privado. Nuestra ubicación privilegiada ofrece fácil acceso tanto al centro del pueblo como a las playas más hermosas que Puerto Viejo tiene para ofrecer.<br/>    Todos los espacios descritos aquí son privados, incluyendo la cocina totalmente equipada y el baño. Tendrás todo lo que necesitas para sentirte como en casa.<br/>    ¿Tienes alguna solicitud especial? Estaremos más que felices de complacerte si podemos. Por favor no dudes en hacérnoslo saber.",
        neighborhood: "Puerto Viejo es un destino popular para turistas de todo el mundo, gracias a sus impresionantes alrededores. El pueblo cuenta con playas inmensas rodeadas de selva tropical, así como dos Parques Nacionales (Manzanillo y Cahuita). Por la noche, el pueblo cobra vida con una escena nocturna animada y activa. Cuando te hospedes aquí, podrás sumergirte completamente en todo lo que hace único a Puerto Viejo.<br/>    La casa está ubicada cerca del acceso a la playa que eventualmente lleva a Cocles. En el camino, tendrás la oportunidad de observar una variedad de animales y admirar piscinas naturales en el coral. ¡Incluso hay un lugar de observación oculto esperando ser descubierto!<br/>    Moverse por Puerto Viejo y sus alrededores es más fácil alquilando una bicicleta o un scooter. Sin embargo, también hay un servicio de autobús público confiable disponible que puede llevarte a Cahuita, Manzanillo y Sixaola. Si prefieres conducir, también podemos acomodar autos. Ofrecemos estacionamiento privado, pero por favor avísanos si tienes una camioneta más grande que requiere espacio adicional.",
        houseCode: 10,
        houseLangCode: "DelfinES",
        image: "https://lh3.googleusercontent.com/d/1UiGI8gFf6UR5kn8Eo30u457NX8NkP95X=w1000",
        parking: true,
        amenities: [
            {
                name: "2 Baños Privado Equipado",
                icon: "bath"
            },
            {
                name: "Cocina Privada Equipada",
                icon: "kitchen"
            },
            {
                name: "Cuartos con A/C",
                icon: "ac"
            },
            {
                name: "Parqueo Privado Encerrado",
                icon: "parking"
            },
            {
                name: "100Mbps WiFi",
                icon: "wifi"
            }
        ],
    }
]

export const VillasDataList: HouseDataType[] = [
    {
        name: "Villa Mar",
        guestNumber: 2,
        location: "Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "",
        neighborhood: "",
        houseCode: 5,
        houseLangCode: "VillaMar",
        parking: false,
        image: "https://lh3.googleusercontent.com/d/1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn=w1000",
        amenities: [
            {
                name: "Private Pool",
                icon: "pool"
            },
            {
                name: "Private Equipped Bathroom",
                icon: "bath"
            },
            {
                name: "Private Equipped Kitchen",
                icon: "kitchen"
            },
            {
                name: "2 A/C Units",
                icon: "ac"
            },
            {
                name: "Private unfenced Parking",
                icon: "parking"
            },
            {
                name: "100Mbps WiFi",
                icon: "wifi"
            }
        ],
    },
    {
        name: "Villa Coral",
        guestNumber: 2,
        location: "Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "",
        neighborhood: "",
        houseCode: 6,
        houseLangCode: "VillaCoral",
        image: "https://lh3.googleusercontent.com/d/1frKDGGLk1nJQQaxoxng6TgmUVzxTx08A=w1000",
        parking: false,
        amenities: [
            {
                name: "Private Pool",
                icon: "pool"
            },
            {
                name: "Private Equipped Bathroom",
                icon: "bath"
            },
            {
                name: "Private Equipped Kitchen",
                icon: "kitchen"
            },
            {
                name: "2 A/C Units",
                icon: "ac"
            },
            {
                name: "Private unfenced Parking",
                icon: "parking"
            },
            {
                name: "100Mbps WiFi",
                icon: "wifi"
            }
        ],
    }
]
export const VillasDataListES: HouseDataType[] = [
    {
        name: "Villa Mar",
        guestNumber: 2,
        location: "Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "",
        neighborhood: "",
        houseCode: 5,
        houseLangCode: "VillaMarES",
        image: "https://lh3.googleusercontent.com/d/1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn=w1000",
        parking: false,
        amenities: [
            {
                name: "Piscina Privada",
                icon: "pool"
            },
            {
                name: "Baño Privado Equipado",
                icon: "bath"
            },
            {
                name: "Cocina Privada Equipada",
                icon: "kitchen"
            },
            {
                name: "A/C",
                icon: "ac"
            },
            {
                name: "Parqueo Externo",
                icon: "parking"
            },
            {
                name: "100Mbps WiFi",
                icon: "wifi"
            }
        ],
    },
    {
        name: "Villa Coral",
        guestNumber: 2,
        location: "Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "",
        neighborhood: "",
        houseCode: 6,
        houseLangCode: "VillaCoralES",
        parking: false,
        image: "https://lh3.googleusercontent.com/d/1frKDGGLk1nJQQaxoxng6TgmUVzxTx08A=w1000",
        amenities: [
            {
                name: "Piscina Privada",
                icon: "pool"
            },
            {
                name: "Baño Privado Equipado",
                icon: "bath"
            },
            {
                name: "Cocina Privada Equipada",
                icon: "kitchen"
            },
            {
                name: "A/C",
                icon: "ac"
            },
            {
                name: "Parqueo Externo",
                icon: "parking"
            },
            {
                name: "100Mbps WiFi",
                icon: "wifi"
            }
        ],
    },
]

export const NamDataList: HouseDataType[] = [
    {
        name: "Casa Areka",
        guestNumber: 2,
        location: "Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "",
        neighborhood: "",
        houseCode: 7,
        houseLangCode: "Areka",
        parking: false,
        image: "https://lh3.googleusercontent.com/d/1iHyOve78WkDNdTcQcUtKkiM8rXx2iRey=w1000",
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
                name: "WiFi",
                icon: "wifi"
            },
            {
                name: "Unfenced Parking",
                icon: "parking"
            }
        ],
    },
    {
        name: "Casa Plumeria",
        guestNumber: 2,
        location: "Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "",
        neighborhood: "",
        houseCode: 8,
        houseLangCode: "Plumeria",
        image: "https://lh3.googleusercontent.com/d/1b2x2aVIjqlSws4KePOS_NVb4NItGsra1=w1000",
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
                name: "WiFi",
                icon: "wifi"
            },
            {
                name: "Unfenced Parking",
                icon: "parking"
            }
        ],
    },
    {
        name: "Casa Giulia",
        guestNumber: 4,
        location: "Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "",
        neighborhood: "",
        houseCode: 9,
        houseLangCode: "Giulia",
        parking: false,
        image: "https://lh3.googleusercontent.com/d/1e0esqkSBKBdT-F2kLg5PsyF46zEWtWQ8=w1000",
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
                name: "2 A/C",
                icon: "ac"
            },
            {
                name: "WiFi",
                icon: "wifi"
            },
            {
                name: "Unfenced Parking",
                icon: "parking"
            }
        ],
    },

]

export const NamDataListES: HouseDataType[] = [
    {
        name: "Casa Areka",
        guestNumber: 2,
        location: "Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "",
        neighborhood: "",
        houseCode: 7,
        houseLangCode: "ArekaES",
        parking: false,
        image: "https://lh3.googleusercontent.com/d/1iHyOve78WkDNdTcQcUtKkiM8rXx2iRey=w1000",
        amenities: [
            {
                name: "Baño Privado Equipado",
                icon: "bath"
            },
            {
                name: "Cocina Privada Equipada",
                icon: "kitchen"
            },
            {
                name: "A/C",
                icon: "ac"
            },
            {
                name: "WiFi",
                icon: "wifi"
            },
            {
                name: "Parqueo Externo",
                icon: "parking"
            }
        ],
    },
    {
        name: "Casa Plumeria",
        guestNumber: 2,
        location: "Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "",
        neighborhood: "",
        houseCode: 8,
        houseLangCode: "PlumeriaES",
        image: "https://lh3.googleusercontent.com/d/1b2x2aVIjqlSws4KePOS_NVb4NItGsra1=w1000",
        parking: false,
        amenities: [
            {
                name: "Baño Privado Equipado",
                icon: "bath"
            },
            {
                name: "Cocina Privada Equipada",
                icon: "kitchen"
            },
            {
                name: "A/C",
                icon: "ac"
            },
            {
                name: "WiFi",
                icon: "wifi"
            },
            {
                name: "Parqueo Externo",
                icon: "parking"
            }
        ],
    },
    {
        name: "Casa Giulia",
        guestNumber: 4,
        location: "Playa Chiquita, Puerto Viejo de Talamanca, Limón, Costa Rica",
        description: "",
        neighborhood: "",
        houseCode: 9,
        houseLangCode: "GiuliaES",
        parking: false,
        image: "https://lh3.googleusercontent.com/d/1e0esqkSBKBdT-F2kLg5PsyF46zEWtWQ8=w1000",
        amenities: [
            {
                name: "Baño Privado Equipado",
                icon: "bath"
            },
            {
                name: "Cocina Privada Equipada",
                icon: "kitchen"
            },
            {
                name: "2 A/C",
                icon: "ac"
            },
            {
                name: "WiFi",
                icon: "wifi"
            },
            {
                name: "Parqueo Externo",
                icon: "parking"
            }
        ],
    },

]

/**
 * Guest-facing names by route slug, mirroring the backend property catalog.
 *
 * The search response only carries names for homes that are actually free, so
 * the results page needs its own lookup to name a home that came back taken.
 * Keep in sync with `booking-api/src/propertyCatalog.ts`.
 */
export const PROPERTY_DISPLAY_NAMES: Record<string, string> = {
    Geco: 'Casa Geco',
    Rana: 'Casa Rana',
    Tucano: 'Casa Tucano',
    Pappagallo: 'Casa Pappagallo',
    VillaMar: 'Villa Mar',
    VillaCoral: 'Villa Coral',
    Areka: 'Casa Areka',
    Plumeria: 'Casa Plumeria',
    Giulia: 'Casa Giulia',
    Delfin: 'Casa Delfines',
};

// Bedroom / bathroom counts and sleeping capacity, shown as a fact row at the
// top of every listing page. Keyed like PROPERTY_MARKETING_CONFIG, so both EN
// and ES pages read the same numbers.
//
// maxGuests mirrors `guestNumber` on the matching houseDataList / VillasDataList /
// NamDataList entry (asserted in utils/__tests__/propertyCapacity.test.ts).
// Room counts come from the property descriptions on the listing pages and the
// gallery room types above:
//   Geco / Rana / Tucano / Pappagallo — 2 bedrooms, 1 bathroom (see the Tucano
//     and Pappagallo descriptions, which spell both out)
//   Delfin — 2 bedrooms, 2 bathrooms ("2 bathrooms" in the description)
//   Giulia — 2 bedrooms, 2 bathrooms ("2 private bathrooms" in the description)
//   Areka / Plumeria / Villa Mar / Villa Coral — 1 bedroom, 1 bathroom
export const PROPERTY_CAPACITY: Record<string, PropertyCapacity> = {
    Geco: { bedrooms: 2, bathrooms: 1, maxGuests: 5 },
    Rana: { bedrooms: 2, bathrooms: 1, maxGuests: 5 },
    Tucano: { bedrooms: 2, bathrooms: 1, maxGuests: 5 },
    Pappagallo: { bedrooms: 2, bathrooms: 1, maxGuests: 5 },
    Delfin: { bedrooms: 2, bathrooms: 2, maxGuests: 6 },
    Giulia: { bedrooms: 2, bathrooms: 2, maxGuests: 4 },
    Areka: { bedrooms: 1, bathrooms: 1, maxGuests: 2 },
    Plumeria: { bedrooms: 1, bathrooms: 1, maxGuests: 2 },
    VillaMar: { bedrooms: 1, bathrooms: 1, maxGuests: 2 },
    VillaCoral: { bedrooms: 1, bathrooms: 1, maxGuests: 2 },
};

export const PROPERTY_MARKETING_CONFIG: Record<string, PropertyMarketingContent> = {
    'Rana': {
        propertyKey: 'Rana',
        descriptiveTitle: {
            en: 'Family home, pet friendly with air conditioning',
            es: 'Casa familiar, pet friendly con aire acondicionado',
            de: 'Familienhaus, haustierfreundlich mit Klimaanlage',
            fr: 'Maison familiale, climatisée et adaptée aux animaux',
            it: 'Casa familiare, pet friendly con aria condizionata',
            pt: 'Casa familiar, aceita animais de estimação, com ar condicionado',
            he: 'בית משפחתי, ידידותי לחיות מחמד עם מיזוג אוויר',
            hi: 'पारिवारिक घर, एयर कंडीशनिंग के साथ पालतू-अनुकूल',
            nl: 'Gezinswoning, huisdiervriendelijk met airconditioning'
        },
        price: { crc: 80000, usd: 160 },
        socialStatement: {
            en: 'Chosen for its private internal parking and small garden for pets',
            es: 'Elegida por su parqueo privado interno y pequeño jardín para las mascotas',
            de: 'Ausgewählt wegen des privaten Innenparkplatzes und des kleinen Gartens für Haustiere',
            fr: 'Choisie pour son parking privé intérieur et son petit jardin pour les animaux',
            it: 'Scelta per il suo parcheggio interno privato e il piccolo giardino per gli animali',
            pt: 'Escolhida pelo seu estacionamento interno privado e pequeno jardim para animais de estimação',
            he: 'נבחר בזכות חניה פרטית פנימית וגינה קטנה לחיות מחמד',
            hi: 'निजी आंतरिक पार्किंग और पालतू जानवरों के लिए छोटे बगीचे के कारण चुना गया',
            nl: 'Gekozen vanwege de eigen inpandige parkeerplaats en de kleine tuin voor huisdieren'
        },
        featureHighlights: {
            en: [
                '📍 Walkable location in downtown Puerto Viejo',
                '🏡 Private space for up to 5 people',
                '❄️ A/C in bedrooms',
                '💻 Fast WiFi ideal for remote work',
                '🐾 Pet-friendly with outdoor space'
            ],
            es: [
                '📍 Ubicación caminable en el centro de Puerto Viejo',
                '🏡 Espacio privado para hasta 5 personas',
                '❄️ A/C en habitaciones',
                '💻 WiFi rápido ideal para trabajo remoto',
                '🐾 Pet-friendly con espacio exterior'
            ],
            de: [
                '📍 Fußläufige Lage im Zentrum von Puerto Viejo',
                '🏡 Privater Bereich für bis zu 5 Personen',
                '❄️ Klimaanlage in den Schlafzimmern',
                '💻 Schnelles WLAN, ideal für Remote-Arbeit',
                '🐾 Haustierfreundlich mit Außenbereich'
            ],
            fr: [
                '📍 Emplacement accessible à pied dans le centre de Puerto Viejo',
                '🏡 Espace privé pour jusqu\'à 5 personnes',
                '❄️ Climatisation dans les chambres',
                '💻 WiFi rapide, idéal pour le télétravail',
                '🐾 Adapté aux animaux avec espace extérieur'
            ],
            it: [
                '📍 Posizione raggiungibile a piedi nel centro di Puerto Viejo',
                '🏡 Spazio privato per un massimo di 5 persone',
                '❄️ Aria condizionata nelle camere',
                '💻 WiFi veloce ideale per il lavoro da remoto',
                '🐾 Pet friendly con spazio esterno'
            ],
            pt: [
                '📍 Localização acessível a pé no centro de Puerto Viejo',
                '🏡 Espaço privado para até 5 pessoas',
                '❄️ Ar condicionado nos quartos',
                '💻 Wi-Fi rápido, ideal para trabalho remoto',
                '🐾 Aceita animais de estimação, com espaço exterior'
            ],
            he: [
                '📍 מיקום נגיש ברגל במרכז פוארטו ויחו',
                '🏡 מרחב פרטי לעד 5 אנשים',
                '❄️ מיזוג אוויר בחדרי השינה',
                '💻 WiFi מהיר, אידיאלי לעבודה מרחוק',
                '🐾 ידידותי לחיות מחמד עם שטח חוץ'
            ],
            hi: [
                '📍 डाउनटाउन Puerto Viejo में पैदल दूरी पर स्थान',
                '🏡 5 लोगों तक के लिए निजी स्थान',
                '❄️ बेडरूम में A/C',
                '💻 रिमोट वर्क के लिए तेज़ वाई-फाई',
                '🐾 बाहरी स्थान के साथ पालतू-अनुकूल'
            ],
            nl: [
                '📍 Op loopafstand van het centrum van Puerto Viejo',
                '🏡 Eigen ruimte voor maximaal 5 personen',
                '❄️ Airco in de slaapkamers',
                '💻 Snel wifi, ideaal om op afstand te werken',
                '🐾 Huisdiervriendelijk met buitenruimte'
            ]
        }
    },
    'Geco': {
        propertyKey: 'Geco',
        descriptiveTitle: {
            en: 'Family home, pet friendly with air conditioning',
            es: 'Casa familiar, pet friendly con aire acondicionado',
            de: 'Familienhaus, haustierfreundlich mit Klimaanlage',
            fr: 'Maison familiale, climatisée et adaptée aux animaux',
            it: 'Casa familiare, pet friendly con aria condizionata',
            pt: 'Casa familiar, aceita animais de estimação, com ar condicionado',
            he: 'בית משפחתי, ידידותי לחיות מחמד עם מיזוג אוויר',
            hi: 'पारिवारिक घर, एयर कंडीशनिंग के साथ पालतू-अनुकूल',
            nl: 'Gezinswoning, huisdiervriendelijk met airconditioning'
        },
        price: { crc: 80000, usd: 160 },
        socialStatement: {
            en: 'Chosen for its private internal parking and small garden for pets',
            es: 'Elegida por su parqueo privado interno y pequeño jardín para las mascotas',
            de: 'Ausgewählt wegen des privaten Innenparkplatzes und des kleinen Gartens für Haustiere',
            fr: 'Choisie pour son parking privé intérieur et son petit jardin pour les animaux',
            it: 'Scelta per il suo parcheggio interno privato e il piccolo giardino per gli animali',
            pt: 'Escolhida pelo seu estacionamento interno privado e pequeno jardim para animais de estimação',
            he: 'נבחר בזכות חניה פרטית פנימית וגינה קטנה לחיות מחמד',
            hi: 'निजी आंतरिक पार्किंग और पालतू जानवरों के लिए छोटे बगीचे के कारण चुना गया',
            nl: 'Gekozen vanwege de eigen inpandige parkeerplaats en de kleine tuin voor huisdieren'
        },
        featureHighlights: {
            en: [
                '📍 Walkable location in downtown Puerto Viejo',
                '🏡 Private space for up to 5 people',
                '❄️ A/C in bedrooms',
                '💻 Fast WiFi ideal for remote work',
                '🐾 Pet-friendly with outdoor space'
            ],
            es: [
                '📍 Ubicación caminable en el centro de Puerto Viejo',
                '🏡 Espacio privado para hasta 5 personas',
                '❄️ A/C en habitaciones',
                '💻 WiFi rápido ideal para trabajo remoto',
                '🐾 Pet-friendly con espacio exterior'
            ],
            de: [
                '📍 Fußläufige Lage im Zentrum von Puerto Viejo',
                '🏡 Privater Bereich für bis zu 5 Personen',
                '❄️ Klimaanlage in den Schlafzimmern',
                '💻 Schnelles WLAN, ideal für Remote-Arbeit',
                '🐾 Haustierfreundlich mit Außenbereich'
            ],
            fr: [
                '📍 Emplacement accessible à pied dans le centre de Puerto Viejo',
                '🏡 Espace privé pour jusqu\'à 5 personnes',
                '❄️ Climatisation dans les chambres',
                '💻 WiFi rapide, idéal pour le télétravail',
                '🐾 Adapté aux animaux avec espace extérieur'
            ],
            it: [
                '📍 Posizione raggiungibile a piedi nel centro di Puerto Viejo',
                '🏡 Spazio privato per un massimo di 5 persone',
                '❄️ Aria condizionata nelle camere',
                '💻 WiFi veloce ideale per il lavoro da remoto',
                '🐾 Pet friendly con spazio esterno'
            ],
            pt: [
                '📍 Localização acessível a pé no centro de Puerto Viejo',
                '🏡 Espaço privado para até 5 pessoas',
                '❄️ Ar condicionado nos quartos',
                '💻 Wi-Fi rápido, ideal para trabalho remoto',
                '🐾 Aceita animais de estimação, com espaço exterior'
            ],
            he: [
                '📍 מיקום נגיש ברגל במרכז פוארטו ויחו',
                '🏡 מרחב פרטי לעד 5 אנשים',
                '❄️ מיזוג אוויר בחדרי השינה',
                '💻 WiFi מהיר, אידיאלי לעבודה מרחוק',
                '🐾 ידידותי לחיות מחמד עם שטח חוץ'
            ],
            hi: [
                '📍 डाउनटाउन Puerto Viejo में पैदल दूरी पर स्थान',
                '🏡 5 लोगों तक के लिए निजी स्थान',
                '❄️ बेडरूम में A/C',
                '💻 रिमोट वर्क के लिए तेज़ वाई-फाई',
                '🐾 बाहरी स्थान के साथ पालतू-अनुकूल'
            ],
            nl: [
                '📍 Op loopafstand van het centrum van Puerto Viejo',
                '🏡 Eigen ruimte voor maximaal 5 personen',
                '❄️ Airco in de slaapkamers',
                '💻 Snel wifi, ideaal om op afstand te werken',
                '🐾 Huisdiervriendelijk met buitenruimte'
            ]
        }
    },
    'Tucano': {
        propertyKey: 'Tucano',
        descriptiveTitle: {
            en: 'Central apartment above Italian bakery',
            es: 'Apartamento céntrico sobre panadería italiana',
            de: 'Zentral gelegenes Apartment über einer italienischen Bäckerei',
            fr: 'Appartement central au-dessus d\'une boulangerie italienne',
            it: 'Appartamento centrale sopra una panetteria italiana',
            pt: 'Apartamento central por cima de uma padaria italiana',
            he: 'דירה מרכזית מעל מאפייה איטלקית',
            hi: 'इतालवी बेकरी के ऊपर केंद्रीय अपार्टमेंट',
            nl: 'Centraal gelegen appartement boven een Italiaanse bakkerij'
        },
        price: { crc: 84000, usd: 169 },
        socialStatement: {
            en: 'Chosen for its central location perfect for bars and restaurants',
            es: 'Elegida por su ubicación céntrica perfecta para bares y restaurantes',
            de: 'Ausgewählt wegen seiner zentralen Lage, perfekt für Bars und Restaurants',
            fr: 'Choisi pour son emplacement central, parfait pour les bars et restaurants',
            it: 'Scelto per la sua posizione centrale, perfetta per bar e ristoranti',
            pt: 'Escolhido pela sua localização central, perfeita para bares e restaurantes',
            he: 'נבחרה בזכות המיקום המרכזי, אידיאלי לברים ומסעדות',
            hi: 'बार और रेस्तरां के लिए बिल्कुल सही केंद्रीय स्थान के कारण चुना गया',
            nl: 'Gekozen vanwege de centrale ligging, perfect voor bars en restaurants'
        },
        featureHighlights: {
            en: [
                '📍 Central location above Italian bakery',
                '🏡 Cozy apartment for up to 5 people',
                '❄️ A/C in bedrooms',
                '💻 Fast WiFi ideal for remote work',
                '🍞 15% discount at bakery downstairs'
            ],
            es: [
                '📍 Ubicación céntrica sobre panadería italiana',
                '🏡 Apartamento acogedor para hasta 5 personas',
                '❄️ A/C en habitaciones',
                '💻 WiFi rápido ideal para trabajo remoto',
                '🍞 15% descuento en panadería de abajo'
            ],
            de: [
                '📍 Zentrale Lage über einer italienischen Bäckerei',
                '🏡 Gemütliches Apartment für bis zu 5 Personen',
                '❄️ Klimaanlage in den Schlafzimmern',
                '💻 Schnelles WLAN, ideal für Remote-Arbeit',
                '🍞 15 % Rabatt in der Bäckerei im Erdgeschoss'
            ],
            fr: [
                '📍 Emplacement central au-dessus d\'une boulangerie italienne',
                '🏡 Appartement chaleureux pour jusqu\'à 5 personnes',
                '❄️ Climatisation dans les chambres',
                '💻 WiFi rapide, idéal pour le télétravail',
                '🍞 15 % de réduction à la boulangerie du rez-de-chaussée'
            ],
            it: [
                '📍 Posizione centrale sopra una panetteria italiana',
                '🏡 Appartamento accogliente per un massimo di 5 persone',
                '❄️ Aria condizionata nelle camere',
                '💻 WiFi veloce ideale per il lavoro da remoto',
                '🍞 Sconto del 15% presso la panetteria al piano terra'
            ],
            pt: [
                '📍 Localização central por cima de uma padaria italiana',
                '🏡 Apartamento acolhedor para até 5 pessoas',
                '❄️ Ar condicionado nos quartos',
                '💻 Wi-Fi rápido, ideal para trabalho remoto',
                '🍞 15% de desconto na padaria do rés do chão'
            ],
            he: [
                '📍 מיקום מרכזי מעל מאפייה איטלקית',
                '🏡 דירה נעימה לעד 5 אנשים',
                '❄️ מיזוג אוויר בחדרי השינה',
                '💻 WiFi מהיר, אידיאלי לעבודה מרחוק',
                '🍞 הנחה של 15% במאפייה שבקומה התחתונה'
            ],
            hi: [
                '📍 इतालवी बेकरी के ऊपर केंद्रीय स्थान',
                '🏡 5 लोगों तक के लिए आरामदायक अपार्टमेंट',
                '❄️ बेडरूम में A/C',
                '💻 रिमोट वर्क के लिए तेज़ वाई-फाई',
                '🍞 नीचे की बेकरी में 15% छूट'
            ],
            nl: [
                '📍 Centrale ligging boven een Italiaanse bakkerij',
                '🏡 Gezellig appartement voor maximaal 5 personen',
                '❄️ Airco in de slaapkamers',
                '💻 Snel wifi, ideaal om op afstand te werken',
                '🍞 15% korting bij de bakkerij beneden'
            ]
        }
    },
    'Pappagallo': {
        propertyKey: 'Pappagallo',
        descriptiveTitle: {
            en: 'Central apartment above Italian bakery',
            es: 'Apartamento céntrico sobre panadería italiana',
            de: 'Zentral gelegenes Apartment über einer italienischen Bäckerei',
            fr: 'Appartement central au-dessus d\'une boulangerie italienne',
            it: 'Appartamento centrale sopra una panetteria italiana',
            pt: 'Apartamento central por cima de uma padaria italiana',
            he: 'דירה מרכזית מעל מאפייה איטלקית',
            hi: 'इतालवी बेकरी के ऊपर केंद्रीय अपार्टमेंट',
            nl: 'Centraal gelegen appartement boven een Italiaanse bakkerij'
        },
        price: { crc: 84000, usd: 169 },
        socialStatement: {
            en: 'Chosen for its central location perfect for bars and restaurants',
            es: 'Elegida por su ubicación céntrica perfecta para bares y restaurantes',
            de: 'Ausgewählt wegen seiner zentralen Lage, perfekt für Bars und Restaurants',
            fr: 'Choisi pour son emplacement central, parfait pour les bars et restaurants',
            it: 'Scelto per la sua posizione centrale, perfetta per bar e ristoranti',
            pt: 'Escolhido pela sua localização central, perfeita para bares e restaurantes',
            he: 'נבחרה בזכות המיקום המרכזי, אידיאלי לברים ומסעדות',
            hi: 'बार और रेस्तरां के लिए बिल्कुल सही केंद्रीय स्थान के कारण चुना गया',
            nl: 'Gekozen vanwege de centrale ligging, perfect voor bars en restaurants'
        },
        featureHighlights: {
            en: [
                '📍 Central location above Italian bakery',
                '🏡 Cozy apartment for up to 5 people',
                '❄️ A/C in bedrooms',
                '💻 Fast WiFi ideal for remote work',
                '🍞 15% discount at bakery downstairs'
            ],
            es: [
                '📍 Ubicación céntrica sobre panadería italiana',
                '🏡 Apartamento acogedor para hasta 5 personas',
                '❄️ A/C en habitaciones',
                '💻 WiFi rápido ideal para trabajo remoto',
                '🍞 15% descuento en panadería de abajo'
            ],
            de: [
                '📍 Zentrale Lage über einer italienischen Bäckerei',
                '🏡 Gemütliches Apartment für bis zu 5 Personen',
                '❄️ Klimaanlage in den Schlafzimmern',
                '💻 Schnelles WLAN, ideal für Remote-Arbeit',
                '🍞 15 % Rabatt in der Bäckerei im Erdgeschoss'
            ],
            fr: [
                '📍 Emplacement central au-dessus d\'une boulangerie italienne',
                '🏡 Appartement chaleureux pour jusqu\'à 5 personnes',
                '❄️ Climatisation dans les chambres',
                '💻 WiFi rapide, idéal pour le télétravail',
                '🍞 15 % de réduction à la boulangerie du rez-de-chaussée'
            ],
            it: [
                '📍 Posizione centrale sopra una panetteria italiana',
                '🏡 Appartamento accogliente per un massimo di 5 persone',
                '❄️ Aria condizionata nelle camere',
                '💻 WiFi veloce ideale per il lavoro da remoto',
                '🍞 Sconto del 15% presso la panetteria al piano terra'
            ],
            pt: [
                '📍 Localização central por cima de uma padaria italiana',
                '🏡 Apartamento acolhedor para até 5 pessoas',
                '❄️ Ar condicionado nos quartos',
                '💻 Wi-Fi rápido, ideal para trabalho remoto',
                '🍞 15% de desconto na padaria do rés do chão'
            ],
            he: [
                '📍 מיקום מרכזי מעל מאפייה איטלקית',
                '🏡 דירה נעימה לעד 5 אנשים',
                '❄️ מיזוג אוויר בחדרי השינה',
                '💻 WiFi מהיר, אידיאלי לעבודה מרחוק',
                '🍞 הנחה של 15% במאפייה שבקומה התחתונה'
            ],
            hi: [
                '📍 इतालवी बेकरी के ऊपर केंद्रीय स्थान',
                '🏡 5 लोगों तक के लिए आरामदायक अपार्टमेंट',
                '❄️ बेडरूम में A/C',
                '💻 रिमोट वर्क के लिए तेज़ वाई-फाई',
                '🍞 नीचे की बेकरी में 15% छूट'
            ],
            nl: [
                '📍 Centrale ligging boven een Italiaanse bakkerij',
                '🏡 Gezellig appartement voor maximaal 5 personen',
                '❄️ Airco in de slaapkamers',
                '💻 Snel wifi, ideaal om op afstand te werken',
                '🍞 15% korting bij de bakkerij beneden'
            ]
        }
    },
    'VillaMar': {
        propertyKey: 'VillaMar',
        descriptiveTitle: {
            en: 'Private villa with pool for couples',
            es: 'Villa privada con piscina para parejas',
            de: 'Private Villa mit Pool für Paare',
            fr: 'Villa privée avec piscine pour couples',
            it: 'Villa privata con piscina per coppie',
            pt: 'Vivenda privada com piscina para casais',
            he: 'וילה פרטית עם בריכה לזוגות',
            hi: 'जोड़ों के लिए स्विमिंग पूल वाला निजी विला',
            nl: 'Privévilla met zwembad voor stellen'
        },
        price: { crc: 99000, usd: 199 },
        socialStatement: {
            en: 'Chosen for its private pool perfect for romantic getaways',
            es: 'Elegida por su piscina privada perfecta para escapadas románticas',
            de: 'Ausgewählt wegen des privaten Pools, perfekt für romantische Kurzurlaube',
            fr: 'Choisie pour sa piscine privée, parfaite pour les escapades romantiques',
            it: 'Scelta per la sua piscina privata, perfetta per fughe romantiche',
            pt: 'Escolhida pela sua piscina privada, perfeita para escapadinhas românticas',
            he: 'נבחרה בזכות הבריכה הפרטית שלה, מושלמת לחופשות רומנטיות',
            hi: 'रोमांटिक छुट्टियों के लिए बिल्कुल सही निजी स्विमिंग पूल के कारण चुना गया',
            nl: 'Gekozen vanwege het privézwembad, perfect voor romantische uitjes'
        },
        featureHighlights: {
            en: [
                '🏊 Private pool exclusive for guests',
                '💑 Perfect for couples seeking privacy',
                '❄️ Full A/C throughout the villa',
                '💻 Fast WiFi with dedicated workspace',
                '🏖️ Close to beautiful Playa Chiquita'
            ],
            es: [
                '🏊 Piscina privada exclusiva para huéspedes',
                '💑 Perfecta para parejas que buscan privacidad',
                '❄️ A/C completo en toda la villa',
                '💻 WiFi rápido con espacio de trabajo dedicado',
                '🏖️ Cerca de la hermosa Playa Chiquita'
            ],
            de: [
                '🏊 Privater Pool exklusiv für Gäste',
                '💑 Perfekt für Paare, die Privatsphäre suchen',
                '❄️ Vollklimatisierung in der gesamten Villa',
                '💻 Schnelles WLAN mit eigenem Arbeitsbereich',
                '🏖️ In der Nähe des wunderschönen Playa Chiquita'
            ],
            fr: [
                '🏊 Piscine privée exclusive aux hôtes',
                '💑 Parfait pour les couples en quête d\'intimité',
                '❄️ Climatisation complète dans toute la villa',
                '💻 WiFi rapide avec espace de travail dédié',
                '🏖️ Proche de la magnifique Playa Chiquita'
            ],
            it: [
                '🏊 Piscina privata esclusiva per gli ospiti',
                '💑 Perfetta per coppie in cerca di privacy',
                '❄️ Aria condizionata in tutta la villa',
                '💻 WiFi veloce con spazio di lavoro dedicato',
                '🏖️ Vicino alla splendida Playa Chiquita'
            ],
            pt: [
                '🏊 Piscina privada, exclusiva para os hóspedes',
                '💑 Perfeita para casais que procuram privacidade',
                '❄️ Ar condicionado em toda a vivenda',
                '💻 Wi-Fi rápido com espaço de trabalho dedicado',
                '🏖️ Perto da bela Playa Chiquita'
            ],
            he: [
                '🏊 בריכה פרטית בלעדית לאורחים',
                '💑 מושלם לזוגות המחפשים פרטיות',
                '❄️ מיזוג אוויר מלא בכל רחבי הווילה',
                '💻 WiFi מהיר עם פינת עבודה ייעודית',
                '🏖️ קרוב לחוף היפהפה פלייה צ\'יקיטה'
            ],
            hi: [
                '🏊 मेहमानों के लिए विशेष निजी स्विमिंग पूल',
                '💑 गोपनीयता चाहने वाले जोड़ों के लिए बिल्कुल सही',
                '❄️ पूरे विला में पूर्ण A/C',
                '💻 समर्पित कार्यक्षेत्र के साथ तेज़ वाई-फाई',
                '🏖️ खूबसूरत Playa Chiquita के करीब'
            ],
            nl: [
                '🏊 Privézwembad, exclusief voor gasten',
                '💑 Perfect voor stellen die privacy zoeken',
                '❄️ Volledige airco in de hele villa',
                '💻 Snel wifi met eigen werkplek',
                '🏖️ Dicht bij het prachtige Playa Chiquita'
            ]
        }
    },
    'VillaCoral': {
        propertyKey: 'VillaCoral',
        descriptiveTitle: {
            en: 'Private villa with pool for couples',
            es: 'Villa privada con piscina para parejas',
            de: 'Private Villa mit Pool für Paare',
            fr: 'Villa privée avec piscine pour couples',
            it: 'Villa privata con piscina per coppie',
            pt: 'Vivenda privada com piscina para casais',
            he: 'וילה פרטית עם בריכה לזוגות',
            hi: 'जोड़ों के लिए स्विमिंग पूल वाला निजी विला',
            nl: 'Privévilla met zwembad voor stellen'
        },
        price: { crc: 99000, usd: 199 },
        socialStatement: {
            en: 'Chosen for its private pool perfect for romantic getaways',
            es: 'Elegida por su piscina privada perfecta para escapadas románticas',
            de: 'Ausgewählt wegen des privaten Pools, perfekt für romantische Kurzurlaube',
            fr: 'Choisie pour sa piscine privée, parfaite pour les escapades romantiques',
            it: 'Scelta per la sua piscina privata, perfetta per fughe romantiche',
            pt: 'Escolhida pela sua piscina privada, perfeita para escapadinhas românticas',
            he: 'נבחרה בזכות הבריכה הפרטית שלה, מושלמת לחופשות רומנטיות',
            hi: 'रोमांटिक छुट्टियों के लिए बिल्कुल सही निजी स्विमिंग पूल के कारण चुना गया',
            nl: 'Gekozen vanwege het privézwembad, perfect voor romantische uitjes'
        },
        featureHighlights: {
            en: [
                '🏊 Private pool exclusive for guests',
                '💑 Perfect for couples seeking privacy',
                '❄️ Full A/C throughout the villa',
                '💻 Fast WiFi with dedicated workspace',
                '🏖️ Close to beautiful Playa Chiquita'
            ],
            es: [
                '🏊 Piscina privada exclusiva para huéspedes',
                '💑 Perfecta para parejas que buscan privacidad',
                '❄️ A/C completo en toda la villa',
                '💻 WiFi rápido con espacio de trabajo dedicado',
                '🏖️ Cerca de la hermosa Playa Chiquita'
            ],
            de: [
                '🏊 Privater Pool exklusiv für Gäste',
                '💑 Perfekt für Paare, die Privatsphäre suchen',
                '❄️ Vollklimatisierung in der gesamten Villa',
                '💻 Schnelles WLAN mit eigenem Arbeitsbereich',
                '🏖️ In der Nähe des wunderschönen Playa Chiquita'
            ],
            fr: [
                '🏊 Piscine privée exclusive aux hôtes',
                '💑 Parfait pour les couples en quête d\'intimité',
                '❄️ Climatisation complète dans toute la villa',
                '💻 WiFi rapide avec espace de travail dédié',
                '🏖️ Proche de la magnifique Playa Chiquita'
            ],
            it: [
                '🏊 Piscina privata esclusiva per gli ospiti',
                '💑 Perfetta per coppie in cerca di privacy',
                '❄️ Aria condizionata in tutta la villa',
                '💻 WiFi veloce con spazio di lavoro dedicato',
                '🏖️ Vicino alla splendida Playa Chiquita'
            ],
            pt: [
                '🏊 Piscina privada, exclusiva para os hóspedes',
                '💑 Perfeita para casais que procuram privacidade',
                '❄️ Ar condicionado em toda a vivenda',
                '💻 Wi-Fi rápido com espaço de trabalho dedicado',
                '🏖️ Perto da bela Playa Chiquita'
            ],
            he: [
                '🏊 בריכה פרטית בלעדית לאורחים',
                '💑 מושלם לזוגות המחפשים פרטיות',
                '❄️ מיזוג אוויר מלא בכל רחבי הווילה',
                '💻 WiFi מהיר עם פינת עבודה ייעודית',
                '🏖️ קרוב לחוף היפהפה פלייה צ\'יקיטה'
            ],
            hi: [
                '🏊 मेहमानों के लिए विशेष निजी स्विमिंग पूल',
                '💑 गोपनीयता चाहने वाले जोड़ों के लिए बिल्कुल सही',
                '❄️ पूरे विला में पूर्ण A/C',
                '💻 समर्पित कार्यक्षेत्र के साथ तेज़ वाई-फाई',
                '🏖️ खूबसूरत Playa Chiquita के करीब'
            ],
            nl: [
                '🏊 Privézwembad, exclusief voor gasten',
                '💑 Perfect voor stellen die privacy zoeken',
                '❄️ Volledige airco in de hele villa',
                '💻 Snel wifi met eigen werkplek',
                '🏖️ Dicht bij het prachtige Playa Chiquita'
            ]
        }
    },
    'Areka': {
        propertyKey: 'Areka',
        descriptiveTitle: {
            en: 'Cozy retreat perfect for couples exploring Punta Uva',
            es: 'Refugio acogedor perfecto para parejas explorando Punta Uva',
            de: 'Gemütlicher Rückzugsort, perfekt für Paare, die Punta Uva erkunden',
            fr: 'Refuge chaleureux, parfait pour les couples explorant Punta Uva',
            it: 'Rifugio accogliente perfetto per coppie che esplorano Punta Uva',
            pt: 'Retiro acolhedor, perfeito para casais que exploram Punta Uva',
            he: 'מפלט נעים ומושלם לזוגות היוצאים לגלות את פונטה אובה',
            hi: 'Punta Uva घूमने वाले जोड़ों के लिए बिल्कुल सही आरामदायक ठिकाना',
            nl: 'Gezellig toevluchtsoord, perfect voor stellen die Punta Uva verkennen'
        },
        price: { crc: 49000, usd: 99 },
        socialStatement: {
            en: 'Chosen for its peaceful location',
            es: 'Elegida por su ubicación tranquila',
            de: 'Ausgewählt wegen seiner ruhigen Lage',
            fr: 'Choisi pour son emplacement paisible',
            it: 'Scelto per la sua posizione tranquilla',
            pt: 'Escolhido pela sua localização tranquila',
            he: 'נבחר בזכות מיקומו השקט',
            hi: 'इसके शांत स्थान के कारण चुना गया',
            nl: 'Gekozen vanwege de rustige ligging'
        },
        featureHighlights: {
            en: [
                '🏖️ 2 min drive from Punta Uva beach',
                '💑 Intimate space perfect for couples',
                '❄️ A/C for comfortable nights',
                '💻 WiFi for staying connected',
                '🚗 Outside Private parking available'
            ],
            es: [
                '🏖️ 2 min en carro de playa Punta Uva',
                '💑 Espacio íntimo perfecto para parejas',
                '❄️ A/C para noches cómodas',
                '💻 WiFi para mantenerse conectado',
                '🚗 Parqueo privado externo disponible'
            ],
            de: [
                '🏖️ 2 Minuten mit dem Auto vom Strand Punta Uva entfernt',
                '💑 Intimer Raum, perfekt für Paare',
                '❄️ Klimaanlage für angenehme Nächte',
                '💻 WLAN, um in Verbindung zu bleiben',
                '🚗 Privater Außenparkplatz vorhanden'
            ],
            fr: [
                '🏖️ À 2 minutes en voiture de la plage de Punta Uva',
                '💑 Espace intime parfait pour les couples',
                '❄️ Climatisation pour des nuits confortables',
                '💻 WiFi pour rester connecté',
                '🚗 Parking privé extérieur disponible'
            ],
            it: [
                '🏖️ A 2 minuti in auto dalla spiaggia di Punta Uva',
                '💑 Spazio intimo perfetto per coppie',
                '❄️ Aria condizionata per notti confortevoli',
                '💻 WiFi per restare connessi',
                '🚗 Parcheggio privato esterno disponibile'
            ],
            pt: [
                '🏖️ A 2 minutos de carro da praia de Punta Uva',
                '💑 Espaço íntimo, perfeito para casais',
                '❄️ Ar condicionado para noites confortáveis',
                '💻 Wi-Fi para se manter ligado',
                '🚗 Estacionamento privado exterior disponível'
            ],
            he: [
                '🏖️ נסיעה של 2 דקות מחוף פונטה אובה',
                '💑 מרחב אינטימי ומושלם לזוגות',
                '❄️ מיזוג אוויר ללילות נעימים',
                '💻 WiFi להישארות מחוברים',
                '🚗 חניה פרטית בחוץ זמינה'
            ],
            hi: [
                '🏖️ Punta Uva समुद्र तट से 2 मिनट की ड्राइव',
                '💑 जोड़ों के लिए बिल्कुल सही अंतरंग स्थान',
                '❄️ आरामदायक रातों के लिए A/C',
                '💻 जुड़े रहने के लिए वाई-फाई',
                '🚗 बाहरी निजी पार्किंग उपलब्ध'
            ],
            nl: [
                '🏖️ 2 minuten rijden van het strand van Punta Uva',
                '💑 Intieme ruimte, perfect voor stellen',
                '❄️ Airco voor comfortabele nachten',
                '💻 Wifi om verbonden te blijven',
                '🚗 Eigen parkeerplaats buiten beschikbaar'
            ]
        }
    },
    'Plumeria': {
        propertyKey: 'Plumeria',
        descriptiveTitle: {
            en: 'Cozy retreat perfect for couples exploring Punta Uva',
            es: 'Refugio acogedor perfecto para parejas explorando Punta Uva',
            de: 'Gemütlicher Rückzugsort, perfekt für Paare, die Punta Uva erkunden',
            fr: 'Refuge chaleureux, parfait pour les couples explorant Punta Uva',
            it: 'Rifugio accogliente perfetto per coppie che esplorano Punta Uva',
            pt: 'Retiro acolhedor, perfeito para casais que exploram Punta Uva',
            he: 'מפלט נעים ומושלם לזוגות היוצאים לגלות את פונטה אובה',
            hi: 'Punta Uva घूमने वाले जोड़ों के लिए बिल्कुल सही आरामदायक ठिकाना',
            nl: 'Gezellig toevluchtsoord, perfect voor stellen die Punta Uva verkennen'
        },
        price: { crc: 49000, usd: 99 },
        socialStatement: {
            en: 'Chosen for its peaceful location',
            es: 'Elegida por su ubicación tranquila',
            de: 'Ausgewählt wegen seiner ruhigen Lage',
            fr: 'Choisi pour son emplacement paisible',
            it: 'Scelto per la sua posizione tranquilla',
            pt: 'Escolhido pela sua localização tranquila',
            he: 'נבחר בזכות מיקומו השקט',
            hi: 'इसके शांत स्थान के कारण चुना गया',
            nl: 'Gekozen vanwege de rustige ligging'
        },
        featureHighlights: {
            en: [
                '🏖️ 2 min drive from Punta Uva beach',
                '💑 Intimate space perfect for couples',
                '❄️ A/C for comfortable nights',
                '💻 WiFi for staying connected',
                '🚗 Outside Private parking available'
            ],
            es: [
                '🏖️ 2 min en carro de playa Punta Uva',
                '💑 Espacio íntimo perfecto para parejas',
                '❄️ A/C para noches cómodas',
                '💻 WiFi para mantenerse conectado',
                '🚗 Parqueo privado externo disponible'
            ],
            de: [
                '🏖️ 2 Minuten mit dem Auto vom Strand Punta Uva entfernt',
                '💑 Intimer Raum, perfekt für Paare',
                '❄️ Klimaanlage für angenehme Nächte',
                '💻 WLAN, um in Verbindung zu bleiben',
                '🚗 Privater Außenparkplatz vorhanden'
            ],
            fr: [
                '🏖️ À 2 minutes en voiture de la plage de Punta Uva',
                '💑 Espace intime parfait pour les couples',
                '❄️ Climatisation pour des nuits confortables',
                '💻 WiFi pour rester connecté',
                '🚗 Parking privé extérieur disponible'
            ],
            it: [
                '🏖️ A 2 minuti in auto dalla spiaggia di Punta Uva',
                '💑 Spazio intimo perfetto per coppie',
                '❄️ Aria condizionata per notti confortevoli',
                '💻 WiFi per restare connessi',
                '🚗 Parcheggio privato esterno disponibile'
            ],
            pt: [
                '🏖️ A 2 minutos de carro da praia de Punta Uva',
                '💑 Espaço íntimo, perfeito para casais',
                '❄️ Ar condicionado para noites confortáveis',
                '💻 Wi-Fi para se manter ligado',
                '🚗 Estacionamento privado exterior disponível'
            ],
            he: [
                '🏖️ נסיעה של 2 דקות מחוף פונטה אובה',
                '💑 מרחב אינטימי ומושלם לזוגות',
                '❄️ מיזוג אוויר ללילות נעימים',
                '💻 WiFi להישארות מחוברים',
                '🚗 חניה פרטית בחוץ זמינה'
            ],
            hi: [
                '🏖️ Punta Uva समुद्र तट से 2 मिनट की ड्राइव',
                '💑 जोड़ों के लिए बिल्कुल सही अंतरंग स्थान',
                '❄️ आरामदायक रातों के लिए A/C',
                '💻 जुड़े रहने के लिए वाई-फाई',
                '🚗 बाहरी निजी पार्किंग उपलब्ध'
            ],
            nl: [
                '🏖️ 2 minuten rijden van het strand van Punta Uva',
                '💑 Intieme ruimte, perfect voor stellen',
                '❄️ Airco voor comfortabele nachten',
                '💻 Wifi om verbonden te blijven',
                '🚗 Eigen parkeerplaats buiten beschikbaar'
            ]
        }
    },
    'Giulia': {
        propertyKey: 'Giulia',
        descriptiveTitle: {
            en: 'Family-friendly house near Punta Uva',
            es: 'Casa familiar cerca de Punta Uva',
            de: 'Familienfreundliches Haus in der Nähe von Punta Uva',
            fr: 'Maison familiale près de Punta Uva',
            it: 'Casa adatta alle famiglie vicino a Punta Uva',
            pt: 'Casa familiar perto de Punta Uva',
            he: 'בית ידידותי למשפחות ליד פונטה אובה',
            hi: 'Punta Uva के पास पारिवारिक-अनुकूल घर',
            nl: 'Gezinsvriendelijk huis bij Punta Uva'
        },
        price: { crc: 84000, usd: 169 },
        socialStatement: {
            en: 'Chosen for its family-friendly amenities and beach proximity',
            es: 'Elegida por sus comodidades familiares y proximidad a la playa',
            de: 'Ausgewählt wegen der familienfreundlichen Ausstattung und der Strandnähe',
            fr: 'Choisie pour ses équipements adaptés aux familles et sa proximité avec la plage',
            it: 'Scelta per i suoi servizi adatti alle famiglie e la vicinanza alla spiaggia',
            pt: 'Escolhida pelas suas comodidades familiares e proximidade à praia',
            he: 'נבחר בזכות המתקנים הידידותיים למשפחות והקרבה לחוף',
            hi: 'इसकी पारिवारिक-अनुकूल सुविधाओं और समुद्र तट की निकटता के कारण चुना गया',
            nl: 'Gekozen vanwege de gezinsvriendelijke voorzieningen en de nabijheid van het strand'
        },
        featureHighlights: {
            en: [
                '👨‍👩‍👧‍👦 Perfect for families with children',
                '🏖️ Walking distance to Playa chiquita beach',
                '❄️ A/C in bedrooms for comfort',
                '💻 Fast WiFi for remote work',
                '🚗 Parking space available'
            ],
            es: [
                '👨‍👩‍👧‍👦 Perfecta para familias con niños',
                '🏖️ A distancia caminable de playa chiquita',
                '❄️ A/C en habitaciones para comodidad',
                '💻 WiFi rápido para trabajo remoto',
                '🚗 Espacio de parqueo disponible'
            ],
            de: [
                '👨‍👩‍👧‍👦 Perfekt für Familien mit Kindern',
                '🏖️ Fußläufig zum Strand Playa Chiquita',
                '❄️ Klimaanlage in den Schlafzimmern für mehr Komfort',
                '💻 Schnelles WLAN für Remote-Arbeit',
                '🚗 Parkplatz vorhanden'
            ],
            fr: [
                '👨‍👩‍👧‍👦 Parfait pour les familles avec enfants',
                '🏖️ À quelques pas de la plage de Playa Chiquita',
                '❄️ Climatisation dans les chambres pour plus de confort',
                '💻 WiFi rapide pour le télétravail',
                '🚗 Place de parking disponible'
            ],
            it: [
                '👨‍👩‍👧‍👦 Perfetta per famiglie con bambini',
                '🏖️ A pochi passi dalla spiaggia di Playa Chiquita',
                '❄️ Aria condizionata nelle camere per il massimo comfort',
                '💻 WiFi veloce per il lavoro da remoto',
                '🚗 Posto auto disponibile'
            ],
            pt: [
                '👨‍👩‍👧‍👦 Perfeita para famílias com crianças',
                '🏖️ A pé da praia de Playa Chiquita',
                '❄️ Ar condicionado nos quartos para maior conforto',
                '💻 Wi-Fi rápido para trabalho remoto',
                '🚗 Lugar de estacionamento disponível'
            ],
            he: [
                '👨‍👩‍👧‍👦 מושלם למשפחות עם ילדים',
                '🏖️ במרחק הליכה מחוף פלייה צ\'יקיטה',
                '❄️ מיזוג אוויר בחדרי השינה לנוחות מרבית',
                '💻 WiFi מהיר לעבודה מרחוק',
                '🚗 מקום חניה זמין'
            ],
            hi: [
                '👨‍👩‍👧‍👦 बच्चों वाले परिवारों के लिए बिल्कुल सही',
                '🏖️ Playa Chiquita समुद्र तट से पैदल दूरी पर',
                '❄️ आराम के लिए बेडरूम में A/C',
                '💻 रिमोट वर्क के लिए तेज़ वाई-फाई',
                '🚗 पार्किंग स्थान उपलब्ध'
            ],
            nl: [
                '👨‍👩‍👧‍👦 Perfect voor gezinnen met kinderen',
                '🏖️ Op loopafstand van het strand Playa Chiquita',
                '❄️ Airco in de slaapkamers voor extra comfort',
                '💻 Snel wifi om op afstand te werken',
                '🚗 Parkeerplaats beschikbaar'
            ]
        }
    },
    'Delfin': {
        propertyKey: 'Delfin',
        descriptiveTitle: {
            en: 'Spacious house perfect for large families',
            es: 'Casa espaciosa perfecta para familias grandes',
            de: 'Geräumiges Haus, perfekt für große Familien',
            fr: 'Grande maison parfaite pour les familles nombreuses',
            it: 'Casa spaziosa perfetta per famiglie numerose',
            pt: 'Casa espaçosa, perfeita para famílias grandes',
            he: 'בית מרווח ומושלם למשפחות גדולות',
            hi: 'बड़े परिवारों के लिए बिल्कुल सही विशाल घर',
            nl: 'Ruim huis, perfect voor grote gezinnen'
        },
        price: { crc: 99000, usd: 199 },
        socialStatement: {
            en: 'Chosen for its spacious layout accommodating up to 6 guests',
            es: 'Elegida por su diseño espacioso que acomoda hasta 6 huéspedes',
            de: 'Ausgewählt wegen des großzügigen Grundrisses für bis zu 6 Gäste',
            fr: 'Choisie pour son espace généreux pouvant accueillir jusqu\'à 6 personnes',
            it: 'Scelta per i suoi ampi spazi che ospitano fino a 6 persone',
            pt: 'Escolhida pela sua disposição espaçosa, com capacidade para até 6 hóspedes',
            he: 'נבחר בזכות התכנון המרווח המתאים עד 6 אורחים',
            hi: '6 मेहमानों तक की क्षमता वाले विशाल लेआउट के कारण चुना गया',
            nl: 'Gekozen vanwege de ruime indeling met plaats voor maximaal 6 gasten'
        },
        featureHighlights: {
            en: [
                '👨‍👩‍👧‍👦 Spacious for up to 6 people',
                '🏡 Two bathrooms for convenience',
                '❄️ A/C in all bedrooms',
                '💻 Fast WiFi throughout the house',
                '🚗 Private fenced parking for 2 vehicles'
            ],
            es: [
                '👨‍👩‍👧‍👦 Espaciosa para hasta 6 personas',
                '🏡 Dos baños para conveniencia',
                '❄️ A/C en todas las habitaciones',
                '💻 WiFi rápido en toda la casa',
                '🚗 Parqueo privado cercado para 2 vehículos'
            ],
            de: [
                '👨‍👩‍👧‍👦 Geräumig für bis zu 6 Personen',
                '🏡 Zwei Badezimmer für mehr Komfort',
                '❄️ Klimaanlage in allen Schlafzimmern',
                '💻 Schnelles WLAN im ganzen Haus',
                '🚗 Privater umzäunter Parkplatz für 2 Fahrzeuge'
            ],
            fr: [
                '👨‍👩‍👧‍👦 Spacieuse pour jusqu\'à 6 personnes',
                '🏡 Deux salles de bain pour plus de confort',
                '❄️ Climatisation dans toutes les chambres',
                '💻 WiFi rapide dans toute la maison',
                '🚗 Parking privé clôturé pour 2 véhicules'
            ],
            it: [
                '👨‍👩‍👧‍👦 Spaziosa per un massimo di 6 persone',
                '🏡 Due bagni per maggiore comodità',
                '❄️ Aria condizionata in tutte le camere',
                '💻 WiFi veloce in tutta la casa',
                '🚗 Parcheggio privato recintato per 2 veicoli'
            ],
            pt: [
                '👨‍👩‍👧‍👦 Espaçosa para até 6 pessoas',
                '🏡 Duas casas de banho para maior comodidade',
                '❄️ Ar condicionado em todos os quartos',
                '💻 Wi-Fi rápido em toda a casa',
                '🚗 Estacionamento privado vedado para 2 veículos'
            ],
            he: [
                '👨‍👩‍👧‍👦 מרווח לעד 6 אנשים',
                '🏡 שני חדרי אמבטיה לנוחות',
                '❄️ מיזוג אוויר בכל חדרי השינה',
                '💻 WiFi מהיר בכל רחבי הבית',
                '🚗 חניה פרטית גדורה ל-2 רכבים'
            ],
            hi: [
                '👨‍👩‍👧‍👦 6 लोगों तक के लिए विशाल',
                '🏡 सुविधा के लिए दो बाथरूम',
                '❄️ सभी बेडरूम में A/C',
                '💻 पूरे घर में तेज़ वाई-फाई',
                '🚗 2 वाहनों के लिए निजी घिरी हुई पार्किंग'
            ],
            nl: [
                '👨‍👩‍👧‍👦 Ruim voor maximaal 6 personen',
                '🏡 Twee badkamers voor extra gemak',
                '❄️ Airco in alle slaapkamers',
                '💻 Snel wifi in het hele huis',
                '🚗 Eigen omheinde parkeerplaats voor 2 voertuigen'
            ]
        }
    }
};

// Property recommendations for blog articles
export interface PropertyRecommendation {
  name: string;
  reason: string;
  link: string;
  houseCode?: number;
}

// Each `reason` phrase translated into every released locale, keyed by its exact
// English source string. Was three EN consts plus three separately
// hand-maintained _ES consts (PHASE 3c) — that pattern has no room for six
// more languages, so this is now three `(locale) => PropertyRecommendation[]`
// functions sharing one translation table instead. `link` now goes through
// `pathForKey` directly (every locale), not `pathForLegacyId` (English/Spanish
// only, by construction — see its own doc comment in routes.config.ts).
export const RECOMMENDATION_REASONS: Record<string, LocalizedValue<string>> = {
  'Ideal for getting around on foot': {
    en: 'Ideal for getting around on foot', es: 'Ideal si quieres moverte caminando',
    de: 'Ideal, um zu Fuß unterwegs zu sein', fr: 'Idéal pour se déplacer à pied',
    it: 'Ideale per spostarsi a piedi', pt: 'Ideal para se deslocar a pé',
    he: 'אידיאלי להתניידות ברגל', hi: 'पैदल घूमने के लिए आदर्श',
    nl: 'Ideaal om te voet rond te komen',
  },
  'Perfect for relaxing near the beach': {
    en: 'Perfect for relaxing near the beach', es: 'Perfecta para descansar cerca de la playa',
    de: 'Perfekt zum Entspannen in Strandnähe', fr: 'Parfait pour se détendre près de la plage',
    it: 'Perfetta per rilassarsi vicino alla spiaggia', pt: 'Perfeita para relaxar perto da praia',
    he: 'מושלם למנוחה ליד החוף', hi: 'समुद्र तट के पास आराम करने के लिए एकदम सही',
    nl: 'Perfect om te ontspannen dicht bij het strand',
  },
  'Great for a short getaway with a private pool': {
    en: 'Great for a short getaway with a private pool', es: 'Si buscas una escapada corta con piscina privada',
    de: 'Toll für einen Kurzurlaub mit Privatpool', fr: 'Idéal pour une courte escapade avec piscine privée',
    it: 'Ottima per una breve fuga con piscina privata', pt: 'Ótima para uma escapadela curta com piscina privada',
    he: 'מצוין לחופשה קצרה עם בריכה פרטית', hi: 'निजी पूल के साथ छोटी छुट्टी के लिए बढ़िया',
    nl: 'Geweldig voor een kort uitje met een privézwembad',
  },
  'Perfect for exploring on foot': {
    en: 'Perfect for exploring on foot', es: 'Perfecta para explorar a pie',
    de: 'Perfekt, um zu Fuß zu erkunden', fr: 'Parfait pour explorer à pied',
    it: 'Perfetta per esplorare a piedi', pt: 'Perfeita para explorar a pé',
    he: 'מושלם לחקירה ברגל', hi: 'पैदल घूमने के लिए बिल्कुल सही',
    nl: 'Perfect om te voet te verkennen',
  },
  'Ideal for beach relaxation': {
    en: 'Ideal for beach relaxation', es: 'Ideal para relajarte cerca de la playa',
    de: 'Ideal zum Entspannen am Strand', fr: 'Idéal pour se détendre à la plage',
    it: 'Ideale per rilassarsi in spiaggia', pt: 'Ideal para relaxar na praia',
    he: 'אידיאלי למנוחה בחוף הים', hi: 'समुद्र तट पर आराम के लिए आदर्श',
    nl: 'Ideaal om te ontspannen op het strand',
  },
  'Great for short getaways with private pool': {
    en: 'Great for short getaways with private pool', es: 'Excelente para escapadas cortas con piscina privada',
    de: 'Toll für Kurzurlaube mit Privatpool', fr: "Idéal pour de courtes escapades avec piscine privée",
    it: 'Ottima per brevi fughe con piscina privata', pt: 'Ótima para escapadelas curtas com piscina privada',
    he: 'מצוין לחופשות קצרות עם בריכה פרטית', hi: 'निजी पूल के साथ छोटी छुट्टियों के लिए बढ़िया',
    nl: 'Geweldig voor korte uitjes met een privézwembad',
  },
  'Perfect Retreat for Couples': {
    en: 'Perfect Retreat for Couples', es: 'Retiro Perfecto para Parejas',
    de: 'Perfekter Rückzugsort für Paare', fr: 'Retraite parfaite pour les couples',
    it: 'Rifugio perfetto per coppie', pt: 'Refúgio perfeito para casais',
    he: 'מפלט מושלם לזוגות', hi: 'जोड़ों के लिए बेहतरीन ठिकाना',
    nl: 'Perfecte plek voor stellen',
  },
  'Easy access to transportation': {
    en: 'Easy access to transportation', es: 'Fácil acceso al transporte',
    de: 'Einfacher Zugang zu Transportmitteln', fr: 'Accès facile aux transports',
    it: 'Facile accesso ai trasporti', pt: 'Fácil acesso a transportes',
    he: 'גישה נוחה לתחבורה', hi: 'परिवहन तक आसान पहुंच',
    nl: 'Gemakkelijke toegang tot vervoer',
  },
  'Perfect for relaxing after park visits': {
    en: 'Perfect for relaxing after park visits', es: 'Perfecta para relajarte después de visitar el parque',
    de: 'Perfekt zum Entspannen nach einem Parkbesuch', fr: 'Parfait pour se détendre après la visite du parc',
    it: 'Perfetta per rilassarsi dopo la visita al parco', pt: 'Perfeita para relaxar depois de visitar o parque',
    he: 'מושלם למנוחה אחרי ביקור בפארק', hi: 'पार्क घूमने के बाद आराम के लिए बिल्कुल सही',
    nl: 'Perfect om te ontspannen na een bezoek aan het park',
  },
};

function withReason(name: string, reasonEn: string, routeKey: RouteKey, houseCode: number) {
  return (locale: Locale): PropertyRecommendation => ({
    name,
    reason: pickLocalized(RECOMMENDATION_REASONS[reasonEn], locale),
    link: pathForKey(routeKey, locale),
    houseCode,
  });
}

export function puertoViejoBlogRecommendations(locale: Locale): PropertyRecommendation[] {
  return [
    withReason('Casa Geco', 'Ideal for getting around on foot', 'geco', 1)(locale),
    withReason('Casa Plumeria', 'Perfect for relaxing near the beach', 'plumeria', 8)(locale),
    withReason('Villa Coral', 'Great for a short getaway with a private pool', 'villacoral', 6)(locale),
  ];
}

// General Puerto Viejo area recommendations for travel-focused blogs
export function generalPuertoViejoRecommendations(locale: Locale): PropertyRecommendation[] {
  return [
    withReason('Casa Geco', 'Perfect for exploring on foot', 'geco', 1)(locale),
    withReason('Casa Plumeria', 'Ideal for beach relaxation', 'plumeria', 8)(locale),
    withReason('Villa Coral', 'Great for short getaways with private pool', 'villacoral', 6)(locale),
  ];
}

// Cahuita-focused recommendations
export function cahuitaAreaRecommendations(locale: Locale): PropertyRecommendation[] {
  return [
    withReason('Casa Plumeria', 'Perfect Retreat for Couples', 'plumeria', 8)(locale),
    withReason('Casa Geco', 'Easy access to transportation', 'geco', 1)(locale),
    withReason('Villa Coral', 'Perfect for relaxing after park visits', 'villacoral', 6)(locale),
  ];
}
/**
 * Largest party any single property can host. Derived from the house data so a
 * capacity change in one place is enough — the booking search widget uses this
 * to cap its guest stepper instead of letting guests pick a number that can
 * never return a result.
 */
export const MAX_PORTFOLIO_GUESTS: number = houseDataEngList.reduce(
  (max, house) => Math.max(max, house.guestNumber),
  1
);

/**
 * Portfolio-wide bedroom/bathroom/guest ranges, derived from PROPERTY_CAPACITY
 * so homepage copy can't drift from the per-listing facts the way the old
 * hardcoded "4 remodeled homes... each house has 2 bedrooms" line did — that
 * claim contradicted both the 9-10 differently-sized cards shown on the same
 * page and PROPERTY_CAPACITY itself (bedrooms range from 1 to 2).
 */
const CAPACITY_VALUES = Object.values(PROPERTY_CAPACITY);
export const PORTFOLIO_PROPERTY_COUNT: number = CAPACITY_VALUES.length;
export const PORTFOLIO_BEDROOM_RANGE: { min: number; max: number } = CAPACITY_VALUES.reduce(
  (range, { bedrooms }) => ({ min: Math.min(range.min, bedrooms), max: Math.max(range.max, bedrooms) }),
  { min: Infinity, max: 0 }
);
export const PORTFOLIO_GUEST_RANGE: { min: number; max: number } = CAPACITY_VALUES.reduce(
  (range, { maxGuests }) => ({ min: Math.min(range.min, maxGuests), max: Math.max(range.max, maxGuests) }),
  { min: Infinity, max: 0 }
);

export interface BlogArticle {
  key: string;
  routeKey: RouteKey;
}

/**
 * The ten travel guides, in one place, so the footer and the blog index don't
 * drift apart. `title(locale)`/`path(locale)` below read straight from
 * routes.config.ts and the Phase-8-translated blog.tsx content — no
 * per-locale literal here to drift, and no EN/ES-only ceiling the way the old
 * titleEn/titleEs/pathEn/pathEs fields had.
 */
export const BLOG_ARTICLES: BlogArticle[] = [
  { key: 'twodays', routeKey: 'blogTwodays' },
  { key: 'gandoca', routeKey: 'blogGandoca' },
  { key: 'sanjose', routeKey: 'blogSanjose' },
  { key: 'byplane', routeKey: 'blogByplane' },
  { key: 'tenhours', routeKey: 'blogTenhours' },
  { key: 'bushours', routeKey: 'blogBushours' },
  { key: 'cahuitapark', routeKey: 'blogCahuitapark' },
  { key: 'indigenous', routeKey: 'blogIndigenous' },
  { key: 'besttime', routeKey: 'blogBesttime' },
  { key: 'hiddengems', routeKey: 'blogHiddengems' },
  { key: 'weather', routeKey: 'blogWeather' },
  { key: 'weatherJan', routeKey: 'blogWeatherJan' },
  { key: 'weatherFeb', routeKey: 'blogWeatherFeb' },
  { key: 'weatherMar', routeKey: 'blogWeatherMar' },
  { key: 'weatherApr', routeKey: 'blogWeatherApr' },
  { key: 'weatherMay', routeKey: 'blogWeatherMay' },
  { key: 'weatherJun', routeKey: 'blogWeatherJun' },
  { key: 'weatherJul', routeKey: 'blogWeatherJul' },
  { key: 'weatherAug', routeKey: 'blogWeatherAug' },
  { key: 'weatherSep', routeKey: 'blogWeatherSep' },
  { key: 'weatherOct', routeKey: 'blogWeatherOct' },
  { key: 'weatherNov', routeKey: 'blogWeatherNov' },
  { key: 'weatherDec', routeKey: 'blogWeatherDec' },
  { key: 'sanjoseOptions', routeKey: 'blogSanjoseOptions' },
];

/**
 * Every property that has a listing page, in every language, keyed by
 * `houseLangCode` ("Geco", "GecoES", "ArekaES", …).
 *
 * The underlying arrays are split three ways for historical reasons:
 * `houseDataList` holds both languages for the town houses, while the Namaitami
 * and Villa properties keep separate `…ES` arrays. A listing page therefore had
 * to know which of five arrays its own data lived in, and the Spanish pages
 * imported a different one from their English twins — which is precisely the
 * kind of per-language wiring PHASE 3 removes.
 *
 * `houseLangCode` is unique across these five arrays, so one lookup replaces
 * that choice entirely. (It is *not* unique against `houseDataEngList` and
 * `ribHouseDataEngList`, which repeat the English entries for the home page
 * cards; those are deliberately excluded here.)
 *
 * PHASE 4 should fold this into routes.config.ts, where each route already
 * knows its property and locale.
 */
const LISTING_PAGE_DATA: HouseDataType[] = [
    ...houseDataList,
    ...NamDataList,
    ...NamDataListES,
    ...VillasDataList,
    ...VillasDataListES,
];

export const houseDataByLangCode = (langCode: string): HouseDataType | undefined =>
    LISTING_PAGE_DATA.find((house) => house.houseLangCode === langCode);
