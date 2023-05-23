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
import Amenities from "./components/Amenities/Amenities.component";
import { AmenityType } from "../../utils/types";
import { houseDataList } from "../../utils/constants";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";


const Listing = () => {
    const { listing } = useParams()

    const amenities: AmenityType[] = [
        { icon: 'ac', name: '2 A/C Units' },
        { icon: 'ac', name: '2 A/C Units' },
        { icon: 'ac', name: '2 A/C Units' }
    ]

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
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, [])
    const description = houseData?.description.split('<br/>');
    const neighborhood = houseData?.neighborhood.split('<br/>');
    return (
        <div className={`listingContainer ${show && 'modal-open'}`}>
            <FixedNavigation />
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 2 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } :  { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <OtherListings listings={listings} currentListing={listing || ''} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 7 }} md={windowWidth <= 991 ?{  order: 'first', span: 12 } : { order: 'first', span: 8 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">{houseData?.name}</h1>
                        <h3 className="location">{houseData?.location}</h3>
                    </div>
                    <ImagesContainer showModal={handleShow} houseName={listing!} />
                    <div className="amenaties">
                        <Amenities amenities={houseData?.amenities as AmenityType[]} />
                    </div>
                    <div className="description">
                        {description!.map((p, i) => (<><p key={i}>{p}</p> <br /></>))}
                        {neighborhood!.map((p, i) => (<><p key={i}>{p}</p> <br /></>))}
                    </div>

                </Col>
                <Col className="book col" lg={3} md={windowWidth <= 991 ?{ span: 12 } : { order: 'first', span: 4 }} sm={{  span: 12 }} xs={{ span: 12 }}>
                    <Smoobu homeCode={houseData!.houseCode} />
                </Col>
            </Row>
            {show && <ImagesModal closeModal={handleClose} houseName={listing!} />}
        </div>
    )

}

export default Listing;