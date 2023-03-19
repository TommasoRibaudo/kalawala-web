import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ExecFileSyncOptionsWithBufferEncoding } from "child_process";
import { IImageDescription } from "../../utils/constants"

interface ITipCard {
  roomType: string;
  roomDescription: string;
  folderName: string;
}

export const TipCard = ({ roomType, roomDescription, folderName }: ITipCard) => {
  return (
    <div className="caption d-flex  align-items-center flex-column">
      <div className="search-icon image-popup d-flex justify-content-center align-items-center" data-effect="mfp-with-zoom" data-lightbox="image-1">
        <FontAwesomeIcon icon={faSearch} color='white' fontSize={"20px"} />
      </div>
      <h4>Casa {folderName} - {roomType}</h4>
      <p>{roomDescription}</p>
    </div>
  )
}