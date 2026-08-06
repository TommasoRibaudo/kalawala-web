import React from 'react';
import { PROPERTY_MARKETING_CONFIG } from '../../utils/constants';
import './FeatureHighlights.style.scss';
import type { Locale } from '../../i18n';

interface FeatureHighlightsProps {
  propertyKey: string;
  propertyName: string;
  locale: Locale;
}

const FeatureHighlights: React.FC<FeatureHighlightsProps> = ({ 
  propertyKey, 
  propertyName,
  locale 
}) => {
  const config = PROPERTY_MARKETING_CONFIG[propertyKey];
  
  // Gracefully handle missing configuration
  if (!config) {
    return null;
  }

  const features = locale === 'es' ? config.featureHighlights.es 
    : config.featureHighlights.en;

  const sectionTitle = locale === 'es' ? `¿Por qué los huéspedes eligen ${propertyName}?`
    : `Why guests choose ${propertyName}`;

  return (
    <div className="feature-highlights">
      <h2 className="feature-highlights__title">
        {sectionTitle}
      </h2>
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