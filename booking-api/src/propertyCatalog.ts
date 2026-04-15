export interface PublicAmenity {
  code: string;
  label: string;
}

export interface BookingProperty {
  propertyId: string;
  smoobuApartmentId: number;
  slug: string;
  name: string;
  guestCapacity: number;
  thumbnailUrl: string;
  amenities: PublicAmenity[];
}

// TODO: Replace placeholder smoobuApartmentId values (1–10) with real Smoobu apartment IDs before deployment.
export const BOOKING_PROPERTIES: BookingProperty[] = [
  {
    propertyId: "b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111",
    smoobuApartmentId: 1,
    slug: "Geco",
    name: "Casa Geco",
    guestCapacity: 5,
    thumbnailUrl: "https://drive.google.com/thumbnail?id=1tYQxiwEXhxhv2r0_mJQhXVAHOMrE0y_2&sz=w1000",
    amenities: [
      { code: "bath", label: "Private equipped bathroom" },
      { code: "kitchen", label: "Private equipped kitchen" },
      { code: "ac", label: "A/C" },
      { code: "parking", label: "Private fenced parking" },
      { code: "wifi", label: "100Mbps WiFi" },
      { code: "pet", label: "Pet friendly" },
    ],
  },
  {
    propertyId: "d06f7d50-cbbe-4ec6-954c-3e0f9ac2f2e7",
    smoobuApartmentId: 2,
    slug: "Rana",
    name: "Casa Rana",
    guestCapacity: 5,
    thumbnailUrl: "https://drive.google.com/thumbnail?id=1UiGI8gFf6UR5kn8Eo30u457NX8NkP95X&sz=w1000",
    amenities: [
      { code: "bath", label: "Private equipped bathroom" },
      { code: "kitchen", label: "Private equipped kitchen" },
      { code: "ac", label: "A/C" },
      { code: "parking", label: "Private fenced parking" },
      { code: "wifi", label: "100Mbps WiFi" },
      { code: "pet", label: "Pet friendly" },
    ],
  },
  {
    propertyId: "64dff2f1-f1cc-4b68-883e-ea3f43efc5a1",
    smoobuApartmentId: 3,
    slug: "Tucano",
    name: "Casa Tucano",
    guestCapacity: 5,
    thumbnailUrl: "https://drive.google.com/thumbnail?id=10qvLOMLs4_JsBIF99igVeh4baDR7EB-Q&sz=w1000",
    amenities: [
      { code: "bath", label: "Private equipped bathroom" },
      { code: "kitchen", label: "Private equipped kitchen" },
      { code: "ac", label: "A/C" },
      { code: "wifi", label: "100Mbps WiFi" },
      { code: "parking", label: "Outside parking" },
      { code: "pet", label: "Pet friendly" },
    ],
  },
  {
    propertyId: "a75f112f-5aa4-46a7-9f64-1a3b5f30b54c",
    smoobuApartmentId: 4,
    slug: "Pappagallo",
    name: "Casa Pappagallo",
    guestCapacity: 5,
    thumbnailUrl: "https://drive.google.com/thumbnail?id=1owhxss4VVXLLJAQP1ByDyBMH_NwQsIuY&sz=w1000",
    amenities: [
      { code: "bath", label: "Private equipped bathroom" },
      { code: "kitchen", label: "Private equipped kitchen" },
      { code: "ac", label: "A/C" },
      { code: "wifi", label: "100Mbps WiFi" },
      { code: "parking", label: "Outside parking" },
      { code: "pet", label: "Pet friendly" },
    ],
  },
  {
    propertyId: "8d7d5ed0-67a6-44fd-9d57-cb65b104e907",
    smoobuApartmentId: 5,
    slug: "VillaMar",
    name: "Villa Mar",
    guestCapacity: 2,
    thumbnailUrl: "https://drive.google.com/thumbnail?id=1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn&sz=w1000",
    amenities: [
      { code: "pool", label: "Private pool" },
      { code: "bath", label: "Private equipped bathroom" },
      { code: "kitchen", label: "Private equipped kitchen" },
      { code: "ac", label: "A/C" },
      { code: "parking", label: "Private unfenced parking" },
      { code: "wifi", label: "100Mbps WiFi" },
    ],
  },
  {
    propertyId: "ec4b9d58-2cf8-4669-88b5-23b9d15c32f6",
    smoobuApartmentId: 6,
    slug: "VillaCoral",
    name: "Villa Coral",
    guestCapacity: 2,
    thumbnailUrl: "https://drive.google.com/thumbnail?id=1frKDGGLk1nJQQaxoxng6TgmUVzxTx08A&sz=w1000",
    amenities: [
      { code: "pool", label: "Private pool" },
      { code: "bath", label: "Private equipped bathroom" },
      { code: "kitchen", label: "Private equipped kitchen" },
      { code: "ac", label: "A/C" },
      { code: "parking", label: "Private unfenced parking" },
      { code: "wifi", label: "100Mbps WiFi" },
    ],
  },
  {
    propertyId: "3548c2c7-f7b2-4d5f-8e6f-e01f717f4557",
    smoobuApartmentId: 7,
    slug: "Areka",
    name: "Areka",
    guestCapacity: 2,
    thumbnailUrl: "https://drive.google.com/thumbnail?id=1iHyOve78WkDNdTcQcUtKkiM8rXx2iRey&sz=w1000",
    amenities: [
      { code: "bath", label: "Private equipped bathroom" },
      { code: "kitchen", label: "Private equipped kitchen" },
      { code: "ac", label: "A/C" },
      { code: "wifi", label: "WiFi" },
      { code: "parking", label: "Unfenced parking" },
    ],
  },
  {
    propertyId: "cba02c24-e7e4-4898-a7d8-c7ae2277a8b1",
    smoobuApartmentId: 8,
    slug: "Plumeria",
    name: "Plumeria",
    guestCapacity: 2,
    thumbnailUrl: "https://drive.google.com/thumbnail?id=1b2x2aVIjqlSws4KePOS_NVb4NItGsra1&sz=w1000",
    amenities: [
      { code: "bath", label: "Private equipped bathroom" },
      { code: "kitchen", label: "Private equipped kitchen" },
      { code: "ac", label: "A/C" },
      { code: "wifi", label: "WiFi" },
      { code: "parking", label: "Unfenced parking" },
    ],
  },
  {
    propertyId: "c4ff5d9f-ef6d-43f8-8edc-41b0037215de",
    smoobuApartmentId: 9,
    slug: "Giulia",
    name: "Giulia",
    guestCapacity: 4,
    thumbnailUrl: "https://drive.google.com/thumbnail?id=1e0esqkSBKBdT-F2kLg5PsyF46zEWtWQ8&sz=w1000",
    amenities: [
      { code: "bath", label: "Private equipped bathroom" },
      { code: "kitchen", label: "Private equipped kitchen" },
      { code: "ac", label: "2 A/C" },
      { code: "wifi", label: "WiFi" },
      { code: "parking", label: "Unfenced parking" },
    ],
  },
  {
    propertyId: "bc2470e7-3f18-43e3-91eb-ac3bf3c82ca4",
    smoobuApartmentId: 10,
    slug: "Delfin",
    name: "Delfin",
    guestCapacity: 6,
    thumbnailUrl: "https://drive.google.com/thumbnail?id=1ui0cNzHTb2WM-k59OkwnJXw77m0P7PPW&sz=w1000",
    amenities: [
      { code: "bath", label: "2 bathrooms" },
      { code: "kitchen", label: "Private equipped kitchen" },
      { code: "ac", label: "A/C" },
      { code: "wifi", label: "100Mbps WiFi" },
      { code: "parking", label: "Private fenced parking" },
      { code: "pet", label: "Pet friendly" },
    ],
  },
];

export const BOOKING_PROPERTIES_BY_SMOOBU_ID = new Map(
  BOOKING_PROPERTIES.map((property) => [property.smoobuApartmentId, property])
);

export function listingUrlForLanguage(slug: string, language: "en" | "es"): string {
  return `/${slug}${language === "es" ? "ES" : ""}`;
}
