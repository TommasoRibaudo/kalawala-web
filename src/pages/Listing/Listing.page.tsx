import React from "react";
import { Col, Row } from "react-bootstrap";
import './Listing.style.scss'
import OtherListings from "./components/OtherListings/OtherListings.component";
import { useParams } from "react-router-dom";
import { ListingType } from "../../utils/types";
import { TucanoImage, GecoImage, PappagalloImage, RanaImage } from "../../assets/images";


const Listing = () => {
    const {listing} = useParams()

    const listings: ListingType[] = [
        {name: 'Tucano', mainImage: TucanoImage },
        {name: 'Geco', mainImage: GecoImage},
        {name: 'Pappagallo', mainImage: PappagalloImage},
        {name: 'Rana', mainImage: RanaImage},
    ]
    return (
    <div className="listingContainer">
        <Row className="subContainer">
         <Col className="otherOptions col" lg={{order:'first', span:2}} xs={{order:'last', span:12}}><OtherListings listings={listings} currentListing={listing || ''} /></Col>
         <Col className="info col" lg={7}>2</Col>
         <Col className="book col" lg={3}>3</Col>
        </Row>
    </div>
    )
}

export default Listing