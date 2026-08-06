import React from 'react';
import { cdnSrcSet } from '../../utils/imageCdn';
import { useNavigate } from 'react-router-dom';
import './HelpMeChoose.style.scss';

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
}

const HelpMeChoose: React.FC<IHelpMeChoose> = ({ title, titleHighlight, options }) => {
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, houseLangCode: string) => {
        // A real href already handles ctrl/cmd-click, middle-click and "open in
        // new tab" correctly — only take over plain left-clicks so those keep
        // working, and use the SPA transition (no full reload) for everything else.
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }
        event.preventDefault();
        navigate(`/${houseLangCode}`);
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
                        // Spanish house codes contain "ES" — same convention HomeCard
                        // uses to label its own CTA without a language prop.
                        const isSpanish = option.houseLangCode.includes('ES');
                        return (
                            <a
                                key={option.houseLangCode}
                                className="help-me-choose-card"
                                href={`/${option.houseLangCode}`}
                                onClick={(event) => handleClick(event, option.houseLangCode)}
                            >
                                <div className="card-image-wrapper">
                                    <img src={option.image} alt={option.houseName} width={1000} height={667} loading="lazy" decoding="async" srcSet={cdnSrcSet(option.image)} sizes="(max-width: 575px) 86vw, (max-width: 991px) 320px, 250px" />
                                </div>
                                <div className="card-content">
                                    <span className="card-emoji">{option.emoji}</span>
                                    <span className="card-label">{option.label}</span>
                                    <span className="card-house-name">{option.houseName}</span>
                                    <span className="card-cta">{isSpanish ? 'Ver casa →' : 'View home →'}</span>
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
