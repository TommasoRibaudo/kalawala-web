import React from 'react';
import { useNavigate } from "react-router-dom";
import './OurOtherHomes.style.scss'; // Import the SASS stylesheet
import OtherHomesCard from './Components/OtherHomesCard.component';
import '../OurHomes/OurHomes.style.scss';

const OurOtherHomesRIBES = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/HomeES');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  const handleClickNam = () => {
    navigate('/HomeNamES');
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
          <h2>Casitas Kalawala, Las Casas Vacacionales De Tus Sueños </h2>
          <div className="cards-container">
            <OtherHomesCard guestNumber={5} name="Casa Tucano" image="https://drive.google.com/thumbnail?id=10qvLOMLs4_JsBIF99igVeh4baDR7EB-Q&sz=w1000" />
            <OtherHomesCard guestNumber={5} name="Casa Geco" image="https://drive.google.com/thumbnail?id=1jT7zlcGcyVcxulbxFo-DQ7x9zc5FE9HF&sz=w1000" />
          </div>
        </div>

        {/* Right Section - Coming Soon */}
        <div className="section" onClick={handleClickNam}>
          <h2>Casitas privadas A Solo Unos Pasos Playa Chiquita, Puerto Viejo</h2>
          <div className="cards-container">
            <OtherHomesCard guestNumber={2} name="Plumeria" image="https://drive.google.com/thumbnail?id=1JGQiusfHscT4pSE-1KpejP0uNLUBOTa-&sz=w1000" />
            <OtherHomesCard guestNumber={4} name="Giulia" image="https://drive.google.com/thumbnail?id=1v3hAHbAjvFf9CYaJx7IV8JqTbDKK__8S&sz=w1000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurOtherHomesRIBES;
