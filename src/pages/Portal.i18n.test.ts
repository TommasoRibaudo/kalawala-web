import { portalStrings } from './Portal.i18n';

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

const locales = Object.keys(portalStrings) as Array<keyof typeof portalStrings>;

test.each(locales.filter((locale) => locale !== 'en'))(
  'Portal.i18n exposes the same keys in English and %s',
  (locale) => {
    expect(keyShape(portalStrings[locale])).toEqual(keyShape(portalStrings.en));
  }
);

test.each(locales)('Portal.i18n has non-empty %s copy', (locale) => {
  for (const value of collectStrings(portalStrings[locale])) {
    expect(value).toEqual(expect.stringMatching(/\S/));
  }
});
