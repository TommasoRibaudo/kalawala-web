/**
 * email.ts
 *
 * Thin SES email client and high-level send helpers for each booking state.
 * Uses the AWS SDK v3 SES client available in the Lambda runtime (no extra
 * npm dependency needed — @aws-sdk/* packages are bundled in the Lambda
 * Node.js 18+ managed runtime).
 *
 * The client is intentionally lazy-loaded so unit tests can run without
 * real AWS credentials.
 */

import type { BookingLanguage, BookingSessionRecord } from "./bookingSessions";
import type { ObservabilityLogger } from "./types";
import {
  EmailTemplateInput,
  renderBookingConfirmedEmail,
  renderCancelledEmail,
  renderDepositHandoffEmail,
  renderHoldCreatedEmail,
  renderPaymentPendingEmail,
} from "./emailTemplates";

// ─── Config ───────────────────────────────────────────────────────────────────

export interface EmailConfig {
  /** SES from-address, e.g. "reservations@kalawala.com" */
  fromAddress: string;
  /** AWS region for SES, e.g. "us-east-1" */
  region: string;
  /** Set to true to skip actual SES calls (useful in local/test environments). */
  disabled?: boolean;
  /** WhatsApp contact URL shown in deposit handoff emails. Defaults to env CONTACT_WHATSAPP_URL. */
  contactWhatsAppUrl?: string;
  /** Contact email address shown in deposit handoff emails. Defaults to env CONTACT_EMAIL. */
  contactEmail?: string;
}

// ─── SES send (lazy-loaded AWS SDK) ──────────────────────────────────────────

interface SesInput {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  region: string;
}

/**
 * Sends an email via SES using the AWS SDK v3.
 * The SDK is require()'d at call time so the module can be imported in tests
 * without triggering AWS credential resolution.
 */
async function sesSend(input: SesInput): Promise<void> {
  // Dynamic import keeps the module testable without AWS credentials.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses") as typeof import("@aws-sdk/client-ses");

  const client = new SESClient({ region: input.region });
  const command = new SendEmailCommand({
    Source: input.from,
    Destination: { ToAddresses: [input.to] },
    Message: {
      Subject: { Data: input.subject, Charset: "UTF-8" },
      Body: {
        Html: { Data: input.html, Charset: "UTF-8" },
        Text: { Data: input.text, Charset: "UTF-8" },
      },
    },
  });

  await client.send(command);
}

// ─── EmailClient ─────────────────────────────────────────────────────────────

export class EmailClient {
  constructor(
    private readonly config: EmailConfig,
    private readonly logger: ObservabilityLogger
  ) {}

  private async send(
    to: string,
    subject: string,
    html: string,
    text: string,
    context: Record<string, unknown>
  ): Promise<void> {
    if (this.config.disabled) {
      this.logger.info("email_send_skipped_disabled", { to, subject, ...context });
      return;
    }

    try {
      await sesSend({
        from: this.config.fromAddress,
        to,
        subject,
        html,
        text,
        region: this.config.region,
      });
      this.logger.info("email_sent", { to, subject, ...context });
    } catch (error) {
      // Email failures are non-fatal — log and continue.
      // The booking state machine has already transitioned; a failed email
      // should not roll back a confirmed booking.
      this.logger.error("email_send_failed", {
        to,
        subject,
        error: error instanceof Error ? error.message : String(error),
        ...context,
      });
    }
  }

  async sendHoldCreated(session: BookingSessionRecord, propertyName: string): Promise<void> {
    if (!session.guest?.email) return;
    const input = buildTemplateInput(session, propertyName);
    const { subject, html, text } = renderHoldCreatedEmail(input);
    await this.send(session.guest.email, subject, html, text, {
      template: "hold_created",
      reservationPublicId: session.reservationPublicId,
      bookingSessionId: session.id,
    });
  }

  async sendPaymentPending(
    session: BookingSessionRecord,
    propertyName: string,
    paypalOrderId: string
  ): Promise<void> {
    if (!session.guest?.email) return;
    const input: EmailTemplateInput = {
      ...buildTemplateInput(session, propertyName),
      paypalOrderId,
    };
    const { subject, html, text } = renderPaymentPendingEmail(input);
    await this.send(session.guest.email, subject, html, text, {
      template: "payment_pending",
      reservationPublicId: session.reservationPublicId,
      bookingSessionId: session.id,
    });
  }

  async sendBookingConfirmed(
    session: BookingSessionRecord,
    propertyName: string,
    paypalCaptureId?: string
  ): Promise<void> {
    if (!session.guest?.email) return;
    const input: EmailTemplateInput = {
      ...buildTemplateInput(session, propertyName),
      paypalCaptureId,
      confirmedAt: session.confirmedAt,
    };
    const { subject, html, text } = renderBookingConfirmedEmail(input);
    await this.send(session.guest.email, subject, html, text, {
      template: "booking_confirmed",
      reservationPublicId: session.reservationPublicId,
      bookingSessionId: session.id,
    });
  }

  async sendCancelled(session: BookingSessionRecord, propertyName: string): Promise<void> {
    if (!session.guest?.email) return;
    const input = buildTemplateInput(session, propertyName);
    const { subject, html, text } = renderCancelledEmail(input);
    await this.send(session.guest.email, subject, html, text, {
      template: "cancelled",
      reservationPublicId: session.reservationPublicId,
      bookingSessionId: session.id,
    });
  }

  async sendDepositHandoff(
    guestEmail: string,
    guestFirstName: string,
    language: BookingLanguage,
    propertyName: string,
    arrivalDate: string,
    departureDate: string,
    guests: number
  ): Promise<void> {
    const DEFAULT_WHATSAPP = "https://wa.me/50684632276";
    const DEFAULT_CONTACT_EMAIL = "reservas.kalawala@gmail.com";
    const input: EmailTemplateInput = {
      language,
      guestFirstName,
      guestEmail,
      reservationPublicId: "",
      propertyName,
      arrivalDate,
      departureDate,
      guests,
      contactWhatsApp: this.config.contactWhatsAppUrl ?? DEFAULT_WHATSAPP,
      contactEmail: this.config.contactEmail ?? DEFAULT_CONTACT_EMAIL,
    };
    const { subject, html, text } = renderDepositHandoffEmail(input);
    await this.send(guestEmail, subject, html, text, {
      template: "deposit_handoff",
      language,
    });
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildTemplateInput(session: BookingSessionRecord, propertyName: string): EmailTemplateInput {
  return {
    language: session.language,
    guestFirstName: session.guest?.firstName ?? "",
    guestEmail: session.guest?.email ?? "",
    reservationPublicId: session.reservationPublicId,
    propertyName,
    arrivalDate: session.arrivalDate,
    departureDate: session.departureDate,
    guests: session.guests,
    currency: session.currency,
    totalAmountCents: session.totalAmountCents,
    holdExpiresAt: session.expiresAt,
  };
}

// ─── Factory ──────────────────────────────────────────────────────────────────

export function createEmailClient(config: EmailConfig, logger: ObservabilityLogger): EmailClient {
  return new EmailClient(config, logger);
}
