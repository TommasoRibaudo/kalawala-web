import React, { FC, useEffect, useState, useCallback, useMemo } from "react";
import './OtherBlogs.style.scss'
import { BlogType } from "../../../utils/types";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "../../../components/CustomSlick/SlickDarkArrow.Component";
import { cdnImage } from "../../../utils/imageCdn";
import { useMessages } from '../../../i18n';

interface IOtherBlogs {
  currentBlog: string
  blogs: BlogType[]
}

const OtherBlogs: FC<IOtherBlogs> = ({ currentBlog, blogs }) => {
  const m = useMessages();
  // Seeded null, not window.innerWidth — react-snap's puppeteer viewport at
  // prerender time and a real visitor's viewport at hydration time are
  // different numbers, and windowWidth below drives slidesToShow (which
  // changes how many slide clones react-slick renders for its infinite
  // loop). Same fix as MessageTipContainer.component.tsx: null falls back
  // to the same value the "desktop" branch would produce, matching
  // react-snap's desktop-sized prerender, until the resize effect sets the
  // real width post-mount.
  const [windowWidth, setWindowWidth] = useState<number | null>(null)
  const navigate = useNavigate()

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    handleResize() // real width, read only after mount
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  // Found while merging Phase 3c: this used to compare against `blog.title`
  // (a human-readable sentence), but every call site passes an `id`-shaped
  // slug. The two never matched, so the "exclude the current article"
  // filter was a no-op on all 20 pre-merge pages — every carousel included a
  // card linking back to the page you were already on.
  const filteredBlogs = useMemo(() =>
    blogs.filter(blog => blog.id !== currentBlog),
    [blogs, currentBlog]
  )

  const sliderSettings = useMemo(() => ({
    dots: true,
    infinite: filteredBlogs.length > 4,
    speed: 500,
    slidesToShow: windowWidth === null ? Math.min(4, filteredBlogs.length) : windowWidth < 768 ? 1 : windowWidth < 1024 ? 2 : Math.min(4, filteredBlogs.length),
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
      <h2 className="other-blogs-header">{m.sections.otherBlogsHeading}</h2>
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
                aria-label={m.sections.readBlog(title)}
              >
                <div
                  className="blog-card-image"
                  style={{ backgroundImage: `url(${cdnImage(thumbnail, 400)})` }}
                />
                <div className="blog-card-content">
                  <h3 className="blog-card-title">{title}</h3>
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