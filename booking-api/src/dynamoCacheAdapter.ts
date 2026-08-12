import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  BatchWriteCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { CacheAdapter } from "./memoryCache";

// BatchWriteItem accepts at most 25 requests per call.
const BATCH_WRITE_LIMIT = 25;

/** The subset of DynamoDBDocumentClient this adapter needs — narrowed so tests can inject a fake. */
export interface DynamoCommandClient {
  send(command: unknown): Promise<Record<string, unknown>>;
}

export interface DynamoCacheAdapterOptions {
  tableName: string;
  client?: DynamoCommandClient;
  now?: () => number;
}

/**
 * TTL cache backed by a DynamoDB table, shared across every concurrently
 * warm Lambda execution environment — unlike MemoryCache, which is scoped to
 * a single instance. This is what actually stops a traffic burst from
 * turning "1 Smoobu call per (property, month) per 5 minutes" into one call
 * per concurrently warm instance.
 *
 * DynamoDB's own TTL attribute deletes expired items on a best-effort
 * background sweep (AWS documents up to ~48h of lag), so it only bounds
 * storage growth — every read also checks `expires_at` itself and treats a
 * stale-but-not-yet-swept item as a miss.
 */
export class DynamoCacheAdapter implements CacheAdapter {
  private readonly client: DynamoCommandClient;
  private readonly tableName: string;
  private readonly now: () => number;

  constructor(options: DynamoCacheAdapterOptions) {
    this.tableName = options.tableName;
    this.client = options.client ?? DynamoDBDocumentClient.from(new DynamoDBClient({}));
    this.now = options.now ?? Date.now;
  }

  async get(key: string): Promise<string | null> {
    const result = await this.client.send(
      new GetCommand({ TableName: this.tableName, Key: { cache_key: key } })
    );

    const item = result.Item as { value?: unknown; expires_at?: unknown } | undefined;
    if (!item || typeof item.value !== "string") {
      return null;
    }

    if (typeof item.expires_at === "number" && item.expires_at * 1_000 <= this.now()) {
      return null;
    }

    return item.value;
  }

  async set(key: string, value: string, ttlSeconds: number): Promise<void> {
    const expiresAt = Math.floor(this.now() / 1_000) + ttlSeconds;

    await this.client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: { cache_key: key, value, expires_at: expiresAt },
      })
    );
  }

  async del(key: string): Promise<void> {
    await this.client.send(new DeleteCommand({ TableName: this.tableName, Key: { cache_key: key } }));
  }

  async invalidateByPrefix(prefix: string): Promise<number> {
    let invalidated = 0;
    let exclusiveStartKey: Record<string, unknown> | undefined;

    do {
      const scanResult = await this.client.send(
        new ScanCommand({
          TableName: this.tableName,
          ProjectionExpression: "cache_key",
          // An empty prefix means "clear everything" — no filter needed.
          FilterExpression: prefix ? "begins_with(cache_key, :prefix)" : undefined,
          ExpressionAttributeValues: prefix ? { ":prefix": prefix } : undefined,
          ExclusiveStartKey: exclusiveStartKey,
        })
      );

      const keys = ((scanResult.Items ?? []) as Array<{ cache_key: string }>).map((item) => item.cache_key);
      if (keys.length > 0) {
        await this.batchDelete(keys);
        invalidated += keys.length;
      }

      exclusiveStartKey = scanResult.LastEvaluatedKey as Record<string, unknown> | undefined;
    } while (exclusiveStartKey);

    return invalidated;
  }

  private async batchDelete(keys: string[]): Promise<void> {
    for (let i = 0; i < keys.length; i += BATCH_WRITE_LIMIT) {
      const chunk = keys.slice(i, i + BATCH_WRITE_LIMIT);
      await this.client.send(
        new BatchWriteCommand({
          RequestItems: {
            [this.tableName]: chunk.map((cache_key) => ({ DeleteRequest: { Key: { cache_key } } })),
          },
        })
      );
    }
  }
}
