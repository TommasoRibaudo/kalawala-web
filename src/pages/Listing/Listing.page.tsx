import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import './Listing.style.scss'
import OtherListings from "./components/OtherListings/OtherListings.component";
import Smoobu from "../../components/Smoobu/Smoobu.component";
import ImagesContainer from "./components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "./components/ImagesModal/ImagesModal.component";
import { useParams } from "react-router-dom";
import { ListingType } from "../../utils/types";
import { TucanoImage, GecoImage, PappagalloImage, RanaImage } from "../../assets/images";


const Listing = () => {
    const { listing } = useParams()

    const listings: ListingType[] = [
        { name: 'Tucano', mainImage: TucanoImage },
        { name: 'Geco', mainImage: GecoImage },
        { name: 'Pappagallo', mainImage: PappagalloImage },
        { name: 'Rana', mainImage: RanaImage },
    ]
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        console.log('test')
    }, []);
    return (
        <div className="listingContainer">
            <Row className="subContainer">
                <Col className="otherOptions col" lg={{ order: 'first', span: 2 }} xs={{ order: 'last', span: 12 }}><OtherListings listings={listings} currentListing={listing || ''} /></Col>
                <Col className="info col" lg={7}>
                    <h1 className="title">Title</h1>
                    <h3 className="location">Location</h3>
                    <ImagesContainer showModal={handleShow} />
                    <div className="amenaties">

                    </div>
                    <div className="description">

                    </div>
                </Col>
                <Col className="book col" lg={3}>
                    <Smoobu />
                </Col>
            </Row>
            {show && <ImagesModal closeModal={handleClose} />}
        </div>
    )

}

export default Listing;