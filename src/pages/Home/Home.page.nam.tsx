import { Helmet } from "react-helmet";
import DiscoverNam from "../../components/Discover/Discover.componentNam";
import OurHomesNam from "../../components/OurHomes/OurHomes.componentNam";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSliderNam from "../../components/WelcomeSlider/WelcomeSlider.componentNam";
import PortfolioNam from "../../components/Portfolio/Portfolio.componentNam";
import OurOtherHomesNam from "../../components/OurOtherHomes/OurOtherHomes.componentNam";
import { NamDataList } from '../../utils/constants';
import FixedNavigationNam from "../../components/FixedNavigation/FixedNavigation.componentNam";
import MessageTipContainer from "../../components/MessageTip/MessageTipContainer.component";
import HelpMeChoose from "../../components/HelpMeChoose/HelpMeChoose.component";
import { useRandomPopup } from "../../hooks/useRandomPopup";
import { useSmoobuSizeChange } from "../../hooks/useSmoobuSizeChange";

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

const HomeNam = () => {
  // Add random popup functionality
  useRandomPopup({ isSpanishPage: false });

  // Show discount tip when Smoobu component changes size
  useSmoobuSizeChange({ isSpanishPage: false });


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
      <HelpMeChoose title="Find your" titleHighlight="Ideal Stay" options={helpMeChooseOptions} />
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