// import React from "react";
// import { useParams } from "react-router-dom";

// const Blog = () => {
//     const { blog } = useParams()
//     return(
//         <div>{blog}</div>
//     )
// }

// export default Blog;


import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import '../Listing/Listing.style.scss'
// import OtherListings from "../../components/";
import Smoobu from "../../components/Smoobu/Smoobu.component";
// import ImagesContainer from "./components/ImagesContainer/ImagesContainer.component";
// import ImagesModal from "./components/ImagesModal/ImagesModal.component";
import { useParams } from "react-router-dom";
import { HouseDataType, ListingType } from "../../utils/types";
import { TucanoImage, GecoImage, PappagalloImage, RanaImage } from "../../assets/images";
// import Amenities from "./components/Amenities/Amenities.component";
import { AmenityType } from "../../utils/types";
import { blogs } from "../../assets/blogs/blogs";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import OtherListings from "../Listing/components/OtherListings/OtherListings.component";
import ImagesContainer from "../Listing/components/ImagesContainer/ImagesContainer.component";
import Amenities from "../Listing/components/Amenities/Amenities.component";
import ImagesModal from "../Listing/components/ImagesModal/ImagesModal.component";


const Blog = () => {
    const { blogId } = useParams()

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

    const blogData = blogs.find((blog) => blog.id === blogId);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, [])
    console.log("data:", blogData);
    const description = blogData?.text.split('<br/>');
    return (
        
        <div className={`listingContainer ${show && 'modal-open'}`}>
            <FixedNavigation />
            <div>{blogId}</div>
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 2 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } :  { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    {/* <OtherListings listings={listings} currentListing={listing || ''} /> */}
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 7 }} md={windowWidth <= 991 ?{  order: 'first', span: 12 } : { order: 'first', span: 8 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">{blogData?.title}</h1>
                    </div>
                    {/* <ImagesContainer showModal={handleShow} houseName={listing!} /> */}
                    <div className="description">
                        {/* {description!.map((p, i) => (<><p key={i}>{p}</p> <br /></>))} */}
                        {description}
                    </div>

                </Col>
                {/* <Col className="book col" lg={3} md={windowWidth <= 991 ?{ span: 12 } : { order: 'first', span: 4 }} sm={{  span: 12 }} xs={{ span: 12 }}>
                    <Smoobu homeCode={blogData!.houseCode} />
                </Col> */}
            </Row>
            {/* {show && <ImagesModal closeModal={handleClose} houseName={listing!} />} */}
        </div>
    )

}

export default Blog;