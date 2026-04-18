import { randomBytes, randomUUID } from "crypto";

export type BookingLanguage = "en" | "es";
export type BookingSessionStatus =
  | "quoted"
  | "no_availability"
  | "hold_creating"
  | "hold_active"
  | "hold_expired"
  | "paypal_order_created"
  | "booking_confirmed"
  | "failed";

const DEFAULT_QUOTE_TTL_MS = 10 * 60 * 1000;

export interface CreateQuotedBookingSessionInput {
  arrivalDate: string;
  departureDate: string;
  guests: number;
  language: BookingLanguage;
  source?: string;
  quoteTtlMs?: number;
  quotedProperties?: BookingSessionQuotedProperty[];
}

export interface BookingSessionQuotedProperty {
  propertyId: string;
  currency: string;
  totalAmountCents: number;
  nightlyAverageCents: number;
  nights: number;
  includesTaxes: boolean;
  rateSource: "smoobu";
}

export interface HoldGuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  message?: string;
}

export interface BookingSessionRecord {
  id: string;
  reservationPublicId: string;
  quoteId: string;
  status: BookingSessionStatus;
  language: BookingLanguage;
  arrivalDate: string;
  departureDate: string;
  guests: number;
  source?: string;
  quoteExpiresAt: string;
  quotedProperties: BookingSessionQuotedProperty[];
  propertyId?: string;
  paymentMethod?: "paypal";
  currency?: string;
  totalAmountCents?: number;
  guest?: HoldGuestDetails;
  portalPasswordHash?: string;
  portalPasswordSetAt?: string;
  expiresAt?: string;
  paypalOrderId?: string;
  confirmedAt?: string;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingSessionRepository {
  createQuotedSession(input: CreateQuotedBookingSessionInput): Promise<BookingSessionRecord>;
  getById(id: string): Promise<BookingSessionRecord | undefined>;
  getByQuoteId(quoteId: string): Promise<BookingSessionRecord | undefined>;
  getByReservationPublicId(reservationPublicId: string): Promise<BookingSessionRecord | undefined>;
  markHoldCreating(input: {
    bookingSessionId: string;
    propertyId: string;
    paymentMethod: "paypal";
    price: BookingSessionQuotedProperty;
    guest: HoldGuestDetails;
    portalPasswordHash: string;
    expiresAt: string;
  }): Promise<BookingSessionRecord>;
  markHoldActive(input: { bookingSessionId: string; expiresAt: string }): Promise<BookingSessionRecord>;
  markPaypalOrderCreated(input: { bookingSessionId: string; paypalOrderId: string }): Promise<BookingSessionRecord>;
  markBookingConfirmed(input: { bookingSessionId: string; confirmedAt: string }): Promise<BookingSessionRecord>;
  markFailed(input: { bookingSessionId: string; reason: string }): Promise<BookingSessionRecord>;
  markHoldExpired(input: { bookingSessionId: string }): Promise<BookingSessionRecord>;
  listByStatus?(status: BookingSessionStatus): Promise<BookingSessionRecord[]>;
}

export class InMemoryBookingSessionRepository implements BookingSessionRepository {
  private readonly sessionsById = new Map<string, BookingSessionRecord>();
  private readonly sessionsByQuoteId = new Map<string, BookingSessionRecord>();
  private readonly sessionsByPublicId = new Map<string, BookingSessionRecord>();

  async createQuotedSession(input: CreateQuotedBookingSessionInput): Promise<BookingSessionRecord> {
    const record = createBookingSessionRecord(input, "quoted");

    this.sessionsById.set(record.id, record);
    this.sessionsByQuoteId.set(record.quoteId, record);
    this.sessionsByPublicId.set(record.reservationPublicId, record);
    return record;
  }

  async getById(id: string): Promise<BookingSessionRecord | undefined> {
    return this.sessionsById.get(id);
  }

  async getByQuoteId(quoteId: string): Promise<BookingSessionRecord | undefined> {
    return this.sessionsByQuoteId.get(quoteId);
  }

  async getByReservationPublicId(reservationPublicId: string): Promise<BookingSessionRecord | undefined> {
    return this.sessionsByPublicId.get(reservationPublicId);
  }

  async markHoldCreating(input: {
    bookingSessionId: string;
    propertyId: string;
    paymentMethod: "paypal";
    price: BookingSessionQuotedProperty;
    guest: HoldGuestDetails;
    portalPasswordHash: string;
    expiresAt: string;
  }): Promise<BookingSessionRecord> {
    const existing = this.sessionsById.get(input.bookingSessionId);
    if (!existing) {
      throw new Error(`Booking session ${input.bookingSessionId} was not found.`);
    }

    return this.save({
      ...existing,
      status: "hold_creating",
      propertyId: input.propertyId,
      paymentMethod: input.paymentMethod,
      currency: input.price.currency,
      totalAmountCents: input.price.totalAmountCents,
      guest: input.guest,
      portalPasswordHash: input.portalPasswordHash,
      portalPasswordSetAt: new Date().toISOString(),
      expiresAt: input.expiresAt,
      updatedAt: new Date().toISOString(),
    });
  }

  async markHoldActive(input: { bookingSessionId: string; expiresAt: string }): Promise<BookingSessionRecord> {
    const existing = this.sessionsById.get(input.bookingSessionId);
    if (!existing) {
      throw new Error(`Booking session ${input.bookingSessionId} was not found.`);
    }

    return this.save({
      ...existing,
      status: "hold_active",
      expiresAt: input.expiresAt,
      updatedAt: new Date().toISOString(),
    });
  }

  async markPaypalOrderCreated(input: {
    bookingSessionId: string;
    paypalOrderId: string;
  }): Promise<BookingSessionRecord> {
    const existing = this.sessionsById.get(input.bookingSessionId);
    if (!existing) {
      throw new Error(`Booking session ${input.bookingSessionId} was not found.`);
    }
    if (existing.status !== "hold_active") {
      throw new Error(
        `Cannot transition booking session ${input.bookingSessionId} to paypal_order_created: expected hold_active, got ${existing.status}.`
      );
    }

    return this.save({
      ...existing,
      status: "paypal_order_created",
      paypalOrderId: input.paypalOrderId,
      updatedAt: new Date().toISOString(),
    });
  }

  async markBookingConfirmed(input: {
    bookingSessionId: string;
    confirmedAt: string;
  }): Promise<BookingSessionRecord> {
    const existing = this.sessionsById.get(input.bookingSessionId);
    if (!existing) {
      throw new Error(`Booking session ${input.bookingSessionId} was not found.`);
    }
    if (existing.status !== "paypal_order_created") {
      throw new Error(
        `Cannot transition booking session ${input.bookingSessionId} to booking_confirmed: expected paypal_order_created, got ${existing.status}.`
      );
    }

    return this.save({
      ...existing,
      status: "booking_confirmed",
      confirmedAt: input.confirmedAt,
      updatedAt: new Date().toISOString(),
    });
  }

  async markFailed(input: { bookingSessionId: string; reason: string }): Promise<BookingSessionRecord> {
    const existing = this.sessionsById.get(input.bookingSessionId);
    if (!existing) {
      throw new Error(`Booking session ${input.bookingSessionId} was not found.`);
    }

    return this.save({
      ...existing,
      status: "failed",
      failureReason: input.reason,
      updatedAt: new Date().toISOString(),
    });
  }

  async markHoldExpired(input: { bookingSessionId: string }): Promise<BookingSessionRecord> {
    const existing = this.sessionsById.get(input.bookingSessionId);
    if (!existing) {
      throw new Error(`Booking session ${input.bookingSessionId} was not found.`);
    }

    return this.save({
      ...existing,
      status: "hold_expired",
      updatedAt: new Date().toISOString(),
    });
  }

  async listByStatus(status: BookingSessionStatus): Promise<BookingSessionRecord[]> {
    const results: BookingSessionRecord[] = [];
    for (const session of this.sessionsById.values()) {
      if (session.status === status) {
        results.push(session);
      }
    }
    return results;
  }

  private save(record: BookingSessionRecord): BookingSessionRecord {
    this.sessionsById.set(record.id, record);
    this.sessionsByQuoteId.set(record.quoteId, record);
    this.sessionsByPublicId.set(record.reservationPublicId, record);
    return record;
  }
}

export function getBookingSessionRepository(): BookingSessionRepository {
  return new InMemoryBookingSessionRepository();
}

export function createNoAvailabilitySession(input: CreateQuotedBookingSessionInput): BookingSessionRecord {
  return createBookingSessionRecord(input, "no_availability");
}

function createBookingSessionRecord(
  input: CreateQuotedBookingSessionInput,
  status: BookingSessionStatus
): BookingSessionRecord {
  const now = new Date();
  return {
    id: randomUUID(),
    reservationPublicId: createReservationPublicId(),
    quoteId: createQuoteId(),
    status,
    language: input.language,
    arrivalDate: input.arrivalDate,
    departureDate: input.departureDate,
    guests: input.guests,
    ...(input.source ? { source: input.source } : {}),
    quoteExpiresAt: new Date(now.getTime() + (input.quoteTtlMs ?? DEFAULT_QUOTE_TTL_MS)).toISOString(),
    quotedProperties: input.quotedProperties ?? [],
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
}

function createQuoteId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const entropy = randomBytes(8).toString("hex").toUpperCase();
  return `qt_${timestamp}${entropy}`;
}

function createReservationPublicId(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(8);
  let suffix = "";
  for (const byte of bytes) {
    suffix += alphabet[byte % alphabet.length];
  }
  return `KWL-${suffix}`;
}
