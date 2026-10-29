// Renders OG cards (1200x630) and favicons from the site's own fonts and colors.
// Run: node scripts/make-images.cjs   (needs Playwright; outputs to public/)
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
// Inline as data URLs: setContent pages can't load file:// fonts.
const font = (p) =>
  'data:font/woff2;base64,' + fs.readFileSync(path.join(root, 'node_modules', p)).toString('base64');
const css = `
@font-face { font-family: A; src: url(${font('@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2')}); font-weight: 100 900; font-stretch: 62% 125%; }
@font-face { font-family: C; src: url(${font('@fontsource/caveat/files/caveat-latin-600-normal.woff2')}); font-weight: 600; }
* { margin: 0; box-sizing: border-box; }
body { background: #16120E; color: #F1E4CF; font-family: A; }
.aside { font-family: C; font-weight: 600; color: #E8A64B; }
.d { font-stretch: 125%; font-weight: 900; text-transform: uppercase; line-height: .95; }
`;

// Caveat appears only in the wordmark. The kicker is small caps Archivo.
const og = (kicker, headline, foot) => `
<style>${css}
.card { width: 1200px; height: 630px; padding: 64px 72px; display: flex; flex-direction: column; justify-content: space-between; border-bottom: 14px solid #E8A64B; }
.wm { font-size: 34px; display: flex; align-items: baseline; gap: 10px; }
.wm b { font-stretch: 125%; font-weight: 800; }
.wm .aside { font-size: 40px; }
.kicker { font-size: 28px; font-weight: 700; font-stretch: 115%; letter-spacing: .16em; text-transform: uppercase; margin-bottom: 18px; }
.d { font-size: 112px; }
.foot { font-size: 26px; font-weight: 600; color: #B9A88F; }
</style>
<div class="card">
  <div class="wm"><b>GRANT</b><span class="aside">the band</span></div>
  <div><div class="kicker">${kicker}</div><div class="d">${headline}</div></div>
  <div class="foot">${foot}</div>
</div>`;

const icon = (size) => `
<style>${css}
.i { width: ${size}px; height: ${size}px; display: grid; place-items: center; background: #16120E; }
.i span { font-stretch: 125%; font-weight: 900; font-size: ${size * 0.72}px; color: #E8A64B; line-height: 1; }
</style><div class="i"><span>G</span></div>`;

(async () => {
  const b = await chromium.launch();
  const shoot = async (html, w, h, out) => {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.setContent(html, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(root, 'public', out) });
    await p.close();
  };
  await shoot(og('Meroke Lane', 'Out now', 'granttheband.com'), 1200, 630, 'og/home.png');
  await shoot(og('Meroke Lane', 'Out now', 'granttheband.com'), 1200, 630, 'og/now.png');
  await shoot(og('GRANT the band', 'Shows', 'granttheband.com/shows'), 1200, 630, 'og/shows.png');
  await shoot(og('For venues and private events', 'Book GRANT<br>the band.', 'Full band with horns, trio or duo · granttheband.com/book'), 1200, 630, 'og/book.png');
  await shoot(icon(32), 32, 32, 'favicon-32.png');
  await shoot(icon(180), 180, 180, 'apple-touch-icon.png');
  await b.close();
})();
