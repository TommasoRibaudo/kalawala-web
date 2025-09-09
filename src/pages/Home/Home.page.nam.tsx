import React from "react";
import { Helmet } from "react-helmet";
import DiscoverNam from "../../components/Discover/Discover.componentNam";
import OurHomesNam from "../../components/OurHomes/OurHomes.componentNam";
import CallToAction from "../../components/CallToAction/CallToAction.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSliderNam from "../../components/WelcomeSlider/WelcomeSlider.componentNam";
import PortfolioNam from "../../components/Portfolio/Portfolio.componentNam";
import OurOtherHomesNam from "../../components/OurOtherHomes/OurOtherHomes.componentNam";
import { NamDataList } from '../../utils/constants';
import FixedNavigationNam from "../../components/FixedNavigation/FixedNavigation.componentNam";

const HomeNam = () => {

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
      <OurHomesNam NamDataList={NamDataList} />
      <OurOtherHomesNam />
      <DiscoverNam />
      <CallToAction />
      <PortfolioNam />
      {/* <Testimonial /> */}
      <ContactUs />
    </div>
  )
}

export default HomeNam;