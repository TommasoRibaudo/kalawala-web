import React from 'react';
import { useNavigate } from "react-router-dom";
import './OurOtherHomes.style.scss'; // Import the SASS stylesheet
import OtherHomesCard from './Components/OtherHomesCard.component';
import '../OurHomes/OurHomes.style.scss';

const OurOtherHomes = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/HomeNam');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  };

  return (
    <div className="our-other-homes-container" >
      {/* Section Title - Centered in its own row */}
      <h2 className="section-title">Explore Other Unique Stays in Puerto Viejo & Playa Chiquita.</h2>

      {/* Wrapper for side-by-side layout */}
      <div className="sections-wrapper">
        {/* Left Section - Villas */}
        <div className="section" onClick={handleClick}>
          <h2>Private Pool Luxury Villas in Playa Chiquita, Puerto Viejo.</h2>
          <div className="cards-container">
            <OtherHomesCard guestNumber={2} name="Villa Mar" image="https://drive.google.com/thumbnail?id=1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn&sz=w1000" />
            <OtherHomesCard guestNumber={2} name="Villa Coral" image="https://drive.google.com/thumbnail?id=1frKDGGLk1nJQQaxoxng6TgmUVzxTx08A&sz=w1000" />
          </div>
        </div>

        {/* Right Section - Coming Soon */}
        <div className="section">
          <h2>Casitas Namaitami Coming Soon...</h2>
        </div>
      </div>
    </div>
  );
};

export default OurOtherHomes;
