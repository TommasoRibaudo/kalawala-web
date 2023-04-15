import React, { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import './Listing.style.scss'
import OtherListings from "./components/OtherListings/OtherListings.component";
import Smoobu from "../../components/Smoobu/Smoobu.component";
const Listing = () => {

    useEffect(() => {
        console.log('test')
    }, []);
    return (
        <div className="listingContainer">
            {/* <Container className="listingContainer"> */}
            <Row className="subContainer">
                <Col className="otherOptions col" lg={2}><OtherListings /></Col>
                <Col className="info col" lg={8}>
                    <h1 className="title">Title</h1>
                    <h3 className="location">Location</h3>
                    <div className="pictures">

                    </div>
                    <div className="amenaties">

                    </div>
                    <div className="description">

                    </div>
                </Col>
                <Col className="book col" lg={2}>
                    <Smoobu />
                </Col>
            </Row>
            {/* </Container> */}
        </div>
    )
}

export default Listing