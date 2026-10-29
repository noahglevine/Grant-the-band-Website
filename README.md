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

`npm run build && npm run screenshots` saves full-page shots of `/` and `/book` at 390px and 1440px to `screenshots/`. Needs Playwright. Fails if a page scrolls sideways.

## Hero video

Grade and encode the loop before it goes in `public/media/`:

```sh
scripts/grade-video.sh source.mov public/media/hero-loop.mp4
```

Applies the warm grade from CLAUDE.md, strips audio, writes H.264 with faststart plus a `-poster.jpg`, and warns if the file is over 3 MB. Then set `hero.video` and `hero.poster` in `src/data/site.ts`.

## OG images and favicons

Rendered from the site fonts: `node scripts/make-images.cjs` (needs Playwright installed). Outputs to `public/`.
