import { createHash, randomUUID, scrypt as scryptCallback, ScryptOptions } from "crypto";
import { BookingSessionQuotedProperty, BookingSessionRecord, HoldGuestDetails, createNoAvailabilitySession } from "./bookingSessions";
import { createEmailClient } from "./email";
import { ApiError } from "./http/errors";
import { getHeader } from "./http/request";
import { jsonResponse } from "./http/response";
import { BOOKING_PROPERTIES_BY_ID, BookingProperty, listingUrlForLanguage } from "./propertyCatalog";
import { createSmoobuClient, SmoobuProviderError } from "./smoobuClient";
import { ApiResponse, BookingApiConfig, HeadersMap, RouteObservability, RouteRequest } from "./types";
import { HoldRequest } from "./validation";

const HOLD_IDEMPOTENCY_SCOPE = "booking.hold.create";

type HoldStatus = "creating" | "active" | "failed" | "expired" | "cancelled" | "converted";
type IdempotencyStatus = "in_progress" | "completed";

interface SmoobuAvailabilityResponse {
  availableApartments?: unknown;
  prices?: unknown;
  errorMessages?: unknown;
}

interface SmoobuCreateReservationResponse {
  id?: unknown;
}

export interface HoldRecord {
  id: string;
  bookingSessionId: string;
  propertyId: string;
  arrivalDate: string;
  departureDate: string;
  status: HoldStatus;
  expiresAt: string;
  smoobuReservationId?: number;
  smoobuChannelId: 11 | 13;
  smoobuCreatePayloadHash?: string;
  lastSmoobuError?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StoredIdempotencyResponse {
  statusCode: number;
  body: unknown;
}

export interface IdempotencyRecord {
  scope: string;
  key: string;
  requestHash: string;
  status: IdempotencyStatus;
  response?: StoredIdempotencyResponse;
  startedAt: string;
  expiresAt: string;
}

export interface HoldRepository {
  getIdempotencyRecord(scope: string, key: string): Promise<IdempotencyRecord | undefined>;
  reserveIdempotencyKey(input: {
    scope: string;
    key: string;
    requestHash: string;
    expiresAt: string;
    staleBefore: string;
  }): Promise<void>;
  storeIdempotencyResponse(input: {
    scope: string;
    key: string;
    requestHash: string;
    response: StoredIdempotencyResponse;
  }): Promise<void>;
  releaseIdempotencyKey(scope: string, key: string, requestHash: string): Promise<void>;
  createCreatingHold(input: {
    bookingSessionId: string;
    propertyId: string;
    arrivalDate: string;
    departureDate: string;
    expiresAt: string;
    smoobuChannelId: 11 | 13;
    smoobuCreatePayloadHash: string;
  }): Promise<HoldRecord>;
  activateHold(input: {
    holdId: string;
    smoobuReservationId: number;
  }): Promise<HoldRecord>;
  failHold(input: { holdId: string; reason: string }): Promise<HoldRecord>;
  getByBookingSessionId(bookingSessionId: string): Promise<HoldRecord | undefined>;
  getBySmoobuReservationId(smoobuReservationId: number): Promise<HoldRecord | undefined>;
  expireHold(holdId: string): Promise<HoldRecord>;
  cancelHold(holdId: string): Promise<HoldRecord>;
  listExpiredHolds(now: string): Promise<HoldRecord[]>;
}

export class InMemoryHoldRepository implements HoldRepository {
  private readonly holdsById = new Map<string, HoldRecord>();
  private readonly holdIdByBookingSessionId = new Map<string, string>();
  private readonly idempotencyRecords = new Map<string, IdempotencyRecord>();

  async getIdempotencyRecord(scope: string, key: string): Promise<IdempotencyRecord | undefined> {
    const record = this.idempotencyRecords.get(idempotencyRecordKey(scope, key));
    if (!record || Date.parse(record.expiresAt) <= Date.now()) {
      return undefined;
    }
    return record;
  }

  async reserveIdempotencyKey(input: {
    scope: string;
    key: string;
    requestHash: string;
    expiresAt: string;
    staleBefore: string;
  }): Promise<void> {
    const key = idempotencyRecordKey(input.scope, input.key);
    const existing = this.idempotencyRecords.get(key);
    const isExpired = existing ? Date.parse(existing.expiresAt) <= Date.now() : false;
    const isStaleInProgress =
      existing?.status === "in_progress" && Date.parse(existing.startedAt) < Date.parse(input.staleBefore);

    if (existing && !isExpired && !isStaleInProgress) {
      if (existing.requestHash !== input.requestHash) {
        throw idempotencyConflict();
      }
      throw new ApiError(409, "idempotency_in_progress", "This request is already being processed.", {
        retryable: true,
      });
    }

    const now = new Date().toISOString();
    this.idempotencyRecords.set(key, {
      scope: input.scope,
      key: input.key,
      requestHash: input.requestHash,
      status: "in_progress",
      startedAt: now,
      expiresAt: input.expiresAt,
    });
  }

  async storeIdempotencyResponse(input: {
    scope: string;
    key: string;
    requestHash: string;
    response: StoredIdempotencyResponse;
  }): Promise<void> {
    const key = idempotencyRecordKey(input.scope, input.key);
    const existing = this.idempotencyRecords.get(key);
    if (!existing || existing.requestHash !== input.requestHash) {
      throw new ApiError(500, "idempotency_state_invalid", "Idempotency state is invalid.");
    }

    this.idempotencyRecords.set(key, {
      ...existing,
      status: "completed",
      response: input.response,
    });
  }

  async releaseIdempotencyKey(scope: string, key: string, requestHash: string): Promise<void> {
    const recordKey = idempotencyRecordKey(scope, key);
    const existing = this.idempotencyRecords.get(recordKey);
    if (existing?.requestHash === requestHash && existing.status === "in_progress") {
      this.idempotencyRecords.delete(recordKey);
    }
  }

  async createCreatingHold(input: {
    bookingSessionId: string;
    propertyId: string;
    arrivalDate: string;
    departureDate: string;
    expiresAt: string;
    smoobuChannelId: 11 | 13;
    smoobuCreatePayloadHash: string;
  }): Promise<HoldRecord> {
    const existingHoldId = this.holdIdByBookingSessionId.get(input.bookingSessionId);
    if (existingHoldId) {
      const existing = this.holdsById.get(existingHoldId);
      if (existing && existing.status !== "failed") {
        throw new ApiError(409, "hold_already_exists", "A hold already exists for this booking session.");
      }
    }

    for (const hold of this.holdsById.values()) {
      if (
        hold.propertyId === input.propertyId &&
        ["creating", "active", "converted"].includes(hold.status) &&
        rangesOverlap(input.arrivalDate, input.departureDate, hold.arrivalDate, hold.departureDate)
      ) {
        throw new ApiError(409, "property_no_longer_available", "This property is no longer available.", {
          retryable: false,
        });
      }
    }

    const now = new Date().toISOString();
    const hold: HoldRecord = {
      id: randomUUID(),
      bookingSessionId: input.bookingSessionId,
      propertyId: input.propertyId,
      arrivalDate: input.arrivalDate,
      departureDate: input.departureDate,
      status: "creating",
      expiresAt: input.expiresAt,
      smoobuChannelId: input.smoobuChannelId,
      smoobuCreatePayloadHash: input.smoobuCreatePayloadHash,
      createdAt: now,
      updatedAt: now,
    };

    this.holdsById.set(hold.id, hold);
    this.holdIdByBookingSessionId.set(hold.bookingSessionId, hold.id);
    return hold;
  }

  async activateHold(input: {
    holdId: string;
    smoobuReservationId: number;
  }): Promise<HoldRecord> {
    const existing = this.getRequiredHold(input.holdId);
    const updated: HoldRecord = {
      ...existing,
      status: "active",
      smoobuReservationId: input.smoobuReservationId,
      updatedAt: new Date().toISOString(),
    };
    this.holdsById.set(updated.id, updated);
    return updated;
  }

  async failHold(input: { holdId: string; reason: string }): Promise<HoldRecord> {
    const existing = this.getRequiredHold(input.holdId);
    const updated: HoldRecord = {
      ...existing,
      status: "failed",
      lastSmoobuError: input.reason,
      updatedAt: new Date().toISOString(),
    };
    this.holdsById.set(updated.id, updated);
    return updated;
  }

  async getByBookingSessionId(bookingSessionId: string): Promise<HoldRecord | undefined> {
    const holdId = this.holdIdByBookingSessionId.get(bookingSessionId);
    return holdId ? this.holdsById.get(holdId) : undefined;
  }

  async getBySmoobuReservationId(smoobuReservationId: number): Promise<HoldRecord | undefined> {
    for (const hold of this.holdsById.values()) {
      if (hold.smoobuReservationId === smoobuReservationId) {
        return hold;
      }
    }
    return undefined;
  }

  async cancelHold(holdId: string): Promise<HoldRecord> {
    const existing = this.getRequiredHold(holdId);
    const updated: HoldRecord = {
      ...existing,
      status: "cancelled",
      updatedAt: new Date().toISOString(),
    };
    this.holdsById.set(updated.id, updated);
    return updated;
  }

  async expireHold(holdId: string): Promise<HoldRecord> {
    const existing = this.getRequiredHold(holdId);
    const updated: HoldRecord = {
      ...existing,
      status: "expired",
      updatedAt: new Date().toISOString(),
    };
    this.holdsById.set(updated.id, updated);
    return updated;
  }

  async listExpiredHolds(now: string): Promise<HoldRecord[]> {
    const results: HoldRecord[] = [];
    for (const hold of this.holdsById.values()) {
      if (
        (hold.status === "active" || hold.status === "creating") &&
        hold.expiresAt <= now
      ) {
        results.push(hold);
      }
    }
    return results;
  }

  private getRequiredHold(holdId: string): HoldRecord {
    const hold = this.holdsById.get(holdId);
    if (!hold) {
      throw new ApiError(500, "hold_state_invalid", "Hold state is invalid.");
    }
    return hold;
  }
}

export async function handleCreatePayPalHold(
  holdRequest: HoldRequest,
  request: RouteRequest,
  config: BookingApiConfig
): Promise<ApiResponse> {
  const bookingSessions = config.bookingSessions;
  const holds = config.holds;

  if (!bookingSessions || !holds) {
    throw new ApiError(503, "database_unavailable", "Booking storage is not configured.", {
      retryable: true,
    });
  }

  const idempotencyKey = getHeader(request.headers, "idempotency-key");
  if (!idempotencyKey) {
    throw new ApiError(400, "missing_idempotency_key", "Idempotency-Key header is required.");
  }
  const requestHash = hashJson(holdRequest);

  const replay = await maybeReplayIdempotentResponse(holds, idempotencyKey, requestHash, request.responseHeaders);
  if (replay) {
    return replay;
  }

  await reserveHoldIdempotency(config, holds, idempotencyKey, requestHash);

  let creatingHold: HoldRecord | undefined;
  try {
    const session = await requireQuotedSession(bookingSessions, holdRequest);
    const property = requireProperty(holdRequest.propertyId);
    const quotedPrice = requireQuotedPrice(session, property.propertyId);
    const expiresAt = new Date(Date.now() + config.hold.defaultTtlMinutes * 60_000).toISOString();
    const portalPasswordHash = await hashPortalPassword(holdRequest.portalPassword);

    const customerId = config.smoobu.customerId;
    if (!customerId) {
      throw new ApiError(503, "provider_config_missing", "A required provider configuration is missing.", {
        retryable: false,
      });
    }
    const smoobuClient = await createSmoobuClient(config);
    const recheckedPrice = await recheckPropertyAvailability(holdRequest, session, property, smoobuClient, customerId, request.observability);
    assertPriceMatchesQuote(quotedPrice, recheckedPrice);

    const reservationPayload = buildSmoobuHoldPayload({
      session,
      property,
      guest: holdRequest.guest,
      price: quotedPrice,
      expiresAt,
      channelId: config.smoobu.holdChannelId,
    });
    const payloadHash = hashJson(reservationPayload);

    creatingHold = await holds.createCreatingHold({
      bookingSessionId: session.id,
      propertyId: property.propertyId,
      arrivalDate: session.arrivalDate,
      departureDate: session.departureDate,
      expiresAt,
      smoobuChannelId: config.smoobu.holdChannelId,
      smoobuCreatePayloadHash: payloadHash,
    });

    await bookingSessions.markHoldCreating({
      bookingSessionId: session.id,
      propertyId: property.propertyId,
      paymentMethod: "paypal",
      price: quotedPrice,
      guest: holdRequest.guest,
      portalPasswordHash,
      expiresAt,
    });

    request.observability.recordStateTransition({
      entityType: "hold",
      toState: "creating",
      action: "booking.hold.create.local",
      success: true,
      bookingSessionId: session.id,
      reservationPublicId: session.reservationPublicId,
      provider: "database",
    });

    const createdReservation = await smoobuClient.createReservation<SmoobuCreateReservationResponse>(
      reservationPayload,
      request.observability
    );
    const smoobuReservationId = parseSmoobuReservationId(createdReservation.data);

    const activeHold = await holds.activateHold({
      holdId: creatingHold.id,
      smoobuReservationId,
    });
    const activeSession = await bookingSessions.markHoldActive({ bookingSessionId: session.id, expiresAt });

    request.observability.recordStateTransition({
      entityType: "hold",
      fromState: "creating",
      toState: "active",
      action: "booking.hold.create.smoobu",
      success: true,
      bookingSessionId: session.id,
      reservationPublicId: session.reservationPublicId,
      provider: "smoobu",
      providerObjectId: String(smoobuReservationId),
    });
    request.observability.recordStateTransition({
      entityType: "booking_session",
      fromState: "quoted",
      toState: "hold_active",
      action: "booking.hold.create",
      success: true,
      bookingSessionId: session.id,
      reservationPublicId: session.reservationPublicId,
      provider: "smoobu",
      providerObjectId: String(smoobuReservationId),
    });

    const responseBody = buildHoldResponse(activeSession, activeHold, property, quotedPrice);
    await holds.storeIdempotencyResponse({
      scope: HOLD_IDEMPOTENCY_SCOPE,
      key: idempotencyKey,
      requestHash,
      response: {
        statusCode: 200,
        body: responseBody,
      },
    });

    // Send hold_created email — non-fatal; errors are logged inside EmailClient
    const emailClient = createEmailClient(config.email, request.observability.logger);
    await emailClient.sendHoldCreated(activeSession, property.name);

    return jsonResponse(200, responseBody, request.responseHeaders);
  } catch (error) {
    if (creatingHold) {
      await holds.failHold({
        holdId: creatingHold.id,
        reason: safeProviderErrorCode(error),
      }).catch(() => {});
      await bookingSessions.markFailed({
        bookingSessionId: holdRequest.bookingSessionId,
        reason: safeProviderErrorCode(error),
      }).catch(() => {});
    }
    await holds.releaseIdempotencyKey(HOLD_IDEMPOTENCY_SCOPE, idempotencyKey, requestHash);
    request.observability.recordStateTransition({
      entityType: "hold",
      fromState: creatingHold ? "creating" : undefined,
      toState: "failed",
      action: "booking.hold.create",
      success: false,
      bookingSessionId: holdRequest.bookingSessionId,
      provider: error instanceof SmoobuProviderError ? "smoobu" : "internal",
      errorCode: safeProviderErrorCode(error),
    });
    throw error;
  }
}

async function maybeReplayIdempotentResponse(
  holds: HoldRepository,
  idempotencyKey: string,
  requestHash: string,
  responseHeaders: HeadersMap
): Promise<ApiResponse | undefined> {
  const existing = await holds.getIdempotencyRecord(HOLD_IDEMPOTENCY_SCOPE, idempotencyKey);
  if (!existing) {
    return undefined;
  }

  if (existing.requestHash !== requestHash) {
    throw idempotencyConflict();
  }

  if (existing.status === "completed" && existing.response) {
    return jsonResponse(existing.response.statusCode, existing.response.body, responseHeaders);
  }

  throw new ApiError(409, "idempotency_in_progress", "This request is already being processed.", {
    retryable: true,
  });
}

async function reserveHoldIdempotency(
  config: BookingApiConfig,
  holds: HoldRepository,
  idempotencyKey: string,
  requestHash: string
): Promise<void> {
  const nowMs = Date.now();
  await holds.reserveIdempotencyKey({
    scope: HOLD_IDEMPOTENCY_SCOPE,
    key: idempotencyKey,
    requestHash,
    expiresAt: new Date(nowMs + config.hold.idempotencyTtlMinutes * 60_000).toISOString(),
    staleBefore: new Date(nowMs - config.hold.staleIdempotencyLockSeconds * 1_000).toISOString(),
  });
}

async function requireQuotedSession(
  bookingSessions: { getById(id: string): Promise<BookingSessionRecord | undefined> },
  holdRequest: HoldRequest
): Promise<BookingSessionRecord> {
  const session = await bookingSessions.getById(holdRequest.bookingSessionId);
  if (!session || session.quoteId !== holdRequest.quoteId) {
    throw new ApiError(404, "not_found", "The quote was not found.");
  }

  if (session.status !== "quoted") {
    throw new ApiError(409, "invalid_booking_state", "This quote is no longer eligible for hold creation.");
  }

  if (Date.parse(session.quoteExpiresAt) <= Date.now()) {
    throw new ApiError(409, "quote_expired", "This quote has expired.");
  }

  return session;
}

function requireProperty(propertyId: string): BookingProperty {
  const property = BOOKING_PROPERTIES_BY_ID.get(propertyId);
  if (!property) {
    throw new ApiError(404, "not_found", "The property was not found.");
  }
  return property;
}

function requireQuotedPrice(session: BookingSessionRecord, propertyId: string): BookingSessionQuotedProperty {
  const quotedPrice = session.quotedProperties.find((price) => price.propertyId === propertyId);
  if (!quotedPrice) {
    throw new ApiError(409, "property_no_longer_available", "This property is not part of the active quote.");
  }
  return quotedPrice;
}

async function recheckPropertyAvailability(
  holdRequest: HoldRequest,
  session: BookingSessionRecord,
  property: BookingProperty,
  smoobuClient: Awaited<ReturnType<typeof createSmoobuClient>>,
  customerId: number,
  observability: RouteObservability
): Promise<BookingSessionQuotedProperty> {
  const response = await smoobuClient.checkApartmentAvailability<SmoobuAvailabilityResponse>(
    {
      arrivalDate: session.arrivalDate,
      departureDate: session.departureDate,
      apartments: [property.smoobuApartmentId],
      customerId,
      guests: session.guests,
    },
    observability
  );

  const availableIds = parseAvailableApartmentIds(response.data.availableApartments);
  const unavailableIds = parseUnavailableApartmentIds(response.data.errorMessages);
  if (!availableIds.includes(property.smoobuApartmentId) || unavailableIds.has(property.smoobuApartmentId)) {
    throw new ApiError(409, "property_no_longer_available", "This property is no longer available.");
  }

  const price = parsePrice(response.data.prices, property.smoobuApartmentId, session);
  if (!price) {
    throw new ApiError(409, "property_no_longer_available", "This property is no longer available.");
  }

  return {
    propertyId: holdRequest.propertyId,
    ...price,
  };
}

function assertPriceMatchesQuote(
  quotedPrice: BookingSessionQuotedProperty,
  recheckedPrice: BookingSessionQuotedProperty
): void {
  if (
    quotedPrice.currency !== recheckedPrice.currency ||
    quotedPrice.totalAmountCents !== recheckedPrice.totalAmountCents ||
    quotedPrice.nights !== recheckedPrice.nights
  ) {
    throw new ApiError(409, "property_no_longer_available", "The quote changed before hold creation.", {
      fieldErrors: {
        quoteId: ["quote_changed"],
      },
    });
  }
}

function buildSmoobuHoldPayload(input: {
  session: BookingSessionRecord;
  property: BookingProperty;
  guest: HoldGuestDetails;
  price: BookingSessionQuotedProperty;
  expiresAt: string;
  channelId: 11 | 13;
}) {
  return {
    arrivalDate: input.session.arrivalDate,
    departureDate: input.session.departureDate,
    channelId: input.channelId,
    apartmentId: input.property.smoobuApartmentId,
    firstName: input.guest.firstName,
    lastName: input.guest.lastName,
    email: input.guest.email,
    ...(input.guest.phone ? { phone: input.guest.phone } : {}),
    ...(input.guest.country ? { country: input.guest.country } : {}),
    notice: buildSmoobuNotice(input.session, input.guest, input.expiresAt),
    adults: input.session.guests,
    children: 0,
    price: centsToAmount(input.price.totalAmountCents),
    priceStatus: 0,
    prepayment: 0,
    prepaymentStatus: 0,
    deposit: 0,
    depositStatus: 0,
    language: input.session.language,
  };
}

function buildSmoobuNotice(session: BookingSessionRecord, guest: HoldGuestDetails, expiresAt: string): string {
  const parts = [
    `Kalawala PayPal provisional hold. Quote ${session.quoteId}. Hold expires ${expiresAt}. Not confirmed until PayPal payment is verified.`,
  ];

  if (guest.message) {
    parts.push(`Guest note: ${guest.message}`);
  }

  return parts.join("\n").slice(0, 2000);
}

function buildHoldResponse(
  session: BookingSessionRecord,
  hold: HoldRecord,
  property: BookingProperty,
  price: BookingSessionQuotedProperty
) {
  return {
    booking: {
      bookingSessionId: session.id,
      reservationPublicId: session.reservationPublicId,
      status: "hold_active",
      language: session.language,
      arrivalDate: session.arrivalDate,
      departureDate: session.departureDate,
      guests: session.guests,
      property: {
        propertyId: property.propertyId,
        slug: property.slug,
        listingUrl: listingUrlForLanguage(property.slug, session.language),
        name: property.name,
        guestCapacity: property.guestCapacity,
        thumbnailUrl: property.thumbnailUrl,
        amenities: property.amenities,
      },
      price: {
        currency: price.currency,
        totalAmountCents: price.totalAmountCents,
        nightlyAverageCents: price.nightlyAverageCents,
        nights: price.nights,
        includesTaxes: price.includesTaxes,
        rateSource: price.rateSource,
      },
      hold: {
        status: hold.status,
        expiresAt: hold.expiresAt,
      },
      payment: {
        method: "paypal",
        status: "pending",
      },
    },
    nextAction: "create_paypal_order",
  };
}

// Explicit scrypt cost parameters: N=16384, r=8, p=1 (Node.js defaults).
// Encoded in the version tag so future cost-factor upgrades are auditable.
const SCRYPT_PARAMS: ScryptOptions = { N: 16384, r: 8, p: 1 };
const SCRYPT_VERSION_TAG = "N16384r8p1";

function scryptWithOptions(password: string, salt: string, keylen: number, options: ScryptOptions): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, keylen, options, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  });
}

async function hashPortalPassword(password: string): Promise<string> {
  const salt = randomUUID().replace(/-/g, "");
  const derived = await scryptWithOptions(password, salt, 64, SCRYPT_PARAMS);
  return `scrypt$${SCRYPT_VERSION_TAG}$${salt}$${derived.toString("base64")}`;
}

function parseSmoobuReservationId(data: SmoobuCreateReservationResponse): number {
  if (typeof data.id === "number" && Number.isInteger(data.id) && data.id > 0) {
    return data.id;
  }

  if (typeof data.id === "string" && /^\d+$/.test(data.id)) {
    return Number(data.id);
  }

  throw new ApiError(503, "provider_invalid_response", "Smoobu returned an invalid reservation response.", {
    retryable: true,
  });
}

function parseAvailableApartmentIds(value: unknown): number[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "number" && Number.isInteger(item)) {
        return item;
      }
      if (typeof item === "string" && /^\d+$/.test(item)) {
        return Number(item);
      }
      if (item && typeof item === "object" && "id" in item) {
        const id = (item as { id?: unknown }).id;
        return typeof id === "number" && Number.isInteger(id) ? id : undefined;
      }
      return undefined;
    })
    .filter((id): id is number => typeof id === "number");
}

function parseUnavailableApartmentIds(errorMessages: unknown): Set<number> {
  if (!errorMessages || typeof errorMessages !== "object" || Array.isArray(errorMessages)) {
    return new Set();
  }

  return new Set(
    Object.keys(errorMessages)
      .map((key) => Number(key))
      .filter((id) => Number.isInteger(id))
  );
}

function parsePrice(
  prices: unknown,
  apartmentId: number,
  session: BookingSessionRecord
): Omit<BookingSessionQuotedProperty, "propertyId"> | undefined {
  if (!prices || typeof prices !== "object" || Array.isArray(prices)) {
    return undefined;
  }

  const priceInfo = (prices as Record<string, unknown>)[String(apartmentId)];
  if (!priceInfo || typeof priceInfo !== "object" || Array.isArray(priceInfo)) {
    return undefined;
  }

  const rawPrice = (priceInfo as Record<string, unknown>).price;
  const currency = (priceInfo as Record<string, unknown>).currency;
  if (typeof rawPrice !== "number" || !Number.isFinite(rawPrice) || rawPrice < 0 || typeof currency !== "string") {
    return undefined;
  }

  const nights = nightsBetween(session.arrivalDate, session.departureDate);
  const totalAmountCents = Math.round(rawPrice * 100);
  return {
    currency: currency.toUpperCase(),
    totalAmountCents,
    nightlyAverageCents: Math.round(totalAmountCents / nights),
    nights,
    includesTaxes: false,
    rateSource: "smoobu",
  };
}

function centsToAmount(cents: number): number {
  return Math.round(cents) / 100;
}

function nightsBetween(arrivalDate: string, departureDate: string): number {
  const arrivalMs = Date.parse(`${arrivalDate}T00:00:00Z`);
  const departureMs = Date.parse(`${departureDate}T00:00:00Z`);
  return Math.max(1, Math.round((departureMs - arrivalMs) / 86_400_000));
}

function hashJson(value: unknown): string {
  return createHash("sha256").update(stableStringify(value)).digest("hex");
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function idempotencyRecordKey(scope: string, key: string): string {
  return `${scope}:${key}`;
}

function idempotencyConflict(): ApiError {
  return new ApiError(409, "idempotency_conflict", "Idempotency-Key was reused for a different request.");
}

function rangesOverlap(leftStart: string, leftEnd: string, rightStart: string, rightEnd: string): boolean {
  return leftStart < rightEnd && rightStart < leftEnd;
}

function safeProviderErrorCode(error: unknown): string {
  if (error instanceof ApiError) {
    return error.code;
  }
  if (error instanceof Error) {
    return error.name;
  }
  return "unknown_error";
}
