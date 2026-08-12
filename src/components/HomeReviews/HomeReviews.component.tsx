import React, { useEffect, useRef, useState } from 'react';
import { GUEST_REVIEWS, Review } from '../GuestReviews/reviewsData';
import './HomeReviews.style.scss';
import type { Locale } from '../../i18n';
import { getMessages, pickLocalized } from '../../i18n';
import { listingContent, type ListingKey } from '../../i18n/content/listings';

interface HomeReviewsProps {
  locale: Locale;
}

interface FlatReview extends Review {
  // The listings.ts key for this property, resolved to a translated display
  // name (featureName, e.g. "Haus Geco") at render time via listingContent —
  // reuses the names Phase 8 already translated into all 8 locales instead
  // of maintaining a second, separate translation of the same property names.
  propertyKey: ListingKey;
}

const STARS = '★★★★★';

const PROPERTY_KEY_MAP: Record<string, ListingKey> = {
  GECO: 'Geco',
  TUCANO: 'Tucano',
  RANA: 'Rana',
  AREKA: 'Areka',
  PAPPAGALLO: 'Pappagallo',
  'VILLA CORAL': 'VillaCoral',
  PLUMERIA: 'Plumeria',
  GIULIA: 'Giulia',
  'VILLA MAR': 'VillaMar',
  DELFINES: 'Delfin',
};

// Round-robin interleave so consecutive cards are always from different properties
function buildInterleavedReviews(): FlatReview[] {
  const byProperty = Object.entries(GUEST_REVIEWS).map(([key, reviews]) =>
    reviews.map((r) => ({
      ...r,
      propertyKey: PROPERTY_KEY_MAP[key] ?? 'Geco',
    }))
  );
  const result: FlatReview[] = [];
  const maxLen = Math.max(...byProperty.map((p) => p.length));
  for (let i = 0; i < maxLen; i++) {
    for (const propertyReviews of byProperty) {
      if (i < propertyReviews.length) result.push(propertyReviews[i]);
    }
  }
  return result;
}

const INTERLEAVED = buildInterleavedReviews();
// Duplicate for seamless infinite loop
const DOUBLED = [...INTERLEAVED, ...INTERLEAVED];

const SCROLL_SPEED_DESKTOP = 0.02; // px per ms
const SCROLL_SPEED_MOBILE  = 0.01; // px per ms

const HomeReviews: React.FC<HomeReviewsProps> = ({ locale }) => {
  const [activeReview, setActiveReview] = useState<FlatReview | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>();
  const lastTimeRef = useRef<number | null>(null);

  const m = getMessages(locale);
  const headingMain = m.reviews.headingMain;
  const headingHighlight = m.reviews.headingHighlight;
  const closeLabel = m.reviews.closeReview;

  // Auto-scroll via rAF
  useEffect(() => {
    const step = (timestamp: number) => {
      const track = trackRef.current;
      if (track && !pausedRef.current && !activeReview) {
        if (lastTimeRef.current !== null) {
          const delta = timestamp - lastTimeRef.current;
          const speed = window.innerWidth <= 768 ? SCROLL_SPEED_MOBILE : SCROLL_SPEED_DESKTOP;
          track.scrollLeft += speed * delta;

          // Seamless loop: when past halfway, jump back silently
          const half = track.scrollWidth / 2;
          if (track.scrollLeft >= half) {
            track.scrollLeft -= half;
          }
        }
        lastTimeRef.current = timestamp;
      } else {
        lastTimeRef.current = null;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [activeReview]);

  // No wheel handler on purpose. The old one called preventDefault() +
  // window.scrollBy() on every wheel event so a vertical gesture over the
  // track scrolled the page — but that replaces the compositor's native
  // trackpad momentum with discrete main-thread jumps that fight the rAF
  // auto-scroll loop above, which is exactly what made scrolling feel like it
  // slowed to a crawl over this section. Instead the track is `overflow-x:
  // hidden` on desktop (see HomeReviews.style.scss), so it is not a wheel
  // scroll target at all: vertical wheel passes straight through to the page
  // with full native momentum, while the marquee still animates via scrollLeft.
  // Mobile keeps `overflow-x: auto` for native touch swipe (touch emits no
  // wheel events, so there is nothing to hijack there).

  // Panel: lock body scroll + ESC to close
  useEffect(() => {
    if (!activeReview) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActiveReview(null); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', onKey);
    };
  }, [activeReview]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setActiveReview(null);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, review: FlatReview) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveReview(review); }
  };

  return (
    <section className="home-reviews">
      <div className="container">
        <div className="title text-center">
          <h2 className="home-reviews__title">
            {headingMain} <span className="color">{headingHighlight}</span>
          </h2>
        </div>
      </div>

      <div
        ref={trackRef}
        className="home-reviews__track"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onTouchStart={() => { pausedRef.current = true; }}
        onTouchEnd={() => { pausedRef.current = false; }}
      >
        {DOUBLED.map((review, index) => {
          const text = pickLocalized(review.text, locale);
          const propertyLabel = listingContent(review.propertyKey, locale).featureName;
          const stayLabel = m.reviewTags[review.stayType as keyof typeof m.reviewTags] ?? review.stayType;

          return (
            <div
              key={index}
              className="home-reviews__card"
              role="button"
              tabIndex={0}
              onClick={() => setActiveReview(review)}
              onKeyDown={(e) => handleCardKeyDown(e, review)}
            >
              <div className="home-reviews__quote-mark">&ldquo;</div>
              <p className="home-reviews__preview-text">{text}</p>
              <p className="home-reviews__reviewer-name">{review.reviewer}</p>
              {/* Always rendered — reviews without a location keep the line's
                  height so the cards stay aligned with one another. */}
              <p className="home-reviews__location">{review.location}</p>
              <div className="home-reviews__stars">{STARS}</div>
              {/* One interpolation, deliberately — see GuestReviews for why:
                  adjacent JSX text children hydrate as separate text nodes but
                  react-snap saves them merged, which is React error #418. */}
              <p className="home-reviews__meta">{`${review.date} · ${stayLabel}`}</p>
              <p className="home-reviews__property">{propertyLabel}</p>
            </div>
          );
        })}
      </div>

      {activeReview && (() => {
        const text = pickLocalized(activeReview.text, locale);
        const propertyLabel = listingContent(activeReview.propertyKey, locale).featureName;
        const stayLabel = m.reviewTags[activeReview.stayType as keyof typeof m.reviewTags] ?? activeReview.stayType;
        return (
          <div
            className="home-reviews__overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`${headingMain} ${headingHighlight}`}
            onClick={handleOverlayClick}
          >
            <div className="home-reviews__panel">
              <button
                className="home-reviews__close-btn"
                onClick={() => setActiveReview(null)}
                aria-label={closeLabel}
              >
                &times;
              </button>
              <div className="home-reviews__full-quote-mark">&ldquo;</div>
              <p className="home-reviews__full-text">{text}</p>
              <p className="home-reviews__full-reviewer-name">{activeReview.reviewer}</p>
              {activeReview.location && <p className="home-reviews__full-location">{activeReview.location}</p>}
              <div className="home-reviews__full-stars">{STARS}</div>
              <p className="home-reviews__full-meta">{activeReview.date}&nbsp;&middot;&nbsp;{stayLabel}</p>
              <p className="home-reviews__full-property">{propertyLabel}</p>
            </div>
          </div>
        );
      })()}
    </section>
  );
};

export default HomeReviews;
