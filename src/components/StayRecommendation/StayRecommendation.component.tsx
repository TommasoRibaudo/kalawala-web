import React from 'react';
import './StayRecommendation.style.scss';

interface PropertyRecommendation {
  name: string;
  reason: string;
  link: string;
}

interface StayRecommendationProps {
  title: string;
  properties: PropertyRecommendation[];
}

const StayRecommendation: React.FC<StayRecommendationProps> = ({ title, properties }) => {
  return (
    <div className="stay-recommendation">
      <div className="stay-recommendation__container">
        <h2 className="stay-recommendation__title">{title}</h2>
        <div className="stay-recommendation__properties">
          {properties.map((property, index) => (
            <div key={index} className="stay-recommendation__property">
              <a 
                href={property.link} 
                className="stay-recommendation__property-link"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <div className="stay-recommendation__property-content">
                  <h3 className="stay-recommendation__property-name">{property.name}</h3>
                  <p className="stay-recommendation__property-reason">{property.reason}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StayRecommendation;