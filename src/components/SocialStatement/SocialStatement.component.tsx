import React from 'react';
import { PROPERTY_MARKETING_CONFIG } from '../../utils/constants';
import './SocialStatement.style.scss';

interface SocialStatementProps {
  propertyKey: string;
  isSpanish: boolean;
}

const SocialStatement: React.FC<SocialStatementProps> = ({ 
  propertyKey, 
  isSpanish 
}) => {
  const config = PROPERTY_MARKETING_CONFIG[propertyKey];
  
  // Gracefully handle missing configuration
  if (!config) {
    return null;
  }

  const socialStatement = isSpanish 
    ? config.socialStatement.es 
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