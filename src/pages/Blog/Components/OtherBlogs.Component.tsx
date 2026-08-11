import React, { FC, useEffect, useState, useCallback, useMemo } from "react";
import './OtherBlogs.style.scss'
import { blogs } from "../../../assets/blogs/blogs";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "../../../components/CustomSlick/SlickDarkArrow.Component";
import { cdnImage } from "../../../utils/imageCdn";
import { useMessages, type Locale } from '../../../i18n';
import { blogArticleHeading } from '../../../i18n/blogArticleHeadings';
import { routeKeyForSlug, pathForKey } from '../../../routes.config';
import { isPrerender } from '../../../utils/isPrerender';

interface IOtherBlogs {
  currentBlog: string
  locale: Locale
}

const OtherBlogs: FC<IOtherBlogs> = ({ currentBlog, locale }) => {
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
    // react-snap's crawl gives this effect time to settle before it captures
    // the page, so without this guard windowWidth gets seeded from the
    // crawl's own viewport and bakes that slidesToShow into the static HTML
    // — mismatching a real client's null-seeded first render at any other
    // viewport. Same pattern as OtherListings/MessageTipContainer; see
    // docs/i18n-rollout-plan.md Phase 11 P2.
    if (isPrerender()) return
    handleResize() // real width, read only after mount
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  // `blogs` (assets/blogs/blogs.ts) is locale-invariant now — id and
  // thumbnail only, no per-locale title. The card title comes from
  // blogArticleHeading, reusing blog.tsx's own Phase-8 translations instead
  // of maintaining a second copy. Matched by routeKeyForSlug rather than a
  // raw string compare (blogs.ts's ids are inconsistently cased — e.g.
  // "TenHoursInPuerto", "cahuitaParkwhattodo" — routeKeyForSlug already
  // lowercases both sides) so "exclude the current article" keeps working
  // regardless of casing drift between the two tables.
  const currentRouteKey = routeKeyForSlug(currentBlog);
  const filteredBlogs = useMemo(() =>
    blogs
      .map((blog) => ({ ...blog, routeKey: routeKeyForSlug(blog.id) }))
      .filter((blog): blog is typeof blog & { routeKey: NonNullable<typeof blog.routeKey> } =>
        blog.routeKey !== undefined && blog.routeKey !== currentRouteKey
      ),
    [currentRouteKey]
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

  const handleBlogClick = useCallback((routeKey: ReturnType<typeof routeKeyForSlug>) => {
    if (!routeKey) return;
    navigate(pathForKey(routeKey, locale))
  }, [navigate, locale])

  if (filteredBlogs.length === 0) {
    return null
  }

  return (
    <div className="other-blogs-container">
      <h2 className="other-blogs-header">{m.sections.otherBlogsHeading}</h2>
      <div className="other-blogs-slider">
        <Slider {...sliderSettings}>
          {filteredBlogs.map(({ thumbnail, id, routeKey }) => {
            const title = blogArticleHeading(routeKey, locale);
            return (
              <div key={id} className="blog-slide">
                <div
                  className="blog-card"
                  onClick={() => handleBlogClick(routeKey)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleBlogClick(routeKey)}
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
            );
          })}
        </Slider>
      </div>
    </div>
  )
}

export default OtherBlogs;