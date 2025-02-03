import React from "react";
import OurHomesES from "../../components/OurHomes/OurHomes.componentES";
import WelcomeSliderES from "../../components/WelcomeSlider/WelcomeSlider.componentES";
import { houseDataList } from '../../utils/constants';
import DiscoverES from "../../components/Discover/Discover.componentES";
import FixedNavigationES from "../../components/FixedNavigation/FixedNavigation.componentES";
import PortfolioES from "../../components/Portfolio/Portfolio.componentES";
import CallToActionES from "../../components/CallToAction/CallToAction.componentES";
import ContactUsES from "../../components/ContactUs/ContactUs.componentES";
import OurOtherHomesES from "../../components/OurOtherHomes/OurOtherHomes.ComponentES";

const HomeES = () => {

  return (
    <div id="body">
      <WelcomeSliderES />
      <FixedNavigationES isBlog={false}/>
      <OurHomesES houseDataList={houseDataList}/>
      <OurOtherHomesES/>
      <DiscoverES />
      <CallToActionES />
      <PortfolioES />
      {/* <Testimonial /> */}
      <ContactUsES />
    </div>
  )
}

export default HomeES;