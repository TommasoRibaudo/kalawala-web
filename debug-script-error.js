// Debug script to help identify script errors
// Add this to your browser console when you encounter the error

console.log('=== Script Error Debug Information ===');

// Check if all required environment variables are loaded
console.log('Environment Variables:');
console.log('REACT_APP_SMOOBU_URL:', process.env.REACT_APP_SMOOBU_URL);
console.log('REACT_APP_HOUSE_CODES:', process.env.REACT_APP_HOUSE_CODES);
console.log('REACT_APP_GOOGLE_MAPS_API_KEY:', process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
console.log('REACT_APP_META_PIXEL_ID:', process.env.REACT_APP_META_PIXEL_ID);

// Check for common global objects
console.log('Global Objects:');
console.log('window.gtag:', typeof window.gtag);
console.log('window.fbq:', typeof window.fbq);
console.log('window.BookingToolIframe:', typeof window.BookingToolIframe);

// Check for React Router
console.log('React Router:', typeof window.history);

// Listen for all errors
window.addEventListener('error', function(e) {
    console.error('=== SCRIPT ERROR CAUGHT ===');
    console.error('Message:', e.message);
    console.error('Source:', e.filename);
    console.error('Line:', e.lineno);
    console.error('Column:', e.colno);
    console.error('Error object:', e.error);
    console.error('Stack trace:', e.error ? e.error.stack : 'No stack trace available');
});

// Listen for unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('=== UNHANDLED PROMISE REJECTION ===');
    console.error('Reason:', e.reason);
    console.error('Promise:', e.promise);
});

console.log('=== Debug script loaded. Navigate to a listings page to see errors ===');