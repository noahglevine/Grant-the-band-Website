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
- Fonts self-hosted via Fontsource: Montserrat (variable; confirmed as the Meroke Lane cover font, Regular 400 caps) and Reenie Beanie
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

## Brand source of truth

Website must match the approved Canva masters in "GRANT the band - Social Templates". When in doubt, match Instagram.

The masters (Canva folder "GRANT the band - Social Templates"): 4:5 and 9:16 Show announcement ticket ("NEXT STOP."), 9:16 Live clip, 4:5 Photo master, 4:5 Lyric card.

### Colors (the only tokens)

```
--night:  #10151C   page background, scrims (cool blue-black, NOT brown)
--cream:  #F4EBDD   headlines, primary text
--gold:   #F6CB8A   ALL labels, subtext, links, primary buttons (dark text #10151C on gold buttons)
--amber:  #E3A35C   thin rules only (1-2px)
--copper: #AE5F2A   ticket/print accents only
```

Ticket only: paper `#F3E9D6`, ink `#1E1E1E`.
No browns, no other surfaces. Hairline dividers are cream at low opacity. Text contrast 4.5:1 or better.

### Type

- One display face: Montserrat Regular (400), ALL CAPS, letter-spacing 0.06em. Confirmed as the Meroke Lane cover font (see `public/images/ASSETS.md`). Set in one place: `--display` in `global.css`.
- Headlines are regular weight. Bold (700) only for show dates (the ticket: venue, date, set, line values). No 800/900 anywhere. UI text (buttons, nav) is 500.
- Body: Montserrat 400, sentence case, 18px phone / 20px desktop, line-height 1.55, max-width 65ch.
- Handwritten accent: Reenie Beanie (replaces Caveat everywhere). Max one handwritten line per screen.
- Max two text levels per section: title + one small gold line.
- Section titles get a 64px x 2px amber rule above them (matches the "NEXT STOP." master).
- Sizes: H1 clamp(60px, 13vw, 144px). Section titles (H2): 40px phone, max 56px desktop, regular weight, tracked caps, amber rule above. Gold label lines 15px+, uppercase. Nav 17px. Buttons 18px label, 56px min height, pill. Captions and footer 16px min. Nothing below 15px.

### Layout

- Photo-first. Real photos full bleed with a night gradient scrim behind any text: night at 0% to 70% (front-loaded: 70% from 30% of the height down, so over the video the hero logo stays above 3:1 and the gold label above 4.5:1 at their brightest spots). That is the one gradient allowed.
- No empty colored boxes as the main visual. Until photos land, use a single neutral night block, not dashed boxes. Sections without their photo yet (the photo band) stay hidden.
- Buttons: exactly two styles. Primary = gold fill, night text. Secondary = 1px cream outline. No gold-outline variant (placeholder buttons use the primary style).
- Section spacing: 96px desktop / 64px phone between sections, nothing taller.
- No green anywhere. No emoji, no stock imagery, no AI-generated visuals, no template look. The scrim is the only gradient.
- Mobile first. Most traffic comes from Instagram on phones.

### Shows = the ticket

Deploy previews only (`CONTEXT === "deploy-preview"`): when there are no real upcoming shows, two sample tickets render so the design can be reviewed: Cooper Bluff, Oyster Bay, NY, [DATE], 6 - 9 PM; The Stephen Talkhouse, Amagansett, NY, [DATE], 8 PM. Never on production or local builds, and no MusicEvent JSON-LD for them.

Desktop (900px+): tickets in a 2-column grid, each max 540px wide, 48px gap, rotation alternating -2deg / +1.5deg. Phones keep one column with the stub underneath.

Each show renders as the "Next stop." ticket: cream paper `#F3E9D6`, rounded corners, perforated stub, labels in copper caps (GRANT THE BAND / LIVE / DATE / SET / LINE / ADMIT ONE / KEEP THIS STUB), venue large in ink `#1E1E1E`, town under it, "LINE: MEROKE LANE" on every ticket, date on the stub (MM/DD), handwritten "see you there" in Reenie Beanie (first ticket only, to keep one handwritten line per screen), -2deg rotation on desktop, 0 on phone. Section title "NEXT STOP.". Hidden when there are no dates.

### Signature and credits

- GTB handwritten monogram (white): `public/images/gtb-monogram.svg` small in the footer; the favicons render it on night (`scripts/make-images.cjs`).
- Credit photographers in alt text and the footer. Cooper Bluff photos: @scottk_ny. Talkhouse and 89 North photos and the hero video: credit MISSING (see ASSETS.md); add it to `photographers` in `site.ts` when known. Every photo is in `photos` in `site.ts` with its credit, and the footer shows credits for photos actually rendered.

### Photo and video handling

Warm grade for the hero video loop (and any band footage), via `scripts/grade-video.sh`:

```
colorbalance=rs=0.10:gs=0.02:bs=-0.12:rm=0.08:bm=-0.10:rh=0.04:bh=-0.06,eq=saturation=0.92:contrast=1.04
```

### Assets

`public/images/ASSETS.md` is the asset manifest (sources, sizes, alt text, credits, what's missing). Read it before touching images.

- Hero: `public/video/hero-desktop.mp4` (landscape screens) / `hero-phone.mp4` (portrait), over `hero-desktop-poster.jpg` / `hero-phone-poster.jpg` in a `<picture>`. The video fades in once it plays; reduced-motion visitors get the poster and download no video. `Hero.astro` only includes a loop if its file exists. The loops are already graded: never re-grade.
- Clip thumbnails: Talkhouse stage, 89 North (Noah + trombone), Cooper horns. Photo band: 89 North full band.
- Cooper photos are small originals (540px and 1086px). Card/thumbnail sizes only, never upscaled or full bleed.
- `scripts/make-image-sizes.sh` writes 1200px copies of the 2400px photos to `public/images/sized/` for srcset. Never resize the Meroke Lane cover: it would strip its Content Credentials.
- Alt text follows ASSETS.md, with "GRANT the band" in full instead of "GRANT".

### Voice

Confident and dry. No self-deprecation, no hype words, no horn jokes, no em dashes. Write "GRANT the band" in all body copy, never just "GRANT".

### Wordmark

Lives only in `src/components/Wordmark.astro`; set `wordmarkSvg` in `src/data/site.ts` to swap in the real logo. Hero lockup: "GRANT" in the display face, large and centered, with "the band" in Reenie Beanie (gold) under the right edge; it is the H1, min 90px tall on phones, 140px on desktop. Small header/footer wordmark: "GRANT THE BAND" in display caps, no handwriting. On desktop the hero logo is at most 40% of the viewport width.

## Navigation (all pages)

Shows (`/shows`), Music (`/#music`), Video (`/#video`), Newsletter (the signup on the current page, else `/#newsletter`), Booking (`/book`). Phones get a menu button. On home the header carries no wordmark; the hero logo is the headline.

## Home sections and copy

Use this copy as written. Typographic apostrophes and quotes. Never use em dashes anywhere on the site.

1. Hero: 100svh. The media is a full-bleed background layer behind the logo and buttons ([HERO VIDEO LOOP or PHOTO: full band, golden hour]; until it lands, a neutral night block in that same layer), graded warm, night gradient scrim. Video rules: self-hosted MP4, 6 to 10 sec, under 3 MB, poster image, `playsinline`, prefers-reduced-motion shows the poster.
   - Centered logo, large. It is the H1.
   - Below: gold label "MEROKE LANE", then "OUT EVERYWHERE".
   - Buttons: "Listen" (to [HYPERFOLLOW URL]) and "Shows" (to `/shows`), in the lower third.
   - No tagline, no location line, no sub paragraph.
2. Next stop (only when there are upcoming dates): title "NEXT STOP.", one ticket per show, link to `/shows`.
3. Music (`#music`): cover art, title "MEROKE LANE" (heading only, no gold line), the EP tracklist as a quiet numbered list in Spotify order: 1. “Meroke” (title pending Noah's confirmation) 2. “Man on a Train” 3. “Waking Up” 4. “Horizon” 5. “Peace of Mind”, one gold primary "Listen" button (HyperFollow), then one row of small text links: Spotify (the EP: https://open.spotify.com/album/6sBrvYJHa66nYqVTg6bNa2) · Apple Music · YouTube. Text block vertically centered against the cover art.
4. Video (`#video`): title "LIVE". Three clip cards (YouTube IDs in `site.ts`, from ASSETS.md), song in quotes plus a gold line: “Man on a Train” / Live at The Stephen Talkhouse; “Around the Moon” / Live at 89 North; Full show (no quotes, not a song) / Live at Cooper Bluff. Link "More on YouTube".
5. Photo band: full-bleed band photo, no text. Hidden until the photo exists.
6. Newsletter (`#newsletter`): title "FIRST TO KNOW.", gold line "New music and show dates, before anyone else." Email field + "Sign up". Same copy everywhere the signup appears (except the /shows empty state's inline "Get them first.").

Section titles are statements, not category words. Nav labels stay Shows, Music, Video, Newsletter, Booking.
7. Footer (every page): small wordmark, Instagram, Spotify, YouTube, TikTok (a 2x2 grid on phones), "Booking: booking@granttheband.com", photo credits, "© 2026 GRANT the band", GTB monogram. No location line.

Not on home: venue list, press quote, booking teaser. Those live on `/book`.

## /shows

- H1 "Shows". One ticket per upcoming show from shows.json.
- Empty: "No dates announced." + inline signup "Get them first."

## /book copy

- H1: "BOOKING."
- "Indie rock with a horn section from Long Island. Originals off Meroke Lane plus the covers people came for. Two summers as the residency band at Cooper Bluff, plus The Stephen Talkhouse, 89 North, Piquet Lane, The Villager and Nag’s Head Ale House."
- Formats, each with one line under it:
  - Full band with horns: "[NUMBER]-piece. Built for clubs, residencies and outdoor nights."
  - Trio: "[WHAT THE TRIO IS BEST FOR]"
  - Duo: "[WHAT THE DUO IS BEST FOR]"
  - Then [SET LENGTHS]. [PA AND STAGE NEEDS].
- "Watch first": three clips, full band first.
- "Played", in this order: The Stephen Talkhouse / Cooper Bluff · Summer Residency, 2025 and 2026 / 89 North / Piquet Lane / The Villager / Nag’s Head Ale House. No dates on any other venue. "Summer Residency" is capitalized.
- "Press" (on /book only, never home; `press` in `site.ts`), in this order, each with an amber left rule, cream quote, small gold attribution:
  1. “Everyone is executing their instrument… top shelf.” Phillip Torvik, producer, reviewing “Man on a Train” on TikTok ("on TikTok" links to the review once Noah supplies the URL).
  2. “High-energy live performances with emotionally charged songwriting.” Rolling Hype, February 2025 · Read the feature (links to https://rollinghype.com/grant-the-band-the-energy-the-originals-and-the-covers-you-cant-miss/, new tab, rel="noopener").
- Downloads: stage plot and tech rider PDF (phase 2).
- Contact: "Email booking@granttheband.com with the date, the room and your budget. We answer within a day." Plus a Netlify form, fields in this order: name, email, date, venue or event type (placeholder "Club, private event, wedding, festival"), budget, message. Honeypot field is visually hidden and aria-hidden.
- No fan signup block on /book. The page is for buyers only.
- Do not add a band member photo grid. The lineup rotates.

## /now

Single phone-width column: wordmark, "Indie rock from Long Island. Better in the room.", top card from now.json ("The one you just watched"), next show row, buttons "Get show dates" (primary), "Listen to Meroke Lane", "Watch us live", "Book us". Footer "granttheband.com". Add UTM params to outbound links (utm_source=instagram&utm_medium=bio).

## Links

- Spotify (artist, footer and socials): https://open.spotify.com/artist/7lsyuqqd27UuWS2mcYnSZe
- Spotify, Meroke Lane EP (Music section): https://open.spotify.com/album/6sBrvYJHa66nYqVTg6bNa2
- YouTube: https://www.youtube.com/@GRANTtheband
- Instagram: https://www.instagram.com/grant_theband
- TikTok: https://www.tiktok.com/@granttheband
- Apple Music, Meroke Lane EP: https://music.apple.com/us/album/meroke-lane-ep/6793211371
- HyperFollow (all platforms, "Listen" buttons): https://distrokid.com/hyperfollow/granttheband/meroke-lane

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
- Home meta + OG description: "GRANT the band. Meroke Lane out everywhere. Listen, watch, and get show dates."
- /book title: "Book GRANT the band | Live Band for Venues and Private Events, Long Island"
- Meta descriptions in the band voice, no em dashes, no "unforgettable"
- og:site_name "GRANT the band", OG image per page (1200x630)
- MusicGroup JSON-LD on home, MusicEvent per show
- Google Search Console verification meta tag: Noah will supply

## Placeholders Noah still owes

Photographer credits for the Talkhouse and 89 North photos and the hero video, the TikTok URL for the Torvik review, logo SVG (the wordmark is still the type version), confirmation of track 1's title ("Meroke"), full-band piece count, trio/duo lines, set lengths, PA/stage needs, stage plot PDF, email provider choice, `now.json` content, Search Console token. Use clearly labeled placeholders until then. Never invent facts, stats or quotes.

## Brand rules (non-negotiable)

- Band-first "we" voice. Confident and dry. Earnest only when a song earns it.
- Never self-deprecating, never apologetic, never defensive. No jokes at the band's expense.
- No em dashes. No try-hard or corporate copy. No begging CTAs.
- Never promote Encore or any app. No family, day job or personal details.
- Never fake live footage. No AI-generated visuals on the site. One exception, approved by Noah: the released Meroke Lane EP cover, which Canva's Content Credentials list as made with Canva AI. It is the official release artwork, used unaltered with its credentials intact. Nothing else AI-made.

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

- After every change on a PR branch: `npm run build:preview && npm run screenshots`. That writes full-page Playwright (headless Chromium) screenshots of `/` and `/book` at 390x844, 1312x634 (laptop) and 1440x900 to `screenshots/` (`home-390.png`, `home-1312.png`, `home-1440.png`, `book-390.png`, `book-1312.png`, `book-1440.png`). Build with `CONTEXT=deploy-preview` so the sample tickets show, as on the preview. Commit them with the change and list the file names in a PR comment. The script fails on horizontal overflow. If a headless browser can't run in the environment, say so to Noah instead of skipping.

- New show: Noah says "add 12/5 Talkhouse 8pm". Edit shows.json on a branch, open a PR, merge after Noah approves the preview.
- Weekly: update now.json to the latest post.
- Keep this file current when decisions change.
