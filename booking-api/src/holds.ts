import { createHash, randomUUID, scrypt as scryptCallback, ScryptOptions } from "crypto";
import {
  BookingSessionQuotedProperty,
  BookingSessionRecord,
  BookingSessionRepository,
  HoldGuestDetails,
} from "./bookingSessions";
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

interface Queryable {
  query<Row extends object = Record<string, unknown>>(text: string, values?: unknown[]): Promise<{ rows: Row[] }>;
}

interface HoldRow {
  id: string;
  booking_session_id: string;
  property_id: string;
  arrival_date: string | Date;
  departure_date: string | Date;
  status: string;
  expires_at: string | Date;
  smoobu_reservation_id: string | number | null;
  smoobu_channel_id: number;
  smoobu_create_payload_hash: string | null;
  last_smoobu_error: string | null;
  created_at: string | Date;
  updated_at: string | Date;
}

interface IdempotencyRow {
  scope: string;
  idempotency_key: string;
  request_hash: string;
  status: string;
  response_status: number | null;
  response_body: unknown;
  locked_until: string | Date | null;
  expires_at: string | Date;
  created_at: string | Date;
}

const HOLD_COLUMNS = `
  id,
  booking_session_id,
  property_id,
  arrival_date,
  departure_date,
  status,
  expires_at,
  smoobu_reservation_id,
  smoobu_channel_id,
  smoobu_create_payload_hash,
  last_smoobu_error,
  created_at,
  updated_at
`;

const HOLD_SELECT = `select ${HOLD_COLUMNS} from holds`;

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

export class RdsHoldRepository implements HoldRepository {
  constructor(private readonly pool: Queryable) {}

  async getIdempotencyRecord(scope: string, key: string): Promise<IdempotencyRecord | undefined> {
    const result = await this.pool.query<IdempotencyRow>(
      `
        select
          scope,
          idempotency_key,
          request_hash,
          status,
          response_status,
          response_body,
          locked_until,
          expires_at,
          created_at
        from idempotency_keys
        where scope = $1
          and idempotency_key = $2
          and expires_at > now()
        limit 1
      `,
      [scope, key]
    );

    return mapOptionalIdempotencyRow(result.rows[0]);
  }

  async reserveIdempotencyKey(input: {
    scope: string;
    key: string;
    requestHash: string;
    expiresAt: string;
    staleBefore: string;
  }): Promise<void> {
    const insertResult = await this.pool.query(
      `
        insert into idempotency_keys (
          scope,
          idempotency_key,
          request_hash,
          status,
          expires_at,
          created_at,
          updated_at
        )
        values ($1, $2, $3, 'in_progress', $4, now(), now())
        on conflict (scope, idempotency_key) do nothing
        returning id
      `,
      [input.scope, input.key, input.requestHash, input.expiresAt]
    );

    if (insertResult.rows[0]) {
      return;
    }

    const updateResult = await this.pool.query(
      `
        update idempotency_keys
        set
          request_hash = $3,
          status = 'in_progress',
          response_status = null,
          response_body = null,
          expires_at = $4,
          created_at = now(),
          updated_at = now()
        where scope = $1
          and idempotency_key = $2
          and (
            expires_at <= now()
            or (status = 'in_progress' and created_at < $5)
          )
        returning id
      `,
      [input.scope, input.key, input.requestHash, input.expiresAt, input.staleBefore]
    );

    if (updateResult.rows[0]) {
      return;
    }

    const existing = await this.getIdempotencyRecord(input.scope, input.key);
    if (existing?.requestHash !== input.requestHash) {
      throw idempotencyConflict();
    }

    throw new ApiError(409, "idempotency_in_progress", "This request is already being processed.", {
      retryable: true,
    });
  }

  async storeIdempotencyResponse(input: {
    scope: string;
    key: string;
    requestHash: string;
    response: StoredIdempotencyResponse;
  }): Promise<void> {
    const result = await this.pool.query(
      `
        update idempotency_keys
        set
          status = 'completed',
          response_status = $4,
          response_body = $5::jsonb,
          updated_at = now()
        where scope = $1
          and idempotency_key = $2
          and request_hash = $3
        returning id
      `,
      [
        input.scope,
        input.key,
        input.requestHash,
        input.response.statusCode,
        JSON.stringify(input.response.body),
      ]
    );

    if (!result.rows[0]) {
      throw new ApiError(500, "idempotency_state_invalid", "Idempotency state is invalid.");
    }
  }

  async releaseIdempotencyKey(scope: string, key: string, requestHash: string): Promise<void> {
    await this.pool.query(
      `
        delete from idempotency_keys
        where scope = $1
          and idempotency_key = $2
          and request_hash = $3
          and status = 'in_progress'
      `,
      [scope, key, requestHash]
    );
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
    try {
      const result = await this.pool.query<HoldRow>(
        `
          insert into holds (
            booking_session_id,
            property_id,
            arrival_date,
            departure_date,
            status,
            expires_at,
            smoobu_channel_id,
            smoobu_create_payload_hash
          )
          values ($1, $2, $3, $4, 'creating', $5, $6, $7)
          returning ${HOLD_COLUMNS}
        `,
        [
          input.bookingSessionId,
          input.propertyId,
          input.arrivalDate,
          input.departureDate,
          input.expiresAt,
          input.smoobuChannelId,
          input.smoobuCreatePayloadHash,
        ]
      );

      return mapRequiredHoldRow(result.rows[0], input.bookingSessionId);
    } catch (error) {
      throw mapHoldInsertError(error);
    }
  }

  async activateHold(input: {
    holdId: string;
    smoobuReservationId: number;
  }): Promise<HoldRecord> {
    const result = await this.pool.query<HoldRow>(
      `
        update holds
        set
          status = 'active',
          smoobu_reservation_id = $2,
          updated_at = now()
        where id = $1
          and status = 'creating'
        returning ${HOLD_COLUMNS}
      `,
      [input.holdId, input.smoobuReservationId]
    );

    if (result.rows[0]) {
      return mapHoldRow(result.rows[0]);
    }

    return this.throwMissingOrInvalidTransition(input.holdId, "creating", "active");
  }

  async failHold(input: { holdId: string; reason: string }): Promise<HoldRecord> {
    const result = await this.pool.query<HoldRow>(
      `
        update holds
        set
          status = 'failed',
          last_smoobu_error = $2,
          updated_at = now()
        where id = $1
          and status not in ('converted', 'expired', 'cancelled')
        returning ${HOLD_COLUMNS}
      `,
      [input.holdId, input.reason]
    );

    if (result.rows[0]) {
      return mapHoldRow(result.rows[0]);
    }

    const existing = await this.getById(input.holdId);
    if (existing) {
      return existing;
    }

    throw new ApiError(500, "hold_state_invalid", `Hold ${input.holdId} is missing.`);
  }

  async getByBookingSessionId(bookingSessionId: string): Promise<HoldRecord | undefined> {
    const result = await this.pool.query<HoldRow>(
      `${HOLD_SELECT} where booking_session_id = $1 limit 1`,
      [bookingSessionId]
    );
    return mapOptionalHoldRow(result.rows[0]);
  }

  async getBySmoobuReservationId(smoobuReservationId: number): Promise<HoldRecord | undefined> {
    const result = await this.pool.query<HoldRow>(
      `${HOLD_SELECT} where smoobu_reservation_id = $1 limit 1`,
      [smoobuReservationId]
    );
    return mapOptionalHoldRow(result.rows[0]);
  }

  async expireHold(holdId: string): Promise<HoldRecord> {
    const result = await this.pool.query<HoldRow>(
      `
        update holds
        set
          status = 'expired',
          expired_at = coalesce(expired_at, now()),
          updated_at = now()
        where id = $1
        returning ${HOLD_COLUMNS}
      `,
      [holdId]
    );

    return mapRequiredHoldRow(result.rows[0], holdId);
  }

  async cancelHold(holdId: string): Promise<HoldRecord> {
    const result = await this.pool.query<HoldRow>(
      `
        update holds
        set
          status = 'cancelled',
          cancelled_at = coalesce(cancelled_at, now()),
          updated_at = now()
        where id = $1
        returning ${HOLD_COLUMNS}
      `,
      [holdId]
    );

    return mapRequiredHoldRow(result.rows[0], holdId);
  }

  async listExpiredHolds(now: string): Promise<HoldRecord[]> {
    const result = await this.pool.query<HoldRow>(
      `
        with expired_candidates as (
          select id
          from holds
          where status in ('creating', 'active')
            and expires_at <= $1
          order by expires_at asc
          for update skip locked
        )
        update holds
        set
          status = 'expired',
          expired_at = coalesce(expired_at, now()),
          updated_at = now()
        where id in (select id from expired_candidates)
        returning ${HOLD_COLUMNS}
      `,
      [now]
    );

    return result.rows.map(mapHoldRow);
  }

  private async getById(holdId: string): Promise<HoldRecord | undefined> {
    const result = await this.pool.query<HoldRow>(`${HOLD_SELECT} where id = $1 limit 1`, [holdId]);
    return mapOptionalHoldRow(result.rows[0]);
  }

  private async throwMissingOrInvalidTransition(
    holdId: string,
    expectedStatus: HoldStatus,
    nextStatus: HoldStatus
  ): Promise<never> {
    const existing = await this.getById(holdId);
    if (!existing) {
      throw new ApiError(500, "hold_state_invalid", `Hold ${holdId} is missing.`);
    }

    throw new Error(
      `Cannot transition hold ${holdId} to ${nextStatus}: expected ${expectedStatus}, got ${existing.status}.`
    );
  }
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
  bookingSessions: Pick<BookingSessionRepository, "getById" | "getByQuoteId">,
  holdRequest: HoldRequest
): Promise<BookingSessionRecord> {
  const session = await bookingSessions.getByQuoteId(holdRequest.quoteId);

  if (!session || session.id !== holdRequest.bookingSessionId || session.quoteId !== holdRequest.quoteId) {
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
// Format: <SCRYPT_VERSION_TAG><salt-hex><base64-derived> — must match portalAuth.ts verifyPortalPassword().
const SCRYPT_PARAMS: ScryptOptions = { N: 16384, r: 8, p: 1 };
const SCRYPT_VERSION_TAG = "scryptN16384r8p1";

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
  return `${SCRYPT_VERSION_TAG}${salt}${derived.toString("base64")}`;
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

function mapOptionalHoldRow(row: HoldRow | undefined): HoldRecord | undefined {
  return row ? mapHoldRow(row) : undefined;
}

function mapRequiredHoldRow(row: HoldRow | undefined, id: string): HoldRecord {
  if (!row) {
    throw new ApiError(500, "hold_state_invalid", `Hold ${id} is missing.`);
  }

  return mapHoldRow(row);
}

function mapHoldRow(row: HoldRow): HoldRecord {
  const smoobuReservationId = parseNullableInteger(row.smoobu_reservation_id);
  const smoobuChannelId = parseSmoobuChannelId(row.smoobu_channel_id);

  return {
    id: row.id,
    bookingSessionId: row.booking_session_id,
    propertyId: row.property_id,
    arrivalDate: toDateOnly(row.arrival_date),
    departureDate: toDateOnly(row.departure_date),
    status: parseHoldStatus(row.status),
    expiresAt: toIsoString(row.expires_at),
    ...(smoobuReservationId !== undefined ? { smoobuReservationId } : {}),
    smoobuChannelId,
    ...(row.smoobu_create_payload_hash ? { smoobuCreatePayloadHash: row.smoobu_create_payload_hash } : {}),
    ...(row.last_smoobu_error ? { lastSmoobuError: row.last_smoobu_error } : {}),
    createdAt: toIsoString(row.created_at),
    updatedAt: toIsoString(row.updated_at),
  };
}

function parseHoldStatus(status: string): HoldStatus {
  if (
    status === "creating" ||
    status === "active" ||
    status === "failed" ||
    status === "expired" ||
    status === "cancelled" ||
    status === "converted"
  ) {
    return status;
  }

  throw new Error(`Unsupported hold status from database: ${status}`);
}

function parseSmoobuChannelId(value: number): 11 | 13 {
  if (value === 11 || value === 13) {
    return value;
  }

  throw new Error(`Unsupported Smoobu hold channel from database: ${value}`);
}

function parseNullableInteger(value: string | number | null): number | undefined {
  if (value === null) {
    return undefined;
  }

  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isInteger(parsed) ? parsed : undefined;
}

function mapOptionalIdempotencyRow(row: IdempotencyRow | undefined): IdempotencyRecord | undefined {
  if (!row) {
    return undefined;
  }

  const responseStatus = row.response_status;
  const responseBody = parseJsonbValue(row.response_body);
  return {
    scope: row.scope,
    key: row.idempotency_key,
    requestHash: row.request_hash,
    status: parseIdempotencyStatus(row.status),
    ...(typeof responseStatus === "number" && responseBody !== undefined
      ? {
          response: {
            statusCode: responseStatus,
            body: responseBody,
          },
        }
      : {}),
    startedAt: toIsoString(row.created_at),
    expiresAt: toIsoString(row.expires_at),
  };
}

function parseIdempotencyStatus(status: string): IdempotencyStatus {
  if (status === "in_progress" || status === "completed") {
    return status;
  }

  throw new Error(`Unsupported idempotency status from database: ${status}`);
}

function rangesOverlap(leftStart: string, leftEnd: string, rightStart: string, rightEnd: string): boolean {
  return leftStart < rightEnd && rightStart < leftEnd;
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

function mapHoldInsertError(error: unknown): unknown {
  const pgError = error as { code?: string; constraint?: string };
  if (pgError.code === "23P01" || pgError.constraint === "holds_no_overlapping_active_inventory") {
    return new ApiError(409, "property_no_longer_available", "This property is no longer available.", {
      retryable: false,
    });
  }

  if (pgError.code === "23505") {
    return new ApiError(409, "hold_already_exists", "A hold already exists for this booking session.");
  }

  return error;
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
