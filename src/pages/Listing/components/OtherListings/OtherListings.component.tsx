import React, {FC} from "react";
import { Stack } from "react-bootstrap";
import './OtherListings.style.scss'
import { ListingType } from "../../../../utils/types";
import { useNavigate } from "react-router-dom";

interface IOtherListing {
    currentListing: string
    listings: ListingType[]
}

const OtherListings: FC<IOtherListing> = ({currentListing, listings}) => {
    const naviagate = useNavigate()
    return (
    <div className="cont d-flex justify-content-center">
        <Stack gap={5} className=" d-flex align-items-center subCont">
            {listings.map(({name, mainImage})=>{
                return name !== currentListing ? ( //TODO do bootsrtap thing tomake change row/column
                <div style={{backgroundImage: `url(${mainImage})`,}} className="listing d-flex align-items-end"  onClick={()=>{naviagate(`/listing/${name}`)}}>
                    <div className="name">{name}</div>
                </div>
                ) : null
            })}
        </Stack>
    </div>)
}

export default OtherListings