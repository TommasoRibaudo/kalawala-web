import { randomBytes, randomUUID } from "crypto";

export type BookingLanguage = "en" | "es";
// Full mirror of the booking_status DB enum. All values must be listed here
// even if the application does not yet transition to every state, so that
// mapBookingSessionRow never throws on a valid row returned from the database.
export type BookingSessionStatus =
  | "search_started"
  | "quoted"
  | "no_availability"
  | "hold_creating"
  | "hold_active"
  | "hold_expired"
  | "paypal_pending"
  | "paypal_order_created"
  | "paypal_captured"
  | "paid"
  | "confirmed"
  | "booking_confirmed"
  | "expired"
  | "cancelled"
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

interface Queryable {
  query<Row extends object = Record<string, unknown>>(text: string, values?: unknown[]): Promise<{ rows: Row[] }>;
}

interface BookingSessionRow {
  id: string;
  reservation_public_id: string;
  quote_id: string;
  status: string;
  language: BookingLanguage;
  arrival_date: string | Date;
  departure_date: string | Date;
  guests: number;
  source: string | null;
  quote_expires_at: string | Date;
  quoted_properties: unknown;
  property_id: string | null;
  payment_method: "paypal" | null;
  currency: string | null;
  total_amount_cents: number | null;
  guest_first_name: string | null;
  guest_last_name: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  guest_country: string | null;
  guest_message: string | null;
  portal_password_hash: string | null;
  portal_password_set_at: string | Date | null;
  expires_at: string | Date | null;
  paypal_order_id: string | null;
  confirmed_at: string | Date | null;
  failure_reason: string | null;
  created_at: string | Date;
  updated_at: string | Date;
}

const BOOKING_SESSION_COLUMNS = `
  id,
  reservation_public_id,
  quote_id,
  status,
  language,
  arrival_date,
  departure_date,
  guests,
  source,
  quote_expires_at,
  quoted_properties,
  property_id,
  payment_method,
  currency,
  total_amount_cents,
  guest_first_name,
  guest_last_name,
  guest_email,
  guest_phone,
  guest_country,
  guest_message,
  portal_password_hash,
  portal_password_set_at,
  expires_at,
  paypal_order_id,
  confirmed_at,
  failure_reason,
  created_at,
  updated_at
`;

const BOOKING_SESSION_SELECT = `select ${BOOKING_SESSION_COLUMNS} from booking_sessions`;

// Must stay in sync with the BookingSessionStatus union above and the
// booking_status enum in 0001_extensions_and_types.sql.
const BOOKING_SESSION_STATUSES = new Set<BookingSessionStatus>([
  "search_started",
  "quoted",
  "no_availability",
  "hold_creating",
  "hold_active",
  "hold_expired",
  "paypal_pending",
  "paypal_order_created",
  "paypal_captured",
  "paid",
  "confirmed",
  "booking_confirmed",
  "expired",
  "cancelled",
  "failed",
]);

export class RdsBookingSessionRepository implements BookingSessionRepository {
  constructor(private readonly pool: Queryable) {}

  async createQuotedSession(input: CreateQuotedBookingSessionInput): Promise<BookingSessionRecord> {
    const record = createBookingSessionRecord(input, "quoted");
    const result = await this.pool.query<BookingSessionRow>(
      `
        insert into booking_sessions (
          id,
          reservation_public_id,
          quote_id,
          status,
          language,
          arrival_date,
          departure_date,
          guests,
          source,
          quote_expires_at,
          quoted_properties,
          created_at,
          updated_at
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12, $13)
        returning ${BOOKING_SESSION_COLUMNS}
      `,
      [
        record.id,
        record.reservationPublicId,
        record.quoteId,
        record.status,
        record.language,
        record.arrivalDate,
        record.departureDate,
        record.guests,
        record.source ?? null,
        record.quoteExpiresAt,
        JSON.stringify(record.quotedProperties),
        record.createdAt,
        record.updatedAt,
      ]
    );

    return mapRequiredBookingSessionRow(result.rows[0], record.id);
  }

  async getById(id: string): Promise<BookingSessionRecord | undefined> {
    const result = await this.pool.query<BookingSessionRow>(`${BOOKING_SESSION_SELECT} where id = $1 limit 1`, [id]);
    return mapOptionalBookingSessionRow(result.rows[0]);
  }

  async getByQuoteId(quoteId: string): Promise<BookingSessionRecord | undefined> {
    const result = await this.pool.query<BookingSessionRow>(
      `${BOOKING_SESSION_SELECT} where quote_id = $1 limit 1`,
      [quoteId]
    );
    return mapOptionalBookingSessionRow(result.rows[0]);
  }

  async getByReservationPublicId(reservationPublicId: string): Promise<BookingSessionRecord | undefined> {
    const result = await this.pool.query<BookingSessionRow>(
      `${BOOKING_SESSION_SELECT} where reservation_public_id = $1 limit 1`,
      [reservationPublicId]
    );
    return mapOptionalBookingSessionRow(result.rows[0]);
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
    const result = await this.pool.query<BookingSessionRow>(
      `
        update booking_sessions
        set
          status = 'hold_creating',
          property_id = $2,
          payment_method = $3,
          currency = $4,
          total_amount_cents = $5,
          guest_first_name = $6,
          guest_last_name = $7,
          guest_email = $8,
          guest_phone = $9,
          guest_country = $10,
          guest_message = $11,
          portal_password_hash = $12,
          portal_password_set_at = now(),
          expires_at = $13,
          updated_at = now()
        where id = $1 and status = 'quoted'
        returning ${BOOKING_SESSION_COLUMNS}
      `,
      [
        input.bookingSessionId,
        input.propertyId,
        input.paymentMethod,
        input.price.currency,
        input.price.totalAmountCents,
        input.guest.firstName,
        input.guest.lastName,
        input.guest.email,
        input.guest.phone ?? null,
        input.guest.country ?? null,
        input.guest.message ?? null,
        input.portalPasswordHash,
        input.expiresAt,
      ]
    );

    if (result.rows[0]) {
      return mapBookingSessionRow(result.rows[0]);
    }

    return this.throwMissingOrInvalidTransition(input.bookingSessionId, "quoted", "hold_creating");
  }

  async markHoldActive(input: { bookingSessionId: string; expiresAt: string }): Promise<BookingSessionRecord> {
    const result = await this.pool.query<BookingSessionRow>(
      `
        update booking_sessions
        set
          status = 'hold_active',
          expires_at = $2,
          updated_at = now()
        where id = $1 and status = 'hold_creating'
        returning ${BOOKING_SESSION_COLUMNS}
      `,
      [input.bookingSessionId, input.expiresAt]
    );

    if (result.rows[0]) {
      return mapBookingSessionRow(result.rows[0]);
    }

    return this.throwMissingOrInvalidTransition(input.bookingSessionId, "hold_creating", "hold_active");
  }

  async markPaypalOrderCreated(input: {
    bookingSessionId: string;
    paypalOrderId: string;
  }): Promise<BookingSessionRecord> {
    const result = await this.pool.query<BookingSessionRow>(
      `
        update booking_sessions
        set
          status = 'paypal_order_created',
          paypal_order_id = $2,
          updated_at = now()
        where id = $1 and status = 'hold_active'
        returning ${BOOKING_SESSION_COLUMNS}
      `,
      [input.bookingSessionId, input.paypalOrderId]
    );

    if (result.rows[0]) {
      return mapBookingSessionRow(result.rows[0]);
    }

    return this.throwMissingOrInvalidTransition(
      input.bookingSessionId,
      "hold_active",
      "paypal_order_created"
    );
  }

  async markBookingConfirmed(input: {
    bookingSessionId: string;
    confirmedAt: string;
  }): Promise<BookingSessionRecord> {
    const result = await this.pool.query<BookingSessionRow>(
      `
        update booking_sessions
        set
          status = 'booking_confirmed',
          confirmed_at = $2,
          updated_at = now()
        where id = $1 and status = 'paypal_order_created'
        returning ${BOOKING_SESSION_COLUMNS}
      `,
      [input.bookingSessionId, input.confirmedAt]
    );

    if (result.rows[0]) {
      return mapBookingSessionRow(result.rows[0]);
    }

    return this.throwMissingOrInvalidTransition(
      input.bookingSessionId,
      "paypal_order_created",
      "booking_confirmed"
    );
  }

  async markFailed(input: { bookingSessionId: string; reason: string }): Promise<BookingSessionRecord> {
    const result = await this.pool.query<BookingSessionRow>(
      `
        update booking_sessions
        set
          status = 'failed',
          failure_reason = $2,
          updated_at = now()
        where id = $1
          and status not in ('booking_confirmed', 'hold_expired', 'expired', 'cancelled')
        returning ${BOOKING_SESSION_COLUMNS}
      `,
      [input.bookingSessionId, input.reason]
    );

    if (result.rows[0]) {
      return mapBookingSessionRow(result.rows[0]);
    }

    // Row exists but is already in a terminal state — return it as-is rather
    // than throwing, so the error-path cleanup in holds.ts doesn't mask the
    // original failure with a secondary "cannot fail" error.
    const existing = await this.getById(input.bookingSessionId);
    if (existing) {
      return existing;
    }

    throw new Error(`Booking session ${input.bookingSessionId} was not found.`);
  }

  async markHoldExpired(input: { bookingSessionId: string }): Promise<BookingSessionRecord> {
    const result = await this.pool.query<BookingSessionRow>(
      `
        update booking_sessions
        set
          status = 'hold_expired',
          updated_at = now()
        where id = $1
        returning ${BOOKING_SESSION_COLUMNS}
      `,
      [input.bookingSessionId]
    );

    return mapRequiredBookingSessionRow(result.rows[0], input.bookingSessionId);
  }

  async listByStatus(status: BookingSessionStatus): Promise<BookingSessionRecord[]> {
    const result = await this.pool.query<BookingSessionRow>(
      `${BOOKING_SESSION_SELECT} where status = $1 order by created_at desc`,
      [status]
    );
    return result.rows.map(mapBookingSessionRow);
  }

  private async throwMissingOrInvalidTransition(
    bookingSessionId: string,
    expectedStatus: BookingSessionStatus,
    nextStatus: BookingSessionStatus
  ): Promise<never> {
    const existing = await this.getById(bookingSessionId);
    if (!existing) {
      throw new Error(`Booking session ${bookingSessionId} was not found.`);
    }

    throw new Error(
      `Cannot transition booking session ${bookingSessionId} to ${nextStatus}: expected ${expectedStatus}, got ${existing.status}.`
    );
  }
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

function mapRequiredBookingSessionRow(
  row: BookingSessionRow | undefined,
  bookingSessionId: string
): BookingSessionRecord {
  if (!row) {
    throw new Error(`Booking session ${bookingSessionId} was not found.`);
  }
  return mapBookingSessionRow(row);
}

function mapOptionalBookingSessionRow(row: BookingSessionRow | undefined): BookingSessionRecord | undefined {
  return row ? mapBookingSessionRow(row) : undefined;
}

function mapBookingSessionRow(row: BookingSessionRow): BookingSessionRecord {
  const guest = mapGuest(row);

  return {
    id: row.id,
    reservationPublicId: row.reservation_public_id,
    quoteId: row.quote_id,
    status: parseBookingSessionStatus(row.status),
    language: row.language,
    arrivalDate: toDateOnly(row.arrival_date),
    departureDate: toDateOnly(row.departure_date),
    guests: row.guests,
    ...(row.source ? { source: row.source } : {}),
    quoteExpiresAt: toIsoString(row.quote_expires_at),
    quotedProperties: parseQuotedProperties(row.quoted_properties),
    ...(row.property_id ? { propertyId: row.property_id } : {}),
    ...(row.payment_method ? { paymentMethod: row.payment_method } : {}),
    ...(row.currency ? { currency: row.currency.trim().toUpperCase() } : {}),
    ...(row.total_amount_cents !== null ? { totalAmountCents: row.total_amount_cents } : {}),
    ...(guest ? { guest } : {}),
    ...(row.portal_password_hash ? { portalPasswordHash: row.portal_password_hash } : {}),
    ...(row.portal_password_set_at ? { portalPasswordSetAt: toIsoString(row.portal_password_set_at) } : {}),
    ...(row.expires_at ? { expiresAt: toIsoString(row.expires_at) } : {}),
    ...(row.paypal_order_id ? { paypalOrderId: row.paypal_order_id } : {}),
    ...(row.confirmed_at ? { confirmedAt: toIsoString(row.confirmed_at) } : {}),
    ...(row.failure_reason ? { failureReason: row.failure_reason } : {}),
    createdAt: toIsoString(row.created_at),
    updatedAt: toIsoString(row.updated_at),
  };
}

function parseBookingSessionStatus(status: string): BookingSessionStatus {
  if (BOOKING_SESSION_STATUSES.has(status as BookingSessionStatus)) {
    return status as BookingSessionStatus;
  }

  throw new Error(`Unsupported booking session status from database: ${status}`);
}

function mapGuest(row: BookingSessionRow): HoldGuestDetails | undefined {
  if (!row.guest_first_name || !row.guest_last_name || !row.guest_email) {
    return undefined;
  }

  return {
    firstName: row.guest_first_name,
    lastName: row.guest_last_name,
    email: row.guest_email,
    ...(row.guest_phone ? { phone: row.guest_phone } : {}),
    ...(row.guest_country ? { country: row.guest_country } : {}),
    ...(row.guest_message ? { message: row.guest_message } : {}),
  };
}

function parseQuotedProperties(value: unknown): BookingSessionQuotedProperty[] {
  const parsed = parseJsonbValue(value);
  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed
    .map(parseQuotedProperty)
    .filter((property): property is BookingSessionQuotedProperty => property !== undefined);
}

function parseQuotedProperty(value: unknown): BookingSessionQuotedProperty | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const property = value as Record<string, unknown>;
  if (
    typeof property.propertyId !== "string" ||
    typeof property.currency !== "string" ||
    typeof property.totalAmountCents !== "number" ||
    typeof property.nightlyAverageCents !== "number" ||
    typeof property.nights !== "number" ||
    typeof property.includesTaxes !== "boolean" ||
    property.rateSource !== "smoobu"
  ) {
    return undefined;
  }

  return {
    propertyId: property.propertyId,
    currency: property.currency,
    totalAmountCents: property.totalAmountCents,
    nightlyAverageCents: property.nightlyAverageCents,
    nights: property.nights,
    includesTaxes: property.includesTaxes,
    rateSource: "smoobu",
  };
}

function parseJsonbValue(value: unknown): unknown {
  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

function toDateOnly(value: string | Date): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value.slice(0, 10);
}

function toIsoString(value: string | Date): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  const timestampMs = Date.parse(value);
  return Number.isNaN(timestampMs) ? value : new Date(timestampMs).toISOString();
}
