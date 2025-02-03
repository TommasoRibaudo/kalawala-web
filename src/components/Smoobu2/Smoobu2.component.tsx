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

function Smoobu2() {
  useEffect(() => {
    console.log('test smoobu');
    
    // Cargar el script de Smoobu
    const script = document.createElement('script');
    script.src = 'https://login.smoobu.com/js/Settings/BookingToolIframe.js';
    script.async = true;

    script.onload = () => {
      window.BookingToolIframe.initialize({
        url: 'https://login.smoobu.com/en/booking-tool/iframe/89210',
        baseUrl: 'https://login.smoobu.com/',
        target: '#apartmentIframeAll',
      });

      const apartmentFrame = document.getElementById('apartmentIframeAll');
      apartmentFrame!.classList.add('apartment-frame-loaded');

      // Observar el iframe para detectar cuando el calendario se haya cargado
      const observer = new MutationObserver(() => {
        const iframe = document.querySelector('#apartmentIframeAll iframe') as HTMLIFrameElement;
        console.log(iframe)
        if (iframe && iframe.contentDocument) {
          const availableDates = iframe.contentDocument.querySelectorAll('.available-date'); // Ajusta el selector a las clases del DOM real

          if (availableDates.length > 0) {
            // Simular un clic en la primera fecha disponible
            const firstAvailableDate = availableDates[0] as HTMLElement;
            firstAvailableDate.click();
            console.log('Primera fecha disponible seleccionada:', firstAvailableDate);

            observer.disconnect(); // Dejar de observar una vez seleccionada la fecha
          }
        }
      });

      const targetNode = document.getElementById('apartmentIframeAll');
      if (targetNode) {
        observer.observe(targetNode, { childList: true, subtree: true });
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="apartmentIframeAll">
      {/* Aquí se cargará el Booking Tool de Smoobu */}
    </div>
  );
}

export default Smoobu2;
