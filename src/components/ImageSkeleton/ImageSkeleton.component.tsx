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

// Every ratio actually passed as `aspectRatio` today, mapped to a static
// class rather than computed inline. Add an entry here (and the matching
// rule in ImageSkeleton.style.scss) before passing a new ratio value.
const RATIO_CLASS: Record<string, string> = {
  '16/9': 'image-skeleton--ratio-16-9',
  '4/3': 'image-skeleton--ratio-4-3',
  '3/2': 'image-skeleton--ratio-3-2',
  '1/1': 'image-skeleton--ratio-1-1',
};

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  width,
  height,
  aspectRatio,
  variant = 'rectangular',
  animation = 'shimmer',
  className = '',
}) => {
  // `aspectRatio` maps to a static class rather than an inline style — see
  // AspectBox.component.tsx for why: the crawler react-snap uses is an
  // ancient Chromium that both silently drops the `aspect-ratio` property
  // and, even routed through a `--custom-property`, serialises the value
  // with different whitespace than a current browser. A static class has no
  // live-CSSOM round-trip to disagree over.
  const skeletonClasses = [
    'image-skeleton',
    `image-skeleton--${variant}`,
    `image-skeleton--${animation}`,
    aspectRatio ? RATIO_CLASS[aspectRatio] : undefined,
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
      aria-label="Loading image..."
    />
  );
};

export default ImageSkeleton;

