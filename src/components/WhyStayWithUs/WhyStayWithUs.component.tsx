import React from 'react';
import './WhyStayWithUs.style.scss';
import { getMessages, type Locale } from '../../i18n';

interface WhyStayWithUsProps {
  title?: string;
  benefits?: string[];
  ctaText?: string;
  ctaLink: string;
  locale: Locale;
}

const WhyStayWithUs: React.FC<WhyStayWithUsProps> = ({
  title,
  benefits,
  ctaText,
  ctaLink,
  locale
}) => {
  const currentTranslations = getMessages(locale).whyStayWithUs;
  const displayTitle = title || currentTranslations.title;
  const displayBenefits = benefits || currentTranslations.benefits;
  const displayCtaText = ctaText || currentTranslations.ctaText;
  return (
    <div className="why-stay-with-us">
      <div className="why-stay-with-us__container">
        <h2 className="why-stay-with-us__title">{displayTitle}</h2>
        <div className="why-stay-with-us__benefits">
          {displayBenefits.map((benefit, index) => (
            <div key={index} className="why-stay-with-us__benefit">
              <span className="why-stay-with-us__benefit-text">{benefit}</span>
            </div>
          ))}
        </div>
        <div className="why-stay-with-us__cta">
          <a
            href={ctaLink}
            className="why-stay-with-us__cta-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            {displayCtaText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default WhyStayWithUs;