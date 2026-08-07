import { Helmet } from "react-helmet";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import Discover from "../../components/Discover/Discover.component";
import OurHomes from "../../components/OurHomes/OurHomes.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSlider from "../../components/WelcomeSlider/WelcomeSlider.component";
import Portfolio from "../../components/Portfolio/Portfolio.component";
import HelpMeChoose from "../../components/HelpMeChoose/HelpMeChoose.component";
import HomeReviews from "../../components/HomeReviews/HomeReviews.component";
import Footer from "../../components/Footer/Footer.component";
import BookingCtaBanner from "../../components/BookingCtaBanner/BookingCtaBanner.component";

import { houseDataEngList, houseDataList } from '../../utils/constants';
import OurOtherHomes from "../../components/OurOtherHomes/OurOtherHomes.component";
import { useLocale, useMessages } from "../../i18n";
import { localeSuffix } from "../../i18n/paths";

const Home = () => {
  const locale = useLocale();
  const m = useMessages();

  const helpMeChooseOptions = [
    {
        emoji: "🧡",
        label: m.home.optionCouples,
        houseName: "Villa Mar",
        houseLangCode: `VillaMar${localeSuffix(locale)}`,
        image: "https://lh3.googleusercontent.com/d/1cl5zzeKajmxVv5_q9cH0cvYQkCRl6kCn=w1000"
    },
    {
        emoji: "👨‍👩‍👧",
        label: m.home.optionFamilies,
        houseName: "Casa Delfines",
        houseLangCode: `Delfin${localeSuffix(locale)}`,
        image: "https://lh3.googleusercontent.com/d/1ui0cNzHTb2WM-k59OkwnJXw77m0P7PPW=w1000"
    },
    {
        emoji: "🐾",
        label: m.home.optionPetFriendly,
        houseName: "Casa Rana",
        houseLangCode: `Rana${localeSuffix(locale)}`,
        image: "https://lh3.googleusercontent.com/d/1UiGI8gFf6UR5kn8Eo30u457NX8NkP95X=w1000"
    },
    {
        emoji: "⭐",
        label: m.home.optionBestValue,
        houseName: "Casa Plumeria",
        houseLangCode: `Plumeria${localeSuffix(locale)}`,
        image: "https://lh3.googleusercontent.com/d/1b2x2aVIjqlSws4KePOS_NVb4NItGsra1=w1000"
    }
  ];

  return (
    <div id="body">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{m.home.pageTitle}</title>
        <meta name="description" content={m.home.pageDescription} />
        <link rel="canonical" href={`https://www.reservaskalawala.com/${locale === 'es' ? 'HomeES' : ''}`} />
        <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/" />
        <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/HomeES" />
        <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/" />
      </Helmet>
      <WelcomeSlider />
      <FixedNavigation isBlog={false} />
      <HelpMeChoose title={m.home.helpMeChooseTitle} titleHighlight={m.home.helpMeChooseTitleHighlight} options={helpMeChooseOptions} />
      <HomeReviews locale={locale} />
      <OurHomes houseDataList={locale === 'es' ? houseDataList : houseDataEngList} />
      <OurOtherHomes />
      <BookingCtaBanner locale={locale} />
      <Discover />
      <Portfolio />
      <ContactUs />
      <Footer locale={locale} />

    </div>
  )
}

export default Home;
