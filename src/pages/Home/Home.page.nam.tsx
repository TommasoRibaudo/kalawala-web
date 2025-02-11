import React from "react";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import DiscoverNam from "../../components/Discover/Discover.componentNam";
import OurHomesNam from "../../components/OurHomes/OurHomes.componentNam";
import CallToAction from "../../components/CallToAction/CallToAction.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSliderNam from "../../components/WelcomeSlider/WelcomeSlider.componentNam";
import Portfolio from "../../components/Portfolio/Portfolio.component";

import { NamDataList } from '../../utils/constants';
import FixedNavigationNam from "../../components/FixedNavigation/FixedNavigation.componentNam";

const HomeNam = () => {

  return (
    <div id="body">
      <WelcomeSliderNam />
      <FixedNavigationNam isBlog={false}/>
      <OurHomesNam houseDataList={NamDataList}/>
      <DiscoverNam />
      <CallToAction />
      <Portfolio />
      {/* <Testimonial /> */}
      <ContactUs />
    </div>
  )
}

export default HomeNam;