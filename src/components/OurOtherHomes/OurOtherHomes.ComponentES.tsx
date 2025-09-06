import React from 'react';
import { useNavigate } from "react-router-dom";
import './OurOtherHomes.style.scss'; // Import the SASS stylesheet
import OtherHomesCardRib from './Components/OtherHomesCard.componentRib';
import OtherHomesCard from './Components/OtherHomesCard.component';
import '../OurHomes/OurHomes.style.scss';

const OurOtherHomesES = () => {

  return (
    <div className="our-other-homes-container" >
      {/* Section Title - Centered in its own row */}
      <h2 className="section-title">Explore otras estadías únicas en Puerto Viejo y Playa Chiquita.</h2>

      {/* Wrapper for side-by-side layout */}
      <div className="sections-wrapper">
        {/* Left Section - Villas */}
        <div className="section">
          <h2>Villas de Lujo Con Piscina Privada En Playa Chiquita, Puerto Viejo.</h2>
          <div className="cards-container">
            <OtherHomesCardRib guestNumber={2} name="Villa Mar" image="https://drive.google.com/thumbnail?id=1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn&sz=w1000" redirectPath="/VillaMarES" />
            <OtherHomesCardRib guestNumber={2} name="Villa Coral" image="https://drive.google.com/thumbnail?id=1frKDGGLk1nJQQaxoxng6TgmUVzxTx08A&sz=w1000" redirectPath="/VillaCoralES" />
          </div>
        </div>

        {/* Right Section*/}
        <div className="section">
          <h2>Casitas Privadas A Solo Unos Pasos Playa Chiquita, Puerto Viejo</h2>
          <div className="cards-container">
          <OtherHomesCard guestNumber={2} name="Plumeria" image="https://drive.google.com/thumbnail?id=1JGQiusfHscT4pSE-1KpejP0uNLUBOTa-&sz=w1000" redirectPath="/PlumeriaES" />
          <OtherHomesCard guestNumber={4} name="Giulia" image="https://drive.google.com/thumbnail?id=1v3hAHbAjvFf9CYaJx7IV8JqTbDKK__8S&sz=w1000" redirectPath="/GiuliaES" />
          </div>
       </div>
      </div>
    </div>
  );
};

export default OurOtherHomesES;
