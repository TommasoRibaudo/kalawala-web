import React, { useState, useRef } from 'react';
import { Image } from 'react-bootstrap';
import ImageSkeleton, { ImageSkeletonProps } from '../ImageSkeleton/ImageSkeleton.component';
import { cdnSrcSet } from '../../utils/imageCdn';
import './ImageWithSkeleton.style.scss';

export interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  fluid?: boolean;
  loading?: 'lazy' | 'eager';
  /** Maps to the `sizes` attribute. Only meaningful alongside a srcset. */
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  skeletonProps?: ImageSkeletonProps;
  showSkeleton?: boolean;
  debugMode?: boolean; // For testing - forces skeleton to show longer
  // Additional props for React Bootstrap Image
  [key: string]: any;
}

/**
 * Image with a shimmer placeholder.
 *
 * Two behaviours were removed here because they actively slowed the page:
 *
 * 1. An artificial `minDisplayTime` of 500 ms held every successfully loaded
 *    image behind the skeleton so the shimmer "looked deliberate". That is half
 *    a second added to the paint of every gallery image, and on a listing page
 *    the hero image is the LCP element.
 *
 * 2. The component ran its own IntersectionObserver AND set native
 *    `loading="lazy"`. The observer did not even mount the <img> until it
 *    intersected, so the browser's own lazy-loading — which starts fetching
 *    with a generous margin before an image scrolls into view — never got the
 *    chance to work ahead. Native lazy-loading alone is both simpler and
 *    earlier.
 *
 * The skeleton still shows while the image is in flight; it just no longer
 * outstays the image.
 */
const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  className = '',
  fluid = false,
  loading = 'lazy',
  sizes,
  onLoad,
  onError,
  skeletonProps = {},
  showSkeleton = true,
  debugMode = false,
  ...imageProps
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const imageClasses = [
    'image-with-skeleton',
    className,
    imageLoaded && 'image-loaded'
  ].filter(Boolean).join(' ');

  const defaultSkeletonProps: ImageSkeletonProps = {
    variant: 'rectangular',
    animation: 'shimmer',
    ...skeletonProps
  };

  // Drive honours an arbitrary `sz=wNNN`, so a real srcset is available even
  // with no image CDN configured. Callers can still override via imageProps.
  const srcSet = imageProps.srcSet ?? cdnSrcSet(src);

  return (
    <div ref={containerRef} className={imageClasses}>
      {showSkeleton && isLoading && (
        <ImageSkeleton {...defaultSkeletonProps} />
      )}

      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fluid={fluid}
        loading={loading}
        decoding="async"
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`skeleton-image ${!imageLoaded ? 'skeleton-image--loading' : 'skeleton-image--loaded'}`}
        {...imageProps}
        srcSet={srcSet || undefined}
        sizes={srcSet ? (sizes ?? '100vw') : undefined}
      />

      {hasError && (
        <div className="image-error">
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default ImageWithSkeleton;
