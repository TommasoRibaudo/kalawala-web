/**
 * Regression tests for the 2026-09-12 Geco overbooking.
 *
 * Website booking KWL-AFFJYUR6 took Casa Geco for 25–27 Sep. Confirming the
 * deposit ran promoteSmoobuReservation, which DELETEs the blocked-channel hold
 * and CREATEs a website-channel reservation. Both Smoobu calls succeeded, but the
 * pair emitted an "open" push immediately followed by a "close" push to every
 * connected channel, and Booking.com applied them out of order for the night of
 * the 26th. That night stayed on sale for ~36 hours and was sold to a second
 * guest. Smoobu then dropped the colliding leg of the inbound reservation
 * silently, so nothing anywhere flagged an overbooking.
 *
 * These tests pin what each safeguard actually does — including, explicitly,
 * that a Smoobu availability check would NOT have caught this incident. The
 * temptation to describe that check as "verification" is exactly the mistake
 * these tests exist to prevent.
 */

import { BookingSessionRecord } from "./bookingSessions";
import { InMemoryHoldRepository } from "./holds";
import { promoteSmoobuReservation } from "./smoobuPromotion";
import { checkDatesBookable, reassertChannelBlock } from "./availabilityGuard";
import { runAvailabilityWatchdog } from "./availabilityWatchdog";
import { SmoobuClient } from "./smoobuClient";
import { StaticSecretProvider } from "./secrets";
import { BookingApiConfig, ObservabilityLogger, RouteObservability } from "./types";

const GECO_PROPERTY_ID = "b8a1f2e7-86d3-4c30-8f6a-8046a5f9a111";
const GECO_APARTMENT_ID = 301061;
const SESSION_ID = "22222222-2222-4222-8222-222222222222";
const OLD_RESERVATION_ID = 555001;
const NEW_WEBSITE_RESERVATION_ID = 556100;

const originalFetch = global.fetch;

interface RecordedCall {
  method: string;
  pathname: string;
  body?: Record<string, unknown>;
}

function createConfig(overrides: { holdChannelId?: 11 | 13 | 70 } = {}): BookingApiConfig {
  return {
    allowedOrigins: ["https://kalawala.test"],
    maxBodyBytes: 64 * 1024,
    secrets: new StaticSecretProvider({
      smoobuApiKey: "smoobu-secret-value",
      smoobuApiSecret: "smoobu-api-secret-value",
      smoobuWebhookSecret: "smoobu-webhook-secret-value",
      paypalClientId: "paypal-client-id-value",
      paypalClientSecret: "paypal-client-secret-value",
      paypalWebhookId: "paypal-webhook-id-value",
      bookingEncryptionKeyBase64: Buffer.alloc(32, 7).toString("base64"),
      portalSessionSecret: "portal-session-secret-value",
      rdsConnectionString: "postgres://booking_user:pw@db.test:5432/kalawala",
    }),
    smoobu: {
      baseUrl: "https://login.smoobu.com",
      customerId: 9,
      timeoutMs: 8_000,
      maxRetries: 0,
      baseBackoffMs: 250,
      maxBackoffMs: 2_000,
      maxRateLimitDelayMs: 60_000,
      holdChannelId: overrides.holdChannelId ?? 11,
    },
    paypal: { baseUrl: "https://api-m.sandbox.paypal.com", timeoutMs: 10_000, orderReturnUrl: "", orderCancelUrl: "" },
    hold: { defaultTtlMinutes: 60, idempotencyTtlMinutes: 1440, staleIdempotencyLockSeconds: 120 },
    abuseProtection: { enabled: false, captchaChallengesEnabled: false, maxTrackedBuckets: 100 },
    email: { fromAddress: "test@kalawala.com", region: "us-east-1", disabled: true },
    observability: { serviceName: "booking-api", environment: "test", logLevel: "silent", metricsEnabled: false },
  } as unknown as BookingApiConfig;
}

function createObservability(): RouteObservability {
  return {
    logger: createLogger(),
    recordProviderCall: jest.fn(),
    recordStateTransition: jest.fn(),
    recordSecurityEvent: jest.fn(),
  };
}

function createLogger(): ObservabilityLogger {
  return { debug: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn() };
}

function createSession(): BookingSessionRecord {
  return {
    id: SESSION_ID,
    reservationPublicId: "KWL-AFFJYUR6",
    propertyId: GECO_PROPERTY_ID,
    arrivalDate: "2026-09-25",
    departureDate: "2026-09-27",
    guests: 3,
    language: "en",
    guest: { firstName: "Melina", lastName: "Venegas Salazar", email: "melina@example.com" },
    totalAmountCents: 28800,
  } as unknown as BookingSessionRecord;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

/**
 * Records every Smoobu call so a test can assert on the *sequence* of inventory
 * operations, not just the end state. For this incident the sequence is the bug.
 */
function mockSmoobu(handlers: {
  onDelete?: () => Response;
  onCreate?: (body: Record<string, unknown>) => Response;
  onUpdate?: (body: Record<string, unknown>) => Response;
  availableApartmentIds?: number[];
}): RecordedCall[] {
  const calls: RecordedCall[] = [];
  global.fetch = jest.fn(async (url: string | URL, init?: RequestInit) => {
    const { pathname } = new URL(url.toString());
    const method = (init?.method ?? "GET").toUpperCase();
    const body = init?.body ? (JSON.parse(String(init.body)) as Record<string, unknown>) : undefined;
    calls.push({ method, pathname, body });

    if (pathname === "/booking/checkApartmentAvailability") {
      const available = handlers.availableApartmentIds ?? [];
      return json({
        availableApartments: available,
        errorMessages: available.includes(GECO_APARTMENT_ID) ? {} : { [GECO_APARTMENT_ID]: "not available" },
        prices: {},
      });
    }
    if (method === "DELETE" && pathname.startsWith("/api/reservations/")) {
      return handlers.onDelete ? handlers.onDelete() : json({ success: true });
    }
    if (method === "POST" && pathname === "/api/reservations") {
      return handlers.onCreate ? handlers.onCreate(body ?? {}) : json({ id: NEW_WEBSITE_RESERVATION_ID });
    }
    if (method === "PUT" && pathname.startsWith("/api/reservations/")) {
      return handlers.onUpdate ? handlers.onUpdate(body ?? {}) : json({ success: true });
    }
    return json({ detail: "unexpected" }, 500);
  }) as typeof fetch;
  return calls;
}

async function seedConfirmedHold(
  holds: InMemoryHoldRepository,
  channelId: 11 | 13 | 70,
  reservationId = OLD_RESERVATION_ID
) {
  const hold = await holds.createCreatingHold({
    bookingSessionId: SESSION_ID,
    propertyId: GECO_PROPERTY_ID,
    arrivalDate: "2026-09-25",
    departureDate: "2026-09-27",
    expiresAt: "2026-09-13T00:00:00.000Z",
    smoobuChannelId: channelId,
    smoobuCreatePayloadHash: "hash",
  });
  await holds.activateHold({ holdId: hold.id, smoobuReservationId: reservationId });
  await holds.markHoldConfirmed(hold.id);
  return (await holds.getByBookingSessionId(SESSION_ID))!;
}

afterEach(() => {
  global.fetch = originalFetch;
  jest.restoreAllMocks();
});

// ─── The fix: a website-channel hold never reopens inventory ─────────────────

test("a hold already on the website channel is confirmed without any delete or create", async () => {
  const calls = mockSmoobu({ availableApartmentIds: [] });

  const holds = new InMemoryHoldRepository();
  const hold = await seedConfirmedHold(holds, 70);

  const result = await promoteSmoobuReservation(
    { session: createSession(), hold, notice: "confirmed", amountCents: 28800 },
    holds,
    createConfig({ holdChannelId: 70 }),
    createObservability()
  );

  expect(result.promoted).toBe(true);
  // This is the whole point: the confirmation emitted no availability change, so
  // there was never an "open" push for a channel to apply out of order.
  expect(calls.filter((call) => call.method === "DELETE")).toHaveLength(0);
  expect(calls.filter((call) => call.method === "POST" && call.pathname === "/api/reservations")).toHaveLength(0);
  expect(result.inventoryExposureMs).toBe(0);
});

test("the delete-then-create path measures how long the dates were exposed", async () => {
  mockSmoobu({ availableApartmentIds: [] });

  const holds = new InMemoryHoldRepository();
  const hold = await seedConfirmedHold(holds, 11);

  const result = await promoteSmoobuReservation(
    { session: createSession(), hold, notice: "confirmed", amountCents: 28800 },
    holds,
    createConfig(),
    createObservability()
  );

  expect(result.promoted).toBe(true);
  // Reported rather than assumed to be zero — this is the number that tells us
  // whether the legacy path is degrading.
  expect(typeof result.inventoryExposureMs).toBe("number");
  expect(result.inventoryExposureMs).toBeGreaterThanOrEqual(0);
});

test("the create payload is built before the old block is deleted", async () => {
  // If the payload were built after the delete, a property-catalog miss would
  // throw *inside* the window and leave the dates open with no create attempted.
  const calls = mockSmoobu({ availableApartmentIds: [] });

  const holds = new InMemoryHoldRepository();
  const hold = await seedConfirmedHold(holds, 11);

  await promoteSmoobuReservation(
    { session: createSession(), hold, notice: "confirmed", amountCents: 28800 },
    holds,
    createConfig(),
    createObservability()
  );

  const deleteIndex = calls.findIndex((call) => call.method === "DELETE");
  const createIndex = calls.findIndex((call) => call.method === "POST" && call.pathname === "/api/reservations");
  expect(deleteIndex).toBeGreaterThanOrEqual(0);
  expect(createIndex).toBe(deleteIndex + 1);
});

test("promotion does NOT fire an immediate corrective push", async () => {
  // Deliberate. A re-assert 200ms after the create joins the same burst as the
  // delete and the create — it is more ARI traffic racing in the same queue,
  // which is the ordering problem rather than the fix. The corrective push is
  // the watchdog's "reassert" pass, ~90s+ later.
  const calls = mockSmoobu({ availableApartmentIds: [] });

  const holds = new InMemoryHoldRepository();
  const hold = await seedConfirmedHold(holds, 11);

  await promoteSmoobuReservation(
    { session: createSession(), hold, notice: "confirmed", amountCents: 28800 },
    holds,
    createConfig(),
    createObservability()
  );

  expect(calls.filter((call) => call.method === "PUT")).toHaveLength(0);
  // It does still check Smoobu's own state — a read, catching the other half of
  // the failure space where the create silently did not take.
  expect(calls.filter((call) => call.pathname === "/booking/checkApartmentAvailability")).toHaveLength(1);
});

// ─── checkDatesBookable: never guess "safe" ──────────────────────────────────

test("checkDatesBookable reports open, closed and unknown distinctly", async () => {
  const client = () =>
    new SmoobuClient({ apiKey: "k", apiSecret: "s", config: { baseUrl: "https://login.smoobu.com" } });

  mockSmoobu({ availableApartmentIds: [GECO_APARTMENT_ID] });
  await expect(
    checkDatesBookable(client(), {
      apartmentId: GECO_APARTMENT_ID,
      arrivalDate: "2026-09-25",
      departureDate: "2026-09-27",
    })
  ).resolves.toEqual({ state: "open" });

  mockSmoobu({ availableApartmentIds: [] });
  await expect(
    checkDatesBookable(client(), {
      apartmentId: GECO_APARTMENT_ID,
      arrivalDate: "2026-09-25",
      departureDate: "2026-09-27",
    })
  ).resolves.toEqual({ state: "closed" });

  // A provider failure must never read as "closed" — that would silence the alarm.
  global.fetch = jest.fn(async () => json({ detail: "boom" }, 500)) as typeof fetch;
  const verdict = await checkDatesBookable(client(), {
    apartmentId: GECO_APARTMENT_ID,
    arrivalDate: "2026-09-25",
    departureDate: "2026-09-27",
  });
  expect(verdict.state).toBe("unknown");
});

test("reassertChannelBlock only ever writes a notice, never touches dates or status", async () => {
  const calls = mockSmoobu({});
  const client = new SmoobuClient({
    apiKey: "k",
    apiSecret: "s",
    config: { baseUrl: "https://login.smoobu.com" },
  });

  await reassertChannelBlock(
    client,
    { smoobuReservationId: NEW_WEBSITE_RESERVATION_ID, notice: "original notice", reason: "test" },
    createLogger()
  );

  const put = calls.find((call) => call.method === "PUT");
  expect(put).toBeDefined();
  expect(Object.keys(put?.body ?? {})).toEqual(["notice"]);
  expect(String(put?.body?.notice)).toContain("original notice");
});

test("repeated re-assertions do not grow the notice without bound", async () => {
  let notice = "Kalawala booking KWL-AFFJYUR6.";
  for (let i = 0; i < 5; i += 1) {
    const calls = mockSmoobu({});
    // SmoobuClient captures global.fetch at construction, so it must be built
    // after the mock is installed for this iteration.
    const client = new SmoobuClient({
      apiKey: "k",
      apiSecret: "s",
      config: { baseUrl: "https://login.smoobu.com" },
    });
    await reassertChannelBlock(
      client,
      { smoobuReservationId: NEW_WEBSITE_RESERVATION_ID, notice, reason: "watchdog_channel_resync" },
      createLogger()
    );
    notice = String(calls.find((call) => call.method === "PUT")?.body?.notice ?? "");
  }

  expect(notice).toContain("Kalawala booking KWL-AFFJYUR6.");
  expect(notice.match(/availability re-asserted/g)).toHaveLength(1);
});

// ─── What the Smoobu check can and cannot see ────────────────────────────────

test("REGRESSION: a Smoobu check reports 'closed' in exactly the Geco situation", async () => {
  // The whole point. During the 36-hour exposure, Smoobu had Geco occupied and
  // Booking.com had it on sale. Any watchdog that asks Smoobu gets "fine".
  // If this test ever starts failing, someone has changed the semantics and the
  // documentation elsewhere needs rewriting to match.
  mockSmoobu({ availableApartmentIds: [] }); // Smoobu: not bookable — i.e. correct

  const client = new SmoobuClient({ apiKey: "k", apiSecret: "s", config: { baseUrl: "https://login.smoobu.com" } });
  const verdict = await checkDatesBookable(client, {
    apartmentId: GECO_APARTMENT_ID,
    arrivalDate: "2026-09-25",
    departureDate: "2026-09-27",
  });

  expect(verdict).toEqual({ state: "closed" });
  // "closed" means Smoobu agrees. It is not evidence about Booking.com, and the
  // sweep must not be described as if it were.
});

// ─── The watchdog: reassert mode ─────────────────────────────────────────────

test("reassert sends exactly one corrective push per recently promoted stay", async () => {
  const calls = mockSmoobu({});

  const holds = new InMemoryHoldRepository();
  await seedConfirmedHold(holds, 70, NEW_WEBSITE_RESERVATION_ID);

  const result = await runAvailabilityWatchdog({
    holds,
    smoobuClient: new SmoobuClient({ apiKey: "k", apiSecret: "s", config: { baseUrl: "https://login.smoobu.com" } }),
    logger: createLogger(),
    mode: "reassert",
    holdChannelId: 11,
    // The seeded hold's updatedAt is "now", so look from the future to place it
    // inside the 90s–25min window.
    now: () => new Date(Date.now() + 5 * 60_000),
  });

  expect(result.reasserted).toBe(1);
  expect(calls.filter((call) => call.method === "PUT")).toHaveLength(1);
  // Never reads, creates or deletes on this pass.
  expect(calls.some((call) => call.pathname === "/booking/checkApartmentAvailability")).toBe(false);
  expect(calls.some((call) => call.method === "DELETE")).toBe(false);
});

test("reassert does nothing at all once holds are created on the website channel", async () => {
  // The mitigation retires itself when the real fix lands: a channel-70 hold is
  // confirmed with a single PUT, so no availability transition ever happens and
  // there is nothing to correct.
  const calls = mockSmoobu({});

  const holds = new InMemoryHoldRepository();
  await seedConfirmedHold(holds, 70, NEW_WEBSITE_RESERVATION_ID);

  const result = await runAvailabilityWatchdog({
    holds,
    smoobuClient: new SmoobuClient({ apiKey: "k", apiSecret: "s", config: { baseUrl: "https://login.smoobu.com" } }),
    logger: createLogger(),
    mode: "reassert",
    holdChannelId: 70,
    now: () => new Date(Date.now() + 5 * 60_000),
  });

  expect(result.reasserted).toBe(0);
  expect(calls).toHaveLength(0);
});

test("reassert skips a stay that was promoted seconds ago", async () => {
  // Firing inside the promotion's own burst would join the ordering problem
  // rather than correct it. The delay is the mechanism.
  const calls = mockSmoobu({});

  const holds = new InMemoryHoldRepository();
  await seedConfirmedHold(holds, 11, NEW_WEBSITE_RESERVATION_ID);

  const result = await runAvailabilityWatchdog({
    holds,
    smoobuClient: new SmoobuClient({ apiKey: "k", apiSecret: "s", config: { baseUrl: "https://login.smoobu.com" } }),
    logger: createLogger(),
    mode: "reassert",
    holdChannelId: 11,
    now: () => new Date(),
  });

  expect(result.reasserted).toBe(0);
  expect(calls).toHaveLength(0);
});

// ─── The watchdog: sweep mode ────────────────────────────────────────────────

test("REGRESSION: a healthy sweep writes nothing — no channel pushes at all", async () => {
  // The first draft re-asserted every confirmed future stay every 15 minutes:
  // ~12,900 writes a day, each fanning out to Booking.com and Airbnb. That is
  // the same ARI traffic whose mis-ordering caused the incident. A clean sweep
  // must cost reads only.
  const calls = mockSmoobu({ availableApartmentIds: [] });

  const holds = new InMemoryHoldRepository();
  await seedConfirmedHold(holds, 70, NEW_WEBSITE_RESERVATION_ID);

  const result = await runAvailabilityWatchdog({
    holds,
    smoobuClient: new SmoobuClient({ apiKey: "k", apiSecret: "s", config: { baseUrl: "https://login.smoobu.com" } }),
    logger: createLogger(),
    mode: "sweep",
    now: () => new Date("2026-09-14T12:00:00Z"),
  });

  expect(result.checked).toBe(1);
  expect(result.closed).toBe(1);
  expect(calls.filter((call) => call.pathname === "/booking/checkApartmentAvailability")).toHaveLength(1);
  expect(calls.filter((call) => call.method === "PUT")).toHaveLength(0);
  expect(calls.filter((call) => call.method === "POST" && call.pathname === "/api/reservations")).toHaveLength(0);
  expect(calls.filter((call) => call.method === "DELETE")).toHaveLength(0);
});

test("sweep alerts and re-blocks when Smoobu itself has a confirmed stay on sale", async () => {
  const calls = mockSmoobu({ availableApartmentIds: [GECO_APARTMENT_ID] });

  const holds = new InMemoryHoldRepository();
  await seedConfirmedHold(holds, 70, NEW_WEBSITE_RESERVATION_ID);

  const logger = createLogger();
  const result = await runAvailabilityWatchdog({
    holds,
    smoobuClient: new SmoobuClient({ apiKey: "k", apiSecret: "s", config: { baseUrl: "https://login.smoobu.com" } }),
    logger,
    mode: "sweep",
    now: () => new Date("2026-09-14T12:00:00Z"),
  });

  expect(result.reopened).toBe(1);
  expect(result.findings[0]).toMatchObject({ kind: "reopened", propertyName: "Casa Geco" });
  expect(logger.error).toHaveBeenCalledWith("availability_watchdog_stay_on_sale", expect.anything());

  // Taking the room off sale is urgent; the channel label is not — so the
  // remediation is a Blocked-channel (11) reservation, not a website one.
  const reblock = calls.find((call) => call.method === "POST" && call.pathname === "/api/reservations");
  expect(reblock?.body?.channelId).toBe(11);
  expect(reblock?.body?.apartmentId).toBe(GECO_APARTMENT_ID);
});

test("sweep ignores stays that have already departed", async () => {
  mockSmoobu({ availableApartmentIds: [GECO_APARTMENT_ID] });

  const holds = new InMemoryHoldRepository();
  await seedConfirmedHold(holds, 70, NEW_WEBSITE_RESERVATION_ID);

  const result = await runAvailabilityWatchdog({
    holds,
    smoobuClient: new SmoobuClient({ apiKey: "k", apiSecret: "s", config: { baseUrl: "https://login.smoobu.com" } }),
    logger: createLogger(),
    mode: "sweep",
    now: () => new Date("2026-10-01T12:00:00Z"),
  });

  expect(result.checked).toBe(0);
});

test("sweep honours a near-term horizon", async () => {
  mockSmoobu({ availableApartmentIds: [] });

  const holds = new InMemoryHoldRepository();
  await seedConfirmedHold(holds, 70, NEW_WEBSITE_RESERVATION_ID);

  const result = await runAvailabilityWatchdog({
    holds,
    smoobuClient: new SmoobuClient({ apiKey: "k", apiSecret: "s", config: { baseUrl: "https://login.smoobu.com" } }),
    logger: createLogger(),
    mode: "sweep",
    horizonDays: 3, // arrival is 25 Sep, 11 days out
    now: () => new Date("2026-09-14T12:00:00Z"),
  });

  expect(result.checked).toBe(0);
});

// ─── Conflict detection against inbound channel reservations ─────────────────

test("findOverlappingHolds treats a same-day turnover as no conflict", async () => {
  const holds = new InMemoryHoldRepository();
  await seedConfirmedHold(holds, 70, NEW_WEBSITE_RESERVATION_ID);

  // Arrives the day the existing stay departs — legal.
  await expect(
    holds.findOverlappingHolds({
      propertyId: GECO_PROPERTY_ID,
      arrivalDate: "2026-09-27",
      departureDate: "2026-09-29",
    })
  ).resolves.toHaveLength(0);

  // The Geco incident's shape: one night inside an existing two-night stay.
  await expect(
    holds.findOverlappingHolds({
      propertyId: GECO_PROPERTY_ID,
      arrivalDate: "2026-09-26",
      departureDate: "2026-09-27",
    })
  ).resolves.toHaveLength(1);
});

test("findOverlappingHolds can exclude the reservation being examined", async () => {
  const holds = new InMemoryHoldRepository();
  await seedConfirmedHold(holds, 70, NEW_WEBSITE_RESERVATION_ID);

  await expect(
    holds.findOverlappingHolds({
      propertyId: GECO_PROPERTY_ID,
      arrivalDate: "2026-09-25",
      departureDate: "2026-09-27",
      excludeSmoobuReservationId: NEW_WEBSITE_RESERVATION_ID,
    })
  ).resolves.toHaveLength(0);
});
