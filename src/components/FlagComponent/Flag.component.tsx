// Toggles between the current English and Spanish route while preserving query state.

import { ES, US } from "country-flag-icons/react/3x2";
import { useLocation, useNavigate } from "react-router-dom";

export const LanguageSwitcher = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentUrl = location.pathname;
    const englishLangUsed = !isSpanishPath(currentUrl);
    const nextLanguageLabel = englishLangUsed ? "Espa\u00f1ol" : "English";

    const handleLanguageChange = () => {
        navigate({
            pathname: getAlternateLanguagePath(currentUrl),
            search: location.search,
            hash: location.hash,
        });
    };

    return (
        <button type="button" aria-label={`Switch language to ${nextLanguageLabel}`} onClick={handleLanguageChange}>
            {englishLangUsed ? <ES title={nextLanguageLabel} /> : <US title={nextLanguageLabel} />}
        </button>
    );
};

function isSpanishPath(pathname: string): boolean {
    return pathname.endsWith("ES") || pathname.includes("ES/") || pathname === "/HomeES";
}

function getAlternateLanguagePath(pathname: string): string {
    if (pathname === "/HomeES") {
        return "/";
    }

    if (pathname === "/") {
        return "/HomeES";
    }

    if (isSpanishPath(pathname)) {
        return pathname.endsWith("ES") ? pathname.slice(0, -2) : pathname.replace("ES/", "/");
    }

    return `${pathname}ES`;
}
