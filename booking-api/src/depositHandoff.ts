import { getBookingSessionRepository } from "./bookingSessions";
import { ApiError } from "./http/errors";
import { jsonResponse } from "./http/response";
import { BOOKING_PROPERTIES_BY_ID, listingUrlForLanguage } from "./propertyCatalog";
import { ApiResponse, BookingApiConfig, HeadersMap, RouteObservability } from "./types";

export interface DepositHandoffQuery {
  language: "en" | "es";
  quoteId?: string;
  propertyId?: string;
}

const CONTACT_METHODS = [
  {
    type: "whatsapp",
    label: "+506 8463 2276",
    url: "https://wa.me/50684632276",
  },
  {
    type: "email",
    label: "reservas.kalawala@gmail.com",
    url: "mailto:reservas.kalawala@gmail.com",
  },
];

export async function handleManualDepositHandoff(
  query: DepositHandoffQuery,
  config: BookingApiConfig,
  responseHeaders: HeadersMap,
  observability: RouteObservability
): Promise<ApiResponse> {
  const bookingContext = await buildBookingContext(query, config);

  observability.logger.info("manual_deposit_handoff_instructions_served", {
    language: query.language,
    quoteId: query.quoteId,
    propertyId: query.propertyId,
    hasBookingContext: Boolean(bookingContext),
  });

  return jsonResponse(
    200,
    {
      language: query.language,
      status: "manual_deposit_handoff",
      isBookingConfirmed: false,
      doesCreateHold: false,
      messageKey: "deposit.handoffIntro",
      instructions: {
        titleKey: "deposit.title",
        bodyKeys: [
          "deposit.bankInstructions",
          "deposit.notConfirmed",
          "deposit.staffWillConfirm",
          "deposit.noReceiptUpload",
          "deposit.contactUs",
        ],
        contactMethods: CONTACT_METHODS,
      },
      ...(bookingContext ? { bookingContext } : {}),
    },
    responseHeaders
  );
}

async function buildBookingContext(query: DepositHandoffQuery, config: BookingApiConfig) {
  const repository = getBookingSessionRepository(config);
  const session = query.quoteId ? await repository.getByQuoteId(query.quoteId) : undefined;
  const property = query.propertyId ? BOOKING_PROPERTIES_BY_ID.get(query.propertyId) : undefined;

  if (query.propertyId && !property) {
    throw new ApiError(404, "deposit_context_not_found", "Manual deposit context was not found.");
  }

  if (session && property && !session.quotedProperties.some((quoted) => quoted.propertyId === property.propertyId)) {
    throw new ApiError(404, "deposit_context_not_found", "Manual deposit context was not found.");
  }

  if (!query.quoteId && !property) {
    return undefined;
  }

  return {
    ...(query.quoteId ? { quoteId: query.quoteId } : {}),
    ...(property
      ? {
          property: {
            propertyId: property.propertyId,
            slug: property.slug,
            listingUrl: listingUrlForLanguage(property.slug, query.language),
            name: property.name,
          },
        }
      : {}),
    ...(session
      ? {
          arrivalDate: session.arrivalDate,
          departureDate: session.departureDate,
          guests: session.guests,
        }
      : {}),
  };
}
