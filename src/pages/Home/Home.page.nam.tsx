import React from "react";
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