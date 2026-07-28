import React, { useEffect, useRef, useState } from 'react';
import { GUEST_REVIEWS, Review } from '../GuestReviews/reviewsData';
import './HomeReviews.style.scss';

interface HomeReviewsProps {
  isSpanish: boolean;
}

interface FlatReview extends Review {
  propertyLabel: string;
  propertyLabelES: string;
}

const STARS = '★★★★★';

const PROPERTY_LABELS: Record<string, { en: string; es: string }> = {
  GECO: { en: 'House Geco', es: 'Casa Geco' },
  TUCANO: { en: 'House Tucano', es: 'Casa Tucano' },
  RANA: { en: 'House Rana', es: 'Casa Rana' },
  AREKA: { en: 'House Areka', es: 'Casa Areka' },
  PAPPAGALLO: { en: 'House Pappagallo', es: 'Casa Pappagallo' },
  'VILLA CORAL': { en: 'Villa Coral', es: 'Villa Coral' },
  PLUMERIA: { en: 'House Plumeria', es: 'Casa Plumeria' },
  GIULIA: { en: 'Casa Giulia', es: 'Casa Giulia' },
  'VILLA MAR': { en: 'Villa Mar', es: 'Villa Mar' },
  DELFINES: { en: 'House Delfines', es: 'Casa Delfines' },
};

// Round-robin interleave so consecutive cards are always from different properties
function buildInterleavedReviews(): FlatReview[] {
  const byProperty = Object.entries(GUEST_REVIEWS).map(([key, reviews]) =>
    reviews.map((r) => ({
      ...r,
      propertyLabel: PROPERTY_LABELS[key]?.en ?? key,
      propertyLabelES: PROPERTY_LABELS[key]?.es ?? key,
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

const SCROLL_SPEED_DESKTOP = 0.02; // px per ms
const SCROLL_SPEED_MOBILE  = 0.01; // px per ms

const HomeReviews: React.FC<HomeReviewsProps> = ({ isSpanish }) => {
  const [activeReview, setActiveReview] = useState<FlatReview | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const rafRef = useRef<number>();
  const lastTimeRef = useRef<number | null>(null);

  const headingMain = isSpanish ? 'Lo que dicen nuestros' : 'What our guests are';
  const headingHighlight = isSpanish ? 'huéspedes' : 'saying';
  const closeLabel = isSpanish ? 'Cerrar reseña' : 'Close review';

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
          const text = isSpanish ? review.text.es : review.text.en;
          const propertyLabel = isSpanish ? review.propertyLabelES : review.propertyLabel;
          const stayLabel = isSpanish ? translateStayType(review.stayType) : review.stayType;

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
        const text = isSpanish ? activeReview.text.es : activeReview.text.en;
        const propertyLabel = isSpanish ? activeReview.propertyLabelES : activeReview.propertyLabel;
        const stayLabel = isSpanish ? translateStayType(activeReview.stayType) : activeReview.stayType;
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
