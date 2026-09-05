import { calendarStrings } from './CalendarWithPriceDots.component';

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

const locales = Object.keys(calendarStrings) as Array<keyof typeof calendarStrings>;

test.each(locales.filter((locale) => locale !== 'en'))(
  'calendarStrings exposes the same keys in English and %s',
  (locale) => {
    expect(keyShape(calendarStrings[locale])).toEqual(keyShape(calendarStrings.en));
  }
);

test.each(locales)('calendarStrings has non-empty %s copy', (locale) => {
  for (const value of collectStrings(calendarStrings[locale])) {
    expect(value).toEqual(expect.stringMatching(/\S/));
  }
});
