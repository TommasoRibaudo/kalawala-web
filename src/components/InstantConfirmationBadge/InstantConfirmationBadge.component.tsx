import React from 'react';
import './InstantConfirmationBadge.style.scss';
import type { Locale } from '../../i18n';

interface InstantConfirmationBadgeProps {
  locale: Locale;
}

const InstantConfirmationBadge: React.FC<InstantConfirmationBadgeProps> = ({ locale }) => {
  return (
    <div className="instant-confirmation-badge">
      <span className="checkmark">✔</span>
      <span className="text">
        {locale === 'es' ? 'Confirmación inmediata' : 'Instant confirmation'}
      </span>
    </div>
  );
};

export default InstantConfirmationBadge;