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

export interface DepositHandoffRequest {
  language: BookingLanguage;
  quoteId?: string;
  propertyId?: string;
}

export interface DepositHandoffContactMethod {
  type: 'whatsapp' | 'email' | string;
  label: string;
  url: string;
}

export interface DepositHandoffResponse {
  language: BookingLanguage;
  status: 'manual_deposit_handoff';
  isBookingConfirmed: false;
  doesCreateHold: false;
  messageKey: string;
  instructions: {
    titleKey: string;
    bodyKeys: string[];
    contactMethods: DepositHandoffContactMethod[];
  };
  bookingContext?: {
    quoteId?: string;
    property?: {
      propertyId: string;
      slug: string;
      listingUrl: string;
      name: string;
    };
    arrivalDate?: string;
    departureDate?: string;
    guests?: number;
  };
}

export type CalendarDot = 'green' | 'yellow' | 'red' | 'grey';

export interface CalendarProperty {
  propertyId?: string;
  slug: string;
  name?: string;
}

export interface CalendarDay {
  date: string;
  available: boolean;
  priceCents: number | null;
  minStay: number | null;
  dot?: CalendarDot;
  ariaLabelKey?: string;
}

export interface CalendarStats {
  availableNightCount: number;
  minPriceCents: number | null;
  maxPriceCents: number | null;
  averagePriceCents: number | null;
}

export interface CalendarCacheMetadata {
  status?: string;
  ttlSeconds?: number;
  generatedAt?: string;
}

export interface CalendarMonthResponse {
  property: CalendarProperty;
  month: string;
  currency: string;
  days: CalendarDay[];
  stats: CalendarStats;
  cache?: CalendarCacheMetadata;
}

interface CalendarResponseApi {
  property?: CalendarProperty;
  apartment?: string;
  month: string;
  currency?: string;
  days?: CalendarDay[];
  dates?: Record<
    string,
    {
      available: boolean;
      price?: number | null;
      priceCents?: number | null;
      minStay?: number | null;
      min_length_of_stay?: number | null;
      dot?: CalendarDot;
      ariaLabelKey?: string;
    }
  >;
  stats?: Partial<CalendarStats> & {
    avg?: number | null;
    min?: number | null;
    max?: number | null;
  };
  cache?: CalendarCacheMetadata;
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

export async function getDepositHandoff(request: DepositHandoffRequest): Promise<DepositHandoffResponse> {
  const params = new URLSearchParams({ language: request.language });
  if (request.quoteId) {
    params.set('quoteId', request.quoteId);
  }
  if (request.propertyId) {
    params.set('propertyId', request.propertyId);
  }

  const response = await fetch(`${apiBaseUrl}/api/deposit-handoff?${params.toString()}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Accept-Language': request.language,
    },
  });

  const body = await parseJson(response);

  if (!response.ok) {
    throw new BookingApiError(response.status, body as BookingErrorResponse);
  }

  return body as DepositHandoffResponse;
}

export async function getCalendarMonth(
  apartmentSlug: string,
  month: string,
  language: BookingLanguage
): Promise<CalendarMonthResponse> {
  const params = new URLSearchParams({ month, language });
  const response = await fetch(`${apiBaseUrl}/api/calendar/${encodeURIComponent(apartmentSlug)}?${params.toString()}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Accept-Language': language,
    },
  });

  const body = await parseJson(response);

  if (!response.ok) {
    throw new BookingApiError(response.status, body as BookingErrorResponse);
  }

  return normalizeCalendarResponse(body as CalendarResponseApi, apartmentSlug, month);
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

function normalizeCalendarResponse(
  response: CalendarResponseApi,
  apartmentSlug: string,
  requestedMonth: string
): CalendarMonthResponse {
  const days = response.days
    ? response.days.map((day) => ({
        date: day.date,
        available: day.available,
        priceCents: day.priceCents,
        minStay: day.minStay,
        dot: day.dot,
        ariaLabelKey: day.ariaLabelKey,
      }))
    : Object.entries(response.dates ?? {}).map(([date, day]) => ({
        date,
        available: day.available,
        priceCents: typeof day.priceCents === 'number' ? day.priceCents : dollarsToCents(day.price),
        minStay: typeof day.minStay === 'number' ? day.minStay : day.min_length_of_stay ?? null,
        dot: day.dot,
        ariaLabelKey: day.ariaLabelKey,
      }));

  const availablePrices = days
    .filter((day) => day.available && typeof day.priceCents === 'number')
    .map((day) => day.priceCents as number);

  const stats = response.stats ?? {};
  const minPriceCents =
    typeof stats.minPriceCents === 'number' ? stats.minPriceCents : dollarsToCents(stats.min);
  const maxPriceCents =
    typeof stats.maxPriceCents === 'number' ? stats.maxPriceCents : dollarsToCents(stats.max);
  const averagePriceCents =
    typeof stats.averagePriceCents === 'number'
      ? stats.averagePriceCents
      : dollarsToCents(stats.avg) ?? average(availablePrices);

  return {
    property: response.property ?? {
      slug: response.apartment ?? apartmentSlug,
      name: response.apartment ?? apartmentSlug,
    },
    month: response.month || requestedMonth,
    currency: response.currency || 'USD',
    days: days.sort((left, right) => left.date.localeCompare(right.date)),
    stats: {
      availableNightCount:
        typeof stats.availableNightCount === 'number' ? stats.availableNightCount : availablePrices.length,
      minPriceCents: minPriceCents ?? min(availablePrices),
      maxPriceCents: maxPriceCents ?? max(availablePrices),
      averagePriceCents,
    },
    cache: response.cache,
  };
}

function dollarsToCents(value: number | null | undefined): number | null {
  return typeof value === 'number' ? Math.round(value * 100) : null;
}

function average(values: number[]): number | null {
  if (values.length === 0) {
    return null;
  }

  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function min(values: number[]): number | null {
  return values.length > 0 ? Math.min(...values) : null;
}

function max(values: number[]): number | null {
  return values.length > 0 ? Math.max(...values) : null;
}
