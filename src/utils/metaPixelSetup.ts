/**
 * Meta Pixel Setup and Configuration Helper
 * 
 * This utility helps ensure proper Meta Pixel setup for Facebook Events Manager
 */

/**
 * Add proper Meta Pixel events for better Facebook recognition
 */
export const setupStandardEvents = (): void => {
  if (!window.fbq || typeof window.fbq !== 'function') {
    console.warn('Meta Pixel not available for event setup');
    return;
  }

  try {
    // Track ViewContent for better event recognition
    window.fbq('track', 'ViewContent', {
      content_type: 'website',
      content_category: 'vacation_rental'
    });

    console.log('✅ Meta Pixel standard events configured');
  } catch (error) {
    console.error('Failed to setup standard events:', error);
  }
};

/**
 * Verify domain for Meta Pixel
 */
export const verifyDomainSetup = (): void => {
  console.group('🌐 Domain Verification for Meta Pixel');
  
  console.log('Current domain:', window.location.hostname);
  console.log('Current URL:', window.location.href);
  console.log('');
  
  console.log('To verify your domain in Facebook:');
  console.log('1. Go to Facebook Business Manager');
  console.log('2. Navigate to Business Settings > Brand Safety > Domains');
  console.log('3. Add your domain:', window.location.hostname);
  console.log('4. Verify using Meta tag or DNS method');
  console.log('');
  
  console.log('For Events Manager:');
  console.log('1. Go to Events Manager');
  console.log('2. Select your pixel');
  console.log('3. Go to Settings > Pixel');
  console.log('4. Add your website URL:', window.location.origin);
  
  console.groupEnd();
};

/**
 * Check if pixel is properly configured for Events Manager
 */
export const checkEventsManagerSetup = (): void => {
  console.group('📊 Events Manager Configuration Check');
  
  const pixelId = process.env.REACT_APP_META_PIXEL_ID;
  
  if (!pixelId) {
    console.error('❌ Pixel ID not configured');
    return;
  }
  
  console.log('✅ Pixel ID configured:', pixelId);
  console.log('🌐 Current domain:', window.location.hostname);
  console.log('');
  
  console.log('To check in Events Manager:');
  console.log('1. Go to https://business.facebook.com/events_manager/');
  console.log('2. Select Data Sources > Pixels');
  console.log('3. Find your pixel:', pixelId);
  console.log('4. Check "Test Events" tab for real-time data');
  console.log('5. Verify "Overview" shows recent activity');
  console.log('');
  
  console.log('Common issues:');
  console.log('• Domain not verified in Business Manager');
  console.log('• Pixel not associated with correct ad account');
  console.log('• Ad blockers preventing pixel from firing');
  console.log('• Incorrect pixel ID in configuration');
  console.log('• Traffic permissions blocking the domain (most common)');
  
  console.groupEnd();
};

/**
 * Fix Traffic Permissions Issue - Step by step guide
 */
export const fixTrafficPermissions = (): void => {
  console.group('🚨 TRAFFIC PERMISSIONS FIX REQUIRED');
  
  const pixelId = process.env.REACT_APP_META_PIXEL_ID;
  const currentDomain = window.location.hostname;
  
  console.log('%c⚠️ Your pixel is blocked due to traffic permissions!', 'color: #ff6b35; font-weight: bold; font-size: 14px;');
  console.log('');
  
  console.log('📋 STEP-BY-STEP FIX:');
  console.log('');
  
  console.log('1️⃣ Go to Facebook Events Manager:');
  console.log('   https://business.facebook.com/events_manager/');
  console.log('');
  
  console.log('2️⃣ Select your pixel:');
  console.log('   Pixel ID:', pixelId);
  console.log('');
  
  console.log('3️⃣ Go to Settings tab');
  console.log('');
  
  console.log('4️⃣ Find "Traffic Permissions" section');
  console.log('   Click "Edit" or "Configure"');
  console.log('');
  
  console.log('5️⃣ Choose "Allow list" (recommended)');
  console.log('');
  
  console.log('6️⃣ Add these domains to the allow list:');
  console.log('   •', currentDomain);
  if (!currentDomain.startsWith('www.')) {
    console.log('   • www.' + currentDomain);
  }
  if (currentDomain.startsWith('www.')) {
    console.log('   •', currentDomain.replace('www.', ''));
  }
  console.log('');
  
  console.log('7️⃣ Save changes and wait 15 minutes for propagation');
  console.log('');
  
  console.log('8️⃣ Clear browser cache and test again');
  console.log('');
  
  console.log('%c💡 Why this happens:', 'color: #1877f2; font-weight: bold;');
  console.log('Facebook blocks pixels by default to prevent unauthorized use.');
  console.log('You must explicitly allow your domain to use your pixel.');
  console.log('');
  
  console.log('%c🔗 More info:', 'color: #1877f2; font-weight: bold;');
  console.log('https://www.facebook.com/business/help/572690630080597');
  
  console.groupEnd();
};

/**
 * Test pixel with Facebook's recommended events
 */
export const testWithRecommendedEvents = (): void => {
  if (!window.fbq || typeof window.fbq !== 'function') {
    console.warn('Meta Pixel not available for testing');
    return;
  }

  console.log('🧪 Testing with Facebook recommended events...');

  try {
    // PageView (most important)
    window.fbq('track', 'PageView');
    console.log('✅ PageView event sent');

    // ViewContent (helps with optimization)
    window.fbq('track', 'ViewContent', {
      content_type: 'product',
      content_ids: ['vacation_rental'],
      content_name: 'Vacation Rental Listing',
      content_category: 'Travel'
    });
    console.log('✅ ViewContent event sent');

    // Lead (for contact forms)
    window.fbq('track', 'Lead', {
      content_name: 'Contact Form',
      content_category: 'Lead Generation'
    });
    console.log('✅ Lead event sent');

    console.log('');
    console.log('Check Events Manager Test Events tab to see these events in real-time');

  } catch (error) {
    console.error('❌ Failed to send test events:', error);
  }
};

/**
 * Generate Meta Pixel verification HTML for manual testing
 */
export const generateVerificationHTML = (): string => {
  const pixelId = process.env.REACT_APP_META_PIXEL_ID;
  
  return `
<!-- Meta Pixel Code for Manual Testing -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
`;
};

// Global functions for easy access
if (typeof window !== 'undefined') {
  (window as any).__setupMetaPixelEvents__ = setupStandardEvents;
  (window as any).__verifyDomainSetup__ = verifyDomainSetup;
  (window as any).__checkEventsManager__ = checkEventsManagerSetup;
  (window as any).__testMetaPixelEvents__ = testWithRecommendedEvents;
  (window as any).__fixTrafficPermissions__ = fixTrafficPermissions;
  (window as any).__generatePixelHTML__ = () => {
    const html = generateVerificationHTML();
    console.log('Meta Pixel HTML Code:');
    console.log(html);
    return html;
  };
}