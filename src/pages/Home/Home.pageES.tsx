import React from "react";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import Discover from "../../components/Discover/Discover.component";
import OurHomesES from "../../components/OurHomes/OurHomes.component";
import CallToAction from "../../components/CallToAction/CallToAction.component";
import Testimonial from "../../components/Testimonial/Testimonial.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSlider from "../../components/WelcomeSlider/WelcomeSlider.component";
import Portfolio from "../../components/Portfolio/Portfolio.component";
import { houseDataEngList } from '../../utils/constants';
import DiscoverES from "../../components/Discover/Discover.componentES";
import FixedNavigationES from "../../components/FixedNavigation/FixedNavigation.componentES";
import PortfolioES from "../../components/Portfolio/Portfolio.componentES";

const HomeES = () => {

  return (
    <div id="body">
      <WelcomeSlider />
      <FixedNavigationES isBlog={false}/>
      <OurHomesES houseDataList={houseDataEngList}/>
      <DiscoverES />
      <CallToAction />
      <PortfolioES />
      {/* <Testimonial /> */}
      <ContactUs />
    </div>
  )
}

export default HomeES;