import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import DiscoverNam from "../../components/Discover/Discover.componentNam";
import OurHomesNam from "../../components/OurHomes/OurHomes.componentNam";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSliderNam from "../../components/WelcomeSlider/WelcomeSlider.componentNam";
import PortfolioNam from "../../components/Portfolio/Portfolio.componentNam";
import OurOtherHomesNam from "../../components/OurOtherHomes/OurOtherHomes.componentNam";
import { NamDataList } from '../../utils/constants';
import FixedNavigationNam from "../../components/FixedNavigation/FixedNavigation.componentNam";
import MessageTipContainer, { useMessageTip } from "../../components/MessageTip/MessageTipContainer.component";
import { useRandomPopup } from "../../hooks/useRandomPopup";

const HomeNam = () => {
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
        <title>NAM Properties in Puerto Viejo - Kalawala</title>
        <meta name="description" content="Discover our NAM properties in Puerto Viejo, Costa Rica. Fully equipped vacation homes with modern amenities, perfect for families and groups. Book your stay today!" />
        <link rel="canonical" href="https://www.reservaskalawala.com/HomeNam" />
        <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/HomeNam" />
        <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/HomeNamES" />
        <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/HomeNam" />
      </Helmet>
      <WelcomeSliderNam />
      <FixedNavigationNam isBlog={false} />
      <OurHomesNam NamDataList={NamDataList} />
      <OurOtherHomesNam />
      <DiscoverNam />
      <PortfolioNam />
      {/* <Testimonial /> */}
      <ContactUs />
      
      {/* Message Tip Container */}
      <MessageTipContainer />
    </div>
  )
}

export default HomeNam;