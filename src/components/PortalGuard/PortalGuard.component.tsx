import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useLanguageDetection } from '../../hooks/useLanguageDetection';
import { readPortalToken } from '../../services/PortalSession.service';

const PortalGuard = ({ children }: { children: React.ReactNode }) => {
  const isSpanishPage = useLanguageDetection();
  const { reservationPublicId } = useParams<{ reservationPublicId: string }>();
  const token = readPortalToken();

  if (!token) {
    const loginBase = isSpanishPage ? '/portalES' : '/portal';
    const redirectTo = reservationPublicId
      ? `${loginBase}?reservationId=${encodeURIComponent(reservationPublicId)}`
      : loginBase;
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default PortalGuard;
