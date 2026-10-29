// Full-page screenshots of / and /book at 390x844, 1312x634 (laptop) and 1440x900,
// saved to screenshots/. Serves the built dist/ itself, so build first; use
// `npm run build:preview` so the deploy-preview sample tickets show.
// Run: node scripts/screenshots.cjs   (needs Playwright; not a project dependency)
const fs = require('fs');
const http = require('http');
const path = require('path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const out = path.join(root, 'screenshots');

const pages = [
  { name: 'home', path: '/' },
  { name: 'book', path: '/book' },
];
const widths = [
  { width: 390, height: 844 },
  { width: 1312, height: 634 },
  { width: 1440, height: 900 },
];

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
};

// Mirrors Netlify: /book serves book.html, / serves index.html.
function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const candidates = clean === '/' ? ['index.html'] : [clean, `${clean}.html`, `${clean}/index.html`];
  for (const c of candidates) {
    const file = path.join(dist, c);
    if (file.startsWith(dist) && fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  }
  return null;
}

(async () => {
  if (!fs.existsSync(path.join(dist, 'index.html'))) {
    console.error('dist/ is missing. Run `npm run build` first.');
    process.exit(1);
  }
  fs.mkdirSync(out, { recursive: true });

  const server = http.createServer((req, res) => {
    const file = resolve(req.url);
    if (!file) return res.writeHead(404).end();
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const base = `http://127.0.0.1:${server.address().port}`;

  const browser = await chromium.launch();
  const files = [];
  const overflow = [];
  try {
    for (const vp of widths) {
      const page = await browser.newPage({ viewport: vp, reducedMotion: 'reduce' });
      for (const p of pages) {
        await page.goto(base + p.path, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        const docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        if (docWidth > vp.width) overflow.push(`${p.path} at ${vp.width}px is ${docWidth}px wide`);
        const file = `${p.name}-${vp.width}.png`;
        await page.screenshot({ path: path.join(out, file), fullPage: true });
        files.push(file);
      }
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
  console.log(files.map((f) => `screenshots/${f}`).join('\n'));
  if (overflow.length) {
    console.error(`Horizontal overflow:\n${overflow.join('\n')}`);
    process.exit(1);
  }
})();
