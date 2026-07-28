import { PROPERTY_CAPACITY } from './constants';

/**
 * Bedroom / bathroom / occupancy facts, in the shape both the fact row under the
 * listing title (PropertyFacts) and the amenities grid render. Kept here so the
 * two never word the same number differently.
 *
 * `icon` is an AmenityIcon key, not a FontAwesome definition — PropertyFacts maps
 * it to an icon itself.
 */
export type CapacityFact = {
  key: 'bedrooms' | 'bathrooms' | 'guests';
  icon: 'bed' | 'bath' | 'guests';
  label: string;
};

export const getCapacityFacts = (
  propertyKey: string,
  isSpanish: boolean
): CapacityFact[] => {
  const capacity = PROPERTY_CAPACITY[propertyKey];

  if (!capacity) {
    return [];
  }

  const { bedrooms, bathrooms, maxGuests } = capacity;

  return [
    {
      key: 'bedrooms',
      icon: 'bed',
      label: isSpanish
        ? `${bedrooms} ${bedrooms === 1 ? 'habitación' : 'habitaciones'}`
        : `${bedrooms} ${bedrooms === 1 ? 'bedroom' : 'bedrooms'}`
    },
    {
      key: 'bathrooms',
      icon: 'bath',
      label: isSpanish
        ? `${bathrooms} ${bathrooms === 1 ? 'baño' : 'baños'}`
        : `${bathrooms} ${bathrooms === 1 ? 'bathroom' : 'bathrooms'}`
    },
    {
      key: 'guests',
      icon: 'guests',
      label: isSpanish
        ? `Hasta ${maxGuests} ${maxGuests === 1 ? 'huésped' : 'huéspedes'}`
        : `Up to ${maxGuests} ${maxGuests === 1 ? 'guest' : 'guests'}`
    }
  ];
};
