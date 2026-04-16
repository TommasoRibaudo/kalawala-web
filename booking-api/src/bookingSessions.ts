import { randomBytes, randomUUID } from "crypto";

export type BookingLanguage = "en" | "es";
export type BookingSessionStatus = "quoted" | "no_availability";

const DEFAULT_QUOTE_TTL_MS = 10 * 60 * 1000;

export interface CreateQuotedBookingSessionInput {
  arrivalDate: string;
  departureDate: string;
  guests: number;
  language: BookingLanguage;
  source?: string;
  quoteTtlMs?: number;
}

export interface BookingSessionRecord {
  id: string;
  quoteId: string;
  status: BookingSessionStatus;
  language: BookingLanguage;
  arrivalDate: string;
  departureDate: string;
  guests: number;
  source?: string;
  quoteExpiresAt: string;
  createdAt: string;
}

export interface BookingSessionRepository {
  createQuotedSession(input: CreateQuotedBookingSessionInput): Promise<BookingSessionRecord>;
  getById?(id: string): Promise<BookingSessionRecord | undefined>;
  getByQuoteId?(quoteId: string): Promise<BookingSessionRecord | undefined>;
}

export class InMemoryBookingSessionRepository implements BookingSessionRepository {
  private readonly sessionsById = new Map<string, BookingSessionRecord>();
  private readonly sessionsByQuoteId = new Map<string, BookingSessionRecord>();

  async createQuotedSession(input: CreateQuotedBookingSessionInput): Promise<BookingSessionRecord> {
    const record = createBookingSessionRecord(input, "quoted");

    this.sessionsById.set(record.id, record);
    this.sessionsByQuoteId.set(record.quoteId, record);
    return record;
  }

  async getById(id: string): Promise<BookingSessionRecord | undefined> {
    return this.sessionsById.get(id);
  }

  async getByQuoteId(quoteId: string): Promise<BookingSessionRecord | undefined> {
    return this.sessionsByQuoteId.get(quoteId);
  }
}

export function getBookingSessionRepository(config: {
  bookingSessions?: BookingSessionRepository;
}): BookingSessionRepository {
  return config.bookingSessions ?? new InMemoryBookingSessionRepository();
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
    quoteId: createQuoteId(),
    status,
    language: input.language,
    arrivalDate: input.arrivalDate,
    departureDate: input.departureDate,
    guests: input.guests,
    ...(input.source ? { source: input.source } : {}),
    quoteExpiresAt: new Date(now.getTime() + (input.quoteTtlMs ?? DEFAULT_QUOTE_TTL_MS)).toISOString(),
    createdAt: now.toISOString(),
  };
}

function createQuoteId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const entropy = randomBytes(8).toString("hex").toUpperCase();
  return `qt_${timestamp}${entropy}`;
}
