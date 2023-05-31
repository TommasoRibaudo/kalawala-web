import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../Listing/Listing.style.scss';
import { useParams } from "react-router-dom";
import { blogs } from "../../assets/blogs/blogs";
import FixedNavigation from "../../components/FixedNavigation/FixedNavigation.component";
import OurHomes from "../../components/OurHomes/OurHomes.component";
import ContactUs from "../../components/ContactUs/ContactUs.component";


const Blog = () => {
    const { blogId } = useParams();

    const blogData = blogs.find((blog) => blog.id === blogId);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, [])
    console.log("data:", blogData);
    const description = blogData?.text.split('<br/>');
    return (
        
        <div className={`listingContainer`}>
            <FixedNavigation isBlog={true}/>
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 2 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } :  { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    {/* <OtherListings listings={listings} currentListing={listing || ''} /> */}
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 7 }} md={windowWidth <= 991 ?{  order: 'first', span: 12 } : { order: 'first', span: 8 }} sm={12} xs={12}>
                    <div className="heading">
                        <h1 className="title">{blogData?.title}</h1>
                    </div>
                    <OurHomes />
                    <div className="description">
                        {description!.map((p, i) => {
                            if(p.charAt(0) === "["){
                                return (<><img key={i} src={p.replace("[", "")}/> <br/><br/></>)
                            }else{
                                return (<><p key={i}>{p}</p> <br /></>)
                            }
                            })}
                    </div>

                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default Blog;