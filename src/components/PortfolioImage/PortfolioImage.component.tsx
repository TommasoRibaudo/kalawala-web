import React from 'react';

import requireContext from 'require-context.macro';
import { Image } from 'react-bootstrap';
import { gecoImageDescriptions, gecoImageDescriptionsES, IImageDescription, pappagalloImageDescriptions, pappagalloImageDescriptionsES, ranaImageDescriptions, ranaImageDescriptionsES, tucanoImageDescriptions, tucanoImageDescriptionsES } from '../../utils/constants';
import { TipCard } from '../TipCard/TipCard.component';

interface IPortfolioImage {
  folderName: string;
}

const PortfolioImage = ({ folderName }: IPortfolioImage) => {
  let images: any;
  type ImageDescriptions = {
    [key: string]: IImageDescription[];
  }
  const imageDescriptions: ImageDescriptions = {
    Tucano:tucanoImageDescriptions,
    Geco:gecoImageDescriptions,
    Pappagallo:pappagalloImageDescriptions,
    Rana:ranaImageDescriptions
  }
  switch (folderName) {
    case "Tucano":
      images = tucanoImageDescriptions;
      break;
    case "Geco":
      images = gecoImageDescriptions;
      break;
    case "Pappagallo":
      images = pappagalloImageDescriptions;
      break;
    case "Rana":
      images = ranaImageDescriptions;
      break;
      case "TucanoES":
        images = tucanoImageDescriptionsES;
        break;
      case "GecoES":
        images = gecoImageDescriptionsES;
        break;
      case "PappagalloES":
        images = pappagalloImageDescriptionsES;
        break;
      case "RanaES":
        images = ranaImageDescriptionsES;
        break;
  }

 const imageList = images;
  return (
    <div className="filtr-item row">
      {imageList.map(( image: any) => {
        return (
        <div key={image} className="portfolio-block col-lg-4 col-md-6">
            <Image
              loading='lazy'
              key={image} src={image.imageLink} alt={`Image ${image + 1}`} fluid />
              {image.roomType && 
              <TipCard 
                roomType={image.roomType} 
                roomDescription={image.roomDescription} 
                folderName={folderName}/>}
          </div>
        )
      })}
    </div>
  );
};

export default PortfolioImage;