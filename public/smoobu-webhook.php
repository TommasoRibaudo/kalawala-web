<?php
/**
 * Smoobu → PostHog webhook receiver.
 *
 * Smoobu POSTs booking events here; this script forwards them to PostHog.
 *
 * Setup:
 *  1. Set WEBHOOK_SECRET below (any long random string).
 *  2. In Smoobu dashboard → Settings → Webhooks, add:
 *       URL:  https://yourdomain.com/smoobu-webhook.php?secret=YOUR_SECRET
 *       Events: New Reservation, Reservation Modified, Reservation Cancelled
 *  3. Set your PostHog project API key and host below.
 */

// ── Config (values injected at deploy time via smoobu-config.php) ─────────────

require_once __DIR__ . '/smoobu-config.php';

// ── Request validation ────────────────────────────────────────────────────────

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}

$secret = $_GET['secret'] ?? '';
if (!hash_equals(WEBHOOK_SECRET, $secret)) {
    http_response_code(401);
    exit(json_encode(['error' => 'Unauthorized']));
}

$body = file_get_contents('php://input');
$data = json_decode($body, true);

if (!$data) {
    http_response_code(400);
    exit(json_encode(['error' => 'Invalid JSON']));
}

// ── Map Smoobu event → PostHog event name ─────────────────────────────────────

$action    = $data['action']  ?? $data['type'] ?? 'unknown';
$booking   = $data['data']    ?? $data;

$eventMap = [
    'newReservation'        => 'smoobu_booking_confirmed',
    'reservationModified'   => 'smoobu_booking_modified',
    'cancelledReservation'  => 'smoobu_booking_cancelled',
    'newInquiry'            => 'smoobu_inquiry_received',
];

$eventName = $eventMap[$action] ?? 'smoobu_webhook_' . $action;

// ── Build PostHog properties ──────────────────────────────────────────────────

$guestEmail  = $booking['guestEmail']    ?? $booking['email']   ?? null;
$bookingId   = $booking['id']            ?? $booking['reservationId'] ?? 'unknown';
$distinctId  = $guestEmail ?? 'smoobu_booking_' . $bookingId;

$properties = [
    'booking_id'        => $bookingId,
    'apartment_id'      => $booking['apartmentId']  ?? null,
    'apartment_name'    => $booking['apartment']    ?? null,
    'channel'           => $booking['channel']      ?? null,
    'check_in'          => $booking['arrival']      ?? $booking['checkIn']   ?? null,
    'check_out'         => $booking['departure']    ?? $booking['checkOut']  ?? null,
    'guests'            => $booking['adults']       ?? null,
    'price_total'       => $booking['price']        ?? $booking['totalPrice'] ?? null,
    'currency'          => $booking['currency']     ?? 'EUR',
    'guest_country'     => $booking['guestCountry'] ?? null,
    'source'            => 'smoobu_webhook',
];

// ── Send to PostHog ───────────────────────────────────────────────────────────

$payload = json_encode([
    'api_key'     => POSTHOG_API_KEY,
    'event'       => $eventName,
    'distinct_id' => $distinctId,
    'properties'  => $properties,
]);

$ch = curl_init(POSTHOG_HOST . '/capture/');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_TIMEOUT        => 5,
]);

$response   = curl_exec($ch);
$httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// ── Respond to Smoobu ─────────────────────────────────────────────────────────

if ($httpStatus === 200) {
    http_response_code(200);
    echo json_encode(['ok' => true, 'event' => $eventName]);
} else {
    // Still return 200 to Smoobu so it doesn't keep retrying,
    // but log the PostHog failure.
    error_log("[smoobu-webhook] PostHog returned HTTP $httpStatus: $response");
    http_response_code(200);
    echo json_encode(['ok' => false, 'posthog_status' => $httpStatus]);
}
