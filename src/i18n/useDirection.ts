import { directionOf, type Direction } from './locales';
import { useLocale } from './useLocale';

/**
 * Writing direction for the current route's locale.
 *
 * Consumers are the things CSS cannot fix on its own:
 *  - the `dir` attribute on <html> (emitted through react-helmet, so react-snap
 *    bakes it into the prerendered HTML and the first paint is already correct)
 *  - the `rtl` prop on the three react-slick carousels, which reverse slide
 *    order and arrow behaviour in JS rather than in styles
 *
 * Layout itself should not read this. The stylesheets use CSS logical
 * properties, so they mirror from the `dir` attribute alone — a component
 * branching on direction to pick a margin is a sign the SCSS still has a
 * physical property in it.
 */
export function useDirection(): Direction {
  return directionOf(useLocale());
}
