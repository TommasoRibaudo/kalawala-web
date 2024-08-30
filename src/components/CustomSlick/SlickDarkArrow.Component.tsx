import React from 'react';
import { CustomArrowProps } from 'react-slick';

const SampleNextArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: '#294F44' }}
      onClick={onClick}
    />
  );
};

const SamplePrevArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: '#294F44' }}
      onClick={onClick}
    />
  );
};

export { SampleNextArrow, SamplePrevArrow };
