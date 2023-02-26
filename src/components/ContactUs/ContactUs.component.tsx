import React from "react";

const ContactUs: React.FC = () => {
  return (
    <section id="contact-us" className="contact-us section-bg">
      <div className="container">
        <div className="row">
          {/* section title */}
          <div className="title text-center wow fadeIn" data-wow-duration="500ms">
            <h2>
              Get In <span className="color">Touch</span>
            </h2>
            <div className="border"></div>
          </div>
          {/* /section title */}

          {/* Contact Details */}
          <div className="text-center contact-info col-md-12 wow fadeInUp" data-wow-duration="500ms">
            <h3>Interested?</h3>
            <p>Contact us!</p>
            <div className="contact-details">
              <div className="con-info clearfix">
                <i className="tf-map-pin"></i>
                <span>Puerto Viejo de Talamanca, Carretera Principal.</span>
              </div>

              <div className="con-info clearfix">
                <i className="tf-ion-ios-telephone-outline"></i>
                <span>Phone, Whatsapp: +506 8463-2276</span>
              </div>

              <div className="con-info clearfix">
                <i className="tf-ion-ios-email-outline"></i>
                <span>Email: reservas.kalawala@gmail.com</span>
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
