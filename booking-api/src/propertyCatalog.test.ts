import {
  BOOKING_PROPERTIES,
  BOOKING_PROPERTIES_BY_ID,
  BOOKING_PROPERTIES_BY_SMOOBU_ID,
} from "./propertyCatalog";

test("booking property catalog uses real unique Smoobu apartment IDs", () => {
  expect(BOOKING_PROPERTIES).toHaveLength(10);

  const ids = BOOKING_PROPERTIES.map((property) => property.smoobuApartmentId);
  expect(new Set(ids).size).toBe(ids.length);
  expect(ids).toEqual([
    301061,
    301064,
    301055,
    301058,
    1829402,
    1819085,
    1516846,
    1516849,
    1597723,
    2946826,
  ]);
  expect(ids).not.toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("booking property catalog lookup maps cover every configured property", () => {
  for (const property of BOOKING_PROPERTIES) {
    expect(BOOKING_PROPERTIES_BY_ID.get(property.propertyId)).toBe(property);
    expect(BOOKING_PROPERTIES_BY_SMOOBU_ID.get(property.smoobuApartmentId)).toBe(property);
  }
});
