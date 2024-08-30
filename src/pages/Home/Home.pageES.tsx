import React from "react";
import OurHomesES from "../../components/OurHomes/OurHomes.componentES";
import Testimonial from "../../components/Testimonial/Testimonial.component";
import WelcomeSliderES from "../../components/WelcomeSlider/WelcomeSlider.componentES";
import { houseDataEngList } from '../../utils/constants';
import DiscoverES from "../../components/Discover/Discover.componentES";
import FixedNavigationES from "../../components/FixedNavigation/FixedNavigation.componentES";
import PortfolioES from "../../components/Portfolio/Portfolio.componentES";
import CallToActionES from "../../components/CallToAction/CallToAction.componentES";
import ContactUsES from "../../components/ContactUs/ContactUs.componentES";

const HomeES = () => {

  return (
    <div id="body">
      <WelcomeSliderES />
      <FixedNavigationES isBlog={false}/>
      <OurHomesES houseDataList={houseDataEngList}/>
      <DiscoverES />
      <CallToActionES />
      <PortfolioES />
      {/* <Testimonial /> */}
      <ContactUsES />
    </div>
  )
}

export default HomeES;