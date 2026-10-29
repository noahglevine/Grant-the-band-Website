# GRANT the band website assets

All footage and photos are real GRANT footage and photography, with nothing AI-generated or AI-edited. The one exception is the released Meroke Lane cover art (see the cover note below). Every frame and photo was checked for logos from band members' day jobs, and none appear. The 89 North signage in two photos is the venue's own.

## Video (`public/video/`)

| File | Size | Spec | Source |
|---|---|---|---|
| `hero-desktop.mp4` | 2.7 MB | 1920x1080, 10.7 s, H.264, 29.97 fps, no audio | Stephen Talkhouse, Amagansett, Feb 28 2026, "Man on a Train". Five build-up cuts on the beat, ending on the jump. See the cut list below |
| `hero-phone.mp4` | 2.7 MB | 1080x1920, 10.7 s, H.264, 29.97 fps, no audio | Same edit, vertical crops with each subject centered and the jump fully in frame |

Cut list (timestamps in the multi-cam edit MOAT_Talkhouse.mp4 unless noted):

1. Wide, full band: 8:36.3
2. Trumpet: 5:59.7
3. Drums: 4:44.5
4. Bass: Andrew's gimbal camera, clip P1049778 (not in the multi-cam)
5. Noah singing with guitar, lights flashing: 8:14.1
6. The jump: wind-up 8:59.73, peak 9:01.74, landing 9:01.94, out 9:02.45 (holds about 0.5 s after landing, then the loop restarts on cut 1)

A fan's phone screen shows in the bottom-right corner of the desktop wide shot and the jump. It was left in on Noah's call.

The previous loops (desktop 8:55.75-9:03.85, phone 7:10.4-7:20.4) were replaced in PR #2.

Both clips use the house warm grade (`colorbalance=rs=0.10:gs=0.02:bs=-0.12:rm=0.08:bm=-0.10:rh=0.04:bh=-0.06,eq=saturation=0.92:contrast=1.04`) and have faststart enabled. They loop cleanly enough for a muted autoplay hero. Recommended tag: `<video autoplay muted loop playsinline poster="...">`.

Video credit: MISSING (who shot and edited the Talkhouse multi-cam).

## Images (`public/images/`)

| File | Dimensions | Size | Credit | Alt text |
|---|---|---|---|---|
| `hero-desktop-poster.jpg` | 1920x1080 | 272 KB | see video | GRANT the band on stage at the Stephen Talkhouse, Noah mid-jump with his guitar (the jump at its peak, 9:01.74) |
| `hero-phone-poster.jpg` | 1080x1920 | 226 KB | see video | GRANT singer Noah mid-jump with his guitar at the Stephen Talkhouse (vertical crop, same frame) |
| `talkhouse-stage.jpg` | 2400x1600 | 538 KB | MISSING | GRANT the band on stage at the Stephen Talkhouse under green light |
| `talkhouse-noah.jpg` | 1600x2400 (portrait) | 521 KB | MISSING | GRANT singer Noah at the mic with an acoustic guitar, drummer behind |
| `talkhouse-drums.jpg` | 2400x1600 | 539 KB | MISSING | GRANT's drummer laughing behind the kit in purple light |
| `89north-full-band.jpg` | 2400x1600 | 440 KB | MISSING | The full band on stage at 89 North |
| `89north-noah-trombone.jpg` | 2400x1600 | 472 KB | MISSING | GRANT singer Noah singing with the trombone player beside him at 89 North |
| `cooper-noah.jpg` | 540x360 | 29 KB | Photo: @scottk_ny | GRANT singer Noah singing with an acoustic guitar under the tent at Cooper Bluff |
| `cooper-golden-hour.jpg` | 540x360 | 31 KB | Photo: @scottk_ny | GRANT singer Noah singing at golden hour at Cooper Bluff |
| `cooper-horns.jpg` | 1086x724 (B&W) | 101 KB | Photo: @scottk_ny | GRANT's horn section playing at Cooper Bluff, black and white |
| `meroke-lane-cover.jpg` | 2000x2000 | 546 KB | GRANT the band | Meroke Lane EP cover: railroad tracks running into a golden sunset |
| `gtb-monogram.png` | 512x512, transparent | 20 KB | GRANT the band | GTB |
| `gtb-monogram.svg` | vector | 6 KB | GRANT the band | GTB |

Shows and dates:

- Stephen Talkhouse, Amagansett NY: Feb 28 2026.
- 89 North, Patchogue NY: Jan 22 2026. The photo folder is labeled 1.23.26, but Jan 22 is the show date.
- Cooper Bluff: May 2 2026.

Photo handling:

- Talkhouse and 89 North photos come from the camera's own full-size JPEG embedded in each CR2 (no raw development and no grade). They are resized to a 2400px long edge at quality 82, with metadata stripped.
- The Cooper photos are exported at their native size (quality 82, metadata stripped) because 1086px is the largest that exists. **Use them only at small sizes (cards, gallery thumbs). Upscaling them is not allowed.**

Cover provenance: the Meroke Lane cover exported from Canva carries Canva's signed Content Credentials (C2PA), which list it as "composite with trained algorithmic media" made with Canva AI. In other words, Canva records that the cover image was made with its AI tools. It is the released EP artwork, identical to the cover on Spotify and Apple Music, so it is included here. The Content Credentials have been left intact.

Monogram: white, transparent background. It is rendered from the vector paths in the Canva overlay master (DAHYCktVijc), so it matches the mark on our social posts exactly. The SVG is the same artwork and stays sharp at any size.

## Brand font

The cover title is **Montserrat Regular (400), all caps**.

- "GRANT THE BAND" is set in black (#000000), and "MEROKE LANE" in copper (#AE5F2A).
- Canva's API only exposes an internal font ID (YAFdtQi73Xs). I confirmed the name by rendering Montserrat 400 at the cover's size and matching it to the exported cover: the glyph widths and heights match within 0.4%.
- Montserrat is free on Google Fonts.
- Brand palette from the social system: cream #F4EBDD, gold #F6CB8A, copper #AE5F2A, amber #E3A35C, night #10151C.

## Music links

- Spotify, Meroke Lane EP (use this, not the "Man on a Train" single): https://open.spotify.com/album/6sBrvYJHa66nYqVTg6bNa2
- Apple Music, Meroke Lane EP: https://music.apple.com/us/album/meroke-lane-ep/6793211371
- DistroKid HyperFollow (all platforms): https://distrokid.com/hyperfollow/granttheband/meroke-lane
- Instagram: https://www.instagram.com/grant_theband

## YouTube embeds

| Song | Venue / date | URL |
|---|---|---|
| Man on a Train | Stephen Talkhouse, Feb 28 2026 | https://www.youtube.com/watch?v=Fz9s33Rsvh8 |
| Around the Moon | 89 North, Jan 22 2026 | https://www.youtube.com/watch?v=a1R_eGE8rbk |
| Full show | Cooper Bluff, June 7 2026 | https://www.youtube.com/watch?v=cTb2dEve5B8 |

## MISSING

- Photographer credit for the Talkhouse photos (3 files).
- Photographer credit for the 89 North photos (2 files).
- Credit for the Talkhouse multi-cam video (hero clips).
- `cooper-full-band.jpg` and `cooper-crowd.jpg` were not supplied. No full-band or crowd shot from Cooper exists at a usable size, so `89north-full-band.jpg` covers the full-band slot. No crowd photo is available yet.
- Cooper photos below the 2400px spec: `cooper-noah.jpg` and `cooper-golden-hour.jpg` are 540px, `cooper-horns.jpg` is 1086px. Replace them if the photographer can send originals.
- Better Talkhouse photos: Noah may supply more.
