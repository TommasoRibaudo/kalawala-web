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

export interface CreatePayPalHoldRequest {
  quoteId: string;
  bookingSessionId: string;
  propertyId: string;
  language: BookingLanguage;
  guest: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    country?: string;
    message?: string;
  };
  portalPassword: string;
  termsAccepted: boolean;
  marketingConsent?: boolean;
}

export interface PayPalHoldResponse {
  booking: {
    bookingSessionId: string;
    reservationPublicId: string;
    status: 'hold_active' | string;
    language: BookingLanguage;
    arrivalDate: string;
    departureDate: string;
    guests: number;
    property: {
      propertyId: string;
      slug: string;
      listingUrl: string;
      name: string;
      guestCapacity: number;
      thumbnailUrl: string;
      amenities: BookingAmenity[];
    };
    price: BookingPrice;
    hold: {
      status: 'active' | string;
      expiresAt: string;
    };
    payment: {
      method: 'paypal' | string;
      status: 'pending' | string;
    };
  };
  nextAction: 'create_paypal_order' | string;
}

export interface CreatePayPalOrderRequest {
  bookingSessionId: string;
  language: BookingLanguage;
}

export interface PayPalOrderResponse {
  booking: {
    bookingSessionId: string;
    reservationPublicId: string;
    status: 'paypal_order_created' | 'booking_confirmed' | string;
    language: BookingLanguage;
    arrivalDate: string;
    departureDate: string;
    guests: number;
    property?: {
      propertyId: string;
      slug: string;
      listingUrl: string;
      name: string;
    };
    price?: {
      currency?: string;
      totalAmountCents?: number;
    };
    hold?: {
      expiresAt?: string;
    };
  };
  paypal?: {
    orderId: string;
    approvalUrl: string;
  };
  nextAction?: 'approve_paypal_order' | string;
}

export interface CapturePayPalOrderRequest {
  bookingSessionId: string;
  paypalOrderId: string;
  payerId?: string;
  language: BookingLanguage;
}

export interface PayPalCaptureResponse {
  booking: {
    bookingSessionId: string;
    reservationPublicId: string;
    status: 'booking_confirmed' | string;
    language: BookingLanguage;
    arrivalDate: string;
    departureDate: string;
    guests: number;
    confirmedAt?: string;
    property?: {
      propertyId: string;
      slug: string;
      listingUrl: string;
      name: string;
    };
    price?: {
      currency?: string;
      totalAmountCents?: number;
    };
  };
  payment: {
    method: 'paypal' | string;
    status: 'captured' | string;
    paypalOrderId: string;
    paypalCaptureId?: string;
    capturedAt?: string;
  };
}

export interface DepositHandoffEventRequest {
  quoteId: string;
  propertyId: string;
  language: BookingLanguage;
  contactMethod: string;
  analyticsConsent?: boolean;
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

export interface DepositHandoffEventResponse {
  recorded: true;
  status: 'manual_deposit_handoff';
  isBookingConfirmed: false;
  doesCreateHold: false;
  messageKey: string;
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

export async function createPayPalHold(request: CreatePayPalHoldRequest): Promise<PayPalHoldResponse> {
  const response = await fetch(`${apiBaseUrl}/api/holds`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-Language': request.language,
      'Content-Type': 'application/json',
      'Idempotency-Key': createIdempotencyKey('hold'),
    },
    body: JSON.stringify({
      quoteId: request.quoteId,
      bookingSessionId: request.bookingSessionId,
      propertyId: request.propertyId,
      paymentMethod: 'paypal',
      guest: pruneOptionalFields(request.guest),
      portalPassword: request.portalPassword,
      termsAccepted: request.termsAccepted,
      marketingConsent: request.marketingConsent === true,
    }),
  });

  const body = await parseJson(response);

  if (!response.ok) {
    throw new BookingApiError(response.status, body as BookingErrorResponse);
  }

  return body as PayPalHoldResponse;
}

export async function createPayPalOrder(request: CreatePayPalOrderRequest): Promise<PayPalOrderResponse> {
  const response = await fetch(
    `${apiBaseUrl}/api/bookings/${encodeURIComponent(request.bookingSessionId)}/paypal/create-order`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Language': request.language,
        'Idempotency-Key': createIdempotencyKey('paypal-order'),
      },
    }
  );

  const body = await parseJson(response);

  if (!response.ok) {
    throw new BookingApiError(response.status, body as BookingErrorResponse);
  }

  return body as PayPalOrderResponse;
}

export async function capturePayPalOrder(request: CapturePayPalOrderRequest): Promise<PayPalCaptureResponse> {
  const response = await fetch(
    `${apiBaseUrl}/api/bookings/${encodeURIComponent(request.bookingSessionId)}/paypal/capture`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Language': request.language,
        'Content-Type': 'application/json',
        'Idempotency-Key': createIdempotencyKey('paypal-capture'),
      },
      body: JSON.stringify({
        paypalOrderId: request.paypalOrderId,
        payerId: request.payerId,
      }),
    }
  );

  const body = await parseJson(response);

  if (!response.ok) {
    throw new BookingApiError(response.status, body as BookingErrorResponse);
  }

  return body as PayPalCaptureResponse;
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

export async function recordDepositHandoffEvent(
  request: DepositHandoffEventRequest
): Promise<DepositHandoffEventResponse> {
  const response = await fetch(`${apiBaseUrl}/api/deposit-handoff/events`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-Language': request.language,
      'Content-Type': 'application/json',
      'Idempotency-Key': createIdempotencyKey('deposit'),
    },
    body: JSON.stringify(request),
    keepalive: true,
  });

  const body = await parseJson(response);

  if (!response.ok) {
    throw new BookingApiError(response.status, body as BookingErrorResponse);
  }

  return body as DepositHandoffEventResponse;
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

function createIdempotencyKey(prefix: string): string {
  const randomId =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  return `${prefix}-${randomId}`;
}

function pruneOptionalFields<T extends Record<string, unknown>>(value: T): T {
  return Object.entries(value).reduce<Record<string, unknown>>((accumulator, [key, item]) => {
    if (typeof item === 'string') {
      const trimmed = item.trim();
      if (trimmed) {
        accumulator[key] = trimmed;
      }
      return accumulator;
    }

    if (item !== undefined && item !== null) {
      accumulator[key] = item;
    }

    return accumulator;
  }, {}) as T;
}
