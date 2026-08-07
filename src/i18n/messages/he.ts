import type { Messages } from './en';

/**
 * Hebrew UI strings.
 *
 * Deliberately empty until the translation pass. Typed as `Partial<Messages>`
 * rather than `Messages` so an incomplete catalog is legal while the language
 * is unreleased — `getMessages()` fills every gap from English, so the site
 * renders correctly throughout the rollout.
 *
 * When this is complete, change the type to `Messages` and the compiler will
 * start enforcing full parity with en.ts.
 *
 * Hebrew is right-to-left. Directional glyphs belong here rather than in CSS:
 * the `→` in the card CTA strings should be `←` in this catalog, because it is
 * a text character, not an icon a stylesheet can mirror.
 */
export const he: Partial<Messages> = {};
