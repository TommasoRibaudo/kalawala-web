import React from 'react';
import { PROPERTY_MARKETING_CONFIG } from '../../utils/constants';
import './FeatureHighlights.style.scss';

interface FeatureHighlightsProps {
  propertyKey: string;
  propertyName: string;
  isSpanish: boolean;
}

const FeatureHighlights: React.FC<FeatureHighlightsProps> = ({ 
  propertyKey, 
  propertyName,
  isSpanish 
}) => {
  const config = PROPERTY_MARKETING_CONFIG[propertyKey];
  
  // Gracefully handle missing configuration
  if (!config) {
    return null;
  }

  const features = isSpanish 
    ? config.featureHighlights.es 
    : config.featureHighlights.en;

  const sectionTitle = isSpanish 
    ? `¿Por qué los huéspedes eligen ${propertyName}?`
    : `Why guests choose ${propertyName}`;

  return (
    <div className="feature-highlights">
      <h3 className="feature-highlights__title">
        {sectionTitle}
      </h3>
      <ul className="feature-highlights__list">
        {features.map((feature, index) => (
          <li key={index} className="feature-highlights__item">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureHighlights;