import React, { useEffect } from "react";
import './ImagesModal.style.scss';
import PortfolioImage from "../../../../components/PortfolioImage/PortfolioImage.component";


interface IIMagesModal {
  closeModal: () => void;
  houseName: string;
}
const ImagesModal = ({ closeModal, houseName }: IIMagesModal) => {
  useEffect(() => {
    // Scroll to top when modal opens
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <div className="imagesModal" onClick={closeModal}>
      <div className="d-flex flex-wrap align-items-center h-100">
          <PortfolioImage folderName={houseName} />
      </div>
    </div>
  )
}

export default ImagesModal