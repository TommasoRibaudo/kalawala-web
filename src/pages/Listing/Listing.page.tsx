import React from "react";
import { Col, Row } from "react-bootstrap";
import './Listing.style.scss'
import OtherListings from "./components/OtherListings/OtherListings.component";
import { useParams } from "react-router-dom";
const Listing = () => {

    const {listing} = useParams()

    const listings = [
        {name: 'Tucano'},
        {name: 'Geco'},
        {name: 'Pappagallo'},
        {name: 'Rana'},
    ]
    return (
    <div className="listingContainer">
        <Row className="subContainer">
         <Col className="otherOptions col" lg={2}><OtherListings/></Col>
         <Col className="info col" lg={7}>2</Col>
         <Col className="book col" lg={3}>3</Col>
        </Row>
    </div>
    )
}

export default Listing