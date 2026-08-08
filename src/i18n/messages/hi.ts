import type { Messages } from './en';

/**
 * Hindi UI strings.
 *
 * Formal register (आप, not तुम), matching a hospitality booking site's tone.
 * "बाथरूम" (bathroom) and "मेहमान" (guest) are invariant under pluralisation
 * in Hindi — the count itself carries the plural sense — so those two
 * counting functions do not branch on `count` the way "कमरा"/"कमरे"
 * (room/rooms) correctly does.
 */
export const hi: Messages = {
  common: {
    checkAvailability: 'उपलब्धता जांचें',
    readyToBook: 'बुक करने के लिए तैयार हैं?',
    instantConfirmation: 'तुरंत पुष्टि',
  },

  nav: {
    home: 'होम',
    blog: 'ब्लॉग',
    myBooking: 'मेरी बुकिंग',
    bookNow: 'अभी बुक करें',
  },

  footer: {
    ourHomes: 'हमारे घर',
    travelGuides: 'यात्रा गाइड',
    contact: 'संपर्क करें',
    chatOnWhatsApp: 'व्हाट्सएप पर चैट करें',
  },

  callToAction: {
    exploreAvailability:
      'पुएर्तो वियेहो और प्लाया चिकिटा में हमारी सभी संपत्तियों की उपलब्धता और कीमतें देखें।',
    nonRefundableLead: 'बुकिंग टूल में',
    nonRefundableBold: 'नॉन-रिफंडेबल दर',
    nonRefundableTail: 'चुनकर 10% की छूट पाएं।',
    availabilityDisclaimer:
      '*पुएर्तो वियेहो क्षेत्र की सभी उपलब्ध संपत्तियों की उपलब्धता दिखाई जा रही है, जिनमें अन्य पेजों पर विज्ञापित संपत्तियां भी शामिल हैं — बुकिंग से पहले घर का नाम और उसकी फोटो जरूर जांच लें!',
    bankTransferLead: 'बैंक ट्रांसफर या SINPE से भुगतान करना पसंद करते हैं? हमारे साथ सुरक्षित रूप से बुक करें और अपनी डिपॉज़िट पुष्टि यहां भेजें',
    bankTransferMid: 'या व्हाट्सएप पर यहां भेजें',
    bankTransferTail: 'अपनी बुकिंग के 6 घंटे के भीतर।',
  },

  hero: {
    tagline: 'पुएर्तो वियेहो और प्लाया चिकिटा के दिल में पूरी तरह सुसज्जित छुट्टियों के घर।',
    trust: '✓ तुरंत पुष्टि · ✓ सुरक्षित बुकिंग · ✓ कोई प्लेटफ़ॉर्म शुल्क नहीं',
    rating: '⭐⭐⭐⭐⭐ 2015 से हज़ारों ठहरावों पर 4.9/5',
  },

  sections: {
    ourLead: 'हमारे',
    homesHighlight: 'घर',
    homeHighlight: 'घर',
    villasHighlight: 'विला',
    exploreOtherStays: 'पुएर्तो वियेहो और प्लाया चिकिटा में अन्य अनोखे ठहराव देखें।',
    villasWithPool: 'प्लाया चिकिटा, पुएर्तो वियेहो में निजी पूल वाली लक्ज़री विला।',
    privateRetreat: 'प्लाया चिकिटा, पुएर्तो वियेहो में एक निजी रिट्रीट',
    otherBlogsHeading: 'हमारे अन्य ब्लॉग भी देखें!',
    otherListingsHeading: 'हमारे अन्य विकल्प देखें!',
    readBlog: (title: string) => `ब्लॉग पढ़ें: ${title}`,
    weOfferEquipped: 'हम पूरी तरह सुसज्जित घर उपलब्ध कराते हैं:',
  },

  contact: {
    headingMain: 'हमसे',
    headingHighlight: 'संपर्क करें',
    askUsAnything: 'हमसे कुछ भी पूछें',
    replyTime: 'हम आमतौर पर व्हाट्सएप पर एक घंटे के भीतर जवाब देते हैं।',
    phoneLabel: 'फ़ोन, व्हाट्सएप:',
    chatOnWhatsApp: 'व्हाट्सएप पर चैट करें',
    emailLabel: 'ईमेल:',
  },

  reviews: {
    headingMain: 'हमारे मेहमान',
    headingHighlight: 'क्या कहते हैं',
    heading: 'हमारे मेहमान क्या कहते हैं',
    closeReview: 'समीक्षा बंद करें',
    closeReviews: 'समीक्षाएं बंद करें',
  },

  price: {
    tooltip: 'इस महीने की सबसे कम उपलब्ध दर। कीमतें मौसम और चुनी गई तारीखों के अनुसार बदलती हैं।',
  },

  tips: {
    instantConfirmation: (propertyName: string) =>
      `✔ ${propertyName} के लिए तुरंत पुष्टि की गारंटी। अभी बुक करें और अपना ठहराव सुनिश्चित करें!`,
    nonRefundableDiscount:
      'बुकिंग टूल में नॉन-रिफंडेबल दर चुनकर 10% की छूट पाएं।',
    mobileScroll:
      'तारीखें चुनने और खोजने के बाद, कीमत देखने और बुक करने के लिए नीचे स्क्रॉल करें।',
  },

  blog: {
    bookYourStay: 'अपना ठहराव बुक करें',
    indexTitle: 'पुएर्तो वियेहो यात्रा गाइड | Reservas Kalawala',
    indexDescription:
      'पुएर्तो वियेहो दे तालामांका के बारे में दस स्थानीय गाइड: वहां कैसे पहुंचें, वहां कैसे घूमें, और पहुंचने के बाद क्या करें।',
    indexHeading: 'पुएर्तो वियेहो यात्रा गाइड',
  },

  home: {
    pageTitle: 'Reservas Kalawala | पुएर्तो वियेहो में घर किराए पर',
    pageDescription:
      'हमारे घर देखें, किसी भी अन्य प्लेटफ़ॉर्म से सस्ते! कलावाला में आपका स्वागत है — हम कोस्टा रिका के पुएर्तो वियेहो दे तालामांका के दिल में पूरी तरह सुसज्जित छुट्टियों के घर उपलब्ध कराते हैं। हमारे घरों में 5 लोगों तक की जगह, 2 एसी यूनिट, पूरी तरह सुसज्जित निजी बाथरूम और रसोई, तथा मुफ़्त वाई-फाई इंटरनेट कनेक्शन है।',
    helpMeChooseTitle: 'अपना',
    helpMeChooseTitleHighlight: 'आदर्श ठहराव खोजें',
    optionCouples: 'जोड़ों के लिए आदर्श',
    optionFamilies: 'परिवारों के लिए बिल्कुल सही',
    optionPetFriendly: 'पेट-फ्रेंडली',
    optionBestValue: 'सबसे अच्छा मूल्य',
  },

  property: {
    capacityAriaLabel: 'संपत्ति की क्षमता',
    viewListing: (name: string) => `लिस्टिंग देखें: ${name}`,
    checkInLabel: 'चेक-इन:',
    checkOutLabel: 'चेक-आउट:',
    stickyCta: 'उपलब्धता जांचें',
    whyGuestsChoose: (propertyName: string) => `मेहमान ${propertyName} को क्यों चुनते हैं`,
    bedrooms: (count: number) => `${count} ${count === 1 ? 'कमरा' : 'कमरे'}`,
    bathrooms: (count: number) => `${count} बाथरूम`,
    upToGuests: (count: number) => `${count} तक मेहमान`,
  },
};
