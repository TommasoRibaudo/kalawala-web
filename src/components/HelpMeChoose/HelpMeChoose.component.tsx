import React from 'react';
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

    const handleClick = (houseLangCode: string) => {
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
                    {options.map((option) => (
                        <div 
                            key={option.houseLangCode} 
                            className="help-me-choose-card"
                            onClick={() => handleClick(option.houseLangCode)}
                        >
                            <div className="card-image-wrapper">
                                <img src={option.image} alt={option.houseName} />
                            </div>
                            <div className="card-content">
                                <span className="card-emoji">{option.emoji}</span>
                                <span className="card-label">{option.label}</span>
                                <span className="card-house-name">{option.houseName}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HelpMeChoose;
