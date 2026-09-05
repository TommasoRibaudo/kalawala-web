/**
 * emailTemplates.ts
 *
 * Bilingual (EN/ES) email templates for each booking state transition.
 * Each template returns { subject, html, text } ready for SES SendEmail.
 *
 * Templates are intentionally plain HTML — no external dependencies.
 */

import type { BookingLanguage } from "./bookingSessions";

export interface EmailTemplateInput {
  language: BookingLanguage;
  guestFirstName: string;
  guestEmail: string;
  /** Shown to staff on the deposit review email so they can reach the guest directly. */
  guestPhone?: string;
  reservationPublicId: string;
  propertyName: string;
  arrivalDate: string;
  departureDate: string;
  guests: number;
  currency?: string;
  totalAmountCents?: number;
  holdExpiresAt?: string;
  paypalOrderId?: string;
  /** Link back to the booking page with this hold resumed, so the guest can approve the PayPal payment. */
  paypalResumeUrl?: string;
  paypalCaptureId?: string;
  confirmedAt?: string;
  cancellationReason?: string;
  /**
   * Whether a refund is owed for a cancellation. Defaults to true when a capture
   * id is present; set false for cancellations inside the no-refund window.
   */
  refundExpected?: boolean;
  /** Manual deposit flow — SINPE and bank account details shown to the guest. */
  bankInfo?: {
    sinpePhone: string;
    sinpeName: string;
    bankAccount: { accountHolder: string; colonesIban: string; dolaresIban: string };
  };
  /** Where the guest uploads their transfer receipt. */
  depositUploadUrl?: string;
  /** Presigned link to an uploaded receipt, for the staff review email. */
  depositReceiptUrl?: string;
  /** Signed one-click staff links. */
  depositConfirmUrl?: string;
  depositRejectUrl?: string;
  /** Override default WhatsApp contact URL (falls back to config/env default) */
  contactWhatsApp?: string;
  /** Override default contact email address (falls back to config/env default) */
  contactEmail?: string;
  /** Free-text guest message — portal help/cancellation requests. HTML-escaped by the renderer, not the caller. */
  guestMessage?: string;
  /** Optional category the guest picked for a help request (e.g. "general", "maintenance"). */
  helpRequestType?: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

// ─── String maps ──────────────────────────────────────────────────────────────

export const strings = {
  en: {
    greeting: (name: string) => `Hi ${name},`,
    footer: "Kalawala Vacation Rentals · Puerto Viejo, Costa Rica",
    reservationId: "Reservation ID",
    property: "Property",
    arrival: "Arrival",
    departure: "Departure",
    guests: "Guests",
    totalAmount: "Total",
    holdExpires: "Hold expires",
    paypalOrderId: "PayPal Order",
    paypalCaptureId: "PayPal Capture",
    confirmedAt: "Confirmed at",

    holdCreated: {
      subject: (id: string) => `Your hold is active: ${id}`,
      intro: "Your hold is active, so the dates are yours for now.",
      cta: "Complete your PayPal payment before the hold expires and the booking is confirmed.",
      warning: "If the hold expires, the dates go back on sale and you will have to start a new search.",
    },
    paymentPending: {
      subject: (id: string) => `Complete your payment: ${id}`,
      intro: "We created your PayPal order. Approve the payment and your booking is confirmed.",
      cta: "Return to the booking page to approve your PayPal payment.",
      warning: "The hold expires if you do not complete the payment in time.",
    },
    confirmed: {
      subject: (id: string) => `Booking confirmed: ${id}`,
      intro: "Your booking is confirmed. We look forward to welcoming you to Puerto Viejo!",
      cta: "You can view your reservation with your reservation ID and the password you set at checkout.",
      note: "If you have any questions, please contact us at reservas.kalawala@gmail.com or via WhatsApp.",
    },
    cancelled: {
      subject: (id: string) => `Reservation cancelled: ${id}`,
      intro: "Your reservation hold has expired or been cancelled.",
      cta: "You are welcome to search for new dates on our website.",
      note: "If you believe this is an error, please contact us.",
    },
    depositHandoff: {
      subject: "Manual deposit instructions from Kalawala",
      intro: "Thanks for your interest in booking with Kalawala. Three steps complete your reservation by manual deposit.",
      step1: "Contact us via WhatsApp or email to confirm availability and receive bank transfer details.",
      step2: "Transfer the deposit amount and send us proof of payment.",
      step3: "Our team will confirm your booking directly in our system.",
      warning: "Your booking is NOT confirmed until our team verifies your deposit and confirms it manually.",
      contactLabel: "Contact us",
    },
    cancellationReason: "Reason",
    bankTransfer: "Bank transfer",
    sinpe: "SINPE Móvil",
    accountHolder: "Account holder",
    colones: "Colones account",
    dolares: "Dólares account",
    depositInstructions: {
      subject: (id: string) => `Complete your bank transfer: ${id}`,
      intro:
        "We are holding your dates while you complete the transfer. Send the amount below by bank transfer or SINPE Móvil, then upload your receipt so our team can verify it.",
      warning:
        "Your dates are held only until the time shown above. If we have not confirmed the transfer by then, the hold is released and the property goes back on sale.",
      uploadCta: "Upload your receipt",
      note: "Once our team confirms the payment we will email you the confirmation and your portal access.",
    },
    depositConfirmed: {
      subject: (id: string) => `Booking confirmed: ${id}`,
      intro: "We have verified your deposit and your booking is confirmed. We look forward to welcoming you!",
      portalCta:
        "You can now manage your booking online using your reservation ID and the password you chose during checkout.",
      note: "If anything about your stay changes, contact us and we will help.",
    },
    depositRejected: {
      subject: (id: string) => `We could not confirm your deposit: ${id}`,
      intro:
        "We were unable to confirm your bank transfer or SINPE Móvil payment, so we released your held dates.",
      cta: "If you already sent the transfer, please contact us with your receipt so we can look into it.",
      note: "You are welcome to search for new dates or start a new booking on our website.",
    },
    staffDepositReview: {
      subject: (id: string) => `[ACTION] Deposit booking awaiting confirmation: ${id}`,
      intro:
        "A guest booked by bank transfer / SINPE. The dates are held in Smoobu on the blocked channel until you confirm or reject.",
      action: "Confirm once the money has landed. Rejecting releases the hold and frees the dates immediately.",
      receiptLabel: "Uploaded receipt",
      noReceipt: "No receipt uploaded yet.",
      guestContact: "Guest contact",
      confirmLabel: "Review and confirm",
      rejectLabel: "Reject and release the dates",
    },
    guestCancelled: {
      subject: (id: string) => `Your booking is cancelled: ${id}`,
      intro: "We cancelled your booking as you asked. The dates are back on sale and we will not charge you again.",
      refundPending:
        "Our team issues refunds by hand, back to the PayPal account you paid with. It can take a few business days to appear.",
      noRefund: "This booking was cancelled within 24 hours of check-in, so no refund applies.",
      note: "If you did not request this cancellation, please contact us straight away.",
    },
    staffCancelled: {
      subject: (id: string) => `[ACTION] Guest cancelled ${id}: refund required`,
      intro: "A guest cancelled their booking through the guest portal. The Smoobu reservation has already been cancelled and the dates released.",
      action: "Issue the refund in PayPal for the capture below. The payment is flagged as refund_flagged until you do.",
      noRefundAction: "No refund is due. The guest cancelled inside the 24-hour window.",
      guestContact: "Guest contact",
    },
    staffHelpRequest: {
      subject: (id: string) => `Help request: ${id}`,
      intro: "A guest sent a message through their booking portal.",
      typeLabel: "Type",
      messageLabel: "Message",
      guestContact: "Guest contact",
    },
    staffCancellationRequest: {
      subject: (id: string) => `[ACTION] Cancellation request: ${id}`,
      intro: "A guest asked to cancel their confirmed booking through the portal. This is a request, not a self-service cancellation — the booking is still active and Smoobu has not been touched.",
      reasonLabel: "Reason",
      messageLabel: "Message",
      guestContact: "Guest contact",
      action: "Follow up with the guest and process the cancellation by hand if appropriate.",
    },
  },
  es: {
    greeting: (name: string) => `Hola ${name},`,
    footer: "Kalawala Vacation Rentals · Puerto Viejo, Costa Rica",
    reservationId: "ID de reserva",
    property: "Propiedad",
    arrival: "Llegada",
    departure: "Salida",
    guests: "Huéspedes",
    totalAmount: "Total",
    holdExpires: "La reserva expira",
    paypalOrderId: "Orden PayPal",
    paypalCaptureId: "Captura PayPal",
    confirmedAt: "Confirmado el",

    holdCreated: {
      subject: (id: string) => `Tu reserva está activa: ${id}`,
      intro: "Tu reserva provisional está activa, así que las fechas son tuyas por ahora.",
      cta: "Completa el pago con PayPal antes de que expire la reserva y tu estadía queda confirmada.",
      warning: "Si la reserva expira, las fechas vuelven a estar disponibles y tendrás que empezar una nueva búsqueda.",
    },
    paymentPending: {
      subject: (id: string) => `Completa tu pago: ${id}`,
      intro: "Creamos tu orden de PayPal. Aprueba el pago y tu reserva queda confirmada.",
      cta: "Regresa a la página de reserva para aprobar tu pago con PayPal.",
      warning: "La reserva expira si no completas el pago a tiempo.",
    },
    confirmed: {
      subject: (id: string) => `Reserva confirmada: ${id}`,
      intro: "¡Tu reserva está confirmada! Esperamos darte la bienvenida en Puerto Viejo.",
      cta: "Puedes ver tu reserva con tu ID de reserva y la contraseña que creaste al reservar.",
      note: "Si tienes alguna pregunta, contáctanos en reservas.kalawala@gmail.com o por WhatsApp.",
    },
    cancelled: {
      subject: (id: string) => `Reserva cancelada: ${id}`,
      intro: "Tu reserva provisional ha expirado o ha sido cancelada.",
      cta: "Puedes buscar nuevas fechas en nuestro sitio web.",
      note: "Si crees que esto es un error, por favor contáctanos.",
    },
    depositHandoff: {
      subject: "Instrucciones de depósito manual de Kalawala",
      intro: "Gracias por tu interés en reservar con Kalawala. Tres pasos completan tu reserva por depósito manual.",
      step1: "Contáctanos por WhatsApp o correo electrónico para confirmar disponibilidad y recibir los datos bancarios.",
      step2: "Realiza la transferencia del depósito y envíanos el comprobante de pago.",
      step3: "Nuestro equipo confirmará tu reserva directamente en nuestro sistema.",
      warning: "Tu reserva NO está confirmada hasta que nuestro equipo verifique tu depósito y lo confirme manualmente.",
      contactLabel: "Contáctanos",
    },
    cancellationReason: "Motivo",
    bankTransfer: "Transferencia bancaria",
    sinpe: "SINPE Móvil",
    accountHolder: "Titular de la cuenta",
    colones: "Cuenta en colones",
    dolares: "Cuenta en dólares",
    depositInstructions: {
      subject: (id: string) => `Completa tu transferencia: ${id}`,
      intro:
        "Estamos reservando tus fechas mientras completas la transferencia. Envía el monto indicado por transferencia bancaria o SINPE Móvil y luego sube tu comprobante para que nuestro equipo lo verifique.",
      warning:
        "Tus fechas quedan reservadas solo hasta la hora indicada arriba. Si no confirmamos la transferencia antes, la reserva se libera y la propiedad vuelve a estar disponible.",
      uploadCta: "Sube tu comprobante",
      note: "Cuando nuestro equipo confirme el pago te enviaremos la confirmación y el acceso a tu portal.",
    },
    depositConfirmed: {
      subject: (id: string) => `Reserva confirmada: ${id}`,
      intro: "Hemos verificado tu depósito y tu reserva está confirmada. ¡Te esperamos!",
      portalCta:
        "Ya puedes gestionar tu reserva en línea con tu ID de reserva y la contraseña que elegiste durante el proceso de pago.",
      note: "Si algo cambia en tu estadía, contáctanos y te ayudamos.",
    },
    depositRejected: {
      subject: (id: string) => `No pudimos confirmar tu depósito: ${id}`,
      intro:
        "No pudimos confirmar tu transferencia bancaria o pago por SINPE Móvil, así que liberamos las fechas reservadas.",
      cta: "Si ya realizaste la transferencia, contáctanos con tu comprobante para que podamos revisarlo.",
      note: "Puedes buscar nuevas fechas o iniciar una nueva reserva en nuestro sitio web.",
    },
    staffDepositReview: {
      subject: (id: string) => `[ACCIÓN] Reserva por depósito pendiente de confirmar: ${id}`,
      intro:
        "Un huésped reservó por transferencia / SINPE. Las fechas están bloqueadas en Smoobu en el canal Blocked hasta que confirmes o rechaces.",
      action: "Confirma cuando el dinero haya ingresado. Rechazar libera la reserva y las fechas de inmediato.",
      receiptLabel: "Comprobante subido",
      noReceipt: "Aún no se ha subido comprobante.",
      guestContact: "Contacto del huésped",
      confirmLabel: "Revisar y confirmar",
      rejectLabel: "Rechazar y liberar las fechas",
    },
    guestCancelled: {
      subject: (id: string) => `Cancelamos tu reserva: ${id}`,
      intro: "Cancelamos tu reserva como lo pediste. Las fechas quedaron liberadas y no te volveremos a cobrar.",
      refundPending:
        "Nuestro equipo procesa los reembolsos a mano y lo devolverá a la cuenta de PayPal con la que pagaste. Puede tardar algunos días hábiles en reflejarse.",
      noRefund: "Esta reserva se canceló dentro de las 24 horas previas al check-in, así que no corresponde reembolso.",
      note: "Si no solicitaste esta cancelación, contáctanos de inmediato.",
    },
    staffCancelled: {
      subject: (id: string) => `[ACCIÓN] Huésped canceló ${id}: reembolso requerido`,
      intro: "Un huésped canceló su reserva desde el portal. La reserva en Smoobu ya fue cancelada y las fechas quedaron liberadas.",
      action: "Emite el reembolso en PayPal para la captura indicada abajo. El pago queda marcado como refund_flagged hasta que lo hagas.",
      noRefundAction: "No corresponde reembolso. El huésped canceló dentro de la ventana de 24 horas.",
      guestContact: "Contacto del huésped",
    },
    staffHelpRequest: {
      subject: (id: string) => `Solicitud de ayuda: ${id}`,
      intro: "Un huésped envió un mensaje desde el portal de su reserva.",
      typeLabel: "Tipo",
      messageLabel: "Mensaje",
      guestContact: "Contacto del huésped",
    },
    staffCancellationRequest: {
      subject: (id: string) => `[ACCIÓN] Solicitud de cancelación: ${id}`,
      intro: "Un huésped solicitó cancelar su reserva confirmada desde el portal. Esto es una solicitud, no una cancelación automática — la reserva sigue activa y no se ha tocado Smoobu.",
      reasonLabel: "Motivo",
      messageLabel: "Mensaje",
      guestContact: "Contacto del huésped",
      action: "Da seguimiento al huésped y procesa la cancelación manualmente si corresponde.",
    },
  },
  de: {
    greeting: (name: string) => `Hallo ${name},`,
    footer: "Kalawala Vacation Rentals · Puerto Viejo, Costa Rica",
    reservationId: "Reservierungsnummer",
    property: "Unterkunft",
    arrival: "Anreise",
    departure: "Abreise",
    guests: "Gäste",
    totalAmount: "Gesamtbetrag",
    holdExpires: "Reservierung läuft ab",
    paypalOrderId: "PayPal-Bestellung",
    paypalCaptureId: "PayPal-Zahlung",
    confirmedAt: "Bestätigt am",

    holdCreated: {
      subject: (id: string) => `Ihre Reservierung ist aktiv: ${id}`,
      intro: "Ihre Reservierung ist aktiv, die Daten gehören vorerst Ihnen.",
      cta: "Schließen Sie Ihre PayPal-Zahlung ab, bevor die Reservierung abläuft, damit die Buchung bestätigt wird.",
      warning: "Läuft die Reservierung ab, werden die Daten wieder freigegeben und Sie müssen eine neue Suche starten.",
    },
    paymentPending: {
      subject: (id: string) => `Schließen Sie Ihre Zahlung ab: ${id}`,
      intro: "Wir haben Ihre PayPal-Bestellung erstellt. Genehmigen Sie die Zahlung, damit Ihre Buchung bestätigt wird.",
      cta: "Kehren Sie zur Buchungsseite zurück, um Ihre PayPal-Zahlung zu genehmigen.",
      warning: "Die Reservierung läuft ab, wenn Sie die Zahlung nicht rechtzeitig abschließen.",
    },
    confirmed: {
      subject: (id: string) => `Buchung bestätigt: ${id}`,
      intro: "Ihre Buchung ist bestätigt. Wir freuen uns, Sie in Puerto Viejo willkommen zu heißen!",
      cta: "Sie können Ihre Reservierung mit Ihrer Reservierungsnummer und dem beim Checkout festgelegten Passwort einsehen.",
      note: "Bei Fragen kontaktieren Sie uns unter reservas.kalawala@gmail.com oder per WhatsApp.",
    },
    cancelled: {
      subject: (id: string) => `Reservierung storniert: ${id}`,
      intro: "Ihre Reservierung ist abgelaufen oder wurde storniert.",
      cta: "Sie können gerne neue Daten auf unserer Website suchen.",
      note: "Falls Sie glauben, dass dies ein Fehler ist, kontaktieren Sie uns bitte.",
    },
    depositHandoff: {
      subject: "Anleitung zur manuellen Anzahlung von Kalawala",
      intro: "Danke für Ihr Interesse an einer Buchung bei Kalawala. Drei Schritte vervollständigen Ihre Reservierung per manueller Anzahlung.",
      step1: "Kontaktieren Sie uns per WhatsApp oder E-Mail, um die Verfügbarkeit zu bestätigen und die Banküberweisungsdaten zu erhalten.",
      step2: "Überweisen Sie den Anzahlungsbetrag und senden Sie uns den Zahlungsnachweis.",
      step3: "Unser Team bestätigt Ihre Buchung direkt in unserem System.",
      warning: "Ihre Buchung ist NICHT bestätigt, bis unser Team Ihre Anzahlung überprüft und manuell bestätigt hat.",
      contactLabel: "Kontaktieren Sie uns",
    },
    cancellationReason: "Grund",
    bankTransfer: "Banküberweisung",
    sinpe: "SINPE Móvil",
    accountHolder: "Kontoinhaber",
    colones: "Konto in Colones",
    dolares: "Konto in Dollar",
    depositInstructions: {
      subject: (id: string) => `Schließen Sie Ihre Überweisung ab: ${id}`,
      intro:
        "Wir reservieren Ihre Daten, während Sie die Überweisung abschließen. Senden Sie den unten angegebenen Betrag per Banküberweisung oder SINPE Móvil und laden Sie anschließend Ihren Beleg hoch, damit unser Team ihn prüfen kann.",
      warning:
        "Ihre Daten sind nur bis zur oben angegebenen Zeit reserviert. Bestätigen wir die Überweisung bis dahin nicht, wird die Reservierung aufgehoben und die Unterkunft wieder freigegeben.",
      uploadCta: "Beleg hochladen",
      note: "Sobald unser Team die Zahlung bestätigt hat, senden wir Ihnen die Bestätigung und den Zugang zu Ihrem Portal.",
    },
    depositConfirmed: {
      subject: (id: string) => `Buchung bestätigt: ${id}`,
      intro: "Wir haben Ihre Anzahlung überprüft und Ihre Buchung ist bestätigt. Wir freuen uns auf Sie!",
      portalCta:
        "Sie können Ihre Buchung nun online mit Ihrer Reservierungsnummer und dem beim Checkout gewählten Passwort verwalten.",
      note: "Sollte sich an Ihrem Aufenthalt etwas ändern, kontaktieren Sie uns und wir helfen Ihnen.",
    },
    depositRejected: {
      subject: (id: string) => `Wir konnten Ihre Anzahlung nicht bestätigen: ${id}`,
      intro:
        "Wir konnten Ihre Banküberweisung oder SINPE-Móvil-Zahlung nicht bestätigen und haben Ihre reservierten Daten daher freigegeben.",
      cta: "Falls Sie die Überweisung bereits gesendet haben, kontaktieren Sie uns bitte mit Ihrem Beleg, damit wir es prüfen können.",
      note: "Sie können gerne neue Daten suchen oder eine neue Buchung auf unserer Website starten.",
    },
    staffDepositReview: {
      subject: (id: string) => `[AKTION] Anzahlungsbuchung wartet auf Bestätigung: ${id}`,
      intro:
        "Ein Gast hat per Banküberweisung / SINPE gebucht. Die Daten sind in Smoobu im gesperrten Kanal reserviert, bis Sie bestätigen oder ablehnen.",
      action: "Bestätigen Sie, sobald das Geld eingegangen ist. Ablehnen gibt die Reservierung und die Daten sofort frei.",
      receiptLabel: "Hochgeladener Beleg",
      noReceipt: "Noch kein Beleg hochgeladen.",
      guestContact: "Kontakt des Gastes",
      confirmLabel: "Prüfen und bestätigen",
      rejectLabel: "Ablehnen und Daten freigeben",
    },
    guestCancelled: {
      subject: (id: string) => `Ihre Buchung wurde storniert: ${id}`,
      intro: "Wir haben Ihre Buchung wie gewünscht storniert. Die Daten sind wieder freigegeben und wir werden Sie nicht erneut belasten.",
      refundPending:
        "Unser Team bearbeitet Rückerstattungen manuell, zurück auf das PayPal-Konto, mit dem Sie bezahlt haben. Es kann einige Werktage dauern, bis sie erscheint.",
      noRefund: "Diese Buchung wurde innerhalb von 24 Stunden vor dem Check-in storniert, daher besteht kein Anspruch auf Rückerstattung.",
      note: "Falls Sie diese Stornierung nicht beantragt haben, kontaktieren Sie uns bitte umgehend.",
    },
    staffCancelled: {
      subject: (id: string) => `[AKTION] Gast hat storniert ${id}: Rückerstattung erforderlich`,
      intro: "Ein Gast hat seine Buchung über das Gästeportal storniert. Die Smoobu-Reservierung wurde bereits storniert und die Daten freigegeben.",
      action: "Erstatten Sie den Betrag für die untenstehende Zahlung in PayPal zurück. Die Zahlung ist bis dahin als refund_flagged markiert.",
      noRefundAction: "Keine Rückerstattung fällig. Der Gast hat innerhalb des 24-Stunden-Fensters storniert.",
      guestContact: "Kontakt des Gastes",
    },
    staffHelpRequest: {
      subject: (id: string) => `Hilfeanfrage: ${id}`,
      intro: "Ein Gast hat über sein Buchungsportal eine Nachricht gesendet.",
      typeLabel: "Typ",
      messageLabel: "Nachricht",
      guestContact: "Kontakt des Gastes",
    },
    staffCancellationRequest: {
      subject: (id: string) => `[AKTION] Stornierungsanfrage: ${id}`,
      intro: "Ein Gast hat über das Portal gebeten, seine bestätigte Buchung zu stornieren. Dies ist eine Anfrage, keine automatische Stornierung — die Buchung ist noch aktiv und Smoobu wurde nicht verändert.",
      reasonLabel: "Grund",
      messageLabel: "Nachricht",
      guestContact: "Kontakt des Gastes",
      action: "Setzen Sie sich mit dem Gast in Verbindung und bearbeiten Sie die Stornierung gegebenenfalls manuell.",
    },
  },
  fr: {
    greeting: (name: string) => `Bonjour ${name},`,
    footer: "Kalawala Vacation Rentals · Puerto Viejo, Costa Rica",
    reservationId: "Numéro de réservation",
    property: "Logement",
    arrival: "Arrivée",
    departure: "Départ",
    guests: "Voyageurs",
    totalAmount: "Total",
    holdExpires: "La réservation expire",
    paypalOrderId: "Commande PayPal",
    paypalCaptureId: "Capture PayPal",
    confirmedAt: "Confirmé le",

    holdCreated: {
      subject: (id: string) => `Votre réservation est active : ${id}`,
      intro: "Votre réservation provisoire est active, les dates sont donc à vous pour le moment.",
      cta: "Finalisez votre paiement PayPal avant l'expiration de la réservation pour confirmer votre séjour.",
      warning: "Si la réservation expire, les dates seront de nouveau disponibles et vous devrez effectuer une nouvelle recherche.",
    },
    paymentPending: {
      subject: (id: string) => `Finalisez votre paiement : ${id}`,
      intro: "Nous avons créé votre commande PayPal. Approuvez le paiement pour confirmer votre réservation.",
      cta: "Retournez sur la page de réservation pour approuver votre paiement PayPal.",
      warning: "La réservation expire si vous ne finalisez pas le paiement à temps.",
    },
    confirmed: {
      subject: (id: string) => `Réservation confirmée : ${id}`,
      intro: "Votre réservation est confirmée. Nous avons hâte de vous accueillir à Puerto Viejo !",
      cta: "Vous pouvez consulter votre réservation avec votre numéro de réservation et le mot de passe défini lors du paiement.",
      note: "Pour toute question, contactez-nous à reservas.kalawala@gmail.com ou via WhatsApp.",
    },
    cancelled: {
      subject: (id: string) => `Réservation annulée : ${id}`,
      intro: "Votre réservation provisoire a expiré ou a été annulée.",
      cta: "N'hésitez pas à rechercher de nouvelles dates sur notre site.",
      note: "Si vous pensez qu'il s'agit d'une erreur, veuillez nous contacter.",
    },
    depositHandoff: {
      subject: "Instructions de dépôt manuel de Kalawala",
      intro: "Merci de votre intérêt pour une réservation chez Kalawala. Trois étapes suffisent pour finaliser votre réservation par dépôt manuel.",
      step1: "Contactez-nous via WhatsApp ou e-mail pour confirmer la disponibilité et recevoir les coordonnées bancaires.",
      step2: "Effectuez le virement du montant du dépôt et envoyez-nous la preuve de paiement.",
      step3: "Notre équipe confirmera votre réservation directement dans notre système.",
      warning: "Votre réservation N'EST PAS confirmée tant que notre équipe n'a pas vérifié votre dépôt et ne l'a pas confirmé manuellement.",
      contactLabel: "Contactez-nous",
    },
    cancellationReason: "Motif",
    bankTransfer: "Virement bancaire",
    sinpe: "SINPE Móvil",
    accountHolder: "Titulaire du compte",
    colones: "Compte en colones",
    dolares: "Compte en dollars",
    depositInstructions: {
      subject: (id: string) => `Finalisez votre virement : ${id}`,
      intro:
        "Nous conservons vos dates pendant que vous finalisez le virement. Envoyez le montant indiqué ci-dessous par virement bancaire ou SINPE Móvil, puis téléversez votre reçu pour que notre équipe puisse le vérifier.",
      warning:
        "Vos dates ne sont réservées que jusqu'à l'heure indiquée ci-dessus. Si nous n'avons pas confirmé le virement d'ici là, la réservation est libérée et le logement redevient disponible.",
      uploadCta: "Téléversez votre reçu",
      note: "Une fois le paiement confirmé par notre équipe, nous vous enverrons la confirmation et l'accès à votre portail.",
    },
    depositConfirmed: {
      subject: (id: string) => `Réservation confirmée : ${id}`,
      intro: "Nous avons vérifié votre dépôt et votre réservation est confirmée. Nous avons hâte de vous accueillir !",
      portalCta:
        "Vous pouvez désormais gérer votre réservation en ligne avec votre numéro de réservation et le mot de passe choisi lors du paiement.",
      note: "Si quoi que ce soit change concernant votre séjour, contactez-nous et nous vous aiderons.",
    },
    depositRejected: {
      subject: (id: string) => `Nous n'avons pas pu confirmer votre dépôt : ${id}`,
      intro:
        "Nous n'avons pas pu confirmer votre virement bancaire ou votre paiement SINPE Móvil, nous avons donc libéré vos dates réservées.",
      cta: "Si vous avez déjà effectué le virement, veuillez nous contacter avec votre reçu afin que nous puissions vérifier.",
      note: "N'hésitez pas à rechercher de nouvelles dates ou à démarrer une nouvelle réservation sur notre site.",
    },
    staffDepositReview: {
      subject: (id: string) => `[ACTION] Réservation par dépôt en attente de confirmation : ${id}`,
      intro:
        "Un client a réservé par virement bancaire / SINPE. Les dates sont bloquées dans Smoobu sur le canal bloqué jusqu'à ce que vous confirmiez ou refusiez.",
      action: "Confirmez une fois l'argent reçu. Refuser libère immédiatement la réservation et les dates.",
      receiptLabel: "Reçu téléversé",
      noReceipt: "Aucun reçu téléversé pour le moment.",
      guestContact: "Contact du client",
      confirmLabel: "Examiner et confirmer",
      rejectLabel: "Refuser et libérer les dates",
    },
    guestCancelled: {
      subject: (id: string) => `Votre réservation est annulée : ${id}`,
      intro: "Nous avons annulé votre réservation comme demandé. Les dates sont de nouveau disponibles et nous ne vous facturerons plus rien.",
      refundPending:
        "Notre équipe traite les remboursements manuellement, sur le compte PayPal utilisé pour le paiement. Cela peut prendre quelques jours ouvrés pour apparaître.",
      noRefund: "Cette réservation a été annulée dans les 24 heures précédant l'arrivée, aucun remboursement ne s'applique donc.",
      note: "Si vous n'êtes pas à l'origine de cette annulation, veuillez nous contacter immédiatement.",
    },
    staffCancelled: {
      subject: (id: string) => `[ACTION] Le client a annulé ${id} : remboursement requis`,
      intro: "Un client a annulé sa réservation via le portail client. La réservation Smoobu a déjà été annulée et les dates libérées.",
      action: "Effectuez le remboursement dans PayPal pour la capture ci-dessous. Le paiement est marqué refund_flagged jusqu'à ce que ce soit fait.",
      noRefundAction: "Aucun remboursement dû. Le client a annulé dans la fenêtre de 24 heures.",
      guestContact: "Contact du client",
    },
    staffHelpRequest: {
      subject: (id: string) => `Demande d'aide : ${id}`,
      intro: "Un client a envoyé un message via son portail de réservation.",
      typeLabel: "Type",
      messageLabel: "Message",
      guestContact: "Contact du client",
    },
    staffCancellationRequest: {
      subject: (id: string) => `[ACTION] Demande d'annulation : ${id}`,
      intro: "Un client a demandé à annuler sa réservation confirmée via le portail. Il s'agit d'une demande, pas d'une annulation automatique — la réservation est toujours active et Smoobu n'a pas été modifié.",
      reasonLabel: "Motif",
      messageLabel: "Message",
      guestContact: "Contact du client",
      action: "Contactez le client et traitez l'annulation manuellement si nécessaire.",
    },
  },
  it: {
    greeting: (name: string) => `Ciao ${name},`,
    footer: "Kalawala Vacation Rentals · Puerto Viejo, Costa Rica",
    reservationId: "ID prenotazione",
    property: "Struttura",
    arrival: "Arrivo",
    departure: "Partenza",
    guests: "Ospiti",
    totalAmount: "Totale",
    holdExpires: "La prenotazione scade",
    paypalOrderId: "Ordine PayPal",
    paypalCaptureId: "Cattura PayPal",
    confirmedAt: "Confermato il",

    holdCreated: {
      subject: (id: string) => `La tua prenotazione è attiva: ${id}`,
      intro: "La tua prenotazione provvisoria è attiva, quindi le date sono tue per ora.",
      cta: "Completa il pagamento PayPal prima che la prenotazione scada per confermare il soggiorno.",
      warning: "Se la prenotazione scade, le date tornano disponibili e dovrai avviare una nuova ricerca.",
    },
    paymentPending: {
      subject: (id: string) => `Completa il pagamento: ${id}`,
      intro: "Abbiamo creato il tuo ordine PayPal. Approva il pagamento per confermare la prenotazione.",
      cta: "Torna alla pagina di prenotazione per approvare il pagamento PayPal.",
      warning: "La prenotazione scade se non completi il pagamento in tempo.",
    },
    confirmed: {
      subject: (id: string) => `Prenotazione confermata: ${id}`,
      intro: "La tua prenotazione è confermata. Non vediamo l'ora di darti il benvenuto a Puerto Viejo!",
      cta: "Puoi visualizzare la tua prenotazione con l'ID prenotazione e la password impostata al momento del pagamento.",
      note: "Per qualsiasi domanda, contattaci a reservas.kalawala@gmail.com o via WhatsApp.",
    },
    cancelled: {
      subject: (id: string) => `Prenotazione annullata: ${id}`,
      intro: "La tua prenotazione provvisoria è scaduta o è stata annullata.",
      cta: "Puoi cercare nuove date sul nostro sito.",
      note: "Se ritieni che si tratti di un errore, contattaci.",
    },
    depositHandoff: {
      subject: "Istruzioni per il deposito manuale di Kalawala",
      intro: "Grazie per il tuo interesse a prenotare con Kalawala. Tre passaggi completano la tua prenotazione tramite deposito manuale.",
      step1: "Contattaci su WhatsApp o via email per confermare la disponibilità e ricevere i dati bancari.",
      step2: "Effettua il bonifico dell'importo del deposito e inviaci la prova di pagamento.",
      step3: "Il nostro team confermerà la tua prenotazione direttamente nel nostro sistema.",
      warning: "La tua prenotazione NON è confermata finché il nostro team non verifica il deposito e lo conferma manualmente.",
      contactLabel: "Contattaci",
    },
    cancellationReason: "Motivo",
    bankTransfer: "Bonifico bancario",
    sinpe: "SINPE Móvil",
    accountHolder: "Intestatario del conto",
    colones: "Conto in colón",
    dolares: "Conto in dollari",
    depositInstructions: {
      subject: (id: string) => `Completa il tuo bonifico: ${id}`,
      intro:
        "Stiamo bloccando le tue date mentre completi il bonifico. Invia l'importo indicato di seguito tramite bonifico bancario o SINPE Móvil, quindi carica la ricevuta affinché il nostro team possa verificarla.",
      warning:
        "Le tue date sono bloccate solo fino all'orario indicato sopra. Se non confermiamo il bonifico entro tale orario, la prenotazione viene rilasciata e la struttura torna disponibile.",
      uploadCta: "Carica la tua ricevuta",
      note: "Una volta che il nostro team confermerà il pagamento, ti invieremo la conferma e l'accesso al tuo portale.",
    },
    depositConfirmed: {
      subject: (id: string) => `Prenotazione confermata: ${id}`,
      intro: "Abbiamo verificato il tuo deposito e la tua prenotazione è confermata. Non vediamo l'ora di accoglierti!",
      portalCta:
        "Ora puoi gestire la tua prenotazione online con il tuo ID prenotazione e la password scelta durante il pagamento.",
      note: "Se qualcosa cambia riguardo al tuo soggiorno, contattaci e ti aiuteremo.",
    },
    depositRejected: {
      subject: (id: string) => `Non siamo riusciti a confermare il tuo deposito: ${id}`,
      intro:
        "Non siamo riusciti a confermare il tuo bonifico bancario o pagamento SINPE Móvil, quindi abbiamo rilasciato le date bloccate.",
      cta: "Se hai già effettuato il bonifico, contattaci con la tua ricevuta in modo da poter verificare.",
      note: "Puoi cercare nuove date o iniziare una nuova prenotazione sul nostro sito.",
    },
    staffDepositReview: {
      subject: (id: string) => `[AZIONE] Prenotazione con deposito in attesa di conferma: ${id}`,
      intro:
        "Un ospite ha prenotato tramite bonifico / SINPE. Le date sono bloccate in Smoobu sul canale bloccato finché non confermi o rifiuti.",
      action: "Conferma una volta che il denaro è arrivato. Rifiutare rilascia immediatamente la prenotazione e le date.",
      receiptLabel: "Ricevuta caricata",
      noReceipt: "Nessuna ricevuta ancora caricata.",
      guestContact: "Contatto dell'ospite",
      confirmLabel: "Rivedi e conferma",
      rejectLabel: "Rifiuta e rilascia le date",
    },
    guestCancelled: {
      subject: (id: string) => `La tua prenotazione è stata annullata: ${id}`,
      intro: "Abbiamo annullato la tua prenotazione come richiesto. Le date sono di nuovo disponibili e non ti addebiteremo più nulla.",
      refundPending:
        "Il nostro team elabora manualmente i rimborsi, restituendoli all'account PayPal con cui hai pagato. Potrebbero volerci alcuni giorni lavorativi prima che compaia.",
      noRefund: "Questa prenotazione è stata annullata entro 24 ore dal check-in, quindi non è previsto alcun rimborso.",
      note: "Se non hai richiesto questa cancellazione, contattaci immediatamente.",
    },
    staffCancelled: {
      subject: (id: string) => `[AZIONE] L'ospite ha annullato ${id}: rimborso richiesto`,
      intro: "Un ospite ha annullato la propria prenotazione tramite il portale ospiti. La prenotazione Smoobu è già stata annullata e le date rilasciate.",
      action: "Emetti il rimborso su PayPal per la cattura indicata di seguito. Il pagamento resta contrassegnato come refund_flagged finché non lo fai.",
      noRefundAction: "Nessun rimborso dovuto. L'ospite ha annullato entro la finestra di 24 ore.",
      guestContact: "Contatto dell'ospite",
    },
    staffHelpRequest: {
      subject: (id: string) => `Richiesta di assistenza: ${id}`,
      intro: "Un ospite ha inviato un messaggio tramite il portale della prenotazione.",
      typeLabel: "Tipo",
      messageLabel: "Messaggio",
      guestContact: "Contatto dell'ospite",
    },
    staffCancellationRequest: {
      subject: (id: string) => `[AZIONE] Richiesta di cancellazione: ${id}`,
      intro: "Un ospite ha chiesto di annullare la propria prenotazione confermata tramite il portale. Si tratta di una richiesta, non di una cancellazione automatica — la prenotazione è ancora attiva e Smoobu non è stato modificato.",
      reasonLabel: "Motivo",
      messageLabel: "Messaggio",
      guestContact: "Contatto dell'ospite",
      action: "Contatta l'ospite e, se opportuno, elabora la cancellazione manualmente.",
    },
  },
  pt: {
    greeting: (name: string) => `Olá ${name},`,
    footer: "Kalawala Vacation Rentals · Puerto Viejo, Costa Rica",
    reservationId: "ID da reserva",
    property: "Propriedade",
    arrival: "Chegada",
    departure: "Saída",
    guests: "Hóspedes",
    totalAmount: "Total",
    holdExpires: "A reserva expira",
    paypalOrderId: "Pedido PayPal",
    paypalCaptureId: "Captura PayPal",
    confirmedAt: "Confirmado em",

    holdCreated: {
      subject: (id: string) => `Sua reserva está ativa: ${id}`,
      intro: "Sua reserva provisória está ativa, então as datas são suas por enquanto.",
      cta: "Conclua o pagamento pelo PayPal antes que a reserva expire para confirmar sua estadia.",
      warning: "Se a reserva expirar, as datas voltam a ficar disponíveis e você terá que iniciar uma nova busca.",
    },
    paymentPending: {
      subject: (id: string) => `Conclua seu pagamento: ${id}`,
      intro: "Criamos seu pedido PayPal. Aprove o pagamento para confirmar sua reserva.",
      cta: "Volte à página de reserva para aprovar seu pagamento PayPal.",
      warning: "A reserva expira se você não concluir o pagamento a tempo.",
    },
    confirmed: {
      subject: (id: string) => `Reserva confirmada: ${id}`,
      intro: "Sua reserva está confirmada. Estamos ansiosos para recebê-lo em Puerto Viejo!",
      cta: "Você pode visualizar sua reserva com o ID da reserva e a senha definida no pagamento.",
      note: "Se tiver alguma dúvida, entre em contato em reservas.kalawala@gmail.com ou pelo WhatsApp.",
    },
    cancelled: {
      subject: (id: string) => `Reserva cancelada: ${id}`,
      intro: "Sua reserva provisória expirou ou foi cancelada.",
      cta: "Você pode buscar novas datas em nosso site.",
      note: "Se você acredita que isso é um erro, entre em contato conosco.",
    },
    depositHandoff: {
      subject: "Instruções de depósito manual da Kalawala",
      intro: "Obrigado pelo seu interesse em reservar com a Kalawala. Três etapas concluem sua reserva por depósito manual.",
      step1: "Entre em contato conosco pelo WhatsApp ou e-mail para confirmar a disponibilidade e receber os dados bancários.",
      step2: "Realize a transferência do valor do depósito e envie-nos o comprovante de pagamento.",
      step3: "Nossa equipe confirmará sua reserva diretamente em nosso sistema.",
      warning: "Sua reserva NÃO está confirmada até que nossa equipe verifique seu depósito e o confirme manualmente.",
      contactLabel: "Entre em contato",
    },
    cancellationReason: "Motivo",
    bankTransfer: "Transferência bancária",
    sinpe: "SINPE Móvil",
    accountHolder: "Titular da conta",
    colones: "Conta em colones",
    dolares: "Conta em dólares",
    depositInstructions: {
      subject: (id: string) => `Conclua sua transferência: ${id}`,
      intro:
        "Estamos reservando suas datas enquanto você conclui a transferência. Envie o valor abaixo por transferência bancária ou SINPE Móvil e depois envie o comprovante para nossa equipe verificar.",
      warning:
        "Suas datas ficam reservadas apenas até o horário indicado acima. Se não confirmarmos a transferência até lá, a reserva é liberada e a propriedade volta a ficar disponível.",
      uploadCta: "Enviar comprovante",
      note: "Assim que nossa equipe confirmar o pagamento, enviaremos a confirmação e o acesso ao seu portal.",
    },
    depositConfirmed: {
      subject: (id: string) => `Reserva confirmada: ${id}`,
      intro: "Verificamos seu depósito e sua reserva está confirmada. Estamos ansiosos para recebê-lo!",
      portalCta:
        "Agora você pode gerenciar sua reserva on-line com o ID da reserva e a senha escolhida durante o pagamento.",
      note: "Se algo mudar em relação à sua estadia, entre em contato conosco e ajudaremos.",
    },
    depositRejected: {
      subject: (id: string) => `Não conseguimos confirmar seu depósito: ${id}`,
      intro:
        "Não conseguimos confirmar sua transferência bancária ou pagamento por SINPE Móvil, então liberamos as datas reservadas.",
      cta: "Se você já realizou a transferência, entre em contato conosco com seu comprovante para que possamos verificar.",
      note: "Você pode buscar novas datas ou iniciar uma nova reserva em nosso site.",
    },
    staffDepositReview: {
      subject: (id: string) => `[AÇÃO] Reserva por depósito aguardando confirmação: ${id}`,
      intro:
        "Um hóspede reservou por transferência bancária / SINPE. As datas estão bloqueadas no Smoobu no canal bloqueado até você confirmar ou rejeitar.",
      action: "Confirme assim que o dinheiro for recebido. Rejeitar libera a reserva e as datas imediatamente.",
      receiptLabel: "Comprovante enviado",
      noReceipt: "Nenhum comprovante enviado ainda.",
      guestContact: "Contato do hóspede",
      confirmLabel: "Revisar e confirmar",
      rejectLabel: "Rejeitar e liberar as datas",
    },
    guestCancelled: {
      subject: (id: string) => `Sua reserva foi cancelada: ${id}`,
      intro: "Cancelamos sua reserva conforme solicitado. As datas voltaram a ficar disponíveis e não faremos nenhuma nova cobrança.",
      refundPending:
        "Nossa equipe processa reembolsos manualmente, de volta à conta PayPal usada no pagamento. Pode levar alguns dias úteis para aparecer.",
      noRefund: "Esta reserva foi cancelada dentro de 24 horas antes do check-in, portanto não há reembolso aplicável.",
      note: "Se você não solicitou este cancelamento, entre em contato conosco imediatamente.",
    },
    staffCancelled: {
      subject: (id: string) => `[AÇÃO] Hóspede cancelou ${id}: reembolso necessário`,
      intro: "Um hóspede cancelou sua reserva pelo portal do hóspede. A reserva no Smoobu já foi cancelada e as datas liberadas.",
      action: "Emita o reembolso no PayPal para a captura abaixo. O pagamento fica marcado como refund_flagged até que isso seja feito.",
      noRefundAction: "Nenhum reembolso devido. O hóspede cancelou dentro da janela de 24 horas.",
      guestContact: "Contato do hóspede",
    },
    staffHelpRequest: {
      subject: (id: string) => `Solicitação de ajuda: ${id}`,
      intro: "Um hóspede enviou uma mensagem pelo portal da reserva.",
      typeLabel: "Tipo",
      messageLabel: "Mensagem",
      guestContact: "Contato do hóspede",
    },
    staffCancellationRequest: {
      subject: (id: string) => `[AÇÃO] Solicitação de cancelamento: ${id}`,
      intro: "Um hóspede solicitou o cancelamento de sua reserva confirmada pelo portal. Isso é uma solicitação, não um cancelamento automático — a reserva ainda está ativa e o Smoobu não foi alterado.",
      reasonLabel: "Motivo",
      messageLabel: "Mensagem",
      guestContact: "Contato do hóspede",
      action: "Entre em contato com o hóspede e processe o cancelamento manualmente, se apropriado.",
    },
  },
  he: {
    greeting: (name: string) => `שלום ${name},`,
    footer: "Kalawala Vacation Rentals · Puerto Viejo, Costa Rica",
    reservationId: "מספר הזמנה",
    property: "נכס",
    arrival: "הגעה",
    departure: "עזיבה",
    guests: "אורחים",
    totalAmount: "סכום כולל",
    holdExpires: "ההזמנה הזמנית פגה בתאריך",
    paypalOrderId: "הזמנת PayPal",
    paypalCaptureId: "חיוב PayPal",
    confirmedAt: "אושר בתאריך",

    holdCreated: {
      subject: (id: string) => `ההזמנה שלך פעילה: ${id}`,
      intro: "ההזמנה הזמנית שלך פעילה, כך שהתאריכים שמורים לך בינתיים.",
      cta: "השלימו את התשלום ב-PayPal לפני שההזמנה הזמנית פגה כדי לאשר את ההזמנה.",
      warning: "אם ההזמנה הזמנית פגה, התאריכים חוזרים להימכר ותצטרכו להתחיל חיפוש חדש.",
    },
    paymentPending: {
      subject: (id: string) => `השלימו את התשלום: ${id}`,
      intro: "יצרנו עבורכם הזמנת PayPal. אשרו את התשלום וההזמנה שלכם תאושר.",
      cta: "חזרו לדף ההזמנה כדי לאשר את תשלום ה-PayPal שלכם.",
      warning: "ההזמנה הזמנית פגה אם לא תשלימו את התשלום בזמן.",
    },
    confirmed: {
      subject: (id: string) => `ההזמנה אושרה: ${id}`,
      intro: "ההזמנה שלכם אושרה. אנו מצפים לארח אתכם בפוארטו וייחו!",
      cta: "תוכלו לצפות בהזמנה שלכם באמצעות מספר ההזמנה והסיסמה שקבעתם בעת התשלום.",
      note: "לכל שאלה, צרו קשר בכתובת reservas.kalawala@gmail.com או בוואטסאפ.",
    },
    cancelled: {
      subject: (id: string) => `ההזמנה בוטלה: ${id}`,
      intro: "ההזמנה הזמנית שלכם פגה או בוטלה.",
      cta: "מוזמנים לחפש תאריכים חדשים באתר שלנו.",
      note: "אם אתם סבורים שמדובר בטעות, אנא צרו קשר.",
    },
    depositHandoff: {
      subject: "הוראות להפקדה ידנית מקלאוואלה",
      intro: "תודה על התעניינותכם בהזמנה אצל קלאוואלה. שלושה שלבים משלימים את ההזמנה שלכם באמצעות הפקדה ידנית.",
      step1: "צרו איתנו קשר בוואטסאפ או באימייל כדי לאשר זמינות ולקבל את פרטי ההעברה הבנקאית.",
      step2: "בצעו את העברת סכום ההפקדה ושלחו לנו אישור תשלום.",
      step3: "הצוות שלנו יאשר את ההזמנה שלכם ישירות במערכת שלנו.",
      warning: "ההזמנה שלכם אינה מאושרת עד שהצוות שלנו יאמת את ההפקדה ויאשר אותה ידנית.",
      contactLabel: "צרו קשר",
    },
    cancellationReason: "סיבה",
    bankTransfer: "העברה בנקאית",
    sinpe: "SINPE Móvil",
    accountHolder: "בעל החשבון",
    colones: "חשבון בקולונים",
    dolares: "חשבון בדולרים",
    depositInstructions: {
      subject: (id: string) => `השלימו את ההעברה הבנקאית: ${id}`,
      intro:
        "אנו שומרים עבורכם את התאריכים בזמן שאתם משלימים את ההעברה. שלחו את הסכום המצוין למטה בהעברה בנקאית או ב-SINPE Móvil, ולאחר מכן העלו את הקבלה כדי שהצוות שלנו יוכל לאמת אותה.",
      warning:
        "התאריכים שלכם שמורים רק עד השעה המצוינת למעלה. אם לא נאשר את ההעברה עד אז, ההזמנה תשוחרר והנכס יחזור להימכר.",
      uploadCta: "העלו את הקבלה שלכם",
      note: "לאחר שהצוות שלנו יאשר את התשלום, נשלח לכם את האישור ואת הגישה לפורטל שלכם.",
    },
    depositConfirmed: {
      subject: (id: string) => `ההזמנה אושרה: ${id}`,
      intro: "אימתנו את ההפקדה שלכם וההזמנה שלכם אושרה. מצפים לארח אתכם!",
      portalCta:
        "כעת תוכלו לנהל את ההזמנה שלכם באינטרנט באמצעות מספר ההזמנה והסיסמה שבחרתם בעת התשלום.",
      note: "אם משהו משתנה לגבי השהות שלכם, צרו קשר ואנחנו נעזור.",
    },
    depositRejected: {
      subject: (id: string) => `לא הצלחנו לאשר את ההפקדה שלכם: ${id}`,
      intro:
        "לא הצלחנו לאשר את ההעברה הבנקאית או תשלום ה-SINPE Móvil שלכם, ולכן שחררנו את התאריכים השמורים.",
      cta: "אם כבר ביצעתם את ההעברה, אנא צרו קשר עם הקבלה שלכם כדי שנוכל לבדוק.",
      note: "מוזמנים לחפש תאריכים חדשים או להתחיל הזמנה חדשה באתר שלנו.",
    },
    staffDepositReview: {
      subject: (id: string) => `[פעולה נדרשת] הזמנת הפקדה ממתינה לאישור: ${id}`,
      intro:
        "אורח הזמין באמצעות העברה בנקאית / SINPE. התאריכים חסומים ב-Smoobu בערוץ החסום עד שתאשרו או תדחו.",
      action: "אשרו לאחר שהכסף התקבל. דחייה משחררת מיידית את ההזמנה ואת התאריכים.",
      receiptLabel: "קבלה שהועלתה",
      noReceipt: "טרם הועלתה קבלה.",
      guestContact: "פרטי קשר של האורח",
      confirmLabel: "סקירה ואישור",
      rejectLabel: "דחייה ושחרור התאריכים",
    },
    guestCancelled: {
      subject: (id: string) => `ההזמנה שלכם בוטלה: ${id}`,
      intro: "ביטלנו את ההזמנה שלכם כפי שביקשתם. התאריכים שוחררו לחלוטין ולא נחייב אתכם שוב.",
      refundPending:
        "הצוות שלנו מבצע החזרים ידנית, בחזרה לחשבון ה-PayPal שממנו שילמתם. ייתכן שיעברו מספר ימי עסקים עד שההחזר יופיע.",
      noRefund: "הזמנה זו בוטלה בתוך 24 שעות לפני ההגעה, ולכן לא חל החזר כספי.",
      note: "אם לא ביקשתם את הביטול הזה, אנא צרו קשר מיד.",
    },
    staffCancelled: {
      subject: (id: string) => `[פעולה נדרשת] האורח ביטל ${id}: נדרש החזר כספי`,
      intro: "אורח ביטל את ההזמנה שלו דרך פורטל האורחים. הזמנת ה-Smoobu כבר בוטלה והתאריכים שוחררו.",
      action: "בצעו את ההחזר הכספי ב-PayPal עבור החיוב המפורט למטה. התשלום מסומן כ-refund_flagged עד שתעשו זאת.",
      noRefundAction: "אין החזר כספי נדרש. האורח ביטל בתוך חלון 24 השעות.",
      guestContact: "פרטי קשר של האורח",
    },
    staffHelpRequest: {
      subject: (id: string) => `בקשת עזרה: ${id}`,
      intro: "אורח שלח הודעה דרך פורטל ההזמנה שלו.",
      typeLabel: "סוג",
      messageLabel: "הודעה",
      guestContact: "פרטי קשר של האורח",
    },
    staffCancellationRequest: {
      subject: (id: string) => `[פעולה נדרשת] בקשת ביטול: ${id}`,
      intro: "אורח ביקש לבטל את ההזמנה המאושרת שלו דרך הפורטל. זוהי בקשה, לא ביטול אוטומטי — ההזמנה עדיין פעילה ו-Smoobu לא עודכן.",
      reasonLabel: "סיבה",
      messageLabel: "הודעה",
      guestContact: "פרטי קשר של האורח",
      action: "צרו קשר עם האורח וטפלו בביטול ידנית אם מתאים.",
    },
  },
  hi: {
    greeting: (name: string) => `नमस्ते ${name},`,
    footer: "Kalawala Vacation Rentals · Puerto Viejo, Costa Rica",
    reservationId: "बुकिंग आईडी",
    property: "प्रॉपर्टी",
    arrival: "आगमन",
    departure: "प्रस्थान",
    guests: "मेहमान",
    totalAmount: "कुल राशि",
    holdExpires: "होल्ड समाप्त होगा",
    paypalOrderId: "PayPal ऑर्डर",
    paypalCaptureId: "PayPal भुगतान",
    confirmedAt: "पुष्टि की तारीख",

    holdCreated: {
      subject: (id: string) => `आपका होल्ड सक्रिय है: ${id}`,
      intro: "आपका होल्ड सक्रिय है, इसलिए तारीखें फ़िलहाल आपके लिए सुरक्षित हैं।",
      cta: "होल्ड समाप्त होने और बुकिंग की पुष्टि होने से पहले अपना PayPal भुगतान पूरा करें।",
      warning: "यदि होल्ड समाप्त हो जाता है, तो तारीखें फिर से उपलब्ध हो जाएंगी और आपको नई खोज शुरू करनी होगी।",
    },
    paymentPending: {
      subject: (id: string) => `अपना भुगतान पूरा करें: ${id}`,
      intro: "हमने आपका PayPal ऑर्डर बना दिया है। भुगतान स्वीकृत करें और आपकी बुकिंग की पुष्टि हो जाएगी।",
      cta: "अपना PayPal भुगतान स्वीकृत करने के लिए बुकिंग पेज पर लौटें।",
      warning: "यदि आप समय पर भुगतान पूरा नहीं करते हैं तो होल्ड समाप्त हो जाएगा।",
    },
    confirmed: {
      subject: (id: string) => `बुकिंग की पुष्टि हुई: ${id}`,
      intro: "आपकी बुकिंग की पुष्टि हो गई है। हम प्यूर्तो वियेजो में आपका स्वागत करने के लिए उत्सुक हैं!",
      cta: "आप अपनी बुकिंग आईडी और चेकआउट के समय बनाए गए पासवर्ड से अपनी बुकिंग देख सकते हैं।",
      note: "किसी भी प्रश्न के लिए, कृपया हमसे reservas.kalawala@gmail.com पर या व्हाट्सएप के माध्यम से संपर्क करें।",
    },
    cancelled: {
      subject: (id: string) => `बुकिंग रद्द की गई: ${id}`,
      intro: "आपका होल्ड समाप्त हो गया है या रद्द कर दिया गया है।",
      cta: "आप हमारी वेबसाइट पर नई तारीखें खोज सकते हैं।",
      note: "यदि आपको लगता है कि यह एक गलती है, तो कृपया हमसे संपर्क करें।",
    },
    depositHandoff: {
      subject: "कलावाला की ओर से मैनुअल डिपॉज़िट निर्देश",
      intro: "कलावाला के साथ बुक करने में आपकी रुचि के लिए धन्यवाद। मैनुअल डिपॉज़िट के ज़रिए आपकी बुकिंग तीन चरणों में पूरी होती है।",
      step1: "उपलब्धता की पुष्टि करने और बैंक ट्रांसफर विवरण प्राप्त करने के लिए हमसे व्हाट्सएप या ईमेल के ज़रिए संपर्क करें।",
      step2: "डिपॉज़िट राशि ट्रांसफर करें और हमें भुगतान का प्रमाण भेजें।",
      step3: "हमारी टीम सीधे हमारे सिस्टम में आपकी बुकिंग की पुष्टि करेगी।",
      warning: "जब तक हमारी टीम आपके डिपॉज़िट की पुष्टि और मैन्युअल रूप से स्वीकृति नहीं देती, तब तक आपकी बुकिंग की पुष्टि नहीं होती।",
      contactLabel: "हमसे संपर्क करें",
    },
    cancellationReason: "कारण",
    bankTransfer: "बैंक ट्रांसफर",
    sinpe: "SINPE Móvil",
    accountHolder: "खाताधारक",
    colones: "कोलोन खाता",
    dolares: "डॉलर खाता",
    depositInstructions: {
      subject: (id: string) => `अपना बैंक ट्रांसफर पूरा करें: ${id}`,
      intro:
        "जब तक आप ट्रांसफर पूरा करते हैं, हम आपकी तारीखें होल्ड पर रख रहे हैं। नीचे दी गई राशि बैंक ट्रांसफर या SINPE Móvil के ज़रिए भेजें, फिर अपनी रसीद अपलोड करें ताकि हमारी टीम इसे सत्यापित कर सके।",
      warning:
        "आपकी तारीखें केवल ऊपर दिखाए गए समय तक ही होल्ड पर रहेंगी। यदि हम उस समय तक ट्रांसफर की पुष्टि नहीं करते हैं, तो होल्ड हटा दिया जाएगा और प्रॉपर्टी फिर से उपलब्ध हो जाएगी।",
      uploadCta: "अपनी रसीद अपलोड करें",
      note: "जब हमारी टीम भुगतान की पुष्टि कर देगी, तो हम आपको पुष्टिकरण और आपके पोर्टल की पहुँच ईमेल करेंगे।",
    },
    depositConfirmed: {
      subject: (id: string) => `बुकिंग की पुष्टि हुई: ${id}`,
      intro: "हमने आपके डिपॉज़िट की पुष्टि कर दी है और आपकी बुकिंग की पुष्टि हो गई है। हम आपका स्वागत करने के लिए उत्सुक हैं!",
      portalCta:
        "अब आप अपनी बुकिंग आईडी और चेकआउट के दौरान चुने गए पासवर्ड का उपयोग करके अपनी बुकिंग को ऑनलाइन प्रबंधित कर सकते हैं।",
      note: "यदि आपकी यात्रा के बारे में कुछ भी बदलता है, तो हमसे संपर्क करें और हम मदद करेंगे।",
    },
    depositRejected: {
      subject: (id: string) => `हम आपके डिपॉज़िट की पुष्टि नहीं कर सके: ${id}`,
      intro:
        "हम आपके बैंक ट्रांसफर या SINPE Móvil भुगतान की पुष्टि नहीं कर सके, इसलिए हमने आपकी होल्ड की गई तारीखें छोड़ दी हैं।",
      cta: "यदि आपने पहले ही ट्रांसफर भेज दिया है, तो कृपया अपनी रसीद के साथ हमसे संपर्क करें ताकि हम इसकी जांच कर सकें।",
      note: "आप हमारी वेबसाइट पर नई तारीखें खोज सकते हैं या नई बुकिंग शुरू कर सकते हैं।",
    },
    staffDepositReview: {
      subject: (id: string) => `[कार्रवाई आवश्यक] डिपॉज़िट बुकिंग पुष्टि की प्रतीक्षा में: ${id}`,
      intro:
        "एक मेहमान ने बैंक ट्रांसफर / SINPE के ज़रिए बुक किया है। जब तक आप पुष्टि या अस्वीकार नहीं करते, तारीखें Smoobu में ब्लॉक किए गए चैनल पर होल्ड पर हैं।",
      action: "पैसा आने के बाद पुष्टि करें। अस्वीकार करने से होल्ड और तारीखें तुरंत मुक्त हो जाती हैं।",
      receiptLabel: "अपलोड की गई रसीद",
      noReceipt: "अभी तक कोई रसीद अपलोड नहीं की गई।",
      guestContact: "मेहमान का संपर्क",
      confirmLabel: "समीक्षा करें और पुष्टि करें",
      rejectLabel: "अस्वीकार करें और तारीखें मुक्त करें",
    },
    guestCancelled: {
      subject: (id: string) => `आपकी बुकिंग रद्द कर दी गई है: ${id}`,
      intro: "आपके अनुरोध के अनुसार हमने आपकी बुकिंग रद्द कर दी है। तारीखें फिर से उपलब्ध हैं और हम आपसे दोबारा शुल्क नहीं लेंगे।",
      refundPending:
        "हमारी टीम मैन्युअल रूप से रिफंड जारी करती है, उसी PayPal खाते में जिससे आपने भुगतान किया था। इसे दिखने में कुछ कार्यदिवस लग सकते हैं।",
      noRefund: "यह बुकिंग चेक-इन से 24 घंटे के भीतर रद्द की गई थी, इसलिए कोई रिफंड लागू नहीं होता।",
      note: "यदि आपने यह रद्दीकरण नहीं मांगा है, तो कृपया तुरंत हमसे संपर्क करें।",
    },
    staffCancelled: {
      subject: (id: string) => `[कार्रवाई आवश्यक] मेहमान ने रद्द किया ${id}: रिफंड आवश्यक`,
      intro: "एक मेहमान ने गेस्ट पोर्टल के ज़रिए अपनी बुकिंग रद्द कर दी है। Smoobu बुकिंग पहले ही रद्द की जा चुकी है और तारीखें मुक्त कर दी गई हैं।",
      action: "नीचे दिए गए कैप्चर के लिए PayPal में रिफंड जारी करें। जब तक आप ऐसा नहीं करते, भुगतान refund_flagged के रूप में चिह्नित रहेगा।",
      noRefundAction: "कोई रिफंड देय नहीं है। मेहमान ने 24 घंटे की समय सीमा के भीतर रद्द किया।",
      guestContact: "मेहमान का संपर्क",
    },
    staffHelpRequest: {
      subject: (id: string) => `सहायता अनुरोध: ${id}`,
      intro: "एक मेहमान ने अपने बुकिंग पोर्टल के ज़रिए संदेश भेजा है।",
      typeLabel: "प्रकार",
      messageLabel: "संदेश",
      guestContact: "मेहमान का संपर्क",
    },
    staffCancellationRequest: {
      subject: (id: string) => `[कार्रवाई आवश्यक] रद्दीकरण अनुरोध: ${id}`,
      intro: "एक मेहमान ने पोर्टल के ज़रिए अपनी पुष्ट बुकिंग रद्द करने का अनुरोध किया है। यह एक अनुरोध है, स्वचालित रद्दीकरण नहीं — बुकिंग अभी भी सक्रिय है और Smoobu में कोई बदलाव नहीं किया गया है।",
      reasonLabel: "कारण",
      messageLabel: "संदेश",
      guestContact: "मेहमान का संपर्क",
      action: "मेहमान से संपर्क करें और यदि उचित हो तो रद्दीकरण को मैन्युअल रूप से संसाधित करें।",
    },
  },
  nl: {
    greeting: (name: string) => `Hoi ${name},`,
    footer: "Kalawala Vacation Rentals · Puerto Viejo, Costa Rica",
    reservationId: "Reserveringsnummer",
    property: "Accommodatie",
    arrival: "Aankomst",
    departure: "Vertrek",
    guests: "Gasten",
    totalAmount: "Totaal",
    holdExpires: "Reservering verloopt",
    paypalOrderId: "PayPal-bestelling",
    paypalCaptureId: "PayPal-betaling",
    confirmedAt: "Bevestigd op",

    holdCreated: {
      subject: (id: string) => `Je reservering is actief: ${id}`,
      intro: "Je voorlopige reservering is actief, dus de data zijn voorlopig van jou.",
      cta: "Rond je PayPal-betaling af voordat de reservering verloopt, zodat je boeking wordt bevestigd.",
      warning: "Als de reservering verloopt, komen de data weer vrij en moet je een nieuwe zoekopdracht starten.",
    },
    paymentPending: {
      subject: (id: string) => `Rond je betaling af: ${id}`,
      intro: "We hebben je PayPal-bestelling aangemaakt. Keur de betaling goed en je boeking wordt bevestigd.",
      cta: "Ga terug naar de boekingspagina om je PayPal-betaling goed te keuren.",
      warning: "De reservering verloopt als je de betaling niet op tijd afrondt.",
    },
    confirmed: {
      subject: (id: string) => `Boeking bevestigd: ${id}`,
      intro: "Je boeking is bevestigd. We verwelkomen je graag in Puerto Viejo!",
      cta: "Je kunt je reservering bekijken met je reserveringsnummer en het wachtwoord dat je bij het afrekenen hebt ingesteld.",
      note: "Heb je vragen, neem dan contact met ons op via reservas.kalawala@gmail.com of WhatsApp.",
    },
    cancelled: {
      subject: (id: string) => `Reservering geannuleerd: ${id}`,
      intro: "Je voorlopige reservering is verlopen of geannuleerd.",
      cta: "Je bent van harte welkom om nieuwe data op onze website te zoeken.",
      note: "Als je denkt dat dit een fout is, neem dan contact met ons op.",
    },
    depositHandoff: {
      subject: "Instructies voor handmatige aanbetaling van Kalawala",
      intro: "Bedankt voor je interesse om bij Kalawala te boeken. Met drie stappen rond je je reservering af via een handmatige aanbetaling.",
      step1: "Neem contact met ons op via WhatsApp of e-mail om de beschikbaarheid te bevestigen en de bankgegevens te ontvangen.",
      step2: "Maak het aanbetalingsbedrag over en stuur ons het betalingsbewijs.",
      step3: "Ons team bevestigt je boeking rechtstreeks in ons systeem.",
      warning: "Je boeking is NIET bevestigd totdat ons team je aanbetaling heeft geverifieerd en handmatig heeft bevestigd.",
      contactLabel: "Neem contact op",
    },
    cancellationReason: "Reden",
    bankTransfer: "Bankoverschrijving",
    sinpe: "SINPE Móvil",
    accountHolder: "Rekeninghouder",
    colones: "Rekening in colones",
    dolares: "Rekening in dollars",
    depositInstructions: {
      subject: (id: string) => `Rond je overschrijving af: ${id}`,
      intro:
        "We houden je data vast terwijl je de overschrijving afrondt. Maak het onderstaande bedrag over via bankoverschrijving of SINPE Móvil en upload daarna je bewijs zodat ons team het kan verifiëren.",
      warning:
        "Je data blijven alleen gereserveerd tot het hierboven aangegeven tijdstip. Als we de overschrijving daarvoor niet hebben bevestigd, wordt de reservering vrijgegeven en komt de accommodatie weer beschikbaar.",
      uploadCta: "Upload je bewijs",
      note: "Zodra ons team de betaling bevestigt, sturen we je de bevestiging en toegang tot je portaal.",
    },
    depositConfirmed: {
      subject: (id: string) => `Boeking bevestigd: ${id}`,
      intro: "We hebben je aanbetaling geverifieerd en je boeking is bevestigd. We verwelkomen je graag!",
      portalCta:
        "Je kunt je boeking nu online beheren met je reserveringsnummer en het wachtwoord dat je bij het afrekenen hebt gekozen.",
      note: "Als er iets verandert aan je verblijf, neem dan contact met ons op en we helpen je graag.",
    },
    depositRejected: {
      subject: (id: string) => `We konden je aanbetaling niet bevestigen: ${id}`,
      intro:
        "We konden je bankoverschrijving of SINPE Móvil-betaling niet bevestigen, dus hebben we je gereserveerde data vrijgegeven.",
      cta: "Als je de overschrijving al hebt verstuurd, neem dan contact met ons op met je bewijs, zodat we het kunnen bekijken.",
      note: "Je bent van harte welkom om nieuwe data te zoeken of een nieuwe boeking te starten op onze website.",
    },
    staffDepositReview: {
      subject: (id: string) => `[ACTIE] Aanbetalingsboeking wacht op bevestiging: ${id}`,
      intro:
        "Een gast heeft geboekt via bankoverschrijving / SINPE. De data zijn geblokkeerd in Smoobu op het geblokkeerde kanaal totdat je bevestigt of afwijst.",
      action: "Bevestig zodra het geld is ontvangen. Afwijzen geeft de reservering en de data onmiddellijk vrij.",
      receiptLabel: "Geüpload bewijs",
      noReceipt: "Nog geen bewijs geüpload.",
      guestContact: "Contact gast",
      confirmLabel: "Beoordelen en bevestigen",
      rejectLabel: "Afwijzen en data vrijgeven",
    },
    guestCancelled: {
      subject: (id: string) => `Je boeking is geannuleerd: ${id}`,
      intro: "We hebben je boeking geannuleerd zoals gevraagd. De data zijn weer vrijgegeven en we brengen je niets meer in rekening.",
      refundPending:
        "Ons team verwerkt terugbetalingen handmatig, terug naar de PayPal-rekening waarmee je hebt betaald. Het kan een paar werkdagen duren voordat dit zichtbaar is.",
      noRefund: "Deze boeking is binnen 24 uur voor check-in geannuleerd, dus er geldt geen terugbetaling.",
      note: "Als je deze annulering niet hebt aangevraagd, neem dan direct contact met ons op.",
    },
    staffCancelled: {
      subject: (id: string) => `[ACTIE] Gast heeft geannuleerd ${id}: terugbetaling vereist`,
      intro: "Een gast heeft de boeking via het gastenportaal geannuleerd. De Smoobu-reservering is al geannuleerd en de data zijn vrijgegeven.",
      action: "Verwerk de terugbetaling in PayPal voor de onderstaande betaling. De betaling blijft gemarkeerd als refund_flagged totdat je dit doet.",
      noRefundAction: "Geen terugbetaling verschuldigd. De gast heeft binnen het venster van 24 uur geannuleerd.",
      guestContact: "Contact gast",
    },
    staffHelpRequest: {
      subject: (id: string) => `Hulpverzoek: ${id}`,
      intro: "Een gast heeft een bericht gestuurd via het boekingsportaal.",
      typeLabel: "Type",
      messageLabel: "Bericht",
      guestContact: "Contact gast",
    },
    staffCancellationRequest: {
      subject: (id: string) => `[ACTIE] Annuleringsverzoek: ${id}`,
      intro: "Een gast heeft via het portaal gevraagd om de bevestigde boeking te annuleren. Dit is een verzoek, geen automatische annulering — de boeking is nog actief en Smoobu is niet aangepast.",
      reasonLabel: "Reden",
      messageLabel: "Bericht",
      guestContact: "Contact gast",
      action: "Neem contact op met de gast en verwerk de annulering handmatig indien van toepassing.",
    },
  },
} as const;

// ─── Shared layout ────────────────────────────────────────────────────────────

/**
 * Escapes free-text guest input before it goes into an HTML email body.
 * Every other field these templates interpolate is bounded/structured (IDs,
 * dates, amounts); the portal help/cancellation message is arbitrary text a
 * guest typed, so it's the one field here that genuinely needs this.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatAmount(cents: number, currency: string): string {
  return `${currency} ${(cents / 100).toFixed(2)}`;
}

function formatDate(isoDate: string): string {
  // isoDate may be YYYY-MM-DD or full ISO timestamp
  return isoDate.slice(0, 10);
}

/**
 * `language` flips the label column's padding for Hebrew (the only RTL
 * locale here) so the label still sits on the reading-start side of the
 * row rather than visually swapping with the value column.
 */
function detailsTable(rows: Array<[string, string]>, language: string): string {
  const isRtl = language === "he";
  const labelPadding = isRtl ? "padding:4px 0 4px 12px" : "padding:4px 12px 4px 0";
  const rowsHtml = rows
    .map(([label, value]) => `<tr><td style="${labelPadding};color:#555;white-space:nowrap">${label}</td><td style="padding:4px 0;color:#171717;font-weight:600">${value}</td></tr>`)
    .join("\n");
  return `<table dir="${isRtl ? "rtl" : "ltr"}" style="border-collapse:collapse;margin:16px 0">${rowsHtml}</table>`;
}

function detailsText(rows: Array<[string, string]>): string {
  return rows.map(([label, value]) => `${label}: ${value}`).join("\n");
}

function layout(body: string, footer: string, language: string): string {
  const dir = language === "he" ? "rtl" : "ltr";
  return `<!DOCTYPE html>
<html lang="${language}" dir="${dir}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Urbanist',Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" dir="${dir}" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;width:100%">
  <tr><td style="background:#0B3028;padding:24px 32px">
    <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:1px">Kalawala</span>
  </td></tr>
  <tr><td style="padding:32px;color:#171717;font-size:15px;line-height:1.6;text-align:${dir === "rtl" ? "right" : "left"}">
    ${body}
  </td></tr>
  <tr><td style="background:#f0f0f0;padding:16px 32px;color:#888;font-size:12px;text-align:center">
    ${footer}
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

// ─── Template: hold_created ───────────────────────────────────────────────────

export function renderHoldCreatedEmail(input: EmailTemplateInput): RenderedEmail {
  const s = strings[input.language];
  const t = s.holdCreated;

  const rows: Array<[string, string]> = [
    [s.reservationId, input.reservationPublicId],
    [s.property, input.propertyName],
    [s.arrival, formatDate(input.arrivalDate)],
    [s.departure, formatDate(input.departureDate)],
    [s.guests, String(input.guests)],
    ...(input.totalAmountCents !== undefined && input.currency
      ? [[s.totalAmount, formatAmount(input.totalAmountCents, input.currency)] as [string, string]]
      : []),
    ...(input.holdExpiresAt
      ? [[s.holdExpires, formatDate(input.holdExpiresAt)] as [string, string]]
      : []),
  ];

  const html = layout(
    `<p>${s.greeting(input.guestFirstName)}</p>
<p>${t.intro}</p>
${detailsTable(rows, input.language)}
<p style="color:#294F44;font-weight:600">${t.cta}</p>
<p style="color:#888;font-size:13px">${t.warning}</p>`,
    s.footer,
    input.language
  );

  const text = [
    s.greeting(input.guestFirstName),
    "",
    t.intro,
    "",
    detailsText(rows),
    "",
    t.cta,
    "",
    t.warning,
    "",
    s.footer,
  ].join("\n");

  return { subject: t.subject(input.reservationPublicId), html, text };
}

// ─── Template: payment_pending ────────────────────────────────────────────────

export function renderPaymentPendingEmail(input: EmailTemplateInput): RenderedEmail {
  const s = strings[input.language];
  const t = s.paymentPending;

  const rows: Array<[string, string]> = [
    [s.reservationId, input.reservationPublicId],
    [s.property, input.propertyName],
    [s.arrival, formatDate(input.arrivalDate)],
    [s.departure, formatDate(input.departureDate)],
    [s.guests, String(input.guests)],
    ...(input.totalAmountCents !== undefined && input.currency
      ? [[s.totalAmount, formatAmount(input.totalAmountCents, input.currency)] as [string, string]]
      : []),
    ...(input.paypalOrderId
      ? [[s.paypalOrderId, input.paypalOrderId] as [string, string]]
      : []),
    ...(input.holdExpiresAt
      ? [[s.holdExpires, formatDate(input.holdExpiresAt)] as [string, string]]
      : []),
  ];

  const cta = input.paypalResumeUrl
    ? `<a href="${input.paypalResumeUrl}" style="color:#294F44;font-weight:600">${t.cta}</a>`
    : t.cta;

  const html = layout(
    `<p>${s.greeting(input.guestFirstName)}</p>
<p>${t.intro}</p>
${detailsTable(rows, input.language)}
<p style="color:#294F44;font-weight:600">${cta}</p>
<p style="color:#888;font-size:13px">${t.warning}</p>`,
    s.footer,
    input.language
  );

  const text = [
    s.greeting(input.guestFirstName),
    "",
    t.intro,
    "",
    detailsText(rows),
    "",
    input.paypalResumeUrl ? `${t.cta}: ${input.paypalResumeUrl}` : t.cta,
    "",
    t.warning,
    "",
    s.footer,
  ].join("\n");

  return { subject: t.subject(input.reservationPublicId), html, text };
}

// ─── Template: booking_confirmed ─────────────────────────────────────────────

export function renderBookingConfirmedEmail(input: EmailTemplateInput): RenderedEmail {
  const s = strings[input.language];
  const t = s.confirmed;

  const rows: Array<[string, string]> = [
    [s.reservationId, input.reservationPublicId],
    [s.property, input.propertyName],
    [s.arrival, formatDate(input.arrivalDate)],
    [s.departure, formatDate(input.departureDate)],
    [s.guests, String(input.guests)],
    ...(input.totalAmountCents !== undefined && input.currency
      ? [[s.totalAmount, formatAmount(input.totalAmountCents, input.currency)] as [string, string]]
      : []),
    ...(input.paypalCaptureId
      ? [[s.paypalCaptureId, input.paypalCaptureId] as [string, string]]
      : []),
    ...(input.confirmedAt
      ? [[s.confirmedAt, formatDate(input.confirmedAt)] as [string, string]]
      : []),
  ];

  const html = layout(
    `<p>${s.greeting(input.guestFirstName)}</p>
<p>${t.intro}</p>
${detailsTable(rows, input.language)}
<p style="color:#294F44;font-weight:600">${t.cta}</p>
<p style="color:#888;font-size:13px">${t.note}</p>`,
    s.footer,
    input.language
  );

  const text = [
    s.greeting(input.guestFirstName),
    "",
    t.intro,
    "",
    detailsText(rows),
    "",
    t.cta,
    "",
    t.note,
    "",
    s.footer,
  ].join("\n");

  return { subject: t.subject(input.reservationPublicId), html, text };
}

// ─── Template: cancelled / hold_expired ──────────────────────────────────────

export function renderCancelledEmail(input: EmailTemplateInput): RenderedEmail {
  const s = strings[input.language];
  const t = s.cancelled;

  const rows: Array<[string, string]> = [
    [s.reservationId, input.reservationPublicId],
    [s.property, input.propertyName],
    [s.arrival, formatDate(input.arrivalDate)],
    [s.departure, formatDate(input.departureDate)],
  ];

  const html = layout(
    `<p>${s.greeting(input.guestFirstName)}</p>
<p>${t.intro}</p>
${detailsTable(rows, input.language)}
<p style="color:#294F44;font-weight:600">${t.cta}</p>
<p style="color:#888;font-size:13px">${t.note}</p>`,
    s.footer,
    input.language
  );

  const text = [
    s.greeting(input.guestFirstName),
    "",
    t.intro,
    "",
    detailsText(rows),
    "",
    t.cta,
    "",
    t.note,
    "",
    s.footer,
  ].join("\n");

  return { subject: t.subject(input.reservationPublicId), html, text };
}

// ─── Template: deposit_instructions ──────────────────────────────────────────

/**
 * Guest-facing, sent when a deposit hold is created.
 *
 * Replaces renderDepositHandoffEmail for the new flow — that one told the guest
 * to contact us to check availability, which is no longer true now that the
 * dates are actually held.
 */
export function renderDepositInstructionsEmail(input: EmailTemplateInput): RenderedEmail {
  const s = strings[input.language];
  const t = s.depositInstructions;
  const bank = input.bankInfo;

  const rows: Array<[string, string]> = [
    [s.reservationId, input.reservationPublicId],
    [s.property, input.propertyName],
    [s.arrival, formatDate(input.arrivalDate)],
    [s.departure, formatDate(input.departureDate)],
    [s.guests, String(input.guests)],
    ...(input.totalAmountCents !== undefined && input.currency
      ? ([[s.totalAmount, formatAmount(input.totalAmountCents, input.currency)]] as Array<[string, string]>)
      : []),
    ...(input.holdExpiresAt ? ([[s.holdExpires, input.holdExpiresAt]] as Array<[string, string]>) : []),
  ];

  const bankRows: Array<[string, string]> = bank
    ? [
        [s.sinpe, `${bank.sinpePhone} · ${bank.sinpeName}`],
        [s.accountHolder, bank.bankAccount.accountHolder],
        [s.colones, bank.bankAccount.colonesIban],
        [s.dolares, bank.bankAccount.dolaresIban],
      ]
    : [];

  const uploadLink = input.depositUploadUrl
    ? `<p><a href="${input.depositUploadUrl}" style="color:#294F44;font-weight:700">${t.uploadCta}</a></p>`
    : "";

  const html = layout(
    `<p>${s.greeting(input.guestFirstName)}</p>
<p>${t.intro}</p>
${detailsTable(rows, input.language)}
${bankRows.length > 0 ? detailsTable(bankRows, input.language) : ""}
<p style="color:#b03a2e;font-weight:600">${t.warning}</p>
${uploadLink}
<p style="color:#888;font-size:13px">${t.note}</p>`,
    s.footer,
    input.language
  );

  const text = [
    s.greeting(input.guestFirstName),
    "",
    t.intro,
    "",
    detailsText(rows),
    "",
    ...(bankRows.length > 0 ? [detailsText(bankRows), ""] : []),
    t.warning,
    "",
    ...(input.depositUploadUrl ? [`${t.uploadCta}: ${input.depositUploadUrl}`, ""] : []),
    t.note,
    "",
    s.footer,
  ].join("\n");

  return { subject: t.subject(input.reservationPublicId), html, text };
}

// ─── Template: deposit_confirmed ─────────────────────────────────────────────

export function renderDepositConfirmedEmail(input: EmailTemplateInput): RenderedEmail {
  const s = strings[input.language];
  const t = s.depositConfirmed;

  const rows: Array<[string, string]> = [
    [s.reservationId, input.reservationPublicId],
    [s.property, input.propertyName],
    [s.arrival, formatDate(input.arrivalDate)],
    [s.departure, formatDate(input.departureDate)],
    [s.guests, String(input.guests)],
    ...(input.totalAmountCents !== undefined && input.currency
      ? ([[s.totalAmount, formatAmount(input.totalAmountCents, input.currency)]] as Array<[string, string]>)
      : []),
  ];

  const html = layout(
    `<p>${s.greeting(input.guestFirstName)}</p>
<p>${t.intro}</p>
${detailsTable(rows, input.language)}
<p style="color:#294F44;font-weight:600">${t.portalCta}</p>
<p style="color:#888;font-size:13px">${t.note}</p>`,
    s.footer,
    input.language
  );

  const text = [s.greeting(input.guestFirstName), "", t.intro, "", detailsText(rows), "", t.portalCta, "", t.note, "", s.footer].join("\n");

  return { subject: t.subject(input.reservationPublicId), html, text };
}

// ─── Template: deposit_rejected ──────────────────────────────────────────────

/**
 * Guest-facing, sent when staff reject a manual deposit (no matching transfer
 * found). Distinct from renderCancelledEmail, which is worded for a hold that
 * simply lapsed with no guest-facing reason to give.
 */
export function renderDepositRejectedEmail(input: EmailTemplateInput): RenderedEmail {
  const s = strings[input.language];
  const t = s.depositRejected;

  const rows: Array<[string, string]> = [
    [s.reservationId, input.reservationPublicId],
    [s.property, input.propertyName],
    [s.arrival, formatDate(input.arrivalDate)],
    [s.departure, formatDate(input.departureDate)],
  ];

  const html = layout(
    `<p>${s.greeting(input.guestFirstName)}</p>
<p>${t.intro}</p>
${detailsTable(rows, input.language)}
<p style="color:#294F44;font-weight:600">${t.cta}</p>
<p style="color:#888;font-size:13px">${t.note}</p>`,
    s.footer,
    input.language
  );

  const text = [
    s.greeting(input.guestFirstName),
    "",
    t.intro,
    "",
    detailsText(rows),
    "",
    t.cta,
    "",
    t.note,
    "",
    s.footer,
  ].join("\n");

  return { subject: t.subject(input.reservationPublicId), html, text };
}

// ─── Template: staff_deposit_review ──────────────────────────────────────────

/** Staff-facing. Carries the signed confirm and reject links. */
export function renderStaffDepositReviewEmail(input: EmailTemplateInput): RenderedEmail {
  const s = strings[input.language];
  const t = s.staffDepositReview;

  const rows: Array<[string, string]> = [
    [s.reservationId, input.reservationPublicId],
    [s.property, input.propertyName],
    [s.arrival, formatDate(input.arrivalDate)],
    [s.departure, formatDate(input.departureDate)],
    [s.guests, String(input.guests)],
    ...(input.totalAmountCents !== undefined && input.currency
      ? ([[s.totalAmount, formatAmount(input.totalAmountCents, input.currency)]] as Array<[string, string]>)
      : []),
    ...(input.holdExpiresAt ? ([[s.holdExpires, input.holdExpiresAt]] as Array<[string, string]>) : []),
    [t.guestContact, [input.guestFirstName, input.guestEmail, input.guestPhone].filter(Boolean).join(" · ")],
    [t.receiptLabel, input.depositReceiptUrl ? input.depositReceiptUrl : t.noReceipt],
  ];

  const actions = [
    input.depositConfirmUrl
      ? `<p><a href="${input.depositConfirmUrl}" style="color:#294F44;font-weight:700">${t.confirmLabel}</a></p>`
      : "",
    input.depositRejectUrl
      ? `<p><a href="${input.depositRejectUrl}" style="color:#b03a2e;font-weight:700">${t.rejectLabel}</a></p>`
      : "",
  ].join("\n");

  const html = layout(
    `<p>${t.intro}</p>
${detailsTable(rows, input.language)}
<p style="font-weight:600">${t.action}</p>
${actions}`,
    s.footer,
    input.language
  );

  const text = [
    t.intro,
    "",
    detailsText(rows),
    "",
    t.action,
    "",
    ...(input.depositConfirmUrl ? [`${t.confirmLabel}: ${input.depositConfirmUrl}`] : []),
    ...(input.depositRejectUrl ? [`${t.rejectLabel}: ${input.depositRejectUrl}`] : []),
    "",
    s.footer,
  ].join("\n");

  return { subject: t.subject(input.reservationPublicId), html, text };
}

// ─── Template: guest_cancellation ────────────────────────────────────────────

/**
 * Sent to the guest after a self-service cancellation.
 *
 * Distinct from renderCancelledEmail, which is worded for a hold that lapsed
 * before payment ("your hold has expired") and is used by the hold-expiry worker.
 * This one is for a paid booking the guest deliberately cancelled, so it has to
 * say what happens to their money.
 */
export function renderGuestCancellationEmail(input: EmailTemplateInput): RenderedEmail {
  const s = strings[input.language];
  const t = s.guestCancelled;
  const refundExpected = Boolean(input.paypalCaptureId) && input.refundExpected !== false;

  const rows: Array<[string, string]> = [
    [s.reservationId, input.reservationPublicId],
    [s.property, input.propertyName],
    [s.arrival, formatDate(input.arrivalDate)],
    [s.departure, formatDate(input.departureDate)],
    ...(input.totalAmountCents !== undefined && input.currency
      ? ([[s.totalAmount, formatAmount(input.totalAmountCents, input.currency)]] as Array<[string, string]>)
      : []),
    ...(input.cancellationReason
      ? ([[s.cancellationReason, input.cancellationReason]] as Array<[string, string]>)
      : []),
  ];

  const refundCopy = refundExpected ? t.refundPending : t.noRefund;

  const html = layout(
    `<p>${s.greeting(input.guestFirstName)}</p>
<p>${t.intro}</p>
${detailsTable(rows, input.language)}
<p style="color:#294F44;font-weight:600">${refundCopy}</p>
<p style="color:#888;font-size:13px">${t.note}</p>`,
    s.footer,
    input.language
  );

  const text = [
    s.greeting(input.guestFirstName),
    "",
    t.intro,
    "",
    detailsText(rows),
    "",
    refundCopy,
    "",
    t.note,
    "",
    s.footer,
  ].join("\n");

  return { subject: t.subject(input.reservationPublicId), html, text };
}

// ─── Template: staff_cancellation_alert ──────────────────────────────────────

/**
 * Sent to STAFF_NOTIFICATION_EMAIL, not the guest. Refunds are issued by hand,
 * so this carries the PayPal capture ID and the guest's contact details.
 */
export function renderStaffCancellationEmail(input: EmailTemplateInput): RenderedEmail {
  const s = strings[input.language];
  const t = s.staffCancelled;
  const refundExpected = Boolean(input.paypalCaptureId) && input.refundExpected !== false;

  const rows: Array<[string, string]> = [
    [s.reservationId, input.reservationPublicId],
    [s.property, input.propertyName],
    [s.arrival, formatDate(input.arrivalDate)],
    [s.departure, formatDate(input.departureDate)],
    [s.guests, String(input.guests)],
    ...(input.totalAmountCents !== undefined && input.currency
      ? ([[s.totalAmount, formatAmount(input.totalAmountCents, input.currency)]] as Array<[string, string]>)
      : []),
    ...(input.paypalCaptureId ? ([[s.paypalCaptureId, input.paypalCaptureId]] as Array<[string, string]>) : []),
    ...(input.cancellationReason
      ? ([[s.cancellationReason, input.cancellationReason]] as Array<[string, string]>)
      : []),
    [t.guestContact, `${input.guestFirstName} · ${input.guestEmail}`],
  ];

  const actionCopy = refundExpected ? t.action : t.noRefundAction;

  const html = layout(
    `<p>${t.intro}</p>
${detailsTable(rows, input.language)}
<p style="color:#294F44;font-weight:600">${actionCopy}</p>`,
    s.footer,
    input.language
  );

  const text = [t.intro, "", detailsText(rows), "", actionCopy, "", s.footer].join("\n");

  return { subject: t.subject(input.reservationPublicId), html, text };
}

// ─── Template: staff_help_request ────────────────────────────────────────────

/**
 * Sent to STAFF_NOTIFICATION_EMAIL — forwards a guest's portal help-request
 * message. `guestMessage` is free text a guest typed, unlike every other
 * field in this template, so it's the one HTML-escaped before interpolation.
 */
export function renderStaffHelpRequestEmail(input: EmailTemplateInput): RenderedEmail {
  const s = strings[input.language];
  const t = s.staffHelpRequest;

  const rows: Array<[string, string]> = [
    [s.reservationId, input.reservationPublicId],
    [s.property, input.propertyName],
    [s.arrival, formatDate(input.arrivalDate)],
    [s.departure, formatDate(input.departureDate)],
    ...(input.helpRequestType ? ([[t.typeLabel, input.helpRequestType]] as Array<[string, string]>) : []),
    [t.guestContact, `${escapeHtml(input.guestFirstName)} · ${escapeHtml(input.guestEmail)}`],
  ];

  const message = input.guestMessage ?? "";

  const html = layout(
    `<p>${t.intro}</p>
${detailsTable(rows, input.language)}
<p style="color:#555;margin-bottom:4px">${t.messageLabel}</p>
<p style="white-space:pre-wrap;background:#f5f5f5;border-radius:6px;padding:12px 16px;margin:0">${escapeHtml(message)}</p>`,
    s.footer,
    input.language
  );

  const text = [t.intro, "", detailsText(rows), "", `${t.messageLabel}:`, message, "", s.footer].join("\n");

  return { subject: t.subject(input.reservationPublicId), html, text };
}

// ─── Template: staff_cancellation_request ────────────────────────────────────

/**
 * Sent to STAFF_NOTIFICATION_EMAIL when a guest asks (via the portal) to
 * cancel a confirmed booking. This is the *request* — nothing is cancelled
 * automatically; staff follow up and, if appropriate, process it by hand
 * (see renderStaffCancellationEmail for the actual-cancellation alert).
 */
export function renderStaffCancellationRequestEmail(input: EmailTemplateInput): RenderedEmail {
  const s = strings[input.language];
  const t = s.staffCancellationRequest;

  const rows: Array<[string, string]> = [
    [s.reservationId, input.reservationPublicId],
    [s.property, input.propertyName],
    [s.arrival, formatDate(input.arrivalDate)],
    [s.departure, formatDate(input.departureDate)],
    ...(input.cancellationReason ? ([[t.reasonLabel, input.cancellationReason]] as Array<[string, string]>) : []),
    [t.guestContact, `${escapeHtml(input.guestFirstName)} · ${escapeHtml(input.guestEmail)}`],
  ];

  const message = input.guestMessage ?? "";

  const html = layout(
    `<p>${t.intro}</p>
${detailsTable(rows, input.language)}
${
  message
    ? `<p style="color:#555;margin-bottom:4px">${t.messageLabel}</p>
<p style="white-space:pre-wrap;background:#f5f5f5;border-radius:6px;padding:12px 16px;margin:0 0 16px">${escapeHtml(message)}</p>`
    : ""
}
<p style="color:#294F44;font-weight:600">${t.action}</p>`,
    s.footer,
    input.language
  );

  const text = [
    t.intro,
    "",
    detailsText(rows),
    ...(message ? ["", `${t.messageLabel}:`, message] : []),
    "",
    t.action,
    "",
    s.footer,
  ].join("\n");

  return { subject: t.subject(input.reservationPublicId), html, text };
}

// ─── Template: manual_deposit_handoff ────────────────────────────────────────

export function renderDepositHandoffEmail(input: EmailTemplateInput): RenderedEmail {
  const s = strings[input.language];
  const t = s.depositHandoff;
  const isRtl = input.language === "he";

  // Callers (EmailClient) are responsible for resolving config/env fallbacks
  // before calling this template. The template itself must not read process.env.
  const contactWhatsApp = input.contactWhatsApp ?? "https://wa.me/contact";
  const contactEmail = input.contactEmail ?? "reservations@kalawala.com";

  const contextRows: Array<[string, string]> = [
    ...(input.propertyName ? [[s.property, input.propertyName] as [string, string]] : []),
    ...(input.arrivalDate ? [[s.arrival, formatDate(input.arrivalDate)] as [string, string]] : []),
    ...(input.departureDate ? [[s.departure, formatDate(input.departureDate)] as [string, string]] : []),
    ...(input.guests ? [[s.guests, String(input.guests)] as [string, string]] : []),
  ];

  const html = layout(
    `<p>${s.greeting(input.guestFirstName)}</p>
<p>${t.intro}</p>
${contextRows.length > 0 ? detailsTable(contextRows, input.language) : ""}
<ol style="${isRtl ? "padding-right:20px" : "padding-left:20px"};line-height:1.8">
  <li>${t.step1}</li>
  <li>${t.step2}</li>
  <li>${t.step3}</li>
</ol>
<p style="background:#fff3cd;${isRtl ? "border-right" : "border-left"}:4px solid #FFC107;padding:12px 16px;border-radius:4px;font-size:13px">${t.warning}</p>
<p><strong>${t.contactLabel}:</strong><br>
  WhatsApp: <a href="${contactWhatsApp}" style="color:#294F44">${contactWhatsApp}</a><br>
  Email: <a href="mailto:${contactEmail}" style="color:#294F44">${contactEmail}</a>
</p>`,
    s.footer,
    input.language
  );

  const text = [
    s.greeting(input.guestFirstName),
    "",
    t.intro,
    "",
    ...(contextRows.length > 0 ? [detailsText(contextRows), ""] : []),
    `1. ${t.step1}`,
    `2. ${t.step2}`,
    `3. ${t.step3}`,
    "",
    t.warning,
    "",
    `${t.contactLabel}:`,
    `WhatsApp: ${contactWhatsApp}`,
    `Email: ${contactEmail}`,
    "",
    s.footer,
  ].join("\n");

  return { subject: t.subject, html, text };
}
