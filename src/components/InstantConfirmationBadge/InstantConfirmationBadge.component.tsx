import React from 'react';
import './InstantConfirmationBadge.style.scss';

interface InstantConfirmationBadgeProps {
  isSpanish: boolean;
}

const InstantConfirmationBadge: React.FC<InstantConfirmationBadgeProps> = ({ isSpanish }) => {
  return (
    <div className="instant-confirmation-badge">
      <span className="checkmark">✔</span>
      <span className="text">
        {isSpanish ? 'Confirmación inmediata' : 'Instant confirmation'}
      </span>
    </div>
  );
};

export default InstantConfirmationBadge;