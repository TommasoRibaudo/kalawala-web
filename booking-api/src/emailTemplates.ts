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
  reservationPublicId: string;
  propertyName: string;
  arrivalDate: string;
  departureDate: string;
  guests: number;
  currency?: string;
  totalAmountCents?: number;
  holdExpiresAt?: string;
  paypalOrderId?: string;
  paypalCaptureId?: string;
  confirmedAt?: string;
  cancellationReason?: string;
  /** Override default WhatsApp contact URL (falls back to config/env default) */
  contactWhatsApp?: string;
  /** Override default contact email address (falls back to config/env default) */
  contactEmail?: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

// ─── String maps ──────────────────────────────────────────────────────────────

const strings = {
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
      subject: (id: string) => `Your hold is active — ${id}`,
      intro: "Your reservation hold is now active. You have a limited time to complete your PayPal payment before the hold expires.",
      cta: "Complete your payment before the hold expires to confirm your booking.",
      warning: "If the hold expires, the property will be released and you will need to start a new search.",
    },
    paymentPending: {
      subject: (id: string) => `Complete your payment — ${id}`,
      intro: "Your PayPal order has been created. Please approve the payment to confirm your booking.",
      cta: "Return to the booking page to approve your PayPal payment.",
      warning: "Your hold will expire if payment is not completed in time.",
    },
    confirmed: {
      subject: (id: string) => `Booking confirmed — ${id}`,
      intro: "Your booking is confirmed. We look forward to welcoming you to Puerto Viejo!",
      cta: "You can view your reservation details using your reservation ID and the password you set during checkout.",
      note: "If you have any questions, please contact us at reservas.kalawala@gmail.com or via WhatsApp.",
    },
    cancelled: {
      subject: (id: string) => `Reservation cancelled — ${id}`,
      intro: "Your reservation hold has expired or been cancelled.",
      cta: "You are welcome to search for new dates on our website.",
      note: "If you believe this is an error, please contact us.",
    },
    depositHandoff: {
      subject: "Manual deposit instructions — Kalawala",
      intro: "Thank you for your interest in booking with Kalawala. To complete your reservation via manual deposit, please follow the instructions below.",
      step1: "Contact us via WhatsApp or email to confirm availability and receive bank transfer details.",
      step2: "Transfer the deposit amount and send us proof of payment.",
      step3: "Our team will confirm your booking directly in our system.",
      warning: "Your booking is NOT confirmed until our team verifies your deposit and confirms it manually.",
      contactLabel: "Contact us",
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
      subject: (id: string) => `Tu reserva está activa — ${id}`,
      intro: "Tu reserva provisional está activa. Tienes un tiempo limitado para completar el pago con PayPal antes de que expire.",
      cta: "Completa tu pago antes de que expire la reserva para confirmar tu estadía.",
      warning: "Si la reserva expira, la propiedad quedará disponible y deberás iniciar una nueva búsqueda.",
    },
    paymentPending: {
      subject: (id: string) => `Completa tu pago — ${id}`,
      intro: "Tu orden de PayPal ha sido creada. Por favor aprueba el pago para confirmar tu reserva.",
      cta: "Regresa a la página de reserva para aprobar tu pago con PayPal.",
      warning: "Tu reserva expirará si no completas el pago a tiempo.",
    },
    confirmed: {
      subject: (id: string) => `Reserva confirmada — ${id}`,
      intro: "¡Tu reserva está confirmada! Esperamos darte la bienvenida en Puerto Viejo.",
      cta: "Puedes ver los detalles de tu reserva usando tu ID de reserva y la contraseña que creaste durante el proceso de pago.",
      note: "Si tienes alguna pregunta, contáctanos en reservas.kalawala@gmail.com o por WhatsApp.",
    },
    cancelled: {
      subject: (id: string) => `Reserva cancelada — ${id}`,
      intro: "Tu reserva provisional ha expirado o ha sido cancelada.",
      cta: "Puedes buscar nuevas fechas en nuestro sitio web.",
      note: "Si crees que esto es un error, por favor contáctanos.",
    },
    depositHandoff: {
      subject: "Instrucciones de depósito manual — Kalawala",
      intro: "Gracias por tu interés en reservar con Kalawala. Para completar tu reserva mediante depósito manual, sigue las instrucciones a continuación.",
      step1: "Contáctanos por WhatsApp o correo electrónico para confirmar disponibilidad y recibir los datos bancarios.",
      step2: "Realiza la transferencia del depósito y envíanos el comprobante de pago.",
      step3: "Nuestro equipo confirmará tu reserva directamente en nuestro sistema.",
      warning: "Tu reserva NO está confirmada hasta que nuestro equipo verifique tu depósito y lo confirme manualmente.",
      contactLabel: "Contáctanos",
    },
  },
} as const;

// ─── Shared layout ────────────────────────────────────────────────────────────

function formatAmount(cents: number, currency: string): string {
  return `${currency} ${(cents / 100).toFixed(2)}`;
}

function formatDate(isoDate: string): string {
  // isoDate may be YYYY-MM-DD or full ISO timestamp
  return isoDate.slice(0, 10);
}

function detailsTable(rows: Array<[string, string]>): string {
  const rowsHtml = rows
    .map(([label, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#555;white-space:nowrap">${label}</td><td style="padding:4px 0;color:#171717;font-weight:600">${value}</td></tr>`)
    .join("\n");
  return `<table style="border-collapse:collapse;margin:16px 0">${rowsHtml}</table>`;
}

function detailsText(rows: Array<[string, string]>): string {
  return rows.map(([label, value]) => `${label}: ${value}`).join("\n");
}

function layout(body: string, footer: string, language: string): string {
  return `<!DOCTYPE html>
<html lang="${language}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:'Urbanist',Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;width:100%">
  <tr><td style="background:#0B3028;padding:24px 32px">
    <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:1px">Kalawala</span>
  </td></tr>
  <tr><td style="padding:32px;color:#171717;font-size:15px;line-height:1.6">
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
${detailsTable(rows)}
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

  const html = layout(
    `<p>${s.greeting(input.guestFirstName)}</p>
<p>${t.intro}</p>
${detailsTable(rows)}
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
${detailsTable(rows)}
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
${detailsTable(rows)}
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

// ─── Template: manual_deposit_handoff ────────────────────────────────────────

export function renderDepositHandoffEmail(input: EmailTemplateInput): RenderedEmail {
  const s = strings[input.language];
  const t = s.depositHandoff;

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
${contextRows.length > 0 ? detailsTable(contextRows) : ""}
<ol style="padding-left:20px;line-height:1.8">
  <li>${t.step1}</li>
  <li>${t.step2}</li>
  <li>${t.step3}</li>
</ol>
<p style="background:#fff3cd;border-left:4px solid #FFC107;padding:12px 16px;border-radius:4px;font-size:13px">${t.warning}</p>
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
