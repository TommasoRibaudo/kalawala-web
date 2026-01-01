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
import { useRandomPopup } from "../../hooks/useRandomPopup";
import { useSmoobuSizeChange } from "../../hooks/useSmoobuSizeChange";

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