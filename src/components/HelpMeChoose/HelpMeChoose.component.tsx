import React from 'react';
import { cdnSrcSet } from '../../utils/imageCdn';
import { useNavigate } from 'react-router-dom';
import './HelpMeChoose.style.scss';
import { getMessages, type Locale } from '../../i18n';
import { pathForKey, routeKeyForSlug } from '../../routes.config';

interface HelpMeChooseOption {
    emoji: string;
    label: string;
    houseName: string;
    houseLangCode: string;
    image: string;
}

interface IHelpMeChoose {
    title: string;
    titleHighlight?: string;
    options: HelpMeChooseOption[];
    locale: Locale;
}

const HelpMeChoose: React.FC<IHelpMeChoose> = ({ title, titleHighlight, options, locale }) => {
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // A real href already handles ctrl/cmd-click, middle-click and "open in
        // new tab" correctly — only take over plain left-clicks so those keep
        // working, and use the SPA transition (no full reload) for everything else.
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }
        event.preventDefault();
        navigate(href);
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 0);
    };

    return (
        <section className="help-me-choose-section">
            <div className="container">
                <div className="title text-center wow fadeIn" data-wow-duration="1500ms">
                    <h2>{title} {titleHighlight && <span className="color">{titleHighlight}</span>}</h2>
                </div>
                <div className="help-me-choose-cards">
                    {options.map((option) => {
                        // houseLangCode's "ES" suffix only ever distinguished en/es —
                        // same fix as HomeCard: route by the real locale instead.
                        const routeKey = routeKeyForSlug(option.houseLangCode.replace(/ES$/, ''));
                        const href = routeKey ? pathForKey(routeKey, locale) : '#';
                        return (
                            <a
                                key={option.houseLangCode}
                                className="help-me-choose-card"
                                href={href}
                                onClick={(event) => handleClick(event, href)}
                            >
                                <div className="card-image-wrapper">
                                    <img src={option.image} alt={option.houseName} width={1000} height={667} loading="lazy" decoding="async" srcSet={cdnSrcSet(option.image)} sizes="(max-width: 575px) 86vw, (max-width: 991px) 320px, 250px" />
                                </div>
                                <div className="card-content">
                                    <span className="card-emoji">{option.emoji}</span>
                                    <span className="card-label">{option.label}</span>
                                    <span className="card-house-name">{option.houseName}</span>
                                    <span className="card-cta">{getMessages(locale).property.viewHomeCta}</span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HelpMeChoose;
