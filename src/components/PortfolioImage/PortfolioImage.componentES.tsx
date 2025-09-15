import React from 'react';
import { Image } from 'react-bootstrap';
import { GiuliaImageDescriptionsES, PlumeriaImageDescriptionsES, ArekaImageDescriptionsES, gecoImageDescriptionsES, pappagalloImageDescriptionsES, ranaImageDescriptionsES, tucanoImageDescriptionsES, VillaCoralImageDescriptionsES, VillaMarImageDescriptionsES } from '../../utils/constants';
import { TipCard } from '../TipCard/TipCard.component';

interface IPortfolioImage {
  folderName: string;
}

const PortfolioImageES = ({ folderName }: IPortfolioImage) => {
  let images: any;  
  switch (folderName) {
    case "Tucano":
      images = tucanoImageDescriptionsES;
      break;
    case "Geco":
      images = gecoImageDescriptionsES;
      break;
    case "Pappagallo":
      images = pappagalloImageDescriptionsES;
      break;
    case "Rana":
      images = ranaImageDescriptionsES;
      break;
    case "Villa Coral":
      images = VillaCoralImageDescriptionsES;
      break;
    case "Villa Mar":
      images = VillaMarImageDescriptionsES;
      break;
    case "Areka":
      images = ArekaImageDescriptionsES;
      break;
    case "Plumeria":
      images = PlumeriaImageDescriptionsES;
      break;
    case "Giulia":
      images = GiuliaImageDescriptionsES;
  }

  const imageList = images;
  return (
    <div className="filtr-item row">
      {imageList.map((image: any, index: number) => {
        return (
          <div key={`${folderName}-${index}`} className="portfolio-block col-lg-4 col-md-6">
            <Image
              loading='lazy'
              src={image.imageLink} alt={`Image ${index + 1}`} fluid />
            {image.roomType &&
              <TipCard
                roomType={image.roomType}
                roomDescription={image.roomDescription}
                folderName={folderName} />}
          </div>
        )
      })}
    </div>
  );
};

export default PortfolioImageES;