# granttheband.com

Astro static site, deployed on Netlify. See `CLAUDE.md` for the full brief.

## Run it locally

Needs Node 24 (Astro 7 requires 22.23.4 or newer). `.nvmrc` pins it.

```sh
nvm use
npm ci
npm run dev       # http://localhost:4321
npm run build     # copy check + static build to dist/
```

## Add a show

Edit `src/data/shows.json` on a branch and open a PR:

```json
{ "date": "2026-12-05", "time": "20:00", "venue": "The Stephen Talkhouse", "town": "Amagansett, NY", "url": "" }
```

`time` is 24h. `url` is optional; the "Details" button only shows when it's set. Past shows drop off at the next build.

## Update /now

Edit `src/data/now.json` with the latest Instagram post: `title`, `url`, and `poster` (an image path under `public/`).

## Swap in real assets

Links, the booking email, hero video, cover art and clip IDs all live in `src/data/site.ts`. Anything left `null` renders as a labeled placeholder.

## Screenshots

`npm run build:preview && npm run screenshots` saves full-page shots of `/` and `/book` at 390x844, 1312x634 and 1440x900 to `screenshots/`. `build:preview` sets `CONTEXT=deploy-preview`, like a Netlify deploy preview, so the two sample tickets render while `shows.json` is empty. Needs Playwright. Fails if a page scrolls sideways.

## Images

Everything Noah supplies is in `public/images/` with `ASSETS.md` as the manifest. Photos are registered in `photos` in `src/data/site.ts` (src, size, alt, credit). After adding a large photo, run `scripts/make-image-sizes.sh` to make its 1200px srcset copy.

## Hero video

The supplied loops are already graded: drop them in as `public/video/hero-desktop.mp4` and `public/video/hero-phone.mp4` and the hero picks them up on the next build. For new raw footage, grade and encode first:

```sh
scripts/grade-video.sh source.mov public/video/hero-desktop.mp4
```

Applies the warm grade from CLAUDE.md, strips audio, writes H.264 with faststart plus a `-poster.jpg`, and warns if the file is over 3 MB. Poster paths live in `hero` in `src/data/site.ts`.

## OG images and favicons

Rendered from the site fonts: `node scripts/make-images.cjs` (needs Playwright installed). Outputs to `public/`.
