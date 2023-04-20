import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import './Listing.style.scss'
import OtherListings from "./components/OtherListings/OtherListings.component";
import Smoobu from "../../components/Smoobu/Smoobu.component";
import ImagesContainer from "./components/ImagesContainer/ImagesContainer.component";
import ImagesModal from "./components/ImagesModal/ImagesModal.component";
import { useParams } from "react-router-dom";
import { HouseDataType, ListingType } from "../../utils/types";
import { TucanoImage, GecoImage, PappagalloImage, RanaImage } from "../../assets/images";
import { houseDataList } from "../../utils/constants";


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

    const houseData: HouseDataType | undefined = houseDataList.find((house) => house.name === listing);

    useEffect(() => {
        console.log('test')
    }, []);
    const description = houseData?.description.split('<br/>');
    const neighborhood = houseData?.neighborhood.split('<br/>');
    return (
        <div className="listingContainer">
            <Row className="subContainer">
                <Col className="otherOptions col" lg={{ order: 'first', span: 2 }} xs={{ order: 'last', span: 12 }}><OtherListings listings={listings} currentListing={listing || ''} /></Col>
                <Col className="info col" lg={7}>
                    <h1 className="title">{houseData?.name}</h1>
                    <h3 className="location">{houseData?.location}</h3>
                    <ImagesContainer showModal={handleShow} houseName={listing!} />
                    <div className="amenaties">

                    </div>
                    <div className="description">
                        {description!.map((p, i) => ( <><p key={i}>{p}</p> <br/></>))}
                        {neighborhood!.map((p, i) => ( <><p key={i}>{p}</p> <br/></>))}
                    </div>
                </Col>
                <Col className="book col" lg={3}>
                    <Smoobu />
                </Col>
            </Row>
            {show && <ImagesModal closeModal={handleClose} houseName={listing!} />}
        </div>
    )

}

export default Listing;