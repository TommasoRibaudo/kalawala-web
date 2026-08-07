import { getMessages, type Locale } from '../i18n';
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
  locale: Locale
): CapacityFact[] => {
  const capacity = PROPERTY_CAPACITY[propertyKey];

  if (!capacity) {
    return [];
  }

  const { bedrooms, bathrooms, maxGuests } = capacity;
  const m = getMessages(locale).property;

  return [
    {
      key: 'bedrooms',
      icon: 'bed',
      label: m.bedrooms(bedrooms)
    },
    {
      key: 'bathrooms',
      icon: 'bath',
      label: m.bathrooms(bathrooms)
    },
    {
      key: 'guests',
      icon: 'guests',
      label: m.upToGuests(maxGuests)
    }
  ];
};
