import React from 'react';
import { useNavigate } from "react-router-dom";
import './OurOtherHomes.style.scss'; // Import the SASS stylesheet
import OtherHomesCard from './Components/OtherHomesCard.component';
import OtherHomesCardRib from './Components/OtherHomesCard.componentRib';

import '../OurHomes/OurHomes.style.scss';

const OurOtherHomesNamES = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/HomeVillasES');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };
  const handleClick2 = () => {
    navigate('/HomeES');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  return (
    <div className="our-other-homes-container" >
      {/* Section Title - Centered in its own row */}
      <h2 className="section-title">Explore Otras Estadías Únicas En Puerto Viejo y Playa Chiquita.</h2>

      {/* Wrapper for side-by-side layout */}
      <div className="sections-wrapper">
        {/* Left Section - Villas */}
        <div className="section" onClick={handleClick}>
          <h2>Villas De Lujo Con Piscina Privada En Playa Chiquita, Puerto Viejo.</h2>
          <div className="cards-container">
            <OtherHomesCardRib guestNumber={2} name="Villa Mar" image="https://drive.google.com/thumbnail?id=1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn&sz=w1000" />
            <OtherHomesCardRib guestNumber={2} name="Villa Coral" image="https://drive.google.com/thumbnail?id=1frKDGGLk1nJQQaxoxng6TgmUVzxTx08A&sz=w1000" />
          </div>
        </div>

        {/* Right Section - Coming Soon */}
        <div className="section" onClick={handleClick2}>
          <h2>Casitas Kalawala, Las Casas Vacacionales De Tus Sueños</h2>
          <div className="cards-container">
            <OtherHomesCard guestNumber={5} name="Tucano" image="https://drive.google.com/thumbnail?id=10qvLOMLs4_JsBIF99igVeh4baDR7EB-Q&sz=w1000" />
            <OtherHomesCard guestNumber={5} name="Geco" image="https://drive.google.com/thumbnail?id=1jT7zlcGcyVcxulbxFo-DQ7x9zc5FE9HF&sz=w1000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurOtherHomesNamES;
