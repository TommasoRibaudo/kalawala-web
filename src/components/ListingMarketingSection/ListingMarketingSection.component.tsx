import React from 'react';
import { PROPERTY_MARKETING_CONFIG } from '../../utils/constants';
import './ListingMarketingSection.style.scss';

interface ListingMarketingSectionProps {
  propertyKey: string;
  isSpanish: boolean;
}

const ListingMarketingSection: React.FC<ListingMarketingSectionProps> = ({ 
  propertyKey, 
  isSpanish 
}) => {
  const config = PROPERTY_MARKETING_CONFIG[propertyKey];
  
  // Gracefully handle missing configuration
  if (!config) {
    return null;
  }

  const descriptiveTitle = isSpanish ? config.descriptiveTitle.es : config.descriptiveTitle.en;

  return (
    <div className="listing-marketing-section">
      <div className="descriptive-title">
        {descriptiveTitle}
      </div>
    </div>
  );
};

export default ListingMarketingSection;