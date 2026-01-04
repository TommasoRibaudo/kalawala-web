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

  const averageText = isSpanish ? 'promedio' : 'Average';
  const tooltipText = isSpanish
    ? 'Los precios pueden variar según la temporada y pueden ser más altos que el precio promedio'
    : 'Prices may vary according to season and might be higher than the average price';

  const priceText = isSpanish
    ? (
      <>
        Precio {averageText}: {formatPrice(config.price.crc, 'CRC')} la noche{' '}
        <span className="average-indicator">
          <span className="info-icon">ⓘ</span>
          <span className="tooltip">{tooltipText}</span>
        </span>
      </>
    )
    : (
      <>
        {averageText} price: {formatPrice(config.price.usd, 'USD')} per night{' '}
        <span className="average-indicator">
          <span className="info-icon">ⓘ</span>
          <span className="tooltip">{tooltipText}</span>
        </span>
      </>
    );

  return (
    <div className="price-confirmation-section">
      <div className="price-display">
        {priceText}
      </div>
      <div className="confirmation-badge">
        <InstantConfirmationBadge isSpanish={isSpanish} />
      </div>
      <p className='price-display' style={{ marginTop: '15px' }}>
        {isSpanish ? (
          <><>
            Código de descuento: <strong>#norefundallowed</strong>
          </>
            <br />
            <>
              La reservación se vuelve No Reembolsable
            </>
          </>
        ) : (
          <><>
            Discount code: <strong>#norefundallowed</strong>
          </>
            <br />
            <>
              Reservation becomes Non Refundable
            </>
          </>
        )}
      </p>
    </div>
  );
};

export default PriceConfirmationSection;