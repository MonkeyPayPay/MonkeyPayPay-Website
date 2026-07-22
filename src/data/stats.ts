// Real store stats (ratings + download ranges), keyed by app/program slug.
//
// This file's data lives in `store-stats.json`, which is populated ONLY from
// the live app stores by `scripts/fetch-store-stats.mjs` (run daily by the
// GitHub Action). Apps that aren't published have no entry, so nothing renders
// for them — the site never shows an invented rating or download count.

import raw from './store-stats.json';

export interface StoreStat {
  /** Average rating 0–5 (from Google Play / App Store). */
  rating?: number;
  /** Number of ratings behind that average. */
  ratingCount?: number;
  /** Download range as the store reports it, e.g. "10,000+". */
  downloads?: string;
}

const stats = raw as Record<string, StoreStat>;

/** Returns real store stats for a slug, or undefined if there are none yet. */
export function getStat(slug: string): StoreStat | undefined {
  const s = stats[slug];
  if (!s) return undefined;
  const hasRating = typeof s.rating === 'number' && s.rating > 0;
  const hasDownloads = typeof s.downloads === 'string' && s.downloads.length > 0;
  return hasRating || hasDownloads ? s : undefined;
}
