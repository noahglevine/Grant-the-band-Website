# granttheband.com rebuild

You are building and maintaining the website for GRANT the band, an indie rock band with a horn section from Long Island, NY. Noah Grant (lead vocals, rhythm guitar) owns this repo. Replacing a Wix site at granttheband.com.

## Goal

A stranger should think "these guys are great live" within 3 seconds. Originals ride on that credibility.

Conversions, in priority order:
1. Show-alert email signup (primary, on every page)
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

## Pages (3 total)

- `/` home
- `/book` EPK for talent buyers and private events
- `/now` link-in-bio page for the Instagram bio

## Data

`src/data/shows.json` is the only place show dates live:

```json
[
  { "date": "2026-12-05", "time": "20:00", "venue": "The Stephen Talkhouse", "town": "Amagansett, NY", "url": "" }
]
```

- Home shows section renders upcoming shows only (date >= build date), sorted ascending.
- No upcoming shows: render the empty state (copy below). Never render a bare "no events" line.
- Generate schema.org `MusicEvent` JSON-LD for each upcoming show.
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
- Accent script: Caveat 600, used for small handwritten asides only ("the band", "Long Island, NY", "the EP")
- Buttons: pill shape, 44px+ tall. Primary = accent fill. Secondary = 1px cream outline.
- Dark site, no light mode needed, but keep text contrast at 4.5:1 or better.
- Brand rule: no green anywhere. No gradients, no emoji, no stock imagery, no AI-generated visuals, no template look.
- Mobile first. Most traffic comes from Instagram on phones.

Wordmark: "GRANT" in wide Archivo 800 + "the band" in Caveat, accent color.

## Home sections and copy

Use this copy as written. Typographic apostrophes and quotes. Never use em dashes anywhere on the site.

1. Header: wordmark, nav "Shows", "Music", "Live", "Book us" (outlined pill).
2. Hero: full-bleed muted autoplay video loop (self-hosted MP4, 6 to 10 sec, under 3 MB, poster image, `playsinline`, respects prefers-reduced-motion by showing the poster).
   - Aside: "Long Island, NY"
   - H1: "Better in the room."
   - Sub: "Indie rock with a horn section. Originals, plus a few covers we have no business playing. The set doesn’t sit still."
   - Buttons: "Get show dates" (scrolls to signup), "Listen to Meroke Lane"
3. Venue strip: "Played" · The Stephen Talkhouse · Cooper Bluff, summer residency · 89 North · Piquet Lane
4. Shows: H2 "Shows", aside "come say hi". Rows: date, venue, town · time, "Details".
   - Empty state: "Nothing on the calendar this week." / "That changes fast. Get the dates before they hit Instagram." + "Get show dates" button.
5. Music: cover art, aside "the EP", H2 "Meroke Lane", "Songs about trains, the long way home, and getting it wrong before getting it right. Start with these." List: Man on a Train, Waking Up, Horizon, Peace of Mind. Buttons: Spotify, Apple Music, YouTube.
   - Quote: “Everyone is executing their instrument… top shelf.” Torvik, reviewing “Man on a Train”
6. Live: H2 "Live", "Real shows. No lip-sync, no studio fixes." Three clips: Man on a Train (Live at The Stephen Talkhouse), Horizon (Live at The Stephen Talkhouse), Peace of Mind (Unplugged at Cooper Bluff). Link "More on YouTube".
7. Signup (accent background, dark text): H2 "Show dates, first." "One email when there’s a show. That’s it. We’re not organized enough to spam you." Email field + "Send me dates".
8. Book teaser: aside "for venues and private events", H2 "Book us", "Full band with horns, or a stripped-down duo or trio. Originals, covers, or both. Clips, set lengths, tech needs and past rooms are all on one page." Buttons "See the EPK", booking email.
9. Footer: wordmark, Instagram, Spotify, YouTube, TikTok, "© 2026 GRANT the band · Long Island, NY"

## /book copy

- H1: "Book GRANT the band."
- "Long Island indie rock with a horn section. Originals off Meroke Lane plus covers people actually sing. We held a summer Wednesday residency at Cooper Bluff and have played The Stephen Talkhouse, 89 North and Piquet Lane."
- Formats: Full band with horns / Trio / Duo. [SET LENGTHS]. [PA AND STAGE NEEDS].
- "Watch first": three clips, full band first.
- Downloads: stage plot and tech rider PDF (phase 2).
- Contact: "Email [BOOKING EMAIL] with the date, the room and your budget. We answer within a day." Plus a Netlify form: name, email, date, venue or event type, budget, message.
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
/video                 -> /#live
/about                 -> /
/shop                  -> /
/category/*            -> /
/product-page/*        -> /
```

## SEO

- Home title: "GRANT the band | Indie Rock from Long Island, NY"
- /book title: "Book GRANT the band | Live Band for Venues and Private Events, Long Island"
- Meta descriptions in the band voice, no em dashes, no "unforgettable"
- og:site_name "GRANT the band", OG image per page (1200x630)
- MusicGroup JSON-LD on home, MusicEvent per show
- Google Search Console verification meta tag: Noah will supply

## Placeholders Noah still owes

Hero video loop (Man on a Train outro, Talkhouse), Meroke Lane cover art, three clip YouTube URLs and thumbnails (thumbnails feature Noah), booking email, Apple Music URL, set lengths, PA/stage needs, email provider choice. Use clearly labeled placeholders until then. Never invent facts, stats or quotes.

## Brand rules (non-negotiable)

- Band-first "we" voice. Deadpan and self-aware. Earnest only when a song earns it.
- No em dashes. No try-hard or corporate copy. No begging CTAs.
- Never promote Encore or any app. No family, day job or personal details.
- Never fake live footage. No AI-generated visuals on the site.

## Phases

**Phase 1 (launch):** scaffold Astro, tokens, fonts, three pages with copy and placeholders, shows.json + empty state, Netlify Forms booking form, redirects, sitemap, JSON-LD. Open a PR. Noah reviews the deploy preview on his phone.

**Phase 2:** real assets swapped in, email provider wired, stage plot/rider PDF, analytics, UTMs.

**Cutover (Noah does this with you, step by step):** export Wix contacts CSV and media, confirm registrar, lower DNS TTL a day ahead, point domain to Netlify, confirm HTTPS, re-verify Search Console, submit sitemap, swap IG bio to /now. Cancel Wix after two stable weeks, before auto-renew.

## Ongoing maintenance

- New show: Noah says "add 12/5 Talkhouse 8pm". Edit shows.json on a branch, open a PR, merge after Noah approves the preview.
- Weekly: update now.json to the latest post.
- Keep this file current when decisions change.
