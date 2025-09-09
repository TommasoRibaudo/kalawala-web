import React, { useEffect } from "react";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import Discover from "../../components/Discover/Discover.component";
import OurHomes from "../../components/OurHomes/OurHomes.component";
import CallToAction from "../../components/CallToAction/CallToAction.component";
import Testimonial from "../../components/Testimonial/Testimonial.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSlider from "../../components/WelcomeSlider/WelcomeSlider.component";
import Portfolio from "../../components/Portfolio/Portfolio.component";
import MessageTipContainer, { useMessageTip } from "../../components/MessageTip/MessageTipContainer.component";

import { houseDataEngList } from '../../utils/constants';
import OurOtherHomes from "../../components/OurOtherHomes/OurOtherHomes.component";

const Home = () => {
  const { addMessageTip } = useMessageTip();

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
      <WelcomeSlider />
      <FixedNavigation isBlog={false}/>
      <OurHomes houseDataList={houseDataEngList}/>
      <OurOtherHomes/>
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