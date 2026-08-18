import React, { useState, useEffect } from 'react';
import './CallToAction.style.scss'
import Smoobu2 from '../Smoobu2/Smoobu2.component';
import { useLocale, useMessages, bookingLanguage } from '../../i18n';
import { isPrerender } from '../../utils/isPrerender';
import { trackContactWhatsappClicked } from '../../services/BookingAnalytics.service';

/**
 * Replaces the former CallToAction / CallToActionES pair.
 *
 * Two divergences existed between the two copies that were not translation:
 *
 *  - The Spanish copy rendered `<Smoobu2 />` with no `targetId`, falling back to
 *    the shared default id `apartmentIframeAll`, where every one of the twelve
 *    other Smoobu2 call sites passes a unique one. Unified on the English
 *    behaviour. Harmless either way today (nothing links the id, and no second
 *    widget shares the page), but the default was an oversight in the copy.
 *  - The bank-transfer paragraph sat inside the widget box in Spanish and
 *    outside it in English. Unified on the English placement.
 */
const CallToAction = () => {
  const m = useMessages();
  const locale = useLocale();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // react-snap's crawl gives this effect time to settle before it captures
    // the page, so without this guard isMobile gets seeded from the crawl's
    // own (mobile) viewport and bakes its inline style values into the
    // static HTML — mismatching a real desktop client's false-seeded first
    // render. Same pattern as OtherListings/MessageTipContainer; see
    // docs/i18n-rollout-plan.md Phase 11 P2.
    if (isPrerender()) return;
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section 
      id="callToAction" 
      className="call-to-action overly bg-1" 
      style={{ 
        backgroundImage: `url(https://lh3.googleusercontent.com/d/1NoeXMkl7483dB0hVfCYuGPbqKTkRpQXq=w1000)`,
        paddingTop: isMobile ? '80px' : undefined,
        minHeight: isMobile ? 'auto' : undefined
      }}
    >
      <div className="test section-sm">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center" >
              <p style={{ fontWeight: 400, fontSize: 28 }}>{m.callToAction.exploreAvailability}</p>
              <p>{m.callToAction.nonRefundableLead} <b>{m.callToAction.nonRefundableBold}</b> {m.callToAction.nonRefundableTail}</p>
              <div 
            className='Smoobo' 
            style={{ 
              backgroundColor: 'rgba(245, 242, 233, 0.86)', 
              borderRadius: '15px', 
              padding: '5px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            }}
            >
              <Smoobu2 targetId="callToActionSmoobu" /> 
              <p style={{ color: 'black', fontWeight: 550, fontSize: 12 }}>{m.callToAction.availabilityDisclaimer}</p>
            </div>
            <p style={{marginTop: 10}}>{m.callToAction.bankTransferLead} <a href="mailto:reservas.kalawala@gmail.com">reservas.kalawala@gmail.com</a> {m.callToAction.bankTransferMid} <a href="https://wa.me/50684632276" target="_blank" rel="noopener noreferrer" onClick={() => trackContactWhatsappClicked({ location: 'call_to_action', language: bookingLanguage(locale) })}>+506 8463 2276</a> {m.callToAction.bankTransferTail}</p>
          </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default CallToAction;
