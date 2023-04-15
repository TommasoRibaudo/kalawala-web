import React from "react";
import { Stack } from "react-bootstrap";
import './OtherListings.style.scss'

const OtherListings = () => {

    const listings = [{name: 'test1'},{name: 'test2'}]
    return (
    <div className="cont d-flex justify-content-center">
        <Stack gap={5} className=" d-flex align-items-center">
            {listings.map(({name})=>{
                return (
                <div className="listing d-flex align-items-end">
                    <div className="name">{name}</div>
                </div>
                )
            })}
        </Stack>
    </div>)
}

export default OtherListings