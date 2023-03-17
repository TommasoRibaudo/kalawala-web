import React from 'react'
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSnowflake, faUtensils, faWifi, faUser, faParking } from '@fortawesome/free-solid-svg-icons';


// import './HomeCard.style.scss'
// import '../../../styles/bootstrap.min.css'
// import '../../../styles/style.css'

import TucanoImg from '../../../assets/images/about/tucano-sm.jpg'
const HomeCard = () => {
    return (
        <div className="col-md-3 text-center wow fadeInUp" data-wow-duration="500ms">
            <a data-scroll href="#contact-us">
                <div className="block ">
                    <div className="icon-box center-block">
                        <img src={TucanoImg} alt="House tucano" className="img-responsive img-rounded our-homes-img-sm our-homes-img-m" />
                    </div>
                    {/* <!-- Express About Yourself --> */}
                    <div className="content text-center">
                        <h3 className="highlight">Tucano</h3>
                        <div style={{ display: "block" }}>
                            <div className="container-rounded-border border-highlight" style={{marginRight:'6px'}}>
                                <FontAwesomeIcon icon={faUser} fontSize={"18x"} style={{margin:'2px 4px 2px 2px'}} />
                                <b className="highlight" style={{fontSize:'18px'}}>X4</b>
                            </div>
                            <FontAwesomeIcon icon={faSnowflake}  fontSize={"20px"} style={{marginRight:'6px'}} />
                            <FontAwesomeIcon icon={faUtensils} fontSize={"20px"} style={{marginRight:'6px'}} />
                            <FontAwesomeIcon icon={faWifi} fontSize={"20px"} />
                            <FontAwesomeIcon icon={faParking} fontSize={"20px"} style={{marginLeft:'6px'}} />
                        </div>
                    </div>
                </div>
            </a>

        </div>
    )
}
export default HomeCard;