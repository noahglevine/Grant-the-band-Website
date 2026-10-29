// Single source for links, contact info and assets.
// Anything set to null renders as a labeled placeholder until Noah supplies it.

export const SITE_URL = 'https://granttheband.com';

export const links = {
  spotify: 'https://open.spotify.com/artist/7lsyuqqd27UuWS2mcYnSZe',
  youtube: 'https://www.youtube.com/@GRANTtheband',
  instagram: 'https://www.instagram.com/grant_theband',
  tiktok: 'https://www.tiktok.com/@granttheband',
  appleMusic: null as string | null, // [APPLE MUSIC URL]
  // Meroke Lane HyperFollow (DistroKid smart link). Hero and Music "Listen" buttons.
  hyperfollow: null as string | null, // [HYPERFOLLOW URL]
  // Meroke Lane on YouTube. Falls back to the channel until there's a playlist URL.
  merokeLaneYoutube: null as string | null,
};

export const bookingEmail = 'booking@granttheband.com' as string | null;

// Real logo, when Noah sends it: drop the SVG in public/ and set the path here.
// Until then Wordmark.astro renders the type version.
export const wordmarkSvg = null as string | null; // e.g. '/logo.svg'

// GTB handwritten monogram (white PNG). Footer and favicon. Placeholder until supplied.
export const monogramPng = null as string | null; // e.g. '/gtb-monogram.png'

// Google Search Console verification token (content attribute only).
export const searchConsoleToken = null as string | null;

// Full band, golden hour. Video loop (with poster) or a still photo in `poster`.
// Photographer credits. Every photo or video below names one of these, and the
// footer lists the credits for the photos actually on the site.
export const photographers = {
  scottk: { handle: '@scottk_ny', url: 'https://www.instagram.com/scottk_ny' },
} as const;
export type PhotographerId = keyof typeof photographers;

// Grade the loop with scripts/grade-video.sh before it goes in public/media/.
export const hero = {
  video: null as string | null, // e.g. '/media/hero-loop.mp4'
  poster: null as string | null, // e.g. '/media/hero.jpg'
  alt: 'GRANT the band live',
  credit: null as PhotographerId | null,
};

// Full-bleed photo between Video and Newsletter on home. Hidden until src is set.
export const photoBand = {
  src: null as string | null, // e.g. '/media/cooper-bluff.jpg'
  alt: 'GRANT the band at Cooper Bluff, Oyster Bay. Photo by @scottk_ny',
  credit: 'scottk' as PhotographerId | null,
};

export function creditsInUse(): { handle: string; url: string }[] {
  const used = [
    hero.video || hero.poster ? hero.credit : null,
    photoBand.src ? photoBand.credit : null,
  ].filter((c): c is PhotographerId => Boolean(c));
  return [...new Set(used)].map((id) => photographers[id]);
}

export const ep = {
  title: 'Meroke Lane',
  cover: null as string | null, // e.g. '/media/meroke-lane.jpg'
  // Singles to start with, not the tracklist.
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
