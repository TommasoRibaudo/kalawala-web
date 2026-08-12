/**
 * Keeps src/i18n/amenityLabels.ts in sync with the amenity name strings
 * actually used across the live portfolio, in both directions:
 *   - every amenity name rendered for a non-en/es locale must have a full
 *     7-locale AMENITY_LABELS entry (a missing one silently falls back to
 *     the raw English string for that one amenity, invisibly)
 *   - every AMENITY_LABELS entry must correspond to a name still in use
 *     (an orphan is dead weight, not a bug, but drifts silently otherwise)
 *
 * Mirrors LISTING_PAGE_DATA's own composition in src/utils/constants.ts —
 * update both if that composition changes. Deliberately does NOT include
 * houseDataEngList/ribHouseDataEngList: those feed the homepage's home-card
 * grid (Home.page.tsx), which never renders amenities[].name at all, so
 * amenity strings that only live there are correctly absent here.
 */
import { houseDataList, NamDataList, NamDataListES, VillasDataList, VillasDataListES } from '../../utils/constants';
import { AMENITY_LABELS } from '../amenityLabels';

const LISTING_PAGE_DATA = [
  ...houseDataList,
  ...NamDataList,
  ...NamDataListES,
  ...VillasDataList,
  ...VillasDataListES,
];

// Amenities.component.tsx only consults AMENITY_LABELS for locale !== 'en' &&
// locale !== 'es' — es/en both render `name` as-is from their own dedicated
// (ES-suffixed or unsuffixed) entry. So the only names that ever reach the
// translation table are the ones on the unsuffixed (English) entries.
const englishAmenityNames = new Set(
  LISTING_PAGE_DATA
    .filter((house) => !house.houseLangCode.endsWith('ES'))
    .flatMap((house) => house.amenities.map((a) => a.name))
);

const NON_EN_ES_LOCALES = ['de', 'fr', 'it', 'pt', 'he', 'hi', 'nl'] as const;

describe('AMENITY_LABELS stays in sync with the live portfolio', () => {
  test('every amenity name used by an English listing has a full 7-locale entry', () => {
    const missingEntirely: string[] = [];
    const missingSomeLocales: string[] = [];

    englishAmenityNames.forEach((name) => {
      const entry = AMENITY_LABELS[name];
      if (!entry) {
        missingEntirely.push(name);
        return;
      }
      const missingLocales = NON_EN_ES_LOCALES.filter((locale) => !entry[locale]);
      if (missingLocales.length > 0) {
        missingSomeLocales.push(`${name} (missing: ${missingLocales.join(', ')})`);
      }
    });

    expect(missingEntirely).toEqual([]);
    expect(missingSomeLocales).toEqual([]);
  });

  test('every AMENITY_LABELS entry is still used by an English listing', () => {
    const orphaned = Object.keys(AMENITY_LABELS).filter((name) => !englishAmenityNames.has(name));
    expect(orphaned).toEqual([]);
  });
});
