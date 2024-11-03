import React from "react";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import Discover from "../../components/Discover/Discover.component";
import OurHomes from "../../components/OurHomes/OurHomes.component";
import CallToAction from "../../components/CallToAction/CallToAction.component";
import Testimonial from "../../components/Testimonial/Testimonial.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSlider from "../../components/WelcomeSlider/WelcomeSlider.component";
import Portfolio from "../../components/Portfolio/Portfolio.component";

import {ribHouseDataEngList, VillasDataList } from '../../utils/constants';
import CallToActionES from "../../components/CallToAction/CallToAction.componentES";
import FixedNavigationRibES from "../../components/FixedNavigation/FixedNavigation.componentRIBES";
import WelcomeSliderES from "../../components/WelcomeSlider/WelcomeSlider.componentES";
import OurHomesES from "../../components/OurHomes/OurHomes.componentES";

const HomeRibES = () => {

  return (
    <div id="body">
      RIBHOLDING PLACE HOLDER ES
      <WelcomeSliderES />
      <FixedNavigationRibES isBlog={false}/>
      <OurHomesES houseDataList={VillasDataList}/>
      <Discover />
      <CallToActionES />
      <Portfolio />
      <ContactUs />
    </div>
  )
}

export default HomeRibES;