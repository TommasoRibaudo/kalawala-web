import { DynamoCacheAdapter, DynamoCommandClient } from "./dynamoCacheAdapter";

/**
 * A minimal fake standing in for DynamoDBDocumentClient. Records every
 * command's constructor name + input so assertions can check what was sent
 * without depending on the AWS SDK's internal command shapes, and drives
 * responses from an in-memory table so get/set/del/scan behave like the
 * real thing.
 */
function makeFakeClient() {
  const table = new Map<string, { value: string; expires_at: number }>();
  const calls: Array<{ name: string; input: Record<string, unknown> }> = [];

  const client: DynamoCommandClient = {
    async send(command: unknown) {
      const { constructor, input } = command as {
        constructor: { name: string };
        input: Record<string, unknown>;
      };
      calls.push({ name: constructor.name, input });

      switch (constructor.name) {
        case "GetCommand": {
          const key = (input.Key as { cache_key: string }).cache_key;
          const item = table.get(key);
          return { Item: item ? { cache_key: key, ...item } : undefined };
        }
        case "PutCommand": {
          const item = input.Item as { cache_key: string; value: string; expires_at: number };
          table.set(item.cache_key, { value: item.value, expires_at: item.expires_at });
          return {};
        }
        case "DeleteCommand": {
          const key = (input.Key as { cache_key: string }).cache_key;
          table.delete(key);
          return {};
        }
        case "ScanCommand": {
          const prefix = (input.ExpressionAttributeValues as { ":prefix"?: string } | undefined)?.[
            ":prefix"
          ];
          const items = Array.from(table.keys())
            .filter((key) => !prefix || key.startsWith(prefix))
            .map((cache_key) => ({ cache_key }));
          return { Items: items };
        }
        case "BatchWriteCommand": {
          const requestItems = input.RequestItems as Record<
            string,
            Array<{ DeleteRequest: { Key: { cache_key: string } } }>
          >;
          for (const requests of Object.values(requestItems)) {
            for (const request of requests) {
              table.delete(request.DeleteRequest.Key.cache_key);
            }
          }
          return {};
        }
        default:
          throw new Error(`Unhandled command in fake DynamoDB client: ${constructor.name}`);
      }
    },
  };

  return { client, table, calls };
}

function makeAdapter(startMs = 1_700_000_000_000) {
  const { client, table, calls } = makeFakeClient();
  let now = startMs;
  const adapter = new DynamoCacheAdapter({
    tableName: "kalawala-test-booking-cache",
    client,
    now: () => now,
  });
  return { adapter, table, calls, advance: (ms: number) => { now += ms; } };
}

describe("DynamoCacheAdapter — get on non-existent key", () => {
  it("returns null for a key that was never set", async () => {
    const { adapter } = makeAdapter();
    expect(await adapter.get("missing-key")).toBeNull();
  });
});

describe("DynamoCacheAdapter — set then get", () => {
  it("returns the stored value immediately after set", async () => {
    const { adapter } = makeAdapter();
    await adapter.set("301061:2026-06", '{"month":"2026-06"}', 300);
    expect(await adapter.get("301061:2026-06")).toBe('{"month":"2026-06"}');
  });

  it("is visible to a second adapter instance sharing the same table — the whole point of a shared cache", async () => {
    const { client } = makeFakeClient();
    let now = 0;
    const writer = new DynamoCacheAdapter({ tableName: "t", client, now: () => now });
    const reader = new DynamoCacheAdapter({ tableName: "t", client, now: () => now });

    await writer.set("shared-key", "shared-value", 60);
    expect(await reader.get("shared-key")).toBe("shared-value");
  });
});

describe("DynamoCacheAdapter — TTL expiry", () => {
  it("returns the value before the TTL elapses", async () => {
    const { adapter, advance } = makeAdapter();
    await adapter.set("key", "value", 300);
    advance(299_000);
    expect(await adapter.get("key")).toBe("value");
  });

  it("returns null once the TTL elapses, even though DynamoDB's own TTL sweep hasn't deleted the item yet", async () => {
    const { adapter, table, advance } = makeAdapter();
    await adapter.set("key", "value", 300);
    advance(300_001);

    expect(await adapter.get("key")).toBeNull();
    // The item is still physically in the table — expiry is enforced by the
    // read path, not by waiting on DynamoDB's background TTL sweep.
    expect(table.has("key")).toBe(true);
  });
});

describe("DynamoCacheAdapter — del", () => {
  it("removes a previously set key", async () => {
    const { adapter } = makeAdapter();
    await adapter.set("key", "value", 60);
    await adapter.del("key");
    expect(await adapter.get("key")).toBeNull();
  });

  it("is a no-op for a key that was never set", async () => {
    const { adapter } = makeAdapter();
    await expect(adapter.del("never-set")).resolves.toBeUndefined();
  });
});

describe("DynamoCacheAdapter — invalidateByPrefix", () => {
  it("deletes only keys matching the prefix and reports the count", async () => {
    const { adapter } = makeAdapter();
    await adapter.set("301061:2026-06", "june", 300);
    await adapter.set("301061:2026-07", "july", 300);
    await adapter.set("301064:2026-06", "other-apartment", 300);

    const count = await adapter.invalidateByPrefix("301061:");

    expect(count).toBe(2);
    expect(await adapter.get("301061:2026-06")).toBeNull();
    expect(await adapter.get("301061:2026-07")).toBeNull();
    expect(await adapter.get("301064:2026-06")).toBe("other-apartment");
  });

  it("clears every entry when the prefix is empty", async () => {
    const { adapter } = makeAdapter();
    await adapter.set("a", "1", 60);
    await adapter.set("b", "2", 60);

    const count = await adapter.invalidateByPrefix("");

    expect(count).toBe(2);
    expect(await adapter.get("a")).toBeNull();
    expect(await adapter.get("b")).toBeNull();
  });

  it("returns 0 when nothing matches", async () => {
    const { adapter } = makeAdapter();
    await adapter.set("301061:2026-06", "june", 300);

    expect(await adapter.invalidateByPrefix("no-such-prefix:")).toBe(0);
  });

  it("batches deletes past the 25-item BatchWriteItem limit", async () => {
    const { adapter, calls } = makeAdapter();
    for (let i = 0; i < 30; i += 1) {
      await adapter.set(`bulk:${i}`, String(i), 300);
    }

    const count = await adapter.invalidateByPrefix("bulk:");

    expect(count).toBe(30);
    const batchWrites = calls.filter((call) => call.name === "BatchWriteCommand");
    expect(batchWrites).toHaveLength(2);
  });
});
