import { Helmet } from "react-helmet";
import OurHomesES from "../../components/OurHomes/OurHomes.componentES";
import WelcomeSliderES from "../../components/WelcomeSlider/WelcomeSlider.componentES";
import { houseDataList } from '../../utils/constants';
import DiscoverES from "../../components/Discover/Discover.componentES";
import FixedNavigationES from "../../components/FixedNavigation/FixedNavigation.componentES";
import Portfolio from "../../components/Portfolio/Portfolio.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import OurOtherHomesES from "../../components/OurOtherHomes/OurOtherHomes.ComponentES";
import HelpMeChoose from "../../components/HelpMeChoose/HelpMeChoose.component";
import HomeReviews from "../../components/HomeReviews/HomeReviews.component";
import Footer from "../../components/Footer/Footer.component";
import BookingCtaBanner from "../../components/BookingCtaBanner/BookingCtaBanner.component";

const helpMeChooseOptionsES = [
    {
        emoji: "🧡",
        label: "Ideal para parejas",
        houseName: "Villa Mar",
        houseLangCode: "VillaMarES",
        image: "https://lh3.googleusercontent.com/d/1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn=w1000"
    },
    {
        emoji: "👨‍👩‍👧",
        label: "Perfecto para familias",
        houseName: "Casa Delfines",
        houseLangCode: "DelfinES",
        image: "https://lh3.googleusercontent.com/d/1ui0cNzHTb2WM-k59OkwnJXw77m0P7PPW=w1000"
    },
    {
        emoji: "🐾",
        label: "Pet-friendly",
        houseName: "Casa Rana",
        houseLangCode: "RanaES",
        image: "https://lh3.googleusercontent.com/d/1UiGI8gFf6UR5kn8Eo30u457NX8NkP95X=w1000"
    },
    {
        emoji: "⭐",
        label: "Opción Recomendada",
        houseName: "Casa Plumeria",
        houseLangCode: "PlumeriaES",
        image: "https://lh3.googleusercontent.com/d/1b2x2aVIjqlSws4KePOS_NVb4NItGsra1=w1000"
    }
];

const HomeES = () => {
 
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
      <HelpMeChoose title="Elige tu" titleHighlight="Estadía Ideal" options={helpMeChooseOptionsES} />
      <HomeReviews locale="es" />
      <OurHomesES houseDataList={houseDataList}/>
      <OurOtherHomesES/>
      <BookingCtaBanner locale="es" />
      <DiscoverES />
      <Portfolio />
      {/* <Testimonial /> */}
      <ContactUs />
      <Footer locale="es" />

    </div>
  )
}

export default HomeES;