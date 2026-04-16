import { ApiError } from "./http/errors";
import { jsonResponse } from "./http/response";
import { BOOKING_PROPERTIES, BookingProperty } from "./propertyCatalog";
import { createSmoobuClient } from "./smoobuClient";
import { ApiResponse, BookingApiConfig, HeadersMap, JsonBody, RouteObservability } from "./types";

const CALENDAR_CACHE_TTL_MS = 5 * 60 * 1000;
const DEFAULT_CURRENCY = "USD";
const LOW_PRICE_THRESHOLD = 0.9;
const HIGH_PRICE_THRESHOLD = 1.1;

type PriceDot = "green" | "yellow" | "red" | "grey";
type CacheStatus = "hit" | "miss";

interface CalendarRequest {
  apartmentSlug: string;
  month: string;
  language: "en" | "es";
}

interface SmoobuRatesResponse {
  data?: unknown;
}

interface SmoobuRateDay {
  price?: unknown;
  min_length_of_stay?: unknown;
  available?: unknown;
}

interface CalendarDay {
  date: string;
  available: boolean;
  priceCents: number | null;
  minStay: number | null;
  dot: PriceDot;
  ariaLabelKey: string;
}

interface CalendarStats {
  availableNightCount: number;
  minPriceCents: number | null;
  maxPriceCents: number | null;
  averagePriceCents: number | null;
}

interface CalendarPayload {
  property: {
    propertyId: string;
    slug: string;
    name: string;
  };
  month: string;
  currency: string;
  days: CalendarDay[];
  stats: CalendarStats;
}

interface CalendarCacheEntry {
  payload: CalendarPayload;
  generatedAt: string;
  expiresAtMs: number;
}

const calendarRatesCache = new Map<string, CalendarCacheEntry>();

export async function handleCalendarRequest(
  request: CalendarRequest,
  config: BookingApiConfig,
  responseHeaders: HeadersMap,
  observability: RouteObservability,
  now: () => number = Date.now
): Promise<ApiResponse> {
  const property = getPropertyBySlug(request.apartmentSlug);
  if (!property) {
    throw new ApiError(404, "property_not_found", "Property was not found.");
  }

  const cacheKey = calendarCacheKey(property.smoobuApartmentId, request.month);
  const cached = calendarRatesCache.get(cacheKey);
  const nowMs = now();
  if (cached && cached.expiresAtMs > nowMs) {
    return jsonResponse(
      200,
      withCache(cached.payload, "hit", cached.generatedAt, Math.ceil((cached.expiresAtMs - nowMs) / 1_000)),
      responseHeaders
    );
  }
  if (cached) {
    calendarRatesCache.delete(cacheKey);
  }

  const { startDate, endDate } = monthBounds(request.month);
  const smoobuClient = await createSmoobuClient(config);
  const rates = await smoobuClient.getRates<SmoobuRatesResponse>(
    {
      apartmentIds: [property.smoobuApartmentId],
      startDate,
      endDate,
    },
    observability
  );

  const payload = normalizeCalendarPayload(property, request.month, rates.data);
  const generatedAt = new Date(nowMs).toISOString();
  calendarRatesCache.set(cacheKey, {
    payload,
    generatedAt,
    expiresAtMs: nowMs + CALENDAR_CACHE_TTL_MS,
  });

  return jsonResponse(
    200,
    withCache(payload, "miss", generatedAt, CALENDAR_CACHE_TTL_MS / 1_000),
    responseHeaders
  );
}

export function invalidateCalendarRatesCache(filters: { apartmentId?: number; month?: string } = {}): number {
  let invalidated = 0;

  for (const key of Array.from(calendarRatesCache.keys())) {
    const [apartmentId, month] = key.split(":");
    const matchesApartment = filters.apartmentId === undefined || apartmentId === String(filters.apartmentId);
    const matchesMonth = filters.month === undefined || month === filters.month;

    if (matchesApartment && matchesMonth) {
      calendarRatesCache.delete(key);
      invalidated += 1;
    }
  }

  return invalidated;
}

export function clearCalendarRatesCache(): void {
  calendarRatesCache.clear();
}

export function invalidateCalendarRatesCacheFromWebhook(
  body: JsonBody,
  observability: RouteObservability
): { action?: string; invalidatedEntries: number } {
  const action = typeof body.action === "string" ? body.action : undefined;
  if (action !== "updateRates") {
    return { action, invalidatedEntries: 0 };
  }

  const apartmentId = extractWebhookApartmentId(body);
  const months = extractWebhookMonths(body);
  let invalidatedEntries = 0;

  if (!apartmentId) {
    invalidatedEntries = invalidateCalendarRatesCache();
  } else if (months.length === 0) {
    invalidatedEntries = invalidateCalendarRatesCache({ apartmentId });
  } else {
    for (const month of months) {
      invalidatedEntries += invalidateCalendarRatesCache({ apartmentId, month });
    }
  }

  observability.recordStateTransition({
    entityType: "webhook_event",
    toState: "processed",
    action: "smoobu_updateRates_cache_invalidation",
    success: true,
    provider: "smoobu",
    providerObjectId: apartmentId ? String(apartmentId) : undefined,
  });

  return { action, invalidatedEntries };
}

function normalizeCalendarPayload(property: BookingProperty, month: string, response: SmoobuRatesResponse): CalendarPayload {
  const rateDays = getApartmentRates(response, property.smoobuApartmentId);
  const days = enumerateMonthDates(month).map((date) => normalizeCalendarDay(date, rateDays[date]));
  const stats = computeStats(days);
  const classifiedDays = days.map((day) => {
    const dot = classifyDot(day, stats.averagePriceCents);
    return {
      ...day,
      dot,
      ariaLabelKey: ariaLabelKey(dot),
    };
  });

  return {
    property: {
      propertyId: property.propertyId,
      slug: property.slug,
      name: property.name,
    },
    month,
    currency: DEFAULT_CURRENCY,
    days: classifiedDays,
    stats,
  };
}

function getApartmentRates(response: SmoobuRatesResponse, apartmentId: number): Record<string, SmoobuRateDay> {
  const root = response && typeof response === "object" && "data" in response ? response.data : response;
  if (!root || typeof root !== "object" || Array.isArray(root)) {
    return {};
  }

  const apartmentRates = (root as Record<string, unknown>)[String(apartmentId)];
  if (!apartmentRates || typeof apartmentRates !== "object" || Array.isArray(apartmentRates)) {
    return {};
  }

  return apartmentRates as Record<string, SmoobuRateDay>;
}

function normalizeCalendarDay(date: string, rateDay: SmoobuRateDay | undefined): CalendarDay {
  const available = normalizeAvailable(rateDay?.available);
  const priceCents = normalizePriceCents(rateDay?.price);
  const minStay = normalizeMinStay(rateDay?.min_length_of_stay);

  return {
    date,
    available,
    priceCents,
    minStay,
    dot: "grey",
    ariaLabelKey: "calendar.unavailable",
  };
}

function computeStats(days: CalendarDay[]): CalendarStats {
  const availablePrices = days
    .filter((day) => day.available && day.priceCents !== null)
    .map((day) => day.priceCents as number);

  if (availablePrices.length === 0) {
    return {
      availableNightCount: 0,
      minPriceCents: null,
      maxPriceCents: null,
      averagePriceCents: null,
    };
  }

  const total = availablePrices.reduce((sum, price) => sum + price, 0);

  return {
    availableNightCount: availablePrices.length,
    minPriceCents: Math.min(...availablePrices),
    maxPriceCents: Math.max(...availablePrices),
    averagePriceCents: Math.round(total / availablePrices.length),
  };
}

function classifyDot(day: CalendarDay, averagePriceCents: number | null): PriceDot {
  if (!day.available || day.priceCents === null || averagePriceCents === null) {
    return "grey";
  }

  if (day.priceCents < averagePriceCents * LOW_PRICE_THRESHOLD) {
    return "green";
  }

  if (day.priceCents > averagePriceCents * HIGH_PRICE_THRESHOLD) {
    return "red";
  }

  return "yellow";
}

function ariaLabelKey(dot: PriceDot): string {
  if (dot === "grey") {
    return "calendar.unavailable";
  }
  if (dot === "green") {
    return "calendar.priceLow";
  }
  if (dot === "red") {
    return "calendar.priceHigh";
  }
  return "calendar.priceAverage";
}

function normalizeAvailable(value: unknown): boolean {
  if (typeof value === "number") {
    return value > 0;
  }
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    return value === "1" || value.toLowerCase() === "true";
  }
  return false;
}

function normalizePriceCents(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return null;
  }

  return Math.round(value * 100);
}

function normalizeMinStay(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }
  return null;
}

function getPropertyBySlug(slug: string): BookingProperty | undefined {
  const normalized = slug.toLowerCase();
  return BOOKING_PROPERTIES.find((property) => property.slug.toLowerCase() === normalized);
}

function withCache(payload: CalendarPayload, status: CacheStatus, generatedAt: string, ttlSeconds: number) {
  return {
    ...payload,
    cache: {
      status,
      ttlSeconds,
      generatedAt,
    },
  };
}

function calendarCacheKey(apartmentId: number, month: string): string {
  return `${apartmentId}:${month}`;
}

function monthBounds(month: string): { startDate: string; endDate: string } {
  const startDate = `${month}-01`;
  const [year, monthNumber] = month.split("-").map(Number);
  const lastDay = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
  return {
    startDate,
    endDate: `${month}-${String(lastDay).padStart(2, "0")}`,
  };
}

function enumerateMonthDates(month: string): string[] {
  const { startDate, endDate } = monthBounds(month);
  const dates: string[] = [];
  let currentMs = Date.parse(`${startDate}T00:00:00Z`);
  const endMs = Date.parse(`${endDate}T00:00:00Z`);

  while (currentMs <= endMs) {
    dates.push(new Date(currentMs).toISOString().slice(0, 10));
    currentMs += 86_400_000;
  }

  return dates;
}

function extractWebhookApartmentId(body: JsonBody): number | undefined {
  const data = getObject(body.data);
  const candidates = [
    data?.apartmentId,
    data?.apartmentID,
    data?.apartment_id,
    data?.apartment,
    body.apartmentId,
    body.apartmentID,
    body.apartment_id,
  ];

  for (const candidate of candidates) {
    const parsed = parsePositiveInteger(candidate);
    if (parsed !== undefined) {
      return parsed;
    }
  }

  return undefined;
}

function extractWebhookMonths(body: JsonBody): string[] {
  const data = getObject(body.data);
  const months = new Set<string>();
  const candidates = [
    data?.month,
    data?.date,
    data?.startDate,
    data?.endDate,
    data?.start_date,
    data?.end_date,
    data?.dates,
    body.month,
    body.date,
    body.startDate,
    body.endDate,
    body.start_date,
    body.end_date,
    body.dates,
  ];

  for (const candidate of candidates) {
    collectMonths(candidate, months);
  }

  return Array.from(months);
}

function collectMonths(value: unknown, months: Set<string>): void {
  if (Array.isArray(value)) {
    value.forEach((item) => collectMonths(item, months));
    return;
  }

  if (typeof value !== "string") {
    return;
  }

  // Smoobu rate-update operations can represent date ranges as
  // "YYYY-MM-DD:YYYY-MM-DD"; single webhook dates fall through unchanged.
  for (const dateLike of value.split(":")) {
    if (/^\d{4}-\d{2}$/.test(dateLike)) {
      months.add(dateLike);
      continue;
    }

    const match = /^(\d{4}-\d{2})-\d{2}$/.exec(dateLike);
    if (match) {
      months.add(match[1]);
    }
  }
}

function parsePositiveInteger(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }
  if (typeof value === "string" && /^\d+$/.test(value)) {
    return Number(value);
  }
  return undefined;
}

function getObject(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  return value as Record<string, unknown>;
}
