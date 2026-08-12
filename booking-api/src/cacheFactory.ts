/**
 * Cache adapter factory for the Kalawala booking API.
 *
 * Reads the CACHE_BACKEND environment variable to determine which backend to
 * use. `dynamodb` is the real shared-cache backend — a DynamoDB table visible
 * to every concurrently warm Lambda execution environment, not just the one
 * handling the current request (see dynamoCacheAdapter.ts). `redis` predates
 * that and is a stub that logs a warning and falls back to memory; it is kept
 * only so an old CACHE_BACKEND=redis env var doesn't hard-fail. `memory`
 * (the default) is a single execution environment's in-Lambda cache only.
 *
 * The module-level singletons survive Lambda warm starts, so cached entries
 * (and, for `dynamodb`, the underlying client connection) are reused across
 * invocations of the same execution environment (Requirement 4.5).
 */

import { CacheAdapter, MemoryCache, createMemoryCache } from "./memoryCache";
import { DynamoCacheAdapter } from "./dynamoCacheAdapter";

// ---------------------------------------------------------------------------
// TTL scopes (seconds)
// ---------------------------------------------------------------------------

/**
 * Default TTL values (in seconds) for each cache scope.
 *
 * - `availability`   : 30 s  — short-lived so guests see near-real-time
 *                              availability without hammering Smoobu.
 * - `calendar-rates` : 300 s — rate data changes infrequently; 5-minute
 *                              staleness is acceptable and reduces API calls.
 */
export const TTL_SCOPES: Record<string, number> = {
  availability: 30,
  "calendar-rates": 300,
};

// ---------------------------------------------------------------------------
// Backend detection
// ---------------------------------------------------------------------------

/**
 * Reads `process.env.CACHE_BACKEND` and returns the resolved backend name.
 * Defaults to `'memory'` when the variable is absent or set to an
 * unrecognised value.
 */
export function getCacheBackend(): "redis" | "memory" | "dynamodb" {
  const raw = process.env.CACHE_BACKEND;
  if (raw === "redis") {
    return "redis";
  }
  if (raw === "dynamodb") {
    return "dynamodb";
  }
  return "memory";
}

// ---------------------------------------------------------------------------
// Redis adapter (stub — wired to actual client in a future task)
// ---------------------------------------------------------------------------

/**
 * Optional configuration passed to the Redis adapter.
 * Values are read from environment variables when not supplied explicitly.
 */
export interface RedisConfig {
  host?: string;
  port?: number;
  secretName?: string;
}

/**
 * Minimal Redis adapter that implements `CacheAdapter`.
 *
 * TODO: Wire this to an actual Redis client (ioredis or @redis/client) once
 *       the ElastiCache cluster is available.  The current implementation
 *       logs a warning and falls back to an in-memory store so that the
 *       application remains functional even when Redis is unreachable.
 */
class RedisAdapter implements CacheAdapter {
  private readonly fallback: MemoryCache;
  private readonly config: Required<RedisConfig>;
  private warnedOnce = false;

  constructor(config: RedisConfig = {}) {
    this.config = {
      host: config.host ?? process.env.REDIS_HOST ?? "",
      port: config.port ?? Number(process.env.REDIS_PORT ?? 6379),
      secretName: config.secretName ?? process.env.REDIS_SECRET_NAME ?? "",
    };

    this.fallback = createMemoryCache();

    if (!this.config.host) {
      this.warn(
        "REDIS_HOST is not configured — falling back to in-memory cache. " +
          "Set REDIS_HOST (and optionally REDIS_PORT / REDIS_SECRET_NAME) to " +
          "enable the Redis backend."
      );
    }
  }

  private warn(message: string): void {
    if (!this.warnedOnce) {
      console.warn(`[RedisAdapter] ${message}`);
      this.warnedOnce = true;
    }
  }

  async get(key: string): Promise<string | null> {
    // TODO: replace with actual Redis GET once client is wired
    this.warn("Redis client not yet implemented — using in-memory fallback.");
    return this.fallback.get(key);
  }

  async set(key: string, value: string, ttlSeconds: number): Promise<void> {
    // TODO: replace with actual Redis SET EX once client is wired
    this.warn("Redis client not yet implemented — using in-memory fallback.");
    return this.fallback.set(key, value, ttlSeconds);
  }

  async del(key: string): Promise<void> {
    // TODO: replace with actual Redis DEL once client is wired
    return this.fallback.del(key);
  }

  async invalidateByPrefix(prefix: string): Promise<number> {
    // TODO: replace with actual Redis SCAN + DEL once client is wired
    return this.fallback.invalidateByPrefix(prefix);
  }
}

// ---------------------------------------------------------------------------
// Module-level singleton for the memory backend
// ---------------------------------------------------------------------------

/**
 * Singleton MemoryCache instance.
 *
 * Declared at module level so it persists across Lambda invocations within
 * the same execution environment (warm starts).  A cold start always begins
 * with `null` and creates a fresh cache on the first call to
 * `createCacheAdapter('memory')`.
 */
let memoryCacheSingleton: MemoryCache | null = null;

/**
 * Singleton DynamoCacheAdapter instance (and thus its underlying DynamoDB
 * client) — same warm-start-persistence reasoning as memoryCacheSingleton.
 */
let dynamoCacheSingleton: DynamoCacheAdapter | null = null;
let warnedDynamoMisconfigured = false;

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

/**
 * Returns a `CacheAdapter` for the requested backend.
 *
 * @param backend     - `'memory'` for the in-Lambda LRU cache, `'dynamodb'`
 *                      for the shared DynamoDB-backed cache, or `'redis'` for
 *                      the (stubbed, falls back to memory) Redis adapter.
 * @param redisConfig - Optional Redis connection overrides (host, port,
 *                      secretName).  Ignored except when `backend = 'redis'`.
 *
 * @example
 * ```ts
 * // Typical usage — let the factory read CACHE_BACKEND from the environment:
 * const cache = createCacheAdapter(getCacheBackend());
 *
 * // Explicit backend selection:
 * const cache = createCacheAdapter('dynamodb');
 * ```
 */
export function createCacheAdapter(
  backend: "redis" | "memory" | "dynamodb",
  redisConfig?: RedisConfig
): CacheAdapter {
  if (backend === "memory") {
    if (!memoryCacheSingleton) {
      memoryCacheSingleton = createMemoryCache();
    }
    return memoryCacheSingleton;
  }

  if (backend === "dynamodb") {
    const tableName = process.env.CACHE_TABLE_NAME;
    if (!tableName) {
      if (!warnedDynamoMisconfigured) {
        console.warn(
          "[DynamoCacheAdapter] CACHE_TABLE_NAME is not configured — falling back to in-memory cache."
        );
        warnedDynamoMisconfigured = true;
      }
      if (!memoryCacheSingleton) {
        memoryCacheSingleton = createMemoryCache();
      }
      return memoryCacheSingleton;
    }

    if (!dynamoCacheSingleton) {
      dynamoCacheSingleton = new DynamoCacheAdapter({ tableName });
    }
    return dynamoCacheSingleton;
  }

  // Redis backend — a new adapter instance per call is fine because the
  // actual connection pooling will be managed by the Redis client library.
  return new RedisAdapter(redisConfig);
}
