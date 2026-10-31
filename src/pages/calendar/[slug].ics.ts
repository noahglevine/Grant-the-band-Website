// One calendar file per upcoming show: /calendar/<date>-<venue>.ics ("Add to calendar").
import type { APIRoute, GetStaticPaths } from 'astro';
import { SITE_URL } from '../../data/site';
import { upcomingShows, showSlug, calendarIcs, type Show } from '../../lib/shows';

export const getStaticPaths: GetStaticPaths = () =>
  upcomingShows()
    .filter((show) => !show.sample)
    .map((show) => ({ params: { slug: showSlug(show) }, props: { show } }));

export const GET: APIRoute = ({ props }) =>
  new Response(calendarIcs((props as { show: Show }).show, SITE_URL), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
