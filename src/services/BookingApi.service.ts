export type BookingLanguage = 'en' | 'es';

export interface BookingSearchRequest {
  arrivalDate: string;
  departureDate: string;
  guests: number;
  language: BookingLanguage;
  discountCode?: string;
  source?: string;
}

export interface BookingAmenity {
  code: string;
  label: string;
}

export interface BookingPrice {
  currency: string;
  totalAmountCents: number;
  nightlyAverageCents: number;
  nights: number;
  includesTaxes: boolean;
  rateSource: string;
}

export interface BookingAvailableProperty {
  propertyId: string;
  slug: string;
  listingUrl: string;
  name: string;
  guestCapacity: number;
  thumbnailUrl: string;
  amenities: BookingAmenity[];
  price?: BookingPrice;
  actions?: {
    viewListingUrl?: string;
    canCreatePayPalHold?: boolean;
    canUseManualDepositHandoff?: boolean;
  };
}

export interface BookingAvailabilityWarning {
  code: string;
  messageKey: string;
  propertyId?: string;
}

export interface BookingSearchResponse {
  bookingSessionId: string;
  quoteId: string;
  quoteExpiresAt: string;
  arrivalDate: string;
  departureDate: string;
  guests: number;
  language: BookingLanguage;
  resultsCount: number;
  properties: BookingAvailableProperty[];
  availabilityWarnings: BookingAvailabilityWarning[];
}

interface BookingErrorResponse {
  error?: {
    code?: string;
    message?: string;
    fieldErrors?: Record<string, string[]>;
    retryable?: boolean;
    correlationId?: string;
  };
}

export class BookingApiError extends Error {
  status: number;
  code: string;
  fieldErrors: Record<string, string[]>;
  retryable: boolean;
  correlationId?: string;

  constructor(status: number, response: BookingErrorResponse) {
    const error = response.error ?? {};
    super(error.message || 'Booking search failed.');
    this.name = 'BookingApiError';
    this.status = status;
    this.code = error.code || 'booking_api_error';
    this.fieldErrors = error.fieldErrors ?? {};
    this.retryable = error.retryable === true;
    this.correlationId = error.correlationId;
  }
}

const apiBaseUrl = (process.env.REACT_APP_BOOKING_API_BASE_URL || '').replace(/\/$/, '');

export async function searchAvailability(request: BookingSearchRequest): Promise<BookingSearchResponse> {
  const response = await fetch(`${apiBaseUrl}/api/search`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-Language': request.language,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  const body = await parseJson(response);

  if (!response.ok) {
    throw new BookingApiError(response.status, body as BookingErrorResponse);
  }

  return body as BookingSearchResponse;
}

async function parseJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    if (!response.ok) {
      return {
        error: {
          code: 'invalid_json_response',
          message: 'The booking service returned an invalid response.',
          retryable: true,
        },
      };
    }
    throw new Error('The booking service returned an invalid response.');
  }
}
