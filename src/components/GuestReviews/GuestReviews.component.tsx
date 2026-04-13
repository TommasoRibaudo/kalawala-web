import React, { useEffect, useRef, useState } from 'react';
import { GUEST_REVIEWS, Review } from './reviewsData';
import './GuestReviews.style.scss';

interface GuestReviewsProps {
  propertyKey: string;
  isSpanish: boolean;
}

const STARS = '★★★★★';

const GuestReviews: React.FC<GuestReviewsProps> = ({ propertyKey, isSpanish }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);

  useEffect(() => {
    if (!isPanelOpen) return;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsPanelOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPanelOpen]);

  const reviews = GUEST_REVIEWS[propertyKey];
  if (!reviews || reviews.length === 0) return null;

  const heading = isSpanish ? 'Lo que dicen nuestros huéspedes' : 'What our guests are saying';
  const closeLabel = isSpanish ? 'Cerrar reseñas' : 'Close reviews';

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closePanel();
  };

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openPanel();
    }
  };

  const renderReviewMeta = (review: Review) => {
    const text = isSpanish ? review.text.es : review.text.en;
    const stayLabel = isSpanish ? translateStayType(review.stayType) : review.stayType;
    return { text, stayLabel };
  };

  return (
    <div className="guest-reviews">
      <h3 className="guest-reviews__title">{heading}</h3>

      <div className="guest-reviews__cards">
        {reviews.map((review, index) => {
          const { text, stayLabel } = renderReviewMeta(review);
          return (
            <div
              key={index}
              className="guest-reviews__card"
              role="button"
              tabIndex={0}
              onClick={openPanel}
              onKeyDown={handleCardKeyDown}
            >
              <div className="guest-reviews__quote-mark">&ldquo;</div>
              <p className="guest-reviews__preview-text">{text}</p>
              <p className="guest-reviews__reviewer-name">{review.reviewer}</p>
              {review.location && (
                <p className="guest-reviews__location">{review.location}</p>
              )}
              <div className="guest-reviews__stars">{STARS}</div>
              <p className="guest-reviews__meta">
                {review.date}&nbsp;&middot;&nbsp;{stayLabel}
              </p>
            </div>
          );
        })}
      </div>

      {isPanelOpen && (
        <div
          className="guest-reviews__overlay"
          role="dialog"
          aria-modal="true"
          aria-label={heading}
          onClick={handleOverlayClick}
        >
          <div className="guest-reviews__panel" ref={panelRef}>
            <button
              className="guest-reviews__close-btn"
              onClick={closePanel}
              aria-label={closeLabel}
            >
              &times;
            </button>

            <h3 className="guest-reviews__panel-title">{heading}</h3>

            {reviews.map((review, index) => {
              const { text, stayLabel } = renderReviewMeta(review);
              return (
                <div key={index} className="guest-reviews__full-review">
                  <div className="guest-reviews__full-quote-mark">&ldquo;</div>
                  <p className="guest-reviews__full-text">{text}</p>
                  <p className="guest-reviews__full-reviewer-name">{review.reviewer}</p>
                  {review.location && (
                    <p className="guest-reviews__full-location">{review.location}</p>
                  )}
                  <div className="guest-reviews__full-stars">{STARS}</div>
                  <p className="guest-reviews__full-meta">
                    {review.date}&nbsp;&middot;&nbsp;{stayLabel}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

function translateStayType(stayType: string): string {
  const map: Record<string, string> = {
    'Stayed a few nights': 'Estadía de algunas noches',
    'Stayed one night': 'Estadía de una noche',
    'Stayed with kids': 'Estadía con niños',
    'Stayed with a pet': 'Estadía con mascota',
    'Stayed about a week': 'Estadía de aproximadamente una semana',
  };
  return map[stayType] ?? stayType;
}

export default GuestReviews;
