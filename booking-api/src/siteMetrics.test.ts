import { classifyDeviceCategory, classifyReferrerCategory, normalizePagePath, recordPageview } from "./siteMetrics";

const ALLOWED_ORIGINS = ["https://www.kalawala.com", "https://kalawala.com"];

describe("normalizePagePath", () => {
  test("strips query string and hash", () => {
    expect(normalizePagePath("/Geco?arrival=2026-05-01#calendar")).toBe("/Geco");
  });

  test("adds a leading slash when missing", () => {
    expect(normalizePagePath("GecoES")).toBe("/GecoES");
  });

  test("collapses a trailing slash", () => {
    expect(normalizePagePath("/Geco/")).toBe("/Geco");
  });

  test("keeps the root path as-is", () => {
    expect(normalizePagePath("/")).toBe("/");
  });

  test("falls back to /other for an empty path", () => {
    expect(normalizePagePath("")).toBe("/other");
  });

  test("falls back to /other for a path containing unsafe characters", () => {
    expect(normalizePagePath("/<script>alert(1)</script>")).toBe("/other");
  });

  test("bounds an excessively long path", () => {
    const long = "/" + "a".repeat(500);
    expect(normalizePagePath(long).length).toBeLessThanOrEqual(200);
  });
});

describe("classifyDeviceCategory", () => {
  test("classifies an iPhone user agent as mobile", () => {
    const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15";
    expect(classifyDeviceCategory(ua)).toBe("mobile");
  });

  test("classifies an iPad user agent as tablet", () => {
    const ua = "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15";
    expect(classifyDeviceCategory(ua)).toBe("tablet");
  });

  test("classifies an Android phone user agent as mobile", () => {
    const ua = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Mobile";
    expect(classifyDeviceCategory(ua)).toBe("mobile");
  });

  test("classifies a desktop Chrome user agent as desktop", () => {
    const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36";
    expect(classifyDeviceCategory(ua)).toBe("desktop");
  });

  test("classifies a missing user agent as other", () => {
    expect(classifyDeviceCategory(undefined)).toBe("other");
  });
});

describe("classifyReferrerCategory", () => {
  test("classifies a missing referrer as direct", () => {
    expect(classifyReferrerCategory(undefined, ALLOWED_ORIGINS)).toBe("direct");
  });

  test("classifies the site's own origin as internal", () => {
    expect(classifyReferrerCategory("https://www.kalawala.com/Geco", ALLOWED_ORIGINS)).toBe("internal");
  });

  test("classifies a search engine referrer as search", () => {
    expect(classifyReferrerCategory("https://www.google.com/search?q=puerto+viejo", ALLOWED_ORIGINS)).toBe("search");
  });

  test("classifies a social referrer as social", () => {
    expect(classifyReferrerCategory("https://www.instagram.com/", ALLOWED_ORIGINS)).toBe("social");
  });

  test("classifies an unrecognised referrer as other", () => {
    expect(classifyReferrerCategory("https://some-blog.example/post", ALLOWED_ORIGINS)).toBe("other");
  });

  test("classifies a malformed referrer as other", () => {
    expect(classifyReferrerCategory("not-a-url", ALLOWED_ORIGINS)).toBe("other");
  });
});

describe("recordPageview", () => {
  test("upserts the counter for the given bucket", async () => {
    const query = jest.fn(async (_sql: string, _values?: unknown[]) => ({ rows: [] as Record<string, unknown>[] }));

    const pool = { query } as unknown as Parameters<typeof recordPageview>[0];

    await recordPageview(pool, {
      day: "2026-05-01",
      path: "/Geco",
      language: "en",
      deviceCategory: "desktop",
      referrerCategory: "direct",
    });

    expect(query).toHaveBeenCalledTimes(1);
    const [sql, values] = query.mock.calls[0];
    expect(sql).toMatch(/insert into site_pageview_counts/i);
    expect(sql).toMatch(/on conflict/i);
    expect(values).toEqual(["2026-05-01", "/Geco", "en", "desktop", "direct"]);
  });
});
