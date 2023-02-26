import { FC } from 'react';

const OurHomes: FC = () => {
  return (
    <section id="house-list" className="bg-one about section">
        <div className="container">
            <div className="row">

                {/* <!-- section title --> */}
                <div className="title text-center wow fadeIn" data-wow-duration="1500ms">
                    <h2>Our <span className="color">Homes</span> </h2>
                    <div className="border"></div>
                </div>
                {/* <!-- /section title --> */}

                {/* <!-- About item --> */}
                <div className="col-md-3 text-center wow fadeInUp" data-wow-duration="500ms">
                    <a data-scroll href="#contact-us">
                        <div className="block ">
                            <div className="icon-box center-block">
                                <img src="images/about/tucano-sm.jpg" alt="House tucano" className="img-responsive img-rounded our-homes-img-sm our-homes-img-m" />
                            </div>
                            {/* <!-- Express About Yourself --> */}
                            <div className="content text-center">
                                <h3 className="highlight">Tucano</h3>
                                <div style={{display:"block"}}>
                                    <div className="container-rounded-border border-highlight"><i className="fas fa-user highlight"></i> 
                                    <b 
                                    // style="font-size: larger;" 
                                    className="highlight">X4</b></div>
                                    <i className="fas fa-snowflake fa-lg highlight"></i>
                                    <i className="fas fa-utensils fa-lg highlight"></i>
                                    <i className="fas fa-wifi fa-lg highlight"></i>
                                </div>
                            </div>
                        </div>
                    </a>

                </div>
                {/* <!-- End About item --> */}

                {/* <!-- About item --> */}
                <div className="col-md-3 text-center wow fadeInUp" data-wow-duration="500ms" data-wow-delay="250ms">
                    <a data-scroll href="#contact-us">
                        <div className="block ">
                            <div className="icon-box center-block">
                                <img src="images/about/geco-sm.jpg" alt="House geco" className="img-responsive img-rounded our-homes-img-sm our-homes-img-m" />
                            </div>
                            {/* <!-- Express About Yourself --> */}
                            <div className="content text-center">
                                <h3 className="highlight">Geco</h3>
                                <div style={{display:"block"}}>
                                    <div className="container-rounded-border border-highlight"><i className="fas fa-user highlight"></i> <b 
                                    // style="font-size: larger;" 
                                    className="highlight">X5</b></div>
                                    <i className="fas fa-snowflake fa-lg highlight"></i>
                                    <i className="fas fa-utensils fa-lg highlight"></i>
                                    <i className="fas fa-wifi fa-lg highlight"></i>
                                    <i className="fas fa-parking fa-lg highlight"></i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                {/* <!-- End About item --> */}

                {/* <!-- About item --> */}
                <div className="col-md-3 text-center wow fadeInUp" data-wow-duration="500ms" data-wow-delay="500ms">
                    <a data-scroll href="#contact-us">
                        <div className="block ">
                            <div className="icon-box center-block">
                                <img src="images/about/pappagallo-sm.jpg" alt="House pappagallo" className="img-responsive img-rounded our-homes-img-sm our-homes-img-m" />
                            </div>
                            {/* <!-- Express About Yourself --> */}
                            <div className="content text-center">
                                <h3 className="highlight">Pappagallo</h3>
                                <div style={{display:"block"}}>
                                    <div className="container-rounded-border border-highlight"><i className="fas fa-user highlight"></i> <b 
                                    // style="font-size: larger;" 
                                    className="highlight">X4</b></div>
                                    <i className="fas fa-snowflake fa-lg highlight"></i>
                                    <i className="fas fa-utensils fa-lg highlight"></i>
                                    <i className="fas fa-wifi fa-lg highlight"></i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                {/* <!-- End About item --> */}
{/* 
                <!-- About item --> */}
                <div className="col-md-3 text-center wow fadeInUp" data-wow-duration="500ms" data-wow-delay="750ms">
                    <a data-scroll href="#contact-us" >
                        <div className="block ">
                            <div className="icon-box center-block">
                                <img src="images/about/rana-sm.jpg" alt="House rana" className="img-responsive img-rounded our-homes-img-sm our-homes-img-m" />
                            </div>
                            {/* <!-- Express About Yourself --> */}
                            <div className="content text-center">
                                <h3 className="highlight">Rana</h3>
                                <div style={{display:"block"}}>
                                    <div className="container-rounded-border border-highlight"><i className="fas fa-user highlight"></i> <b 
                                    // style="font-size: larger;" 
                                    className="highlight">X4</b></div>
                                    <i className="fas fa-snowflake fa-lg highlight"></i>
                                    <i className="fas fa-utensils fa-lg highlight"></i>
                                    <i className="fas fa-wifi fa-lg highlight"></i>
                                    <i className="fas fa-parking fa-lg highlight"></i>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    </section>
  )
}

export default OurHomes;