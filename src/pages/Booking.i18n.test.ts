import { bookingStrings } from './Booking.i18n';

const bookingFlowKeys = [
  'bookNow',
  'checkoutTitle',
  'guestDetails',
  'portalPassword',
  'portalPasswordHelp',
  'termsAccepted',
  'paypalTitle',
  'paypalDescription',
  'paypalReturnTitle',
  'paypalReturnProcessing',
  'paypalReturnProcessingBody',
  'paypalReturnSuccessBody',
  'paypalReturnMissing',
  'paypalCaptureError',
  'continueToPayment',
  'creatingHold',
  'creatingPayPalOrder',
  'holdExpiring',
  'holdActiveTitle',
  'holdActiveBody',
  'holdExpiresAt',
  'checkoutSummary',
  'confirmationTitle',
  'confirmationSubtitle',
  'confirmationMissing',
  'reservationId',
  'manageBooking',
  'stayDates',
  'paymentConfirmed',
  'notAvailable',
  'validationRequired',
  'validationEmail',
  'validationPortalPassword',
  'validationTerms',
  'propertyNoLongerAvailable',
  'paymentNotReady',
  'checkoutUnavailable',
] as const;

const locales = Object.keys(bookingStrings) as Array<keyof typeof bookingStrings>;

test.each(locales.filter((locale) => locale !== 'en'))(
  'Booking.i18n exposes the same booking-flow keys in English and %s',
  (locale) => {
    expect(Object.keys(bookingStrings[locale]).sort()).toEqual(Object.keys(bookingStrings.en).sort());
  }
);

test.each(locales)(
  'Booking.i18n has non-empty %s copy for checkout, hold, PayPal return, and confirmation UI',
  (locale) => {
    for (const key of bookingFlowKeys) {
      expect(bookingStrings[locale][key]).toBeDefined();

      if (typeof bookingStrings[locale][key] === 'string') {
        expect(bookingStrings[locale][key]).toEqual(expect.stringMatching(/\S/));
      }
    }
  }
);
