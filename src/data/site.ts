// Single source for links, contact info and assets.
// Anything set to null renders as a labeled placeholder until Noah supplies it.

export const SITE_URL = 'https://granttheband.com';

export const links = {
  spotify: 'https://open.spotify.com/artist/7lsyuqqd27UuWS2mcYnSZe', // artist page: footer, socials
  merokeLaneSpotify: 'https://open.spotify.com/album/6sBrvYJHa66nYqVTg6bNa2', // the EP: Music section
  youtube: 'https://www.youtube.com/@GRANTtheband',
  instagram: 'https://www.instagram.com/grant_theband',
  tiktok: 'https://www.tiktok.com/@granttheband',
  appleMusic: 'https://music.apple.com/us/album/meroke-lane-ep/6793211371' as string | null, // the EP
  // Meroke Lane HyperFollow (DistroKid smart link, all platforms). Hero and Music "Listen" buttons.
  hyperfollow: 'https://distrokid.com/hyperfollow/granttheband/meroke-lane' as string | null,
  // Meroke Lane on YouTube. Falls back to the channel until there's a playlist URL.
  merokeLaneYoutube: null as string | null,
};

export const bookingEmail = 'booking@granttheband.com' as string | null;

// Real logo, when Noah sends it: drop the SVG in public/ and set the path here.
// Until then Wordmark.astro renders the type version.
export const wordmarkSvg = null as string | null; // e.g. '/logo.svg'

// GTB handwritten monogram, white on transparent. Footer (SVG) and favicon (rendered on night).
export const monogram = { svg: '/images/gtb-monogram.svg', png: '/images/gtb-monogram.png' };

// Google Search Console verification token (content attribute only).
export const searchConsoleToken = null as string | null;

// Photographer credits. Every photo names one of these (or null while the credit is
// missing), and the footer lists the credits for photos actually rendered on the site.
export const photographers = {
  scottk: { handle: '@scottk_ny', url: 'https://www.instagram.com/scottk_ny' },
} as const;
export type PhotographerId = keyof typeof photographers;

export type Photo = {
  src: string;
  // Smaller copy for srcset, from scripts/make-image-sizes.sh. Same pixels, resized.
  small?: { src: string; width: number };
  width: number;
  height: number;
  alt: string;
  credit: PhotographerId | null; // null = no credit shown (Talkhouse, 89 North, hero video: by Noah's call)
};

// From public/images/ASSETS.md. Alt text follows that file, with "GRANT the band" in full
// and the photographer named where known. Cooper photos are small originals: card sizes only.
export const photos = {
  heroDesktop: {
    src: '/images/hero-desktop-poster.jpg',
    width: 1920,
    height: 1080,
    alt: 'GRANT the band on stage at the Stephen Talkhouse',
    credit: null,
  },
  heroPhone: {
    src: '/images/hero-phone-poster.jpg',
    width: 1080,
    height: 1920,
    alt: 'GRANT the band singer Noah singing with an acoustic guitar at the Stephen Talkhouse',
    credit: null,
  },
  talkhouseStage: {
    src: '/images/talkhouse-stage.jpg',
    small: { src: '/images/sized/talkhouse-stage-1200.jpg', width: 1200 },
    width: 2400,
    height: 1600,
    alt: 'GRANT the band on stage at the Stephen Talkhouse under green light',
    credit: null,
  },
  northFullBand: {
    src: '/images/89north-full-band.jpg',
    small: { src: '/images/sized/89north-full-band-1200.jpg', width: 1200 },
    width: 2400,
    height: 1600,
    alt: 'GRANT the band, full band on stage at 89 North',
    credit: null,
  },
  northNoahTrombone: {
    src: '/images/89north-noah-trombone.jpg',
    small: { src: '/images/sized/89north-noah-trombone-1200.jpg', width: 1200 },
    width: 2400,
    height: 1600,
    alt: 'GRANT the band singer Noah singing with the trombone player beside him at 89 North',
    credit: null,
  },
  cooperHorns: {
    src: '/images/cooper-horns.jpg',
    width: 1086,
    height: 724,
    alt: 'GRANT the band’s horn section playing at Cooper Bluff, black and white. Photo by @scottk_ny',
    credit: 'scottk',
  },
  cover: {
    // Original only: keeps the cover's Content Credentials intact (see ASSETS.md).
    src: '/images/meroke-lane-cover.jpg',
    width: 2000,
    height: 2000,
    alt: 'Meroke Lane EP cover: railroad tracks running into a golden sunset',
    credit: null, // band artwork, not a photo credit
  },
} satisfies Record<string, Photo>;

export function srcset(photo: Photo): string | undefined {
  return photo.small ? `${photo.small.src} ${photo.small.width}w, ${photo.src} ${photo.width}w` : undefined;
}

// Hero: graded loops from ASSETS.md (already graded, do not re-grade). Hero.astro uses each
// video only if the file exists in public/, so the posters carry the hero until then.
export const hero = {
  videoDesktop: '/video/hero-desktop.mp4',
  videoPhone: '/video/hero-phone.mp4',
  posterDesktop: photos.heroDesktop,
  posterPhone: photos.heroPhone,
};

// Full-bleed photo between Video and Newsletter on home. Hidden while null.
export const photoBand: Photo | null = photos.northFullBand;

// Every photo the site renders, for footer credits.
const photosInUse: (Photo | null)[] = [hero.posterDesktop, hero.posterPhone, photoBand, photos.cover];

export const ep = {
  title: 'Meroke Lane',
  cover: photos.cover as Photo | null,
  // EP tracklist in Spotify order (track 1 confirmed by Noah).
  tracks: ['Meroke', 'Man on a Train', 'Waking Up', 'Horizon', 'Peace of Mind'],
};

export type Clip = {
  title: string;
  isSong: boolean; // songs render in quotes; "Full show" doesn't
  where: string;
  youtubeId: string | null;
  thumb: Photo | null;
};

// From ASSETS.md "YouTube embeds". Full band first. /book uses this order as-is.
export const clips: Clip[] = [
  { title: 'Man on a Train', isSong: true, where: 'Live at The Stephen Talkhouse', youtubeId: 'Fz9s33Rsvh8', thumb: photos.talkhouseStage },
  { title: 'Around the Moon', isSong: true, where: 'Live at 89 North', youtubeId: 'a1R_eGE8rbk', thumb: photos.northNoahTrombone },
  { title: 'Full show', isSong: false, where: 'Live at Cooper Bluff', youtubeId: 'cTb2dEve5B8', thumb: photos.cooperHorns },
];

export function creditsInUse(): { handle: string; url: string }[] {
  const used = [...photosInUse, ...clips.map((c) => c.thumb)]
    .map((p) => p?.credit)
    .filter((c): c is PhotographerId => Boolean(c));
  return [...new Set(used)].map((id) => photographers[id]);
}

// /book "Press", in this order. Quotes exactly as supplied by Noah; never invent or trim.
export type PressQuote = {
  quote: string;
  source: string; // attribution before the link, no em dashes
  linkText: string | null; // the linked part of the attribution
  url: string | null; // null renders linkText as plain text
};
export const press: PressQuote[] = [
  {
    quote: 'Everyone is executing their instrument… top shelf.',
    source: 'Phillip Torvik, producer, reviewing “Man on a Train”',
    linkText: 'on TikTok',
    url: null, // no link, by Noah's call: "on TikTok" stays plain text
  },
  {
    quote: 'High-energy live performances with emotionally charged songwriting.',
    source: 'Rolling Hype, February 2025 ·',
    linkText: 'Read the feature',
    url: 'https://rollinghype.com/grant-the-band-the-energy-the-originals-and-the-covers-you-cant-miss/',
  },
];

// /book "Played", in this order. Only the residency carries dates.
export const venuesPlayed = [
  'The Stephen Talkhouse',
  'Cooper Bluff · Summer Residency, 2025 and 2026',
  '89 North',
  'Piquet Lane',
  'The Villager',
  'Nag’s Head Ale House',
];

export const book = {
  fullBandPieces: null as number | null, // [NUMBER]
  trioBestFor: null as string | null, // [WHAT THE TRIO IS BEST FOR]
  duoBestFor: null as string | null, // [WHAT THE DUO IS BEST FOR]
  setLengths: null as string | null, // [SET LENGTHS]
  stageNeeds: null as string | null, // [PA AND STAGE NEEDS]
  stagePlotPdf: null as string | null, // phase 2
};
