import React from "react";
import "./AspectBox.style.scss";

type Props = React.PropsWithChildren<{
  ratio?: `${number}/${number}`; // e.g. "16/9"
  minHeight?: number;            // px fallback for small screens
  className?: string;
}>;

// Every ratio actually passed to AspectBox today, mapped to a static class
// rather than computed inline. Add an entry here (and the matching rule in
// AspectBox.style.scss) before passing a new ratio value.
const RATIO_CLASS: Record<string, string> = {
  "16/9": "aspect-box--16-9",
  "4/3": "aspect-box--4-3",
  "3/2": "aspect-box--3-2",
  "1/1": "aspect-box--1-1",
};

/**
 * `aspect-ratio` postdates the Chromium react-snap crawls with (puppeteer
 * 1.x, ~Chrome 79) — that engine's CSSStyleDeclaration silently drops it as
 * an unrecognised property, so an inline `style={{ aspectRatio }}` renders
 * with no aspect-ratio at all in the prerendered snapshot. React's own
 * hydration render (on any real, current browser) sets it successfully, so
 * every page using this component mismatched on hydration (#418, then #423
 * discarding the whole root — see memory:
 * hydration_mismatch_language_switcher for the sibling case in the nav).
 *
 * A `--custom-property` survives the crawl (any engine accepts the syntax
 * even if nothing reads it) but doesn't fully solve this: the *value* the
 * old engine's CSSOM serialises back out (`--aspect-ratio:4/3`) came out
 * without the space after the colon that a current browser's CSSOM adds
 * (`--aspect-ratio: 4/3`) — a still-real mismatch, just one property over.
 * Anything that has to round-trip through a live CSSOM is at the mercy of
 * that engine's own serialisation quirks, and the two engines here are
 * roughly five years apart. A static class has no such round-trip: React
 * writes the `class` attribute as literal text, identically, regardless of
 * which engine is running. Same reasoning as the fill layer below.
 *
 * The inner fill layer originally set `inset: 0` inline. Splitting that into
 * longhand `top/right/bottom/left: 0` "fixed" the crawl (that ancient engine
 * doesn't know the `inset` shorthand, so it keeps the four longhands as
 * written) but broke hydration a different way: a current browser's CSSOM
 * *re-collapses* four matching longhands back into `inset` when the style
 * attribute is serialised, so the live client's snapshot came out as
 * `inset: 0px` again. Moved to a static class for the same reason as above.
 */
export default function AspectBox({ratio="16/9", minHeight=320, className="", children}: Props) {
  const ratioClass = RATIO_CLASS[ratio] ?? RATIO_CLASS["16/9"];
  return (
    <div
      className={["aspect-box", ratioClass, className].filter(Boolean).join(" ")}
      style={{ minHeight }}
    >
      <div className="aspect-box__fill">
        {children}
      </div>
    </div>
  );
}

