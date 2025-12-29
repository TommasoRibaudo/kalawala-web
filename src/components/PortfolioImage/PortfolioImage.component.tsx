import React from 'react';
import { ArekaImageDescriptions, PlumeriaImageDescriptions, GiuliaImageDescriptions, gecoImageDescriptions, IImageDescription, pappagalloImageDescriptions, ranaImageDescriptions, tucanoImageDescriptions, VillaCoralImageDescriptions, VillaMarImageDescriptions, delfinImageDescriptions, delfinImageDescriptionsES } from '../../utils/constants';
import AspectBox from '../AspectBox/AspectBox.component';
import ImageWithSkeleton from '../ImageWithSkeleton/ImageWithSkeleton.component';

interface IPortfolioImage {
  folderName: string;
}

const PortfolioImage = ({ folderName }: IPortfolioImage) => {
  let images: IImageDescription[] = [];
  
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
    case "Villa Mar":
      images = VillaMarImageDescriptions;
      break;
    case "Villa Coral":
      images = VillaCoralImageDescriptions;
      break;
    case "Areka":
      images = ArekaImageDescriptions;
      break;
    case "Plumeria":
      images = PlumeriaImageDescriptions;
      break;
    case "Giulia":
      images = GiuliaImageDescriptions;
      break;
    case "Delfin":
      images = delfinImageDescriptions;
      break;
    // Add Spanish language support
    case "TucanoES":
      images = tucanoImageDescriptions;
      break;
    case "GecoES":
      images = gecoImageDescriptions;
      break;
    case "PappagalloES":
      images = pappagalloImageDescriptions;
      break;
    case "RanaES":
      images = ranaImageDescriptions;
      break;
    case "Villa MarES":
      images = VillaMarImageDescriptions;
      break;
    case "Villa CoralES":
      images = VillaCoralImageDescriptions;
      break;
    case "ArekaES":
      images = ArekaImageDescriptions;
      break;
    case "PlumeriaES":
      images = PlumeriaImageDescriptions;
      break;
    case "GiuliaES":
      images = GiuliaImageDescriptions;
      break;
    case "DelfinES":
      images = delfinImageDescriptionsES;
      break;
    default:
      console.warn(`No images found for folder: ${folderName}`);
      images = [];
      break;
  }

  // Safety check - if images is still undefined or empty, return empty div
  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }
  return (
    <div className="filtr-item row">
      {images.map((image: IImageDescription, index: number) => {
        return (
          <div key={index} className="portfolio-block col-lg-4 col-md-6">
            <AspectBox ratio="4/3" minHeight={250}>
              <ImageWithSkeleton
                loading='lazy'
                src={image.imageLink || ''} 
                alt={image.roomType || `Image ${index + 1}`}
                fluid 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                skeletonProps={{ 
                  variant: 'rectangular', 
                  animation: 'shimmer',
                  aspectRatio: '4/3'
                }}
              />
            </AspectBox>
          </div>
        )
      })}
    </div>
  );
};

export default PortfolioImage;