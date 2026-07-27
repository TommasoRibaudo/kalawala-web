import { createEmailClient } from "./email";
import { ApiError } from "./http/errors";
import { jsonResponse } from "./http/response";
import { BookingProperty, BOOKING_PROPERTIES_BY_ID, listingUrlForLanguage } from "./propertyCatalog";
import { ApiResponse, BookingApiConfig, HeadersMap, RouteObservability } from "./types";

export interface DepositHandoffQuery {
  language: "en" | "es";
  quoteId?: string;
  propertyId?: string;
}

export interface DepositHandoffEventRequest {
  quoteId: string;
  propertyId: string;
  language: "en" | "es";
  contactMethod: string;
  analyticsConsent: boolean;
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

// ---------------------------------------------------------------------------
// Bank transfer / SINPE payment details
// ---------------------------------------------------------------------------

export interface BankAccount {
  accountHolder: string;
  colonesIban: string;
  dolaresIban: string;
}

export interface DepositBankInfo {
  sinpePhone: string;
  sinpeName: string;
  bankAccount: BankAccount;
}

/** Properties managed under Xelion srl (Geco, Rana, Pappagallo, Tucano). */
const XELION_BANK: BankAccount = {
  accountHolder: "Xelion srl",
  colonesIban: "CR61010200009629385364",
  dolaresIban: "CR71010200009629385281",
};

/** Properties managed under AO DIMME (VillaMar, VillaCoral, Areka, Plumeria, Giulia, Delfin). */
const DIMME_BANK: BankAccount = {
  accountHolder: "AO DIMME",
  colonesIban: "CR84010200009660483247",
  dolaresIban: "CR94010200009660483164",
};

const XELION_SLUGS = new Set(["Geco", "Rana", "Pappagallo", "Tucano"]);

function bankAccountForProperty(property: BookingProperty | undefined): BankAccount {
  if (property && XELION_SLUGS.has(property.slug)) {
    return XELION_BANK;
  }
  return DIMME_BANK;
}

export function buildBankInfo(property: BookingProperty | undefined): DepositBankInfo {
  return {
    sinpePhone: "8772 7355",
    sinpeName: "Luciano Ribaudo",
    bankAccount: bankAccountForProperty(property),
  };
}

export async function handleManualDepositHandoff(
  query: DepositHandoffQuery,
  config: BookingApiConfig,
  responseHeaders: HeadersMap,
  observability: RouteObservability
): Promise<ApiResponse> {
  const bookingContext = await buildBookingContext(query, config);
  const property = query.propertyId ? BOOKING_PROPERTIES_BY_ID.get(query.propertyId) : undefined;
  const bankInfo = buildBankInfo(property);

  observability.logger.info("manual_deposit_handoff_instructions_served", {
    language: query.language,
    quoteId: query.quoteId,
    propertyId: query.propertyId,
    hasBookingContext: Boolean(bookingContext),
    bankAccountHolder: bankInfo.bankAccount.accountHolder,
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
          "deposit.bankTransferInstructions",
          "deposit.uploadReceiptNote",
          "deposit.staffWillConfirm",
          "deposit.contactUs",
        ],
        contactMethods: CONTACT_METHODS,
      },
      bankInfo,
      ...(bookingContext ? { bookingContext } : {}),
    },
    responseHeaders
  );
}

export async function handleManualDepositHandoffEvent(
  event: DepositHandoffEventRequest,
  config: BookingApiConfig,
  responseHeaders: HeadersMap,
  observability: RouteObservability
): Promise<ApiResponse> {
  const contactMethod = CONTACT_METHODS.find((method) => method.type === event.contactMethod);
  if (!contactMethod) {
    throw new ApiError(400, "unsupported_contact_method", "Manual deposit contact method is not supported.", {
      fieldErrors: {
        contactMethod: ["unsupported_contact_method"],
      },
    });
  }

  const bookingContext = await buildBookingContext({ quoteId: event.quoteId, propertyId: event.propertyId, language: event.language }, config);
  const eventName = "manual_deposit_handoff_clicked";

  observability.logger.info(event.analyticsConsent ? eventName : "manual_deposit_handoff_clicked_no_analytics_consent", {
    eventName,
    analyticsConsent: event.analyticsConsent,
    language: event.language,
    quoteId: event.quoteId,
    propertyId: event.propertyId,
    contactMethod: contactMethod.type,
    staffNotificationChannel: "existing_contact_link",
    hasBookingContext: Boolean(bookingContext),
  });

  // Send deposit handoff email — non-fatal
  if (bookingContext) {
    try {
      const repository = config.bookingSessions;
  if (!repository) {
    throw new ApiError(503, "database_unavailable", "Booking storage is not configured.", { retryable: true });
  }
      const session = event.quoteId ? await repository.getByQuoteId(event.quoteId) : undefined;
      const guestEmail = session?.guest?.email;
      const guestFirstName = session?.guest?.firstName ?? "";
      if (guestEmail) {
        const property = event.propertyId ? BOOKING_PROPERTIES_BY_ID.get(event.propertyId) : undefined;
        const emailClient = createEmailClient(config.email, observability.logger);
        await emailClient.sendDepositHandoff(
          guestEmail,
          guestFirstName,
          event.language,
          property?.name ?? "",
          session?.arrivalDate ?? "",
          session?.departureDate ?? "",
          session?.guests ?? 0
        );
      }
    } catch (emailError) {
      observability.logger.error("deposit_handoff_email_failed", {
        error: emailError instanceof Error ? emailError.message : String(emailError),
        quoteId: event.quoteId,
      });
    }
  }

  return jsonResponse(
    200,
    {
      recorded: true,
      status: "manual_deposit_handoff",
      isBookingConfirmed: false,
      doesCreateHold: false,
      messageKey: "deposit.contactEventRecorded",
    },
    responseHeaders
  );
}

async function buildBookingContext(query: DepositHandoffQuery, config: BookingApiConfig) {
  const repository = config.bookingSessions;
  if (!repository) {
    throw new ApiError(503, "database_unavailable", "Booking storage is not configured.", { retryable: true });
  }
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
