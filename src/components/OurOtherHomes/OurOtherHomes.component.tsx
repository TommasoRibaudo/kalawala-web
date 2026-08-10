import React from 'react';
import './OurOtherHomes.style.scss'; // Import the SASS stylesheet
import OtherHomesCardRib from './Components/OtherHomesCard.componentRib';
import OtherHomesCard from './Components/OtherHomesCard.component';
import '../OurHomes/OurHomes.style.scss';
import { useLocale, useMessages } from '../../i18n';
import { pathForKey } from '../../routes.config';
import { houseDataByLangCode } from '../../utils/constants';

// Only private *fenced* parking earns the card icon — unfenced/outside
// parking doesn't count, per product decision.
const hasFencedParking = (houseLangCode: string): boolean =>
  houseDataByLangCode(houseLangCode)?.parking ?? false;

const OurOtherHomes = () => {
  const locale = useLocale();
  const m = useMessages();

  return (
    <div className="our-other-homes-container" >
      {/* Section Title - Centered in its own row */}
      <h2 className="section-title">{m.sections.exploreOtherStays}</h2>

      {/* Wrapper for side-by-side layout */}
      <div className="sections-wrapper">
        {/* Left Section - Villas */}
        <div className="section">
          <h2>{m.sections.villasWithPool}</h2>
          <div className="cards-container">
            <OtherHomesCardRib guestNumber={2} name="Villa Mar" hasFencedParking={hasFencedParking('VillaMar')} image="https://lh3.googleusercontent.com/d/1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn=w1000" redirectPath={pathForKey('villamar', locale)} />
            <OtherHomesCardRib guestNumber={2} name="Villa Coral" hasFencedParking={hasFencedParking('VillaCoral')} image="https://lh3.googleusercontent.com/d/1frKDGGLk1nJQQaxoxng6TgmUVzxTx08A=w1000" redirectPath={pathForKey('villacoral', locale)} />
          </div>
        </div>

        {/* Right Section */}
        <div className="section">
          <h2>{m.sections.privateRetreat}</h2>
          <div className="cards-container">
          <OtherHomesCard guestNumber={2} name="Casa Plumeria" hasFencedParking={hasFencedParking('Plumeria')} image="https://lh3.googleusercontent.com/d/1JGQiusfHscT4pSE-1KpejP0uNLUBOTa-=w1000" redirectPath={pathForKey('plumeria', locale)} />
          <OtherHomesCard guestNumber={4} name="Casa Giulia" hasFencedParking={hasFencedParking('Giulia')} image="https://lh3.googleusercontent.com/d/1v3hAHbAjvFf9CYaJx7IV8JqTbDKK__8S=w1000" redirectPath={pathForKey('giulia', locale)} />
          </div>
       </div>
      </div>
    </div>
  );
};

export default OurOtherHomes;
