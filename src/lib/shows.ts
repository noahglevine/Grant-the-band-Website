import showsData from '../data/shows.json';

export type Show = {
  date: string; // YYYY-MM-DD, local to Long Island
  time: string; // HH:MM, 24h
  venue: string;
  town: string; // "Amagansett, NY"
  url: string;
};

const TZ = 'America/New_York';

// Today's date on Long Island, as YYYY-MM-DD. Shows are compared as plain dates
// so a show stays listed through its own day.
function todayLocal(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(now);
}

export function upcomingShows(now = new Date()): Show[] {
  const today = todayLocal(now);
  return (showsData as Show[])
    .filter((s) => s.date >= today)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}

function asUtcNoon(date: string): Date {
  return new Date(`${date}T12:00:00Z`);
}

export function formatDateParts(date: string) {
  const d = asUtcNoon(date);
  const f = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...opts }).format(d);
  return {
    weekday: f({ weekday: 'short' }),
    month: f({ month: 'short' }),
    day: f({ day: 'numeric' }),
    long: f({ weekday: 'long', month: 'long', day: 'numeric' }),
  };
}

// "20:00" -> "8pm", "19:30" -> "7:30pm"
export function formatTime(time: string): string {
  if (!time) return '';
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 || 12;
  return m ? `${h12}:${String(m).padStart(2, '0')}${suffix}` : `${h12}${suffix}`;
}

// Offset like "-05:00" for New York on the given date and time.
function nyOffset(date: string, time: string): string {
  const probe = new Date(`${date}T${time || '20:00'}:00Z`);
  const name = new Intl.DateTimeFormat('en-US', { timeZone: TZ, timeZoneName: 'longOffset' })
    .formatToParts(probe)
    .find((p) => p.type === 'timeZoneName')?.value; // "GMT-05:00"
  return name && name !== 'GMT' ? name.replace('GMT', '') : '+00:00';
}

export function musicEventJsonLd(show: Show, siteUrl: string) {
  const [locality, region] = show.town.split(',').map((s) => s.trim());
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: `GRANT the band at ${show.venue}`,
    startDate: show.time ? `${show.date}T${show.time}:00${nyOffset(show.date, show.time)}` : show.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: show.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: locality,
        ...(region ? { addressRegion: region } : {}),
        addressCountry: 'US',
      },
    },
    performer: { '@type': 'MusicGroup', name: 'GRANT the band', url: siteUrl },
    url: show.url || `${siteUrl}/#shows`,
  };
}
