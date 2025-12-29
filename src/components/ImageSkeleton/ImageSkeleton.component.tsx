import React from 'react';
import './ImageSkeleton.style.scss';

export interface ImageSkeletonProps {
  width?: string | number;
  height?: string | number;
  aspectRatio?: string;
  variant?: 'rectangular' | 'circular' | 'rounded';
  animation?: 'pulse' | 'wave' | 'shimmer';
  className?: string;
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  width,
  height,
  aspectRatio,
  variant = 'rectangular',
  animation = 'shimmer',
  className = '',
}) => {
  const skeletonClasses = [
    'image-skeleton',
    `image-skeleton--${variant}`,
    `image-skeleton--${animation}`,
    className
  ].filter(Boolean).join(' ');

  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || 'auto',
    aspectRatio: aspectRatio,
  };

  return (
    <div
      className={skeletonClasses}
      style={style}
      role="img"
      aria-label="Loading image..."
    />
  );
};

export default ImageSkeleton;

