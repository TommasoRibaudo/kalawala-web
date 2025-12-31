import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import OurHomesES from "../../components/OurHomes/OurHomes.componentES";
import WelcomeSliderES from "../../components/WelcomeSlider/WelcomeSlider.componentES";
import { houseDataList } from '../../utils/constants';
import DiscoverES from "../../components/Discover/Discover.componentES";
import FixedNavigationES from "../../components/FixedNavigation/FixedNavigation.componentES";
import PortfolioES from "../../components/Portfolio/Portfolio.componentES";
import ContactUsES from "../../components/ContactUs/ContactUs.componentES";
import OurOtherHomesES from "../../components/OurOtherHomes/OurOtherHomes.ComponentES";
import { useMessageTip } from "../../components/MessageTip/MessageTipContainer.component";
import { useRandomPopup } from "../../hooks/useRandomPopup";

const HomeES = () => {
  const { addMessageTip } = useMessageTip();
  
  // Add random popup functionality for Spanish page
  useRandomPopup({ isSpanishPage: true });

  useEffect(() => {
    
    const timer = setTimeout(() => {
      addMessageTip({
        id: 'welcome-message',
        text: 'Usa el código #norefundallowed para disfrutar de un 10% de descuento en reservas no reembolsables.',
        delay: 0,
        duration: 60000 
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [addMessageTip]);
  useEffect(() => {
   
    const timer = setTimeout(() => {
      addMessageTip({
        id: 'welcome-message-2',
        text: '¿Prefieres pagar por transferencia bancaria o SINPE? Reserva de forma segura con nosotros y envía tu comprobante de depósito por correo electrónico o WhatsApp.',
        delay: 0,
        duration: 54000 
      });
    }, 6000);

    return () => clearTimeout(timer);
  }, [addMessageTip]);

  return (
    <div id="body">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reservas Kalawala | Alquiler de Casas en Puerto Viejo</title>
        <meta name="description" content="¡Descubre nuestras casas, más baratas que cualquier otra plataforma! Bienvenido a Kalawala, ofrecemos casas de vacaciones completamente equipadas ubicadas en el corazón de Puerto Viejo de Talamanca, Costa Rica. Nuestras casas ofrecen espacio para hasta 5 personas, 2 unidades de A/C, baño privado completamente equipado y cocina y conexión gratuita a internet Wi-Fi." />
        <link rel="canonical" href="https://www.reservaskalawala.com/HomeES" />
        <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/" />
        <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/HomeES" />
        <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/" />
      </Helmet>
      <WelcomeSliderES />
      <FixedNavigationES isBlog={false}/>
      <OurHomesES houseDataList={houseDataList}/>
      <OurOtherHomesES/>
      <DiscoverES />
      <PortfolioES />
      {/* <Testimonial /> */}
      <ContactUsES />
      
    </div>
  )
}

export default HomeES;