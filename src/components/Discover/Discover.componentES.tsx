import React from 'react';
import './Discover.style.scss';
import { Image } from 'react-bootstrap';
import image from "../../assets/images/about/about-second-page.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faConciergeBell, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const  DiscoverES = () => {
  return (
    <section className="section about-2 padding-0 b-light" id="about">
      
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 padding-0">
            <Image className="img-responsive" src="https://drive.google.com/thumbnail?id=1RIAdGXizO6a6cCoL8ErA881olP-9YGNW&sz=w1000"  alt="" />
          </div>
          <div className="col-md-6">
            <div className="content-block">
              <h2>Descubre Puerto Viejo desde el confort de nuestras casas.</h2>
              <p>Reservas Kalawala ofrece 4 casas remodeladas, <b>con una cocina y baño totalmente equipados</b>. Cada casa cuenta con 2 habitaciones y <b>2 unidades de aire acondicionado</b>.</p>
              <p>Ubicado en el centro de Puerto Viejo, todos los bares y restaurantes estan una a <b>distancia comodamente caminable </b>. Se puede llegar a Playa Cocles en auto en 2 minutos. Tambien hay lugares de renta de bicicletas y motocicletas para que tambien Punta Uva, Cahuita y Manzanillo estén a tu alcance, incluso sin un auto!</p>
              <p><b>Trabajas desde casa?</b> Ofrecemos <b>WIFI gratis</b>, con una velocidad de hasta <b>100Mbps</b>. Estipulamos dos contratos diferentes con nuestro proveedor de internet, por lo que tu conexión a internet será compartida entre menos dispositivos, logrando una menor latencia durante tus reuniones.</p>
              <p><b>Pet Friendly!</b> En todos nuestros espacios. Casa Rana y Casa Gecko son las opciones perfectas para tu mascota, ya que cuentan con jardín. ¡Pero una pequeña mascota doméstica también podría alojarse cómodamente en las otras casas</p>
              <div className="row">
                <div className="col-md-6">
                  <div className="media">
                    <div className="pull-left">
                      <FontAwesomeIcon icon={faConciergeBell} color='#57cbcc' fontSize={"30px"}/>
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
                      <FontAwesomeIcon icon={faCalendarCheck} color='#57cbcc' fontSize={"30px"}/>

                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">Politica de cancelacion flexible</h4>
                      <p>Devolución hasta un día antes del check-in.</p>
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

export default DiscoverES;
