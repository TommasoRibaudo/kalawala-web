import React from 'react';
import { useNavigate } from "react-router-dom";
import './OurOtherHomes.style.scss'; // Import the SASS stylesheet
import OtherHomesCard from './Components/OtherHomesCard.component';
import '../OurHomes/OurHomes.style.scss';

const OurOtherHomesRIB = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
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
          <p>Like Nothing Else in Puerto Viejo Centre!</p>
          <div className="cards-container">
            <OtherHomesCard guestNumber={5} name="Casa Tucano" image="https://drive.google.com/thumbnail?id=10qvLOMLs4_JsBIF99igVeh4baDR7EB-Q&sz=w1000" />
            <OtherHomesCard guestNumber={5} name="Casa Geco" image="https://drive.google.com/thumbnail?id=1jT7zlcGcyVcxulbxFo-DQ7x9zc5FE9HF&sz=w1000" />
          </div>
        </div>

        {/* Right Section - Coming Soon */}
        <div className="section">
        <p>Casitas Namaitami Coming Soon...</p>
        </div>
      </div>
    </div>
  );
};

export default OurOtherHomesRIB;
