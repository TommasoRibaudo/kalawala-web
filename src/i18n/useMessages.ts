import { getMessages, type Messages } from './messages';
import { useLocale } from './useLocale';
import type { Locale } from './locales';

/**
 * UI strings for the current route's locale.
 *
 * Returns the catalog object rather than a `t('some.key')` function on purpose:
 * `m.footer.ourHomes` is checked by the compiler and autocompletes, where a
 * string key is neither. A typo is a build failure instead of a blank label at
 * runtime, so the "missing key" policy the plan called for is enforced before
 * the code ever ships rather than logged after it does.
 *
 * Components that already receive a `locale` prop should call `getMessages(locale)`
 * instead — Phase 3 removes that prop threading and moves them onto this hook.
 */
export function useMessages(): Messages {
  return getMessages(useLocale());
}

export function messagesFor(locale: Locale): Messages {
  return getMessages(locale);
}
