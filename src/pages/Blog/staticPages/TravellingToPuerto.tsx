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


const TwoDaysInPV = () => {
    // const { blogId } = useParams();
    const blogId = 'travellingtopuertoviejo'
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
                <title>How to get to Puerto Viejo from San Jose</title>
                <meta name="description" content="If you're planning a trip to Puerto Viejo, Costa Rica, you may be wondering how to get there using public transportation. Fortunately, there are several options available that can take you to this beautiful Caribbean town in Talamanca." />
                <link rel="canonical" href="https://www.reservaskalawala.com/blog/travellingtopuertoviejo" />
            </Helmet>
            <FixedNavigation isBlog={true} />
            <Row className="subContainer">
                <Col className="otherOptions col" lg={windowWidth <= 1199 ? { order: 'last', span: 4 } : { order: 'first', span: 2 }} md={{ order: 'last', span: 12 }} order={windowWidth <= 1199 ? { lg: 'last' } : { lg: 'first' }} sm={{ order: 'last', span: 12 }} xs={{ order: 'last', span: 12 }}>
                    <ListingAd listings={listings} />
                </Col>
                <Col className="info col" lg={{ order: 'first', span: 10 }} md={windowWidth <= 991 ? { order: 'first', span: 12 } : { order: 'first', span: 12 }} sm={12} xs={12}>

                    <br />
                    <div className="heading title-container" style={{ maxWidth: 1000, }}>

                        <h1 className="title blog-title">How to get to Puerto Viejo from San Jose
                        </h1>

                        <div className="border"></div>

                    </div>
                    <br />
                    <div className="description" style={{ maxWidth: 1000, }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src="https://i.imgur.com/Aogz0HH.jpg" style={{ maxWidth: 1000, }} className="responsive-image" alt="Kayaking in Punta Uva" />
                        </div>
                        <br />
                        <p>If you're planning a trip to Puerto Viejo, Costa Rica, you may be wondering how to get there using public transportation. Fortunately, there are several options available that can take you to this beautiful Caribbean town in Talamanca.</p>
                        <br />

                        <p>One of the most popular ways to get to Puerto Viejo is by bus. The primary bus company that services the route from San José to Puerto Viejo is <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">MEPE</a>. 
                        The bus station is located in the center of San José, exactly on 9th avenue and 12th street, making it easy to find.</p>
                        <br />
                        <p><b><i>The <a href="https://www.mepecr.com/HorarioS_S.html" target="_blank" rel="noopener noreferrer">bus schedule</a> to Puerto Viejo is as follows: 6am, 8am, 10am, 2pm, and the last one at 4pm.</i></b></p>
                        <br />
                        <p>While you cannot reserve tickets in advance, it's always a good idea to arrive at the bus station early to secure your spot on the bus. Keep in mind that during peak travel seasons, such as holidays and weekends, 
                            the buses can get crowded quickly, so plan accordingly.</p>
                        <br />
                        <p>The bus has many stops, and will also stop at the bus station in limón, Cahuita and finally, Puerto Viejo.</p>
                        <br />
                        <p> If you're looking to save some money on transportation costs, the cheapest option is to take the public bus. These buses are clean, reliable, and offer an affordable way to get to Puerto Viejo. 
                            While they may not be as luxurious as some of the private shuttle services, they will get you to your destination safely and on time.</p>
                        <br />
                        <p>With regular bus schedules from San José and other nearby towns, it's easy to plan your trip and enjoy all that Puerto Viejo has to offer.</p>
                        <br />
                        <p><b><i>Another option to get to Puerto Viejo from San Jose is to take the bus from <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños</a>, which goes directly to Limón. From there, you can transfer to a bus that goes to Puerto Viejo.</i></b></p>
                        <br />
                        <p>The bus schedule from San Jose to Limón leaves from the <a href="https://maps.app.goo.gl/a5kV7YvzybHjVae28" target="_blank" rel="noopener noreferrer">Caribeños stop</a> located in Calle Central, Cinco Esquinas. Buses leave every hour from 6am until 7pm, so it's easy to plan your trip accordingly. Once you arrive in Limón,
                             you can walk to the <a href="https://maps.app.goo.gl/WV4CmLqzco2Eft7y9" target="_blank" rel="noopener noreferrer">Mepe</a> Bus stop, which is located near the central market, and take a bus that leaves every hour to Puerto Viejo.</p>
                        <br />
                        <p>However, it's important to note that the journey from San Jose to Limón can take around 3 to 4 hours, depending on traffic and road conditions. So, it's crucial to plan ahead to avoid being stuck in Limón overnight. 
                            Also, the last bus from Limón to Puerto Viejo leaves at 8pm, so make sure to arrive in Limón with enough time to make the transfer.</p>
                        <br />
                        <p>Another way to get to Puerto Viejo is by using <a href="mailto:reservas.kalawala@gmail.com?subject=Organise private transportation&body= " target="_blank" rel="noopener noreferrer">private transportation</a>. This option can be shared with other travelers or private for you and your companions, making it a convenient and comfortable way to travel to your destination.</p>
                        <br />
                        <p> With private transportation, you can be picked up from wherever you prefer and be dropped off directly at your accommodation in Puerto Viejo. This option can be especially helpful for those who have heavy luggage, prefer more privacy, 
                            or have specific travel needs.</p>
                        <br />
                        <p>Depending on the number of travelers, private transportation can be a more cost-effective option compared to taking a shared shuttle.</p>
                        <br />
                        <p> Additionally, it offers the flexibility to set your own schedule and stop along the way to enjoy some of the beautiful sights along the route.</p>
                        <br />
                        <p>If you're interested in booking private transportation to Puerto Viejo, there are several reputable companies that offer this service. It's always a good idea to research your options and compare prices to find the best deal.</p>
                        <br />
                        <p>We also offer this service and can provide you with the routes and prices to help you make the most informed decision for your travels.</p>
                        <br />
                        <p>Overall, whether you prefer the convenience of public transportation or the comfort of private transportation, there are several ways to get to Puerto Viejo. Regardless of your choice, you're sure to enjoy the stunning scenery 
                            and vibrant culture of this beautiful Caribbean town in Talamanca, Costa Rica.
                        </p>
                        <br />
                    </div>
                    <OtherBlogs currentBlog="travellingtopuertoviejo" blogs={blogs} />
                </Col>
            </Row>
            <ContactUs />
        </div>
    )

}

export default TwoDaysInPV;