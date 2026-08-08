// Phase 7: an eight-language combo box replacing the old binary EN/ES toggle
// button. Renders from RELEASED_LOCALES, not the full LOCALES set — a
// language appears here only once its content exists, so releasing one in
// Phase 8 is a one-line change to that list, not a UI change.
//
// A native <select> rather than a custom listbox: WAI-ARIA combobox/listbox
// patterns are notoriously easy to get subtly wrong (focus management, touch
// handling on mobile, screen reader quirks per browser) and the plan
// explicitly allows either — a real <select> gets keyboard operation, mobile
// picker UI, and screen reader support for free.
//
// <option> can only render text, no icon, which is why the flag lives
// outside the select: an SVG for the *currently selected* locale sits next
// to it as a decorative sibling, using the same country-flag-icons library
// the old button used. The first version used Unicode regional-indicator
// flag emoji inside each <option> instead — checked against an actual
// Chrome-on-Windows render and found it doesn't show a flag at all there.
// Chromium deliberately renders those emoji as their literal two-letter
// fallback ("US" instead of 🇺🇸) on Windows and has for years; SVG doesn't
// have that failure mode.

import { useNavigate, useLocation } from "react-router-dom";
import * as CountryFlags from "country-flag-icons/react/3x2";
import { LOCALE_META, RELEASED_LOCALES, useLocale, type Locale } from "../../i18n";
import { pathInLocale, pathForKey } from "../../routes.config";
import { persistLocalePreference } from "../../i18n/localePreference";

export const LanguageSwitcher = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const locale = useLocale();
    const CurrentFlag = CountryFlags[LOCALE_META[locale].flag as keyof typeof CountryFlags];

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = event.target.value as Locale;
        if (nextLocale === locale) return;

        persistLocalePreference(nextLocale);

        // Same page in the new locale if one exists; that page's home
        // otherwise (never "stay on the current, wrong-locale page" — a
        // guest who just asked for Français should land somewhere in
        // French, not silently stay in English).
        const pathname = pathInLocale(location.pathname, nextLocale) ?? pathForKey('home', nextLocale);
        navigate({
            pathname,
            search: location.search,
            hash: location.hash,
        });
    };

    return (
        <span className="language-switcher">
            <CurrentFlag className="language-switcher__flag" aria-hidden="true" />
            <select
                className="language-switcher-select"
                aria-label="Select language"
                value={locale}
                onChange={handleChange}
            >
                {RELEASED_LOCALES.map((loc) => (
                    <option key={loc} value={loc} dir="auto">
                        {LOCALE_META[loc].nativeName}
                    </option>
                ))}
            </select>
        </span>
    );
};
