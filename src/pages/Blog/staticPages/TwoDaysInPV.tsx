import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import '../../Listing/Listing.style.scss';
import { useParams } from "react-router-dom";
import { HouseDataType, ListingType } from "../../../utils/types";
import { TucanoImage, GecoImage, PappagalloImage, RanaImage } from "../../../assets/images";
// import Amenities from "./components/Amenities/Amenities.component";
import { AmenityType, BlogType } from "../../../utils/types";
import { blogs } from "../../../assets/blogs/blogs";
import FixedNavigation from "../../../components/FixedNavigation/FixedNavigation.component";
import ImagesContainer from "../../Listing/components/ImagesContainer/ImagesContainer.component";
import Amenities from "../../Listing/components/Amenities/Amenities.component";
import ImagesModal from "../../Listing/components/ImagesModal/ImagesModal.component";
import OtherBlogs from "../Components/OtherBlogs.Component";
import OurHomes from "../../../components/OurHomes/OurHomes.component";
import ContactUs from "../../../components/ContactUs/ContactUs.component";
import ListingAd from "../Components/ListingAd/ListingAd.component";


const TwoDaysInPV = () => {
    // const { blogId } = useParams();
    const blogId = '2'
    const listings: ListingType[] = [
        { name: 'Tucano', mainImage: TucanoImage },
        { name: 'Geco', mainImage: GecoImage },
        { name: 'Pappagallo', mainImage: PappagalloImage },
        { name: 'Rana', mainImage: RanaImage },
    ]
    const blogData = blogs.find((blog) => blog.id === blogId);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    useEffect(() => {
        window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    }, [])
    console.log("data:", blogData);
    const description = blogData?.text.split('<br/>');
    return (

        <div className={`listingContainer`}>
            <FixedNavigation isBlog={true} />
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 4 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } : { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <ListingAd listings={listings} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={windowWidth <= 991 ? { order: 'first', span: 12 } : { order: 'first', span: 12 }} sm={12} xs={12}>
                    <div className="heading" style={{ height: 50 }}>
                        <h1 className="title">2 Days One Night in Puerto Viejo</h1>
                    </div>
                    <div className="description">
                        <p>Do you only have a couple of days to visit Puerto Viejo? So did we! We only had 1 night coming from Tortuguero and wanted to make the best out of the time we had in this charming beach town located on the southern Caribbean coast of Costa Rica. With its laid-back atmosphere, pristine beaches, and lush tropical jungle, Puerto Viejo is the perfect destination for a quick weekend escape. In this article, we'll share our experience of spending two days in Puerto Viejo, and give you tips on how to make the most out of your trip.</p>

                        <p>We arrived in Puerto Viejo early on a Saturday morning, excited to start our adventure. Our Airbnb wasn't ready yet, so we decided to rent a quad nearby and head to Punta Uva to soak up some sun. The beach was stunning, with turquoise and calm waters. We rented Kayaks and explored the coast. For lunch, we stopped by Selvin's, a local Caribbean restaurant, and tried some delicious Caribbean chicken with Rice and Beans.</p>

                        <br />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src="https://i.imgur.com/Aogz0HH.jpg" style={{ maxWidth: 1000, }} alt="Kayaking in Punta Uva" />
                        </div>
                        <br />
                        <br />

                        <p>Afterward, we checked into our Airbnb, took a refreshing shower, and rested for a while. For dinner, we decided to try Cafe Viejo, an Italian restaurant located in the center of town. The food was fantastic, we tried the “Fritto Misto”, a mix of fried fish and seafood. Later that night, we headed to Salsa Brava, a beachside bar that's known for its reggae nights and chill vibe.</p>

                        <p>The next day, we got up later than we would've liked to, we got coffee and croissants at the Degustibus Bakery and headed off to Cocles. There is a nice and well kept path closeby the bakery that leads to Cocles, here we discovered a nice viewpoint before getting to the beach. </p>

                        <p>After our hike, we headed back to the house to pack up and check out. We were lucky to leave on a Sunday as we were told that no big trucks on the road are allowed, making our journey back to San José smoother than expected.</p>

                        <p>Puerto Viejo is an excellent destination for a quick weekend getaway. With its stunning beaches, vibrant nightlife, and natural beauty, you'll never run out of things to do. Whether you're looking for adventure or relaxation, Puerto Viejo has something to offer everyone. So what are you waiting for? Book your trip today and experience the magic of Puerto Viejo for yourself!</p>
                    </div>
                    <OtherBlogs currentBlog="2" blogs={blogs} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default TwoDaysInPV;