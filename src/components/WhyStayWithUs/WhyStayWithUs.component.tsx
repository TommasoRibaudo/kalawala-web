import React from 'react';
import './WhyStayWithUs.style.scss';

interface WhyStayWithUsProps {
  title?: string;
  benefits?: string[];
  ctaText?: string;
  ctaLink: string;
  language?: 'en' | 'es';
}

const WhyStayWithUs: React.FC<WhyStayWithUsProps> = ({
  title,
  benefits,
  ctaText,
  ctaLink,
  language = 'es'
}) => {
  const translations = {
    en: {
      title: "Why book with us?",
      benefits: [
        "Strategic locations",
        "Fully equipped houses",
        "Direct booking and local support",
        "No platform commissions"
      ],
      ctaText: "View all our properties"
    },
    es: {
      title: "¿Por qué reservar con nosotros?",
      benefits: [
        "Ubicaciones estratégicas",
        "Casas totalmente equipadas",
        "Reserva directa y soporte local",
        "Sin comisiones de plataformas"
      ],
      ctaText: "Ver todas nuestras propiedades"
    }
  };

  const currentTranslations = translations[language];
  const displayTitle = title || currentTranslations.title;
  const displayBenefits = benefits || currentTranslations.benefits;
  const displayCtaText = ctaText || currentTranslations.ctaText;
  return (
    <div className="why-stay-with-us">
      <div className="why-stay-with-us__container">
        <h3 className="why-stay-with-us__title">{displayTitle}</h3>
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