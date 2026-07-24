import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { apps } from '../data/apps';
import { programs } from '../data/programs';

// Every indexable route, generated from the same data that builds the pages.
const staticPaths = ['', 'software', 'story', 'bass-swim', 'bass-swim/bass', 'bass-swim/riverrapps'];
const paths = [
  ...staticPaths,
  ...apps.flatMap((a) => [`apps/${a.slug}`, `apps/${a.slug}/privacy`, `apps/${a.slug}/terms`]),
  ...programs.map((p) => `software/${p.slug}`),
];

export const GET: APIRoute = () => {
  const urls = paths
    .map((p) => {
      const loc = p ? `${site.url}/${p}` : `${site.url}/`;
      return `  <url><loc>${loc}</loc></url>`;
    })
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
