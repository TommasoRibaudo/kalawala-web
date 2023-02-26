import React, { useEffect } from "react";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import Discover from "../../components/Discover/Discover.component";
import OurHomes from "../../components/OurHomes/OurHomes.component";
import CallToAction from "../../components/CallToAction/CallToAction.component";
import Testimonial from "../../components/Testimonial/Testimonial.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import WelcomeSlider from "../../components/WelcomeSlider/WelcomeSlider.component";

const Home = () => {

  const thing = [1, 2, 3];

  useEffect(()=>{
    learnYa();
  }, []);


  function learnYa(){
    thing.map((thing)=>{
      console.log('thing:', thing);
      
    });
  }

  
  return (
    <div id="body">
      <WelcomeSlider />
      {/* {learnYa()} */}
      {/* Fixed Navigation */}
      <FixedNavigation />
      <OurHomes />
      <Discover />
      <CallToAction />
      <div style={{backgroundColor: 'green'}}>
        Portfolio part
      </div>
      <Testimonial />
      <ContactUs />
    </div>
  )
}

export default Home;