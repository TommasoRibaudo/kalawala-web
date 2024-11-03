import React from "react";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import Discover from "../../components/Discover/Discover.component";
import OurHomes from "../../components/OurHomes/OurHomes.component";
import CallToAction from "../../components/CallToAction/CallToAction.component";
import Testimonial from "../../components/Testimonial/Testimonial.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSlider from "../../components/WelcomeSlider/WelcomeSlider.component";
import Portfolio from "../../components/Portfolio/Portfolio.component";

import { houseDataEngList, ribHouseDataEngList } from '../../utils/constants';
import WelcomeSliderRib from "../../components/WelcomeSlider/WelcomeSlider.componentRIB";
import FixedNavigationRib from "../../components/FixedNavigation/FixedNavigation.componentRIB";
import OurHomesRIB from "../../components/OurHomes/OurHomes.componentRIB";

const HomeRib = () => {

  return (
    <div id="body">
      <WelcomeSliderRib />
      <FixedNavigationRib isBlog={false}/>
      <OurHomesRIB houseDataList={ribHouseDataEngList}/>
      <Discover />
      <CallToAction />
      <Portfolio />
      {/* <Testimonial /> */}
      <ContactUs />
    </div>
  )
}

export default HomeRib;