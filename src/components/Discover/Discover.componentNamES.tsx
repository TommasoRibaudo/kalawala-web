import React from 'react';
import './Discover.style.scss';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faConciergeBell, faCalendarCheck, faCancel, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const DiscoverNamES = () => {
  return (
    <section className="section about-2 padding-0 b-light" id="about">

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 padding-0">
            <Image className="img-responsive" src="https://drive.google.com/thumbnail?id=1eY5XspXUIP7mqOkMSRYdeHHr5SKEoYk4&sz=w1000" alt="" />
          </div>
          <div className="col-md-6">
            <div className="content-block">
              <h2>Descubre Puerto Viejo desde la comodidad de nuestros hogares.</h2>
              <p>En Casitas Namaitami, encontrarás dos encantadores refugios privados para parejas y una casa espaciosa para hasta 4 huéspedes, todos con <b>cocina y baño privados completamente equipados</b>. 
              Cada hogar cuenta con un dormitorio acogedor y <b>aire acondicionado</b> para tu comodidad.</p> 
              <p>Ubicadas en el corazón de Playa Chiquita, estamos a solo minutos de las impresionantes playas de Punta Uva y Cocles, y a solo una <b>caminata corta a Playa Chiquita</b>. Los alquileres de bicicletas están cerca, ¡haciendo fácil explorar la costa sin necesidad de auto!</p>
               <p><b>¿Necesitas trabajar remotamente?</b> Mantente conectado con nuestro <b>Wi-Fi gratuito de alta velocidad</b>, con dos contratos de internet separados, nuestra red se comparte entre menos dispositivos, dándote videollamadas más fluidas y navegación más rápida, así como estabilidad en caso de que uno falle.</p> 
               <p><b>¿Manejas un auto eléctrico?</b> Te tenemos cubierto con tomas de carga justo en tu lugar de estacionamiento. Cada casa tiene su propio espacio privado para un vehículo. Aunque el estacionamiento es al aire libre, nuestro vecindario es tranquilo, seguro y maravillosamente pacífico.</p>
              <div className="row">
                <div className="col-md-6">
                  <div className="media">
                    <div className="pull-left">
                      <FontAwesomeIcon icon={faConciergeBell} color='#57cbcc' fontSize={"30px"} />
                    </div>
                    <div className="media-body" style={{ verticalAlign: "middle" }}>
                      <h4 className="media-heading">Check-in Automático</h4>
                      <p>Proceso de check-in sin contacto, fácil de seguir.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media">
                    <div className="pull-left">
                      <FontAwesomeIcon icon={faDollarSign} color='#57cbcc' fontSize={"30px"} />

                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">Precios Más Baratos</h4>
                      <p>Y descuentos adicionales al reservar directamente en el sitio web.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="media">
                    <div className="pull-left">
                      <FontAwesomeIcon icon={faCancel} color='#57cbcc' fontSize={"30px"} />
                    </div>
                    <div className="media-body" style={{ verticalAlign: "middle" }}>
                      <h4 className="media-heading">Descuento No Reembolsable</h4>
                      <p>Incluye el código de descuento #norefundallowed al finalizar la compra para obtener un descuento adicional del 10%, pero no serás elegible para un reembolso por cancelación.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media">
                    <div className="pull-left">
                      <FontAwesomeIcon icon={faCalendarCheck} color='#57cbcc' fontSize={"30px"} />

                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">Política de Cancelación Flexible</h4>
                      <p>Reembolso completo hasta un día antes del check-in, para cualquier reserva que no incluya el descuento #norefundallowed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DiscoverNamES;
