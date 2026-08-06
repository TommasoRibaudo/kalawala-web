import React from 'react';
import { PROPERTY_MARKETING_CONFIG } from '../../utils/constants';
import './ListingMarketingSection.style.scss';
import type { Locale } from '../../i18n';
import { pickLocalized } from '../../i18n';

interface ListingMarketingSectionProps {
  propertyKey: string;
  locale: Locale;
}

const ListingMarketingSection: React.FC<ListingMarketingSectionProps> = ({ 
  propertyKey, 
  locale 
}) => {
  const config = PROPERTY_MARKETING_CONFIG[propertyKey];
  
  // Gracefully handle missing configuration
  if (!config) {
    return null;
  }

  const descriptiveTitle = pickLocalized(config.descriptiveTitle, locale);

  return (
    <div className="listing-marketing-section">
      <div className="descriptive-title">
        {descriptiveTitle}
      </div>
    </div>
  );
};

export default ListingMarketingSection;