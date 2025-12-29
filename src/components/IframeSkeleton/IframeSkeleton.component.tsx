import React from 'react';
import './IframeSkeleton.style.scss';

export interface IframeSkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'booking-widget' | 'calendar' | 'form';
  responsive?: boolean;
  animation?: 'pulse' | 'shimmer' | 'wave';
  className?: string;
}

const IframeSkeleton: React.FC<IframeSkeletonProps> = ({
  width,
  height,
  variant = 'booking-widget',
  responsive = true,
  animation = 'shimmer',
  className = '',
}) => {
  const skeletonClasses = [
    'iframe-skeleton',
    `iframe-skeleton--${variant}`,
    `iframe-skeleton--${animation}`,
    responsive && 'iframe-skeleton--responsive',
    className
  ].filter(Boolean).join(' ');

  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || 'auto',
  };

  return (
    <div
      className={skeletonClasses}
      style={style}
      role="img"
      aria-label="Loading booking widget..."
    />
  );
};

export default IframeSkeleton;

