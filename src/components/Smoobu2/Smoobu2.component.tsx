import { useEffect } from 'react';
import './Smoobu2.style.scss';
import React from 'react';

declare global {
  interface Window {
    BookingToolIframe: {
      initialize: (params: {
        url: string;
        baseUrl: string;
        target: string;
      }) => void;
    };
  }
}

interface Smoobu2Props {
  targetId?: string;
}

function Smoobu2({ targetId = 'apartmentIframeAll' }: Smoobu2Props) {
  useEffect(() => {
    
    // Cargar el script de Smoobu
    const script = document.createElement('script');
    script.src = 'https://login.smoobu.com/js/Settings/BookingToolIframe.js';
    script.async = true;

    script.onload = () => {
      window.BookingToolIframe.initialize({
        url: 'https://login.smoobu.com/en/booking-tool/iframe/89210',
        baseUrl: 'https://login.smoobu.com/',
        target: `#${targetId}`,
      });

      const apartmentFrame = document.getElementById(targetId);
      apartmentFrame!.classList.add('apartment-frame-loaded');

      // Observar el iframe para detectar cuando el calendario se haya cargado
      const observer = new MutationObserver(() => {
        const iframe = document.querySelector(`#${targetId} iframe`) as HTMLIFrameElement;
        if (iframe && iframe.contentDocument) {
          const availableDates = iframe.contentDocument.querySelectorAll('.available-date'); // Ajusta el selector a las clases del DOM real

          if (availableDates.length > 0) {
            // Simular un clic en la primera fecha disponible
            const firstAvailableDate = availableDates[0] as HTMLElement;
            firstAvailableDate.click();

            observer.disconnect(); // Dejar de observar una vez seleccionada la fecha
          }
        }
      });

      const targetNode = document.getElementById(targetId);
      if (targetNode) {
        observer.observe(targetNode, { childList: true, subtree: true });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [targetId]);

  return (
    <div id={targetId}>
      {/* Aquí se cargará el Booking Tool de Smoobu */}
    </div>
  );
}

export default Smoobu2;
