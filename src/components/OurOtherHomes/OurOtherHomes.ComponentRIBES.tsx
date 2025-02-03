import React from 'react';
import { useNavigate } from "react-router-dom";
import './OurOtherHomes.style.scss'; // Importa el archivo SASS
import OtherHomesCard from './Components/OtherHomesCard.component';
import '../OurHomes/OurHomes.style.scss';

const OurOtherHomesRIBES = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/homeES');
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
          <h2>Casas Familiares en Puerto Viejo Centro.</h2>
          <div className="cards-container">
            <OtherHomesCard guestNumber={5} name="Casa Tucano" image="https://drive.google.com/thumbnail?id=10qvLOMLs4_JsBIF99igVeh4baDR7EB-Q&sz=w1000" />
            <OtherHomesCard guestNumber={5} name="Casa Geco" image="https://drive.google.com/thumbnail?id=1jT7zlcGcyVcxulbxFo-DQ7x9zc5FE9HF&sz=w1000" />
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

export default OurOtherHomesRIBES;
