import React from 'react';
import {
  ArekaImageDescriptions, ArekaImageDescriptionsES,
  PlumeriaImageDescriptions, PlumeriaImageDescriptionsES,
  GiuliaImageDescriptions, GiuliaImageDescriptionsES,
  gecoImageDescriptions, gecoImageDescriptionsES,
  pappagalloImageDescriptions, pappagalloImageDescriptionsES,
  ranaImageDescriptions, ranaImageDescriptionsES,
  tucanoImageDescriptions, tucanoImageDescriptionsES,
  VillaCoralImageDescriptions, VillaCoralImageDescriptionsES,
  VillaMarImageDescriptions, VillaMarImageDescriptionsES,
  delfinImageDescriptions, delfinImageDescriptionsES,
  IImageDescription,
} from '../../utils/constants';
import AspectBox from '../AspectBox/AspectBox.component';
import ImageWithSkeleton from '../ImageWithSkeleton/ImageWithSkeleton.component';
import { pickLocalized, useLocale, type LocalizedValue } from '../../i18n';

interface IPortfolioImage {
  folderName: string;
}

/**
 * Replaces the former PortfolioImage / PortfolioImageES pair.
 *
 * Both were a switch over `folderName` picking a descriptions array. Merging
 * them fixed a real bug rather than just removing duplication: the English
 * component had its own `case "TucanoES"`, `case "GecoES"` … arms, and every one
 * of them assigned the **English** array. So a Spanish page rendered through the
 * English component showed English alt text. The lookup below strips the
 * suffix and picks by locale, so the two cannot disagree again.
 *
 * Alt text is image metadata that lives with the image list in constants.ts, so
 * it is `pickLocalized` content rather than a message-catalog string.
 */
const IMAGE_DESCRIPTIONS: Record<string, LocalizedValue<IImageDescription[]>> = {
  Tucano: { en: tucanoImageDescriptions, es: tucanoImageDescriptionsES },
  Geco: { en: gecoImageDescriptions, es: gecoImageDescriptionsES },
  Pappagallo: { en: pappagalloImageDescriptions, es: pappagalloImageDescriptionsES },
  Rana: { en: ranaImageDescriptions, es: ranaImageDescriptionsES },
  'Villa Mar': { en: VillaMarImageDescriptions, es: VillaMarImageDescriptionsES },
  'Villa Coral': { en: VillaCoralImageDescriptions, es: VillaCoralImageDescriptionsES },
  Areka: { en: ArekaImageDescriptions, es: ArekaImageDescriptionsES },
  Plumeria: { en: PlumeriaImageDescriptions, es: PlumeriaImageDescriptionsES },
  Giulia: { en: GiuliaImageDescriptions, es: GiuliaImageDescriptionsES },
  Delfin: { en: delfinImageDescriptions, es: delfinImageDescriptionsES },
};

const PortfolioImage = ({ folderName }: IPortfolioImage) => {
  const locale = useLocale();

  // Callers still pass the legacy suffixed names ("TucanoES"). Phase 4 removes
  // the suffix from the route model and this normalisation goes with it.
  const key = folderName.endsWith('ES') ? folderName.slice(0, -2) : folderName;
  const entry = IMAGE_DESCRIPTIONS[key];

  if (!entry) {
    console.warn(`No images found for folder: ${folderName}`);
    return <div>No images available</div>;
  }

  const images = pickLocalized(entry, locale);

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
                sizes="(max-width: 575px) 46vw, (max-width: 991px) 48vw, 280px"
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
