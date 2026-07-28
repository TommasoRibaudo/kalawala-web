/**
 * Finds hydration mismatches by diffing the pre-rendered #root markup against
 * the DOM React produces after it hydrates. React strips the useful detail from
 * the production error, but whatever it rewrote is exactly what did not match.
 */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from '@playwright/test';

const ROOT = 'C:/Users/User/Documents/ReactNativeApps/Medical/kalawala-web';
const BUILD = path.join(ROOT, 'build');
const PORT = 5233;
const ROUTE = process.argv[2] || '/';

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.txt': 'text/plain', '.xml': 'application/xml' };

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

const file = ROUTE === '/' ? path.join(BUILD, 'index.html') : path.join(BUILD, ROUTE.slice(1), 'index.html');
const prerendered = fs.readFileSync(file, 'utf8');
const m = /<div id="root">([\s\S]*?)<\/div><\/body>/.exec(prerendered)
  || /<div id="root">([\s\S]*)<\/div>/.exec(prerendered);
const before = m ? m[1] : '';

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text().slice(0, 200)); });
await page.goto(`http://127.0.0.1:${PORT}${ROUTE}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
const after = await page.evaluate(() => document.getElementById('root').innerHTML);
await browser.close();
server.close();

console.log('route:', ROUTE);
console.log('prerendered #root chars:', before.length, ' post-hydration:', after.length);
console.log('console errors:', errors.length);
errors.slice(0, 4).forEach((e) => console.log('   ' + e));

// @fortawesome/react-fontawesome joins its class list with an empty trailing
// token, so every icon's class attribute ends in a space on the client. React
// does not patch attribute mismatches in production, so that difference is a
// post-hydration re-render artefact rather than proof of a hydration error.
// Normalise it away so it cannot mask a genuine structural mismatch.
const normalise = (html) => html.replace(/class="([^"]*?)\s+"/g, 'class="$1"');
const beforeN = normalise(before);
const afterN = normalise(after);
if (beforeN === afterN) {
  console.log('\nIDENTICAL once FontAwesome trailing class whitespace is normalised.');
} else {
  let j = 0;
  while (j < beforeN.length && j < afterN.length && beforeN[j] === afterN[j]) j++;
  console.log('\nSTILL DIFFERS after normalising, at char ' + j);
  console.log('--- prerendered ---');
  console.log(beforeN.slice(Math.max(0, j - 20), j + 700).replace(/\s+/g, ' '));
  console.log('--- after hydration ---');
  console.log(afterN.slice(Math.max(0, j - 20), j + 700).replace(/\s+/g, ' '));
}

// Walk to the first divergence and print a window around it.
let i = 0;
while (i < before.length && i < after.length && before[i] === after[i]) i++;
if (i >= before.length && i >= after.length) {
  console.log('\nIDENTICAL — no mismatch in #root markup.');
} else {
  console.log('\nfirst divergence at char ' + i);
  console.log('--- prerendered ---');
  console.log(before.slice(Math.max(0, i - 220), i + 260).replace(/\s+/g, ' '));
  console.log('--- after hydration ---');
  console.log(after.slice(Math.max(0, i - 220), i + 260).replace(/\s+/g, ' '));
}
