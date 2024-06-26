import React from 'react';

import requireContext from 'require-context.macro';
import { Image } from 'react-bootstrap';
import { gecoImageDescriptions, IImageDescription, pappagalloImageDescriptions, ranaImageDescriptions, tucanoImageDescriptions } from '../../utils/constants';
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
      images = requireContext('../../assets/images/portfolio/Tucano', false, /\.(png|jpe?g|svg)$/);
      break;
    case "Geco":
      images = requireContext('../../assets/images/portfolio/Geco', false, /\.(png|jpe?g|svg)$/);
      break;
    case "Pappagallo":
      images = requireContext('../../assets/images/portfolio/Pappagallo', false, /\.(png|jpe?g|svg)$/);
      break;
    case "Rana":
      images = requireContext('../../assets/images/portfolio/Rana', false, /\.(png|jpe?g|svg)$/);
      break;
  }

 const imageList = images.keys().filter((imagePath: string) => !imagePath.includes('-sm'));
  return (
    <div className="filtr-item row">
      {imageList.map((imagePath: string, index: number) => {
        return (
        <div key={index} className="portfolio-block col-lg-4 col-md-6">
            <Image
              key={index} src={images(imagePath)} alt={`Image ${index + 1}`} fluid />
              {imageDescriptions[folderName][index].roomType && 
              <TipCard 
                roomType={imageDescriptions[folderName][index].roomType} 
                roomDescription={imageDescriptions[folderName][index].roomDescription} 
                folderName={folderName}/>}
          </div>
        )
      })}
    </div>
  );
};

export default PortfolioImage;