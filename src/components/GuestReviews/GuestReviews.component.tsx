import React, { useEffect, useRef, useState } from 'react';
import { GUEST_REVIEWS, Review } from './reviewsData';
import './GuestReviews.style.scss';
import type { Locale } from '../../i18n';
import { getMessages, pickLocalized } from '../../i18n';

interface GuestReviewsProps {
  propertyKey: string;
  locale: Locale;
}

const STARS = '★★★★★';

const GuestReviews: React.FC<GuestReviewsProps> = ({ propertyKey, locale }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);

  // Only horizontally-scrollable below 768px (see GuestReviews.style.scss).
  // Chromium redirects a vertical wheel gesture into horizontal scroll on any
  // element that can only scroll on the X axis, so without this a visitor
  // scrolling down the page gets stuck the moment the cursor crosses this
  // row. React attaches wheel listeners as passive by default, so
  // preventDefault() from an onWheel prop is silently ignored — this has to
  // be a real DOM listener registered with { passive: false }.
  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        window.scrollBy(0, e.deltaY);
      }
    };
    cards.addEventListener('wheel', onWheel, { passive: false });
    return () => cards.removeEventListener('wheel', onWheel);
  }, []);

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

  const m = getMessages(locale);
  const heading = m.reviews.heading;
  const closeLabel = m.reviews.closeReviews;

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
    const text = pickLocalized(review.text, locale);
    const stayLabel = m.reviewTags[review.stayType as keyof typeof m.reviewTags] ?? review.stayType;
    return { text, stayLabel };
  };

  return (
    <div className="guest-reviews">
      <h2 className="guest-reviews__title">{heading}</h2>

      <div className="guest-reviews__cards" ref={cardsRef}>
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
              {/* Always rendered — reviews without a location keep the line's
                  height so the cards stay aligned with one another. */}
              <p className="guest-reviews__location">{review.location}</p>
              <div className="guest-reviews__stars">{STARS}</div>
              {/* One interpolation, deliberately. Adjacent JSX text children
                  become separate text nodes, and react-snap saves the live DOM
                  rather than renderToString output — so the snapshot has no
                  `<!-- -->` separators to split them back apart and hydration
                  finds one text node where React renders three (error #418). */}
              <p className="guest-reviews__meta">
                {`${review.date} · ${stayLabel}`}
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

export default GuestReviews;
