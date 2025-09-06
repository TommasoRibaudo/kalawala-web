import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ExecFileSyncOptionsWithBufferEncoding } from "child_process";
import { IImageDescription } from "../../utils/constants"
import { useState, useEffect } from "react"
import './TipCard.style.scss'
interface ITipCard {
  roomType: string;
  roomDescription: string;
  folderName: string;
}

export const TipCard = ({ roomType, roomDescription, folderName }: ITipCard) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`caption d-flex align-items-center flex-column ${isVisible ? 'tip-visible' : 'tip-hidden'}`}>
      {/* <div className="search-icon image-popup d-flex justify-content-center align-items-center" data-effect="mfp-with-zoom" data-lightbox="image-1">
        <FontAwesomeIcon icon={faSearch} color='white' fontSize={"20px"} />
      </div> */}
      <h4 className="tipcard-caption">Casa {folderName} - {roomType}</h4>
      <p>{roomDescription}</p>
    </div>
  )
}