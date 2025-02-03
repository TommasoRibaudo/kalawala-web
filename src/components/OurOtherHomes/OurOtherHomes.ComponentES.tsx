import React from 'react';
import { useNavigate } from "react-router-dom";
import './OurOtherHomes.style.scss'; // Importa el archivo SASS
import OtherHomesCard from './Components/OtherHomesCard.component';
import '../OurHomes/OurHomes.style.scss';

const OurOtherHomesES = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/homeVillasES');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  return (
    <div className="our-other-homes-container">
      {/* Título principal - Centrado en su propia fila */}
      <h2 className="section-title">Descubre otras opciones únicas en Puerto Viejo y Playa Chiquita.</h2>

      {/* Contenedor de secciones en fila */}
      <div className="sections-wrapper">
        {/* Sección izquierda - Villas */}
        <div className="section" onClick={handleClick}>
          <h2>Villas de lujo con piscina privada en Playa Chiquita, Puerto Viejo.</h2>
          <div className="cards-container">
            <OtherHomesCard guestNumber={2} name="Villa Mar" image="https://drive.google.com/thumbnail?id=1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn&sz=w1000" />
            <OtherHomesCard guestNumber={2} name="Villa Coral" image="https://drive.google.com/thumbnail?id=1frKDGGLk1nJQQaxoxng6TgmUVzxTx08A&sz=w1000" />
          </div>
        </div>

        {/* Sección derecha - Próximamente */}
        <div className="section">
          <h2>Casitas Namaitami - ¡Próximamente!</h2>
        </div>
      </div>
    </div>
  );
};

export default OurOtherHomesES;
