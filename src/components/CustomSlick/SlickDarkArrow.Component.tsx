import React from 'react';
import { CustomArrowProps } from 'react-slick';

const SampleNextArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ 
        ...style, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        borderRadius: '50%',
        width: '44px',
        height: '44px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 10,
        border: '1px solid rgba(0, 0, 0, 0.1)',
        cursor: 'pointer'
      }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ 
        ...style, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        borderRadius: '50%',
        width: '44px',
        height: '44px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 10,
        border: '1px solid rgba(0, 0, 0, 0.1)',
        cursor: 'pointer'
      }}
      onClick={onClick}
    />
  );
};

export { SampleNextArrow, SamplePrevArrow };
