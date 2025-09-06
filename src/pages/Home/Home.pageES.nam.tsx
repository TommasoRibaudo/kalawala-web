import React from "react";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import OurHomes from "../../components/OurHomes/OurHomes.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSliderNamES from "../../components/WelcomeSlider/WelcomeSlider.componentNamES";
import PortfolioNamES from "../../components/Portfolio/Portfolio.componentNamES";

import { NamDataListES } from '../../utils/constants';
import DiscoverNamES from "../../components/Discover/Discover.componentNamES";
import CallToActionES from "../../components/CallToAction/CallToAction.componentES";
import OurOtherHomesNamES from "../../components/OurOtherHomes/OurOtherHomes.componentNamES";

const HomeNamES = () => {

  return (
    <div id="body">
      <WelcomeSliderNamES />
      <FixedNavigation isBlog={false}/>
      <OurHomes houseDataList={NamDataListES}/>
      <OurOtherHomesNamES />
      <DiscoverNamES />
      <CallToActionES />
      <PortfolioNamES />
      {/* <Testimonial /> */}
      <ContactUs />
    </div>
  )
}

export default HomeNamES;