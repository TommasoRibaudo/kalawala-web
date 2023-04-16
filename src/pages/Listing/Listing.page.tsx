import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import './Listing.style.scss'
import OtherListings from "./components/OtherListings/OtherListings.component";
import Smoobu from "../../components/Smoobu/Smoobu.component";
import ImagesContainer from "./components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "./components/ImagesModal/ImagesModal.component";
const Listing = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        console.log('test')
    }, []);
    return (
        <div className="listingContainer">
            {/* <Container className="listingContainer"> */}
            <Row className="subContainer">
                <Col className="otherOptions col" lg={2}><OtherListings /></Col>
                <Col className="info col" lg={7}>
                    <h1 className="title">Title</h1>
                    <h3 className="location">Location</h3>
                    {/* <div className="pictures"> */}
                    <ImagesContainer showModal={handleShow}/>
                    {/* </div> */}
                    <div className="amenaties">

                    </div>
                    <div className="description">

                    </div>
                </Col>
                <Col className="book col" lg={3}>
                    <Smoobu />
                </Col>
            </Row>
            {/* </Container> */}
            {show && <ImagesModal closeModal={handleClose}/>}
        </div>
    )
}

export default Listing