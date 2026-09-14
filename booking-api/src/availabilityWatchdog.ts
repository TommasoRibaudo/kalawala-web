/**
 * availabilityWatchdog.ts — two narrow jobs, deliberately not one broad one.
 *
 * ─── What this is for, and what it cannot do ─────────────────────────────────
 *
 * The 2026-09-12 Geco overbooking happened while **Smoobu was correct**. The
 * room was on sale only on Booking.com, whose ARI queue had applied the
 * promotion's "open" push and dropped the "close" that followed. So asking
 * Smoobu whether the stay is blocked — the obvious thing for a watchdog to do —
 * would have answered "fine" for all 36 hours. This worker does not claim to
 * detect that incident by checking. It has two separate jobs with different
 * reach:
 *
 *   MODE "reassert"  Aimed at the Geco failure. After a promotion that used
 *                    delete-then-create, make Smoobu re-emit one "these dates
 *                    are taken" push to every channel, a short delay later, so
 *                    a dropped close-push gets a second chance to land. It
 *                    verifies nothing — it re-sends. Scoped to reservations
 *                    that just went through a channel transition.
 *
 *   MODE "sweep"     Aimed at a different family: a stay that is genuinely open
 *                    in Smoobu itself (failed create, stray cancel, someone
 *                    deleting a reservation by hand). Read-only across the book;
 *                    it writes only when it finds something actually wrong.
 *
 * ─── Why the modes are split ─────────────────────────────────────────────────
 *
 * The first draft of this file re-asserted every confirmed future stay on a
 * 15-minute timer. With ~135 future reservations that is ~12,900 writes a day,
 * each fanning out to Booking.com and Airbnb — ~25,800 channel pushes daily, to
 * mitigate a fault caused by two pushes arriving out of order. It would have
 * been an amplifier for the disease, and it would have buried any real signal in
 * ARI noise. A re-assertion is only worth sending where a transition actually
 * happened.
 *
 * Steady-state cost now:
 *   reassert  ~1 write per website confirmation (a few a week), and none at all
 *             once SMOOBU_HOLD_CHANNEL_ID=70 removes the transition entirely.
 *   sweep     ~135 reads once a day; zero writes on a healthy book.
 */

import { HoldRecord, HoldRepository, SmoobuHoldChannelId } from "./holds";
import { BOOKING_PROPERTIES_BY_ID } from "./propertyCatalog";
import { checkSmoobuHasStayBlocked, reassertChannelBlock } from "./availabilityGuard";
import type { SmoobuClient } from "./smoobuClient";
import { ObservabilityLogger } from "./types";

export type WatchdogMode = "reassert" | "sweep";

export interface AvailabilityWatchdogFinding {
  holdId: string;
  bookingSessionId: string;
  propertyId: string;
  propertyName: string;
  smoobuApartmentId: number;
  arrivalDate: string;
  departureDate: string;
  smoobuReservationId?: number;
  kind: "reopened" | "inconclusive" | "unknown_property";
  detail?: string;
}

export interface AvailabilityWatchdogResult {
  mode: WatchdogMode;
  checked: number;
  closed: number;
  reopened: number;
  inconclusive: number;
  reasserted: number;
  reassertFailed: number;
  findings: AvailabilityWatchdogFinding[];
}

export interface AvailabilityWatchdogDependencies {
  holds: HoldRepository;
  smoobuClient: SmoobuClient;
  logger: ObservabilityLogger;
  mode: WatchdogMode;
  customerId?: number;
  /** The channel new holds are created on. Decides whether re-assertion is still needed at all. */
  holdChannelId?: SmoobuHoldChannelId;
  /** Defaults to now. Injected in tests. */
  now?: () => Date;
  /** Safety valve so one sweep cannot blow through Smoobu's rate limit. */
  maxStays?: number;
  /** Sweep only stays arriving within this many days. Omit for the whole book. */
  horizonDays?: number;
}

/**
 * Re-assert window. A promotion's two pushes need to have settled before the
 * corrective one is sent — firing at +200ms would just join the same burst and
 * could make the ordering worse, which is the whole reason the delay exists.
 * The upper bound keeps the set small and bounded when the worker is late.
 */
const REASSERT_MIN_AGE_MS = 90_000;
const REASSERT_MAX_AGE_MS = 25 * 60_000;

const DEFAULT_MAX_STAYS = 400;

export async function runAvailabilityWatchdog(
  deps: AvailabilityWatchdogDependencies
): Promise<AvailabilityWatchdogResult> {
  return deps.mode === "reassert" ? runReassertPass(deps) : runSweepPass(deps);
}

// ─── MODE "reassert" ─────────────────────────────────────────────────────────

/**
 * One corrective close-push per recently promoted stay.
 *
 * This is the only part of the system that reaches the Booking.com failure mode
 * from the Geco incident, and it does so blindly: we cannot read that channel's
 * inventory, so we simply re-state the truth and let it apply. A push that was
 * already applied correctly is a harmless no-op.
 */
async function runReassertPass(
  deps: AvailabilityWatchdogDependencies
): Promise<AvailabilityWatchdogResult> {
  const { holds, smoobuClient, logger } = deps;
  const now = (deps.now ?? (() => new Date()))();
  const result = emptyResult("reassert");

  // A hold born on the website channel is confirmed with a single PUT — no
  // delete, no create, no availability transition. There is nothing to correct,
  // so this pass retires itself the moment the real fix is switched on.
  const needed = deps.holdChannelId === undefined || deps.holdChannelId !== 70;
  if (!needed) {
    logger.debug("availability_reassert_not_required", {
      holdChannelId: deps.holdChannelId,
      note: "Holds are created on the website channel, so confirmations emit no availability change.",
    });
    return result;
  }

  const stays = await holds.listRecentlyConvertedStays({
    convertedAfter: new Date(now.getTime() - REASSERT_MAX_AGE_MS).toISOString(),
    convertedBefore: new Date(now.getTime() - REASSERT_MIN_AGE_MS).toISOString(),
    today: now.toISOString().slice(0, 10),
  });

  if (stays.length === 0) {
    logger.debug("availability_reassert_empty", {});
    return result;
  }

  for (const hold of stays) {
    const property = BOOKING_PROPERTIES_BY_ID.get(hold.propertyId);
    if (!property || !hold.smoobuReservationId) {
      continue;
    }
    const ok = await reassertChannelBlock(
      smoobuClient,
      {
        smoobuReservationId: hold.smoobuReservationId,
        notice: noticeFor(hold, property.name),
        reason: "post_promotion_channel_resync",
      },
      logger
    );
    if (ok) {
      result.reasserted += 1;
    } else {
      result.reassertFailed += 1;
    }
  }

  logger.info("availability_reassert_completed", {
    stays: stays.length,
    reasserted: result.reasserted,
    reassertFailed: result.reassertFailed,
  });

  return result;
}

// ─── MODE "sweep" ────────────────────────────────────────────────────────────

/**
 * Read-only pass over confirmed future stays.
 *
 * Catches the Smoobu-side failures — a stay that is genuinely bookable at the
 * source — and nothing else. Writes only where it finds one, so a healthy book
 * produces zero channel traffic.
 */
async function runSweepPass(
  deps: AvailabilityWatchdogDependencies
): Promise<AvailabilityWatchdogResult> {
  const { holds, smoobuClient, logger } = deps;
  const now = (deps.now ?? (() => new Date()))();
  const today = now.toISOString().slice(0, 10);
  const maxStays = deps.maxStays ?? DEFAULT_MAX_STAYS;
  const result = emptyResult("sweep");

  let stays = await holds.listConfirmedFutureStays(today);

  if (deps.horizonDays !== undefined) {
    const cutoff = new Date(now.getTime() + deps.horizonDays * 86_400_000).toISOString().slice(0, 10);
    stays = stays.filter((hold) => hold.arrivalDate <= cutoff);
  }

  if (stays.length === 0) {
    logger.debug("availability_sweep_empty", { today });
    return result;
  }

  if (stays.length > maxStays) {
    // Truncating silently would mean the newest bookings — the ones most likely
    // to have just been promoted — go unchecked. Say so.
    logger.warn("availability_sweep_truncated", {
      total: stays.length,
      maxStays,
      note: "Some confirmed stays were not checked this run. Raise maxStays or narrow horizonDays.",
    });
  }

  logger.info("availability_sweep_started", { today, stays: Math.min(stays.length, maxStays) });

  for (const hold of stays.slice(0, maxStays)) {
    await sweepOneStay(hold, deps, result);
  }

  const level = result.reopened > 0 ? "error" : "info";
  logger[level]("availability_sweep_completed", {
    checked: result.checked,
    closed: result.closed,
    reopened: result.reopened,
    inconclusive: result.inconclusive,
    note: "Smoobu-side only. A clean sweep is not evidence that Booking.com or Airbnb agree.",
    ...(result.reopened > 0 ? { action: "manual_intervention_required" } : {}),
  });

  return result;
}

async function sweepOneStay(
  hold: HoldRecord,
  deps: AvailabilityWatchdogDependencies,
  result: AvailabilityWatchdogResult
): Promise<void> {
  const { smoobuClient, logger } = deps;

  const property = BOOKING_PROPERTIES_BY_ID.get(hold.propertyId);
  if (!property) {
    // A hold pointing at a property the catalog no longer knows is itself a
    // problem: nothing can check or re-block it.
    result.findings.push({
      holdId: hold.id,
      bookingSessionId: hold.bookingSessionId,
      propertyId: hold.propertyId,
      propertyName: "(unknown)",
      smoobuApartmentId: -1,
      arrivalDate: hold.arrivalDate,
      departureDate: hold.departureDate,
      smoobuReservationId: hold.smoobuReservationId,
      kind: "unknown_property",
    });
    logger.warn("availability_sweep_unknown_property", { holdId: hold.id, propertyId: hold.propertyId });
    return;
  }

  result.checked += 1;

  const verdict = await checkSmoobuHasStayBlocked(
    smoobuClient,
    {
      hold,
      property,
      notice: noticeFor(hold, property.name),
      customerId: deps.customerId,
    },
    logger
  );

  if (verdict.state === "closed") {
    result.closed += 1;
    return;
  }

  if (verdict.state === "unknown") {
    result.inconclusive += 1;
    result.findings.push({
      holdId: hold.id,
      bookingSessionId: hold.bookingSessionId,
      propertyId: hold.propertyId,
      propertyName: property.name,
      smoobuApartmentId: property.smoobuApartmentId,
      arrivalDate: hold.arrivalDate,
      departureDate: hold.departureDate,
      smoobuReservationId: hold.smoobuReservationId,
      kind: "inconclusive",
      detail: verdict.reason,
    });
    return;
  }

  // Still open after checkSmoobuHasStayBlocked tried to re-block it.
  result.reopened += 1;
  logger.error("availability_watchdog_stay_on_sale", {
    holdId: hold.id,
    bookingSessionId: hold.bookingSessionId,
    propertyName: property.name,
    smoobuApartmentId: property.smoobuApartmentId,
    arrivalDate: hold.arrivalDate,
    departureDate: hold.departureDate,
    smoobuReservationId: hold.smoobuReservationId,
    action: "manual_intervention_required",
  });
  result.findings.push({
    holdId: hold.id,
    bookingSessionId: hold.bookingSessionId,
    propertyId: hold.propertyId,
    propertyName: property.name,
    smoobuApartmentId: property.smoobuApartmentId,
    arrivalDate: hold.arrivalDate,
    departureDate: hold.departureDate,
    smoobuReservationId: hold.smoobuReservationId,
    kind: "reopened",
  });
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function emptyResult(mode: WatchdogMode): AvailabilityWatchdogResult {
  return {
    mode,
    checked: 0,
    closed: 0,
    reopened: 0,
    inconclusive: 0,
    reasserted: 0,
    reassertFailed: 0,
    findings: [],
  };
}

function noticeFor(hold: HoldRecord, propertyName: string): string {
  return `Kalawala website booking — ${propertyName} ${hold.arrivalDate} to ${hold.departureDate} (hold ${hold.id}).`;
}
