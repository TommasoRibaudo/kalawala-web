/**
 * availabilityGuard.ts — inventory checks, and an honest account of their reach.
 *
 * ─── What this can and cannot see ────────────────────────────────────────────
 *
 * Read this before trusting anything in here.
 *
 * In the 2026-09-12 Geco incident, **Smoobu was correct throughout**. Its
 * calendar showed Casa Geco occupied for 25–27 Sep the entire time. The
 * divergence existed only inside Booking.com, which had applied the "open" push
 * from the promotion's DELETE and never applied the "close" push from the CREATE
 * that followed it — for one night of the range. Airbnb applied both correctly.
 *
 * So: asking Smoobu "are these dates bookable?" would have answered "no,
 * everything is fine" for all 36 hours of the exposure. `checkDatesBookable`
 * **would not have detected this incident**, and must never be described as if
 * it would.
 *
 * What it does detect is a different and real failure family, all Smoobu-side:
 *   • the promotion's CREATE failed and the re-block failed too,
 *   • the expiry sweep cancelled a reservation it should not have,
 *   • someone deleted a reservation by hand in the Smoobu UI,
 *   • a hold whose local state and Smoobu state have drifted apart.
 *
 * The only lever that reaches the channels is `reassertChannelBlock`: touching a
 * live reservation makes Smoobu re-emit "these dates are taken" downstream, so a
 * close-push that was dropped or applied out of order gets a second chance. It
 * verifies nothing — it cannot read Booking.com — it just re-sends. Because it
 * is a *write* that causes a channel push, it is rationed deliberately: see the
 * cost note on the function, and availabilityWatchdog.ts for the schedule.
 *
 * Nothing in this file can independently confirm Booking.com or Airbnb state.
 * That is a property of the integration, not an oversight: Smoobu holds the
 * connectivity relationship with both channels, and neither exposes an
 * inventory read to the property behind a channel manager. The defences that
 * actually close the gap are, in order: do not create the divergence at all
 * (SMOOBU_HOLD_CHANNEL_ID=70), re-assert once after the fact, and catch the
 * conflict when an inbound reservation lands on dates we already sold
 * (smoobuWebhooks.ts).
 */

import { HoldRecord } from "./holds";
import { BookingProperty } from "./propertyCatalog";
import { SmoobuClient, SmoobuProviderError } from "./smoobuClient";
import { ObservabilityLogger, RouteObservability } from "./types";

/** Smoobu channel 11 = "Blocked" — inventory held, no guest-facing booking. */
export const BLOCKED_CHANNEL_ID = 11;
/** Smoobu channel 70 = "Homepage" — the website sales channel. */
export const WEBSITE_CHANNEL_ID = 70;

interface SmoobuAvailabilityResponse {
  availableApartments?: unknown;
  errorMessages?: unknown;
}

interface SmoobuCreateReservationResponse {
  id?: unknown;
}

export interface AvailabilityCheckInput {
  apartmentId: number;
  arrivalDate: string;
  departureDate: string;
  customerId?: number;
  guests?: number;
}

export type AvailabilityVerdict =
  /** Smoobu says the dates are NOT bookable. Says nothing about the channels. */
  | { state: "closed" }
  /** Smoobu says the dates ARE bookable — inventory is exposed at the source. */
  | { state: "open" }
  /** We could not tell (provider error, unparseable response). Never treated as safe. */
  | { state: "unknown"; reason: string };

/**
 * Asks Smoobu whether `apartmentId` can still be booked for the given dates.
 *
 * This is a READ — `POST /booking/checkApartmentAvailability` has no side
 * effects and emits nothing to the channels, so it is cheap to run broadly.
 *
 * Scope: Smoobu's own state only. See the file header — a "closed" verdict is
 * not evidence that Booking.com or Airbnb agree.
 *
 * Deliberately fails to "unknown" rather than "closed": a check that reports
 * success when it could not actually check is worse than no check at all,
 * because it silences the alert that would otherwise fire.
 */
export async function checkDatesBookable(
  smoobuClient: SmoobuClient,
  input: AvailabilityCheckInput,
  observability?: RouteObservability
): Promise<AvailabilityVerdict> {
  let data: SmoobuAvailabilityResponse;
  try {
    const response = await smoobuClient.checkApartmentAvailability<SmoobuAvailabilityResponse>(
      {
        arrivalDate: input.arrivalDate,
        departureDate: input.departureDate,
        apartments: [input.apartmentId],
        ...(input.customerId ? { customerId: input.customerId } : {}),
        ...(input.guests ? { guests: input.guests } : {}),
      },
      observability
    );
    data = response.data ?? {};
  } catch (err) {
    return {
      state: "unknown",
      reason: err instanceof Error ? err.message : String(err),
    };
  }

  const available = parseAvailableApartmentIds(data.availableApartments);
  const unavailable = parseUnavailableApartmentIds(data.errorMessages);

  if (unavailable.has(input.apartmentId)) {
    return { state: "closed" };
  }
  if (available.includes(input.apartmentId)) {
    return { state: "open" };
  }
  // Smoobu listed the apartment in neither bucket. That is not a "closed"
  // answer, it is no answer — see the note on failing to "unknown" above.
  return { state: "unknown", reason: "apartment_absent_from_availability_response" };
}

/**
 * Re-emits a "these dates are closed" push to every connected channel, without
 * deleting anything.
 *
 * Smoobu sends ARI downstream whenever a reservation changes, so a no-op-shaped
 * PUT on the live reservation makes it re-assert the block. The `notice` is the
 * only field touched; it is rewritten with a timestamp so the reason for the
 * touch is visible in Smoobu's UI.
 *
 * Directionally safe: this call can only ever tell a channel the dates are
 * taken. If it fails, inventory is exactly as it was.
 *
 * ─── But it is not free, and it is not harmless in bulk ──────────────────────
 *
 * Every call is a write that fans out to Booking.com and Airbnb. Running it
 * across the whole future book on a short timer would mean tens of thousands of
 * channel pushes a day — which is the same kind of ARI traffic whose
 * mis-ordering caused the incident in the first place. Call it:
 *   • once, a short delay after a promotion that used delete-then-create, or
 *   • on a stay that a check actually found open.
 * Never on a timer across every reservation. See availabilityWatchdog.ts.
 */
export async function reassertChannelBlock(
  smoobuClient: SmoobuClient,
  input: {
    smoobuReservationId: number;
    /** Existing notice text — re-sent so the PUT does not blank it. */
    notice: string;
    reason: string;
  },
  logger: ObservabilityLogger,
  observability?: RouteObservability
): Promise<boolean> {
  const stamp = new Date().toISOString();
  try {
    await smoobuClient.updateReservation(
      input.smoobuReservationId,
      {
        notice: appendReassertionMarker(input.notice, stamp, input.reason),
      },
      observability
    );
    logger.info("availability_block_reasserted", {
      smoobuReservationId: input.smoobuReservationId,
      reason: input.reason,
    });
    return true;
  } catch (err) {
    logger.warn("availability_block_reassert_failed", {
      smoobuReservationId: input.smoobuReservationId,
      reason: input.reason,
      error: err instanceof Error ? err.message : String(err),
    });
    return false;
  }
}

/**
 * Smoobu-side check on one confirmed stay, with remediation only when Smoobu
 * itself reports the dates open.
 *
 * Named for what it actually does. It does NOT verify that the stay is off sale
 * on Booking.com or Airbnb, and a "closed" result is not evidence that it is.
 *
 * Writes nothing on the healthy path — a stay Smoobu already reports as closed
 * costs exactly one read.
 */
export async function checkSmoobuHasStayBlocked(
  smoobuClient: SmoobuClient,
  input: {
    hold: HoldRecord;
    property: BookingProperty;
    notice: string;
    customerId?: number;
    guests?: number;
    /** Set false to alert without creating a re-block reservation. */
    remediate?: boolean;
  },
  logger: ObservabilityLogger,
  observability?: RouteObservability
): Promise<AvailabilityVerdict> {
  const { hold, property } = input;
  const remediate = input.remediate ?? true;

  const verdict = await checkDatesBookable(
    smoobuClient,
    {
      apartmentId: property.smoobuApartmentId,
      arrivalDate: hold.arrivalDate,
      departureDate: hold.departureDate,
      customerId: input.customerId,
      guests: input.guests,
    },
    observability
  );

  if (verdict.state === "closed") {
    return verdict;
  }

  if (verdict.state === "unknown") {
    logger.warn("availability_check_inconclusive", {
      holdId: hold.id,
      propertyId: hold.propertyId,
      apartmentId: property.smoobuApartmentId,
      arrivalDate: hold.arrivalDate,
      departureDate: hold.departureDate,
      reason: verdict.reason,
    });
    return verdict;
  }

  // state === "open": Smoobu itself has a paid stay back on sale. Different
  // failure from the Geco one, and this time the check is the right instrument.
  logger.error("availability_reopened_under_confirmed_booking", {
    holdId: hold.id,
    bookingSessionId: hold.bookingSessionId,
    propertyId: hold.propertyId,
    propertyName: property.name,
    apartmentId: property.smoobuApartmentId,
    arrivalDate: hold.arrivalDate,
    departureDate: hold.departureDate,
    smoobuReservationId: hold.smoobuReservationId,
    action: "manual_intervention_required",
  });

  if (!remediate) {
    return verdict;
  }

  const restored = await restoreBlock(
    smoobuClient,
    { hold, property, notice: input.notice },
    logger,
    observability
  );

  if (!restored) {
    return verdict;
  }

  return checkDatesBookable(
    smoobuClient,
    {
      apartmentId: property.smoobuApartmentId,
      arrivalDate: hold.arrivalDate,
      departureDate: hold.departureDate,
      customerId: input.customerId,
      guests: input.guests,
    },
    observability
  );
}

/**
 * Last resort: the dates are genuinely open in Smoobu under a confirmed booking,
 * so put a Blocked-channel reservation back over them. Deliberately does NOT try
 * to recreate the website-channel reservation — taking the room off sale is
 * urgent, getting the channel label right is not.
 */
export async function restoreBlock(
  smoobuClient: SmoobuClient,
  input: { hold: HoldRecord; property: BookingProperty; notice: string },
  logger: ObservabilityLogger,
  observability?: RouteObservability
): Promise<number | undefined> {
  const { hold, property } = input;
  try {
    const response = await smoobuClient.createReservation<SmoobuCreateReservationResponse>(
      {
        arrivalDate: hold.arrivalDate,
        departureDate: hold.departureDate,
        channelId: BLOCKED_CHANNEL_ID,
        apartmentId: property.smoobuApartmentId,
        firstName: "AUTOMATIC",
        lastName: "RE-BLOCK",
        notice:
          `AUTOMATIC RE-BLOCK ${new Date().toISOString()} — these dates were found back on sale ` +
          `under a confirmed booking. Do not delete without checking hold ${hold.id}. ${input.notice}`,
        adults: 1,
        children: 0,
      },
      observability
    );
    const id = parseReservationId(response.data);
    logger.error("availability_reblock_created", {
      holdId: hold.id,
      apartmentId: property.smoobuApartmentId,
      reblockReservationId: id,
      action: "manual_intervention_required",
    });
    return id;
  } catch (err) {
    // A 4xx here usually means Smoobu now considers the dates taken after all
    // (someone else's reservation landed). That is still a conflict worth seeing.
    const providerStatus = err instanceof SmoobuProviderError ? err.providerStatusCode : undefined;
    logger.error("availability_reblock_failed", {
      holdId: hold.id,
      apartmentId: property.smoobuApartmentId,
      providerStatusCode: providerStatus,
      error: err instanceof Error ? err.message : String(err),
      action: "manual_intervention_required",
    });
    return undefined;
  }
}

// ─── helpers ──────────────────────────────────────────────────────────────────

/**
 * Keeps the notice bounded — only the most recent marker is kept, so a
 * reservation touched repeatedly over months does not accumulate a log.
 */
function appendReassertionMarker(notice: string, stamp: string, reason: string): string {
  const marker = `[availability re-asserted ${stamp} · ${reason}]`;
  const stripped = notice.replace(/\s*\[availability re-asserted [^\]]*\]/g, "").trimEnd();
  return `${stripped}\n${marker}`.trim();
}

export function parseAvailableApartmentIds(value: unknown): number[] {
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

export function parseUnavailableApartmentIds(errorMessages: unknown): Set<number> {
  if (!errorMessages || typeof errorMessages !== "object" || Array.isArray(errorMessages)) {
    return new Set();
  }
  return new Set(
    Object.keys(errorMessages)
      .map((key) => Number(key))
      .filter((id) => Number.isInteger(id))
  );
}

function parseReservationId(data: SmoobuCreateReservationResponse): number | undefined {
  if (typeof data?.id === "number" && Number.isInteger(data.id) && data.id > 0) {
    return data.id;
  }
  if (typeof data?.id === "string" && /^\d+$/.test(data.id)) {
    return Number(data.id);
  }
  return undefined;
}
