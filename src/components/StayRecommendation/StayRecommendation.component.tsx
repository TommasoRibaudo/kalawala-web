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
  language?: 'en' | 'es';
}

const StayRecommendation: React.FC<StayRecommendationProps> = ({ title, properties, language = 'es' }) => {
  const translations = {
    en: {
      defaultTitle: "Where to stay if you only have 2 days in Puerto Viejo?"
    },
    es: {
      defaultTitle: "¿Dónde hospedarte si solo tienes 2 días en Puerto Viejo?"
    }
  };

  const currentTranslations = translations[language];
  return (
    <div className="stay-recommendation">
      <div className="stay-recommendation__container">
        <h3 className="stay-recommendation__title">{title}</h3>
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
                  <h4 className="stay-recommendation__property-name">{property.name}</h4>
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