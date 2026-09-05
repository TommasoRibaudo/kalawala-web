import { strings } from './BookingSearchWidget.component';

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

const locales = Object.keys(strings) as Array<keyof typeof strings>;

test.each(locales.filter((locale) => locale !== 'en'))(
  'BookingSearchWidget strings exposes the same keys in English and %s',
  (locale) => {
    expect(keyShape(strings[locale])).toEqual(keyShape(strings.en));
  }
);

test.each(locales)('BookingSearchWidget strings has non-empty %s copy', (locale) => {
  for (const value of collectStrings(strings[locale])) {
    expect(value).toEqual(expect.stringMatching(/\S/));
  }
});
