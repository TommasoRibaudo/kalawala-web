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
const ROUTE = process.argv.slice(2).find((a) => !a.startsWith('--')) || '/';

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

// Viewport matters. Anything that reads window.innerWidth during render agrees
// with the pre-rendered HTML only at react-snap's width, so a mismatch can be
// invisible on desktop and fire on mobile — which is the width Lighthouse
// emulates. Default to Lighthouse's Moto G Power viewport for that reason.
const arg = (n, d) => {
  const hit = process.argv.find((a) => a.startsWith(`--${n}=`));
  return hit ? Number(hit.slice(n.length + 3)) : d;
};
const viewport = { width: arg('width', 412), height: arg('height', 823) };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport });
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text().slice(0, 200)); });
page.on('pageerror', (err) => errors.push('[pageerror] ' + String(err).slice(0, 200)));

// React hydrates in time slices scheduled through a MessageChannel. On a fast
// machine it can finish inside one slice; slow the CPU down and it yields, and
// mismatches that were invisible start firing. Lighthouse applies 4x by
// default, which is why an error can reproduce there and not here.
const cpu = arg('cpu', 1);
if (cpu > 1) {
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
}

await page.goto(`http://127.0.0.1:${PORT}${ROUTE}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
const after = await page.evaluate(() => document.getElementById('root').innerHTML);

// Attribute serialisation differs harmlessly between the pre-rendered string
// and innerHTML read back from a live DOM: "#5a6570" becomes "rgb(90,101,112)",
// "height:25px" becomes "height: 25px;". Comparing the parsed trees by tag and
// child count sidesteps all of that and finds only structural differences,
// which is what a hydration mismatch actually is.
const structural = await page.evaluate((prerenderedHtml) => {
  const host = document.createElement('div');
  host.innerHTML = prerenderedHtml;
  const path = (n) => {
    const parts = [];
    for (let e = n; e && e.tagName; e = e.parentElement) {
      parts.unshift(e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\s+/).join('.') : ''));
    }
    return parts.join(' > ');
  };
  const found = [];
  const walk = (a, b, depth = 0) => {
    if (found.length >= 25) return null;
    if (!a || !b) return { kind: !a ? 'only-in-hydrated' : 'only-in-prerender', node: path(a || b) };
    if (a.tagName !== b.tagName) return { kind: 'tag', node: path(a), a: a.tagName, b: b.tagName };
    // Compare text too. Once the element tree matches, a surviving React #418
    // is almost always a text-content mismatch, which comparing only elements
    // cannot see. Whitespace is normalised because html-minifier legitimately
    // rewrites it in the snapshot.
    const norm = (s) => s.replace(/\s+/g, ' ').trim();
    const kids = (n) => [...n.childNodes].filter(
      (c) => c.nodeType === 1 || (c.nodeType === 3 && norm(c.textContent) !== ''));
    const ka = kids(a);
    const kb = kids(b);
    if (ka.length !== kb.length) {
      return { kind: 'child-count', node: path(a), a: ka.length, b: kb.length,
               aKids: ka.map((c) => c.nodeName).join(','), bKids: kb.map((c) => c.nodeName).join(',') };
    }
    for (let i = 0; i < ka.length; i++) {
      if (ka[i].nodeType === 3 || kb[i].nodeType === 3) {
        if (ka[i].nodeType !== kb[i].nodeType) {
          return { kind: 'node-type', node: path(a), a: ka[i].nodeName, b: kb[i].nodeName };
        }
        if (norm(ka[i].textContent) !== norm(kb[i].textContent)) {
          return { kind: 'text', node: path(a),
                   a: norm(ka[i].textContent).slice(0, 120),
                   b: norm(kb[i].textContent).slice(0, 120) };
        }
      }
    }
    const ca = [...a.children];
    const cb = [...b.children];
    // Record and keep going rather than stopping at the first hit. These come
    // in families — one bad JSX pattern repeated across sibling components —
    // and each rebuild to re-check costs minutes, so enumerate them all in one
    // pass and fix the family together.
    for (let i = 0; i < ca.length; i++) {
      const r = walk(ca[i], cb[i], depth + 1);
      if (r) found.push(r);
    }
    return null;
  };
  const live = document.getElementById('root');
  walk(host, live);
  return {
    counts: [host.querySelectorAll('*').length, live.querySelectorAll('*').length],
    all: found,
  };
}, before);

await browser.close();
server.close();

console.log('route:', ROUTE, `@ ${viewport.width}x${viewport.height}`);
console.log('prerendered #root chars:', before.length, ' post-hydration:', after.length);
console.log('console errors:', errors.length);
errors.slice(0, 4).forEach((e) => console.log('   ' + e));

console.log(`\nelements: prerendered ${structural.counts[0]}, hydrated ${structural.counts[1]}`);
if (!structural.all.length) {
  console.log('structure: IDENTICAL (differences are attribute serialisation only)');
} else {
  console.log(`structure: ${structural.all.length} DIFFERENCE(S)`);
  structural.all.forEach((d, n) => {
    console.log(`\n  [${n + 1}] ${d.kind}  @ ${d.node}`);
    if (d.a !== undefined) console.log(`      prerender: ${d.a}${d.aKids ? '  (' + d.aKids + ')' : ''}`);
    if (d.b !== undefined) console.log(`      hydrated : ${d.b}${d.bKids ? '  (' + d.bKids + ')' : ''}`);
  });
}

// @fortawesome/react-fontawesome joins its class list with an empty trailing
// token, so every icon's class attribute ends in a space on the client. React
// does not patch attribute mismatches in production, so that difference is a
// post-hydration re-render artefact rather than proof of a hydration error.
// Normalise it away so it cannot mask a genuine structural mismatch.
// The browser also re-serialises inline styles when it reflects them back
// through innerHTML ("height:25px" becomes "height: 25px;"), which is a
// formatting difference rather than a value difference. Collapse both sides to
// the same shape so neither artefact masks a genuine structural mismatch.
const normalise = (html) => html
  .replace(/class="([^"]*?)\s+"/g, 'class="$1"')
  .replace(/style="([^"]*)"/g, (_, s) =>
    'style="' + s.replace(/\s*([:;])\s*/g, '$1').replace(/;$/, '') + '"');
const beforeN = normalise(before);
const afterN = normalise(after);
if (beforeN === afterN) {
  console.log('\nIDENTICAL once FontAwesome trailing class whitespace is normalised.');
} else {
  let j = 0;
  while (j < beforeN.length && j < afterN.length && beforeN[j] === afterN[j]) j++;
  console.log('\nSTILL DIFFERS after normalising, at char ' + j);
  // JSON.stringify so whitespace-only differences stay visible — collapsing
  // them for readability is exactly how you miss the ones that matter.
  console.log('  context   : ' + JSON.stringify(beforeN.slice(Math.max(0, j - 120), j)));
  console.log('  prerender : ' + JSON.stringify(beforeN.slice(j, j + 200)));
  console.log('  hydrated  : ' + JSON.stringify(afterN.slice(j, j + 200)));
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
