import type { Messages } from './en';

/**
 * Italian UI strings.
 *
 * Deliberately empty until Phase 8 supplies translations. Typed as
 * `Partial<Messages>` rather than `Messages` so an incomplete catalog is legal
 * while the language is unreleased — `getMessages()` fills every gap from
 * English, so the site renders correctly the whole way through the rollout.
 *
 * When this is complete, change the type to `Messages` and the compiler will
 * start enforcing full parity with en.ts.
 */
export const it: Partial<Messages> = {};
