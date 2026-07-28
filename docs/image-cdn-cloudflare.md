# Image CDN via Cloudflare Transformations

## Why this is the cheap option

`reservaskalawala.com` is **already** a Cloudflare zone and already proxied:

```
$ nslookup -type=NS reservaskalawala.com
  jo.ns.cloudflare.com
  curt.ns.cloudflare.com

$ curl -sSI https://www.reservaskalawala.com/
  server: cloudflare
  cf-ray: a22117be79b2d965-MIA
```

So there is no account to create, no nameserver change, and no asset upload.
Image Transformations is a per-zone toggle. It is **not** enabled today — the
transformation path 404s:

```
$ curl -sS https://www.reservaskalawala.com/cdn-cgi/image/width=32/https://www.reservaskalawala.com/logo64.png
  <html><head><title>404 Not Found</title></head>...<hr><center>cloudflare</center>
```

## Cost

Free plan includes **5,000 unique transformations per month**. A "unique
transformation" is one distinct (source image + options) pair, counted once per
month; repeat deliveries from cache are free.

This site has ~300 distinct images and `DEFAULT_WIDTHS` has 5 breakpoints, so
steady-state usage is roughly **1,500/month**. That fits, but the headroom is
about 3x rather than 30x — if it ever gets close, drop a breakpoint from
`DEFAULT_WIDTHS` in `src/utils/imageCdn.ts` and usage falls by 20%.

## Steps

1. Cloudflare dashboard → your account → **Images** → **Transformations**.
2. Find the `reservaskalawala.com` zone in the list and **enable transformations**
   for it.
3. In that zone's transformation settings, allow **transformations from any
   origin** (sometimes labelled "resize images from any origin" / a source-origin
   allowlist). This is required because the source images live on
   `lh3.googleusercontent.com`, not on the zone. If it offers an allowlist rather
   than a blanket toggle, add:
   - `lh3.googleusercontent.com`
   - `upload.wikimedia.org`
   - `cdn.pixabay.com`
   - `pixabay.com`
4. Verify — both of these should return `200` and `image/avif` or `image/webp`:

   ```bash
   B=https://www.reservaskalawala.com/cdn-cgi/image
   L=https://lh3.googleusercontent.com/d/10qvLOMLs4_JsBIF99igVeh4baDR7EB-Q=w1600

   # same-zone source
   curl -sS -o /dev/null -w '%{http_code} %{content_type} %{size_download}\n' \
     -H 'Accept: image/avif,image/webp,image/*' \
     "$B/format=auto,fit=scale-down,width=32/https://www.reservaskalawala.com/logo64.png"

   # remote source — this is the one that needs step 3
   curl -sS -o /dev/null -w '%{http_code} %{content_type} %{size_download}\n' \
     -H 'Accept: image/avif,image/webp,image/*' \
     "$B/format=auto,fit=scale-down,width=400/$L"
   ```

5. Set the environment variable in the deploy workflow
   (`.github/workflows/main.yml`, the `env:` block of the build step):

   ```yaml
   REACT_APP_IMAGE_CDN_BASE: /cdn-cgi/image
   ```

   **Relative on purpose.** A relative base makes every image request
   first-party (`www.reservaskalawala.com/cdn-cgi/image/...`), which is what
   removes the third-party cookie and the third-party request entirely. An
   absolute base would work too but reintroduces a cross-origin hop.

   When this is set, also delete the `<link rel="preconnect"
   href="https://lh3.googleusercontent.com">` from `public/index.html` — images
   are same-origin at that point and the hint just opens an unused connection.

6. Recommended, not required: add a **Cache Rule** matching
   `URI Path starts with /cdn-cgi/image/` with *Edge TTL → Override origin → 1
   year*. lh3 sends `cache-control: private, max-age=86400`, and `private` can
   stop the edge caching the derived image, which would make every request pay
   the upstream fetch.

## What it fixes

Already fixed in code without any CDN (see `src/utils/imageCdn.ts`): the switch
from `drive.google.com/thumbnail?id=X&sz=wN` to
`lh3.googleusercontent.com/d/X=wN` removed a 302 redirect and the `NID` cookie
on every image. Best Practices went 71 → 93 on `/`, `/Geco` and `/HomeES`.

Enabling transformations adds, on top of that:

| Audit / metric | Effect |
|---|---|
| `third-party-cookies`, `inspector-issues` | Fixes the **blog routes**, which still hotlink Wikimedia (`WMF-Uniq`) and Pixabay (`__cf_bm`). Those are the only reason `/twodaysinpuertoviejo` is still at BP 71. |
| LCP | AVIF/WebP instead of JPEG — the hero measured 150 KB as JPEG vs 98 KB as WebP, and AVIF is smaller again. |
| Cache | Edge cache with headers we control, instead of `cache-control: private` from lh3. |

Remaining after all of that, and **not** fixable by any CDN:
`image-size-responsive` on the nav logo. Its original is 150x52 and Lighthouse
wants 225x78. That needs a bigger source file.
