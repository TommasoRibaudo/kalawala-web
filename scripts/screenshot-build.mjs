/**
 * Screenshots pages from build/ so CSS changes can be eyeballed.
 *
 * Serves the pre-rendered output the same way scripts/lighthouse-run.mjs does
 * (no SPA fallback, so /Geco really is build/Geco/index.html).
 *
 *   node scripts/screenshot-build.mjs
 *   node scripts/screenshot-build.mjs --routes=/,/Geco --width=1280
 */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = path.join(ROOT, 'build');
const OUT = path.join(ROOT, 'lighthouse-reports', 'screenshots');
const PORT = 5244;

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

fs.mkdirSync(OUT, { recursive: true });
const routes = arg('routes', '/,/Geco,/twodaysinpuertoviejo,/HomeES').split(',');
const width = Number(arg('width', '412'));
const height = Number(arg('height', '915'));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 });
for (const route of routes) {
  await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const slug = (route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '')) + `-${width}`;
  const file = path.join(OUT, `${slug}.png`);
  await page.screenshot({ path: file, fullPage: false });
  console.log('  ' + path.relative(ROOT, file));
}
await browser.close();
server.close();
