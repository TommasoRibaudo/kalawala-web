import { Helmet } from "react-helmet";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import Discover from "../../components/Discover/Discover.component";
import OurHomes from "../../components/OurHomes/OurHomes.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSlider from "../../components/WelcomeSlider/WelcomeSlider.component";
import Portfolio from "../../components/Portfolio/Portfolio.component";
import MessageTipContainer from "../../components/MessageTip/MessageTipContainer.component";
import { useRandomPopup } from "../../hooks/useRandomPopup";
import { useSmoobuSizeChange } from "../../hooks/useSmoobuSizeChange";

import { houseDataEngList } from '../../utils/constants';
import OurOtherHomes from "../../components/OurOtherHomes/OurOtherHomes.component";

const Home = () => {
  // Add random popup functionality
  useRandomPopup({ isSpanishPage: false });

  // Show discount tip when Smoobu component changes size
  useSmoobuSizeChange({ isSpanishPage: false });


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