import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import Discover from "../../components/Discover/Discover.component";
import OurHomes from "../../components/OurHomes/OurHomes.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSlider from "../../components/WelcomeSlider/WelcomeSlider.component";
import Portfolio from "../../components/Portfolio/Portfolio.component";
import MessageTipContainer, { useMessageTip } from "../../components/MessageTip/MessageTipContainer.component";
import { useRandomPopup } from "../../hooks/useRandomPopup";

import { houseDataEngList } from '../../utils/constants';
import OurOtherHomes from "../../components/OurOtherHomes/OurOtherHomes.component";

const Home = () => {
  const { addMessageTip } = useMessageTip();
  
  // Add random popup functionality
  useRandomPopup({ isSpanishPage: false });

  useEffect(() => {

    const timer = setTimeout(() => {
      addMessageTip({
        id: 'welcome-message',
        text: 'Use the code #norefundallowed to enjoy a 10% discount on non-refundable reservations.',
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
        text: 'Prefer to pay via bank transfer or SINPE? Book securely with us and send your deposit confirmation via email or whatsapp',
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
        <title>Reservas Kalawala | Puerto Viejo House Rental</title>
        <meta name="description" content="Discover our homes, cheaper than any other platform! Welcome to Kalawala, we offer fully equipped vacation homes nestled in the heart of Puerto Viejo de Talamanca, Costa Rica. Our houses offer space for up to 5 people, 2 A/C units, fully equipped private bathroom and kitchen and free Wi-Fi internet connection." />
        <link rel="canonical" href="https://www.reservaskalawala.com/" />
        <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/" />
        <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/HomeES" />
        <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/" />
      </Helmet>
      <WelcomeSlider />
      <FixedNavigation isBlog={false} />
      <OurHomes houseDataList={houseDataEngList} />
      <OurOtherHomes />
      <Discover />
      {/* <CallToAction /> */}
      <Portfolio />
      {/* <Testimonial /> */}
      <ContactUs />

      {/* Message Tip Container */}
      <MessageTipContainer />
    </div>
  )
}

export default Home;