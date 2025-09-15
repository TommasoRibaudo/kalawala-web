import React, { useState, useRef, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import ImageSkeleton, { ImageSkeletonProps } from '../ImageSkeleton/ImageSkeleton.component';
import './ImageWithSkeleton.style.scss';

export interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  fluid?: boolean;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  skeletonProps?: ImageSkeletonProps;
  showSkeleton?: boolean;
  debugMode?: boolean; // For testing - forces skeleton to show longer
  // Additional props for React Bootstrap Image
  [key: string]: any;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  src,
  alt,
  className = '',
  fluid = false,
  loading = 'lazy',
  onLoad,
  onError,
  skeletonProps = {},
  showSkeleton = true,
  debugMode = false,
  ...imageProps
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [skeletonStartTime] = useState(Date.now());
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading === 'lazy' && containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(containerRef.current);

      return () => observer.disconnect();
    } else {
      setIsVisible(true);
    }
  }, [loading]);

  const handleImageLoad = () => {
    // Ensure skeleton is visible for at least 500ms for better UX (or 2s in debug mode)
    const elapsedTime = Date.now() - skeletonStartTime;
    const minDisplayTime = debugMode ? 2000 : 500;
    const delay = Math.max(0, minDisplayTime - elapsedTime);
    
    setTimeout(() => {
      setImageLoaded(true);
      setIsLoading(false);
      setHasError(false);
      onLoad?.();
    }, delay);
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

  return (
    <div ref={containerRef} className={imageClasses}>
      {showSkeleton && isLoading && (
        <ImageSkeleton {...defaultSkeletonProps} />
      )}
      
      {isVisible && (
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          fluid={fluid}
          loading={loading}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`skeleton-image ${!imageLoaded ? 'skeleton-image--loading' : 'skeleton-image--loaded'}`}
          {...imageProps}
        />
      )}
      
      {hasError && (
        <div className="image-error">
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default ImageWithSkeleton;
