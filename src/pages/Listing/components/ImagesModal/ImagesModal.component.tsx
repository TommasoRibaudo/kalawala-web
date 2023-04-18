import { useEffect } from "react";
import './ImagesModal.style.scss';
import PortfolioImage from "../../../../components/PortfolioImage/PortfolioImage.component";


interface IIMagesModal {
  closeModal: () => void;
  houseName: string;
}
const ImagesModal = ({ closeModal, houseName }: IIMagesModal) => {
  useEffect(() => {
    console.log('test')
  }, []);
  return (
    <div className="testModal " onClick={closeModal}>
      <div className="d-flex flex-wrap align-items-center h-100">
          <PortfolioImage folderName={houseName} />
      </div>
    </div>
  )
}

export default ImagesModal