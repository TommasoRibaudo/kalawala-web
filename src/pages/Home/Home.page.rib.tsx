import React from "react";
import { Helmet } from "react-helmet";
import CallToAction from "../../components/CallToAction/CallToAction.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";

import { ribHouseDataEngList } from '../../utils/constants';
import WelcomeSliderRib from "../../components/WelcomeSlider/WelcomeSlider.componentRIB";
import FixedNavigationRib from "../../components/FixedNavigation/FixedNavigation.componentRIB";
import OurHomesRIB from "../../components/OurHomes/OurHomes.componentRIB";
import DiscoverRIB from "../../components/Discover/Discover.componentRIB";
import PortfolioRIB from "../../components/Portfolio/Portfolio.componentRIB";
import OurOtherHomesRIB from "../../components/OurOtherHomes/OurOtherHomes.componentRIB";

const HomeRib = () => {

  return (
    <div id="body">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Luxury Villas in Puerto Viejo - Kalawala</title>
        <meta name="description" content="Discover our luxury villas in Puerto Viejo, Costa Rica. Fully equipped vacation homes with modern amenities, perfect for families and groups up to 5 people. Book your stay today!" />
        <link rel="canonical" href="https://www.reservaskalawala.com/HomeVillas" />
        <link rel="alternate" hrefLang="en" href="https://www.reservaskalawala.com/HomeVillas" />
        <link rel="alternate" hrefLang="es" href="https://www.reservaskalawala.com/HomeVillasES" />
        <link rel="alternate" hrefLang="x-default" href="https://www.reservaskalawala.com/HomeVillas" />
      </Helmet>
      <WelcomeSliderRib />
      <FixedNavigationRib isBlog={false}/>
      <OurHomesRIB houseDataList={ribHouseDataEngList}/>
      <OurOtherHomesRIB/>
      <DiscoverRIB />
      <CallToAction />
      <PortfolioRIB />
      {/* <Testimonial /> */}
      <ContactUs />
    </div>
  )
}

export default HomeRib;