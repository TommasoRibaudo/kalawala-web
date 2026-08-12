import React, { useCallback, useEffect, useState } from "react";
import './ImagesModal.style.scss';
import { getHouseImages } from "../../../../utils/houseImages";
import ZoomableImage from "./ZoomableImage.component";
import { getMessages, type Locale } from '../../../../i18n';


interface IIMagesModal {
  closeModal: () => void;
  houseName: string;
  locale: Locale;
}

const ImagesModal = ({ closeModal, houseName, locale }: IIMagesModal) => {
  const images = getHouseImages(houseName);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const isViewerOpen = viewerIndex !== null;

  const closeViewer = useCallback(() => setViewerIndex(null), []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setViewerIndex((current) => {
        if (current === null) return current;
        return (current + direction + images.length) % images.length;
      });
    },
    [images.length]
  );

  useEffect(() => {
    // Prevent the page behind the overlay from scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isViewerOpen) closeViewer();
        else closeModal();
        return;
      }
      if (!isViewerOpen) return;
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeModal, closeViewer, isViewerOpen, step]);

  const strings = getMessages(locale).imagesModal;

  return (
    <div className="imagesModal" role="dialog" aria-modal="true">
      <div className="imagesModal__bar">
        <span className="imagesModal__count">
          {images.length} {strings.photos}
        </span>
        <button
          type="button"
          className="imagesModal__close"
          aria-label={strings.close}
          onClick={closeModal}
        >
          &times;
        </button>
      </div>

      <div className="imagesModal__scroll">
        {images.length === 0 ? (
          <p className="imagesModal__empty">{strings.empty}</p>
        ) : (
          <div className="imagesModal__grid">
            {images.map((image, index) => (
              <button
                key={image.imageLink || index}
                type="button"
                className="imagesModal__thumb"
                onClick={() => setViewerIndex(index)}
              >
                <img
                  src={image.imageLink || ''}
                  alt={image.roomType || `${houseName} ${index + 1}`}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {isViewerOpen && (
        <div className="imagesModal__viewer">
          <div className="imagesModal__bar imagesModal__bar--viewer">
            <span className="imagesModal__count">
              {viewerIndex! + 1} / {images.length}
            </span>
            <button
              type="button"
              className="imagesModal__close"
              aria-label={strings.close}
              onClick={closeViewer}
            >
              &times;
            </button>
          </div>

          <ZoomableImage
            key={viewerIndex!}
            src={images[viewerIndex!].imageLink || ''}
            alt={images[viewerIndex!].roomType || `${houseName} ${viewerIndex! + 1}`}
            onSwipe={step}
            onTap={closeViewer}
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="imagesModal__nav imagesModal__nav--prev"
                aria-label={strings.previous}
                onClick={() => step(-1)}
              >
                &#8249;
              </button>
              <button
                type="button"
                className="imagesModal__nav imagesModal__nav--next"
                aria-label={strings.next}
                onClick={() => step(1)}
              >
                &#8250;
              </button>
            </>
          )}

          {images[viewerIndex!].roomType && (
            <p className="imagesModal__caption">{images[viewerIndex!].roomType}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImagesModal;
