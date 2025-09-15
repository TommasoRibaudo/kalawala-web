import { useEffect, useState } from 'react';
import './Smoobu.style.scss';
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

interface ISmoobu {
  homeCode?: number;
}

function Smoobu({ homeCode }: ISmoobu) {
  const [key, setKey] = useState(0); // Add key state
  const smoobuUrl: string = process.env.REACT_APP_SMOOBU_URL!;
  const houseCodesObject = JSON.parse(process.env.REACT_APP_HOUSE_CODES!);
  const url: string = homeCode ? smoobuUrl + houseCodesObject[homeCode] : smoobuUrl;

  useEffect(() => {
    if (homeCode) {
      const script = document.createElement('script');
      script.src = 'https://login.smoobu.com/js/Settings/BookingToolIframe.js';
      script.async = true;
      script.onload = () => {
        window.BookingToolIframe.initialize({
          url: url,
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
    }

  }, [homeCode, url]);

  useEffect(() => {
    setKey(prevKey => prevKey + 1); // Increment key to trigger component re-render
  }, [homeCode]);

  if (!homeCode) {
    return null; // Return null if homeCode is not provided to unmount the component
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div key={key} id="apartmentIframeAll">
        {/* Placeholder for the Smoobu Booking Tool */}
      </div>
      <p style={{ color: 'black', fontWeight: 550, fontSize: 12 }}>
        Add Discount code: <strong>#norefundallowed</strong> Reservation becomes Non Refundable / Agrega el codigo para obtener un descuento pero la Reservación no tendrá reembolso
      </p>
    </div>
  );

}

export default Smoobu;

