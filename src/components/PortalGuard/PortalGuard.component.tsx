import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useLocale } from '../../i18n';
import { readPortalToken } from '../../services/PortalSession.service';
import { pathForKey } from '../../routes.config';

const PortalGuard = ({ children }: { children: React.ReactNode }) => {
  const locale = useLocale();
  const { reservationPublicId } = useParams<{ reservationPublicId: string }>();
  const token = readPortalToken();

  if (!token) {
    const loginBase = pathForKey('portal', locale);
    const redirectTo = reservationPublicId
      ? `${loginBase}?reservationId=${encodeURIComponent(reservationPublicId)}`
      : loginBase;
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default PortalGuard;
