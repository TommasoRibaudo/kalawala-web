import React from 'react'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';

// import './HomeCard.style.scss'
// import '../../../styles/bootstrap.min.css'
// import '../../../styles/style.css'

import TucanoImg from '../../../assets/images/about/tucano-sm.jpg'
const HomeCard = () => {
    return (
        <Card className="col-md-3 text-center wow fadeInUp" data-wow-duration="500ms">
            <a data-scroll href="#contact-us">
                <div className="block ">
                    <div className="icon-box center-block">
                        <Image src={TucanoImg} alt="House tucano" className="img-responsive img-rounded our-homes-img-sm our-homes-img-m" />
                    </div>
                    {/* <!-- Express About Yourself --> */}
                    <div className="content text-center">
                        <h3 className="highlight">Tucano</h3>
                        <div style={{ display: "block" }}>
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

        </Card>
    )
}
export default HomeCard;