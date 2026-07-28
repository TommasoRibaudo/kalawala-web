/**
 * Image URL helper.
 *
 * Every content image on the site lives in Google Drive, and there are two
 * ways to reference one. The difference is worth real Lighthouse points:
 *
 *   drive.google.com/thumbnail?id=<id>&sz=w1000   302 -> lh3, sets a cookie
 *   lh3.googleusercontent.com/d/<id>=w1000        200 image/jpeg, no cookie
 *
 * The `thumbnail` endpoint is only a redirector. Pointing at it cost a full
 * extra round trip on every image, and the 302 response carried
 * `Set-Cookie: NID=...; domain=.google.com` — which is what failed the
 * `third-party-cookies` and `inspector-issues` Best-Practices audits. lh3 is
 * the host that redirect pointed at all along: it answers directly, sends no
 * cookie, and honours an arbitrary width in the `=wNNN` suffix, so a real
 * srcset works with no CDN configured at all.
 *
 * On top of that, REACT_APP_IMAGE_CDN_BASE may point at an image CDN, which
 * adds AVIF/WebP negotiation and cache headers we control:
 *
 *   Cloudflare  /cdn-cgi/image                                (same zone)
 *   Cloudinary  https://res.cloudinary.com/<cloud>/image/fetch
 *   ImageKit    https://ik.imagekit.io/<id>
 *
 * Cloudflare is worth preferring because the site is already a Cloudflare
 * zone: a relative `/cdn-cgi/image` base makes every image first-party, so
 * there is no third-party image request left to audit at all. It also spells
 * its transforms `width=640` where the others use `w_640`, hence the syntax
 * switch below.
 *
 * With the variable unset (local dev, CI, react-snap) every function degrades
 * to a plain lh3 URL, so nothing here depends on an account existing, and the
 * whole CDN layer is revertible by clearing one environment variable.
 */

const CDN_BASE = (process.env.REACT_APP_IMAGE_CDN_BASE || '').replace(/\/+$/, '');

/** Cloudflare's transform syntax differs from Cloudinary's and ImageKit's. */
const IS_CLOUDFLARE = CDN_BASE.includes('/cdn-cgi/image');

/** Widths generated for responsive srcsets. Covers 1x-3x for phones through desktop. */
export const DEFAULT_WIDTHS = [400, 640, 960, 1280, 1600];

/**
 * Width requested from lh3 when a CDN is doing the resizing. The edge fetches
 * this one upstream, caches it, and derives every breakpoint from it. Asking
 * lh3 for each width separately would multiply origin fetches and split the
 * cache for no visible gain.
 */
const CDN_SOURCE_WIDTH = 1600;

/** `https://lh3.googleusercontent.com/d/<id>` followed by its `=wNNN` size suffix. */
const LH3_SIZED = /^(https:\/\/lh3\.googleusercontent\.com\/d\/[A-Za-z0-9_-]+)=[^/]*$/;

/** Legacy shape, still handled so a stray old URL degrades instead of breaking. */
function isDriveThumbnail(src: string): boolean {
  return src.includes('drive.google.com/thumbnail');
}

/** True when this is a Google-hosted image whose width we know how to set. */
function isResizable(src: string): boolean {
  return LH3_SIZED.test(src) || isDriveThumbnail(src);
}

/** Rewrite the width in either URL shape. */
function atWidth(src: string, width: number): string {
  const lh3 = src.match(LH3_SIZED);
  if (lh3) return `${lh3[1]}=w${width}`;
  return src.replace(/([?&]sz=)w\d+/, `$1w${width}`);
}

/**
 * URL for a single image at a target width.
 */
export function cdnImage(src: string, width: number): string {
  if (!src) return src;
  if (!CDN_BASE) {
    return isResizable(src) ? atWidth(src, width) : src;
  }

  const source = isResizable(src) ? atWidth(src, CDN_SOURCE_WIDTH) : src;

  // `fit=scale-down` / `c_limit` never upscale past the source, so a narrow
  // original stays sharp rather than being stretched to fill the breakpoint.
  const transforms = IS_CLOUDFLARE
    ? `format=auto,fit=scale-down,width=${width}`
    : `f_auto,q_auto,c_limit,w_${width}`;

  // Cloudflare treats everything after the options as a plain URL path
  // segment; Cloudinary and ImageKit want the origin percent-encoded. lh3 URLs
  // carry no query string, so neither form can lose a parameter.
  return `${CDN_BASE}/${transforms}/${IS_CLOUDFLARE ? source : encodeURIComponent(source)}`;
}

/** `srcSet` string across the given widths (defaults to DEFAULT_WIDTHS). */
export function cdnSrcSet(src: string, widths: number[] = DEFAULT_WIDTHS): string {
  if (!src) return '';
  if (!CDN_BASE && !isResizable(src)) return '';
  return widths.map((w) => `${cdnImage(src, w)} ${w}w`).join(', ');
}
