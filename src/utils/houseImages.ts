import {
  ArekaImageDescriptions,
  delfinImageDescriptions,
  delfinImageDescriptionsES,
  gecoImageDescriptions,
  GiuliaImageDescriptions,
  IImageDescription,
  pappagalloImageDescriptions,
  PlumeriaImageDescriptions,
  ranaImageDescriptions,
  tucanoImageDescriptions,
  VillaCoralImageDescriptions,
  VillaMarImageDescriptions,
} from './constants';

/**
 * Maps a house folder name (the `/{slug}` or `/{slug}ES` route param) to its photo set.
 * Mirrors the mapping PortfolioImage has always used, so the photos shown do not change.
 */
const houseImagesByFolder: Record<string, IImageDescription[]> = {
  Tucano: tucanoImageDescriptions,
  Geco: gecoImageDescriptions,
  Pappagallo: pappagalloImageDescriptions,
  Rana: ranaImageDescriptions,
  'Villa Mar': VillaMarImageDescriptions,
  'Villa Coral': VillaCoralImageDescriptions,
  Areka: ArekaImageDescriptions,
  Plumeria: PlumeriaImageDescriptions,
  Giulia: GiuliaImageDescriptions,
  Delfin: delfinImageDescriptions,
  TucanoES: tucanoImageDescriptions,
  GecoES: gecoImageDescriptions,
  PappagalloES: pappagalloImageDescriptions,
  RanaES: ranaImageDescriptions,
  'Villa MarES': VillaMarImageDescriptions,
  'Villa CoralES': VillaCoralImageDescriptions,
  ArekaES: ArekaImageDescriptions,
  PlumeriaES: PlumeriaImageDescriptions,
  GiuliaES: GiuliaImageDescriptions,
  DelfinES: delfinImageDescriptionsES,
};

export const getHouseImages = (folderName: string): IImageDescription[] =>
  houseImagesByFolder[folderName] ?? [];

export default getHouseImages;
