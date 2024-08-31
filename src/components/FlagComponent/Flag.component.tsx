//a component that receives the current url and on click redirects to the new url, if the url ends with ES it will redirect to the same url without ES, if it does not end with ES it will redirect to the same url with ES

import { ES, US } from "country-flag-icons/react/3x2";
import { useLocation, useNavigate } from "react-router-dom";

export const LanguageSwitcher = () => {
    const navigate = useNavigate();
    const currentUrl = useLocation().pathname;
    const englishLangUsed = !currentUrl.endsWith("ES");

    const handleLanguageChange = () => {
        //slice everything after # if present
        if (currentUrl.includes("#")) {
            const hashIndex = currentUrl.indexOf("#");
            if (!englishLangUsed) {
                navigate(currentUrl.slice(0, hashIndex - 2) + currentUrl.slice(hashIndex));
            } else {
                navigate(`${currentUrl.slice(0, hashIndex)}ES${currentUrl.slice(hashIndex)}`);
            }
            return;
        } else {
            if (!englishLangUsed) {
                navigate(currentUrl.slice(0, -2));
            } else {
                navigate(`${currentUrl}ES`);
            }
        }
    };

    return (
        <div className="navbar-flag">
            <button onClick={handleLanguageChange}>
                {englishLangUsed? <ES title="Español" />:<US title="English" />}
            </button>
        </div>
    );
};
