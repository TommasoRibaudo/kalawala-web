import React from "react";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import Discover from "../../components/Discover/Discover.component";
import OurHomes from "../../components/OurHomes/OurHomes.component";
import CallToAction from "../../components/CallToAction/CallToAction.component";
import Testimonial from "../../components/Testimonial/Testimonial.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSlider from "../../components/WelcomeSlider/WelcomeSlider.component";
import Portfolio from "../../components/Portfolio/Portfolio.component";

import { houseDataEngList } from '../../utils/constants';
import OurOtherHomes from "../../components/OurOtherHomes/OurOtherHomes.component";

const Home = () => {

  return (
    <div id="body">
      <WelcomeSlider />
      <FixedNavigation isBlog={false}/>
      <OurHomes houseDataList={houseDataEngList}/>
      <OurOtherHomes/>
      <Discover />
      <CallToAction />
      <Portfolio />
      {/* <Testimonial /> */}
      <ContactUs />
    </div>
  )
}

export default Home;