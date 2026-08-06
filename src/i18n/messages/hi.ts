import type { Messages } from './en';

/**
 * Hindi UI strings.
 *
 * Deliberately empty until the translation pass. Typed as `Partial<Messages>`
 * rather than `Messages` so an incomplete catalog is legal while the language
 * is unreleased — `getMessages()` fills every gap from English, so the site
 * renders correctly throughout the rollout.
 *
 * When this is complete, change the type to `Messages` and the compiler will
 * start enforcing full parity with en.ts.
 */
export const hi: Partial<Messages> = {};
