import React from 'react';
import { PROPERTY_MARKETING_CONFIG } from '../../utils/constants';
import './SocialStatement.style.scss';
import type { Locale } from '../../i18n';

interface SocialStatementProps {
  propertyKey: string;
  locale: Locale;
}

const SocialStatement: React.FC<SocialStatementProps> = ({ 
  propertyKey, 
  locale 
}) => {
  const config = PROPERTY_MARKETING_CONFIG[propertyKey];
  
  // Gracefully handle missing configuration
  if (!config) {
    return null;
  }

  const socialStatement = locale === 'es' ? config.socialStatement.es 
    : config.socialStatement.en;

  return (
    <div className="social-statement">
      <p className="social-statement__text">
        {socialStatement}
      </p>
    </div>
  );
};

export default SocialStatement;