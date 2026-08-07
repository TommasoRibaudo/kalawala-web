import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faUserGroup, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CapacityFact, getCapacityFacts } from '../../utils/propertyCapacity';
import './PropertyFacts.style.scss';
import type { Locale } from '../../i18n';

interface PropertyFactsProps {
  propertyKey: string;
  locale: Locale;
}

const iconList: Record<CapacityFact['icon'], IconDefinition> = {
  bed: faBed,
  bath: faBath,
  guests: faUserGroup
};

const PropertyFacts: React.FC<PropertyFactsProps> = ({
  propertyKey,
  locale
}) => {
  const facts = getCapacityFacts(propertyKey, locale);

  // Gracefully handle missing configuration
  if (!facts.length) {
    return null;
  }

  return (
    <ul
      className="property-facts"
      aria-label={locale === 'es' ? 'Capacidad de la casa' : 'Property capacity'}
    >
      {facts.map(({ key, icon, label }) => (
        <li className="property-facts__item" key={key}>
          <FontAwesomeIcon
            className="property-facts__icon"
            icon={iconList[icon]}
            aria-hidden="true"
          />
          <span className="property-facts__label">{label}</span>
        </li>
      ))}
    </ul>
  );
};

export default PropertyFacts;
