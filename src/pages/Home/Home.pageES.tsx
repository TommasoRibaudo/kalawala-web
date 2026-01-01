import { Helmet } from "react-helmet";
import OurHomesES from "../../components/OurHomes/OurHomes.componentES";
import WelcomeSliderES from "../../components/WelcomeSlider/WelcomeSlider.componentES";
import { houseDataList } from '../../utils/constants';
import DiscoverES from "../../components/Discover/Discover.componentES";
import FixedNavigationES from "../../components/FixedNavigation/FixedNavigation.componentES";
import PortfolioES from "../../components/Portfolio/Portfolio.componentES";
import ContactUsES from "../../components/ContactUs/ContactUs.componentES";
import OurOtherHomesES from "../../components/OurOtherHomes/OurOtherHomes.ComponentES";
import { useRandomPopup } from "../../hooks/useRandomPopup";
import { useSmoobuSizeChange } from "../../hooks/useSmoobuSizeChange";

const HomeES = () => {
  // Add random popup functionality for Spanish page
  useRandomPopup({ isSpanishPage: true });

  // Show discount tip when Smoobu component changes size
  useSmoobuSizeChange({ isSpanishPage: true });
 
  return (
    <div id="body">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reservas Kalawala | Alquiler de Casas en Puerto Viejo</title>
        <meta name="description" content="¡Descubre nuestras casas, más baratas que cualquier otra plataforma! Bienvenido a Kalawala, ofrecemos casas de vacaciones completamente equipadas ubicadas en el corazón de Puerto Viejo de Talamanca, Costa Rica. Nuestras casas ofrecen espacio para hasta 5 personas, 2 unidades de A/C, baño privado completamente equipado y cocina y conexión gratuita a internet Wi-Fi." />
        <link rel="canonical" href="https://www.reservaskalawala.com/HomeES" />
        <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/" />
        <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/HomeES" />
        <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/" />
      </Helmet>
      <WelcomeSliderES />
      <FixedNavigationES isBlog={false}/>
      <OurHomesES houseDataList={houseDataList}/>
      <OurOtherHomesES/>
      <DiscoverES />
      <PortfolioES />
      {/* <Testimonial /> */}
      <ContactUsES />
      
    </div>
  )
}

export default HomeES;