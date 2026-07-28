import React from 'react';
import { cdnImage, cdnSrcSet } from '../../utils/imageCdn';
import './Discover.style.scss';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faConciergeBell, faCalendarCheck, faCancel, faDollarSign } from '@fortawesome/free-solid-svg-icons';

const DISCOVER_IMAGE =
  'https://lh3.googleusercontent.com/d/1eY5XspXUIP7mqOkMSRYdeHHr5SKEoYk4=w1000';

const DiscoverNamES = () => {
  return (
    <section className="section about-2 padding-0 b-light" id="about">

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 padding-0">
            <Image className="img-fluid" src={cdnImage(DISCOVER_IMAGE, 960)} srcSet={cdnSrcSet(DISCOVER_IMAGE)}
              sizes="(max-width: 768px) 100vw, 50vw" width={1000} height={667}
              loading="lazy" decoding="async" alt="" />
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
                  <div className="media d-flex align-items-start">
                    <div className="pull-left flex-shrink-0">
                      <FontAwesomeIcon icon={faConciergeBell} color='#57cbcc' fontSize={"30px"} />
                    </div>
                    <div className="media-body flex-grow-1" style={{ verticalAlign: "middle" }}>
                      <h3 className="media-heading mt-0 mb-1">Check-in Automático</h3>
                      <p>Proceso de check-in sin contacto, fácil de seguir.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media d-flex align-items-start">
                    <div className="pull-left flex-shrink-0">
                      <FontAwesomeIcon icon={faDollarSign} color='#57cbcc' fontSize={"30px"} />

                    </div>
                    <div className="media-body flex-grow-1">
                      <h3 className="media-heading mt-0 mb-1">Precios Más Baratos</h3>
                      <p>Y descuentos adicionales al reservar directamente en el sitio web.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="media d-flex align-items-start">
                    <div className="pull-left flex-shrink-0">
                      <FontAwesomeIcon icon={faCancel} color='#57cbcc' fontSize={"30px"} />
                    </div>
                    <div className="media-body flex-grow-1" style={{ verticalAlign: "middle" }}>
                      <h3 className="media-heading mt-0 mb-1">Descuento No Reembolsable</h3>
                      <p>Incluye el código de descuento #norefundallowed al finalizar la compra para obtener un descuento adicional del 10%, pero no serás elegible para un reembolso por cancelación.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media d-flex align-items-start">
                    <div className="pull-left flex-shrink-0">
                      <FontAwesomeIcon icon={faCalendarCheck} color='#57cbcc' fontSize={"30px"} />

                    </div>
                    <div className="media-body flex-grow-1">
                      <h3 className="media-heading mt-0 mb-1">Política de Cancelación Flexible</h3>
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
