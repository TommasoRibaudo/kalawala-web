import type { BookingLanguage } from '../services/BookingApi.service';

export const portalStrings = {
  en: {
    siteTitle: 'Kalawala Reservations',
    documentTitle: 'Manage your reservation',
    metaDescription: 'Log in with your reservation ID and password to manage your Kalawala booking.',
    eyebrow: 'Kalawala',
    title: 'Manage your reservation',
    subtitle: 'Enter your reservation ID and the portal password you chose at checkout.',
    reservationId: 'Reservation ID',
    reservationIdHelp: 'Found in your booking confirmation email.',
    password: 'Portal password',
    submit: 'Sign in',
    submitting: 'Signing in',
    validationReservationId: 'Enter your reservation ID.',
    validationPassword: 'Enter your portal password.',
    errorInvalidCredentials: 'Reservation ID or password is incorrect.',
    errorBookingNotConfirmed: 'This reservation is not confirmed yet. You can sign in once we confirm it.',
    errorTooManyAttempts: 'Too many attempts. Please wait a few minutes before trying again.',
    errorGeneric: 'We could not sign you in right now. Please try again.',
  },
  es: {
    siteTitle: 'Reservas Kalawala',
    documentTitle: 'Gestiona tu reserva',
    metaDescription: 'Ingresa con tu ID de reserva y contraseña para gestionar tu reserva en Kalawala.',
    eyebrow: 'Kalawala',
    title: 'Gestiona tu reserva',
    subtitle: 'Ingresa tu ID de reserva y la contraseña del portal que elegiste al reservar.',
    reservationId: 'ID de reserva',
    reservationIdHelp: 'Lo encontrarás en el correo de confirmación de tu reserva.',
    password: 'Contraseña del portal',
    submit: 'Iniciar sesión',
    submitting: 'Iniciando sesión',
    validationReservationId: 'Ingresa tu ID de reserva.',
    validationPassword: 'Ingresa tu contraseña del portal.',
    errorInvalidCredentials: 'El ID de reserva o la contraseña son incorrectos.',
    errorBookingNotConfirmed: 'Esta reserva aún no está confirmada. Podrás entrar en cuanto la confirmemos.',
    errorTooManyAttempts: 'Demasiados intentos. Espera unos minutos antes de intentarlo de nuevo.',
    errorGeneric: 'No pudimos iniciar sesión ahora. Inténtalo de nuevo.',
  },
};

export type PortalStrings = (typeof portalStrings)[BookingLanguage];
