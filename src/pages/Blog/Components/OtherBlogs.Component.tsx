import React, { FC, useEffect, useState } from "react";
import './OtherBlogs.style.scss'
import { BlogType } from "../../../utils/types";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <div className="cont d-flex justify-content-center">
        <div className="header">Check out our other blogs!</div>
        <div className={`hstack gap-5 subCont`}>
          {blogs.map(({ title, thumbnail, id }) => {
            return title !== currentBlog ? (
              <div
                style={{ backgroundImage: `url(${thumbnail})`, }}
                className="listing d-flex align-items-end"
                onClick={() => { navigate(`/blog/${id}`) }}
              >
                <div className="name">{title}</div>
              </div>
            ) : null
          })}
        </div>
      </div>
    </>
  )
}

export default OtherBlogs;