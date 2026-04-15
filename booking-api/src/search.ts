import { randomBytes, randomUUID } from "crypto";
import { ApiError } from "./http/errors";
import { jsonResponse } from "./http/response";
import { BOOKING_PROPERTIES, BOOKING_PROPERTIES_BY_SMOOBU_ID, BookingProperty, listingUrlForLanguage } from "./propertyCatalog";
import { createSmoobuClient } from "./smoobuClient";
import { ApiResponse, BookingApiConfig, HeadersMap, RouteObservability } from "./types";
import { SearchRequest } from "./validation";

// TODO: Persist quote/bookingSessionId to DB and enforce TTL server-side in hold creation (task 4.1).
const QUOTE_TTL_MS = 10 * 60 * 1000;

interface SmoobuAvailabilityResponse {
  availableApartments?: unknown;
  prices?: unknown;
  errorMessages?: unknown;
}

interface PriceQuote {
  currency: string;
  totalAmountCents: number;
  nightlyAverageCents: number;
  nights: number;
  includesTaxes: false;
  rateSource: "smoobu";
}

interface AvailabilityWarning {
  code: string;
  messageKey: string;
  propertyId?: string;
}

interface SearchQuote {
  bookingSessionId: string;
  quoteId: string;
  expiresAt: string;
}

export async function handleAvailabilitySearch(
  request: SearchRequest,
  config: BookingApiConfig,
  responseHeaders: HeadersMap,
  observability: RouteObservability
): Promise<ApiResponse> {
  const customerId = config.smoobu.customerId;
  if (!customerId) {
    throw new ApiError(503, "provider_config_missing", "Smoobu customer ID is not configured.", {
      retryable: false,
      fieldErrors: {
        smoobuCustomerId: ["required"],
      },
    });
  }

  const smoobuClient = await createSmoobuClient(config);
  const quote = createQuote();
  const apartmentIds = BOOKING_PROPERTIES.map((property) => property.smoobuApartmentId);
  const smoobuPayload = {
    arrivalDate: request.arrivalDate,
    departureDate: request.departureDate,
    apartments: apartmentIds,
    customerId,
    guests: request.guests,
    ...(request.discountCode ? { discountCode: request.discountCode } : {}),
  };

  const availability = await smoobuClient.checkApartmentAvailability<SmoobuAvailabilityResponse>(
    smoobuPayload,
    observability
  );
  const normalized = normalizeAvailability(availability.data, request);

  observability.recordStateTransition({
    entityType: "booking_session",
    toState: "quoted",
    action: "availability_search",
    success: true,
    bookingSessionId: quote.bookingSessionId,
    provider: "smoobu",
  });

  return jsonResponse(
    200,
    {
      bookingSessionId: quote.bookingSessionId,
      quoteId: quote.quoteId,
      quoteExpiresAt: quote.expiresAt,
      arrivalDate: request.arrivalDate,
      departureDate: request.departureDate,
      guests: request.guests,
      language: request.language,
      resultsCount: normalized.properties.length,
      properties: normalized.properties,
      availabilityWarnings:
        normalized.properties.length === 0
          ? ensureNoAvailabilityWarning(normalized.availabilityWarnings)
          : normalized.availabilityWarnings,
    },
    responseHeaders
  );
}

function createQuote(): SearchQuote {
  return {
    bookingSessionId: randomUUID(),
    quoteId: createQuoteId(),
    expiresAt: new Date(Date.now() + QUOTE_TTL_MS).toISOString(),
  };
}

function createQuoteId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const entropy = randomBytes(8).toString("hex").toUpperCase();
  return `qt_${timestamp}${entropy}`;
}

function normalizeAvailability(data: SmoobuAvailabilityResponse, request: SearchRequest) {
  const unavailableIds = parseUnavailableApartmentIds(data.errorMessages);
  const availableIds = parseAvailableApartmentIds(data.availableApartments).filter((id) => !unavailableIds.has(id));
  const properties = availableIds
    .map((apartmentId) => {
      const property = BOOKING_PROPERTIES_BY_SMOOBU_ID.get(apartmentId);
      if (!property) {
        return undefined;
      }

      const price = parsePriceQuote(data.prices, apartmentId, request);
      if (!price) {
        return undefined;
      }

      return buildPublicProperty(property, price, request.language);
    })
    .filter((property): property is ReturnType<typeof buildPublicProperty> => property !== undefined);

  return {
    properties,
    availabilityWarnings: mapAvailabilityWarnings(data.errorMessages),
  };
}

function buildPublicProperty(property: BookingProperty, price: PriceQuote, language: "en" | "es") {
  const listingUrl = listingUrlForLanguage(property.slug, language);

  return {
    propertyId: property.propertyId,
    slug: property.slug,
    listingUrl,
    name: property.name,
    guestCapacity: property.guestCapacity,
    thumbnailUrl: property.thumbnailUrl,
    amenities: property.amenities,
    price,
    actions: {
      viewListingUrl: listingUrl,
      canCreatePayPalHold: false,
      canUseManualDepositHandoff: true,
    },
  };
}

function parseAvailableApartmentIds(value: unknown): number[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const ids = value
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

  return Array.from(new Set(ids));
}

function parsePriceQuote(prices: unknown, apartmentId: number, request: SearchRequest): PriceQuote | undefined {
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

  const nights = nightsBetween(request.arrivalDate, request.departureDate);
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

function mapAvailabilityWarnings(errorMessages: unknown): AvailabilityWarning[] {
  if (!errorMessages || typeof errorMessages !== "object" || Array.isArray(errorMessages)) {
    return [];
  }

  return Object.entries(errorMessages as Record<string, unknown>)
    .map(([apartmentId, value]) => {
      const property = BOOKING_PROPERTIES_BY_SMOOBU_ID.get(Number(apartmentId));
      const code = mapSmoobuErrorToSafeCode(value);
      return {
        code,
        messageKey: `booking.availability.${code}`,
        ...(property ? { propertyId: property.propertyId } : {}),
      };
    })
    .filter((warning, index, warnings) => {
      const key = `${warning.propertyId ?? "global"}:${warning.code}`;
      return warnings.findIndex((candidate) => `${candidate.propertyId ?? "global"}:${candidate.code}` === key) === index;
    });
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

function mapSmoobuErrorToSafeCode(value: unknown): string {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return "no_properties_available";
  }

  const error = value as Record<string, unknown>;
  const errorCode = typeof error.errorCode === "number" ? error.errorCode : undefined;

  if (typeof error.minimumLengthOfStay === "number" || errorCode === 401) {
    return "minimum_stay_not_met";
  }
  if (typeof error.numberOfGuest === "number" || errorCode === 400) {
    return "guest_capacity_exceeded";
  }
  if (Array.isArray(error.arrivalDays) || errorCode === 402) {
    return "arrival_day_restricted";
  }
  if (typeof error.leadTime === "number" || errorCode === 403) {
    return "lead_time_restricted";
  }
  if (typeof error.minimumLengthBetweenBookings === "number" || errorCode === 404) {
    return "gap_rule_restricted";
  }

  return "no_properties_available";
}

function ensureNoAvailabilityWarning(warnings: AvailabilityWarning[]): AvailabilityWarning[] {
  if (warnings.length > 0) {
    return warnings;
  }

  return [
    {
      code: "no_properties_available",
      messageKey: "booking.noAvailability",
    },
  ];
}

function nightsBetween(arrivalDate: string, departureDate: string): number {
  const arrivalMs = Date.parse(`${arrivalDate}T00:00:00Z`);
  const departureMs = Date.parse(`${departureDate}T00:00:00Z`);
  return Math.max(1, Math.round((departureMs - arrivalMs) / 86_400_000));
}
