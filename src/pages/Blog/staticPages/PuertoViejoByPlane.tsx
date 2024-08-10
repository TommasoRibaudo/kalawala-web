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
import { Helmet } from "react-helmet";


const PuertoViejoByPlane = () => {
    // const { blogId } = useParams();
    const blogId = 'puertoviejobyplane'
    const listings: ListingType[] = [
        { name: 'Tucano', mainImage: TucanoImage },
        { name: 'Geco', mainImage: GecoImage },
        { name: 'Pappagallo', mainImage: PappagalloImage },
        { name: 'Rana', mainImage: RanaImage },
    ]
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
                <title>Getting to Puerto Viejo By Plane</title>
                <meta name="description" content="Getting to Puerto Viejo by plane is easier than you might think. In this article, we'll show you how to travel from any destination to Puerto Viejo by taking a domestic flight from San Jose to Limón." />
                <link rel="canonical" href="https://www.reservaskalawala.com/blog/puertoviejobyplane" />
            </Helmet>
            <FixedNavigation isBlog={true} />
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 4 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } : { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <ListingAd listings={listings} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={windowWidth <= 991 ? { order: 'first', span: 12 } : { order: 'first', span: 12 }} sm={12} xs={12}>

                    <br />
                    <div className="heading title-container" style={{ maxWidth: 1000, }}>

                        <h1 className="title blog-title">Getting to Puerto Viejo By Plane
                        </h1>
                        <div className="border"></div>

                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <div className="description" style={{ maxWidth: 1000, }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src="https://i.imgur.com/mmXU8yv.jpeg" style={{ maxWidth: 1000, }} className="responsive-image" alt="Kayaking in Punta Uva" />
                        </div>
                            <p style={{display:'flex', justifyContent:'right'}}>Image by <a href="http://www.freepik.com/" target="_blank"> Freepik</a></p>
                        <br />
                        <p>Getting to Puerto Viejo by plane is easier than you might think. In this article, we'll show you how to travel from any destination to Puerto Viejo by taking a domestic flight from San Jose to Limón.</p>
                        <br />

                        <p>To book your flight, simply visit <a href="https://www.flysansa.com" target="_blank" rel="noopener noreferrer">flysansa.com</a> and select your travel dates and times. You will then be prompted to enter your personal and payment details to complete your booking. It's important to note that Sansa Airlines offers several
                             flight options throughout the day, making it easy to find a flight that fits your schedule.</p>
                        <br />
                        <p>The first leg of the journey is to fly to San Jose International Airport, also known as <a href="https://maps.app.goo.gl/4wEYh3ZHCWNWSrQo6" target="_blank" rel="noopener noreferrer">Juan Santamaría</a> (SJO), the largest airport in Costa Rica. SJO is well-connected to many international destinations, making it a convenient starting 
                            point for your journey to Puerto Viejo. Once you land in SJO, you will have to pass customs and head to the Domestic Gate: there is a big old airplane outside, so it’s easy to spot.</p>
                        <br />
                        <p>The flight takes approximately 40 minutes on a small but safe Cessna, giving you a bird's eye view of <a href="https://maps.app.goo.gl/ZZoEh3xB5jQGG4Mf9" target="_blank" rel="noopener noreferrer">Braulio Carrillo National Park</a>.</p>
                        <br />
                        <p>Once you arrive in Limón, a private transfer will drive you to Puerto Viejo for approximately $75 USD. A chauffeur will be waiting for you at the airport and will drive you directly to your accommodation, ensuring a stress-free
                             and comfortable journey. Alternatively, you can take a bus or taxi from Limón to Puerto Viejo, but we recommend arranging a private transfer beforehand to save time and avoid any potential scam.</p>
                        <br />
                        <p> At this point, all that's left is for you to kick back and enjoy the laid-back vibes of Puerto Viejo. Whether you're looking to relax on the beach, explore the jungle, or indulge in some delicious Caribbean cuisine,
                             Puerto Viejo has something for everyone.</p>
                        <br />
                        <p> In conclusion, traveling to Puerto Viejo from any destination is easy and convenient thanks to the domestic flight from San Jose to Limón. With a quick and comfortable flight and the option of arranging a private transfer,
                             you'll be sipping on a tropical cocktail in no time. So what are you waiting for? Book your trip to Puerto Viejo today and experience the magic of this charming beach town for yourself! And don't hesitate to contact us for help
                              organizing your trip or scheduling a private transfer from Limón.</p>
                        <br />

                    </div>
                    <OtherBlogs currentBlog="puertoviejobyplane" blogs={blogs} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default PuertoViejoByPlane;