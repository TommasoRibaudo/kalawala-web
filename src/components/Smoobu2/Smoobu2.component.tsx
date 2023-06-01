import { useEffect } from 'react';
import './Smoobu2.style.scss';
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

export default Smoobu2;