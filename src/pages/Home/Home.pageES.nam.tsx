import { Helmet } from "react-helmet";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import OurHomes from "../../components/OurHomes/OurHomes.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSliderNamES from "../../components/WelcomeSlider/WelcomeSlider.componentNamES";
import PortfolioNam from "../../components/Portfolio/Portfolio.componentNam";

import { NamDataListES } from '../../utils/constants';
import DiscoverNamES from "../../components/Discover/Discover.componentNamES";
import OurOtherHomesNamES from "../../components/OurOtherHomes/OurOtherHomes.componentNamES";
import MessageTipContainer from "../../components/MessageTip/MessageTipContainer.component";
import HelpMeChoose from "../../components/HelpMeChoose/HelpMeChoose.component";
import { useRandomPopup } from "../../hooks/useRandomPopup";
import { useSmoobuSizeChange } from "../../hooks/useSmoobuSizeChange";

const helpMeChooseOptionsES = [
    {
        emoji: "🧡",
        label: "Ideal para parejas",
        houseName: "Villa Mar",
        houseLangCode: "VillaMarES",
        image: "https://drive.google.com/thumbnail?id=1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn&sz=w1000"
    },
    {
        emoji: "👨‍👩‍👧",
        label: "Perfecto para familias",
        houseName: "Delfines",
        houseLangCode: "DelfinES",
        image: "https://drive.google.com/thumbnail?id=1ui0cNzHTb2WM-k59OkwnJXw77m0P7PPW&sz=w1000"
    },
    {
        emoji: "🐾",
        label: "Pet-friendly",
        houseName: "Rana",
        houseLangCode: "RanaES",
        image: "https://drive.google.com/thumbnail?id=1UiGI8gFf6UR5kn8Eo30u457NX8NkP95X&sz=w1000"
    }
];

const HomeNamES = () => {
  // Add random popup functionality
  useRandomPopup({ isSpanishPage: true });

  // Show discount tip when Smoobu component changes size
  useSmoobuSizeChange({ isSpanishPage: true });
  

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
      <HelpMeChoose title="Elige tu" titleHighlight="Estadía Ideal" options={helpMeChooseOptionsES} />
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