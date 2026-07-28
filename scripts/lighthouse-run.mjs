/**
 * Lighthouse harness for the pre-rendered build.
 *
 * Serves build/ over a throwaway HTTP server and runs Lighthouse against a set
 * of routes, N times each, reporting the MEDIAN run. Lighthouse has real
 * run-to-run variance (±3-5 points on the performance score is normal), so a
 * single run is not evidence that a change helped or hurt.
 *
 * Two things this server does deliberately:
 *
 *  - No SPA fallback. `serve -s` rewrites every path to the root index.html,
 *    which would silently test the homepage 4 times instead of the 4 requested
 *    routes. Here /Geco resolves to build/Geco/index.html or 404s loudly.
 *  - gzip on by default. It mirrors the mod_deflate rules that ship in
 *    public/.htaccess, so local numbers stay comparable to production.
 *
 * Usage:
 *   node scripts/lighthouse-run.mjs                     # mobile, 3 runs
 *   node scripts/lighthouse-run.mjs --runs=1            # quick check
 *   node scripts/lighthouse-run.mjs --desktop
 *   node scripts/lighthouse-run.mjs --routes=/,/Geco
 *   node scripts/lighthouse-run.mjs --label=baseline    # names the output dir
 */

import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = path.join(ROOT, 'build');
const OUT_ROOT = path.join(ROOT, 'lighthouse-reports');
const PORT = 5199;

const DEFAULT_ROUTES = ['/', '/Geco', '/HomeES', '/twodaysinpuertoviejo'];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

const COMPRESSIBLE = new Set([
  '.html', '.js', '.css', '.json', '.svg', '.txt', '.md', '.map', '.xml', '.webmanifest',
]);

function arg(name, fallback) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
}
const hasFlag = (name) => process.argv.includes(`--${name}`);

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  // Block traversal before touching the filesystem.
  const abs = path.join(BUILD, path.normalize(clean).replace(/^(\.\.[/\\])+/, ''));
  if (!abs.startsWith(BUILD)) return null;
  if (fs.existsSync(abs) && fs.statSync(abs).isDirectory()) {
    const index = path.join(abs, 'index.html');
    return fs.existsSync(index) ? index : null;
  }
  return fs.existsSync(abs) && fs.statSync(abs).isFile() ? abs : null;
}

function startServer() {
  const server = http.createServer((req, res) => {
    const file = resolveFile(req.url);
    if (!file) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404');
      return;
    }
    const ext = path.extname(file).toLowerCase();
    const body = fs.readFileSync(file);
    const headers = { 'Content-Type': MIME[ext] || 'application/octet-stream' };

    // Mirrors the cache policy in public/.htaccess: hashed assets under
    // /static/ are immutable, HTML must always revalidate.
    headers['Cache-Control'] = req.url.startsWith('/static/')
      ? 'public, max-age=31536000, immutable'
      : 'no-cache';

    const wantsGzip = /\bgzip\b/.test(req.headers['accept-encoding'] || '');
    if (wantsGzip && COMPRESSIBLE.has(ext) && body.length > 512) {
      const gz = zlib.gzipSync(body, { level: 6 });
      res.writeHead(200, { ...headers, 'Content-Encoding': 'gzip', 'Content-Length': gz.length });
      res.end(gz);
      return;
    }
    res.writeHead(200, { ...headers, 'Content-Length': body.length });
    res.end(body);
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];
const METRICS = [
  ['first-contentful-paint', 'FCP'],
  ['largest-contentful-paint', 'LCP'],
  ['total-blocking-time', 'TBT'],
  ['cumulative-layout-shift', 'CLS'],
  ['speed-index', 'SI'],
];

function summarise(lhr) {
  const scores = {};
  for (const c of CATEGORIES) scores[c] = Math.round((lhr.categories[c]?.score ?? 0) * 100);
  const metrics = {};
  for (const [id, label] of METRICS) {
    metrics[label] = {
      value: lhr.audits[id]?.numericValue ?? null,
      display: lhr.audits[id]?.displayValue ?? 'n/a',
    };
  }
  const failed = [];
  for (const c of CATEGORIES) {
    for (const ref of lhr.categories[c]?.auditRefs ?? []) {
      const a = lhr.audits[ref.id];
      if (!a || a.scoreDisplayMode === 'notApplicable' || a.scoreDisplayMode === 'informative') continue;
      if (a.score !== null && a.score < 1) {
        failed.push({ category: c, id: ref.id, title: a.title, score: a.score, weight: ref.weight });
      }
    }
  }
  return { scores, metrics, failed };
}

const median = (nums) => {
  const s = [...nums].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};

async function main() {
  if (!fs.existsSync(path.join(BUILD, 'index.html'))) {
    console.error('build/index.html not found — run `npm run build` first.');
    process.exit(1);
  }

  const runs = Number(arg('runs', '3'));
  const desktop = hasFlag('desktop');
  const label = arg('label', desktop ? 'desktop' : 'mobile');
  const routes = arg('routes', DEFAULT_ROUTES.join(',')).split(',').filter(Boolean);

  const outDir = path.join(OUT_ROOT, label);
  fs.mkdirSync(outDir, { recursive: true });

  const server = await startServer();
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  });

  const results = [];
  try {
    for (const route of routes) {
      const url = `http://127.0.0.1:${PORT}${route}`;
      const perRun = [];
      for (let i = 0; i < runs; i++) {
        process.stdout.write(`  ${route}  run ${i + 1}/${runs} ... `);
        const res = await lighthouse(
          url,
          { port: chrome.port, output: ['json', 'html'], logLevel: 'error' },
          desktop ? (await import('lighthouse/core/config/desktop-config.js')).default : undefined,
        );
        const s = summarise(res.lhr);
        perRun.push({ summary: s, reportHtml: res.report[1], lhr: res.lhr });
        console.log(
          `perf ${s.scores.performance}  a11y ${s.scores.accessibility}  ` +
          `bp ${s.scores['best-practices']}  seo ${s.scores.seo}`,
        );
      }

      // Median by performance score — the noisiest of the four.
      const medianPerf = median(perRun.map((r) => r.summary.scores.performance));
      const pick = perRun.find((r) => r.summary.scores.performance === medianPerf);
      const slug = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '');
      fs.writeFileSync(path.join(outDir, `${slug}.report.html`), pick.reportHtml);
      fs.writeFileSync(path.join(outDir, `${slug}.lhr.json`), JSON.stringify(pick.lhr));
      results.push({ route, ...pick.summary, runs: perRun.map((r) => r.summary.scores) });
    }
  } finally {
    await chrome.kill();
    server.close();
  }

  const lines = [];
  lines.push(`# Lighthouse — ${label}`);
  lines.push('');
  lines.push(`Median of ${runs} run(s) per route. gzip on, /static/ immutable.`);
  lines.push('');
  lines.push('| Route | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | SI |');
  lines.push('|---|---|---|---|---|---|---|---|---|---|');
  for (const r of results) {
    lines.push(
      `| \`${r.route}\` | ${r.scores.performance} | ${r.scores.accessibility} | ` +
      `${r.scores['best-practices']} | ${r.scores.seo} | ${r.metrics.FCP.display} | ` +
      `${r.metrics.LCP.display} | ${r.metrics.TBT.display} | ${r.metrics.CLS.display} | ` +
      `${r.metrics.SI.display} |`,
    );
  }
  lines.push('');
  for (const r of results) {
    if (!r.failed.length) continue;
    lines.push(`## Failing audits — \`${r.route}\``);
    lines.push('');
    for (const c of CATEGORIES) {
      const inCat = r.failed.filter((f) => f.category === c).sort((a, b) => b.weight - a.weight);
      if (!inCat.length) continue;
      lines.push(`**${c}**`);
      lines.push('');
      for (const f of inCat) lines.push(`- \`${f.id}\` (w${f.weight}) — ${f.title}`);
      lines.push('');
    }
  }

  const summaryPath = path.join(outDir, 'summary.md');
  fs.writeFileSync(summaryPath, lines.join('\n'));
  console.log('\n' + lines.slice(0, 6 + results.length).join('\n'));
  console.log(`\nReports: ${path.relative(ROOT, outDir)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
