// Renders OG cards (1200x630) and favicons from the site's own fonts and colors.
// OG cards: the 89 North full-band photo under the night scrim, the hero wordmark lockup
// and one gold label line.
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
const bandPhoto = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(root, 'public/images/89north-full-band.jpg')).toString('base64');
const css = `
@font-face { font-family: M; src: url(${font('@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2')}); font-weight: 100 900; }
@font-face { font-family: R; src: url(${font('@fontsource/reenie-beanie/files/reenie-beanie-latin-400-normal.woff2')}); }
* { margin: 0; box-sizing: border-box; }
body { background: #10151C; color: #F4EBDD; font-family: M; }
`;

// Same scrim as the site (--scrim in global.css): night 0% to 70%, front-loaded.
const og = (label) => `
<style>${css}
.card { position: relative; width: 1200px; height: 630px; display: grid; place-content: center; justify-items: center; gap: 28px;
  background: linear-gradient(to bottom, rgb(16 21 28 / 0) 0%, rgb(16 21 28 / 0.7) 30%, rgb(16 21 28 / 0.7) 100%), url(${bandPhoto}) center 40% / cover; }
.wm { display: flex; flex-direction: column; align-items: flex-end; line-height: 1; }
.grant { font-size: 168px; letter-spacing: .06em; margin-right: -.06em; line-height: .9; }
.band { font-family: R; font-size: 71px; color: #F6CB8A; }
.label { color: #F6CB8A; font-size: 30px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; }
</style>
<div class="card">
  <div class="wm"><span class="grant">GRANT</span><span class="band">the band</span></div>
  <div class="label">${label}</div>
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
  await shoot(og('Meroke Lane · Out everywhere'), 1200, 630, 'og/home.png');
  await shoot(og('Meroke Lane · Out everywhere'), 1200, 630, 'og/now.png');
  await shoot(og('Shows'), 1200, 630, 'og/shows.png');
  await shoot(og('Booking'), 1200, 630, 'og/book.png');
  await shoot(icon(32), 32, 32, 'favicon-32.png');
  await shoot(icon(180), 180, 180, 'apple-touch-icon.png');
  await b.close();
})();
