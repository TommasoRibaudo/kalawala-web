// Toggles between the current English and Spanish route while preserving query state.
//
// Phase 7 replaces this binary toggle with a six-language combo box. Until then
// it only offers the two locales that have content (RELEASED_LOCALES), but it no
// longer carries its own copy of the "is this Spanish?" rule — that lives in
// src/i18n/detectLocale.ts, so Phase 4's switch to /:locale/ routes needs no
// change here.

import { ES, US } from "country-flag-icons/react/3x2";
import { useLocation, useNavigate } from "react-router-dom";
import { LOCALE_META, useLocale } from "../../i18n";

export const LanguageSwitcher = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const locale = useLocale();
    const nextLocale = locale === "es" ? "en" : "es";
    const nextLanguageLabel = LOCALE_META[nextLocale].nativeName;

    const handleLanguageChange = () => {
        navigate({
            pathname: getAlternateLanguagePath(location.pathname),
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

/**
 * Maps a route to its counterpart in the other language.
 *
 * Still suffix arithmetic because the routes themselves are still suffixed.
 * Phase 4 replaces this with a lookup in routes.config.ts, which is what makes
 * the same switcher work for six languages instead of two.
 */
function getAlternateLanguagePath(pathname: string): string {
    if (pathname === "/HomeES") {
        return "/";
    }

    if (pathname === "/") {
        return "/HomeES";
    }

    if (pathname.endsWith("ES") || pathname.includes("ES/")) {
        return pathname.endsWith("ES") ? pathname.slice(0, -2) : pathname.replace("ES/", "/");
    }

    return `${pathname}ES`;
}
