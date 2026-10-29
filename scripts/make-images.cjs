// Renders OG cards (1200x630) and favicons from the site's own fonts and colors,
// matched to the approved Canva masters (night ground, amber rule, cream caps, gold label).
// Run: node scripts/make-images.cjs   (needs Playwright; outputs to public/)
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
// Inline as data URLs: setContent pages can't load file:// fonts.
const font = (p) =>
  'data:font/woff2;base64,' + fs.readFileSync(path.join(root, 'node_modules', p)).toString('base64');
// The real GTB monogram (white SVG from public/images, per ASSETS.md).
const monogram = 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(root, 'public/images/gtb-monogram.svg')).toString('base64');
const css = `
@font-face { font-family: M; src: url(${font('@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2')}); font-weight: 100 900; }
@font-face { font-family: R; src: url(${font('@fontsource/reenie-beanie/files/reenie-beanie-latin-400-normal.woff2')}); }
* { margin: 0; box-sizing: border-box; }
body { background: #10151C; color: #F4EBDD; font-family: M; }
`;

const og = (label, headline, foot) => `
<style>${css}
.card { width: 1200px; height: 630px; padding: 72px 80px; display: flex; flex-direction: column; justify-content: space-between; }
.wm { font-size: 24px; letter-spacing: .14em; text-transform: uppercase; }
.rule { width: 64px; height: 2px; background: #E3A35C; margin-bottom: 28px; }
.d { font-size: 96px; font-weight: 400; letter-spacing: .06em; text-transform: uppercase; line-height: 1.02; }
.label { color: #F6CB8A; font-size: 26px; letter-spacing: .12em; text-transform: uppercase; margin-top: 22px; }
.foot { display: flex; justify-content: space-between; align-items: flex-end; color: #F6CB8A; font-size: 22px; letter-spacing: .06em; }
.mono { width: 72px; height: 72px; }
</style>
<div class="card">
  <div class="wm">GRANT the band</div>
  <div><div class="rule"></div><div class="d">${headline}</div><div class="label">${label}</div></div>
  <div class="foot"><span>${foot}</span><img class="mono" src="${monogram}" alt=""></div>
</div>`;

// Favicon: the white GTB monogram on night, so it reads on light and dark browser tabs.
const icon = (size) => `
<style>${css}
.i { width: ${size}px; height: ${size}px; display: grid; place-items: center; background: #10151C; }
.i img { width: ${Math.round(size * 0.9)}px; height: ${Math.round(size * 0.9)}px; }
</style><div class="i"><img src="${monogram}" alt=""></div>`;

(async () => {
  const b = await chromium.launch();
  const shoot = async (html, w, h, out) => {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.setContent(html, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(root, 'public', out) });
    await p.close();
  };
  await shoot(og('Meroke Lane', 'Out<br>everywhere', 'granttheband.com'), 1200, 630, 'og/home.png');
  await shoot(og('Meroke Lane', 'Out<br>everywhere', 'granttheband.com'), 1200, 630, 'og/now.png');
  await shoot(og('Next stop', 'Shows', 'granttheband.com/shows'), 1200, 630, 'og/shows.png');
  await shoot(og('Venues and private events', 'Booking.', 'granttheband.com/book'), 1200, 630, 'og/book.png');
  await shoot(icon(32), 32, 32, 'favicon-32.png');
  await shoot(icon(180), 180, 180, 'apple-touch-icon.png');
  await b.close();
})();
