import React from 'react';
import './WelcomeSlider.style.scss';
import BookingSearchWidget from '../BookingSearchWidget/BookingSearchWidget.component';
import { cdnImage, cdnSrcSet } from '../../utils/imageCdn';

export const HERO_BANNER =
  'https://lh3.googleusercontent.com/d/1c25flui45r6oVIvPMqKLemVsWgjbhsAH=w1000';

/**
 * Homepage hero — the LCP element on `/` and `/HomeES`.
 *
 * Two problems were fixed here, both measured rather than guessed:
 *
 * 1. It used to hold an `isMobile` state initialised to `false` and corrected
 *    in a `useEffect`, driving inline font sizes, padding, min-height and
 *    display mode. On a phone the desktop layout therefore rendered first and
 *    reflowed a frame later: CLS 0.42 on both home pages, all of it on the LCP
 *    element. It also disagreed with the react-snap output, which is React
 *    error #418 (hydration mismatch) — logged six times per load and failing
 *    the `errors-in-console` Best-Practices audit. All of it is now plain CSS
 *    media queries, so the pre-rendered markup, the mobile render and the
 *    desktop render are the same DOM.
 *
 * 2. The image was a CSS `background-image` set from an inline style. The
 *    preload scanner cannot see those, so discovery waited on the CSS bundle.
 *    It is now a real <img> with srcset/sizes and fetchpriority="high", which
 *    the scanner picks up in the first HTML chunk.
 *
 * alt="" is deliberate: the photo is decorative backdrop, and the <h1> over it
 * already carries the meaning. Giving it descriptive alt text would make
 * screen readers announce scenery before the page's actual heading.
 */
const WelcomeSlider = () => {
  return (
    <section className="hero-area overlay">
      <img
        className="hero-area__bg"
        src={cdnImage(HERO_BANNER, 1280)}
        srcSet={cdnSrcSet(HERO_BANNER)}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
      />

      <div className="block">
        <h1>RESERVAS KALAWALA</h1>
        <p id="short-description">
          Fully equipped vacation homes in the heart of Puerto Viejo and Playa Chiquita.
        </p>
        <br />

        <div className="hero-booking">
          <BookingSearchWidget locale="en" variant="hero" />
          <p className="hero-trust">✓ Instant confirmation · ✓ Secure booking · ✓ No platform fees</p>
        </div>
      </div>

      {/* ⭐ pinned to the bottom of the SECTION, behind the search widget/calendar */}
      <div className="hero-rating">
        <p>⭐⭐⭐⭐⭐ 4.9/5 from thousands of stays since 2015</p>
      </div>
    </section>
  );
};

export default WelcomeSlider;
