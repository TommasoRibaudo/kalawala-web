import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import OurHomes from "../../components/OurHomes/OurHomes.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSliderNamES from "../../components/WelcomeSlider/WelcomeSlider.componentNamES";
import PortfolioNam from "../../components/Portfolio/Portfolio.componentNam";

import { NamDataListES } from '../../utils/constants';
import DiscoverNamES from "../../components/Discover/Discover.componentNamES";
import OurOtherHomesNamES from "../../components/OurOtherHomes/OurOtherHomes.componentNamES";
import MessageTipContainer, { useMessageTip } from "../../components/MessageTip/MessageTipContainer.component";

const HomeNamES = () => {
  const { addMessageTip } = useMessageTip();

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
        <title>Propiedades NAM en Puerto Viejo - Kalawala</title>
        <meta name="description" content="Descubre nuestras propiedades NAM en Puerto Viejo, Costa Rica. Casas de vacaciones completamente equipadas con comodidades modernas, perfectas para familias y grupos. ¡Reserva tu estadía hoy!" />
        <link rel="canonical" href="https://www.reservaskalawala.com/HomeNamES" />
        <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/HomeNam" />
        <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/HomeNamES" />
        <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/HomeNam" />
      </Helmet>
      <WelcomeSliderNamES />
      <FixedNavigation isBlog={false}/>
      <OurHomes houseDataList={NamDataListES}/>
      <OurOtherHomesNamES />
      <DiscoverNamES />
      <PortfolioNam />
      {/* <Testimonial /> */}
      <ContactUs />
      
      {/* Message Tip Container */}
      <MessageTipContainer />
    </div>
  )
}

export default HomeNamES;