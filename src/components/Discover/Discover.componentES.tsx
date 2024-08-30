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
              <p>Reservas Kalawala ofrece 4 casas remodeladas, <b>con una cocina y baño totalmente equipados</b>. Casa casa cuenta con 2 habitaciones y <b>2 unidades de aire acondicionado</b>.</p>
              <p>Ubicado en el centro de Puerto Viejo, todos los bares y restaurantes estan una a <b>distancia comodamente caminable </b>. Se puede llegar a Playa Cocles en auto en 2 minutos, y hay lugares de renta de bicicletas y motocicletas para que tambien Punta Uva, Cahuita y Manzanillo estén a tu alcance, incluso sin un auto!</p>
              <p><b>Trabajas desde casa?</b> Ofrecemos <b>WIFI gratis</b>, con una velocidad de hasta <b>100Mbps</b>. We stipulated two different contracts with our internet provider, so your internet connection will be shared between fewer devices, achieving less latency during meetings.</p>
              <p><b>Pet Friendly!</b> In all ouBr spaces. Casa Rana and Casa Gecko are the perfect options for your pet, as they come with a garden. But a small house pet could comfortably stay in the other houses too!</p>
              <div className="row">
                <div className="col-md-6">
                  <div className="media">
                    <div className="pull-left">
                      <FontAwesomeIcon icon={faConciergeBell} color='#57cbcc' fontSize={"30px"}/>
                    </div>
                    <div className="media-body" style={{ verticalAlign: "middle" }}>
                      <h4 className="media-heading">Self Check-in</h4>
                      <p>Easy to follow, contactless check-in process.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="media">
                    <div className="pull-left">
                      <FontAwesomeIcon icon={faCalendarCheck} color='#57cbcc' fontSize={"30px"}/>

                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">Flexible Cancellation Policy</h4>
                      <p>Full refund up to one day before check-in.</p>
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
