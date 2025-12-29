import React from 'react';
import { GiuliaImageDescriptionsES, PlumeriaImageDescriptionsES, ArekaImageDescriptionsES, gecoImageDescriptionsES, pappagalloImageDescriptionsES, ranaImageDescriptionsES, tucanoImageDescriptionsES, VillaCoralImageDescriptionsES, VillaMarImageDescriptionsES, delfinImageDescriptionsES, IImageDescription } from '../../utils/constants';
import { TipCard } from '../TipCard/TipCard.component';
import ImageWithSkeleton from '../ImageWithSkeleton/ImageWithSkeleton.component';

interface IPortfolioImage {
  folderName: string;
}

const PortfolioImageES = ({ folderName }: IPortfolioImage) => {
  let images: IImageDescription[] = [];  
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
      break;
    case "Delfin":
      images = delfinImageDescriptionsES;
      break;
    default:
      console.warn(`No images found for folder: ${folderName}`);
      images = [];
      break;
  }

  // Safety check - if images is still undefined or empty, return empty div
  if (!images || images.length === 0) {
    return <div>No hay imágenes disponibles</div>;
  }

  return (
    <div className="filtr-item row">
      {images.map((image: IImageDescription, index: number) => {
        return (
          <div key={`${folderName}-${index}`} className="portfolio-block col-lg-4 col-md-6">
            <ImageWithSkeleton
              loading='lazy'
              src={image.imageLink || ''} 
              alt={image.roomType || `Image ${index + 1}`} 
              fluid 
              skeletonProps={{ 
                variant: 'rectangular', 
                animation: 'shimmer',
                aspectRatio: '4/3'
              }}
            />
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