/**
 * Amenity name strings (the little icon + text pairs on every listing page),
 * keyed by the exact English string as it appears in src/utils/constants.ts's
 * houseDataList amenities arrays — translated into the six locales that
 * didn't exist when that data was authored.
 *
 * Deliberately a lookup table keyed by content, not a restructuring of
 * houseDataList itself: houseDataList duplicates a full property record per
 * suffixed locale (Geco/GecoES) rather than being Locale-keyed, and widening
 * that to 8 locales would mean 6 more full duplicate entries per property.
 *
 * No `en`/`es` fields here on purpose. For those two locales
 * `houseDataByLangCode` already resolves the amenity list with the right
 * language's `name` baked in directly (that's the existing, live,
 * already-correct behavior) — Amenities.component.tsx renders `name`
 * as-is for en/es and only reaches into this table for the other six, where
 * `name` is guaranteed to be the raw English string (the six new locales
 * fall back to the unsuffixed, English houseDataList entry).
 */
export const AMENITY_LABELS: Record<string, Partial<Record<'de' | 'fr' | 'it' | 'pt' | 'he' | 'hi' | 'nl', string>>> = {
  'Private Equipped Bathroom': {
    de: 'Privates ausgestattetes Badezimmer',
    fr: 'Salle de bain privée équipée',
    it: 'Bagno privato attrezzato',
    pt: 'Casa de banho privativa equipada',
    he: 'חדר אמבטיה פרטי ומאובזר',
    hi: 'निजी सुसज्जित बाथरूम',
    nl: 'Eigen ingerichte badkamer',
  },
  'Private Equipped Kitchen': {
    de: 'Private ausgestattete Küche',
    fr: 'Cuisine privée équipée',
    it: 'Cucina privata attrezzata',
    pt: 'Cozinha privativa equipada',
    he: 'מטבח פרטי ומאובזר',
    hi: 'निजी सुसज्जित रसोई',
    nl: 'Eigen ingerichte keuken',
  },
  '2 A/C Units': {
    de: '2 Klimaanlagen',
    fr: '2 unités de climatisation',
    it: '2 unità di aria condizionata',
    pt: '2 unidades de ar condicionado',
    he: '2 יחידות מיזוג אוויר',
    hi: '2 A/C यूनिट',
    nl: '2 airco-units',
  },
  'Private unfenced Parking': {
    de: 'Privater unumzäunter Parkplatz',
    fr: 'Parking privé non clôturé',
    it: 'Parcheggio privato non recintato',
    pt: 'Estacionamento privado não vedado',
    he: 'חניה פרטית לא גדורה',
    hi: 'निजी खुली पार्किंग',
    nl: 'Eigen onomheinde parkeerplaats',
  },
  '100Mbps WiFi': {
    de: '100-Mbit/s-WLAN',
    fr: 'WiFi 100 Mbps',
    it: 'WiFi da 100Mbps',
    pt: 'Wi-Fi de 100 Mbps',
    he: 'WiFi במהירות 100Mbps',
    hi: '100Mbps वाई-फाई',
    nl: '100Mbps wifi',
  },
  'A/C': {
    de: 'Klimaanlage',
    fr: 'Climatisation',
    it: 'Aria condizionata',
    pt: 'Ar condicionado',
    he: 'מיזוג אוויר',
    hi: 'A/C',
    nl: 'Airco',
  },
  'Private Fenced Parking': {
    de: 'Privater umzäunter Parkplatz',
    fr: 'Parking privé clôturé',
    it: 'Parcheggio privato recintato',
    pt: 'Estacionamento privado vedado',
    he: 'חניה פרטית גדורה',
    hi: 'निजी घिरी हुई पार्किंग',
    nl: 'Eigen omheinde parkeerplaats',
  },
  'Pet Friendly': {
    de: 'Haustierfreundlich',
    fr: 'Animaux acceptés',
    it: 'Animali domestici ammessi',
    pt: 'Aceita animais de estimação',
    he: 'ידידותי לחיות מחמד',
    hi: 'पालतू-अनुकूल',
    nl: 'Huisdiervriendelijk',
  },
  'Bedrooms with A/C': {
    de: 'Schlafzimmer mit Klimaanlage',
    fr: 'Chambres climatisées',
    it: 'Camere con aria condizionata',
    pt: 'Quartos com ar condicionado',
    he: 'חדרי שינה עם מיזוג אוויר',
    hi: 'A/C वाले बेडरूम',
    nl: 'Slaapkamers met airco',
  },
  'Outside Parking': {
    de: 'Außenparkplatz',
    fr: 'Parking extérieur',
    it: 'Parcheggio esterno',
    pt: 'Estacionamento exterior',
    he: 'חניה בחוץ',
    hi: 'बाहरी पार्किंग',
    nl: 'Parkeerplaats buiten',
  },
  '2 Private Equipped Bathrooms': {
    de: '2 private ausgestattete Badezimmer',
    fr: '2 salles de bain privées équipées',
    it: '2 bagni privati attrezzati',
    pt: '2 Casas de banho privativas equipadas',
    he: '2 חדרי אמבטיה פרטיים ומאובזרים',
    hi: '2 निजी सुसज्जित बाथरूम',
    nl: '2 eigen ingerichte badkamers',
  },
  'Private Fenced Parking for 2 Vehicles': {
    de: 'Privater umzäunter Parkplatz für 2 Fahrzeuge',
    fr: 'Parking privé clôturé pour 2 véhicules',
    it: 'Parcheggio privato recintato per 2 veicoli',
    pt: 'Estacionamento privado vedado para 2 veículos',
    he: 'חניה פרטית גדורה ל-2 רכבים',
    hi: 'निजी घिरी हुई पार्किंग, 2 वाहनों के लिए',
    nl: 'Eigen omheinde parkeerplaats voor 2 voertuigen',
  },
  'Private Pool': {
    de: 'Privater Pool',
    fr: 'Piscine privée',
    it: 'Piscina privata',
    pt: 'Piscina privada',
    he: 'בריכה פרטית',
    hi: 'निजी स्विमिंग पूल',
    nl: 'Privézwembad',
  },
  'WiFi': {
    de: 'WLAN',
    fr: 'WiFi',
    it: 'WiFi',
    pt: 'Wi-Fi',
    he: 'WiFi',
    hi: 'वाई-फाई',
    nl: 'Wifi',
  },
  'Unfenced Parking': {
    de: 'Unumzäunter Parkplatz',
    fr: 'Parking non clôturé',
    it: 'Parcheggio non recintato',
    pt: 'Estacionamento não vedado',
    he: 'חניה לא גדורה',
    hi: 'खुली पार्किंग',
    nl: 'Onomheinde parkeerplaats',
  },
  '2 A/C': {
    de: '2 Klimaanlagen',
    fr: '2 climatiseurs',
    it: '2 climatizzatori',
    pt: '2 unidades de ar condicionado',
    he: '2 מזגנים',
    hi: '2 A/C',
    nl: '2 airco\'s',
  },
};
