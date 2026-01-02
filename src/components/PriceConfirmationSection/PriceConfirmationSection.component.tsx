import React from 'react';
import { PROPERTY_MARKETING_CONFIG } from '../../utils/constants';
import InstantConfirmationBadge from '../InstantConfirmationBadge/InstantConfirmationBadge.component';
import './PriceConfirmationSection.style.scss';

interface PriceConfirmationSectionProps {
  propertyKey: string;
  isSpanish: boolean;
}

const PriceConfirmationSection: React.FC<PriceConfirmationSectionProps> = ({
  propertyKey,
  isSpanish
}) => {
  const config = PROPERTY_MARKETING_CONFIG[propertyKey];
  
  if (!config) {
    return null;
  }

  const formatPrice = (price: number, currency: 'CRC' | 'USD') => {
    if (currency === 'CRC') {
      return `${price.toLocaleString()} CRC`;
    }
    return `$${price}`;
  };

  const priceText = isSpanish 
    ? `Precio promedio: ${formatPrice(config.price.crc, 'CRC')} la noche`
    : `Average price: ${formatPrice(config.price.usd, 'USD')} per night`;

  return (
    <div className="price-confirmation-section">
      <div className="price-display">
        {priceText}
      </div>
      <div className="confirmation-badge">
        <InstantConfirmationBadge isSpanish={isSpanish} />
      </div>
    </div>
  );
};

export default PriceConfirmationSection;