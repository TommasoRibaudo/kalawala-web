import React from 'react';
import './OurOtherHomes.style.scss'; // Import the SASS stylesheet
import OtherHomesCardRib from './Components/OtherHomesCard.componentRib';
import OtherHomesCard from './Components/OtherHomesCard.component';
import '../OurHomes/OurHomes.style.scss';
import { useLocale, useMessages } from '../../i18n';
import { localeSuffix } from '../../i18n/paths';

const OurOtherHomes = () => {
  const locale = useLocale();
  const m = useMessages();

  // The Spanish copy hardcoded "/VillaMarES", "/PlumeriaES" and so on. Building
  // the suffix instead keeps the four paths in one place, and PHASE 4 replaces
  // this single call with a routes.config.ts lookup rather than eight literals.
  const suffix = localeSuffix(locale);

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
            <OtherHomesCardRib guestNumber={2} name="Villa Mar" image="https://lh3.googleusercontent.com/d/1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn=w1000" redirectPath={`/VillaMar${suffix}`} />
            <OtherHomesCardRib guestNumber={2} name="Villa Coral" image="https://lh3.googleusercontent.com/d/1frKDGGLk1nJQQaxoxng6TgmUVzxTx08A=w1000" redirectPath={`/VillaCoral${suffix}`} />
          </div>
        </div>

        {/* Right Section */}
        <div className="section">
          <h2>{m.sections.privateRetreat}</h2>
          <div className="cards-container">
          <OtherHomesCard guestNumber={2} name="Casa Plumeria" image="https://lh3.googleusercontent.com/d/1JGQiusfHscT4pSE-1KpejP0uNLUBOTa-=w1000" redirectPath={`/Plumeria${suffix}`} />
          <OtherHomesCard guestNumber={4} name="Casa Giulia" image="https://lh3.googleusercontent.com/d/1v3hAHbAjvFf9CYaJx7IV8JqTbDKK__8S=w1000" redirectPath={`/Giulia${suffix}`} />
          </div>
       </div>
      </div>
    </div>
  );
};

export default OurOtherHomes;
