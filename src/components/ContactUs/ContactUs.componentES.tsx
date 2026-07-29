import React from "react";

const ContactUsES: React.FC = () => {
  return (
    <section id="contact-usES" className="contact-us section-bg">
      <div className="container">
        <div className="row">
          {/* section title */}
          <div className="title text-center wow fadeIn" data-wow-duration="500ms">
            <h2>
              Nuestros <span className="color">Contactos</span>
            </h2>
            <div className="border"></div>
          </div>
          {/* /section title */}

          {/* Contact Details */}
          <div className="text-center contact-info col-md-12 wow fadeInUp" data-wow-duration="500ms">
            <h3>Escríbenos</h3>
            <p>Normalmente respondemos en menos de una hora por WhatsApp.</p>
            <div className="contact-details">
              <div className="con-info clearfix">
                <i className="tf-map-pin"></i>
                <span>Puerto Viejo de Talamanca, Carretera Principal.</span>
              </div>

              <div className="con-info clearfix">
                <i className="tf-ion-ios-telephone-outline"></i>
                <span>Teléfono, Whatsapp: <a href="tel:+50684632276">+506 8463-2276</a> · <a href="https://wa.me/50684632276" target="_blank" rel="noopener noreferrer">chatear por WhatsApp</a></span>
              </div>

              <div className="con-info clearfix">
                <i className="tf-ion-ios-email-outline"></i>
                <span>Correo: <a href="mailto:reservas.kalawala@gmail.com">reservas.kalawala@gmail.com</a></span>
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

export default ContactUsES;
