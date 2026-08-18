import React from "react";
import { useLocale, useMessages, bookingLanguage } from "../../i18n";
import { trackContactWhatsappClicked } from "../../services/BookingAnalytics.service";

/**
 * Replaces the former ContactUs / ContactUsES pair.
 *
 * The Spanish copy used `id="contact-usES"`. Nothing linked to it — the only
 * in-app hash link anywhere is `#smoobuComp` — so both now render `contact-us`,
 * which also means an anchor to it would work on either language instead of
 * only in English.
 */
const ContactUs: React.FC = () => {
  const m = useMessages();
  const locale = useLocale();

  return (
    <section id="contact-us" className="contact-us section-bg">
      <div className="container">
        <div className="row">
          {/* section title */}
          <div className="title text-center wow fadeIn" data-wow-duration="500ms">
            <h2>
              {m.contact.headingMain} <span className="color">{m.contact.headingHighlight}</span>
            </h2>
            <div className="border"></div>
          </div>
          {/* /section title */}

          {/* Contact Details */}
          <div className="text-center contact-info col-md-12 wow fadeInUp" data-wow-duration="500ms">
            <h3>{m.contact.askUsAnything}</h3>
            <p>{m.contact.replyTime}</p>
            <div className="contact-details">
              <div className="con-info clearfix">
                <i className="tf-map-pin"></i>
                <span>Puerto Viejo de Talamanca, Carretera Principal.</span>
              </div>

              <div className="con-info clearfix">
                <i className="tf-ion-ios-telephone-outline"></i>
                <span>{m.contact.phoneLabel} <a href="tel:+50684632276">+506 8463-2276</a> · <a href="https://wa.me/50684632276" target="_blank" rel="noopener noreferrer" onClick={() => trackContactWhatsappClicked({ location: 'contact_us', language: bookingLanguage(locale) })}>{m.contact.chatOnWhatsApp}</a></span>
              </div>

              <div className="con-info clearfix">
                <i className="tf-ion-ios-email-outline"></i>
                <span>{m.contact.emailLabel} <a href="mailto:reservas.kalawala@gmail.com">reservas.kalawala@gmail.com</a></span>
              </div>
            </div>
          </div>
        </div>
        {/* end row */}
      </div>
      {/* end container */}

      {/* Google Map
        <div className="google-map">
            <div id="map-canvas"></div>
        </div>
         /Google Map */}
    </section>
  );
};

export default ContactUs;
