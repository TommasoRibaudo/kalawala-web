// Toggles between the current English and Spanish route while preserving query state.
//
// Phase 7 replaces this binary toggle with a six-language combo box. Until then
// it only offers the two locales that have content (RELEASED_LOCALES), but it no
// longer carries its own copy of the "is this Spanish?" rule — that lives in
// src/i18n/detectLocale.ts.

import { ES, US } from "country-flag-icons/react/3x2";
import { useLocation, useNavigate } from "react-router-dom";
import { LOCALE_META, useLocale } from "../../i18n";
import { pathInLocale } from "../../routes.config";

export const LanguageSwitcher = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const locale = useLocale();
    const nextLocale = locale === "es" ? "en" : "es";
    const nextLanguageLabel = LOCALE_META[nextLocale].nativeName;

    const handleLanguageChange = () => {
        // Falls back to the current path unchanged if it doesn't match any
        // known page (a 404, typically) — better than guessing a broken URL.
        const pathname = pathInLocale(location.pathname, nextLocale) ?? location.pathname;
        navigate({
            pathname,
            search: location.search,
            hash: location.hash,
        });
    };

    return (
        <button type="button" aria-label={`Switch language to ${nextLanguageLabel}`} onClick={handleLanguageChange}>
            {locale === "en" ? <ES title={nextLanguageLabel} /> : <US title={nextLanguageLabel} />}
        </button>
    );
};
