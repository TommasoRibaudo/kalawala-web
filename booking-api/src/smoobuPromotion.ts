/**
 * Smoobu reservation promotion — converts a "Blocked channel" (channelId 11)
 * hold into a "Homepage" / website reservation (channelId 70) once a booking
 * is confirmed, whether by PayPal capture (paypalOrders.ts) or by staff
 * confirming a manual deposit (depositConfirm.ts). Both callers build their
 * own `notice` text, since the wording differs by payment method.
 *
 * The Smoobu PUT /api/reservations endpoint does NOT support changing channelId,
 * so promotion requires deleting the old blocked reservation and creating a new
 * one on the Homepage channel with payment fields marked as complete.
 *
 * ─── Why this file is written so defensively ─────────────────────────────────
 *
 * That delete-then-create is an inventory hazard, not just a bookkeeping detail.
 * Smoobu pushes availability to Booking.com and Airbnb on every reservation
 * change, so the pair emits an "open these dates" push immediately followed by a
 * "close these dates" push. Two opposing pushes, milliseconds apart, into queues
 * we do not control.
 *
 * Incident 2026-09-12 (KWL-AFFJYUR6, Casa Geco, 25–27 Sep): both Smoobu calls
 * succeeded and Smoobu's calendar was correct throughout. Airbnb applied both
 * pushes correctly. Booking.com applied them out of order for ONE of the two
 * nights — the 26th stayed bookable with 1 room to sell for about 36 hours and
 * was sold to a different guest. Smoobu then refused to import that leg of the
 * incoming Booking.com reservation (it correctly saw Geco as occupied) and
 * imported only the guest's other room, so no overbooking was ever flagged
 * anywhere. It was found by hand.
 *
 * Three consequences, all implemented below:
 *
 *   1. The gap must be as short as physically possible. The create payload is
 *      built BEFORE the delete, and the promotion runs on a Smoobu client whose
 *      rate-limit sleep is disabled — the shared client will happily sleep up to
 *      maxRateLimitDelayMs (default 60s) before a call, and doing that between
 *      the delete and the create would hold the room open for a minute.
 *   2. The gap must be measured. Every promotion logs how long inventory was
 *      actually exposed, so this stops being invisible.
 *   3. The result must be checked against Smoobu, and a corrective close-push
 *      sent to the channels a short while later.
 *
 *      Two different things, with different reach, and it matters not to
 *      conflate them. The Smoobu check catches a promotion that did not take
 *      (create failed, re-block failed) — it cannot see Booking.com, which in
 *      the Geco incident was the only system that was wrong. The corrective
 *      push is what reaches the channels, and it is sent by the watchdog a
 *      minute or two later rather than here: firing it immediately would put it
 *      in the same burst as the delete and the create, which is the ordering
 *      problem, not the fix. See availabilityWatchdog.ts mode "reassert".
 *
 * The real fix is to not change channels at all: a hold created directly on
 * channel 70 is confirmed with a single PUT and emits no availability change
 * whatsoever. Set SMOOBU_HOLD_CHANNEL_ID=70 to take that path — see the note in
 * config.ts about Smoobu's "new booking" guest auto-messages before doing so.
 */

import { BookingSessionRecord } from "./bookingSessions";
import { checkSmoobuHasStayBlocked, WEBSITE_CHANNEL_ID, BLOCKED_CHANNEL_ID } from "./availabilityGuard";
import { HoldRecord, HoldRepository } from "./holds";
import { BookingProperty, BOOKING_PROPERTIES_BY_ID } from "./propertyCatalog";
import { createSmoobuClient, SmoobuClient } from "./smoobuClient";
import { BookingApiConfig, ObservabilityLogger, RouteObservability } from "./types";

interface SmoobuCreateReservationResponse {
  id?: unknown;
}

export interface PromoteSmoobuReservationInput {
  session: BookingSessionRecord;
  hold: HoldRecord;
  /** Caller-built, since the wording differs by payment method (PayPal capture vs. staff-confirmed deposit). */
  notice: string;
  amountCents: number;
}

export interface PromoteSmoobuReservationResult {
  promoted: boolean;
  newSmoobuReservationId?: number;
  error?: string;
  /** Milliseconds between the delete landing and the create landing. 0 when no gap existed. */
  inventoryExposureMs?: number;
}

/**
 * Promotes a Smoobu blocked-channel hold to a Homepage (website) reservation.
 *
 * Steps:
 * 1. Build the replacement payload (before anything is deleted).
 * 2. Delete the old blocked reservation on Smoobu.
 * 3. Create the new reservation with channelId 70 and payment fields set to paid.
 * 4. Update the local hold record to "converted" with the new reservation ID.
 * 5. Check Smoobu's own state, and alert/re-block if the stay is open there.
 *
 * All five are non-fatal: if any fails, the booking is still confirmed in our DB
 * and the error is logged. Step 5 is Smoobu-side only — the corrective push to
 * Booking.com and Airbnb is the watchdog's job, a minute or two later.
 */
export async function promoteSmoobuReservation(
  input: PromoteSmoobuReservationInput,
  holds: HoldRepository,
  config: BookingApiConfig,
  observability: RouteObservability
): Promise<PromoteSmoobuReservationResult> {
  const { session, hold, notice, amountCents } = input;
  const logger = observability.logger;

  if (!hold.smoobuReservationId) {
    logger.warn("smoobu_promotion_skipped_no_reservation_id", {
      bookingSessionId: session.id,
      holdId: hold.id,
    });
    return { promoted: false, error: "no_smoobu_reservation_id" };
  }

  // The apartment we promote onto MUST be the one the blocked hold already
  // occupies (hold.propertyId) — never a re-derivation from the mutable
  // session.propertyId. The hold's property is immutable, matches the reservation
  // being replaced, and matches the property named in the staff email. Trusting
  // session.propertyId here let a Pappagallo deposit (KWL-MWRCRU5G) be sold onto
  // Rana when the session's property drifted during a multi-home booking. If the
  // two disagree, promote correctly AND surface it for investigation.
  if (session.propertyId && session.propertyId !== hold.propertyId) {
    logger.error("smoobu_promotion_property_mismatch", {
      bookingSessionId: session.id,
      holdId: hold.id,
      holdPropertyId: hold.propertyId,
      sessionPropertyId: session.propertyId,
      action: "manual_intervention_required",
    });
  }

  const property = BOOKING_PROPERTIES_BY_ID.get(hold.propertyId);
  if (!property) {
    logger.warn("smoobu_promotion_skipped_no_property", {
      bookingSessionId: session.id,
      holdId: hold.id,
      propertyId: hold.propertyId,
    });
    return { promoted: false, error: "property_not_found" };
  }

  let smoobuClient: SmoobuClient;
  try {
    smoobuClient = await createPromotionClient(config);
  } catch (err) {
    logger.warn("smoobu_promotion_client_init_failed", {
      bookingSessionId: session.id,
      error: err instanceof Error ? err.message : String(err),
    });
    return { promoted: false, error: "smoobu_client_init_failed" };
  }

  // ── The no-gap path ────────────────────────────────────────────────────────
  // The hold is already on the website channel, so confirming it is a single
  // idempotent PUT: no delete, no create, no availability transition, nothing
  // for a channel to apply out of order. This is what SMOOBU_HOLD_CHANNEL_ID=70
  // buys, and it is why that setting is the actual fix rather than a tweak.
  if (hold.smoobuChannelId === WEBSITE_CHANNEL_ID) {
    const result = await updateExistingWebsiteBooking(
      smoobuClient,
      hold,
      session,
      notice,
      amountCents,
      observability,
      logger
    );
    await checkSmoobuSide(smoobuClient, { hold, property, session, notice }, config, logger, observability);
    return { ...result, inventoryExposureMs: 0 };
  }

  // ── The delete-then-create path ────────────────────────────────────────────
  // Everything between the two awaits below is time the room is on sale. Build
  // the payload first so no JSON work, catalog lookup or string formatting
  // happens inside the window.
  const payload = buildConfirmedReservationPayload(session, property, notice, amountCents);

  const deletedAtMs = Date.now();
  try {
    await smoobuClient.cancelReservation(hold.smoobuReservationId, observability);
    logger.info("smoobu_promotion_old_reservation_deleted", {
      bookingSessionId: session.id,
      smoobuReservationId: hold.smoobuReservationId,
    });
  } catch (err) {
    logger.error("smoobu_promotion_delete_failed", {
      bookingSessionId: session.id,
      smoobuReservationId: hold.smoobuReservationId,
      error: err instanceof Error ? err.message : String(err),
    });
    // The block is still standing, so inventory was never exposed. Fall back to
    // updating the existing reservation's payment fields.
    return fallbackUpdateReservation(smoobuClient, hold, session, notice, amountCents, observability, logger);
  }

  let newReservationId: number;
  try {
    const response = await smoobuClient.createReservation<SmoobuCreateReservationResponse>(payload, observability);
    newReservationId = parseSmoobuReservationId(response.data);
  } catch (err) {
    const exposureMs = Date.now() - deletedAtMs;
    logger.error("smoobu_promotion_create_failed", {
      bookingSessionId: session.id,
      oldSmoobuReservationId: hold.smoobuReservationId,
      inventoryExposureMs: exposureMs,
      error: err instanceof Error ? err.message : String(err),
    });
    // The old blocked reservation was deleted but the website one failed — the
    // dates are back on sale for a booking that is already paid. Smoobu rejects
    // creating a reservation over a still-existing block, so we can't
    // create-before-delete; instead we compensate by re-blocking the dates so
    // the inventory stays held. A later promotion retry can finish the move to
    // the website channel (R2).
    const reblock = await reblockAfterCreateFailure(
      smoobuClient,
      holds,
      hold,
      session,
      property,
      notice,
      amountCents,
      observability,
      logger
    );
    return { ...reblock, inventoryExposureMs: exposureMs };
  }

  const inventoryExposureMs = Date.now() - deletedAtMs;

  // Make the window visible. An exposure that suddenly jumps from ~400ms to
  // several seconds is the early warning that this path is degrading — it is the
  // difference between "a channel might drop a push" and "a guest can buy it".
  logger.info("smoobu_promotion_new_reservation_created", {
    bookingSessionId: session.id,
    oldSmoobuReservationId: hold.smoobuReservationId,
    newSmoobuReservationId: newReservationId,
    channelId: WEBSITE_CHANNEL_ID,
    inventoryExposureMs,
  });

  if (inventoryExposureMs > INVENTORY_EXPOSURE_WARN_MS) {
    logger.error("smoobu_promotion_inventory_exposure_exceeded", {
      bookingSessionId: session.id,
      propertyId: hold.propertyId,
      propertyName: property.name,
      arrivalDate: hold.arrivalDate,
      departureDate: hold.departureDate,
      inventoryExposureMs,
      thresholdMs: INVENTORY_EXPOSURE_WARN_MS,
      note: "Dates were on sale on the connected channels for longer than expected during promotion.",
    });
  }

  try {
    await holds.convertHold({
      holdId: hold.id,
      newSmoobuReservationId: newReservationId,
      newSmoobuChannelId: WEBSITE_CHANNEL_ID,
    });
  } catch (err) {
    // Non-fatal: the Smoobu reservation is correct, local state is stale
    logger.warn("smoobu_promotion_hold_convert_failed", {
      bookingSessionId: session.id,
      holdId: hold.id,
      newSmoobuReservationId: newReservationId,
      error: err instanceof Error ? err.message : String(err),
    });
  }

  observability.recordStateTransition({
    entityType: "hold",
    fromState: "active",
    toState: "converted",
    action: "smoobu.reservation.promote",
    success: true,
    bookingSessionId: session.id,
    reservationPublicId: session.reservationPublicId,
    provider: "smoobu",
    providerObjectId: String(newReservationId),
  });

  // Check Smoobu's own state. This catches the half of the failure space where
  // the create silently did not take; it says nothing about whether Booking.com
  // and Airbnb applied the close-push, which is the half that actually bit on
  // 12 September. The corrective push for that is the watchdog's "reassert"
  // pass, deliberately delayed so it does not join this same burst.
  await checkSmoobuSide(
    smoobuClient,
    {
      hold: { ...hold, smoobuReservationId: newReservationId, smoobuChannelId: WEBSITE_CHANNEL_ID },
      property,
      session,
      notice,
    },
    config,
    logger,
    observability
  );

  return { promoted: true, newSmoobuReservationId: newReservationId, inventoryExposureMs };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Above this, the delete→create window is long enough that a guest could
 * realistically complete a booking inside it. 2s is generous for two sequential
 * Smoobu calls; anything slower deserves a look rather than a shrug.
 */
const INVENTORY_EXPOSURE_WARN_MS = 2_000;

/**
 * A Smoobu client for the promotion path specifically, with the rate-limit
 * sleep disabled.
 *
 * The shared client calls waitForKnownRateLimitWindow() before every attempt and
 * will sleep up to maxRateLimitDelayMs (60s by default) if a previous response
 * reported x-ratelimit-remaining: 0. Between the delete and the create that
 * sleep is not backpressure, it is a minute of a paid booking being on sale.
 * With the cap at 0 the client throws instead, which lands in the create-failed
 * branch and re-blocks immediately.
 */
async function createPromotionClient(config: BookingApiConfig): Promise<SmoobuClient> {
  return createSmoobuClient({
    ...config,
    smoobu: { ...config.smoobu, maxRateLimitDelayMs: 0 },
  });
}

/**
 * Smoobu-side sanity check after a confirmation. Never fails the confirmation:
 * the booking is already paid and recorded, and a provider hiccup here must not
 * change that.
 */
async function checkSmoobuSide(
  smoobuClient: SmoobuClient,
  input: { hold: HoldRecord; property: BookingProperty; session: BookingSessionRecord; notice: string },
  config: BookingApiConfig,
  logger: ObservabilityLogger,
  observability: RouteObservability
): Promise<void> {
  try {
    await checkSmoobuHasStayBlocked(
      smoobuClient,
      {
        hold: input.hold,
        property: input.property,
        notice: input.notice,
        customerId: config.smoobu.customerId,
        guests: input.session.guests,
      },
      logger,
      observability
    );
  } catch (err) {
    // The check must never turn a successful confirmation into a failure.
    logger.warn("smoobu_promotion_smoobu_check_error", {
      bookingSessionId: input.session.id,
      holdId: input.hold.id,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

/**
 * When the hold is already on the website channel, just update payment fields.
 */
async function updateExistingWebsiteBooking(
  smoobuClient: SmoobuClient,
  hold: HoldRecord,
  session: BookingSessionRecord,
  notice: string,
  amountCents: number,
  observability: RouteObservability,
  logger: ObservabilityLogger
): Promise<PromoteSmoobuReservationResult> {
  try {
    await smoobuClient.updateReservation(
      hold.smoobuReservationId!,
      {
        notice,
        prepayment: amountCents / 100,
        prepaymentStatus: 1,
        priceStatus: 1,
      },
      observability
    );
    logger.info("smoobu_promotion_website_booking_updated", {
      bookingSessionId: session.id,
      smoobuReservationId: hold.smoobuReservationId,
    });
    return { promoted: true, newSmoobuReservationId: hold.smoobuReservationId };
  } catch (err) {
    logger.warn("smoobu_promotion_website_booking_update_failed", {
      bookingSessionId: session.id,
      smoobuReservationId: hold.smoobuReservationId,
      error: err instanceof Error ? err.message : String(err),
    });
    return { promoted: false, error: "website_booking_update_failed" };
  }
}

/**
 * Fallback: if deleting the old blocked reservation fails, try to at least
 * update its payment fields so it shows as paid in Smoobu.
 */
async function fallbackUpdateReservation(
  smoobuClient: SmoobuClient,
  hold: HoldRecord,
  session: BookingSessionRecord,
  notice: string,
  amountCents: number,
  observability: RouteObservability,
  logger: ObservabilityLogger
): Promise<PromoteSmoobuReservationResult> {
  try {
    await smoobuClient.updateReservation(
      hold.smoobuReservationId!,
      {
        notice,
        prepayment: amountCents / 100,
        prepaymentStatus: 1,
        priceStatus: 1,
      },
      observability
    );
    logger.warn("smoobu_promotion_fallback_update_applied", {
      bookingSessionId: session.id,
      smoobuReservationId: hold.smoobuReservationId,
      note: "Reservation remains on Blocked channel but payment fields updated",
    });
    return { promoted: false, error: "delete_failed_fallback_update_applied", inventoryExposureMs: 0 };
  } catch (updateErr) {
    logger.error("smoobu_promotion_fallback_update_also_failed", {
      bookingSessionId: session.id,
      smoobuReservationId: hold.smoobuReservationId,
      error: updateErr instanceof Error ? updateErr.message : String(updateErr),
    });
    return { promoted: false, error: "delete_and_update_both_failed", inventoryExposureMs: 0 };
  }
}

/**
 * Compensating action when the website reservation could not be created after the
 * old blocked reservation was already deleted. Re-creates a Blocked-channel
 * reservation so the (paid) booking's dates are not put back on sale, and points
 * the local hold at the restored reservation. If even this fails, logs a critical
 * alert for manual intervention.
 */
async function reblockAfterCreateFailure(
  smoobuClient: SmoobuClient,
  holds: HoldRepository,
  hold: HoldRecord,
  session: BookingSessionRecord,
  property: BookingProperty,
  notice: string,
  amountCents: number,
  observability: RouteObservability,
  logger: ObservabilityLogger
): Promise<PromoteSmoobuReservationResult> {
  try {
    const payload = {
      ...buildConfirmedReservationPayload(session, property, `RE-BLOCKED after failed promotion. ${notice}`, amountCents),
      channelId: BLOCKED_CHANNEL_ID,
    };
    const response = await smoobuClient.createReservation<SmoobuCreateReservationResponse>(payload, observability);
    const reblockId = parseSmoobuReservationId(response.data);

    // Point the hold at the restored reservation (still on the blocked channel) so
    // it is not orphaned and a later promotion retry can pick it up.
    await holds
      .convertHold({ holdId: hold.id, newSmoobuReservationId: reblockId, newSmoobuChannelId: BLOCKED_CHANNEL_ID })
      .catch((convertErr) => {
        logger.warn("smoobu_promotion_reblock_hold_update_failed", {
          bookingSessionId: session.id,
          holdId: hold.id,
          reblockId,
          error: convertErr instanceof Error ? convertErr.message : String(convertErr),
        });
      });

    logger.warn("smoobu_promotion_reblocked_after_create_failure", {
      bookingSessionId: session.id,
      oldSmoobuReservationId: hold.smoobuReservationId,
      reblockId,
    });
    return { promoted: false, error: "create_after_delete_failed_reblocked", newSmoobuReservationId: reblockId };
  } catch (reblockErr) {
    logger.error("smoobu_promotion_dates_unblocked", {
      bookingSessionId: session.id,
      arrivalDate: session.arrivalDate,
      departureDate: session.departureDate,
      propertyId: session.propertyId,
      error: reblockErr instanceof Error ? reblockErr.message : String(reblockErr),
      action: "manual_intervention_required",
    });
    return { promoted: false, error: "create_after_delete_failed" };
  }
}

function buildConfirmedReservationPayload(
  session: BookingSessionRecord,
  property: BookingProperty,
  notice: string,
  amountCents: number
) {
  const guest = session.guest;
  return {
    arrivalDate: session.arrivalDate,
    departureDate: session.departureDate,
    channelId: WEBSITE_CHANNEL_ID,
    apartmentId: property.smoobuApartmentId,
    firstName: guest?.firstName ?? "",
    lastName: guest?.lastName ?? "",
    email: guest?.email ?? "",
    ...(guest?.phone ? { phone: guest.phone } : {}),
    ...(guest?.country ? { country: guest.country } : {}),
    notice,
    adults: session.guests,
    children: 0,
    price: amountCents / 100,
    priceStatus: 1,
    prepayment: amountCents / 100,
    prepaymentStatus: 1,
    deposit: 0,
    depositStatus: 0,
    language: session.language,
  };
}

function parseSmoobuReservationId(data: SmoobuCreateReservationResponse): number {
  if (typeof data.id === "number" && Number.isInteger(data.id) && data.id > 0) {
    return data.id;
  }

  if (typeof data.id === "string" && /^\d+$/.test(data.id)) {
    return Number(data.id);
  }

  throw new Error("Smoobu returned an invalid reservation ID during promotion.");
}
