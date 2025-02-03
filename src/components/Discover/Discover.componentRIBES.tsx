import React from 'react';
import './Discover.style.scss';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faConciergeBell, faCalendarCheck, faDollarSign, faCancel } from '@fortawesome/free-solid-svg-icons';

const DiscoverRIBES = () => {
  return (
    <section className="section about-2 padding-0 b-light" id="about">

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 padding-0">
            <Image className="img-responsive" src="https://drive.google.com/thumbnail?id=13FO4GX8mxrPWVvYxgxZwLSoX562YeZ6o&sz=w1000" alt="" />
          </div>
          <div className="col-md-6">
            <div className="content-block">
              <h2>Villas de Lujo con Piscina Privada a Solo 2 Minutos de Punta Uva</h2>
              <p>Explore la costa caribeña cómodamente desde nuestras villas en Playa Chiquita, Puerto Viejo. Cada casa cuenta con una cocina y un baño privados totalmente equipados. Con un dormitorio y dos unidades de aire acondicionado, tendrá todo lo que necesita para una estancia relajante.</p>
              <p>Rodeadas de naturaleza, cada villa ofrece una piscina privada exclusiva para su uso. La playa de Punta Uva está a solo 2 minutos en coche, y podemos ayudarle a organizar el alquiler de scooters o cuadras para explorar fácilmente Cocles, Cahuita y Manzanillo, ¡incluso sin automóvil!</p>
              <p>¿Trabaja desde casa? Ofrecemos Wi-Fi gratuito y conexiones Ethernet con velocidades de hasta 100 Mbps. Contamos con dos fuentes de internet diferentes, por lo que podemos cambiar entre ellas en caso de una interrupción del servicio.</p><div className="row">
              <div className="row">
                <div className="col-md-6">
                  <div className="media">
                    <div className="pull-left">
                      <FontAwesomeIcon icon={faConciergeBell} color='#57cbcc' fontSize={"30px"} />
                    </div>
                    <div className="media-body" style={{ verticalAlign: "middle" }}>
                      <h4 className="media-heading">Check-in Automatico</h4>
                      <p>Facil de seguir, check-in sin necesidad de contactar!.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media">
                    <div className="pull-left">
                      <FontAwesomeIcon icon={faDollarSign} color='#57cbcc' fontSize={"30px"} />
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">Precios Más Económicos</h4>
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
                      <p>Incluya el código de descuento #norefundallowed al finalizar la compra para obtener un 10% de descuento adicional, pero no será elegible para un reembolso por cancelación.</p>
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
      </div>
    </section>
  );
}

export default DiscoverRIBES;
