import React, { FC, useEffect, useState, useCallback, useMemo } from "react";
import './OtherBlogs.style.scss'
import { BlogType } from "../../../utils/types";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "../../../components/CustomSlick/SlickDarkArrow.Component";

interface IOtherBlogs {
  currentBlog: string
  blogs: BlogType[]
}

const OtherBlogs: FC<IOtherBlogs> = ({ currentBlog, blogs }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const navigate = useNavigate()

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  const filteredBlogs = useMemo(() => 
    blogs.filter(blog => blog.title !== currentBlog), 
    [blogs, currentBlog]
  )

  const sliderSettings = useMemo(() => ({
    dots: true,
    infinite: filteredBlogs.length > 4,
    speed: 500,
    slidesToShow: windowWidth < 768 ? 1 : windowWidth < 1024 ? 2 : Math.min(4, filteredBlogs.length),
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  }), [windowWidth, filteredBlogs.length])

  const handleBlogClick = useCallback((id: string) => {
    navigate(`/${id}`)
  }, [navigate])

  if (filteredBlogs.length === 0) {
    return null
  }

  return (
    <div className="other-blogs-container">
      <h3 className="other-blogs-header">Check out our other blogs!</h3>
      <div className="other-blogs-slider">
        <Slider {...sliderSettings}>
          {filteredBlogs.map(({ title, thumbnail, id }) => (
            <div key={id} className="blog-slide">
              <div
                className="blog-card"
                onClick={() => handleBlogClick(id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleBlogClick(id)}
                aria-label={`Read blog: ${title}`}
              >
                <div
                  className="blog-card-image"
                  style={{ backgroundImage: `url(${thumbnail})` }}
                />
                <div className="blog-card-content">
                  <h4 className="blog-card-title">{title}</h4>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default OtherBlogs;