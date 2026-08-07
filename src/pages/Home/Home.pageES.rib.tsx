import { Helmet } from "react-helmet";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import {VillasDataListES } from '../../utils/constants';
import CallToAction from "../../components/CallToAction/CallToAction.component";
import FixedNavigationES from "../../components/FixedNavigation/FixedNavigation.componentES";
import OurHomesRIB from "../../components/OurHomes/OurHomes.componentRIB";
import DiscoverRIBES from "../../components/Discover/Discover.componentRIBES";
import WelcomeSliderRibES from "../../components/WelcomeSlider/WelcomeSlider.componentRIBES";
import PortfolioRIB from "../../components/Portfolio/Portfolio.componentRIB";
import OurOtherHomesRIBES from "../../components/OurOtherHomes/OurOtherHomes.ComponentRIBES";
import BookingSearchWidget from "../../components/BookingSearchWidget/BookingSearchWidget.component";
import Footer from "../../components/Footer/Footer.component";

const HomeRibES = () => {
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
      <FixedNavigationES isBlog={false}/>
      <BookingSearchWidget locale="es" variant="hero" />
      <OurHomesRIB houseDataList={VillasDataListES}/>
      <OurOtherHomesRIBES/>
      <DiscoverRIBES />
      <CallToAction />
      <PortfolioRIB />
      <ContactUs />
      <Footer locale="es" />
    </div>
  )
}

export default HomeRibES;