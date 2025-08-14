import React from 'react';

import requireContext from 'require-context.macro';
import { Image } from 'react-bootstrap';
import { GiuliaImageDescriptionsES, PlumeriaImageDescriptionsES, ArekaImageDescriptionsES, gecoImageDescriptionsES, IImageDescription, pappagalloImageDescriptionsES, ranaImageDescriptionsES, tucanoImageDescriptionsES, VillaCoralImageDescriptionsES, VillaMarImageDescriptionsES } from '../../utils/constants';
import { TipCard } from '../TipCard/TipCard.component';

interface IPortfolioImage {
  folderName: string;
}

const PortfolioImageES = ({ folderName }: IPortfolioImage) => {
  let images: any;
  type ImageDescriptions = {
    [key: string]: IImageDescription[];
  }
  const imageDescriptions: ImageDescriptions = {
    Tucano: tucanoImageDescriptionsES,
    Geco: gecoImageDescriptionsES,
    Pappagallo: pappagalloImageDescriptionsES,
    Rana: ranaImageDescriptionsES
  }
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
      {imageList.map((image: any) => {
        return (
          <div key={image} className="portfolio-block col-lg-4 col-md-6">
            <Image
              loading='lazy'
              key={image} src={image.imageLink} alt={`Image ${image + 1}`} fluid />
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