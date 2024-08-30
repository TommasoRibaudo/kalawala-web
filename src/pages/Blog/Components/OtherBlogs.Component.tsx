import React, { FC, useEffect, useState } from "react";
import './OtherBlogs.style.scss'
import { BlogType } from "../../../utils/types";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "../../../components/CustomSlick/SlickDarkArrow.Component";


interface IOtherListing {
  currentBlog: string
  blogs: BlogType[]
}

const OtherBlogs: FC<IOtherListing> = ({ currentBlog, blogs }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const navigate = useNavigate()

  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
  }, [])
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow:  windowWidth<881?2 : 4, // Adjust based on screen size
    slidesToScroll: 1,
    adaptiveHeight: true, // Ensure the height of the slider adapts to its content
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
};
  return (
    <>
      <div className="cont d-flex justify-content-center">
        <div className="header">Check out our other blogs!</div>
        <Slider {...sliderSettings} className="subCont">
          {blogs.map(({ title, thumbnail, id }) => {
            return title !== currentBlog ? (
              <div><div
                style={{ backgroundImage: `url(${thumbnail})`,width: '95%', marginTop:'5%'}}
                className="listing d-flex align-items-end"
                onClick={() => { navigate(`/${id}`) }}
              >
                <div className="name">{title}</div>
              </div></div>
            ) : null
          })}
        </Slider>
      </div>
    </>
  )
}

export default OtherBlogs;