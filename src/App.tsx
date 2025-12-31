import React, { useEffect, useState, useRef } from 'react';
import './App.scss';
import AppRouter from './Router/Router';
import { createMetaPixelService, MetaPixelConfig, PixelState, MetaPixelService } from './services/MetaPixel.service';
import { createGA4SmoobuTrackingService, createGA4SmoobuConfig, GA4SmoobuTrackingService, GA4TrackingState } from './services/GA4SmoobuTracking.service';
import { validatePixelImplementation } from './utils/runPixelValidation';
import { verifyMetaPixel, displayVerificationResults } from './utils/metaPixelVerification';
import './utils/metaPixelSetup';
import { runAnalyticsCompatibilityValidation, displayCompatibilityResults } from './utils/analyticsCompatibilityValidation';
import { runBrowserCompatibilityTest, displayBrowserCompatibilityResults } from './utils/browserCompatibilityTest';
import { runTrackingTest } from './utils/cookieConsentTrackingTest';
import { CookieConsentBanner } from './components/CookieConsentBanner/CookieConsentBanner';
import { CookieConsentService } from './services/CookieConsent.service';
import './utils/cookieConsentDemo';
import './utils/messageTipDemo';


// import '../src/styles/style.css'
// import '../src/styles/bootstrap.min.css'
// import '../src/styles/_mixins.scss'
// import '../src/styles/_typography.scss'
// import '../src/styles/_variables.scss'
// import '../src/styles/scss/_color.scss'
// import '../src/styles/scss/_common.scss'
// import '../src/styles/scss/_mixins.scss'
// import '../src/styles/scss/_variables.scss'
// import '../src/styles/scss/style.scss'

// import '../src/styles/scss/templates/_about_us.scss'
// import '../src/styles/scss/templates/_backgrounds.scss'
// import '../src/styles/scss/templates/_blog.scss'
// import '../src/styles/scss/templates/_call-to-action.scss'
// import '../src/styles/scss/templates/_contact.scss'

// import '../src/styles/scss/templates/_counter.scss'
// import '../src/styles/scss/templates/_footer.scss'
// import '../src/styles/scss/templates/_header.scss'
// import '../src/styles/scss/templates/_hero-area.scss'
// import '../src/styles/scss/templates/_navigation.scss'
// import '../src/styles/scss/templates/_portfolio.scss'
// import '../src/styles/scss/templates/_pricing.scss'

// import '../src/styles/scss/templates/_services.scss'
// import '../src/styles/scss/templates/_single-post.scss'
// import '../src/styles/scss/templates/_skills.scss'
// import '../src/styles/scss/templates/_team.scss'
// import '../src/styles/scss/templates/_testimonials.scss'
// import '../src/styles/scss/templates/_typography.scss'

// import './styles/maps/style.css.map'

function App() {
  const [pixelState, setPixelState] = useState<PixelState>({
    isLoaded: false,
    isInitialized: false,
    hasError: false
  });

  const [ga4TrackingState, setGA4TrackingState] = useState<GA4TrackingState>({
    isInitialized: false,
    trackedIframes: new Set(),
    eventsTracked: {
      viewEvents: 0,
      interactionEvents: 0
    },
    hasError: false
  });

  const [canTrack, setCanTrack] = useState<boolean>(false);

  // Use ref to track initialization status and prevent duplicate loading
  const initializationRef = useRef<{
    isInitializing: boolean;
    service: MetaPixelService | null;
    ga4Service: GA4SmoobuTrackingService | null;
  }>({
    isInitializing: false,
    service: null,
    ga4Service: null
  });

  // Check initial consent status
  useEffect(() => {
    const initialCanTrack = CookieConsentService.canTrack();
    setCanTrack(initialCanTrack);
  }, []);

  // Use ref to store debounce timeout
  const consentTimeoutRef = useRef<NodeJS.Timeout>();

  // Handle consent changes with debouncing
  const handleConsentChange = (newCanTrack: boolean) => {
    // Clear previous timeout
    if (consentTimeoutRef.current) {
      clearTimeout(consentTimeoutRef.current);
    }

    // Debounce consent changes
    consentTimeoutRef.current = setTimeout(() => {
      setCanTrack(newCanTrack);

      if (!newCanTrack) {
        // If tracking is disabled, cleanup services
        if (initializationRef.current.service) {
          console.log('Meta Pixel tracking disabled by user consent');
        }
        if (initializationRef.current.ga4Service) {
          initializationRef.current.ga4Service.cleanup();
          console.log('GA4 Smoobu tracking disabled by user consent');
        }
      }
    }, 200); // 200ms debounce delay
  };

  // Initialize GA4 Smoobu tracking service
  const initializeGA4SmoobuTracking = async () => {
    try {
      // Get configuration from environment variables
      const ga4Config = createGA4SmoobuConfig();

      // Skip initialization if disabled
      if (!ga4Config.enabled) {
        if (ga4Config.debug) {
          console.warn('GA4 Smoobu tracking not initialized: disabled in configuration');
        }
        return;
      }

      // Skip initialization if user hasn't consented to tracking
      if (!canTrack) {
        if (ga4Config.debug) {
          console.warn('GA4 Smoobu tracking not initialized: user has not consented to tracking');
        }
        return;
      }

      // Create and initialize GA4 Smoobu tracking service
      const ga4Service = createGA4SmoobuTrackingService(ga4Config);
      ga4Service.initialize();

      // Store service reference for cleanup
      initializationRef.current.ga4Service = ga4Service;

      // Update state to reflect initialization
      setGA4TrackingState(ga4Service.getState());

      if (ga4Config.debug) {
        console.log('GA4 Smoobu tracking service initialized successfully');
      }

    } catch (error) {
      // Handle errors gracefully to prevent React component crashes
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      setGA4TrackingState(prev => ({
        ...prev,
        hasError: true,
        errorMessage
      }));

      // Enhanced error logging for development mode
      if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_GA4_SMOOBU_TRACKING_DEBUG === 'true') {
        console.group('%c[GA4 Smoobu Initialization Error]', 'color: #dc3545; font-weight: bold;');
        console.error('Error details:', error);
        console.error('GA4 configuration:', {
          enabled: process.env.REACT_APP_GA4_SMOOBU_TRACKING_ENABLED !== 'false',
          debug: process.env.REACT_APP_GA4_SMOOBU_TRACKING_DEBUG === 'true',
          visibilityThreshold: process.env.REACT_APP_GA4_SMOOBU_VISIBILITY_THRESHOLD || '3000',
          environment: process.env.NODE_ENV,
          canTrack
        });
        console.groupEnd();
      }
    }
  };

  useEffect(() => {
    const initializeAnalytics = async () => {
      try {
        // Prevent duplicate initialization attempts
        if (initializationRef.current.isInitializing || pixelState.isInitialized) {
          return;
        }

        // Get configuration from environment variables
        const pixelId = process.env.REACT_APP_META_PIXEL_ID;
        const enabled = process.env.REACT_APP_META_PIXEL_ENABLED !== 'false';
        const debug = process.env.REACT_APP_META_PIXEL_DEBUG === 'true';

        // Skip initialization if pixel ID is not configured or disabled
        if (!pixelId || !enabled) {
          if (debug) {
            console.warn('Meta Pixel not initialized: missing pixel ID or disabled');
          }
          return;
        }

        // Skip initialization if user hasn't consented to tracking
        if (!canTrack) {
          if (debug) {
            console.warn('Meta Pixel not initialized: user has not consented to tracking');
          }
          return;
        }

        // Mark as initializing to prevent concurrent initialization
        initializationRef.current.isInitializing = true;

        // Use async initialization with performance optimization
        const initializeWithDelay = () => {
          return new Promise<void>((resolve) => {
            // Use requestIdleCallback for better performance
            if ('requestIdleCallback' in window) {
              requestIdleCallback(async () => {
                await initializeServices();
                resolve();
              }, { timeout: 1000 });
            } else {
              // Fallback for browsers without requestIdleCallback
              setTimeout(async () => {
                await initializeServices();
                resolve();
              }, 100);
            }
          });
        };

        const initializeServices = async () => {
          const config: MetaPixelConfig = {
            pixelId,
            autoPageView: true,
            debug,
            developmentMode: process.env.NODE_ENV === 'development'
          };

          const metaPixelService = createMetaPixelService(config);

          await metaPixelService.initialize();

          // Store service reference for potential cleanup
          initializationRef.current.service = metaPixelService;

          // Update state to reflect successful initialization
          setPixelState(metaPixelService.getState());

          // Add development status indicator if in development mode
          if (process.env.NODE_ENV === 'development' && debug) {
            const statusIndicator = metaPixelService.createStatusIndicator();
            if (statusIndicator) {
              document.body.appendChild(statusIndicator);
            }
          }

          // Initialize GA4 Smoobu tracking service
          await initializeGA4SmoobuTracking();
        };

        await initializeWithDelay();

        // Run verification in development mode after initialization
        if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_META_PIXEL_DEBUG === 'true') {
          // Wait a moment for services to fully initialize, then verify
          setTimeout(() => {
            try {
              // Run simple verification instead of disruptive validation
              console.log('\n' + '='.repeat(50));
              const verificationResult = verifyMetaPixel();
              displayVerificationResults(verificationResult);

              // Only run full validation if explicitly requested
              if (process.env.REACT_APP_RUN_AUTO_VALIDATION === 'true') {
                console.log('\n' + '='.repeat(50));
                console.log('🧪 Running full validation tests...');
                
                setTimeout(async () => {
                  try {
                    await validatePixelImplementation();
                    
                    const compatibilityReport = runAnalyticsCompatibilityValidation();
                    displayCompatibilityResults(compatibilityReport);
                    
                    const browserReport = await runBrowserCompatibilityTest();
                    displayBrowserCompatibilityResults(browserReport);
                    
                    const currentConsent = CookieConsentService.getConsentState();
                    if (!currentConsent || currentConsent.status === 'pending') {
                      runTrackingTest();
                    }
                  } catch (error) {
                    console.error('Full validation failed:', error);
                  }
                }, 1000);
              }

              // Show available debug functions
              console.log('\n' + '='.repeat(50));
              console.log('🔧 Meta Pixel Debug Functions Available:');
              console.log('  • __verifyMetaPixel__() - Quick pixel verification (recommended)');
              console.log('  • __metaPixelDiagnostic__() - Generate diagnostic report');
              console.log('  • __fixTrafficPermissions__() - Fix traffic permissions issue (IMPORTANT!)');
              console.log('  • __testMetaPixelWithFacebook__() - Facebook testing instructions');
              console.log('  • __validateMetaPixel__() - Full validation (may cause network errors)');
              console.log('  • __validateAnalyticsCompatibility__() - Test analytics compatibility');
              console.log('  • __testBrowserCompatibility__() - Test browser compatibility');
              console.log('  • __testCookieTracking__() - Test cookie consent tracking behavior');
              console.log('  • __resetCookieConsent__() - Clear consent and show banner again');
              console.log('  • __GA4_SMOOBU_DEBUG__ - GA4 Smoobu tracking debug utilities');
              
              // Check for traffic permissions error and show fix
              setTimeout(() => {
                const hasTrafficError = document.querySelector('script[src*="connect.facebook.net"]');
                if (hasTrafficError) {
                  console.log('\n' + '⚠️'.repeat(20));
                  console.log('%c🚨 DETECTED: Traffic Permissions Issue', 'color: #ff6b35; font-weight: bold; font-size: 16px;');
                  console.log('%cRun __fixTrafficPermissions__() for step-by-step fix instructions', 'color: #ff6b35; font-weight: bold;');
                  console.log('⚠️'.repeat(20));
                }
              }, 3000);

            } catch (error) {
              console.error('Verification failed:', error);
            }
          }, 2000);
        }

      } catch (error) {
        // Handle errors gracefully to prevent React component crashes
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';

        setPixelState(prev => ({
          ...prev,
          hasError: true,
          errorMessage
        }));

        // Enhanced error logging for development mode
        if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_META_PIXEL_DEBUG === 'true') {
          console.group('%c[Analytics Initialization Error]', 'color: #dc3545; font-weight: bold;');
          console.error('Error details:', error);
          console.error('Configuration:', {
            pixelId: process.env.REACT_APP_META_PIXEL_ID || 'NOT_SET',
            enabled: process.env.REACT_APP_META_PIXEL_ENABLED !== 'false',
            debug: process.env.REACT_APP_META_PIXEL_DEBUG === 'true',
            environment: process.env.NODE_ENV,
            canTrack
          });
          console.groupEnd();
        }

        // Also log GA4 Smoobu tracking errors if they exist
        if (ga4TrackingState.hasError && (process.env.NODE_ENV === 'development' || process.env.REACT_APP_GA4_SMOOBU_TRACKING_DEBUG === 'true')) {
          console.group('%c[GA4 Smoobu Tracking Status]', 'color: #ff9800; font-weight: bold;');
          console.warn('GA4 Smoobu tracking has errors:', ga4TrackingState.errorMessage);
          console.groupEnd();
        }
      } finally {
        // Reset initializing flag
        initializationRef.current.isInitializing = false;
      }
    };

    // Only initialize if user has consented
    if (canTrack) {
      initializeAnalytics();
    }

    // Cleanup function to prevent memory leaks and reset state
    return () => {
      // Reset initialization tracking on component unmount
      // Note: Meta Pixel script remains global and active across route changes
      // This is intentional behavior for tracking across the entire application
      initializationRef.current.isInitializing = false;

      // Cleanup GA4 Smoobu tracking service
      if (initializationRef.current.ga4Service) {
        initializationRef.current.ga4Service.cleanup();
        initializationRef.current.ga4Service = null;
      }

      // Remove development status indicator if it exists
      if (process.env.NODE_ENV === 'development') {
        const statusIndicator = document.getElementById('meta-pixel-status-indicator');
        if (statusIndicator) {
          statusIndicator.remove();
        }
      }
    };
  }, [canTrack]); // Re-run when consent status changes

  return (
    <>
      <AppRouter />
      <CookieConsentBanner onConsentChange={handleConsentChange} />
    </>
  );
}

export default App;
