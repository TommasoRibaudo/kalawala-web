import { useEffect, useState, type ComponentType } from 'react';
import { LOADERS, type RouteKey } from './routes.config';

/**
 * Hydration cause #3 (docs/i18n-rollout-plan.md, Phase 11 P2): React.lazy()
 * always throws a pending promise on a component's first render call,
 * unconditional and independent of whether the chunk is already cached, and
 * the <Suspense> boundary that catches that throw needs hydration markers
 * react-snap's live-DOM-capture prerender never emits — so lazy()+Suspense
 * cannot hydrate cleanly against this project's prerendered output.
 *
 * This module replaces both with a plain promise-based loader — the same
 * shape as the one manual-loader precedent already in this codebase,
 * services/PostHog.service.ts's loadPostHog() (module-level cache, promise
 * de-duplication, no throw). No React.lazy(), no <Suspense>, ever. The
 * caller (index.tsx) is responsible for resolving the current route's
 * loader BEFORE the first hydrateRoot()/createRoot().render() call, so that
 * <RouteLoader>'s cache-hit branch — the only branch safe to take on that
 * first render — is the one actually taken.
 */

/** `RouteKey` plus the one page that isn't in routes.config.ts's table: the 404/catch-all. */
export type LoadableKey = RouteKey | 'notFound';

const notFoundLoader = () => import(/* webpackChunkName: "route-404" */ './pages/NotFound.page');

function loaderFor(key: LoadableKey): () => Promise<{ default: ComponentType<any> }> {
  return key === 'notFound' ? notFoundLoader : LOADERS[key];
}

const cache = new Map<LoadableKey, ComponentType<any>>();
const pending = new Map<LoadableKey, Promise<ComponentType<any>>>();

/** Synchronous cache read — the thing that makes a same-render cache hit possible at all. */
export function getCachedRoute(key: LoadableKey): ComponentType<any> | undefined {
  return cache.get(key);
}

/**
 * Loads and caches a route's component. Idempotent: concurrent calls for the
 * same key while a load is in flight all resolve to the same promise rather
 * than starting a second import(). Rejects (doesn't swallow) on failure —
 * callers decide how to degrade; see index.tsx and <RouteLoader> below.
 */
export function preloadRoute(key: LoadableKey): Promise<ComponentType<any>> {
  const cached = cache.get(key);
  if (cached) return Promise.resolve(cached);

  const inFlight = pending.get(key);
  if (inFlight) return inFlight;

  const promise = loaderFor(key)()
    .then(({ default: Component }) => {
      cache.set(key, Component);
      pending.delete(key);
      return Component;
    })
    .catch((error) => {
      pending.delete(key);
      throw error;
    });

  pending.set(key, promise);
  return promise;
}

/**
 * Renders a route's component with no React.lazy()/<Suspense> involved.
 * Cache hit (the pre-warmed initial route, or anything visited already this
 * session) renders synchronously on the very first call — same tree shape
 * on every render, crawl and hydration alike, which is what actually avoids
 * the hydration mismatch (removing <Suspense> from the tree, not just
 * avoiding triggering it — see the plan's account of why the two prior fix
 * attempts on this bug failed). Cache miss renders null until the load
 * resolves — only reachable for an in-app navigation to a route not loaded
 * yet, i.e. pure client-side rendering with no prerendered DOM to mismatch.
 */
export function RouteLoader({ routeKey }: { routeKey: LoadableKey }) {
  const [Component, setComponent] = useState<ComponentType<any> | undefined>(() => getCachedRoute(routeKey));

  useEffect(() => {
    const cached = getCachedRoute(routeKey);
    if (cached) {
      setComponent(() => cached);
      return;
    }
    let cancelled = false;
    preloadRoute(routeKey)
      .then((Loaded) => {
        if (!cancelled) setComponent(() => Loaded);
      })
      .catch((error) => {
        if (!cancelled) console.error(`[routeLoader] failed to load "${routeKey}"`, error);
      });
    return () => {
      cancelled = true;
    };
  }, [routeKey]);

  if (!Component) return null;
  return <Component />;
}
