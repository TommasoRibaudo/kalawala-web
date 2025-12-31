import React from "react";
import { Helmet } from "react-helmet";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import {VillasDataListES } from '../../utils/constants';
import CallToActionES from "../../components/CallToAction/CallToAction.componentES";
import FixedNavigationRibES from "../../components/FixedNavigation/FixedNavigation.componentRIBES";
import OurHomesRIBES from "../../components/OurHomes/OurHomes.componentRIBES";
import DiscoverRIBES from "../../components/Discover/Discover.componentRIBES";
import WelcomeSliderRibES from "../../components/WelcomeSlider/WelcomeSlider.componentRIBES";
import PortfolioRIBES from "../../components/Portfolio/Portfolio.componentRIBES";
import OurOtherHomesRIBES from "../../components/OurOtherHomes/OurOtherHomes.ComponentRIBES";
import { useRandomPopup } from "../../hooks/useRandomPopup";

const HomeRibES = () => {
  // Add random popup functionality
  useRandomPopup({ isSpanishPage: false });
  return (
    <div id="body">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Villas de Lujo en Puerto Viejo - Kalawala Villas</title>
        <meta name="description" content="Descubre nuestras villas de lujo en Puerto Viejo, Costa Rica. Casas de vacaciones completamente equipadas con comodidades modernas, perfectas para familias y grupos de hasta 5 personas. ¡Reserva tu estadía hoy!" />
        <link rel="canonical" href="https://www.reservaskalawala.com/HomeVillasES" />
        <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/HomeVillas" />
        <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/HomeVillasES" />
        <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/HomeVillas" />
      </Helmet>
      <WelcomeSliderRibES />
      <FixedNavigationRibES isBlog={false}/>
      <OurHomesRIBES houseDataList={VillasDataListES}/>
      <OurOtherHomesRIBES/>
      <DiscoverRIBES />
      <CallToActionES />
      <PortfolioRIBES />
      <ContactUs />
    </div>
  )
}

export default HomeRibES;