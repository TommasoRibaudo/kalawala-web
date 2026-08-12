import type { Messages } from './en';

/**
 * Hebrew UI strings.
 *
 * Right-to-left. No directional glyphs (→/←) appear anywhere in en.ts today,
 * so there is nothing to mirror in this pass — see the note this file
 * already carried about that: if a future English string adds one, it needs
 * the mirrored character here, not a CSS transform, because it is a text
 * character.
 *
 * Simplified to singular/plural (not the grammatical dual form for exactly
 * two) for the counting functions — that dual form is common in formal
 * written Hebrew but is routinely simplified to the plural in software UI,
 * and getting it subtly wrong (dual forms are irregular per noun) is a worse
 * failure mode than a colloquial plural.
 */
export const he: Messages = {
  common: {
    checkAvailability: 'בדיקת זמינות',
    readyToBook: 'מוכנים להזמין?',
    instantConfirmation: 'אישור מיידי',
  },

  nav: {
    home: 'בית',
    blog: 'בלוג',
    myBooking: 'ההזמנה שלי',
    bookNow: 'הזמינו עכשיו',
  },

  footer: {
    ourHomes: 'הבתים שלנו',
    travelGuides: 'מדריכי טיולים',
    contact: 'צרו קשר',
    chatOnWhatsApp: 'צ׳אט בוואטסאפ',
  },

  callToAction: {
    exploreAvailability:
      'בדקו זמינות ומחירים בכל הנכסים שלנו בפוארטו וייחו ופלאיה צ׳יקיטה.',
    nonRefundableLead: 'בחרו את',
    nonRefundableBold: 'התעריף שאינו ניתן להחזר',
    nonRefundableTail: 'בכלי ההזמנה כדי ליהנות מהנחה של 10%.',
    availabilityDisclaimer:
      '*מוצגת זמינות של כל הנכסים באזור פוארטו וייחו, כולל נכסים המפורסמים בעמודים אחרים — ודאו שאתם בודקים את שם הבית ואת התמונה שלו לפני ההזמנה!',
    bankTransferLead: 'מעדיפים לשלם בהעברה בנקאית או ב-SINPE? הזמינו איתנו בבטחה ושלחו את אישור המקדמה שלכם אל',
    bankTransferMid: 'או בוואטסאפ למספר',
    bankTransferTail: 'תוך 6 שעות ממועד ההזמנה.',
  },

  hero: {
    tagline: 'בתי נופש מאובזרים במלואם בלב פוארטו וייחו ופלאיה צ׳יקיטה.',
    trust: '✓ אישור מיידי · ✓ הזמנה מאובטחת · ✓ ללא עמלות פלטפורמה',
    rating: '⭐⭐⭐⭐⭐ 4.9/5 באלפי שהיות מאז 2015',
  },

  sections: {
    ourLead: 'הבתים',
    homesHighlight: 'שלנו',
    homeHighlight: 'שלנו',
    villasHighlight: 'הווילות שלנו',
    exploreOtherStays: 'גלו שהיות ייחודיות נוספות בפוארטו וייחו ובפלאיה צ׳יקיטה.',
    villasWithPool: 'וילות יוקרה עם בריכה פרטית בפלאיה צ׳יקיטה, פוארטו וייחו.',
    privateRetreat: 'מקלט פרטי בפלאיה צ׳יקיטה, פוארטו וייחו',
    otherBlogsHeading: 'הציצו בפוסטים נוספים בבלוג שלנו!',
    otherListingsHeading: 'גלו את האפשרויות הנוספות שלנו!',
    readBlog: (title: string) => `קריאת הפוסט: ${title}`,
    weOfferEquipped: 'אנו מציעים בתים מאובזרים במלואם:',
    ourPhotosHeading: 'תמונות',
  },

  contact: {
    headingMain: 'צרו',
    headingHighlight: 'קשר',
    askUsAnything: 'שאלו אותנו כל דבר',
    replyTime: 'אנו עונים בדרך כלל תוך שעה בוואטסאפ.',
    phoneLabel: 'טלפון, וואטסאפ:',
    chatOnWhatsApp: 'צ׳אט בוואטסאפ',
    emailLabel: 'אימייל:',
  },

  reviews: {
    headingMain: 'מה האורחים שלנו',
    headingHighlight: 'אומרים',
    heading: 'מה האורחים שלנו אומרים',
    closeReview: 'סגירת ביקורת',
    closeReviews: 'סגירת ביקורות',
  },

  price: {
    tooltip: 'התעריף הזול ביותר הזמין החודש. המחירים משתנים בהתאם לעונה ולתאריכים שנבחרו.',
    fromPerNight: (price: string) => `החל מ-${price} ללילה`,
    discountLead: 'בחרו את',
    discountBold: 'התעריף שאינו ניתן להחזר',
    discountTail: 'להנחה נוספת של 10%',
  },

  tips: {
    instantConfirmation: (propertyName: string) =>
      `✔ אישור מיידי מובטח עבור ${propertyName}. הזמינו עכשיו והבטיחו את השהות שלכם!`,
    nonRefundableDiscount:
      'בחרו את התעריף שאינו ניתן להחזר בכלי ההזמנה כדי ליהנות מהנחה של 10%.',
    mobileScroll:
      'לאחר בחירת תאריכים ולחיצה על חיפוש, גללו למטה כדי לראות את המחיר ולהזמין.',
  },

  blog: {
    weatherVariabilityNote: 'מזג האוויר בפוארטו ויאחו ידוע כהפכפך — אלה ממוצעים משוערים לטווח ארוך, והתנאים עשויים להשתנות כמה פעמים באותו יום. התייחסו אליהם כאל כיוון כללי, לא כהבטחה.',
    bookYourStay: 'הזמינו את השהות שלכם',
    indexTitle: 'מדריכי טיולים לפוארטו וייחו | Reservas Kalawala',
    indexDescription:
      'עשרה מדריכים מקומיים לפוארטו וייחו דה טלמנקה: איך מגיעים, איך מתניידים ומה לעשות ברגע שמגיעים.',
    indexHeading: 'מדריכי טיולים לפוארטו וייחו',
  },

  home: {
    pageTitle: 'Reservas Kalawala | השכרת בתים בפוארטו וייחו',
    pageDescription:
      'גלו את הבתים שלנו, במחירים זולים יותר מכל פלטפורמה אחרת! ברוכים הבאים לקלאוואלה — אנו מציעים בתי נופש מאובזרים במלואם בלב פוארטו וייחו דה טלמנקה, קוסטה ריקה. הבתים שלנו מציעים מקום עד 5 אנשים, 2 יחידות מיזוג אוויר, חדר רחצה ומטבח פרטיים מאובזרים במלואם וחיבור Wi-Fi חינם.',
    helpMeChooseTitle: 'מצאו את',
    helpMeChooseTitleHighlight: 'השהות המושלמת עבורכם',
    optionCouples: 'אידיאלי לזוגות',
    optionFamilies: 'מושלם למשפחות',
    optionPetFriendly: 'ידידותי לחיות מחמד',
    optionBestValue: 'התמורה הטובה ביותר למחיר',
  },

  property: {
    capacityAriaLabel: 'קיבולת הנכס',
    viewListing: (name: string) => `צפייה במודעה: ${name}`,
    checkInLabel: 'צ׳ק-אין:',
    checkOutLabel: 'צ׳ק-אאוט:',
    stickyCta: 'בדיקת זמינות',
    whyGuestsChoose: (propertyName: string) => `למה אורחים בוחרים ב-${propertyName}`,
    bedrooms: (count: number) => `${count} ${count === 1 ? 'חדר שינה' : 'חדרי שינה'}`,
    bathrooms: (count: number) => `${count} ${count === 1 ? 'חדר רחצה' : 'חדרי רחצה'}`,
    upToGuests: (count: number) => `עד ${count} ${count === 1 ? 'אורח' : 'אורחים'}`,
    viewHomeCta: 'צפייה בבית →',
  },
  cookieBanner: {
    title: '🍪 עוגיות',
    description: 'אנו משתמשים בעוגיות כדי לשפר את חווייתך ולנתח את התנועה באתר.',
    acceptAll: 'קבל הכול',
    rejectAll: 'דחה הכול',
    customize: 'אפשרויות',
    essential: 'חיוניות',
    analytics: 'אנליטיקה',
    marketing: 'שיווק',
    required: '(חובה)',
    essentialDesc: 'נדרשות לתפקוד האתר.',
    analyticsDesc: 'עוזרות לנו להבין את השימוש באתר.',
    marketingDesc: 'להצגת מודעות רלוונטיות.',
    savePreferences: 'שמור',
    cancel: 'ביטול',
  },

  notFound: {
    title: 'עמוד לא נמצא | Reservas Kalawala',
    heading: 'לא הצלחנו למצוא את העמוד הזה',
    body: 'ייתכן שהקישור שבור או שהעמוד הועבר.',
    cta: 'חזרה לדף הבית',
  },

  whyStayWithUs: {
    title: 'למה להזמין איתנו?',
    benefits: [
      'מיקומים אסטרטגיים',
      'בתים מאובזרים במלואם',
      'הזמנה ישירה ותמיכה מקומית',
      'ללא עמלות פלטפורמה',
    ],
    ctaText: 'צפייה בכל הנכסים שלנו',
  },

  imagesModal: {
    close: 'סגור',
    photos: 'תמונות',
    previous: 'הקודם',
    next: 'הבא',
    empty: 'אין תמונות זמינות',
  },

  reviewTags: {
    'Stayed a few nights': 'שהות של כמה לילות',
    'Stayed one night': 'שהות של לילה אחד',
    'Stayed with kids': 'שהות עם ילדים',
    'Stayed with a pet': 'שהות עם חיית מחמד',
    'Stayed about a week': 'שהות של כשבוע',
  },

};
