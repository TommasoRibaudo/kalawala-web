import React from 'react';
import './CallToAction.style.scss'
import Smoobu2 from '../Smoobu2/Smoobu2.component';

const CallToActionES = () => {
  return (
    <section id="callToActionES" className="call-to-action overly bg-1" style={{ backgroundImage: `url(https://drive.google.com/thumbnail?id=1NoeXMkl7483dB0hVfCYuGPbqKTkRpQXq&sz=w1000)` }}>
      <div className="test section-sm">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center" >
              <p style={{ fontWeight: 400, fontSize: 28 }}>Explora la disponibilidad y los precios de todas nuestras propiedades en Puerto Viejo y Playa Chiquita.</p>
              <p>Usa el código <b>#norefundallowed</b> para disfrutar de un 10% de descuento en reservas no reembolsables.</p>

              <div
                className='Smoobo'
                style={{
                  backgroundColor: 'rgba(245, 242, 233, 0.86)',
                  borderRadius: '15px',
                  padding: '5px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Smoobu2 />
                <p style={{ color: 'black', fontWeight: 550, fontSize: 12 }}>
                  *Mostrando disponibilidad para todas las propiedades disponibles en la zona de Puerto Viejo, incluidas propiedades anunciadas en otras páginas. ¡Asegúrate de verificar el nombre de la casa y su foto antes de reservar!
                </p>
              </div>
              <p style={{ marginTop: 10 }}>¿Prefieres pagar mediante transferencia bancaria o SINPE? Reserva de forma segura con nosotros y envía tu confirmación de depósito a <a href="mailto:reservas.kalawala@gmail.com">reservas.kalawala@gmail.com</a> o por WhatsApp al <a href="https://wa.me/50684632276" target="_blank">+506 8463 2276</a> dentro de las 6 horas posteriores a realizar tu reserva.</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default CallToActionES;
