// Single source for links, contact info and assets.
// Anything set to null renders as a labeled placeholder until Noah supplies it.

export const SITE_URL = 'https://granttheband.com';

export const links = {
  spotify: 'https://open.spotify.com/artist/7lsyuqqd27UuWS2mcYnSZe',
  youtube: 'https://www.youtube.com/@GRANTtheband',
  instagram: 'https://www.instagram.com/grant_theband',
  tiktok: 'https://www.tiktok.com/@granttheband',
  appleMusic: null as string | null, // [APPLE MUSIC URL]
  // Meroke Lane on YouTube. Falls back to the channel until there's a playlist URL.
  merokeLaneYoutube: null as string | null,
};

export const bookingEmail = null as string | null; // [BOOKING EMAIL]

// Real logo, when Noah sends it: drop the SVG in public/ and set the path here.
// Until then Wordmark.astro renders the type version.
export const wordmarkSvg = null as string | null; // e.g. '/logo.svg'

// Google Search Console verification token (content attribute only).
export const searchConsoleToken = null as string | null;

export const hero = {
  video: null as string | null, // e.g. '/media/hero-loop.mp4' (Man on a Train outro, Talkhouse)
  poster: null as string | null, // e.g. '/media/hero-poster.jpg'
};

export const ep = {
  title: 'Meroke Lane',
  cover: null as string | null, // e.g. '/media/meroke-lane.jpg'
  // Singles to start with, not the tracklist.
  // Singles to start with. Not the EP tracklist.
  singles: ['Man on a Train', 'Waking Up', 'Horizon', 'Peace of Mind'],
};

export type Clip = {
  song: string;
  where: string;
  youtubeId: string | null;
  thumb: string | null;
};

// Full band first. /book uses this order as-is.
export const clips: Clip[] = [
  { song: 'Man on a Train', where: 'Live at The Stephen Talkhouse', youtubeId: null, thumb: null },
  { song: 'Horizon', where: 'Live at The Stephen Talkhouse', youtubeId: null, thumb: null },
  { song: 'Peace of Mind', where: 'Unplugged at Cooper Bluff', youtubeId: null, thumb: null },
];

export const venuesPlayed = [
  'The Stephen Talkhouse',
  'Cooper Bluff, summer residency',
  '89 North',
  'Piquet Lane',
];

export const book = {
  fullBandPieces: null as number | null, // [NUMBER]
  trioBestFor: null as string | null, // [WHAT THE TRIO IS BEST FOR]
  duoBestFor: null as string | null, // [WHAT THE DUO IS BEST FOR]
  setLengths: null as string | null, // [SET LENGTHS]
  stageNeeds: null as string | null, // [PA AND STAGE NEEDS]
  stagePlotPdf: null as string | null, // phase 2
};
