import { portalDetailStrings } from './PortalDetail.i18n';

function keyShape(value: unknown): unknown {
  if (typeof value === 'function') return 'function';
  if (typeof value !== 'object' || value === null) return typeof value;
  const entries = Object.keys(value as Record<string, unknown>)
    .sort()
    .map((key) => [key, keyShape((value as Record<string, unknown>)[key])] as const);
  return Object.fromEntries(entries);
}

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') {
    out.push(value);
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach((v) => collectStrings(v, out));
  }
  return out;
}

const locales = Object.keys(portalDetailStrings) as Array<keyof typeof portalDetailStrings>;

test.each(locales.filter((locale) => locale !== 'en'))(
  'PortalDetail.i18n exposes the same keys in English and %s',
  (locale) => {
    expect(keyShape(portalDetailStrings[locale])).toEqual(keyShape(portalDetailStrings.en));
  }
);

test.each(locales)('PortalDetail.i18n has non-empty %s copy', (locale) => {
  for (const value of collectStrings(portalDetailStrings[locale])) {
    expect(value).toEqual(expect.stringMatching(/\S/));
  }
});
