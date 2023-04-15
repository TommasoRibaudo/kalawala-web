import { useEffect } from 'react';
import './Smooboo.style.scss';
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

export function Smoobu() {
  useEffect(() => {
    console.log('test');
    const script = document.createElement('script');
    script.src = 'https://login.smoobu.com/js/Settings/BookingToolIframe.js';
    script.async = true;
    script.onload = () => {
      window.BookingToolIframe.initialize({
        url: 'https://login.smoobu.com/en/booking-tool/iframe/89210',
        baseUrl: 'https://login.smoobu.com/',
        target: '#apartmentIframeAll'
      });
      const apartmentFrame = document.getElementById('apartmentIframeAll');
      apartmentFrame!.classList.add('apartment-frame-loaded');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="apartmentIframeAll">
      {/* Placeholder for the Smoobu Booking Tool */}
    </div>
  );
}
