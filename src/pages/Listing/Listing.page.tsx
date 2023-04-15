import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import './Listing.style.scss'
import OtherListings from "./components/OtherListings/OtherListings.component";
const Listing = () => {
    return (
    <div className="listingContainer">
     {/* <Container className="listingContainer"> */}
        <Row className="subContainer">
         <Col className="otherOptions col" lg={2}><OtherListings/></Col>
         <Col className="info col" lg={7}>2</Col>
         <Col className="book col" lg={3}>3</Col>
        </Row>
     {/* </Container> */}
    </div>
    )
}

export default Listing