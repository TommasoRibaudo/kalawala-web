import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';
import { useParams } from "react-router-dom";
import { HouseDataType, ListingType } from "../../../utils/types";

// import Amenities from "./components/Amenities/Amenities.component";
import { AmenityType, BlogType } from "../../../utils/types";
import { blogs } from "../../../assets/blogs/blogs";
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import ImagesContainer from "../../Listing/components/ImagesContainer/ImagesContainer.component";
import Amenities from "../../Listing/components/Amenities/Amenities.component";
import ImagesModal from "../../Listing/components/ImagesModal/ImagesModal.component";
import OtherBlogs from "../Components/OtherBlogs.Component";
import OurHomes from "../../../components/OurHomes/OurHomes.component";
//import constants
import { homesSnippet} from "../../../utils/constants";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import ListingAd from "../Components/ListingAd/ListingAd.component";
import { Helmet } from "react-helmet";


const TwoDaysInPV = () => {
    // const { blogId } = useParams();
    
    const blogId = 'twodaysinpuertoviejo'
    const blogData = blogs.find((blog) => blog.id === blogId);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, [])
    console.log("data:", blogData);
    const description = blogData?.text.split('<br/>');
    return (

        <div className={`listingContainer`}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>2 Days One Night in Puerto Viejo</title>
                <meta name="description" content="Do you only have a couple of days to visit Puerto Viejo? So did we! We only had 1 night coming from Tortuguero and wanted to make the best out of the time we had in this charming beach town located on the southern Caribbean coast of Costa Rica." />
                <link rel="canonical" href="https://www.reservaskalawala.com/blog/twodaysinpuertoviejo" />
            </Helmet>
            <FixedNavigation isBlog={true} />
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 4 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } : { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <ListingAd listings={homesSnippet} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={windowWidth <= 991 ? { order: 'first', span: 12 } : { order: 'first', span: 12 }} sm={12} xs={12}>

                    <br />
                    <div className="heading title-container" style={{ maxWidth: 1000, }}>

                        <h1 className="title blog-title">2 Days One Night in Puerto Viejo</h1>
                        <br />
                        <div className="border"></div>

                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="description" style={{ maxWidth: 1000, }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src="https://drive.google.com/thumbnail?id=13j6FfwVMxVg9lU4SuGST8ljrVkyW7rla&sz=w1000" className="responsive-image" style={{ maxWidth: 1000, }} alt="Kayaking in Punta Uva" />
                        </div>
                        <br />
                        <p>Do you only have a couple of days to visit Puerto Viejo? So did we! We only had 1 night coming from Tortuguero and wanted to make the best out of the time we had in this charming beach town
                             located on the southern Caribbean coast of Costa Rica. With its laid-back atmosphere, pristine beaches, and lush tropical jungle, Puerto Viejo is the perfect destination for a quick weekend escape.
                              In this article, we'll share our experience of spending two days in Puerto Viejo, and give you tips on how to make the most out of your trip.</p>
                        <br />
                        <p>We arrived in Puerto Viejo early on a Saturday morning, excited to start our adventure. Our <a href="https://reservaskalawala.com/Tucano" target="_blank" rel="noopener noreferrer">Airbnb</a> wasn't ready yet, so we decided to rent a quad nearby and head to Punta Uva to soak up some sun.
                             The beach was stunning, with turquoise and calm waters. We rented Kayaks and explored the coast. For lunch, we stopped by <a href="https://maps.app.goo.gl/TnyD131GeLKYeARSA" target="_blank" rel="noopener noreferrer">Selvin's</a>,
                              a local Caribbean restaurant, and tried some delicious Caribbean chicken with Rice and Beans.</p>
                        <br />

                        <p>Afterward, we checked into our Airbnb, took a refreshing shower, and rested for a while. For dinner, we decided to try <a href="https://maps.app.goo.gl/2vNghKagTvPVHnip6" target="_blank" rel="noopener noreferrer">Cafe Viejo</a>,
                         an Italian restaurant located in the center of town. The food was fantastic, we tried the “Fritto Misto”, a mix of fried fish and seafood. Later that night, we headed to <a href="https://maps.app.goo.gl/fXnSossA1PqAfkbh9" target="_blank" rel="noopener noreferrer">Salsa Brava</a>, a beachside bar that's known for its reggae nights and chill vibe.</p>
                        <br />

                        <p>The next day, we got up later than we would've liked to, we got coffee and croissants at the <a href="https://maps.app.goo.gl/UW6EWzA4h9WQTsbX6" target="_blank" rel="noopener noreferrer">Degustibus Bakery</a> and headed off to Cocles. 
                        There is a nice and well kept path closeby the bakery that leads to Cocles, where we discovered a nice viewpoint before getting to the beach. </p>
                        <br />

                        <p>After our hike, we headed back to the house to pack up and check out. We were lucky to leave on a Sunday as we were told that no big trucks on the road are allowed, making our journey back to San José smoother than expected.</p>
                        <br />

                        <p>Puerto Viejo is an excellent destination for a quick weekend getaway. With its stunning beaches, vibrant nightlife, and natural beauty, you'll never run out of things to do. Whether you're looking for adventure or relaxation,
                             Puerto Viejo has something to offer everyone. So what are you waiting for? Book your trip today and experience the magic of Puerto Viejo for yourself!</p>
                    </div>
                    <OtherBlogs currentBlog="twodaysinpuertoviejo" blogs={blogs} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default TwoDaysInPV;