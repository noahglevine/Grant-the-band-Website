# granttheband.com rebuild

You are building and maintaining the website for GRANT the band, an indie rock band with a horn section from Long Island, NY. Noah Grant (lead vocals, rhythm guitar) owns this repo. Replacing a Wix site at granttheband.com.

## Goal

A stranger should think "these guys are great live" within 3 seconds. Originals ride on that credibility.

**Homepage principle: lead with the release and the dates, never a tagline.** Restraint over explanation. Present like an established band (reference: wilderado.co): logo, current release, dates, music, video, newsletter. No sales copy on home.

Conversions, in priority order:
1. Newsletter signup (new music and show dates; primary, on every page except /book, which stays buyer-only)
2. Booking inquiry (/book)
3. Stream Meroke Lane
4. Follow on Instagram (footer only, never a hero CTA)

## Stack

- Astro (current stable release, static output), deployed on Netlify from GitHub
- `main` = production. All work on branches, opened as PRs so Netlify builds a deploy preview. Never merge to main or touch DNS without Noah's explicit OK.
- Fonts self-hosted via Fontsource: Archivo (variable, use the width axis) and Caveat
- `@astrojs/sitemap`
- Netlify Forms for the booking form (no backend)
- Email signup: embed form from the provider Noah picks (Kit or MailerLite free tier). Placeholder component until then.
- YouTube clips as click-to-load facades (lite-youtube or equivalent, pinned version). No iframes on first load.
- No Instagram feed embed. No trackers beyond one privacy-light analytics script Noah approves.
- Keep dependencies minimal. Pin versions.

## Pages (4 total)

- `/` home
- `/shows` upcoming dates
- `/book` EPK for talent buyers and private events
- `/now` link-in-bio page for the Instagram bio

## Data

`src/data/shows.json` is the only place show dates live:

```json
[
  { "date": "2026-12-05", "time": "20:00", "venue": "The Stephen Talkhouse", "town": "Amagansett, NY", "url": "" }
]
```

- Upcoming shows only (date >= build date), sorted ascending, on `/shows` and home.
- Home shows section renders ONLY when there are upcoming dates. When empty, omit it entirely.
- `/shows` with no upcoming dates: "No dates announced." plus an inline email signup "Get them first."
- Generate schema.org `MusicEvent` JSON-LD for each upcoming show (home when shown, and `/shows`).
- `/now` shows the next show in a single row, or hides the row if none.

`src/data/now.json` holds the /now top card: `{ "title": "", "url": "", "poster": "" }`. Updated weekly to match the latest Instagram post.

## Design tokens

```
--bg:          #16120E   page ground
--surface:     #1E1813   alternate section
--placeholder: #2A2119
--line:        #3A2F25
--text:        #F1E4CF
--body:        #E3D4BC
--muted:       #B9A88F
--accent:      #E8A64B   golden hour amber, buttons on dark use #16120E text
```

- Display: Archivo, width 125%, weight 900, uppercase, tight line-height (0.95)
- Body: Archivo normal width, 400 to 700
- Caveat 600 appears only inside the logo/wordmark ("the band"). No handwritten asides anywhere else on the site.
- Buttons: pill shape, 44px+ tall. Primary = accent fill. Secondary = 1px cream outline.
- Dark site, no light mode needed, but keep text contrast at 4.5:1 or better.
- Brand rule: no green anywhere. No gradients, no emoji, no stock imagery, no AI-generated visuals, no template look.
- Mobile first. Most traffic comes from Instagram on phones.

Wordmark: "GRANT" in wide Archivo 800 + "the band" in Caveat, accent color. On the home hero it's the headline, centered and large (min 90px tall on phones, 140px on desktop). Lives only in `src/components/Wordmark.astro` so it can be swapped for the real logo SVG (set `wordmarkSvg` in `src/data/site.ts`).

## Type scale (mobile first, nothing on the site below 15px)

- Body: 18px mobile / 20px desktop, line-height 1.55, max-width 65ch
- Lead paragraphs: 21px mobile / 24px desktop
- H1: clamp(60px, 13vw, 144px)
- H2: clamp(44px, 8vw, 88px)
- Nav links: 17px. Buttons: 18px label, 56px min height
- Small caps labels (e.g. "MEROKE LANE" over "OUT NOW"): uppercase, letter-spacing 0.12em, 15px+
- List rows (EP tracks, shows): 22px
- Captions, figcaptions, footer: 16px minimum

## Navigation (all pages)

Shows (`/shows`), Music (`/#music`), Video (`/#video`), Newsletter (the signup on the current page, else `/#newsletter`), Booking (`/book`). Phones get a menu button. On home the header carries no wordmark; the hero logo is the headline.

## Home sections and copy

Use this copy as written. Typographic apostrophes and quotes. Never use em dashes anywhere on the site.

1. Hero: full-bleed [HERO VIDEO LOOP or PHOTO: full band, golden hour]. Video rules: self-hosted MP4, 6 to 10 sec, under 3 MB, poster image, `playsinline`, prefers-reduced-motion shows the poster.
   - Centered logo, large. It is the H1.
   - Below: small caps "MEROKE LANE", then large "OUT NOW".
   - Buttons: "Listen" (to [HYPERFOLLOW URL]) and "Shows" (to `/shows`).
   - No tagline, no location line, no sub paragraph.
2. Shows (only when there are upcoming dates): H2 "Shows". Rows: date, venue, town · time, "Details". Link to `/shows`.
3. Music (`#music`): cover art, H2 "Meroke Lane", unnumbered list of singles (Man on a Train, Waking Up, Horizon, Peace of Mind). Buttons: "Listen" (HyperFollow), Spotify, Apple Music, YouTube. No blurb.
4. Video (`#video`): H2 "Video", no subhead. Three clips: Man on a Train (Live at The Stephen Talkhouse), Horizon (Live at The Stephen Talkhouse), Peace of Mind (Unplugged at Cooper Bluff). Link "More on YouTube".
5. Photo band: full-bleed [BAND PHOTO], no text.
6. Newsletter (`#newsletter`, accent background, dark text): H2 "Newsletter". "New music and show dates, first." Email field + "Sign up". Same copy everywhere the signup appears.
7. Footer (every page): logo, Instagram, Spotify, YouTube, TikTok, "Booking: booking@granttheband.com", "© 2026 GRANT the band". No location line.

Not on home: venue list, press quote, booking teaser. Those live on `/book`.

## /shows

- H1 "Shows". Upcoming rows from shows.json.
- Empty: "No dates announced." + inline signup "Get them first."

## /book copy

- H1: "Book GRANT the band."
- "Long Island indie rock with a horn section. Originals off Meroke Lane plus covers people actually sing. We held a summer Wednesday residency at Cooper Bluff and have played The Stephen Talkhouse, 89 North and Piquet Lane."
- Formats, each with one line under it:
  - Full band with horns: "[NUMBER]-piece. Built for clubs, residencies and outdoor nights."
  - Trio: "[WHAT THE TRIO IS BEST FOR]"
  - Duo: "[WHAT THE DUO IS BEST FOR]"
  - Then [SET LENGTHS]. [PA AND STAGE NEEDS].
- "Watch first": three clips, full band first.
- "Played": The Stephen Talkhouse, Cooper Bluff, summer residency, 89 North, Piquet Lane.
- "Press": “Everyone is executing their instrument… top shelf.” Torvik, reviewing “Man on a Train"
- Downloads: stage plot and tech rider PDF (phase 2).
- Contact: "Email booking@granttheband.com with the date, the room and your budget. We answer within a day." Plus a Netlify form, fields in this order: name, email, date, venue or event type, budget, message. Honeypot field is visually hidden and aria-hidden.
- No fan signup block on /book. The page is for buyers only.
- Do not add a band member photo grid. The lineup rotates.

## /now

Single phone-width column: wordmark, "Indie rock from Long Island. Better in the room.", top card from now.json ("The one you just watched"), next show row, buttons "Get show dates" (primary), "Listen to Meroke Lane", "Watch us live", "Book us". Footer "granttheband.com". Add UTM params to outbound links (utm_source=instagram&utm_medium=bio).

## Links

- Spotify: https://open.spotify.com/artist/7lsyuqqd27UuWS2mcYnSZe
- YouTube: https://www.youtube.com/@GRANTtheband
- Instagram: https://www.instagram.com/grant_theband
- TikTok: https://www.tiktok.com/@granttheband
- Apple Music: [APPLE MUSIC URL]

## Redirects (netlify.toml, 301)

```
/book-online           -> /book
/music                 -> /#music
/video                 -> /#video
/about                 -> /
/shop                  -> /
/category/*            -> /
/product-page/*        -> /
```

## SEO

- Home title: "GRANT the band | Indie Rock from Long Island, NY"
- Home meta + OG description: "GRANT the band. Meroke Lane out now. Listen, watch, and get show dates."
- /book title: "Book GRANT the band | Live Band for Venues and Private Events, Long Island"
- Meta descriptions in the band voice, no em dashes, no "unforgettable"
- og:site_name "GRANT the band", OG image per page (1200x630)
- MusicGroup JSON-LD on home, MusicEvent per show
- Google Search Console verification meta tag: Noah will supply

## Placeholders Noah still owes

Hero video loop or photo (full band, golden hour), band photo for the photo band, logo SVG, HyperFollow URL, Meroke Lane cover art, three clip YouTube URLs and thumbnails (thumbnails feature Noah), Apple Music URL, full-band piece count, trio/duo lines, set lengths, PA/stage needs, email provider choice. Use clearly labeled placeholders until then. Never invent facts, stats or quotes.

## Brand rules (non-negotiable)

- Band-first "we" voice. Confident and dry. Earnest only when a song earns it.
- Never self-deprecating, never apologetic, never defensive. No jokes at the band's expense.
- No em dashes. No try-hard or corporate copy. No begging CTAs.
- Never promote Encore or any app. No family, day job or personal details.
- Never fake live footage. No AI-generated visuals on the site.

## Phases

**Phase 1 (launch):** scaffold Astro, tokens, fonts, three pages with copy and placeholders, shows.json + empty state, Netlify Forms booking form, redirects, sitemap, JSON-LD. Open a PR. Noah reviews the deploy preview on his phone.

**Phase 2:** real assets swapped in, email provider wired, stage plot/rider PDF, analytics, UTMs.

**Cutover (Noah does this with you, step by step):** export Wix contacts CSV and media, confirm registrar, lower DNS TTL a day ahead, point domain to Netlify, confirm HTTPS, re-verify Search Console, submit sitemap, swap IG bio to /now. Cancel Wix after two stable weeks, before auto-renew.

## Implementation decisions (Phase 1)

- Astro 7.x needs Node >= 22.23.4. Netlify pins `NODE_VERSION` in `netlify.toml`; `.nvmrc` says 24.
- `src/data/site.ts` holds every link, the booking email and asset paths. `null` renders a labeled placeholder.
- Clean URLs without trailing slashes (`build.format: 'file'`, `trailingSlash: 'never'`).
- "Upcoming" shows are computed at build time in America/New_York, so a show stays listed through its own day. Needs a rebuild after show dates pass (daily build hook planned for Phase 2).
- "Details" on a show row renders only when `url` is set.
- `/now` has its own compact signup at the bottom; "Get show dates" jumps to it. "Watch us live" goes to `/#video` (internal, no UTM).
- YouTube facade is a small in-repo custom element (`ClipFacade.astro`), using youtube-nocookie on click.
- `npm run build` runs `scripts/check-copy.mjs` first and fails on em dashes or "unforgettable".
- OG images and favicons are typographic renders from `scripts/make-images.cjs`.

## Ongoing maintenance

- After every change on a PR branch: `npm run build && npm run screenshots`. That writes full-page Playwright (headless Chromium) screenshots of `/` and `/book` at 390px and 1440px to `screenshots/` (`home-390.png`, `home-1440.png`, `book-390.png`, `book-1440.png`). Commit them with the change and list the file names in a PR comment. The script fails on horizontal overflow. If a headless browser can't run in the environment, say so to Noah instead of skipping.

- New show: Noah says "add 12/5 Talkhouse 8pm". Edit shows.json on a branch, open a PR, merge after Noah approves the preview.
- Weekly: update now.json to the latest post.
- Keep this file current when decisions change.
