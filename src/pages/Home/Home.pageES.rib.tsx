import React from "react";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import Portfolio from "../../components/Portfolio/Portfolio.component";
import {VillasDataList } from '../../utils/constants';
import CallToActionES from "../../components/CallToAction/CallToAction.componentES";
import FixedNavigationRibES from "../../components/FixedNavigation/FixedNavigation.componentRIBES";
import WelcomeSliderES from "../../components/WelcomeSlider/WelcomeSlider.componentES";
import OurHomesES from "../../components/OurHomes/OurHomes.componentES";
import DiscoverRIBES from "../../components/Discover/Discover.componentRIBES";
import WelcomeSliderRibES from "../../components/WelcomeSlider/WelcomeSlider.componentRIBES";
import PortfolioRIBES from "../../components/Portfolio/Portfolio.componentRIBES";

const HomeRibES = () => {

  return (
    <div id="body">
      <WelcomeSliderRibES />
      <FixedNavigationRibES isBlog={false}/>
      <OurHomesES houseDataList={VillasDataList}/>
      <DiscoverRIBES />
      <CallToActionES />
      <PortfolioRIBES />
      <ContactUs />
    </div>
  )
}

export default HomeRibES;