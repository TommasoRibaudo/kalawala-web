import {
  PROPERTY_CAPACITY,
  PROPERTY_MARKETING_CONFIG,
  houseDataEngList,
  NamDataList,
  ribHouseDataEngList,
} from '../constants';

// Every house the listing pages can render, in one lookup.
const allHouses = [...houseDataEngList, ...NamDataList, ...ribHouseDataEngList];

describe('PROPERTY_CAPACITY', () => {
  test('covers every property that has marketing content', () => {
    expect(Object.keys(PROPERTY_CAPACITY).sort()).toEqual(
      Object.keys(PROPERTY_MARKETING_CONFIG).sort()
    );
  });

  test('maxGuests matches the guestNumber the booking widget is seeded with', () => {
    Object.entries(PROPERTY_CAPACITY).forEach(([propertyKey, capacity]) => {
      const house = allHouses.find((h) => h.houseLangCode === propertyKey);

      expect(house).toBeDefined();
      expect(capacity.maxGuests).toBe(house!.guestNumber);
    });
  });

  test('room counts are positive whole numbers', () => {
    Object.values(PROPERTY_CAPACITY).forEach(({ bedrooms, bathrooms, maxGuests }) => {
      [bedrooms, bathrooms, maxGuests].forEach((value) => {
        expect(Number.isInteger(value)).toBe(true);
        expect(value).toBeGreaterThan(0);
      });
    });
  });

  test('never claims fewer guests than bedrooms', () => {
    Object.entries(PROPERTY_CAPACITY).forEach(([propertyKey, { bedrooms, maxGuests }]) => {
      expect({ propertyKey, ok: maxGuests >= bedrooms }).toEqual({ propertyKey, ok: true });
    });
  });
});
