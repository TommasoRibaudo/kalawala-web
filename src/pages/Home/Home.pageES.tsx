import React, { useEffect } from "react";
import OurHomesES from "../../components/OurHomes/OurHomes.componentES";
import WelcomeSliderES from "../../components/WelcomeSlider/WelcomeSlider.componentES";
import { houseDataList } from '../../utils/constants';
import DiscoverES from "../../components/Discover/Discover.componentES";
import FixedNavigationES from "../../components/FixedNavigation/FixedNavigation.componentES";
import PortfolioES from "../../components/Portfolio/Portfolio.componentES";
import ContactUsES from "../../components/ContactUs/ContactUs.componentES";
import OurOtherHomesES from "../../components/OurOtherHomes/OurOtherHomes.ComponentES";
import MessageTipContainer, { useMessageTip } from "../../components/MessageTip/MessageTipContainer.component";

const HomeES = () => {
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
      <WelcomeSliderES />
      <FixedNavigationES isBlog={false}/>
      <OurHomesES houseDataList={houseDataList}/>
      <OurOtherHomesES/>
      <DiscoverES />
      <PortfolioES />
      {/* <Testimonial /> */}
      <ContactUsES />
      
      {/* Message Tip Container */}
      <MessageTipContainer />
    </div>
  )
}

export default HomeES;