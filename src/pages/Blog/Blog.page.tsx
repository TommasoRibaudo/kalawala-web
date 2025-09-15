import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../Listing/Listing.style.scss';
import { useParams } from "react-router-dom";
import { HouseDataType, ListingType } from "../../utils/types";
import { homesSnippet } from "../../utils/constants";
// import Amenities from "./components/Amenities/Amenities.component";
import { AmenityType, BlogType } from "../../utils/types";
import { blogs } from "../../assets/blogs/blogs";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import ImagesContainer from "../Listing/components/ImagesContainer/ImagesContainer.component";
import Amenities from "../Listing/components/Amenities/Amenities.component";
import ImagesModal from "../Listing/components/ImagesModal/ImagesModal.component";
import OtherBlogs from "./Components/OtherBlogs.Component";
import OurHomes from "../../components/OurHomes/OurHomes.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";
import ListingAd from "./Components/ListingAd/ListingAd.component";


const Blog = () => {
    const { blogId } = useParams();

    const blogData = blogs.find((blog) => blog.id === blogId);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, [])
    const description = blogData?.text.split('<br/>');
    return (
        
        <div className={`listingContainer`}>
            <FixedNavigation isBlog={true}/>
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 4 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } :  { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <ListingAd listings={homesSnippet}/> 
                   {/**/}
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={windowWidth <= 991 ?{  order: 'first', span: 12 } : { order: 'first', span: 12 }} sm={12} xs={12}>
                    <div className="heading" style={{height: 50}}>
                        <h1 className="title">{blogData?.title}</h1>
                    </div>
                    <div className="description">
                        {description!.map((p, i) => {
                            if(p.charAt(0) === "["){
                                return (<><img key={i} src={p.replace("[", "")}/> <br/><br/></>)
                            }else{
                                return (<><p key={i}>{p}</p> <br /></>)
                            }
                            })}
                    </div>
                    <OtherBlogs currentBlog={blogId || ''} blogs={blogs}  />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default Blog;