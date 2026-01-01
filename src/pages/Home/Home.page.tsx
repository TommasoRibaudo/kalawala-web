import { Helmet } from "react-helmet";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import Discover from "../../components/Discover/Discover.component";
import OurHomes from "../../components/OurHomes/OurHomes.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSlider from "../../components/WelcomeSlider/WelcomeSlider.component";
import Portfolio from "../../components/Portfolio/Portfolio.component";
import MessageTipContainer from "../../components/MessageTip/MessageTipContainer.component";
import HelpMeChoose from "../../components/HelpMeChoose/HelpMeChoose.component";
import { useRandomPopup } from "../../hooks/useRandomPopup";
import { useSmoobuSizeChange } from "../../hooks/useSmoobuSizeChange";

import { houseDataEngList } from '../../utils/constants';
import OurOtherHomes from "../../components/OurOtherHomes/OurOtherHomes.component";

const helpMeChooseOptions = [
    {
        emoji: "🧡",
        label: "Ideal for couples",
        houseName: "Villa Mar",
        houseLangCode: "VillaMar",
        image: "https://drive.google.com/thumbnail?id=1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn&sz=w1000"
    },
    {
        emoji: "👨‍👩‍👧",
        label: "Perfect for families",
        houseName: "Delfines",
        houseLangCode: "Delfin",
        image: "https://drive.google.com/thumbnail?id=1ui0cNzHTb2WM-k59OkwnJXw77m0P7PPW&sz=w1000"
    },
    {
        emoji: "🐾",
        label: "Pet-friendly",
        houseName: "Rana",
        houseLangCode: "Rana",
        image: "https://drive.google.com/thumbnail?id=1UiGI8gFf6UR5kn8Eo30u457NX8NkP95X&sz=w1000"
    }
];

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
      <HelpMeChoose title="Find your" titleHighlight="Ideal Stay" options={helpMeChooseOptions} />
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