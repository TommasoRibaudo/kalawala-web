import React from "react";
import { useParams } from "react-router-dom";

const Blog = () => {
    const { blog } = useParams()
    return(
        <div>{blog}</div>
    )
}

export default Blog;