/**
 * Reports, for every <img> on a pre-rendered page, how wide it is actually laid
 * out versus how many pixels were downloaded for it.
 *
 * Lighthouse's `uses-responsive-images` says an image is oversized but not what
 * `sizes` would have been right, and deriving that from the SCSS is guesswork
 * once grids, containers and breakpoints compose. Measuring the laid-out width
 * in the same viewport Lighthouse emulates gives the answer directly.
 *
 *   node scripts/image-audit.mjs                      # all four measured routes
 *   node scripts/image-audit.mjs --routes=/,/Geco --width=412
 *
 * `need` is clientWidth x devicePixelRatio: the narrowest srcset candidate that
 * still covers the layout. When `got` is far above `need`, the `sizes` attribute
 * on that element is lying about how much space the image occupies.
 */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = path.join(ROOT, 'build');
const PORT = 5255;

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.txt': 'text/plain', '.xml': 'application/xml' };

const arg = (n, d) => {
  const hit = process.argv.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.slice(n.length + 3) : d;
};

function resolveFile(u) {
  const clean = decodeURIComponent(u.split('?')[0]);
  const abs = path.join(BUILD, path.normalize(clean).replace(/^(\.\.[/\\])+/, ''));
  if (!abs.startsWith(BUILD)) return null;
  if (fs.existsSync(abs) && fs.statSync(abs).isDirectory()) {
    const i = path.join(abs, 'index.html');
    return fs.existsSync(i) ? i : null;
  }
  return fs.existsSync(abs) && fs.statSync(abs).isFile() ? abs : null;
}

const server = http.createServer((req, res) => {
  const f = resolveFile(req.url);
  if (!f) { res.writeHead(404); res.end('404'); return; }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream' });
  res.end(fs.readFileSync(f));
});
await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

// Lighthouse's default mobile emulation: Moto G Power, 412x823 at DPR 1.75.
const width = Number(arg('width', '412'));
const height = Number(arg('height', '823'));
const dpr = Number(arg('dpr', '1.75'));
const routes = arg('routes', '/,/Geco,/HomeES,/twodaysinpuertoviejo').split(',');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: dpr });

console.log(`viewport ${width}x${height} @ DPR ${dpr}\n`);

for (const route of routes) {
  await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'networkidle' });
  // Scroll the page so lazy images below the fold also lay out and resolve.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);

  const rows = await page.evaluate((devicePixelRatio) => {
    const label = (el) => {
      const cls = (el.className || '').toString().trim().split(/\s+/).filter(Boolean).slice(0, 2).join('.');
      const parent = el.parentElement?.className?.toString().trim().split(/\s+/)[0] || '';
      return (parent ? parent + ' > ' : '') + 'img' + (cls ? '.' + cls : '');
    };
    return [...document.querySelectorAll('img')]
      .map((el) => {
        const w = Math.round(el.getBoundingClientRect().width);
        // naturalWidth, not the `=wNNN` in the URL. lh3 never upscales, so a URL
        // asking for w1000 can decode to 150px — reading the parameter reports
        // waste that does not exist, and hides sources that are simply too small.
        const req = Number(/[=?]w(\d+)/.exec(el.currentSrc || el.src || '')?.[1] || 0);
        return {
          label: label(el),
          shown: w,
          need: Math.ceil(w * devicePixelRatio),
          got: el.naturalWidth,
          req,
          sizes: el.getAttribute('sizes') || '-',
          srcset: el.getAttribute('srcset') ? 'yes' : 'NO',
        };
      })
      .filter((r) => r.shown > 0 && r.got > 0);
  }, dpr);

  // Group identical components; one row per component is what we act on.
  const byLabel = new Map();
  for (const r of rows) {
    const k = `${r.label}|${r.shown}|${r.got}`;
    byLabel.set(k, { ...r, n: (byLabel.get(k)?.n || 0) + 1 });
  }
  const grouped = [...byLabel.values()].sort((a, b) => (b.got - b.need) * b.n - (a.got - a.need) * a.n);

  console.log(`=== ${route}  (${rows.length} images)`);
  console.log('  n   shown   need    got   req  srcset  over   component / sizes');
  for (const r of grouped) {
    const over = r.got >= r.need ? `${(r.got / r.need).toFixed(1)}x` : 'TOO SMALL';
    console.log(
      `  ${String(r.n).padStart(2)}  ${String(r.shown).padStart(5)}  ${String(r.need).padStart(5)}  ` +
      `${String(r.got).padStart(5)}  ${String(r.req).padStart(4)}  ${r.srcset.padStart(6)}  ${over.padStart(9)}   ${r.label}\n` +
      `${' '.repeat(20)}sizes=${r.sizes}`
    );
  }
  console.log('');
}

await browser.close();
server.close();
