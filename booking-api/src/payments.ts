import { randomUUID } from "crypto";
import { ApiError } from "./http/errors";

export type PaymentStatus = "order_created" | "captured" | "failed";

export interface PaymentRecord {
  id: string;
  bookingSessionId: string;
  paypalOrderId: string;
  paypalCaptureId?: string;
  /** PayPal-Request-Id sent when creating the PayPal order. Stable for idempotent retries. */
  paypalRequestIdOrder: string;
  /** PayPal-Request-Id to use when capturing. Pre-assigned at payment record creation time. */
  paypalRequestIdCapture: string;
  status: PaymentStatus;
  currency: string;
  totalAmountCents: number;
  capturedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRepository {
  /** Create a payment record for a newly-created PayPal order. Throws 409 if one already exists. */
  createOrderPayment(input: {
    bookingSessionId: string;
    paypalOrderId: string;
    paypalRequestIdOrder: string;
    paypalRequestIdCapture: string;
    currency: string;
    totalAmountCents: number;
  }): Promise<PaymentRecord>;

  getByBookingSessionId(bookingSessionId: string): Promise<PaymentRecord | undefined>;

  markCaptured(input: {
    bookingSessionId: string;
    paypalCaptureId: string;
    capturedAt: string;
  }): Promise<PaymentRecord>;

  markFailed(bookingSessionId: string): Promise<PaymentRecord>;
}

export class InMemoryPaymentRepository implements PaymentRepository {
  private readonly records = new Map<string, PaymentRecord>();

  async createOrderPayment(input: {
    bookingSessionId: string;
    paypalOrderId: string;
    paypalRequestIdOrder: string;
    paypalRequestIdCapture: string;
    currency: string;
    totalAmountCents: number;
  }): Promise<PaymentRecord> {
    if (this.records.has(input.bookingSessionId)) {
      throw new ApiError(409, "payment_already_exists", "A payment record already exists for this booking session.");
    }

    const now = new Date().toISOString();
    const record: PaymentRecord = {
      id: randomUUID(),
      bookingSessionId: input.bookingSessionId,
      paypalOrderId: input.paypalOrderId,
      paypalRequestIdOrder: input.paypalRequestIdOrder,
      paypalRequestIdCapture: input.paypalRequestIdCapture,
      status: "order_created",
      currency: input.currency,
      totalAmountCents: input.totalAmountCents,
      createdAt: now,
      updatedAt: now,
    };

    this.records.set(input.bookingSessionId, record);
    return record;
  }

  async getByBookingSessionId(bookingSessionId: string): Promise<PaymentRecord | undefined> {
    return this.records.get(bookingSessionId);
  }

  async markCaptured(input: {
    bookingSessionId: string;
    paypalCaptureId: string;
    capturedAt: string;
  }): Promise<PaymentRecord> {
    const existing = this.getRequired(input.bookingSessionId);
    const updated: PaymentRecord = {
      ...existing,
      status: "captured",
      paypalCaptureId: input.paypalCaptureId,
      capturedAt: input.capturedAt,
      updatedAt: new Date().toISOString(),
    };
    this.records.set(input.bookingSessionId, updated);
    return updated;
  }

  async markFailed(bookingSessionId: string): Promise<PaymentRecord> {
    const existing = this.getRequired(bookingSessionId);
    const updated: PaymentRecord = {
      ...existing,
      status: "failed",
      updatedAt: new Date().toISOString(),
    };
    this.records.set(bookingSessionId, updated);
    return updated;
  }

  private getRequired(bookingSessionId: string): PaymentRecord {
    const record = this.records.get(bookingSessionId);
    if (!record) {
      throw new ApiError(500, "payment_state_invalid", "Payment record is missing.");
    }
    return record;
  }
}
